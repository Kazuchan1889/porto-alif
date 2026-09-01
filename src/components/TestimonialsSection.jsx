import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { testimonial } from '../data/portfolioData';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "Alif is an exceptionally talented and dedicated developer who consistently delivers clean, high-performance web and mobile solutions. His technical acumen in Vue.js and rapid problem-solving during our project execution was beyond our expectations.",
      author: "Aditya Pratama",
      role: "Senior Engineering Lead",
      company: "Digital Infrastructure & Power Solutions",
      avatar: "/assets/testimonial-avatar.jpg",
      rating: 5
    },
    {
      id: 2,
      quote: "Working with Alif on the Antreless mobile ordering platform was a fantastic experience. He engineered smooth routing, state management, and robust REST API integrations with impressive speed and attention to detail.",
      author: "Rian Hidayat",
      role: "Product Lead",
      company: "Antreless Campus Tech",
      avatar: "/assets/alif-portrait.jpg",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonial Card matching reference composition */}
        <div className="relative rounded-3xl bg-dark-850/80 border border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-2xl shadow-purple-950/30">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Portrait Photo (matches reference left photo) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-dark-900">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* RIGHT: Quote, Author, Arrows (matches reference right text & arrows) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              
              <div>
                {/* Quote Icon */}
                <div className="mb-4 text-brand-violet opacity-80">
                  <Quote className="w-10 h-10 rotate-180" />
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-slate-100 leading-relaxed mb-6">
                  "{current.quote}"
                </blockquote>
              </div>

              {/* Author Info & Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div>
                  <h4 className="text-base font-display font-bold text-white">
                    {current.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">
                    {current.role} • <span className="text-brand-cyan">{current.company}</span>
                  </p>
                </div>

                {/* Arrow Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
