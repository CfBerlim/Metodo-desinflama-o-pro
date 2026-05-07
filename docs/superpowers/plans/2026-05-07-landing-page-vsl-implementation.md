# Landing Page VSL — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a landing page de vendas do Método Desinflamação Pro — HTML estático com VSL embedded em Vimeo Pro, mecânica de revelação time-locked aos 4:00, 5 seções de conversão below-fold, integração de tracking (Meta Pixel + GTM), e assets fotográficos cinematográficos gerados via Nano Banana 2.

**Architecture:** Single-page estático em `landing/`. Importa `identity/tokens.css` (sistema visual já travado). Hero usa modo Apothecary com `--bg-stage` cinematográfico. JS detecta o segundo 240 do Vimeo Player SDK e revela 5 seções abaixo via stagger fade-in. Sem framework, sem build, sem npm — vanilla HTML/CSS/JS. Deploy via Cloudflare Pages, Netlify ou Vercel (fora do escopo deste plano).

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, Vimeo Player SDK 2.x (CDN), Google Fonts (Italiana, Cormorant Garamond, Marcellus SC, Inter), Nano Banana 2 (Gemini 3.1 Flash) para assets de imagem.

**Spec de referência:** `docs/superpowers/specs/2026-05-07-landing-page-vsl-design.md`

**Spec do sistema visual:** `docs/superpowers/specs/2026-05-07-identidade-visual-bio-premium-design.md`

---

## File Structure

```
landing/
├── index.html              # Página principal (HTML + critical CSS inline + scripts)
├── style.css               # CSS específico da landing (importa identity/tokens.css)
├── reveal.js               # Lógica do detector dos 4:00 + animação de reveal + dev mode
├── tracking.js             # Pixels Meta + Google Tag Manager + custom events
├── content.js              # Variáveis editáveis: copy, preços, IDs, URLs (NÃO commitada com IDs reais)
├── test-reveal.html        # Página de teste isolada da lógica de reveal (mock Vimeo)
└── assets/
    ├── poster.jpg          # Frame de poster do VSL (gerado via nano-banana2)
    ├── og-image.jpg        # Open Graph 1200×630 (gerado via nano-banana2)
    ├── pdf-guia.jpg        # Mockup PDF I — Guia de Compras
    ├── pdf-planner.jpg     # Mockup PDF II — Planner 6 Dias
    └── pdf-receitas.jpg    # Mockup PDF III — Receitas 15 Min
```

Total: 6 arquivos de código + 5 imagens. Plano cobre 17 tasks.

---

## Phase 1 — Foundation

### Task 1: Setup `landing/` + index.html shell + content.js

**Files:**
- Create: `landing/index.html`
- Create: `landing/content.js`

- [ ] **Step 1: Criar diretório `landing/` e `landing/assets/`**

```bash
mkdir landing
mkdir landing/assets
```

- [ ] **Step 2: Criar `landing/content.js`** — variáveis de configuração e copy

```js
/* ==========================================================================
   CONTENT.JS — variáveis substituíveis antes do deploy
   AJUSTAR: VIDEO_ID, META_PIXEL_ID, GTM_ID, KIWIFY_CHECKOUT_URL antes de produção
   ========================================================================== */

window.LANDING_CONFIG = {
  // Vimeo Pro video ID — substituir pelo ID real do vídeo
  VIDEO_ID: '76979871',  // PLACEHOLDER — Vimeo demo público pra dev
  REVEAL_THRESHOLD_SECONDS: 240,  // 4:00

  // Tracking IDs — substituir antes do deploy
  META_PIXEL_ID: 'XXXXXXXXXXXX',
  GTM_ID: 'GTM-XXXXXXX',

  // Checkout URL — substituir pelo link real da Kiwify/Hotmart
  KIWIFY_CHECKOUT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_COM_LINK_REAL',

  // Suporte / contato
  SUPPORT_EMAIL: 'contato@desinflamacao.com.br',
};

/* Copy editável — substituir pelo copy final sem mexer no HTML */
window.LANDING_COPY = {
  hero: {
    eyebrow: 'PARA QUEM CANSOU DE DIETAS',
    manchete: 'Como desligar o interruptor da inflamação celular que está travando seu emagrecimento.',
    subtitulo: 'O método cientificamente comprovado para limpar seu organismo em 21 dias — sem dietas de fome, sem remédios, sem academia.',
    lockNote: '— O acesso ao Método é revelado aos 4 minutos do vídeo —',
  },
  modulos: [
    { roman: 'I', titulo: 'O Mecanismo', desc: 'A biologia da inflamação celular crônica e por que dietas tradicionais falham miseravelmente.', aulas: '4 aulas' },
    { roman: 'II', titulo: 'O Reset', desc: 'O Desafio dos 6 Dias — o protocolo prático de adição que apaga o incêndio invisível.', aulas: '6 aulas' },
    { roman: 'III', titulo: 'A Cozinha de Poder', desc: 'Receitas e compras estratégicas. O que comprar na feira, o que fazer no fogão.', aulas: '5 aulas' },
    { roman: 'IV', titulo: 'O Estilo de Vida', desc: 'Sono, stress, exposição solar — os pilares anti-inflamatórios além da comida.', aulas: '5 aulas' },
    { roman: 'V', titulo: 'A Manutenção', desc: 'Protocolo de longo prazo, ajustes para fases da vida, atletismo e idade avançada.', aulas: '6 aulas' },
  ],
  bonus: [
    { roman: 'I', titulo: 'Guia de Compras Sem Erro', desc: 'A lista exata de 47 ingredientes anti-inflamatórios da feira, com preços médios e onde encontrar.', meta: 'PDF · 32 páginas' },
    { roman: 'II', titulo: 'Planner do Desafio 6 Dias', desc: 'Checklist diário do reset, com receitas e refeições já planejadas para os 6 dias.', meta: 'PDF · 24 páginas' },
    { roman: 'III', titulo: 'Receitas 15 Minutos de Poder', desc: '30 receitas anti-inflamatórias, todas em menos de 15 minutos de preparo.', meta: 'PDF · 48 páginas' },
  ],
  garantia: {
    headline: 'Sete dias para sentir. Zero risco.',
    texto: 'Você tem 7 dias completos para experimentar o método. Se em qualquer momento dentro desse período sentir que não é pra você, basta um e-mail e devolvemos 100% do investimento. Sem perguntas, sem fricção.',
    label: '7 DIAS · GARANTIA · INCONDICIONAL',
  },
  oferta: {
    items: [
      { titulo: 'Método Desinflamação Pro', desc: '5 módulos · 26 aulas', valor: 'R$ 897' },
      { titulo: 'Bônus I · Guia de Compras', desc: 'PDF 32 páginas', valor: 'R$ 97' },
      { titulo: 'Bônus II · Planner 6 Dias', desc: 'PDF 24 páginas', valor: 'R$ 47' },
      { titulo: 'Bônus III · Receitas 15 min', desc: 'PDF 48 páginas', valor: 'R$ 77' },
    ],
    valorTotalAncora: 'R$ 1.118',
    parcelado: '12× R$ 19,70',
    avista: 'R$ 197 à vista',
    contexto: 'Hoje, com o lançamento:',
  },
  cta: {
    eyebrow: 'Última oportunidade',
    botao: 'QUERO ACESSAR O MÉTODO',
    seguranca: ['Compra 100% segura · Acesso imediato', 'Garantia incondicional 7 dias'],
  },
};
```

- [ ] **Step 3: Criar `landing/index.html`** — shell base com `<head>` completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#07100C">

  <title>Método Desinflamação Pro · Como Desligar a Inflamação Celular em 21 Dias</title>
  <meta name="description" content="O método cientificamente comprovado para reverter a inflamação celular crônica em 21 dias. Sem dietas restritivas, sem remédios, sem academia.">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Método Desinflamação Pro · 21 Dias para Desligar a Inflamação Celular">
  <meta property="og:description" content="O método cientificamente comprovado para reverter a inflamação celular crônica em 21 dias. Sem dietas, sem remédios, sem academia.">
  <meta property="og:image" content="assets/og-image.jpg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">

  <!-- Favicon (do sistema visual canônico) -->
  <link rel="icon" type="image/svg+xml" href="../identity/logo/favicon.svg">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,300;1,400;1,500&family=Inter:wght@200;300;400;500;600&family=Italiana&family=Marcellus+SC&display=swap" rel="stylesheet">

  <!-- Sistema visual canônico (tokens DNA + 3 modos) -->
  <link rel="stylesheet" href="../identity/tokens.css">

  <!-- Estilos da landing -->
  <link rel="stylesheet" href="style.css">
