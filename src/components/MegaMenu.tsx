import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ShoppingCart, Users, Link as LinkIcon, Megaphone, Calendar, MessageSquare, CreditCard, GraduationCap, Globe, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MegaMenu = () => {
  const menuItems = [
    {
      category: 'Commerce',
      items: [
        { name: 'Online Courses', icon: GraduationCap, href: '/services', description: 'Create and sell educational content' },
        { name: 'Products', icon: ShoppingCart, href: '/services', description: 'Digital and physical product sales' },
        { name: 'Community', icon: Users, href: '/services', description: 'Build engaged communities' },
        { name: 'Link-in-bio', icon: LinkIcon, href: '/services', description: 'Optimize your social presence' },
      ]
    },
    {
      category: 'Marketing',
      items: [
        { name: 'Marketing', icon: Megaphone, href: '/services', description: 'Complete marketing solutions' },
        { name: 'Scheduling', icon: Calendar, href: '/contact', description: 'Appointment and event management' },
        { name: 'SMS Text', icon: MessageSquare, href: '/services', description: 'Direct SMS marketing campaigns' },
        { name: 'CRM', icon: CreditCard, href: '/services', description: 'Customer relationship management' },
      ]
    },
    {
      category: 'Management',
      items: [
        { name: 'School Management', icon: GraduationCap, href: '/services', description: 'Complete educational administration' },
      ]
    },
    {
      category: 'Builder',
      items: [
        { name: 'Website', icon: Globe, href: '/services', description: 'Professional website development' },
        { name: 'Landing Page', icon: Layout, href: '/services', description: 'High-converting landing pages' },
      ]
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-1 text-foreground hover:text-accent font-medium">
          Create
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-screen max-w-4xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {menuItems.map((category) => (
            <div key={category.category}>
              <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <item.icon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm mb-1">Ready to get started?</h4>
              <p className="text-xs text-muted-foreground">
                Choose from our comprehensive packages designed for African entrepreneurs
              </p>
            </div>
            <Link to="/pricing">
              <Button size="sm">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MegaMenu;