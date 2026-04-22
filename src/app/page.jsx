
import {  IoHelpCircleOutline, IoBulbOutline, IoPeopleOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import StatsSection from '../Components/HomeLayout/StatsSection';
import CategorySection from '../Components/HomeLayout/CategorySection';
import PricingSection from '../Components/HomeLayout/PricingSection';
import Testimonials from '../Components/HomeLayout/Testimonials';
import FAQs from '../Components/HomeLayout/FAQs';
import Banner from '../Components/HomeLayout/Banner';
import { Suspense } from 'react';
import HomeSkeleton from '../Components/LoadinSKelation/HomeSkeleton';

export default function Home() {

  

  const pricingPlans = [
    { title: "Free", price: "$0", features: ["3 Active Projects", "Community Support", "Basic Dashboard"], highlighted: false },
    { title: "Pro", price: "$29/mo", features: ["Unlimited Projects", "Priority Support", "Advanced Analytics", "Custom Profile"], highlighted: true },
    { title: "Enterprise", price: "$99/mo", features: ["Team Management", "Dedicated Support", "API Access", "White-labeling"], highlighted: false },
  ];


  const banners = [
    {
      id: 1,
      title: "Welcome to Problem Solver",
      subtitle: "The ultimate marketplace to connect, manage, and deliver projects efficiently with AI-powered tools.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Hire Expert Problem Solvers",
      subtitle: "Find the top 1% talented solvers specialized in digital logic, web development, and more.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Track Your Success Seamlessly",
      subtitle: "Our dashboard allows you to manage tasks, timelines, and deliverables in one unified place.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1470&q=80",
    },
  ];

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


  return (
   <Suspense fallback={<HomeSkeleton/>}>

     <div className="relative min-h-screen text-slate-900 overflow-x-hidden">
      
  
       {/* Banner Session */}
      <div className="relative z-10">
        <Banner banners={banners} />
      </div>

      {/* Categories Section */}
      <CategorySection></CategorySection>
      {/* state section */}
    <StatsSection></StatsSection>

      <FAQs faqs={faqs} />

      {/* Pricing Section */}
     <PricingSection pricingPlans={pricingPlans}></PricingSection>

      {/* Testimonials */}
      <Testimonials></Testimonials>

      {/* Newsletter - Indigo/Slate High Contrast */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto bg-gray-950 rounded-[50px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] relative">
          <div className="absolute top-0 right-50 left-0 w-96 h-96 bg-indigo-600  opacity-20
       rounded-full blur-[80px] -mr-40 -mt-40" />
          <div className="absolute top-0 right-40 w-96 h-96 bg-indigo-600  opacity-20
       rounded-full blur-[80px] -mr-40 -mt-40" />
          
          <div className="relative z-10 py-20 px-10 md:px-20 text-center md:text-left flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">Stay Ahead <br />of the Curve 🚀</h2>
              <p className="text-indigo-100 font-medium opacity-80">Join 10,000+ developers receiving our weekly tech insights.</p>
            </div>
            <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Work email address"
                className="flex-1 p-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 outline-none focus:bg-white/20 transition-all font-bold"
              />
              <button className="bg-white text-indigo-700 px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
   </Suspense>
  )
}