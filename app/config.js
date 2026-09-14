// ============================================================
//  CONFIG DO BOLÃO — troque só o que está aqui
//  Contexto atual: quartas de final da Libertadores, jogos de volta
// ============================================================

export const config = {
  // >>> WhatsApp que recebe o bilhete (só dígitos, com DDI+DDD) <<<
  // Ex: "5511999999999"
  whatsappNumero: "559180194075",

  // Mensagem que chega pré-preenchida no WhatsApp.
  // Variáveis: {rodada} {codigo} {palpites} (lista numerada, uma por linha)
  whatsappMensagem: "Quero validar meu palpite",

  marca: "Mateus Caumo",

  // Google Analytics 4 — ID de medição (ex: "G-XXXXXXXXXX"). "" não carrega.
  gaId: "G-MHV790Y2BV",

  // Meta Pixel ID (deixe "" pra não carregar)
  pixelId: "",

  // ---------- Oferta ----------
  oferta: {
    valor: "R$ 500",
    regra: "no Pix pra quem cravar os 8",
  },

  // ---------- Rodada ----------
  rodada: {
    nome: "Quartas de final • Volta",
    // Encerramento dos palpites (ISO com fuso). "" desliga o contador.
    encerramento: "2026-09-15T19:00:00-03:00",
    // escudos em /public/escudos
    jogos: [
      { casa: "Platense", fora: "Fluminense", quando: "Ter 15/09 • 19h", escudoCasa: "/escudos/platense.png", escudoFora: "/escudos/fluminense.png" },
      { casa: "LDU", fora: "Palmeiras", quando: "Qua 16/09 • 19h", escudoCasa: "/escudos/ldu.png", escudoFora: "/escudos/palmeiras.png" },
      { casa: "Corinthians", fora: "Estudiantes", quando: "Qua 16/09 • 21h30", escudoCasa: "/escudos/corinthians.png", escudoFora: "/escudos/estudiantes.png" },
      { casa: "Flamengo", fora: "Ind. del Valle", quando: "Qui 17/09 • 21h30", escudoCasa: "/escudos/flamengo.png", escudoFora: "/escudos/idv.png" },
    ],
  },

  // Faixa que roda no topo (separada por •)
  marquee: ["Bolão do Caumo", "Libertadores", "R$ 500 no Pix", "Quartas de final", "Grátis", "8 palpites"],

  // ---------- Landing ----------
  landing: {
    // Imagem de fundo do hero (1080x1920, em /public). "" usa fundo liso.
    heroImage: "/hero.webp",
    label: "Bolão do Caumo • Quartas de final",
    // a palavra entre *asteriscos* vira destaque na cor
    titulo: "*R$ 500* pra quem cravar a rodada",
    subtitulo: "Dois palpites por jogo das quartas: o resultado e um mercado. Cravou os oito, o Pix é seu.",
    ctaLabel: "Fazer meus palpites",
    ctaHint: "Grátis. Resultado depois do último jogo.",
    comoFunciona: [
      "Responde as 8 perguntas em 2 minutos",
      "Registra o bilhete no WhatsApp",
      "Cravou os 8, recebe R$ 500 no Pix",
    ],
  },

  // ---------- Palpites ----------
  // "jogo" é o índice em rodada.jogos, ou null pra palpite da rodada inteira.
  // "mercado" é o rótulo curto que vai no bilhete e no WhatsApp.
  palpites: [
    // --- Platense x Fluminense ---
    {
      jogo: 0,
      mercado: "Resultado",
      pergunta: "Quem vence no tempo normal?",
      opcoes: ["Platense", "Empate", "Fluminense"],
    },
    {
      jogo: 0,
      mercado: "Ambas marcam",
      pergunta: "Os dois times marcam?",
      opcoes: ["Sim", "Não"],
    },
    // --- LDU x Palmeiras ---
    {
      jogo: 1,
      mercado: "Resultado",
      pergunta: "Quem vence no tempo normal?",
      opcoes: ["LDU", "Empate", "Palmeiras"],
    },
    {
      jogo: 1,
      mercado: "Escanteios",
      pergunta: "Vai ter 10 ou mais escanteios?",
      opcoes: ["Sim, 10 ou mais", "Não, menos de 10"],
    },
    // --- Corinthians x Estudiantes ---
    {
      jogo: 2,
      mercado: "Resultado",
      pergunta: "Quem vence no tempo normal?",
      opcoes: ["Corinthians", "Empate", "Estudiantes"],
    },
    {
      jogo: 2,
      mercado: "Total de gols",
      pergunta: "Quantos gols no jogo?",
      opcoes: ["3 ou mais", "Até 2"],
    },
    // --- Flamengo x Ind. del Valle ---
    {
      jogo: 3,
      mercado: "Resultado",
      pergunta: "Quem vence no tempo normal?",
      opcoes: ["Flamengo", "Empate", "Ind. del Valle"],
    },
    {
      jogo: 3,
      mercado: "Cartão vermelho",
      pergunta: "Vai ter cartão vermelho?",
      opcoes: ["Sim", "Não"],
    },
  ],

  // ---------- Loading ----------
  loading: {
    label: "Fechando seu bilhete",
    etapas: ["Anotando seus palpites", "Gerando o número do bilhete", "Quase lá"],
    // segundos antes de mostrar o bilhete (0 desliga)
    segundos: 1.6,
  },

  // ---------- Bilhete ----------
  bilhete: {
    label: "Seu bilhete",
    titulo: "Registra no WhatsApp pra valer",
    subtitulo: "Sem registro o bilhete não conta. É só apertar o botão que a mensagem já vai pronta.",
    ctaLabel: "Registrar no WhatsApp",
    ctaHint: "Abre o WhatsApp com o bilhete preenchido",
    refazerLabel: "Refazer palpites",
  },

  // ---------- Aviso / compliance ----------
  aviso: {
    titulo: "Aviso importante",
    linhas: [
      "Bolão gratuito, sem depósito. Só concorre quem registrar o bilhete no WhatsApp antes do primeiro jogo.",
      "Se mais de um bilhete cravar os 8, o prêmio é sorteado entre eles.",
      "Apostas esportivas envolvem risco financeiro. Nunca aposte mais do que pode perder.",
      "Conteúdo destinado a maiores de 18 anos. Jogue com responsabilidade.",
    ],
  },
};
