import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Globe, Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the callback
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: "Authentication failed",
            description: "There was an error confirming your email.",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }

        if (session?.user) {
          // Create client record with metadata from signup
          const userData = session.user.user_metadata;
          
          if (userData.full_name) {
            const { error: clientError } = await supabase
              .from('clients')
              .insert({
                user_id: session.user.id,
                full_name: userData.full_name,
                email: session.user.email!,
                company_name: userData.company_name || '',
                phone: userData.phone || '',
                plan: userData.plan || 'basic'
              });

            if (clientError) {
              console.error('Error creating client record:', clientError);
              // Don't fail if client record creation fails, user is still authenticated
            }
          }

          // Get user profile to determine role
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          toast({
            title: "Email confirmed!",
            description: "Welcome to MIV Global Technology!",
          });

          // Redirect based on role
          if (profile?.role === 'admin' || profile?.role === 'team') {
            navigate('/admin-dashboard');
          } else {
            navigate('/welcome');
          }
        } else {
          toast({
            title: "No session found",
            description: "Please try logging in again.",
            variant: "destructive",
          });
          navigate('/auth');
        }
      } catch (error: any) {
        console.error('Callback handling error:', error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-accent-foreground" />
            </div>
            <CardTitle className="text-2xl">Confirming your email</CardTitle>
          </CardHeader>
          
          <CardContent className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">
              Please wait while we confirm your email address...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default AuthCallback;