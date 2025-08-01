import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const services = [
    { name: "Web Development", href: "#" },
    { name: "Mobile Apps", href: "#" },
    { name: "Brand Identity", href: "#" },
    { name: "Digital Marketing", href: "#" },
    { name: "Business Strategy", href: "#" },
    { name: "IT Consulting", href: "#" }
  ];

  const company = [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#contact" }
  ];

  const legal = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR Compliance", href: "#" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
                alt="MIV Global Technology" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Your 4-in-1 growth partner, transforming African startups into global leaders 
              through integrated digital solutions, branding, marketing, and strategic guidance.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent" />
                <span className="text-sm">hello@mivglobal.tech</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-accent" />
                <span className="text-sm">+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-accent" />
                <span className="text-sm">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for insights, tips, and updates.
            </p>
            
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-lg focus:outline-none focus:border-accent"
              />
              <button className="bg-gradient-to-r from-gold-light to-gold text-accent-foreground px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-primary-foreground/10 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legal Links */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              {legal.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-primary-foreground/60 hover:text-accent transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} MIV Global Technology. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;