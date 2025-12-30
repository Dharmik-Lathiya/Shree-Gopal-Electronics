'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeUp' 
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animations = {
      fadeUp: { y: 50, opacity: 0 },
      fadeLeft: { x: -50, opacity: 0 },
      fadeRight: { x: 50, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 }
    };

    gsap.fromTo(element, 
      animations[animation],
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [animation]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
