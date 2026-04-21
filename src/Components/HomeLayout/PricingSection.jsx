'use client'
import React from 'react'
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from 'react-icons/io5';
const PricingSection = ({pricingPlans}) => {
  return (
    <div>


         <section className="py-24  relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Investment <span className='text-indigo-500'>Plans</span></h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`relative p-10 rounded-[35px] flex flex-col justify-between transition-all duration-500 border ${
                  plan.highlighted 
                  ? "bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-900/20" 
                  : "bg-slate-50 border-slate-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-1 rounded-full text-xs font-black uppercase">Most Popular</div>
                )}
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? "text-indigo-400" : "text-slate-800"}`}>{plan.title}</h3>
                  <p className={`text-4xl font-black mb-8 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>{plan.price}</p>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium opacity-80">
                        <IoCheckmarkCircle className={plan.highlighted ? "text-indigo-400" : "text-indigo-600"} size={18} />
                        <span className={plan.highlighted ? "text-slate-300" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`w-full py-4 rounded-2xl font-black transition-all ${
                  plan.highlighted 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "bg-white border-2 border-slate-200 text-slate-900 hover:border-indigo-600 hover:text-indigo-600"
                }`}>
                  Choose {plan.title}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingSection