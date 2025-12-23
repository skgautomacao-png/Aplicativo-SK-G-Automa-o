
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  const errorMsg = "Erro Crítico: Elemento root não encontrado no DOM.";
  console.error(errorMsg);
  document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;"><h1>${errorMsg}</h1></div>`;
  throw new Error(errorMsg);
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Erro na renderização do React:", error);
  document.body.innerHTML = `
    <div style="padding: 40px; color: #b11818; font-family: sans-serif; background: #fff5f5; height: 100vh;">
      <h1 style="font-size: 24px; margin-bottom: 16px;">⚠️ Erro de Inicialização (Engenharia SK-G)</h1>
      <p style="font-size: 16px; color: #4a5568;">Ocorreu um erro ao carregar a aplicação. Detalhes técnicos:</p>
      <pre style="background: #edf2f7; padding: 15px; border-radius: 8px; overflow: auto; margin-top: 20px;">${error instanceof Error ? error.stack : String(error)}</pre>
      <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #b11818; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Tentar Recarregar
      </button>
    </div>
  `;
}
