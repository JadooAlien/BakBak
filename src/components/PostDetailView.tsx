import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Repeat2, Share, Send } from 'lucide-react';
import { Post } from '../types';
import { EchoMeter } from './EchoMeter';
import { useApp } from '../context/AppContext';

interface PostDetailViewProps {
  post: Post;
  onClose: () => void;
}

export const PostDetailView: React.FC<PostDetailViewProps> = ({ post, onClose }) => {
  const { currentUser, likePost, repostPost, addComment } = useApp();
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

  // Mock comments for demonstration
  const mockComments = [
    {
      id: '1',
      content: 'This is so relatable! I do the same thing all the time.',
      author: {
        id: '3',
        username: 'commenter1',
        displayName: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        bio: '',
        followers: 0,
        following: 0,
        echoScore: 0,
        badges: []
      },
      timestamp: new Date(Date.now() - 1800000),
      likes: 12
    },
    {
      id: '2',
      content: 'The void has excellent wifi indeed 😂',
      author: {
        id: '4',
        username: 'voidlover',
        displayName: 'Alex Kim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        bio: '',
        followers: 0,
        following: 0,
        echoScore: 0,
        badges: []
      },
      timestamp: new Date(Date.now() - 3600000),
      likes: 8
    }
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-black z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center space-x-4 z-10">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Post</h1>
      </div>

      <div className="max-w-md mx-auto">
        {/* Main Post */}
        <div className="bg-white dark:bg-gray-900 p-6 border-b border-gray-100 dark:border-gray-800">
          {/* Author */}
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={post.author.avatar} 
              alt={post.author.displayName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {post.author.displayName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{post.author.username}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-900 dark:text-white leading-relaxed text-lg whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Timestamp */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.timestamp.toLocaleString()}
            </p>
          </div>

          {/* EchoMeter */}
          <div className="mb-6">
            <EchoMeter score={post.echoMeter} size="lg" />
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 py-4 border-t border-b border-gray-100 dark:border-gray-800">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{post.likes}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{post.reposts}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Reposts</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{post.comments}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Comments</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-around py-4">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                post.isLiked 
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/10' 
                  : 'text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10'
              }`}
            >
              <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} />
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all">
              <MessageCircle className="w-6 h-6" />
            </button>

            <button 
              onClick={handleRepost}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                post.isReposted 
                  ? 'text-green-500 bg-green-50 dark:bg-green-900/10' 
                  : 'text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10'
              }`}
            >
              <Repeat2 className="w-6 h-6" />
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              <Share className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex space-x-3">
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.displayName}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1 flex space-x-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 border-0 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                rows={3}
                maxLength={1000}
              />
              <button 
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="self-end p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white dark:bg-gray-900">
          {mockComments.map((comment) => (
            <div key={comment.id} className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex space-x-3">
                <img 
                  src={comment.author.avatar} 
                  alt={comment.author.displayName}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {comment.author.displayName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{comment.author.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      · {formatTime(comment.timestamp)}
                    </p>
                  </div>
                  <p className="text-gray-900 dark:text-white leading-relaxed mb-2">
                    {comment.content}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{comment.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};