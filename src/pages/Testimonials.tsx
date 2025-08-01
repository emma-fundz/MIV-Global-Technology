import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Star, Quote, TrendingUp, Users, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Globe, value: "15", label: "Countries Served" },
    { icon: TrendingUp, value: "300%", label: "Average Growth" },
    { icon: Award, value: "98%", label: "Satisfaction Rate" }
  ];

  const caseStudies = [
    {
      company: "EcoFarm Solutions",
      industry: "AgriTech",
      challenge: "Needed a complete digital transformation to connect farmers with buyers across West Africa.",
      solution: "Built a comprehensive web platform with mobile app, implemented digital marketing strategy, and created strong brand identity.",
      results: [
        "5,000+ farmers onboarded in 6 months",
        "200% increase in farmer income",
        "Secured $2M in Series A funding",
        "Expanded to 3 countries"
      ],
      package: "Elite Package",
      testimonial: "MIV didn't just build us a platform - they transformed our entire business model and helped us become the leading AgriTech company in West Africa.",
      author: "Amara Okafor",
      role: "CEO, EcoFarm Solutions"
    },
    {
      company: "StyleHub Africa",
      industry: "Fashion E-commerce",
      challenge: "Local fashion brand struggling with online presence and international market penetration.",
      solution: "Developed e-commerce platform, executed comprehensive rebranding, and launched targeted digital marketing campaigns.",
      results: [
        "400% increase in online sales",
        "Successfully entered 5 new markets",
        "Featured in major fashion publications",
        "Built community of 50K+ followers"
      ],
      package: "Premium Package",
      testimonial: "The team at MIV understood our vision and executed it flawlessly. Our brand is now recognized across Africa and internationally.",
      author: "Kemi Adeleke",
      role: "Founder, StyleHub Africa"
    },
    {
      company: "FinanceForward",
      industry: "FinTech",
      challenge: "Startup needed to build trust and credibility while launching innovative financial services.",
      solution: "Created professional brand identity, developed secure web platform, and implemented thought leadership marketing strategy.",
      results: [
        "100,000+ users in first year",
        "Achieved regulatory approval",
        "Raised $5M seed funding",
        "Became top 3 FinTech in Nigeria"
      ],
      package: "Standard Package + Add-ons",
      testimonial: "MIV's strategic approach helped us build credibility in a highly regulated industry. Their expertise was invaluable to our success.",
      author: "David Mensah",
      role: "CTO, FinanceForward"
    }
  ];

  const industries = [
    "Technology", "E-commerce", "Healthcare", "Education", 
    "Agriculture", "Financial Services", "Real Estate", "Manufacturing",
    "Media & Entertainment", "Non-Profit", "Government", "Consulting"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-gold bg-clip-text text-transparent">
              Success Stories from Across Africa
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover how African entrepreneurs and businesses have transformed their operations, 
              increased revenue, and achieved remarkable growth with MIV Global Technology.
            </p>
            <div className="flex items-center justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gold text-gold" />
              ))}
              <span className="ml-2 text-lg font-medium">4.9/5 from 500+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-black mx-auto mb-3" />
                <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                <div className="text-black/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Detailed Case Studies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep dive into how we've helped businesses overcome challenges and achieve exceptional results.
            </p>
          </div>

          <div className="space-y-16 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-muted p-8 rounded-lg">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold">{study.company}</h3>
                      <span className="bg-gold text-black px-3 py-1 rounded-full text-sm font-medium">
                        {study.industry}
                      </span>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-lg mb-2">Challenge</h4>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-lg mb-2">Our Solution</h4>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-lg mb-2">Results Achieved</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {study.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-center gap-2 text-muted-foreground">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-background p-6 rounded-lg">
                    <Quote className="h-8 w-8 text-gold mb-4" />
                    <blockquote className="text-muted-foreground italic mb-4">
                      "{study.testimonial}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <div className="font-bold">{study.author}</div>
                      <div className="text-muted-foreground text-sm">{study.role}</div>
                      <div className="text-gold text-sm mt-2">{study.package}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Testimonials Section */}
      <TestimonialsSection />

      {/* Industries We Serve */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From startups to established enterprises, we've helped businesses across diverse industries 
              achieve their digital transformation goals.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <span 
                key={index} 
                className="bg-background px-4 py-2 rounded-full border hover:border-gold transition-colors"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of successful African businesses who have transformed their operations with MIV Global Technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-white text-black border-white hover:bg-black hover:text-white">
              <Link to="/contact">Start Your Transformation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-black border-black hover:bg-black hover:text-white">
              <Link to="/pricing">View Our Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;