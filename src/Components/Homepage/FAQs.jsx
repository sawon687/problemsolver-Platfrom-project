'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoHelpCircleOutline, IoBulbOutline, IoPeopleOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

const FAQs = () => {
  const faqs = [
    { 
      question: "How do I create a profile?", 
      answer: "It's simple! Click the 'Join Now' button and sign up with your details. Afterward, complete your profile by adding your skills and portfolio to stand out.",
      icon: <IoHelpCircleOutline className="text-indigo-500" />
    },
    { 
      question: "Can I collaborate with others?", 
      answer: "Yes! Our platform allows you to find other expert solvers and connect with them directly to collaborate on complex projects.",
      icon: <IoPeopleOutline className="text-violet-500" />
    },
    { 
      question: "Is there a free plan available?", 
      answer: "Absolutely! Our free plan allows you to manage up to 3 active projects and gives you access to the basic dashboard. You can upgrade to Pro for larger projects.",
      icon: <IoShieldCheckmarkOutline className="text-blue-500" />
    },
    { 
      question: "How does the payment method work?", 
      answer: "Once you successfully submit your work and the buyer reviews it, coins will be credited to your wallet. You can withdraw these as cash later.",
      icon: <IoBulbOutline className="text-amber-500" />
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] opacity-60" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
            Common Queries
          </h2>
          <p className="text-slate-500 font-medium">Find answers to the most frequently asked questions below.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`group border transition-all duration-300 rounded-[24px] overflow-hidden ${
                  isOpen 
                  ? "border-indigo-200 bg-indigo-50/30 shadow-xl shadow-indigo-500/5" 
                  : "border-slate-100 bg-white hover:border-indigo-100"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm border border-slate-100 text-xl transition-transform duration-300 ${isOpen ? "rotate-[360deg]" : ""}`}>
                      {faq.icon}
                    </div>
                    <span className={`font-bold text-lg transition-colors ${isOpen ? "text-indigo-600" : "text-slate-700"}`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  <div className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`}>
                    <IoChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pl-[72px] text-slate-600 leading-relaxed">
                        <div className="h-[1px] w-full bg-slate-100 mb-4" />
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;