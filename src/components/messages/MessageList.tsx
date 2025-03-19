
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Circle } from 'lucide-react';
import { Conversation } from '@/services/mockData';
import { cn } from '@/lib/utils';

interface MessageListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelectConversation?: (conversation: Conversation) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  conversations, 
  selectedId, 
  onSelectConversation 
}) => {
  const [displayConversations, setDisplayConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setDisplayConversations(conversations);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [conversations]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="glass-panel-sm p-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-muted h-10 w-10"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {displayConversations.map((conversation) => {
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        const isSelected = conversation.id === selectedId;
        
        return (
          <Link
            key={conversation.id}
            to={`/messages/${conversation.id}`}
            className={cn(
              "block transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]",
              isSelected && "translate-y-[-2px]"
            )}
            onClick={() => onSelectConversation?.(conversation)}
          >
            <div className={cn(
              "glass-panel-sm p-4 transition-all duration-200",
              isSelected ? "ring-2 ring-primary/50 shadow-lg" : "hover:shadow-md"
            )}>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={conversation.participant.avatar} 
                    alt={conversation.participant.name}
                    className="rounded-full h-10 w-10 object-cover lazy-image"
                    loading="lazy"
                  />
                  {conversation.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">
                      {conversation.participant.name}
                      {conversation.participant.isVerified && (
                        <span className="ml-1 text-primary inline-block">✓</span>
                      )}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {formatDistanceToNow(conversation.lastMessageAt, { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    {lastMessage.isOwn ? (
                      lastMessage.read ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary mr-1 flex-shrink-0" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-muted-foreground mr-1 flex-shrink-0" />
                      )
                    ) : null}
                    <p className={cn(
                      "text-sm truncate",
                      lastMessage.isOwn ? "text-muted-foreground" : "text-foreground",
                      !lastMessage.read && !lastMessage.isOwn && "font-medium"
                    )}>
                      {lastMessage.isOwn ? 'You: ' : ''}{lastMessage.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MessageList;
