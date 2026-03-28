'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GoogleSIngupButton = ({role}) => {
  console.log('role selection',role)
  const handleGoogleLogin = () => {
    localStorage.setItem("role", role); // save role temporarily
    signIn("google", { callbackUrl: "/Dashboard" });
  };

  return (
    <div>
 <button className='btn w-full shadow-md flex mt-3' onClick={handleGoogleLogin}>
      <FcGoogle size={20} />
      <p>Sign in with Google {role}</p>
      </button> </div>
  )
}

export default GoogleSIngupButton