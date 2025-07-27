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
    <div className="min-h-screen pb-20 pt-6 page-transition">
      <div className="container">
        <div className="mb-6">
          <h1 className="heading-1 mb-4">Explore</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="input-field pl-10"
            />
          </div>

          {/* Sort Filters */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setSortBy('trending')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-all ${
                sortBy === 'trending'
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-all ${
                sortBy === 'recent'
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Recent</span>
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-all ${
                sortBy === 'popular'
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Popular</span>
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
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
            <div className="w-16 h-16 surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted" />
            </div>
            <h3 className="heading-2 mb-2">No posts found</h3>
            <p className="caption">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};