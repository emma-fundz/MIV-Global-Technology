import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackagesSection from '@/components/PackagesSection';
import AddOnsSection from '@/components/AddOnsSection';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const comparison = [
    {
      feature: "Website Development",
      studentStarter: true,
      basic: true,
      standard: true,
      premium: true,
      elite: true
    },
    {
      feature: "Mobile App Development",
      studentStarter: false,
      basic: false,
      standard: true,
      premium: true,
      elite: true
    },
    {
      feature: "Brand Identity Package",
      studentStarter: true,
      basic: true,
      standard: true,
      premium: true,
      elite: true
    },
    {
      feature: "Social Media Marketing",
      studentStarter: false,
      basic: true,
      standard: true,
      premium: true,
      elite: true
    },
    {
      feature: "SEO Optimization",
      studentStarter: false,
      basic: false,
      standard: true,
      premium: true,
      elite: true
    },
    {
      feature: "Business Strategy Consultation",
      studentStarter: false,
      basic: false,
      standard: false,
      premium: true,
      elite: true
    },
    {
      feature: "Dedicated Account Manager",
      studentStarter: false,
      basic: false,
      standard: false,
      premium: false,
      elite: true
    },
    {
      feature: "24/7 Support",
      studentStarter: false,
      basic: false,
      standard: false,
      premium: false,
      elite: true
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-gold bg-clip-text text-transparent">
              Choose Your Growth Package
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transparent pricing designed for African entrepreneurs at every stage of their journey.
              From students to established enterprises, we have a solution that fits your needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <PackagesSection />

      {/* Add-Ons Section */}
      <AddOnsSection />

      {/* Comparison Table */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Package Comparison</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare features across all our packages to find the perfect fit for your business needs.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] bg-background rounded-lg shadow-lg">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-bold">Features</th>
                  <th className="text-center p-4 font-bold">Student Starter</th>
                  <th className="text-center p-4 font-bold">Basic</th>
                  <th className="text-center p-4 font-bold">Standard</th>
                  <th className="text-center p-4 font-bold">Premium</th>
                  <th className="text-center p-4 font-bold bg-gold text-black">Elite</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{item.feature}</td>
                    <td className="text-center p-4">
                      {item.studentStarter ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-4">
                      {item.basic ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-4">
                      {item.standard ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-4">
                      {item.premium ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-4 bg-gold/10">
                      {item.elite ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pricing FAQs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our pricing structure and what's included in each package.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "Are there any setup fees?",
                answer: "No setup fees for any of our packages. The quoted price is what you pay to get started."
              },
              {
                question: "Can I upgrade my package later?",
                answer: "Yes, you can upgrade at any time. We'll credit your existing investment toward the higher tier."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept bank transfers, mobile money, and major credit cards. Payment plans available for Premium and Elite packages."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day satisfaction guarantee. If you're not happy with our work, we'll refund your investment."
              },
              {
                question: "Are maintenance costs included?",
                answer: "Basic maintenance is included for 6 months. Extended maintenance plans are available as add-ons."
              },
              {
                question: "Can I customize a package?",
                answer: "Absolutely! We can create custom packages that combine elements from different tiers to meet your specific needs."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Get Started?</h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free consultation to discuss your needs and find the perfect package for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-white text-black border-white hover:bg-black hover:text-white">
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-black border-black hover:bg-black hover:text-white">
              <Link to="/contact">Get Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;