"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Zap, Users, Building, Crown } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignIn } from '@clerk/nextjs';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Developer",
      icon: Zap,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for individual developers",
      features: [
        "5 repositories",
        "100 commits/month",
        "Basic AI summaries",
        "Community support"
      ],
      popular: false,
      cta: "Start Free"
    },
    {
      name: "Team",
      icon: Users,
      price: { monthly: 29, annual: 290 },
      description: "Great for small development teams",
      features: [
        "Unlimited repositories",
        "Unlimited commits",
        "Advanced AI features",
        "PR review automation",
        "Team collaboration",
        "Priority support"
      ],
      popular: true,
      cta: "Start Trial"
    },
    {
      name: "Enterprise",
      icon: Building,
      price: { monthly: 99, annual: 990 },
      description: "For large organizations",
      features: [
        "Everything in Team",
        "Custom integrations",
        "Advanced security",
        "Dedicated support",
        "SLA guarantee",
        "Custom training"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-6 h-6 text-neon-purple" />
            <span className="text-neon-purple font-medium">Pricing</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient">Plan</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free and scale as your team grows. All plans include our core AI features.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isAnnual ? 'bg-neon-cyan' : 'bg-border'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="text-xs bg-neon-pink/20 text-neon-pink px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative glass rounded-2xl p-8 ${
                plan.popular 
                  ? 'border-2 border-neon-cyan glow-purple' 
                  : 'border border-border/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <plan.icon className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-neon-cyan to-neon-purple hover:glow text-white shadow-lg'
                        : 'bg-background border border-border hover:bg-muted text-foreground'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md p-0 bg-background rounded-xl">
                  <SignIn appearance={{ variables: { colorPrimary: '#a21caf' } }} />
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            All plans include 14-day free trial • No credit card required
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <span>✓ Cancel anytime</span>
            <span>✓ 99.9% uptime SLA</span>
            <span>✓ SOC 2 compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}