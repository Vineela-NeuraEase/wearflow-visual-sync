
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type MessageType = {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

type QuickReplyType = {
  id: number;
  text: string;
};

const ChatAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      text: "Hi Alex, how are you feeling today?",
      sender: "assistant",
      timestamp: new Date(),
    }
  ]);
  
  const [userInput, setUserInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  
  const quickReplies: QuickReplyType[] = [
    { id: 1, text: "I'm feeling better" },
    { id: 2, text: "Need a break" },
    { id: 3, text: "Feeling overwhelmed" },
  ];
  
  const handleSendMessage = () => {
    if (userInput.trim() === "") return;
    
    // Add user message
    const userMessage: MessageType = {
      id: messages.length + 1,
      text: userInput,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setUserInput("");
    
    // Simulate assistant response
    setTimeout(() => {
      let assistantResponse: MessageType;
      
      if (userInput.toLowerCase().includes("overwhelm") || 
          userInput.toLowerCase().includes("stress") || 
          userInput.toLowerCase().includes("anxious")) {
        assistantResponse = {
          id: messages.length + 2,
          text: "I'm sorry to hear that. Would you like to try a calming exercise?",
          sender: "assistant",
          timestamp: new Date(),
        };
        setShowQuickReplies(true);
      } else {
        assistantResponse = {
          id: messages.length + 2,
          text: "Thank you for sharing. How else can I assist you today?",
          sender: "assistant",
          timestamp: new Date(),
        };
      }
      
      setMessages(prevMessages => [...prevMessages, assistantResponse]);
    }, 1000);
  };
  
  const handleQuickReply = (reply: QuickReplyType) => {
    const userMessage: MessageType = {
      id: messages.length + 1,
      text: reply.text,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setShowQuickReplies(false);
    
    if (reply.id === 1) { // "I'm feeling better"
      setTimeout(() => {
        const assistantResponse: MessageType = {
          id: messages.length + 2,
          text: "That's great to hear! Remember to take breaks when needed.",
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, assistantResponse]);
      }, 1000);
    } else if (reply.id === 2) { // "Need a break"
      setTimeout(() => {
        const assistantResponse: MessageType = {
          id: messages.length + 2,
          text: "Taking breaks is important. Would you like to try a quick breathing exercise?",
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, assistantResponse]);
        
        // Show breathing exercise button
        setTimeout(() => {
          const exerciseMessage: MessageType = {
            id: messages.length + 3,
            text: "Breathing Exercise",
            sender: "assistant",
            timestamp: new Date(),
          };
          setMessages(prevMessages => [...prevMessages, exerciseMessage]);
        }, 1000);
      }, 1000);
    } else if (reply.id === 3) { // "Feeling overwhelmed"
      setTimeout(() => {
        const assistantResponse: MessageType = {
          id: messages.length + 2,
          text: "I'm sorry to hear that. Would you like to try a calming exercise?",
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, assistantResponse]);
        
        // Show exercise buttons
        setTimeout(() => {
          const breathingMessage: MessageType = {
            id: messages.length + 3,
            text: "Breathing Exercise",
            sender: "assistant",
            timestamp: new Date(),
          };
          const visualMessage: MessageType = {
            id: messages.length + 4,
            text: "Visual Stimming",
            sender: "assistant",
            timestamp: new Date(),
          };
          setMessages(prevMessages => [...prevMessages, breathingMessage, visualMessage]);
        }, 1000);
      }, 1000);
    }
  };
  
  const handleBreathingExercise = () => {
    navigate('/breathing');
  };
  
  const handleVisualStimming = () => {
    navigate('/visual');
  };
  
  // Group messages by date
  const formattedTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Chat Assistant</h1>
      </div>
      
      <div className="calm-container overflow-hidden flex flex-col flex-1">
        <h2 className="text-xl font-semibold p-4 border-b border-blue-100">
          Calm Space
        </h2>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center text-sm text-gray-500">
            Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'assistant' && message.text === "Breathing Exercise" ? (
                <button 
                  onClick={handleBreathingExercise}
                  className="bg-white text-primary rounded-xl p-3 max-w-[80%] shadow-sm"
                >
                  {message.text}
                </button>
              ) : message.sender === 'assistant' && message.text === "Visual Stimming" ? (
                <button 
                  onClick={handleVisualStimming}
                  className="bg-white text-primary rounded-xl p-3 max-w-[80%] shadow-sm"
                >
                  {message.text}
                </button>
              ) : (
                <div 
                  className={`p-3 rounded-xl max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-calm-blue text-foreground ml-auto' 
                      : 'bg-calm-purple/50 text-foreground'
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2 px-4 py-2">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                onClick={() => handleQuickReply(reply)}
                className="bg-calm-blue rounded-full px-4 py-2 text-sm"
              >
                {reply.text}
              </button>
            ))}
          </div>
        )}
        
        <div className="p-2 border-t border-blue-100 bg-white rounded-b-3xl">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-transparent outline-none"
            />
            <button 
              onClick={handleSendMessage}
              className="ml-2 text-primary"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
