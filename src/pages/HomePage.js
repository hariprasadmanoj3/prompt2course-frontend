import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Heart,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  Code,
  Rocket,
  Palette,
  Coffee,
  Camera,
  Music,
  User  // ← ADDED MISSING IMPORT
} from 'lucide-react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // API Configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://prompt2course-backend-1.onrender.com';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    console.log(`[2025-06-29 08:39:48] hariprasadmanoj3 creating course: "${prompt}"`);
    toast.loading('🤖 AI is creating your course...', { id: 'generating' });

    try {
      const course = await createCourse({
        topic: prompt.trim(),
        created_by: 'hariprasadmanoj3'
      });
      
      toast.success('✅ Course created successfully!', { id: 'generating' });
      console.log(`[2025-06-29 08:39:48] Course created with ID: ${course.id}`);
      
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
    { text: 'JavaScript Fundamentals', icon: '⚡', gradient: 'from-yellow-400 to-orange-500' },
    { text: 'Python for Beginners', icon: '🐍', gradient: 'from-green-400 to-blue-500' },
    { text: 'React.js Complete Guide', icon: '⚛️', gradient: 'from-blue-400 to-cyan-500' },
    { text: 'Machine Learning Basics', icon: '🤖', gradient: 'from-purple-400 to-pink-500' },
    { text: 'Digital Marketing', icon: '📱', gradient: 'from-pink-400 to-red-500' },
    { text: 'Photography Techniques', icon: '📸', gradient: 'from-indigo-400 to-purple-500' },
    { text: 'Data Science', icon: '📊', gradient: 'from-cyan-400 to-blue-500' },
    { text: 'Web Design', icon: '🎨', gradient: 'from-orange-400 to-pink-500' }
  ];

  const floatingElements = [
    { icon: '💡', delay: 0, duration: 6 },
    { icon: '🚀', delay: 1, duration: 8 },
    { icon: '⭐', delay: 2, duration: 7 },
    { icon: '🎯', delay: 3, duration: 9 },
    { icon: '✨', delay: 4, duration: 5 },
    { icon: '🔥', delay: 5, duration: 10 }
  ];

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const getFloatingPosition = (index) => {
    if (typeof window === 'undefined') {
      return { x: 100 + index * 200, y: 100 + index * 150 };
    }
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    };
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } font-sora relative overflow-hidden`}>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => {
          const initialPos = getFloatingPosition(index);
          return (
            <motion.div
              key={index}
              className="absolute text-4xl opacity-20"
              initial={{ 
                x: initialPos.x, 
                y: initialPos.y 
              }}
              animate={{
                x: [
                  initialPos.x,
                  initialPos.x + 200,
                  initialPos.x - 100,
                  initialPos.x
                ],
                y: [
                  initialPos.y,
                  initialPos.y - 150,
                  initialPos.y + 100,
                  initialPos.y
                ],
                rotate: [0, 360, 720]
              }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {element.icon}
            </motion.div>
          );
        })}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
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
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Get Started Button */}
              <motion.button
                onClick={() => navigate('/courses')}
                className="hidden md:flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 py-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20"
              >
                <nav className="flex flex-col space-y-4 px-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={() => {
                      navigate('/courses');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Status Bar */}
        <motion.div 
          className="flex items-center justify-between mb-8 p-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Backend: Online</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">User: hariprasadmanoj3</span>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {currentTime.toLocaleTimeString('en-US', { 
              hour12: true, 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Learning Platform</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent leading-tight"
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
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
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
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="prompt" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  What would you like to learn today?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., JavaScript fundamentals, machine learning, digital photography..."
                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
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
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            Popular Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularTopics.map((topic, index) => (
              <motion.button
                key={topic.text}
                onClick={() => handleTopicClick(topic.text)}
                className={`p-4 bg-gradient-to-br ${topic.gradient} text-white rounded-xl border border-white/30 hover:scale-105 transition-all duration-300 text-left group shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-2">{topic.icon}</div>
                <div className="font-medium group-hover:text-white transition-colors">
                  {topic.text}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {[
            {
              icon: <Zap className="w-8 h-8 text-yellow-500" />,
              title: "Instant Generation",
              description: "Get comprehensive courses generated in seconds with AI",
              gradient: "from-yellow-400 to-orange-500"
            },
            {
              icon: <Target className="w-8 h-8 text-green-500" />,
              title: "Personalized Content",
              description: "Every course is tailored to your specific learning goals",
              gradient: "from-green-400 to-blue-500"
            },
            {
              icon: <Globe className="w-8 h-8 text-blue-500" />,
              title: "Any Topic",
              description: "From technology to arts, learn anything you want",
              gradient: "from-blue-400 to-purple-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-8 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 group hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full mb-4 shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-white">
                  {feature.icon}
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          {[
            { number: "1000+", label: "Courses Generated", icon: "📚" },
            { number: "500+", label: "Happy Learners", icon: "😊" },
            { number: "50+", label: "Subject Areas", icon: "🎯" },
            { number: "99%", label: "Success Rate", icon: "⭐" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 py-8 mt-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-600 dark:text-gray-400">Made with AI by</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">hariprasadmanoj3</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Transform your learning journey with AI-powered course generation
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;