export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string; // Dicebear avatar URL
  followers: number;
  following: number;
  echoScore: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  likes: number;
  reposts: number;
  comments: number;
  echoMeter: number; // Starting from 1000, increases endlessly
  isLiked?: boolean;
  isReposted?: boolean;
  parentId?: string; // for threaded comments
}

export interface Comment extends Post {
  parentId: string;
  replies: Comment[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'repost' | 'follow';
  user: User;
  post?: Post;
  timestamp: Date;
  read: boolean;
}