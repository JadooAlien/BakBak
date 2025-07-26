import React from 'react';
import { PostCard } from '../components/PostCard';
import { useApp } from '../context/AppContext';
import { PostDetailView } from '../components/PostDetailView';

interface HomePageProps {
  onPostClick: (postId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPostClick }) => {
  const { posts } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 pt-6">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Feed
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Latest from your network
          </p>
        </div>
        
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👋</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Welcome to HuiHui!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start following people or create your first post to see content here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};