</head>
<body data-mode="apothecary">
  <!-- Conteúdo será adicionado em tasks subsequentes -->
  <main>
    <!-- Hero (Task 3) -->
    <!-- Below-fold (Tasks 5-9) -->
  </main>

  <!-- Scripts (Vimeo SDK + reveal + tracking) — adicionados em tasks subsequentes -->
  <script src="content.js"></script>
</body>
</html>
```

- [ ] **Step 4: Verificar via servidor http**

```bash
cd landing && python -m http.server 8081
```

Abrir `http://localhost:8081/`. Esperado: index.html carrega, fundo escuro Apothecary atomático (do `data-mode="apothecary"` aplicado ao body, herdando `--bg-stage`). Página vazia mas com fundo cinematográfico. Console sem erros. `LANDING_CONFIG` e `LANDING_COPY` disponíveis no console.

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/content.js
git commit -m "feat(landing): setup inicial - shell HTML + content.js com config e copy"
```

---

### Task 2: `landing/style.css` — base + hero layout

**Files:**
- Create: `landing/style.css`

- [ ] **Step 1: Criar `landing/style.css`** com reset, body, nav minimal e estrutura do hero

```css
/* ==========================================================================
   LANDING PAGE — Método Desinflamação Pro
   Importa: ../identity/tokens.css (DNA + 3 modos)
   Modo ativo: Apothecary (data-mode="apothecary" no <body>)
   ========================================================================== */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
html, body { min-height: 100vh; }
body {
  background: var(--bg-stage);  /* gradient cinematográfico Apothecary */
  color: var(--text-primary);
  font-family: var(--font-body);
  font-weight: 300;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ==========================================================================
   HERO — fase imersão (visível 100% do tempo)
   ========================================================================== */
.hero {
  min-height: max(640px, 90svh);
  padding: 32px 32px 56px;
  display: flex; flex-direction: column;
  position: relative;
}

/* Top bar minimalista — apenas mini-lockup à esquerda */
.hero-topbar {
  display: flex; justify-content: flex-start; align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(201, 168, 118, 0.30);
  margin-bottom: 56px;
  position: relative; z-index: 2;
}
.hero-topbar .mini-lockup {
  display: flex; align-items: center; gap: 14px;
}
.hero-topbar .mini-monogram {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  font-family: var(--font-display);
  font-size: 18px; line-height: 1;
}
.hero-topbar .mini-wordmark {
  font-family: var(--font-display);
  font-size: 18px; color: var(--text-primary);
  letter-spacing: 0.02em;
}

/* Hairline gold luminoso na base do hero (separador visual) */
.hero::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 15%,
    rgba(201, 168, 118, 0.22) 50%,
    transparent 85%);
  pointer-events: none;
}

/* Hero content centralizado, max-width controlado */
.hero-content {
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  display: flex; flex-direction: column; align-items: center;
  text-align: center;
  position: relative; z-index: 1;
  flex: 1;
}

.hero-eyebrow {
  font-family: var(--font-marca);
  font-size: var(--size-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  color: var(--accent);
  margin-bottom: 24px;
  text-shadow: var(--ambient-text-glow);
}

.hero-manchete {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(36px, 6vw, 64px);
  line-height: 1.05;
  color: var(--text-primary);
  letter-spacing: var(--tracking-display);
  max-width: 920px;
  margin-bottom: 24px;
  text-shadow: 0 0 32px rgba(201, 168, 118, 0.10);
}

.hero-subtitulo {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: clamp(16px, 2vw, 22px);
  line-height: 1.55;
  color: rgba(239, 231, 210, 0.78);
  max-width: 720px;
  margin-bottom: 48px;
}

/* Player Vimeo — moldura cinematográfica */
.hero-video-wrapper {
  width: 100%;
  max-width: 960px;
  margin-bottom: 28px;
}
.hero-video-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(201, 168, 118, 0.45);
  background:
    radial-gradient(ellipse at 50% 50%,
      rgba(201, 168, 118, 0.08) 0%,
      transparent 70%),
    rgba(201, 168, 118, 0.025);
  box-shadow:
    0 0 80px rgba(201, 168, 118, 0.14),
    0 0 0 1px rgba(201, 168, 118, 0.18),
    inset 0 1px 0 rgba(239, 231, 210, 0.06);
  overflow: hidden;
}
.hero-video-frame iframe {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  border: 0;
}

.hero-lock-note {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 13px;
  color: rgba(201, 168, 118, 0.78);
  text-align: center;
  margin-top: 8px;
  transition: opacity 400ms ease-out;
}

/* Mobile adjustments */
@media (max-width: 700px) {
  .hero { padding: 20px 20px 40px; }
  .hero-topbar { margin-bottom: 36px; padding-bottom: 16px; }
  .hero-content { padding: 0; }
  .hero-eyebrow { margin-bottom: 18px; }
  .hero-manchete { margin-bottom: 18px; }
  .hero-subtitulo { margin-bottom: 32px; }
}
```

- [ ] **Step 2: Verificar via browser**

Refresh `http://localhost:8081/`. Esperado: o body já tem o gradient Apothecary aplicado, mas a página continua sem conteúdo (hero é um placeholder). Sem console errors.

- [ ] **Step 3: Commit**

```bash
git add landing/style.css
git commit -m "feat(landing): style.css base com hero layout e moldura cinematografica do video"
```

---

### Task 3: Hero content + Vimeo embed (HTML estrutura)

**Files:**
- Modify: `landing/index.html`

- [ ] **Step 1: Substituir o `<main>` em `landing/index.html` por:**

```html
  <main>
    <!-- ============================================================
         HERO — fase imersão (sempre visível)
         ============================================================ -->
    <section class="hero">
      <div class="hero-topbar">
        <div class="mini-lockup">
          <span class="mini-monogram">M</span>
          <span class="mini-wordmark">Desinflamação</span>
        </div>
      </div>

      <div class="hero-content">
        <div class="hero-eyebrow" id="hero-eyebrow"></div>
        <h1 class="hero-manchete" id="hero-manchete"></h1>
        <p class="hero-subtitulo" id="hero-subtitulo"></p>

        <div class="hero-video-wrapper">
          <div class="hero-video-frame">
            <iframe
              id="vsl-player"
              src=""
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
              title="VSL — Método Desinflamação Pro"></iframe>
          </div>
          <div class="hero-lock-note" id="hero-lock-note" aria-live="polite"></div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         BELOW-FOLD — fase pitch (revelado aos 4:00)
         ============================================================ -->
    <div id="below-fold" tabindex="-1">
      <!-- Seções I-V serão adicionadas em Tasks 5-9 -->
    </div>
  </main>

  <!-- Hero copy + iframe src são preenchidos via inline script (próximo step) -->
  <script>
    (function() {
      const c = window.LANDING_COPY.hero;
      document.getElementById('hero-eyebrow').textContent = c.eyebrow;
      document.getElementById('hero-manchete').textContent = c.manchete;
      document.getElementById('hero-subtitulo').textContent = c.subtitulo;
      document.getElementById('hero-lock-note').textContent = c.lockNote;

      const cfg = window.LANDING_CONFIG;
      const player = document.getElementById('vsl-player');
      player.src = `https://player.vimeo.com/video/${cfg.VIDEO_ID}?title=0&byline=0&portrait=0&badge=0&color=C9A876&autopause=0&dnt=1`;
    })();
  </script>

  <!-- Vimeo Player SDK (preparação para reveal.js — Task 4) -->
  <script src="https://player.vimeo.com/api/player.js" defer></script>
```

- [ ] **Step 2: Verificar via browser**

Refresh `http://localhost:8081/`. Esperado:
- Mini-lockup no topo (M monograma + "Desinflamação")
- Eyebrow "PARA QUEM CANSOU DE DIETAS" em small caps gold
- Manchete em Italiana ivory
- Subtítulo em Cormorant italic
- Player Vimeo carregando (vídeo demo público de teste)
- Lock-note "— O acesso ao Método é revelado aos 4 minutos do vídeo —"
- Sem console errors. Vimeo SDK carrega via CDN.

- [ ] **Step 3: Commit**

```bash
git add landing/index.html
git commit -m "feat(landing): hero content estrutura + Vimeo iframe + bind copy via content.js"
```

---

## Phase 2 — Reveal Mechanic

### Task 4: `reveal.js` + reveal CSS

**Files:**
- Create: `landing/reveal.js`
- Modify: `landing/style.css` (adicionar regras de reveal)
- Modify: `landing/index.html` (adicionar `<script src="reveal.js" defer>`)

- [ ] **Step 1: Criar `landing/reveal.js`**

