import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Adebayo Johnson",
      role: "Founder & CEO",
      description: "Visionary leader with 10+ years in tech entrepreneurship across Africa."
    },
    {
      name: "Chioma Okafor",
      role: "Head of Digital Solutions",
      description: "Full-stack developer specializing in scalable web and mobile applications."
    },
    {
      name: "Kwame Asante",
      role: "Creative Director",
      description: "Brand strategist with expertise in African market positioning."
    }
  ];

  const milestones = [
    { year: "2020", event: "MIV Global Technology Founded" },
    { year: "2021", event: "Launched First 100 Startups Program" },
    { year: "2022", event: "Expanded to 5 African Countries" },
    { year: "2023", event: "1000+ Businesses Transformed" },
    { year: "2024", event: "AI-Powered Solutions Launch" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-gold bg-clip-text text-transparent">
              Empowering Africa's Next Generation of Entrepreneurs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Born from a vision to transform the African startup ecosystem, MIV Global Technology 
              bridges the gap between ambitious dreams and successful enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-gold" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to world-class business solutions across Africa, 
                empowering entrepreneurs with the tools, knowledge, and support needed 
                to build sustainable, impactful enterprises that drive economic growth 
                and innovation across the continent.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-gold" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be Africa's leading catalyst for entrepreneurial success, creating 
                a thriving ecosystem where innovative startups and established businesses 
                can access comprehensive, culturally-aware solutions that accelerate 
                their growth and maximize their impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6">
                MIV Global Technology was born from firsthand experience with the challenges 
                facing African entrepreneurs. Our founders, having navigated the complex 
                landscape of building successful businesses across multiple African markets, 
                recognized a critical gap in the ecosystem.
              </p>
              <p className="mb-6">
                Too many brilliant ideas were failing not due to lack of innovation or 
                market demand, but because entrepreneurs lacked access to the comprehensive 
                support systems that their counterparts in more developed markets took for granted.
              </p>
              <p>
                We set out to change that narrative. By combining deep local market knowledge 
                with global best practices, we created a 4-in-1 solution that addresses the 
                most critical needs of growing businesses: technology, branding, marketing, 
                and strategic planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-6 p-6 rounded-lg border hover:shadow-lg transition-shadow">
                  <div className="bg-gold text-black px-4 py-2 rounded-full font-bold min-w-[80px] text-center">
                    {milestone.year}
                  </div>
                  <p className="text-lg">{milestone.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals with deep expertise in African markets and global business practices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-background p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold-dark rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gold font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision and drive our commitment to excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Award, title: "Excellence", description: "Delivering exceptional quality in every project and interaction." },
              { icon: Users, title: "Partnership", description: "Building genuine relationships based on trust and mutual success." },
              { icon: Target, title: "Innovation", description: "Embracing cutting-edge solutions while respecting local contexts." },
              { icon: Globe, title: "Impact", description: "Creating lasting positive change across African communities." }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 hover:bg-muted rounded-lg transition-colors">
                <value.icon className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;