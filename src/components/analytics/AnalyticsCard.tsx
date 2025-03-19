
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  description?: string;
  data?: { name: string; value: number }[];
  className?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  description,
  data,
  className,
}) => {
  const showChart = data && data.length > 0;
  const isPositiveChange = change && change > 0;
  
  return (
    <div className={cn("glass-panel p-6 h-full", className)}>
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold">{value}</span>
            {change !== undefined && (
              <div className={cn(
                "ml-2 flex items-center text-sm",
                isPositiveChange ? "text-green-600" : "text-red-600"
              )}>
                {isPositiveChange ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                )}
                <span>{Math.abs(change * 100).toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        
        {showChart && (
          <div className="flex-1 min-h-[120px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
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
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fill={`url(#gradient-${title})`} 
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;
