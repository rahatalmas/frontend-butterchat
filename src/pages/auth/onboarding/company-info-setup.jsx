import React, { useState, useEffect } from 'react';
import { Camera, MessageCircle, ChevronDown } from 'lucide-react';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: 'Jon Doe',
    companyCategory: '',
    country: '',
    language: '',
    timezone: ''
  });

  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const fetchCountriesData = async () => {
    try {
      const response = await fetch('https://countries-api-abhishek.vercel.app/countries');
      const result = await response.json();
      
      if (result.data) {
        // Remove duplicate countries by name
        const uniqueCountriesMap = new Map();
        result.data.forEach(country => {
          if (!uniqueCountriesMap.has(country.name)) {
            uniqueCountriesMap.set(country.name, country);
          }
        });
        const uniqueCountries = Array.from(uniqueCountriesMap.values());
        setCountries(uniqueCountries);
        
        // Extract unique languages
        const languageSet = new Set();
        uniqueCountries.forEach(country => {
          if (country.languages) {
            country.languages.forEach(lang => languageSet.add(lang));
          }
        });
        setLanguages(Array.from(languageSet).sort());
        
        // Extract unique timezones
        const timezoneSet = new Set();
        uniqueCountries.forEach(country => {
          if (country.timezones) {
            country.timezones.forEach(tz => timezoneSet.add(tz));
          }
        });
        setTimezones(Array.from(timezoneSet).sort());
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Profile data:', formData);
    alert('Profile updated successfully!');
  };

  const handleSkip = () => {
    console.log('Skipped profile completion');
  };

  const companyCategories = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Consulting',
    'Real Estate',
    'Media & Entertainment',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Header Bar */}
      <div className="">
        <div className=" mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="text-xl font-semibold text-white">ButterChat</span>
          </div>
          <button 
            onClick={handleSkip}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            Skip Now
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 min-h-[calc(100vh-80px)] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Update Profile</h1>
              <p className="text-gray-400 text-sm">Add additional info to complete your profile</p>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-300 via-purple-400 to-blue-400 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="35" r="18" fill="#8B7355"/>
                      <ellipse cx="50" cy="75" rx="28" ry="32" fill="#8B7355"/>
                      <circle cx="50" cy="20" r="15" fill="#FFD700"/>
                      <path d="M 45 18 Q 50 10 55 18" fill="#90EE90" stroke="#228B22" strokeWidth="1"/>
                      <circle cx="45" cy="33" r="2" fill="white"/>
                      <circle cx="55" cy="33" r="2" fill="white"/>
                      <path d="M 45 40 Q 50 43 55 40" fill="none" stroke="white" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors border-2 border-black">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  placeholder="Jon Doe"
                />
              </div>

              {/* Company Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Company Category</label>
                <div className="relative">
                  <select
                    value={formData.companyCategory}
                    onChange={(e) => handleChange('companyCategory', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-white text-sm appearance-none focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                    style={{ color: formData.companyCategory ? 'white' : '#6b7280' }}
                  >
                    <option value="" style={{ color: '#6b7280' }}>Select a country...</option>
                    {companyCategories.map(category => (
                      <option key={category} value={category.toLowerCase()} style={{ color: 'white' }}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    disabled={loading}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-white text-sm appearance-none focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer disabled:opacity-50"
                    style={{ color: formData.country ? 'white' : '#6b7280' }}
                  >
                    <option value="" style={{ color: '#6b7280' }}>
                      {loading ? 'Loading countries...' : 'Select a country...'}
                    </option>
                    {countries.map(country => (
                      <option key={country.name} value={country.name} style={{ color: 'white' }}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <div className="relative">
                  <select
                    value={formData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    disabled={loading}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-white text-sm appearance-none focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer disabled:opacity-50"
                    style={{ color: formData.language ? 'white' : '#6b7280' }}
                  >
                    <option value="" style={{ color: '#6b7280' }}>
                      {loading ? 'Loading languages...' : 'Select a language...'}
                    </option>
                    {languages.map(language => (
                      <option key={language} value={language} style={{ color: 'white' }}>
                        {language}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <div className="relative">
                  <select
                    value={formData.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    disabled={loading}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-white text-sm appearance-none focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer disabled:opacity-50"
                    style={{ color: formData.timezone ? 'white' : '#6b7280' }}
                  >
                    <option value="" style={{ color: '#6b7280' }}>
                      {loading ? 'Loading timezones...' : 'Select a language...'}
                    </option>
                    {timezones.map(timezone => (
                      <option key={timezone} value={timezone} style={{ color: 'white' }}>
                        {timezone}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gray-200 hover:bg-white text-black font-medium py-2.5 rounded-md transition-colors text-sm mt-6"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex items-center justify-between mt-auto pt-8">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            Connect Account
            <span className="text-lg">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}