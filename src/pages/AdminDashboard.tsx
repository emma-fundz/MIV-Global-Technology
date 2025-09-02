import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import StatsCard from '@/components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FolderOpen, 
  MessageSquare, 
  FileText,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Calendar,
  Building,
  Mail,
  Phone,
  User
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
  plan: 'starter' | 'basic' | 'standard' | 'premium' | 'free';
  signup_date: string;
  status: string;
  phone?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';
  progress: number;
  client_id: string;
  assigned_to: string;
  start_date?: string;
  due_date?: string;
  created_at: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'converted';
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published';
  featured_image?: string;
  author_id: string;
  created_at: string;
  published_at?: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  picture_url: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: s } = await supabase.auth.getSession();
      const uid = s?.session?.user?.id;
      if (!uid) {
        setLoading(false);
        setError("Not authenticated");
        navigate('/auth');
        return;
      }

      setUser(s.session.user);

      const [{ data: profileData }, { data: client }] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', uid).maybeSingle(),
        supabase.from('clients').select('*').eq('user_id', uid).maybeSingle(),
      ]);

      console.log('AdminDashboard fetch results:', { profile: profileData, client, uid });

      if (!profileData && !client) {
        setError("Profile not found. Please contact support.");
        setLoading(false);
        return;
      }

      if (!profileData || (profileData.role !== 'admin' && profileData.role !== 'team')) {
        setLoading(false);
        navigate('/client-dashboard');
        return;
      }

      setProfile(profileData);
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
      const [clientsRes, projectsRes, contactRes, blogPostsRes, profilesRes] = await Promise.all([
        supabase.from('clients').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').order('created_at', { ascending: false })
      ]);

      if (clientsRes.data) setClients(clientsRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (contactRes.data) {
        // Transform contact_submissions to match Message interface
        const transformedMessages = contactRes.data.map(contact => ({
          id: contact.id,
          name: contact.name || 'Unknown',
          email: contact.email,
          company: contact.company || '',
          phone: contact.phone || '',
          service: contact.service || '',
          message: contact.message,
          status: 'new' as const,
          created_at: contact.created_at
        }));
        setMessages(transformedMessages);
      }
      if (blogPostsRes.data) {
        // Transform blog_posts to match BlogPost interface
        const transformedBlogs = blogPostsRes.data.map(post => ({
          ...post,
          tags: [],
          status: post.published ? 'published' as const : 'draft' as const,
          author_id: 'admin',
          featured_image: post.image_url,
          published_at: post.published ? post.created_at : null
        }));
        setBlogPosts(transformedBlogs);
      }
      if (profilesRes.data) {
        // Transform profiles to match Employee interface for team members
        const teamMembers = profilesRes.data
          .filter(profile => profile.role === 'team' || profile.role === 'admin')
          .map(profile => ({
            id: profile.id,
            name: profile.full_name,
            email: profile.email,
            phone: '',
            role: profile.role === 'admin' ? 'Team Lead' : 'Team Member',
            picture_url: null,
            created_at: profile.created_at
          }));
        setEmployees(teamMembers);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
            <div className="p-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-8"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content skeleton */}
          <div className="flex-1 p-8">
            <div className="h-10 bg-gray-200 rounded animate-pulse mb-8 w-1/3"></div>
            
            {/* Stats cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
            
            {/* Content cards skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/2"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <CardDescription>{error}</CardDescription>
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

  const stats = {
    totalClients: clients.length,
    activeProjects: projects.filter(p => p.status === 'in_progress').length,
    newMessages: messages.filter(m => m.status === 'new').length,
    publishedBlogs: blogPosts.filter(b => b.status === 'published').length,
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Clients"
          value={stats.totalClients}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          change="+8% from last month"
          changeType="positive"
          icon={FolderOpen}
        />
        <StatsCard
          title="New Messages"
          value={stats.newMessages}
          change="3 unread"
          changeType="neutral"
          icon={MessageSquare}
        />
        <StatsCard
          title="Published Blogs"
          value={stats.publishedBlogs}
          change="+2 this week"
          changeType="positive"
          icon={FileText}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Latest client registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.slice(0, 5).map((client) => (
                <div key={client.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{client.full_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{client.full_name}</p>
                    <p className="text-sm text-muted-foreground truncate">{client.company_name}</p>
                  </div>
                  <Badge variant={client.plan === 'premium' ? 'default' : 'secondary'}>
                    {client.plan}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest client inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.slice(0, 5).map((message) => (
                <div key={message.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{message.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={message.status === 'new' ? 'destructive' : 'secondary'}>
                    {message.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderClients = () => {
    const filteredClients = clients.filter(client => {
      const matchesSearch = searchTerm === '' || 
        client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Clients Management</h2>
            <p className="text-muted-foreground">Manage all registered clients and their subscriptions</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="grid gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg font-semibold">
                        {client.full_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg truncate">{client.full_name}</h3>
                        <Badge variant={client.plan === 'premium' ? 'default' : 'secondary'}>
                          {client.plan}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{client.email}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {client.company_name || 'No company'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p className="font-medium">
                        {new Date(client.signup_date).toLocaleDateString()}
                      </p>
                      <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                        {client.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No clients found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by adding your first client'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'clients':
        return renderClients();
      case 'projects':
        return <div>Projects section - Coming next</div>;
      case 'messages':
        return <div>Messages section - Coming next</div>;
      case 'blog':
        return <div>Blog section - Coming next</div>;
      case 'team':
        return <div>Team section - Coming next</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header with mobile menu */}
        <div className="flex-shrink-0">
          <AdminHeader
            user={user}
            profile={profile}
            onLogout={handleLogout}
            mobileMenuTrigger={
              <div className="lg:hidden">
                <AdminSidebar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onLogout={handleLogout}
                />
              </div>
            }
          />
        </div>
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
