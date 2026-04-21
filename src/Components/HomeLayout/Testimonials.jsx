'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoStar, IoChevronBack, IoChevronForward } from "react-icons/io5";

const testimonials = [
  { 
    id: 1,
    name: "Tahmid Rahman", 
    role: "Full Stack Developer, Microwork-hub", 
    text: "This platform is a total game-changer for developers! The UI is modern, and I found several projects that perfectly matched my skill set. Highly recommend!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  { 
    id: 2,
    name: "Ayesha Khan", 
    role: "UI/UX Designer", 
    text: "The experience of collaborating with other experts here is seamless. The platform itself feels so intuitive. Finally, a marketplace that respects designers' worth.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  { 
    id: 3,
    name: "Rakib Hossain", 
    role: "Project Manager, Tech Solutions", 
    text: "I was looking for verified solvers for a complex project. This platform's expert matching system is brilliant. Our project was delivered on time. Excellent service!",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Trusted Voices</h2>
        <p className="text-4xl font-black text-slate-900 tracking-tighter">What <span className='text-indigo-600'> Experts Say</span></p>
      </div>

      <div className="relative h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {testimonials.map((testimonial, index) => {
            // Determine the position of the card
            let position = "inactive";
            if (index === currentIndex) position = "active";
            else if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) position = "prev";
            else if (index === (currentIndex + 1) % testimonials.length) position = "next";

            // Card animation variants
            const variants = {
              active: { opacity: 1, x: 0, scale: 1, zIndex: 10, rotate: 0 },
              next: { opacity: 0.5, x: "60%", scale: 0.85, zIndex: 5, rotate: 5, pointerEvents: 'none' },
              prev: { opacity: 0.5, x: "-60%", scale: 0.85, zIndex: 5, rotate: -5, pointerEvents: 'none' },
              inactive: { opacity: 0, scale: 0.8, zIndex: 1, pointerEvents: 'none' }
            };

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={position}
                variants={variants}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute w-full max-w-4xl h-full flex items-center"
              >
                <div className="bg-white rounded-[48px] shadow-2xl p-12 md:p-16 border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-10 items-center overflow-hidden relative">
                  {/* Glassmorph Accent Beam */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-60"></div>

                  {/* Left: Star Rating & Profile */}
                  <div className="md:col-span-4 text-center border-r border-slate-100 pr-10">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name} 
                      className="w-28 h-28 rounded-full object-cover border-4 border-white mx-auto shadow-2xl" 
                    />
                    <div className="flex items-center justify-center gap-1.5 mt-6 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <IoStar key={i} className={i < testimonial.rating ? "text-amber-400" : "text-slate-200"} size={22} />
                      ))}
                    </div>
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                       Solver Rating
                    </span>
                  </div>

                  {/* Right: Testimonial Text */}
                  <div className="md:col-span-8">
                    <p className="text-2xl md:text-3xl text-slate-700 font-medium leading-relaxed italic text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-10">
                      <h3 className="font-black text-2xl tracking-tight text-slate-900">{testimonial.name}</h3>
                      <p className="text-indigo-600 font-bold text-sm uppercase mt-1.5 tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* --- Navigation Buttons --- */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-30">
          <button 
            onClick={prevSlide}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 active:scale-95 transition-all shadow-xl shadow-slate-900/10 border border-slate-100"
          >
            <IoChevronBack size={32} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-30">
          <button 
            onClick={nextSlide}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 active:scale-95 transition-all shadow-xl shadow-slate-900/10 border border-slate-100"
          >
            <IoChevronForward size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;