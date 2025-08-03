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
  Globe,
  Menu,
  X
} from 'lucide-react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
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
      <div className="bg-background border-b px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="lg:hidden p-2 hover:bg-muted rounded"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <Globe className="h-4 w-4 text-black" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">MIV Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Manage your business operations</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
            size="sm"
            className="text-xs sm:text-sm"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 sm:p-6">
            <nav className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer bg-gold text-black">
                <BarChart className="h-4 w-4" />
                <span className="font-medium text-sm">Overview</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">Contact Forms</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
                <FileText className="h-4 w-4" />
                <span className="text-sm">Blog Posts</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
                <Users className="h-4 w-4" />
                <span className="text-sm">Analytics</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </div>
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="contacts" className="text-xs sm:text-sm">Contact Forms</TabsTrigger>
              <TabsTrigger value="blog" className="text-xs sm:text-sm">Blog Posts</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 sm:space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs sm:text-sm text-muted-foreground">Total Visitors</span>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{analytics.totalVisitors.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs sm:text-sm text-muted-foreground">Contact Forms</span>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{analytics.contactForms}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs sm:text-sm text-muted-foreground">Blog Views</span>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{analytics.blogViews.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs sm:text-sm text-muted-foreground">Conversion Rate</span>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{analytics.conversionRate}%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded">
                      <MessageSquare className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base">New contact form submission</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Kemi Adeleke - StyleHub Africa</p>
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded">
                      <FileText className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base">Blog post published</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">The Future of African Tech</p>
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Contact Form Submissions</CardTitle>
                  <CardDescription>
                    Manage and respond to client inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {contactSubmissions.map((submission) => (
                      <div key={submission.id} className="border rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">{submission.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{submission.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={
                                submission.status === 'new' ? 'destructive' : 
                                submission.status === 'contacted' ? 'default' : 'secondary'
                              }
                              className="text-xs"
                            >
                              {submission.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{submission.date}</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="text-xs sm:text-sm mb-1"><strong>Service:</strong> {submission.service}</p>
                          <p className="text-xs sm:text-sm mb-1"><strong>Email:</strong> {submission.email}</p>
                          <p className="text-xs sm:text-sm"><strong>Message:</strong> {submission.message}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Mail className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <CardTitle className="text-base sm:text-lg">Blog Posts</CardTitle>
                      <CardDescription>
                        Manage your blog content and publications
                      </CardDescription>
                    </div>
                    <Button size="sm" className="text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      New Post
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
                          <h3 className="font-semibold text-sm sm:text-base">{post.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={post.status === 'published' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {post.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                          <span>By {post.author} • {post.date}</span>
                          <span>{post.views} views</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs text-red-600">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Website Analytics</CardTitle>
                  <CardDescription>
                    Track your website performance and visitor behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm sm:text-base">Traffic Overview</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Page Views</span>
                          <span>45,230</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Unique Visitors</span>
                          <span>15,420</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Bounce Rate</span>
                          <span>34.2%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm sm:text-base">Top Pages</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>/services</span>
                          <span>12,340</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>/pricing</span>
                          <span>8,920</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>/about</span>
                          <span>6,450</span>
                        </div>
                      </div>
                    </div>
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