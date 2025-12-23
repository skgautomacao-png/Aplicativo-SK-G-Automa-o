
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants.ts';

/**
 * Engenheiro Sênior: Refatoração para compatibilidade com Vite/Vercel.
 * Substituindo process.env por import.meta.env conforme solicitado para depuração de ambiente.
 */
const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;

// Log de depuração seguro (apenas 4 dígitos) para validar a injeção da variável no Vercel
console.log(`Iniciando chamada com a chave: ${apiKey ? apiKey.substring(0, 4) + '****' : 'não encontrada'}`);

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const sendMessageToGemini = async (message: string, base64Image?: string): Promise<string> => {
  try {
    const contents: any[] = [];
    const parts: any[] = [];

    // Suporte multimodal para identificação visual de produtos Camozzi/SMC/Festo
    if (base64Image) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      });
    }

    parts.push({ text: message || "Identifique este item e sugira o equivalente Camozzi." });
    
    contents.push({ parts });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
      },
    });

    return response.text || "Não foi possível gerar uma resposta técnica.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error?.message?.includes("Requested entity was not found")) {
      return "🔴 ALERTA DE SISTEMA: O modelo solicitado não está disponível ou a chave API é inválida para este recurso.";
    }
    return "🔴 ERRO TÉCNICO: Falha na comunicação com o servidor de Engenharia. Tente novamente em instantes.";
  }
};
