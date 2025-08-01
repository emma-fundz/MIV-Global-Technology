import { Shield, Clock, Users, Trophy, Sparkles, Heart } from 'lucide-react';

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Proven Track Record",
      description: "500+ successful projects delivered with 98% client satisfaction rate",
      problem: "Many agencies promise but don't deliver",
      solution: "We have documented success stories and client testimonials"
    },
    {
      icon: Users,
      title: "4-in-1 Integration",
      description: "All services under one roof with seamless coordination",
      problem: "Managing multiple vendors is complex and expensive",
      solution: "Single point of contact for all your business needs"
    },
    {
      icon: Clock,
      title: "Faster Time to Market",
      description: "Integrated approach means 40% faster project completion",
      problem: "Slow development cycles kill competitive advantage",
      solution: "Parallel workstreams and optimized processes"
    },
    {
      icon: Trophy,
      title: "African Market Expertise",
      description: "Deep understanding of local market with global standards",
      problem: "International agencies don't understand African context",
      solution: "Local insight with international quality and experience"
    },
    {
      icon: Sparkles,
      title: "Cutting-Edge Technology",
      description: "Latest tools and technologies to keep you ahead",
      problem: "Outdated solutions limit growth potential",
      solution: "Modern, scalable solutions built for the future"
    },
    {
      icon: Heart,
      title: "True Partnership",
      description: "We're invested in your long-term success, not just projects",
      problem: "Most providers disappear after project completion",
      solution: "Ongoing support and strategic guidance for sustained growth"
    }
  ];

  return (
    <section id="why-choose" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose MIV?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We understand the challenges African entrepreneurs face and have built 
            our entire approach around solving them effectively.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={reason.title}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl p-6 card-elevated h-full">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-gold-light to-gold w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                    <reason.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{reason.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {reason.description}
                </p>
                
                {/* Problem/Solution reveal on hover */}
                <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-destructive/10 border-l-4 border-destructive p-3 rounded">
                    <p className="text-sm text-destructive font-medium">Problem:</p>
                    <p className="text-sm text-muted-foreground">{reason.problem}</p>
                  </div>
                  <div className="bg-accent/10 border-l-4 border-accent p-3 rounded">
                    <p className="text-sm text-accent font-medium">Our Solution:</p>
                    <p className="text-sm text-muted-foreground">{reason.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gold-light to-gold p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-accent-foreground mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-accent-foreground/80 mb-6">
              Join 200+ successful entrepreneurs who chose MIV as their growth partner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-foreground text-accent px-8 py-3 rounded-xl font-semibold hover:bg-accent-foreground/90 transition-colors">
                Start Your Journey
              </button>
              <button className="border-2 border-accent-foreground text-accent-foreground px-8 py-3 rounded-xl font-semibold hover:bg-accent-foreground hover:text-accent transition-colors">
                Schedule Discovery Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;