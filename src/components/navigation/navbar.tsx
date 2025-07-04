"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-background/80 backdrop-blur-md border-b border-border'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center">
              <img src="/logo.svg" alt="Repolix" width={32} height={32} />
            </div>
            <span className="text-xl font-bold text-white text-gradient">Repolix</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-white hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-pink group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/abhinav-m22/repolix" target="_blank" rel="noopener noreferrer" className="text-white">
                  <Github className="w-4 h-4 mr-2" />
                  Star on GitHub
                </a>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:glow text-white shadow-lg"
                asChild
              >
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block text-white hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                  <SignedOut>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="https://github.com/abhinav-m22/repolix" target="_blank" rel="noopener noreferrer" className="text-white">
                        <Github className="w-4 h-4 mr-2" />
                        Star on GitHub
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white shadow-lg"
                      asChild
                    >
                      <Link href="/sign-in">Get Started</Link>
                    </Button>
                  </SignedOut>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}