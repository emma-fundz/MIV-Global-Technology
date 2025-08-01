import { Shield, Headphones, Zap, Users, BarChart, Smartphone, Cloud, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AddOnsSection = () => {
  const addOns = [
    {
      icon: Shield,
      title: "Website Security & SSL",
      description: "Complete security package with SSL certificates, malware protection, and regular security audits",
      price: "₦25,000",
      period: "/year",
      features: ["SSL Certificate", "Malware Scanning", "Security Monitoring", "Backup & Recovery"]
    },
    {
      icon: Headphones,
      title: "Priority Support",
      description: "24/7 dedicated support with 1-hour response time for critical issues",
      price: "₦15,000",
      period: "/month",
      features: ["24/7 Support", "1-hour Response", "Dedicated Manager", "Phone Support"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed optimization, CDN setup, and performance monitoring for lightning-fast websites",
      price: "₦35,000",
      period: "one-time",
      features: ["Speed Optimization", "CDN Setup", "Performance Monitoring", "Regular Audits"]
    },
    {
      icon: Users,
      title: "Team Training",
      description: "Comprehensive training for your team on using and managing your digital solutions",
      price: "₦50,000",
      period: "per session",
      features: ["Live Training Sessions", "Video Tutorials", "Documentation", "Follow-up Support"]
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "In-depth analytics setup with custom dashboards and monthly performance reports",
      price: "₦20,000",
      period: "/month",
      features: ["Custom Dashboards", "Monthly Reports", "Goal Tracking", "Conversion Analysis"]
    },
    {
      icon: Smartphone,
      title: "Mobile App Maintenance",
      description: "Ongoing maintenance, updates, and feature additions for your mobile applications",
      price: "₦40,000",
      period: "/month",
      features: ["Regular Updates", "Bug Fixes", "Feature Additions", "Store Management"]
    },
    {
      icon: Cloud,
      title: "Cloud Hosting & Management",
      description: "Managed cloud hosting with automatic scaling, backups, and performance optimization",
      price: "₦30,000",
      period: "/month",
      features: ["Cloud Hosting", "Auto Scaling", "Daily Backups", "Performance Monitoring"]
    },
    {
      icon: Lock,
      title: "Data Protection & GDPR",
      description: "Complete data protection compliance including GDPR, privacy policies, and data audits",
      price: "₦45,000",
      period: "one-time setup",
      features: ["GDPR Compliance", "Privacy Policies", "Data Audits", "Compliance Monitoring"]
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Add-On Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Enhance your package with specialized services designed to maximize 
            your business potential and ensure long-term success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {addOns.map((addon, index) => (
            <Card 
              key={addon.title}
              className="card-elevated bg-card border-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-gold-light to-gold w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <addon.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">{addon.title}</CardTitle>
                <CardDescription className="text-sm">
                  {addon.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-accent">
                    {addon.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {addon.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {addon.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" className="w-full btn-outline-gold text-sm">
                  Add to Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-secondary to-secondary/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Need Multiple Add-Ons?</h3>
            <p className="text-muted-foreground mb-6">
              Bundle 3 or more add-on services and save up to 25% on your total cost
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-gold">
                Create Custom Bundle
              </Button>
              <Button variant="outline" className="btn-outline-gold">
                Speak to Consultant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddOnsSection;