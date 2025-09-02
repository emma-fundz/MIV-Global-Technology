-- Fix infinite recursion in profiles table RLS policies
-- Drop the problematic policy that references profiles within itself
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a new policy using a security definer function to avoid recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE user_id = user_uuid 
    AND role = 'admin'::user_role
  );
$$;

-- Recreate the admin policy using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin(auth.uid()));