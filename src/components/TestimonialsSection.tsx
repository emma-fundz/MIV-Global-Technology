import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Adebayo",
      company: "TechStart Lagos",
      role: "CEO & Founder",
      content: "MIV transformed our entire business approach. Their 4-in-1 service model meant we didn't have to juggle multiple agencies. Our revenue increased by 300% within 8 months.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Kwame Osei",
      company: "Ghana Agritech Solutions",
      role: "Managing Director",
      content: "The strategic guidance from MIV's business vision team was game-changing. They helped us secure our first major funding round and scale across West Africa.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Fatima Ibrahim",
      company: "EduLearn Africa",
      role: "Co-founder",
      content: "From brand identity to mobile app development, MIV delivered everything with exceptional quality. Our user base grew from 100 to 50,000 students in one year.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "David Mwangi",
      company: "Nairobi FinTech Hub",
      role: "Product Manager",
      content: "MIV's marketing strategies doubled our customer acquisition rate. Their understanding of the African market is unmatched. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Amina Hassan",
      company: "Somalia Digital Commerce",
      role: "Founder",
      content: "Working with MIV was the best decision for our startup. They provided end-to-end solutions that would have cost us 3x more with separate providers.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "John Banda",
      company: "Zambia Logistics Network",
      role: "Operations Director",
      content: "The custom software MIV built for us streamlined our entire operation. We now handle 10x more shipments with the same team size.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. See how we've helped African entrepreneurs 
            and startups achieve remarkable growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 card-elevated animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-accent mr-3" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-accent font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-secondary/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-muted-foreground mb-6">
              Over 98% of our clients recommend us to other entrepreneurs
            </p>
            <button className="btn-gold px-8 py-3 rounded-xl font-semibold">
              Start Your Success Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;