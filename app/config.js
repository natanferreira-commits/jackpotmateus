// ============================================================
//  CONFIG DO QUIZ — troque só o que está aqui
//  Contexto atual: reta final da Libertadores
// ============================================================

export const config = {
  // >>> WhatsApp que recebe o resgate (só dígitos, com DDI+DDD) <<<
  // Ex: "5511999999999"
  whatsappNumero: "5500000000000",

  // Mensagem que chega pré-preenchida no WhatsApp.
  // Variáveis: {premio} {acertos} {total} {nivel}
  whatsappMensagem:
    "Oi! Fiz o quiz da Libertadores, acertei {acertos} de {total} e cheguei no nível {nivel}. Quero resgatar: {premio} 🏆",

  // Cores do tema (Libertadores: marinho + dourado)
  tema: {
    destaque: "#F5C542", // dourado — botão, títulos, placar
    fundo: "#050d24", // marinho profundo
    fundoClaro: "#0b1a3f", // marinho do topo / brilho
    card: "rgba(255,255,255,0.05)",
    borda: "rgba(255,255,255,0.12)",
  },

  // Marca
  marca: "Dupla Aposta",

  // Meta Pixel ID (deixe "" pra não carregar)
  pixelId: "",

  // ---------- Landing ----------
  landing: {
    eyebrow: "Libertadores • Reta final",
    // a palavra entre *asteriscos* vira destaque na cor
    titulo: "A Liberta chegou no *mata-mata*. Você tá pronto?",
    subtitulo:
      "Responde 6 perguntas sobre a Libertadores. Quanto mais acertar, maior o prêmio que você resgata no WhatsApp pra usar na reta final.",
    ctaLabel: "ENTRAR EM CAMPO",
    selos: ["Leva 1 minuto", "Todo mundo ganha algo"],
    // texto pequeno abaixo do botão. {n} = número de perguntas
    hint: "{n} perguntas • Prêmio no apito final",
  },

  // ---------- Perguntas ----------
  // "correta" é o índice (0-based) dentro de "opcoes"
  perguntas: [
    {
      pergunta: "Quem é o maior campeão da história da Libertadores?",
      opcoes: ["Boca Juniors", "Independiente", "Peñarol", "River Plate"],
      correta: 1,
    },
    {
      pergunta: "Qual foi o primeiro clube brasileiro a levantar a taça?",
      opcoes: ["Santos", "Cruzeiro", "Flamengo", "Grêmio"],
      correta: 0,
    },
    {
      pergunta: "Em que ano foi disputada a primeira edição da Libertadores?",
      opcoes: ["1955", "1960", "1971", "1986"],
      correta: 1,
    },
    {
      pergunta: "Desde 2019, como a final da Libertadores é decidida?",
      opcoes: [
        "Ida e volta",
        "Jogo único em campo neutro",
        "Jogo único na casa do melhor campanha",
        "Melhor de três",
      ],
      correta: 1,
    },
    {
      pergunta: "Quem é o maior artilheiro da história da competição?",
      opcoes: ["Pelé", "Gabigol", "Alberto Spencer", "Fernando Morena"],
      correta: 2,
    },
    {
      pergunta: "Qual clube foi bicampeão seguido em 2020 e 2021?",
      opcoes: ["Flamengo", "Palmeiras", "River Plate", "Boca Juniors"],
      correta: 1,
    },
  ],

  // ---------- Prêmios por faixa de acerto ----------
  // A primeira faixa cujo "minimo" for <= acertos é a escolhida (ordem: maior → menor)
  premios: [
    {
      minimo: 6,
      nivel: "GLÓRIA ETERNA",
      titulo: "Bônus máximo pra reta final",
      descricao: "Gabaritou. Você é da Glória Eterna e desbloqueou o prêmio máximo.",
      emoji: "🏆",
    },
    {
      minimo: 4,
      nivel: "MATA-MATA",
      titulo: "Bônus pra apostar no mata-mata",
      descricao: "Passou de fase. Tem prêmio te esperando no WhatsApp.",
      emoji: "⚔️",
    },
    {
      minimo: 0,
      nivel: "FASE DE GRUPOS",
      titulo: "Aposta grátis de consolação",
      descricao: "Não classificou dessa vez, mas ninguém sai de campo de mãos vazias.",
      emoji: "🎟️",
    },
  ],

  // ---------- Loading ----------
  loading: {
    eyebrow: "VAR em análise",
    etapas: ["Conferindo suas respostas", "Revisando o lance", "Liberando seu prêmio"],
    // segundos de "processando" antes de mostrar o prêmio (0 desliga)
    segundos: 2.4,
  },

  // ---------- Resultado ----------
  resultado: {
    placarLabel: "acertos",
    ctaLabel: "RESGATAR NO WHATSAPP",
    hint: "Abre o WhatsApp com sua mensagem pronta • Grátis",
  },

  // Rodapé / compliance
  compliance: {
    idade: "+18",
    aviso: "Jogue com responsabilidade. Proibido para menores de 18 anos.",
  },
};
