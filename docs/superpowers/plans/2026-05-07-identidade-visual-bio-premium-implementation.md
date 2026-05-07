# Identidade Visual Bio-Premium — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produzir os artefatos canônicos do sistema visual Bio-Premium do Método Desinflamação Pro: arquivo de tokens CSS, 5 SVGs de logo, página única de styleguide e arquivo de validação. Esses artefatos viram a fonte de verdade que todos os subprojetos do funil (página de vendas, upsell, PDFs, e-mails) vão importar.

**Architecture:** Projeto estático, zero build tooling, zero framework. CSS custom properties centralizam o sistema. Cada modo de superfície é ativado via atributo `data-mode="heritage|apothecary|botanique"` em qualquer container. Logos são SVGs inline com cores controladas por variáveis CSS (`--logo-accent`, `--logo-text`), permitindo que o mesmo SVG seja re-tinto pelo modo do container pai. Validação acontece em browser via `validate.html` (sem Node, sem Playwright, sem dependências).

**Tech Stack:** HTML5, CSS3 (custom properties), SVG, vanilla JS (apenas em validate.html), Google Fonts (Italiana, Cormorant Garamond, Marcellus SC, Inter). Sem build, sem npm, sem framework.

**Spec de referência:** `docs/superpowers/specs/2026-05-07-identidade-visual-bio-premium-design.md`

**File structure:**

```
[project root]
├── identity/
│   ├── tokens.css                 # CSS custom properties (DNA + 3 modos + escala)
│   ├── styleguide.html            # Página única de demonstração do sistema
│   ├── validate.html              # Test runner em browser
│   ├── validate.js                # Asserções (tokens, contraste, SVGs)
│   └── logo/
│       ├── lockup-vertical.svg    # Lockup vertical canônico
│       ├── lockup-horizontal.svg  # Variante horizontal compacta
│       ├── monogram.svg           # M em moldura dupla circular
│       ├── monogram-seal.svg      # Monograma + EST · MMXXVI abaixo
│       └── favicon.svg            # 32×32 simplificado
├── docs/superpowers/
│   ├── specs/2026-05-07-identidade-visual-bio-premium-design.md
│   └── plans/2026-05-07-identidade-visual-bio-premium-implementation.md   # ← este arquivo
└── .gitignore
```

---

## Phase 1 — Foundation

### Task 1: Setup do repositório

**Files:**
- Create: `.gitignore`
- Create: `identity/` (diretório)
- Create: `identity/logo/` (diretório)

- [ ] **Step 1: Inicializar repositório git**

```bash
git init
git branch -M main
```

- [ ] **Step 2: Criar `.gitignore`**

Caminho: `.gitignore`

```gitignore
# Visual companion working files
.superpowers/

# Nano-banana toolchain
nano-banana2/.env
nano-banana2/__pycache__/

# OS
.DS_Store
Thumbs.db

# Editors
.vscode/
.idea/
*.swp
```

- [ ] **Step 3: Criar diretório `identity/` e subdiretório `identity/logo/`**

```bash
mkdir identity
mkdir identity/logo
```

- [ ] **Step 4: Commit inicial**

```bash
git add .gitignore identity/ docs/
git commit -m "chore: setup do projeto identidade Bio-Premium"
```

Expected: commit criado, `git status` limpo.

---

### Task 2: Criar `identity/tokens.css` com DNA + 3 modos + escala

Este é o arquivo canônico que todos os subprojetos vão importar. Implementa a Seção 9 do spec (Tokens CSS).

**Files:**
- Create: `identity/tokens.css`

- [ ] **Step 1: Criar `identity/tokens.css` com conteúdo completo**

```css
/* ==========================================================================
   IDENTIDADE VISUAL BIO-PREMIUM — TOKENS CANÔNICOS
   Método Desinflamação Pro
   Spec: docs/superpowers/specs/2026-05-07-identidade-visual-bio-premium-design.md
   ========================================================================== */

:root {
  /* DNA — núcleo da paleta, presente em todos os modos */
  --core-emerald: #0F3D2E;
  --core-gold: #A88B4A;
  --core-ivory: #EBE3D0;

  /* Tipografia (famílias) */
  --font-display: 'Italiana', serif;
  --font-editorial: 'Cormorant Garamond', serif;
  --font-marca: 'Marcellus SC', serif;
  --font-body: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

  /* Escala tipográfica (rem, base 16px) */
  --size-display-xxl: 6rem;     /* 96px — Hero hero, uma palavra dominante */
  --size-display-xl: 4rem;      /* 64px — Headline principal */
  --size-display-l: 3rem;       /* 48px — Headline secundária */
  --size-display-m: 2.25rem;    /* 36px — Section titles */
  --size-display-s: 1.75rem;    /* 28px — Card titles */
  --size-editorial-l: 1.375rem; /* 22px — Lede, pull-quote */
  --size-editorial-m: 1.125rem; /* 18px — Subtítulo italic */
  --size-body-l: 1.0625rem;     /* 17px — Corpo principal */
  --size-body-m: 0.9375rem;     /* 15px — Corpo secundário */
  --size-body-s: 0.8125rem;     /* 13px — Captions */
  --size-eyebrow: 0.6875rem;    /* 11px — Eyebrows */
  --size-micro: 0.5625rem;      /*  9px — Tags de marca */

  /* Espaçamento (8px base) */
  --space-xs: 4px;
  --space-s: 8px;
  --space-m: 16px;
  --space-l: 24px;
  --space-xl: 40px;
  --space-xxl: 64px;
  --space-xxxl: 96px;

  /* Letter-spacing canônicos */
  --tracking-display: 0.015em;
  --tracking-eyebrow: 0.32em;
  --tracking-micro: 0.5em;

  /* Bordas */
  --radius-card: 4px;
  --radius-button: 2px;
  --hairline-width: 1px;
}

/* ==========================================================================
   MODO I — HERITAGE (marca-mãe / institucional)
   ========================================================================== */
[data-mode="heritage"] {
  --bg-primary: #0F3D2E;
  --bg-lift: #163F31;
  --bg-deep: #0A3024;
  --text-primary: #EBE3D0;
  --text-muted: rgba(235, 227, 208, 0.75);
  --accent: #A88B4A;
  --accent-muted: rgba(168, 139, 74, 0.55);
  --hairline: rgba(168, 139, 74, 0.22);

  --logo-accent: #A88B4A;
  --logo-text: #EBE3D0;
}

/* ==========================================================================
   MODO II — APOTHECARY (VSL / página de vendas)
   ========================================================================== */
[data-mode="apothecary"] {
  --bg-primary: #07100C;
  --bg-lift: #0A1410;
  --bg-deep: #050A07;
  --text-primary: #EFE7D2;
  --text-muted: rgba(239, 231, 210, 0.72);
  --accent: #C9A876;
  --accent-muted: rgba(201, 168, 118, 0.55);
  --hairline: rgba(201, 168, 118, 0.14);

  --logo-accent: #C9A876;
  --logo-text: #EFE7D2;
}

/* ==========================================================================
   MODO III — BOTANIQUE (PDFs / materiais escritos)
   ========================================================================== */
[data-mode="botanique"] {
  --bg-primary: #F2ECDD;
  --bg-lift: #E8DFC8;
  --bg-deep: #D8CEB4;
  --text-primary: #1F3D2E;
  --text-muted: rgba(31, 61, 46, 0.78);
  --accent: #9C7C42;
  --accent-muted: rgba(31, 61, 46, 0.55);
  --hairline: rgba(31, 61, 46, 0.18);

  --logo-accent: #9C7C42;
  --logo-text: #1F3D2E;
}

/* ==========================================================================
   APLICAÇÃO BASE — qualquer container com data-mode herda automaticamente
   ========================================================================== */
[data-mode] {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-weight: 300;
  font-size: var(--size-body-l);
  line-height: 1.65;
}
```

- [ ] **Step 2: Verificar manualmente abrindo o arquivo**

Abrir `identity/tokens.css` no editor e verificar visualmente que:
- Todos os 9 tokens DNA estão presentes (3 cores, 4 fontes, 12 tamanhos, 7 espaçamentos)
- Todos os 11 tokens por modo estão presentes em cada um dos 3 modos (= 33 tokens de modo)
- Cada bloco `[data-mode="..."]` tem `--logo-accent` e `--logo-text`

- [ ] **Step 3: Commit**

```bash
git add identity/tokens.css
git commit -m "feat(identity): tokens canonicos DNA + 3 modos"
```

---

## Phase 2 — Validation harness

### Task 3: Criar `identity/validate.html` + `identity/validate.js`

Test runner em browser. Roda asserções sobre tokens (presença + valor), contraste WCAG entre `text` e `bg` em cada modo, e validade dos SVGs (carregam sem 404). Sem dependências.

**Files:**
- Create: `identity/validate.html`
- Create: `identity/validate.js`

