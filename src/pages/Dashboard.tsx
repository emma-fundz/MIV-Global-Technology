
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
      setLoading(true);
      setError(null);

      // Session gate - check uid before any fetch
      const { data: s } = await supabase.auth.getSession();
      const uid = s?.session?.user?.id;
      
      if (!uid) {
        console.log('No session found, redirecting to auth');
        setLoading(false);
        navigate('/auth');
        return;
      }

      // Fetch profile with timeout to determine role
      const profilePromise = supabase
        .from('profiles')
        .select('role')
        .eq('user_id', uid)
        .maybeSingle();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const { data: profile, error: profileError } = await Promise.race([
        profilePromise,
        timeoutPromise
      ]) as any;

      console.log('Dashboard router fetch results:', { profile, uid, profileError });

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        setError('Failed to load profile: ' + profileError.message);
        setLoading(false);
        return;
      }

      if (!profile) {
        console.log('No profile found, defaulting to client dashboard');
        navigate('/client-dashboard');
        return;
      }

      // Route based on role
      if (profile.role === 'admin' || profile.role === 'team') {
        console.log('Routing to admin dashboard for role:', profile.role);
        navigate('/admin-dashboard');
      } else {
        console.log('Routing to client dashboard for role:', profile.role);
        navigate('/client-dashboard');
      }
    } catch (e) {
      console.error("Dashboard routing error:", e);
      setError("Failed to load dashboard: " + (e as Error).message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
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

  if (error) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error Loading Dashboard</CardTitle>
            <CardDescription>
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={() => { setError(null); setLoading(true); routeToCorrectDashboard(); }} className="w-full">
              Retry
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default Dashboard;
