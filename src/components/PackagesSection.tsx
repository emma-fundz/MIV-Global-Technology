import { Check, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PackagesSection = () => {
  const packages = [
    {
      name: "Student Starter",
      description: "Perfect for students and early-stage entrepreneurs",
      price: "₦50,000",
      period: "/project",
      features: [
        "Basic website design",
        "Logo design",
        "Social media setup",
        "Basic SEO",
        "1 month support"
      ],
      popular: false,
      color: "border-border"
    },
    {
      name: "Basic",
      description: "Essential services for small businesses",
      price: "₦150,000",
      period: "/project",
      features: [
        "Professional website",
        "Complete branding package",
        "Social media management (3 months)",
        "Basic marketing strategy",
        "3 months support",
        "Mobile responsive design"
      ],
      popular: false,
      color: "border-border"
    },
    {
      name: "Standard",
      description: "Comprehensive solution for growing businesses",
      price: "₦300,000",
      period: "/project",
      features: [
        "Custom web application",
        "Advanced branding & identity",
        "6 months marketing campaign",
        "Lead generation system",
        "Business strategy consultation",
        "6 months support",
        "E-commerce integration",
        "Analytics setup"
      ],
      popular: true,
      color: "border-accent shadow-[var(--shadow-gold)]"
    },
    {
      name: "Premium",
      description: "Advanced solutions for established businesses",
      price: "₦600,000",
      period: "/project",
      features: [
        "Custom software development",
        "Complete brand overhaul",
        "12 months marketing & sales",
        "Advanced automation",
        "Executive coaching (6 months)",
        "12 months support",
        "Mobile app development",
        "Advanced analytics",
        "API integrations"
      ],
      popular: false,
      color: "border-border"
    },
    {
      name: "Elite",
      description: "Enterprise-level transformation package",
      price: "Custom",
      period: "pricing",
      features: [
        "Full digital transformation",
        "Enterprise branding solution",
        "Ongoing marketing partnership",
        "Complete business strategy overhaul",
        "Year-round mentorship",
        "24/7 priority support",
        "Multi-platform development",
        "Advanced integrations",
        "Dedicated account manager",
        "Performance guarantees"
      ],
      popular: false,
      color: "border-foreground"
    }
  ];

  return (
    <section id="packages" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Service Packages
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect package for your business needs. All packages include 
            seamless integration across our 4 service divisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.name}
              className={`relative card-elevated bg-card ${pkg.color} ${pkg.popular ? 'scale-105' : ''} animate-fade-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-gold-light to-gold text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                <CardDescription className="text-sm mb-4">
                  {pkg.description}
                </CardDescription>
                <div className="text-3xl font-bold">
                  {pkg.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    {pkg.period}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${pkg.popular ? 'btn-gold' : 'btn-outline-gold'}`}
                >
                  {pkg.name === 'Elite' ? 'Contact Us' : 'Get Started'}
                  {pkg.popular && <Zap className="ml-2 h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need something custom? We create tailored solutions for unique business needs.
          </p>
          <Button variant="outline" size="lg" className="btn-outline-gold">
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;