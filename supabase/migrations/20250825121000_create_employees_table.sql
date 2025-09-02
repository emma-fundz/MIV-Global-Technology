-- Create employees table for team directory management
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  phone TEXT NOT NULL,
  picture_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create policy for employees - admins and team can manage all employees
CREATE POLICY "Admins and team can manage employees" 
ON public.employees 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'team')
  )
);

-- Create policy for public read access (for displaying team on website)
CREATE POLICY "Anyone can view employees" 
ON public.employees 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample employees with correct phone numbers
INSERT INTO public.employees (name, role, phone, picture_url) VALUES
('Uchenna Jasper Okeke', 'Sales Manager', '+2349096569574', NULL),
('Chianugo Elizabeth', 'CMO', '+2349161223023', NULL),
('Elijah Opeyemi', 'TBD', '07068990444', NULL);
