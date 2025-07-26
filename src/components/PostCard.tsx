import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, ChevronRight } from 'lucide-react';
import { Post } from '../types';
import { EchoMeter } from './EchoMeter';
import { useApp } from '../context/AppContext';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const { likePost, repostPost, addComment } = useApp();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    likePost(post.id);
  };

  const handleRepost = () => {
    repostPost(post.id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };


  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-2xl p-5 mb-3 border border-gray-100 dark:border-gray-800 transition-all duration-200 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.displayName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {post.author.displayName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{post.author.username} · {formatTime(post.timestamp)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-900 dark:text-white leading-relaxed whitespace-pre-wrap text-base">
          {post.content}
        </p>
      </div>

      {/* EchoMeter */}
      <div className="mb-4">
        <EchoMeter score={post.echoMeter} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <button 
          onClick={handleLike}
          onClick={(e) => { e.stopPropagation(); handleLike(); }}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
            post.isLiked 
              ? 'text-red-500 bg-red-50 dark:bg-red-900/10' 
              : 'text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10'
          }`}
        >
          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); onClick?.(); }}
          className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>

        <button 
          onClick={handleRepost}
          onClick={(e) => { e.stopPropagation(); handleRepost(); }}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
            post.isReposted 
              ? 'text-green-500 bg-green-50 dark:bg-green-900/10' 
              : 'text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10'
          }`}
        >
          <Repeat2 className="w-5 h-5" />
          <span className="text-sm font-medium">{post.reposts}</span>
        </button>

        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          <Share className="w-5 h-5" />
        </button>
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex space-x-3">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser" 
              alt="Your avatar"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Add a comment..."
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                rows={3}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{commentText.length}/1000</span>
                <div className="space-x-2">
                  <button 
                    onClick={() => setShowCommentInput(false)}
                    onClick={(e) => { e.stopPropagation(); setShowCommentInput(false); }}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleComment}
                    onClick={(e) => { e.stopPropagation(); handleComment(); }}
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};