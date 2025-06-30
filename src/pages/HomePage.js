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
  Star,
  Play,
  ChevronDown,
  Clock,
  TrendingUp,
  Shield,
  Lightbulb,
  Rocket,
  Heart,
  CheckCircle,
  ArrowDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import apiService from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState({ totalCourses: 0, totalLearners: '10k+', avgRating: 4.8 });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await apiService.request('/api/courses/stats/');
      setStats(prev => ({
        ...prev,
        totalCourses: response.total_courses || 0
      }));
    } catch (error) {
      console.log('Stats loading failed, using defaults');
    }
  };

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
      const courseData = {
        topic: prompt.trim(),
        created_by: 'anonymous'
      };
      
      await apiService.createCourse(courseData);
      toast.success('🎉 Course generated successfully!');
      setPrompt('');
      navigate('/courses');
    } catch (error) {
      console.error('Course creation failed:', error);
      toast.error('Failed to generate course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { emoji: '🐍', text: 'Python for Beginners', color: 'from-green-500 to-blue-500', popularity: '95%' },
    { emoji: '⚛️', text: 'React.js Fundamentals', color: 'from-blue-500 to-cyan-500', popularity: '92%' }, 
    { emoji: '🤖', text: 'Machine Learning Basics', color: 'from-purple-500 to-pink-500', popularity: '89%' },
    { emoji: '📱', text: 'Mobile App Development', color: 'from-orange-500 to-red-500', popularity: '87%' },
    { emoji: '🎨', text: 'UI/UX Design Principles', color: 'from-pink-500 to-rose-500', popularity: '85%' },
    { emoji: '☁️', text: 'Cloud Computing', color: 'from-indigo-500 to-purple-500', popularity: '83%' }
  ];

  const features = [
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: 'Instant Generation', 
      desc: 'Create courses in seconds with AI-powered content generation',
      color: 'from-yellow-500 to-orange-600',
      stat: '< 30 sec'
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      title: 'Any Topic', 
      desc: 'Learn anything you want - from coding to cooking to creativity',
      color: 'from-blue-500 to-indigo-600',
      stat: '∞ Topics'
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: 'User-Friendly', 
      desc: 'Simple and intuitive interface designed for learners of all levels',
      color: 'from-green-500 to-emerald-600',
      stat: '99% Easy'
    },
    { 
      icon: <Award className="w-8 h-8" />, 
      title: 'High Quality', 
      desc: 'Comprehensive content with structured modules and clear objectives',
      color: 'from-purple-500 to-violet-600',
      stat: '4.9★ Rated'
    }
  ];

  const whyChooseUs = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Learning',
      desc: 'Advanced algorithms create personalized curriculum',
      benefit: 'Save 10+ hours of research'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Goal-Oriented Structure',
      desc: 'Clear learning paths with measurable outcomes',
      benefit: 'Achieve goals 3x faster'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Quality Assured',
      desc: 'Expert-reviewed content and best practices',
      benefit: '95% learner satisfaction'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Skill Enhancement',
      desc: 'Boost your career with in-demand skills',
      benefit: 'Increase earning potential'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Describe Your Goal',
      desc: 'Tell us what you want to learn in simple words',
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'AI Generates Course',
      desc: 'Our AI creates a comprehensive learning plan',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '03',
      title: 'Start Learning',
      desc: 'Access your personalized course immediately',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const testimonials = [
    { 
      name: 'Sarah Chen', 
      role: 'Software Developer', 
      text: 'Prompt2Course helped me learn React in just one weekend. The AI-generated content was incredibly comprehensive and well-structured!',
      avatar: '👩‍💻',
      rating: 5,
      course: 'React.js Fundamentals'
    },
    { 
      name: 'Miguel Rodriguez', 
      role: 'Marketing Manager', 
      text: 'I needed to understand data analytics quickly for my job. This platform created the perfect course tailored to my specific needs.',
      avatar: '👨‍💼',
      rating: 5,
      course: 'Data Analytics for Marketing'
    },
    { 
      name: 'Priya Patel', 
      role: 'Design Student', 
      text: 'The UI/UX design course was exactly what I needed. Clear explanations, practical examples, and beautifully structured modules.',
      avatar: '👩‍🎨',
      rating: 5,
      course: 'UI/UX Design Principles'
    }
  ];

  // Enhanced floating background elements
  const floatingElements = Array.from({ length: 15 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute rounded-full opacity-20 ${
        i % 4 === 0 ? 'bg-gradient-to-r from-blue-400 to-purple-600' :
        i % 4 === 1 ? 'bg-gradient-to-r from-pink-400 to-red-600' :
        i % 4 === 2 ? 'bg-gradient-to-r from-green-400 to-blue-600' :
        'bg-gradient-to-r from-yellow-400 to-orange-600'
      }`}
      style={{
        width: `${30 + Math.random() * 100}px`,
        height: `${30 + Math.random() * 100}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 10 + Math.random() * 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ));

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } font-sora`}>
      
      {/* Enhanced Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
        {/* Large Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-green-600/15 to-cyan-600/15 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>
      
      {/* Enhanced Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Prompt2Course
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  AI-Powered Learning
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.button
                onClick={() => navigate('/courses')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                My Courses
              </motion.button>
              <motion.button
                onClick={() => navigate('/about')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
              
              {/* Enhanced Theme Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </motion.button>
              
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="md:hidden mt-6 py-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20"
              >
                <div className="flex flex-col space-y-4 px-6">
                  {['My Courses', 'About', 'Contact'].map((item, index) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        navigate(item === 'My Courses' ? '/courses' : `/${item.toLowerCase()}`);
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-3 px-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4">
        
        {/* Enhanced Stats Bar */}
        <motion.div 
          className="flex justify-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-8 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 dark:border-gray-700/20 shadow-lg">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.totalCourses}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
            </motion.div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.totalLearners}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Learners</div>
            </motion.div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
            <motion.div 
              className="text-center flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mr-1">{stats.avgRating}</div>
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <div className="text-sm text-gray-600 dark:text-gray-400 ml-2">Rating</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Hero Content */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="text-8xl mb-8"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            🚀
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Learn Anything
            </span>
            <br />
            <span className="text-5xl md:text-7xl bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Transform any topic into a <span className="font-semibold text-blue-600 dark:text-blue-400">comprehensive learning course</span> with AI. 
            Just describe what you want to learn, and we'll create a <span className="font-semibold text-purple-600 dark:text-purple-400">personalized curriculum</span> for you.
          </p>

          {/* Enhanced Scroll indicator */}
          <motion.div
            className="flex justify-center mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center space-y-2">
              <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Scroll to explore</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Course Generation Form */}
        <motion.div 
          className="max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  🎯 What do you want to master today?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Advanced Python machine learning, Digital marketing for startups, Spanish conversation skills..."
                    className="w-full px-8 py-6 text-xl rounded-3xl border-3 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-lg"
                    disabled={isLoading}
                  />
                  <motion.div
                    className="absolute right-6 top-1/2 transform -translate-y-1/2"
                    animate={{ 
                      rotate: isLoading ? 360 : 0,
                      scale: isLoading ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      rotate: { duration: 1, repeat: isLoading ? Infinity : 0 },
                      scale: { duration: 0.5, repeat: isLoading ? Infinity : 0 }
                    }}
                  >
                    <Sparkles className={`w-8 h-8 ${isLoading ? 'text-blue-500' : 'text-gray-400'}`} />
                  </motion.div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-6 px-12 rounded-3xl text-xl transition-all duration-500 flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-[1.02]"
                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -3 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>✨ Creating your personalized course...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-8 h-8" />
                    <span>🚀 Generate My Course</span>
                    <ArrowRight className="w-8 h-8" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Enhanced Trending Suggestions */}
            <div className="mt-10">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-6 text-center">
                🔥 Trending learning topics:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.text}
                    onClick={() => setPrompt(suggestion.text)}
                    className={`p-4 bg-gradient-to-r ${suggestion.color} text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                      {suggestion.popularity}
                    </div>
                    <div className="text-2xl mb-2">{suggestion.emoji}</div>
                    <div>{suggestion.text}</div>
                    <div className="text-xs mt-1 opacity-75">Popular choice</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Features Grid with Stats */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5 rounded-3xl`} />
              
              <motion.div 
                className={`text-white mb-6 flex justify-center p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg relative z-10`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 relative z-10">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 relative z-10">
                {feature.desc}
              </p>
              <div className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent relative z-10`}>
                {feature.stat}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* NEW: How It Works Section */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How It Works ⚡
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Three simple steps to transform your learning journey
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
              >
                {/* Connecting Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 z-0" />
                )}
                
                {/* Step Circle */}
                <motion.div
                  className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-2xl relative z-10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-sm font-bold text-gray-800 dark:text-gray-200 shadow-lg">
                    {step.step}
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NEW: Why Choose Us Section */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Why Choose Prompt2Course? 🌟
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex items-start space-x-6 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white shadow-lg flex-shrink-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {item.desc}
                  </p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {item.benefit}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Testimonials Section */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Success Stories 💬
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            See how Prompt2Course has transformed learning for thousands of students
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2 + index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full -mr-10 -mt-10" />
                
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.4 + index * 0.2 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-3">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Course: {testimonial.course}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-white shadow-2xl relative overflow-hidden mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent transform rotate-12 scale-150" />
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full opacity-10" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full opacity-10" />
          </div>
          
          <div className="relative z-10">
            <motion.div
              className="text-8xl mb-8"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
            >
              🎓
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join <span className="font-bold">thousands of learners</span> who are accelerating their growth with AI-powered courses. 
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => navigate('/courses')}
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 inline-flex items-center space-x-3 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-6 h-6" />
                <span>Explore Courses</span>
              </motion.button>
              <motion.button
                onClick={() => document.querySelector('input')?.focus()}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 inline-flex items-center space-x-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6" />
                <span>Start Learning Now</span>
              </motion.button>
            </div>
            
            {/* Trust Indicators */}
            <motion.div 
              className="mt-12 flex justify-center items-center space-x-8 opacity-75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 3 }}
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-sm">Loved by 10k+ learners</span>
              </div>
              <div className="w-px h-6 bg-white/30" />
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">100% Free to start</span>
              </div>
              <div className="w-px h-6 bg-white/30" />
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Available 24/7</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HomePage;