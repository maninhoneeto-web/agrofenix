import React from 'react';
import { Shield, Sparkles, ShoppingBag, MessageCircle, ArrowRight, Star, BadgePercent, CheckCircle2, Award, Heart, Leaf } from 'lucide-react';
import { Product } from '../types';

interface LandingPagesProps {
  currentCategoryFocus: string; // 'racoes' | 'farmacia' | 'avicultura' | 'general'
  products: Product[];
  onProductClick: (product: Product) => void;
  onOpenChatWithQuery: (initialText: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function LandingPages({
  currentCategoryFocus = 'general',
  products = [],
  onProductClick,
  onOpenChatWithQuery,
  onAddToCart
}: LandingPagesProps) {

  // Filter highlights for different landing modes
  const filteredProducts = products.filter(p => {
    if (currentCategoryFocus === 'racoes') return p.category === 'racoes';
    if (currentCategoryFocus === 'farmacia') return p.category === 'medicamentos';
    if (currentCategoryFocus === 'avicultura') return p.category === 'avicultura';
    return p.tag && p.tag !== ''; // General featured products
  }).slice(0, 4);

  return (
    <div className="space-y-16 py-4 font-sans" id="landing-container">
      
      {/* 1. Hero Dynamic Banner customized by SEO landing context */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-100 text-slate-950 p-8 sm:p-12 shadow-xl border-4 border-red-600" id="landing-hero">
        {/* Background visual cues */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero text block */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-red-600 border border-red-700 text-white text-xs font-black rounded-full tracking-wider shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-yellow-300" />
              PORTAL OFICIAL • ATENDIMENTO ESPECIALIZADO
            </span>

            {currentCategoryFocus === 'racoes' && (
              <>
                <h2 className="text-3xl sm:text-5xl font-black leading-tight text-red-950 font-sans tracking-tight">
                  Distribuição de <span className="text-red-600 font-black">Rações Premium</span> e a Granel de Alta Performance!
                </h2>
                <p className="text-sm sm:text-base text-slate-900 font-bold leading-relaxed">
                  Oferecemos as marcas líderes do mercado como <strong className="text-red-750 font-extrabold">Premier, Golden, Fórmula Natural e BomGuy</strong>. Nutrição balanceada de qualidade, focada em longevidade e bem-estar para seus animais com distribuição local rápida no DF.
                </p>
              </>
            )}

            {currentCategoryFocus === 'farmacia' && (
              <>
                <h2 className="text-3xl sm:text-5xl font-black leading-tight text-red-950 font-sans tracking-tight">
                  Farmácia Veterinária com <span className="text-red-600 font-black">Garantia e Credibilidade</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-900 font-bold leading-relaxed">
                  Trate e proteja seu animal com segurança absoluta. Mantemos um estoque rigorosamente controlado de antiparasitários originais de vanguarda como <strong className="text-red-750 font-extrabold">NexGard, Simparic e Defenz</strong>.
                </p>
              </>
            )}

            {currentCategoryFocus === 'avicultura' && (
              <>
                <h2 className="text-3xl sm:text-5xl font-black leading-tight text-red-950 font-sans tracking-tight">
                  Avicultura Avançada, <span className="text-red-600 font-black">Gaiolas de Luxo</span> & Sementes Duplas
                </h2>
                <p className="text-sm sm:text-base text-slate-900 font-bold leading-relaxed">
                  Referência nacional em acessórios para pássaros ornamentais e de canto. Oferecemos sementes com processo exclusivo de <strong className="text-red-750 font-extrabold">sopro duplo de ar</strong> que elimina poeiras, garantindo a saúde respiratória das aves.
                </p>
              </>
            )}

            {currentCategoryFocus === 'general' && (
              <>
                <h2 className="text-3xl sm:text-4xl sm:text-5xl font-black leading-tight text-red-950 font-sans tracking-tight">
                  Soluções de Nutrição e Saúde para <span className="text-red-600 font-black">Agropecuária & Pets</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-900 font-bold leading-relaxed">
                  Inovação em nutrição animal, sementes selecionadas e produtos veterinários certificados. Conecte-se com nossa consultoria presencial e com o assistente inteligente para as melhores decisões de cuidado agropecuário.
                </p>
              </>
            )}

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a 
                href="https://wa.me/556134599455"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 font-black px-6 py-3.5 rounded-xl text-white shadow-lg transition-all flex items-center justify-center gap-2 hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                <MessageCircle className="w-5 h-5 text-yellow-200 animate-pulse" />
                Fazer Pedido via WhatsApp
              </a>
              <button
                onClick={() => onOpenChatWithQuery('Olá! Quais marcas de ração vocês têm a granel e fechadas em estoque?')}
                className="bg-white hover:bg-yellow-50 text-red-600 border-2 border-red-500 font-black px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow"
              >
                Consultar Fenix Bot IA
                <ArrowRight className="w-4 h-4 ml-1 text-red-600" />
              </button>
            </div>

            {/* Trust Badges in Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-yellow-400 text-xs text-slate-900 font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>Medicamentos 100% Originais</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>Distribuição expressa no DF</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>Sopros duplos de sementes</span>
              </div>
            </div>

          </div>

          {/* Hero visual simulation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative bg-white/95 border-2 border-red-500 p-6 rounded-2xl w-full max-w-sm shadow-xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-yellow-250">
                <span className="text-[10px] text-red-600 font-mono tracking-widest uppercase font-black">● Oferta Exclusiva</span>
                <span className="bg-red-100 border border-red-300 text-red-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded">HOJE</span>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center text-red-600 shrink-0">
                  <Star className="w-6 h-6 fill-red-600 text-red-600" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-950 text-sm">Fórmula Agro-Saúde</h4>
                  <p className="text-xs text-slate-600 font-medium">Nutrição fresca e autêntica</p>
                </div>
              </div>

              {/* Dynamic offer based on view */}
              <div className="bg-yellow-50 p-3.5 rounded-lg border border-yellow-200 space-y-2">
                {currentCategoryFocus === 'farmacia' ? (
                  <>
                    <h5 className="font-bold text-red-950 text-xs">Simparic Antiparasitário Mastigável</h5>
                    <p className="text-[11px] text-slate-700 font-semibold">Cães de 10kg a 20kg • Original Zoetis</p>
                    <div className="flex justify-between items-end pt-1">
                      <span className="text-xs text-slate-500 font-bold line-through">R$ 110,00</span>
                      <span className="text-red-600 font-extrabold text-base font-mono">R$ 94,90</span>
                    </div>
                  </>
                ) : currentCategoryFocus === 'avicultura' ? (
                  <>
                    <h5 className="font-bold text-red-950 text-xs">Mistura Fênix de Sementes</h5>
                    <p className="text-[11px] text-slate-700 font-semibold">Para Calopsita • Sopro duplo livre de pó</p>
                    <div className="flex justify-between items-end pt-1">
                      <span className="text-xs text-slate-500 font-bold line-through">R$ 24,00</span>
                      <span className="text-red-600 font-extrabold text-base font-mono">R$ 18,00 / Kg</span>
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="font-bold text-red-950 text-xs">Golden Gatos Castrados Frango 10kg</h5>
                    <p className="text-[11px] text-slate-700 font-semibold">Premium Especial Ricos Órgãos</p>
                    <div className="flex justify-between items-end pt-1">
                      <span className="text-xs text-slate-500 font-bold line-through">R$ 149,90</span>
                      <span className="text-red-600 font-extrabold text-base font-mono">R$ 124,90</span>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => {
                  const item = filteredProducts[0];
                  if (item) onAddToCart(item);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Adicionar Oferta ao Carrinho
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* 2. Brand Value Pitch - Why buy at Fênix */}
      <section className="bg-yellow-100/50 rounded-2xl p-6 sm:p-10 border border-yellow-250" id="landing-benefits">
        <h3 className="text-xl sm:text-2xl font-extrabold text-red-950 text-center tracking-tight mb-8">
          Por que a <span className="text-red-600 font-black">Agropecuária Fênix</span> é referência regional?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 border border-red-100">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base sm:text-lg">Atendimento Técnico Real</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Equipe apaixonada por animais e plantio. Nosso suporte telefônico, presencial e o <strong>assistente inteligente Fenix IA</strong> oferecem recomendações baseadas no perfil exato do seu caso.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 border border-red-100">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base sm:text-lg">Medicamentos Veterinários Certificados</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Trabalhamos exclusivamente com distribuidores credenciados sob normas veterinárias vigentes. Produtos legítimos com procedência e segurança farmacêutica plena.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 border border-red-100">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base sm:text-lg">Processamento Limpo de Sementes</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Sementes puras selecionadas sob processo especial de filtragem e triagem por gravidade. Seu pet livre de impurezas e pós nocivos que afetam a vocalização dos pássaros.
            </p>
          </div>
        </div>
      </section>


      {/* 3. Highlight Products of the campaign */}
      <section className="space-y-6" id="landing-featured-products">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {currentCategoryFocus === 'racoes' && 'Rações Selecionadas em Estoque'}
              {currentCategoryFocus === 'farmacia' && 'Fórmulas e Antiparasitários Disponíveis'}
              {currentCategoryFocus === 'avicultura' && 'Avicultura de Elite & Gaiolas Especiais'}
              {currentCategoryFocus === 'general' && 'Destaques mais Procurados'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">Produtos de alta qualidade selecionados com rigor para você.</p>
          </div>
          <span className="text-xs text-red-700 font-bold bg-red-50 border border-red-100 px-3 py-1 rounded-full flex items-center gap-1">
            <BadgePercent className="w-4 h-4 text-red-600" /> Preço Justo de Verdade!
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:translate-y-[-2px] transition-all duration-350 border border-slate-100 flex flex-col justify-between"
              id={`landing-featured-product-${product.id}`}
            >
              {/* Product Visual */}
              <div className="bg-slate-50 h-48 flex items-center justify-center relative select-none overflow-hidden border-b border-slate-100">
                {product.image.startsWith('data:') || product.image.startsWith('http') || product.image.startsWith('/') ? (
                  <img src={product.image} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-400 font-mono text-sm">Imagem do Produto</div>
                )}
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 text-yellow-400 text-[10px] font-black px-2.5 py-0.5 rounded-md shadow-sm">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                    {product.brands?.[0] || 'Agro Fênix'} • {product.unit}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2 hover:text-red-600 cursor-pointer transition-colors" onClick={() => onProductClick(product)}>
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-900 font-extrabold text-lg sm:text-md font-mono">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-slate-400">/{product.unit.replace('Pacote ', '')}</span>
                  </div>

                  {/* Buying Call to actions */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-slate-900 hover:bg-slate-850 text-white font-bold py-2 rounded-xl text-xs transition-all active:scale-95"
                    >
                      + Carrinho
                    </button>
                    <button
                      onClick={() => onOpenChatWithQuery(`Olá! Gostaria de comprar o produto ${product.name} no valor de R$ ${product.price}. Como funciona a entrega?`)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Pedir
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mini interactive CTA for Google Ads Quality Score improvement */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 sm:p-8 border border-red-800 shadow-xl" id="landing-ads-banner">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5">
            <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Faça seu pedido agora sem cadastro longo
            </h4>
            <p className="text-xs sm:text-sm text-yellow-100 leading-relaxed max-w-xl font-semibold">
              Fale com nosso <strong className="text-white">atendente virtual inteligente</strong> ou envie agora uma mensagem no WhatsApp. Nós organizamos a entrega e você faz o pagamento no Pix, dinheiro ou cartão ao receber!
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0 w-full sm:w-auto justify-end">
            <a 
              href="https://wa.me/556134599455"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all w-full sm:w-auto hover:scale-102 active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-red-600" /> Chamar WhatsApp
            </a>
            <button
              onClick={() => onOpenChatWithQuery('Gostaria de falar com o atendimento para combinar as entregas locais do meu pedido.')}
              className="bg-white hover:bg-yellow-50 text-red-700 font-black px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all w-full sm:w-auto hover:scale-102 active:scale-98"
            >
              Falar com o Robô
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
