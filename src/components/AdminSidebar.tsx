import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  MessageSquare,
  FileText,
  UserCheck,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  className?: string;
}

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
  { id: 'team', label: 'Team Directory', icon: UserCheck },
];

export default function AdminSidebar({ activeTab, onTabChange, onLogout, className }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
            alt="MIV" 
            className="h-8 w-8 flex-shrink-0"
          />
          {(!collapsed || mobile) && (
            <div className="min-w-0">
              <h2 className="text-lg font-semibold truncate">Admin Panel</h2>
              <p className="text-xs text-muted-foreground truncate">MIV Growth Hub</p>
            </div>
          )}
        </div>
        {!mobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto flex-shrink-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isActive && "bg-primary/10 text-primary font-medium",
                  collapsed && !mobile && "px-2 justify-center"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {(!collapsed || mobile) && <span className="truncate">{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-10 text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed && !mobile && "px-2 justify-center"
          )}
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {(!collapsed || mobile) && <span className="truncate">Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex h-full bg-background border-r transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-64",
        className
      )}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="lg:hidden flex-shrink-0">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent mobile />
        </SheetContent>
      </Sheet>
    </>
  );
}
