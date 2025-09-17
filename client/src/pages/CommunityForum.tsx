import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import NavigationHeader from "@/components/NavigationHeader";
import PanicButton from "@/components/PanicButton";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  MapPin, 
  Clock,
  User,
  Plus,
  Search,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: "safety-tips" | "qa" | "local-guides" | "price-transparency" | "general";
  author: string;
  avatar: string;
  location: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  isVerified?: boolean;
}

export default function CommunityForum() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { toast } = useToast();

  // Mock forum posts - todo: remove mock functionality
  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Best time to visit Nohkalikai Falls - Weather Update",
      content: "Just returned from Meghalaya. The monsoon season makes the falls spectacular but trails can be slippery. Best visited in October-February...",
      category: "safety-tips",
      author: "Priya Travels",
      avatar: "PT",
      location: "Shillong, Meghalaya",
      timestamp: "2 hours ago",
      upvotes: 24,
      downvotes: 2,
      comments: 8,
      isVerified: true,
    },
    {
      id: "2", 
      title: "Fair Pricing for Local Transport in Manali",
      content: "Sharing actual rates I paid for local transport to help fellow travelers avoid overcharging...",
      category: "price-transparency",
      author: "Rajesh Kumar",
      avatar: "RK",
      location: "Manali, HP",
      timestamp: "5 hours ago",
      upvotes: 18,
      downvotes: 1,
      comments: 12,
    },
    {
      id: "3",
      title: "Verified Local Guide Available in Kaziranga",
      content: "Experienced wildlife guide with 10 years experience. Government certified. Available for Kaziranga safaris...",
      category: "local-guides",
      author: "Assam Adventures",
      avatar: "AA",
      location: "Kaziranga, Assam",
      timestamp: "1 day ago",
      upvotes: 31,
      downvotes: 0,
      comments: 15,
      isVerified: true,
    },
    {
      id: "4",
      title: "Solo female traveler - Safety tips for Northeast",
      content: "Recently completed a solo trip across Northeast India. Sharing safety tips and recommendations...",
      category: "safety-tips",
      author: "Maya Explorer",
      avatar: "ME",
      location: "Guwahati, Assam",
      timestamp: "2 days ago",
      upvotes: 42,
      downvotes: 3,
      comments: 20,
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "safety-tips": return <AlertTriangle className="w-4 h-4" />;
      case "qa": return <HelpCircle className="w-4 h-4" />;
      case "local-guides": return <User className="w-4 h-4" />;
      case "price-transparency": return <DollarSign className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "safety-tips": return "bg-destructive text-destructive-foreground";
      case "qa": return "bg-trust text-trust-foreground";
      case "local-guides": return "bg-success text-success-foreground";
      case "price-transparency": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleVote = (postId: string, voteType: "up" | "down") => {
    console.log(`Vote ${voteType} on post ${postId}`);
    toast({
      title: voteType === "up" ? "Upvoted!" : "Downvoted!",
      description: "Thank you for your feedback",
      duration: 2000,
    });
  };

  const handleCreatePost = (formData: any) => {
    console.log("Creating new post:", formData);
    toast({
      title: "Post Created Successfully!",
      description: "Your post has been published to the community.",
      duration: 3000,
    });
    setIsCreatePostOpen(false);
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Header Section */}
      <section className="border-b bg-muted/30 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
              <p className="text-muted-foreground">Connect, share experiences, and help fellow travelers stay safe</p>
            </div>
            
            <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
              <DialogTrigger asChild>
                <Button className="bg-trust text-trust-foreground hover:bg-trust/90" data-testid="button-create-post">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl" data-testid="modal-create-post">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input placeholder="What would you like to discuss?" data-testid="input-post-title" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger data-testid="select-post-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safety-tips">Safety Tips</SelectItem>
                        <SelectItem value="qa">Q&A</SelectItem>
                        <SelectItem value="local-guides">Local Guides</SelectItem>
                        <SelectItem value="price-transparency">Price Transparency</SelectItem>
                        <SelectItem value="general">General Discussion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea 
                      placeholder="Share your thoughts, experiences, or questions..." 
                      rows={6}
                      data-testid="textarea-post-content"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreatePostOpen(false)} data-testid="button-cancel-post">
                      Cancel
                    </Button>
                    <Button onClick={() => handleCreatePost({})} data-testid="button-submit-post">
                      Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { id: "all", label: "All Posts", icon: MessageSquare },
                  { id: "safety-tips", label: "Safety Tips", icon: AlertTriangle },
                  { id: "qa", label: "Q&A", icon: HelpCircle },
                  { id: "local-guides", label: "Local Guides", icon: User },
                  { id: "price-transparency", label: "Fair Pricing", icon: DollarSign },
                ].map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={activeCategory === id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(id)}
                    data-testid={`button-category-${id}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Posts Today</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verified Guides</span>
                  <span className="font-medium">89</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-posts"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]" data-testid="select-sort-posts">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover-elevate" data-testid={`post-${post.id}`}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Post Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-trust/10 flex items-center justify-center">
                            <span className="text-sm font-medium">{post.avatar}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{post.author}</span>
                              {post.isVerified && <Star className="w-4 h-4 text-warning fill-warning" />}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{post.location}</span>
                              <span>•</span>
                              <Clock className="w-3 h-3" />
                              <span>{post.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(post.category)}>
                          {getCategoryIcon(post.category)}
                          <span className="ml-1 capitalize">{post.category.replace("-", " ")}</span>
                        </Badge>
                      </div>

                      {/* Post Content */}
                      <div>
                        <h3 className="font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm">{post.content}</p>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleVote(post.id, "up")}
                              data-testid={`button-upvote-${post.id}`}
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {post.upvotes}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleVote(post.id, "down")}
                              data-testid={`button-downvote-${post.id}`}
                            >
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              {post.downvotes}
                            </Button>
                          </div>
                          <Button size="sm" variant="ghost" data-testid={`button-comments-${post.id}`}>
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PanicButton variant="floating" />
    </div>
  );
}