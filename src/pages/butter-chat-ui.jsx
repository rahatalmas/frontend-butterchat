import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Square, Sparkles, User, Bot } from 'lucide-react';

const ButterChatUI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm ButterChat AI. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: "I'm here to help! This is a demo response. In production, this would be connected to your AI backend.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black">
      {/* Header */}
      <div className="border-b border-zinc-800/50 bg-black/95 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
              <Sparkles className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-purple-400 rounded-full border-2 border-black shadow-lg shadow-purple-500/50 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              ButterChat AI
            </h2>
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
              Online • Always here to help
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="max-w-4xl mx-auto flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={` flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden ${
              message.type === 'bot'
                ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-violet-600 shadow-purple-500/50'
                : 'bg-gradient-to-br from-zinc-700 via-zinc-600 to-zinc-700 shadow-zinc-500/30'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent"></div>
              {message.type === 'bot' ? (
                <Bot className="w-5 h-5 text-white relative z-10 drop-shadow-md" />
              ) : (
                <User className="w-5 h-5 text-white relative z-10 drop-shadow-md" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`flex flex-col max-w-[55%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.type === 'bot'
                    ? 'bg-gradient-to-br from-purple-950/50 via-purple-900/40 to-violet-950/50 border border-purple-800/30 text-white'
                    : 'bg-gradient-to-br from-purple-900/30 via-purple-800/30 to-violet-900/30 border border-purple-700/40 text-white'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1 px-2">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent"></div>
              <Bot className="w-5 h-5 text-white relative z-10 drop-shadow-md" />
            </div>
            <div className="bg-gradient-to-br from-purple-950/50 via-purple-900/40 to-violet-950/50 border border-purple-800/30 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce shadow-sm shadow-purple-500/50" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce shadow-sm shadow-purple-400/50" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce shadow-sm shadow-violet-500/50" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-zinc-800/50 bg-black px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Suggestions (optional) */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 custom-scrollbar">
            {['Explain quantum computing', 'Write a story', 'Help with code', 'Business advice'].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setInput(suggestion)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-gray-300 text-sm rounded-lg border border-zinc-800/50 whitespace-nowrap transition"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative bg-zinc-900 border border-zinc-800/50 rounded-2xl focus-within:border-emerald-500/50 transition-colors">
            <div className="flex items-end gap-2 p-3">
              {/* Attachment Button */}
              <button className="flex-shrink-0 p-2.5 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all duration-200 hover:shadow-md">
                <Paperclip size={20} />
              </button>

              {/* Text Input */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 resize-none focus:outline-none max-h-32 py-2"
                style={{ minHeight: '24px' }}
              />

              {/* Voice/Send Button */}
              {input.trim() ? (
                <button
                  onClick={handleSend}
                  className="flex-shrink-0 p-2.5 bg-gradient-to-br from-purple-600 via-purple-500 to-violet-600 hover:from-purple-700 hover:via-purple-600 hover:to-violet-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                  <Send size={20} className="relative z-10 drop-shadow-md" />
                </button>
              ) : (
                <button
                  onClick={toggleRecording}
                  className={`flex-shrink-0 p-2.5 rounded-xl transition-all duration-200 relative overflow-hidden ${
                    isRecording
                      ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white animate-pulse shadow-lg shadow-red-500/50'
                      : 'text-gray-400 hover:text-white hover:bg-zinc-800 hover:shadow-md'
                  }`}
                >
                  {isRecording && <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>}
                  {isRecording ? <Square size={20} className="relative z-10" /> : <Mic size={20} />}
                </button>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <p className="text-xs text-gray-600 text-center mt-3">
            ButterChat AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>
    </div>
  );
};

export default ButterChatUI;