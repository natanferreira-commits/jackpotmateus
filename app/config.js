// ============================================================
//  CONFIG DO BOLÃO — troque só o que está aqui
//  Contexto atual: quartas de final da Libertadores, jogos de volta
// ============================================================

export const config = {
  // >>> WhatsApp que recebe o bilhete (só dígitos, com DDI+DDD) <<<
  // Ex: "5511999999999"
  whatsappNumero: "5500000000000",

  // Mensagem que chega pré-preenchida no WhatsApp.
  // Variáveis: {rodada} {codigo} {palpites} (lista numerada, uma por linha)
  whatsappMensagem:
    "Oi! Quero registrar meu bilhete do bolão da Libertadores ({rodada}) pra concorrer aos R$ 500.\nBilhete #{codigo}\n\n{palpites}\n\nMe confirma que tá valendo?",

  marca: "Dupla Aposta",

  // Meta Pixel ID (deixe "" pra não carregar)
  pixelId: "",

  // ---------- Oferta ----------
  oferta: {
    valor: "R$ 500",
    regra: "no Pix pra quem cravar os 5",
  },

  // ---------- Rodada ----------
  rodada: {
    nome: "Quartas de final • Volta",
    // Encerramento dos palpites (ISO com fuso). "" desliga o contador.
    encerramento: "2026-09-15T19:00:00-03:00",
    jogos: [
      { casa: "Platense", fora: "Fluminense", quando: "Ter 15/09 • 19h" },
      { casa: "LDU", fora: "Palmeiras", quando: "Qua 16/09 • 19h" },
      { casa: "Corinthians", fora: "Estudiantes", quando: "Qua 16/09 • 21h30" },
      { casa: "Flamengo", fora: "Ind. del Valle", quando: "Qui 17/09 • 21h30" },
    ],
  },

  // Faixa que roda no topo (separada por •)
  marquee: ["Bolão da Libertadores", "R$ 500 no Pix", "Quartas de final", "Grátis", "5 palpites"],

  // ---------- Landing ----------
  landing: {
    label: "Bolão • Quartas de final",
    // a palavra entre *asteriscos* vira destaque na cor
    titulo: "Crava 5 palpites da rodada e leva *R$ 500*",
    subtitulo:
      "Um palpite por jogo das quartas, mais um da rodada inteira. Acertou os cinco, o Pix é seu.",
    ctaLabel: "Fazer meus palpites",
    ctaHint: "Grátis. Resultado depois do último jogo.",
    comoFunciona: [
      "Responde as 5 perguntas em 1 minuto",
      "Registra o bilhete no WhatsApp",
      "Cravou os 5, recebe R$ 500 no Pix",
    ],
  },

  // ---------- Palpites ----------
  // "jogo" é o índice em rodada.jogos, ou null pra palpite da rodada inteira.
  // "mercado" é o rótulo curto que vai no bilhete e no WhatsApp.
  palpites: [
    {
      jogo: 0,
      mercado: "Resultado",
      pergunta: "Quem vence no tempo normal?",
      opcoes: ["Platense", "Empate", "Fluminense"],
    },
    {
      jogo: 1,
      mercado: "Escanteios",
      pergunta: "Vai ter 10 ou mais escanteios?",
      opcoes: ["Sim, 10 ou mais", "Não, menos de 10"],
    },
    {
      jogo: 2,
      mercado: "Ambas marcam",
      pergunta: "Os dois times marcam?",
      opcoes: ["Sim", "Não"],
    },
    {
      jogo: 3,
      mercado: "Total de gols",
      pergunta: "Quantos gols no jogo?",
      opcoes: ["3 ou mais", "Até 2"],
    },
    {
      jogo: null,
      mercado: "Brasileiros na semi",
      pergunta: "Quantos brasileiros passam pra semifinal?",
      opcoes: ["2 ou menos", "3", "Os 4"],
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
      "Se mais de um bilhete cravar os 5, o prêmio é sorteado entre eles.",
      "Apostas esportivas envolvem risco financeiro. Nunca aposte mais do que pode perder.",
      "Conteúdo destinado a maiores de 18 anos. Jogue com responsabilidade.",
    ],
  },
};
