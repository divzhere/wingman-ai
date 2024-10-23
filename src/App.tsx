import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ErrorMessage } from './components/ErrorMessage';
import { getChatCompletion } from './lib/openai';
import { AuthProvider } from './contexts/AuthContext';
import type { Message } from './types';

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Hey there! I'm your Wingman AI, ready to help you navigate the dating scene. Whether you need help crafting the perfect message, reviewing your profile, or just want some dating advice, I've got your back! What can I help you with today?",
  isBot: true,
  suggestions: [
    "Help me write a message",
    "Review my dating profile",
    "Give me pickup lines",
    "Dating advice needed"
  ]
};

function App() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (message: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getChatCompletion(message);
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        suggestions: [
          "Tell me more",
          "Try another approach",
          "Get more specific"
        ]
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <AuthProvider>
      <div className="flex h-screen flex-col bg-gray-50">
        <Header />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl">
            <div className="divide-y divide-gray-100">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  isBot={message.isBot}
                  message={message.text}
                  type={message.type}
                  suggestions={message.suggestions}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}
              {isLoading && (
                <div className="p-6 flex items-center text-gray-500">
                  <div className="animate-pulse flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  </div>
                </div>
              )}
              {error && (
                <div className="p-4">
                  <ErrorMessage message={error} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="sticky bottom-0">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;