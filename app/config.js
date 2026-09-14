// ============================================================
//  CONFIG DO QUIZ — troque só o que está aqui
// ============================================================

export const config = {
  // >>> WhatsApp que recebe o resgate (só dígitos, com DDI+DDD) <<<
  // Ex: "5511999999999"
  whatsappNumero: "5500000000000",

  // Mensagem que chega pré-preenchida no WhatsApp.
  // Variáveis: {premio} {acertos} {total}
  whatsappMensagem:
    "Oi! Fiz o quiz de futebol, acertei {acertos} de {total} e desbloqueei: {premio} 🎁 Quero resgatar!",

  // Cor de destaque (Dupla: lime "#C8FF00")
  corDestaque: "#C8FF00",

  // Marca
  marca: "Dupla Aposta",

  // Meta Pixel ID (deixe "" pra não carregar)
  pixelId: "",

  // ---------- Landing ----------
  landing: {
    eyebrow: "QUIZ DE FUTEBOL",
    // a palavra entre *asteriscos* vira destaque na cor
    titulo: "Quanto você *entende* de futebol?",
    subtitulo: "5 perguntas rápidas. Quanto mais acertar, maior o prêmio que você resgata no WhatsApp.",
    ctaLabel: "COMEÇAR O QUIZ",
    selos: ["Leva 1 minuto", "Todo mundo ganha algo"],
  },

  // ---------- Perguntas ----------
  // "correta" é o índice (0-based) dentro de "opcoes"
  perguntas: [
    {
      pergunta: "Quantos jogadores cada time tem em campo no início da partida?",
      opcoes: ["9", "10", "11", "12"],
      correta: 2,
    },
    {
      pergunta: "Qual seleção tem mais títulos de Copa do Mundo?",
      opcoes: ["Alemanha", "Brasil", "Itália", "Argentina"],
      correta: 1,
    },
    {
      pergunta: "Em quais países acontece a Copa do Mundo de 2026?",
      opcoes: [
        "Estados Unidos, México e Canadá",
        "Espanha e Portugal",
        "Argentina, Uruguai e Paraguai",
        "Catar",
      ],
      correta: 0,
    },
    {
      pergunta: "Quanto tempo dura cada tempo de uma partida oficial?",
      opcoes: ["30 minutos", "40 minutos", "45 minutos", "60 minutos"],
      correta: 2,
    },
    {
      pergunta: "Qual clube brasileiro tem mais títulos da Libertadores?",
      opcoes: ["Flamengo", "Palmeiras", "Santos", "Grêmio"],
      correta: 1,
    },
  ],

  // ---------- Prêmios por faixa de acerto ----------
  // A primeira faixa cujo "minimo" for <= acertos é a escolhida (ordem: maior → menor)
  premios: [
    {
      minimo: 5,
      nivel: "CRAQUE",
      titulo: "Bônus completo de boas-vindas",
      descricao: "Gabaritou! Você desbloqueou o prêmio máximo.",
      emoji: "🏆",
    },
    {
      minimo: 3,
      nivel: "TITULAR",
      titulo: "Bônus de boas-vindas",
      descricao: "Mandou bem. Tem prêmio te esperando no WhatsApp.",
      emoji: "⚽",
    },
    {
      minimo: 0,
      nivel: "RESERVA",
      titulo: "Aposta grátis de consolação",
      descricao: "Não foi dessa vez, mas ninguém sai de mãos vazias.",
      emoji: "🎁",
    },
  ],

  // ---------- Resultado ----------
  resultado: {
    ctaLabel: "RESGATAR NO WHATSAPP",
    hint: "Abre o WhatsApp com sua mensagem pronta • Grátis",
    // segundos de "processando" antes de mostrar o prêmio (0 desliga)
    loadingSegundos: 2.2,
  },

  // Rodapé / compliance
  compliance: {
    idade: "+18",
    aviso: "Jogue com responsabilidade. Proibido para menores de 18 anos.",
  },
};
