import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Calendar,
  Grid,
  List,
  Eye,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle,  // ADD THIS
  User          // ADD THIS
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';

// Components
const LoadingSpinner = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-500 ${sizes[size]}`}></div>
      {text && <p className="mt-4 text-gray-600 dark:text-gray-400 text-center max-w-md">{text}</p>}
    </div>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', className = '', icon, onClick, disabled, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none',
    secondary: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-blue-500',
    outline: 'border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Utility functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [connectionError, setConnectionError] = useState(false);

  // Fetch courses function - NO useCallback to prevent infinite loops
  const fetchCourses = async (showToast = false) => {
    if (refreshing) {
      console.log('⏳ [2025-06-28 21:08:21] Request already in progress for hariprasadmanoj3, skipping...');
      return;
    }
    
    try {
      setRefreshing(true);
      setConnectionError(false);
      console.log('🔄 [2025-06-28 21:08:21] Fetching courses for hariprasadmanoj3...');
      
      const response = await axios.get('http://localhost:8000/api/courses/', {
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'X-User': 'hariprasadmanoj3',
          'X-Timestamp': '2025-06-28 21:08:21'
        }
      });
      
      console.log('📊 [2025-06-28 21:08:21] Courses API Response for hariprasadmanoj3:', response.data);
      
      if (response.data.success) {
        const coursesList = response.data.courses || [];
        setCourses(coursesList);
        
        console.log(`✅ [2025-06-28 21:08:21] Successfully loaded ${coursesList.length} courses for hariprasadmanoj3`);
        
        if (showToast) {
          toast.success(`📚 Refreshed! Found ${coursesList.length} courses for hariprasadmanoj3`);
        }
      } else {
        console.error('❌ [2025-06-28 21:08:21] API returned success=false for hariprasadmanoj3:', response.data);
        toast.error('Failed to load courses - API returned error');
        setCourses([]);
      }
    } catch (err) {
      console.error('❌ [2025-06-28 21:08:21] Error fetching courses for hariprasadmanoj3:', err);
      setConnectionError(true);
      
      let errorMessage = 'Unknown error occurred';
      
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error') || err.message.includes('ERR_CONNECTION_REFUSED')) {
        errorMessage = '🔌 Cannot connect to Django server. Please start: python manage.py runserver';
      } else if (err.response?.status === 404) {
        errorMessage = '🚫 API endpoint not found. Check Django URLs configuration.';
      } else if (err.response?.status === 500) {
        errorMessage = '💥 Backend server error. Check Django console for details.';
      } else if (err.code === 'ENOTFOUND') {
        errorMessage = '🌐 DNS resolution failed. Check your network connection.';
      } else {
        errorMessage = `❌ ${err.message}`;
      }
      
      if (showToast) {
        toast.error(errorMessage, { duration: 6000 });
      }
      setCourses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Search courses function
  const searchCourses = async (term) => {
    if (refreshing) return;
    
    try {
      console.log(`🔍 [2025-06-28 21:08:21] Searching courses for hariprasadmanoj3: "${term}"`);
      const response = await axios.get(`http://localhost:8000/api/search-courses/?q=${encodeURIComponent(term)}`, {
        timeout: 5000,
        headers: {
          'X-User': 'hariprasadmanoj3',
          'X-Timestamp': '2025-06-28 21:08:21'
        }
      });
      if (response.data.success) {
        setCourses(response.data.courses);
        console.log(`🔍 [2025-06-28 21:08:21] Search found ${response.data.courses.length} courses for hariprasadmanoj3`);
      }
    } catch (err) {
      console.error('🔍 [2025-06-28 21:08:21] Search error for hariprasadmanoj3:', err);
      toast.error('Search failed - backend connection issue');
    }
  };

  // Fetch courses ONLY on component mount
  useEffect(() => {
    console.log('🚀 [2025-06-28 21:08:21] CoursesPage mounted for hariprasadmanoj3 - fetching initial data');
    fetchCourses();
    
    return () => {
      console.log('🧹 [2025-06-28 21:08:21] CoursesPage unmounting for hariprasadmanoj3');
    };
  }, []); // Empty dependency array - runs only once

  // Search effect with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchCourses(searchTerm);
      } else {
        fetchCourses();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Manual refresh function
  const handleRefresh = () => {
    if (refreshing) {
      console.log('⏳ [2025-06-28 21:08:21] Already refreshing for hariprasadmanoj3, ignoring manual refresh');
      return;
    }
    console.log('🔄 [2025-06-28 21:08:21] Manual refresh triggered by hariprasadmanoj3');
    fetchCourses(true);
  };

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses;

    if (filterBy !== 'all') {
      filtered = filtered.filter(course => course.status === filterBy);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'title':
          return a.topic.localeCompare(b.topic);
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, filterBy, sortBy]);

