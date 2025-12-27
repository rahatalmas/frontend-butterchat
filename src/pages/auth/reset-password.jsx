import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function PasswordResetPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    subdomain: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      {/* Left Side - Logo + Form */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto">
        {/* Logo at top */}
        <div className="flex items-center gap-2 p-6 lg:p-8">
          <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          <span className="text-white text-lg lg:text-xl">ButterChat</span>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pb-8">
          <div className="w-full max-w-md">
            {/* Heading */}
            <h1 className="text-white text-2xl lg:text-3xl font-semibold mb-2">Login to your account</h1>
            <p className="text-gray-500 text-sm mb-6 lg:mb-8">Fill in the form below to login</p>

            {/* Form Fields */}
            <div className="space-y-4 lg:space-y-5">
              {/* Email */}
              <div>
                <label className="text-white text-sm block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="user@xyzcorp.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-zinc-900 text-white text-sm px-4 py-2.5 rounded border border-zinc-800 focus:border-zinc-700 focus:outline-none placeholder-gray-600"
                />
                <p className="text-gray-600 text-xs mt-1">We'll use this to contact you. We will not share your email with anyone else.</p>
              </div>

              {/* Password */}
              <div>
                <label className="text-white text-sm block mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full bg-zinc-900 text-white text-sm px-4 py-2.5 rounded border border-zinc-800 focus:border-zinc-700 focus:outline-none placeholder-gray-500"
                />
                <p className="text-gray-600 text-xs mt-1">Must be at least 8 characters</p>
              </div>

              {/* Create Account Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-white text-black text-sm font-medium py-2.5 rounded hover:bg-gray-100 transition"
              >
                Login
              </button>

              {/* Divider */}
              <div className="text-center text-gray-500 text-sm">Or continue with</div>

              {/* Social Login Buttons */}
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-zinc-900 text-white py-2.5 rounded border border-zinc-800 hover:bg-zinc-800 transition flex items-center justify-center"
                >
                  <span className="text-lg">f</span>
                </button>
                <button
                  className="flex-1 bg-zinc-900 text-white py-2.5 rounded border border-zinc-800 hover:bg-zinc-800 transition flex items-center justify-center"
                >
                  <span className="text-lg">G</span>
                </button>
                <button
                  className="flex-1 bg-zinc-900 text-white py-2.5 rounded border border-zinc-800 hover:bg-zinc-800 transition flex items-center justify-center"
                >
                  <span className="text-lg">in</span>
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center text-gray-500 text-sm">
                Don't have an account?{' '}
                <NavLink to='/signup' ><button className="text-white hover:underline">Sign up</button></NavLink>
              </div>

              {/* Terms
              <div className="text-center text-gray-600 text-xs">
                By clicking continue, you agree to our{' '}
                <button className="hover:text-gray-400 underline">Terms of Service</button>
                {' '}and{' '}
                <button className="hover:text-gray-400 underline">Privacy Policy</button>.
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Full Height Image */}
      <div className="hidden lg:block lg:w-1/2 fixed right-0 top-0 h-screen">
        <img 
          src="assets/images/sb9.jpg"
          alt="Abstract gradient background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}