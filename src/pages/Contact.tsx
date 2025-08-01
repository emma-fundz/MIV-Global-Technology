import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const offices = [
    {
      city: "Lagos, Nigeria",
      address: "Plot 123, Victoria Island, Lagos State",
      phone: "+234 809 123 4567",
      email: "lagos@mivglobal.com"
    },
    {
      city: "Accra, Ghana", 
      address: "Ring Road Central, Accra",
      phone: "+233 24 123 4567",
      email: "accra@mivglobal.com"
    },
    {
      city: "Nairobi, Kenya",
      address: "Westlands, Nairobi",
      phone: "+254 712 345 678",
      email: "nairobi@mivglobal.com"
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
              Let's Build Something Amazing Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to transform your business? Get in touch with our team of experts 
              and let's discuss how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Office Locations */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Offices Across Africa</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              With offices in major African business hubs, we're always close to our clients 
              and understand the local market dynamics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offices.map((office, index) => (
              <div key={index} className="bg-background p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                <MapPin className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">{office.city}</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {office.address}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    {office.phone}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    {office.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Additional Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Clock className="h-8 w-8 text-gold" />
                <h3 className="text-2xl font-bold">Business Hours</h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 6:00 PM WAT</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 4:00 PM WAT</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Emergency Support:</strong> Available 24/7 for Elite package clients
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Quick Response Promise</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gold text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Initial Response</h4>
                    <p className="text-muted-foreground text-sm">Within 2 hours during business hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gold text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Detailed Proposal</h4>
                    <p className="text-muted-foreground text-sm">Within 24 hours for consultation requests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gold text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Project Kickoff</h4>
                    <p className="text-muted-foreground text-sm">Within 5 business days of agreement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;