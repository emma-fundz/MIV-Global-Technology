import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Mail, 
  BarChart, 
  Settings, 
  FileText, 
  Eye, 
  Edit, 
  Trash2,
  MessageSquare,
  Calendar,
  TrendingUp,
  LogOut,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface Client {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  plan: string;
  signup_date: string;
  status: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  client_id: string;
  assigned_to: string;
  package: string;
  status: string;
  progress: number;
  notes: string;
  clients: { full_name: string };
  profiles: { full_name: string };
}

interface Message {
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

interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  picture_url: string | null;
  created_at: string;
  updated_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category: string | null;
  tags: string[] | null;
  author_id: string | null;
  status: string;
  featured: boolean | null;
  views: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form states for new project
  const [newProject, setNewProject] = useState<{
    title: string;
    description: string;
    client_id: string;
    assigned_to: string;
    package: 'starter' | 'basic' | 'standard' | 'premium';
    status: 'pending' | 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';
    progress: number;
    notes: string;
  }>({
    title: '',
    description: '',
    client_id: '',
    assigned_to: '',
    package: 'basic',
    status: 'pending',
    progress: 0,
    notes: ''
  });

  // Form states for new employee
  const [newEmployee, setNewEmployee] = useState<{
    name: string;
    role: string;
    phone: string;
    picture_url: string;
  }>({
    name: '',
    role: '',
    phone: '',
    picture_url: ''
  });

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Form states for new blog post
  const [newBlogPost, setNewBlogPost] = useState<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    category: string;
    tags: string;
    status: 'draft' | 'published';
    featured: boolean;
  }>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: '',
    tags: '',
    status: 'draft',
    featured: false
  });

  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Session gate - check uid before any fetch
      const { data: s } = await supabase.auth.getSession();
      const uid = s?.session?.user?.id;
      if (!uid) {
        setLoading(false);
        setError("Not authenticated");
        navigate('/auth');
        return;
      }

      setUser(s.session.user);

      // Profile/Client fetch with Promise.all
      const [{ data: profile }, { data: client }] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', uid).maybeSingle(),
        supabase.from('clients').select('*').eq('user_id', uid).maybeSingle(),
      ]);

      // Debug logging
      console.log('AdminDashboard fetch results:', { profile, client, uid });

      if (!profile && !client) {
        setError("Profile not found. We couldn't find your profile. Please contact support.");
        setLoading(false);
        return;
      }

      if (!profile || (profile.role !== 'admin' && profile.role !== 'team')) {
        setLoading(false);
        navigate('/client-dashboard');
        return;
      }

      setUserProfile(profile);
      await loadDashboardData();
      setLoading(false);
    } catch (e) {
      console.error("Dashboard load error:", e);
      setError("Failed to load profile");
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      // Load clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (clientsError) throw clientsError;
      setClients(clientsData || []);

      // Load projects with client and assigned user info
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          clients!inner(full_name),
          profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);

      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);

      // Load team members
      const { data: teamData, error: teamError } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['admin', 'team']);

      if (teamError) throw teamError;
      setTeamMembers(teamData || []);

      // Load employees
      const { data: employeesData, error: employeesError } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (employeesError) throw employeesError;
      setEmployees(employeesData || []);

      // Load blog posts
      const { data: blogPostsData, error: blogPostsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (blogPostsError) throw blogPostsError;
      setBlogPosts(blogPostsData || []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please refresh the page.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const createProject = async () => {
    if (!newProject.title || !newProject.client_id) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .insert([newProject as any]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project created successfully.",
      });

      setNewProject({
        title: '',
        description: '',
        client_id: '',
        assigned_to: '',
        package: 'basic',
        status: 'pending',
        progress: 0,
        notes: ''
      });

      await loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status })
        .eq('id', messageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message status updated successfully.",
      });

      await loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createEmployee = async () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('employees')
        .insert([newEmployee]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Employee added successfully.",
      });

      setNewEmployee({
        name: '',
        role: '',
        phone: '',
        picture_url: ''
      });

      await loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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

      if (error) throw error;

      toast({
        title: "Success",
        description: "Employee updated successfully.",
      });

      setEditingEmployee(null);
      await loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in title and content fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newBlogPost.title,
          slug: newBlogPost.slug,
          excerpt: newBlogPost.excerpt || null,
          content: newBlogPost.content,
          featured_image: newBlogPost.featured_image || null,
          category: newBlogPost.category || null,
          tags: newBlogPost.tags ? newBlogPost.tags.split(',').map(t => t.trim()) : null,
          status: newBlogPost.status,
          featured: newBlogPost.featured,
          author_id: user?.id,
          published_at: newBlogPost.status === 'published' ? new Date().toISOString() : null
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post created successfully.",
      });

      setNewBlogPost({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        category: '',
        tags: '',
        status: 'draft',
        featured: false
      });

      await loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateBlogPost = async () => {
    if (!editingBlogPost) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: editingBlogPost.title,
          slug: editingBlogPost.slug,
          excerpt: editingBlogPost.excerpt,
          content: editingBlogPost.content,
          featured_image: editingBlogPost.featured_image,
          category: editingBlogPost.category,
          tags: editingBlogPost.tags,
          status: editingBlogPost.status,
          featured: editingBlogPost.featured,
          published_at: editingBlogPost.status === 'published' && !editingBlogPost.published_at 
            ? new Date().toISOString() 
            : editingBlogPost.published_at
        })
        .eq('id', editingBlogPost.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      });

      setEditingBlogPost(null);
      await loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteBlogPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      });

      await loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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

  const analytics = {
    totalClients: clients.length,
    activeProjects: projects.filter(p => p.status === 'in_progress').length,
    pendingContacts: messages.filter(c => c.status === 'new').length,
    conversionRate: clients.length > 0 ? ((clients.length / (clients.length + messages.length)) * 100).toFixed(1) : '0'
  };

