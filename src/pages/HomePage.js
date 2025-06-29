import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Plus, 
  Sparkles,
  Zap,
  Brain,
  Target,
  Globe,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // FIXED: Force production API URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://prompt2course-backend-1.onrender.com';
  
  // Debug log
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('Environment:', process.env.REACT_APP_ENVIRONMENT);

  const createCourse = async (courseData) => {
    try {
      console.log('Making request to:', `${API_BASE_URL}/api/courses/`);
      
      const response = await fetch(`${API_BASE_URL}/api/courses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Please enter a topic to create a course about!');
      return;
    }

    setIsGenerating(true);
    toast.loading('🤖 AI is creating your course...', { id: 'generating' });

    try {
      const course = await createCourse({
        topic: prompt.trim(),
        created_by: 'hariprasadmanoj3'
      });
      
      toast.success('✅ Course created successfully!', { id: 'generating' });
      setPrompt('');
      navigate('/courses');
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('❌ Failed to create course. Please try again.', { id: 'generating' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTopicClick = (topic) => {
    setPrompt(topic);
  };

  const popularTopics = [
    { text: 'JavaScript Fundamentals', icon: '⚡' },
    { text: 'Python for Beginners', icon: '🐍' },
    { text: 'React.js Complete Guide', icon: '⚛️' },
    { text: 'Machine Learning Basics', icon: '🤖' },
    { text: 'Digital Marketing', icon: '📱' },
    { text: 'Photography Techniques', icon: '📸' },
    { text: 'Data Science', icon: '📊' },
    { text: 'Web Design', icon: '🎨' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Prompt2Course
              </h1>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Courses
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Learning Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Transform Ideas into
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Complete Courses
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Simply describe what you want to learn, and our AI will generate a comprehensive, 
            structured course tailored to your needs. From beginner basics to advanced concepts.
          </p>
        </div>

        {/* Course Generator Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="prompt" className="block text-lg font-semibold text-gray-800 mb-4">
                  What would you like to learn today?
                </label>
                <input
                  type="text"
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., JavaScript fundamentals, machine learning, digital photography..."
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                  disabled={isGenerating}
                />
              </div>
              
              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Course...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Plus className="w-5 h-5" />
                    <span>Generate Course</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Popular Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularTopics.map((topic, index) => (
              <button
                key={topic.text}
                onClick={() => handleTopicClick(topic.text)}
                className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300 text-left group"
              >
                <div className="text-2xl mb-2">{topic.icon}</div>
                <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {topic.text}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Zap className="w-8 h-8 text-yellow-500" />,
              title: "Instant Generation",
              description: "Get comprehensive courses generated in seconds with AI"
            },
            {
              icon: <Target className="w-8 h-8 text-green-500" />,
              title: "Personalized Content",
              description: "Every course is tailored to your specific learning goals"
            },
            {
              icon: <Globe className="w-8 h-8 text-blue-500" />,
              title: "Any Topic",
              description: "From technology to arts, learn anything you want"
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/20 backdrop-blur-md border-t border-white/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-gray-600">Made with AI by</span>
            <span className="font-semibold text-gray-800">hariprasadmanoj3</span>
          </div>
          <p className="text-gray-500 text-sm">
            Transform your learning journey with AI-powered course generation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;