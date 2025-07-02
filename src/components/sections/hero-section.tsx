"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignIn } from '@clerk/nextjs';
import { Github } from 'lucide-react';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen" />;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[#3B82F6]/10 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Transform Your{' '}
            <span className="text-gradient glow-text">GitHub</span>{' '}
            Workflow with{' '}
            <span className="text-gradient glow-text">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-8"
          >
            Get instant commit summaries, intelligent PR reviews, and deep repository insights.
            Let AI handle the repetitive tasks while you focus on building amazing products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="glass-button glow px-8 py-6 text-lg font-medium"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Start Free with GitHub
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-0 bg-background/95 backdrop-blur-xl rounded-xl border border-white/10">
                <SignIn appearance={{ variables: { colorPrimary: '#3B82F6' } }} />
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Product showcase */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative aspect-[16/9]">
            <Image
              src="/images/product-dashboard.png"
              alt="Product Dashboard"
              fill
              className="object-contain rounded-xl shadow-2xl border border-white/10"
              priority
            />
            {/* Glow effect behind the image */}
            <div className="absolute inset-0 -z-10 bg-[#3B82F6]/20 blur-2xl rounded-full transform scale-95" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}