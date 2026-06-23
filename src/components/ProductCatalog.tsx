import React, { useState, useMemo } from 'react';
import { Search, Info, SlidersHorizontal, ShoppingCart, MessageCircle, RefreshCw, X, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenChatWithQuery: (text: string) => void;
}

export default function ProductCatalog({ products = [], onAddToCart, onOpenChatWithQuery }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<string>('nome');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Categories list
  const categories = [
    { id: 'todos', label: '🌟 Todos os Produtos' },
    { id: 'racoes', label: '🥩 Rações Cães & Gatos' },
    { id: 'medicamentos', label: '💊 Farmácia Veterinária' },
    { id: 'avicultura', label: '🐦 Avicultura & Gaiolas' },
    { id: 'acessorios', label: '🛋️ Acessórios & Brinquedos' },
    { id: 'sementes', label: '🌻 Sementes & Horta' },
  ];

  // Filter and sort computation
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.brands?.some(b => b.toLowerCase().includes(q))
      );
    }

    // Filter by Category
    if (selectedCategory !== 'todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort by selection
    if (sortBy === 'preco-crescente') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'preco-decrescente') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-8 font-sans" id="catalog-section">
      
      {/* Search and Filters Header */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/90 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search bar */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Buscar ração, NexGard, gaiola, alpiste..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-800 transition-all font-medium placeholder-slate-400"
            id="input-catalog-search"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sorting options */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
          <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" /> FILTRAR POR:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-250 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            id="select-catalog-sort"
          >
            <option value="nome">Nome do Produto (A-Z)</option>
            <option value="preco-crescente">Menor Preço</option>
            <option value="preco-decrescente">Maior Preço</option>
          </select>
        </div>

      </section>

      {/* Main Catalog View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Category Tabs (highly optimized for tablets/desktops) */}
        <aside className="lg:col-span-1 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2 mb-4">
            Categorias Principais
          </h3>
          <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-left whitespace-nowrap transition-all flex items-center justify-between w-auto lg:w-full shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/10'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
                id={`btn-catalog-category-${cat.id}`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden lg:block bg-red-50/50 border border-red-100 rounded-2xl p-4 mt-6">
            <h4 className="font-bold text-red-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
              📢 Ração Fresca a Granel
            </h4>
            <p className="text-xs text-red-800 mt-2 leading-relaxed">
              Temos os melhores dispensadores do DF, garantindo que o feijão, milho ou ração pet fiquem livres de umidade e insetos. Leve apenas a quantia que precisa de forma higiênica.
            </p>
          </div>
        </aside>

        {/* Products Grid list */}
        <main className="lg:col-span-3">
          {processedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 space-y-4">
              <span className="text-5xl block">🔍💤</span>
              <h3 className="text-lg font-bold text-slate-800 font-sans">Nenhum produto encontrado</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Não encontrou o que queria? Muitas vezes temos o produto na nossa loja física mas ele ainda não consta no site. Fale com o Fênix Bot ou mande no WhatsApp!
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('todos');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Limpar filtros
                </button>
                <button
                  onClick={() => onOpenChatWithQuery('Olá! Estou procurando um produto específico que não achei no catálogo, vocês têm?')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs"
                >
                  Consultar Fênix Bot
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="catalog-products-grid">
              {processedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden justify-between group h-full"
                  id={`product-card-${product.id}`}
                >
                  {/* Visual wrapper */}
                  <div className="bg-slate-50 h-44 flex items-center justify-center relative text-6xl group-hover:bg-slate-100/50 transition-colors select-none overflow-hidden">
                    {product.image.startsWith('data:') || product.image.startsWith('http') || product.image.startsWith('/') ? (
                      <img src={product.image} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      product.image
                    )}
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="absolute top-2.5 right-2.5 bg-white/95 hover:bg-white text-slate-600 p-2 rounded-full shadow-md hover:scale-105 transition-all z-10"
                      title="Ver Detalhes"
                    >
                      <Info className="w-4 h-4 text-slate-700" />
                    </button>
                    {product.tag && (
                      <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-md shadow-sm">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Pricing and Details */}
                  <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                        {product.brands?.[0] || 'Agro Fênix'} • {product.unit}
                      </span>
                      <h4 
                        onClick={() => setSelectedProduct(product)}
                        className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2 hover:text-red-600 cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-slate-900 font-extrabold text-lg sm:text-xl font-mono">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-[10px] text-slate-400">/{product.unit.replace('Pacote ', '')}</span>
                      </div>

                      {/* Buy Triggers */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="bg-slate-900 hover:bg-slate-850 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
                          id={`btn-add-cart-${product.id}`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          + Carrinho
                        </button>
                        <button
                          onClick={() => onOpenChatWithQuery(`Oi Fênix Bot! Quero entender mais e comprar o produto: ${product.name}.`)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
                          id={`btn-order-chat-${product.id}`}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Falar com Bot
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Product Inspector modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-750 p-2 rounded-full transition-all"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Product image */}
            <div className="bg-slate-50 h-56 flex items-center justify-center text-8xl relative select-none overflow-hidden">
              {selectedProduct.image.startsWith('data:') || selectedProduct.image.startsWith('http') || selectedProduct.image.startsWith('/') ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                selectedProduct.image
              )}
              {selectedProduct.tag && (
                <span className="absolute bottom-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-md shadow">
                  {selectedProduct.tag}
                </span>
              )}
            </div>

            {/* Product content info */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] text-red-700 font-extrabold font-mono tracking-widest uppercase block bg-red-50 w-fit px-2.5 py-1 rounded-md">
                  Categoria: {selectedProduct.category.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2 leading-tight">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Unidade de Medida: {selectedProduct.unit} • Estoque: {selectedProduct.inStock ? '✅ Disponível' : '❌ Esgotado'}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {selectedProduct.description}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">VALOR DE TABELA</span>
                  <span className="text-slate-900 font-black text-2xl sm:text-3xl font-mono">
                    R$ {selectedProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {selectedProduct.brands && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">FABRICANTE</span>
                    <span className="bg-slate-200 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full inline-block mt-0.5">
                      {selectedProduct.brands[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Buying links inside inspector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    onOpenChatWithQuery(`Oi Fênix Bot! Quero fechar o meu pedido para o produto: ${selectedProduct.name}. Pode guiar o pagamento?`);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  Comprar com Bot
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
