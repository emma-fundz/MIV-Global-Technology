
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    routeToCorrectDashboard();
  }, []);

  const routeToCorrectDashboard = async () => {
    try {
      // Session gate - check uid before any fetch
      const { data: s } = await supabase.auth.getSession();
      const uid = s?.session?.user?.id;
      
      if (!uid) {
        console.log('No session found, redirecting to auth');
        navigate('/auth');
        return;
      }

      // Direct profile fetch - let real errors surface
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', uid)
        .maybeSingle();

      console.log('Dashboard router results:', { profile, uid, profileError });

      // If there's a real error, throw it to expose the actual problem
      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw new Error(`Profile fetch failed: ${profileError.message}`);
      }

      // Direct navigation based on role - no fallbacks or error cards
      if (profile?.role === 'admin' || profile?.role === 'team') {
        console.log('Routing to admin dashboard for role:', profile.role);
        navigate('/admin-dashboard');
      } else {
        console.log('Routing to client dashboard - profile:', profile);
        navigate('/client-dashboard');
      }
    } catch (e) {
      console.error("Dashboard routing error:", e);
      // Let the error surface visibly instead of showing a generic card
      throw e;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Routing to your dashboard...</p>
        </div>
      </div>
    );
  }

  // No error card - let real errors crash visibly for debugging
  return null;
};

export default Dashboard;