return (
  <div className="min-h-screen bg-muted">
    {/* Header */}
    <div className="bg-background border-b px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <img 
              src="/lovable-uploads/7dbec63c-b4f2-4c1e-bfc4-c7fd0dff4d18.png" 
              alt="MIV Global Technology" 
              className="h-6 w-6 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">MIV Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {userProfile?.full_name} ({userProfile?.role})
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>

    <div className="p-4 sm:p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contacts">Contact Forms</TabsTrigger>
          <TabsTrigger value="employees">Team Directory</TabsTrigger>
          <TabsTrigger value="blog">Blog Management</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Total Clients</span>
                </div>
                <div className="text-2xl font-bold">{analytics.totalClients}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Active Projects</span>
                </div>
                <div className="text-2xl font-bold">{analytics.activeProjects}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-muted-foreground">Pending Contacts</span>
                </div>
                <div className="text-2xl font-bold">{analytics.pendingContacts}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                </div>
                <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.slice(0, 5).map((message) => (
                  <div key={message.id} className="flex items-center gap-3 p-3 border rounded">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium">New contact from {message.name}</p>
                      <p className="text-sm text-muted-foreground">{message.email} • {message.service}</p>
                    </div>
                    <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                      {message.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Client Management</CardTitle>
                    <CardDescription>View and manage all registered clients</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{client.full_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {client.company_name} • {client.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{client.plan}</Badge>
                          <Badge 
                            variant={client.status === 'active' ? 'default' : 'secondary'}
                          >
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Joined: {new Date(client.signup_date).toLocaleDateString()}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Projects List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Project Management</CardTitle>
                  <CardDescription>Track and manage client projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Client: {project.clients?.full_name} • 
                              Assigned: {project.profiles?.full_name || 'Unassigned'}
                            </p>
                          </div>
                          <Badge variant="outline">{project.status}</Badge>
                        </div>
                        <p className="text-sm mb-3">{project.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Progress: {project.progress}%</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-1" />
                              Update
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Create New Project */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input
                      id="project-title"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      placeholder="Enter project title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="project-client">Client</Label>
                    <Select value={newProject.client_id} onValueChange={(value) => setNewProject({...newProject, client_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="project-assigned">Assign To</Label>
                    <Select value={newProject.assigned_to} onValueChange={(value) => setNewProject({...newProject, assigned_to: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="Enter project description"
                    />
                  </div>

                  <Button onClick={createProject} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Manage incoming client inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{message.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {message.company} • {message.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={message.status === 'new' ? 'destructive' : 'default'}
                          >
                            {message.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm mb-1"><strong>Service:</strong> {message.service}</p>
                        <p className="text-sm mb-1"><strong>Phone:</strong> {message.phone}</p>
                        <p className="text-sm"><strong>Message:</strong> {message.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateMessageStatus(message.id, 'contacted')}
                          disabled={message.status !== 'new'}
                        >
                          Mark as Contacted
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateMessageStatus(message.id, 'converted')}
                        >
                          Mark as Converted
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employee Directory Tab */}
          <TabsContent value="employees" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Employee List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Team Directory</CardTitle>
                  <CardDescription>Manage employee information for the website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employees.map((employee) => (
                      <div key={employee.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{employee.name}</h3>
                              <p className="text-sm text-muted-foreground">{employee.role}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingEmployee(employee)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteEmployee(employee.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Phone: {employee.phone}</p>
                          <p>Added: {new Date(employee.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add/Edit Employee Form */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="employee-name">Full Name</Label>
                    <Input
                      id="employee-name"
                      value={editingEmployee ? editingEmployee.name : newEmployee.name}
                      onChange={(e) => {
                        if (editingEmployee) {
                          setEditingEmployee({...editingEmployee, name: e.target.value});
                        } else {
                          setNewEmployee({...newEmployee, name: e.target.value});
                        }
                      }}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="employee-role">Role</Label>
                    <Input
                      id="employee-role"
                      value={editingEmployee ? editingEmployee.role : newEmployee.role}
                      onChange={(e) => {
                        if (editingEmployee) {
                          setEditingEmployee({...editingEmployee, role: e.target.value});
                        } else {
                          setNewEmployee({...newEmployee, role: e.target.value});
                        }
                      }}
                      placeholder="e.g., Sales Manager"
                    />
                  </div>

                  <div>
                    <Label htmlFor="employee-phone">Phone Number</Label>
                    <Input
                      id="employee-phone"
                      value={editingEmployee ? editingEmployee.phone : newEmployee.phone}
                      onChange={(e) => {
                        if (editingEmployee) {
                          setEditingEmployee({...editingEmployee, phone: e.target.value});
                        } else {
                          setNewEmployee({...newEmployee, phone: e.target.value});
                        }
                      }}
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="employee-picture">Picture URL (Optional)</Label>
                    <Input
                      id="employee-picture"
                      value={editingEmployee ? (editingEmployee.picture_url || '') : newEmployee.picture_url}
                      onChange={(e) => {
                        if (editingEmployee) {
                          setEditingEmployee({...editingEmployee, picture_url: e.target.value});
                        } else {
                          setNewEmployee({...newEmployee, picture_url: e.target.value});
                        }
                      }}
                      placeholder="https://mivglobal.tech/photos/employee.jpg"
                    />
                  </div>

                  <div className="flex gap-2">
                    {editingEmployee ? (
                      <>
                        <Button onClick={updateEmployee} className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Update Employee
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingEmployee(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={createEmployee} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Employee
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Blog Management Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Blog Posts List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Blog Posts ({blogPosts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {post.excerpt || 'No excerpt available'}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status}
                              </Badge>
                              {post.featured && (
                                <Badge variant="outline">Featured</Badge>
                              )}
                              {post.category && (
                                <Badge variant="outline">{post.category}</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingBlogPost(post)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteBlogPost(post.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>Views: {post.views || 0} • Created: {new Date(post.created_at).toLocaleDateString()}</p>
                          {post.published_at && (
                            <p>Published: {new Date(post.published_at).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add/Edit Blog Post Form */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingBlogPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="blog-title">Title</Label>
                    <Input
                      id="blog-title"
                      value={editingBlogPost ? editingBlogPost.title : newBlogPost.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        if (editingBlogPost) {
                          setEditingBlogPost({...editingBlogPost, title, slug});
                        } else {
                          setNewBlogPost({...newBlogPost, title, slug});
                        }
                      }}
                      placeholder="Enter blog post title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="blog-slug">Slug (URL)</Label>
                    <Input
                      id="blog-slug"
                      value={editingBlogPost ? editingBlogPost.slug : newBlogPost.slug}
                      onChange={(e) => {
                        if (editingBlogPost) {
                          setEditingBlogPost({...editingBlogPost, slug: e.target.value});
                        } else {
                          setNewBlogPost({...newBlogPost, slug: e.target.value});
                        }
                      }}
                      placeholder="blog-post-url"
                    />
                  </div>

                  <div>
                    <Label htmlFor="blog-excerpt">Excerpt</Label>
                    <Textarea
                      id="blog-excerpt"
                      value={editingBlogPost ? (editingBlogPost.excerpt || '') : newBlogPost.excerpt}
                      onChange={(e) => {
                        if (editingBlogPost) {
                          setEditingBlogPost({...editingBlogPost, excerpt: e.target.value});
                        } else {
                          setNewBlogPost({...newBlogPost, excerpt: e.target.value});
                        }
                      }}
                      placeholder="Brief description of the post"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="blog-content">Content</Label>
                    <Textarea
                      id="blog-content"
                      value={editingBlogPost ? editingBlogPost.content : newBlogPost.content}
                      onChange={(e) => {
                        if (editingBlogPost) {
                          setEditingBlogPost({...editingBlogPost, content: e.target.value});
                        } else {
                          setNewBlogPost({...newBlogPost, content: e.target.value});
                        }
                      }}
                      placeholder="Write your blog post content here..."
                      rows={8}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="blog-category">Category</Label>
                      <Input
                        id="blog-category"
                        value={editingBlogPost ? (editingBlogPost.category || '') : newBlogPost.category}
                        onChange={(e) => {
                          if (editingBlogPost) {
                            setEditingBlogPost({...editingBlogPost, category: e.target.value});
                          } else {
                            setNewBlogPost({...newBlogPost, category: e.target.value});
                          }
                        }}
                        placeholder="e.g., Technology"
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-tags">Tags (comma-separated)</Label>
                      <Input
                        id="blog-tags"
                        value={editingBlogPost ? (editingBlogPost.tags?.join(', ') || '') : newBlogPost.tags}
                        onChange={(e) => {
                          if (editingBlogPost) {
                            setEditingBlogPost({...editingBlogPost, tags: e.target.value.split(',').map(t => t.trim())});
                          } else {
                            setNewBlogPost({...newBlogPost, tags: e.target.value});
                          }
                        }}
                        placeholder="web, design, development"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="blog-image">Featured Image URL</Label>
                    <Input
                      id="blog-image"
                      value={editingBlogPost ? (editingBlogPost.featured_image || '') : newBlogPost.featured_image}
                      onChange={(e) => {
                        if (editingBlogPost) {
                          setEditingBlogPost({...editingBlogPost, featured_image: e.target.value});
                        } else {
                          setNewBlogPost({...newBlogPost, featured_image: e.target.value});
                        }
                      }}
                      placeholder="https://mivglobal.tech/images/blog-featured.jpg"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="blog-featured"
                        checked={editingBlogPost ? (editingBlogPost.featured || false) : newBlogPost.featured}
                        onChange={(e) => {
                          if (editingBlogPost) {
                            setEditingBlogPost({...editingBlogPost, featured: e.target.checked});
                          } else {
                            setNewBlogPost({...newBlogPost, featured: e.target.checked});
                          }
                        }}
                      />
                      <Label htmlFor="blog-featured">Featured Post</Label>
                    </div>

                    <Select
                      value={editingBlogPost ? editingBlogPost.status : newBlogPost.status}
                      onValueChange={(value: 'draft' | 'published') => {
                        if (editingBlogPost) {
                          setEditingBlogPost({...editingBlogPost, status: value});
                        } else {
                          setNewBlogPost({...newBlogPost, status: value});
                        }
                      }}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    {editingBlogPost ? (
                      <>
                        <Button onClick={updateBlogPost} className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Update Post
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingBlogPost(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={createBlogPost} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Post
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;