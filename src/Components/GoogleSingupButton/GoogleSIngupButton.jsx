'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GoogleSIngupButton = ({role}) => {
 
  const handleGoogleLogin = () => {
  
    signIn("google", role? { callbackUrl: "/Dashboard" }:null);
  };

  return (
    <div>
 <button className='btn w-full py-6 shadow-md  rounded-2xl flex mt-3' onClick={handleGoogleLogin}>
      <FcGoogle size={20} />
      <p>Sign in with Google {role}</p>
      </button> </div>
  )
}

export default GoogleSIngupButton