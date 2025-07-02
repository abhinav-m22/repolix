"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCard3DProps {
  icon: LucideIcon;
  title: string;
  description: string;
  demo: {
    title: string;
    content: string;
    highlight: string;
  };
  gradient: string;
  delay?: number;
}

export function FeatureCard3D({ 
  icon: Icon, 
  title, 
  description, 
  demo, 
  gradient, 
  delay = 0 
}: FeatureCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
        `bg-gradient-to-r ${gradient}`
      )} />
      
      {/* Main card */}
      <motion.div
        className="relative glass rounded-2xl p-6 h-full border border-border/50 group-hover:border-neon-cyan/30 transition-all duration-300 transform-gpu"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <motion.div
          className={cn(
            "w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-300",
            `bg-gradient-to-r ${gradient}`
          )}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {description}
        </p>

        {/* Demo preview */}
        <motion.div
          className="space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
        >
          <div className="text-xs font-mono text-neon-cyan bg-neon-cyan/10 rounded-lg px-3 py-1 inline-block">
            {demo.title}
          </div>
          
          <div className="bg-background/50 rounded-lg p-3 border border-border/30">
            <pre className="text-xs font-mono text-foreground leading-relaxed whitespace-pre-wrap">
              {demo.content}
            </pre>
            
            <div className="mt-2 pt-2 border-t border-border/30">
              <span className="text-xs text-neon-pink font-medium">
                {demo.highlight}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-neon-cyan opacity-0 group-hover:opacity-100 transition-all duration-300"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}