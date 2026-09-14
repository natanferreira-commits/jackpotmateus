# Bolão da Libertadores — 5 palpites da rodada, R$ 500 pra quem cravar

Página mobile-first: landing (oferta, jogos da rodada, como funciona, aviso) → 5 palpites, um por jogo das quartas mais um da rodada → bilhete com número → botão fixo que abre o WhatsApp com o bilhete pronto pra registrar.

Não tem resposta certa na hora. O afiliado recebe o bilhete no WhatsApp, confere depois do jogo e paga o prêmio conforme a faixa de acertos.

Mesmo padrão da `lp-aposta-garantida`: Next 15 estático (`output: "export"`), sem backend, deploy na Vercel.

## Onde mexer

Tudo que muda entre jogos/afiliados está em [`app/config.js`](app/config.js):

| Campo | O que é |
| --- | --- |
| `whatsappNumero` | Número que recebe o bilhete, só dígitos com DDI+DDD (`5511999999999`). **Está com placeholder.** |
| `whatsappMensagem` | Texto pré-preenchido. Aceita `{rodada}`, `{codigo}`, `{palpites}` (lista numerada com jogo, mercado e escolha). |
| `oferta` | `valor` e `regra` do prêmio (bloco dourado da landing e rodapé do bilhete). |
| `rodada` | `nome`, `encerramento` (ISO com fuso, liga o contador) e `jogos` (casa, fora, quando). |
| `marquee` | Itens da faixa que roda no topo. |
| `pixelId` | Meta Pixel. Vazio = não carrega. |
| `landing` | Copy da primeira tela. `*palavra*` vira destaque. |
| `palpites` | Lista de perguntas. `jogo` é o índice em `rodada.jogos` (ou `null` pra palpite da rodada inteira), `mercado` é o rótulo curto. |
| `loading` | Eyebrow, etapas de texto e `segundos` do "fechando seu bilhete". `0` desliga. |
| `bilhete` | Copy da tela final. |
| `aviso` | Bloco "Aviso importante" (regras, desempate, +18). |

## Trocar de rodada

1. `rodada.nome`, `rodada.encerramento` e a lista `rodada.jogos`.
2. Reescrever os 5 `palpites` apontando o `jogo` certo (mercados sugeridos: resultado, escanteios, ambas marcam, total de gols, cartão vermelho, gol no 1º tempo; e um da rodada inteira, tipo "quantos brasileiros passam").
3. Conferir `landing.titulo`, `oferta` e as linhas do `aviso`.

## Código do bilhete

Gerado no navegador, 6 caracteres sem 0/O/1/I. Não é único de verdade (não tem servidor), serve pra referência na conversa. Se precisar de unicidade, o caminho é salvar o bilhete numa planilha via Apps Script antes de abrir o WhatsApp (igual ao Placar Certo).

## Eventos do Pixel (quando `pixelId` estiver preenchido)

- `PageView` — carregou a página
- `ViewContent` (`content_name: "bilhete"`) — chegou no bilhete
- `Lead` (`content_name: "bilhete_whatsapp"`) — clicou em registrar

Otimizar campanha por `Lead`.

## Design

Referência é a LP do Giro Premiado (produção): fundo quase preto, fonte Archivo via `next/font`, marquee no topo, seções com conteúdo real, bloco de aviso e CTA fixo no rodapé. Sem emoji, sem glow, sem animação decorativa.

## Rodar local

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Repo: `natanferreira-commits/quizresgate`.
2. Importa na Vercel. Detecta Next e o `output: "export"` sozinho.
3. Sem env vars.

## Cuidados

- Não instalar `sharp` como devDependency (quebrou o deploy da LP Aposta Garantida).
- `robots: noindex` está ligado no `layout.js`. Tirar se quiser indexar.
