import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PostPageProps {
  onClose: () => void;
}

export const PostPage: React.FC<PostPageProps> = ({ onClose }) => {
  const { currentUser, addPost } = useApp();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    addPost({
      content: content.trim(),
      author: currentUser!,
      likes: 0,
      reposts: 0,
      comments: 0,
      echoMeter: Math.floor(Math.random() * 200) + 1000 // Initial score starting from 1000
    });

    setContent('');
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.displayName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {currentUser?.displayName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{currentUser?.username}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content Input */}
        <div className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-800 border-0 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-lg"
            maxLength={3000}
            autoFocus
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {content.length}/3000 characters
            </span>
          </div>
        </div>

        {/* Post Button */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isLoading}
          className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Posting...' : 'Post to HuiHui'}
        </button>
      </div>
    </div>
  );
};