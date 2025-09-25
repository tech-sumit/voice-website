"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import siteConfig from "@/config/site.json";

interface Agent {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  phoneNumber: string;
  avatar?: string;
}

interface Category {
  id: string;
  name: string;
  agents: Agent[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AgentShowcase() {
  const [activeCategory, setActiveCategory] = useState("ecommerce");
  
  // Get data from siteConfig
  const agentShowcaseData = siteConfig.agentShowcase;
  const currentCategory = agentShowcaseData.categories.find((cat: Category) => cat.id === activeCategory);

  return (
    <section id="agents" className="py-12 bg-gradient-to-b from-surface-50 to-surface-100 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0">
        {/* Dotted grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #EDF1D6 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Geometric decorations */}
        <div className="absolute top-20 left-20 w-24 h-24 border border-bright-600/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 border border-bright-500/20 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 border border-bright-400/20 rotate-12"></div>

        {/* Gradient orbs */}
        <div className="absolute top-40 left-1/4 w-72 h-72 bg-bright-600/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-bright-500/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
                    <div className="inline-flex items-center px-4 py-2 bg-bright-100 border border-bright-300 rounded-full mb-6">
                      <div className="w-2 h-2 bg-bright-600 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-bright-700 text-sm font-medium tracking-wide uppercase">OUR AGENTS</span>
                    </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight"
          >
            {agentShowcaseData.title.split(" ").map((word, index) => (
              <span key={index}>
                        {word === "More" || word === "Talk" ? (
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-400 to-bright-300">
                            {word}
                          </span>
                        ) : (
                          word
                        )}{" "}
              </span>
            ))}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            {agentShowcaseData.subtitle}
          </motion.p>
        </div>

        {/* Enhanced Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {agentShowcaseData.categories.map((category: Category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
                      className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeCategory === category.id
                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                          : "bg-white/80 backdrop-blur-sm border border-neutral-200 text-neutral-700 hover:bg-white hover:text-neutral-900 hover:border-neutral-300"
                      }`}
            >
              {activeCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-lg opacity-30"></div>
              )}
              <span className="relative">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Redesigned Agent Cards */}
        <motion.div 
          key={activeCategory}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {currentCategory?.agents.map((agent: Agent) => {
            // Use consistent primary gradient for all cards
            const gradient = "from-primary-500 to-primary-600";
            
            return (
              <motion.div 
                key={agent.id}
                variants={item}
                        className="group relative bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl overflow-hidden hover:bg-white hover:border-neutral-300 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card header with gradient */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                
                <div className="p-6 flex flex-col flex-1">
                  {/* Agent Avatar and Info */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      {agent.avatar ? (
                        <Image src={agent.avatar} alt={agent.name} width={56} height={56} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <PhoneIcon className="w-7 h-7 text-white" />
                      )}
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-500 transition-colors duration-300 line-clamp-2">
                        {agent.name}
                      </h3>
                      
                      {/* Category Tag */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs font-medium bg-primary-900/30 text-primary-400 rounded-full border border-primary-600/20">
                          {agent.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description - flexible height */}
                          <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300 flex-1 line-clamp-4">
                    {agent.description}
                  </p>
                </div>
                
                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
                  <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white/80 backdrop-blur-sm border border-neutral-300 rounded-full shadow-sm">
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full bg-secondary-600 animate-pulse`} style={{animationDelay: `${i * 0.15}s`}}></div>
                      ))}
                    </div>
                    <span className="text-neutral-600 text-sm">Ready to deploy across industries</span>
                  </div>
        </motion.div>
      </div>
    </section>
  );
}
