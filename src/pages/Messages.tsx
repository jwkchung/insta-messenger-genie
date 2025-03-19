
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '@/components/layout/Dashboard';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import MessageList from '@/components/messages/MessageList';
import MessageView from '@/components/messages/MessageView';
import { mockData, Conversation } from '@/services/mockData';
import { MessageSquare } from 'lucide-react';

const Messages = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      
      // If no conversation is selected, select the first one
      if (!conversationId && mockData.conversations.length > 0) {
        navigate(`/messages/${mockData.conversations[0].id}`);
      }
      
      // Find the selected conversation
      if (conversationId) {
        const conversation = mockData.conversations.find(c => c.id === conversationId);
        if (conversation) {
          setSelectedConversation(conversation);
        } else {
          // Conversation not found, redirect to first conversation
          if (mockData.conversations.length > 0) {
            navigate(`/messages/${mockData.conversations[0].id}`);
          }
        }
      }
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [conversationId, navigate]);
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <AnimatedTransition>
      <Dashboard>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Messages
                </h2>
              </div>
              <MessageList 
                conversations={mockData.conversations} 
                selectedId={selectedConversation?.id}
                onSelectConversation={handleSelectConversation}
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              {isLoading ? (
                <div className="glass-panel h-[calc(100vh-12rem)] flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-full bg-muted h-12 w-12 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-32 mb-3"></div>
                    <div className="h-3 bg-muted rounded w-24"></div>
                  </div>
                </div>
              ) : selectedConversation ? (
                <MessageView conversation={selectedConversation} />
              ) : (
                <div className="glass-panel h-[calc(100vh-12rem)] flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-muted-foreground">
                      Select a conversation from the list to view messages
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dashboard>
    </AnimatedTransition>
  );
};

export default Messages;
