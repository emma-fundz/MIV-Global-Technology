import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const featuredPost = {
    title: "The Future of African Tech: 5 Trends Shaping 2024",
    excerpt: "Explore the technological innovations and digital transformation trends that are revolutionizing business across Africa, from fintech to agritech.",
    author: "Adebayo Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Technology Trends",
    image: "/api/placeholder/800/400"
  };

  const blogPosts = [
    {
      title: "Building a Strong Digital Brand Identity for African Markets",
      excerpt: "Learn how to create a brand that resonates with local audiences while maintaining global appeal. Practical tips for color, typography, and cultural considerations.",
      author: "Chioma Okafor",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Branding",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Mobile-First Marketing Strategies That Work in Nigeria",
      excerpt: "With over 100 million mobile users in Nigeria, mobile-first marketing is essential. Discover strategies that drive engagement and conversions.",
      author: "Kwame Asante",
      date: "2024-01-08",
      readTime: "5 min read",
      category: "Digital Marketing",
      image: "/api/placeholder/400/250"
    },
    {
      title: "From Idea to Launch: A Startup's Complete Technology Roadmap",
      excerpt: "Step-by-step guide to building and launching your tech startup, from MVP development to scaling infrastructure for growth.",
      author: "Sarah Mwangi",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Startup Guide",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Why African Businesses Need Local-First Digital Solutions",
      excerpt: "Understanding the importance of culturally-aware digital solutions and how they impact user adoption and business success.",
      author: "David Mensah",
      date: "2024-01-03",
      readTime: "7 min read",
      category: "Business Strategy",
      image: "/api/placeholder/400/250"
    },
    {
      title: "E-commerce Success: Lessons from Top African Online Stores",
      excerpt: "Analyze what makes African e-commerce platforms successful and apply these insights to your own online business.",
      author: "Amara Okafor",
      date: "2023-12-28",
      readTime: "9 min read",
      category: "E-commerce",
      image: "/api/placeholder/400/250"
    },
    {
      title: "The Complete Guide to Business Registration in West Africa",
      excerpt: "Navigate the business registration process across major West African countries with this comprehensive step-by-step guide.",
      author: "Fatima Al-Hassan",
      date: "2023-12-25",
      readTime: "12 min read",
      category: "Business Guide",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = [
    "All Posts", "Technology Trends", "Digital Marketing", "Business Strategy", 
    "Startup Guide", "Branding", "E-commerce", "Business Guide"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-gold bg-clip-text text-transparent">
              Insights for African Entrepreneurs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert insights, practical guides, and industry trends to help you build 
              and scale successful businesses across Africa.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 pr-4 py-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <Button 
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-gold text-black hover:bg-gold-dark" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <div className="text-center text-black p-8">
                      <h3 className="text-2xl font-bold">Featured Article</h3>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gold text-black px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="text-muted-foreground text-sm">Featured</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button className="bg-gold text-black hover:bg-gold-dark">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-background rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gold/20 to-gold-dark/20 flex items-center justify-center">
                  <div className="text-center p-4">
                    <h4 className="font-bold text-lg">{post.category}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gold text-black px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Stay Updated with MIV Insights</h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Get weekly insights, industry trends, and practical business tips delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input 
              placeholder="Enter your email" 
              className="bg-white border-white"
            />
            <Button variant="outline" className="bg-black text-white border-black hover:bg-white hover:text-black">
              Subscribe
            </Button>
          </div>
          <p className="text-black/60 text-sm mt-4">
            Join 5,000+ entrepreneurs. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;