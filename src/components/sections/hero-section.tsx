"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignIn } from '@clerk/nextjs';
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplayPlugin] = useState(() => 
    AutoPlay({ 
      delay: 2000, 
      stopOnInteraction: true, 
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement 
    })
  );

  const productImages = [
    '/images/product-dashboard.png',
    '/images/product-dashboard-2.png',
    '/images/product-dashboard-3.png',
    '/images/product-dashboard-4.png',
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
    },
    [autoplayPlugin]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    // Resume autoplay after 5 seconds
    setTimeout(() => {
      autoplayPlugin.play();
    }, 5000);
  };

  const handleMouseLeave = () => {
    autoplayPlugin.play();
  };

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
            <Button
              size="lg"
              className="glass-button glow px-8 py-6 text-lg font-medium cursor-pointer"
              onClick={() => router.push('/sign-up')}
            >
              Let's Get Started!
            </Button>
          </motion.div>
        </div>

        {/* Product showcase carousel */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div 
            className="overflow-hidden cursor-pointer" 
            ref={emblaRef}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex">
              {productImages.map((image, index) => (
                <div key={index} className="flex-[0_0_100%]">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={image}
                      alt={`Product Dashboard View ${index + 1}`}
                      fill
                      className="object-contain rounded-xl shadow-2xl border border-white/10"
                      priority={index === 0}
                    />
                    {/* Glow effect behind the image */}
                    <div className="absolute inset-0 -z-10 bg-[#3B82F6]/20 blur-2xl rounded-full transform scale-95" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {productImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                  selectedIndex === index 
                    ? "bg-blue-500 scale-125" 
                    : "bg-gray-400/50 hover:bg-gray-400/80"
                )}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}