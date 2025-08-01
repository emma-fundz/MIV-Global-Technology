import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
  Globe
} from 'lucide-react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Sample data for demonstration
  const contactSubmissions = [
    {
      id: 1,
      name: "Kemi Adeleke",
      email: "kemi@stylehub.com",
      company: "StyleHub Africa",
      service: "E-commerce Development",
      message: "We need a complete e-commerce solution for our fashion brand.",
      date: "2024-01-15",
      status: "new"
    },
    {
      id: 2,
      name: "David Mensah",
      email: "david@finforward.com",
      company: "FinanceForward",
      service: "Full Business Package",
      message: "Looking for comprehensive business transformation services.",
      date: "2024-01-14",
      status: "contacted"
    },
    {
      id: 3,
      name: "Amara Okafor",
      email: "amara@ecofarm.com",
      company: "EcoFarm Solutions",
      service: "Mobile App Development",
      message: "Need a mobile app to connect farmers with buyers.",
      date: "2024-01-13",
      status: "in-progress"
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of African Tech: 5 Trends Shaping 2024",
      status: "published",
      author: "Adebayo Johnson",
      date: "2024-01-15",
      views: 1250
    },
    {
      id: 2,
      title: "Building a Strong Digital Brand Identity",
      status: "draft",
      author: "Chioma Okafor",
      date: "2024-01-12",
      views: 0
    }
  ];

  const analytics = {
    totalVisitors: 15420,
    contactForms: 89,
    blogViews: 8930,
    conversionRate: 3.2
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would verify credentials
    if (loginData.email === 'admin@mivglobal.com' && loginData.password === 'miv2024admin') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use admin@mivglobal.com / miv2024admin');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-black" />
            </div>
            <CardTitle>MIV Admin Portal</CardTitle>
            <CardDescription>
              Secure access to your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="admin@mivglobal.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gold text-black hover:bg-gold-dark">
                Login to Dashboard
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Demo credentials: admin@mivglobal.com / miv2024admin
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-background border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <Globe className="h-4 w-4 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MIV Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your business operations</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-background border-r min-h-screen p-6">
          <nav className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer bg-gold text-black">
              <BarChart className="h-4 w-4" />
              <span className="font-medium">Overview</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Forms</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
              <FileText className="h-4 w-4" />
              <span>Blog Posts</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
              <Users className="h-4 w-4" />
              <span>Analytics</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contacts">Contact Forms</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total Visitors</span>
                    </div>
                    <div className="text-2xl font-bold">{analytics.totalVisitors.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Contact Forms</span>
                    </div>
                    <div className="text-2xl font-bold">{analytics.contactForms}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Blog Views</span>
                    </div>
                    <div className="text-2xl font-bold">{analytics.blogViews.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
                    <div className="flex items-center gap-3 p-3 border rounded">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">New contact form submission</p>
                        <p className="text-sm text-muted-foreground">Kemi Adeleke - StyleHub Africa</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded">
                      <FileText className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium">Blog post published</p>
                        <p className="text-sm text-muted-foreground">The Future of African Tech</p>
                      </div>
                      <span className="text-sm text-muted-foreground">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <CardDescription>
                    Manage and respond to customer inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactSubmissions.map((contact) => (
                      <div key={contact.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground">{contact.email} • {contact.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={contact.status === 'new' ? 'destructive' : contact.status === 'contacted' ? 'secondary' : 'default'}
                            >
                              {contact.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm mb-3">{contact.message}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Service: {contact.service}</span>
                          <span>{contact.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Blog Posts</CardTitle>
                      <CardDescription>Manage your blog content</CardDescription>
                    </div>
                    <Button className="bg-gold text-black hover:bg-gold-dark">
                      New Post
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium mb-2">{post.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>By {post.author}</span>
                              <span>{post.date}</span>
                              <span>{post.views} views</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                              {post.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Website Analytics</CardTitle>
                  <CardDescription>
                    Track your website performance and user engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground">
                      Connect Google Analytics or other analytics tools to view detailed reports here.
                    </p>
                    <Button className="mt-4 bg-gold text-black hover:bg-gold-dark">
                      Connect Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;