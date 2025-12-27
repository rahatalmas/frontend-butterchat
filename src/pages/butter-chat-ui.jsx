import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, TrendingUp, Coffee, Copy, Edit, Save, ThumbsUp, ThumbsDown, RotateCcw, Trash2 } from 'lucide-react';

const ButterChatUI = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey Steve! ☕ Grab your morning coffee and let's dive into how your business is doing today.\n\nHere's what's happening in the business world:\n\n🚗 **Retail Shifts**: McDonald's reinforcing accountability on value with franchisees as consumer spending patterns evolve. Small business owners should watch pricing strategies closely.\n\n✈️ **Travel Updates**: Airlines adjusting elite status programs - Southwest received an $11M credit from DOT for operational improvements, showing regulatory focus on customer experience.\n\n🤖 **AI Revolution**: NVIDIA's H200 chips getting partial export clearance to China under"
    }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Great question! Based on your business data, I recommend focusing on customer retention this quarter. Your repeat customer rate has increased by 15%, which is excellent. Let's build on that momentum by implementing a personalized email campaign targeting customers who haven't purchased in 30+ days.",
        "I've analyzed your recent sales trends. Your top-performing products are showing consistent growth, especially in the afternoon hours between 2-4 PM. Consider running targeted promotions during slower morning periods to balance out daily revenue streams.",
        "Looking at your conversation data, customers are asking more questions about product customization. This presents a great opportunity! I suggest creating a simple customization tool on your website - it could increase conversion rates by 20-30% based on similar businesses.",
        "Your analytics show strong engagement on social media, particularly Instagram. Your audience is most active on Tuesdays and Thursdays between 6-8 PM. Let's schedule your key announcements and promotions during these peak windows for maximum impact.",
        "I notice your appointment booking rate has improved by 23% since implementing the new calendar system. To build on this success, consider offering time-based incentives - like 10% off for appointments booked during off-peak hours."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredMessage(index)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              {/* Message Content */}
              <div
                className={`rounded-2xl px-6 py-4 ${
                  message.role === 'user'
                    ? 'bg-gray-100 ml-auto'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {message.role === 'assistant' && index === 0 && (
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Coffee size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Good Morning, Steve!</span>
                  </div>
                )}
                
                {message.role === 'assistant' && index !== 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-600">Butter AI</span>
                  </div>
                )}

                <div className="prose prose-sm max-w-none text-gray-800">
                  {message.content.split('\n').map((line, i) => {
                    if (line.startsWith('📈') || line.startsWith('🚗') || line.startsWith('✈️') || line.startsWith('🤖') || line.startsWith('💼')) {
                      return (
                        <div key={i} className="my-2 pl-3 border-l-2 border-blue-300">
                          <p className="text-sm leading-relaxed">{line}</p>
                        </div>
                      );
                    }
                    return line ? <p key={i} className="mb-2 leading-relaxed">{line}</p> : <br key={i} />;
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex items-center gap-1 mt-2 transition-opacity duration-200 ${
                hoveredMessage === index ? 'opacity-100' : 'opacity-0'
              }`}>
                <button
                  onClick={() => handleCopy(message.content)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
                
                {message.role === 'assistant' && (
                  <>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                      title="Good response"
                    >
                      <ThumbsUp size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                      title="Bad response"
                    >
                      <ThumbsDown size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                      title="Regenerate"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </>
                )}

                {message.role === 'user' && (
                  <>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                  </>
                )}

                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                  title="Save"
                >
                  <Save size={16} />
                </button>
                
                <button
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-600 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="group relative">
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">Butter AI</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
                <div className="mt-3 relative w-40 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Butter AI..."
                className="w-full px-5 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none scrollbar-hide shadow-sm"
                rows="1"
                style={{ minHeight: '56px', maxHeight: '200px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`rounded-full transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                input.trim() && !isTyping
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              style={{ height: '56px', width: '56px' }}
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
            <Sparkles size={12} />
            <span>...Butter AI can make mistakes...</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        textarea {
          field-sizing: content;
        }
      `}</style>
    </div>
  );
};

export default ButterChatUI;