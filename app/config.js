// ============================================================
//  CONFIG — troque só o que está aqui
//
//  modo: "jackpot"  → máquina caça-níquel (Jackpot do Caumo). Copy e regras na seção `jackpot` lá embaixo.
//  modo: "bolao"    → bolão de palpites (Brasileirão 2026, 28ª rodada). Tudo abaixo continua valendo.
// ============================================================

const base = {
  modo: "jackpot",

  // >>> WhatsApp que recebe o bilhete (só dígitos, com DDI+DDD) <<<
  // Ex: "5511999999999"
  whatsappNumero: "559180194075",

  // Mensagem que chega pré-preenchida no WhatsApp.
  // Variáveis: {rodada} {codigo} {palpites} (lista numerada, uma por linha)
  whatsappMensagem: "Quero validar meu palpite #{codigo}",

  // Supabase: guarda os bilhetes e os eventos do funil, e alimenta o /admin.
  // Project Settings → API: "Project URL" e a chave "anon public". A anon é pública mesmo, pode ficar aqui.
  // Vazio = não grava nada e o /admin fica desligado. Rode o supabase.sql ANTES de preencher.
  supabase: {
    url: "https://oucgyfssnqkczrzezrvc.supabase.co",
    anonKey: "sb_publishable_bWA7Sj2RbadVCqtsP9CQwA_4rGH_Rr_",
  },

  marca: "Mateus Caumo",

  // Google Analytics 4 — ID de medição (ex: "G-XXXXXXXXXX"). "" não carrega.
  gaId: "G-MHV790Y2BV",

  // Meta Pixel ID (deixe "" pra não carregar)
  pixelId: "",

  // ---------- Título e descrição da página (aba do navegador, preview do link) ----------
  seo: {
    titulo: "Bolão do Brasileirão — R$ 500 pra quem cravar 10 palpites",
    descricao: "Dois palpites por jogo de sábado do Brasileirão. Cravou os 10, leva R$ 500 no Pix. Grátis.",
  },

  // ---------- Oferta ----------
  oferta: {
    valor: "R$ 500",
    regra: "no Pix pra quem cravar os 10",
  },

  // ---------- Rodada ----------
  rodada: {
    // id curto: vai em todo evento do GA4 pra separar uma rodada da outra
    id: "br26-r28-sab",
    nome: "28ª rodada • Sábado",
    // Encerramento dos palpites (ISO com fuso). "" desliga o contador.
    encerramento: "2026-09-19T16:00:00-03:00",
    // escudos em /public/escudos
    jogos: [
      { casa: "Atlético-MG", fora: "Chapecoense", quando: "Sáb 19/09 • 16h", escudoCasa: "/escudos/atletico-mg.png", escudoFora: "/escudos/chapecoense.png" },
      { casa: "Mirassol", fora: "Botafogo", quando: "Sáb 19/09 • 17h", escudoCasa: "/escudos/mirassol.png", escudoFora: "/escudos/botafogo.png" },
      { casa: "Remo", fora: "Santos", quando: "Sáb 19/09 • 18h30", escudoCasa: "/escudos/remo.png", escudoFora: "/escudos/santos.png" },
      { casa: "Vasco", fora: "Coritiba", quando: "Sáb 19/09 • 20h30", escudoCasa: "/escudos/vasco.png", escudoFora: "/escudos/coritiba.png" },
      { casa: "São Paulo", fora: "Internacional", quando: "Sáb 19/09 • 21h", escudoCasa: "/escudos/sao-paulo.png", escudoFora: "/escudos/internacional.png" },
    ],
  },

  // Faixa que roda no topo (separada por •)
  marquee: ["Bolão do Caumo", "Brasileirão", "R$ 500 no Pix", "Rodada de sábado", "Grátis", "10 palpites"],

  // ---------- Landing ----------
  landing: {
    // Imagem do hero, em /public. "" usa fundo liso.
    heroImage: "/hero.webp",
    // "fundo"   = arte vertical 1080x1920 cobrindo o hero inteiro
    // "recorte" = arte quadrada no meio do hero, com as bordas esfumadas
    heroModo: "recorte",
    label: "Bolão do Caumo • Brasileirão",
    // a palavra entre *asteriscos* vira destaque na cor
    titulo: "*R$ 500* pra quem cravar a rodada",
    subtitulo: "Dois palpites por jogo de sábado do Brasileirão: o resultado e um mercado. Cravou os dez, o Pix é seu.",
    ctaLabel: "Fazer meus palpites",
    ctaHint: "Grátis. Resultado sábado à noite.",
    comoFunciona: [
      "Responde as 10 perguntas em 2 minutos",
      "Registra o bilhete no WhatsApp",
      "Cravou os 10, recebe R$ 500 no Pix",
    ],
  },

  // ---------- Palpites ----------
  // "jogo" é o índice em rodada.jogos, ou null pra palpite da rodada inteira.
  // "mercado" é o rótulo curto que vai no bilhete e no WhatsApp.
  palpites: [
    // --- Atlético-MG x Chapecoense ---
    {
      jogo: 0,
      mercado: "Resultado",
      pergunta: "Quem vence o jogo?",
      opcoes: ["Atlético-MG", "Empate", "Chapecoense"],
    },
    {
      jogo: 0,
      mercado: "Total de gols",
      pergunta: "Quantos gols no jogo?",
      opcoes: ["3 ou mais", "Até 2"],
    },
    // --- Mirassol x Botafogo ---
    {
      jogo: 1,
      mercado: "Resultado",
      pergunta: "Quem vence o jogo?",
      opcoes: ["Mirassol", "Empate", "Botafogo"],
    },
    {
      jogo: 1,
      mercado: "Ambas marcam",
      pergunta: "Os dois times marcam?",
      opcoes: ["Sim", "Não"],
    },
    // --- Remo x Santos ---
    {
      jogo: 2,
      mercado: "Resultado",
      pergunta: "Quem vence o jogo?",
      opcoes: ["Remo", "Empate", "Santos"],
    },
    {
      jogo: 2,
      mercado: "Gol no 1º tempo",
      pergunta: "Sai gol no primeiro tempo?",
      opcoes: ["Sim", "Não"],
    },
    // --- Vasco x Coritiba ---
    {
      jogo: 3,
      mercado: "Resultado",
      pergunta: "Quem vence o jogo?",
      opcoes: ["Vasco", "Empate", "Coritiba"],
    },
    {
      jogo: 3,
      mercado: "Escanteios",
      pergunta: "Vai ter 10 ou mais escanteios?",
      opcoes: ["Sim, 10 ou mais", "Não, menos de 10"],
    },
    // --- São Paulo x Internacional ---
    {
      jogo: 4,
      mercado: "Resultado",
      pergunta: "Quem vence o jogo?",
      opcoes: ["São Paulo", "Empate", "Internacional"],
    },
    {
      jogo: 4,
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
    // título que aparece dentro do bilhete
    slipTitulo: "Bolão do Brasileirão",
    label: "Seu bilhete",
    titulo: "Registra no WhatsApp pra valer",
    subtitulo: "Sem registro o bilhete não conta. Aperta o botão que a mensagem já vai com o número do bilhete.",
    ctaLabel: "Registrar no WhatsApp",
    ctaHint: "Abre o WhatsApp com o número do seu bilhete",
    refazerLabel: "Refazer palpites",
  },

  // ---------- Aviso / compliance ----------
  aviso: {
    titulo: "Aviso importante",
    linhas: [
      "Bolão gratuito, sem depósito. Só concorre quem registrar o bilhete no WhatsApp antes do primeiro jogo.",
      "Se mais de um bilhete cravar os 10, o prêmio é sorteado entre eles.",
      "Apostas esportivas envolvem risco financeiro. Nunca aposte mais do que pode perder.",
      "Conteúdo destinado a maiores de 18 anos. Jogue com responsabilidade.",
    ],
  },
};

// ============================================================
//  JACKPOT DO CAUMO — só vale quando base.modo === "jackpot"
//  Sobrescreve seo, marquee, oferta, rodada, bilhete e aviso.
//  Prêmio de quem crava: acesso ao VIP + banca. O resgate é no WhatsApp.
// ============================================================
const jackpot = {
  whatsappMensagem: "Cravei o jackpot! Quero resgatar meu prêmio #{codigo}",

  seo: {
    titulo: "Jackpot do Caumo — puxa a alavanca e leva VIP + banca",
    descricao: "Puxa a alavanca da máquina do Caumo. Cravou o jackpot, ganha acesso ao VIP e uma banca pra começar. Grátis.",
  },

  oferta: {
    valor: "VIP + Banca",
    regra: "pra quem cravar o jackpot",
  },

  // id vai em todo evento (GA4 e Supabase) pra separar essa ação das rodadas do bolão
  rodada: {
    id: "jackpot-s39",
    nome: "Jackpot do Caumo",
    // Encerramento (ISO com fuso). "" desliga o contador.
    encerramento: "2026-09-27T23:59:00-03:00",
    fechaLabel: "Máquina fecha em",
    encerradoLabel: "Máquina fechada",
    jogos: [],
  },
  palpites: [],

  marquee: ["Jackpot do Caumo", "Puxa a alavanca", "Acesso ao VIP", "Banca liberada", "Grátis", "Resgate no WhatsApp"],

  maquina: {
    // Letreiro em cima da máquina (antes / depois de cravar)
    letreiro: "Jackpot",
    letreiroGanhou: "Jackpot!",
    label: "Jackpot do Caumo",
    titulo: "Puxa a alavanca e *crava o Caumo dourado*",
    subtitulo: "Três Caumos dourados na linha liberam acesso ao VIP e uma banca pra começar. Grátis, sem depósito.",
    ctaLabel: "Puxar a alavanca",
    ctaGirando: "Girando",
    ctaQuase: "Puxar de novo",
    ctaHint: "Grátis. Um giro e o prêmio já sai.",
    quaseTitulo: "Quase! Faltou um Caumo",
    quaseSub: "Você ainda tem um giro. Puxa de novo.",
    ganhouTitulo: "Cravou o jackpot",
    ganhouSub: "Fechando seu bilhete do prêmio",
    // Faixa que pisca embaixo dos rolos enquanto giram, criando expectativa
    faixaGirando: "🔥 Vem o Caumo dourado...",
    // Símbolos dos rolos. O primeiro é o do jackpot: "MATEUS" renderiza a imagem em imagemSimbolo.
    simbolos: ["MATEUS", "BAR", "★", "$", "◆"],
    // Imagem do símbolo de jackpot (rosto dourado, em /public)
    imagemSimbolo: "/mateus-dourado.png",
    // Em qual giro a máquina crava: 1 = ganha de primeira; 2 = o primeiro giro para em "quase" (dois Caumos) e o segundo crava.
    giroVencedor: 1,
    comoFunciona: [
      "Puxa a alavanca da máquina",
      "Cravou os três Caumos dourados, registra o prêmio no WhatsApp",
      "Recebe o acesso ao VIP e a banca",
    ],
  },

  bilhete: {
    slipTitulo: "Jackpot do Caumo",
    label: "Seu prêmio",
    titulo: "Resgate seu prêmio no WhatsApp!",
    subtitulo: "Aperta o botão abaixo: a mensagem já vai pronta, com o número do seu bilhete.",
    ctaLabel: "Resgatar no WhatsApp",
    ctaHint: "Abre o WhatsApp com o número do seu prêmio",
    refazerLabel: "Voltar pra máquina",
    // Linhas do bilhete de prêmio
    premio: [
      { item: "Acesso ao VIP", valor: "Liberado" },
      { item: "Banca", valor: "Liberada" },
    ],
    premioNome: "Acesso ao VIP + Banca",
    rodapeEsq: "Resgate",
    rodapeDir: "Pelo WhatsApp",
  },

  aviso: {
    titulo: "Aviso importante",
    linhas: [
      "Ação gratuita, sem depósito. O prêmio só é liberado pra quem registrar o bilhete no WhatsApp.",
      "Um prêmio por pessoa. Bilhetes duplicados são desconsiderados.",
      "Apostas esportivas envolvem risco financeiro. Nunca aposte mais do que pode perder.",
      "Conteúdo destinado a maiores de 18 anos. Jogue com responsabilidade.",
    ],
  },
};

export const config = base.modo === "jackpot" ? { ...base, ...jackpot } : base;