```js
/* ==========================================================================
   REVEAL.JS — detector do segundo 240 do Vimeo + revelação das seções
   Trigger: timeupdate >= REVEAL_THRESHOLD_SECONDS
   Dev mode: ?reveal=true na URL força revelação imediata
   Fallback: setTimeout de 6min como guard de última instância
   ========================================================================== */

(function() {
  const cfg = window.LANDING_CONFIG;
  if (!cfg) {
    console.warn('LANDING_CONFIG não definido. reveal.js abortado.');
    return;
  }

  const THRESHOLD = cfg.REVEAL_THRESHOLD_SECONDS || 240;
  let revealed = false;

  function reveal(source) {
    if (revealed) return;
    revealed = true;

    document.body.classList.add('revealed');

    // Tracking
    if (window.fbq) {
      try { fbq('trackCustom', 'VSLReveal', { source }); } catch (_) {}
    }
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'vsl_reveal', source });
    }

    // Foco para acessibilidade
    setTimeout(() => {
      const target = document.getElementById('below-fold');
      if (target) {
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  }

  // Modo dev: ?reveal=true força reveal imediato
  if (new URLSearchParams(location.search).has('reveal')) {
    reveal('dev_mode');
    return;
  }

  // Aguarda Vimeo SDK carregar
  function attachVimeoListener() {
    if (typeof Vimeo === 'undefined') {
      // SDK ainda não carregou — tenta de novo em 200ms (max 50 tentativas = 10s)
      attachVimeoListener.attempts = (attachVimeoListener.attempts || 0) + 1;
      if (attachVimeoListener.attempts > 50) {
        console.error('Vimeo SDK não carregou em 10s. Aplicando fallback timeout.');
        setTimeout(() => reveal('fallback_no_sdk'), 360_000);  // 6min
        return;
      }
      setTimeout(attachVimeoListener, 200);
      return;
    }

    const iframe = document.getElementById('vsl-player');
    if (!iframe) {
      console.error('vsl-player iframe não encontrado.');
      return;
    }

    const player = new Vimeo.Player(iframe);

    // Track de play (para Meta/GTM)
    player.on('play', () => {
      if (window.fbq) {
        try { fbq('trackCustom', 'VSLPlayed'); } catch (_) {}
      }
      if (window.dataLayer) window.dataLayer.push({ event: 'vsl_played' });
    });

    // Detector principal
    player.on('timeupdate', (data) => {
      if (data.seconds >= THRESHOLD) {
        reveal('timeupdate');
      }
    });

    // Se o usuário deu seek manual além do limite, ainda revela
    player.on('seeked', (data) => {
      if (data.seconds >= THRESHOLD) {
        reveal('seeked');
      }
    });

    // Quartis de retenção (analytics)
    let quartilesFired = { 25: false, 50: false, 75: false, 95: false };
    player.getDuration().then(duration => {
      player.on('timeupdate', (data) => {
        const pct = (data.seconds / duration) * 100;
        [25, 50, 75, 95].forEach(q => {
          if (pct >= q && !quartilesFired[q]) {
            quartilesFired[q] = true;
            if (window.fbq) {
              try { fbq('trackCustom', `VSL${q}`); } catch (_) {}
            }
            if (window.dataLayer) window.dataLayer.push({ event: `vsl_${q}` });
          }
        });
      });
    });
  }

  attachVimeoListener();

  // Fallback de emergência: garante reveal em 6 min mesmo se Vimeo falhar completamente
  setTimeout(() => {
    if (!revealed) reveal('fallback_timeout');
  }, 360_000);
})();
```

- [ ] **Step 2: Adicionar regras de reveal no fim de `landing/style.css`**

```css
/* ==========================================================================
   REVEAL — transição da fase imersão para fase pitch (aos 4:00)
   ========================================================================== */

/* Estado inicial: below-fold renderizado mas invisível e não-interativo */
#below-fold {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 600ms ease-out;
}
#below-fold > section {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* Estado revelado */
body.revealed #below-fold {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
body.revealed #below-fold > section {
  opacity: 1;
  transform: translateY(0);
}
body.revealed #below-fold > section:nth-child(1) { transition-delay: 200ms; }
body.revealed #below-fold > section:nth-child(2) { transition-delay: 400ms; }
body.revealed #below-fold > section:nth-child(3) { transition-delay: 600ms; }
body.revealed #below-fold > section:nth-child(4) { transition-delay: 800ms; }
body.revealed #below-fold > section:nth-child(5) { transition-delay: 1000ms; }

/* Lock note some no reveal */
body.revealed .hero-lock-note {
  opacity: 0;
  pointer-events: none;
}

/* Acessibilidade: respeita prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  #below-fold > section { transform: none; transition-duration: 200ms; }
  body.revealed #below-fold > section { transform: none; }
}
```

- [ ] **Step 3: Adicionar `<script src="reveal.js" defer>` em `landing/index.html`**

Logo abaixo do `<script src="https://player.vimeo.com/api/player.js" defer></script>`, adicionar:

```html
  <script src="reveal.js" defer></script>
```

- [ ] **Step 4: Verificar dev mode**

Abrir `http://localhost:8081/?reveal=true` — esperado: nada visível ainda porque as seções below-fold não foram criadas. Mas no console, devtools, body deve ter classe `revealed`. Lock-note deve sumir.

`document.body.classList.contains('revealed')` deve retornar `true`.

- [ ] **Step 5: Commit**

```bash
git add landing/reveal.js landing/style.css landing/index.html
git commit -m "feat(landing): reveal.js com detector dos 4min + dev mode + tracking de quartis"
```

---

## Phase 3 — Below-fold Sections

### Task 5: Seção I — Os 5 Módulos

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/style.css`

- [ ] **Step 1: Adicionar HTML dentro de `<div id="below-fold">` em `index.html`** (substituir o comentário placeholder)

```html
      <!-- Seção I · Os 5 Módulos -->
      <section class="section section-modulos">
        <div class="container">
          <div class="section-eyebrow">O QUE VOCÊ VAI APRENDER</div>
          <h2 class="section-headline">Cinco módulos para <em>desligar o incêndio.</em></h2>
          <p class="section-subtitulo">Vinte e seis aulas curtas, em vídeo, com locução cinematográfica.</p>

          <div class="modulos-grid" id="modulos-grid">
            <!-- preenchido via JS abaixo -->
          </div>
        </div>
      </section>

      <!-- Bind dos módulos via content.js -->
      <script>
        (function() {
          const grid = document.getElementById('modulos-grid');
          const modulos = window.LANDING_COPY.modulos;
          grid.innerHTML = modulos.map(m => `
            <article class="modulo-card">
              <div class="modulo-roman">${m.roman}</div>
              <h3 class="modulo-titulo">${m.titulo}</h3>
              <p class="modulo-desc">${m.desc}</p>
              <div class="modulo-meta">${m.aulas}</div>
            </article>
          `).join('');
        })();
      </script>
```

- [ ] **Step 2: Adicionar CSS no fim de `landing/style.css`**

```css
/* ==========================================================================
   SECTION BASE
   ========================================================================== */
