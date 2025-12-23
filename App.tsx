
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import ChatArea from './components/ChatArea.tsx';
import InputArea from './components/InputArea.tsx';
import { sendMessageToGemini } from './services/geminiService.ts';
import { Message, Sender } from './types.ts';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string, imageBase64?: string) => {
    if (!text.trim() && !imageBase64) return;

    const userMsg: Message = {
      role: Sender.User,
      text: text || "Análise de imagem solicitada.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(text, imageBase64);
      
      const botMsg: Message = {
        role: Sender.Model,
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        role: Sender.Model,
        text: "**ALERTA DE SISTEMA:** Falha na conexão com o servidor de Engenharia. Verifique sua conectividade.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Deseja reiniciar a sessão técnica? Todos os dados atuais serão perdidos.")) {
        setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] font-sans antialiased text-gray-900">
      <Header onReset={handleReset} />
      <main className="flex-1 overflow-hidden flex flex-col">
        <ChatArea messages={messages} isLoading={isLoading} />
      </main>
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
