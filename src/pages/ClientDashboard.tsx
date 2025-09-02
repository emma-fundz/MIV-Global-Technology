
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import DashboardSidebar from '@/components/DashboardSidebar';
import { 
  User, 
  Package, 
  Calendar, 
  TrendingUp, 
  BarChart, 
  MessageSquare, 
  LogOut,
  Bell,
  Settings,
  CreditCard,
  Target,
  Clock,
  Menu,
  CheckCircle2,
  ArrowUpRight,
  Plus
} from 'lucide-react';

interface Client {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  plan: 'starter' | 'basic' | 'standard' | 'premium';
  signup_date: string;
  status: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  package: string;
  status: string;
  progress: number;
  notes: string;
  start_date: string;
  due_date: string;
}

const ClientDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const planDetails = {
    starter: { name: 'Starter', price: '₦5,000', color: 'bg-blue-500' },
    basic: { name: 'Basic', price: '₦20,000', color: 'bg-green-500' },
    standard: { name: 'Standard', price: '₦50,000', color: 'bg-purple-500' },
    premium: { name: 'Premium', price: '₦150,000', color: 'bg-gold' }
  };

  const businessMetrics = {
    monthlyRevenue: '₦450,000',
    websiteVisitors: '2,340',
    socialMediaReach: '15,670',
    conversionRate: '3.2%'
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
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

      setUser(s.session.user);

      // Fetch profile and client with timeout
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle();

      const clientPromise = supabase
        .from('clients')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const [{ data: profile }, { data: client }] = await Promise.race([
        Promise.all([profilePromise, clientPromise]),
        timeoutPromise
      ]) as any;

      console.log('ClientDashboard fetch results:', { profile, client, uid });

      // Check if user should be on admin dashboard
      if (profile?.role === 'admin' || profile?.role === 'team') {
        console.log('User has admin/team role, redirecting to admin dashboard');
        navigate('/admin-dashboard');
        return;
      }

      // If no client found, throw error to surface the real issue
      if (!client) {
        throw new Error(`No client record found for user_id: ${uid}`);
      }

      setClient(client);

      // Get projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', client.id);

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
      } else {
        setProjects(projectsData || []);
      }

      setLoading(false);
    } catch (e) {
      console.error("ClientDashboard load error:", e);
      setError("Failed to load your dashboard: " + (e as Error).message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'planning': return 'bg-blue-500';
      case 'in_progress': return 'bg-purple-500';
      case 'review': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      case 'on_hold': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Add null check for client before rendering
  if (!client) {
    throw new Error("Client data not loaded");
  }

  const currentPlan = planDetails[client.plan];

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Header */}
        <div className="bg-background border-b px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Welcome back, {client.full_name}!</h1>
                <p className="text-sm text-muted-foreground">
                  {client.company_name || 'MIV Client'} • {currentPlan.name} Plan
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
          {/* Quick Setup Card */}
          <Card className="border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-background">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Take the first step towards your success</h2>
                  <p className="text-muted-foreground mb-4">
                    Start your project brief to get your business transformation underway.
                  </p>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Start Your Project Brief
                  </Button>
                </div>
                <div className="hidden sm:block">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        {/* Current Plan Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Current Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{currentPlan.name} Plan</h3>
                  <p className="text-muted-foreground">{currentPlan.price}/month</p>
                </div>
                <Badge className={`${currentPlan.color} text-white`}>
                  Active
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Signed up:</span>
                  <span>{new Date(client.signup_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next billing:</span>
                  <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
                <Button variant="outline" size="sm">
                  View Billing
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need help? Our team is here to support your growth.
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Start Live Chat
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Schedule Call
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Knowledge Base
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Monthly Revenue</span>
              </div>
              <div className="text-2xl font-bold">{businessMetrics.monthlyRevenue}</div>
              <div className="text-xs text-green-500">+12% from last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Website Visitors</span>
              </div>
              <div className="text-2xl font-bold">{businessMetrics.websiteVisitors}</div>
              <div className="text-xs text-blue-500">+8% from last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-muted-foreground">Social Reach</span>
              </div>
              <div className="text-2xl font-bold">{businessMetrics.socialMediaReach}</div>
              <div className="text-xs text-purple-500">+25% from last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Conversion Rate</span>
              </div>
              <div className="text-2xl font-bold">{businessMetrics.conversionRate}</div>
              <div className="text-xs text-orange-500">+0.5% from last month</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Your Projects & Milestones
            </CardTitle>
            <CardDescription>
              Track the progress of your ongoing projects and deliverables
            </CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No projects assigned yet.</p>
                <p className="text-sm">Your projects will appear here once our team starts working on them.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <Badge className={`${getStatusColor(project.status)} text-white`}>
                        {project.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {project.notes && (
                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground">
                          <strong>Latest Update:</strong> {project.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      {project.start_date && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Started: {new Date(project.start_date).toLocaleDateString()}
                        </span>
                      )}
                      {project.due_date && (
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          Due: {new Date(project.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need updates to your project? Let us know what changes you'd like.
              </p>
              <Button variant="outline" className="w-full">
                Submit Request
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upgrade Package</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Scale your business faster with our higher-tier packages.
              </p>
              <Button variant="outline" className="w-full">
                View Options
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule a strategy session with our experts.
              </p>
              <Button variant="outline" className="w-full">
                Schedule Now
              </Button>
            </CardContent>
          </Card>
         </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
