import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from "socket.io-client";
import { toast } from "sonner";
import { Send, ChevronLeft, Search, FileCode, Video } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import useTheme from "@/hooks/useTheme";
import { jwtDecode } from 'jwt-decode';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const ChatPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactList, setContactList] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState({});
  const [socket, setSocket] = useState(null);

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Token decoding effect
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.email);
        setFullName(decodedToken.fullName);
      } catch (error) {
        console.error('Error decoding token:', error);
        toast.error("Error with authentication");
      }
    }
  }, [token]);

  // Fetch contacts effect
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/chat/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContactList(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to load contacts");
      }
    };
    if (token) fetchContacts();
  }, [token]);

  // Fetch messages effect
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedContactId) {
        try {
          const response = await axios.post(
            `${SERVER_URL}/chat/specific`,
            { chatId: selectedContactId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setChatMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
          toast.error("Failed to load messages");
        }
      }
    };
    if (selectedContactId) fetchMessages();
  }, [selectedContactId, token]);

  // Socket initialization effect
  useEffect(() => {
    const s = io(SOCKET_URL, {
      auth: { token: `Bearer ${token}` },
    });

    setSocket(s);

    s.on("connect_error", () => {
      toast.error("Connection Error");
    });

    return () => {
      s.disconnect();
    };
  }, [token]);

  // Socket chat room effect
  useEffect(() => {
    if (!socket || !selectedContactId) return;
    
    socket.emit("join_chat", { chatId: selectedContactId });
    
    return () => {
      socket.emit("leave_chat", { chatId: selectedContactId });
    };
  }, [socket, selectedContactId]);

  // Socket message listener effect
  useEffect(() => {
    if (!socket) return;

    socket.on("chat_message", (data) => {
      const { message } = data;
      if (message.sender.email !== email) {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("chat_message");
    };
  }, [socket, email]);

  const generateRandomId = async () => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const navigateToDoc = async () => {
    const randomId = await generateRandomId();
    navigate(`/documents/${randomId}`);
  };

  const handleVideoCall = () => {
    if (selectedContactId) {
      const roomCode = `${selectedContactId}-${Date.now()}`;
      navigate(`/room/${roomCode}`);
    } else {
      toast.error("Please select a contact first");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedContactId && socket) {
      const messageContent = {
        chatId: selectedContactId,
        sender: {
          name: fullName,
          email,
        },
        message: message.trim(),
        timestamp: new Date(),
      };

      try {
        socket.emit("send_message", messageContent);
        setChatMessages((prevMessages) => [...prevMessages, messageContent]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formatMessagesByDate = (messages) => {
    if (!Array.isArray(messages)) {
      return {};
    }

    return messages.reduce((acc, message) => {
      const date = dayjs(message.timestamp).format("MMMM D, YYYY");
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    }, {});
  };

  const filteredContacts = contactList.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`max-h-screen flex flex-col ${isDarkMode ? 'bg-gray-950 text-light2' : 'bg-light2 text-dark1'}`}>
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Card className={`flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-orange-500 border-dashed border-[2px] ${isDarkMode ? "bg-slate-950" : ""} ${isSidebarOpen ? "w-full sm:w-80" : "w-0 sm:w-0"}`}>
          <CardHeader className="p-4">
            <CardTitle className={`text-2xl font-bold ${isDarkMode ? "text-white" : ""}`}>
              Contacts
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button size="icon" className={`${isDarkMode ? "bg-orange-600" : "bg-orange-600"}`}>
                <Search className={`h-4 w-4 ${isDarkMode ? "text-white" : ""}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.chatId}
                    className={`flex items-center gap-3 p-3 w-full rounded-2xl ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 cursor-pointer transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-light'} ${selectedContactId === contact.chatId ? 'bg-accent' : ''}`}
                    onClick={() => {
                      setSelectedContactId(contact.chatId);
                      if (window.innerWidth < 640) {
                        setIsSidebarOpen(false);
                      }
                    }}
                  >
                    <Avatar>
                      <AvatarFallback>{contact.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{contact.name}</h3>
                      <p className={`text-sm ${isDarkMode ? "text-orange-500" : ""}`}>{contact.lastMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={`text-center ${isDarkMode ? 'text-light' : 'text-gray-500'}`}>No contacts found.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className={`flex-1 flex flex-col h-[calc(100vh-64px)] ${isDarkMode ? 'bg-slate-950' : ''} border-orange-500 border-dashed border-[2px]`}>
          {/* Chat Header */}
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-orange-200">
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <ChevronLeft className={`h-5 w-5 ${isDarkMode ? "text-white" : ""}`} />
              </Button>
              <Avatar className="hidden sm:block">
                <AvatarFallback>
                  {contactList.find((c) => c.chatId === selectedContactId)?.avatarFallback}
                </AvatarFallback>
              </Avatar>
              <CardTitle className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'} text-sm sm:text-base truncate`}>
                {selectedContactId ? contactList.find((c) => c.chatId === selectedContactId)?.name : 'Select a contact'}
              </CardTitle>
            </div>
            {selectedContactId && (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Share code" 
                  className={`${isDarkMode ? "hover:bg-slate-900" : ""}`} 
                  onClick={navigateToDoc}
                >
                  <FileCode className={`h-5 w-5 ${isDarkMode ? "text-white hover:bg-slate-950" : ""}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Start video call" 
                  className={`${isDarkMode ? "hover:bg-slate-900" : ""}`}
                  onClick={handleVideoCall}
                >
                  <Video className={`h-5 w-5 ${isDarkMode ? "text-white" : ""}`} />
                </Button>
              </div>
            )}
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full px-4 py-2">
              {selectedContactId ? (
                Object.entries(formatMessagesByDate(chatMessages)).map(
                  ([date, messages]) => (
                    <div key={date} className="space-y-4">
                      <div className="sticky top-0 text-center py-1 bg-opacity-70 backdrop-blur-sm z-10">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                          {date}
                        </span>
                      </div>
                      {messages.map((message) => (
                        <div
                          key={message._id || `${message.timestamp}-${message.sender.email}`}
                          className={`flex ${message.sender.email === email ? "justify-end" : "justify-start"} items-end space-x-2 mb-2`}
                        >
                          {message.sender.email !== email && (
                            <Avatar className="w-6 h-6 hidden sm:block">
                              <AvatarFallback className="text-xs">
                                {message.sender.name[0]}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[85%] sm:max-w-[70%] p-2 sm:p-3 rounded-lg ${
                              message.sender.email === email
                                ? "bg-orange-500 text-white font-bold rounded-br-none"
                                : `${isDarkMode ? 'bg-gray-600 text-white font-bold' : 'bg-gray-200 text-dark'} rounded-bl-none`
                            } transition-all duration-200 ease-in-out hover:shadow-md`}
                          >
                            <p className="break-words text-sm sm:text-base">{message.message}</p>
                            <div className="text-xs mt-1 text-right opacity-60">
                              {dayjs(message.timestamp).format('h:mm A')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )
              ) : (
                <p className={`text-center ${isDarkMode ? 'text-light' : 'text-gray-500'} mt-4`}>
                  Select a contact to start chatting
                </p>
              )}
            </ScrollArea>
          </CardContent>

          {/* Input Area */}
          {selectedContactId && (
            <div className={`p-2 sm:p-4 border-t border-orange-200 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 text-sm sm:text-base"
                  aria-label="Message input"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="bg-orange-500 hover:bg-orange-600 transition-colors duration-200" 
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </form>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;