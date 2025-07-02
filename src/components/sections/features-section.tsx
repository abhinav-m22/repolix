"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FeatureCard3D } from '@/components/ui/feature-card-3d';
import { 
  GitCommit, 
  Eye, 
  Brain, 
  MessageSquareText, 
  Video, 
  Shield,
  Zap,
  Code
} from 'lucide-react';

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
      delay: 0.6
    },
    {
      icon: Video,
      title: "Meeting Transcription",
      description: "Convert development meetings into actionable insights with automatic transcription, task extraction, and decision tracking.",
      demo: {
        title: "Meeting: Sprint Planning",
        content: "📋 5 tasks identified\n⏰ 3 deadlines set\n👥 4 assignees noted\n📌 2 action items created",
        highlight: "Automatically synced to project"
      },
      gradient: "from-teal-500 to-blue-500",
      delay: 0.8
    },
    {
      icon: Shield,
      title: "Security AI Scans",
      description: "Proactive security analysis that identifies vulnerabilities, suggests fixes, and ensures compliance with security best practices.",
      demo: {
        title: "Security Scan",
        content: "🛡️ 0 critical issues\n⚠️ 2 minor suggestions\n✅ OWASP compliant\n🔐 Dependencies secure",
        highlight: "Security score: 98/100"
      },
      gradient: "from-red-500 to-pink-500",
      delay: 1.0
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#3B82F6]/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-[#60A5FA]" />
            <span className="text-[#60A5FA] font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Everything You Need for{' '}
            <span className="text-gradient glow-text">Smarter Development</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From commit analysis to security scans, Repolix provides comprehensive AI-powered tools 
            that transform how you work with code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 hover:glow transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <feature.icon className={`w-10 h-10 ${feature.gradient} mb-6`} />
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/70 mb-6 flex-grow">{feature.description}</p>
                
                {/* Feature demo/preview */}
                <div className="glass rounded-lg p-4 text-sm text-white/60">
                  <div className="font-medium text-[#60A5FA] mb-2">{feature.demo.title}</div>
                  <pre className="whitespace-pre-wrap font-mono text-xs">{feature.demo.content}</pre>
                  <div className="mt-2 text-xs text-[#60A5FA]/80">{feature.demo.highlight}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 glass-button px-6 py-3">
            <Code className="w-5 h-5 text-[#60A5FA]" />
            <span className="text-sm font-medium text-white/80">
              All features work seamlessly with your existing GitHub workflow
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}