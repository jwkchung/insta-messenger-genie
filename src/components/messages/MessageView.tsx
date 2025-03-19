
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpCircle, Sparkles } from 'lucide-react';
import { formatRelative } from 'date-fns';
import { cn } from '@/lib/utils';
import { Conversation, Message, getAiSuggestionsForMessage } from '@/services/mockData';
import MessageSuggestion from './MessageSuggestion';

interface MessageViewProps {
  conversation: Conversation;
}

const MessageView: React.FC<MessageViewProps> = ({ conversation }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Update messages when conversation changes
    setMessages(conversation.messages);
    // Reset state
    setNewMessage('');
    setShowSuggestions(false);
    // Scroll to bottom
    scrollToBottom();
  }, [conversation]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      read: false,
      isOwn: true,
      sender: {
        id: 'self',
        name: 'Me',
        username: 'me',
        avatar: '/placeholder.svg',
        isVerified: false
      }
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setShowSuggestions(false);
  };
  
  const handleSuggestionSelect = (text: string) => {
    setNewMessage(text);
    setShowSuggestions(false);
  };
  
  const lastOtherMessage = messages
    .filter(m => !m.isOwn)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  
  const handleGenerateSuggestions = () => {
    if (!lastOtherMessage) return;
    setShowSuggestions(true);
  };
  
  const getMessageDate = (message: Message, index: number) => {
    if (index === 0) return formatRelative(message.timestamp, new Date());
    
    const prevMessage = messages[index - 1];
    const timeDiff = message.timestamp.getTime() - prevMessage.timestamp.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    if (hoursDiff > 2) return formatRelative(message.timestamp, new Date());
    return null;
  };
  
  return (
    <div className="glass-panel flex flex-col h-[calc(100vh-12rem)]">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <img
            src={conversation.participant.avatar}
            alt={conversation.participant.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-medium flex items-center">
              {conversation.participant.name}
              {conversation.participant.isVerified && (
                <span className="ml-1 text-primary inline-block">✓</span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              @{conversation.participant.username}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const dateLabel = getMessageDate(message, index);
          
          return (
            <React.Fragment key={message.id}>
              {dateLabel && (
                <div className="flex justify-center my-4">
                  <div className="text-chip bg-secondary text-secondary-foreground text-xs">
                    {dateLabel}
                  </div>
                </div>
              )}
              
              <div className={cn(
                "flex",
                message.isOwn ? "justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2 animate-scale-in",
                  message.isOwn 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "glass-panel-sm rounded-tl-none"
                )}>
                  <div className="break-words">
                    {message.content}
                  </div>
                  <div className={cn(
                    "text-xs mt-1",
                    message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      {showSuggestions && lastOtherMessage && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center mb-2">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <h4 className="text-sm font-medium">AI Response Suggestions</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {getAiSuggestionsForMessage(lastOtherMessage.content).map(suggestion => (
              <MessageSuggestion
                key={suggestion.id}
                suggestion={suggestion}
                onSelect={handleSuggestionSelect}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4 border-t flex items-end gap-2">
        <button
          onClick={handleGenerateSuggestions}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Generate AI suggestions"
        >
          <Sparkles className="w-5 h-5 text-primary" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none min-h-[2.5rem] max-h-32"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={Math.min(3, Math.max(1, newMessage.split('\n').length))}
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className={cn(
            "p-2 rounded-full transition-colors",
            newMessage.trim() 
              ? "text-primary hover:bg-secondary" 
              : "text-muted-foreground"
          )}
          aria-label="Send message"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MessageView;
