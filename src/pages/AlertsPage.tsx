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
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'repost':
        return <Repeat2 className="w-5 h-5 text-green-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
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
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 pt-4">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with your echo activity
          </p>
        </div>

        <div className="space-y-2">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-2xl border transition-all ${
                notification.read
                  ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
              }`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {notification.user.displayName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getNotificationIcon(notification.type)}
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.user.displayName}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {getNotificationText(notification)}
                  </p>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No notifications yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              When people interact with your posts, you'll see it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};