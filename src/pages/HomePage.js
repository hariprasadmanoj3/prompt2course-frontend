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
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState({ 
    totalCourses: 0, 
    totalLearners: 1, // Just the current user
    avgRating: 'New',
    loading: true 
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    loadRealStats();
  }, []);

  const loadRealStats = async () => {
    try {
      const API_BASE = 'https://prompt2course-backend-1.onrender.com';
      
      // Get REAL course count from backend
      const response = await fetch(`${API_BASE}/api/courses/`);
      const coursesData = await response.json();
      
      // Calculate REAL stats only
      const realStats = {
        totalCourses: coursesData.length || 0,
        totalLearners: 1, // Only current user (truthful)
        avgRating: coursesData.length > 0 ? 'Beta' : 'New',
        loading: false
      };
      
      setStats(realStats);
    } catch (error) {
      console.error('Error loading stats:', error);
      // Even on error, show truthful data
      setStats({
        totalCourses: 0,
        totalLearners: 1,
        avgRating: 'New',
        loading: false
      });
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
      const API_BASE = 'https://prompt2course-backend-1.onrender.com';
      
      // Create course with user's exact topic
      const response = await fetch(`${API_BASE}/api/courses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Complete Guide to ${prompt.trim()}`,
          description: `Master ${prompt.trim()} with this comprehensive AI-generated course covering all essential concepts and practical applications.`,
          topic: prompt.trim(),
          created_by: 'hariprasadmanoj3' // Real current user
        }),
      });

      if (response.ok) {
        const newCourse = await response.json();
        toast.success(`🎉 "${newCourse.title}" course created successfully!`);
        setPrompt('');
        
        // Update stats with real new count
        setStats(prev => ({
          ...prev,
          totalCourses: prev.totalCourses + 1,
          avgRating: 'Beta' // Now has content
        }));
        
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
      icon: <Zap className="w-8 h-8" />, 
      title: 'Instant Generation', 
      desc: 'Create courses in seconds with AI-powered content generation',
      color: 'from-yellow-500 to-orange-600',
      stat: '< 30 sec'
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      title: 'Any Topic', 
      desc: 'Learn anything you want - no limitations on subject matter',
      color: 'from-blue-500 to-indigo-600',
      stat: '∞ Topics'
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: 'User-Friendly', 
      desc: 'Simple and intuitive interface designed for easy learning',
      color: 'from-green-500 to-emerald-600',
      stat: 'Easy to Use'
    },
    { 
      icon: <Award className="w-8 h-8" />, 
      title: 'High Quality', 
      desc: 'Comprehensive content with structured modules and objectives',
      color: 'from-purple-500 to-violet-600',
      stat: 'AI-Powered'
    }
  ];

  const whyChooseUs = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Learning',
      desc: 'Advanced algorithms create personalized curriculum for any topic',
      benefit: 'Learn anything you want'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'No Limitations',
      desc: 'Create courses on absolutely any subject matter',
      benefit: 'Unlimited learning possibilities'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Free to Use',
      desc: 'Generate and access courses completely free',
      benefit: '100% Free platform'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Instant Access',
      desc: 'Start learning immediately after course generation',
      benefit: 'No waiting time'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Describe Your Topic',
      desc: 'Type anything you want to learn - from quantum physics to cooking',
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'AI Generates Course',
      desc: 'Our AI creates comprehensive learning materials instantly',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '03',
      title: 'Start Learning',
      desc: 'Access videos, modules, and quizzes immediately',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  // Real examples based on what users might actually want to learn
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

  // Floating background elements
  const floatingElements = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute rounded-full opacity-20 ${
        i % 4 === 0 ? 'bg-gradient-to-r from-blue-400 to-purple-600' :
        i % 4 === 1 ? 'bg-gradient-to-r from-pink-400 to-red-600' :
        i % 4 === 2 ? 'bg-gradient-to-r from-green-400 to-blue-600' :
        'bg-gradient-to-r from-yellow-400 to-orange-600'
      }`}
      style={{
        width: `${30 + Math.random() * 80}px`,
        height: `${30 + Math.random() * 80}px`,
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
        
        {/* REAL Stats Bar */}
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
              {stats.loading ? (
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">...</div>
              ) : (
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.totalCourses}</div>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stats.totalCourses === 1 ? 'Course Generated' : 'Courses Generated'}
              </div>
            </motion.div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.totalLearners}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stats.totalLearners === 1 ? 'User (You)' : 'Users'}
              </div>
            </motion.div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
            <motion.div 
              className="text-center flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.avgRating}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 ml-2">Platform</div>
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
            Transform <span className="font-semibold text-blue-600 dark:text-blue-400">any topic</span> into a comprehensive learning course with AI. 
            No limits - create courses on <span className="font-semibold text-purple-600 dark:text-purple-400">absolutely anything</span> you want to learn.
          </p>

          {/* Real-time course creation indicator */}
          {stats.totalCourses > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{stats.totalCourses} {stats.totalCourses === 1 ? 'course' : 'courses'} generated so far!</span>
            </motion.div>
          )}
        </motion.div>

        {/* Course Generation Form - Enhanced for unlimited topics */}
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
                  🎯 What do you want to learn today?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type ANYTHING: Quantum Physics, Bread Baking, Machine Learning, Guitar Playing, Business Strategy..."
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

            {/* Real examples section */}
            <div className="mt-10">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-6 text-center">
                ✨ No limits! Create courses on absolutely any topic
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {realExamples.map((example, index) => (
                  <motion.button
                    key={example}
                    onClick={() => setPrompt(example)}
                    className="p-3 bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    {example}
                  </motion.button>
                ))}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Or type anything else - cooking, sports, science, arts, business, technology...
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
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
              <div className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent relative z-10`}>
                {feature.stat}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
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

        {/* Why Choose Us Section */}
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

        {/* Enhanced CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-white shadow-2xl relative overflow-hidden mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
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
              Ready to Learn Anything?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Start your unlimited learning journey today. Create courses on any topic you can imagine - completely free!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => navigate('/courses')}
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 inline-flex items-center space-x-3 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-6 h-6" />
                <span>View My Courses</span>
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
              className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 opacity-75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 2.5 }}
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-sm">Built by {stats.totalLearners === 1 ? 'you' : 'learners'} like you</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30" />
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">100% Free to use</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30" />
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Available anytime</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HomePage;