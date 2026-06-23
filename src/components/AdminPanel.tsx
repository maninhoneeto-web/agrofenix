import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Edit2, Plus, Save, Trash2, Camera, HelpCircle, CheckCircle, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import FenixLogo from './FenixLogo';

interface AdminPanelProps {
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  onClose: () => void;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  image: string; // Base64 or URL
  category: 'store' | 'dispenser' | 'meds' | 'racoes';
}

export default function AdminPanel({
  products,
  onUpdateProducts,
  onClose
}: AdminPanelProps) {
  // Local state for product editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editInStock, setEditInStock] = useState<boolean>(true);

  // New product form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'racoes' | 'medicamentos' | 'avicultura' | 'acessorios' | 'sementes'>('racoes');
  const [newPrice, setNewPrice] = useState('');
  const [newUnit, setNewUnit] = useState('Kg');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('🥩');
  const [newTag, setNewTag] = useState('');
  const [newBrand, setNewBrand] = useState('');

  // Logo uploading state
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  useEffect(() => {
    setCustomLogo(localStorage.getItem('fenix_custom_logo'));
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        localStorage.setItem('fenix_custom_logo', base64);
        setCustomLogo(base64);
        window.dispatchEvent(new Event('fenix_logo_updated'));
        showNotification('Sua foto de logotipo personalizada foi carregada e aplicada com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    if (confirm('Deseja realmente redefinir o logotipo do site para o vetor padrão?')) {
      localStorage.removeItem('fenix_custom_logo');
      setCustomLogo(null);
      window.dispatchEvent(new Event('fenix_logo_updated'));
      showNotification('O logotipo original em vetor 3D futurista foi restaurado.');
    }
  };

  // Gallery state loaded from localStorage or default
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'store' | 'dispenser' | 'meds' | 'racoes'>('dispenser');
  const [galleryImage, setGalleryImage] = useState<string>('');

  const [notification, setNotification] = useState('');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Prepopulate real photos references matching user descriptions
  useEffect(() => {
    const savedGallery = localStorage.getItem('fenix_gallery_photos');
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    } else {
      const defaultPhotos: GalleryPhoto[] = [
        {
          id: 'photo-dispenser',
          title: 'Dispensadores de Grãos e Biscoitos 🌾',
          description: 'Nossos baldes e gavetas transparentes de acrílico reforçado que mantêm as rações a granel sempre frescas e livres de poeira!',
          category: 'dispenser',
          image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800'
        },
        {
          id: 'photo-storefront',
          title: 'Fachada Principal Agropecuária Fênix 🏢',
          description: 'Nossa loja sinalizada com banner verde e amarelo chamativo! Contatos impressos: (61) 3459-9455.',
          category: 'store',
          image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&q=80&w=800'
        },
        {
          id: 'photo-racoes',
          title: 'Prateleiras de Rações de Fardo Fechadas 🥩',
          description: 'Packs super premium organizados (Golden, Formula Natural, Premier) para cães e gatos exigentes da Ceilândia P Norte.',
          category: 'racoes',
          image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800'
        },
        {
          id: 'photo-meds',
          title: 'Armário de Vidro - Farmácia Veterinária Completa 💊',
          description: 'Estoque lacrado de antiparasitários, Nexgard, Simparic, e vacinas originais prontas para proteger sua família.',
          category: 'meds',
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
        }
      ];
      setGallery(defaultPhotos);
      localStorage.setItem('fenix_gallery_photos', JSON.stringify(defaultPhotos));
    }
  }, []);

  // Sync Gallery to localStorage
  const saveGalleryToStorage = (updatedGallery: GalleryPhoto[]) => {
    setGallery(updatedGallery);
    localStorage.setItem('fenix_gallery_photos', JSON.stringify(updatedGallery));
  };

  // Convert uploaded image to Base64
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isNewProduct: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isNewProduct) {
          setNewImage(reader.result as string);
        } else {
          // If editing existing
          setProductsImageOfEditing(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [productsImageOfEditing, setProductsImageOfEditing] = useState<string>('');

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger price update
  const startEditing = (p: Product) => {
    setEditingId(p.id);
    setEditPrice(p.price.toString());
    setEditName(p.name);
    setEditDescription(p.description);
    setEditInStock(p.inStock);
    setProductsImageOfEditing(p.image);
  };

  const saveProductEdits = (id: string) => {
    const parsedPrice = parseFloat(editPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Favor inserir um preço de venda real válido.');
      return;
    }

    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          price: parsedPrice,
          name: editName,
          description: editDescription,
          inStock: editInStock,
          image: productsImageOfEditing || p.image
        };
      }
      return p;
    });

    onUpdateProducts(updated);
    setEditingId(null);
    showNotification('Preço e informações do produto atualizados de forma manual com absoluto sucesso!');
  };

  // Create customized new product with user images
  const createNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(newPrice);
    if (!newName.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Preencha os campos obrigatórios com valores corretos.');
      return;
    }

    const customId = `user-prod-${Date.now()}`;
    const product: Product = {
      id: customId,
      name: newName,
      category: newCategory,
      price: parsedPrice,
      unit: newUnit,
      description: newDescription || 'Produto adicionado manualmente pela gerência da Agropecuária Fênix.',
      image: newImage || '📦',
      inStock: true,
      tag: newTag || undefined,
      brands: newBrand ? [newBrand] : undefined
    };

    onUpdateProducts([product, ...products]);
    
    // reset form
    setNewName('');
    setNewPrice('');
    setNewDescription('');
    setNewTag('');
    setNewBrand('');
    setNewImage('🥩');
    showNotification('Seu novo produto já foi adicionado ao catálogo e já está pronto para venda e atendimento bot!');
  };

  // Create gallery post
  const addToGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim() || !galleryImage) {
      alert('Por favor, informe um título e selecione uma foto real da loja!');
      return;
    }

    const newPhoto: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      title: galleryTitle,
      description: galleryDesc || 'Foto oficial das dependências da Agropecuária Fênix.',
      category: galleryCategory,
      image: galleryImage
    };

    const updated = [newPhoto, ...gallery];
    saveGalleryToStorage(updated);

    // reset Form
    setGalleryTitle('');
    setGalleryDesc('');
    setGalleryImage('');
    showNotification('Sua bela foto foi salva e indexada na galeria oficial com sucesso!');
  };

  const deleteGalleryPhoto = (id: string) => {
    if (confirm('Deseja realmente remover esta foto da galeria?')) {
      const updated = gallery.filter(p => p.id !== id);
      saveGalleryToStorage(updated);
      showNotification('Foto removida da galeria.');
    }
  };

  const deleteProduct = (id: string) => {
    if (confirm('Deseja realmente remover esse produto de seu catálogo?')) {
      const updated = products.filter(p => p.id !== id);
      onUpdateProducts(updated);
      showNotification('Produto deletado com sucesso.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans" id="gerenciador-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner notification confirmation toast */}
        {notification && (
          <div className="fixed top-6 right-6 z-50 bg-red-600 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-2xl border-b-4 border-yellow-400 flex items-center gap-3 animate-bounce">
            <CheckCircle className="w-5 h-5 text-yellow-300" />
            <span>{notification}</span>
          </div>
        )}

        {/* Back navigation & header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="bg-red-100 text-red-800 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Painel de Administração Física
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Gerência Digital <span className="text-red-600">Agropecuária Fênix</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Atualize preços desatualizados instantaneamente, insira suas fotos reais dos dispensers, controle o estoque e exiba a credibilidade de nossa loja física!
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm"
          >
            ← Voltar para a Loja do Site
          </button>
        </div>


        {/* Part 0: Site Identity & Custom Logo Upload (Request: "na aba de logo deixe que eu cargue a foto manualmente") */}
        <section className="bg-gradient-to-br from-red-50 to-yellow-50/60 p-6 sm:p-8 rounded-3xl shadow-md border border-yellow-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-yellow-200 pb-5">
            <div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <span className="text-xl">🎨</span> Identidade Visual & Upload do Logotipo
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Carregue a foto oficial do logotipo da sua agropecuária de forma manual! Ela atualizará instantaneamente no cabeçalho, no rodapé e em todo o site.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800 shadow-lg shrink-0">
                <FenixLogo size="lg" />
              </div>
              <div className="text-xs text-slate-500">
                <span className="font-bold text-slate-850 block">Pré-visualização do Logo</span>
                {customLogo ? (
                  <span className="text-red-600 font-bold">✓ Foto carregada manualmente</span>
                ) : (
                  <span className="text-slate-500 font-medium">Usando vetor padrão (Fênix)</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm">Carregar Nova Foto</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Selecione uma imagem quadrada ou horizontal (PNG, JPG) do seu computador ou celular. A foto será otimizada para se ajustar perfeitamente ao cabeçalho.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold px-5 py-3 rounded-xl cursor-pointer shadow-md transition-all text-xs">
                  <Upload className="w-4 h-4" />
                  <span>Escolher Foto do Logotipo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>

                {customLogo && (
                  <button
                    onClick={handleResetLogo}
                    className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold px-4 py-3 rounded-xl transition-all text-xs"
                  >
                    Restaurar Logo Padrão
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white/85 p-4 rounded-2xl border border-yellow-100 flex flex-col justify-center items-center text-center space-y-2 h-full">
              <span className="text-2xl">💡</span>
              <p className="text-xs text-slate-600 font-medium">
                Sua foto é salva de forma persistente. Se precisar alterar, basta carregar outra foto a qualquer momento!
              </p>
            </div>
          </div>
        </section>


        {/* Part 1: Real Store Gallery Visual (displays the requested pictures beautifully) */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-150 space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
              📸 Galeria de Fotos Reais da Nossa Loja Física (Ceilândia P Norte)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Essas fotos mostram nossa estrutura física, corredores abarrotados de rações premium, nossa famosa seção de dispensers higiênicos, e nossa farmácia com medicamentos protegidos.
            </p>
          </div>

          {/* Pictures Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((photo) => (
              <div 
                key={photo.id}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-gray-200 flex flex-col justify-between group relative shadow-xs"
              >
                {/* Image panel */}
                <div className="h-44 bg-slate-200 relative overflow-hidden flex items-center justify-center">
                  {photo.image.startsWith('http') || photo.image.startsWith('data:') ? (
                    <img 
                      src={photo.image} 
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-4xl">📷</span>
                  )}

                  {/* Category Pill Tag */}
                  <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                    {photo.category === 'dispenser' && 'Dispensador'}
                    {photo.category === 'store' && 'Fachada'}
                    {photo.category === 'meds' && 'Farmácia/Medicamentos'}
                    {photo.category === 'racoes' && 'Rações'}
                  </span>
                  
                  <button
                    onClick={() => deleteGalleryPhoto(photo.id)}
                    className="absolute top-2.5 right-2.5 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow hover:scale-105 transition-all"
                    title="Excluir Foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content details */}
                <div className="p-4 space-y-1 bg-white flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal line-clamp-3">
                      {photo.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t text-[9px] text-slate-400 font-mono">
                    ID: {photo.id}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form to load custom real pictures to visual gallery */}
          <div className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-200">
            <h4 className="font-bold text-red-950 text-sm flex items-center gap-1.5 mb-3">
              <Camera className="w-4 h-4 text-yellow-600" /> Adicionar Minha Foto Manual na Galeria da Loja:
            </h4>
            <form onSubmit={addToGallery} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-bold block">TÍTULO DA FOTO</label>
                <input
                  type="text"
                  placeholder="Ex: Foto do meu dispenser de ração..."
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-bold block">DESCRIÇÃO OU INFORMAÇÕES</label>
                <input
                  type="text"
                  placeholder="Ex: Prateleira com as rações Premier e Golden."
                  value={galleryDesc}
                  onChange={(e) => setGalleryDesc(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-bold block">CATEGORIA</label>
                <select
                  value={galleryCategory}
                  onChange={(e: any) => setGalleryCategory(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-red-500"
                >
                  <option value="dispenser">Dispensador de grãos</option>
                  <option value="store">Fachada Comercial</option>
                  <option value="meds">Farmácia Veterinária</option>
                  <option value="racoes">Pilhas de Rações</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-gray-500 font-semibold flex items-center gap-1 cursor-pointer bg-white px-3 py-2 rounded-lg border hover:bg-slate-50 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-red-600" />
                  <span className="truncate">{galleryImage ? '✓ Foto Carregada' : 'Carregar Foto Real'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryImageUpload}
                    className="hidden"
                  />
                </label>
                
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-2 rounded-lg transition-all"
                >
                  Adicionar Foto na Galeria
                </button>
              </div>
            </form>
          </div>
        </section>


        {/* Part 2: Quick price editor (makes it simple to rewrite prices for accurate sales) */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-150 space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
              ✍️ Editor Rápido de Preços do Catálogo Ativo
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Escreva novos valores nas rações premium, feijões, alpiste, Simparic e mude os nomes ou descrições se desejar. Seus clientes e o robô Fênix verão a alteração na hora!
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600" id="table-products-admin">
              <thead className="bg-slate-100 text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Imagem</th>
                  <th className="p-3">Nome do Produto</th>
                  <th className="p-3">Categoria</th>
                  <th className="p-3">Preço Atual (R$)</th>
                  <th className="p-3">Unidade</th>
                  <th className="p-3">Estoque</th>
                  <th className="p-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {products.map((p) => {
                  const isEditing = editingId === p.id;
                  return (
                    <tr 
                      key={p.id} 
                      className={`hover:bg-slate-50/50 transition-colors ${
                        isEditing ? 'bg-yellow-50/60' : ''
                      }`}
                    >
                      {/* Image representation */}
                      <td className="p-3">
                        <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl overflow-hidden">
                          {p.image.startsWith('data:') || p.image.startsWith('http') ? (
                            <img src={p.image} alt="Produto" referrerPolicy="no-referrer" className="object-cover w-full h-full" />
                          ) : (
                            p.image
                          )}
                        </div>
                      </td>

                      {/* Product Name */}
                      <td className="p-3 font-semibold">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-white border rounded p-1 w-full text-xs font-bold text-slate-800"
                          />
                        ) : (
                          <span>{p.name}</span>
                        )}
                      </td>

                      {/* Category representation */}
                      <td className="p-3">
                        <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {p.category}
                        </span>
                      </td>

                      {/* PRICE */}
                      <td className="p-3">
                        {isEditing ? (
                          <div className="flex items-center gap-1 w-24">
                            <span className="text-gray-400 font-semibold font-mono">R$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="bg-white border rounded p-1 w-full text-xs font-mono font-bold"
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-red-600 font-mono">
                            R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </td>

                      {/* Unit */}
                      <td className="p-3 text-slate-400 font-mono">
                        {p.unit}
                      </td>

                      {/* Stock availability */}
                      <td className="p-3 text-slate-400">
                        {isEditing ? (
                          <select 
                            value={editInStock ? 'true' : 'false'}
                            onChange={(e) => setEditInStock(e.target.value === 'true')}
                            className="bg-white border rounded p-0.5 text-xs"
                          >
                            <option value="true">Disponível</option>
                            <option value="false">Esgotado</option>
                          </select>
                        ) : (
                          <span className={`font-bold ${p.inStock ? 'text-red-600' : 'text-slate-400'}`}>
                            {p.inStock ? '✓ Sim' : '✗ Não'}
                          </span>
                        )}
                      </td>

                      {/* Action trigger buttons */}
                      <td className="p-3 text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => saveProductEdits(p.id)}
                              className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg shadow-sm"
                              title="Salvar Alterações"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                // Upload details inside inline editing
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e: any) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setProductsImageOfEditing(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                };
                                input.click();
                              }}
                              className="bg-slate-600 hover:bg-slate-700 text-white p-1.5 rounded-lg shadow-sm"
                              title="Alterar Imagem"
                            >
                              <Camera className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1.5 px-2.5 rounded-lg"
                            >
                              Sair
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => startEditing(p)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 p-1.5 rounded-lg transition-all"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="bg-red-50 hover:bg-red-100 text-red-500 p-1.5 rounded-lg transition-all border border-transparent hover:border-red-200"
                              title="Deletar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>


        {/* Part 3: Create custom new product with file upload */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-150">
          <div className="border-b pb-4 mb-6">
            <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-1.5">
              <Plus className="w-6 h-6 text-red-600" /> Cadastrar Novo Produto Manual com Minhas Fotos:
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Caso você tenha sementes de produção própria ou queira lançar rações de fardos em promoção exclusiva, crie aqui adicionando sua foto de forma local. Ele aparecerá dinamicamente nas vitrines de vendas!
            </p>
          </div>

          <form onSubmit={createNewProduct} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-extrabold block">NOME DO PRODUTO *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ração Fórmula Natural Cães Castrados"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-red-500 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-extrabold block">CATEGORIA *</label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-red-500 text-slate-800"
                >
                  <option value="racoes">🥩 Rações Cães & Gatos</option>
                  <option value="medicamentos">💊 Farmácia Veterinária</option>
                  <option value="avicultura">🐦 Avicultura & Gaiolas</option>
                  <option value="acessorios">🛋️ Acessórios & Brinquedos</option>
                  <option value="sementes">🌻 Sementes & Horta</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-gray-500 font-extrabold block">PREÇO VENDA * (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="22.50"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-red-500 text-slate-800 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-gray-500 font-extrabold block">UNIDADE DA EMBALAGEM</label>
                  <input
                    type="text"
                    placeholder="Pacote 15kg, Kg, etc"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-red-500 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-extrabold block">FABRICANTE / MARCA</label>
                <input
                  type="text"
                  placeholder="Ex: Premier, Zoetis, Fórmula Natural"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-red-500 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-extrabold block">ETIQUETA DE DESTAQUE</label>
                <input
                  type="text"
                  placeholder="Ex: Mais Vendido, Promoção, Fresco"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-red-500 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-extrabold block">FOTO REAL DO SEU PRODUTO</label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl border overflow-hidden select-none shrink-0">
                    {newImage.startsWith('data:') ? (
                      <img src={newImage} alt="Pré-visualização" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      newImage
                    )}
                  </div>
                  <label className="flex-grow flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl border border-gray-300 cursor-pointer text-xs select-none">
                    <Upload className="w-4 h-4 mr-1.5 text-red-600" />
                    <span>Carregar Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleProductImageUpload(e, true)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Column 3 & trigger */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 font-extrabold block font-sans">CONTEÚDO E DETALHES DE USO</label>
                <textarea
                  rows={4}
                  placeholder="Escreva recomendação de dosagem, vantagens do produto e por que comprá-lo na Fênix."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs focus:ring-1 focus:ring-red-500 text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-850 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:scale-101 active:scale-99 transition-all text-sm outline-none"
              >
                ✓ Cadastrar Novo Produto Completo
              </button>
            </div>

          </form>
        </section>

      </div>
    </div>
  );
}
