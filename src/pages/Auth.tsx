import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Globe, Loader2 } from 'lucide-react';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    phone: '',
    plan: 'basic'
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check user role and redirect appropriately
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        if (profile?.role === 'admin' || profile?.role === 'team') {
          navigate('/admin-dashboard');
        } else {
          navigate('/client-dashboard');
        }
      }
    };
    
    checkUser();
  }, [navigate]);

  // Set tab and preselect plan from URL
  useEffect(() => {
    if (location.pathname === '/signup') setIsLogin(false);
    if (location.pathname === '/login') setIsLogin(true);
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    if (plan && ['starter','basic','standard','premium'].includes(plan)) {
      setSignupData((prev) => ({ ...prev, plan }));
    }
  }, [location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean and sanitize inputs
      const cleanEmail = loginData.email.trim().toLowerCase();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: loginData.password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('email not confirmed') || error.message.includes('Email not confirmed')) {
          throw new Error('Email confirmation is enabled in Supabase. Our app expects no confirmation. Please disable email confirmations in Supabase Auth settings.');
        }
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Check your email and password.');
        }
        throw error;
      }

      if (data.user) {
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        toast({
          title: "Login successful!",
          description: "Welcome back to MIV Global Technology.",
        });

        // Redirect based on role
        if (profile?.role === 'admin' || profile?.role === 'team') {
          navigate('/admin-dashboard');
        } else {
          navigate('/client-dashboard');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Clean and sanitize inputs
      const cleanEmail = signupData.email.trim().toLowerCase();
      
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: signupData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            full_name: signupData.fullName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Check if we have a session immediately (auto-confirm enabled)
        let currentSession = data.session;
        
        // If no session but user exists, try to sign in immediately
        if (!currentSession) {
          console.log('No session after signup, attempting immediate sign-in...');
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: signupData.password,
          });
          
          if (signInError) {
            console.error('Auto sign-in failed:', signInError);
            toast({
              title: "Account created!",
              description: "Please check your email for confirmation, then login.",
              variant: "default",
            });
            setIsLogin(true); // Switch to login tab
            return;
          }
          currentSession = signInData.session;
        }

        // Create client record only if we have a session
        if (currentSession) {
          const { error: clientError } = await supabase
            .from('clients')
            .insert({
              user_id: data.user.id,
              full_name: signupData.fullName,
              email: cleanEmail,
              company_name: signupData.companyName,
              phone: signupData.phone,
              plan: signupData.plan as any
            });

          if (clientError) {
            console.error('Error creating client record:', clientError);
          }

          toast({
            title: "Account created!",
            description: "Welcome to MIV Global Technology!",
          });

          // Redirect to welcome screen
          navigate('/welcome');
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-accent-foreground" />
          </div>
          <CardTitle className="text-2xl">Welcome to MIV</CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(value) => setIsLogin(value === 'login')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-company">Company Name (Optional)</Label>
                  <Input
                    id="signup-company"
                    type="text"
                    value={signupData.companyName}
                    onChange={(e) => setSignupData({...signupData, companyName: e.target.value})}
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-phone">Phone Number (Optional)</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-plan">Choose Your Plan</Label>
                  <Select value={signupData.plan} onValueChange={(value) => setSignupData({...signupData, plan: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter - ₦5,000/month</SelectItem>
                      <SelectItem value="basic">Basic - ₦20,000/month</SelectItem>
                      <SelectItem value="standard">Standard - ₦50,000/month</SelectItem>
                      <SelectItem value="premium">Premium - ₦150,000/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;