'use client'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const BuyerApplyForm = () => {
  const [loading,setLoading]=useState(false)
  const {data}=useSession()
     console.log('data',data)
    
   const {
        register,
        handleSubmit,
       
      } = useForm()
    const userID=data?._id;
   
          // const userID=data?._id
      const submitBuyerapplication=async(data)=>{
         
            data.user_id=userID
            console.log('data',data)
          try {
               setLoading(true)
               const res=await fetch('/api/BuyerInfo',{
              method:'POST',
               headers: {
                    'Content-Type': 'application/json'
                      },
                body: JSON.stringify(data)
         })

         const result= await res.json()
         console.log('result',result);

         if(result.success)
         {
                setLoading(false)
         }
          } catch (error) {
             setLoading(false)
          }finally{
               setLoading(false)
          }

          
      }
  return (
    <div className="flex justify-center items-center   p-4">
      <form  

       onSubmit={handleSubmit(submitBuyerapplication)}
 
      className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Become a Verified Buyer
      </h3>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
        Fill in your company details to join as a buyer and access exclusive projects.
      </p>

      {/* Input Fields */}
      <div className="space-y-4">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          
          {...register('compnayName')}
          className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 shadow-sm transition"
        />

        <input
          type="text"
          name="address"
          placeholder="Business Address"
         
          {...register('businessAddress')}
      
          className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 shadow-sm transition"
        />

        <input
          type="text"
          name="taxId"
          placeholder="Tax ID / Registration Number"
          {...register('RegistrationorTaxId')}
      
          className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 shadow-sm transition"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-lg shadow-lg hover:from-green-600 hover:to-green-800 transition-all"
      >
       {loading?' Apply Now...':' Apply Now'}
      </button>
    </form>
    </div>
  );
};

export default BuyerApplyForm;