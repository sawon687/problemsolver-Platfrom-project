import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // General
      "welcome": "Welcome to our Platform",
      "hire_expert": "Hire Expert Solvers",
      "get_started": "Get Started Now",
      
      // Navigation Items
      "nav_home": "Home",
      "nav_about": "About",
      "nav_project": "Project",
      "nav_blog": "Blog",
      "nav_contact": "Contact",
      
      // Auth
      "btn_login": "Login",
      "btn_join_now": "Join Now"
    }
  },
  bn: {
    translation: {
      // General
      "welcome": "আমাদের প্ল্যাটফর্মে স্বাগতম",
      "hire_expert": "অভিজ্ঞ সমাধানকারী নিয়োগ দিন",
      "get_started": "এখনই শুরু করুন",
      
      // Navigation Items
      "nav_home": "হোম",
      "nav_about": "আমাদের সম্পর্কে",
      "nav_project": "প্রজেক্ট",
      "nav_blog": "ব্লগ",
      "nav_contact": "যোগাযোগ",
      
      // Auth
      "btn_login": "লগইন",
      "btn_join_now": "এখনই যুক্ত হন"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;