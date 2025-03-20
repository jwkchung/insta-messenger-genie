
import { useState } from 'react';
import { InstagramAccount, mockInstagramApi } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';

export function useInstagramConnection() {
  const { toast } = useToast();
  const [instagramAccount, setInstagramAccount] = useState<InstagramAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
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

  // Return all state and handlers
  return {
    instagramAccount,
    isConnecting,
    isSyncing,
    loginDialogOpen,
    username,
    password,
    setLoginDialogOpen,
    setUsername,
    setPassword,
    handleOpenConnectDialog,
    handleConnect,
    handleDisconnect,
    handleSync
  };
}
