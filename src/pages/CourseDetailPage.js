import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  User,
  Calendar,
  Share2,
  Download,
  Play,
  Moon,
  Sun,
  PlayCircle,
  FileText,
  Award,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Youtube,
  Brain,
  Target,
  Star,
  Volume2,
  Maximize,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeModule, setActiveModule] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [showQuizResults, setShowQuizResults] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    fetchCourse();
  }, [id]);

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

  // Mock YouTube videos based on course topic
  const getYouTubeVideos = (topic) => {
    const videoMappings = {
      'Web Design with CSS': [
        { id: 'yfoY53QXEnI', title: 'CSS Crash Course For Absolute Beginners', duration: '1:25:15' },
        { id: 'jx5jmI0UlXU', title: 'Learn CSS Grid - CSS Tutorial', duration: '27:53' },
        { id: 'JJSoEo8JSnc', title: 'Flexbox CSS In 20 Minutes', duration: '19:38' },
        { id: 'D-h8L5hgW-w', title: 'CSS Animation Tutorial', duration: '31:22' }
      ],
      'JavaScript Fundamentals': [
        { id: 'PkZNo7MFNFg', title: 'JavaScript Crash Course For Beginners', duration: '1:40:17' },
        { id: 'hdI2bqOjy3c', title: 'JavaScript ES6 Tutorial', duration: '1:12:42' },
        { id: 'Qqx_wzMmFeA', title: 'JavaScript DOM Manipulation', duration: '35:05' },
        { id: 'rRmeAn6QbK4', title: 'Async JavaScript Tutorial', duration: '42:11' }
      ],
      'Python for Data Science': [
        { id: 'rfscVS0vtbw', title: 'Python for Data Science Tutorial', duration: '12:00:00' },
        { id: 'vmEHCJofslg', title: 'Pandas Tutorial for Beginners', duration: '1:02:08' },
        { id: 'ZyhVh-qRZPA', title: 'NumPy Tutorial for Beginners', duration: '58:41' },
        { id: 'DAQNHzOcO5A', title: 'Matplotlib Tutorial', duration: '1:30:22' }
      ],
      'React.js Complete Guide': [
        { id: 'Ke90Tje7VS0', title: 'React JS Crash Course', duration: '1:48:54' },
        { id: 'w7ejDZ8SWv8', title: 'React Hooks Tutorial', duration: '38:20' },
        { id: 'Law7wfdg_ls', title: 'React Router Tutorial', duration: '43:17' },
        { id: 'TNhaISOUy6Q', title: 'React State Management', duration: '52:09' }
      ],
      'Machine Learning Basics': [
        { id: 'ukzFI9rgwfU', title: 'Machine Learning Explained', duration: '8:36' },
        { id: 'aircAruvnKk', title: 'Neural Networks Explained', duration: '19:13' },
        { id: 'i_LwzRVP7bg', title: 'Supervised vs Unsupervised Learning', duration: '14:48' },
        { id: 'zPG4NjIkuiA', title: 'Python Machine Learning Tutorial', duration: '2:45:56' }
      ],
      'Digital Photography': [
        { id: 'LxO-6rlihSg', title: 'Photography Basics in 10 Minutes', duration: '9:52' },
        { id: 'V7z7BAZdt2M', title: 'Camera Settings Tutorial', duration: '18:23' },
        { id: 'F8T9CgdZJc4', title: 'Composition Techniques', duration: '21:07' },
        { id: 'YojL7UQTVhc', title: 'Photo Editing Tutorial', duration: '32:45' }
      ]
    };

    return videoMappings[topic] || [
      { id: 'dQw4w9WgXcQ', title: 'Introduction Tutorial', duration: '10:00' },
      { id: 'dQw4w9WgXcQ', title: 'Advanced Concepts', duration: '15:30' },
      { id: 'dQw4w9WgXcQ', title: 'Practical Examples', duration: '20:45' },
      { id: 'dQw4w9WgXcQ', title: 'Final Project', duration: '25:12' }
    ];
  };

  // Mock quiz data
  const generateQuiz = (topic) => {
    const quizData = {
      'Web Design with CSS': {
        title: 'CSS Fundamentals Quiz',
        questions: [
          {
            id: 1,
            question: 'Which CSS property is used to change the text color?',
            options: ['color', 'text-color', 'font-color', 'text-style'],
            correct: 0
          },
          {
            id: 2,
            question: 'What does CSS stand for?',
            options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
            correct: 1
          },
          {
            id: 3,
            question: 'Which property is used to make text bold?',
            options: ['font-weight', 'text-bold', 'font-style', 'text-weight'],
            correct: 0
          },
          {
            id: 4,
            question: 'How do you select an element with id "header"?',
            options: ['.header', '#header', 'header', '*header'],
            correct: 1
          },
          {
            id: 5,
            question: 'Which CSS property controls the spacing between elements?',
            options: ['padding', 'margin', 'border', 'spacing'],
            correct: 1
          }
        ]
      },
      'JavaScript Fundamentals': {
        title: 'JavaScript Basics Quiz',
        questions: [
          {
            id: 1,
            question: 'Which symbol is used for single-line comments in JavaScript?',
            options: ['//', '/*', '#', '--'],
            correct: 0
          },
          {
            id: 2,
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['var myVar;', 'variable myVar;', 'v myVar;', 'declare myVar;'],
            correct: 0
          },
          {
            id: 3,
            question: 'Which method is used to add an element to the end of an array?',
            options: ['push()', 'add()', 'append()', 'insert()'],
            correct: 0
          },
          {
            id: 4,
            question: 'What does DOM stand for?',
            options: ['Document Object Model', 'Data Object Model', 'Dynamic Object Model', 'Document Oriented Model'],
            correct: 0
          },
          {
            id: 5,
            question: 'Which operator is used for strict equality in JavaScript?',
            options: ['==', '===', '=', '!='],
            correct: 1
          }
        ]
      },
      'React.js Complete Guide': {
        title: 'React.js Quiz',
        questions: [
          {
            id: 1,
            question: 'What is JSX?',
            options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'JSON XML'],
            correct: 0
          },
          {
            id: 2,
            question: 'Which hook is used for state management in functional components?',
            options: ['useEffect', 'useState', 'useContext', 'useReducer'],
            correct: 1
          },
          {
            id: 3,
            question: 'What is the virtual DOM?',
            options: ['A copy of the real DOM', 'A JavaScript representation of the DOM', 'A faster version of DOM', 'All of the above'],
            correct: 3
          },
          {
            id: 4,
            question: 'How do you pass data from parent to child component?',
            options: ['Props', 'State', 'Context', 'Redux'],
            correct: 0
          },
          {
            id: 5,
            question: 'Which method is called after a component is mounted?',
            options: ['componentDidMount', 'componentWillMount', 'useEffect', 'Both A and C'],
            correct: 3
          }
        ]
      }
    };

    return quizData[topic] || {
      title: 'General Knowledge Quiz',
      questions: [
        {
          id: 1,
          question: 'This is a sample question about the course topic?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct: 0
        }
      ]
    };
  };

  const fetchCourse = async () => {
    try {
      const API_BASE = 'https://prompt2course-backend-1.onrender.com';
      const response = await fetch(`${API_BASE}/api/courses/${id}/`);
      
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } else {
        throw new Error('Course not found');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setLoading(false);
    }
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitQuiz = () => {
    if (!currentQuiz) return;

    let correct = 0;
    const results = currentQuiz.questions.map(question => {
      const userAnswer = quizAnswers[question.id];
      const isCorrect = userAnswer === question.correct;
      if (isCorrect) correct++;
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correct,
        isCorrect,
        explanation: `The correct answer is: ${question.options[question.correct]}`
      };
    });

    const score = Math.round((correct / currentQuiz.questions.length) * 100);
    setQuizResults({ score, correct, total: currentQuiz.questions.length, results });
    setShowQuizResults(true);

    if (score >= 70) {
      toast.success(`🎉 Great job! You scored ${score}%`);
    } else {
      toast.error(`📚 Keep studying! You scored ${score}%. Try again to improve.`);
    }
  };

  const retakeQuiz = () => {
    setQuizAnswers({});
    setQuizResults(null);
    setShowQuizResults(false);
  };

  const markLessonComplete = (lessonIndex) => {
    setCompletedLessons(prev => new Set([...prev, lessonIndex]));
    toast.success('✅ Lesson completed!');
  };

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
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading course...</p>
        </motion.div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Course Not Found
          </h2>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const videos = getYouTubeVideos(course.topic);
  const quiz = generateQuiz(course.topic);

  const modules = [
    {
      title: `Introduction to ${course.topic}`,
      lessons: [
        'What you\'ll learn',
        'Setting up your environment',
        'Basic concepts and terminology',
        'Getting started guide'
      ],
      duration: '45 min'
    },
    {
      title: 'Core Concepts',
      lessons: [
        'Fundamental principles',
        'Key techniques and methods',
        'Best practices',
        'Common patterns'
      ],
      duration: '1h 30min'
    },
    {
      title: 'Practical Applications',
      lessons: [
        'Real-world examples',
        'Hands-on exercises',
        'Project walkthrough',
        'Troubleshooting guide'
      ],
      duration: '2h 15min'
    },
    {
      title: 'Advanced Topics',
      lessons: [
        'Advanced techniques',
        'Performance optimization',
        'Industry standards',
        'Final project'
      ],
      duration: '1h 45min'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } font-sora`}>
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/courses')}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Course Learning
              </h1>
            </div>

            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Course Header */}
        <motion.div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>By {course.created_by}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(course.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>~6 hours total</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.8 rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={() => setCurrentQuiz(quiz)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain className="w-5 h-5" />
                <span>Take Quiz</span>
              </motion.button>
              
              <motion.button
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
              { id: 'videos', label: 'Videos', icon: <PlayCircle className="w-4 h-4" /> },
              { id: 'modules', label: 'Modules', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'quiz', label: 'Quiz', icon: <Award className="w-4 h-4" /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown>
                    {course.content || `# ${course.title}\n\n${course.description}\n\nThis course content is being generated...`}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  📺 Course Videos
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="relative">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <motion.a
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Youtube className="w-5 h-5" />
                            <span>Watch on YouTube</span>
                          </motion.a>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Video {index + 1} of {videos.length}
                          </span>
                          <motion.button
                            onClick={() => markLessonComplete(index)}
                            className={`flex items-center space-x-1 text-sm px-3 py-1 rounded-full transition-colors ${
                              completedLessons.has(index)
                                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-green-100 hover:text-green-600'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>{completedLessons.has(index) ? 'Completed' : 'Mark Complete'}</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Modules Tab */}
            {activeTab === 'modules' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  📚 Course Modules
                </h2>
                <div className="space-y-4">
                  {modules.map((module, moduleIndex) => (
                    <motion.div
                      key={moduleIndex}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: moduleIndex * 0.1 }}
                    >
                      <motion.button
                        onClick={() => setActiveModule(activeModule === moduleIndex ? -1 : moduleIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                            {moduleIndex + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {module.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {module.lessons.length} lessons • {module.duration}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: activeModule === moduleIndex ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeModule === moduleIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 dark:border-gray-700"
                          >
                            <div className="p-6 space-y-3">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <motion.div
                                  key={lessonIndex}
                                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: lessonIndex * 0.05 }}
                                  whileHover={{ scale: 1.02 }}
                                  onClick={() => markLessonComplete(`${moduleIndex}-${lessonIndex}`)}
                                >
                                  <div className="flex items-center space-x-3">
                                    <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-gray-800 dark:text-gray-200">{lesson}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">5-10 min</span>
                                    {completedLessons.has(`${moduleIndex}-${lessonIndex}`) && (
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🧠</div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                      {quiz.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      Test your knowledge with {quiz.questions.length} questions
                    </p>
                  </div>
                  
                  <motion.button
                    onClick={() => setCurrentQuiz(quiz)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Brain className="w-6 h-6" />
                    <span>Start Quiz</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Quiz Modal */}
        <AnimatePresence>
          {currentQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                {!showQuizResults ? (
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {currentQuiz.title}
                      </h3>
                      <motion.button
                        onClick={() => setCurrentQuiz(null)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ✕
                      </motion.button>
                    </div>
                    
                    <div className="space-y-8">
                      {currentQuiz.questions.map((question, qIndex) => (
                        <motion.div
                          key={question.id}
                          className="p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: qIndex * 0.1 }}
                        >
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            {qIndex + 1}. {question.question}
                          </h4>
                          <div className="space-y-3">
                            {question.options.map((option, oIndex) => (
                              <motion.label
                                key={oIndex}
                                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  quizAnswers[question.id] === oIndex
                                    ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                                    : 'bg-white dark:bg-gray-600 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-500'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  checked={quizAnswers[question.id] === oIndex}
                                  onChange={() => handleQuizAnswer(question.id, oIndex)}
                                  className="text-blue-600"
                                />
                                <span className="text-gray-800 dark:text-gray-200">{option}</span>
                              </motion.label>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <motion.button
                        onClick={() => setCurrentQuiz(null)}
                        className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length < currentQuiz.questions.length}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Submit Quiz
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-6">
                      {quizResults.score >= 70 ? '🎉' : '📚'}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                      Quiz Complete!
                    </h3>
                    <div className="text-6xl font-bold mb-4">
                      <span className={quizResults.score >= 70 ? 'text-green-600' : 'text-orange-600'}>
                        {quizResults.score}%
                      </span>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                      You scored {quizResults.correct} out of {quizResults.total} questions correctly
                    </p>
                    
                    <div className="flex justify-center space-x-4">
                      <motion.button
                        onClick={retakeQuiz}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw className="w-5 h-5" />
                        <span>Retake Quiz</span>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setCurrentQuiz(null);
                          setShowQuizResults(false);
                          setQuizAnswers({});
                          setQuizResults(null);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue Learning
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CourseDetailPage;