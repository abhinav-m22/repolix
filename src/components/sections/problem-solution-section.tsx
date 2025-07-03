"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Zap, GitBranch, MessageSquare, XCircle, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';

export function ProblemSolutionSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsRevealed(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const problems = [
    {
      icon: Clock,
      title: "Time-Consuming Code Reviews",
      description: "Developers spend hours manually reviewing commits and understanding code changes.",
      color: "text-red-400",
      bgColor: "bg-red-500/10"
    },
    {
      icon: MessageSquare,
      title: "Context Loss",
      description: "Team members struggle to understand project history and decision-making context.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: GitBranch,
      title: "Complex Repository Navigation",
      description: "Finding relevant code and understanding repository structure takes too long.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: AlertCircle,
      title: "Manual Documentation",
      description: "Creating and maintaining documentation is tedious and often outdated.",
      color: "text-red-400",
      bgColor: "bg-red-500/10"
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Instant AI Summaries",
      description: "Get comprehensive commit summaries and code explanations in seconds, not hours.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: CheckCircle,
      title: "Smart Context Awareness",
      description: "AI maintains full project context and provides relevant insights for every query.",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: GitBranch,
      title: "Intelligent Navigation",
      description: "Find any code, understand dependencies, and explore repositories effortlessly.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: MessageSquare,
      title: "Auto-Generated Docs",
      description: "Documentation that writes itself and stays up-to-date with your codebase.",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10"
    }
  ];

  const stats = [
    { value: '75%', label: 'Time Saved on Reviews' },
    { value: '10x', label: 'Faster Code Understanding' },
    { value: '90%', label: 'Reduced Context Switching' },
    { value: '100%', label: 'Up-to-date Documentation' },
  ];

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden" id='about'>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#3B82F6]/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            From{' '}
            <span className="text-gradient glow-text bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">Problem</span>
            {' '}to{' '}
            <span className="text-gradient glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Solution</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            See how Repolix transforms your development workflow with AI-powered insights
            and automated code analysis.
          </p>
        </motion.div>

        {/* Tab navigation for mobile */}
        <div className="md:hidden flex rounded-lg mb-6 p-1 bg-black/30 backdrop-blur-lg border border-white/10 max-w-xs mx-auto">
          <button
            onClick={() => setActiveTab('problem')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'problem' ? 'bg-red-500/20 text-white' : 'text-white/60 hover:text-white/90'}`}
          >
            Problem
          </button>
          <button
            onClick={() => setActiveTab('solution')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'solution' ? 'bg-blue-500/20 text-white' : 'text-white/60 hover:text-white/90'}`}
          >
            Solution
          </button>
        </div>

        {/* Cards - mobile view with tabs */}
        <div className="md:hidden block">
          <AnimatePresence mode="wait">
            {activeTab === 'problem' ? (
              <motion.div
                key="problem-mobile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card border border-white/10 shadow-xl backdrop-blur-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-white/10">
                  <div className="p-2.5 rounded-full bg-red-500/10 text-red-400">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">The Problem</h3>
                    <p className="text-white/70 text-sm">
                      Manual code review is time-consuming and error-prone
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {problems.map((problem, index) => (
                    <motion.div
                      key={problem.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <div className={`p-2 rounded-lg ${problem.bgColor} transition-all group-hover:scale-110`}>
                        <problem.icon className={`w-4 h-4 ${problem.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white group-hover:text-gradient">{problem.title}</h4>
                        <p className="text-white/60 text-sm">{problem.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => setActiveTab('solution')}
                  className="w-full mt-6 bg-gradient-to-r from-red-400/30 to-blue-500/30 hover:from-red-400/40 hover:to-blue-500/40 border border-white/10 text-white font-medium"
                >
                  See the solution
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="solution-mobile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card border border-white/10 shadow-xl backdrop-blur-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-white/10">
                  <div className="p-2.5 rounded-full bg-[#60A5FA]/10 text-[#60A5FA]">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">The Solution</h3>
                    <p className="text-white/70 text-sm">
                      AI-powered code analysis and automated insights
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {solutions.map((solution, index) => (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <div className={`p-2 rounded-lg ${solution.bgColor} transition-all group-hover:scale-110`}>
                        <solution.icon className={`w-4 h-4 ${solution.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white group-hover:text-gradient">{solution.title}</h4>
                        <p className="text-white/60 text-sm">{solution.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => setActiveTab('problem')}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500/30 to-red-400/30 hover:from-blue-500/40 hover:to-red-400/40 border border-white/10 text-white font-medium"
                >
                  <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                  See the problem
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cards - desktop side-by-side view */}
        <div className="hidden md:flex md:space-x-6 lg:space-x-10">
          {/* Problem Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 glass-card border border-red-500/20 shadow-[0_0_20px_rgba(220,38,38,0.1)] backdrop-blur-xl p-8"
          >
            <div className="flex items-start space-x-4 mb-6 pb-3 border-b border-white/10">
              <div className="p-3 rounded-full bg-red-500/10 text-red-400">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-1">The Problem</h3>
                <p className="text-white/70">
                  Manual code review is time-consuming and error-prone
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className={`p-2.5 rounded-lg ${problem.bgColor} transition-all group-hover:scale-110`}>
                    <problem.icon className={`w-5 h-5 ${problem.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1 group-hover:text-gradient">{problem.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{problem.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solution Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 glass-card border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-xl p-8"
          >
            <div className="flex items-start space-x-4 mb-6 pb-3 border-b border-white/10">
              <div className="p-3 rounded-full bg-[#60A5FA]/10 text-[#60A5FA]">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-1">The Solution</h3>
                <p className="text-white/70">
                  AI-powered code analysis and automated insights
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className={`p-2.5 rounded-lg ${solution.bgColor} transition-all group-hover:scale-110`}>
                    <solution.icon className={`w-5 h-5 ${solution.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1 group-hover:text-gradient">{solution.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{solution.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card border border-white/10 p-5 text-center hover:border-white/20 transition-all"
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}