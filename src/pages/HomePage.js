import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Plus, 
  Star,
  Sparkles,
  Zap,
  Brain,
  Target,
  Globe,
  Lightbulb,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // API Configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://prompt2course-backend-1.onrender.com';

  // API function to create course
  const createCourse = async (courseData) => {
    try {
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
    console.log(`[2025-06-29 07:18:41] hariprasadmanoj3 creating course: "${prompt}"`);
    toast.loading('🤖 AI is creating your course...', { id: 'generating' });

    try {
      const course = await createCourse({
        topic: prompt.trim(),
        created_by: 'hariprasadmanoj3'
      });
      
      toast.success('✅ Course created successfully!', { id: 'generating' });
      console.log(`[2025-06-29 07:18:41] Course created with ID: ${course.id}`);
      
      setPrompt('');
      navigate('/courses');
    } catch (error) {
      console.error('Error creating course:', error);
      
      if (error.message.includes('Failed to fetch')) {
        toast.error('❌ Unable to connect to server. Please try again later.', { id: 'generating' });
      } else {
        toast.error('❌ Failed to create course. Please try again.', { id: 'generating' });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTopicClick = (topic) => {
    setPrompt(topic);
    setTimeout(() => {
      const input = document.querySelector('input[type="text"]');
      if (input) input.focus();
    }, 100);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sora">
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-white/10 backdrop-blur-md border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Prompt2Course
              </h1>
            </motion.div>
            
            <motion.button
              onClick={() => navigate('/courses')}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Courses
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Learning Platform</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transform Ideas into
            <motion.span 
              className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Complete Courses
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Simply describe what you want to learn, and our AI will generate a comprehensive, 
            structured course tailored to your needs. From beginner basics to advanced concepts.
          </motion.p>
        </motion.div>

        {/* Course Generator Form */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="prompt" className="block text-lg font-semibold text-gray-800 mb-4">
                  What would you like to learn today?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., JavaScript fundamentals, machine learning, digital photography..."
                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-white/90 backdrop-blur-sm"
                    disabled={isGenerating}
                  />
                  <motion.div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    animate={{ rotate: isGenerating ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isGenerating ? Infinity : 0 }}
                  >
                    <Brain className="w-6 h-6 text-blue-500" />
                  </motion.div>
                </div>
              </div>
              
              <motion.button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-3">
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Generating Course...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Plus className="w-5 h-5" />
                    <span>Generate Course</span>
                  </div>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Popular Topics */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Popular Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularTopics.map((topic, index) => (
              <motion.button
                key={topic.text}
                onClick={() => handleTopicClick(topic.text)}
                className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300 text-left group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-2">{topic.icon}</div>
                <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {topic.text}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
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
            <motion.div
              key={feature.title}
              className="text-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-white/20 backdrop-blur-md border-t border-white/20 py-8 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
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
      </motion.footer>
    </div>
  );
};

export default HomePage;