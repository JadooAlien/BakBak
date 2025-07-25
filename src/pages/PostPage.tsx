import React, { useState } from 'react';
import { X, Globe, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PostPageProps {
  onClose: () => void;
}

export const PostPage: React.FC<PostPageProps> = ({ onClose }) => {
  const { currentUser, addPost } = useApp();
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    addPost({
      content: content.trim(),
      author: isAnonymous ? null : currentUser,
      isAnonymous,
      likes: 0,
      reposts: 0,
      comments: 0,
      echoMeter: Math.floor(Math.random() * 30) + 10 // Initial random score
    });

    setContent('');
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Create Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Anonymous Toggle */}
        <div className="mb-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center space-x-3">
              {isAnonymous ? (
                <Lock className="w-5 h-5 text-purple-500" />
              ) : (
                <Globe className="w-5 h-5 text-blue-500" />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {isAnonymous ? 'Anonymous Post' : 'Public Post'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isAnonymous ? 'Your identity will be hidden' : 'Posted as your username'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`w-12 h-6 rounded-full transition-colors ${
                isAnonymous ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  isAnonymous ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Content Input */}
        <div className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's echoing in your mind?"
            className="w-full h-40 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            maxLength={3000}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {content.length}/3000 characters
            </span>
            <div className={`text-sm ${content.length > 2800 ? 'text-red-500' : 'text-gray-500'}`}>
              {content.length > 2800 && `${3000 - content.length} left`}
            </div>
          </div>
        </div>

        {/* Post Button */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Posting...' : 'Post to BakBak'}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
          Posts are public and can be seen by anyone on BakBak
        </p>
      </div>
    </div>
  );
};