- [ ] **Step 1: Criar `identity/validate.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Validate · Identidade Bio-Premium</title>
  <link rel="stylesheet" href="tokens.css">
  <style>
    body { font-family: ui-monospace, 'SF Mono', Consolas, monospace; padding: 32px; background: #fafafa; color: #111; max-width: 1100px; margin: 0 auto; }
    h1 { font-size: 22px; margin-bottom: 8px; }
    h2 { font-size: 14px; margin-top: 28px; padding-bottom: 6px; border-bottom: 1px solid #ddd; text-transform: uppercase; letter-spacing: 0.1em; color: #555; }
    .summary { margin: 16px 0 24px; padding: 12px 16px; background: #fff; border: 1px solid #ddd; border-radius: 4px; }
    .summary.all-pass { background: #ecf8ef; border-color: #6ec48d; }
    .summary.has-fail { background: #fce8e6; border-color: #d93025; }
    .test { padding: 6px 12px; margin: 2px 0; border-radius: 3px; font-size: 13px; display: flex; gap: 12px; align-items: center; }
    .test.pass { background: #ecf8ef; }
    .test.fail { background: #fce8e6; }
    .test .icon { width: 14px; flex-shrink: 0; }
    .test.pass .icon::before { content: '✓'; color: #2da34d; font-weight: bold; }
    .test.fail .icon::before { content: '✗'; color: #d93025; font-weight: bold; }
    .test .name { flex: 1; }
    .test .detail { color: #666; font-size: 11px; }
    .fixtures { position: absolute; visibility: hidden; pointer-events: none; left: -9999px; }
  </style>
</head>
<body>

  <h1>Validate · Identidade Visual Bio-Premium</h1>
  <div id="summary" class="summary">Executando…</div>

  <h2>1 · DNA tokens</h2>
  <div id="dna-results"></div>

  <h2>2 · Heritage mode tokens</h2>
  <div id="heritage-results"></div>

  <h2>3 · Apothecary mode tokens</h2>
  <div id="apothecary-results"></div>

  <h2>4 · Botanique mode tokens</h2>
  <div id="botanique-results"></div>

  <h2>5 · Contraste WCAG</h2>
  <div id="contrast-results"></div>

  <h2>6 · SVGs de logo</h2>
  <div id="logos-results"></div>

  <!-- Fixtures invisíveis para forçar resolução de tokens -->
  <div class="fixtures">
    <div id="fx-dna"></div>
    <div id="fx-heritage" data-mode="heritage"></div>
    <div id="fx-apothecary" data-mode="apothecary"></div>
    <div id="fx-botanique" data-mode="botanique"></div>
  </div>

  <script src="validate.js"></script>
</body>
</html>
```

- [ ] **Step 2: Criar `identity/validate.js`**

```js
/* ==========================================================================
   VALIDATE — runner de asserções para identity/tokens.css e logos
   ========================================================================== */

(function () {
  const results = { pass: 0, fail: 0 };

  function assert(condition, name, detail = '') {
    const passed = !!condition;
    if (passed) results.pass++; else results.fail++;
    return { passed, name, detail };
  }

  function render(targetId, items) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = items.map(item => `
      <div class="test ${item.passed ? 'pass' : 'fail'}">
        <span class="icon"></span>
        <span class="name">${item.name}</span>
        <span class="detail">${item.detail}</span>
      </div>
    `).join('');
  }

  function getVar(fixtureId, name) {
    const el = document.getElementById(fixtureId);
    if (!el) return null;
    const value = getComputedStyle(el).getPropertyValue(name).trim();
    return value || null;
  }

  // Converte hex / rgb() / rgba() para [r, g, b, a] em 0..1
  function parseColor(input) {
    if (!input) return null;
    input = input.trim();
    if (input.startsWith('#')) {
      const hex = input.slice(1);
      const full = hex.length === 3
        ? hex.split('').map(c => c + c).join('')
        : hex;
      return [
        parseInt(full.slice(0, 2), 16) / 255,
        parseInt(full.slice(2, 4), 16) / 255,
        parseInt(full.slice(4, 6), 16) / 255,
        1,
      ];
    }
    const m = input.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const parts = m[1].split(',').map(s => parseFloat(s.trim()));
      return [parts[0]/255, parts[1]/255, parts[2]/255, parts[3] !== undefined ? parts[3] : 1];
    }
    return null;
  }

  // Composição alfa contra fundo (assume bg opaco)
  function composite(fg, bg) {
    const a = fg[3];
    return [
      fg[0]*a + bg[0]*(1-a),
      fg[1]*a + bg[1]*(1-a),
      fg[2]*a + bg[2]*(1-a),
      1,
    ];
  }

  // Luminância relativa (WCAG)
  function relLum([r, g, b]) {
    const lin = c => (c <= 0.03928) ? c/12.92 : Math.pow((c + 0.055)/1.055, 2.4);
    return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b);
  }

  function contrastRatio(fg, bg) {
    const composed = composite(fg, bg);
    const L1 = relLum(composed);
    const L2 = relLum(bg);
    const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
    return (hi + 0.05) / (lo + 0.05);
  }

  // ==========================================================================
  // 1 · DNA tokens
  // ==========================================================================
  const dnaTests = [
    assert(getVar('fx-dna', '--core-emerald') === '#0F3D2E', '--core-emerald = #0F3D2E', getVar('fx-dna', '--core-emerald') || 'undefined'),
    assert(getVar('fx-dna', '--core-gold') === '#A88B4A', '--core-gold = #A88B4A', getVar('fx-dna', '--core-gold') || 'undefined'),
    assert(getVar('fx-dna', '--core-ivory') === '#EBE3D0', '--core-ivory = #EBE3D0', getVar('fx-dna', '--core-ivory') || 'undefined'),
    assert(getVar('fx-dna', '--font-display').includes('Italiana'), '--font-display contém Italiana'),
    assert(getVar('fx-dna', '--font-editorial').includes('Cormorant'), '--font-editorial contém Cormorant'),
    assert(getVar('fx-dna', '--font-marca').includes('Marcellus'), '--font-marca contém Marcellus'),
    assert(getVar('fx-dna', '--font-body').includes('Inter'), '--font-body contém Inter'),
    assert(getVar('fx-dna', '--size-display-xl') === '4rem', '--size-display-xl = 4rem'),
    assert(getVar('fx-dna', '--size-body-l') === '1.0625rem', '--size-body-l = 1.0625rem'),
    assert(getVar('fx-dna', '--size-eyebrow') === '0.6875rem', '--size-eyebrow = 0.6875rem'),
    assert(getVar('fx-dna', '--space-l') === '24px', '--space-l = 24px'),
    assert(getVar('fx-dna', '--tracking-eyebrow') === '0.32em', '--tracking-eyebrow = 0.32em'),
  ];
  render('dna-results', dnaTests);

  // ==========================================================================
  // 2-4 · Mode tokens
  // ==========================================================================
  const modes = {
    heritage: { bg: '#0F3D2E', text: '#EBE3D0', accent: '#A88B4A' },
    apothecary: { bg: '#07100C', text: '#EFE7D2', accent: '#C9A876' },
    botanique: { bg: '#F2ECDD', text: '#1F3D2E', accent: '#9C7C42' },
  };

  for (const [mode, expected] of Object.entries(modes)) {
    const fx = `fx-${mode}`;
    const tests = [
      assert(getVar(fx, '--bg-primary') === expected.bg, `${mode}: --bg-primary = ${expected.bg}`, getVar(fx, '--bg-primary') || 'undefined'),
      assert(getVar(fx, '--text-primary') === expected.text, `${mode}: --text-primary = ${expected.text}`, getVar(fx, '--text-primary') || 'undefined'),
      assert(getVar(fx, '--accent') === expected.accent, `${mode}: --accent = ${expected.accent}`, getVar(fx, '--accent') || 'undefined'),
      assert(getVar(fx, '--bg-lift'), `${mode}: --bg-lift definido`),
      assert(getVar(fx, '--bg-deep'), `${mode}: --bg-deep definido`),
      assert(getVar(fx, '--text-muted'), `${mode}: --text-muted definido`),
      assert(getVar(fx, '--accent-muted'), `${mode}: --accent-muted definido`),
      assert(getVar(fx, '--hairline'), `${mode}: --hairline definido`),
      assert(getVar(fx, '--logo-accent') === expected.accent, `${mode}: --logo-accent = ${expected.accent}`),
      assert(getVar(fx, '--logo-text') === expected.text, `${mode}: --logo-text = ${expected.text}`),
    ];
    render(`${mode}-results`, tests);
  }

  // ==========================================================================
  // 5 · Contraste WCAG
  // ==========================================================================
  const contrastTests = [];
  for (const [mode, expected] of Object.entries(modes)) {
    const fx = `fx-${mode}`;
    const bgVal = parseColor(getVar(fx, '--bg-primary'));
    const textVal = parseColor(getVar(fx, '--text-primary'));
    const mutedVal = parseColor(getVar(fx, '--text-muted'));

    if (bgVal && textVal) {
      const ratio = contrastRatio(textVal, bgVal);
      contrastTests.push(assert(
        ratio >= 7,
        `${mode}: text.primary / bg.primary ≥ 7:1 (AAA)`,
        `${ratio.toFixed(2)}:1`
      ));
    }

    if (bgVal && mutedVal) {
      const ratio = contrastRatio(mutedVal, bgVal);
      contrastTests.push(assert(
        ratio >= 4.5,
        `${mode}: text.muted / bg.primary ≥ 4.5:1 (AA)`,
        `${ratio.toFixed(2)}:1`
      ));
    }
  }
  render('contrast-results', contrastTests);

  // ==========================================================================
  // 6 · SVGs de logo
  // ==========================================================================
  const logoFiles = [
    'logo/lockup-vertical.svg',
    'logo/lockup-horizontal.svg',
    'logo/monogram.svg',
    'logo/monogram-seal.svg',
    'logo/favicon.svg',
  ];

  Promise.all(logoFiles.map(file =>
    fetch(file).then(r => ({ file, ok: r.ok, status: r.status }))
      .catch(err => ({ file, ok: false, status: 'fetch error' }))
  )).then(results_ => {
    const logoTests = results_.map(r => assert(
      r.ok,
      `${r.file} carrega (HTTP ${r.status})`,
      r.ok ? 'OK' : 'falha'
    ));
    render('logos-results', logoTests);

    // Summary final
    const total = results.pass + results.fail;
    const summary = document.getElementById('summary');
    summary.className = 'summary ' + (results.fail === 0 ? 'all-pass' : 'has-fail');
    summary.innerHTML = `<strong>${results.pass}</strong> pass · <strong>${results.fail}</strong> fail · ${total} total`;
  });
})();
```

