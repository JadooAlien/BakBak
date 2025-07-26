import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { FloatingActionButton } from './components/FloatingActionButton';
import { InstallPrompt } from './components/InstallPrompt';
import { PostDetailView } from './components/PostDetailView';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PostPage } from './pages/PostPage';
import { AlertsPage } from './pages/AlertsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';

function App() {
  const { posts } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(() => console.log('SW registration failed'));
    }
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === 'post') {
      setShowPostModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
  };

  const handleClosePostDetail = () => {
    setSelectedPostId(null);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onPostClick={handlePostClick} />;
      case 'explore':
        return <ExplorePage onPostClick={handlePostClick} />;
      case 'alerts':
        return <AlertsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onPostClick={handlePostClick} />;
    }
  };

  const selectedPost = selectedPostId ? posts.find(p => p.id === selectedPostId) : null;

  return (
    <div className="app-container">
      <InstallPrompt />
      {!selectedPostId && renderPage()}
      {!selectedPostId && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          unreadNotifications={2}
        />
      )}
      {!selectedPostId && activeTab === 'home' && (
        <FloatingActionButton onClick={() => setShowPostModal(true)} />
      )}
      {showPostModal && (
        <PostPage onClose={() => setShowPostModal(false)} />
      )}
      {selectedPost && (
        <PostDetailView 
          post={selectedPost} 
          onClose={handleClosePostDetail} 
        />
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
}

export default AppWrapper;