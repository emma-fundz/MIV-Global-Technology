import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Sparkles } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 5 seconds if user doesn't click continue
    const timer = setTimeout(() => {
      navigate('/client-dashboard');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-none shadow-lg">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <img 
              src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
              alt="MIV Global Technology" 
              className="h-8 w-auto"
            />
          </div>

          {/* Celebration Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-accent" />
            </div>
            <Sparkles className="absolute top-0 right-1/4 h-6 w-6 text-accent animate-pulse" />
            <Sparkles className="absolute bottom-2 left-1/4 h-4 w-4 text-accent/60 animate-pulse delay-300" />
          </div>

          {/* Welcome Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to your dashboard!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            We're excited to have you here. This is the start of an incredible journey. 
            Explore your dashboard and discover the tools and insights you'll need to achieve your goals.
          </p>

          {/* Success Illustration */}
          <div className="mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-accent rounded-full"></div>
              </div>
              <div className="w-16 h-1 bg-accent/30 rounded-full"></div>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-accent rounded-full"></div>
              </div>
              <div className="w-16 h-1 bg-accent/30 rounded-full"></div>
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Account Created → Setup Complete → Ready to Launch
            </p>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="w-full max-w-sm mx-auto h-12 text-lg"
            onClick={() => navigate('/client-dashboard')}
          >
            Continue to Dashboard
          </Button>

          {/* Auto-redirect info */}
          <p className="text-xs text-muted-foreground mt-4">
            You'll be automatically redirected in a few seconds
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;