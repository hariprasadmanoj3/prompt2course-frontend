import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Heart, 
  Zap, 
  Users, 
  Target,
  Brain,
  Sparkles,
  Code,
  Globe,
  Moon,
  Sun,
  Github,
  Linkedin,
  Coffee,
  Rocket,
  Star,
  Award,
  Lightbulb,
  Database,
  Palette,
  Shield
} from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('story');

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
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered Generation",
      description: "Advanced AI algorithms create personalized learning content tailored to your specific needs and learning style.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Instant Course Creation",
      description: "Generate comprehensive courses in seconds, not hours. Get structured learning materials instantly.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: "Personalized Learning",
      description: "Every course is unique and adapted to your skill level, interests, and learning objectives.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "Any Subject",
      description: "From programming to cooking, art to science - learn anything you can imagine with AI assistance.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "1000+", label: "Courses Generated", icon: "📚", color: "text-blue-600" },
    { number: "500+", label: "Happy Learners", icon: "😊", color: "text-green-600" },
    { number: "50+", label: "Subject Areas", icon: "🎯", color: "text-purple-600" },
    { number: "99%", label: "Success Rate", icon: "⭐", color: "text-yellow-600" }
  ];

  const techStack = [
    { name: 'React.js', icon: '⚛️', color: 'from-blue-500 to-cyan-500', description: 'Modern UI Framework' },
    { name: 'Django', icon: '🐍', color: 'from-green-500 to-emerald-500', description: 'Robust Backend' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-blue-800', description: 'Reliable Database' },
    { name: 'AI/ML', icon: '🤖', color: 'from-purple-500 to-pink-500', description: 'Smart Generation' },
    { name: 'Tailwind CSS', icon: '🎨', color: 'from-cyan-500 to-blue-500', description: 'Beautiful Styling' },
    { name: 'Framer Motion', icon: '✨', color: 'from-pink-500 to-rose-500', description: 'Smooth Animations' }
  ];

  const tabs = [
    { id: 'story', label: 'Our Story', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'mission', label: 'Mission', icon: <Target className="w-4 h-4" /> },
    { id: 'vision', label: 'Vision', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'tech', label: 'Technology', icon: <Code className="w-4 h-4" /> }
  ];

  const timeline = [
    {
      date: "2025-06-29",
      title: "Project Launch",
      description: "Prompt2Course was born from the vision to democratize education through AI",
      icon: "🚀"
    },
    {
      date: "2025-06-29",
      title: "AI Integration",
      description: "Implemented advanced AI algorithms for course generation",
      icon: "🤖"
    },
    {
      date: "2025-06-29",
      title: "Full Stack Development",
      description: "Built complete React + Django application with modern design",
      icon: "💻"
    },
    {
      date: "2025-06-29",
      title: "Live Deployment",
      description: "Successfully deployed on Vercel and Render for global access",
      icon: "🌍"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } font-sora relative overflow-hidden`}>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              rotate: [0, 360]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {['🎓', '📚', '🚀', '💡', '⭐', '🎯'][i]}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Prompt2Course
              </h1>
            </div>

            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
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
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Revolutionizing Education with AI</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent leading-tight">
            Transforming Learning
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              One Prompt at a Time
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Prompt2Course is an innovative AI-powered platform that transforms simple text prompts 
            into comprehensive, structured learning courses. Built with cutting-edge technology 
            to democratize education and make learning accessible to everyone.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} dark:text-opacity-80 mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80'
              } backdrop-blur-sm border border-white/30 dark:border-gray-700/30`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-20"
          >
            {activeTab === 'story' && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                  Our Story
                </h2>
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-6 p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                          {item.date}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                  Our Mission
                </h2>
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-12 border border-white/30 dark:border-gray-700/30">
                  <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                    To democratize education by making high-quality, personalized learning accessible 
                    to everyone through the power of artificial intelligence. We believe that learning 
                    should be instant, engaging, and tailored to individual needs.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4">
                      <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
                      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Accessibility</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Making learning available to everyone, everywhere
                      </p>
                    </div>
                    <div className="p-4">
                      <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Innovation</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pushing the boundaries of educational technology
                      </p>
                    </div>
                    <div className="p-4">
                      <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Quality</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Delivering exceptional learning experiences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                  Our Vision
                </h2>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
                  <Lightbulb className="w-16 h-16 mx-auto mb-6" />
                  <p className="text-xl leading-relaxed mb-8">
                    A world where anyone can learn anything they desire, instantly and effectively. 
                    Where the barriers to education are eliminated by intelligent technology that 
                    understands and adapts to each learner's unique journey.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Rocket className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-3">Future Ready</h3>
                      <p className="text-blue-100">
                        Preparing learners for tomorrow's challenges with today's technology
                      </p>
                    </div>
                    <div>
                      <Users className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-3">Global Community</h3>
                      <p className="text-blue-100">
                        Building a worldwide network of empowered learners and educators
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                  Built with Modern Technology
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className={`p-6 bg-gradient-to-br ${tech.color} rounded-2xl text-white relative overflow-hidden`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="relative z-10">
                        <div className="text-4xl mb-4">{tech.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                        <p className="text-white/80">{tech.description}</p>
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-8 -translate-y-8" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Features Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
            Why Choose Prompt2Course?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Creator Section */}
        <motion.div 
          className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-12 border border-white/30 dark:border-gray-700/30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Code className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Created by hariprasadmanoj3
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            A passionate full-stack developer dedicated to making learning accessible 
            through innovative technology. Combining AI, modern web development, and 
            user-centered design to create meaningful educational experiences.
          </p>
          
          <div className="flex items-center justify-center space-x-6 mb-6">
            <motion.a
              href="https://github.com/hariprasadmanoj3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/hariprasadmanoj3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </motion.a>
            <motion.button
              className="flex items-center space-x-2 p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Coffee className="w-5 h-5" />
              <span>Buy Coffee</span>
            </motion.button>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-gray-600 dark:text-gray-400">Built with passion for education</span>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 py-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-600 dark:text-gray-400">Prompt2Course - AI-Powered Learning</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 hariprasadmanoj3. Transforming education with artificial intelligence.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default AboutPage;