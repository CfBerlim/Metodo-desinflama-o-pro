# AGENTS.md

Convenções universais para qualquer agente LLM (Claude Code, Gemini CLI, Cursor, Aider, GitHub Copilot, Codex, etc.) trabalhando neste projeto.

## Tl;dr

Você está em um **funil de vendas Bio-Premium em vanilla HTML/CSS/JS** — sem framework, sem build, sem dependência de runtime. Padrão estético: luxo silencioso (Patek/Hermès/Aman/Augustinus Bader). Mobile-first 480px. Idioma do produto: **PT-BR**.

Antes de tocar em qualquer arquivo, leia `README.md` (panorama completo).

## Princípios

1. **Vanilla > framework** — não introduza React/Vue/build tools. Decisão arquitetural.
2. **Mobile-first** — comece em 480px. Use `@media (min-width: 768px)` pra alargar.
3. **Tokens primeiro** — toda cor/tipo/espaço passa por `identity/tokens.css`. Nunca hardcode `#0a1f15` se existe `--emerald-900`.
4. **Padrão "bilionário", não "wellness"** — Augustinus Bader, não Sephora. Patek, não Casio.
5. **`content.js` antes de `index.html`** — estrutura é HTML, dado é JS. Copy editável fica em `content.js`.
6. **Reveal-zone com `display: none`** — nunca `opacity: 0`. Já errado uma vez (reservava layout vazio).
7. **Cache-busting via query strings** — sempre bumpar `?v=YYYYMMDDx` quando editar CSS/JS.
8. **YAGNI** — não adicione features, refatorações, ou abstrações além do pedido. Três linhas similares > abstração prematura.

## Estrutura

```
identity/   # Design system (tokens, logo, styleguide, validate)
landing/    # VSL longa + reveal aos 4:00 (Apothecary Noir)
checkout/   # Confirmação visual + Order Bump (Apothecary Noir)
upsell/     # VSL curta + reveal aos 1:30 (Apothecary Noir)
members/    # Área pós-compra (Botanique LIGHT)
validacao/  # QA dashboard com 4 iframes
pdfs/       # Templates print-to-PDF (Botanique PRINT)
nano-banana2/ # Pipeline de geração de imagens (Kie.ai · Gemini 3.1 Flash)
docs/       # Roteiro VSL, currículo 26 aulas, checklist Kiwify
doc/        # Protótipo original (canonical de design)
```

## Stack

- **HTML5 + CSS3 + Vanilla JS** (zero build)
- **Vimeo Player SDK** — reveal-zone disparado por `timeupdate`
- **Python `http.server`** — servidor local, porta 8082
- **Nano Banana 2** (Kie.ai) — geração de imagens

## Como rodar

```bash
python -m http.server 8082
```

URLs principais:
- `http://localhost:8082/landing/index.html`
- `http://localhost:8082/landing/index.html?reveal=true` (atalho dev)
- `http://localhost:8082/upsell/index.html?reveal=true`
- `http://localhost:8082/validacao/index.html` (QA dashboard)
- `http://localhost:8082/identity/styleguide.html`

## Geração de imagens

Quando o usuário pedir _"faz uma foto de X"_, _"gera uma imagem de Y"_, _"renderiza Z"_:

1. Ler `nano-banana2/SKILL.md` (schema JSON denso-narrativo)
2. Criar prompt em `nano-banana2/prompts/<categoria>/<nome>.json`
3. Rodar:
   ```bash
   python nano-banana2/scripts/generate_kie.py \
     nano-banana2/prompts/<categoria>/<nome>.json \
     nano-banana2/images/<categoria>/<nome>.jpg \
     "4:5"
   ```

Várias imagens no mesmo turno → disparar em paralelo.

Pré-requisito: `KIE_AI_API_KEY` em `.env` (raiz ou `~`) + `pip install requests`.

## Mecânica de reveal (landing + upsell)

Padrão idêntico nas duas superfícies:

```js
// CSS
#reveal-zone { display: none; }
#reveal-zone.unlocked {
  display: block;
  animation: revealUnlock 1.6s var(--ease-dramatic) both;
}

// JS
player.on('timeupdate', (data) => {
  if (data.seconds >= REVEAL_AT) fireReveal('timeupdate');
});

function fireReveal(source) {
  if (revealFiredOnce) return;
  revealFiredOnce = true;
  zone.classList.add('unlocked');
  setTimeout(() => zone.scrollIntoView({ behavior: 'smooth' }), 600);
}
```

Atalhos: `?reveal=true` força reveal imediato.
Disparos: `timeupdate` ≥ threshold, `seeked`, `ended`, fallback timeout.

## Convenções de código

### CSS

- Use sempre tokens (`var(--gold-500)`, não `#b8923f`)
- Mobile-first: estilo base é mobile, `@media (min-width: 768px)` alarga
- Nomes de classe descritivos (`upsell-progress-track`, não `bar1`)
- Animações com `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-dramatic`) ou `cubic-bezier(0.22, 0.61, 0.36, 1)` (`--ease-elegant`)
- Box-shadow em camadas (inset glow + outer glow + drop) pra efeito cinematográfico

### HTML

- Semântico (`<section>`, `<article>`, `<main>`)
- `data-*` attributes pra hooks de QA (`data-screen-label="..."`)
- Schema.org Product na landing
- Link de CSS sempre com `?v=YYYYMMDDx`

### JavaScript

- ES6+ vanilla (sem TypeScript, sem JSX)
- IIFE `(function() { ... })()` pra escopo local
- `console.info('[reveal]', ...)` pra debug — facilita inspeção em produção
- Eventos custom Meta Pixel + GTM dataLayer em todo CTA

### Commits

Em PT-BR. Sufixo descritivo simples:

- `feat(<surface>): ...` — nova feature
- `fix(<surface>): ...` — correção
- `docs: ...` — documentação
- `style(<surface>): ...` — só estética/CSS
- `refactor: ...` — sem mudança de comportamento

Exemplo real do projeto:
```
fix(upsell): paridade arquitetural com landing - Vimeo iframe real + reveal-zone (offer+price+buttons) escondido ate 1:30 ou ?reveal=true
```

## O que NÃO fazer

- ❌ Introduzir framework JS (React/Vue/Svelte/etc)
- ❌ Introduzir bundler (webpack/vite/rollup)
- ❌ Usar `opacity: 0` pra esconder reveal-zone
- ❌ Hardcodar cores quando existe token
- ❌ Criar arquivos `.md` de doc não solicitados
- ❌ Commitar `.env`, chaves de API, tokens
- ❌ Substituir placeholders (`SUBSTITUIR_*`, `XXXXXXX`) sem ordem explícita
- ❌ Adicionar `console.log` casual em produção (só `console.info` semântico)
- ❌ Mudar copy sem confirmar (a copy é cuidadosamente calibrada)

## Pré-deploy: substituir placeholders

7 valores em `landing/content.js`, `upsell/content.js`, `landing/index.html`. Tabela completa em `README.md` seção 10. Procedimento fase-a-fase em `docs/checklist-kiwify-hotmart.md`.

## Documentos relacionados

- `README.md` — panorama completo do projeto
- `CLAUDE.md` — instruções específicas pro Claude Code
- `GEMINI.md` — instruções específicas pro Gemini CLI
- `CHANGELOG.md` — histórico de versões
- `docs/` — roteiro VSL, currículo, checklist Kiwify
- `nano-banana2/SKILL.md` — pipeline de imagens
