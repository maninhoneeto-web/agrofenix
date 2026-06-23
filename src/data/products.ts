import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- RAÇÕES ---
  {
    id: 'rac-premier-caes-15',
    name: 'Ração Premier Cães Adultos Raças Médias Frango & Arroz',
    category: 'racoes',
    subcategory: 'Cães',
    price: 195.00,
    unit: 'Pacote 15kg',
    description: 'Ração super premium indicada para cães adultos de raças médias. Proporciona pelos brilhantes, alta digestibilidade e fezes firmes.',
    image: 'https://images.tcdn.com.br/img/img_prod/747391/racao_premier_caes_adultos_racas_medias_frango_e_arroz_15kg_1431_1_2112d7f4be4707297e6840ef75796a58.jpg',
    inStock: true,
    brands: ['Premier'],
    tag: 'Mais Vendido'
  },
  {
    id: 'rac-golden-gatos-10',
    name: 'Ração Golden Gatos Castrados Frango',
    category: 'racoes',
    subcategory: 'Gatos',
    price: 124.90,
    unit: 'Pacote 10.1kg',
    description: 'Alimento premium especial formulado especificamente para suprir as necessidades de gatos castrados, mantendo o peso saudável.',
    image: 'https://images.tcdn.com.br/img/img_prod/694931/racao_golden_gatos_castrados_frango_10_1_kg_307_1_20201021151608.jpg',
    inStock: true,
    brands: ['Golden'],
    tag: 'Em Destaque'
  },
  {
    id: 'rac-formula-natural-15',
    name: 'Ração Fórmula Natural Super Premium Cães Adultos',
    category: 'racoes',
    subcategory: 'Cães',
    price: 180.00,
    unit: 'Pacote 15kg',
    description: 'Sem corantes e aromatizantes artificiais, com antioxidantes naturais para uma vida saudável e equilibrada.',
    image: 'https://images.tcdn.com.br/img/img_prod/747391/racao_formula_natural_caes_adultos_portes_medio_e_grande_15kg_1349_1_c8d234a9bd91a6beff28df084da884fe.jpg',
    inStock: true,
    brands: ['Fórmula Natural'],
    tag: 'Saudável'
  },
  {
    id: 'rac-bomguy-15',
    name: 'Ração BomGuy Premium Especial Cães Adultos',
    category: 'racoes',
    subcategory: 'Cães',
    price: 125.00,
    unit: 'Pacote 15kg',
    description: 'Nutrição de alta qualidade com deliciosa combinação de ingredientes que seu cão vai adorar. Ótimo custo-benefício.',
    image: 'https://images.tcdn.com.br/img/img_prod/534790/racao_bomguy_adulto_carne_15kg_835_1_20200508151443.jpg',
    inStock: true,
    brands: ['BomGuy'],
    tag: 'Economia'
  },
  {
    id: 'rac-granel-premier',
    name: 'Ração Premier Cães Adultos Frango (Granel)',
    category: 'racoes',
    subcategory: 'A Granel',
    price: 18.00,
    unit: 'Kg',
    description: 'A mesma qualidade da ração Premier tradicional, vendida de forma fracionada (a granel) em dispensadores higiênicos.',
    image: 'https://images.unsplash.com/photo-1608408544702-ec2ddc312cb8?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    brands: ['Premier'],
    tag: 'A Granel'
  },
  {
    id: 'rac-granel-golden',
    name: 'Ração Golden Gatos Castrados Frango (Granel)',
    category: 'racoes',
    subcategory: 'A Granel',
    price: 14.00,
    unit: 'Kg',
    description: 'A ração favorita dos felinos vendida a granel. Ideal para comprar a quantidade exata de consumo semanal.',
    image: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    brands: ['Golden'],
    tag: 'A Granel'
  },
  {
    id: 'med-nexgard-10-25',
    name: 'NexGard Antipulgas e Carrapatos 68mg (Cães 10 a 25kg)',
    category: 'medicamentos',
    subcategory: 'Cães',
    price: 89.90,
    unit: 'Comprimido Mastigável',
    description: 'NexGard mata pulgas e carrapatos com rapidez e eficácia. Sabor delicioso de carne altamente aceito pelos cães.',
    image: 'https://img.petlove.com.br/produto/fotos/180/3117490/Nexgard_10_a_25_kg_3_Comprimidos__1.jpg',
    inStock: true,
    brands: ['NexGard'],
    tag: 'Campeão de Vendas'
  },
  {
    id: 'med-simparic-10-20',
    name: 'Simparic Antipulgas e Carrapatos 40mg (Cães 10 a 20kg)',
    category: 'medicamentos',
    subcategory: 'Cães',
    price: 94.90,
    unit: 'Comprimido Mastigável',
    description: 'Proteção mensal rápida e eficaz contra pulgas, carrapatos e sarnas. Começa a agir em apenas 3 horas.',
    image: 'https://img.petlove.com.br/produto/fotos/180/3117498/Simparic_10_a_20_kg_3_Comprimidos__1.jpg',
    inStock: true,
    brands: ['Simparic'],
    tag: 'Recomendado'
  },
  {
    id: 'med-defenz',
    name: 'Defenz Antiparasitário Premium Cães Médios',
    category: 'medicamentos',
    subcategory: 'Cães',
    price: 74.90,
    unit: 'Comprimido',
    description: 'Proteção prolongada contra pulgas, carrapatos e mosquitos transmissores de doenças. Ideal para segurança diária.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    brands: ['Defenz'],
    tag: 'Promoção'
  },
  {
    id: 'med-vetmax',
    name: 'Vitamina VetMax Premium Suplemento Líquido',
    category: 'medicamentos',
    subcategory: 'Suplementos',
    price: 34.90,
    unit: 'Frasco 120ml',
    description: 'Suplemento vitamínico mineral aminoácido completo para fortalecer o sistema imunológico de cães e gatos.',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    brands: ['VetMax'],
    tag: 'Imunidade'
  },

  // --- AVICULTURA ---
  {
    id: 'avi-gaiola-canario',
    name: 'Gaiola de Arame Luxo Teto Arco para Canários',
    category: 'avicultura',
    subcategory: 'Gaiolas',
    price: 79.90,
    unit: 'Unidade',
    description: 'Gaiola reforçada com teto em arco, acabamento cromado moderno. Acompanha poleiros e comedouros de alta qualidade.',
    image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    tag: 'Artesanal'
  },
  {
    id: 'avi-mix-calopsita',
    name: 'Mistura Especial Fênix para Calopsitas',
    category: 'avicultura',
    subcategory: 'Sementes',
    price: 18.00,
    unit: 'Pacote 1kg',
    description: 'Mistura rica selecionada de sementes (painço, alpiste, girassol nacional, aveia) proporcionando plumagem brilhante e nutrição balanceada.',
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    tag: 'Produção Própria'
  },
  {
    id: 'avi-alpiste-premium',
    name: 'Alpiste Selecionado Premium Agro Fênix',
    category: 'avicultura',
    subcategory: 'Sementes',
    price: 12.00,
    unit: 'Pacote 1kg',
    description: 'Sementes limpas de alpiste selecionadas com sopro duplo para remoção total de poeira e cascas vazias.',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    tag: 'Super Limpo'
  },
  {
    id: 'avi-bebedouro-pratico',
    name: 'Bebedouro Prático Plástico para Canários',
    category: 'avicultura',
    subcategory: 'Acessórios',
    price: 8.50,
    unit: 'Unidade',
    description: 'Bebedouro modelo bico azul com presilha forte, fácil de higienizar e repor a água das aves diariamente.',
    image: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=600',
    inStock: true
  },

  // --- ACESSÓRIOS ---
  {
    id: 'ace-cama-nuvem',
    name: 'Caminha Pet Nuvem Redonda Premium Macia',
    category: 'acessorios',
    subcategory: 'Camas',
    price: 110.00,
    unit: 'Unidade M',
    description: 'Cama macia tipo nuvem ultra aconchegante, preenchida com fibra siliconada. Costura dupla super resistente.',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1bf0?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    tag: 'Super Conforto'
  },
  {
    id: 'ace-pipicat-4',
    name: 'Areia Sanitária Pipicat Clássica para Gatos',
    category: 'acessorios',
    subcategory: 'Higiene',
    price: 22.00,
    unit: 'Saco 4kg',
    description: 'Controle superior de odores desagradáveis com grãos naturais de argila bentonita que absorvem rápido formando torrões firmes.',
    image: 'https://img.petlove.com.br/produto/fotos/180/3113524/Areia_Sanitaria_Pipicat_Classica_4_kg_3103213__1.jpg',
    inStock: true,
    tag: 'Líder de Vendas'
  },
  {
    id: 'ace-peitoral-guia',
    name: 'Coleira Peitoral com Guia Regulável Resistente',
    category: 'acessorios',
    subcategory: 'Passeio',
    price: 45.00,
    unit: 'Unidade',
    description: 'Peitoral ajustável em fita de nylon resistente com fivelas de trava de segurança. Ideal para passear com conforto.',
    image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&q=80&w=600',
    inStock: true
  },
  {
    id: 'ace-osso-borracha',
    name: 'Brinquedo Mordedor Osso de Borracha Resistente',
    category: 'acessorios',
    subcategory: 'Brinquedos',
    price: 18.90,
    unit: 'Unidade',
    description: 'Produzido com borracha atóxica de alta qualidade que massageia a gengiva e ajuda a combater o tártaro do cão.',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600',
    inStock: true
  },

  // --- SEMENTES / JARDINAGEM ---
  {
    id: 'sem-girassol',
    name: 'Semente de Girassol Miúdo Selecionada',
    category: 'sementes',
    subcategory: 'Avicultura',
    price: 15.00,
    unit: 'Saco 1kg',
    description: 'Sementes de girassol miúdo limpas, ideais para alimentação diária de papagaios, maritacas e calopsitas.',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    tag: 'Fresco'
  },
  {
    id: 'sem-horta-mix',
    name: 'Kit de Sementes para Horta e Temperos',
    category: 'sementes',
    subcategory: 'Horta',
    price: 9.90,
    unit: 'Kit com 3 Envelopes',
    description: 'Envelopes lacrados de alta germinação para plantar alface crespa, coentro verdinho e salsa em vaso ou quintal.',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    tag: 'Fácil Cultivo'
  }
];
