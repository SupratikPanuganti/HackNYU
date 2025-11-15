import { 
  MessageSquare, 
  LayoutDashboard, 
  Package, 
  MapPin, 
  Wrench, 
  FileText,
  ChevronDown
} from 'lucide-react';
import { User } from '@/types/wardops';

interface SidebarProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'ask', label: 'Ask Vitalis', icon: MessageSquare },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'locations', label: 'Locations', icon: MapPin },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'reports', label: 'Reports', icon: FileText },
];

export function Sidebar({ user, activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="flex h-screen w-64 flex-col bg-bg-secondary border-r border-border">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center">
            <div className="h-6 w-6 border-2 border-bg-primary rounded-sm" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-primary">Vitalis</h1>
            <p className="text-xs text-text-tertiary">AI Ops Command Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-smooth relative
                ${isActive 
                  ? 'bg-bg-tertiary text-text-primary glow-border-cyan' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-accent-cyan rounded-r glow-cyan" />
              )}
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-border">
        <div className="glass-panel rounded-lg p-3 flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-magenta to-accent-blue flex items-center justify-center">
              <span className="text-sm font-bold text-text-primary">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            {user.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-accent-green rounded-full border-2 border-bg-secondary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
            <p className="text-xs text-text-tertiary truncate">{user.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-text-tertiary flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
