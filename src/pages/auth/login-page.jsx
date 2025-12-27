import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/auth-provider';
import GoogleLoginButton from '../../components/google-auth/google-auth-btn';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Input change handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setApiError('');
  };

  // Client-side validation
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    const result = await login(payload);

    if (result.status === 'success') {
      navigate('/');
    } else {
      setApiError(result.message || 'Login failed');
    }
  };

  // Input class helper
  const inputClass = (field) =>
    `w-full bg-zinc-900 text-white text-sm px-4 py-2.5 rounded border 
     ${errors[field] ? 'border-red-500' : 'border-zinc-800'}
     focus:outline-none focus:border-zinc-600`;

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto">
        <div className="flex items-center gap-2 p-6 lg:p-8">
          <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          <span className="text-white text-lg lg:text-xl">ButterChat</span>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pb-8">
          <div className="w-full max-w-md">
            <h1 className="text-white text-2xl lg:text-3xl font-semibold mb-2">
              Login to your account
            </h1>
            <p className="text-gray-500 text-sm mb-6 lg:mb-8">
              Fill in the form below to login
            </p>

            {/* API Error */}
            {apiError && (
              <div className="mb-4 rounded bg-red-500/10 border border-red-500 text-red-400 text-sm px-4 py-2">
                {apiError}
              </div>
            )}

            <div className="space-y-4 lg:space-y-5">
              {/* Email */}
              <div>
                <label className="text-white text-sm block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-white text-sm block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={inputClass('password')}
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-white text-black text-sm font-medium py-2.5 rounded 
                           hover:bg-gray-100 transition
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {/* Divider */}
              <div className="text-center text-gray-500 text-sm">
                Or continue with
              </div>

              {/* Social Login */}
              <div className="flex gap-4">
                <button className="flex-1 bg-zinc-900 text-white py-2.5 rounded border border-zinc-800 hover:bg-zinc-800 transition">
                  f
                </button>
                <button className="flex-1 bg-zinc-900 text-white py-2.5 rounded border border-zinc-800 hover:bg-zinc-800 transition">
                  <GoogleLoginButton/>
                </button>
                <button className="flex-1 bg-zinc-900 text-white py-2.5 rounded border border-zinc-800 hover:bg-zinc-800 transition">
                  in
                </button>
              </div>

              {/* Sign up */}
              <div className="text-center text-gray-500 text-sm">
                Don&apos;t have an account?{' '}
                <NavLink to="/signup" className="text-white hover:underline">
                  Sign up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden lg:block lg:w-1/2 fixed right-0 top-0 h-screen">
        <img
          src="assets/images/sb9.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}