"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Calendar, Rocket, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignIn } from '@clerk/nextjs';

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Rocket className="w-6 h-6 text-neon-cyan" />
            <span className="text-neon-cyan font-medium">Ready to Transform?</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-bold mb-6">
            Start Building <span className="text-gradient">Smarter</span> Today
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of developers who have already transformed their GitHub workflow with AI.
            Get started in less than 60 seconds.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Trial Option */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-8 border-2 border-neon-cyan/50 hover:glow-purple transition-all duration-300"
            >
              <Github className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Start Free Trial</h3>
              <p className="text-muted-foreground mb-6">
                Connect your GitHub account and experience the power of AI-driven development tools instantly.
              </p>
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li>✓ No credit card required</li>
                <li>✓ 14-day full access</li>
                <li>✓ Setup in 60 seconds</li>
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:glow text-white shadow-lg">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md p-0 bg-background rounded-xl">
                  <SignIn appearance={{ variables: { colorPrimary: '#a21caf' } }} />
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Demo Option */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-8 border border-border/50 hover:border-neon-pink/50 transition-all duration-300"
            >
              <Calendar className="w-12 h-12 text-neon-pink mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Book a Demo</h3>
              <p className="text-muted-foreground mb-6">
                See how Repolix can transform your team's workflow with a personalized demonstration.
              </p>
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li>✓ 30-minute session</li>
                <li>✓ Tailored to your needs</li>
                <li>✓ Q&A with our experts</li>
              </ul>
              <Button size="lg" variant="outline" className="w-full border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-background">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}