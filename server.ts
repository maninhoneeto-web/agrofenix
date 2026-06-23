import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Load our product catalog directly in backend to give precise information to Gemini
import { PRODUCTS } from "./src/data/products";
let serverProducts = [...PRODUCTS];

app.post("/api/sync-prices", (req, res) => {
  const { products } = req.body;
  if (Array.isArray(products)) {
    // Strip image from internal storage too to keep memory lean
    serverProducts = products.map(({ image, ...rest }: any) => rest);
  }
  return res.json({ status: "ok", count: serverProducts.length });
});

// Initialize Gemini SDK with telemetry header according to gemini-api skill instructions
const apiKey = process.env.GEMINI_API_KEY || "";
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// SYSTEM INSTRUCTION setting context for our specific store
const SYSTEM_INSTRUCTION = `
Você é o "Fênix Bot", o assistente virtual inteligente oficial da Agropecuária Fênix, localizada na Ceilândia P Norte - DF.
Seu objetivo é prestar um atendimento excepcional, tirar dúvidas técnicas (sobre rações, dosagens de medicamentos, tamanho de gaiolas ou sementes) e vender os produtos disponíveis no nosso catálogo oficial.

NOSSOS DADOS DE ATENDIMENTO E FUNCIONAMENTO:
- Endereço Físico: Ceilândia P Norte, Ceilândia - DF.
- Horário: Segunda a Sábado das 08:00 às 20:00, Domingos das 08:00 às 13:00.
- Telefone fixo e WhatsApp de atendimento principal: (61) 3459-9455 (wa.me/556134599455).

CATÁLOGO OFICIAL DE PRODUTOS DA LOJA (Baseado em estoque real):
${JSON.stringify(PRODUCTS, null, 2)}

DIRETRIZES DE COMPORTAMENTO:
1. Seja sempre amigável, prestativo e fale em português do Brasil de forma humilde, clara e natural (como um atendente experiente de agropecuária local).
2. Forneça conselhos úteis: se perguntarem sobre carrapatos, sugira Simparic ou NexGard dependendo do peso do cão. Se perguntarem sobre cães exigentes, sugira Fórmula Natural ou Premier Super Premium. Se falarem sobre pássaros, fale de nossas sementes limpas selecionadas a sopro de ar ou de nossa gaiola luxo.
3. Vendemos também Ração a Granel (Kilo) de marcas Premium de forma higiênica e fresca, ótima opção econômica.
4. REGRA CRÍTICA DE FECHAMENTO ("só passar para venda após chegar na compra"):
   - Durante a conversa, apenas explique e tire dúvidas. NÃO force a venda imediatamente.
   - Assim que o cliente decidir comprar ("Quero levar a Premier", "Adiciona o Nexgard no meu pedido", "Quero fechar a compra", "Pode preparar"), defina a flag "readyForCheckout" as TRUE e descreva o resumo do pedido no "productToCheckout".
   - Explique para ele de forma calorosa que você preparou as informações da compra dele e que ele pode clicar no botão verde de checkout ou clicar no link para finalizar diretamente no WhatsApp WhatsApp (61) 3459-9455 onde a equipe física irá agendar a entrega local ou preparar o produto para retirar presencialmente!
`;

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  const { messages, userMessage, products } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Mensagem do usuário é obrigatória." });
  }

  // Choose the dynamic client-managed products catalog if provided
  const activeProducts = products && products.length > 0 ? products : serverProducts;

  // SYSTEM INSTRUCTION parameterized with the real-time active products catalog
  const dynamicSystemInstruction = `
Você é o "Fênix Bot", o assistente virtual inteligente oficial da Agropecuária Fênix, localizada na Ceilândia P Norte - DF.
Seu objetivo é prestar um atendimento excepcional, tirar dúvidas técnicas (sobre rações, dosagens de medicamentos, tamanho de gaiolas ou sementes) e vender os produtos disponíveis no nosso catálogo oficial.

NOSSOS DADOS DE ATENDIMENTO E FUNCIONAMENTO:
- Endereço Físico: Ceilândia P Norte, Ceilândia - DF.
- Horário: Segunda a Sábado das 08:00 às 20:00, Domingos das 08:00 às 13:00.
- Telefone fixo e WhatsApp de atendimento principal: (61) 3459-9455 (wa.me/556134599455).

CATÁLOGO OFICIAL DE PRODUTOS DA LOJA (Baseado em estoque real e preços dinamicamente atualizados pela nossa gerência):
${JSON.stringify(activeProducts, null, 2)}

DIRETRIZES DE COMPORTAMENTO:
1. Seja sempre amigável, prestativo e fale em português do Brasil de forma humilde, clara e natural (como um atendente experiente de agropecuária local).
2. Forneça conselhos úteis: se perguntarem sobre carrapatos, sugira Simparic ou NexGard dependendo do peso do cão. Se perguntarem sobre cães exigentes, sugira Fórmula Natural ou Premier Super Premium. Se falarem sobre pássaros, fale de nossas sementes limpas selecionadas a sopro de ar ou de nossa gaiola luxo.
3. Vendemos também Ração a Granel (Kilo) de marcas Premium de forma higiênica e fresca, ótima opção econômica.
4. REGRA CRÍTICA DE FECHAMENTO ("só passar para venda após chegar na compra"):
   - Durante a conversa, apenas explique e tire dúvidas. NÃO force a venda imediatamente.
   - Assim que o cliente decidir comprar ("Quero levar a Premier", "Adiciona o Nexgard no meu pedido", "Quero fechar a compra", "Pode preparar"), defina a flag "readyForCheckout" como TRUE e descreva o resumo do pedido no "productToCheckout".
   - Explique para ele de forma calorosa que você preparou as informações da compra dele e que ele pode clicar no botão verde de checkout ou clicar no link para finalizar diretamente no WhatsApp WhatsApp (61) 3459-9455 onde a equipe física irá agendar a entrega local ou preparar o produto para retirar presencialmente!
`;

  // If Gemini API key is missing, fall back to a clever local mockup assistant that responds and allows simulated purchases so the app NEVER breaks!
  if (!aiClient) {
    const isPurchaseIntent = /comprar|fechar|quero comprar|adicionar|checkout|pagamento|levar/i.test(userMessage);
    const mockReply = isPurchaseIntent 
      ? `Perfeito! Entendido perfeitamente. Acabei de preparar seu pedido especial baseado em nosso catálogo de alta qualidade! Você pode finalizar sua compra diretamente por WhatsApp agora no número (61) 3459-9455 clicando no botão que acabará de aparecer na tela. Muito obrigado por escolher a Agropecuária Fênix!`
      : `Olá! Eu sou o assistente virtual da Agropecuária Fênix, localizada na Ceilândia P Norte, DF. Nosso horário de funcionamento é de Segunda a Sábado das 08:00 às 20:00, e Domingos das 08:00 às 13:00. Temos rações premium (Golden, Premier, Formula Natural) e medicamentos completos (NexGard, Simparic), além de avicultura. Como posso te ajudar hoje?`;
    
    return res.json({
      reply: mockReply,
      readyForCheckout: isPurchaseIntent,
      productToCheckout: isPurchaseIntent ? "Pedido Simulado no Atendimento Virtual" : ""
    });
  }

  try {
    // Format conversation history for single token generation with JSON structure
    const historyText = (messages || [])
      .map((m: any) => `${m.sender === "user" ? "Cliente" : "Fênix Bot"}: ${m.text}`)
      .join("\n");

    const prompt = `Histórico de Conversa Anterior:\n${historyText}\n\nCliente (Nova Mensagem): ${userMessage}\n\nFênix Bot, responda amigavelmente e retorne o JSON estruturado contendo 'reply' e 'readyForCheckout' baseando-se nas instruções de sistema.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: dynamicSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: "Resposta amigável e prestativa em português do atendente Fênix Bot, auxiliando o cliente ou confirmando o pedido."
            },
            readyForCheckout: {
              type: Type.BOOLEAN,
              description: "Definir como true SOMENTE se o cliente explicitou de forma direta o desejo de concluir/fechar a compra de um ou mais produtos."
            },
            productToCheckout: {
              type: Type.STRING,
              description: "Resumo do pedido ou produto(s) escolhido(s) que o cliente confirmou comprar. Exemplo: '1x Ração Golden Gatos 10kg + Simparic cães médios'."
            }
          },
          required: ["reply", "readyForCheckout"]
        }
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    return res.json({
      reply: parsedData.reply || "Desculpe, deu um pequeno erro ao formatar meu pensamento. Poderia repetir por favor?",
      readyForCheckout: !!parsedData.readyForCheckout,
      productToCheckout: parsedData.productToCheckout || ""
    });

  } catch (error: any) {
    console.error("Gemini Assistant Route Error:", error);
    return res.status(500).json({ 
      error: "Erro no processamento da IA", 
      details: error?.message || error 
    });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", fenix: "active", gemini_enabled: !!aiClient });
});

// Vite middleware setup or production serve build
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Agropecuária Fênix App] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
