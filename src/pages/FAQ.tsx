import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Clock, DollarSign, Settings, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          question: "How do I know which package is right for my business?",
          answer: "We recommend starting with a free consultation where we'll assess your current needs, business goals, and budget. Our team will then recommend the most suitable package and can even customize a solution that combines elements from different tiers."
        },
        {
          question: "What information do you need to get started?",
          answer: "We'll need basic business information including your industry, target market, current challenges, and specific goals. For web/app development, we'll also need content, branding materials (if available), and any specific functionality requirements."
        },
        {
          question: "How long does it take to see results?",
          answer: "Timeline varies by service: Website development (2-4 weeks), mobile apps (4-8 weeks), branding projects (1-2 weeks), marketing campaigns (2-4 weeks to see initial results). We provide detailed timelines during the consultation phase."
        }
      ]
    },
    {
      title: "Pricing & Payments",
      icon: DollarSign,
      questions: [
        {
          question: "Do you offer payment plans?",
          answer: "Yes! We offer flexible payment options including 50% upfront with the balance on completion for Basic and Standard packages. Premium and Elite clients can access extended payment plans with milestones."
        },
        {
          question: "Are there any hidden costs?",
          answer: "No hidden costs. All pricing is transparent and includes everything listed in your package. Additional costs only apply if you request services outside your package scope, and we'll always get approval first."
        },
        {
          question: "What happens if I need to cancel a project?",
          answer: "We offer a 7-day cooling-off period for new projects. After that, cancellation terms depend on project progress. We'll refund any unused portion of your investment minus work completed and any third-party costs incurred."
        }
      ]
    },
    {
      title: "Project Process",
      icon: Settings,
      questions: [
        {
          question: "How involved do I need to be in the project?",
          answer: "Your involvement level is flexible. We require your input during planning, content provision, and key decision points. You can be as hands-on or hands-off as you prefer - we'll adapt our communication style to match your preferences."
        },
        {
          question: "What if I want changes during the project?",
          answer: "Minor changes and refinements are included in all packages. Major scope changes may require a project amendment with additional costs, but we'll discuss this transparently before proceeding."
        },
        {
          question: "How do you ensure quality and deadlines?",
          answer: "We use proven project management methodologies with regular check-ins, milestone reviews, and quality assurance testing. Each project has a dedicated project manager and follows our established quality control processes."
        }
      ]
    },
    {
      title: "Support & Maintenance",
      icon: Users,
      questions: [
        {
          question: "What support do I get after project completion?",
          answer: "All packages include 6 months of basic support and maintenance. This covers bug fixes, security updates, and minor content changes. Extended support plans are available for ongoing needs."
        },
        {
          question: "Can you train my team to manage the systems?",
          answer: "Yes! Training is included in Standard packages and above. We provide comprehensive documentation and hands-on training sessions to ensure your team can confidently manage day-to-day operations."
        },
        {
          question: "What if something breaks or stops working?",
          answer: "We provide immediate support for critical issues. Response times vary by package: Elite (2 hours), Premium (4 hours), Standard (24 hours). All packages include emergency contact options for urgent issues."
        }
      ]
    },
    {
      title: "Technical Questions",
      icon: Globe,
      questions: [
        {
          question: "What technologies do you use?",
          answer: "We use modern, proven technologies including React, Next.js, React Native for mobile apps, and various content management systems. All our solutions are built with scalability, security, and performance in mind."
        },
        {
          question: "Will I own the code and designs?",
          answer: "Yes, you own all custom code, designs, and content we create for your project. We provide full source code and design files upon project completion, ensuring you're never locked into our services."
        },
        {
          question: "How do you handle data security and privacy?",
          answer: "We follow international best practices for data security including SSL encryption, secure hosting, regular backups, and GDPR compliance. All team members sign confidentiality agreements to protect your business information."
        }
      ]
    },
    {
      title: "Working with MIV",
      icon: Clock,
      questions: [
        {
          question: "Do you work with businesses outside Africa?",
          answer: "While our expertise is in African markets, we welcome international clients, especially those looking to enter African markets or work with African-focused businesses."
        },
        {
          question: "Can you help with ongoing business growth beyond the initial project?",
          answer: "Absolutely! Many of our clients transition to ongoing partnerships. We offer retainer arrangements for continuous support, growth consulting, and additional services as your business scales."
        },
        {
          question: "What makes MIV different from other service providers?",
          answer: "Our 4-in-1 approach means you get comprehensive solutions from one trusted partner. We understand African markets deeply, offer transparent pricing, and focus on long-term partnerships rather than one-off projects."
        }
      ]
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about our services, pricing, and process. 
              Can't find what you're looking for? We're here to help.
            </p>
            <Button asChild size="lg" className="bg-gold text-black hover:bg-gold-dark">
              <Link to="/contact">Ask Us Anything</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-4 mb-6">
                  <category.icon className="h-8 w-8 text-gold" />
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground">
                Our team is here to help you find the perfect solution for your business needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg text-center">
                <HelpCircle className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="font-bold mb-2">Free Consultation</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Schedule a call with our experts to discuss your specific needs.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/contact">Book Call</Link>
                </Button>
              </div>
              
              <div className="bg-background p-6 rounded-lg text-center">
                <Users className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="font-bold mb-2">WhatsApp Support</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get instant answers to quick questions via WhatsApp.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="https://wa.me/2348091234567" target="_blank" rel="noopener noreferrer">
                    Chat Now
                  </a>
                </Button>
              </div>
              
              <div className="bg-background p-6 rounded-lg text-center">
                <Globe className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="font-bold mb-2">Email Support</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Send detailed questions to our support team.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="mailto:hello@mivglobal.com">Send Email</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;