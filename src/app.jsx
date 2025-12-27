import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, MessageSquare, LayoutDashboard, Users,Sun,Bell,LogOut, Calendar, ShoppingCart, MessageCircle, BarChart3, User, Wifi, WifiOff } from 'lucide-react';
import { ThemeProvider } from './provider/theme-provider';
import { useAiSocket } from './provider/ai-socket-provider';
import LoginPage from './pages/auth/login-page';
import SignupPage from './pages/auth/signup-page';
import { useAuth } from './provider/auth-provider';
import CompanyProfileSetup from './pages/auth/onboarding/company-info-setup';


// Navigation Item Component
const NavItem = ({ icon: Icon, label, to, children, isActive, location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubMenu = children && children.length > 0;

  if (hasSubMenu) {
    const isParentActive = children.some(child => location?.pathname === child.to);
    
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isParentActive 
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white border border-emerald-500/30' 
              : 'text-gray-400 hover:bg-zinc-800/50 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon size={20} />
            <span className="font-medium text-sm">{label}</span>
          </div>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {children.map((child, idx) => {
              const childActive = location?.pathname === child.to;
              return (
                <div
                  key={idx}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-left cursor-pointer ${
                    childActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white border border-emerald-500/30' 
                      : 'text-gray-400 hover:bg-zinc-800/50 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{child.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const itemActive = location?.pathname === to;
  
  return (
    <div
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 transition-all duration-200 cursor-pointer ${
        itemActive
          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white border border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
          : 'text-gray-400 hover:bg-zinc-800/50 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
};

// Sidebar Component - Matching your structure
const Sidebar = ({ isOpen, onClose, isDark, setIsDark, location }) => {
  // Your nav items structure
  const navItems = [
    { icon: MessageSquare, label: 'Butter Chat UI', to: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: Users, label: 'Departments', to: '/department' },
    { icon: Users, label: 'Agents', to: '/agents' },
    {
      icon: ShoppingCart,
      label: 'Commerce',
      children: [
        { label: 'Customers', to: '/commerce/customers' },
        { label: 'Orders', to: '/commerce/orders' },
        { label: 'Products', to: '/commerce/products' },
        { label: 'Promotions', to: '/commerce/promotions' },
      ],
    },
  ];

  const handleLogout = () => {
    // Your logout logic here - connect to useAuth().logout()
    alert('Logout clicked - connect to your logout function');
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-black border-r border-zinc-800/50 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static flex flex-col relative overflow-hidden`}
      >
        {/* Overlay gradient for better readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        {/* Sidebar Header with Gradient Title */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/50 relative z-10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <MessageCircle className="w-6 h-6 text-white" />
              <div className="absolute inset-0 blur-lg bg-gradient-to-r from-emerald-500 to-teal-500 opacity-50" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              ButterChat
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Navigation - This is where your NavLink components would go */}
        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
          {navItems.map((item, idx) => (
            <NavItem
              key={idx}
              icon={item.icon}
              label={item.label}
              to={item.to}
              location={location}
              children={item.children}
            />
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-zinc-800/50 relative z-10 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-zinc-800/50 hover:text-white transition-all duration-200">
            <User size={20} />
            <span className="font-medium text-sm">Profile</span>
          </button>
          
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-zinc-800/50 hover:text-white transition-all duration-200"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium text-sm">Theme</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-zinc-800/50 hover:text-white transition-all duration-200 relative">
            <Bell size={20} />
            <span className="font-medium text-sm">Notifications</span>
            <span className="absolute top-2 left-7 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border hover:border-red-500/30 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

// Layout Component - Matching your structure
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  // Mock location - replace with useLocation() from react-router-dom
  const location = { pathname: '/' };

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="flex w-full max-w-screen-1600 h-screen bg-black">
        {/* Conditionally render sidebar wrapper to prevent space on mobile when closed */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            isDark={isDark}
            setIsDark={setIsDark}
            location={location}
          />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header - Only visible on mobile */}
          <header className="bg-black border-b border-zinc-800/50 px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ButterChat
              </h2>
              <div className="w-6"></div>
            </div>
          </header>

          {/* Main content area - Your Routes go here */}
          <main className="flex-1 overflow-y-auto bg-black custom-scrollbar">
            {/* This is where your <Routes> component would render */}
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Connect Your Routes Here
                </h2>
                <p className="text-gray-400">
                  Replace this with your {'<Routes>'} component
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>
    </div>
  );
};


const AuthLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
    </Routes>
  );
};

// Main App Component
const App = () => {
  let {isAuthenticated} = useAuth();
  let test = true;
  return (
    <ThemeProvider>
      <Router>
        {test ? <Layout /> : <AuthLayout/>}
      </Router>
    </ThemeProvider>
  );
};

export default App;



    // onboard?
    // <Routes>
    //           <Route path='/update-profile' element={<CompanyProfileSetup/>}/>
    // </Routes>: