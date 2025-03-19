
import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, MessageSquare, Check } from 'lucide-react';
import Dashboard from '@/components/layout/Dashboard';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { cn } from '@/lib/utils';

const SettingsSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ 
  title, 
  icon,
  children 
}) => {
  return (
    <div className="glass-panel mb-8">
      <div className="border-b p-6">
        <h2 className="text-lg font-semibold flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

const SettingsRow: React.FC<{ 
  title: string; 
  description?: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div className="flex items-start justify-between py-4 border-b last:border-b-0">
      <div>
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );
};

const Switch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center rounded-full transition-colors w-11 h-6 focus:outline-none",
        checked ? "bg-primary" : "bg-muted"
      )}
      onClick={onChange}
    >
      <span
        className={cn(
          "inline-block w-4 h-4 transform bg-white rounded-full transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
};

const Settings = () => {
  const [accountConnected, setAccountConnected] = React.useState(true);
  const [aiSuggestions, setAiSuggestions] = React.useState(true);
  const [sentimentAnalysis, setSentimentAnalysis] = React.useState(true);
  const [prioritization, setPrioritization] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);

  return (
    <AnimatedTransition>
      <Dashboard>
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold flex items-center">
              <SettingsIcon className="w-6 h-6 mr-2" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and preferences
            </p>
          </header>
          
          <SettingsSection title="Account" icon={<User className="w-5 h-5" />}>
            <SettingsRow
              title="Instagram Account"
              description="Connect your Instagram account to manage direct messages"
            >
              <div className="flex items-center">
                {accountConnected ? (
                  <button className="bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-md flex items-center">
                    <Check className="w-4 h-4 mr-1.5 text-green-600" />
                    Connected
                  </button>
                ) : (
                  <button className="bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-md">
                    Connect
                  </button>
                )}
              </div>
            </SettingsRow>
            
            <SettingsRow
              title="Profile Information"
              description="Update your name and personal details"
            >
              <button className="text-sm text-primary hover:text-primary/80">
                Edit
              </button>
            </SettingsRow>
            
            <SettingsRow
              title="Password"
              description="Change your password"
            >
              <button className="text-sm text-primary hover:text-primary/80">
                Change
              </button>
            </SettingsRow>
          </SettingsSection>
          
          <SettingsSection title="AI Features" icon={<MessageSquare className="w-5 h-5" />}>
            <SettingsRow
              title="AI Message Suggestions"
              description="Get AI-powered suggestions for responses"
            >
              <Switch checked={aiSuggestions} onChange={() => setAiSuggestions(!aiSuggestions)} />
            </SettingsRow>
            
            <SettingsRow
              title="Sentiment Analysis"
              description="Analyze the sentiment and tone of messages"
            >
              <Switch checked={sentimentAnalysis} onChange={() => setSentimentAnalysis(!sentimentAnalysis)} />
            </SettingsRow>
            
            <SettingsRow
              title="Message Prioritization"
              description="Automatically prioritize important messages"
            >
              <Switch checked={prioritization} onChange={() => setPrioritization(!prioritization)} />
            </SettingsRow>
          </SettingsSection>
          
          <SettingsSection title="Notifications" icon={<Bell className="w-5 h-5" />}>
            <SettingsRow
              title="Push Notifications"
              description="Receive notifications for new messages"
            >
              <Switch checked={notifications} onChange={() => setNotifications(!notifications)} />
            </SettingsRow>
            
            <SettingsRow
              title="Email Notifications"
              description="Receive email updates for important messages"
            >
              <Switch checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
            </SettingsRow>
          </SettingsSection>
          
          <SettingsSection title="Privacy & Security" icon={<Shield className="w-5 h-5" />}>
            <SettingsRow
              title="Data Usage"
              description="Control how your data is used for AI features"
            >
              <button className="text-sm text-primary hover:text-primary/80">
                Manage
              </button>
            </SettingsRow>
            
            <SettingsRow
              title="Delete Account"
              description="Permanently delete your account and all data"
            >
              <button className="text-sm text-destructive hover:text-destructive/80">
                Delete
              </button>
            </SettingsRow>
          </SettingsSection>
        </div>
      </Dashboard>
    </AnimatedTransition>
  );
};

export default Settings;
