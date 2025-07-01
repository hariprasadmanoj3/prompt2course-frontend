import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  User, 
  Calendar, 
  Search, 
  Grid,
  List,
  Eye,
  Plus,
  Moon,
  Sun,
  Sparkles,
  ArrowRight,
  Trash2,
  Filter,
  SortAsc,
  Heart,
  Target,
  Zap,
  Brain,
  Coffee,
  Rocket,
  Star,
  Award,
  CheckCircle,
  BarChart3,
  Trophy,
  Lightbulb,
  TrendingUp,
  BookMarked,
  GraduationCap,
  Infinity,
  Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [newCourseTopic, setNewCourseTopic] = useState('');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    const savedViewMode = localStorage.getItem('courseViewMode');
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
    
    fetchCourses();
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

  const setViewModeWithStorage = (mode) => {
    setViewMode(mode);
    localStorage.setItem('courseViewMode', mode);
  };

  const fetchCourses = async () => {
    try {
      const API_BASE = 'https://prompt2course-backend-1.onrender.com';
      const response = await fetch(`${API_BASE}/api/courses/`);
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        
        if (data.length === 0) {
          setTimeout(() => {
            toast.success('🎉 Welcome to Prompt2Course! Create your first course to get started.');
          }, 1000);
        }
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const createNewCourse = async (e) => {
    e.preventDefault();
    
    if (!newCourseTopic.trim()) {
      toast.error('Please enter a topic for your course!');
      return;
    }

    if (newCourseTopic.trim().length < 3) {
      toast.error('Course topic must be at least 3 characters long');
      return;
    }

    if (newCourseTopic.trim().length > 100) {
      toast.error('Course topic must be less than 100 characters');
      return;
    }

    const duplicateCourse = courses.find(course => 
      course.topic.toLowerCase().trim() === newCourseTopic.toLowerCase().trim()
    );
    
    if (duplicateCourse) {
      toast.error(`A course on "${newCourseTopic}" already exists!`);
      return;
    }

    setIsCreatingCourse(true);
    
    try {
      const API_BASE = 'https://prompt2course-backend-1.onrender.com';
      
      const topicTrimmed = newCourseTopic.trim();
      
      const response = await fetch(`${API_BASE}/api/courses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Complete Guide to ${topicTrimmed}`,
          description: `Master ${topicTrimmed} with this comprehensive AI-generated course covering all essential concepts, practical applications, and real-world examples.`,
          topic: topicTrimmed,
          created_by: 'hariprasadmanoj3'
        }),
      });

      if (response.ok) {
        const newCourse = await response.json();
        toast.success(`🎉 "${newCourse.title}" course created successfully!`);
        setNewCourseTopic('');
        setShowNewCourseForm(false);
        
        setCourses(prev => [newCourse, ...prev]);
        
        setTimeout(() => {
          navigate(`/course/${newCourse.id}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create course');
      }
    } catch (error) {
      console.error('Course creation failed:', error);
      toast.error(`Failed to create course: ${error.message}`);
    } finally {
      setIsCreatingCourse(false);
    }
  };

  const deleteCourse = async (courseId, courseTitle) => {
    const confirmMessage = `Are you sure you want to delete "${courseTitle}"?\n\nThis action cannot be undone.`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const API_BASE = 'https://prompt2course-backend-1.onrender.com';
      const response = await fetch(`${API_BASE}/api/courses/${courseId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success(`✅ Course "${courseTitle}" deleted successfully!`);
        setCourses(prev => prev.filter(course => course.id !== courseId));
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course. Please try again.');
    }
  };

  const getCourseCategory = (topic) => {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('programming') || topicLower.includes('coding') || 
        topicLower.includes('javascript') || topicLower.includes('python') || 
        topicLower.includes('react') || topicLower.includes('web') || 
        topicLower.includes('software') || topicLower.includes('css')) {
      return 'Technology';
    }
    
    if (topicLower.includes('machine learning') || topicLower.includes('ai') || 
        topicLower.includes('data science') || topicLower.includes('analytics')) {
      return 'AI & Data';
    }
    
    if (topicLower.includes('design') || topicLower.includes('art') || 
        topicLower.includes('photography') || topicLower.includes('creative')) {
      return 'Creative';
    }
    
    if (topicLower.includes('business') || topicLower.includes('marketing') || 
        topicLower.includes('finance') || topicLower.includes('investment')) {
      return 'Business';
    }
    
    if (topicLower.includes('cooking') || topicLower.includes('baking') || 
        topicLower.includes('culinary') || topicLower.includes('food')) {
      return 'Culinary';
    }
    
    if (topicLower.includes('fitness') || topicLower.includes('yoga') || 
        topicLower.includes('health') || topicLower.includes('wellness')) {
      return 'Health';
    }
    
    if (topicLower.includes('language') || topicLower.includes('spanish') || 
        topicLower.includes('french') || topicLower.includes('communication')) {
      return 'Languages';
    }
    
    if (topicLower.includes('music') || topicLower.includes('guitar') || 
        topicLower.includes('piano') || topicLower.includes('instrument')) {
      return 'Music';
    }
    
    if (topicLower.includes('science') || topicLower.includes('physics') || 
        topicLower.includes('chemistry') || topicLower.includes('quantum')) {
      return 'Science';
    }
    
    return 'Lifestyle';
  };

  const getCourseDifficulty = (topic) => {
    const topicLower = topic.toLowerCase();
    
    const advancedKeywords = [
      'advanced', 'expert', 'professional', 'master',
      'machine learning', 'deep learning', 'neural networks', 'ai',
      'quantum', 'blockchain', 'cryptocurrency', 'trading',
      'enterprise', 'architecture', 'algorithms'
    ];
    
    const intermediateKeywords = [
      'intermediate', 'practical', 'comprehensive',
      'javascript', 'python', 'react', 'programming',
      'web design', 'css', 'html', 'database',
      'marketing', 'business', 'photography', 'design'
    ];
    
    const beginnerKeywords = [
      'basics', 'fundamentals', 'introduction', 'beginner',
      'getting started', 'first', 'basic', 'simple',
      'cooking', 'baking', 'guitar', 'yoga', 'fitness'
    ];
    
    if (advancedKeywords.some(keyword => topicLower.includes(keyword))) {
      return 'Advanced';
    }
    
    if (intermediateKeywords.some(keyword => topicLower.includes(keyword))) {
      return 'Intermediate';
    }
    
    if (beginnerKeywords.some(keyword => topicLower.includes(keyword))) {
      return 'Beginner';
    }
    
    return 'Intermediate';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': 
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': 
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': 
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: 
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getCourseIcon = (topic) => {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('javascript')) return '💛';
    if (topicLower.includes('python')) return '🐍';
    if (topicLower.includes('react')) return '⚛️';
    if (topicLower.includes('web') || topicLower.includes('css')) return '🌐';
    if (topicLower.includes('machine learning') || topicLower.includes('ai')) return '🤖';
    if (topicLower.includes('design')) return '🎨';
    if (topicLower.includes('photography')) return '📸';
    if (topicLower.includes('music') || topicLower.includes('guitar')) return '🎵';
    if (topicLower.includes('cooking') || topicLower.includes('baking')) return '👨‍🍳';
    if (topicLower.includes('spanish')) return '🇪🇸';
    if (topicLower.includes('french')) return '🇫🇷';
    if (topicLower.includes('yoga')) return '🧘‍♀️';
    if (topicLower.includes('business')) return '💼';
    if (topicLower.includes('investment')) return '💰';
    if (topicLower.includes('science') || topicLower.includes('physics')) return '⚛️';
    
    return '📚';
  };

  const getCourseProgress = (course) => {
    const now = new Date();
    const created = new Date(course.created_at);
    const daysSinceCreation = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    
    const seed = course.id || 0;
    const random = Math.sin(seed) * 10000;
    const baseProgress = Math.floor((random - Math.floor(random)) * 80);
    
    const ageBonus = Math.min(daysSinceCreation * 3, 15);
    const totalProgress = Math.min(baseProgress + ageBonus, 95);
    
    return Math.max(5, totalProgress);
  };

  const getFilteredAndSortedCourses = () => {
    let filtered = courses.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const difficulty = getCourseDifficulty(course.topic);
      const matchesDifficulty = difficultyFilter === 'all' || difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      
      const category = getCourseCategory(course.topic);
      const matchesCategory = categoryFilter === 'all' || category.toLowerCase() === categoryFilter.toLowerCase();
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'topic':
          return a.topic.localeCompare(b.topic);
        case 'progress':
          return getCourseProgress(b) - getCourseProgress(a);
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return difficultyOrder[getCourseDifficulty(a.topic)] - difficultyOrder[getCourseDifficulty(b.topic)];
        default:
          return 0;
      }
    });
  };

  const filteredCourses = getFilteredAndSortedCourses();

  const calculateStats = () => {
    if (courses.length === 0) return null;
    
    const totalProgress = courses.reduce((sum, course) => sum + getCourseProgress(course), 0);
    const avgProgress = Math.round(totalProgress / courses.length);
    
    const completed = courses.filter(course => getCourseProgress(course) >= 90).length;
    const inProgress = courses.filter(course => {
      const progress = getCourseProgress(course);
      return progress > 10 && progress < 90;
    }).length;
    
    const categories = [...new Set(courses.map(course => getCourseCategory(course.topic)))];
    
    return {
      total: courses.length,
      completed,
      inProgress,
      avgProgress,
      categories: categories.length,
      latestCourse: courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
    };
  };

  const stats = calculateStats();

  const inspiringExamples = {
    'Technology & Programming': [
      'Machine Learning with Python',
      'React.js for Modern Web Apps',
      'Quantum Computing Fundamentals',
      'Full-Stack Development',
      'Mobile App Creation',
      'Cloud Computing Basics'
    ],
    'Creative Arts & Design': [
      'Digital Photography Mastery',
      'UI/UX Design Principles',
      'Watercolor Painting',
      'Video Production',
      'Graphic Design',
      'Creative Writing'
    ],
    'Cooking & Culinary': [
      'Artisan Bread Baking',
      'Italian Cuisine',
      'Japanese Cooking',
      'Pastry Fundamentals',
      'Wine Appreciation',
      'Healthy Meal Prep'
    ],
    'Languages & Communication': [
      'Spanish Conversation',
      'French for Travelers',
      'Public Speaking',
      'Business Writing',
      'Sign Language',
      'English Grammar'
    ],
    'Health & Wellness': [
      'Yoga for Beginners',
      'Meditation Guide',
      'Fitness Training',
      'Nutrition Science',
      'Mental Health',
      'Sleep Optimization'
    ],
    'Business & Finance': [
      'Investment Strategies',
      'Digital Marketing',
      'Entrepreneurship',
      'Personal Finance',
      'E-commerce Setup',
      'Leadership Skills'
    ]
  };

  const floatingElements = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-2xl opacity-15"
      style={{
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 15, -15, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    >
      {['📚', '🎯', '✨', '🚀', '💡', '🌟', '🔥', '⭐'][i]}
    </motion.div>
  ));

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
      }`}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Loading Your Learning Universe
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Gathering your courses...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } font-sora`}>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-gradient-to-r from-pink-400/8 to-orange-400/8 rounded-full blur-3xl" />
      </div>
      
      <motion.header 
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-lg"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </motion.button>
            
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  My Learning Universe
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                  <span>{courses.length} {courses.length === 1 ? 'course' : 'courses'} in your collection</span>
                  {courses.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Infinity className="w-3 h-3 text-blue-500" />
                        <span>Limitless potential</span>
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setShowNewCourseForm(true)}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Create Course</span>
                <span className="sm:hidden">New</span>
              </motion.button>
              
              <motion.button
                onClick={toggleDarkMode}
                className="p-4 rounded-2xl bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 border border-white/30 dark:border-gray-700/30"
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
                      <Sun className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-6 h-6 text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        
        {stats && showStats && (
          <motion.div 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <span>Learning Statistics</span>
              </h2>
              <motion.button
                onClick={() => setShowStats(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Courses</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.avgProgress}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.categories}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-2xl">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {getCourseIcon(stats.latestCourse.topic)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Latest Topic</div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by title, topic, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-12 py-5 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
              />
              {searchTerm && (
                <motion.button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-5 py-4 pr-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="newest">📅 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                  <option value="alphabetical">🔤 A-Z</option>
                  <option value="topic">📚 By Topic</option>
                  <option value="progress">📊 By Progress</option>
                  <option value="difficulty">⭐ By Difficulty</option>
                </select>
                <SortAsc className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="appearance-none px-5 py-4 pr-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">🟢 Beginner</option>
                  <option value="intermediate">🟡 Intermediate</option>
                  <option value="advanced">🔴 Advanced</option>
                </select>
                <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 border border-gray-200 dark:border-gray-600">
                <motion.button
                  onClick={() => setViewModeWithStorage('grid')}
                  className={`p-4 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-md' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewModeWithStorage('list')}
                  className={`p-4 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-md' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
          
          {(searchTerm || difficultyFilter !== 'all') && (
            <motion.div 
              className="mt-6 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active filters:</span>
              {searchTerm && (
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  🔍 "{searchTerm}"
                </span>
              )}
              {difficultyFilter !== 'all' && (
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm capitalize">
                  ⭐ {difficultyFilter} Level
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setDifficultyFilter('all');
                }}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </motion.div>

        {courses.length > 0 && (
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-600 dark:text-gray-400">
              {filteredCourses.length === courses.length 
                ? `Showing all ${courses.length} ${courses.length === 1 ? 'course' : 'courses'}`
                : `Showing ${filteredCourses.length} of ${courses.length} ${courses.length === 1 ? 'course' : 'courses'}`
              }
            </p>
          </motion.div>
        )}

        {filteredCourses.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {courses.length === 0 ? (
              <>
                <motion.div 
                  className="text-9xl mb-8"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🚀
                </motion.div>
                <h3 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                  Welcome to Your Learning Universe!
                </h3>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed">
                  Create comprehensive learning experiences for any topic you can imagine - from quantum physics to bread baking, 
                  from machine learning to guitar playing. Your journey of unlimited knowledge starts here!
                </p>
                
                <motion.button
                  onClick={() => setShowNewCourseForm(true)}
                  className="inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 text-xl font-bold shadow-2xl hover:shadow-3xl mb-16"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-6 h-6" />
                  <span>Create Your First Course</span>
                  <Rocket className="w-6 h-6" />
                </motion.button>
                
                <motion.div 
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 max-w-6xl mx-auto shadow-xl border border-white/20 dark:border-gray-700/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                    ✨ Get Inspired - Explore These Topics
                  </h4>
                  
                  <div className="space-y-8">
                    {Object.entries(inspiringExamples).map(([category, examples], categoryIndex) => (
                      <motion.div 
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + categoryIndex * 0.1 }}
                      >
                        <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-left">
                          {category}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {examples.map((example, index) => (
                            <motion.button
                              key={index}
                              onClick={() => {
                                setNewCourseTopic(example);
                                setShowNewCourseForm(true);
                              }}
                              className="p-4 text-sm bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 transition-all duration-200 text-left hover:shadow-lg"
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{getCourseIcon(example)}</span>
                                <span className="font-medium">{example}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      💡 <strong>Or create something completely unique!</strong> Our AI can generate courses on virtually any topic you can imagine.
                    </p>
                  </motion.div>
                </motion.div>
              </>
            ) : (
              <>
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  No courses match your search
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Try adjusting your filters or create a new course on this topic!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setDifficultyFilter('all');
                    }}
                    className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setShowNewCourseForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Create New Course
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div 
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' 
                : 'grid-cols-1 max-w-5xl mx-auto'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {filteredCourses.map((course, index) => {
              const progress = getCourseProgress(course);
              const difficulty = getCourseDifficulty(course.topic);
              const courseIcon = getCourseIcon(course.topic);
              
              return (
                <motion.div
                  key={course.id}
                  className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden hover:shadow-2xl transition-all duration-500 group ${
                    viewMode === 'list' ? 'flex items-center p-6' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                >
                  <div className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${
                    viewMode === 'list' ? 'w-20 h-20 rounded-2xl mr-6 flex-shrink-0' : 'h-48'
                  } flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-5xl relative z-10">{courseIcon}</div>
                    {viewMode !== 'list' && (
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(difficulty)}`}>
                          {difficulty}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className={`${viewMode === 'list' ? 'flex-1' : 'p-8'}`}>
                    <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                      <div className={viewMode === 'list' ? 'flex-1 pr-6' : ''}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className={`font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                              viewMode === 'list' ? 'text-xl' : 'text-2xl'
                            }`}>
                              {course.title}
                            </h3>
                            {viewMode === 'list' && (
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${getDifficultyColor(difficulty)}`}>
                                {difficulty}
                              </span>
                            )}
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                {course.topic}
                              </span>
                            </div>
                          </div>
                          
                          <motion.button
                            onClick={() => deleteCourse(course.id, course.title)}
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                        
                        <p className={`text-gray-600 dark:text-gray-400 leading-relaxed mb-6 ${
                          viewMode === 'list' ? 'text-sm line-clamp-2' : 'text-base'
                        }`}>
                          {course.description}
                        </p>
                        
                        <div className="mb-6">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Learning Progress</span>
                            <span className="text-gray-800 dark:text-gray-200 font-bold">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <motion.div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{course.created_by}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(course.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>~6-8h</span>
                            </div>
                          </div>
                          {progress >= 90 && (
                            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-medium">Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
                        <motion.button
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-5 h-5" />
                          <span>View Course</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {showNewCourseForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowNewCourseForm(false);
                setNewCourseTopic('');
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/20 dark:border-gray-700/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Create New Course
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    What amazing topic would you like to master today?
                  </p>
                </div>
                
                <form onSubmit={createNewCourse} className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Course Topic
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newCourseTopic}
                        onChange={(e) => setNewCourseTopic(e.target.value)}
                        placeholder="e.g., Quantum Physics Fundamentals, Artisan Bread Baking, Guitar Playing Mastery..."
                        className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                        disabled={isCreatingCourse}
                        autoFocus
                        maxLength={100}
                      />
                      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                        {newCourseTopic.length}/100
                      </div>
                    </div>
                  </div>
                  
                  {newCourseTopic.trim().length > 3 && (
                    <motion.div 
                      className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Course Preview:</h4>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getCourseIcon(newCourseTopic)}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Complete Guide to {newCourseTopic.trim()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(getCourseDifficulty(newCourseTopic))}`}>
                          {getCourseDifficulty(newCourseTopic)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Estimated 6-8 hours • AI-Generated Content
                        </span>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      type="button"
                      onClick={() => {
                        setShowNewCourseForm(false);
                        setNewCourseTopic('');
                      }}
                      className="flex-1 px-6 py-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isCreatingCourse}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isCreatingCourse || newCourseTopic.trim().length < 3}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 font-semibold shadow-lg"
                      whileHover={{ scale: isCreatingCourse ? 1 : 1.02 }}
                      whileTap={{ scale: isCreatingCourse ? 1 : 0.98 }}
                    >
                      {isCreatingCourse ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Creating Course...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Create Course</span>
                          <Rocket className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
                
                {!newCourseTopic && (
                  <motion.div 
                    className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      ⚡ Quick starts:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Machine Learning Basics',
                        'Italian Cooking',
                        'Guitar for Beginners',
                        'Digital Photography',
                        'Spanish Conversation',
                        'Yoga & Wellness'
                      ].map((example, index) => (
                        <motion.button
                          key={example}
                          onClick={() => setNewCourseTopic(example)}
                          className="p-3 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-gray-700 dark:text-gray-300 transition-colors text-left"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                        >
                          {example}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesPage;