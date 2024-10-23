import React, { useState } from 'react';
import { User, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function UserProfile() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Profile update logic will be implemented here
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Profile'}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm border border-gray-200">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentUser?.displayName || 'Set your name'}
              </h2>
              <p className="text-gray-500">{currentUser?.email}</p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-md hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 text-purple-500 hover:text-purple-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}