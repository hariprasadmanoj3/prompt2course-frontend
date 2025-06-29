import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text mb-4">
              404
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full flex items-center justify-center mx-auto"
            >
              <BookOpen className="w-16 h-16 text-primary-500" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              Don't worry, even the best learners sometimes take wrong turns.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              onClick={() => navigate('/')}
              variant="primary"
              size="lg"
              icon={<Home className="w-5 h-5" />}
            >
              Go Home
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              icon={<ArrowLeft className="w-5 h-5" />}
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/courses')}
              variant="secondary"
              size="lg"
              icon={<Search className="w-5 h-5" />}
            >
              Browse Courses
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-md mx-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              While you're here, why not:
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <button
                onClick={() => navigate('/')}
                className="block w-full text-center p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                🚀 Create a new AI course
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="block w-full text-center p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                📚 Browse existing courses
              </button>
              <button
                onClick={() => navigate('/about')}
                className="block w-full text-center p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ℹ️ Learn about our platform
              </button>
            </div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800 max-w-2xl mx-auto"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              💡 <strong>Fun Fact:</strong> The HTTP 404 error code means "Not Found" and was named after room 404 
              at CERN where the World Wide Web was born. Now you've learned something new!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;