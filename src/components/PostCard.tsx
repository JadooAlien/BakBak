import React from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';
import { EchoMeter } from './EchoMeter';
import { useApp } from '../context/AppContext';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const { likePost, repostPost } = useApp();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likePost(post.id);
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    repostPost(post.id);
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
    <div 
      className="card cursor-pointer mb-4"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.displayName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="heading-3">{post.author.displayName}</p>
            <p className="small-text">@{post.author.username} · {formatTime(post.timestamp)}</p>
          </div>
        </div>
        <button 
          className="btn-ghost p-2 min-h-8 min-w-8"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="body-text whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* EchoMeter */}
      <div className="mb-4">
        <EchoMeter score={post.echoMeter} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-custom">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-2 btn-ghost px-3 py-2 ${
            post.isLiked ? 'text-primary' : ''
          }`}
        >
          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
          <span className="small-text">{post.likes}</span>
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); onClick?.(); }}
          className="flex items-center space-x-2 btn-ghost px-3 py-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="small-text">{post.comments}</span>
        </button>

        <button 
          onClick={handleRepost}
          className={`flex items-center space-x-2 btn-ghost px-3 py-2 ${
            post.isReposted ? 'text-primary' : ''
          }`}
        >
          <Repeat2 className="w-4 h-4" />
          <span className="small-text">{post.reposts}</span>
        </button>

        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex items-center space-x-2 btn-ghost px-3 py-2"
        >
          <Share className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};