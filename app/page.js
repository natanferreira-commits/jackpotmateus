"use client";

import { useEffect, useMemo, useState } from "react";
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
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

// número curto do bilhete, sem caracteres ambíguos (0/O, 1/I)
function gerarCodigo() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function nomeJogo(p) {
  if (p.jogo === null || p.jogo === undefined) return "Rodada";
  const j = config.rodada.jogos[p.jogo];
  return `${j.casa} x ${j.fora}`;
}

function montarLinkWhatsApp(escolhas, codigo) {
  const linhas = config.palpites
    .map((p, i) => `${i + 1}. ${nomeJogo(p)} — ${p.mercado}: ${p.opcoes[escolhas[i]]}`)
    .join("\n");
  const msg = config.whatsappMensagem
    .replace("{rodada}", config.rodada.nome)
    .replace("{codigo}", codigo)
    .replace("{palpites}", linhas);
  return `https://wa.me/${config.whatsappNumero}?text=${encodeURIComponent(msg)}`;
}

// ---------- contador ----------
function useCountdown(iso) {
  const alvo = useMemo(() => (iso ? new Date(iso).getTime() : null), [iso]);
  const [agora, setAgora] = useState(null);
  useEffect(() => {
    if (!alvo) return;
    setAgora(Date.now());
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [alvo]);
  if (!alvo || Number.isNaN(alvo) || agora === null) return null;
  const diff = Math.max(0, alvo - agora);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { encerrado: diff === 0, d, h, m, s };
}

function Countdown() {
  const c = useCountdown(config.rodada.encerramento);
  if (!c) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className={`countdown${c.encerrado ? " encerrado" : ""}`}>
      <span className="countdown-label">{c.encerrado ? "Palpites encerrados" : "Palpites fecham em"}</span>
      {!c.encerrado && (
        <span className="countdown-num">
          {c.d > 0 && `${c.d}d `}
          {pad(c.h)}:{pad(c.m)}:{pad(c.s)}
        </span>
      )}
    </div>
  );
}

