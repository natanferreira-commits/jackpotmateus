# Bolão da Liberta — palpites com registro no WhatsApp

Página em tela única: landing → 5 palpites de aposta sobre um jogo → "fechando seu bilhete" → bilhete com código → botão que abre o WhatsApp com o bilhete pronto pra registrar.

Não tem resposta certa na hora. O afiliado recebe o bilhete no WhatsApp, confere depois do jogo e paga o prêmio conforme a faixa de acertos.

Mesmo padrão da `lp-aposta-garantida`: Next 15 estático (`output: "export"`), sem backend, deploy na Vercel.

## Onde mexer

Tudo que muda entre jogos/afiliados está em [`app/config.js`](app/config.js):

| Campo | O que é |
| --- | --- |
| `whatsappNumero` | Número que recebe o bilhete, só dígitos com DDI+DDD (`5511999999999`). **Está com placeholder.** |
| `whatsappMensagem` | Texto pré-preenchido. Aceita `{jogo}`, `{codigo}`, `{palpites}` (lista numerada). |
| `jogo` | `nome`, `competicao` e `apito` (ISO com fuso). Com `apito` preenchido aparece um contador na landing. |
| `tema` | Cores: `destaque` (dourado), `fundo` e `fundoClaro` (marinho), `card`, `borda`. |
| `pixelId` | Meta Pixel. Vazio = não carrega. |
| `landing` | Copy da primeira tela. `*palavra*` vira destaque. |
| `premiacao` | Faixas mostradas na landing e no bilhete (`faixa`, `premio`, `destaque`). Só texto, o pagamento é manual. |
| `palpites` | Lista de perguntas. `mercado` é o rótulo curto que vai no bilhete e no WhatsApp. |
| `loading` | Eyebrow, etapas de texto e `segundos` do "fechando seu bilhete". `0` desliga. |
| `bilhete` | Copy da tela final. |

## Trocar de jogo

1. `jogo.nome`, `jogo.competicao`, `jogo.apito`.
2. Reescrever os 5 `palpites` (mercados sugeridos: vencedor, escanteios, ambas marcam, total de gols, cartão vermelho, gol no 1º tempo, quem marca primeiro).
3. Conferir se a `landing.titulo` e a `premiacao` ainda fazem sentido.

## Código do bilhete

Gerado no navegador, 6 caracteres sem 0/O/1/I. Não é único de verdade (não tem servidor), serve pra referência na conversa. Se precisar de unicidade, o caminho é salvar o bilhete numa planilha via Apps Script antes de abrir o WhatsApp (igual ao Placar Certo).

## Eventos do Pixel (quando `pixelId` estiver preenchido)

- `PageView` — carregou a página
- `ViewContent` (`content_name: "bilhete"`) — chegou no bilhete
- `Lead` (`content_name: "bilhete_whatsapp"`) — clicou em registrar

Otimizar campanha por `Lead`.

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
