import React from 'react';
import { Heart, User, Sparkles } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  isBot: boolean;
  message: string;
  type?: Message['type'];
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export function ChatMessage({ isBot, message, type, suggestions, onSuggestionClick }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-6 ${isBot ? 'bg-gradient-to-r from-rose-50 to-purple-50' : 'bg-white'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
        ${isBot ? 'bg-gradient-to-r from-rose-400 to-purple-400' : 'bg-gradient-to-r from-blue-400 to-teal-400'}`}>
        {isBot ? <Heart className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
      </div>
      <div className="flex-1">
        <div className="prose prose-slate max-w-none">
          {message}
        </div>
        {suggestions && suggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-200 
                  hover:border-purple-400 hover:bg-purple-50 transition-colors text-sm text-gray-700"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}