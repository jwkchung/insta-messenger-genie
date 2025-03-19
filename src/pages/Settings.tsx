
import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, MessageSquare } from 'lucide-react';
import Dashboard from '@/components/layout/Dashboard';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { InstagramAccount, mockInstagramApi } from '@/services/mockData';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsRow from '@/components/settings/SettingsRow';
import InstagramConnectionSection from '@/components/settings/InstagramConnectionSection';

const Settings = () => {
  const { toast } = useToast();
  const [accountConnected, setAccountConnected] = React.useState(true);
  const [aiSuggestions, setAiSuggestions] = React.useState(true);
  const [sentimentAnalysis, setSentimentAnalysis] = React.useState(true);
  const [prioritization, setPrioritization] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);
  
  // Instagram connection states
  const [instagramAccount, setInstagramAccount] = useState<InstagramAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Instagram connection handlers
  const handleOpenConnectDialog = () => {
    setLoginDialogOpen(true);
  };
  
  const handleConnect = async () => {
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const account = await mockInstagramApi.connectAccount(username, password);
      setInstagramAccount(account);
      toast({
        title: "Success",
        description: "Instagram account connected successfully",
      });
      setLoginDialogOpen(false);
      setUsername('');
      setPassword('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect Instagram account. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleDisconnect = async () => {
    if (!instagramAccount) return;
    
    try {
      await mockInstagramApi.disconnectAccount(instagramAccount.id);
      setInstagramAccount(null);
      toast({
        title: "Success",
        description: "Instagram account disconnected",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect Instagram account",
        variant: "destructive",
      });
    }
  };
  
  const handleSync = async () => {
    if (!instagramAccount) return;
    
    setIsSyncing(true);
    
    try {
      await mockInstagramApi.syncMessages(instagramAccount.id);
      
      // Update last synced time
      setInstagramAccount({
        ...instagramAccount,
        lastSynced: new Date()
      });
      
      toast({
        title: "Success",
        description: "Messages synced successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sync messages",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

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
          
          <InstagramConnectionSection 
            instagramAccount={instagramAccount}
            onConnect={handleOpenConnectDialog}
            onDisconnect={handleDisconnect}
            onSync={handleSync}
            isConnecting={isConnecting}
            isSyncing={isSyncing}
          />
          
          <SettingsSection title="Account" icon={<User className="w-5 h-5" />}>
            <SettingsRow
              title="Instagram Account"
              description="Connect your Instagram account to manage direct messages"
            >
              <div className="flex items-center">
                {accountConnected ? (
                  <button className="bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-md flex items-center">
                    <span className="mr-1.5 text-green-600">✓</span>
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
              <Switch checked={aiSuggestions} onCheckedChange={setAiSuggestions} />
            </SettingsRow>
            
            <SettingsRow
              title="Sentiment Analysis"
              description="Analyze the sentiment and tone of messages"
            >
              <Switch checked={sentimentAnalysis} onCheckedChange={setSentimentAnalysis} />
            </SettingsRow>
            
            <SettingsRow
              title="Message Prioritization"
              description="Automatically prioritize important messages"
            >
              <Switch checked={prioritization} onCheckedChange={setPrioritization} />
            </SettingsRow>
          </SettingsSection>
          
          <SettingsSection title="Notifications" icon={<Bell className="w-5 h-5" />}>
            <SettingsRow
              title="Push Notifications"
              description="Receive notifications for new messages"
            >
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </SettingsRow>
            
            <SettingsRow
              title="Email Notifications"
              description="Receive email updates for important messages"
            >
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
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
      
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Instagram Account</DialogTitle>
            <DialogDescription>
              Enter your Instagram credentials to connect your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                placeholder="Your Instagram username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Your Instagram password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              Note: This is a demo app. Your credentials will not be stored or used to actually log in to Instagram.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setLoginDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <span className="mr-2 animate-spin">◌</span>
                  Connecting...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatedTransition>
  );
};

export default Settings;
