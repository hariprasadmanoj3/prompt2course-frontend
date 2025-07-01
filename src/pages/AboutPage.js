import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Moon, 
  Sun,
  Brain,
  Target,
  Zap,
  Users,
  Award,
  Heart,
  Code,
  Sparkles,
  Github,
  Mail,
  Globe,
  CheckCircle,
  Lightbulb,
  Rocket
} from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();
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

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered',
      desc: 'Advanced AI creates comprehensive learning materials for any topic',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Generation',
      desc: 'Get complete courses with videos, modules, and quizzes in seconds',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Any Topic',
      desc: 'No limitations - create courses on absolutely anything you want to learn',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Free Forever',
      desc: 'Complete access to course generation and learning materials at no cost',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const techStack = [
    { name: 'React.js', desc: 'Modern frontend framework', icon: '⚛️' },
    { name: 'Django', desc: 'Powerful backend API', icon: '🐍' },
    { name: 'AI Integration', desc: 'Smart content generation', icon: '🤖' },
    { name: 'YouTube API', desc: 'Curated video content', icon: '📺' }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Accessibility',
      desc: 'Learning should be available to everyone, everywhere, for free'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      desc: 'Using cutting-edge AI to revolutionize how we create and consume educational content'
    },
    {
      icon: '💡',
      title: 'Simplicity',
      desc: 'Complex technology made simple - just describe what you want to learn'
    },
    {
      icon: '🌟',
      title: 'Quality',
      desc: 'Every generated course includes comprehensive modules, videos, and assessments'
    }
  ];

  // Simple floating elements (consistent with homepage)
  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-3xl opacity-20"
      style={{
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
      }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {['📚', '💡', '🎯', '✨', '🌟', '🚀'][i]}
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
      
      {/* Clean Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Prompt2Course
              </h1>
            </div>

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
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Learning Without Limits
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Prompt2Course transforms the way we learn by making comprehensive education accessible to everyone. 
            Just describe what you want to learn, and get a complete course instantly.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We believe that learning should be instant, accessible, and unlimited. Traditional education often puts barriers 
              between curiosity and knowledge. Prompt2Course removes those barriers by using AI to create comprehensive learning 
              experiences for any topic you can imagine - from quantum physics to bread baking, from machine learning to guitar playing.
            </p>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Makes Us Different
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            The Technology Behind It
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                AI Content Generation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our AI analyzes your learning topic and creates structured courses with:
              </p>
              <div className="space-y-2">
                {[
                  'Comprehensive course overviews',
                  'Structured learning modules',
                  'Curated video content',
                  'Interactive quizzes and assessments'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Real Educational Resources
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Every course includes real educational content:
              </p>
              <div className="space-y-2">
                {[
                  'Hand-picked YouTube tutorials',
                  'Topic-specific learning modules',
                  'Knowledge assessment quizzes',
                  'Progress tracking and completion'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            What We Believe
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="flex items-start space-x-4 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20"
              >
                <div className="text-3xl">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Built With Modern Technology
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/20"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Developer Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-8 text-center">
            <div className="text-5xl mb-4">👨‍💻</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Built by hariprasadmanoj3
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Passionate about making education accessible through technology. 
              Prompt2Course started as an idea to democratize learning and remove barriers between curiosity and knowledge.
            </p>
            
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/hariprasadmanoj3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:hariprasadmanoj3@gmail.com"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join the learning revolution. Create your first course and discover how easy it is to learn anything.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl transition-colors inline-flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create Your First Course</span>
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 rounded-xl transition-colors inline-flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>View My Courses</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutPage;