// ============================================================
//  CONFIG DO BOLÃO — troque só o que está aqui
//  Contexto atual: mata-mata da Libertadores
// ============================================================

export const config = {
  // >>> WhatsApp que recebe o bilhete (só dígitos, com DDI+DDD) <<<
  // Ex: "5511999999999"
  whatsappNumero: "5500000000000",

  // Mensagem que chega pré-preenchida no WhatsApp.
  // Variáveis: {jogo} {codigo} {palpites} (lista numerada, uma por linha)
  whatsappMensagem:
    "Oi! Quero registrar meu bilhete do bolão {jogo} (#{codigo}):\n\n{palpites}\n\nMe confirma aí que tá valendo? 🏆",

  // Cores do tema (Libertadores: marinho + dourado)
  tema: {
    destaque: "#F5C542",
    fundo: "#050d24",
    fundoClaro: "#0b1a3f",
    card: "rgba(255,255,255,0.05)",
    borda: "rgba(255,255,255,0.12)",
  },

  marca: "Dupla Aposta",

  // Meta Pixel ID (deixe "" pra não carregar)
  pixelId: "",

  // ---------- O jogo ----------
  jogo: {
    nome: "Fluminense x Platense",
    competicao: "Libertadores • Mata-mata",
    // Data/hora do apito inicial (ISO com fuso). "" desliga o contador.
    // Ex: "2026-09-17T21:30:00-03:00"
    apito: "",
  },

  // ---------- Landing ----------
  landing: {
    eyebrow: "Bolão da Liberta",
    // a palavra entre *asteriscos* vira destaque na cor
    titulo: "Crava *5 palpites* e leva prêmio no apito final.",
    subtitulo:
      "Cinco perguntas de aposta sobre o jogo. Você responde, registra o bilhete no WhatsApp e, se acertar, o prêmio é seu.",
    ctaLabel: "FAZER MEUS PALPITES",
    selos: ["Leva 1 minuto", "Grátis"],
    hint: "{n} palpites • Resultado depois do jogo",
  },

  // ---------- Premiação (mostrada na landing e no bilhete) ----------
  premiacao: [
    { faixa: "5 de 5", premio: "Prêmio máximo", destaque: true },
    { faixa: "4 de 5", premio: "Bônus na casa parceira" },
    { faixa: "Todo bilhete", premio: "Aposta grátis de participação" },
  ],

  // ---------- Palpites ----------
  // Cada item vira uma tela. "mercado" é o rótulo curto que vai no bilhete e no WhatsApp.
  palpites: [
    {
      mercado: "Vencedor",
      pergunta: "Quem vence o Fluminense x Platense no tempo normal?",
      opcoes: ["Fluminense", "Empate", "Platense"],
    },
    {
      mercado: "Escanteios",
      pergunta: "Vai ter 10 ou mais escanteios no jogo?",
      opcoes: ["Sim, 10 ou mais", "Não, menos de 10"],
    },
    {
      mercado: "Ambas marcam",
      pergunta: "Os dois times vão marcar gol?",
      opcoes: ["Sim, ambas marcam", "Não, pelo menos um zera"],
    },
    {
      mercado: "Total de gols",
      pergunta: "Quantos gols vai ter no jogo?",
      opcoes: ["Mais de 2,5 (3 ou mais)", "Menos de 2,5 (até 2)"],
    },
    {
      mercado: "Cartão vermelho",
      pergunta: "Vai ter cartão vermelho na partida?",
      opcoes: ["Sim, alguém vai expulso", "Não, ninguém é expulso"],
    },
  ],

  // ---------- Loading ----------
  loading: {
    eyebrow: "Fechando seu bilhete",
    etapas: ["Anotando seus palpites", "Gerando o código do bilhete", "Quase lá"],
    // segundos antes de mostrar o bilhete (0 desliga)
    segundos: 1.8,
  },

  // ---------- Bilhete ----------
  bilhete: {
    eyebrow: "Seu bilhete",
    titulo: "Registra no WhatsApp pra valer",
    ctaLabel: "REGISTRAR NO WHATSAPP",
    hint: "Abre o WhatsApp com seu bilhete pronto • Sem registro, não conta",
    refazerLabel: "Refazer palpites",
  },

  // Rodapé / compliance
  compliance: {
    idade: "+18",
    aviso: "Jogue com responsabilidade. Proibido para menores de 18 anos.",
  },
};
