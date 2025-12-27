import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, TrendingUp, Coffee, Copy, Edit, Save, ThumbsUp, ThumbsDown, RotateCcw, Trash2, Wifi, WifiOff } from 'lucide-react';
import { useAiSocket } from '../provider/ai-socket-provider';

const TestButterChatUI = () => {
  const { messages, sendMessage, connected, isConnecting, connectionError, reconnect, clearMessages } = useAiSocket();
  const [input, setInput] = useState('');
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Image uploaded:', file);
    }
  };

  const isAssistantTyping = messages.length > 0 && 
    messages[messages.length - 1]?.role === 'AI' && 
    (!messages[messages.length - 1]?.reply || messages[messages.length - 1]?.reply === '');

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Connection Status Bar */}
      {/* <div className={`px-4 py-2 text-sm flex items-center justify-between transition-colors ${
        connected ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 
        isConnecting ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' : 
        'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        <div className="flex items-center gap-2">
          {connected ? <Wifi size={16} /> : <WifiOff size={16} />}
          <span>
            {connected ? 'Connected' : 
             isConnecting ? 'Connecting...' : 
             connectionError || 'Disconnected'}
          </span>
        </div>
        <div className="flex gap-2">
          {!connected && !isConnecting && (
            <button 
              onClick={reconnect}
              className="px-3 py-1 bg-white dark:bg-gray-800 rounded text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Reconnect
            </button>
          )}
          {messages.length > 0 && (
            <button 
              onClick={clearMessages}
              className="px-3 py-1 bg-white dark:bg-gray-800 rounded text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div> */}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-1">
          {/* Welcome Section */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 flex items-center justify-center mb-6 shadow-xl">
                <Sparkles size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Good Morning, Rahat Almas!</h1>
              <p className="text-base text-gray-500 dark:text-gray-400 mb-8">How can Butter AI help you today?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {[
                  { icon: Coffee, title: "Plan my day", desc: "Organize tasks efficiently" },
                  { icon: Coffee, title: "Quick summary", desc: "Summarize documents" }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(item.title)}
                    className="p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all text-left group bg-white dark:bg-gray-800"
                  >
                    <item.icon size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mb-2" />
                    <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">{item.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredMessage(index)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              {/* Message Content */}
              <div
                className={`rounded-2xl px-5 py-3 ${
                  message.role === 'user'
                    ? 'bg-gray-100 dark:bg-gray-800 ml-auto'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {message.role === 'AI' && !isAssistantTyping && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Sparkles size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Butter AI</span>
                  </div>
                )}

                <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200 text-sm">
                  {message.image && (
                    <img 
                      src={message.image} 
                      alt="Uploaded content" 
                      className="rounded-xl max-w-md mb-3 border border-gray-200 dark:border-gray-700"
                    />
                  )}
                  {(message.reply) ? (
                    (message.reply).split('\n').map((line, i) => {
                      if (line.startsWith('📈') || line.startsWith('🚗') || line.startsWith('✈️') || line.startsWith('🤖') || line.startsWith('💼')) {
                        return (
                          <div key={i} className="my-1 pl-3 border-l-2 border-emerald-300 dark:border-emerald-600">
                            <p className="text-sm leading-relaxed">{line}</p>
                          </div>
                        );
                      }
                      return line ? <p key={i} className="mb-1 leading-relaxed">{line}</p> : <br key={i} />;
                    })
                  ) : 
                  
              <div className="group relative">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Sparkles size={12} className="text-white animate-pulse" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Butter AI</span>
                </div>
                
                {/* Beautiful Loader */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Thinking...</span>
                  </div>
                  
                  {/* Animated bars */}
                  <div className="space-y-2">
                    <div className="h-2 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 dark:from-emerald-800 dark:via-emerald-700 dark:to-emerald-800 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 dark:from-teal-800 dark:via-teal-700 dark:to-teal-800 rounded-full w-3/4 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-200 dark:from-cyan-800 dark:via-cyan-700 dark:to-cyan-800 rounded-full w-5/6 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex items-center gap-1 mt-2 transition-opacity duration-200 ${
                hoveredMessage === index ? 'opacity-100' : 'opacity-0'
              }`}>
                <button
                  onClick={() => handleCopy(message.reply)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
                
                {message.role === 'AI' && (
                  <>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      title="Good response"
                    >
                      <ThumbsUp size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      title="Bad response"
                    >
                      <ThumbsDown size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      title="Regenerate"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </>
                )}

                {message.role === 'user' && (
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                )}

                <button
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  title="Save"
                >
                  <Save size={16} />
                </button>
                
                <button
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}



          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="flex items-center gap-2 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-3xl focus-within:border-emerald-500 dark:focus-within:border-emerald-500 focus-within:shadow-lg transition-all bg-white dark:bg-gray-800">
              {/* Image Upload Button */}
              <label className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex-shrink-0">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={!connected}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600 dark:text-gray-400">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
                  <polyline points="21 15 16 10 5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>

              {/* Textarea */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={connected ? "Message Butter AI..." : "Connecting..."}
                className="flex-1 px-2 py-2 text-sm focus:outline-none resize-none scrollbar-hide bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                rows="1"
                style={{ minHeight: '28px', maxHeight: '120px' }}
                disabled={!connected}
              />

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!input.trim() || !connected}
                className={`rounded-lg p-2 transition-all flex-shrink-0 ${
                  input.trim() && connected
                    ? 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400 dark:text-gray-500">
            <span>Butter AI can make mistakes. Check important info.</span>
          </div>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
};

export default TestButterChatUI;