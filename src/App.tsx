import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { FloatingActionButton } from './components/FloatingActionButton';
import { InstallPrompt } from './components/InstallPrompt';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PostPage } from './pages/PostPage';
import { AlertsPage } from './pages/AlertsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showPostModal, setShowPostModal] = useState(false);

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

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return <ExplorePage />;
      case 'alerts':
        return <AlertsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider>
      <AppProvider>
        <div className="app-container">
          <InstallPrompt />
          {renderPage()}
          <BottomNav 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
            unreadNotifications={2}
          />
          {activeTab === 'home' && (
            <FloatingActionButton onClick={() => setShowPostModal(true)} />
          )}
          {showPostModal && (
            <PostPage onClose={() => setShowPostModal(false)} />
          )}
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;