import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Menu, 
  X, 
  Moon, 
  Sun,
  Zap,
  Users,
  Award,
  Globe,
  Brain,
  Target,
  Play,
  ChevronDown,
  Heart,
  Shield,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Please enter a learning topic!');
      return;
    }

    setIsLoading(true);
    
    try {
      const API_BASE = 'https://prompt2course-backend-1.onrender.com';
      
      const response = await fetch(`${API_BASE}/api/courses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Complete Guide to ${prompt.trim()}`,
          description: `Master ${prompt.trim()} with this comprehensive AI-generated course covering all essential concepts and practical applications.`,
          topic: prompt.trim(),
          created_by: 'hariprasadmanoj3'
        }),
      });

      if (response.ok) {
        const newCourse = await response.json();
        toast.success(`🎉 "${newCourse.title}" course created successfully!`);
        setPrompt('');
        navigate('/courses');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create course');
      }
    } catch (error) {
      console.error('Course creation failed:', error);
      toast.error(`Failed to create course: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: 'Instant Generation', 
      desc: 'Create courses in seconds with AI-powered content generation',
      color: 'from-yellow-500 to-orange-600'
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      title: 'Any Topic', 
      desc: 'Learn anything you want - no limitations on subject matter',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      title: 'User-Friendly', 
      desc: 'Simple and intuitive interface designed for easy learning',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: <Award className="w-6 h-6" />, 
      title: 'High Quality', 
      desc: 'Comprehensive content with structured modules and objectives',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Describe Your Topic',
      desc: 'Type anything you want to learn',
      icon: '💡'
    },
    {
      step: '02',
      title: 'AI Generates Course',
      desc: 'Get comprehensive learning materials instantly',
      icon: '🤖'
    },
    {
      step: '03',
      title: 'Start Learning',
      desc: 'Access videos, modules, and quizzes',
      icon: '🚀'
    }
  ];

  const realExamples = [
    'JavaScript Programming',
    'Digital Photography',
    'Guitar Playing Basics',
    'Spanish Language',
    'Machine Learning',
    'Cooking Fundamentals',
    'Investment Strategies',
    'Yoga for Beginners'
  ];

  // Simple floating elements (like the rocket you liked)
  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-4xl opacity-30"
      style={{
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {['🚀', '📚', '💡', '🎯', '✨', '🌟'][i]}
    </motion.div>
  ));

  return (
    <div className={`min-h-screen relative transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } font-sora`}>
      
      {/* Simple Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
      </div>
      
      {/* Clean Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Prompt2Course
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  AI-Powered Learning
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate('/courses')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                My Courses
              </button>
              <button
                onClick={() => navigate('/about')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/20"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/20"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 py-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/20"
              >
                <div className="flex flex-col space-y-2 px-4">
                  {['My Courses', 'About', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        navigate(item === 'My Courses' ? '/courses' : `/${item.toLowerCase()}`);
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 px-3 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/10"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4">
        
        {/* Clean Hero Section */}
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-6">🚀</div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Learn Anything
            </span>
            <br />
            <span className="text-4xl md:text-6xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform any topic into a comprehensive learning course with AI. 
            No limits - create courses on absolutely anything you want to learn.
          </p>
        </motion.div>

        {/* Course Generation Form */}
        <motion.div 
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  What do you want to learn today?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type anything: Quantum Physics, Bread Baking, Machine Learning, Guitar Playing..."
                    className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Sparkles className={`w-6 h-6 ${isLoading ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating your course...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate My Course</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Examples */}
            <div className="mt-8">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                Popular topics:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {realExamples.map((example) => (
                  <button
                    key={example}
                    onClick={() => setPrompt(example)}
                    className="p-2 text-sm bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid - Clean Version */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Simple How It Works */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Clean CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-5xl mb-6">🎓</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Learn Anything?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start your unlimited learning journey today. Create courses on any topic - completely free!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/courses')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl transition-colors inline-flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>View My Courses</span>
            </button>
            <button
              onClick={() => document.querySelector('input')?.focus()}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 rounded-xl transition-colors inline-flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Learning Now</span>
            </button>
          </div>
          
          {/* Simple Trust Indicators */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 opacity-80 text-sm">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Built for learners</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Available anytime</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HomePage;