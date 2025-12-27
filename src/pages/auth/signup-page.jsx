import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/auth-provider';

const BASE_DOMAIN = 'butterchat.io';

export default function SignupPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    sub_domain: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Field change handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setApiError('');
  };

  // Client-side validation
  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.sub_domain.trim()) {
      newErrors.sub_domain = 'Subdomain is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.sub_domain)) {
      newErrors.sub_domain = 'Only lowercase letters, numbers & hyphens allowed';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      company_name: formData.companyName,
      email: formData.email,
      password: formData.password,
      sub_domain: `${formData.sub_domain}.${BASE_DOMAIN}`,
    };

    const result = await register(payload);

    if (result.status === 'success') {
      navigate('/update-profile');
    } else {
      // Global API error (based on your response pattern)
      setApiError(result.message || 'Registration failed');
    }
  };

  // Input class helper
  const inputClass = (field) =>
    `w-full bg-zinc-900 text-white text-sm px-4 py-2.5 rounded border 
     ${errors[field] ? 'border-red-500' : 'border-zinc-800'}
     focus:outline-none focus:border-zinc-600`;

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      {/* Left */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto">
        <div className="flex items-center gap-2 p-6">
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="text-white text-xl">ButterChat</span>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-10">
          <div className="w-full max-w-md">
            <h1 className="text-white text-3xl font-semibold mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Fill in the form below to create your account.
            </p>

            {/* API error */}
            {apiError && (
              <div className="mb-4 rounded bg-red-500/10 border border-red-500 text-red-400 text-sm px-4 py-2">
                {apiError}
              </div>
            )}

            <div className="space-y-5">
              {/* Company Name */}
              <div>
                <label className="text-white text-sm mb-1 block">
                  Company Name
                </label>
                <input
                  value={formData.companyName}
                  onChange={(e) =>
                    handleChange('companyName', e.target.value)
                  }
                  className={inputClass('companyName')}
                />
                {errors.companyName && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Subdomain */}
              <div>
                <label className="text-white text-sm mb-1 block">
                  Subdomain
                </label>
                <div className="flex">
                  <input
                    value={formData.sub_domain}
                    onChange={(e) =>
                      handleChange(
                        'sub_domain',
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, '')
                      )
                    }
                    className={`flex-1 rounded-l ${inputClass('sub_domain')}`}
                  />
                  <span className="bg-white text-black px-4 py-2.5 rounded-r text-sm">
                    .butterchat.io
                  </span>
                </div>
                {errors.sub_domain && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.sub_domain}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-white text-sm mb-1 block">Email</label>
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
                <label className="text-white text-sm mb-1 block">
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

              {/* Confirm Password */}
              <div>
                <label className="text-white text-sm mb-1 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange('confirmPassword', e.target.value)
                  }
                  className={inputClass('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-white text-black py-2.5 rounded font-medium
                           hover:bg-gray-100 transition
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="text-center text-gray-500 text-sm">
                Already have an account?{' '}
                <NavLink to="/" className="text-white hover:underline">
                  Sign In
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right image */}
      <div className="hidden lg:block lg:w-1/2 fixed right-0 top-0 h-screen">
        <img
          src="assets/images/sb11.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
