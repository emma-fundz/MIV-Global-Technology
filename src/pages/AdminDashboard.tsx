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
  Globe,
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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);

      // Check if user is admin/team
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (!profile || (profile.role !== 'admin' && profile.role !== 'team')) {
        navigate('/client-dashboard');
        return;
      }

      setUserProfile(profile);
      await loadDashboardData();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/auth');
    } finally {
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

      // Load contact submissions
      const { data: contactsData, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;
      setContacts(contactsData || []);

      // Load team members
      const { data: teamData, error: teamError } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['admin', 'team']);

      if (teamError) throw teamError;
      setTeamMembers(teamData || []);

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

  const updateContactStatus = async (contactId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', contactId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact status updated successfully.",
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
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const analytics = {
    totalClients: clients.length,
    activeProjects: projects.filter(p => p.status === 'in_progress').length,
    pendingContacts: contacts.filter(c => c.status === 'new').length,
    conversionRate: clients.length > 0 ? ((clients.length / (clients.length + contacts.length)) * 100).toFixed(1) : '0'
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-background border-b px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-accent-foreground" />
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
                  {contacts.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="flex items-center gap-3 p-3 border rounded">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">New contact from {contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.company} - {contact.service}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </span>
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

          {/* Contact Forms Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>Manage incoming client inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {contact.company} • {contact.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={contact.status === 'new' ? 'destructive' : 'default'}
                          >
                            {contact.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm mb-1"><strong>Service:</strong> {contact.service}</p>
                        <p className="text-sm"><strong>Message:</strong> {contact.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateContactStatus(contact.id, 'contacted')}
                          disabled={contact.status !== 'new'}
                        >
                          Mark as Contacted
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateContactStatus(contact.id, 'converted')}
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;