- [ ] **Step 3: Abrir `identity/validate.html` no navegador via servidor local**

⚠️ Não abrir via `file://` — o `fetch()` para SVGs falha. Use:

```bash
# Opção A: Python 3 (já vem com Windows se Python instalado)
cd identity && python -m http.server 8080

# Opção B: Node (se instalado)
cd identity && npx serve -p 8080
```

Abrir: `http://localhost:8080/validate.html`

Expected output (NESTE PONTO):
- DNA tests: 12 pass
- Heritage tests: 10 pass
- Apothecary tests: 10 pass
- Botanique tests: 10 pass
- Contraste tests: 6 pass (3 modos × 2 combinações)
- SVG tests: 5 fail (SVGs ainda não criados — esperado neste ponto)
- Summary: ~48 pass, 5 fail

Os 5 fails de SVG vão virar pass conforme cada SVG é criado nas tarefas seguintes.

- [ ] **Step 4: Commit**

```bash
git add identity/validate.html identity/validate.js
git commit -m "feat(identity): test runner em browser para tokens, contraste e SVGs"
```

---

## Phase 3 — Logos (SVGs canônicos)

Cada SVG usa `currentColor` ou variáveis `--logo-accent` / `--logo-text` para que o mesmo arquivo seja re-tinto pelo modo do container pai. Fontes referenciadas (Italiana, Marcellus SC) devem estar carregadas no documento que renderiza o SVG via Google Fonts — o styleguide cuida disso.

### Task 4: `identity/logo/lockup-vertical.svg`

Lockup vertical canônico (ver Seção 3.1 do spec). 3 linhas: top "ESTABELECIDO · MMXXVI" entre filetes, "Desinflamação" centralizado em Italiana, "MÉTODO · PRO" entre filetes flanqueadores.

**Files:**
- Create: `identity/logo/lockup-vertical.svg`

