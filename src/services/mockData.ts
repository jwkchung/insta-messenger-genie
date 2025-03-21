
import { faker } from '@faker-js/faker';

// Types
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: Date;
  read: boolean;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  messages: Message[];
  lastMessageAt: Date;
  unreadCount: number;
}

export interface AISuggestion {
  id: string;
  text: string;
  type: 'simple' | 'question' | 'follow-up';
  score: number;
}

export interface AnalyticsSummary {
  totalMessages: number;
  responseRate: number;
  averageResponseTime: number;
  engagementScore: number;
  messageGrowth: number;
}

export interface InstagramAccount {
  id: string;
  username: string;
  avatar: string;
  fullName: string;
  followers: number;
  following: number;
  isConnected: boolean;
  lastSynced: Date | null;
}

// Generate mock data
const createMockUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  username: faker.internet.userName().toLowerCase(),
  avatar: faker.image.avatar(),
  isVerified: faker.datatype.boolean(0.2),
});

const createMockMessage = (sender: User, isOwn: boolean = false): Message => {
  // Create realistic message content in English
  const messageTemplates = [
    "Hey, how are you doing today?",
    "Did you see that new post?",
    "Thanks for your help yesterday!",
    "What time are we meeting tomorrow?",
    "I just sent you the file you requested.",
    "Can we reschedule our call?",
    "Looking forward to working with you.",
    "Let me know when you're available to chat.",
    "I really liked your recent photos!",
    "Have you checked out that new restaurant?",
    "Just got back from vacation, it was amazing!",
    "Sorry for the late reply, I've been busy.",
    "Are you coming to the event this weekend?",
    "Could you give me some feedback on my latest post?",
    "I'd like to collaborate with you on a project."
  ];
  
  return {
    id: faker.string.uuid(),
    sender,
    content: faker.helpers.arrayElement(messageTemplates),
    timestamp: faker.date.recent({ days: 7 }),
    read: faker.datatype.boolean(0.7),
    isOwn,
  };
};

const createMockAISuggestion = (): AISuggestion => {
  const types: AISuggestion['type'][] = ['simple', 'question', 'follow-up'];
  
  // Create realistic AI suggestions in English
  const suggestionsByType = {
    simple: [
      "Thanks for reaching out!",
      "I appreciate your message.",
      "Great to hear from you!",
      "Thanks for sharing that with me.",
      "I understand what you mean."
    ],
    question: [
      "When would be a good time to discuss this further?",
      "What specific features are you looking for?",
      "How did you hear about our services?",
      "Would you like me to send you more information?",
      "Can you provide more details about your requirements?"
    ],
    'follow-up': [
      "I'll follow up with you next week about this.",
      "Let's schedule a call to discuss the next steps.",
      "I'll send you the proposal by tomorrow.",
      "Would it be helpful if I shared some examples?",
      "Should we include your team in our next discussion?"
    ]
  };
  
  const type = types[faker.number.int({ min: 0, max: 2 })];
  
  return {
    id: faker.string.uuid(),
    text: faker.helpers.arrayElement(suggestionsByType[type]),
    type,
    score: Number((faker.number.float({ min: 0.7, max: 0.99, fractionDigits: 2 })).toFixed(2)),
  };
};

const createMockConversation = (): Conversation => {
  const participant = createMockUser();
  const messageCount = faker.number.int({ min: 3, max: 15 });
  const messages: Message[] = [];
  
  for (let i = 0; i < messageCount; i++) {
    const isOwn = faker.datatype.boolean(0.4);
    const sender = isOwn ? { 
      id: 'self', 
      name: 'Me', 
      username: 'me', 
      avatar: '/placeholder.svg', 
      isVerified: false 
    } : participant;
    
    messages.push(createMockMessage(sender, isOwn));
  }
  
  messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  
  const unreadCount = messages.filter(m => !m.read && !m.isOwn).length;
  
  return {
    id: faker.string.uuid(),
    participant,
    messages,
    lastMessageAt: messages[messages.length - 1].timestamp,
    unreadCount,
  };
};

export const generateMockData = () => {
  const conversations: Conversation[] = [];
  
  for (let i = 0; i < 12; i++) {
    conversations.push(createMockConversation());
  }
  
  conversations.sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
  
  return {
    conversations,
    analytics: {
      totalMessages: faker.number.int({ min: 120, max: 500 }),
      responseRate: Number((faker.number.float({ min: 0.6, max: 0.95, fractionDigits: 2 })).toFixed(2)),
      averageResponseTime: faker.number.int({ min: 5, max: 120 }),
      engagementScore: Number((faker.number.float({ min: 0.5, max: 0.9, fractionDigits: 2 })).toFixed(2)),
      messageGrowth: Number((faker.number.float({ min: -0.1, max: 0.3, fractionDigits: 2 })).toFixed(2)),
    },
  };
};

// Generate and export mock data for use in components
export const mockData = generateMockData();

// Function to generate AI suggestions for a message
export const getAiSuggestionsForMessage = (message: string): AISuggestion[] => {
  const suggestions: AISuggestion[] = [];
  const count = faker.number.int({ min: 2, max: 4 });
  
  for (let i = 0; i < count; i++) {
    suggestions.push(createMockAISuggestion());
  }
  
  return suggestions;
};

// Function to create a mock Instagram account
export const createMockInstagramAccount = (): InstagramAccount => ({
  id: faker.string.uuid(),
  username: faker.internet.userName().toLowerCase(),
  avatar: faker.image.avatar(),
  fullName: faker.person.fullName(),
  followers: faker.number.int({ min: 100, max: 10000 }),
  following: faker.number.int({ min: 50, max: 1000 }),
  isConnected: false,
  lastSynced: null,
});

// Mock Instagram API functions
export const mockInstagramApi = {
  connectAccount: (username: string, password: string): Promise<InstagramAccount> => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (username && password) {
          const account = createMockInstagramAccount();
          account.username = username;
          account.isConnected = true;
          account.lastSynced = new Date();
          resolve(account);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  },
  
  disconnectAccount: (accountId: string): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  
  syncMessages: (accountId: string): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
};
