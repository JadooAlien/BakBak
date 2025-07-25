import React, { createContext, useContext, useState } from 'react';
import { User, Post, Notification } from '../types';

interface AppContextType {
  currentUser: User | null;
  posts: Post[];
  notifications: Notification[];
  setCurrentUser: (user: User | null) => void;
  addPost: (post: Omit<Post, 'id' | 'timestamp'>) => void;
  likePost: (postId: string) => void;
  repostPost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  markNotificationRead: (notificationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Mock data
const mockUser: User = {
  id: '1',
  username: 'echohunter',
  displayName: 'Echo Hunter',
  bio: 'Chasing viral posts and digital echoes 🌊',
  followers: 1250,
  following: 847,
  echoScore: 8520,
  badges: [
    { id: '1', name: 'Repost King', description: 'Over 1000 reposts', icon: '👑', color: '#FFD700' },
    { id: '2', name: 'Daily Echo', description: 'Post daily for 30 days', icon: '🔥', color: '#FF6B6B' }
  ]
};

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just realized that social media is basically just us all shouting into the void and hoping someone shouts back. But hey, at least the void has good wifi.',
    author: mockUser,
    isAnonymous: false,
    timestamp: new Date(Date.now() - 3600000),
    likes: 47,
    reposts: 12,
    comments: 8,
    echoMeter: 73,
    isLiked: true
  },
  {
    id: '2',
    content: 'Sometimes I write long texts just to delete them because I realize nobody really cares about my random 3am thoughts. But this time I\'m hitting send. Hello void.',
    author: null,
    isAnonymous: true,
    timestamp: new Date(Date.now() - 7200000),
    likes: 156,
    reposts: 34,
    comments: 23,
    echoMeter: 89
  },
  {
    id: '3',
    content: 'Hot take: The best conversations happen in comment threads, not in the original posts. Change my mind.',
    author: {
      id: '2',
      username: 'threadmaster',
      displayName: 'Thread Master',
      bio: 'Professional comment thread starter',
      followers: 892,
      following: 345,
      echoScore: 6780,
      badges: []
    },
    isAnonymous: false,
    timestamp: new Date(Date.now() - 10800000),
    likes: 23,
    reposts: 5,
    comments: 45,
    echoMeter: 34
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUser);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addPost = (postData: Omit<Post, 'id' | 'timestamp'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
            echoMeter: Math.min(100, post.echoMeter + (post.isLiked ? -1 : 2))
          }
        : post
    ));
  };

  const repostPost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
            isReposted: !post.isReposted,
            echoMeter: Math.min(100, post.echoMeter + (post.isReposted ? -2 : 3))
          }
        : post
    ));
  };

  const addComment = (postId: string, content: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: post.comments + 1,
            echoMeter: Math.min(100, post.echoMeter + 1)
          }
        : post
    ));
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      posts,
      notifications,
      setCurrentUser,
      addPost,
      likePost,
      repostPost,
      addComment,
      markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};