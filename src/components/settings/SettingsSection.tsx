
import React from 'react';

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ 
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

export default SettingsSection;
