import React from 'react';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-600 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full focus:border-2 focus:border-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full  outline-0 focus:border-2 focus:border-green-500"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm" />
              Remember me
            </label>
            <a className="text-green-600 hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button className="btn btn-primary w-full mt-4">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <Link href="/Register" className="text-green-600 font-medium hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
