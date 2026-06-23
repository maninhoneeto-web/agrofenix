import React from 'react';
import { Bird, ShieldAlert, ShoppingCart, MessageSquare, Settings, Check, Phone, MapPin, Activity } from 'lucide-react';
import { CartItem } from '../types';
import FenixLogo from './FenixLogo';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: CartItem[];
  setCartOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cart,
  setCartOpen,
  setChatOpen
}: NavbarProps) {
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <header className="sticky top-0 z-40 bg-yellow-400 text-slate-950 shadow-xl border-b-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo & Brand title */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
            id="nav-logo-container"
          >
            <div className="bg-white p-1.5 rounded-xl border-2 border-yellow-500 hover:border-red-500 transition-all shadow-md">
              <FenixLogo size="sm" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-red-950 flex items-center font-sans">
                AGROPECUÁRIA &nbsp;<span className="text-red-605 text-red-600 font-extrabold tracking-normal transition-colors group-hover:text-red-800">FÊNIX</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-slate-800 font-bold font-mono tracking-wider uppercase flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-red-600 shrink-0" /> Ceilândia - DF • Alta Performance
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2 items-center" id="nav-desktop-links">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-extrabold transition-all ${
                currentTab === 'home'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                  : 'text-slate-900 hover:bg-yellow-500 hover:text-slate-950'
              }`}
              id="tab-btn-home"
            >
              Início
            </button>
            <button
              onClick={() => setCurrentTab('catalog')}
              className={`px-3 py-2 rounded-lg text-sm font-extrabold transition-all ${
                currentTab === 'catalog'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                  : 'text-slate-900 hover:bg-yellow-500 hover:text-slate-950'
              }`}
              id="tab-btn-catalog"
            >
              Rações & Produtos
            </button>
            <button
              onClick={() => setCurrentTab('farmacia')}
              className={`px-3 py-2 rounded-lg text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                currentTab === 'farmacia'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                  : 'text-slate-900 hover:bg-yellow-500 hover:text-slate-950'
              }`}
              id="tab-btn-farmacia"
            >
              <Activity className="w-4 h-4 text-red-600" />
              Farmácia Pet
            </button>
            <button
              onClick={() => setCurrentTab('avicultura')}
              className={`px-3 py-2 rounded-lg text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                currentTab === 'avicultura'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                  : 'text-slate-900 hover:bg-yellow-500 hover:text-slate-950'
              }`}
              id="tab-btn-avicultura"
            >
              <Bird className="w-4 h-4 text-red-600" />
              Avicultura
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${
                currentTab === 'admin'
                  ? 'bg-red-750 text-white font-black shadow-lg shadow-red-900/40'
                  : 'bg-red-600 text-white border border-red-700 hover:bg-red-700 font-bold'
              }`}
              id="tab-btn-admin"
            >
              <Settings className="w-4 h-4 text-yellow-300" />
              Painel do Dono
            </button>
          </nav>

          {/* Action Buttons: Cart & Assistant Bot */}
          <div className="flex items-center gap-2 sm:gap-4" id="nav-actions">
            
            {/* Assistant Trigger Button */}
            <button
              onClick={() => setChatOpen(true)}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-red-900/20 transition-all border border-red-500/20"
              id="btn-chatbot-nav"
            >
              <MessageSquare className="w-4 h-4 text-yellow-300" />
              <span className="hidden sm:inline font-extrabold">Fenix Bot IA</span>
              <span className="sm:hidden font-extrabold">Bot IA</span>
            </button>

            {/* Shopping Cart Indicator */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 text-slate-950 bg-white rounded-xl hover:bg-yellow-50 border-2 border-yellow-600 transition-all flex items-center justify-center shadow-lg"
              id="btn-cart-trigger"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xxs sm:text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Sub-navbar with quick statistics / trust badges */}
      <div className="bg-yellow-500 text-slate-950 text-[10px] sm:text-xs py-2 px-4 border-t border-yellow-600 font-black text-center flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
        <span className="flex items-center gap-1.5 text-slate-950">
          <Check className="w-3.5 h-3.5 text-red-700" /> 
          Loja Física no Distrito Federal (Ceilândia P Norte)
        </span>
        <span className="flex items-center gap-1.5 text-slate-950 hidden sm:flex">
          <Phone className="w-3.5 h-3.5 text-red-700" /> 
          Ligue: <strong className="text-red-950">(61) 3459-9455</strong>
        </span>
        <span className="flex items-center gap-1.5 text-red-950 bg-yellow-400 border border-yellow-600 px-3 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          WhatsApp: <strong className="text-red-950">(61) 3459-9455</strong>
        </span>
      </div>
    </header>
  );
}
