"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  GitCommit,
  Eye,
  Brain,
  MessageSquareText,
  Users,
  Sparkles
} from 'lucide-react';

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: GitCommit,
      title: "Smart Commit Analysis",
      description: "Get instant, intelligent summaries of any commit with detailed explanations of changes, impact analysis, and code quality insights.",
      demo: {
        title: "Commit: feat/user-auth",
        content: "🔧 Added JWT authentication\n✨ Implemented password hashing\n🛡️ Added security middleware\n📝 Updated API documentation",
        highlight: "AI detected 4 security improvements"
      },
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      borderGradient: "border-blue-500/20",
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
      delay: 0
    },
    {
      icon: Eye,
      title: "Intelligent PR Reviews",
      description: "Automated pull request reviews that catch bugs, suggest improvements, and ensure code quality standards are met consistently.",
      demo: {
        title: "PR Review #247",
        content: "✅ Code quality: Excellent\n⚡ Performance: Optimized\n🔒 Security: No issues\n🧪 Tests: Coverage +15%",
        highlight: "Ready to merge with confidence"
      },
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      borderGradient: "border-green-500/20",
      iconColor: "text-green-400",
      iconBg: "bg-green-500/10",
      delay: 0.2
    },
    {
      icon: Brain,
      title: "Repository Intelligence",
      description: "Deep understanding of your entire codebase with smart navigation, dependency analysis, and architectural insights.",
      demo: {
        title: "Repo Analysis",
        content: "📊 15 modules analyzed\n🔗 23 dependencies mapped\n⚠️ 3 potential improvements\n📈 Health score: 94/100",
        highlight: "Architecture patterns detected"
      },
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      borderGradient: "border-purple-500/20",
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
      delay: 0.4
    },
    {
      icon: MessageSquareText,
      title: "Developer Q&A",
      description: "Ask questions about your code in natural language and get precise, contextual answers with relevant code examples.",
      demo: {
        title: "Q: How does auth work?",
        content: "🤖 The authentication flow:\n1. JWT token validation\n2. Middleware checks\n3. Session management\n4. Secure cookie storage",
        highlight: "Based on your codebase analysis"
      },
      gradient: "from-orange-500 to-red-500",
      bgGradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
      borderGradient: "border-orange-500/20",
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/10",
      delay: 0.6
    },
    {
      icon: Brain,
      title: "AI Powered Developer Onboarding",
      description: "Get a personalized onboarding experience with AI-powered guides, code examples, and best practices.",
      demo: {
        title: "Onboarding: Getting Started with Repolix",
        content: "🚀 3-step setup guide\n📚 5 key concepts explained\n🔄 2 interactive tutorials\n💡 10+ tips for efficient use",
        highlight: "Ready to start building smarter with AI"
      },
      gradient: "from-indigo-500 to-violet-500",
      bgGradient: "bg-gradient-to-br from-indigo-500/10 to-violet-500/10",
      borderGradient: "border-indigo-500/20", 
      iconColor: "text-white",
      iconBg: "bg-indigo-500/10",
      delay: 0.8
    },
    {
      icon: Users,
      title: "Team Collaboration", 
      description: "Collaborate with your team members and manage your team members with ease.",
      demo: {
        title: "Team: Repolix Developers",
        content: "👥 5 members\n🔄 2 active projects\n📊 3 repositories\n💬 100+ messages",
        highlight: "Team collaboration at its best"
      },
      gradient: "from-teal-500 to-blue-500",
      bgGradient: "bg-gradient-to-br from-teal-500/10 to-blue-500/10",
      borderGradient: "border-teal-500/20",
      iconColor: "text-white",
      iconBg: "bg-teal-500/10",
      delay: 1.0
    }
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 300
      }
    }
  };

  return (
    <section id="features" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#3B82F6]/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5" />
      
      {/* Animated particles or accents */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-medium text-sm">Powerful Features</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Everything You Need for{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Smarter Development</span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            From commit analysis to security scans, Repolix provides comprehensive AI-powered tools
            that transform how you work with code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className={`glass-card border ${feature.borderGradient} rounded-xl backdrop-blur-lg overflow-hidden shadow-lg transition-all duration-300`}
            >
              <div className={`h-1 ${feature.bgGradient}`}></div>
              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-start space-x-4 mb-5">
                  <div className={`p-3 rounded-lg ${feature.iconBg} transition-transform group-hover:scale-110`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white pt-1">{feature.title}</h3>
                </div>
                
                <p className="text-white/70 mb-6 flex-grow leading-relaxed">{feature.description}</p>

                {/* Feature demo/preview with animated border */}
                <div className={`rounded-lg overflow-hidden ${hoveredFeature === index ? 'ring-1 ring-white/20' : ''} transition-all duration-300`}>
                  <div className={`${feature.bgGradient} border border-white/10 rounded-lg p-4 text-sm`}>
                    <div className={`font-medium ${feature.iconColor} mb-2`}>{feature.demo.title}</div>
                    <pre className="whitespace-pre-wrap font-mono text-xs text-white/80 leading-relaxed">{feature.demo.content}</pre>
                    <div className="mt-2 text-xs font-medium text-white/90 flex items-center">
                      <Sparkles className={`w-3 h-3 ${feature.iconColor} mr-1.5`} />
                      {feature.demo.highlight}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}