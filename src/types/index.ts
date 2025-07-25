export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  echoScore: number;
  badges: Badge[];
  avatar?: string;
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
  author: User | null; // null for anonymous posts
  isAnonymous: boolean;
  timestamp: Date;
  likes: number;
  reposts: number;
  comments: number;
  echoMeter: number; // 0-100 viral score
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