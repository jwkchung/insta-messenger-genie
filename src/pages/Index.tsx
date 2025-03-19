
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import Dashboard from '@/components/layout/Dashboard';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import MessageList from '@/components/messages/MessageList';
import AnalyticsCard from '@/components/analytics/AnalyticsCard';
import { mockData } from '@/services/mockData';

const recentMessagesData = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 8 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 19 },
  { name: 'Fri', value: 21 },
  { name: 'Sat', value: 14 },
  { name: 'Sun', value: 17 },
];

const responseRateData = [
  { name: 'Mon', value: 87 },
  { name: 'Tue', value: 85 },
  { name: 'Wed', value: 90 },
  { name: 'Thu', value: 92 },
  { name: 'Fri', value: 88 },
  { name: 'Sat', value: 84 },
  { name: 'Sun', value: 89 },
];

const Index = () => {
  // Limited set of conversations for the dashboard
  const recentConversations = mockData.conversations.slice(0, 3);
  const totalUnread = mockData.conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);
  
  return (
    <AnimatedTransition>
      <Dashboard>
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-3">
              Welcome to InstaMessenger
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Manage your Instagram messages effortlessly with AI-powered suggestions
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnalyticsCard
              title="Total Messages"
              value={mockData.analytics.totalMessages}
              change={mockData.analytics.messageGrowth}
              description="Messages in the last 7 days"
              data={recentMessagesData}
            />
            
            <AnalyticsCard
              title="Response Rate"
              value={`${(mockData.analytics.responseRate * 100).toFixed(1)}%`}
              change={0.05}
              description="Average response rate"
              data={responseRateData}
            />
            
            <AnalyticsCard
              title="AI Suggestions"
              value="37 used"
              change={0.15}
              description="AI suggestions helped you respond faster"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Recent Messages
                  {totalUnread > 0 && (
                    <span className="ml-2 text-chip bg-primary/10 text-primary">
                      {totalUnread} unread
                    </span>
                  )}
                </h2>
                <Link 
                  to="/messages" 
                  className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                >
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <MessageList conversations={recentConversations} />
            </div>
            
            <div className="glass-panel p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-xl font-semibold">AI Features</h2>
              </div>
              
              <ul className="space-y-4">
                <li className="flex">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Smart Replies</h3>
                    <p className="text-sm text-muted-foreground">Get AI-powered response suggestions</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sentiment Analysis</h3>
                    <p className="text-sm text-muted-foreground">Understand the tone of conversations</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Message Prioritization</h3>
                    <p className="text-sm text-muted-foreground">Focus on the most important messages</p>
                  </div>
                </li>
                
                <div className="mt-6">
                  <Link 
                    to="/messages" 
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    Go to Messages
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </Dashboard>
    </AnimatedTransition>
  );
};

export default Index;
