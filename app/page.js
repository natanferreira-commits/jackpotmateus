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
    .replace("{acertos}", String(acertos))
    .replace("{total}", String(total));
  return `https://wa.me/${config.whatsappNumero}?text=${encodeURIComponent(msg)}`;
}

// ============= LANDING =============
function Landing({ onStart }) {
  const { landing, compliance } = config;
  return (
    <div className="screen">
      <div className="content">
        <div className="eyebrow">
          <span className="dot" />
          {landing.eyebrow}
        </div>
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
        <p className="cta-hint">{config.perguntas.length} perguntas • Prêmio no final</p>
        <footer className="footer">
          <strong>{compliance.idade}</strong> — {compliance.aviso}
        </footer>
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
          Pergunta {idx + 1} de {total}
        </span>
        <span className="topbar-score">
          {acertos} {acertos === 1 ? "acerto" : "acertos"}
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
const ETAPAS = ["Conferindo suas respostas", "Calculando sua pontuação", "Liberando seu prêmio"];

function Loading({ onDone }) {
  const [p, setP] = useState(0);
  const dur = Math.max(0.3, config.resultado.loadingSegundos) * 1000;
  const etapa = ETAPAS[Math.min(ETAPAS.length - 1, Math.floor((p / 100) * ETAPAS.length))];

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
          PROCESSANDO
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
  const { resultado, compliance } = config;

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
        <p className="placar-label">acertos</p>

        <div className="premio">
          <div className="premio-emoji">{premio.emoji}</div>
          <div className="premio-nivel">NÍVEL {premio.nivel}</div>
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
        <footer className="footer">
          <strong>{compliance.idade}</strong> — {compliance.aviso}
        </footer>
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
    setStep(config.resultado.loadingSegundos > 0 ? "loading" : "resultado");
  }

  return (
    <div className="app" style={{ "--lime": config.corDestaque }}>
      {step === "landing" && <Landing onStart={() => setStep("quiz")} />}
      {step === "quiz" && <Quiz onFinish={finishQuiz} />}
      {step === "loading" && <Loading onDone={() => setStep("resultado")} />}
      {step === "resultado" && <Resultado acertos={acertos} />}
    </div>
  );
}
