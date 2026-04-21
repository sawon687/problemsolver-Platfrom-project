// FullPageLoader.jsx
import { motion } from 'framer-motion';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[999]">
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full"
        />
        
        {/* Inner Pulsing Logo or Icon */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "mirror" }}
          className="absolute text-2xl font-black text-slate-900"
        >
          F
        </motion.div>
      </div>
      
      {/* Loading Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-slate-400"
      >
        Optimizing Dashboard...
      </motion.p>
    </div>
  );
};