"use client";

import { motion } from 'framer-motion';
import { Star, GitBranch, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingRepoProps {
  className?: string;
  repoName: string;
  stars: string;
  language: string;
  delay?: number;
}

export function FloatingRepo({ className, repoName, stars, language, delay = 0 }: FloatingRepoProps) {
  const languageColors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={cn(
        "glass rounded-xl p-4 w-64 cursor-pointer hover:scale-105 transition-transform duration-300",
        className
      )}
      whileHover={{ y: -5 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 2,
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{repoName}</h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Star className="w-3 h-3" />
            <span>{stars}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Circle 
              className="w-2 h-2" 
              style={{ color: languageColors[language] }}
              fill="currentColor"
            />
            <span>{language}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Last commit: 2 hours ago
        </div>
      </div>
    </motion.div>
  );
}