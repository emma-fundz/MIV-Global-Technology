import { Target, Users, Zap, Globe } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering African entrepreneurs to build world-class businesses"
    },
    {
      icon: Users,
      title: "Growth Partnership",
      description: "More than a service provider - we're invested in your success"
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Cutting-edge solutions that keep you ahead of the competition"
    },
    {
      icon: Globe,
      title: "Global Vision",
      description: "Local expertise with international standards and reach"
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-slide-in-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Who We Are
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-light to-gold mb-8"></div>
            
            <p className="text-lg text-muted-foreground mb-8">
              MIV Global Technology isn't just another tech company. We're a comprehensive 
              growth partner dedicated to transforming African startups and entrepreneurs 
              into global industry leaders.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              Our unique 4-in-1 approach combines Digital Solutions, Branding & Media, 
              Marketing & Sales, and Business Strategy to provide everything you need 
              under one roof. We understand the African market while maintaining 
              international standards.
            </p>
            
            <div className="bg-gradient-to-r from-gold-light to-gold p-6 rounded-2xl">
              <p className="text-lg font-semibold text-accent-foreground">
                "We don't just build businesses - we build legacies that will 
                shape Africa's digital future."
              </p>
            </div>
          </div>
          
          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6 animate-slide-in-right">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="bg-card rounded-2xl p-6 card-elevated"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-gold-light to-gold w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;