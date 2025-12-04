import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Stethoscope, Plus, FileText, Flame, Users, BookOpen, Search, DollarSign, Phone, FileCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  category: "today" | "yesterday" | "last7days";
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [activeConversation, setActiveConversation] = useState<string>("1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Different message sets for each conversation
  const conversationMessages: Record<string, Message[]> = {
    "1": [
      {
        id: "1-1",
        text: "Hi ! 👋 I'm your Curana Hub AI Assistant. I can help you find information, navigate the intranet, and answer questions about policies, benefits, and more. What can I help you with today?",
        sender: "bot",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "1-2",
        text: "Where can I find information about dental benefits?",
        sender: "user",
        timestamp: new Date(Date.now() - 3500000),
      },
      {
        id: "1-3",
        text: "Great question! Curana Health offers comprehensive dental coverage through Delta Dental. Here's what you need to know:\n\n• Preventive care (cleanings, exams) - 100% covered\n• Basic procedures (fillings) - 80% covered\n• Major procedures (crowns, bridges) - 50% covered\n\nYou can find your member ID on your benefits card or log into the Delta Dental portal through Workday.",
        sender: "bot",
        timestamp: new Date(Date.now() - 3400000),
      },
    ],
    "2": [
      {
        id: "2-1",
        text: "Hi SK! 👋 I'm your Curana Hub AI Assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: "2-2",
        text: "How do I submit travel expenses?",
        sender: "user",
        timestamp: new Date(Date.now() - 7100000),
      },
      {
        id: "2-3",
        text: "To submit travel expenses, follow these steps:\n\n1. Log into Workday\n2. Go to the Expenses section\n3. Click 'Create Expense Report'\n4. Add your travel expenses with receipts\n5. Submit for manager approval\n\nMake sure to submit within 30 days of travel completion!",
        sender: "bot",
        timestamp: new Date(Date.now() - 7000000),
      },
    ],
    "3": [
      {
        id: "3-1",
        text: "Hello! How can I assist you today?",
        sender: "bot",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "3-2",
        text: "Who should I contact for HR questions?",
        sender: "user",
        timestamp: new Date(Date.now() - 86300000),
      },
      {
        id: "3-3",
        text: "For HR inquiries, you can reach out to:\n\n📧 Email: hr@curanahealth.com\n📞 Phone: (555) 123-4567\n🕐 Hours: Mon-Fri, 9 AM - 5 PM EST\n\nYou can also visit the HR portal in Workday for self-service options.",
        sender: "bot",
        timestamp: new Date(Date.now() - 86200000),
      },
    ],
    "4": [
      {
        id: "4-1",
        text: "Hi there! What can I help you with?",
        sender: "bot",
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: "4-2",
        text: "What's the policy for requesting PTO?",
        sender: "user",
        timestamp: new Date(Date.now() - 172700000),
      },
      {
        id: "4-3",
        text: "PTO requests should be submitted through Workday at least 2 weeks in advance. Here's the process:\n\n1. Go to Workday > Time Off\n2. Select 'Request Time Off'\n3. Choose dates and PTO type\n4. Submit for manager approval\n\nEmergency PTO can be requested with less notice by contacting your manager directly.",
        sender: "bot",
        timestamp: new Date(Date.now() - 172600000),
      },
    ],
    "5": [
      {
        id: "5-1",
        text: "Welcome! How can I assist you?",
        sender: "bot",
        timestamp: new Date(Date.now() - 259200000),
      },
      {
        id: "5-2",
        text: "I'm having trouble logging into Epic EHR",
        sender: "user",
        timestamp: new Date(Date.now() - 259100000),
      },
      {
        id: "5-3",
        text: "For Epic EHR login issues, try these steps:\n\n1. Clear your browser cache\n2. Ensure you're using a supported browser (Chrome, Edge)\n3. Check your credentials\n4. Try resetting your password\n\nIf issues persist, contact IT Support:\n📞 (555) 123-4500\n📧 itsupport@curanahealth.com",
        sender: "bot",
        timestamp: new Date(Date.now() - 259000000),
      },
    ],
  };

  const [messages, setMessages] = useState<Message[]>(conversationMessages["1"]);

  const conversations: Conversation[] = [
    {
      id: "1",
      title: "Dental benefits inquiry",
      preview: "Where can I find information about...",
      timestamp: "2:34 PM",
      category: "today",
    },
    {
      id: "2",
      title: "Expense submission process",
      preview: "How do I submit travel expenses...",
      timestamp: "10:15 AM",
      category: "today",
    },
    {
      id: "3",
      title: "HR contact information",
      preview: "Who should I contact for HR...",
      timestamp: "4:22 PM",
      category: "yesterday",
    },
    {
      id: "4",
      title: "PTO policy details",
      preview: "What's the policy for requesting...",
      timestamp: "11:30 AM",
      category: "yesterday",
    },
    {
      id: "5",
      title: "Epic EHR access",
      preview: "I'm having trouble logging into...",
      timestamp: "3 days ago",
      category: "last7days",
    },
  ];

  const quickActions = [
    { icon: Search, label: "Find benefits", gradient: "from-blue-500 to-cyan-500" },
    { icon: DollarSign, label: "Submit expenses", gradient: "from-green-500 to-emerald-500" },
    { icon: Phone, label: "HR contact", gradient: "from-purple-500 to-pink-500" },
    { icon: FileCheck, label: "Policies", gradient: "from-orange-500 to-red-500" },
    { icon: Heart, label: "Healthcare info", gradient: "from-rose-500 to-pink-500" },
  ];

  const quickQuestions = [
    { icon: FileText, label: "Policies", color: "text-purple-500" },
    { icon: Flame, label: "Benefits", color: "text-orange-500" },
    { icon: Users, label: "Directory", color: "text-purple-600" },
    { icon: BookOpen, label: "Training", color: "text-pink-500" },
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

  const handleConversationChange = (convId: string) => {
    setActiveConversation(convId);
    setMessages(conversationMessages[convId] || []);
    setInputValue("");
  };

  const handleNewChat = () => {
    const newConvId = Date.now().toString();
    setActiveConversation(newConvId);
    setMessages([
      {
        id: `${newConvId}-1`,
        text: "Hi SK! 👋 I'm your Curana Hub AI Assistant. I can help you find information, navigate the intranet, and answer questions about policies, benefits, and more. What can I help you with today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setInputValue("");
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "today":
        return "TODAY";
      case "yesterday":
        return "YESTERDAY";
      case "last7days":
        return "LAST 7 DAYS";
      default:
        return "";
    }
  };

  const groupedConversations = conversations.reduce((acc, conv) => {
    if (!acc[conv.category]) {
      acc[conv.category] = [];
    }
    acc[conv.category].push(conv);
    return acc;
  }, {} as Record<string, Conversation[]>);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-3rem)] bg-background overflow-hidden relative">
        {/* Mobile Overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Left Sidebar - Modern Design */}
        <div className={cn(
          "w-72 md:w-64 border-r flex flex-col transition-transform duration-300 z-50",
          "fixed lg:relative inset-y-0 left-0 h-full",
          "bg-card lg:bg-gradient-to-b lg:from-card lg:via-card lg:to-muted/20",
          "shadow-2xl lg:shadow-none",
          showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          {/* Sidebar Header */}
          <div className="p-4 md:p-5">
            <Button
              onClick={handleNewChat}
              className="w-full text-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] h-10 md:h-11 text-sm"
              style={{ background: "var(--header-gradient)" }}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="font-semibold">New Chat</span>
            </Button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto px-2 md:px-3 scrollbar-thin">
            {Object.entries(groupedConversations).map(([category, convs]) => (
              <div key={category} className="mb-6">
                <div className="px-2 md:px-3 py-2 text-[10px] font-bold text-muted-foreground/70 tracking-wider">
                  {getCategoryLabel(category)}
                </div>
                <div className="space-y-1">
                  {convs.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        handleConversationChange(conv.id);
                        setShowSidebar(false);
                      }}
                      className={cn(
                        "w-full px-2 md:px-3 py-2 md:py-2.5 text-left rounded-r-xl transition-all duration-200 group border-l-4",
                        activeConversation === conv.id
                          ? "bg-accent/10 border-accent shadow-sm"
                          : "border-transparent hover:bg-muted/60 hover:border-accent/30"
                      )}
                    >
                      <h3 className="font-semibold text-xs md:text-sm mb-1 truncate">
                        {conv.title}
                      </h3>
                      <p className="text-[10px] md:text-[11px] text-muted-foreground truncate">{conv.preview}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="p-3 md:p-4 border-t bg-card/50">
            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              {quickQuestions.map((item, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-2 md:py-2.5 rounded-xl bg-muted/40 hover:bg-muted transition-all duration-200 hover:shadow-sm hover:scale-[1.02]"
                >
                  <item.icon className={cn("h-3.5 md:h-4 w-3.5 md:w-4", item.color)} />
                  <span className="text-[9px] md:text-[10px] font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
          {/* Header */}
          <div
            className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 text-white shadow-md flex-shrink-0"
            style={{ background: "var(--header-gradient)" }}
          >
            <div className="flex items-center gap-2 md:gap-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                className="h-8 w-8 md:h-9 md:w-9 text-white hover:bg-white/20 rounded-xl lg:hidden"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-8 w-8 md:h-9 md:w-9 text-white hover:bg-white/20 rounded-xl hidden lg:flex"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h1 className="text-sm md:text-lg font-semibold">Curana AI Assistant</h1>
                <p className="text-[10px] md:text-xs opacity-90 hidden sm:block">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Quick Actions - Compact */}
          <div className="px-3 md:px-6 py-2 md:py-3 border-b bg-gradient-to-br from-muted/20 to-background/50 flex-shrink-0 overflow-x-auto scrollbar-thin">
            <div className="flex gap-1.5 md:gap-2 min-w-max md:min-w-0 md:flex-wrap">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="group flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-card hover:shadow-md transition-all duration-200 border border-border/50 hover:border-accent/30 hover:scale-[1.02] whitespace-nowrap"
                >
                  <div className={cn("p-0.5 md:p-1 rounded-md bg-gradient-to-br text-white", action.gradient)}>
                    <action.icon className="h-2.5 md:h-3 w-2.5 md:w-3" />
                  </div>
                  <span className="text-[10px] md:text-xs font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-br from-muted/5 to-background">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === "bot" && (
                  <div
                    className="h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                    style={{ background: "var(--header-gradient)" }}
                  >
                    <Stethoscope className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] md:max-w-[70%] rounded-2xl p-2.5 md:p-3.5 shadow-sm",
                    message.sender === "user"
                      ? "text-white rounded-br-md"
                      : "bg-card border rounded-bl-md"
                  )}
                  style={
                    message.sender === "user"
                      ? { background: "var(--header-gradient)" }
                      : {}
                  }
                >
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <span
                    className={cn(
                      "text-[9px] md:text-[10px] mt-1 md:mt-1.5 block",
                      message.sender === "user" ? "opacity-80" : "opacity-60"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {message.sender === "user" && (
                  <div
                    className="h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm md:text-base shadow-sm"
                    style={{ background: "var(--header-gradient)" }}
                  >
                    SK
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 md:px-6 py-3 md:py-4 border-t bg-card shadow-md flex-shrink-0">
            <div className="flex gap-2 max-w-5xl mx-auto">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 h-10 md:h-12 text-xs md:text-sm rounded-xl px-3 md:px-5 border-2 focus:border-accent/50"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-10 w-10 md:h-12 md:w-12 text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
                style={{ background: "var(--header-gradient)" }}
              >
                <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
