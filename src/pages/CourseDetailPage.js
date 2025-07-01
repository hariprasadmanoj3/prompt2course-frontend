import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  User, 
  Calendar, 
  Play,
  CheckCircle,
  Moon,
  Sun,
  Star,
  Award,
  Target,
  Zap,
  Brain,
  Coffee,
  Rocket,
  Users,
  Globe,
  Download,
  Bookmark,
  Share2,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  PlayCircle,
  FileText,
  HelpCircle,
  BarChart3,
  TrendingUp,
  Heart,
  Eye,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  ChevronUp,
  Lightbulb,
  GraduationCap,
  Shield,
  Infinity,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    fetchCourseDetails();
    loadUserProgress();
  }, [courseId]);

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

  const fetchCourseDetails = async () => {
    try {
      const API_BASE = 'https://prompt2course-backend-1.onrender.com';
      const response = await fetch(`${API_BASE}/api/courses/${courseId}/`);
      
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
        
        // Show welcome message
        setTimeout(() => {
          toast.success(`🎉 Welcome to "${data.title}"! Ready to start learning?`);
        }, 1000);
      } else {
        throw new Error('Course not found');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Failed to load course. Please check your connection.');
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = () => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem(`course_${courseId}_progress`);
    const savedCompleted = localStorage.getItem(`course_${courseId}_completed`);
    const savedBookmark = localStorage.getItem(`course_${courseId}_bookmarked`);
    const savedRating = localStorage.getItem(`course_${courseId}_rating`);
    
    if (savedProgress) {
      setCourseProgress(parseInt(savedProgress));
    }
    
    if (savedCompleted) {
      setCompletedLessons(new Set(JSON.parse(savedCompleted)));
    }
    
    if (savedBookmark === 'true') {
      setIsBookmarked(true);
    }
    
    if (savedRating) {
      setUserRating(parseInt(savedRating));
    }
  };

  const saveUserProgress = () => {
    localStorage.setItem(`course_${courseId}_progress`, courseProgress.toString());
    localStorage.setItem(`course_${courseId}_completed`, JSON.stringify([...completedLessons]));
    localStorage.setItem(`course_${courseId}_bookmarked`, isBookmarked.toString());
    localStorage.setItem(`course_${courseId}_rating`, userRating.toString());
  };

  useEffect(() => {
    saveUserProgress();
  }, [courseProgress, completedLessons, isBookmarked, userRating]);

  // Enhanced course difficulty detection
  const getCourseDifficulty = (topic) => {
    const topicLower = topic.toLowerCase();
    
    const advancedKeywords = [
      'advanced', 'expert', 'professional', 'master', 'mastery',
      'machine learning', 'deep learning', 'neural networks', 'ai',
      'quantum', 'blockchain', 'cryptocurrency', 'trading',
      'enterprise', 'architecture', 'algorithms', 'data structures',
      'calculus', 'statistics', 'research', 'phd', 'doctoral'
    ];
    
    const intermediateKeywords = [
      'intermediate', 'practical', 'applied', 'comprehensive',
      'javascript', 'python', 'react', 'programming', 'development',
      'web design', 'css', 'html', 'database', 'sql', 'api',
      'marketing', 'business', 'strategy', 'management', 'analytics',
      'photography', 'design', 'photoshop', 'video editing'
    ];
    
    const beginnerKeywords = [
      'basics', 'fundamentals', 'introduction', 'beginner', 'getting started',
      'first', 'basic', 'simple', 'easy', 'starter', 'guide',
      'cooking', 'baking', 'guitar', 'piano', 'yoga', 'fitness',
      'language learning', 'spanish', 'french', 'drawing', 'painting'
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
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-200 dark:border-green-700';
      case 'Intermediate': 
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700';
      case 'Advanced': 
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-700';
      default: 
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600';
    }
  };

  // Enhanced course icon mapping
  const getCourseIcon = (topic) => {
    const topicLower = topic.toLowerCase();
    
    // Programming & Tech
    if (topicLower.includes('javascript') || topicLower.includes('js')) return '💛';
    if (topicLower.includes('python')) return '🐍';
    if (topicLower.includes('react') || topicLower.includes('angular') || topicLower.includes('vue')) return '⚛️';
    if (topicLower.includes('web') || topicLower.includes('css') || topicLower.includes('html')) return '🌐';
    if (topicLower.includes('database') || topicLower.includes('sql')) return '🗄️';
    if (topicLower.includes('api') || topicLower.includes('backend')) return '⚙️';
    if (topicLower.includes('mobile') || topicLower.includes('app')) return '📱';
    
    // AI & Data Science
    if (topicLower.includes('machine learning') || topicLower.includes('ml')) return '🤖';
    if (topicLower.includes('ai') || topicLower.includes('artificial intelligence')) return '🧠';
    if (topicLower.includes('data science') || topicLower.includes('analytics')) return '📊';
    if (topicLower.includes('neural') || topicLower.includes('deep learning')) return '🔬';
    
    // Creative Arts
    if (topicLower.includes('design') || topicLower.includes('ui') || topicLower.includes('ux')) return '🎨';
    if (topicLower.includes('photography') || topicLower.includes('photo')) return '📸';
    if (topicLower.includes('music') || topicLower.includes('audio')) return '🎵';
    if (topicLower.includes('guitar')) return '🎸';
    if (topicLower.includes('piano')) return '🎹';
    
    // Cooking & Food
    if (topicLower.includes('cooking') || topicLower.includes('culinary')) return '👨‍🍳';
    if (topicLower.includes('baking') || topicLower.includes('bread')) return '🍞';
    
    // Languages
    if (topicLower.includes('spanish')) return '🇪🇸';
    if (topicLower.includes('french')) return '🇫🇷';
    if (topicLower.includes('italian') && !topicLower.includes('food')) return '🇮🇹';
    if (topicLower.includes('german')) return '🇩🇪';
    if (topicLower.includes('japanese') && !topicLower.includes('food')) return '🇯🇵';
    if (topicLower.includes('chinese') || topicLower.includes('mandarin')) return '🇨🇳';
    
    // Health & Fitness
    if (topicLower.includes('yoga')) return '🧘‍♀️';
    if (topicLower.includes('fitness') || topicLower.includes('workout')) return '💪';
    if (topicLower.includes('meditation')) return '🕯️';
    
    // Business & Finance
    if (topicLower.includes('business') || topicLower.includes('entrepreneurship')) return '💼';
    if (topicLower.includes('marketing')) return '📈';
    if (topicLower.includes('investment') || topicLower.includes('stocks')) return '💰';
    if (topicLower.includes('crypto') || topicLower.includes('bitcoin')) return '₿';
    
    // Science
    if (topicLower.includes('quantum') || topicLower.includes('physics')) return '⚛️';
    if (topicLower.includes('chemistry')) return '🧪';
    if (topicLower.includes('biology')) return '🧬';
    if (topicLower.includes('mathematics') || topicLower.includes('math')) return '📐';
    
    // Default fallback
    return '📚';
  };

  // Generate realistic course content
  const generateCourseContent = (course) => {
    const topic = course.topic;
    const difficulty = getCourseDifficulty(topic);
    
    // Base course structure
    const baseModules = [
      {
        id: 1,
        title: `Introduction to ${topic}`,
        description: 'Overview and basic concepts',
        lessons: [
          { id: 1, title: `What is ${topic}?`, duration: '8 min', type: 'video' },
          { id: 2, title: 'Course Overview and Objectives', duration: '5 min', type: 'video' },
          { id: 3, title: 'Prerequisites and Setup', duration: '10 min', type: 'text' },
          { id: 4, title: 'Getting Started Guide', duration: '12 min', type: 'video' }
        ]
      },
      {
        id: 2,
        title: 'Core Concepts',
        description: 'Deep dive into fundamental principles',
        lessons: [
          { id: 5, title: 'Key Principles and Theory', duration: '15 min', type: 'video' },
          { id: 6, title: 'Practical Examples', duration: '18 min', type: 'video' },
          { id: 7, title: 'Common Patterns and Techniques', duration: '12 min', type: 'text' },
          { id: 8, title: 'Hands-on Exercise', duration: '25 min', type: 'practice' }
        ]
      },
      {
        id: 3,
        title: 'Advanced Topics',
        description: 'Advanced concepts and real-world applications',
        lessons: [
          { id: 9, title: 'Advanced Techniques', duration: '20 min', type: 'video' },
          { id: 10, title: 'Best Practices', duration: '15 min', type: 'video' },
          { id: 11, title: 'Industry Case Studies', duration: '22 min', type: 'text' },
          { id: 12, title: 'Project Implementation', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 4,
        title: 'Practical Application',
        description: 'Real-world projects and portfolio development',
        lessons: [
          { id: 13, title: 'Building Your First Project', duration: '30 min', type: 'practice' },
          { id: 14, title: 'Testing and Optimization', duration: '18 min', type: 'video' },
          { id: 15, title: 'Portfolio Development', duration: '25 min', type: 'text' },
          { id: 16, title: 'Final Project Showcase', duration: '20 min', type: 'practice' }
        ]
      }
    ];

    // Generate curated YouTube videos based on topic
    const videos = generateTopicVideos(topic);
    
    // Generate quiz questions
    const quiz = generateQuizQuestions(topic, difficulty);
    
    return {
      modules: baseModules,
      videos: videos,
      quiz: quiz,
      totalDuration: '6-8 hours',
      totalLessons: 16,
      totalModules: 4
    };
  };

  const generateTopicVideos = (topic) => {
    // This would normally fetch real YouTube videos via API
    // For now, we'll generate realistic video data
    const topicLower = topic.toLowerCase();
    
    const baseVideos = [
      {
        id: 'video1',
        title: `${topic} - Complete Beginner's Guide`,
        thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
        duration: '15:32',
        views: '1.2M',
        channel: 'LearnWithExperts',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'video2',
        title: `Master ${topic} in 2024 - Full Course`,
        thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
        duration: '45:18',
        views: '890K',
        channel: 'TechEducation',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'video3',
        title: `${topic} Tutorial - Step by Step`,
        thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
        duration: '28:45',
        views: '654K',
        channel: 'SkillBuilder',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'video4',
        title: `Advanced ${topic} Techniques`,
        thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
        duration: '32:12',
        views: '423K',
        channel: 'ProLearning',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ];

    return baseVideos;
  };

  const generateQuizQuestions = (topic, difficulty) => {
    const questions = [
      {
        id: 1,
        question: `What is the primary benefit of learning ${topic}?`,
        options: [
          'Personal development and skill enhancement',
          'Career advancement opportunities',
          'Creative expression and problem-solving',
          'All of the above'
        ],
        correct: 3,
        explanation: `Learning ${topic} provides comprehensive benefits including personal growth, career opportunities, and creative development.`
      },
      {
        id: 2,
        question: `Which approach is most effective when starting with ${topic}?`,
        options: [
          'Jump into advanced concepts immediately',
          'Start with fundamentals and build progressively',
          'Focus only on theoretical knowledge',
          'Learn everything through trial and error'
        ],
        correct: 1,
        explanation: 'Building a strong foundation with fundamentals ensures better understanding and long-term success.'
      },
      {
        id: 3,
        question: `What is a key principle in ${topic}?`,
        options: [
          'Consistency and regular practice',
          'Understanding core concepts thoroughly',
          'Applying knowledge to real-world scenarios',
          'All of the above'
        ],
        correct: 3,
        explanation: `Success in ${topic} requires consistent practice, deep understanding, and practical application.`
      },
      {
        id: 4,
        question: `How can you best apply ${topic} knowledge?`,
        options: [
          'Through hands-on projects and exercises',
          'By teaching others what you learn',
          'By solving real-world problems',
          'All of the above'
        ],
        correct: 3,
        explanation: 'Active application through projects, teaching, and problem-solving reinforces learning effectively.'
      },
      {
        id: 5,
        question: `What mindset is most beneficial for mastering ${topic}?`,
        options: [
          'Fixed mindset - believing abilities are unchangeable',
          'Growth mindset - embracing challenges and learning',
          'Competitive mindset - focusing on being better than others',
          'Perfectionist mindset - avoiding all mistakes'
        ],
        correct: 1,
        explanation: 'A growth mindset that embraces challenges, learns from failures, and focuses on continuous improvement is key to mastering any skill.'
      }
    ];

    return questions;
  };

  const handleLessonComplete = (lessonId) => {
    const newCompleted = new Set(completedLessons);
    
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
      toast.success('Lesson marked as incomplete');
    } else {
      newCompleted.add(lessonId);
      toast.success('✅ Lesson completed! Great progress!');
    }
    
    setCompletedLessons(newCompleted);
    
    // Update overall progress
    const totalLessons = courseContent?.totalLessons || 16;
    const newProgress = Math.round((newCompleted.size / totalLessons) * 100);
    setCourseProgress(newProgress);
    
    // Check for milestones
    if (newProgress === 25) {
      toast.success('🎉 25% Complete! You\'re making great progress!');
    } else if (newProgress === 50) {
      toast.success('🚀 Halfway there! Keep up the excellent work!');
    } else if (newProgress === 75) {
      toast.success('⭐ 75% Complete! Almost finished!');
    } else if (newProgress === 100) {
      toast.success('🏆 Course Complete! Congratulations!');
      setShowCertificate(true);
    }
  };

  const handleQuizSubmit = () => {
    const questions = courseContent.quiz;
    let correct = 0;
    
    questions.forEach((question, index) => {
      if (quizAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    
    const percentage = Math.round((correct / questions.length) * 100);
    setQuizSubmitted(true);
    
    if (percentage >= 80) {
      toast.success(`🎉 Excellent! You scored ${percentage}%!`);
    } else if (percentage >= 60) {
      toast.success(`👍 Good job! You scored ${percentage}%`);
    } else {
      toast.error(`📚 You scored ${percentage}%. Review the material and try again!`);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Bookmark removed' : '🔖 Course bookmarked!');
  };

  const handleShare = () => {
    const shareData = {
      title: course.title,
      text: `Check out this amazing course: ${course.title}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success('📋 Course link copied to clipboard!');
    }
    setShowShareModal(false);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    toast.success(`⭐ Thank you for rating this course ${rating} stars!`);
  };

  if (!course) {
    return null;
  }

  const difficulty = getCourseDifficulty(course.topic);
  const courseIcon = getCourseIcon(course.topic);
  const courseContent = generateCourseContent(course);

  // Simple floating elements
  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-2xl opacity-10"
      style={{
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
      }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    >
      {['📚', '🎯', '✨', '🚀', '💡', '🌟'][i]}
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
            Loading Course Content
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Preparing your learning experience...
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
      
      {/* Simple Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-r from-pink-400/8 to-orange-400/8 rounded-full blur-3xl" />
      </div>
      
      {/* Enhanced Header */}
      <motion.header 
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-lg"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/courses')}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Courses</span>
            </motion.button>
            
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">{courseIcon}</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 max-w-md truncate">
                  {course.title}
                </h1>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(difficulty)}`}>
                    {difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{courseContent.totalDuration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <BarChart3 className="w-4 h-4" />
                    <span>{courseProgress}% Complete</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                onClick={handleBookmark}
                className={`p-3 rounded-2xl transition-all duration-200 border ${
                  isBookmarked 
                    ? 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400'
                    : 'bg-white/20 dark:bg-gray-800/20 border-white/30 dark:border-gray-700/30 text-gray-600 dark:text-gray-400'
                } hover:scale-110`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button
                onClick={() => setShowShareModal(true)}
                className="p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 border border-white/30 dark:border-gray-700/30 text-gray-600 dark:text-gray-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={toggleDarkMode}
                className="p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 border border-white/30 dark:border-gray-700/30"
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
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Course Hero Section */}
        <motion.div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {course.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {course.description}
              </p>
              
              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{courseContent.totalModules}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Modules</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{courseContent.totalLessons}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Lessons</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{courseContent.totalDuration}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">4.8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                </div>
              </div>
              
              {/* User Rating */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Rate this course:</h3>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`text-2xl transition-colors ${
                        star <= userRating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star className={`w-6 h-6 ${star <= userRating ? 'fill-current' : ''}`} />
                    </motion.button>
                  ))}
                  {userRating > 0 && (
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                      You rated this {userRating} star{userRating !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Progress Panel */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Your Progress</span>
              </h3>
              
              {/* Progress Circle */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-gray-600"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-blue-600"
                    style={{
                      strokeDasharray: 351.86,
                      strokeDashoffset: 351.86 * (1 - courseProgress / 100),
                    }}
                    initial={{ strokeDashoffset: 351.86 }}
                    animate={{ strokeDashoffset: 351.86 * (1 - courseProgress / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{courseProgress}%</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {completedLessons.size} of {courseContent.totalLessons} lessons completed
                </p>
                {courseProgress === 100 ? (
                  <motion.button
                    onClick={() => setShowCertificate(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Award className="w-5 h-5" />
                    <span>Get Certificate</span>
                  </motion.button>
                ) : (
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    Keep going! You're doing great!
                  </p>
                )}
              </div>
              
              {/* Quick Actions */}
              <div className="space-y-3">
                <motion.button
                  onClick={() => setActiveTab('overview')}
                  className="w-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-2 px-4 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Course Overview</span>
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab('quiz')}
                  className="w-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 py-2 px-4 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Take Quiz</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Tabs */}
        <motion.div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8 py-4">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'videos', label: 'Videos', icon: PlayCircle },
                { id: 'modules', label: 'Modules', icon: FileText },
                { id: 'quiz', label: 'Quiz', icon: HelpCircle }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Course Overview</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {course.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Learning Objectives</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                      <li>Master the fundamentals of {course.topic}</li>
                      <li>Apply practical knowledge through hands-on exercises</li>
                      <li>Build real-world projects and develop your portfolio</li>
                      <li>Understand industry best practices and standards</li>
                      <li>Gain confidence to pursue advanced topics</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Course Structure</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {courseContent.modules.map((module, index) => (
                        <div key={module.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Module {index + 1}: {module.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{module.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{module.lessons.length} lessons</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Course Information</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-blue-700 dark:text-blue-300">Created by:</span>
                          <span className="ml-2 text-blue-600 dark:text-blue-400">{course.created_by}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700 dark:text-blue-300">Created on:</span>
                          <span className="ml-2 text-blue-600 dark:text-blue-400">{new Date(course.created_at).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700 dark:text-blue-300">Difficulty:</span>
                          <span className="ml-2 text-blue-600 dark:text-blue-400">{difficulty}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700 dark:text-blue-300">Duration:</span>
                          <span className="ml-2 text-blue-600 dark:text-blue-400">{courseContent.totalDuration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'videos' && (
                <motion.div
                  key="videos"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Course Videos</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {courseContent.videos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <motion.button
                              onClick={() => setCurrentVideo(video)}
                              className="bg-white/90 rounded-full p-4 hover:bg-white transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Play className="w-8 h-8 text-gray-800 ml-1" />
                            </motion.button>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
                            {video.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>{video.channel}</span>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{video.views}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'modules' && (
                <motion.div
                  key="modules"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Course Modules</h2>
                  <div className="space-y-4">
                    {courseContent.modules.map((module, moduleIndex) => (
                      <motion.div
                        key={module.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: moduleIndex * 0.1 }}
                      >
                        <motion.button
                          onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          whileHover={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.6)' : 'rgba(243, 244, 246, 1)' }}
                        >
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                              Module {moduleIndex + 1}: {module.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{module.description}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                              {module.lessons.length} lessons
                            </p>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedModule === module.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </motion.div>
                        </motion.button>
                        
                        <AnimatePresence>
                          {expandedModule === module.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-200 dark:border-gray-600"
                            >
                              <div className="p-6 space-y-3">
                                {module.lessons.map((lesson, lessonIndex) => {
                                  const isCompleted = completedLessons.has(lesson.id);
                                  return (
                                    <motion.div
                                      key={lesson.id}
                                      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                                        isCompleted
                                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                      }`}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: lessonIndex * 0.05 }}
                                    >
                                      <div className="flex items-center space-x-3">
                                        <motion.button
                                          onClick={() => handleLessonComplete(lesson.id)}
                                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                            isCompleted
                                              ? 'bg-green-500 border-green-500 text-white'
                                              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                                          }`}
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          {isCompleted && <CheckCircle className="w-4 h-4" />}
                                        </motion.button>
                                        <div>
                                          <h4 className={`font-medium ${
                                            isCompleted 
                                              ? 'text-green-800 dark:text-green-200 line-through' 
                                              : 'text-gray-800 dark:text-gray-200'
                                          }`}>
                                            {lesson.title}
                                          </h4>
                                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Clock className="w-4 h-4" />
                                            <span>{lesson.duration}</span>
                                            <span className="capitalize">{lesson.type}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <motion.button
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        {lesson.type === 'video' ? 'Watch' : lesson.type === 'practice' ? 'Practice' : 'Read'}
                                      </motion.button>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'quiz' && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Course Quiz</h2>
                    {quizSubmitted && (
                      <motion.button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retake Quiz</span>
                      </motion.button>
                    )}
                  </div>
                  
                  {!quizSubmitted ? (
                    <div className="space-y-6">
                      {courseContent.quiz.map((question, questionIndex) => (
                        <motion.div
                          key={question.id}
                          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: questionIndex * 0.1 }}
                        >
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Question {questionIndex + 1}: {question.question}
                          </h3>
                          <div className="space-y-3">
                            {question.options.map((option, optionIndex) => (
                              <motion.label
                                key={optionIndex}
                                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                  quizAnswers[question.id] === optionIndex
                                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={optionIndex}
                                  checked={quizAnswers[question.id] === optionIndex}
                                  onChange={() => setQuizAnswers({
                                    ...quizAnswers,
                                    [question.id]: optionIndex
                                  })}
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700 dark:text-gray-300">{option}</span>
                              </motion.label>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                      
                      <motion.button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length !== courseContent.quiz.length}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold"
                        whileHover={{ scale: Object.keys(quizAnswers).length === courseContent.quiz.length ? 1.02 : 1 }}
                        whileTap={{ scale: Object.keys(quizAnswers).length === courseContent.quiz.length ? 0.98 : 1 }}
                      >
                        <HelpCircle className="w-5 h-5" />
                        <span>Submit Quiz</span>
                      </motion.button>
                    </div>
                  ) : (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-6xl mb-6">🎉</div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                        Quiz Completed!
                      </h3>
                      <div className="space-y-4">
                        {courseContent.quiz.map((question, index) => {
                          const userAnswer = quizAnswers[question.id];
                          const isCorrect = userAnswer === question.correct;
                          return (
                            <motion.div
                              key={question.id}
                              className={`p-4 rounded-xl border ${
                                isCorrect 
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                              }`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                                }`}>
                                  {isCorrect ? (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  ) : (
                                    <span className="text-white text-sm">✕</span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                                    Question {index + 1}: {question.question}
                                  </p>
                                  <p className={`text-sm mb-2 ${
                                    isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                                  }`}>
                                    Your answer: {question.options[userAnswer]}
                                  </p>
                                  {!isCorrect && (
                                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                                      Correct answer: {question.options[question.correct]}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {question.explanation}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-8">
                        <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          Score: {Math.round((Object.values(quizAnswers).filter((answer, index) => answer === courseContent.quiz[index].correct).length / courseContent.quiz.length) * 100)}%
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          You got {Object.values(quizAnswers).filter((answer, index) => answer === courseContent.quiz[index].correct).length} out of {courseContent.quiz.length} questions correct!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {currentVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setCurrentVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {currentVideo.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => setVideoMuted(!videoMuted)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {videoMuted ? (
                      <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => setCurrentVideo(null)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=${videoMuted ? 1 : 0}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={currentVideo.title}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{currentVideo.channel}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{currentVideo.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{currentVideo.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Share this course
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Help others discover this amazing course!
                </p>
                
                <div className="space-y-3">
                  <motion.button
                    onClick={handleShare}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share Link</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('📋 Link copied to clipboard!');
                      setShowShareModal(false);
                    }}
                    className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-5 h-5" />
                    <span>Copy Link</span>
                  </motion.button>
                </div>
                
                <motion.button
                  onClick={() => setShowShareModal(false)}
                  className="w-full mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate Design */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    🏆
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">Certificate of Completion</h2>
                  <p className="text-blue-100 mb-8">Congratulations on your achievement!</p>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
                    <p className="text-lg mb-2">This certifies that</p>
                    <h3 className="text-2xl font-bold mb-2">hariprasadmanoj3</h3>
                    <p className="text-lg mb-2">has successfully completed</p>
                    <h4 className="text-xl font-semibold mb-4">{course.title}</h4>
                    <div className="flex justify-center items-center space-x-6 text-sm">
                      <div>
                        <span className="block font-medium">Completed</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="block font-medium">Score</span>
                        <span>100%</span>
                      </div>
                      <div>
                        <span className="block font-medium">Duration</span>
                        <span>{courseContent.totalDuration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      onClick={() => {
                        toast.success('🎉 Certificate downloaded! Great job!');
                        setShowCertificate(false);
                      }}
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download Certificate
                    </motion.button>
                    <motion.button
                      onClick={() => setShowCertificate(false)}
                      className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetailPage;