import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, RefreshCw, MessageSquareQuote, CheckCircle, ExternalLink } from 'lucide-react';
import { ChatMessage, ApiChatResponse, Product } from '../types';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessageText?: string;
  clearInitialMessage: () => void;
  products: Product[];
}

export default function Chatbot({
  isOpen,
  onClose,
  initialMessageText = '',
  clearInitialMessage,
  products = []
}: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Olá! Seja muito bem-vindo à **Agropecuária Fênix**, localizada na **Ceilândia P Norte - DF**. Sou o **Fênix Bot**, seu assistente virtual de atendimento comercial.\n\nEstou disponível para tirar suas dúvidas técnicas sobre dosagens de medicamentos (Simparic, NexGard), marcas de rações premium, produtos de avicultura ou te ajudar a montar o seu carrinho de compras para entrega rápida.\n\n*Nosso horário de atendimento físico é das 08:00 às 20:00 (Segunda a Sábado) e das 08:00 às 13:00 (Domingos).* Como posso ajudar você e o seu animal de estimação hoje?',
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<{ active: boolean; productSummary: string }>({
    active: false,
    productSummary: ''
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest chats
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initial queries from cards or buttons
  useEffect(() => {
    if (isOpen && initialMessageText.trim() !== '') {
      handleSendMessage(initialMessageText);
      clearInitialMessage();
    }
  }, [isOpen, initialMessageText]);

  // Sizable prompt suggestion chips
  const suggestionChips = [
    { label: '🥩 Rações a Granel', text: 'Quais marcas e valores de rações a granel vocês possuem?' },
    { label: '💊 Simparic e Pesos', text: 'Qual o valor do Simparic para cães de 10 a 20kg?' },
    { label: '🐦 Gaiolas Ornamentais', text: 'Vocês têm gaiolas de luxo prontas em estoque?' },
    { label: '🌱 Kit sementes horta', text: 'Como funciona o Kit de sementes para horta em casa?' }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Create user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.slice(-10).map(m => ({ sender: m.sender, text: m.text })), // send short context
          userMessage: textToSend,
          products: (products || []).map(({ image, ...rest }) => rest) // strip image field to prevent large payload and reduce tokens
        })
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do assistente virtual');
      }

      const data: ApiChatResponse = await response.json();

      // Create bot response
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply,
        timestamp: new Date(),
        readyForCheckout: data.readyForCheckout,
        productToCheckout: data.productToCheckout
      };

      setMessages(prev => [...prev, botMsg]);

      // If buyer intent is detected, unlock checkout alerts
      if (data.readyForCheckout) {
        setCheckoutResult({
          active: true,
          productSummary: data.productToCheckout || 'Linha Premium Agropecuária Fênix'
        });
      }

    } catch (e: any) {
      console.error(e);
      // Nice user fallback
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'Ops! Tive um contratempo de conexão agora. Mas não se preocupe! Você pode me mandar mensagem no **WhatsApp (61) 3459-9455** para que nossa equipe te atenda no ato!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatWhatsAppCheckoutText = () => {
    let text = `Olá! Estava conversando com seu Atendente Virtual da Agropecuária Fênix no site e confirmei meu fechamento!\n\n`;
    text += `📦 *PEDIDO CONFIRMADO:*\n${checkoutResult.productSummary}\n\n`;
    text += `📍 Gostaria de repassar os dados para faturar e agendar a entrega local por favor. Obrigado!`;
    return `https://wa.me/556134599455?text=${encodeURIComponent(text)}`;
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Olá! Conversa reiniciada. Sou o **Fênix Bot**. Posso tirar dúvidas sobre ração, dosagens de remédio para pulgas ou preparar seu pedido. Do que seu pet está precisando agora?',
        timestamp: new Date()
      }
    ]);
    setCheckoutResult({ active: false, productSummary: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="chat-popup-backdrop">
      {/* Dark shield */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-50 shadow-2xl flex flex-col h-full border-l border-gray-100 animate-in slide-in-from-right duration-250" id="chat-popup-panel">
          
          {/* Panel Header */}
          <div className="px-6 py-4.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white flex items-center justify-between border-b-4 border-yellow-400">
            <div className="flex items-center gap-2.5">
              <div className="bg-white p-1 rounded-full relative shadow-inner">
                <Bot className="w-6 h-6 text-red-700" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-400 border border-white rounded-full animate-ping"></span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold flex items-center gap-1">
                  Assistente Fênix Bot
                  <span className="bg-yellow-400 text-red-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">IA</span>
                </h3>
                <p className="text-[10px] text-red-100 font-mono tracking-wide">● ONLINE • ATENDIMENTO 24H</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={handleResetChat} 
                className="text-red-100 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                title="Limpar Conversa"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="text-red-100 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Minimizar conversa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages list block */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-2 w-full max-w-xs sm:max-w-md ${
                  msg.sender === 'user' ? 'ml-auto justify-end' : 'justify-start'
                }`}
              >
                {/* Bot Profile representation */}
                {msg.sender === 'bot' && (
                  <div className="bg-red-100 p-1.5 rounded-full h-8 w-8 flex items-center justify-center shrink-0 border shadow-3xs select-none">
                    🦜
                  </div>
                )}

                {/* Bubble message */}
                <div 
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-tr-xs'
                      : 'bg-white border border-gray-150 text-gray-800 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                  <span className={`block text-[9px] mt-1 text-right select-none ${
                    msg.sender === 'user' ? 'text-red-100' : 'text-gray-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Thinking Spinner */}
            {isLoading && (
              <div className="flex gap-2 justify-start items-center">
                <div className="bg-red-100 p-1.5 rounded-full h-8 w-8 flex items-center justify-center animate-bounce">
                  🦜
                </div>
                <div className="bg-gray-200 text-gray-500 font-semibold px-4 py-2.5 rounded-2xl text-xs animate-pulse">
                  Fênix Bot está pensando em uma recomendação...
                </div>
              </div>
            )}

            {/* Invisible anchor for scrolling */}
            <div ref={chatEndRef}></div>
          </div>

          {/* Quick chip responses (Only visible if not loading or when conversation starts) */}
          {!isLoading && messages.length <= 2 && (
            <div className="p-3 bg-white border-t border-gray-100 space-y-1.5 select-none shrink-0 overflow-x-auto whitespace-nowrap">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-1 mb-1">Dúvidas Frequentes:</p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.text)}
                    className="bg-slate-100 hover:bg-red-50 hover:text-red-700 text-gray-600 border border-gray-200 hover:border-red-200 rounded-full py-1.5 px-3 text-[11px] font-bold tracking-tight transition-all shrink-0"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. PASSAR PARA VENDA APOS CHEGAR NA COMPRA: Checkout Pop-up Alert inside chat */}
          {checkoutResult.active && (
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-t-4 border-yellow-500 p-4 shrink-0 animate-in slide-in-from-bottom duration-350 space-y-3 shadow-lg select-none">
              <div className="flex gap-2 items-start">
                <CheckCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-red-950 text-xs sm:text-sm">
                    Carrinho Pronto de Venda Detetado! 🛒
                  </h4>
                  <p className="text-[11px] text-red-900 leading-snug mt-1 font-medium">
                    Legal! Você escolheu e confirmou seu pedido com o nosso assistente virtual. Fale com os vendedores agora mesmo!
                  </p>
                </div>
              </div>
              <a
                href={formatWhatsAppCheckoutText()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-md hover:scale-101 border-2 border-white animation-bounce"
                id="btn-bot-whatsapp-checkout"
              >
                Concluir Pedido com WhatsApp: (61) 3459-9455
                <ExternalLink className="w-4 h-4 text-red-100" />
              </a>
            </div>
          )}

          {/* Text input area */}
          <div className="p-4 bg-white border-t border-gray-150">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(userInput);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Escreva sua pergunta ou pedido aqui..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isLoading}
                className="flex-grow bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-gray-800 disabled:opacity-50"
                id="input-chat-query"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isLoading}
                className="bg-red-600 hover:bg-red-700 active:scale-95 disabled:opacity-40 text-white p-3 rounded-xl shadow-md transition-all h-full"
                aria-label="Enviar mensagem"
                id="btn-send-chat"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-gray-400 text-center mt-2 font-mono">
              🔒 Agropecuária Fênix • DF • (61) 3459-9455
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