.section {
  padding: var(--space-xxxl) var(--space-xl);
  position: relative;
}
.section .container {
  max-width: 1200px; margin: 0 auto;
}
.section-eyebrow {
  font-family: var(--font-marca);
  font-size: var(--size-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  color: var(--accent);
  margin-bottom: 18px;
  text-shadow: 0 0 14px rgba(201, 168, 118, 0.30);
  text-align: center;
}
.section-headline {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.05;
  color: var(--text-primary);
  letter-spacing: 0.005em;
  margin-bottom: 18px;
  text-align: center;
}
.section-headline em {
  font-family: var(--font-editorial);
  font-style: italic;
  color: var(--accent);
  text-shadow: var(--ambient-text-glow);
}
.section-subtitulo {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: clamp(16px, 1.6vw, 20px);
  line-height: 1.55;
  color: rgba(239, 231, 210, 0.7);
  max-width: 640px; margin: 0 auto 64px;
  text-align: center;
}

/* ==========================================================================
   SEÇÃO I — Os 5 Módulos
   ========================================================================== */
.modulos-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
@media (max-width: 1100px) { .modulos-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .modulos-grid { grid-template-columns: 1fr; } }

.modulo-card {
  background: var(--bg-lift);
  border: 1px solid rgba(201, 168, 118, 0.18);
  border-radius: var(--radius-card);
  padding: 28px 24px;
  display: flex; flex-direction: column;
  gap: 14px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.modulo-card:hover {
  border-color: var(--accent);
  box-shadow: var(--ambient-glow);
}
.modulo-roman {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 56px;
  line-height: 1;
  color: var(--accent);
  text-shadow: 0 0 20px rgba(201, 168, 118, 0.35);
}
.modulo-titulo {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 22px;
  line-height: 1.1;
  color: var(--text-primary);
  letter-spacing: 0.01em;
}
.modulo-desc {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(239, 231, 210, 0.72);
  flex: 1;
}
.modulo-meta {
  font-family: var(--font-marca);
  font-size: 9px;
  letter-spacing: 0.4em;
  color: rgba(201, 168, 118, 0.85);
  margin-top: 8px;
}
```

- [ ] **Step 3: Verificar com dev mode**

Abrir `http://localhost:8081/?reveal=true`. Esperado:
- 5 cards de módulos visíveis (em grid 5 colunas no desktop)
- Numeral romano italic gold gigante em cada card (I, II, III, IV, V)
- Títulos em Italiana ivory, descrições em Inter Light muted, meta "X aulas" em small caps gold
- Animação de fade-in stagger funcionando

- [ ] **Step 4: Commit**

```bash
git add landing/index.html landing/style.css
git commit -m "feat(landing): secao I - 5 modulos com cards numerais romanos"
```

---

### Task 6: Seção II — Os 3 Bônus (PDFs)

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/style.css`

- [ ] **Step 1: Adicionar HTML após a seção I em `index.html`**

```html
      <!-- Seção II · Os 3 Bônus -->
      <section class="section section-bonus">
        <div class="container">
          <div class="section-eyebrow">BÔNUS INCLUSOS NO MÉTODO</div>
          <h2 class="section-headline">Três manuais para tornar tudo <em>prático.</em></h2>
          <p class="section-subtitulo">Recebidos junto com o curso. Sem custo adicional.</p>

          <div class="bonus-grid" id="bonus-grid"></div>
        </div>
      </section>

      <script>
        (function() {
          const grid = document.getElementById('bonus-grid');
          const bonus = window.LANDING_COPY.bonus;
          const mockups = ['assets/pdf-guia.jpg', 'assets/pdf-planner.jpg', 'assets/pdf-receitas.jpg'];
          grid.innerHTML = bonus.map((b, i) => `
            <article class="bonus-card">
              <div class="bonus-mockup">
                <img src="${mockups[i]}" alt="Mockup do PDF ${b.titulo}" loading="lazy">
              </div>
              <div class="bonus-roman">${b.roman}</div>
              <h3 class="bonus-titulo">${b.titulo}</h3>
              <p class="bonus-desc">${b.desc}</p>
              <div class="bonus-meta">${b.meta}</div>
            </article>
          `).join('');
        })();
      </script>
```

- [ ] **Step 2: Adicionar CSS no fim de `landing/style.css`**

```css
/* ==========================================================================
   SEÇÃO II — Os 3 Bônus (PDFs)
   ========================================================================== */
.bonus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
@media (max-width: 900px) { .bonus-grid { grid-template-columns: 1fr; } }

.bonus-card {
  display: flex; flex-direction: column;
  gap: 12px;
  text-align: center;
}
.bonus-mockup {
  aspect-ratio: 3 / 4;
  background: var(--bg-lift);
  border: 1px solid rgba(201, 168, 118, 0.18);
  border-radius: var(--radius-card);
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 0 40px rgba(201, 168, 118, 0.06);
}
.bonus-mockup img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.bonus-roman {
  font-family: var(--font-marca);
  font-size: var(--size-eyebrow);
  letter-spacing: 0.5em;
  color: var(--accent);
}
.bonus-titulo {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 22px;
  line-height: 1.15;
  color: var(--text-primary);
}
.bonus-desc {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(239, 231, 210, 0.72);
  max-width: 280px; margin: 0 auto;
}
.bonus-meta {
  font-family: var(--font-marca);
  font-size: 9px;
  letter-spacing: 0.4em;
  color: rgba(201, 168, 118, 0.7);
  margin-top: 4px;
}
```

- [ ] **Step 3: Verificar com dev mode**

Abrir `http://localhost:8081/?reveal=true`. Esperado:
- 3 cards de bônus aparecem após os 5 módulos
- Mockup placeholders (imagens broken até task 15 gerar elas — OK por enquanto, alt text aparece)
- Numeral romano em small caps gold acima do título

- [ ] **Step 4: Commit**

```bash
git add landing/index.html landing/style.css
git commit -m "feat(landing): secao II - 3 bonus PDFs com mockups (placeholders)"
```

---

### Task 7: Seção III — Garantia

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/style.css`

- [ ] **Step 1: Adicionar HTML após a seção II em `index.html`**

```html
      <!-- Seção III · Garantia -->
      <section class="section section-garantia">
        <div class="container">
          <div class="garantia-block">
            <div class="garantia-selo">
              <object data="../identity/logo/monogram-seal.svg" type="image/svg+xml" aria-hidden="true"></object>
            </div>
            <div class="garantia-texto">
              <div class="section-eyebrow garantia-eyebrow">GARANTIA INCONDICIONAL</div>
              <h2 class="garantia-headline" id="garantia-headline"></h2>
              <p class="garantia-paragrafo" id="garantia-paragrafo"></p>
              <div class="garantia-label" id="garantia-label"></div>
            </div>
          </div>
        </div>
      </section>

      <script>
        (function() {
          const g = window.LANDING_COPY.garantia;
          document.getElementById('garantia-headline').innerHTML = g.headline.replace(/Zero risco\./, '<em>Zero risco.</em>');
          document.getElementById('garantia-paragrafo').textContent = g.texto;
          document.getElementById('garantia-label').textContent = g.label;
        })();
      </script>
```

- [ ] **Step 2: Adicionar CSS no fim de `landing/style.css`**

```css
/* ==========================================================================
   SEÇÃO III — Garantia
   ========================================================================== */
.section-garantia {
  padding: var(--space-xxl) var(--space-xl);
}
.garantia-block {
  max-width: 880px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 48px;
  align-items: center;
  padding: 48px 0;
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}
@media (max-width: 700px) {
  .garantia-block { grid-template-columns: 1fr; gap: 32px; text-align: center; padding: 36px 0; }
}
.garantia-selo {
  display: flex; align-items: center; justify-content: center;
}
.garantia-selo object {
  width: 160px; height: 160px;
  --logo-accent: var(--accent);
  --logo-text: var(--accent);
}
.garantia-eyebrow {
  text-align: left;
  margin-bottom: 14px;
}
@media (max-width: 700px) { .garantia-eyebrow { text-align: center; } }
.garantia-headline {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(28px, 3.5vw, 40px);
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 18px;
}
.garantia-headline em {
  font-family: var(--font-editorial);
  font-style: italic;
  color: var(--accent);
  text-shadow: var(--ambient-text-glow);
}
.garantia-paragrafo {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.65;
  color: rgba(239, 231, 210, 0.85);
  margin-bottom: 20px;
}
.garantia-label {
  font-family: var(--font-marca);
  font-size: var(--size-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  color: var(--accent);
}
```

- [ ] **Step 3: Verificar com dev mode**

Abrir `http://localhost:8081/?reveal=true`. Scroll até a seção. Esperado:
- Selo monograma à esquerda (gold em fundo carbon)
- Texto à direita: eyebrow, headline com "Zero risco." em italic gold, parágrafo italic, label em small caps gold
- Hairlines gold acima e abaixo do bloco

- [ ] **Step 4: Commit**

```bash
git add landing/index.html landing/style.css
git commit -m "feat(landing): secao III - garantia com selo monograma e copy"
```

---

### Task 8: Seção IV — Stack de Oferta

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/style.css`

- [ ] **Step 1: Adicionar HTML após a seção III em `index.html`**

```html
      <!-- Seção IV · Stack de Oferta -->
      <section class="section section-oferta">
        <div class="container">
          <div class="section-eyebrow">O INVESTIMENTO</div>
          <h2 class="section-headline">Tudo que <em>está incluso.</em></h2>

          <div class="oferta-card">
            <div class="oferta-divisor"><span>O QUE VOCÊ RECEBE</span></div>
            <ul class="oferta-stack" id="oferta-stack"></ul>
            <div class="oferta-total-row">
              <span class="oferta-total-label">Valor real do pacote</span>
              <span class="oferta-total-valor" id="oferta-total-valor"></span>
            </div>
            <div class="oferta-preco-block">
              <div class="oferta-contexto" id="oferta-contexto"></div>
              <div class="oferta-parcelado" id="oferta-parcelado"></div>
              <div class="oferta-avista" id="oferta-avista"></div>
            </div>
          </div>
        </div>
      </section>

      <script>
        (function() {
          const o = window.LANDING_COPY.oferta;
          document.getElementById('oferta-stack').innerHTML = o.items.map(i => `
            <li class="oferta-item">
              <div>
                <div class="oferta-item-titulo">${i.titulo}</div>
                <div class="oferta-item-desc">${i.desc}</div>
              </div>
              <div class="oferta-item-valor">${i.valor}</div>
            </li>
          `).join('');
          document.getElementById('oferta-total-valor').textContent = o.valorTotalAncora;
          document.getElementById('oferta-contexto').textContent = o.contexto;
          document.getElementById('oferta-parcelado').textContent = o.parcelado;
          document.getElementById('oferta-avista').textContent = `ou ${o.avista}`;
        })();
      </script>
```

- [ ] **Step 2: Adicionar CSS no fim de `landing/style.css`**

```css
/* ==========================================================================
   SEÇÃO IV — Stack de Oferta
   ========================================================================== */
.oferta-card {
  max-width: 600px;
  margin: 48px auto 0;
  background: var(--bg-lift);
  border: 1px solid rgba(201, 168, 118, 0.22);
  border-radius: var(--radius-card);
  padding: 40px 36px;
  box-shadow: var(--ambient-glow);
}
.oferta-divisor {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 24px;
}
.oferta-divisor::before, .oferta-divisor::after {
  content: ''; flex: 1; height: 1px; background: var(--hairline);
}
.oferta-divisor span {
  font-family: var(--font-marca); font-size: 9px;
  letter-spacing: 0.42em; color: var(--accent);
}
.oferta-stack {
  list-style: none;
  margin-bottom: 24px;
}
.oferta-item {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px dashed rgba(201, 168, 118, 0.12);
  gap: 16px;
}
.oferta-item:last-child { border-bottom: none; }
.oferta-item-titulo {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 14px;
  color: var(--text-primary);
}
.oferta-item-desc {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 12px;
  color: rgba(239, 231, 210, 0.55);
  margin-top: 2px;
}
.oferta-item-valor {
  font-family: var(--font-marca);
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--accent);
  white-space: nowrap;
}
.oferta-total-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding-top: 18px;
  margin-bottom: 32px;
  border-top: 1px solid var(--hairline);
}
.oferta-total-label {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 14px;
  color: rgba(239, 231, 210, 0.65);
}
.oferta-total-valor {
  font-family: var(--font-display);
  font-size: 22px;
  color: rgba(239, 231, 210, 0.55);
  text-decoration: line-through;
  text-decoration-color: rgba(201, 168, 118, 0.45);
}
.oferta-preco-block {
  text-align: center;
  padding: 28px 16px;
  border: 1px solid var(--accent);
  border-radius: var(--radius-card);
  background: radial-gradient(ellipse at 50% 50%,
    rgba(201, 168, 118, 0.08) 0%, transparent 70%);
}
.oferta-contexto {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 16px;
  color: var(--accent);
  margin-bottom: 14px;
}
.oferta-parcelado {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(40px, 5vw, 56px);
  line-height: 1;
  color: var(--text-primary);
  letter-spacing: 0.01em;
  margin-bottom: 8px;
  text-shadow: var(--ambient-text-glow);
}
.oferta-avista {
  font-family: var(--font-marca);
  font-size: var(--size-body-s);
  letter-spacing: 0.18em;
  color: var(--accent);
}
```

- [ ] **Step 3: Verificar com dev mode**

Abrir `http://localhost:8081/?reveal=true`. Scroll até a seção. Esperado:
- Card centralizado com divisor "O QUE VOCÊ RECEBE"
- Lista de 4 items (método + 3 bônus) com valores ancorados R$ 897, 97, 47, 77 alinhados à direita em gold
- Linha "Valor real do pacote" com R$ 1.118 riscado
- Bloco final destacado com "Hoje, com o lançamento:" em italic gold + "12× R$ 19,70" gigante em Italiana + "ou R$ 197 à vista" em small caps gold
- SEM botão (botão é Seção V)

- [ ] **Step 4: Commit**

```bash
git add landing/index.html landing/style.css
git commit -m "feat(landing): secao IV - stack de oferta com preco ancorado"
```

---

### Task 9: Seção V — CTA Principal + Footer

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/style.css`

- [ ] **Step 1: Adicionar HTML após a seção IV em `index.html`**

```html
      <!-- Seção V · CTA Principal -->
      <section class="section section-cta">
        <div class="container">
          <div class="cta-block">
            <div class="cta-eyebrow" id="cta-eyebrow"></div>
            <a class="btn-primary-xl" id="cta-botao" href="#" rel="noopener" target="_self">
              <span id="cta-texto"></span>
              <span class="cta-arrow">→</span>
            </a>
            <ul class="cta-seguranca" id="cta-seguranca"></ul>
          </div>
        </div>
      </section>

      <script>
        (function() {
          const c = window.LANDING_COPY.cta;
          const cfg = window.LANDING_CONFIG;
          document.getElementById('cta-eyebrow').textContent = c.eyebrow;
          document.getElementById('cta-texto').textContent = c.botao;
          document.getElementById('cta-botao').href = cfg.KIWIFY_CHECKOUT_URL;
          document.getElementById('cta-seguranca').innerHTML = c.seguranca.map(s => `
            <li><span class="cta-bullet">◯</span> ${s}</li>
          `).join('');

          // Tracking on click
          document.getElementById('cta-botao').addEventListener('click', () => {
            if (window.fbq) {
              try { fbq('track', 'InitiateCheckout'); } catch (_) {}
            }
            if (window.dataLayer) window.dataLayer.push({ event: 'cta_click' });
          });
        })();
      </script>
    </div>
    <!-- /below-fold -->

    <!-- Footer minimalista (fora do below-fold — sempre visível) -->
    <footer class="page-footer">
      <div class="footer-monogram">
        <object data="../identity/logo/monogram.svg" type="image/svg+xml" aria-hidden="true"></object>
      </div>
      <div class="footer-tag">MÉTODO DESINFLAMAÇÃO · PRO · MMXXVI</div>
      <div class="footer-suporte" id="footer-suporte"></div>
      <nav class="footer-links">
        <a href="/politica-privacidade.html">Política de Privacidade</a>
        <span aria-hidden="true">·</span>
        <a href="/termos-de-uso.html">Termos de Uso</a>
      </nav>
    </footer>

    <script>
      (function() {
        const cfg = window.LANDING_CONFIG;
        document.getElementById('footer-suporte').textContent = `Suporte: ${cfg.SUPPORT_EMAIL}`;
      })();
    </script>
```

⚠️ Note que o `</div>` de fechamento do `#below-fold` agora termina ANTES do footer. O footer é elemento da `<main>` (ou irmão do main — escolha de implementação) mas NÃO é seção do reveal — sempre visível.

- [ ] **Step 2: Adicionar CSS no fim de `landing/style.css`**

```css
/* ==========================================================================
   SEÇÃO V — CTA Principal
   ========================================================================== */
.section-cta {
  padding: var(--space-xxxl) var(--space-xl);
}
.cta-block {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}
.cta-eyebrow {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 22px;
  color: var(--accent);
  margin-bottom: 40px;
  text-shadow: var(--ambient-text-glow);
}

.btn-primary-xl {
  display: inline-flex; align-items: center; gap: 16px;
  padding: 28px 80px;
  background: var(--accent);
  color: var(--bg-primary);
  font-family: var(--font-marca);
  font-size: 14px;
  letter-spacing: var(--tracking-eyebrow);
  text-decoration: none;
  border-radius: var(--radius-button);
  border: none;
  cursor: pointer;
  box-shadow: 0 0 80px rgba(201, 168, 118, 0.20);
  transition: filter 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}
.btn-primary-xl:hover {
  filter: brightness(1.08);
  box-shadow: 0 0 100px rgba(201, 168, 118, 0.32);
  transform: translateY(-1px);
}
.btn-primary-xl .cta-arrow {
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0;
  transition: transform 0.25s ease;
}
.btn-primary-xl:hover .cta-arrow {
  transform: translateX(4px);
}

.cta-seguranca {
  list-style: none;
  margin-top: 40px;
  display: flex; flex-direction: column; gap: 8px;
  align-items: center;
}
.cta-seguranca li {
  font-family: var(--font-marca);
  font-size: 10px;
  letter-spacing: 0.32em;
  color: rgba(201, 168, 118, 0.7);
  display: flex; align-items: center; gap: 10px;
}
.cta-bullet {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  font-size: 0;
}

/* ==========================================================================
   FOOTER minimalista
   ========================================================================== */
.page-footer {
  padding: var(--space-xxl) var(--space-xl);
  background: var(--bg-deep);
  border-top: 1px solid rgba(201, 168, 118, 0.18);
  text-align: center;
  display: flex; flex-direction: column; align-items: center;
  gap: 16px;
}
.footer-monogram object {
  width: 32px; height: 32px;
  --logo-accent: var(--accent);
  --logo-text: var(--accent);
  opacity: 0.85;
}
.footer-tag {
  font-family: var(--font-marca);
  font-size: 9px;
  letter-spacing: 0.42em;
  color: rgba(201, 168, 118, 0.5);
}
.footer-suporte {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 12px;
  color: rgba(239, 231, 210, 0.45);
}
.footer-links {
  display: flex; gap: 12px;
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 11px;
}
.footer-links a {
  color: rgba(201, 168, 118, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--accent); }
.footer-links span { color: rgba(201, 168, 118, 0.3); }
```

- [ ] **Step 3: Verificar com dev mode**

Abrir `http://localhost:8081/?reveal=true`. Scroll até o fim. Esperado:
- "Última oportunidade" em italic gold acima do botão
- Botão GIGANTE "QUERO ACESSAR O MÉTODO →" em gold sólido com texto carbon, glow forte
- Hover: brightness up + halo expand + flecha desliza pra direita
- Microcopy "◯ Compra 100% segura..." abaixo
- Footer minimalista com monograma 32px, tag MÉTODO DESINFLAMAÇÃO PRO MMXXVI, suporte email, links Política/Termos

- [ ] **Step 4: Commit**

```bash
git add landing/index.html landing/style.css
git commit -m "feat(landing): secao V (CTA principal) + footer minimalista"
```

---

## Phase 4 — Polish

### Task 10: Mobile responsive + Sticky CTA

**Files:**
- Modify: `landing/style.css`

- [ ] **Step 1: Adicionar regras mobile no fim de `landing/style.css`**

```css
/* ==========================================================================
   MOBILE — sticky CTA (apenas após reveal, em viewport pequena)
   ========================================================================== */
.sticky-cta {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(7, 16, 12, 0.92) 30%,
    rgba(7, 16, 12, 0.98) 100%);
  padding: 20px 16px 24px;
  text-align: center;
  z-index: 100;
  transform: translateY(100%);
  transition: transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.sticky-cta a {
  display: block;
  width: 100%;
  padding: 18px 20px;
  background: var(--accent);
  color: var(--bg-primary);
  font-family: var(--font-marca);
  font-size: 12px;
  letter-spacing: var(--tracking-eyebrow);
  text-decoration: none;
  border-radius: var(--radius-button);
  box-shadow: 0 0 40px rgba(201, 168, 118, 0.20);
}
body.revealed .sticky-cta {
  transform: translateY(0);
}

/* Sticky só em mobile/tablet pequena */
@media (min-width: 901px) {
  .sticky-cta { display: none; }
}

/* Quando sticky está visível, adiciona padding-bottom no footer pra não cobrir */
@media (max-width: 900px) {
  body.revealed .page-footer { padding-bottom: 110px; }
}

/* ==========================================================================
   MOBILE — refinements gerais
   ========================================================================== */
@media (max-width: 700px) {
  .section { padding: 64px 20px; }
  .modulos-grid, .bonus-grid { gap: 16px; }
  .oferta-card { padding: 28px 22px; }
  .btn-primary-xl { padding: 22px 32px; font-size: 13px; width: 100%; justify-content: center; }
  .cta-eyebrow { margin-bottom: 28px; }
  .cta-seguranca { margin-top: 28px; }
}

/* iOS Safari: garante que sticky CTA respeita safe-area-inset */
@supports (padding: env(safe-area-inset-bottom)) {
  .sticky-cta { padding-bottom: max(24px, env(safe-area-inset-bottom)); }
}
```

- [ ] **Step 2: Adicionar HTML do sticky CTA em `index.html`** — ANTES do `</body>` (após o footer):

```html
    <!-- Sticky CTA mobile (visível apenas em mobile e após reveal) -->
    <div class="sticky-cta" aria-hidden="false">
      <a href="#" id="sticky-cta-btn" rel="noopener">QUERO ACESSAR O MÉTODO →</a>
    </div>

    <script>
      (function() {
        const cfg = window.LANDING_CONFIG;
        const btn = document.getElementById('sticky-cta-btn');
        btn.href = cfg.KIWIFY_CHECKOUT_URL;
        btn.addEventListener('click', () => {
          if (window.fbq) { try { fbq('track', 'InitiateCheckout'); } catch (_) {} }
          if (window.dataLayer) window.dataLayer.push({ event: 'sticky_cta_click' });
        });
      })();
    </script>
```

- [ ] **Step 3: Verificar mobile no browser**

DevTools → modo mobile (375×667 ou similar). Carregar `http://localhost:8081/?reveal=true`. Esperado:
- Hero responsivo, manchete escala, padding lateral reduzido
- Grid de módulos vira 1 coluna
- Grid de bônus vira 1 coluna
- Sticky CTA aparece na base da viewport (gold, full-width, padding generoso)
- Footer empurrado pra cima pra não ser coberto pelo sticky

- [ ] **Step 4: Commit**

```bash
git add landing/style.css landing/index.html
git commit -m "feat(landing): mobile responsivo + sticky CTA na base apos reveal"
```

---

### Task 11: `tracking.js` — Meta Pixel + GTM bootstrap

**Files:**
- Create: `landing/tracking.js`
- Modify: `landing/index.html` (adicionar `<script src="tracking.js" defer>`)

- [ ] **Step 1: Criar `landing/tracking.js`**

```js
/* ==========================================================================
   TRACKING.JS — bootstrap do Meta Pixel e Google Tag Manager
   IDs vêm de window.LANDING_CONFIG (substituídos antes do deploy)
   ========================================================================== */

(function() {
  const cfg = window.LANDING_CONFIG;
  if (!cfg) {
    console.warn('LANDING_CONFIG não definido. tracking.js abortado.');
    return;
  }

  // ============================================================
  // Meta Pixel (Facebook / Instagram)
  // ============================================================
  if (cfg.META_PIXEL_ID && cfg.META_PIXEL_ID !== 'XXXXXXXXXXXX') {
    !function(f,b,e,v,n,t,s) {
      if(f.fbq) return;
      n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq) f._fbq=n;
      n.push=n; n.loaded=!0; n.version='2.0';
      n.queue=[]; t=b.createElement(e); t.async=!0; t.src=v;
      s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', cfg.META_PIXEL_ID);
    fbq('track', 'PageView');
  } else {
    console.info('META_PIXEL_ID não configurado — Meta Pixel inativo.');
  }

  // ============================================================
  // Google Tag Manager
  // ============================================================
  if (cfg.GTM_ID && cfg.GTM_ID !== 'GTM-XXXXXXX') {
    (function(w,d,s,l,i) {
      w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
      j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',cfg.GTM_ID);
  } else {
    console.info('GTM_ID não configurado — Google Tag Manager inativo.');
    window.dataLayer = window.dataLayer || [];
  }

  // ============================================================
  // ScrollDepth tracker (quartis 25/50/75/100)
  // ============================================================
  let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
  function trackScrollDepth() {
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    const pct = (scrolled / total) * 100;
    [25, 50, 75, 100].forEach(q => {
      if (pct >= q && !scrollMarks[q]) {
        scrollMarks[q] = true;
        if (window.dataLayer) window.dataLayer.push({ event: `scroll_depth_${q}` });
        if (window.fbq) {
          try { fbq('trackCustom', `ScrollDepth${q}`); } catch (_) {}
        }
      }
    });
  }
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
})();
```

- [ ] **Step 2: Adicionar `<noscript>` do GTM logo após `<body>` em `index.html`**

```html
<body data-mode="apothecary">
  <!-- GTM noscript fallback -->
  <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
      height="0" width="0" style="display:none;visibility:hidden"
      title="Google Tag Manager"></iframe>
  </noscript>
```

⚠️ Note que `GTM-XXXXXXX` precisa ser substituído manualmente no noscript (não dá pra fazer via JS porque é noscript). Documentar isso na entrega.

- [ ] **Step 3: Adicionar `<script src="tracking.js" defer>` em `index.html`**

Logo antes de `<script src="reveal.js" defer></script>`:

```html
  <script src="tracking.js" defer></script>
  <script src="https://player.vimeo.com/api/player.js" defer></script>
  <script src="reveal.js" defer></script>
```

- [ ] **Step 4: Verificar console**

Refresh `http://localhost:8081/`. Esperado no console:
- `META_PIXEL_ID não configurado — Meta Pixel inativo.` (info log, normal — IDs ainda placeholder)
- `GTM_ID não configurado — Google Tag Manager inativo.` (info log, normal)
- Sem errors

- [ ] **Step 5: Commit**

```bash
git add landing/tracking.js landing/index.html
git commit -m "feat(landing): tracking.js com Meta Pixel + GTM bootstrap + scroll depth"
```

---

### Task 12: SEO + Open Graph + Schema.org

**Files:**
- Modify: `landing/index.html` (adicionar `<script type="application/ld+json">` no head)

- [ ] **Step 1: Adicionar Schema.org no `<head>` de `index.html`** (antes do fechamento `</head>`)

```html
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Método Desinflamação Pro",
    "description": "Protocolo de 21 dias para reverter a inflamação celular crônica. Sem dietas restritivas, sem medicamentos.",
    "image": "https://desinflamacao.com.br/landing/assets/og-image.jpg",
    "brand": {
      "@type": "Brand",
      "name": "Método Desinflamação Pro"
    },
    "offers": {
      "@type": "Offer",
      "price": "197.00",
      "priceCurrency": "BRL",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://desinflamacao.com.br/"
    }
  }
  </script>

  <!-- Canonical -->
  <link rel="canonical" href="https://desinflamacao.com.br/">
```

⚠️ **Substituir antes de deploy:** `desinflamacao.com.br` deve ser o domínio real onde a página será publicada. `priceValidUntil` deve ser uma data futura razoável (1 ano à frente).

- [ ] **Step 2: Validar via Rich Results Test (manual)**

Após deploy: copiar URL pública e testar em `https://search.google.com/test/rich-results`. Esperado: Schema.org Product reconhecido, sem erros críticos.

Para teste local: copiar conteúdo da JSON-LD e validar em `https://validator.schema.org/`.

- [ ] **Step 3: Commit**

```bash
git add landing/index.html
git commit -m "feat(landing): SEO + Schema.org Product + canonical URL"
```

---

### Task 13: LGPD Cookie Banner

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/style.css`

- [ ] **Step 1: Adicionar HTML do banner em `index.html`** (logo antes de `</body>`, após o sticky-cta):

```html
    <!-- LGPD Cookie Banner -->
    <div class="cookie-banner" id="cookie-banner" hidden>
      <div class="cookie-content">
        <p>Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa <a href="/politica-privacidade.html">Política de Privacidade</a>.</p>
        <button class="cookie-accept" id="cookie-accept">OK</button>
      </div>
    </div>

    <script>
      (function() {
        const KEY = 'desinflamacao_cookie_consent';
        const banner = document.getElementById('cookie-banner');
        const btn = document.getElementById('cookie-accept');
        if (!localStorage.getItem(KEY)) {
          banner.hidden = false;
        }
        btn.addEventListener('click', () => {
          localStorage.setItem(KEY, '1');
          banner.hidden = true;
        });
      })();
    </script>
```

- [ ] **Step 2: Adicionar CSS no fim de `landing/style.css`**

```css
/* ==========================================================================
   COOKIE BANNER (LGPD)
   ========================================================================== */
.cookie-banner {
  position: fixed;
  bottom: 16px; left: 16px;
  max-width: 380px;
  background: var(--bg-lift);
  border: 1px solid var(--accent-muted);
  border-radius: var(--radius-card);
  padding: 14px 18px;
  z-index: 200;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  animation: cookieFadeIn 400ms ease-out;
}
@keyframes cookieFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.cookie-content {
  display: flex; align-items: center; gap: 14px;
}
.cookie-content p {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 12px;
  line-height: 1.55;
  color: rgba(239, 231, 210, 0.85);
  flex: 1;
}
.cookie-content a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.cookie-accept {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent-muted);
  padding: 8px 18px;
  font-family: var(--font-marca);
  font-size: 10px;
  letter-spacing: 0.32em;
  border-radius: var(--radius-button);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.cookie-accept:hover {
  border-color: var(--accent);
  background: rgba(201, 168, 118, 0.06);
}

@media (max-width: 600px) {
  .cookie-banner { left: 12px; right: 12px; max-width: none; bottom: 12px; }
  .cookie-content { flex-direction: column; align-items: stretch; gap: 12px; }
}
```

- [ ] **Step 3: Verificar**

Abrir `http://localhost:8081/`. Esperado: banner discreto no canto inferior esquerdo (sem cobrir conteúdo), texto + link Política + botão OK em ghost. Click no OK persiste em localStorage e some o banner. Refresh: banner não reaparece.

Para testar de novo: `localStorage.removeItem('desinflamacao_cookie_consent')` no console + refresh.

- [ ] **Step 4: Commit**

```bash
git add landing/index.html landing/style.css
git commit -m "feat(landing): LGPD cookie banner discreto com persistencia em localStorage"
```

---

## Phase 5 — Image Assets via Nano Banana 2

> Para todos os tasks abaixo: ler `nano-banana2/SKILL.md` antes de executar para conhecer o schema JSON denso-narrativo. Os prompts fornecidos abaixo são pontos de partida.
>
> **Padrão de comando:** `python nano-banana2/scripts/generate_kie.py <prompt.json> <output.jpg> <aspect>`
>
> **Pré-requisito:** `KIE_AI_API_KEY` em `.env` (raiz ou `~`).

### Task 14: VSL Poster (frame de pré-play)

**Files:**
- Create: `nano-banana2/prompts/landing/vsl-poster.json`
- Create: `landing/assets/poster.jpg` (gerado pela API)

- [ ] **Step 1: Ler `nano-banana2/SKILL.md`** para entender o schema JSON denso-narrativo.

```bash
cat nano-banana2/SKILL.md
```

- [ ] **Step 2: Criar `nano-banana2/prompts/landing/vsl-poster.json`** seguindo o schema do SKILL

Conteúdo conceitual do prompt (ajuste o schema conforme `SKILL.md`):

```
Cinematic moody product photography, single point of warm gold light source from upper-left,
deep emerald-tinted carbon background (#0F1B15 fading to #050A07),
hero subject: a single small apothecary glass vial with amber-tinted liquid resting on weathered
dark stone surface, the vial catches the light revealing thin gold hairlines on its label,
shallow depth of field f/2.0, lens compression suggests medium-format camera,
fall-off into deep shadow on the right, soft volumetric haze suggesting forest air,
no text, no human, no smile, no fitness equipment, no brightly colored food,
mood is "longevity clinic in a Swiss Alpine retreat at twilight",
restrained, expensive, silent. shot on Hasselblad H6D, lens 80mm f/2.8.
aspect ratio 16:9, 1920x1080.
```

- [ ] **Step 3: Rodar a geração**

```bash
python nano-banana2/scripts/generate_kie.py \
  nano-banana2/prompts/landing/vsl-poster.json \
  nano-banana2/images/landing/vsl-poster.jpg \
  "16:9"
```

Esperado: arquivo `.jpg` em ~150-400KB criado em `nano-banana2/images/landing/vsl-poster.jpg`. Iterar prompt se resultado ficar plástico, com sorriso, ou com objetos coloridos genéricos.

- [ ] **Step 4: Copiar pra `landing/assets/poster.jpg`**

```bash
cp nano-banana2/images/landing/vsl-poster.jpg landing/assets/poster.jpg
```

- [ ] **Step 5: Verificar visualmente**

Abrir `landing/assets/poster.jpg` no Visualizador de Imagens do Windows ou IDE. Verificar: atmosfera moody, gold acentuado, sem texto/pessoas/objetos coloridos genéricos.

Se não satisfazer: ajustar o prompt JSON (mais específico sobre composição/luz) e re-rodar Step 3.

- [ ] **Step 6: Commit**

```bash
git add nano-banana2/prompts/landing/vsl-poster.json landing/assets/poster.jpg
git commit -m "feat(assets): VSL poster gerado via nano-banana2 - cinematic moody Bio-Premium"
```

---

### Task 15: 3 PDF Mockups (capa de livro de luxo)

**Files:**
- Create: `nano-banana2/prompts/landing/pdf-guia.json`
- Create: `nano-banana2/prompts/landing/pdf-planner.json`
- Create: `nano-banana2/prompts/landing/pdf-receitas.json`
- Create: `landing/assets/pdf-guia.jpg`
- Create: `landing/assets/pdf-planner.jpg`
- Create: `landing/assets/pdf-receitas.jpg`

- [ ] **Step 1: Criar 3 prompts JSON** em `nano-banana2/prompts/landing/`

Direção comum a todos os 3 (adaptar o schema conforme `SKILL.md`):

```
Luxury hardcover book mockup, photographed on a deep emerald velvet surface with single
warm gold key light from upper-right, book lying flat or at slight angle, shallow DOF,
cover material is matte deep emerald (#0F3D2E) with title embossed in gold foil,
title typography is "Italiana"-style serif italic, the book's spine is visible faintly,
no human hands, no surrounding clutter, single object hero shot,
mood is "rare antique apothecary manual rediscovered", editorial photography,
shot on medium format, lens 100mm f/2.8, aspect ratio 3:4 (portrait, 1200x1600).
```

Diferenciações por arquivo:

- `pdf-guia.json`: title text on cover = "Guia de Compras Sem Erro" + small caps subtitle "47 INGREDIENTES ANTI-INFLAMATÓRIOS"
- `pdf-planner.json`: title = "Planner do Desafio 6 Dias" + "RITUAL DE RESET CELULAR"
- `pdf-receitas.json`: title = "Receitas 15 Minutos de Poder" + "30 RECEITAS · COZINHA RÁPIDA"

- [ ] **Step 2: Rodar as 3 gerações em paralelo** (Kie.ai aguenta concorrência)

Em terminais separados ou Bash em paralelo:

```bash
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/landing/pdf-guia.json nano-banana2/images/landing/pdf-guia.jpg "3:4" &
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/landing/pdf-planner.json nano-banana2/images/landing/pdf-planner.jpg "3:4" &
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/landing/pdf-receitas.json nano-banana2/images/landing/pdf-receitas.jpg "3:4" &
wait
```

- [ ] **Step 3: Copiar pra `landing/assets/`**

```bash
cp nano-banana2/images/landing/pdf-guia.jpg landing/assets/pdf-guia.jpg
cp nano-banana2/images/landing/pdf-planner.jpg landing/assets/pdf-planner.jpg
cp nano-banana2/images/landing/pdf-receitas.jpg landing/assets/pdf-receitas.jpg
```

- [ ] **Step 4: Verificar visualmente**

Abrir cada um. Critério: parecem livros de bibliófilo de elite, não capas comerciais. Se algum sair amador, iterar o prompt.

- [ ] **Step 5: Commit**

```bash
git add nano-banana2/prompts/landing/pdf-guia.json \
        nano-banana2/prompts/landing/pdf-planner.json \
        nano-banana2/prompts/landing/pdf-receitas.json \
        landing/assets/pdf-guia.jpg \
        landing/assets/pdf-planner.jpg \
        landing/assets/pdf-receitas.jpg
git commit -m "feat(assets): 3 mockups de PDF como livros de luxo via nano-banana2"
```

---

### Task 16: Open Graph Image (1200×630)

**Files:**
- Create: `nano-banana2/prompts/landing/og-image.json`
- Create: `landing/assets/og-image.jpg`

- [ ] **Step 1: Criar `nano-banana2/prompts/landing/og-image.json`**

```
Cinematic horizontal composition for social media share, aspect ratio 16:9 (1200x630),
deep emerald-tinted carbon background gradient from upper-left (#0F1B15) to lower-right (#050A07),
gold radial glow at center 40% from top, single hero element: an apothecary glass vial with amber liquid
small in foreground, title text on the right "Método Desinflamação Pro" in Italiana-style italic gold,
subtitle small caps "PROTOCOLO ANTI-INFLAMATÓRIO · 21 DIAS",
no human, no clutter, soft volumetric haze, expensive editorial mood,
shot on medium format 80mm f/2.8.
```

- [ ] **Step 2: Rodar geração**

```bash
python nano-banana2/scripts/generate_kie.py \
  nano-banana2/prompts/landing/og-image.json \
  nano-banana2/images/landing/og-image.jpg \
  "16:9"
```

- [ ] **Step 3: Copiar pra `landing/assets/og-image.jpg`**

```bash
cp nano-banana2/images/landing/og-image.jpg landing/assets/og-image.jpg
```

- [ ] **Step 4: Validar tamanho e dimensões**

Esperado: ~1200×630 ou próximo. Se sair em outro tamanho, considerar redimensionar com Python PIL ou ImageMagick antes de servir.

- [ ] **Step 5: Testar share preview**

Após deploy, usar `https://www.opengraph.xyz/` ou `https://www.facebook.com/tools/debug/` pra validar a preview no Facebook/WhatsApp/Twitter.

- [ ] **Step 6: Commit**

```bash
git add nano-banana2/prompts/landing/og-image.json landing/assets/og-image.jpg
git commit -m "feat(assets): OG image 1200x630 para social share via nano-banana2"
```

---

## Phase 6 — Validation & Tag

### Task 17: QA cross-browser + Lighthouse + tag v0.2.0-landing

**Files:**
- (sem mudanças de código — só verificação)

- [ ] **Step 1: Verificar fluxo completo no Chrome**

```bash
cd landing && python -m http.server 8081
```

Abrir `http://localhost:8081/`:
- Hero carrega com Apothecary atmosphere ✓
- Vimeo player carrega (vídeo demo) ✓
- Sem console errors ✓
- DevTools Network: tokens.css carrega via path relativo `../identity/tokens.css` ✓
- DevTools Elements: `body` tem classe vazia (não `revealed`) ✓
- Below-fold sections existem no DOM mas estão invisíveis (`opacity: 0`) ✓

- [ ] **Step 2: Testar dev mode**

Abrir `http://localhost:8081/?reveal=true`. Esperado:
- Lock-note some
- Body ganha classe `revealed`
- 5 seções fade-in encadeado
- Botão CTA principal aparece e está clicável (link aponta pra `KIWIFY_CHECKOUT_URL` placeholder — esperado)
- Sticky CTA aparece em mobile

- [ ] **Step 3: Testar em Firefox**

Abrir mesma URL no Firefox. Confirmar visual e dev mode funcionam.

- [ ] **Step 4: Testar mobile via DevTools**

Chrome DevTools → Device Toolbar → iPhone 14 Pro (393×852). Esperado:
- Hero responsivo, tipografia escala via `clamp()`
- Grids viram 1 coluna
- Sticky CTA aparece após reveal

- [ ] **Step 5: Lighthouse audit**

Chrome DevTools → Lighthouse → Performance + Accessibility + SEO + Best Practices → Generate report.

Targets mínimos:
- Performance ≥ 85
- Accessibility ≥ 95
- Best Practices ≥ 90
- SEO ≥ 85

Se algum target falhar, investigar e ajustar (mais provável: imagens muito grandes — gerar versões webp ou comprimir).

- [ ] **Step 6: Validar Schema.org**

Copiar conteúdo da `<script type="application/ld+json">` do `index.html` e colar em `https://validator.schema.org/`. Esperado: zero erros, zero warnings.

- [ ] **Step 7: Tag de release**

```bash
git tag -a v0.2.0-landing -m "Landing Page VSL v0.2.0 - mecanica de revelacao time-locked + 5 secoes de conversao + tracking + assets"
git log --oneline -25
git tag -l
```

Esperado: histórico mostra todos os ~17 commits da Phase 1-5 + tag aplicado.

- [ ] **Step 8: Final commit (atualização de memória do projeto)**

Atualizar `~/.claude/projects/.../memory/project_metodo_desinflamacao.md` (sub-projeto landing concluído):

```markdown
**Status do projeto (2026-05-07):**
- Sistema visual `v0.1.0-identity` ✓
- Landing page `v0.2.0-landing` ✓ — pronta pra deploy. Substituir antes de prod: VIDEO_ID, META_PIXEL_ID, GTM_ID, KIWIFY_CHECKOUT_URL.
```

(Esta atualização não vai pro git — é arquivo de memória local. Apenas mantém o estado do projeto coerente.)

---

## Spec Coverage (self-review)

| Spec section | Implementado em |
|---|---|
| §1 Big Idea (estados imersão/pitch) | Task 4 (reveal.js) + Tasks 5-9 (sections) |
| §2 Arquitetura técnica | Task 1 (setup) |
| §3 Estados da página (imersão / pitch) | Task 3 (hero) + Task 4 (reveal) |
| §4 Seções below-fold (5 seções) | Tasks 5, 6, 7, 8, 9 |
| §5 Mecânica do Reveal | Task 4 |
| §6 Tracking (Meta + GTM + custom events) | Task 11 |
| §7 Performance (Lighthouse targets) | Task 17 |
| §8 Acessibilidade (lang, headings, focus, contraste) | Tasks 1, 3, 4 (focus management), 17 (audit) |
| §9 Mobile / Responsivo | Task 10 |
| §10 Copy (variável vs. fixo) | Task 1 (content.js) |
| §11 SEO (title, meta, OG, Schema) | Task 1 (head) + Task 12 (Schema) |
| §12 Estados de erro | Task 4 (Vimeo SDK fallback + setTimeout 6min) |
| §13 Out of scope | Honrado |
| §14 Critérios de aceitação | Task 17 |

---

## Próximos passos pós-implementação

Após aprovação e deploy:

1. **Substituir placeholders de produção** em `content.js`: `VIDEO_ID`, `META_PIXEL_ID`, `GTM_ID`, `KIWIFY_CHECKOUT_URL`. Também o domínio canonical em `index.html` Schema.org block.
2. **Deploy** via Cloudflare Pages, Netlify ou Vercel — o repo já está pronto, basta apontar a build.
3. **Próximo subprojeto** (sugestão): **Roteiro completo da VSL** (script de 6-8min com storyboard de cenas faceless), porque a página sem o vídeo certo não converte. Alternativa: **estruturação detalhada do produto** (5 módulos × 26 aulas + conteúdo dos PDFs).
