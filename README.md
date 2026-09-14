# Quiz da Libertadores com resgate no WhatsApp

Página de quiz (contexto: reta final da Libertadores) em tela única: landing → 6 perguntas com feedback certo/errado → "processando" → resultado com prêmio por faixa de acerto → botão que abre o WhatsApp com mensagem pronta.

Mesmo padrão da `lp-aposta-garantida`: Next 15 estático (`output: "export"`), sem backend, deploy na Vercel.

## Onde mexer

Tudo que muda entre campanhas/afiliados está em [`app/config.js`](app/config.js):

| Campo | O que é |
| --- | --- |
| `whatsappNumero` | Número que recebe o resgate, só dígitos com DDI+DDD (`5511999999999`). **Está com placeholder.** |
| `whatsappMensagem` | Texto pré-preenchido. Aceita `{premio}`, `{nivel}`, `{acertos}`, `{total}`. |
| `tema` | Cores: `destaque` (dourado), `fundo` e `fundoClaro` (marinho), `card`, `borda`. |
| `pixelId` | Meta Pixel. Vazio = não carrega. |
| `landing` | Copy da primeira tela. `*palavra*` vira destaque. |
| `perguntas` | Lista de perguntas. `correta` é o índice (0-based) da opção certa. |
| `premios` | Faixas por acerto. Pega a primeira faixa com `minimo <= acertos`. |
| `loading` | Eyebrow, etapas de texto e `segundos` do "VAR em análise". `0` desliga. |

## Eventos do Pixel (quando `pixelId` estiver preenchido)

- `PageView` — carregou a página
- `ViewContent` (`content_name: "quiz_resultado"`, `value: acertos`) — chegou no resultado
- `Lead` (`content_name: nível do prêmio`, `value: acertos`) — clicou em resgatar

Otimizar campanha por `Lead`.

## Rodar local

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. `git init`, commit, sobe pro GitHub.
2. Importa na Vercel. Detecta Next e o `output: "export"` sozinho.
3. Sem env vars.

## Cuidados

- Não instalar `sharp` como devDependency (quebrou o deploy da LP Aposta Garantida).
- `robots: noindex` está ligado no `layout.js`. Tirar se quiser indexar.
