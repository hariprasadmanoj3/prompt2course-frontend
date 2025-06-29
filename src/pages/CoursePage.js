import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  User,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RotateCcw,
  Target,
  Brain,
  Youtube,
  X,
  Loader2,
  Sparkles,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';

// Utility functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Loading Spinner Component
const LoadingSpinner = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`${sizes[size]} text-blue-500`}
      >
        <Loader2 className={`${sizes[size]} animate-spin`} />
      </motion.div>
      {text && <p className="mt-4 text-gray-600 dark:text-gray-400 text-center max-w-md">{text}</p>}
    </div>
  );
};

// Button Component
const Button = ({ children, variant = 'primary', size = 'md', className = '', icon, loading, disabled, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none',
    secondary: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-blue-500',
    outline: 'border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500',
    ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

// Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// YouTube Video Modal Component
const YouTubeModal = ({ isOpen, onClose, videoUrl, title }) => {
  const videoId = getYouTubeVideoId(videoUrl);
  
  if (!isOpen || !videoId) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate pr-4">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Quiz Component
const QuizComponent = ({ questions, onSubmit, result, onRetry }) => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(!!result);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
    setShowResults(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setShowResults(false);
    onRetry();
  };

  const allAnswered = questions.every((_, index) => answers[index]);

  return (
    <div className="space-y-6">
      {questions.map((question, qIndex) => (
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: qIndex * 0.1 }}
          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
        >
          <h5 className="font-medium text-gray-900 dark:text-white mb-4">
            {qIndex + 1}. {question.question}
          </h5>
          
          <div className="space-y-3">
            {question.options.map((option, oIndex) => {
              const isSelected = answers[qIndex] === option;
              const isCorrect = showResults && option === question.correct_answer;
              const isWrong = showResults && isSelected && option !== question.correct_answer;
              
              return (
                <label 
                  key={oIndex} 
                  className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-colors ${
                    showResults 
                      ? isCorrect 
                        ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500' 
                        : isWrong 
                        ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                        : 'bg-white dark:bg-gray-800'
                      : isSelected
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option}
                    checked={isSelected}
                    onChange={() => handleAnswerChange(qIndex, option)}
                    disabled={showResults}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`flex-1 ${
                    isCorrect 
                      ? 'text-green-800 dark:text-green-200 font-medium' 
                      : isWrong 
                      ? 'text-red-800 dark:text-red-200'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {option}
                  </span>
                  {showResults && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </label>
              );
            })}
          </div>

          {showResults && question.explanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>💡 Explanation:</strong> {question.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      ))}

      <div className="flex justify-center gap-4">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            variant="primary"
            size="lg"
          >
            Submit Quiz
          </Button>
        ) : (
          <>
            {result && (
              <div className={`text-center p-6 rounded-xl ${
                result.percentage >= 70 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
              }`}>
                <div className="text-3xl font-bold mb-2">
                  {result.percentage >= 70 ? '🎉' : '📚'} {result.score}/{result.total}
                </div>
                <div className="text-xl font-semibold mb-2">
                  {result.percentage}% Score
                </div>
                <p className="text-sm">
                  {result.percentage >= 70 
                    ? 'Excellent work, hariprasadmanoj3! You can move to the next lesson.' 
                    : 'Review the content and try again to improve your score, hariprasadmanoj3.'
                  }
                </p>
              </div>
            )}
            <Button
              onClick={handleRetry}
              variant="outline"
              size="lg"
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Retake Quiz
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

// Lesson Accordion Component
const LessonAccordion = ({ 
  lesson, 
  lessonIndex, 
  isExpanded, 
  onToggle, 
  isCompleted, 
  onComplete, 
  onQuizSubmit, 
  quizResult 
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleQuizSubmit = (answers) => {
    const questions = lesson.quiz?.questions || [];
    let correct = 0;
    
    questions.forEach((question, qIndex) => {
      if (answers[qIndex] === question.correct_answer) {
        correct++;
      }
    });

    const result = {
      score: correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };

    onQuizSubmit(lessonIndex, result);

    if (result.percentage >= 70) {
      toast.success(`🎉 Excellent, hariprasadmanoj3! You scored ${result.percentage}% on Lesson ${lessonIndex + 1}!`);
      setTimeout(() => {
        onComplete(lessonIndex);
      }, 1000);
    } else {
      toast.error(`📚 Score: ${result.percentage}%. Review the lesson and try again, hariprasadmanoj3!`);
    }
  };

  const handleQuizRetry = () => {
    onQuizSubmit(lessonIndex, null);
  };

  const questions = lesson.quiz?.questions || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lessonIndex * 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Lesson Header */}
        <button
          onClick={onToggle}
          className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                isCompleted 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="text-lg font-bold">{lessonIndex + 1}</span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <span>Lesson {lessonIndex + 1}</span>
                  {lesson.learning_objectives && (
                    <span> • {lesson.learning_objectives.length} objectives</span>
                  )}
                  {lesson.youtube_videos && lesson.youtube_videos.length > 0 && (
                    <span> • {lesson.youtube_videos.length} videos</span>
                  )}
                  {questions.length > 0 && (
                    <span> • {questions.length} quiz questions</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isCompleted && (
                <Badge variant="success" className="hidden sm:inline-flex">
                  ✅ Completed
                </Badge>
              )}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </div>
          </div>
        </button>

        {/* Lesson Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 space-y-8">
                {/* Learning Objectives */}
                {lesson.learning_objectives && lesson.learning_objectives.length > 0 && (
                  <div>
                    <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      <Target className="w-5 h-5 text-blue-500" />
                      <span>🎯 Learning Objectives</span>
                    </h4>
                    <ul className="space-y-3">
                      {lesson.learning_objectives.map((objective, index) => (
                        <motion.li 
                          key={index} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Concepts */}
                {lesson.key_concepts && lesson.key_concepts.length > 0 && (
                  <div>
                    <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      <Brain className="w-5 h-5 text-purple-500" />
                      <span>🧠 Key Concepts</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {lesson.key_concepts.map((concept, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge variant="primary" className="text-sm">
                            {concept}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lesson Content */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    📚 Lesson Content
                  </h4>
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                      {lesson.content}
                    </div>
                  </div>
                </div>

                {/* YouTube Videos */}
                {lesson.youtube_videos && lesson.youtube_videos.length > 0 && (
                  <div>
                    <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      <Youtube className="w-5 h-5 text-red-500" />
                      <span>🎥 Related Videos</span>
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {lesson.youtube_videos.map((video, index) => {
                        const videoId = getYouTubeVideoId(video.url || video.embed_url);
                        const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                            onClick={() => setSelectedVideo(video)}
                          >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative group">
                              {thumbnailUrl ? (
                                <>
                                  <img
                                    src={thumbnailUrl}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-12 h-12 text-white" />
                                  </div>
                                </>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Play className="w-12 h-12 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                                {video.title}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {video.channel_title}
                              </p>
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVideo(video);
                                  }}
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
                                >
                                  <Play className="w-3 h-3" />
                                  <span>Watch Video</span>
                                </button>
                                <a
                                  href={video.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>YouTube</span>
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quiz Section */}
                {questions.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        🧠 Knowledge Check ({questions.length} questions)
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowQuiz(!showQuiz)}
                        icon={showQuiz ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      >
                        {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {showQuiz && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <QuizComponent
                            questions={questions}
                            onSubmit={handleQuizSubmit}
                            result={quizResult}
                            onRetry={handleQuizRetry}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Complete Lesson Button */}
                {!isCompleted && (
                  <div className="flex justify-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={() => onComplete(lessonIndex)}
                      variant="success"
                      size="lg"
                      icon={<CheckCircle className="w-5 h-5" />}
                    >
                      ✅ Mark Lesson as Complete
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* YouTube Video Modal */}
      <YouTubeModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || selectedVideo?.embed_url}
        title={selectedVideo?.title}
      />
    </>
  );
};

// Main Course Page Component
const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retrying, setRetrying] = useState(false);
  const [expandedLessons, setExpandedLessons] = useState(new Set([0]));
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [quizResults, setQuizResults] = useState({});

  useEffect(() => {
    console.log('🚀 [2025-06-28 21:13:18] CoursePage mounted for hariprasadmanoj3');
    console.log('📋 Course ID from URL params:', courseId);
    
    if (courseId) {
      fetchCourse();
    } else {
      setError('No course ID provided in URL');
      setLoading(false);
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError('');
      console.log(`🔄 [2025-06-28 21:13:18] Fetching course details for hariprasadmanoj3: ${courseId}`);
      
      const response = await axios.get(`http://localhost:8000/api/course/${courseId}/`, {
        timeout: 15000,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'X-User': 'hariprasadmanoj3',
          'X-Timestamp': '2025-06-28 21:13:18'
        }
      });
      
      console.log('📊 [2025-06-28 21:13:18] Course API Response for hariprasadmanoj3:', response.data);
      
      if (response.data.success) {
        setCourse(response.data.course);
        console.log('✅ [2025-06-28 21:13:18] Course loaded successfully for hariprasadmanoj3:', response.data.course.topic);
        toast.success(`🎉 Welcome to "${response.data.course.topic}" course, hariprasadmanoj3!`);
      } else {
        const errorMsg = response.data.error || 'Course not found';
        setError(errorMsg);
        console.error('❌ [2025-06-28 21:13:18] API returned error for hariprasadmanoj3:', errorMsg);
        toast.error(`❌ ${errorMsg}`);
      }
    } catch (err) {
      console.error('❌ [2025-06-28 21:13:18] Error fetching course for hariprasadmanoj3:', err);
      
      let errorMessage = 'Failed to load course';
      
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
        errorMessage = 'Cannot connect to backend server. Please make sure Django is running.';
      } else if (err.response?.status === 404) {
        errorMessage = 'Course not found. It may have been deleted or the ID is incorrect.';
      } else if (err.response?.status === 500) {
        errorMessage = 'Backend server error. Please check the Django console for details.';
      } else {
        errorMessage = `Failed to load course: ${err.message}`;
      }
      
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`);
      
      console.error('Detailed error info for hariprasadmanoj3:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        courseId: courseId
      });
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const handleRetry = () => {
    console.log('🔄 [2025-06-28 21:13:18] Retry button clicked by hariprasadmanoj3');
    setRetrying(true);
    fetchCourse();
  };

  const handleBackToCourses = () => {
    console.log('🔙 [2025-06-28 21:13:18] hariprasadmanoj3 navigating back to courses page');
    navigate('/courses');
  };

  const handleCreateNewCourse = () => {
    console.log('➕ [2025-06-28 21:13:18] hariprasadmanoj3 navigating to create new course');
    navigate('/');
  };

  const toggleLesson = (lessonIndex) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonIndex)) {
      newExpanded.delete(lessonIndex);
    } else {
      newExpanded.add(lessonIndex);
    }
    setExpandedLessons(newExpanded);
  };

  const handleLessonComplete = (lessonIndex) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonIndex);
    setCompletedLessons(newCompleted);
    toast.success(`🎉 Lesson ${lessonIndex + 1} completed, hariprasadmanoj3!`);
    
    // Auto-expand next lesson
    if (lessonIndex + 1 < (course?.lessons?.length || 0)) {
      const newExpanded = new Set(expandedLessons);
      newExpanded.add(lessonIndex + 1);
      setExpandedLessons(newExpanded);
    }
  };

  const handleQuizSubmit = (lessonIndex, result) => {
    const newResults = { ...quizResults };
    newResults[lessonIndex] = result;
    setQuizResults(newResults);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <LoadingSpinner size="xl" text={`🚀 Loading course details for hariprasadmanoj3...`} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <AlertCircle className="w-24 h-24 text-red-400 mx-auto mb-4" />
            </motion.div>
            
            {/* Error Title */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              😕 Course Not Found
            </h2>
            
            {/* Error Message */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
              <p className="text-red-800 dark:text-red-200 mb-2 font-semibold">
                Error Details:
              </p>
              <p className="text-red-700 dark:text-red-300 text-sm">
                {error}
              </p>
              {courseId && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-2 font-mono">
                  Course ID: {courseId}
                </p>
              )}
            </div>

            {/* Debug Information */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8 text-left">
              <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
                🐛 Debug Information:
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• User: hariprasadmanoj3</li>
                <li>• Timestamp: 2025-06-28 21:13:18</li>
                <li>• Course ID: {courseId || 'Not provided'}</li>
                <li>• Backend URL: http://localhost:8000/api/course/{courseId}/</li>
                <li>• Current Location: {window.location.href}</li>
              </ul>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={handleRetry}
                disabled={retrying}
                loading={retrying}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                {retrying ? 'Retrying...' : 'Retry Loading Course'}
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleBackToCourses}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Courses
              </Button>
              
              <Button
                variant="outline"
                onClick={handleCreateNewCourse}
                icon={<Sparkles className="w-4 h-4" />}
              >
                Create New Course
              </Button>
            </div>

            {/* Troubleshooting Tips */}
            <div className="mt-12 text-left bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-4">
                🔧 Troubleshooting Tips for hariprasadmanoj3:
              </h4>
              <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-2 list-decimal list-inside">
                <li>Make sure the Django backend server is running: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">python manage.py runserver</code></li>
                <li>Check if the course exists in your courses library</li>
                <li>Try refreshing the page or clearing your browser cache</li>
                <li>Verify the course ID in the URL is correct</li>
                <li>Check the Django console for any error messages</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // If we have a course, render the full course page
  const lessons = course.lessons || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Navigation */}
            <div className="flex items-center space-x-4 mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToCourses}
                className="text-white hover:bg-white/20"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Courses
              </Button>
            </div>

            {/* Course Info */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  <span className="text-sm font-medium text-blue-100">AI-Generated Course for hariprasadmanoj3</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {course.course_title || `Learn ${course.topic}`}
                </h1>
                <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                  {course.course_description || `Master the fundamentals of ${course.topic} with this comprehensive AI-generated course designed specifically for hariprasadmanoj3.`}
                </p>
                
                {/* Course Meta */}
                <div className="flex flex-wrap gap-4 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Created {formatDate(course.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{lessons.length} Lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.estimated_duration || '3-4 hours'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{course.created_by || 'hariprasadmanoj3'}</span>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="lg:col-span-1">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Course Overview</span>
                  </h3>
                  
                  {/* Course Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Total Lessons:</span>
                      <span className="font-semibold">{lessons.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed:</span>
                      <span className="font-semibold">{completedLessons.size}/{lessons.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <span className="font-semibold">
                        {lessons.length > 0 ? Math.round((completedLessons.size / lessons.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <Badge variant={
                        course.difficulty_level?.toLowerCase() === 'beginner' ? 'success' :
                        course.difficulty_level?.toLowerCase() === 'intermediate' ? 'warning' :
                        course.difficulty_level?.toLowerCase() === 'advanced' ? 'danger' : 'default'
                      }>
                        {course.difficulty_level || 'Beginner'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="success">Completed</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span className="font-semibold">{formatDate(course.created_at)}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs mb-2">
                      <span>Course Progress</span>
                      <span>{completedLessons.size}/{lessons.length} lessons</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div 
                        className="bg-yellow-300 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${lessons.length > 0 ? (completedLessons.size / lessons.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                📚 Course Content for hariprasadmanoj3
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Your personalized learning journey with {lessons.length} comprehensive lessons covering everything from basics to advanced concepts.
              </p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Last updated: 2025-06-28 21:13:18 UTC • Progress: {completedLessons.size}/{lessons.length} lessons
              </div>
            </div>
            
            {/* Lesson Accordion List */}
            <div className="space-y-6">
              {lessons.map((lesson, index) => (
                <LessonAccordion
                  key={index}
                  lesson={lesson}
                  lessonIndex={index}
                  isExpanded={expandedLessons.has(index)}
                  onToggle={() => toggleLesson(index)}
                  isCompleted={completedLessons.has(index)}
                  onComplete={handleLessonComplete}
                  onQuizSubmit={handleQuizSubmit}
                  quizResult={quizResults[index]}
                />
              ))}
            </div>

            {/* Course Completion Celebration */}
            {completedLessons.size === lessons.length && lessons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl p-8 text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-4">
                  Congratulations, hariprasadmanoj3!
                </h3>
                <p className="text-xl mb-6">
                  You've successfully completed the entire "{course.topic}" course!
                </p>
                <p className="text-lg opacity-90 mb-8">
                  You've mastered {lessons.length} comprehensive lessons and demonstrated your knowledge through quizzes. Your dedication to learning is truly impressive!
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="secondary"
                    onClick={handleBackToCourses}
                    icon={<BookOpen className="w-4 h-4" />}
                  >
                    Explore More Courses
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCreateNewCourse}
                    icon={<Sparkles className="w-4 h-4" />}
                    className="text-white border-white hover:bg-white hover:text-green-600"
                  >
                    Create New Course
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Course Actions */}
            <div className="mt-12 flex justify-center gap-4">
              <Button
                variant="secondary"
                onClick={handleBackToCourses}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Course Library
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateNewCourse}
                icon={<Sparkles className="w-4 h-4" />}
              >
                Create Another Course
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;