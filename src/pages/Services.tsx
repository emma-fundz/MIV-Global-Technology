import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Palette, 
  TrendingUp, 
  Target, 
  Smartphone, 
  Globe, 
  Camera, 
  BarChart, 
  Search,
  MessageSquare,
  Lightbulb,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'digital-solutions',
      title: 'MIV Digital Solutions',
      description: 'Comprehensive technology solutions to digitize and scale your business operations.',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      features: [
        { icon: Globe, title: 'Web Development', description: 'Custom websites and web applications built for performance and user experience.' },
        { icon: Smartphone, title: 'Mobile Apps', description: 'Native and cross-platform mobile applications for iOS and Android.' },
        { icon: Code, title: 'Software Development', description: 'Custom software solutions tailored to your specific business needs.' },
        { icon: BarChart, title: 'IT Infrastructure', description: 'Complete IT setup, cloud migration, and digital transformation services.' }
      ]
    },
    {
      id: 'branding-media',
      title: 'MIV Branding & Media',
      description: 'Create a compelling brand identity that resonates with African markets and beyond.',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      features: [
        { icon: Palette, title: 'Brand Identity', description: 'Logo design, color schemes, and comprehensive brand guidelines.' },
        { icon: Camera, title: 'Visual Content', description: 'Photography, videography, and graphic design for all your marketing needs.' },
        { icon: Globe, title: 'Digital Assets', description: 'Website graphics, social media templates, and digital marketing materials.' },
        { icon: Target, title: 'Brand Strategy', description: 'Market positioning and brand messaging that connects with your audience.' }
      ]
    },
    {
      id: 'marketing-sales',
      title: 'MIV Marketing & Sales',
      description: 'Data-driven marketing strategies to accelerate growth and maximize ROI.',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      features: [
        { icon: Search, title: 'Digital Marketing', description: 'SEO, SEM, social media marketing, and content marketing strategies.' },
        { icon: BarChart, title: 'Performance Analytics', description: 'Comprehensive tracking, analysis, and optimization of all marketing efforts.' },
        { icon: MessageSquare, title: 'Content Creation', description: 'Engaging content for blogs, social media, and marketing campaigns.' },
        { icon: TrendingUp, title: 'Sales Optimization', description: 'Sales funnel optimization and conversion rate improvement.' }
      ]
    },
    {
      id: 'business-strategy',
      title: 'MIV Vision & Strategy',
      description: 'Strategic consulting and mentorship to guide your long-term business success.',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      features: [
        { icon: Lightbulb, title: 'Business Planning', description: 'Comprehensive business plans and strategic roadmaps for growth.' },
        { icon: Users, title: 'Mentorship', description: 'One-on-one guidance from experienced African business leaders.' },
        { icon: Target, title: 'Market Analysis', description: 'In-depth market research and competitive analysis for informed decision-making.' },
        { icon: BarChart, title: 'Performance Coaching', description: 'Ongoing support to optimize operations and achieve business objectives.' }
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
              Comprehensive Solutions for Every Business Need
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our 4-in-1 approach provides everything African entrepreneurs need to build, 
              brand, market, and scale successful businesses.
            </p>
            <Button size="lg" className="bg-gold text-black hover:bg-gold-dark">
              Explore Our Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={service.id} className={`${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex items-center gap-12`}>
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${service.color} mb-6`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                  <Button asChild className="bg-gold text-black hover:bg-gold-dark">
                    <Link to="/pricing">View Pricing Plans</Link>
                  </Button>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                        <feature.icon className="h-8 w-8 text-gold mb-4" />
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Proven Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A systematic approach that ensures every project delivers maximum value and measurable results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your business goals and challenges' },
              { step: '02', title: 'Strategy', description: 'Developing a customized roadmap for success' },
              { step: '03', title: 'Execution', description: 'Implementing solutions with precision and quality' },
              { step: '04', title: 'Growth', description: 'Ongoing optimization and scaling support' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="bg-gold text-black w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                <p className="text-muted-foreground text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Transform Your Business?</h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our comprehensive solutions can accelerate your growth and maximize your impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-white text-black border-white hover:bg-black hover:text-white">
              <Link to="/contact">Book Free Consultation</Link>
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

export default Services;