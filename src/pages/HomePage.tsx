import React from 'react';
import { PostCard } from '../components/PostCard';
import { useApp } from '../context/AppContext';

interface HomePageProps {
  onPostClick: (postId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPostClick }) => {
  const { posts } = useApp();

  return (
    <div className="min-h-screen pb-20 pt-6 page-transition">
      <div className="container">
        <div className="mb-8">
          <h1 className="heading-1">Feed</h1>
          <p className="caption">Latest from your network</p>
        </div>
        
        <div className="space-y-4">
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
            <div className="w-16 h-16 surface rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👋</span>
            </div>
            <h3 className="heading-2 mb-2">Welcome to HuiHui!</h3>
            <p className="caption mb-4">
              Start following people or create your first post to see content here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};