// Replace the CourseCard component's handleViewCourse function:

const CourseCard = ({ course, index }) => {
  const handleViewCourse = () => {
    console.log('👀 [2025-06-28 21:25:30] hariprasadmanoj3 opening course:', {
      id: course.id,
      topic: course.topic,
      status: course.status,
      created_by: course.created_by,
      full_course_object: course
    });
    
    if (!course.id) {
      toast.error('❌ Course ID is missing');
      console.error('❌ [2025-06-28 21:25:30] Course missing ID for hariprasadmanoj3:', course);
      return;
    }
    
    // More flexible UUID validation
    const courseIdStr = String(course.id).trim();
    console.log(`🔗 [2025-06-28 21:25:30] Processing course ID: "${courseIdStr}"`);
    
    // Check if it's a valid UUID format (more lenient)
    const uuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i;
    if (!uuidRegex.test(courseIdStr.replace(/-/g, ''))) {
      console.warn('⚠️ [2025-06-28 21:25:30] Unusual course ID format:', courseIdStr);
      // Don't fail, just warn - continue with navigation
    }
    
    toast.success(`📚 Opening "${course.topic}" course for hariprasadmanoj3...`);
    console.log(`🔗 [2025-06-28 21:25:30] Navigating hariprasadmanoj3 to: /course/${courseIdStr}`);
    
    // Add a small delay to see the toast, then navigate
    setTimeout(() => {
      console.log(`🚀 [2025-06-28 21:25:30] Executing navigation for hariprasadmanoj3`);
      navigate(`/course/${courseIdStr}`);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {course.topic}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1 mb-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(course.created_at)}</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Created by: {course.created_by || 'hariprasadmanoj3'}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-mono">
              ID: {course.id}
            </p>
          </div>
          <Badge 
            variant={
              course.status === 'completed' ? 'success' : 
              course.status === 'generating' ? 'primary' : 
              'danger'
            }
          >
            {course.status || 'Unknown'}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.total_lessons || 0} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Est. 3-4 hours</span>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full"
          icon={<Eye className="w-4 h-4" />}
          onClick={handleViewCourse}
        >
          View Course
        </Button>
      </div>
    </motion.div>
  );
};

// Add this new component for list view right after the CourseCard component:

