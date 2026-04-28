'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have this now

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto px-6 relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