- [ ] **Step 1: Criar arquivo com markup completo**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260" role="img" aria-label="Método Desinflamação Pro">
  <title>Método Desinflamação Pro · Lockup Vertical</title>
  <desc>Lockup vertical canônico. Cores controladas via CSS custom properties --logo-accent e --logo-text no container pai.</desc>
  <style>
    .accent { fill: var(--logo-accent, #A88B4A); stroke: var(--logo-accent, #A88B4A); }
    .text { fill: var(--logo-text, #1F3D2E); }
    .marcellus { font-family: 'Marcellus SC', serif; font-weight: 400; }
    .italiana { font-family: 'Italiana', serif; font-weight: 400; }
  </style>

  <!-- Top group: rule + ESTABELECIDO · MMXXVI -->
  <line class="accent" x1="270" y1="62" x2="330" y2="62" stroke-width="1" opacity="0.7"/>
  <text class="accent marcellus" x="300" y="86" text-anchor="middle" font-size="11" letter-spacing="5.5">ESTABELECIDO · MMXXVI</text>

  <!-- Wordmark: Desinflamação -->
  <text class="text italiana" x="300" y="170" text-anchor="middle" font-size="64" letter-spacing="0.96">Desinflamação</text>

  <!-- Pro group: filetes flanqueadores + MÉTODO · PRO -->
  <line class="accent" x1="130" y1="208" x2="190" y2="208" stroke-width="1" opacity="0.7"/>
  <line class="accent" x1="410" y1="208" x2="470" y2="208" stroke-width="1" opacity="0.7"/>
  <text class="text marcellus" x="300" y="213" text-anchor="middle" font-size="13" letter-spacing="6.5">MÉTODO · PRO</text>
</svg>
```

- [ ] **Step 2: Verificar via validate.html**

Atualizar a página em `http://localhost:8080/validate.html` (após colocar o SVG no diretório `identity/logo/`). O teste `logo/lockup-vertical.svg carrega` deve passar.

Expected: 1 dos 5 fails de SVG vira pass. Total = ~49 pass, 4 fail.

- [ ] **Step 3: Verificar visualmente no styleguide (vai ser implementado depois — pular esta verificação por agora; só confirmar que o arquivo é XML válido)**

Abrir `identity/logo/lockup-vertical.svg` direto no navegador via `http://localhost:8080/logo/lockup-vertical.svg`. Deve renderizar como wordmark vertical (cores podem vir os defaults `#A88B4A` / `#1F3D2E` se aberto fora de um container `[data-mode]`).

- [ ] **Step 4: Commit**

```bash
git add identity/logo/lockup-vertical.svg
git commit -m "feat(logo): lockup vertical canonico"
```

---

### Task 5: `identity/logo/lockup-horizontal.svg`

Variante horizontal compacta. Sem linha "ESTABELECIDO". Wordmark em uma linha com a tag "MÉTODO · PRO" pequena à direita após um filete vertical curto.

**Files:**
- Create: `identity/logo/lockup-horizontal.svg`

- [ ] **Step 1: Criar arquivo**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 90" role="img" aria-label="Método Desinflamação Pro">
  <title>Método Desinflamação Pro · Lockup Horizontal</title>
  <desc>Variante horizontal compacta para barras de navegação.</desc>
  <style>
    .accent { fill: var(--logo-accent, #A88B4A); stroke: var(--logo-accent, #A88B4A); }
    .text { fill: var(--logo-text, #1F3D2E); }
    .marcellus { font-family: 'Marcellus SC', serif; font-weight: 400; }
    .italiana { font-family: 'Italiana', serif; font-weight: 400; }
  </style>

  <!-- Wordmark à esquerda -->
  <text class="text italiana" x="20" y="60" font-size="48" letter-spacing="0.72">Desinflamação</text>

  <!-- Filete vertical curto separador -->
  <line class="accent" x1="540" y1="32" x2="540" y2="56" stroke-width="1" opacity="0.7"/>

  <!-- Tag MÉTODO · PRO à direita do filete -->
  <text class="text marcellus" x="558" y="50" font-size="11" letter-spacing="5.5">MÉTODO · PRO</text>
</svg>
```

- [ ] **Step 2: Validar via validate.html**

Refresh: `lockup-horizontal.svg carrega` passa. Total: ~50 pass, 3 fail.

- [ ] **Step 3: Commit**

```bash
git add identity/logo/lockup-horizontal.svg
git commit -m "feat(logo): lockup horizontal compacto para nav"
```

---

### Task 6: `identity/logo/monogram.svg`

M em Italiana dentro de moldura circular dupla. Diâmetro 110 (Seção 3.2 do spec).

**Files:**
- Create: `identity/logo/monogram.svg`

- [ ] **Step 1: Criar arquivo**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Método Desinflamação · Monograma">
  <title>Método Desinflamação · Monograma M</title>
  <desc>M em Italiana dentro de moldura dupla circular. Selo da marca.</desc>
  <style>
    .accent { fill: none; stroke: var(--logo-accent, #A88B4A); }
    .accent-text { fill: var(--logo-accent, #A88B4A); }
    .italiana { font-family: 'Italiana', serif; font-weight: 400; }
  </style>

  <!-- Círculo externo: diâmetro 110, centrado em 60,60. Raio 55, opacidade 0.5 -->
  <circle class="accent" cx="60" cy="60" r="55" stroke-width="1" opacity="0.5"/>

  <!-- Círculo interno: inset de 6, raio 49, opacidade 0.18 -->
  <circle class="accent" cx="60" cy="60" r="49" stroke-width="1" opacity="0.18"/>

  <!-- Letra M centralizada. Italiana font-size 56, baseline ajustada para centro óptico -->
  <text class="accent-text italiana" x="60" y="80" text-anchor="middle" font-size="56">M</text>
</svg>
```

- [ ] **Step 2: Validar via validate.html**

Refresh: `monogram.svg carrega` passa. Total: ~51 pass, 2 fail.

- [ ] **Step 3: Commit**

```bash
git add identity/logo/monogram.svg
git commit -m "feat(logo): monograma M em moldura circular dupla"
```

---

### Task 7: `identity/logo/monogram-seal.svg`

Monograma + linha "EST · MMXXVI" abaixo. Uso em avatares de redes sociais e selos de fim de capítulo.

**Files:**
- Create: `identity/logo/monogram-seal.svg`

- [ ] **Step 1: Criar arquivo**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" role="img" aria-label="Método Desinflamação · Selo">
  <title>Método Desinflamação · Selo (monograma + EST)</title>
  <desc>Monograma com linha EST · MMXXVI abaixo. Para avatar e selo decorativo.</desc>
  <style>
    .accent { fill: none; stroke: var(--logo-accent, #A88B4A); }
    .accent-text { fill: var(--logo-accent, #A88B4A); }
    .italiana { font-family: 'Italiana', serif; font-weight: 400; }
    .marcellus { font-family: 'Marcellus SC', serif; font-weight: 400; }
  </style>

  <!-- Monograma -->
  <circle class="accent" cx="80" cy="70" r="55" stroke-width="1" opacity="0.5"/>
  <circle class="accent" cx="80" cy="70" r="49" stroke-width="1" opacity="0.18"/>
  <text class="accent-text italiana" x="80" y="90" text-anchor="middle" font-size="56">M</text>

  <!-- Filete fino curto -->
  <line class="accent" x1="60" y1="148" x2="100" y2="148" stroke-width="1" opacity="0.7"/>

  <!-- EST · MMXXVI -->
  <text class="accent-text marcellus" x="80" y="168" text-anchor="middle" font-size="10" letter-spacing="5">EST · MMXXVI</text>
</svg>
```

- [ ] **Step 2: Validar via validate.html**

Refresh: `monogram-seal.svg carrega` passa. Total: ~52 pass, 1 fail.

- [ ] **Step 3: Commit**

```bash
git add identity/logo/monogram-seal.svg
git commit -m "feat(logo): selo monograma + EST · MMXXVI"
```

---

### Task 8: `identity/logo/favicon.svg`

Favicon 32×32. M dourado sólido sobre fundo emerald, círculo único (sem moldura dupla pra não virar borrão em tamanho pequeno). Hardcoded em paleta Heritage (não temáticavel — favicon é fixo no documento HTML).

**Files:**
- Create: `identity/logo/favicon.svg`

- [ ] **Step 1: Criar arquivo**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Método Desinflamação Pro">
  <title>Método Desinflamação Pro · Favicon</title>

  <!-- Fundo emerald -->
  <rect width="32" height="32" fill="#0F3D2E"/>

  <!-- Círculo dourado fino -->
  <circle cx="16" cy="16" r="12" fill="none" stroke="#A88B4A" stroke-width="1" opacity="0.6"/>

  <!-- M (Italiana via system fallback — favicon não carrega Google Fonts) -->
  <text x="16" y="22" text-anchor="middle" font-size="18" font-family="Georgia, 'Times New Roman', serif" font-style="italic" fill="#A88B4A">M</text>
</svg>
```

⚠️ Nota: favicon NÃO carrega Google Fonts (os browsers não puxam fontes pra favicons). Por isso usamos `Georgia` como fallback serif para o M. A diferença visual é mínima em 32×32.

- [ ] **Step 2: Validar via validate.html**

Refresh: `favicon.svg carrega` passa. Total: 53 pass, 0 fail. ✓

- [ ] **Step 3: Commit**

```bash
git add identity/logo/favicon.svg
git commit -m "feat(logo): favicon 32x32 em paleta Heritage hardcoded"
```

---

## Phase 4 — Styleguide

Página única `identity/styleguide.html` que demonstra o sistema completo numa visualização vertical contínua. Funciona como prova viva do sistema E como referência operacional pra qualquer subprojeto futuro.

### Task 9: Criar `identity/styleguide.html` (shell + Google Fonts + nav)

**Files:**
- Create: `identity/styleguide.html`

- [ ] **Step 1: Criar arquivo com shell base**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Styleguide · Identidade Bio-Premium · Método Desinflamação Pro</title>
  <link rel="icon" type="image/svg+xml" href="logo/favicon.svg">

  <!-- Google Fonts: Italiana, Cormorant Garamond, Marcellus SC, Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,300;1,400;1,500&family=Inter:wght@200;300;400;500;600&family=Italiana&family=Marcellus+SC&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="tokens.css">

  <style>
    *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: #0a0c0d;
      color: #d8d4c6;
      font-family: var(--font-body);
      font-weight: 300;
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
    }

    /* === Navegação fixa === */
    .nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      background: rgba(10,12,13,0.92);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(168,139,74,0.18);
      padding: 14px 32px;
      display: flex; justify-content: space-between; align-items: center;
      gap: 24px;
    }
    .nav .brand {
      font-family: var(--font-display);
      font-size: 18px; color: #ebe3d0; letter-spacing: 0.02em;
    }
    .nav ul { list-style: none; display: flex; gap: 22px; }
    .nav a {
      font-family: var(--font-marca); font-size: 10px;
      letter-spacing: 0.3em; color: #a88b4a;
      text-decoration: none; text-transform: none;
    }
    .nav a:hover { color: #ebe3d0; }

    /* === Section base === */
    section {
      padding: 96px 32px;
      min-height: 100vh;
    }
    section .container { max-width: 1200px; margin: 0 auto; }
    section .roman {
      font-family: var(--font-marca); font-size: 11px;
      letter-spacing: 0.32em; color: #a88b4a;
      margin-bottom: 14px;
    }
    section h2 {
      font-family: var(--font-display); font-weight: 400;
      font-size: 48px; line-height: 1.05; color: #ebe3d0;
      margin-bottom: 20px; letter-spacing: 0.005em;
    }
    section h2 em { font-family: var(--font-editorial); font-style: italic; color: #a88b4a; }
    section .lede {
      font-family: var(--font-editorial); font-style: italic;
      font-size: 18px; color: rgba(235,227,208,0.7);
      max-width: 640px; line-height: 1.65;
      margin-bottom: 56px;
    }

    /* Sections receberão estilos próprios nas tasks seguintes */
  </style>
</head>
<body>

  <nav class="nav">
    <span class="brand">Desinflamação · Sistema</span>
    <ul>
      <li><a href="#dna">I · DNA</a></li>
      <li><a href="#heritage">II · Heritage</a></li>
      <li><a href="#apothecary">III · Apothecary</a></li>
      <li><a href="#botanique">IV · Botanique</a></li>
      <li><a href="#components">V · Componentes</a></li>
    </ul>
  </nav>

  <section id="dna">
    <div class="container">
      <div class="roman">I · DNA da Marca</div>
      <h2>O que <em>nunca</em> muda.</h2>
      <p class="lede">Lockup, monograma, tipografia e núcleo da paleta. Esses elementos são imutáveis em qualquer modo, qualquer superfície, qualquer canal.</p>
      <!-- Conteúdo adicionado em Task 10 -->
    </div>
  </section>

  <section id="heritage">
    <div class="container">
      <div class="roman">II · Heritage</div>
      <h2>O modo <em>institucional.</em></h2>
      <p class="lede">A marca falando como joalheria suíça. Para áreas de marca, certificados, redes sociais oficiais, cabeçalho da área de membros.</p>
      <!-- Conteúdo adicionado em Task 11 -->
    </div>
  </section>

  <section id="apothecary">
    <div class="container">
      <div class="roman">III · Apothecary</div>
      <h2>O modo <em>conversor.</em></h2>
      <p class="lede">Imersão clínica que prende atenção em vídeo longo. VSL, página de vendas, upsell, checkout, anúncios.</p>
      <!-- Conteúdo adicionado em Task 12 -->
    </div>
  </section>

  <section id="botanique">
    <div class="container">
      <div class="roman">IV · Botanique</div>
      <h2>O modo <em>editorial.</em></h2>
      <p class="lede">A marca entregando o conteúdo. PDFs, e-mails transacionais, materiais escritos longos.</p>
      <!-- Conteúdo adicionado em Task 13 -->
    </div>
  </section>

  <section id="components">
    <div class="container">
      <div class="roman">V · Componentes</div>
      <h2>Os elementos <em>compartilhados.</em></h2>
      <p class="lede">Botões, hairlines, eyebrows, cards e formulários — em cada um dos três modos.</p>
      <!-- Conteúdo adicionado em Task 14 -->
    </div>
  </section>

</body>
</html>
```

- [ ] **Step 2: Verificar visualmente**

Abrir `http://localhost:8080/styleguide.html`.

Expected:
- Nav fixo no topo com 5 links
- 5 seções com título + lede, scrollable
- Tipografia Italiana visível nos títulos (esperar até Google Fonts carregar)
- Console do browser sem erros

- [ ] **Step 3: Commit**

```bash
git add identity/styleguide.html
git commit -m "feat(styleguide): shell + nav + 5 sections com headers"
```

---

### Task 10: Seção DNA (lockup, monograma, tipografia, paleta núcleo)

Adiciona conteúdo dentro de `<section id="dna">`. Mostra lockup vertical em tamanho real, monograma à direita, escala tipográfica completa, e os 3 swatches do núcleo.

**Files:**
- Modify: `identity/styleguide.html` (section `#dna` — conteúdo dentro de `.container`)
- Modify: `identity/styleguide.html` (`<style>` — adicionar regras `.dna-*`)

- [ ] **Step 1: Adicionar CSS para a seção dentro do `<style>` existente, antes do fechamento `</style>`**

```css
/* === Section: DNA === */
#dna .grid {
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px;
  margin-bottom: 56px;
}
@media (max-width: 900px) { #dna .grid { grid-template-columns: 1fr; } }

#dna .lockup-frame, #dna .monogram-frame {
  background: var(--core-emerald);
  padding: 56px 40px;
  border-radius: var(--radius-card);
  display: flex; align-items: center; justify-content: center;
  min-height: 320px;
  --logo-accent: var(--core-gold);
  --logo-text: var(--core-ivory);
}
#dna .lockup-frame svg { max-width: 480px; width: 100%; height: auto; }
#dna .monogram-frame svg { max-width: 200px; width: 100%; height: auto; }

#dna .frame-label {
  font-family: var(--font-marca); font-size: 10px;
  letter-spacing: 0.32em; color: #a88b4a;
  margin-bottom: 12px;
}

#dna .type-scale {
  border-top: 1px solid rgba(168,139,74,0.18);
  padding-top: 32px;
  margin-bottom: 56px;
}
#dna .type-row {
  display: grid; grid-template-columns: 140px 1fr;
  gap: 24px; align-items: baseline;
  padding: 14px 0; border-bottom: 1px solid rgba(168,139,74,0.08);
}
#dna .type-row:last-child { border-bottom: none; }
#dna .type-meta {
  font-family: var(--font-marca); font-size: 10px;
  letter-spacing: 0.28em; color: #a88b4a;
}
#dna .type-meta small { display: block; font-size: 8px; color: rgba(168,139,74,0.6); margin-top: 4px; }

#dna .palette-core {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}
@media (max-width: 700px) { #dna .palette-core { grid-template-columns: 1fr; } }
#dna .swatch {
  background: #11161a;
  border: 1px solid rgba(168,139,74,0.14);
  border-radius: var(--radius-card);
  padding: 24px;
}
#dna .swatch-chip {
  width: 100%; height: 120px; margin-bottom: 16px;
}
#dna .swatch-name {
  font-family: var(--font-editorial); font-style: italic;
  font-size: 18px; color: #ebe3d0; margin-bottom: 4px;
}
#dna .swatch-hex {
  font-family: var(--font-body); font-weight: 300;
  font-size: 12px; color: rgba(235,227,208,0.5);
  letter-spacing: 0.18em;
}
```

- [ ] **Step 2: Adicionar HTML dentro de `<section id="dna"><div class="container">` (depois do `<p class="lede">`)**

Substituir o comentário `<!-- Conteúdo adicionado em Task 10 -->` por:

```html
<div class="grid">
  <div>
    <div class="frame-label">Lockup Vertical · Marca-Mestra</div>
    <div class="lockup-frame">
      <object data="logo/lockup-vertical.svg" type="image/svg+xml" aria-label="Lockup vertical Método Desinflamação Pro"></object>
    </div>
  </div>
  <div>
    <div class="frame-label">Monograma · Selo</div>
    <div class="monogram-frame">
      <object data="logo/monogram.svg" type="image/svg+xml" aria-label="Monograma M"></object>
    </div>
  </div>
</div>

<div class="type-scale">
  <div class="frame-label" style="margin-bottom: 24px;">Sistema Tipográfico</div>

  <div class="type-row">
    <div class="type-meta">Display XL<small>Italiana · 64px</small></div>
    <div style="font-family: var(--font-display); font-size: 4rem; line-height: 1; color: #ebe3d0;">Desinflamação</div>
  </div>
  <div class="type-row">
    <div class="type-meta">Display M<small>Italiana · 36px</small></div>
    <div style="font-family: var(--font-display); font-size: 2.25rem; line-height: 1; color: #ebe3d0;">Renasça.</div>
  </div>
  <div class="type-row">
    <div class="type-meta">Editorial L<small>Cormorant ital · 22px</small></div>
    <div style="font-family: var(--font-editorial); font-style: italic; font-size: 1.375rem; color: #a88b4a;">A primeira semana de silêncio celular.</div>
  </div>
  <div class="type-row">
    <div class="type-meta">Eyebrow<small>Marcellus SC · 11px</small></div>
    <div style="font-family: var(--font-marca); font-size: 0.6875rem; letter-spacing: 0.32em; color: #a88b4a;">CAPÍTULO I · O MECANISMO</div>
  </div>
  <div class="type-row">
    <div class="type-meta">Body L<small>Inter Light · 17px</small></div>
    <div style="font-family: var(--font-body); font-weight: 300; font-size: 1.0625rem; color: rgba(235,227,208,0.85); max-width: 520px;">Reverter a inflamação celular crônica em 21 dias. Sem dietas restritivas. Sem fome. Apenas a biologia restaurada.</div>
  </div>
</div>

<div>
  <div class="frame-label" style="margin-bottom: 24px;">Núcleo da Paleta · presente em todos os modos</div>
  <div class="palette-core">
    <div class="swatch">
      <div class="swatch-chip" style="background: var(--core-emerald);"></div>
      <div class="swatch-name">Forest Emerald</div>
      <div class="swatch-hex">#0F3D2E</div>
    </div>
    <div class="swatch">
      <div class="swatch-chip" style="background: var(--core-gold);"></div>
      <div class="swatch-name">Old Gold</div>
      <div class="swatch-hex">#A88B4A</div>
    </div>
    <div class="swatch">
      <div class="swatch-chip" style="background: var(--core-ivory);"></div>
      <div class="swatch-name">Champagne Ivory</div>
      <div class="swatch-hex">#EBE3D0</div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verificar visualmente**

Refresh `http://localhost:8080/styleguide.html#dna`.

Expected:
- Lockup vertical visível em fundo emerald, ouro+ivory
- Monograma visível em fundo emerald, ouro
- 5 linhas de tipografia
- 3 swatches grandes lado a lado

⚠️ Conhecido: `<object>` para SVG com CSS variables tem limitações cross-origin. Se as cores não vierem corretas, alternativa: inline o SVG diretamente no HTML em vez de via `<object>`. Ver Task 11 onde fazemos inline.

- [ ] **Step 4: Commit**

```bash
git add identity/styleguide.html
git commit -m "feat(styleguide): seção DNA com lockup, monograma, tipografia e paleta nucleo"
```

---

### Task 11: Seção Heritage (modo institucional)

Aplica `data-mode="heritage"` num container e mostra um exemplo de card institucional.

**Files:**
- Modify: `identity/styleguide.html` (section `#heritage`)
- Modify: `identity/styleguide.html` (`<style>`)

- [ ] **Step 1: Adicionar CSS antes do fechamento `</style>`**

```css
/* === Section: Heritage === */
#heritage .stage {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 80px 56px;
  border-radius: var(--radius-card);
  position: relative;
  min-height: 480px;
}
#heritage .stage::before {
  content: ''; position: absolute;
  top: 24px; left: 24px; right: 24px; bottom: 24px;
  border: 1px solid var(--hairline);
  pointer-events: none;
}
#heritage .stage-inner { position: relative; z-index: 1; text-align: center; }
#heritage .lockup-svg {
  display: inline-block; margin-bottom: 56px;
}
#heritage .lockup-svg svg { width: 360px; height: auto; }
#heritage .tagline {
  font-family: var(--font-editorial); font-style: italic;
  font-size: 28px; color: var(--accent);
  line-height: 1.4; margin-bottom: 56px;
}
#heritage .tagline strong {
  font-family: var(--font-display); font-style: normal; font-weight: 400;
  color: var(--text-primary);
}
#heritage .stage-footer {
  display: flex; justify-content: space-between;
  font-family: var(--font-marca); font-size: 11px;
  letter-spacing: 0.32em; color: var(--accent-muted);
  padding-top: 56px;
  border-top: 1px solid var(--hairline);
}

#heritage .palette-mode {
  margin-top: 32px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
}
#heritage .palette-mode .chip {
  height: 80px; border-radius: 2px;
  display: flex; align-items: flex-end; padding: 8px;
  font-family: var(--font-body); font-size: 10px; font-weight: 300;
  letter-spacing: 0.1em;
}
```

- [ ] **Step 2: Substituir o comentário em `#heritage` por:**

```html
<div class="stage" data-mode="heritage">
  <div class="stage-inner">
    <div class="lockup-svg">
      <!-- Inline para suportar CSS variables através de [data-mode] do pai -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260">
        <style>.a { fill: var(--logo-accent); stroke: var(--logo-accent); } .t { fill: var(--logo-text); }</style>
        <line class="a" x1="270" y1="62" x2="330" y2="62" stroke-width="1" opacity="0.7"/>
        <text class="a" x="300" y="86" text-anchor="middle" font-size="11" font-family="Marcellus SC, serif" letter-spacing="5.5">ESTABELECIDO · MMXXVI</text>
        <text class="t" x="300" y="170" text-anchor="middle" font-size="64" font-family="Italiana, serif" letter-spacing="0.96">Desinflamação</text>
        <line class="a" x1="130" y1="208" x2="190" y2="208" stroke-width="1" opacity="0.7"/>
        <line class="a" x1="410" y1="208" x2="470" y2="208" stroke-width="1" opacity="0.7"/>
        <text class="t" x="300" y="213" text-anchor="middle" font-size="13" font-family="Marcellus SC, serif" letter-spacing="6.5">MÉTODO · PRO</text>
      </svg>
    </div>
    <div class="tagline">
      <strong>Desinflame.</strong><br>Renasça.<br><strong>Reine.</strong>
    </div>
    <div class="stage-footer">
      <span>Protocolo Anti-Inflamatório</span>
      <span>21 Dias</span>
    </div>
  </div>
</div>

<div class="palette-mode">
  <div class="chip" style="background: #0F3D2E; color: #EBE3D0;">bg.primary · #0F3D2E</div>
  <div class="chip" style="background: #163F31; color: #EBE3D0;">bg.lift · #163F31</div>
  <div class="chip" style="background: #A88B4A; color: #0F3D2E;">accent · #A88B4A</div>
  <div class="chip" style="background: #EBE3D0; color: #0F3D2E;">text · #EBE3D0</div>
</div>
```

- [ ] **Step 3: Verificar visualmente**

Refresh `http://localhost:8080/styleguide.html#heritage`.

Expected:
- Card grande emerald com moldura interna fina dourada
- Lockup centralizado com cores corretas (ouro + ivory)
- Tagline "Desinflame. / Renasça. / Reine." em italic dourado + display ivory
- Footer com 2 itens em small caps dourado
- 4 chips de paleta abaixo

- [ ] **Step 4: Commit**

```bash
git add identity/styleguide.html
git commit -m "feat(styleguide): seção Heritage com card institucional inline"
```

---

### Task 12: Seção Apothecary (modo VSL/vendas)

Mostra um mockup de hero de página de vendas em modo Apothecary, com player de VSL e nota do lock dos 4 minutos.

**Files:**
- Modify: `identity/styleguide.html`

- [ ] **Step 1: Adicionar CSS antes do fechamento `</style>`**

```css
/* === Section: Apothecary === */
#apothecary .stage {
  background: linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-primary) 100%);
  color: var(--text-primary);
  padding: 48px 56px 56px;
  border-radius: var(--radius-card);
  min-height: 580px;
}
#apothecary .top-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--hairline);
  margin-bottom: 48px;
}
#apothecary .mini-lockup {
  display: flex; align-items: center; gap: 16px;
}
#apothecary .mini-lockup svg { height: 32px; width: auto; }
#apothecary .nav-meta {
  font-family: var(--font-marca); font-size: 10px;
  letter-spacing: 0.32em; color: var(--accent);
}
#apothecary .eyebrow-vsl {
  font-family: var(--font-marca); font-size: 11px;
  letter-spacing: 0.32em; color: var(--accent);
  margin-bottom: 18px;
}
#apothecary .h1-vsl {
  font-family: var(--font-display); font-weight: 400;
  font-size: 56px; line-height: 1.05;
  margin-bottom: 20px; letter-spacing: 0.005em;
}
#apothecary .h1-vsl em {
  font-family: var(--font-editorial); font-style: italic;
  color: var(--accent);
}
#apothecary .lede-vsl {
  font-family: var(--font-editorial); font-style: italic;
  font-size: 20px; line-height: 1.6;
  color: var(--text-muted); margin-bottom: 36px; max-width: 600px;
}
#apothecary .video-frame {
  background: rgba(201,168,118,0.04);
  border: 1px solid var(--accent-muted);
  aspect-ratio: 16/9;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px;
}
#apothecary .play-circle {
  width: 72px; height: 72px; border-radius: 50%;
  border: 1px solid var(--accent);
  display: flex; align-items: center; justify-content: center;
}
#apothecary .play-circle::after {
  content: ''; width: 0; height: 0;
  border-left: 16px solid var(--accent);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  margin-left: 6px;
}
#apothecary .video-meta {
  font-family: var(--font-marca); font-size: 9px;
  letter-spacing: 0.4em; color: var(--accent-muted);
}
#apothecary .lock-note {
  margin-top: 22px; text-align: center;
  font-family: var(--font-editorial); font-style: italic;
  font-size: 13px; color: var(--accent-muted);
}
#apothecary .palette-mode { margin-top: 32px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
#apothecary .palette-mode .chip { height: 80px; border-radius: 2px; display: flex; align-items: flex-end; padding: 8px; font-family: var(--font-body); font-size: 10px; font-weight: 300; letter-spacing: 0.1em; }
```

- [ ] **Step 2: Substituir o comentário em `#apothecary` por:**

```html
<div class="stage" data-mode="apothecary">
  <div class="top-bar">
    <div class="mini-lockup">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="13" fill="none" stroke="var(--logo-accent)" stroke-width="1" opacity="0.6"/>
        <text x="16" y="22" text-anchor="middle" font-size="18" font-family="Italiana, serif" fill="var(--logo-accent)">M</text>
      </svg>
      <span style="font-family: var(--font-display); font-size: 18px; color: var(--logo-text); letter-spacing: 0.02em;">Desinflamação</span>
    </div>
    <span class="nav-meta">CAP · I · O MECANISMO</span>
  </div>

  <div class="eyebrow-vsl">PARA QUEM CANSOU DE DIETAS</div>
  <h1 class="h1-vsl">Desligue a inflamação.<br><em>O peso cai sozinho.</em></h1>
  <p class="lede-vsl">A ciência por trás do incêndio invisível que está bloqueando o seu emagrecimento — e o protocolo de 21 dias para apagá-lo.</p>

  <div class="video-frame">
    <div class="play-circle"></div>
    <div class="video-meta">VSL · 06:00 · ÁUDIO RECOMENDADO</div>
  </div>
  <div class="lock-note">— O acesso ao Método é revelado aos 4 minutos do vídeo —</div>
</div>

<div class="palette-mode">
  <div class="chip" style="background: #07100C; color: #EFE7D2;">bg.primary · #07100C</div>
  <div class="chip" style="background: #0A1410; color: #EFE7D2;">bg.lift · #0A1410</div>
  <div class="chip" style="background: #C9A876; color: #07100C;">accent · #C9A876</div>
  <div class="chip" style="background: #EFE7D2; color: #07100C;">text · #EFE7D2</div>
</div>
```

- [ ] **Step 3: Verificar visualmente**

Refresh `http://localhost:8080/styleguide.html#apothecary`.

Expected:
- Card carbon-black com gradiente sutil
- Top-bar com mini-monograma + wordmark + label de capítulo dourado
- Eyebrow + headline (Italiana + Cormorant italic) + lede em italic
- Video frame com play-circle dourado e label "VSL · 06:00"
- Nota do lock abaixo, italic, opacidade reduzida
- 4 chips de paleta

- [ ] **Step 4: Commit**

```bash
git add identity/styleguide.html
git commit -m "feat(styleguide): seção Apothecary com hero VSL e lock note"
```

---

### Task 13: Seção Botanique (modo PDF/editorial)

Simula uma página de PDF (capítulo III, Desafio 6 Dias) em fundo parchment, com numerais romanos grandes e corpo em duas colunas.

**Files:**
- Modify: `identity/styleguide.html`

- [ ] **Step 1: Adicionar CSS antes do fechamento `</style>`**

```css
/* === Section: Botanique === */
#botanique .stage {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 56px 64px;
  border-radius: var(--radius-card);
  min-height: 600px;
}
#botanique .pdf-header {
  display: flex; justify-content: space-between; align-items: baseline;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--hairline);
  margin-bottom: 40px;
}
#botanique .pdf-header .left {
  font-family: var(--font-display); font-size: 22px;
  letter-spacing: 0.02em; color: var(--text-primary);
}
#botanique .pdf-header .right {
  font-family: var(--font-marca); font-size: 9px;
  letter-spacing: 0.4em; color: var(--accent);
}
#botanique .chapter-num {
  font-family: var(--font-editorial); font-style: italic;
  font-size: 88px; color: var(--accent);
  line-height: 1; margin-bottom: 8px;
}
#botanique .chapter-label {
  font-family: var(--font-marca); font-size: 10px;
  letter-spacing: 0.42em; color: var(--text-primary);
  margin-bottom: 24px;
}
#botanique .h1-pdf {
  font-family: var(--font-display); font-weight: 400;
  font-size: 44px; line-height: 1.1; margin-bottom: 24px;
  color: var(--text-primary);
}
#botanique .h1-pdf em {
  font-family: var(--font-editorial); font-style: italic;
  color: var(--accent); font-weight: 400;
}
#botanique .lede-pdf {
  font-family: var(--font-editorial); font-style: italic;
  font-size: 18px; line-height: 1.6;
  color: var(--text-primary); margin-bottom: 32px;
  padding-left: 18px; border-left: 2px solid var(--accent);
}
#botanique .body-pdf {
  font-family: var(--font-body); font-weight: 300;
  font-size: 14px; line-height: 1.7;
  color: var(--text-muted);
  column-count: 2; column-gap: 32px; margin-bottom: 40px;
}
#botanique .body-pdf p { margin-bottom: 12px; }
#botanique .body-pdf strong { font-weight: 500; color: var(--text-primary); }
#botanique .pdf-footer {
  padding-top: 18px;
  border-top: 1px solid var(--hairline);
  display: flex; justify-content: space-between;
  font-family: var(--font-marca); font-size: 9px;
  letter-spacing: 0.4em; color: var(--accent);
}
#botanique .palette-mode { margin-top: 32px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
#botanique .palette-mode .chip { height: 80px; border-radius: 2px; display: flex; align-items: flex-end; padding: 8px; font-family: var(--font-body); font-size: 10px; font-weight: 300; letter-spacing: 0.1em; }
```

- [ ] **Step 2: Substituir o comentário em `#botanique` por:**

```html
<div class="stage" data-mode="botanique">
  <div class="pdf-header">
    <span class="left">Desinflamação · Pro</span>
    <span class="right">CAPÍTULO III · PÁGINA 14</span>
  </div>

  <div class="chapter-num">III</div>
  <div class="chapter-label">O DESAFIO DOS SEIS DIAS</div>

  <h2 class="h1-pdf">A primeira semana<br><em>de silêncio celular.</em></h2>

  <p class="lede-pdf">Antes de cortar qualquer coisa, vamos adicionar. A regra de ouro do reset começa pelo que entra — não pelo que sai.</p>

  <div class="body-pdf">
    <p>O corpo inflamado vive em <strong>alerta vermelho</strong>. Cada refeição é interpretada como uma ameaça, e o estoque de gordura se torna um mecanismo de defesa, não um excesso de calorias. Esse é o ponto que dietas tradicionais ignoram: o problema raramente é matemático.</p>
    <p>Por isso o protocolo começa com <strong>seis dias de adição</strong> — três compostos bioativos por dia, todos da feira, todos baratos. Açafrão, gengibre, folhas verdes amargas. A inflamação cessa antes que a mente perceba.</p>
    <p>No dia sete, sem cortar, sem contar, sem fome — o ponteiro da balança começa a se mover. Não é mágica. É biologia restaurada.</p>
    <p>Lembre: a urgência aqui não é emagrecer. É <strong>desligar o incêndio</strong>. O peso cai como consequência.</p>
  </div>

  <div class="pdf-footer">
    <span>MÉTODO DESINFLAMAÇÃO · PRO</span>
    <span>RESET · DIA · 6</span>
  </div>
</div>

<div class="palette-mode">
  <div class="chip" style="background: #F2ECDD; color: #1F3D2E;">bg.primary · #F2ECDD</div>
  <div class="chip" style="background: #E8DFC8; color: #1F3D2E;">bg.lift · #E8DFC8</div>
  <div class="chip" style="background: #9C7C42; color: #F2ECDD;">accent · #9C7C42</div>
  <div class="chip" style="background: #1F3D2E; color: #F2ECDD;">text · #1F3D2E</div>
</div>
```

- [ ] **Step 3: Verificar visualmente**

Refresh `http://localhost:8080/styleguide.html#botanique`.

Expected:
- Card parchment com header e footer estilo livro
- Numeral III gigante em italic dourado
- Headline em verde tinta + parte italic em brass
- Lede com filete vertical brass à esquerda
- Corpo em duas colunas, justificado
- 4 chips de paleta

- [ ] **Step 4: Commit**

```bash
git add identity/styleguide.html
git commit -m "feat(styleguide): seção Botanique com PDF spread em 2 colunas"
```

---

### Task 14: Seção Componentes (botões, hairlines, eyebrows × 3 modos)

Mostra os componentes primitivos da Seção 5 do spec aplicados nos 3 modos lado a lado: botão primário, botão ghost, hairlines, eyebrow+headline+lede block, formulário simples.

**Files:**
- Modify: `identity/styleguide.html`

- [ ] **Step 1: Adicionar CSS antes do fechamento `</style>`**

```css
/* === Section: Components === */
#components .modes-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}
@media (max-width: 1100px) { #components .modes-grid { grid-template-columns: 1fr; } }
#components .mode-card {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 36px 32px;
  border-radius: var(--radius-card);
  display: flex; flex-direction: column; gap: 32px;
}
#components .mode-card .label {
  font-family: var(--font-marca); font-size: 10px;
  letter-spacing: 0.32em; color: var(--accent);
  padding-bottom: 14px;
  border-bottom: 1px solid var(--hairline);
}

/* Botão primário */
.btn-primary {
  display: inline-block; padding: 18px 48px;
  background: var(--accent); color: var(--bg-primary);
  font-family: var(--font-marca); font-size: 12px;
  letter-spacing: 0.32em; text-decoration: none;
  border: none; border-radius: var(--radius-button);
  cursor: pointer; transition: filter 0.2s;
}
.btn-primary:hover { filter: brightness(1.05); }

/* Botão ghost */
.btn-ghost {
  display: inline-block; padding: 18px 48px;
  background: transparent; color: var(--accent);
  font-family: var(--font-marca); font-size: 12px;
  letter-spacing: 0.32em; text-decoration: none;
  border: 1px solid var(--accent-muted);
  border-radius: var(--radius-button);
  cursor: pointer; transition: border-color 0.2s, background 0.2s;
}
.btn-ghost:hover {
  border-color: var(--accent);
  background: rgba(168,139,74,0.04);
}

/* Bloco eyebrow + headline + lede */
.demo-block .eyebrow {
  font-family: var(--font-marca); font-size: 11px;
  letter-spacing: 0.32em; color: var(--accent);
  margin-bottom: 14px;
}
.demo-block h3 {
  font-family: var(--font-display); font-weight: 400;
  font-size: 28px; line-height: 1.05; color: var(--text-primary);
  margin-bottom: 18px;
}
.demo-block .demo-lede {
  font-family: var(--font-editorial); font-style: italic;
  font-size: 16px; line-height: 1.6; color: var(--text-muted);
}

/* Hairlines */
.hairline-1 { height: 1px; background: var(--hairline); }
.hairline-2 { height: 1px; background: linear-gradient(90deg, transparent, var(--accent-muted), transparent); }
.hairline-label {
  display: flex; align-items: center; gap: 14px;
}
.hairline-label::before, .hairline-label::after {
  content: ''; flex: 1; height: 1px; background: var(--hairline);
}
.hairline-label span {
  font-family: var(--font-marca); font-size: 9px;
  letter-spacing: 0.32em; color: var(--accent);
}

/* Form input */
.demo-form { display: flex; flex-direction: column; gap: 8px; }
.demo-form label {
  font-family: var(--font-marca); font-size: 10px;
  letter-spacing: 0.32em; color: var(--accent);
}
.demo-form input {
  background: transparent; border: none;
  border-bottom: 1px solid var(--accent-muted);
  padding: 12px 0;
  font-family: var(--font-body); font-size: 16px; font-weight: 400;
  color: var(--text-primary);
  outline: none; transition: border-bottom 0.2s;
}
.demo-form input:focus { border-bottom: 2px solid var(--accent); }
.demo-form input::placeholder { color: var(--text-muted); font-weight: 300; font-style: italic; }
```

- [ ] **Step 2: Substituir o comentário em `#components` por:**

```html
<div class="modes-grid">

  <div class="mode-card" data-mode="heritage">
    <div class="label">I · HERITAGE</div>

    <div>
      <div style="font-family: var(--font-marca); font-size: 9px; letter-spacing: 0.32em; color: var(--accent); margin-bottom: 12px;">BOTÕES</div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button class="btn-primary">ACESSAR O MÉTODO</button>
        <button class="btn-ghost">SABER MAIS</button>
      </div>
    </div>

    <div class="demo-block">
      <div class="eyebrow">CAPÍTULO I</div>
      <h3>O Mecanismo.</h3>
      <p class="demo-lede">A inflamação celular não é sintoma — é a causa raiz que dietas tradicionais nunca tocam.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="font-family: var(--font-marca); font-size: 9px; letter-spacing: 0.32em; color: var(--accent); margin-bottom: 4px;">HAIRLINES</div>
      <div class="hairline-1"></div>
      <div class="hairline-2"></div>
      <div class="hairline-label"><span>SEÇÃO</span></div>
    </div>

    <div class="demo-form">
      <label for="heritage-email">SEU MELHOR E-MAIL</label>
      <input id="heritage-email" type="email" placeholder="nome@dominio.com">
    </div>
  </div>

  <div class="mode-card" data-mode="apothecary">
    <div class="label">II · APOTHECARY</div>

    <div>
      <div style="font-family: var(--font-marca); font-size: 9px; letter-spacing: 0.32em; color: var(--accent); margin-bottom: 12px;">BOTÕES</div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button class="btn-primary">QUERO O MÉTODO</button>
        <button class="btn-ghost">CONTINUAR ASSISTINDO</button>
      </div>
    </div>

    <div class="demo-block">
      <div class="eyebrow">PARA QUEM CANSOU</div>
      <h3>O incêndio invisível.</h3>
      <p class="demo-lede">Você não está engordando. Está em alerta. Aprenda a desligar o switch que o seu corpo trava.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="font-family: var(--font-marca); font-size: 9px; letter-spacing: 0.32em; color: var(--accent); margin-bottom: 4px;">HAIRLINES</div>
      <div class="hairline-1"></div>
      <div class="hairline-2"></div>
      <div class="hairline-label"><span>SEÇÃO</span></div>
    </div>

    <div class="demo-form">
      <label for="apothecary-email">SEU MELHOR E-MAIL</label>
      <input id="apothecary-email" type="email" placeholder="nome@dominio.com">
    </div>
  </div>

  <div class="mode-card" data-mode="botanique">
    <div class="label">III · BOTANIQUE</div>

    <div>
      <div style="font-family: var(--font-marca); font-size: 9px; letter-spacing: 0.32em; color: var(--accent); margin-bottom: 12px;">BOTÕES</div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button class="btn-primary">BAIXAR O GUIA</button>
        <button class="btn-ghost">VER ÍNDICE</button>
      </div>
    </div>

    <div class="demo-block">
      <div class="eyebrow">CAPÍTULO III</div>
      <h3>Desafio dos Seis Dias.</h3>
      <p class="demo-lede">Três compostos por dia. Da feira. Sem cortar nada. A balança se move sozinha no sétimo dia.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="font-family: var(--font-marca); font-size: 9px; letter-spacing: 0.32em; color: var(--accent); margin-bottom: 4px;">HAIRLINES</div>
      <div class="hairline-1"></div>
      <div class="hairline-2"></div>
      <div class="hairline-label"><span>SEÇÃO</span></div>
    </div>

    <div class="demo-form">
      <label for="botanique-email">SEU MELHOR E-MAIL</label>
      <input id="botanique-email" type="email" placeholder="nome@dominio.com">
    </div>
  </div>

</div>
```

- [ ] **Step 3: Verificar visualmente**

Refresh `http://localhost:8080/styleguide.html#components`.

Expected:
- 3 cards lado a lado, cada um em um modo
- Em cada card: label, 2 botões (primary + ghost), bloco eyebrow+headline+lede, 3 hairlines, formulário com input + label
- Cores corretas em cada modo
- Hover dos botões: primary muda brilho, ghost muda border + background

- [ ] **Step 4: Commit**

```bash
git add identity/styleguide.html
git commit -m "feat(styleguide): seção Componentes com botoes, hairlines, blocos e form nos 3 modos"
```

---

## Phase 5 — Verificação final

### Task 15: Verificação cross-browser + tagging

**Files:**
- (sem mudanças de código — só verificação)

- [ ] **Step 1: Abrir `validate.html` e confirmar zero falhas**

URL: `http://localhost:8080/validate.html`

Expected: Summary mostra "53 pass · 0 fail · 53 total" com fundo verde.

Se houver falhas, parar e diagnosticar antes de continuar.

- [ ] **Step 2: Percorrer `styleguide.html` por inteiro e checar visualmente**

URL: `http://localhost:8080/styleguide.html`

Checklist visual:
- [ ] Nav fixo no topo, links funcionando (clicar e ir para a seção)
- [ ] Seção DNA: lockup vertical, monograma, 5 linhas de tipografia, 3 swatches
- [ ] Seção Heritage: card emerald com moldura, lockup centralizado em ouro+ivory, tagline 3 linhas, 4 chips
- [ ] Seção Apothecary: card carbon, mini-lockup, hero com VSL frame e play-circle, lock note italic, 4 chips
- [ ] Seção Botanique: card parchment, numeral III italic gigante, body 2 colunas, header/footer livro, 4 chips
- [ ] Seção Componentes: 3 cards lado a lado (em desktop), cada um com botões, bloco, hairlines, form

- [ ] **Step 3: Testar em segundo navegador**

Abrir `http://localhost:8080/styleguide.html` em pelo menos 2 browsers (Chrome + Edge ou Chrome + Firefox).

Expected: visualmente equivalente. Pequenas diferenças de fonte rendering são aceitáveis. Erros de layout (elementos quebrando) NÃO são.

- [ ] **Step 4: Testar redimensionamento (responsividade)**

Reduzir a janela do browser para ~700px de largura.

Expected:
- Grids viram coluna única (DNA, Componentes)
- Texto continua legível
- Logos não vazam do container

- [ ] **Step 5: Tag de release no git**

```bash
git tag -a v0.1.0-identity -m "Identidade Bio-Premium · v0.1.0 · sistema canonico (tokens + 5 logos + styleguide + validate)"
git log --oneline -20
```

Expected: histórico mostra todos os 14 commits anteriores + tag v0.1.0-identity aplicado no HEAD.

- [ ] **Step 6: Confirmar entregáveis canônicos**

Listar arquivos finais:

```bash
ls identity/
ls identity/logo/
```

Expected:
- `identity/tokens.css` — fonte de verdade
- `identity/styleguide.html` — demonstração completa
- `identity/validate.html` + `identity/validate.js` — proof
- `identity/logo/lockup-vertical.svg`
- `identity/logo/lockup-horizontal.svg`
- `identity/logo/monogram.svg`
- `identity/logo/monogram-seal.svg`
- `identity/logo/favicon.svg`

---

## Spec Coverage (self-review)

Cobertura do spec por tarefa:

| Spec section | Implementado em |
|---|---|
| §1 Posicionamento | Implícito no styleguide (mood reflete o spec) |
| §2 Arquitetura 1-marca-3-modos | Tasks 2, 11-13 (data-mode em 3 superfícies) |
| §3.1 Lockup-mestre | Task 4 (vertical) + Task 5 (horizontal) |
| §3.2 Monograma | Task 6 + Task 7 (selo) + Task 8 (favicon) |
| §3.3 Tipografia + escala | Task 2 (tokens) + Task 10 (demonstração) |
| §3.4 Núcleo da paleta | Task 2 + Task 10 |
| §4.1 Heritage mode | Task 2 (tokens) + Task 11 (demo) |
| §4.2 Apothecary mode | Task 2 + Task 12 |
| §4.3 Botanique mode | Task 2 + Task 13 |
| §5 Componentes (botão, hairline, eyebrow, form) | Task 14 |
| §5.7 Card | Implícito em todos os `.stage` (Tasks 11-13) |
| §6 Fotografia / iconografia | NÃO implementado neste plano (seção de orientação no spec, não exige código). Será aplicado nos subprojetos do funil. |
| §7 Voz e tom | Demonstrado nos textos do styleguide (Tasks 11-14) |
| §8 Mapa modo×superfície | NÃO codificado — é guia operacional pra subprojetos futuros |
| §9 Tokens CSS | Task 2 |
| §10 Acessibilidade | Task 3 (testes de contraste WCAG) |
| §11 Estados de erro/sucesso | NÃO implementado — entrará em subprojeto de componentes interativos (formulários reais) |
| §12 Fora de escopo | Honrado |

---

## Próximos subprojetos (após este plano)

Depois que este sistema visual estiver canonicalizado, os próximos specs/plans entram em ordem definida pelo usuário:

1. **Página de vendas (HTML/CSS) em modo Apothecary** — landing com VSL embutida e lock de botão aos 4 minutos
2. **Página de upsell** — vídeo curto + 2 botões (sim verde / não cinza)
3. **Templates de PDF em modo Botanique** — Guia de Compras, Planner 6 Dias, Receitas
4. **Roteiro completo da VSL** — 6-8 minutos
5. **Estruturação do currículo** — 5 módulos × 26 aulas
6. **Configuração da plataforma de membros** — Kiwify/Hotmart/Eduzz
