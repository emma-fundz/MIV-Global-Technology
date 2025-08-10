import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: '₦5,000',
      period: '/month',
      description: 'Perfect for new entrepreneurs getting started',
      icon: <Zap className="h-6 w-6" />,
      popular: false,
      features: [
        'Basic website consultation',
        'Social media setup (2 platforms)',
        'Basic logo design',
        'Email support',
        'Monthly progress report',
        'Basic SEO optimization'
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '₦20,000',
      period: '/month',
      description: 'Great for small businesses ready to grow',
      icon: <Star className="h-6 w-6" />,
      popular: false,
      features: [
        'Professional website (5 pages)',
        'Social media management (3 platforms)',
        'Complete brand identity package',
        'Basic CRM setup',
        'Email & phone support',
        'Bi-weekly strategy sessions',
        'Analytics dashboard',
        'Content creation (4 posts/week)'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '₦50,000',
      period: '/month',
      description: 'Ideal for established businesses scaling up',
      icon: <Crown className="h-6 w-6" />,
      popular: true,
      features: [
        'Custom website with e-commerce',
        'Full social media strategy',
        'Advanced branding & marketing materials',
        'Custom CRM & automation',
        'Priority support (24/7)',
        'Weekly strategy calls',
        'Advanced analytics & reporting',
        'Content creation (10 posts/week)',
        'Email marketing campaigns',
        'Basic mobile app consultation'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₦150,000',
      period: '/month',
      description: 'Complete business transformation solution',
      icon: <Rocket className="h-6 w-6" />,
      popular: false,
      features: [
        'Full digital ecosystem development',
        'Omnichannel marketing strategy',
        'Complete rebrand & positioning',
        'Custom software development',
        'Dedicated account manager',
        'Daily check-ins & support',
        'Real-time analytics & insights',
        'Unlimited content creation',
        'Advanced automation workflows',
        'Mobile app development',
        'Market research & competitor analysis',
        'Team training & workshops'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '₦300,000',
      period: '/month',
      description: 'Enterprise-level transformation package',
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      features: [
        'Full digital transformation',
        'Enterprise branding solution',
        'Ongoing marketing partnership',
        'Complete business strategy overhaul',
        'Year-round mentorship',
        '24/7 priority support',
        'Multi-platform development',
        'Advanced integrations',
        'Dedicated account manager',
        'Performance guarantees'
      ]
    }
  ];

  const addOns = [
    {
      name: 'Extra Social Media Platform',
      price: '₦3,000',
      description: 'Add management for additional social media platform'
    },
    {
      name: 'Advanced SEO Package',
      price: '₦15,000',
      description: 'Technical SEO audit, keyword research, and optimization'
    },
    {
      name: 'E-commerce Integration',
      price: '₦25,000',
      description: 'Full online store setup with payment processing'
    },
    {
      name: 'Custom Mobile App',
      price: '₦80,000',
      description: 'Native iOS/Android app development'
    },
    {
      name: 'Team Training Workshop',
      price: '₦20,000',
      description: '4-hour digital marketing workshop for your team'
    },
    {
      name: 'Quarterly Business Review',
      price: '₦10,000',
      description: 'Detailed business performance analysis and strategy session'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4">Transparent Pricing</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-accent">Growth Package</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Start with any package and scale as your business grows. All plans include our core commitment to your success.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg) => (
                <Card 
                  key={pkg.id} 
                  className={`relative transition-all duration-300 hover:shadow-lg ${
                    pkg.popular ? 'border-accent shadow-lg scale-105' : ''
                  }`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      pkg.popular ? 'bg-accent text-accent-foreground' : 'bg-muted'
                    }`}>
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <CardDescription className="text-sm">{pkg.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={pkg.id === 'elite' ? '/contact' : `/signup?plan=${pkg.id}`} className="w-full">
                      <Button 
                        className={`w-full ${
                          pkg.popular 
                            ? 'bg-accent hover:bg-accent/90' 
                            : 'bg-primary hover:bg-primary/90'
                        }`}
                      >
                        {pkg.id === 'elite' ? 'Contact Us' : `Choose ${pkg.name}`}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Optional <span className="text-accent">Add-ons</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Enhance any package with these powerful add-ons designed to accelerate your business growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{addon.name}</CardTitle>
                    <CardDescription>{addon.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{addon.price}</span>
                      <Button variant="outline" size="sm">
                        Add to Package
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Frequently Asked <span className="text-accent">Questions</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I switch packages anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! You can upgrade or downgrade your package at any time. Changes take effect at your next billing cycle.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's included in the setup?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All packages include initial strategy session, account setup, and onboarding. Higher tiers include more comprehensive setup and training.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer custom packages?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolutely! For enterprises or unique requirements, we create custom packages. Contact us to discuss your specific needs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We accept bank transfers, mobile money (MTN, Airtel), and international payment methods including PayPal and Stripe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of African entrepreneurs who've scaled their businesses with MIV
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;