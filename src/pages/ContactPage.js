import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Moon,
  Sun,
  Clock,
  CheckCircle,
  Star,
  Globe,
  Heart,
  Zap,
  Shield,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('🎉 Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '', priority: 'normal' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      value: 'hariprasadmanoj3@gmail.com',
      link: 'mailto:hariprasadmanoj3@gmail.com',
      color: 'from-blue-500 to-cyan-500',
      description: 'Send us an email anytime'
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: 'GitHub',
      value: 'hariprasadmanoj3',
      link: 'https://github.com/hariprasadmanoj3',
      color: 'from-gray-600 to-gray-800',
      description: 'Check out our projects'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Location',
      value: 'India 🇮🇳',
      link: null,
      color: 'from-green-500 to-emerald-500',
      description: 'Based in India, serving globally'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Response Time',
      value: '< 24 hours',
      link: null,
      color: 'from-purple-500 to-pink-500',
      description: 'Quick response guaranteed'
    }
  ];

  const socialLinks = [
    { 
      icon: <Github className="w-6 h-6" />, 
      name: 'GitHub', 
      url: 'https://github.com/hariprasadmanoj3',
      color: 'hover:bg-gray-100 dark:hover:bg-gray-700'
    },
    { 
      icon: <Linkedin className="w-6 h-6" />, 
      name: 'LinkedIn', 
      url: '#',
      color: 'hover:bg-blue-100 dark:hover:bg-blue-900'
    },
    { 
      icon: <Twitter className="w-6 h-6" />, 
      name: 'Twitter', 
      url: '#',
      color: 'hover:bg-blue-100 dark:hover:bg-blue-900'
    },
    { 
      icon: <Mail className="w-6 h-6" />, 
      name: 'Email', 
      url: 'mailto:hariprasadmanoj3@gmail.com',
      color: 'hover:bg-red-100 dark:hover:bg-red-900'
    }
  ];

  const quickTopics = [
    { emoji: '🐛', text: 'Bug Report', subject: 'Bug Report: ' },
    { emoji: '💡', text: 'Feature Request', subject: 'Feature Request: ' },
    { emoji: '❓', text: 'General Question', subject: 'Question: ' },
    { emoji: '🤝', text: 'Partnership', subject: 'Partnership Inquiry: ' },
    { emoji: '📚', text: 'Course Feedback', subject: 'Course Feedback: ' },
    { emoji: '💼', text: 'Business Inquiry', subject: 'Business Inquiry: ' }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Quick Response',
      desc: 'We respond to all messages within 24 hours'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy Protected',
      desc: 'Your information is completely secure with us'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Support',
      desc: 'Join our growing community of learners'
    }
  ];

  // Floating background elements
  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ));

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } font-sora relative overflow-hidden`}>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-600/10 to-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contact Us
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
          className="text-center mb-16"
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
            📞
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions, suggestions, or just want to say hello? 
            We'd love to hear from you! Our team is here to help you succeed.
          </p>
        </motion.div>

        {/* Quick Contact Features */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <motion.div 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Send className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Send Message</h2>
            </div>
            
            {/* Quick Topic Buttons */}
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                Quick topics:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickTopics.map((topic, index) => (
                  <motion.button
                    key={topic.text}
                    onClick={() => setFormData({...formData, subject: topic.subject})}
                    className="p-2 text-xs bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200 flex items-center space-x-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                  >
                    <span>{topic.emoji}</span>
                    <span className="text-gray-700 dark:text-gray-300">{topic.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                >
                  <option value="low">Low Priority</option>
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all duration-300"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg"
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className={`p-3 rounded-2xl bg-gradient-to-r ${info.color} text-white shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-1">
                        {info.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {info.description}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                Connect with Us 🌐
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-white dark:bg-gray-700 ${social.color} text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 flex items-center space-x-3 border border-gray-200 dark:border-gray-600`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                  >
                    {social.icon}
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Response Promise */}
            <motion.div 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform rotate-12 scale-150" />
              <div className="relative z-10">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  ⚡
                </motion.div>
                <h3 className="font-bold text-2xl mb-3">Quick Response Guarantee</h3>
                <p className="opacity-90 mb-4">
                  We typically respond within 24 hours. For urgent matters, 
                  feel free to reach out directly via email for faster assistance.
                </p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Response within 24 hours</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ or Additional Info Section */}
        <motion.div 
          className="mt-20 text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          >
            💬
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            For technical support, bug reports, or urgent inquiries, don't hesitate to reach out. 
            We're committed to providing the best possible experience for all our users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:hariprasadmanoj3@gmail.com"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span>Email Support</span>
            </motion.a>
            <motion.a
              href="https://github.com/hariprasadmanoj3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span>GitHub Issues</span>
            </motion.a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ContactPage;