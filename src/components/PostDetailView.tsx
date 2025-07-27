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
    <div className="fixed inset-0 z-50 overflow-y-auto page-transition">
      {/* Header */}
      <div className="sticky top-0 surface border-b border-custom px-4 py-4 flex items-center space-x-4 z-10">
        <button
          onClick={onClose}
          className="btn-ghost p-2 min-h-8 min-w-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="heading-2">Post</h1>
      </div>

      <div className="container">
        {/* Main Post */}
        <div className="surface p-6 border-b border-custom">
          {/* Author */}
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={post.author.avatar} 
              alt={post.author.displayName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="heading-3">{post.author.displayName}</p>
              <p className="small-text">@{post.author.username}</p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="body-text text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Timestamp */}
          <div className="mb-4">
            <p className="small-text">{post.timestamp.toLocaleString()}</p>
          </div>

          {/* EchoMeter */}
          <div className="mb-6">
            <EchoMeter score={post.echoMeter} size="lg" />
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 py-4 border-t border-b border-custom">
            <div className="text-center">
              <p className="heading-2">{post.likes}</p>
              <p className="small-text">Likes</p>
            </div>
            <div className="text-center">
              <p className="heading-2">{post.reposts}</p>
              <p className="small-text">Reposts</p>
            </div>
            <div className="text-center">
              <p className="heading-2">{post.comments}</p>
              <p className="small-text">Comments</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-around py-4">
            <button 
              onClick={handleLike}
              className={`btn-ghost p-3 ${post.isLiked ? 'text-primary' : ''}`}
            >
              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
            </button>

            <button className="btn-ghost p-3">
              <MessageCircle className="w-5 h-5" />
            </button>

            <button 
              onClick={handleRepost}
              className={`btn-ghost p-3 ${post.isReposted ? 'text-primary' : ''}`}
            >
              <Repeat2 className="w-5 h-5" />
            </button>

            <button className="btn-ghost p-3">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="surface p-4 border-b border-custom">
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
                className="input-field flex-1 h-20 resize-none"
                maxLength={1000}
              />
              <button 
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="btn-primary p-3 self-end"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="surface">
          {mockComments.map((comment) => (
            <div key={comment.id} className="p-4 border-b border-custom">
              <div className="flex space-x-3">
                <img 
                  src={comment.author.avatar} 
                  alt={comment.author.displayName}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="heading-3">{comment.author.displayName}</p>
                    <p className="small-text">@{comment.author.username}</p>
                    <p className="small-text">· {formatTime(comment.timestamp)}</p>
                  </div>
                  <p className="body-text leading-relaxed mb-2">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 btn-ghost px-2 py-1">
                      <Heart className="w-3 h-3" />
                      <span className="small-text">{comment.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 btn-ghost px-2 py-1">
                      <MessageCircle className="w-3 h-3" />
                      <span className="small-text">Reply</span>
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