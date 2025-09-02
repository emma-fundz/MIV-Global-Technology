
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
  Users, 
  Package, 
  Calendar, 
  TrendingUp, 
  BarChart, 
  MessageSquare, 
  LogOut,
  Bell,
  Settings,
  Menu,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  Eye
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'team' | 'client';
}

interface Client {
  id: string;
  user_id: string;
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
  client_id: string;
  assigned_to: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  picture_url: string;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { toast } = useToast();

  // New project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    package: 'basic' as 'starter' | 'basic' | 'standard' | 'premium',
    client_id: '',
    assigned_to: ''
  });

  // New blog post form state
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featured: false
  });

  // New employee form state
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    phone: '',
    picture_url: ''
  });

  // Edit states
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('AdminDashboard: Starting auth check...');

      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout after 10 seconds')), 10000)
      );

      // Session gate - check uid before any fetch
      const sessionPromise = supabase.auth.getSession();
      const { data: sessionData } = await Promise.race([sessionPromise, timeoutPromise]) as any;
      const uid = sessionData?.session?.user?.id;
      
      if (!uid) {
        console.log('AdminDashboard: No session found, redirecting to auth');
        setLoading(false);
        navigate('/auth');
        return;
      }

      console.log('AdminDashboard: Session found, uid:', uid);
      setUser(sessionData.session.user);

      // Fetch profile with timeout
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle();

      const { data: profile, error: profileError } = await Promise.race([
        profilePromise,
        timeoutPromise
      ]) as any;

      console.log('AdminDashboard: Profile fetch results:', { profile, uid, profileError });

      if (profileError) {
        console.error('AdminDashboard: Profile fetch error:', profileError);
        setError('Failed to load profile: ' + profileError.message);
        setLoading(false);
        return;
      }

      if (!profile) {
        console.log('AdminDashboard: No profile found, redirecting to client dashboard');
        setError('Admin profile not found. Redirecting to client dashboard.');
        setTimeout(() => navigate('/client-dashboard'), 2000);
        setLoading(false);
        return;
      }

      // Check admin/team role
      if (profile.role !== 'admin' && profile.role !== 'team') {
        console.log('AdminDashboard: User is not admin/team, redirecting to client dashboard');
        setError('Access denied. Redirecting to client dashboard.');
        setTimeout(() => navigate('/client-dashboard'), 2000);
        setLoading(false);
        return;
      }

      console.log('AdminDashboard: Profile verified, role:', profile.role);
      setProfile(profile);

      // Load all data concurrently with timeout
      await Promise.race([
        Promise.all([
          loadClients(),
          loadProjects(),
          loadContacts(),
          loadBlogPosts(),
          loadEmployees()
        ]),
        timeoutPromise
      ]);

      console.log('AdminDashboard: All data loaded successfully');
      setLoading(false);
    } catch (e) {
      console.error("AdminDashboard: Load error:", e);
      setError("Failed to load admin dashboard: " + (e as Error).message);
      setLoading(false);
    }
  };

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading clients:', error);
        return;
      }

      setClients(data || []);
    } catch (e) {
      console.error('Error loading clients:', e);
    }
  };

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading projects:', error);
        return;
      }

      setProjects(data || []);
    } catch (e) {
      console.error('Error loading projects:', e);
    }
  };

  const loadContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading contacts:', error);
        return;
      }

      setContacts(data || []);
    } catch (e) {
      console.error('Error loading contacts:', e);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading blog posts:', error);
        return;
      }

      // Transform the data to match our BlogPost interface
      const transformedData: BlogPost[] = (data || []).map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        featured: post.featured,
        published: post.published, // Use the correct published boolean field from the database
        created_at: post.created_at
      }));

      setBlogPosts(transformedData);
    } catch (e) {
      console.error('Error loading blog posts:', e);
    }
  };

  const loadEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading employees:', error);
        return;
      }

      setEmployees(data || []);
    } catch (e) {
      console.error('Error loading employees:', e);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const createProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: newProject.title,
          description: newProject.description,
          package: newProject.package as 'starter' | 'basic' | 'standard' | 'premium',
          client_id: newProject.client_id,
          assigned_to: newProject.assigned_to,
          status: 'pending' as 'pending' | 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold',
          progress: 0
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        toast({
          title: "Error",
          description: "Failed to create project",
          variant: "destructive",
        });
        return;
      }

      setProjects([data, ...projects]);
      setNewProject({ title: '', description: '', package: 'basic', client_id: '', assigned_to: '' });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    } catch (e) {
      console.error('Error creating project:', e);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  };

  const updateProjectStatus = async (projectId: string, status: string) => {
    try {
      const validStatus = status as 'pending' | 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';
      
      const { error } = await supabase
        .from('projects')
        .update({ status: validStatus })
        .eq('id', projectId);

      if (error) {
        console.error('Error updating project:', error);
        toast({
          title: "Error",
          description: "Failed to update project",
          variant: "destructive",
        });
        return;
      }

      setProjects(projects.map(p => 
        p.id === projectId ? { ...p, status: validStatus } : p
      ));

      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (e) {
      console.error('Error updating project:', e);
    }
  };

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', messageId);

      if (error) {
        console.error('Error updating message:', error);
        toast({
          title: "Error",
          description: "Failed to update message",
          variant: "destructive",
        });
        return;
      }

      setContacts(contacts.map(c => 
        c.id === messageId ? { ...c, status } : c
      ));

      toast({
        title: "Success",
        description: "Message updated successfully",
      });
    } catch (e) {
      console.error('Error updating message:', e);
    }
  };

  const createBlogPost = async () => {
    try {
      const slug = newBlogPost.title.toLowerCase().replace(/\s+/g, '-');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...newBlogPost,
          slug,
          published: false, // Use published boolean field that exists in the database
          read_time: '5 min read',
          image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating blog post:', error);
        toast({
          title: "Error",
          description: "Failed to create blog post",
          variant: "destructive",
        });
        return;
      }

      // Transform the response to match our BlogPost interface
      const transformedPost: BlogPost = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        featured: data.featured,
        published: data.published, // Use the correct published boolean field from the database
        created_at: data.created_at
      };

      setBlogPosts([transformedPost, ...blogPosts]);
      setNewBlogPost({ title: '', excerpt: '', content: '', category: '', featured: false });
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
    } catch (e) {
      console.error('Error creating blog post:', e);
    }
  };

  const toggleBlogPostStatus = async (postId: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published }) // Use published boolean field that exists in the database
        .eq('id', postId);

      if (error) {
        console.error('Error updating blog post:', error);
        return;
      }

      setBlogPosts(blogPosts.map(post => 
        post.id === postId ? { ...post, published } : post
      ));

      toast({
        title: "Success",
        description: `Blog post ${published ? 'published' : 'unpublished'} successfully`,
      });
    } catch (e) {
      console.error('Error updating blog post:', e);
    }
  };

  const createEmployee = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([newEmployee])
        .select()
        .single();

      if (error) {
        console.error('Error creating employee:', error);
        toast({
          title: "Error",
          description: "Failed to create employee",
          variant: "destructive",
        });
        return;
      }

      setEmployees([data, ...employees]);
      setNewEmployee({ name: '', role: '', phone: '', picture_url: '' });
      toast({
        title: "Success",
        description: "Employee created successfully",
      });
    } catch (e) {
      console.error('Error creating employee:', e);
    }
  };

  const updateEmployee = async () => {
    if (!editingEmployee) return;

    try {
      const { error } = await supabase
        .from('employees')
        .update({
          name: editingEmployee.name,
          role: editingEmployee.role,
          phone: editingEmployee.phone,
          picture_url: editingEmployee.picture_url
        })
        .eq('id', editingEmployee.id);

      if (error) {
        console.error('Error updating employee:', error);
        toast({
          title: "Error",
          description: "Failed to update employee",
          variant: "destructive",
        });
        return;
      }

      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? editingEmployee : emp
      ));
      setEditingEmployee(null);
      toast({
        title: "Success",
        description: "Employee updated successfully",
      });
    } catch (e) {
      console.error('Error updating employee:', e);
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', employeeId);

      if (error) {
        console.error('Error deleting employee:', error);
        toast({
          title: "Error",
          description: "Failed to delete employee",
          variant: "destructive",
        });
        return;
      }

      setEmployees(employees.filter(emp => emp.id !== employeeId));
      toast({
        title: "Success",
        description: "Employee deleted successfully",
      });
    } catch (e) {
      console.error('Error deleting employee:', e);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'planning': return 'bg-blue-500';
      case 'in_progress': return 'bg-purple-500';
      case 'review': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      case 'on_hold': return 'bg-red-500';
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-orange-500';
      case 'converted': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
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
            <Button onClick={() => { setError(null); setLoading(true); checkAuth(); }} className="w-full">
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/client-dashboard')} className="w-full">
              Go to Client Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {profile.full_name}! • {profile.role}
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

        {/* Tab Navigation */}
        <div className="bg-background border-b px-4 sm:px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart },
              { id: 'clients', name: 'Clients', icon: Users },
              { id: 'projects', name: 'Projects', icon: Package },
              { id: 'messages', name: 'Messages', icon: MessageSquare },
              { id: 'blog', name: 'Blog', icon: Edit },
              { id: 'team', name: 'Team Directory', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Total Clients</span>
                    </div>
                    <div className="text-2xl font-bold">{clients.length}</div>
                    <div className="text-xs text-blue-500">+12% from last month</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Active Projects</span>
                    </div>
                    <div className="text-2xl font-bold">{projects.filter(p => p.status === 'in_progress').length}</div>
                    <div className="text-xs text-green-500">+8% from last month</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-muted-foreground">Pending Messages</span>
                    </div>
                    <div className="text-2xl font-bold">{contacts.filter(c => c.status === 'new').length}</div>
                    <div className="text-xs text-purple-500">-5% from last month</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    </div>
                    <div className="text-2xl font-bold">24%</div>
                    <div className="text-xs text-orange-500">+3% from last month</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Clients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clients.slice(0, 5).map((client) => (
                        <div key={client.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{client.full_name}</p>
                            <p className="text-sm text-muted-foreground">{client.company_name}</p>
                          </div>
                          <Badge className="bg-blue-500 text-white">
                            {client.plan}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.slice(0, 5).map((project) => (
                        <div key={project.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <Progress value={project.progress} className="w-24 h-2 mt-1" />
                          </div>
                          <Badge className={`${getStatusColor(project.status)} text-white`}>
                            {project.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'clients' && (
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>
                  Manage all registered clients and their subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{client.full_name}</h3>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-500 text-white">
                            {client.plan}
                          </Badge>
                          <Badge variant="outline">
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Company:</span>
                          <span className="ml-2">{client.company_name || 'Not provided'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Joined:</span>
                          <span className="ml-2">{new Date(client.signup_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'projects' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Title</label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter project title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Package</label>
                      <select
                        value={newProject.package}
                        onChange={(e) => setNewProject({ ...newProject, package: e.target.value as 'starter' | 'basic' | 'standard' | 'premium' })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="starter">Starter</option>
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Client</label>
                      <select
                        value={newProject.client_id}
                        onChange={(e) => setNewProject({ ...newProject, client_id: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Client</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.full_name} - {client.company_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        rows={3}
                        placeholder="Project description"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Button onClick={createProject} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={project.status}
                              onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                              className="p-1 border rounded text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="planning">Planning</option>
                              <option value="in_progress">In Progress</option>
                              <option value="review">Review</option>
                              <option value="completed">Completed</option>
                              <option value="on_hold">On Hold</option>
                            </select>
                            <Badge className={`${getStatusColor(project.status)} text-white`}>
                              {project.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        {project.notes && (
                          <div className="text-sm text-muted-foreground">
                            <strong>Notes:</strong> {project.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'messages' && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>
                  Manage contact form submissions and lead responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={contact.status}
                            onChange={(e) => updateMessageStatus(contact.id, e.target.value)}
                            className="p-1 border rounded text-sm"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                          </select>
                          <Badge className={`${getStatusColor(contact.status)} text-white`}>
                            {contact.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Company:</span>
                          <span className="ml-2">{contact.company || 'Not provided'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="ml-2">{contact.phone || 'Not provided'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Service:</span>
                          <span className="ml-2">{contact.service || 'General Inquiry'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date:</span>
                          <span className="ml-2">{new Date(contact.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Message:</span>
                        <p className="mt-1 p-2 bg-muted rounded">{contact.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'blog' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={newBlogPost.title}
                        onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter blog post title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <input
                        type="text"
                        value={newBlogPost.category}
                        onChange={(e) => setNewBlogPost({ ...newBlogPost, category: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., Technology, Business, Marketing"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Excerpt</label>
                      <textarea
                        value={newBlogPost.excerpt}
                        onChange={(e) => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        rows={2}
                        placeholder="Brief description of the post"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Content</label>
                      <textarea
                        value={newBlogPost.content}
                        onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        rows={6}
                        placeholder="Full blog post content"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={newBlogPost.featured}
                        onChange={(e) => setNewBlogPost({ ...newBlogPost, featured: e.target.checked })}
                      />
                      <label htmlFor="featured" className="text-sm">Featured post</label>
                    </div>
                    <Button onClick={createBlogPost} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Blog Post
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{post.title}</h3>
                            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={post.published ? "default" : "outline"}
                              onClick={() => toggleBlogPostStatus(post.id, !post.published)}
                            >
                              {post.published ? 'Published' : 'Draft'}
                            </Button>
                            {post.featured && (
                              <Badge className="bg-gold text-white">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {post.category} • {new Date(post.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'team' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Add New Team Member</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <input
                        type="text"
                        value={newEmployee.role}
                        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., CEO, Lead Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="text"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Profile Picture URL</label>
                      <input
                        type="url"
                        value={newEmployee.picture_url}
                        onChange={(e) => setNewEmployee({ ...newEmployee, picture_url: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Button onClick={createEmployee} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Team Member
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Directory</CardTitle>
                  <CardDescription>
                    Manage team members and their information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employees.map((employee) => (
                      <div key={employee.id} className="border rounded-lg p-4">
                        {editingEmployee?.id === employee.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={editingEmployee.name}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                              className="w-full p-2 border rounded text-sm"
                            />
                            <input
                              type="text"
                              value={editingEmployee.role}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
                              className="w-full p-2 border rounded text-sm"
                            />
                            <input
                              type="text"
                              value={editingEmployee.phone}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                              className="w-full p-2 border rounded text-sm"
                            />
                            <input
                              type="url"
                              value={editingEmployee.picture_url}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, picture_url: e.target.value })}
                              className="w-full p-2 border rounded text-sm"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={updateEmployee}>
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingEmployee(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 mb-3">
                              {employee.picture_url ? (
                                <img
                                  src={employee.picture_url}
                                  alt={employee.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                  <User className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <h3 className="font-semibold">{employee.name}</h3>
                                <p className="text-sm text-muted-foreground">{employee.role}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <Phone className="h-3 w-3" />
                              <span>{employee.phone}</span>
                            </div>

                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => setEditingEmployee(employee)}>
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
