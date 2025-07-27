import React from 'react';
import { Home, Compass, Plus, Bell, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadNotifications?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  activeTab, 
  onTabChange, 
  unreadNotifications = 0 
}) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'post', icon: Plus, label: 'Post' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: unreadNotifications },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 surface border-t border-custom z-50">
      <div className="flex items-center justify-around container py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-item ${isActive ? 'active' : ''} ${
                tab.id === 'post' ? 'btn-primary rounded-full p-3' : ''
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${tab.id === 'post' ? 'w-4 h-4' : ''}`} />
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </div>
                )}
              </div>
              <span className="small-text mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};