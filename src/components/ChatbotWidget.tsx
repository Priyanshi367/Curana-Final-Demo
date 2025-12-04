import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Maximize2, Send, Stethoscope, Search, DollarSign, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ChatState = "collapsed" | "mini";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotWidget: React.FC = () => {
  const navigate = useNavigate();
  const [chatState, setChatState] = useState<ChatState>("collapsed");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 I'm your Curana Hub AI Assistant. I can help you find information, navigate the intranet, and answer questions about policies, benefits, and more. What can I help you with today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [unreadCount, setUnreadCount] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: Search, label: "Benefits", gradient: "from-blue-500 to-cyan-500" },
    { icon: DollarSign, label: "Expenses", gradient: "from-green-500 to-emerald-500" },
    { icon: Phone, label: "HR", gradient: "from-purple-500 to-pink-500" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. I'm processing your request...",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openChat = () => {
    setChatState("mini");
    setUnreadCount(0);
  };

  const closeChat = () => {
    setChatState("collapsed");
  };

  const handleExpand = () => {
    navigate("/chat");
  };

  // Collapsed Bubble
  if (chatState === "collapsed") {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <button
          onClick={openChat}
          className="relative h-14 w-14 md:h-16 md:w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          style={{ background: "var(--header-gradient)" }}
          aria-label="Open chat"
        >
          <Stethoscope className="h-7 w-7 md:h-8 md:w-8 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 bg-red-500 text-white text-[10px] md:text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    );
  }

  // Mini Chatbox
  if (chatState === "mini") {
    return (
      <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-5rem)] sm:h-[550px] max-h-[600px] flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-300 rounded-2xl overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between p-3 md:p-4 border-b text-white"
          style={{ background: "var(--header-gradient)" }}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Stethoscope className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Curana AI Assistant</h3>
              <p className="text-[10px] md:text-xs opacity-90">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExpand}
              className="h-7 w-7 md:h-8 md:w-8 text-white hover:bg-white/20 rounded-lg"
            >
              <Maximize2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeChat}
              className="h-7 w-7 md:h-8 md:w-8 text-white hover:bg-white/20 rounded-lg"
            >
              <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-2 md:p-3 border-b bg-gradient-to-br from-muted/30 to-muted/10">
          <div className="flex gap-1.5 md:gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-xl bg-card hover:shadow-md transition-all duration-200 border hover:scale-[1.02]"
              >
                <div className={cn("p-0.5 md:p-1 rounded-lg bg-gradient-to-br text-white", action.gradient)}>
                  <action.icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
                </div>
                <span className="text-[10px] md:text-xs font-medium hidden sm:inline">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gradient-to-br from-muted/10 to-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] md:max-w-[80%] rounded-2xl p-2.5 md:p-3 shadow-md",
                  message.sender === "user"
                    ? "text-white rounded-br-md"
                    : "bg-white border rounded-bl-md"
                )}
                style={
                  message.sender === "user"
                    ? { background: "var(--header-gradient)" }
                    : {}
                }
              >
                <p className="text-xs md:text-sm leading-relaxed">{message.text}</p>
                <span className="text-[10px] md:text-xs opacity-70 mt-1 md:mt-1.5 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 md:p-4 border-t bg-card">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 h-9 md:h-10 text-xs md:text-sm rounded-xl border-2 focus:border-accent/50"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="h-9 w-9 md:h-10 md:w-10 text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
              style={{ background: "var(--header-gradient)" }}
            >
              <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return null;
};

export default ChatbotWidget;
