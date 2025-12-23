
import React from 'react';
import { SKG_LOGO_URL } from '../constants';

const Header: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <header className="bg-[#b11818] h-16 shadow-md flex items-center justify-between px-4 z-20 shrink-0">
      <div className="flex items-center space-x-3">
        <div className="bg-[#8b1212] p-1 rounded-md flex items-center justify-center border border-[#9b1515] shadow-inner">
          <img src={SKG_LOGO_URL} alt="SK-G Logo" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex flex-col -space-y-1">
          <h1 className="text-white font-black text-lg md:text-xl tracking-tight uppercase italic leading-none">
            CONSULTOR TÉCNICO
          </h1>
          <p className="text-white/90 text-[10px] md:text-[11px] uppercase font-bold tracking-tight">
            DISTRIBUIDOR AUTORIZADO CAMOZZI
          </p>
        </div>
      </div>
      
      <button 
        onClick={onReset}
        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
        title="Reiniciar Consultoria"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