// ---------- blocos ----------
function Marquee() {
  const itens = [...config.marquee, ...config.marquee, ...config.marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {itens.map((t, i) => (
          <span key={i}>
            {t}
            <i>•</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function Header({ right }) {
  return (
    <header className="header">
      <span className="brand">{config.marca}</span>
      <span className="header-right">{right}</span>
    </header>
  );
}

function Aviso() {
  const { aviso } = config;
  return (
    <section className="aviso">
      <div className="aviso-titulo">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
        {aviso.titulo}
      </div>
      {aviso.linhas.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </section>
  );
}

function Rodape() {
  return <p className="rodape">© {new Date().getFullYear()} {config.marca}. +18. Jogue com responsabilidade.</p>;
}

function StickyCta({ children, hint }) {
  return (
    <div className="sticky">
      <div className="sticky-inner">
        {children}
        {hint && <p className="sticky-hint">{hint}</p>}
      </div>
    </div>
  );
}

// ============= LANDING =============
function Landing({ onStart }) {
  const { landing, oferta, rodada } = config;
  return (
    <div className="page">
      <Marquee />
      <Header right={rodada.nome} />

      <main className="wrap">
        <section className="hero">
          <span className="label">{landing.label}</span>
          <h1>
            <Highlight text={landing.titulo} />
          </h1>
          <p className="lead">{landing.subtitulo}</p>
          <Countdown />
        </section>

        <section className="oferta">
          <div className="oferta-valor">{oferta.valor}</div>
          <div className="oferta-regra">{oferta.regra}</div>
        </section>

        <section className="bloco">
          <h2 className="bloco-titulo">Os jogos da rodada</h2>
          <ul className="jogos">
            {rodada.jogos.map((j, i) => (
              <li key={i}>
                <span className="jogo-times">
                  {j.casa} <em>x</em> {j.fora}
                </span>
                <span className="jogo-quando">{j.quando}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bloco">
          <h2 className="bloco-titulo">Como funciona</h2>
          <ol className="passos">
            {landing.comoFunciona.map((t, i) => (
              <li key={i}>
                <span className="passo-num">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </section>

        <Aviso />
        <Rodape />
      </main>

      <StickyCta hint={landing.ctaHint}>
        <button className="btn" onClick={onStart}>
          {landing.ctaLabel} <Arrow />
        </button>
      </StickyCta>
    </div>
  );
}

// ============= PALPITES =============
const AVANCO_MS = 320;

function Palpites({ onFinish }) {
  const { palpites, rodada } = config;
  const [idx, setIdx] = useState(0);
  const [escolhas, setEscolhas] = useState([]);
  const [selecionado, setSelecionado] = useState(null);

  const atual = palpites[idx];
  const total = palpites.length;
  const jogo = atual.jogo === null || atual.jogo === undefined ? null : rodada.jogos[atual.jogo];
  const bloqueado = selecionado !== null;

  function escolher(i) {
    if (bloqueado) return;
    setSelecionado(i);
    const novas = [...escolhas];
    novas[idx] = i;
    setEscolhas(novas);
    setTimeout(() => {
      if (idx + 1 >= total) {
        onFinish(novas);
      } else {
        setIdx(idx + 1);
        setSelecionado(null);
      }
    }, AVANCO_MS);
  }

  function voltar() {
    if (idx === 0 || bloqueado) return;
    setIdx(idx - 1);
    setSelecionado(null);
  }

  return (
    <div className="page">
      <Header right={`Palpite ${idx + 1} de ${total}`} />
      <div className="progress">
        <div className="progress-fill" style={{ width: `${((idx + (bloqueado ? 1 : 0)) / total) * 100}%` }} />
      </div>

      <main className="wrap palpite" key={idx}>
        <div className="fixture">
          {jogo ? (
            <>
              <div className="fixture-times">
                <span>{jogo.casa}</span>
                <em>x</em>
                <span>{jogo.fora}</span>
              </div>
              <div className="fixture-quando">{jogo.quando}</div>
            </>
          ) : (
            <>
              <div className="fixture-times">
                <span>Rodada inteira</span>
              </div>
              <div className="fixture-quando">{rodada.nome}</div>
            </>
          )}
        </div>

        <span className="label">{atual.mercado}</span>
        <h2 className="pergunta">{atual.pergunta}</h2>

        <div className={`opcoes${atual.opcoes.length === 2 ? " duas" : ""}`}>
          {atual.opcoes.map((op, i) => (
            <button
              key={i}
              className={`opcao${selecionado === i ? " marcada" : ""}${bloqueado && selecionado !== i ? " apagada" : ""}`}
              onClick={() => escolher(i)}
              disabled={bloqueado}
            >
              {op}
            </button>
          ))}
        </div>

        {idx > 0 && (
          <button className="voltar" onClick={voltar} disabled={bloqueado}>
            ← Voltar
          </button>
        )}
      </main>
    </div>
  );
}

// ============= LOADING =============
function Loading({ onDone }) {
  const [p, setP] = useState(0);
  const { etapas, label, segundos } = config.loading;
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
        fim = setTimeout(onDone, 200);
      }
    }, 40);
    return () => {
      clearInterval(t);
      if (fim) clearTimeout(fim);
    };
  }, [dur, onDone]);

  return (
    <div className="page">
      <Header right={label} />
      <main className="wrap centro">
        <span className="label">{label}</span>
        <h2 className="pergunta">{etapa}…</h2>
        <div className="progress solto">
          <div className="progress-fill" style={{ width: `${p}%` }} />
        </div>
      </main>
    </div>
  );
}

// ============= BILHETE =============
function Bilhete({ escolhas, codigo, onRefazer }) {
  const link = montarLinkWhatsApp(escolhas, codigo);
  const { bilhete, rodada, oferta } = config;

  useEffect(() => {
    track("ViewContent", { content_name: "bilhete", content_ids: [codigo] });
  }, [codigo]);

  function registrar() {
    track("Lead", { content_name: "bilhete_whatsapp", content_ids: [codigo] });
  }

  return (
    <div className="page">
      <Header right={bilhete.label} />

      <main className="wrap">
        <section className="hero compacto">
          <span className="label">{bilhete.label}</span>
          <h1>{bilhete.titulo}</h1>
          <p className="lead">{bilhete.subtitulo}</p>
        </section>

        <section className="slip">
          <div className="slip-head">
            <div>
              <div className="slip-titulo">Bolão da Libertadores</div>
              <div className="slip-sub">{rodada.nome}</div>
            </div>
            <div className="slip-num">
              <span>Bilhete</span>#{codigo}
            </div>
          </div>
          <ul className="slip-lista">
            {config.palpites.map((p, i) => (
              <li key={i}>
                <div className="slip-jogo">
                  {nomeJogo(p)} <span>· {p.mercado}</span>
                </div>
                <div className="slip-escolha">{p.opcoes[escolhas[i]]}</div>
              </li>
            ))}
          </ul>
          <div className="slip-foot">
            <span>Cravou os 5</span>
            <strong>{oferta.valor} no Pix</strong>
          </div>
        </section>

        <button className="voltar centro-btn" onClick={onRefazer}>
          {bilhete.refazerLabel}
        </button>

        <Aviso />
        <Rodape />
      </main>

      <StickyCta hint={bilhete.ctaHint}>
        <a className="btn" href={link} onClick={registrar}>
          <WhatsIcon /> {bilhete.ctaLabel}
        </a>
      </StickyCta>
    </div>
  );
}

// ============= APP =============
export default function Home() {
  const [step, setStep] = useState("landing");
  const [escolhas, setEscolhas] = useState([]);
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  function finish(novas) {
    setEscolhas(novas);
    setCodigo(gerarCodigo());
    setStep(config.loading.segundos > 0 ? "loading" : "bilhete");
  }

  if (step === "palpites") return <Palpites onFinish={finish} />;
  if (step === "loading") return <Loading onDone={() => setStep("bilhete")} />;
  if (step === "bilhete") return <Bilhete escolhas={escolhas} codigo={codigo} onRefazer={() => setStep("palpites")} />;
  return <Landing onStart={() => setStep("palpites")} />;
}
