import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavigationHeader from "@/components/NavigationHeader";
import PanicButton from "@/components/PanicButton";
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video,
  MoreVertical,
  AlertTriangle,
  Shield,
  Clock,
  CheckCheck,
  User,
  Users,
  Share
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatContact {
  id: string;
  name: string;
  type: "guardian" | "tourist" | "guide" | "emergency";
  avatar: string;
  status: "online" | "offline" | "away";
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isVerified?: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "location" | "emergency" | "file";
}

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState<string | null>("guardian-1");
  const [messageInput, setMessageInput] = useState("");
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock contacts - todo: remove mock functionality
  const contacts: ChatContact[] = [
    {
      id: "guardian-1",
      name: "Priya Sharma (Guardian)",
      type: "guardian",
      avatar: "PS",
      status: "online",
      lastMessage: "Stay safe! Let me know when you reach the hotel.",
      lastMessageTime: "2 min ago",
      unreadCount: 0,
      isVerified: true,
    },
    {
      id: "emergency-center",
      name: "Tourist Emergency Center",
      type: "emergency",
      avatar: "TEC",
      status: "online",
      lastMessage: "24/7 emergency support available",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      isVerified: true,
    },
    {
      id: "guide-1", 
      name: "Ravi Kumar (Local Guide)",
      type: "guide",
      avatar: "RK",
      status: "online",
      lastMessage: "The weather looks perfect for tomorrow's trek!",
      lastMessageTime: "15 min ago",
      unreadCount: 2,
      isVerified: true,
    },
    {
      id: "tourist-1",
      name: "Maria Rodriguez",
      type: "tourist",
      avatar: "MR",
      status: "away",
      lastMessage: "Thanks for the restaurant recommendation!",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
    }
  ];

  // Mock messages - todo: remove mock functionality
  const messages: ChatMessage[] = [
    {
      id: "1",
      senderId: "guardian-1",
      content: "Hi! How's your trip going? Have you reached Shillong safely?",
      timestamp: "10:30 AM",
      status: "read",
      type: "text",
    },
    {
      id: "2", 
      senderId: "me",
      content: "Yes, just arrived! The journey was smooth. Hotel looks great.",
      timestamp: "10:32 AM",
      status: "read",
      type: "text",
    },
    {
      id: "3",
      senderId: "guardian-1", 
      content: "That's wonderful! Remember to share your location when you go out exploring.",
      timestamp: "10:35 AM",
      status: "read",
      type: "text",
    },
    {
      id: "4",
      senderId: "me",
      content: "Will do! Planning to visit Nohkalikai Falls tomorrow.",
      timestamp: "10:36 AM", 
      status: "delivered",
      type: "text",
    },
    {
      id: "5",
      senderId: "guardian-1",
      content: "Stay safe! Let me know when you reach the hotel.",
      timestamp: "10:38 AM",
      status: "sent",
      type: "text",
    }
  ];

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case "guardian": return "bg-trust text-trust-foreground";
      case "emergency": return "bg-destructive text-destructive-foreground";
      case "guide": return "bg-success text-success-foreground";
      case "tourist": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success";
      case "away": return "bg-warning";
      case "offline": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    console.log("Sending message:", messageInput);
    toast({
      title: "Message Sent",
      description: "Your message has been delivered.",
      duration: 2000,
    });
    setMessageInput("");
  };

  const handleEmergencyEscalation = () => {
    console.log("Emergency escalation triggered");
    toast({
      title: "Emergency Alert Sent",
      description: "Authorities have been notified immediately.",
      duration: 4000,
    });
    setIsEmergencyDialogOpen(false);
  };

  const handleShareLocation = () => {
    console.log("Location shared");
    toast({
      title: "Location Shared",
      description: "Your current location has been shared with the contact.",
      duration: 3000,
    });
  };

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Header */}
      <section className="border-b bg-muted/30 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Real-time Chat</h1>
          <p className="text-muted-foreground">Stay connected with guardians, guides, and emergency services</p>
        </div>
      </section>

      {/* Main Chat Interface */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
          {/* Contacts Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-3 cursor-pointer hover-elevate ${
                        selectedContact === contact.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedContact(contact.id)}
                      data-testid={`contact-${contact.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="text-sm">{contact.avatar}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-sm truncate">{contact.name}</span>
                              {contact.isVerified && <Shield className="w-3 h-3 text-trust" />}
                            </div>
                            {contact.unreadCount > 0 && (
                              <Badge className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5">
                                {contact.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <Badge className={`${getContactTypeColor(contact.type)} text-xs`}>
                            {contact.type}
                          </Badge>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {contact.lastMessage}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {contact.lastMessageTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                {selectedContactData ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{selectedContactData.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedContactData.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{selectedContactData.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" data-testid="button-voice-call">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" data-testid="button-video-call">
                        <Video className="w-4 h-4" />
                      </Button>
                      {selectedContactData.type !== "emergency" && (
                        <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              data-testid="button-emergency-escalation"
                            >
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Emergency
                            </Button>
                          </DialogTrigger>
                          <DialogContent data-testid="modal-emergency-escalation">
                            <DialogHeader>
                              <DialogTitle className="flex items-center text-destructive">
                                <AlertTriangle className="w-5 h-5 mr-2" />
                                Escalate to Emergency Services?
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-sm">
                                This will immediately notify emergency authorities and provide them with your location and chat history.
                              </p>
                              <div className="flex space-x-3">
                                <Button
                                  onClick={handleEmergencyEscalation}
                                  className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  data-testid="button-confirm-escalation"
                                >
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  Escalate Now
                                </Button>
                                <Button
                                  onClick={() => setIsEmergencyDialogOpen(false)}
                                  variant="outline"
                                  className="flex-1"
                                  data-testid="button-cancel-escalation"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button size="sm" variant="ghost" data-testid="button-chat-options">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Select a contact to start chatting
                  </div>
                )}
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                {selectedContactData ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${
                          message.senderId === 'me' 
                            ? 'bg-trust text-trust-foreground' 
                            : 'bg-muted'
                        } rounded-lg p-3`}>
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                            {message.senderId === 'me' && (
                              <div className="flex items-center">
                                {message.status === 'read' && <CheckCheck className="w-3 h-3" />}
                                {message.status === 'delivered' && <CheckCheck className="w-3 h-3 opacity-60" />}
                                {message.status === 'sent' && <Clock className="w-3 h-3 opacity-60" />}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Select a contact to start messaging</p>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Message Input */}
              {selectedContactData && (
                <div className="border-t p-4">
                  <div className="flex items-center gap-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleShareLocation}
                      data-testid="button-share-location"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                      data-testid="input-message"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      data-testid="button-send-message"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      <PanicButton variant="floating" />
    </div>
  );
}