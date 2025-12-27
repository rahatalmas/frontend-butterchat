import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw, Trash2, Plus, Clock, MapPin, User } from 'lucide-react';
import { useAiSocket } from '../../provider/ai-socket-provider';

const CalendarPage = () => {
  const { messages, sendMessage, connected } = useAiSocket();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [input, setInput] = useState('');
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const messagesEndRef = useRef(null);

  // Sample appointments data
  const appointments = {
    '2024-12-10': [
      { id: 1, time: '09:00', client: 'John Smith', service: 'Business Consultation', status: 'confirmed' },
      { id: 2, time: '11:30', client: 'Sarah Johnson', service: 'Strategy Meeting', status: 'confirmed' },
      { id: 3, time: '14:00', client: 'Mike Davis', service: 'Product Demo', status: 'pending' }
    ],
    '2024-12-12': [
      { id: 4, time: '10:00', client: 'Emily Brown', service: 'Project Review', status: 'confirmed' }
    ],
    '2024-12-15': [
      { id: 5, time: '15:00', client: 'David Wilson', service: 'Client Onboarding', status: 'confirmed' },
      { id: 6, time: '16:30', client: 'Lisa Anderson', service: 'Follow-up Call', status: 'confirmed' }
    ]
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments[dateStr] || [];
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const previousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const isSelected = (day) => {
    return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const selectedAppointments = getAppointmentsForDate(selectedDate);

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

  return (
    <div className="flex h-full bg-white dark:bg-gray-900">


      {/* Right Side - Chat Interface */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Appointment Assistant
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ask me about your schedule or manage appointments
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredMessage(index)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gray-200 dark:bg-gray-800 ml-auto max-w-xl'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Sparkles size={10} className="text-white" />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">AI Assistant</span>
                    </div>
                  )}

                  <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {message.content}
                  </div>
                </div>

                <div className={`flex items-center gap-1 mt-1.5 transition-opacity ${
                  hoveredMessage === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button
                    onClick={() => handleCopy(message.content)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                  >
                    <Copy size={14} />
                  </button>
                  {message.role === 'assistant' && (
                    <>
                      <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400">
                        <ThumbsUp size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400">
                        <ThumbsDown size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400">
                        <RotateCcw size={14} />
                      </button>
                    </>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus-within:border-emerald-500 dark:focus-within:border-emerald-500 transition-all bg-white dark:bg-gray-800">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about appointments..."
                className="flex-1 px-1 py-1 text-sm focus:outline-none resize-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                rows="1"
                style={{ minHeight: '24px', maxHeight: '120px' }}
                disabled={!connected}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || !connected}
                className={`rounded-lg p-2 transition-all ${
                  input.trim() && connected
                    ? 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>


            {/* Left Sidebar - Calendar & Appointments */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        {/* Mini Calendar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {monthNames[month]} {year}
            </h3>
            <div className="flex gap-1">
              <button
                onClick={previousMonth}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <ChevronLeft size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs font-medium text-gray-500 dark:text-gray-500 py-1">
                {day}
              </div>
            ))}

            {[...Array(startingDayOfWeek)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const date = new Date(year, month, day);
              const hasAppointments = getAppointmentsForDate(date).length > 0;

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square rounded-md text-xs font-medium transition-all flex items-center justify-center relative ${
                    isToday(day)
                      ? 'bg-emerald-500 text-white'
                      : isSelected(day)
                      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {day}
                  {hasAppointments && !isToday(day) && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appointments List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </h3>
              <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Plus size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {selectedAppointments.length > 0 ? (
              <div className="space-y-2">
                {selectedAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors cursor-pointer border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {apt.time}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        apt.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-0.5">
                      {apt.client}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {apt.service}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2">
                  <Clock size={20} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">No appointments</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;