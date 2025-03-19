
import React from 'react';
import { Sparkles } from 'lucide-react';
import { AISuggestion } from '@/services/mockData';
import { cn } from '@/lib/utils';

interface MessageSuggestionProps {
  suggestion: AISuggestion;
  onSelect: (text: string) => void;
}

const MessageSuggestion: React.FC<MessageSuggestionProps> = ({ suggestion, onSelect }) => {
  // Different appearance based on suggestion type
  const getTypeStyles = () => {
    switch (suggestion.type) {
      case 'question':
        return "border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-900/30 dark:hover:bg-blue-900/50";
      case 'follow-up':
        return "border-purple-200 bg-purple-50 hover:bg-purple-100 dark:border-purple-900 dark:bg-purple-900/30 dark:hover:bg-purple-900/50";
      default:
        return "border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-900 dark:bg-green-900/30 dark:hover:bg-green-900/50";
    }
  };

  const confidenceLevel = Math.floor(suggestion.score * 100);

  return (
    <button
      onClick={() => onSelect(suggestion.text)}
      className={cn(
        "group rounded-lg border p-3 text-sm text-left transition-all duration-200 transform hover:scale-[1.02] hover:shadow-sm",
        getTypeStyles()
      )}
    >
      <div className="flex items-start space-x-2">
        <Sparkles className="w-4 h-4 text-primary mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-foreground">{suggestion.text}</p>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <span className="flex items-center">
              <span className="mr-1">{confidenceLevel}%</span>
              <div className="bg-muted rounded-full h-1.5 w-12 overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full" 
                  style={{ width: `${confidenceLevel}%` }}
                ></div>
              </div>
            </span>
            <span className="ml-2 capitalize">{suggestion.type}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default MessageSuggestion;
