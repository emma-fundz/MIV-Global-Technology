import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--gold))_0%,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_hsl(var(--foreground))_0%,_transparent_50%)] opacity-3"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Transforming</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">
                African Startups
              </span>
              <br />
              <span className="text-foreground">Into Global Leaders</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              MIV Global Technology is your 4-in-1 growth partner, offering Digital Solutions, 
              Branding & Media, Marketing & Sales, and Business Strategy to fuel your success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="btn-gold text-lg px-8 py-4">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-outline-gold text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start mt-8 space-x-8 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div>Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">200+</div>
                <div>Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4</div>
                <div>Service Divisions</div>
              </div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative animate-slide-in-right">
            <div className="relative z-10 bg-card rounded-3xl p-8 shadow-[var(--shadow-elegant)]">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gold-light to-gold rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-accent-foreground mb-2">Digital</div>
                  <div className="text-sm text-accent-foreground/80">Solutions</div>
                </div>
                <div className="bg-secondary rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-foreground mb-2">Branding</div>
                  <div className="text-sm text-muted-foreground">& Media</div>
                </div>
                <div className="bg-secondary rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-foreground mb-2">Marketing</div>
                  <div className="text-sm text-muted-foreground">& Sales</div>
                </div>
                <div className="bg-gradient-to-br from-foreground to-muted-foreground rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-primary-foreground mb-2">Strategy</div>
                  <div className="text-sm text-primary-foreground/80">& Vision</div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-gold-light to-gold rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-foreground to-muted-foreground rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;