const CourseListItem = ({ course, index }) => {
  const navigate = useNavigate(); // Add this line - it was missing!
  
  const handleViewCourse = () => {
    console.log('👀 [2025-06-29 04:52:22] hariprasadmanoj3 opening course (list view):', {
      id: course.id,
      topic: course.topic
    });
    
    if (!course.id) {
      toast.error('❌ Course ID is missing');
      return;
    }
    
    const courseIdStr = String(course.id).trim();
    toast.success(`📚 Opening "${course.topic}" course for hariprasadmanoj3...`);
    
    setTimeout(() => {
      navigate(`/course/${courseIdStr}`);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            {/* Status Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              course.status === 'completed' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              {course.status === 'completed' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <BookOpen className="w-5 h-5" />
              )}
            </div>
            
            {/* Course Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
                {course.topic}
              </h3>
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(course.created_at)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{course.total_lessons || 0} lessons</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>3-4 hours</span>
                </span>
                <span className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{course.created_by || 'hariprasadmanoj3'}</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Badge 
              variant={
                course.status === 'completed' ? 'success' : 
                course.status === 'generating' ? 'primary' : 
                'danger'
              }
            >
              {course.status || 'Unknown'}
            </Badge>
            
            <Button
              variant="primary"
              size="sm"
              icon={<Eye className="w-4 h-4" />}
              onClick={handleViewCourse}
            >
              View Course
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <LoadingSpinner size="xl" text="🔄 Loading course library for hariprasadmanoj3..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Connection Error Banner */}
        {connectionError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <div className="flex-1">
                <h3 className="text-red-800 dark:text-red-200 font-semibold">
                  🔌 Backend Connection Failed
                </h3>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                  Cannot connect to Django server. Please run: <code className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">python manage.py runserver</code>
                </p>
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                  User: hariprasadmanoj3 | Time: 2025-06-28 21:08:21
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
              >
                Retry Connection
              </Button>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              📚 Course Library
            </h1>
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
                onClick={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                variant="primary"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => navigate('/')}
              >
                Create New Course
              </Button>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Welcome back, hariprasadmanoj3! 
            {connectionError ? (
              <span className="text-red-600 dark:text-red-400"> (Backend disconnected - please start Django server)</span>
            ) : (
              <span> You have {courses.length} course{courses.length !== 1 ? 's' : ''} in your library</span>
            )}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last updated: 2025-06-28 21:08:21 UTC
          </p>
        </motion.div>

        {/* Search and Filters - Only show when connected */}
        {!connectionError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={refreshing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  disabled={refreshing}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">By Title</option>
                </select>

                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  disabled={refreshing}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="generating">Generating</option>
                  <option value="failed">Failed</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    disabled={refreshing}
                    className={`px-4 py-3 disabled:opacity-50 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    } transition-colors`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    disabled={refreshing}
                    className={`px-4 py-3 disabled:opacity-50 ${
                      viewMode === 'list' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    } transition-colors`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Course Grid - Only show when connected */}
        {!connectionError && (
          <>
            {filteredAndSortedCourses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <BookOpen className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
                  {searchTerm ? 'No courses found' : courses.length === 0 ? 'No courses yet' : 'No matching courses'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  {searchTerm 
                    ? 'Try adjusting your search terms or filters'
                    : courses.length === 0
                    ? 'Create your first AI-powered course to get started, hariprasadmanoj3!'
                    : 'No courses match your current filters'
                  }
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/')}
                  icon={<Plus className="w-4 h-4" />}
                >
                  Create New Course
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedCourses.map((course, index) => (
                  <CourseCard
                    key={`course-${course.id}-${course.topic}`}
                    course={course}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Course Count */}
            {filteredAndSortedCourses.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-12 text-gray-500 dark:text-gray-400"
              >
                Showing {filteredAndSortedCourses.length} course{filteredAndSortedCourses.length !== 1 ? 's' : ''}
                {courses.length > filteredAndSortedCourses.length && (
                  <span> of {courses.length} total</span>
                )}
                <div className="text-xs mt-1">
                  Created by hariprasadmanoj3 • Last updated: 2025-06-28 21:08:21 UTC
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* When disconnected, show simple retry option */}
        {connectionError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <AlertCircle className="w-24 h-24 text-red-300 dark:text-red-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
              🔌 Backend Server Not Running
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              hariprasadmanoj3, please start the Django backend server to view your courses:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                python manage.py runserver
              </code>
            </div>
            <Button
              variant="primary"
              onClick={handleRefresh}
              disabled={refreshing}
              icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
            >
              {refreshing ? 'Checking Connection...' : 'Check Connection'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;