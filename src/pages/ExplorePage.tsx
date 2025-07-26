import React, { useState } from 'react';
import { Search, TrendingUp, Clock, Heart } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { useApp } from '../context/AppContext';

interface ExplorePageProps {
  onPostClick: (postId: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onPostClick }) => {
  const { posts } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'popular'>('trending');

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.echoMeter - a.echoMeter;
      case 'recent':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'popular':
        return (b.likes + b.reposts * 2) - (a.likes + a.reposts * 2);
      default:
        return 0;
    }
  });

  const filteredPosts = sortedPosts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 pt-6">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-4 bg-white dark:bg-gray-900 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white shadow-sm"
            />
          </div>

          {/* Sort Filters */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setSortBy('trending')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                sortBy === 'trending'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                sortBy === 'recent'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Recent</span>
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                sortBy === 'popular'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Popular</span>
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};