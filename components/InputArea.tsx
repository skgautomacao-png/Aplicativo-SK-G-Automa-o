
import React, { useState, useRef } from 'react';

interface InputAreaProps {
  onSendMessage: (text: string, image?: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if ((inputText.trim() || selectedImage) && !isLoading) {
      const imageData = selectedImage ? selectedImage.split(',')[1] : undefined;
      onSendMessage(inputText, imageData);
      setInputText('');
      setSelectedImage(null);
    }
  };

  return (
    <div className="bg-[#f8f9fa] pb-8 pt-2 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {selectedImage && (
          <div className="mb-4 flex items-center p-3 bg-white rounded-2xl shadow-sm border border-red-50 relative animate-in slide-in-from-bottom-4">
             <div className="relative group">
                <img src={selectedImage} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-gray-100 shadow-sm" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
             </div>
            <div className="ml-4 flex-1">
              <p className="text-xs font-black text-[#1a365d] uppercase tracking-wide">Produto Anexado</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">O sistema irá analisar a imagem para identificação técnica.</p>
            </div>
          </div>
        )}

        <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden p-1.5 transition-all focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500/50">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
            title="Anexar Foto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <input
            type="text"
            className="flex-1 px-4 py-2 text-gray-800 outline-none bg-transparent placeholder-gray-400 font-bold text-sm md:text-base"
            placeholder="Código SMC/Festo ou Modelo Camozzi..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />

          <button
            onClick={handleSend}
            disabled={(!inputText.trim() && !selectedImage) || isLoading}
            className={`flex items-center justify-center h-12 w-12 rounded-full transition-all duration-500 shrink-0 shadow-lg ${
              (!inputText.trim() && !selectedImage) || isLoading 
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' 
                : 'bg-[#b11818] text-white hover:bg-red-700 hover:shadow-red-200 active:scale-90'
            }`}
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </div>
        
        <p className="text-center mt-4 text-[9px] md:text-[10px] text-gray-400 font-black tracking-[0.3em] uppercase opacity-70">
          INTEGRIDADE TÉCNICA V9.0 - PROTOCOLO CAMOZZI OFICIAL
        </p>
      </div>
    </div>
  );
};

export default InputArea;
