import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/types/wardops';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInterfaceProps {
  initialMessages: ChatMessage[];
}

const quickPrompts = [
  "What equipment is missing in Room 101?",
  "Which rentals can we return right now?",
  "What are the highest priority tasks this shift?",
];

export function ChatInterface({ initialMessages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: "I'm processing your request. In a production environment, I would analyze real-time ward data and provide specific recommendations.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    handleSend(prompt);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold text-text-primary">Ask Vitalis</h2>
        <p className="text-sm text-text-secondary mt-1">AI Ops Assistant for Ward 101</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Intro Block */}
        {messages.length === 0 && (
          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-bg-primary" />
              </div>
              <div className="flex-1">
                <p className="text-text-primary mb-4">
                  I monitor your ward's equipment and room readiness. Ask me what matters right now.
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-text-tertiary font-medium">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="px-3 py-1.5 text-sm bg-bg-tertiary hover:bg-accent-cyan/10 text-text-secondary hover:text-accent-cyan border border-border hover:border-accent-cyan rounded-full transition-smooth"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-accent-cyan/10 border border-accent-cyan/30'
                  : 'glass-panel'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-accent-cyan/20">
                  <Sparkles className="h-4 w-4 text-accent-cyan" />
                  <span className="text-sm font-medium text-text-primary">Vitalis</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent-cyan/20 text-accent-cyan rounded">AI</span>
                </div>
              )}
              {message.role === 'user' && (
                <div className="text-xs text-text-tertiary mb-1">You</div>
              )}
              <div className="text-text-primary whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-6">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe what you need help with..."
            className="flex-1 bg-bg-tertiary border-border text-text-primary placeholder:text-text-tertiary"
          />
          <Button
            onClick={() => handleSend()}
            className="bg-accent-cyan hover:bg-accent-cyan/90 text-bg-primary"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
