# Protocolo Destrave Celular

Ecossistema completo do funil **Bio-Premium** para o infoproduto _Protocolo Destrave Celular_ (alternativamente, _Protocolo Reset Anti-Inflamatório_). Padrão estético de **luxo silencioso** — referências Patek Philippe, Hermès, Aman, Augustinus Bader. Mobile-first.

> Big Idea: _"Você não engorda por ser guloso ou preguiçoso — seu corpo está cronicamente inflamado."_

---

## Sumário

1. [Arquitetura do funil](#1-arquitetura-do-funil)
2. [Stack](#2-stack)
3. [Estrutura de pastas](#3-estrutura-de-pastas)
4. [Sistema de identidade visual](#4-sistema-de-identidade-visual)
5. [As 7 superfícies (página por página)](#5-as-7-superfícies-página-por-página)
6. [Mecânica de _reveal_](#6-mecânica-de-reveal)
7. [Como rodar localmente](#7-como-rodar-localmente)
8. [Geração de imagens (Nano Banana 2)](#8-geração-de-imagens-nano-banana-2)
9. [Como editar conteúdo (content.js)](#9-como-editar-conteúdo-contentjs)
10. [Pré-deploy: substituir placeholders](#10-pré-deploy-substituir-placeholders)
11. [Trabalho externo restante](#11-trabalho-externo-restante)
12. [Documentos de referência](#12-documentos-de-referência)

---

## 1. Arquitetura do funil

```
[ Anúncio Meta ]
       │
       ▼
┌──────────────────────────────────────────────────┐
│  LANDING (VSL longa, 6-8 min)                    │
│  Botão revela aos 4:00 — anti-impulso            │
└──────────────────────────────────────────────────┘
       │ "Quero acessar o método"
       ▼
┌──────────────────────────────────────────────────┐
│  CHECKOUT (Kiwify externo)                       │
│  Order Bump: Xícara de Ouro — R$ 27,90           │
└──────────────────────────────────────────────────┘
       │ pagamento aprovado
       ▼
┌──────────────────────────────────────────────────┐
│  UPSELL 1-click (VSL curta, 2-3 min)             │
│  Oferta revela aos 1:30 — Clube Vida Leve        │
│  R$ 147 à vista (12× R$ 14,70)                   │
└──────────────────────────────────────────────────┘
       │ aceita ou recusa
       ▼
┌──────────────────────────────────────────────────┐
│  ÁREA DE MEMBROS                                 │
│  26 aulas em 5 módulos                           │
│  Tranca: M I-II dia 1, M III-IV dia 8, M V dia 15│
└──────────────────────────────────────────────────┘
```

A trança no Módulo III até o dia 8 é **anti-reembolso oportunista** — Kiwify exige drip-release configurado pra ser efetivo.

---

## 2. Stack

- **HTML5 + CSS3 + Vanilla JS** — zero framework, zero build, zero dependência de runtime.
- **CSS Custom Properties** (`identity/tokens.css`) — design system inteiro como variáveis.
- **Vimeo Player SDK** — usado nas duas VSLs pra detectar `timeupdate` e disparar _reveal_.
- **Mobile-first** — `max-width: 480px` é o default. Breakpoint `768px` apenas alarga e aumenta tipografia.
- **Python `http.server`** pra servir local (porta 8082).
- **Nano Banana 2** (Kie.ai · Gemini 3.1 Flash) pra geração de imagens.

Ausências propositais: nenhum bundler, nenhum framework JS, nenhum CSS-in-JS, nenhum sistema de templates. O motivo é simples — **velocidade de carregamento e zero risco de breakage**, três coisas que landing pages de info-produto exigem.

---

## 3. Estrutura de pastas

```
.
├── identity/             # Sistema de design (tokens, logo, validate, styleguide)
│   ├── tokens.css        # 6 níveis emerald + 6 níveis gold + parchment + carbon + ink
│   ├── logo/             # SVGs: brand-mark, lockup horizontal, vertical, favicon, selo 7 dias
│   ├── styleguide.html   # Página viva mostrando todos os tokens em uso
│   ├── validate.html     # Checklist visual de regressão
│   └── validate.js
│
├── landing/              # VSL longa + reveal aos 4:00
│   ├── index.html        # HTML semântico, Vimeo iframe, schema.org Product
│   ├── style.css         # Apothecary Noir
│   ├── content.js        # Config: VIDEO_ID, pixels, KIWIFY_CHECKOUT_URL
│   ├── reveal.js         # (legado — JS hoje vive inline em index.html)
│   ├── tracking.js       # Meta Pixel + GTM
│   └── assets/           # poster, og-image
│
├── checkout/             # Confirmação visual + Order Bump (Kiwify externo)
│   ├── index.html
│   └── style.css
│
├── upsell/               # VSL curta + reveal aos 1:30
│   ├── index.html        # Vimeo iframe, reveal-zone, progress bar
│   ├── style.css
│   ├── content.js        # Config: VIDEO_ID, REVEAL_THRESHOLD_SECONDS, KIWIFY_ACCEPT/DECLINE
│   └── assets/           # upsell-poster
│
├── members/              # Área pós-compra
│   ├── index.html        # Botanique LIGHT (parchment+emerald+gold)
│   └── style.css         # Lock visual no Módulo III até dia 8
│
├── validacao/            # QA dashboard — 4 iframes lado a lado
│   ├── index.html
│   └── style.css
│
├── pdfs/                 # Materiais bônus (HTML print-to-PDF, A5)
│   ├── style.css         # Modo Botanique PRINT (ouro impresso, sem brilho)
│   ├── guia-compras.html
│   ├── planner-6-dias.html
│   └── receitas-15min.html
│
├── nano-banana2/         # Pipeline de geração de imagens
│   ├── SKILL.md          # Como invocar (lido pelo agente)
│   ├── scripts/generate_kie.py
│   ├── prompts/<categoria>/<nome>.json
│   ├── images/<categoria>/<nome>.jpg
│   └── references/       # Imagens de referência pra prompts
│
├── docs/                 # Documentação de produção
│   ├── roteiro-vsl-metodo-desinflamacao.md
│   ├── curriculo-metodo-desinflamacao.md
│   ├── checklist-kiwify-hotmart.md
│   └── superpowers/      # Specs e plans de implementação
│
├── doc/                  # Protótipo original (canonical de design)
│
├── CLAUDE.md             # Instruções pro agente neste diretório
└── README.md             # Você está aqui
```

---

## 4. Sistema de identidade visual

### Cores (6 níveis por família principal)

| Família | Range | Uso |
|---|---|---|
| `--emerald-*` | `900-400` | Verde floresta — fundo Apothecary, accent Botanique |
| `--gold-*` | `900-200` | Dourado antigo — texto destaque, bordas, ornamentos |
| `--carbon-*` | `1000-700` | Preto carbono — fundos Apothecary Noir |
| `--parchment-*` | 3 níveis | Pergaminho — fundos Botanique LIGHT |
| `--champagne` | 2 níveis | Marfim champagne — texto sobre dark |
| `--ink-*` | 5 níveis | Hierarquia de texto |

### Tipografia (4 famílias com papéis distintos)

| Variável | Família | Uso |
|---|---|---|
| `--ff-display` | **Italiana** | Títulos cerimoniais (h1, h2 grandes) |
| `--ff-editorial` | **Cormorant Garamond** _italic_ | Subtítulos, citações, preço |
| `--ff-smallcaps` | **Marcellus SC** | Eyebrows, labels, taglines (letter-spacing 0.3-0.5em) |
| `--ff-body` | **Inter** | Corpo, listas, UI |

### 4 modos visuais

1. **Apothecary Noir** — `landing/`, `checkout/`, `upsell/`. Fundo carbono + ouro + esmeralda. Iluminação cinematográfica em duas camadas (`body::before` + `body::after`).
2. **Heritage** — modo intermediário (não usado em superfície ativa, mas presente em `identity/styleguide.html`).
3. **Botanique LIGHT** — `members/`. Pergaminho + esmeralda + ouro-700. Tom orgânico premium.
4. **Botanique PRINT** — `pdfs/`. Variante do LIGHT pra impressão, sem efeitos de luz.

### Marca

- `brand-mark.svg` — composto: folha estilizada + losango heráldico (substitui a letra "M")
- `lockup-horizontal.svg` — marca + nome lado a lado
- `lockup-vertical.svg` — marca acima do nome
- `seal-7-dias.svg` — três círculos concêntricos + "7" + "DIAS" + diamante heráldico (selo de garantia)
- `favicon.svg`

### Iluminação cinematográfica (Apothecary)

```css
body::before { /* gradiente radial superior + ambiente */ }
body::after  { /* grid sutil de pontos dourados — textura de papel */ }
```

Dá a sensação de capa de revista de luxo (Augustinus Bader, La Prairie). Custo: 0 imagens, 0 requests.

---

## 5. As 7 superfícies (página por página)

### 5.1 `identity/styleguide.html`

Página viva que mostra **todos os tokens em uso simultâneo**: paleta completa, escalas tipográficas com texto real, componentes (botões, badges, price card, crest, lockup), 4 modos visuais lado a lado. Use como **referência canônica** quando estiver criando algo novo.

### 5.2 `identity/validate.html`

Checklist visual de regressão. Roda `validate.js` que verifica se os tokens estão respondendo corretamente em todos os modos. Use **antes de commits estruturais** no `tokens.css`.

### 5.3 `landing/index.html` (modo Apothecary Noir)

A página principal. Estrutura mobile-first:

1. **Crest superior** — lockup vertical + linha ornamental
2. **Eyebrow** — "PROTOCOLO DESINFLAMAÇÃO · BIO-PREMIUM"
3. **H1 cinematográfica** — promessa central com ênfase italic
4. **Vimeo iframe 16:9** — VSL longa (placeholder: `76979871`, vídeo demo público)
5. **Progress bar dourada** + display de tempo
6. **Lock note editorial** — "— O acesso é revelado aos 4 minutos —"
7. **`#reveal-zone`** (`display: none` até disparar) — abaixo do dobre, contém:
   - Manchete "O QUE VOCÊ RECEBE"
   - Lista dos 5 módulos + 26 aulas
   - 3 PDFs bônus (thumbnails CSS, não imagens)
   - Garantia de 7 dias com selo SVG
   - Price card (R$ 297 ancorado em R$ 564)
   - Botão `QUERO ACESSAR O MÉTODO →` (verde esmeralda gradiente, glow ouro)
   - Schema.org Product + microdados pra Rich Snippets
8. **Footer** — termos, privacidade, suporte

**Reveal disparado por** (qualquer um destes):
- Vídeo cruza 4:00 (`timeupdate`)
- `seeked` ≥ 4:00
- `ended`
- `?reveal=true` na URL (atalho dev)
- Fallback: 8 minutos sem reveal

Após disparar: `scrollIntoView({ behavior: 'smooth' })` desce o scroll automaticamente.

### 5.4 `checkout/index.html` (modo Apothecary Noir)

**Não é o checkout real** (esse é hospedado pela Kiwify). É a **tela de confirmação visual + Order Bump pré-checkout** que ancora o usuário em padrão estético antes de ele cair na Kiwify. Inclui:

- Resumo do pedido (Método R$ 297)
- Order Bump destacável: "Xícara de Ouro — 15 Blends Termogênicos · R$ 27,90"
- Selo de pagamento seguro
- Botão final que redireciona pra Kiwify

### 5.5 `upsell/index.html` (modo Apothecary Noir)

Pós-compra do método principal. Mecânica idêntica à landing mas mais curta:

1. Pill "Sua compra foi aprovada" (verde com check)
2. Crest "Espera, antes de prosseguir"
3. Eyebrow + H1 + sub
4. **Vimeo iframe** (placeholder `76979871`)
5. Progress bar + lock note
6. **`#upsellReveal`** (`display: none` até reveal) — contém oferta + price card + 2 botões + nota 1-click

**Reveal aos 1:30** (mais cedo que landing, vídeo é mais curto).

Botão de aceite **NÃO redireciona pra checkout novo** — é 1-click, cobra no mesmo cartão da ordem anterior. Configurado em `KIWIFY_ACCEPT_URL`.

### 5.6 `members/index.html` (modo Botanique LIGHT)

Área pós-compra. Layout em 5 cards de módulo:

- **Módulo I** — Diagnóstico (acessível dia 1)
- **Módulo II** — Reset 6 dias (acessível dia 1)
- **Módulo III** — Manutenção (locked até dia 8) — mostra cadeado dourado + countdown
- **Módulo IV** — Avançado (locked até dia 8)
- **Módulo V** — Mestre (locked até dia 15)

A tranca visual é **só decorativa** aqui — a tranca real é configurada no Kiwify (Drip de conteúdo). Documentação: `docs/checklist-kiwify-hotmart.md` Fase IX.

### 5.7 `validacao/index.html`

Dashboard interno de QA. Renderiza 4 superfícies em iframes lado a lado (landing, checkout, upsell, members) pra inspeção rápida de regressão visual. Não vai pra produção.

### 5.8 `pdfs/*.html` (modo Botanique PRINT)

Templates dos 3 materiais bônus. Cada um tem **cover · frontispiece · TOC · capítulos · back-cover**:

- `guia-compras.html` — Guia de Compras Sem Erro
- `planner-6-dias.html` — Planner do Desafio 6 Dias
- `receitas-15min.html` — Livro de Receitas 15 Minutos

**Geração de PDF**: abrir no navegador → `Ctrl+P` → tamanho **A5** → "Salvar como PDF". O CSS está calibrado pra impressão.

---

## 6. Mecânica de _reveal_

Padrão arquitetural compartilhado entre `landing/` e `upsell/`. Anti-impulso de compra — força o prospect a consumir a VSL antes de ver o preço.

### Como funciona

```js
// 1. Bloco oculto por CSS
#reveal-zone { display: none; }
#reveal-zone.unlocked {
  display: block;
  animation: revealUnlock 1.6s var(--ease-dramatic) both;
}

// 2. Listener Vimeo
player.on('timeupdate', (data) => {
  if (data.seconds >= REVEAL_AT) fireReveal('timeupdate');
});

// 3. Funcao idempotente
function fireReveal(source) {
  if (revealFiredOnce) return;
  revealFiredOnce = true;
  revealZone.classList.add('unlocked');
  setTimeout(() => revealZone.scrollIntoView({ behavior: 'smooth' }), 600);
}
```

### Atalhos

- `?reveal=true` → revela imediatamente (uso pra QA / preview)
- Vídeo termina → revela
- 4-8 min sem reveal → safety timeout dispara

### Eventos de tracking emitidos

- `Reveal` / `UpsellReveal` (custom Meta Pixel + GTM dataLayer) com `source` (`timeupdate`, `seeked`, `video_ended`, `url_param`, `fallback_*`)

### Por que `display: none` e não `opacity: 0`

`opacity: 0` reservava layout — o usuário scrollava pra um vazio gigante antes do reveal disparar. `display: none` colapsa o layout, então a página termina logo abaixo do vídeo até o reveal. **Já errei isso uma vez — não fazer de novo.**

---

## 7. Como rodar localmente

### Pré-requisitos

- Python 3.x instalado
- Navegador moderno (Chrome/Firefox/Safari)

### Servidor estático

```bash
python -m http.server 8082
```

A partir desse momento, abrir:

| URL | O que mostra |
|---|---|
| `http://localhost:8082/landing/index.html` | Landing com VSL longa |
| `http://localhost:8082/landing/index.html?reveal=true` | Landing com reveal forçado |
| `http://localhost:8082/checkout/index.html` | Tela de confirmação + Order Bump |
| `http://localhost:8082/upsell/index.html` | Upsell com VSL curta |
| `http://localhost:8082/upsell/index.html?reveal=true` | Upsell com reveal forçado |
| `http://localhost:8082/members/index.html` | Área de membros |
| `http://localhost:8082/validacao/index.html` | QA dashboard (4 iframes) |
| `http://localhost:8082/identity/styleguide.html` | Guia de estilo vivo |
| `http://localhost:8082/identity/validate.html` | Validação de tokens |
| `http://localhost:8082/pdfs/guia-compras.html` | PDF Guia de Compras |
| `http://localhost:8082/pdfs/planner-6-dias.html` | PDF Planner |
| `http://localhost:8082/pdfs/receitas-15min.html` | PDF Receitas |

### Cache

Todos os HTMLs usam **query strings de versão** nos links (`?v=20260507j`). Se você editar `style.css` ou `content.js` e o navegador insistir em mostrar a versão antiga:

1. **Solução nuclear**: abrir em **aba anônima** (sempre cache vazio)
2. **Solução granular**: bumpar a query string nos `<link>` e `<script>` do HTML que você editou (`?v=20260507j` → `?v=20260507k`)
3. **Solução do desenvolvedor**: DevTools aberto + Network tab "Disable cache" marcado

---

## 8. Geração de imagens (Nano Banana 2)

Pipeline pra **food photography, retratos, anúncios, packshots, hero shots** — tudo via API Kie.ai (Gemini 3.1 Flash).

### Workflow

1. Criar prompt JSON denso-narrativo em `nano-banana2/prompts/<categoria>/<nome>.json`
2. Rodar:
   ```bash
   python nano-banana2/scripts/generate_kie.py \
     nano-banana2/prompts/<categoria>/<nome>.json \
     nano-banana2/images/<categoria>/<nome>.jpg \
     "4:5"
   ```
3. Imagem aparece em `nano-banana2/images/<categoria>/<nome>.jpg`

### Quando o agente dispara isso

Sempre que você pedir _"faz uma foto de X"_, _"gera uma imagem de Y"_, _"renderiza Z"_ — o agente lê `nano-banana2/SKILL.md` e segue o schema. Funciona em PT-BR e EN.

### Pré-requisitos

- `KIE_AI_API_KEY` em variável de ambiente OU em `.env` (raiz do projeto ou em `~`)
- `pip install requests`

### Aspect ratios suportados

`1:1`, `4:5`, `16:9`, `9:16`, `3:4`, `2:3`. Use `4:5` pra anúncios Meta, `16:9` pra YouTube/site, `9:16` pra Reels/Stories.

### Imagens já produzidas (auditadas)

- `landing/og-image.jpg` — OpenGraph share image
- `landing/poster.jpg` — Hero da landing
- `landing/upsell-poster.jpg` — Hero do upsell
- `landing/pdf-guia.jpg`, `landing/pdf-planner.jpg`, `landing/pdf-receitas.jpg` — Capas dos bônus
- `landing/vsl-poster.jpg` — Poster frame da VSL
- `landing-v2/*` — Iteração v2

---

## 9. Como editar conteúdo (`content.js`)

### `landing/content.js`

```js
window.LANDING_CONFIG = {
  VIDEO_ID: '76979871',                    // Vimeo Pro ID quando produzir
  REVEAL_THRESHOLD_SECONDS: 240,           // 4:00 — momento do reveal
  META_PIXEL_ID: 'XXXXXXXXXXXX',           // 16 dígitos do Pixel
  GTM_ID: 'GTM-XXXXXXX',                   // ID do GTM
  KIWIFY_CHECKOUT_URL: 'https://pay.kiwify.com.br/...',
  SUPPORT_EMAIL: 'contato@desinflamacaopro.com.br',
};
```

### `upsell/content.js`

```js
window.UPSELL_CONFIG = {
  VIDEO_ID: '76979871',
  REVEAL_THRESHOLD_SECONDS: 90,            // 1:30
  KIWIFY_ACCEPT_URL: 'https://pay.kiwify.com.br/...1CLICK',
  KIWIFY_DECLINE_URL: 'https://desinflamacaopro.com.br/membros/?skip_upsell=1',
  META_PIXEL_ID: 'XXXXXXXXXXXX',
  GTM_ID: 'GTM-XXXXXXX',
  UPSELL_VALUE: 147.00,
  UPSELL_CURRENCY: 'BRL',
  SUPPORT_EMAIL: 'contato@desinflamacaopro.com.br',
};
```

**Regra**: nunca edite copy ou config dentro de `index.html` se houver equivalente em `content.js`. O HTML é estrutura, o `content.js` é dado.

---

## 10. Pré-deploy: substituir placeholders

Antes de subir pra produção, substituir **7 valores**:

| # | Arquivo | Variável | Valor a colocar |
|---|---|---|---|
| 1 | `landing/content.js` | `VIDEO_ID` | ID do Vimeo Pro real (VSL longa) |
| 2 | `upsell/content.js` | `VIDEO_ID` | ID do Vimeo Pro real (VSL curta) |
| 3 | `landing/content.js` + `upsell/content.js` | `META_PIXEL_ID` | 16 dígitos do Pixel da conta Meta |
| 4 | `landing/content.js` + `upsell/content.js` | `GTM_ID` | `GTM-XXXXXXX` da conta GTM |
| 5 | `landing/content.js` | `KIWIFY_CHECKOUT_URL` | URL completa do checkout Kiwify |
| 6 | `upsell/content.js` | `KIWIFY_ACCEPT_URL` | URL de aceite 1-click |
| 7 | `upsell/content.js` | `KIWIFY_DECLINE_URL` | URL de skip pra members |
| 8 | `landing/index.html` | Schema.org `url` + GTM `<noscript>` `<body>` | Domínio canônico final |

Procedimento detalhado fase a fase: `docs/checklist-kiwify-hotmart.md` (11 fases lineares, ~975 linhas).

---

## 11. Trabalho externo restante

Tudo que não é código — depende de você ou de terceiros:

1. **Locução + edição da VSL longa** (3-8 min). Roteiro pronto em `docs/roteiro-vsl-metodo-desinflamacao.md`. Voz feminina madura, ritmo cerimonial.
2. **Roteiro + locução + edição da VSL upsell** (2-3 min). Pendente.
3. **Produção das 26 vídeo-aulas** faceless cinematográficas. Currículo pronto em `docs/curriculo-metodo-desinflamacao.md`.
4. **Print-to-PDF** dos 3 materiais bônus (Ctrl+P A5 nos HTMLs em `pdfs/`).
5. **Compra de domínio** + SSL + apontar pra hosting estática (Vercel/Cloudflare Pages/Netlify).
6. **Setup Kiwify** completo:
   - Cadastrar produto principal (R$ 297)
   - Criar Order Bump (Xícara de Ouro · R$ 27,90)
   - Configurar Upsell 1-click (Clube Vida Leve · R$ 147)
   - **Drip de módulos** (M III dia 8, M V dia 15)
7. **Compra de tráfego** (Meta Ads — projeto à parte).

---

## 12. Documentos de referência

| Doc | Conteúdo |
|---|---|
| `docs/roteiro-vsl-metodo-desinflamacao.md` | 5 atos, script verbatim, storyboard faceless, direção de voz, métricas-alvo |
| `docs/curriculo-metodo-desinflamacao.md` | 26 aulas em 5 módulos com objetivo, outline, duração, voz dominante |
| `docs/checklist-kiwify-hotmart.md` | 11 fases lineares pra ir ao ar — do cadastro do produto ao smoke test E2E |
| `docs/superpowers/specs/` | Specs de design das principais features |
| `docs/superpowers/plans/` | Plans de implementação (decompostos em tasks) |
| `CLAUDE.md` | Instruções pro agente neste diretório (gera imagens via nano-banana2) |
| `nano-banana2/SKILL.md` | Schema JSON denso-narrativo pra prompts de imagem |
| `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/` | Protótipo original — canonical de design |

---

## Princípios de trabalho neste projeto

1. **Mobile-first sempre.** A maioria dos prospects vai chegar via Meta Ads no celular. Desenhe pra 480px primeiro, depois alargue.
2. **Padrão "bilionário", não "wellness mass-market".** Augustinus Bader, não Sephora. Patek, não Casio. Aman, não Hilton.
3. **Vanilla > framework.** Nada que adicione tempo de carregamento ou risco de quebra.
4. **`content.js` antes de `index.html`.** Estrutura é HTML, dado é JS.
5. **Cache-busting via query strings.** Sempre que editar CSS/JS, considere bumpar a versão.
6. **Reveal-zone com `display: none`, nunca `opacity: 0`.** Já errado uma vez.
7. **Antes de deploy, rodar `validacao/index.html`** pra checar todas as superfícies em paralelo.
