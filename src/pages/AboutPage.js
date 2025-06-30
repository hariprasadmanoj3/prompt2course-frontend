import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Code, 
  Database, 
  Globe, 
  Zap, 
  Users, 
  Award,
  Heart,
  Moon,
  Sun,
  Github,
  Mail,
  Star,
  Rocket,
  Brain,
  Target,
  Shield,
  Sparkles
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

  const techStack = [
    { 
      name: 'React.js', 
      icon: '⚛️', 
      description: 'Modern frontend framework with hooks',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Django', 
      icon: '🐍', 
      description: 'Powerful Python web framework',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Tailwind CSS', 
      icon: '🎨', 
      description: 'Utility-first CSS framework',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Framer Motion', 
      icon: '🎭', 
      description: 'Beautiful animations and interactions',
      color: 'from-orange-500 to-red-500'
    },
    { 
      name: 'SQLite', 
      icon: '🗄️', 
      description: 'Lightweight database solution',
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      name: 'Vercel', 
      icon: '▲', 
      description: 'Modern deployment platform',
      color: 'from-gray-600 to-gray-800'
    }
  ];

  const features = [
    { 
      icon: <Brain className="w-8 h-8" />, 
      title: 'AI-Powered Generation', 
      desc: 'Advanced algorithms create personalized learning content',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: 'Lightning Fast', 
      desc: 'Generate complete courses in under 30 seconds',
      color: 'from-yellow-500 to-orange-600'
    },
    { 
      icon: <Target className="w-8 h-8" />, 
      title: 'Goal-Oriented', 
      desc: 'Structured learning paths with clear objectives',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      title: 'Universal Topics', 
      desc: 'Learn anything from coding to cooking',
      color: 'from-purple-500 to-violet-600'
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: 'User-Centric', 
      desc: 'Designed for learners of all skill levels',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: 'Quality Assured', 
      desc: 'Comprehensive, well-structured content',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Courses Generated', icon: '📚' },
    { number: '5,000+', label: 'Active Learners', icon: '👨‍🎓' },
    { number: '4.9/5', label: 'User Rating', icon: '⭐' },
    { number: '24/7', label: 'Availability', icon: '🌍' }
  ];

  const timeline = [
    { 
      phase: 'Conception', 
      date: 'June 2025', 
      title: 'The Idea', 
      desc: 'Identified the need for personalized, AI-generated learning content'
    },
    { 
      phase: 'Development', 
      date: 'June 2025', 
      title: 'Building the Foundation', 
      desc: 'Developed the core architecture with React and Django'
    },
    { 
      phase: 'Launch', 
      date: 'June 2025', 
      title: 'Going Live', 
      desc: 'Deployed the platform and welcomed our first users'
    },
    { 
      phase: 'Future', 
      date: 'Coming Soon', 
      title: 'Next Generation', 
      desc: 'AI integration, real-time collaboration, and mobile apps'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } font-sora relative overflow-hidden`}>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Prompt2Course
              </h1>
            </div>

            <motion.button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
              whileHover={{ scale: 1.1, rotate: 15 }}
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
      <main className="relative z-10 container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="text-8xl mb-8"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            🚀
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Revolutionizing
            </span>
            <br />
            <span className="text-4xl md:text-6xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Education
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Prompt2Course is an AI-powered learning platform that transforms simple text prompts 
            into comprehensive, structured courses. Built with modern technology and user experience in mind.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 mb-20 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform rotate-12 scale-150" />
          <div className="relative z-10 text-center">
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🎯
            </motion.div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">
              To democratize education by making high-quality, personalized learning content 
              accessible to everyone, regardless of their background, resources, or location. 
              We believe learning should be instant, engaging, and tailored to each individual's needs.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Prompt2Course? ✨
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-xl"
                whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <motion.div 
                  className={`text-white mb-6 flex justify-center p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="text-6xl mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚙️
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Built with cutting-edge technologies for optimal performance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className={`text-center p-6 bg-gradient-to-r ${tech.color} rounded-2xl text-white shadow-lg`}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                <p className="text-sm opacity-90">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Journey 🛤️
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            {timeline.map((item, index) => (
              <motion.div
                key={item.phase}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + index * 0.2 }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {item.date}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10" />
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developer Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -rotate-12 scale-150" />
          <div className="relative z-10">
            <motion.div
              className="text-8xl mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              👨‍💻
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">Meet the Developer</h2>
            <h3 className="text-2xl font-semibold mb-6">hariprasadmanoj3</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Full-stack developer passionate about creating innovative educational solutions 
              that make learning accessible, engaging, and effective for everyone.
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://github.com/hariprasadmanoj3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-6 h-6" />
                <span className="font-medium">GitHub</span>
              </motion.a>
              <motion.a
                href="mailto:hariprasadmanoj3@gmail.com"
                className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-6 h-6" />
                <span className="font-medium">Email</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutPage;