-- Create blog_posts table for dynamic blog management
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    excerpt text,
    content text NOT NULL,
    featured_image text,
    category text DEFAULT 'general',
    tags text[] DEFAULT '{}',
    author_id uuid REFERENCES public.profiles(id),
    status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured boolean DEFAULT false,
    views integer DEFAULT 0,
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow everyone to view published blog posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow admins and team to manage all blog posts" ON public.blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role IN ('admin', 'team')
        )
    );

-- Create updated_at trigger
CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, tags, status, featured, published_at) VALUES
('5 Digital Marketing Strategies for African Startups', 
 '5-digital-marketing-strategies-african-startups',
 'Discover proven digital marketing tactics that help African startups reach their target audience and drive growth.',
 'Digital marketing is crucial for African startups looking to scale their business. Here are 5 proven strategies that work in the African market: 1. Social Media Marketing - Focus on platforms where your audience is active. 2. Content Marketing - Create valuable content that addresses local challenges. 3. Email Marketing - Build relationships with personalized communication. 4. SEO Optimization - Ensure your website ranks for relevant local keywords. 5. Influencer Partnerships - Collaborate with local influencers who understand your market.',
 'marketing',
 '{"digital marketing", "startups", "africa", "growth"}',
 'published',
 true,
 timezone('utc'::text, now()) - interval '2 days'),

('Building a Strong Brand Identity in Nigeria', 
 'building-strong-brand-identity-nigeria',
 'Learn how to create a memorable brand that resonates with Nigerian consumers and stands out in the market.',
 'Brand identity is more than just a logo - it''s the complete visual and emotional experience your customers have with your business. In Nigeria, successful brands understand local culture, values, and preferences. This comprehensive guide covers logo design, color psychology, typography, and brand messaging that connects with Nigerian audiences.',
 'branding',
 '{"branding", "nigeria", "design", "identity"}',
 'published',
 false,
 timezone('utc'::text, now()) - interval '5 days'),

('The Future of Web Development in Africa', 
 'future-web-development-africa',
 'Explore emerging web technologies and trends shaping the digital landscape across African markets.',
 'Web development in Africa is evolving rapidly. From mobile-first design to progressive web apps, African developers are embracing new technologies. This article explores current trends including: responsive design, mobile optimization, e-commerce integration, and the growing importance of fast, reliable websites in markets with varying internet connectivity.',
 'technology',
 '{"web development", "africa", "technology", "trends"}',
 'published',
 false,
 timezone('utc'::text, now()) - interval '1 week'),

('Scaling Your Business Across West Africa', 
 'scaling-business-west-africa',
 'Strategic insights for expanding your business operations across West African markets.',
 'Expanding across West Africa requires careful planning and local market understanding. This guide covers market research, regulatory considerations, cultural adaptation, and partnership strategies for successful regional expansion.',
 'strategy',
 '{"business strategy", "west africa", "expansion", "growth"}',
 'draft',
 false,
 NULL);
