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
import { Loader2 } from 'lucide-react';

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
        // Ensure profile exists with robust fallback
        await ensureProfileExists(session.user);
        
        // Check user role and redirect appropriately
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (profile?.role === 'admin' || profile?.role === 'team') {
          navigate('/admin-dashboard');
        } else {
          navigate('/client-dashboard');
        }
      }
    };
    
    checkUser();
  }, [navigate]);

  // Robust profile creation function
  const ensureProfileExists = async (user: any) => {
    try {
      // Check if profile exists
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error checking profile:', profileError);
      }

      // Create profile if missing
      if (!existingProfile) {
        const meta = user.user_metadata || {};
        const { error: insertError } = await supabase.from('profiles').insert({
          user_id: user.id,
          email: user.email!,
          full_name: meta.full_name || user.email,
          role: 'client'
        });
        
        if (insertError && !insertError.message.includes('duplicate key')) {
          console.error('Profile creation failed:', insertError);
        }
      }

      // Check if client exists
      const { data: existingClient, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (clientError) {
        console.error('Error checking client:', clientError);
      }

      // Create client if missing
      if (!existingClient) {
        const meta = user.user_metadata || {};
        const { error: insertError } = await supabase.from('clients').insert({
          user_id: user.id,
          full_name: meta.full_name || user.email,
          email: user.email!,
          company_name: meta.company_name || '',
          phone: meta.phone || '',
          plan: meta.plan || 'basic'
        });
        
        if (insertError && !insertError.message.includes('duplicate key')) {
          console.error('Client creation failed:', insertError);
        }
      }
    } catch (error) {
      console.error('Error in ensureProfileExists:', error);
    }
  };

  // Set tab and preselect plan from URL
  useEffect(() => {
    if (location.pathname === '/signup') setIsLogin(false);
    if (location.pathname === '/login') setIsLogin(true);
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    if (plan && ['free','starter','basic','standard','premium'].includes(plan)) {
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
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Check your email and password.');
        }
        throw error;
      }

      if (data.user) {
        // Ensure profile and client exist for returning users as well
        await ensureProfileExists(data.user);

        // Get user profile to determine role with retry
        let profile = null;
        let retryCount = 0;
        const maxRetries = 3;
        
        while (!profile && retryCount < maxRetries) {
          const { data: profileData, error: roleError } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', data.user.id)
            .maybeSingle();

          if (roleError) {
            console.error('Error fetching role:', roleError);
          }
          
          profile = profileData;
          if (!profile && retryCount < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms before retry
            retryCount++;
          } else {
            break;
          }
        }

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
      
      // Signup without email confirmation (instant login flow)
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            company_name: signupData.companyName,
            phone: signupData.phone,
            plan: signupData.plan
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Immediately sign in the user
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: signupData.password,
        });

        if (loginError) {
          throw loginError;
        }

        if (loginData.user) {
          // Ensure profile and client records exist for this user
          await ensureProfileExists(loginData.user);

          toast({
            title: "🎉 Welcome to MIV Global Technology!",
            description: "Your account has been created successfully. Explore your dashboard and start building.",
          });

          // Show welcome screen first, then it will redirect to the appropriate dashboard
          navigate('/welcome', { replace: true });
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
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 p-2">
            <img 
              src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
              alt="MIV Global Technology" 
              className="h-full w-full object-contain"
            />
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
                      <SelectItem value="free">Free - ₦0/month</SelectItem>
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