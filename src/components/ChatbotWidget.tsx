import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Send, Stethoscope, Search, DollarSign, Phone, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotWidget: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 I'm Cura, your AI assistant. How can I help you today?",
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
    setIsOpen(true);
    setUnreadCount(0);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleExpand = () => {
    navigate('/chat');
    setIsOpen(false);
  };

  // Chat Launcher Button
  return (
    <>
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl w-[calc(100%-2rem)] h-[80vh] max-h-[800px] p-0 overflow-hidden flex flex-col [&>button]:hidden" style={{ padding: 0 }}>
          <div 
            className="flex items-center justify-between p-4 border-b text-white"
            style={{ background: "var(--header-gradient)" }}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base">Cura</h3>
                <p className="text-xs opacity-90">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleExpand}
                className="h-8 w-8 text-white hover:bg-white/20 rounded-lg"
                title="Expand to full page"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeChat}
                className="h-8 w-8 text-white hover:bg-white/20 rounded-lg"
                title="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-2 border-b bg-gradient-to-br from-muted/30 to-muted/10">
              <div className="flex gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-card hover:shadow-md transition-all duration-200 border hover:scale-[1.02] text-sm"
                  >
                    <div className={cn("p-1 rounded-lg bg-gradient-to-br text-white", action.gradient)}>
                      <action.icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-muted/10 to-background">
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
                      "max-w-[85%] rounded-2xl p-3 shadow-md",
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
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t bg-card">
              <div className="flex items-end gap-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 min-h-12 max-h-32 resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="h-12 w-12 p-0 flex-shrink-0"
                  style={{ background: "var(--header-gradient)" }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatbotWidget;
