import React from 'react';
import { Bell, Heart, MessageCircle, Repeat2, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AlertsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();

  const mockNotifications = [
    {
      id: '1',
      type: 'like' as const,
      user: {
        id: '2',
        username: 'threadmaster',
        displayName: 'Thread Master',
        bio: '',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=threadmaster',
        followers: 0,
        following: 0,
        echoScore: 0,
        badges: []
      },
      timestamp: new Date(Date.now() - 1800000),
      read: false
    },
    {
      id: '2',
      type: 'comment' as const,
      user: {
        id: '3',
        username: 'echolover',
        displayName: 'Echo Lover',
        bio: '',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=echolover',
        followers: 0,
        following: 0,
        echoScore: 0,
        badges: []
      },
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: '3',
      type: 'repost' as const,
      user: {
        id: '4',
        username: 'viralseeker',
        displayName: 'Viral Seeker',
        bio: '',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viralseeker',
        followers: 0,
        following: 0,
        echoScore: 0,
        badges: []
      },
      timestamp: new Date(Date.now() - 7200000),
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4" />;
      case 'repost':
        return <Repeat2 className="w-4 h-4" />;
      case 'follow':
        return <UserPlus className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationText = (notification: any) => {
    switch (notification.type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'repost':
        return 'reposted your post';
      case 'follow':
        return 'started following you';
      default:
        return 'interacted with your content';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 24) return `${Math.floor(hours / 24)}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  return (
    <div className="min-h-screen pb-20 pt-6 page-transition">
      <div className="container">
        <div className="mb-6">
          <h1 className="heading-1 mb-2">Notifications</h1>
          <p className="caption">Stay updated with your echo activity</p>
        </div>

        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`card cursor-pointer ${
                !notification.read ? 'border-primary' : ''
              }`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <img 
                  src={notification.user.avatar} 
                  alt={notification.user.displayName}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {getNotificationIcon(notification.type)}
                      <p className="heading-3">{notification.user.displayName}</p>
                    </div>
                    <span className="small-text">{formatTime(notification.timestamp)}</span>
                  </div>
                  <p className="caption">{getNotificationText(notification)}</p>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-white rounded-full mt-2" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-muted" />
            </div>
            <h3 className="heading-2 mb-2">No notifications yet</h3>
            <p className="caption">When people interact with your posts, you'll see it here</p>
          </div>
        )}
      </div>
    </div>
  );
};