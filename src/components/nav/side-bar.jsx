import { NavItem } from "./nav-item";
export const Sidebar = ({ isOpen, onClose }) => {
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