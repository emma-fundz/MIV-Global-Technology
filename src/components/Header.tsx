import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> 3138a7e395df39d9e4684a71cff880f35f9634aa

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
<<<<<<< HEAD
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
=======
    { label: 'Who We Are', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Why Choose MIV', href: '#why-choose' },
    { label: 'Contact', href: '#contact' },
>>>>>>> 3138a7e395df39d9e4684a71cff880f35f9634aa
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
<<<<<<< HEAD
            <Link to="/">
              <img 
                src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
                alt="MIV Global Technology" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>
=======
            <img 
              src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
              alt="MIV Global Technology" 
              className="h-8 md:h-10 w-auto"
            />
>>>>>>> 3138a7e395df39d9e4684a71cff880f35f9634aa
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
<<<<<<< HEAD
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground hover:text-accent transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
=======
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors duration-300 font-medium"
              >
                {item.label}
              </a>
>>>>>>> 3138a7e395df39d9e4684a71cff880f35f9634aa
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="btn-outline-gold">
              Get Quote
            </Button>
            <Button className="btn-gold">
              Book Consultation
            </Button>
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
<<<<<<< HEAD
                <Link
                  key={item.label}
                  to={item.href}
=======
                <a
                  key={item.label}
                  href={item.href}
>>>>>>> 3138a7e395df39d9e4684a71cff880f35f9634aa
                  className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
<<<<<<< HEAD
                </Link>
=======
                </a>
>>>>>>> 3138a7e395df39d9e4684a71cff880f35f9634aa
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full btn-outline-gold">
                  Get Quote
                </Button>
                <Button className="w-full btn-gold">
                  Book Consultation
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;