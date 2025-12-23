
import React, { useRef, useEffect } from 'react';
import { Message, Sender } from '../types.ts';
import MarkdownRenderer from './MarkdownRenderer.tsx';
import { MASCOT_URL } from '../constants.ts';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-b from-[#fdfdfd] to-[#f5f7f9] space-y-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto animate-in fade-in duration-700">
          <div className="relative mb-10">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center p-6 border-4 border-white ring-1 ring-gray-100 relative z-10 overflow-hidden">
               <img src={MASCOT_URL} alt="Mascote SK-G" className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="absolute -inset-4 bg-red-100/30 rounded-full blur-2xl z-0"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-[#1e293b] mb-4 italic tracking-tight uppercase">
            ENGENHARIA SK-G
          </h2>
          <p className="text-gray-500 text-lg md:text-2xl leading-relaxed font-semibold px-4">
            Transcodificação competitiva <span className="text-[#b11818] font-black">SMC/Festo</span> e suporte técnico oficial <span className="text-[#1a365d] font-black underline decoration-2 underline-offset-4">Camozzi</span>.
          </p>
        </div>
      )}

      {messages.length > 0 && messages.map((msg, index) => (
        <div
          key={index}
          className={`flex w-full ${msg.role === Sender.User ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
        >
          <div
            className={`max-w-[95%] md:max-w-[85%] rounded-3xl p-6 shadow-sm border ${
              msg.role === Sender.User
                ? 'bg-white border-gray-200 text-gray-800'
                : 'bg-white border-gray-100'
            }`}
          >
            {msg.role === Sender.User ? (
              <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
            ) : (
              <MarkdownRenderer content={msg.text} />
            )}
            <div className="text-[10px] mt-4 uppercase tracking-[0.2em] text-gray-400 font-black border-t pt-2 flex items-center space-x-2">
              <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • PROTOCOLO ATIVO</span>
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start w-full ml-2">
          <div className="bg-white rounded-full px-6 py-3 shadow-sm flex items-center space-x-2 border border-gray-100">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};

export default ChatArea;
