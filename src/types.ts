export interface Product {
  id: string;
  name: string;
  category: 'racoes' | 'medicamentos' | 'avicultura' | 'acessorios' | 'sementes';
  subcategory?: string;
  price: number;
  unit: string;
  description: string;
  image: string;
  inStock: boolean;
  brands?: string[];
  tag?: string; // e.g., "Mais Vendido", "Destaque", "Promoção"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  readyForCheckout?: boolean;
  productToCheckout?: string;
}

export interface ApiChatResponse {
  reply: string;
  readyForCheckout: boolean;
  productToCheckout?: string;
}
