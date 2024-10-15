import { useState } from "react";
import { Paperclip, Send, FileCode, Video } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTheme from "@/hooks/useTheme";
import Navbar from "./Navbar";
import dayjs from "dayjs"; // Import dayjs for formatting dates

const darkColors = {
  background: '#212A31',
  secondaryBackground: '#2E3944',
  text: '#f0f1f0',
  messageSender: '#124E66',
  messageReceiver: '#2E3944',
};

// Sample contact data
const contacts = [
  { id: 1, name: "Contact 1", lastMessage: "Hey there!", avatarFallback: "C1" },
  { id: 2, name: "Contact 2", lastMessage: "Let's catch up.", avatarFallback: "C2" },
  { id: 3, name: "Contact 3", lastMessage: "Good morning!", avatarFallback: "C3" },
  { id: 4, name: "Contact 4", lastMessage: "Check this out.", avatarFallback: "C4" },
  { id: 5, name: "Contact 5", lastMessage: "What's up?", avatarFallback: "C5" },
];

// Sample message data
const chatMessages = {
  1: [
    { text: "Hello!", time: "2024-10-15T09:10:00" },
    { text: "How are you?", time: "2024-10-15T09:12:00" },
    { text: "Let's meet up.", time: "2024-10-15T09:15:00" },
  ],
  2: [
    { text: "Hey, long time!", time: "2024-10-15T10:05:00" },
    { text: "We should catch up.", time: "2024-10-15T10:10:00" },
  ],
  3: [
    { text: "Good morning!", time: "2024-10-15T07:00:00" },
  ],
  // Add more chats for other contacts...
};

export default function Elev8Chat() {
  const { isDarkMode } = useTheme();
  const [selectedContact, setSelectedContact] = useState(null); // Track selected contact
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Sending message:", message);
    setMessage("");
  };

  // Format messages by day
  const formatMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = dayjs(message.time).format("MMMM D, YYYY");
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    }, {});
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`w-full sm:w-80 border-r flex flex-col ${isDarkMode ? 'bg-[#2E3944] border-gray-600' : 'bg-gray-100 border-gray-200'}`}>
          <ScrollArea className="flex-1">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedContact(contact.id)}
              >
                <Avatar>
                  <AvatarFallback>{contact.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className={`font-semibold ${isDarkMode ? 'dark:text-white' : 'text-black'}`}>{contact.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className={`hidden sm:flex flex-1 flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          {/* Chat Header */}
          <div className={`p-4 flex justify-between items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {selectedContact ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{contacts.find(c => c.id === selectedContact)?.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <h2 className={`font-semibold ${isDarkMode ? 'dark:text-white' : 'text-black'}`}>
                    {contacts.find(c => c.id === selectedContact)?.name}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><FileCode className={`h-5 w-5 ${isDarkMode ? 'dark:text-white' : 'text-black'}`} /></Button>
                  <Button variant="ghost" size="icon"><Video className={`h-5 w-5 ${isDarkMode ? 'dark:text-white' : 'text-black'}`} /></Button>
                </div>
              </>
            ) : (
              <h2 className={`font-semibold ${isDarkMode ? 'dark:text-white' : 'text-black'}`}>Select a contact to chat</h2>
            )}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {selectedContact ? (
              Object.entries(formatMessagesByDate(chatMessages[selectedContact] || [])).map(([date, messages]) => (
                <div key={date}>
                  <div className="text-center my-2 text-gray-500">{date}</div>
                  {messages.map((message, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"} mb-4`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${i % 2 === 0 ? "bg-blue-500 text-white" : `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}`}>
                        {message.text}
                        <div className="text-xs mt-1 text-right opacity-60">
                          {dayjs(message.time).format('h:mm A')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className={`text-center ${isDarkMode ? 'dark:text-white' : 'text-black'}`}>No contact selected.</p>
            )}
          </ScrollArea>

          {/* Input Area */}
          {selectedContact && (
            <form
              onSubmit={sendMessage}
              className="p-4 border-t flex gap-2"
              style={{ backgroundColor: isDarkMode ? darkColors.secondaryBackground : 'white', borderTop: isDarkMode ? '1px solid #2E3944' : '1px solid #e2e8f0' }}
            >
              <Input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                style={{ backgroundColor: isDarkMode ? darkColors.secondaryBackground : 'white', color: isDarkMode ? darkColors.text : 'black' }}
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
