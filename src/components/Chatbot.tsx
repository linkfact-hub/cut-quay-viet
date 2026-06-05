import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StoreInfo } from '../types';
import { chatAI } from '../lib/api';                         // ← THÊM MỚI

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot({ storeInfo, onOpenMember }: { storeInfo: StoreInfo, onOpenMember: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Xin chào! Tôi là Cút Bot. Bạn cần hỏi gì về ${storeInfo['Tên cửa hàng']} không?` }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);        // ← THÊM MỚI
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // ← HÀM NÀY ĐÃ ĐƯỢC SỬA: gọi API thật, có loading/typing state
  const handleSend = async () => {
    if (!inputVal.trim() || isLoading) return;

    const newMsg: Message = { role: 'user', content: inputVal };
    const allMessages = [...messages, newMsg];

    setMessages(allMessages);
    setInputVal('');
    setIsLoading(true);

    try {
      const result = await chatAI(allMessages);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.reply || 'Xin lỗi, mình không hiểu. Bạn thử hỏi lại nhé!'
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Mình đang bận xíu, bạn thử lại sau nhé! 🙏'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = ["Giá cút quay?", "Ship bao lâu?", "Đăng ký hội viên"];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-gold-500 to-amber-700 hover:from-gold-400 hover:to-gold-600 text-bg-dark rounded-full p-4 shadow-[0_0_20px_rgba(200,146,42,0.4)] transition-transform hover:scale-110 active:scale-95"
      >
        <Bot className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-surface-dark border border-gold-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gold-500/20 bg-bg-dark flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-500 border border-gold-500/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-cream-50 font-display">Cút Bot</h4>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cream-200/50 hover:text-gold-500 transition-colors p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner Hội viên */}
            <div className="bg-gradient-to-r from-crimson-800/80 to-amber-900/80 px-4 py-2 border-b border-gold-500/10 flex justify-between items-center">
              <span className="text-xs text-cream-100 font-medium whitespace-nowrap">Đăng ký để nhận ưu đãi!</span>
              <button onClick={onOpenMember} className="bg-gold-500 text-bg-dark text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                🔥 Đăng ký
              </button>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] bg-opacity-5 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/50 to-bg-dark/50 pointer-events-none" />
              <div className="relative z-10 w-full space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-gold-500 text-bg-dark border border-gold-500 rounded-tr-sm' : 'bg-bg-dark text-cream-100 border border-gold-500/20 rounded-tl-sm'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {/* ← TYPING DOTS – hiện khi đang chờ AI trả lời */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-bg-dark border border-gold-500/20 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto hide-scrollbar border-t border-gold-500/5 bg-surface-dark">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => setInputVal(s)} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-bg-dark border border-gold-500/20 text-xs text-cream-200 hover:border-gold-500 hover:text-gold-500 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="p-3 border-t border-gold-500/20 bg-bg-dark flex items-center gap-2">
              <input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-surface-dark border border-gold-500/20 rounded-full px-4 py-2 text-sm text-cream-100 placeholder-cream-200/40 focus:outline-none focus:border-gold-500/50 disabled:opacity-60"
                placeholder={isLoading ? 'Đang trả lời...' : 'Gửi tin nhắn...'}
              />
              {/* ← disabled cả khi isLoading */}
              <button
                type="submit"
                disabled={!inputVal.trim() || isLoading}
                className="p-2 rounded-full bg-gold-500 text-bg-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-400 transition-colors shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
