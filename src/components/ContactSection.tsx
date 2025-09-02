import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Calendar, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('messages').insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        phone: formData.phone || null,
        service: formData.service || null,
        message: formData.message,
        status: 'new'
      });
      if (error) throw error;
      toast({ title: 'Message Sent', description: 'We will get back to you shortly.' });
      setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' });
    } catch (err: any) {
      toast({ title: 'Submission failed', description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+234 (0) 123 456 7890",
      action: "Call us now"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@mivglobal.tech",
      action: "Send email"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Lagos, Nigeria (HQ)",
      action: "Visit office"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+234 (0) 123 456 7890",
      action: "Chat with us"
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Let's Build Your Vision Together
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your business? Get in touch for a free consultation 
            and discover how our 4-in-1 approach can accelerate your growth.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-slide-in-left">
            <div className="bg-card rounded-2xl p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-6">Get Your Free Consultation</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-background"
                    />
                  </div>
                </div>
                
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Business Strategy">Business Strategy</option>
                    <option value="IT Consulting">IT Consulting</option>
                  </select>
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project and goals..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-background"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full btn-gold text-lg py-3" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="animate-slide-in-right">
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Button className="btn-gold h-16 text-lg">
                  <Calendar className="mr-2 h-6 w-6" />
                  Book Free Consultation
                </Button>
                <Button variant="outline" className="btn-outline-gold h-16 text-lg">
                  <MessageCircle className="mr-2 h-6 w-6" />
                  WhatsApp Us
                </Button>
              </div>
              
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <div 
                    key={info.title}
                    className="bg-card rounded-xl p-6 card-elevated animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-gradient-to-br from-gold-light to-gold w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                        <info.icon className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <h4 className="font-semibold">{info.title}</h4>
                    </div>
                    <p className="text-muted-foreground mb-2">{info.details}</p>
                    <button className="text-accent text-sm font-medium hover:underline">
                      {info.action}
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Business Hours */}
              <div className="bg-card rounded-xl p-6 card-elevated">
                <h4 className="font-semibold mb-4">Business Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent font-medium">
                    ⚡ Emergency support available 24/7 for Premium & Elite clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;