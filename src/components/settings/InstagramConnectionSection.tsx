
import React from 'react';
import { Instagram, Loader2 } from 'lucide-react';
import { InstagramAccount } from '@/services/mockData';
import { Button } from '@/components/ui/button';

interface InstagramConnectionSectionProps {
  instagramAccount: InstagramAccount | null;
  onConnect: () => void;
  onDisconnect: () => void;
  onSync: () => void;
  isConnecting: boolean;
  isSyncing: boolean;
}

const InstagramConnectionSection: React.FC<InstagramConnectionSectionProps> = ({ 
  instagramAccount, 
  onConnect, 
  onDisconnect, 
  onSync,
  isConnecting,
  isSyncing
}) => {
  return (
    <div className="glass-panel mb-8">
      <div className="border-b p-6">
        <h2 className="text-lg font-semibold flex items-center">
          <Instagram className="w-5 h-5" />
          <span className="ml-2">Instagram Connection</span>
        </h2>
      </div>
      <div className="p-6">
        {instagramAccount ? (
          <div>
            <div className="flex items-center mb-6">
              <img src={instagramAccount.avatar} alt={instagramAccount.username} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{instagramAccount.fullName}</h3>
                <p className="text-muted-foreground">@{instagramAccount.username}</p>
                <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{instagramAccount.followers.toLocaleString()} followers</span>
                  <span>{instagramAccount.following.toLocaleString()} following</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={onSync} 
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  "Sync Messages"
                )}
              </Button>
              <Button 
                variant="destructive" 
                onClick={onDisconnect}
                disabled={isSyncing}
              >
                Disconnect
              </Button>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              {instagramAccount.lastSynced && (
                <p>Last synced: {instagramAccount.lastSynced.toLocaleString()}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Instagram className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">Connect Instagram Account</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Connect your Instagram account to manage direct messages
            </p>
            <Button onClick={onConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Instagram"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramConnectionSection;
