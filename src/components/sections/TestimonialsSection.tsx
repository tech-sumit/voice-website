"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    content: "VoiceAI has completely transformed our customer support. We're able to handle 4x more calls while maintaining incredibly high satisfaction rates.",
    author: "Sarah Johnson",
    title: "Customer Support Director",
    company: "TechGrowth Solutions",
    avatarUrl: "/testimonials/avatar1.png",
    industry: "SaaS",
  },
  {
    id: 2,
    content: "The voice quality and conversation flow are indistinguishable from our human agents. Our customers often can't tell they're speaking with AI.",
    author: "Michael Chen",
    title: "CTO",
    company: "EcomForce",
    avatarUrl: "/testimonials/avatar2.png",
    industry: "E-commerce",
  },
  {
    id: 3,
    content: "Setting up AI voice agents was remarkably simple. In just one week, we were handling thousands of appointment bookings automatically.",
    author: "Emily Rodriguez",
    title: "Operations Manager",
    company: "HealthFirst",
    avatarUrl: "/testimonials/avatar3.png",
    industry: "Healthcare",
  },
  {
    id: 4,
    content: "The ROI speaks for itself – we've reduced our call center costs by 60% while expanding to 24/7 coverage. VoiceAI paid for itself in less than 2 months.",
    author: "David Wilson",
    title: "CEO",
    company: "Global Connect",
    avatarUrl: "/testimonials/avatar4.png",
    industry: "Telecommunications",
  },
];

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-surface-50 dark:bg-surface-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary-400/10 dark:bg-primary-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-accent-400/10 dark:bg-accent-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-800 text-accent-800 dark:text-accent-300 text-sm font-medium mb-3"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent-500 mr-2"></span>
            Testimonials
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white"
          >
            What Our <span className="text-gradient-primary">Customers</span> Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Thousands of companies trust VoiceAI for their critical communications
          </motion.p>
        </div>
      
        <div className="relative max-w-5xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="card-glass lg:p-10 p-8 backdrop-blur-sm"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/3 flex justify-center">
                    <div className="relative h-28 w-28 lg:h-36 lg:w-36 rounded-full overflow-hidden border-4 border-white dark:border-surface-800 shadow-lg bg-gradient-to-tr from-secondary-100 via-primary-100 to-accent-100 dark:from-secondary-900/40 dark:via-primary-900/40 dark:to-accent-900/40">
                      {/* Replace with actual avatar images when you have them */}
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gradient-primary">
                        {testimonials[activeTestimonial].author.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <svg className="h-12 w-12 text-primary-300 dark:text-primary-700 mb-6 opacity-30" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    
                    <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                      {testimonials[activeTestimonial].content}
                    </p>
                    
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6 mt-4">
                      <h4 className="font-semibold text-lg text-neutral-900 dark:text-white">
                        {testimonials[activeTestimonial].author}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {testimonials[activeTestimonial].title}, {testimonials[activeTestimonial].company}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
                          {testimonials[activeTestimonial].industry}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6">
              <motion.button
                onClick={prevTestimonial}
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white dark:bg-surface-800 shadow-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6">
              <motion.button
                onClick={nextTestimonial}
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white dark:bg-surface-800 shadow-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center mt-10 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'w-8 bg-primary-500 hover:bg-primary-600' 
                    : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600'
                } h-2 rounded-full`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 