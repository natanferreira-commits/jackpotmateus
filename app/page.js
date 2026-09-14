"use client";

import { useEffect, useState } from "react";
import { config } from "./config";

// transforma *palavra* em destaque na cor
function Highlight({ text }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <span className="hl" key={i}>
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function WhatsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// taça estilizada (não é o troféu oficial)
function Trophy({ size = 120 }) {
  return (
    <svg className="trophy" width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE58A" />
          <stop offset="0.5" stopColor="var(--gold)" />
          <stop offset="1" stopColor="#A8791A" />
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8A6412" />
          <stop offset="0.5" stopColor="#FFE58A" />
          <stop offset="1" stopColor="#8A6412" />
        </linearGradient>
      </defs>
      {/* alças */}
      <path d="M30 30c-10 0-16 8-14 18 2 12 12 18 22 18" stroke="url(#g2)" strokeWidth="6" strokeLinecap="round" />
      <path d="M90 30c10 0 16 8 14 18-2 12-12 18-22 18" stroke="url(#g2)" strokeWidth="6" strokeLinecap="round" />
      {/* copa */}
      <path d="M34 20h52v26c0 16-11 30-26 30S34 62 34 46V20z" fill="url(#g1)" />
      <path d="M34 20h52v6H34z" fill="#FFE58A" opacity="0.9" />
      {/* haste + base */}
      <path d="M54 76h12l4 14H50l4-14z" fill="url(#g1)" />
      <rect x="40" y="90" width="40" height="8" rx="2" fill="url(#g1)" />
      <rect x="34" y="98" width="52" height="10" rx="3" fill="#A8791A" />
      {/* brilho */}
      <path d="M44 28c0 14 4 24 12 30" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Footer() {
  const { compliance } = config;
  return (
    <footer className="footer">
      <strong>{compliance.idade}</strong> — {compliance.aviso}
    </footer>
  );
}

function track(event, params) {
  try {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", event, params);
    }
  } catch (e) {}
}

function escolherPremio(acertos) {
  const ordenados = [...config.premios].sort((a, b) => b.minimo - a.minimo);
  return ordenados.find((p) => acertos >= p.minimo) || ordenados[ordenados.length - 1];
}

function montarLinkWhatsApp(premio, acertos, total) {
  const msg = config.whatsappMensagem
    .replace("{premio}", premio.titulo)
    .replace("{nivel}", premio.nivel)
    .replace("{acertos}", String(acertos))
    .replace("{total}", String(total));
  return `https://wa.me/${config.whatsappNumero}?text=${encodeURIComponent(msg)}`;
}

// ============= LANDING =============
function Landing({ onStart }) {
  const { landing } = config;
  const n = config.perguntas.length;
  return (
    <div className="screen landing">
      <div className="content">
        <div className="eyebrow">
          <span className="dot" />
          {landing.eyebrow}
        </div>
        <Trophy />
        <h1>
          <Highlight text={landing.titulo} />
        </h1>
        <p className="sub">{landing.subtitulo}</p>
      </div>

      <div className="actions">
        <div className="selos">
          {landing.selos.map((s, i) => (
            <span className="selo" key={i}>
              <Check />
              {s}
            </span>
          ))}
        </div>
        <button className="cta" onClick={onStart}>
          {landing.ctaLabel}
        </button>
        <p className="cta-hint">{landing.hint.replace("{n}", String(n))}</p>
        <Footer />
      </div>
    </div>
  );
}

// ============= QUIZ =============
const FEEDBACK_MS = 900;

function Quiz({ onFinish }) {
  const { perguntas } = config;
  const [idx, setIdx] = useState(0);
  const [escolha, setEscolha] = useState(null);
  const [acertos, setAcertos] = useState(0);

  const atual = perguntas[idx];
  const total = perguntas.length;
  const respondeu = escolha !== null;

  function responder(i) {
    if (respondeu) return;
    setEscolha(i);
    const acertou = i === atual.correta;
    const novoTotal = acertou ? acertos + 1 : acertos;
    setAcertos(novoTotal);

    setTimeout(() => {
      if (idx + 1 >= total) {
        onFinish(novoTotal);
      } else {
        setIdx(idx + 1);
        setEscolha(null);
      }
    }, FEEDBACK_MS);
  }

  function classeOpcao(i) {
    if (!respondeu) return "opcao";
    if (i === atual.correta) return "opcao certa";
    if (i === escolha) return "opcao errada";
    return "opcao apagada";
  }

  return (
    <div className="screen quiz">
      <div className="topbar">
        <span className="topbar-label">
          <span className="topbar-num">{String(idx + 1).padStart(2, "0")}</span>
          <span className="topbar-sep">/</span>
          {String(total).padStart(2, "0")}
        </span>
        <span className="topbar-score">
          <span className="topbar-score-num">{acertos}</span> {acertos === 1 ? "acerto" : "acertos"}
        </span>
      </div>
      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: `${((idx + (respondeu ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div className="content quiz-content" key={idx}>
        <h2 className="pergunta">{atual.pergunta}</h2>
        <div className="opcoes">
          {atual.opcoes.map((op, i) => (
            <button
              key={i}
              className={classeOpcao(i)}
              onClick={() => responder(i)}
              disabled={respondeu}
            >
              <span className="opcao-letra">{String.fromCharCode(65 + i)}</span>
              <span className="opcao-texto">{op}</span>
              {respondeu && i === atual.correta && (
                <span className="opcao-icone">
                  <Check />
                </span>
              )}
              {respondeu && i === escolha && i !== atual.correta && (
                <span className="opcao-icone">✕</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============= LOADING =============
function Loading({ onDone }) {
  const [p, setP] = useState(0);
  const { etapas, eyebrow, segundos } = config.loading;
  const dur = Math.max(0.3, segundos) * 1000;
  const etapa = etapas[Math.min(etapas.length - 1, Math.floor((p / 100) * etapas.length))];

  useEffect(() => {
    const inicio = Date.now();
    let fim = null;
    const t = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - inicio) / dur) * 100);
      setP(pct);
      if (pct >= 100) {
        clearInterval(t);
        fim = setTimeout(onDone, 250);
      }
    }, 40);
    return () => {
      clearInterval(t);
      if (fim) clearTimeout(fim);
    };
  }, [dur, onDone]);

  return (
    <div className="screen">
      <div className="content">
        <div className="eyebrow">
          <span className="dot" />
          {eyebrow}
        </div>
        <h2 className="pergunta">{etapa}…</h2>
        <div className="progress big">
          <div className="progress-fill" style={{ width: `${p}%` }} />
        </div>
      </div>
    </div>
  );
}

// ============= RESULTADO =============
function Resultado({ acertos }) {
  const total = config.perguntas.length;
  const premio = escolherPremio(acertos);
  const link = montarLinkWhatsApp(premio, acertos, total);
  const { resultado } = config;

  useEffect(() => {
    track("ViewContent", { content_name: "quiz_resultado", value: acertos });
  }, [acertos]);

  function resgatar() {
    track("Lead", { content_name: premio.nivel, value: acertos });
  }

  return (
    <div className="screen">
      <div className="content">
        <div className="placar">
          <span className="placar-num">{acertos}</span>
          <span className="placar-de">/ {total}</span>
        </div>
        <p className="placar-label">{resultado.placarLabel}</p>

        <div className="premio">
          <div className="premio-emoji">{premio.emoji}</div>
          <div className="premio-nivel">{premio.nivel}</div>
          <h1 className="premio-titulo">{premio.titulo}</h1>
          <p className="sub">{premio.descricao}</p>
        </div>
      </div>

      <div className="actions">
        <a className="cta" href={link} onClick={resgatar}>
          <WhatsIcon />
          {resultado.ctaLabel}
        </a>
        <p className="cta-hint">{resultado.hint}</p>
        <Footer />
      </div>
    </div>
  );
}

// ============= APP =============
export default function Home() {
  const [step, setStep] = useState("landing");
  const [acertos, setAcertos] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  function finishQuiz(n) {
    setAcertos(n);
    setStep(config.loading.segundos > 0 ? "loading" : "resultado");
  }

  return (
    <div className="app">
      <div className="pitch" aria-hidden="true" />
      {step === "landing" && <Landing onStart={() => setStep("quiz")} />}
      {step === "quiz" && <Quiz onFinish={finishQuiz} />}
      {step === "loading" && <Loading onDone={() => setStep("resultado")} />}
      {step === "resultado" && <Resultado acertos={acertos} />}
    </div>
  );
}
