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
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <img 
                src={currentUser?.avatar} 
                alt={currentUser?.displayName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="heading-3">{currentUser?.displayName}</p>
                <p className="small-text">@{currentUser?.username}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-ghost p-2 min-h-8 min-w-8"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="input-field h-48 resize-none text-base"
              maxLength={3000}
              autoFocus
            />
            <div className="flex justify-between items-center mt-2">
              <span className="small-text">
                {content.length}/3000 characters
              </span>
            </div>
          </div>

          {/* Post Button */}
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading}
            className="btn-primary w-full py-4"
          >
            {isLoading ? 'Posting...' : 'Post to HuiHui'}
          </button>
        </div>
      </div>
    </div>
  );
};