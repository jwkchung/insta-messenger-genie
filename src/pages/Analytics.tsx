
import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart2, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';
import Dashboard from '@/components/layout/Dashboard';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import AnalyticsCard from '@/components/analytics/AnalyticsCard';
import { mockData } from '@/services/mockData';

// Mock data for charts
const messagesByDay = [
  { name: 'Mon', value: 35 },
  { name: 'Tue', value: 28 },
  { name: 'Wed', value: 42 },
  { name: 'Thu', value: 45 },
  { name: 'Fri', value: 38 },
  { name: 'Sat', value: 25 },
  { name: 'Sun', value: 30 },
];

const responseTimeData = [
  { name: 'Mon', time: 32 },
  { name: 'Tue', time: 45 },
  { name: 'Wed', time: 25 },
  { name: 'Thu', time: 18 },
  { name: 'Fri', time: 22 },
  { name: 'Sat', time: 35 },
  { name: 'Sun', time: 30 },
];

const messageTypeData = [
  { name: 'Questions', value: 35 },
  { name: 'Responses', value: 45 },
  { name: 'Greetings', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#4F46E5', '#10B981', '#F97316', '#8B5CF6'];

const Analytics = () => {
  return (
    <AnimatedTransition>
      <Dashboard>
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold flex items-center">
              <BarChart2 className="w-6 h-6 mr-2" />
              Message Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Insights and statistics from your Instagram direct messages
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnalyticsCard
              title="Total Messages"
              value={mockData.analytics.totalMessages}
              change={mockData.analytics.messageGrowth}
              description="Messages in the last 30 days"
            />
            
            <AnalyticsCard
              title="Response Rate"
              value={`${(mockData.analytics.responseRate * 100).toFixed(1)}%`}
              change={0.05}
              description="Average response rate"
            />
            
            <AnalyticsCard
              title="Average Response Time"
              value={`${mockData.analytics.averageResponseTime} mins`}
              change={-0.12}
              description="Time to respond to messages"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Messages by Day
                </h2>
                <div className="text-chip bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  Last 7 days
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={messagesByDay}
                    margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        fontSize: '12px'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                      name="Messages"
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Response Time
                </h2>
                <div className="text-chip bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                  Last 7 days
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={responseTimeData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`${value} mins`, 'Response Time']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="time" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Minutes"
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4">Message Types</h2>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={messageTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={1000}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {messageTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="lg:col-span-2 glass-panel p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">AI Impact</h2>
                <div className="text-chip bg-primary/10 text-primary">
                  Improving by 12% <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel-sm p-4">
                  <h3 className="font-medium mb-1 text-sm text-muted-foreground">Response Suggestions</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold mr-2">86</span>
                    <span className="text-sm text-green-600 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                      15%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Used in the last 30 days
                  </p>
                </div>
                
                <div className="glass-panel-sm p-4">
                  <h3 className="font-medium mb-1 text-sm text-muted-foreground">Time Saved</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold mr-2">3.2</span>
                    <span className="text-sm">hours</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimated time saved with AI
                  </p>
                </div>
                
                <div className="glass-panel-sm p-4">
                  <h3 className="font-medium mb-1 text-sm text-muted-foreground">Sentiment Detection</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold mr-2">92%</span>
                    <span className="text-sm text-green-600 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                      4%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Accuracy in detecting tone
                  </p>
                </div>
                
                <div className="glass-panel-sm p-4">
                  <h3 className="font-medium mb-1 text-sm text-muted-foreground">Conversation Quality</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold mr-2">8.7</span>
                    <span className="text-sm">/10</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average conversation rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </AnimatedTransition>
  );
};

export default Analytics;
