import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';
import { HiOutlineTranslate } from 'react-icons/hi';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const controls = useAnimation();

  const toggleLanguage = async () => {
    // ১. ক্লিক করার সাথে সাথে একটি ছোট স্কেল এনিমেশন (Active Feedback)
    await controls.start({ scale: 0.9, transition: { duration: 0.1 } });
    
    const newLang = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLang);
    
    // ২. এনিমেশন রিসেট
    controls.start({ scale: 1, transition: { type: "spring", stiffness: 300 } });
  };

  const isEn = i18n.language === 'en';

  return (
    <div className="flex items-center gap-4">
      {/* Icon with Rotate Animation */}
      <motion.div 
        animate={{ 
          rotate: isEn ? 0 : 360,
          scale: isEn ? 1 : 1.1 
        }}
        className="text-indigo-500/70 hidden md:block"
      >
        <HiOutlineTranslate size={20} />
      </motion.div>

      <motion.button
        animate={controls} // Active scale effect যুক্ত করা হয়েছে
        onClick={toggleLanguage}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-10 w-[84px] flex items-center bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl rounded-full border border-slate-200/50 dark:border-white/10 p-1 shadow-inner overflow-hidden ring-1 ring-indigo-500/10"
      >
        {/* Futuristic Glowing Slider */}
        <motion.div
          animate={{ 
            x: isEn ? 0 : 40,
            backgroundColor: isEn ? "#4f46e5" : "#7c3aed", // রং পরিবর্তন হবে active হলে
            boxShadow: isEn 
              ? "0 0 15px rgba(79, 70, 229, 0.6)" 
              : "0 0 15px rgba(124, 58, 237, 0.6)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute h-8 w-9 rounded-full z-0"
        />

        {/* Text Labels */}
        <div className="relative flex w-full h-full z-10 pointer-events-none">
          <span className={`flex-1 flex items-center justify-center text-[10px] font-black tracking-tighter transition-all duration-300 ${isEn ? 'text-white' : 'text-slate-500'}`}>
            ENG
          </span>
          <span className={`flex-1 flex items-center justify-center text-[10px] font-black tracking-tighter transition-all duration-300 ${!isEn ? 'text-white' : 'text-slate-500'}`}>
            BN
          </span>
        </div>
      </motion.button>

      {/* Dynamic Status Label with Active Indicator */}
      <div className="hidden lg:flex flex-col items-start leading-none border-l border-slate-200 dark:border-white/10 pl-4 ml-1">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5 flex items-center gap-1">
          <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
          Active
        </span>
        <motion.span 
          key={i18n.language}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[12px] font-black text-slate-900 dark:text-white"
        >
          {isEn ? 'English (US)' : 'বাংলা (BD)'}
        </motion.span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;