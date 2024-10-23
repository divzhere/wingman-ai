import React, { useState } from 'react';
import { Heart, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { currentUser, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="border-b bg-gradient-to-r from-rose-50 to-purple-50 p-4">
      <div className="mx-auto max-w-3xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-rose-400 to-purple-400 p-2 rounded-lg">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Wingman AI
          </h1>
        </div>
        <nav className="hidden sm:flex items-center gap-4">
          <button className="text-gray-600 hover:text-purple-500 transition-colors">
            Profile Review
          </button>
          <button className="text-gray-600 hover:text-purple-500 transition-colors">
            Pickup Lines
          </button>
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-gradient-to-r from-rose-400 to-purple-400 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          )}
        </nav>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}