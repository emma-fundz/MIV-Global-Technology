import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import CurrencySelector from './CurrencySelector';
import MegaMenu from './MegaMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('client');

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    // Check for current user and fetch their role
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user role for proper dashboard routing
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || 'client');
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user role when auth state changes
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || 'client');
      } else {
        setUserRole('client');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
                alt="MIV Global Technology" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground hover:text-accent transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <MegaMenu />
          </nav>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-3">
            <CurrencySelector />
            {user ? (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Start Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <div className="px-3 mb-4">
                  <CurrencySelector />
                </div>
                {user ? (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">
                        Start Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;