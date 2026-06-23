import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, X, MessageSquare, ExternalLink } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenChatWithQuery: (text: string) => void;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenChatWithQuery
}: CartProps) {
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Formats WhatsApp URL with direct encoded message parameters in Portuguese
  const getWhatsAppLink = () => {
    let orderText = `Olá! Gostaria de fazer um pedido na *Agropecuária Fênix*:\n\n`;
    
    cart.forEach((item, index) => {
      orderText += `👉 *${item.quantity}x ${item.product.name}* (${item.product.unit})\n`;
      orderText += `   Subtotal: R$ ${(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n`;
    });

    orderText += `📈 *VALOR TOTAL: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*\n\n`;
    orderText += `📍 Por favor, gostaria de combinar as opções de entrega presencial ou retirada rápida no Distrito Federal. Obrigado!`;

    const encodedText = encodeURIComponent(orderText);
    return `https://wa.me/556134599455?text=${encodedText}`;
  };

  // Pre-formatting checkout for bot processing
  const handleTalkToBot = () => {
    let text = 'Olá Fênix Bot! Gostaria de fechar meu pedido contendo os seguintes itens do meu carrinho:\n';
    cart.forEach(item => {
      text += `- ${item.quantity}x ${item.product.name}\n`;
    });
    text += `Pode conferir e preparar meu link de finalização via WhatsApp?`;
    onOpenChatWithQuery(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="cart-drawer-backdrop">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-gray-100 animate-in slide-in-from-right duration-200" id="cart-drawer">
          
          {/* Cart Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white flex items-center justify-between border-b-4 border-yellow-400">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-yellow-400" />
              Meu Carrinho ({totalItems})
            </h3>
            <button
              onClick={onClose}
              className="text-red-100 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Fechar Carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items list */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <span className="text-6xl block">🛒❌</span>
                <h4 className="font-bold text-gray-800 text-base">Seu carrinho está vazio</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Vá na aba "Rações & Produtos", escolha seus itens favoritos e adicione-os aqui para concluir suas compras!
                </p>
                <button
                  onClick={onClose}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xs"
                >
                  Ver Catálogo de Produtos
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-start gap-4 p-3 bg-gray-50 border border-gray-150 rounded-xl"
                  id={`cart-item-${item.product.id}`}
                >
                  <div className="h-14 w-14 bg-white rounded-lg border shadow-xs flex items-center justify-center shrink-0 overflow-hidden select-none">
                    {item.product.image.startsWith('data:') || item.product.image.startsWith('http') || item.product.image.startsWith('/') ? (
                      <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">{item.product.image}</span>
                    )}
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <h5 className="font-bold text-gray-800 text-xs sm:text-sm leading-tight line-clamp-2">
                      {item.product.name}
                    </h5>
                    <p className="text-[10px] text-gray-400 font-mono">
                      {item.product.unit} • Unidade: R$ {item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md py-0.5 px-1.5 shadow-3xs scale-90 origin-left">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-gray-500 hover:text-black py-0.5 px-1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-gray-800 px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-gray-500 hover:text-black py-0.5 px-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-400 hover:text-red-600"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Pricing Summary and triggers */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 bg-slate-50 p-6 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Itens selecionados</span>
                  <span className="font-medium text-gray-700">{totalItems} unidades</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-800 pt-2 border-t border-gray-200">
                  <span>Valor Líquido total</span>
                  <span className="text-red-600 text-lg font-black font-mono">
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                
                {/* 1. Direct WhatsApp Handoff */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
                  id="btn-whatsapp-cart-checkout"
                >
                  Fechar Pedido via WhatsApp
                  <ExternalLink className="w-4 h-4 text-red-100" />
                </a>

                {/* 2. Process with the virtual assistant bot */}
                <button
                  onClick={handleTalkToBot}
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  id="btn-bot-cart-checkout"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950" />
                  Conferir com Fênix Bot
                </button>

                <p className="text-[10px] text-gray-400 text-center leading-relaxed pt-1 select-none">
                  🛵 Nossos pedidos são entregues super rápido na região da Ceilândia P Norte e vizinhanças, DF! Pagamento no ato da entrega (Pix, Cartão ou Dinheiro).
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
