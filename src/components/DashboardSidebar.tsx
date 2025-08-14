import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  Layout, 
  ShoppingCart, 
  Megaphone, 
  TrendingUp, 
  Users, 
  BarChart3, 
  CreditCard, 
  Settings,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  available?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { title: 'Home', icon: Home, href: '/client-dashboard', available: true },
  { title: 'Builder', icon: Layout, href: '/builder', available: false },
  { title: 'Commerce', icon: ShoppingCart, href: '/commerce', available: false },
  { title: 'Marketing', icon: Megaphone, href: '/marketing', available: false },
  { title: 'Sales', icon: TrendingUp, href: '/sales', available: false },
  { title: 'People', icon: Users, href: '/people', available: false },
  { title: 'Scale', icon: BarChart3, href: '/scale', available: false },
  { title: 'Plans', icon: CreditCard, href: '/pricing', available: true },
  { title: 'Settings', icon: Settings, href: '/settings', available: false },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isOpen, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-background border-r z-50 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-0 lg:w-16'}
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="h-16 border-b flex items-center justify-between px-4">
          {isOpen && (
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
                alt="MIV" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg">MIV</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <div key={item.title}>
                  {item.available ? (
                    <Link to={item.href}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 h-10 ${
                          !isOpen ? 'px-2' : 'px-3'
                        }`}
                        onClick={() => {
                          // Close mobile sidebar on navigation
                          if (window.innerWidth < 1024) onToggle();
                        }}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {isOpen && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            {item.badge && (
                              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 h-10 opacity-50 cursor-not-allowed ${
                        !isOpen ? 'px-2' : 'px-3'
                      }`}
                      disabled
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {isOpen && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Coming Soon Notice */}
          {isOpen && (
            <div className="mt-8 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                Coming Soon
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Advanced features are being developed and will be available in your next update.
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
};

export default DashboardSidebar;