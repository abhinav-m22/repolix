"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Zap, GitBranch, MessageSquare, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export function ProblemSolutionSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
      color: "text-red-400"
    },
    {
      icon: MessageSquare,
      title: "Context Loss",
      description: "Team members struggle to understand project history and decision-making context.",
      color: "text-orange-400"
    },
    {
      icon: GitBranch,
      title: "Complex Repository Navigation",
      description: "Finding relevant code and understanding repository structure takes too long.",
      color: "text-yellow-400"
    },
    {
      icon: AlertCircle,
      title: "Manual Documentation",
      description: "Creating and maintaining documentation is tedious and often outdated.",
      color: "text-red-400"
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Instant AI Summaries",
      description: "Get comprehensive commit summaries and code explanations in seconds, not hours.",
      color: "text-neon-cyan"
    },
    {
      icon: CheckCircle,
      title: "Smart Context Awareness",
      description: "AI maintains full project context and provides relevant insights for every query.",
      color: "text-green-400"
    },
    {
      icon: GitBranch,
      title: "Intelligent Navigation",
      description: "Find any code, understand dependencies, and explore repositories effortlessly.",
      color: "text-neon-purple"
    },
    {
      icon: MessageSquare,
      title: "Auto-Generated Docs",
      description: "Documentation that writes itself and stays up-to-date with your codebase.",
      color: "text-neon-pink"
    }
  ];

  const stats = [
    { value: '75%', label: 'Time Saved on Reviews' },
    { value: '10x', label: 'Faster Code Understanding' },
    { value: '90%', label: 'Reduced Context Switching' },
    { value: '100%', label: 'Up-to-date Documentation' },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#3B82F6]/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            From{' '}
            <span className="text-gradient glow-text">Problem</span>
            {' '}to{' '}
            <span className="text-gradient glow-text">Solution</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how Repolix transforms your development workflow with AI-powered insights
            and automated code analysis.
          </p>
        </motion.div>

        <div className="relative">
          {/* Card container with horizontal scroll */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-1000 ease-out"
              style={{ transform: `translateX(-${isRevealed ? 100 : 0}%)` }}
            >
              {/* Problem Card */}
              <div className="min-w-full">
                <div className="glass-card p-8 md:p-12">
                  <div className="flex items-start space-x-4 mb-8">
                    <div className="p-3 rounded-full bg-red-500/10 text-red-400">
                      <XCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">The Problem</h3>
                      <p className="text-white/70">
                        Manual code review is time-consuming and error-prone
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {problems.map((problem, index) => (
                      <motion.div
                        key={problem.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="p-2 rounded-lg bg-red-500/10">
                          <problem.icon className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">{problem.title}</h4>
                          <p className="text-white/60 text-sm">{problem.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    onClick={() => setIsRevealed(true)}
                    className="glass-button mt-8 text-white/90"
                    disabled={isRevealed}
                  >
                    See the solution
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Solution Card */}
              <div className="min-w-full">
                <div className="glass-card p-8 md:p-12">
                  <div className="flex items-start space-x-4 mb-8">
                    <div className="p-3 rounded-full bg-[#60A5FA]/10 text-[#60A5FA]">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">The Solution</h3>
                      <p className="text-white/70">
                        AI-powered code analysis and automated insights
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {solutions.map((solution, index) => (
                      <motion.div
                        key={solution.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="p-2 rounded-lg bg-[#60A5FA]/10">
                          <solution.icon className="w-5 h-5 text-[#60A5FA]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">{solution.title}</h4>
                          <p className="text-white/60 text-sm">{solution.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    onClick={() => setIsRevealed(false)}
                    className="glass-button mt-8 text-white/90"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    See the problem
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className={`w-3 h-3 rounded-full transition-colors ${!isRevealed ? 'bg-red-400' : 'bg-white/20'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${isRevealed ? 'bg-[#60A5FA]' : 'bg-white/20'}`} />
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-gradient glow-text mb-2">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}