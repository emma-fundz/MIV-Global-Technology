-- Create messages table for contact form submissions
CREATE TABLE IF NOT EXISTS public.messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    company text,
    phone text,
    service text,
    message text NOT NULL,
    status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow admins and team to view all messages" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role IN ('admin', 'team')
        )
    );

CREATE POLICY "Allow admins and team to update messages" ON public.messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role IN ('admin', 'team')
        )
    );

CREATE POLICY "Allow anyone to insert messages (contact form)" ON public.messages
    FOR INSERT WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER messages_updated_at
    BEFORE UPDATE ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample data
INSERT INTO public.messages (name, email, company, phone, service, message, status) VALUES
('John Doe', 'john@example.com', 'Tech Startup Ltd', '+234 801 234 5678', 'Web Development', 'We need a modern website for our startup. Looking for a complete solution with e-commerce capabilities.', 'new'),
('Sarah Johnson', 'sarah@business.ng', 'Business Solutions Inc', '+234 802 345 6789', 'Digital Marketing', 'Interested in your digital marketing package. We want to increase our online presence and reach more customers.', 'contacted'),
('Michael Chen', 'mike@innovate.com', 'Innovate Africa', '+234 803 456 7890', 'Brand Identity', 'Need complete rebranding for our company. Logo, website, and marketing materials.', 'new'),
('Amina Hassan', 'amina@growth.ng', 'Growth Partners', '+234 804 567 8901', 'Business Strategy', 'Looking for strategic guidance to scale our business across West Africa.', 'converted');
