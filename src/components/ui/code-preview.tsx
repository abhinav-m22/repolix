"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, GitCommit, MessageSquare, Zap } from 'lucide-react';

export function CodePreview() {
  const [activeTab, setActiveTab] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);

  const tabs = [
    { id: 'commit', label: 'Commit Summary', icon: GitCommit },
    { id: 'review', label: 'PR Review', icon: CheckCircle },
    { id: 'qa', label: 'Code Q&A', icon: MessageSquare },
  ];

  const content = [
    {
      title: "AI Commit Summary",
      code: `// Recent commit analysis
feat: implement user authentication with JWT

✨ Added Features:
• JWT token-based authentication
• Password hashing with bcrypt
• Session management middleware
• Protected route guards

🔧 Technical Changes:
• Updated user model schema
• Added auth utility functions
• Configured JWT secret rotation`,
      highlight: true,
    },
    {
      title: "Smart PR Review",
      code: `🤖 AI Review Summary

✅ Code Quality: Excellent
⚡ Performance: Optimized
🔒 Security: No issues found

Key Findings:
• Great use of TypeScript types
• Proper error handling implemented
• Memory leaks prevented
• Following best practices

Suggestions:
• Consider adding unit tests for new auth functions
• Documentation could be expanded`,
      highlight: true,
    },
    {
      title: "Intelligent Q&A",
      code: `Q: How does the authentication flow work?

🤖 Repolix AI:
The authentication flow follows these steps:

1. User submits credentials to /api/auth/login
2. Server validates against database
3. JWT token generated with user payload
4. Token stored in httpOnly cookie
5. Middleware validates token on protected routes
6. User session maintained until expiration

The implementation uses industry-standard security practices with proper token rotation.`,
      highlight: true,
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [tabs.length]);

  useEffect(() => {
    setTypingIndex(0);
    const timer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        setTypingIndex((prev) => {
          if (prev >= content[activeTab].code.length) {
            clearInterval(typeInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(typeInterval);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeTab, content]);

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-2xl blur-xl" />
      
      {/* Main container */}
      <div className="relative glass-dark rounded-2xl overflow-hidden border border-neon-cyan/20">
        {/* Header with tabs */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium text-neon-cyan">Repolix AI</span>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-border/50">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === index
                  ? 'text-neon-cyan border-b-2 border-neon-cyan bg-neon-cyan/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="p-6 h-80 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <h3 className="text-lg font-semibold text-gradient mb-4">
                {content[activeTab].title}
              </h3>
              
              <div className="font-mono text-sm text-foreground leading-relaxed">
                <pre className="whitespace-pre-wrap">
                  {content[activeTab].code.slice(0, typingIndex)}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-neon-cyan"
                  >
                    |
                  </motion.span>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="flex space-x-1 p-4">
          {tabs.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors ${
                index === activeTab ? 'bg-neon-cyan' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}