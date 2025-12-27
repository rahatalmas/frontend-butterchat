import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, MessageSquare, LayoutDashboard, Users, Calendar, ShoppingCart, MessageCircle, BarChart3, User, Wifi, WifiOff } from 'lucide-react';
import { ThemeProvider } from './provider/theme-provider';
import ThemeToggle from './components/theme-toggle-button';
import TestButterChatUI from './test/test-butter-chat-ui';
import CalendarPage from './pages/appointment/calender-page';
import { useAiSocket } from './provider/ai-socket-provider';
import LoginPage from './pages/auth/login-page';
import SignupPage from './pages/auth/signup-page';
import { useAuth } from './provider/auth-provider';
import CompanyProfileSetup from './pages/auth/onboarding/company-info-setup';

// Dashboard Component
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">Total Customers</h3>
        <p className="text-2xl font-bold mt-2 dark:text-white">1,234</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">Active Orders</h3>
        <p className="text-2xl font-bold mt-2 dark:text-white">56</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">Conversations</h3>
        <p className="text-2xl font-bold mt-2 dark:text-white">89</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">Revenue</h3>
        <p className="text-2xl font-bold mt-2 dark:text-white">$45,678</p>
      </div>
    </div>
  </div>
);

// Agents Component
const Agents = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Agents</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Manage your AI agents and team members.</p>
    </div>
  </div>
);

// Content Pages
const TrendsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Content Trends</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">View content trends and analytics.</p>
    </div>
  </div>
);

const ContentPromotionsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Content Promotions</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Manage content promotion campaigns.</p>
    </div>
  </div>
);

const SchedulePage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Content Schedule</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Schedule and plan your content.</p>
    </div>
  </div>
);

const ContentSettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Content Settings</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Configure content settings.</p>
    </div>
  </div>
);

// Appointment Pages
const PromotionPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Appointment Promotions</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Manage appointment promotions.</p>
    </div>
  </div>
);

const ServicePage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Services</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Configure your service offerings.</p>
    </div>
  </div>
);

const SettingPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Appointment Settings</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Appointment settings and configurations.</p>
    </div>
  </div>
);

// Commerce Pages
const CustomersPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Customers</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">View and manage customer information.</p>
    </div>
  </div>
);

const OrdersPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Orders</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Track and manage customer orders.</p>
    </div>
  </div>
);

const ProductsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Products</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Manage your product catalog.</p>
    </div>
  </div>
);

const PromotionsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Commerce Promotions</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Create and manage promotional campaigns.</p>
    </div>
  </div>
);

// Conversation Pages
const ConversationListPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Conversation List</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">View all customer conversations.</p>
    </div>
  </div>
);

const SavedReplyPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Saved Replies</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Manage quick reply templates.</p>
    </div>
  </div>
);

const TemplatesPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Message Templates</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Create and edit message templates.</p>
    </div>
  </div>
);

// Other Pages
const Groups = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Groups</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Manage customer and team groups.</p>
    </div>
  </div>
);

const Analytics = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Analytics</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">View business insights and reports.</p>
    </div>
  </div>
);

const Profile = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">Profile</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">Manage your account settings.</p>
    </div>
  </div>
);

// Navigation Item Component
const NavItem = ({ icon: Icon, label, to, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasSubMenu = children && children.length > 0;
  
  const isActive = to ? location.pathname === to : false;
  const isParentActive = hasSubMenu && children.some(child => location.pathname === child.to);

  if (hasSubMenu) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
            isParentActive 
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </div>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`
                }
              >
                <span className="text-sm">{child.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 transition-colors ${
          isActive 
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: MessageSquare, label: 'Butter Chat UI', to: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
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
    {
      icon: Calendar,
      label: 'Contents',
      children: [
        { label: 'Trends', to: '/contents/trends' },
        { label: 'Promotions', to: '/contents/promotions' },
        { label: 'Schedule', to: '/contents/schedule' },
        { label: 'Settings', to: '/contents/settings' },
      ],
    },
    {
      icon: Calendar,
      label: 'Appointments',
      children: [
        { label: 'Calendar', to: '/appointments/calendar' },
        { label: 'Promotions', to: '/appointments/promotions' },
        { label: 'Services', to: '/appointments/services' },
        { label: 'Settings', to: '/appointments/settings' },
      ],
    },
    {
      icon: MessageCircle,
      label: 'Conversation',
      children: [
        { label: 'Conversation List', to: '/conversation/list' },
        { label: 'Saved Replies', to: '/conversation/saved-replies' },
        { label: 'Templates', to: '/conversation/templates' },
      ],
    },
    { icon: Users, label: 'Groups', to: '/groups' },
    { icon: BarChart3, label: 'Analytics', to: '/analytics' },
    { icon: User, label: 'Profile', to: '/profile' },
  ];

  const {logout} = useAuth()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Butter Chat</h1>
            <button onClick={onClose} className="lg:hidden text-gray-700 dark:text-gray-300">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            {navItems.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </nav>
        <button onClick={()=>{logout()}}>Logout</button>

        </div>
      </aside>
    </>
  );
};

// Layout Component
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {connected} = useAiSocket()
  const onboard = true;
  return (
    onboard?
    <Routes>
              <Route path='/update-profile' element={<CompanyProfileSetup/>}/>
    </Routes>:
    <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="flex w-full max-w-screen-1600 h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-700 dark:text-gray-300"
                >
                <Menu size={24} />
                </button>
                <div >
                   {connected?< Wifi color='green'/>:<WifiOff color='red'/>}
                </div>
                {/* <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  AI-Based ERP & 360° Business Solution
                </h2> */}
              </div>
 
              <ThemeToggle />
            </div>
            
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<TestButterChatUI/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/agents" element={<Agents />} />
              
              {/* Content Routes */}
              <Route path="/contents/trends" element={<TrendsPage />} />
              <Route path="/contents/promotions" element={<ContentPromotionsPage />} />
              <Route path="/contents/schedule" element={<SchedulePage />} />
              <Route path="/contents/settings" element={<ContentSettingsPage />} />
              
              {/* Appointment Routes */}
              <Route path="/appointments/calendar" element={<CalendarPage/>} />
              <Route path="/appointments/promotions" element={<PromotionPage />} />
              <Route path="/appointments/services" element={<ServicePage />} />
              <Route path="/appointments/settings" element={<SettingPage />} />
              
              {/* Commerce Routes */}
              <Route path="/commerce/customers" element={<CustomersPage />} />
              <Route path="/commerce/orders" element={<OrdersPage />} />
              <Route path="/commerce/products" element={<ProductsPage />} />
              <Route path="/commerce/promotions" element={<PromotionsPage />} />
              
              {/* Conversation Routes */}
              <Route path="/conversation/list" element={<ConversationListPage />} />
              <Route path="/conversation/saved-replies" element={<SavedReplyPage />} />
              <Route path="/conversation/templates" element={<TemplatesPage />} />
              
              {/* Other Routes */}
              <Route path="/groups" element={<Groups />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </div>
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
  
  return (
    <ThemeProvider>
      <Router>
        {isAuthenticated ? <Layout /> : <AuthLayout/>}
      </Router>
    </ThemeProvider>
  );
};

export default App;