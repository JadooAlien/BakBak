import React from 'react';
import { Settings, Moon, Sun, LogOut, Crown, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { EchoMeter } from '../components/EchoMeter';

export const ProfilePage: React.FC = () => {
  const { currentUser } = useApp();
  const { theme, toggleTheme } = useTheme();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 pt-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Sign in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 pt-4">
      <div className="max-w-md mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {currentUser.displayName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentUser.displayName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                @{currentUser.username}
              </p>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {currentUser.bio}
          </p>

          {/* Stats */}
          <div className="flex justify-around text-center mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentUser.followers.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentUser.following.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Following</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentUser.echoScore.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">EchoScore</p>
            </div>
          </div>

          {/* Echo Score Meter */}
          <div className="mb-4">
            <EchoMeter score={Math.min(100, currentUser.echoScore / 100)} size="lg" />
          </div>

          {/* Badges */}
          {currentUser.badges.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    <span>{badge.icon}</span>
                    <span className="font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Settings
            </h3>
            
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-gray-500" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-gray-900 dark:text-white">
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
          <button className="w-full flex items-center space-x-3 p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};