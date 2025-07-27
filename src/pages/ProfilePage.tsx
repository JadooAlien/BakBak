import React from 'react';
import { Settings, Moon, Sun, LogOut, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { EchoMeter } from '../components/EchoMeter';

export const ProfilePage: React.FC = () => {
  const { currentUser } = useApp();
  const { theme, toggleTheme } = useTheme();

  if (!currentUser) {
    return (
      <div className="min-h-screen pb-20 pt-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="heading-2 mb-4">Sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-6 page-transition">
      <div className="container">
        {/* Profile Header */}
        <div className="card mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.displayName}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h2 className="heading-1">{currentUser.displayName}</h2>
              <p className="caption">@{currentUser.username}</p>
            </div>
            <button className="btn-ghost p-2 min-h-8 min-w-8">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <p className="body-text mb-4">{currentUser.bio}</p>

          {/* Stats */}
          <div className="flex justify-around text-center mb-4">
            <div>
              <p className="heading-2">{currentUser.followers.toLocaleString()}</p>
              <p className="small-text">Followers</p>
            </div>
            <div>
              <p className="heading-2">{currentUser.following.toLocaleString()}</p>
              <p className="small-text">Following</p>
            </div>
            <div>
              <p className="heading-2">{currentUser.echoScore.toLocaleString()}</p>
              <p className="small-text">EchoScore</p>
            </div>
          </div>

          {/* Echo Score Meter */}
          <div className="mb-4">
            <EchoMeter score={currentUser.echoScore} size="lg" />
          </div>

          {/* Badges */}
          {currentUser.badges.length > 0 && (
            <div>
              <h3 className="heading-3 mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center space-x-2 surface px-3 py-1 rounded-full"
                  >
                    <span>{badge.icon}</span>
                    <span className="small-text">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="card mb-6">
          <h3 className="heading-3 mb-4">Settings</h3>
          
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 btn-ghost rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span className="body-text">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <div
              className={`w-12 h-6 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-white' : 'surface border border-custom'
              }`}
            >
              <div
                className={`w-5 h-5 bg-black rounded-full shadow-md transform transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}
              />
            </div>
          </button>
        </div>

        {/* Account Actions */}
        <div className="card">
          <button className="w-full flex items-center space-x-3 p-4 text-red-500 btn-ghost rounded-lg">
            <LogOut className="w-4 h-4" />
            <span className="body-text">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};