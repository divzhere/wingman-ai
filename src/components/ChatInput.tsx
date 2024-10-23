import React, { useState } from 'react';
import { Send, Smile, Image, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4 items-end">
          <div className="flex-1 bg-gray-50 rounded-2xl">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask for dating advice, message suggestions, or profile tips..."
              rows={1}
              className="w-full resize-none rounded-2xl border-0 bg-transparent p-4 focus:ring-2 focus:ring-purple-200"
              style={{ minHeight: '60px' }}
              disabled={disabled}
            />
            <div className="flex items-center gap-2 px-4 pb-3">
              <button type="button" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button type="button" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button type="button" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="rounded-full bg-gradient-to-r from-rose-400 to-purple-400 p-4 text-white 
              transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
}