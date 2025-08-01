import { Code, Palette, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "MIV Digital Solutions",
      subtitle: "Web & App Development",
      description: "Custom web applications, mobile apps, software development, and complete IT infrastructure setup. From concept to deployment.",
      features: ["Custom Web Development", "Mobile App Development", "Software Solutions", "IT Infrastructure", "Cloud Solutions"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Palette,
      title: "MIV Branding & Media",
      subtitle: "Visual Identity & Design",
      description: "Complete brand identity creation, visual design, media production, and marketing materials that tell your story effectively.",
      features: ["Logo & Brand Identity", "Graphic Design", "Video Production", "Photography", "Marketing Materials"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "MIV Marketing & Sales",
      subtitle: "Growth & Lead Generation",
      description: "Data-driven marketing strategies, digital advertising, content creation, and sales funnel optimization to drive real results.",
      features: ["Digital Marketing", "Content Strategy", "Social Media Management", "Lead Generation", "Sales Funnels"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Lightbulb,
      title: "MIV Business Vision & Strategy",
      subtitle: "Long-term Growth Planning",
      description: "Strategic business planning, mentorship, coaching, and vision development to ensure sustainable long-term success.",
      features: ["Business Strategy", "Executive Coaching", "Market Analysis", "Growth Planning", "Mentorship"],
      color: "from-gold-light to-gold"
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our 4 Service Divisions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build, brand, market, and strategically grow your business - 
            all under one roof with seamless integration between services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="card-elevated bg-card border-0 overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-lg font-medium text-accent">
                  {service.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full btn-outline-gold">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;