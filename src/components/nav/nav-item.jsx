import { ChevronDown, ChevronRight, Menu, X, MessageSquare, LayoutDashboard, Users, Calendar, ShoppingCart, MessageCircle, BarChart3, User, Wifi, WifiOff, Sidebar } from 'lucide-react';

export const NavItem = ({ icon: Icon, label, to, children }) => {
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