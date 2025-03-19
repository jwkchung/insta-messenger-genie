
import React from 'react';

interface SettingsRowProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ 
  title, 
  description, 
  children 
}) => {
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

export default SettingsRow;
