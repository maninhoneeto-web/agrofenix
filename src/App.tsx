import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPages from './components/LandingPages';
import ProductCatalog from './components/ProductCatalog';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';
import Chatbot from './components/Chatbot';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { ShoppingBag, ChevronRight, CheckCircle, ShieldAlert, Sparkles, Star, Settings } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home'); // home, catalog, farmacia, avicultura, admin
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState('');
  const [alertToast, setAlertToast] = useState<{ active: boolean; message: string }>({
    active: false,
    message: ''
  });

  // Dynamic products list loaded from localStorage if exist, fallback to static PRODUCTS
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('fenix_custom_products');
    if (saved) {
      try {
        setProductsList(JSON.parse(saved));
      } catch (err) {
        setProductsList(PRODUCTS);
      }
    } else {
      setProductsList(PRODUCTS);
    }
  }, []);

  const handleUpdateProductsList = (newProducts: Product[]) => {
    setProductsList(newProducts);
    localStorage.setItem('fenix_custom_products', JSON.stringify(newProducts));
    
    // Periodically update the server route if needed or keep it in localStorage
    // To make sure Fênix Bot gets the absolute newest prices of existing/new active products:
    try {
      const serializedProducts = newProducts.map(({ image, ...rest }) => rest);
      fetch('/api/sync-prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: serializedProducts })
      }).catch(err => console.log('Sync backend failed (optional):', err));
    } catch (e) {}
  };

  // Simple reactive flash notification
  const triggerToast = (message: string) => {
    setAlertToast({ active: true, message });
    setTimeout(() => {
      setAlertToast({ active: false, message: '' });
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    triggerToast(`🛒 ${product.name} adicionado ao seu carrinho!`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    triggerToast('❌ Item removido do carrinho.');
  };

  // Chatbot prompt helper
  const handleOpenChatWithQuery = (query: string) => {
    setInitialChatQuery(query);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-between font-sans selection:bg-yellow-400 selection:text-red-950">
      
      {/* Dynamic Flash Banner alert */}
      {alertToast.active && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-2xl border-2 border-yellow-400 flex items-center gap-2 animate-bounce text-xs sm:text-sm">
          <CheckCircle className="w-5 h-5 text-yellow-400" />
          <span>{alertToast.message}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch (e) {
            try {
              window.scrollTo(0, 0);
            } catch (err) {}
          }
        }}
        cart={cart}
        setCartOpen={setCartOpen}
        setChatOpen={setChatOpen}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        
        {/* Dynamic tabs navigation representing different SEO targeted landing paths */}
        <div className="flex gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-yellow-300 select-none">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg shrink-0 transition-all ${
              currentTab === 'home'
                ? 'bg-red-600 text-white shadow-md border border-red-700'
                : 'bg-white text-slate-800 border border-yellow-300 hover:bg-yellow-50'
            }`}
          >
            Destaques Gerais
          </button>
          
          <button
            onClick={() => setCurrentTab('racoes')}
            className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg shrink-0 transition-all ${
              currentTab === 'racoes'
                ? 'bg-red-600 text-white shadow-md border border-red-700'
                : 'bg-white text-slate-800 border border-yellow-300 hover:bg-yellow-50'
            }`}
          >
            Distribuidor de Rações
          </button>

          <button
            onClick={() => setCurrentTab('farmacia')}
            className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg shrink-0 transition-all ${
              currentTab === 'farmacia'
                ? 'bg-red-600 text-white shadow-md border border-red-700'
                : 'bg-white text-slate-800 border border-yellow-300 hover:bg-yellow-50'
            }`}
          >
            Farmácia Pet Especializada
          </button>

          <button
            onClick={() => setCurrentTab('avicultura')}
            className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg shrink-0 transition-all ${
              currentTab === 'avicultura'
                ? 'bg-red-600 text-white shadow-md border border-red-700'
                : 'bg-white text-slate-800 border border-yellow-300 hover:bg-yellow-50'
            }`}
          >
            Avicultura & Acessórios
          </button>

          <button
            onClick={() => setCurrentTab('catalog')}
            className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg shrink-0 transition-all ${
              currentTab === 'catalog'
                ? 'bg-red-600 text-white shadow-md border border-red-700'
                : 'bg-white text-slate-800 border border-yellow-300 hover:bg-yellow-50'
            }`}
          >
            Buscar no Catálogo
          </button>

          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-4 py-2 text-xs sm:text-sm font-black rounded-lg shrink-0 transition-all text-red-750 bg-yellow-100 border-2 border-yellow-400 hover:bg-yellow-200 flex items-center gap-1.5 shadow-sm ${
              currentTab === 'admin' ? 'ring-2 ring-red-500 bg-yellow-200' : ''
            }`}
          >
            <Settings className="w-4 h-4 text-red-600" />
            Configurações / Painel
          </button>
        </div>

        {/* Renders dynamic lander customized by current tab state */}
        {currentTab === 'admin' ? (
          <AdminPanel
            products={productsList}
            onUpdateProducts={handleUpdateProductsList}
            onClose={() => setCurrentTab('home')}
          />
        ) : currentTab === 'catalog' ? (
          <ProductCatalog
            products={productsList}
            onAddToCart={handleAddToCart}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        ) : (
          <LandingPages
            currentCategoryFocus={currentTab}
            products={productsList}
            onAddToCart={handleAddToCart}
            onProductClick={(product) => {
              setCurrentTab('catalog');
            }}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        )}

      </main>

      {/* Floating Elements (WhatsApp, Chatbot, and Cart Drawer overlays) */}
      <FloatingWhatsApp />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenChatWithQuery={handleOpenChatWithQuery}
      />

      <Chatbot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialMessageText={initialChatQuery}
        clearInitialMessage={() => setInitialChatQuery('')}
        products={productsList}
      />

      {/* Visual footer content */}
      <Footer />

    </div>
  );
}
