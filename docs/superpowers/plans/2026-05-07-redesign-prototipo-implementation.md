# Redesign Protótipo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adotar o protótipo em `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/` como base canonical do sistema visual. Substituir `identity/tokens.css`, refazer `landing/` e `upsell/`, criar 3 novas surfaces (`checkout/`, `members/`, `validacao/`), regerar imagens hero com prompts mais ambiciosos, mudar paradigma das thumbnails de bônus pra pattern CSS abstrato.

**Architecture:** Static HTML/CSS/JS, sem build, sem framework. 4 modos de tokens (Apothecary Noir / Heritage / Botanique LIGHT / Botanique PRINT). Iluminação cinematográfica em 2 camadas (body::before + body::after) em todas as surfaces dark. Mobile-first estrutural com 480px max-width default. Brand mark composto (folha estilizada + losango heráldico). Player simulado com persistência localStorage.

**Tech Stack:** HTML5, CSS3 (custom properties, multi-stop gradients, keyframe animations), Vanilla JS, Google Fonts (Italiana + Cormorant Garamond + Marcellus SC + Inter), Nano Banana 2 (Gemini 3.1 Flash) para imagens fotográficas.

**Spec de referência:** `docs/superpowers/specs/2026-05-07-redesign-prototipo-design.md`

**Protótipo origem:** `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/`

---

## File Structure

```
identity/
├── tokens.css                         # ← SUBSTITUIR pela versão do protótipo (6 níveis de cor)
├── styleguide.html                    # mantém (atualizar se quebrar)
├── validate.html, validate.js         # mantém
└── logo/
    ├── brand-mark.svg                 # ← NOVO (SVG composto folha+losango)
    ├── seal-7-dias.svg                # ← NOVO (SVG selo "7 DIAS")
    ├── lockup-vertical.svg            # mantém (atualizar tokens de cor se preciso)
    ├── lockup-horizontal.svg          # mantém
    ├── monogram.svg                   # ← REMOVER (substituído por brand-mark.svg)
    ├── monogram-seal.svg              # ← REMOVER (substituído por seal-7-dias.svg)
    └── favicon.svg                    # mantém

landing/
├── index.html                         # ← SUBSTITUIR pela versão do protótipo (adaptada)
├── style.css                          # ← SUBSTITUIR (extraído do <style> do prototótipo)
├── reveal.js                          # ← SUBSTITUIR (lógica simulada do protótipo)
├── content.js                         # ← AJUSTAR copy + nomes de módulos
├── tracking.js                        # mantém
└── assets/
    ├── poster.jpg                     # ← REGERAR via nano-banana2
    ├── og-image.jpg                   # ← REGERAR via nano-banana2
    ├── pdf-guia.jpg                   # ← REMOVER (substituído por pattern CSS)
    ├── pdf-planner.jpg                # ← REMOVER
    └── pdf-receitas.jpg               # ← REMOVER

upsell/
├── index.html                         # ← SUBSTITUIR
├── style.css                          # ← SUBSTITUIR
├── reveal.js                          # ← SUBSTITUIR (com REVEAL_AT=90)
├── content.js                         # ← AJUSTAR
└── assets/
    └── poster.jpg                     # ← REGERAR

checkout/                              # ← NOVO
├── index.html
└── style.css

members/                               # ← NOVO
├── index.html
└── style.css

validacao/                             # ← NOVO
├── index.html
└── style.css

pdfs/                                  # mantém (Botanique PRINT já funciona)

docs/
├── curriculo-metodo-desinflamacao.md  # ← AJUSTAR nomes dos 5 módulos
└── checklist-kiwify-hotmart.md        # ← AJUSTAR placeholders se afetar
```

Total: 20 tasks distribuídas em 5 fases. Estimativa: ~3-4h em wall-clock se inline (5 imagens via nano-banana2 podem rodar em paralelo).

---

## Phase 1 — Foundation (tokens + brand assets)

### Task 1: Substituir `identity/tokens.css` pela versão rica do protótipo

**Files:**
- Modify: `identity/tokens.css` (substituição completa)

- [ ] **Step 1: Substituir conteúdo do `identity/tokens.css`** pelo conteúdo de `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/shared/tokens.css`, com 1 ajuste — manter o `@import url(...)` no topo (Google Fonts).

Verificar que o arquivo final tem:
- `:root` com 6 níveis emerald (900-400), 6 níveis gold (900-200), 2 champagne, 3 parchment, 6 carbon, 5 ink (incluindo light), 4 line variants
- 4 famílias de fonte (--ff-display, --ff-editorial, --ff-smallcaps, --ff-body)
- 7 níveis de espaçamento (xs até 3xl)
- 2 easings (--ease-elegant, --ease-dramatic)
- Reset `* { box-sizing: border-box; margin: 0; padding: 0; }`
- 6 motifs reutilizáveis: `.gold-rule`, `.heraldic-mark`, `.smallcaps`, `.italic-editorial`, `.brand-wordmark`, `.tex-grain-dark`, `.tex-grain-light`

- [ ] **Step 2: Verificar**

```bash
wc -l identity/tokens.css
grep -c "^  --" identity/tokens.css  # contar variáveis CSS
```

Esperado: ~140 linhas, ~50+ variáveis CSS.

- [ ] **Step 3: Commit**

```bash
git add identity/tokens.css
git commit -m "feat(identity): substituir tokens.css pelo sistema rico do prototipo (6 niveis de cor, 4 modos, motifs reutilizaveis)"
```

---

### Task 2: Criar novos SVGs canônicos (brand-mark + seal-7-dias) e remover os antigos

**Files:**
- Create: `identity/logo/brand-mark.svg`
- Create: `identity/logo/seal-7-dias.svg`
- Delete: `identity/logo/monogram.svg`
- Delete: `identity/logo/monogram-seal.svg`

- [ ] **Step 1: Criar `identity/logo/brand-mark.svg`**

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none" role="img" aria-label="Método Desinflamação Pro · Marca">
  <title>Método Desinflamação Pro</title>
  <desc>SVG composto: 2 círculos concêntricos, folha estilizada bezier, linha vertical central, losango heráldico. Cor controlada via currentColor.</desc>
  <circle cx="40" cy="40" r="38" stroke="currentColor" stroke-width="0.6" opacity="0.5"/>
  <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="0.4" opacity="0.3"/>
  <path d="M40 18 C 30 28, 28 42, 40 58 C 52 42, 50 28, 40 18 Z" stroke="currentColor" stroke-width="0.8" fill="none"/>
  <line x1="40" y1="22" x2="40" y2="56" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
  <rect x="38" y="38" width="4" height="4" fill="currentColor" transform="rotate(45 40 40)"/>
</svg>
```

- [ ] **Step 2: Criar `identity/logo/seal-7-dias.svg`**

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" fill="none" role="img" aria-label="Selo Garantia 7 Dias">
  <title>Garantia 7 Dias</title>
  <desc>Selo com 3 círculos concêntricos (sólido + mute + dashed), número 7 grande em Italiana, texto DIAS em Marcellus SC, losango heráldico. Cor controlada via currentColor.</desc>
  <circle cx="55" cy="55" r="52" stroke="currentColor" stroke-width="0.6"/>
  <circle cx="55" cy="55" r="46" stroke="currentColor" stroke-width="0.4" opacity="0.6"/>
  <circle cx="55" cy="55" r="40" stroke="currentColor" stroke-width="0.3" opacity="0.4" stroke-dasharray="2 3"/>
  <text x="55" y="48" text-anchor="middle" font-family="Italiana, serif" font-size="28" fill="currentColor">7</text>
  <text x="55" y="68" text-anchor="middle" font-family="Marcellus SC, serif" font-size="6" letter-spacing="2" fill="currentColor">DIAS</text>
  <rect x="53" y="78" width="4" height="4" fill="currentColor" transform="rotate(45 55 80)"/>
</svg>
```

- [ ] **Step 3: Remover SVGs antigos**

```bash
rm identity/logo/monogram.svg identity/logo/monogram-seal.svg
```

- [ ] **Step 4: Commit**

```bash
git add identity/logo/brand-mark.svg identity/logo/seal-7-dias.svg
git rm identity/logo/monogram.svg identity/logo/monogram-seal.svg
git commit -m "feat(identity): brand-mark composto (folha+losango) + selo 7 DIAS - substitui monograma M"
```

---

## Phase 2 — Landing rebuild

### Task 3: Substituir `landing/index.html` pela versão do protótipo

**Files:**
- Modify: `landing/index.html` (substituição completa)

- [ ] **Step 1: Ler o protótipo origem**

Source: `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/index.html` (1170 linhas).

- [ ] **Step 2: Adaptar e substituir `landing/index.html`**

Copiar conteúdo do protótipo COM as seguintes adaptações:

1. **Path do tokens.css:** trocar `<link rel="stylesheet" href="shared/tokens.css" />` por `<link rel="stylesheet" href="../identity/tokens.css?v=20260507f" />`

2. **Mover todo o `<style>` inline para arquivo separado** `landing/style.css`. No HTML, substituir o bloco `<style>...</style>` por `<link rel="stylesheet" href="style.css?v=20260507f" />`

3. **Adicionar imports de `content.js` + `tracking.js` + `reveal.js` separados** (em vez do `<script>` inline). Estrutura no fim do `<body>`:
   ```html
   <script src="content.js?v=20260507f"></script>
   <script>
     /* bind copy + IDs do content.js (igual ao landing atual) */
   </script>
   <script src="tracking.js?v=20260507f" defer></script>
   <script src="reveal.js?v=20260507f" defer></script>
   ```

4. **Manter os `dev-controls`** do protótipo (botões "Saltar para 4:00" e "Reiniciar") — úteis pra preview. Esconder em produção via `display: none` no CSS por default e mostrar via query param `?dev=true`.

5. **Trocar o `<script>` final do protótipo** (toda lógica do player) pela versão modular: extração para `landing/reveal.js` com pequenas adaptações.

- [ ] **Step 3: Verificar via http**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8082/landing/index.html
```

Esperado: 200.

- [ ] **Step 4: Commit**

```bash
git add landing/index.html
git commit -m "feat(landing): refactor pra versao do prototipo - mobile-first 480px com iluminacao em camadas e cantos heraldicos"
```

---

### Task 4: Substituir `landing/style.css` pelo CSS extraído do protótipo

**Files:**
- Modify: `landing/style.css` (substituição completa)

- [ ] **Step 1: Extrair todo o conteúdo `<style>...</style>` do `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/index.html` (linhas 8-815) e colar em `landing/style.css`.

- [ ] **Step 2: Adaptações no CSS**

- Verificar que NÃO há `@import` ou `<link>` dentro do CSS extraído (deve estar tudo no HTML)
- Manter os comentários do protótipo (são instrutivos)
- O CSS já usa `var(--cor)` e `var(--ff-...)` referenciando os tokens — funciona com o novo `identity/tokens.css`

- [ ] **Step 3: Verificar**

```bash
wc -l landing/style.css
grep -c "var(--" landing/style.css  # contar uso de tokens
```

Esperado: ~800 linhas, 100+ usos de variáveis.

- [ ] **Step 4: Commit**

```bash
git add landing/style.css
git commit -m "feat(landing): CSS extraido do prototipo (iluminacao 2 camadas, cantos hera, gradient text gold, CTA 5 sombras)"
```

---

### Task 5: Substituir `landing/reveal.js` pela lógica simulada do protótipo

**Files:**
- Modify: `landing/reveal.js` (substituição completa)

- [ ] **Step 1: Conteúdo de `landing/reveal.js`**

Extrair lógica do `<script>` final do protótipo (linhas 1041-1166) e adaptar:

```js
/* ==========================================================================
   REVEAL.JS — Player simulado de VSL
   8 minutos de duração total, reveal aos 4:00.
   Dev mode (?dev=true) mostra controles de skip/reset.
   Quando o vídeo real estiver no Vimeo, trocar player simulado por iframe
   e plugar timeupdate no Vimeo Player SDK.
   ========================================================================== */

(function() {
  const STORAGE_KEY = 'mdp:vsl:time';
  const TOTAL_SECONDS = 480;
  const REVEAL_AT = 240;

  const player = document.getElementById('player');
  const playerContent = document.getElementById('playerContent');
  const playBtn = document.getElementById('playBtn');
  const progressFill = document.getElementById('progressFill');
  const timeDisplay = document.getElementById('timeDisplay');
  const playerMeta = document.getElementById('playerMeta');
  const revealZone = document.getElementById('revealZone');

  if (!player) {
    console.warn('[reveal] player element não encontrado. Abortado.');
    return;
  }

  let currentTime = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  let playing = false;
  let interval = null;

  const metaScript = [
    { at: 0,   text: 'Capítulo I · O incêndio invisível' },
    { at: 45,  text: 'Capítulo II · Por que sua dieta falhou' },
    { at: 95,  text: 'Capítulo III · A descoberta dos compostos bioativos' },
    { at: 160, text: 'Capítulo IV · O método em 5 atos' },
    { at: 210, text: 'Capítulo V · A revelação' },
    { at: 240, text: 'Acesso liberado — leia abaixo' },
    { at: 360, text: 'Considerações finais' },
  ];

  function fmt(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const r = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${r}`;
  }

  function updateMeta() {
    let active = metaScript[0];
    for (const m of metaScript) if (currentTime >= m.at) active = m;
    if (playerMeta.dataset.last !== active.text) {
      playerMeta.style.opacity = '0';
      setTimeout(() => {
        playerMeta.textContent = active.text;
        playerMeta.dataset.last = active.text;
        playerMeta.style.opacity = '1';
      }, 220);
    }
  }

  function tick() {
    currentTime = Math.min(currentTime + 1, TOTAL_SECONDS);
    localStorage.setItem(STORAGE_KEY, currentTime);
    render();
    if (currentTime >= TOTAL_SECONDS) pause();
  }

  function render() {
    progressFill.style.width = (currentTime / TOTAL_SECONDS * 100) + '%';
    timeDisplay.textContent = fmt(currentTime);
    updateMeta();
    const wasUnlocked = revealZone.classList.contains('unlocked');
    if (currentTime >= REVEAL_AT) {
      revealZone.classList.add('unlocked');
      revealZone.setAttribute('aria-hidden', 'false');
      if (!wasUnlocked) {
        // Tracking: reveal disparou
        if (window.fbq) { try { fbq('trackCustom', 'VSLReveal'); } catch(_) {} }
        if (window.dataLayer) window.dataLayer.push({ event: 'vsl_reveal' });
      }
    } else {
      revealZone.classList.remove('unlocked');
      revealZone.setAttribute('aria-hidden', 'true');
    }
  }

  function play() {
    if (playing) return;
    playing = true;
    player.classList.add('playing');
    interval = setInterval(tick, 1000);
    if (window.fbq) { try { fbq('trackCustom', 'VSLPlayed'); } catch(_) {} }
    if (window.dataLayer) window.dataLayer.push({ event: 'vsl_played' });
  }
  function pause() {
    playing = false;
    player.classList.remove('playing');
    clearInterval(interval);
  }

  playBtn.addEventListener('click', play);
  playerContent.addEventListener('click', (e) => {
    if (e.target.closest('.play-btn')) return;
    if (playing) pause(); else play();
  });

  render();
  if (currentTime > 0 && currentTime < TOTAL_SECONDS) {
    player.classList.add('playing');
    playerMeta.style.opacity = '1';
  }

  // Dev controls
  const devControls = document.getElementById('devControls');
  if (new URLSearchParams(location.search).has('dev')) {
    devControls?.classList.add('visible');
  }
  document.getElementById('skipBtn')?.addEventListener('click', () => {
    currentTime = REVEAL_AT;
    localStorage.setItem(STORAGE_KEY, currentTime);
    play();
    render();
  });
  document.getElementById('resetBtn')?.addEventListener('click', () => {
    pause();
    currentTime = 0;
    localStorage.setItem(STORAGE_KEY, 0);
    render();
    playerMeta.textContent = 'Toque para iniciar a transmissão';
    player.classList.remove('playing');
  });
})();
```

- [ ] **Step 2: Verificar sintaxe**

```bash
node --check landing/reveal.js
```

Esperado: `landing/reveal.js: SYNTAX OK`.

- [ ] **Step 3: Commit**

```bash
git add landing/reveal.js
git commit -m "feat(landing): reveal.js com player simulado + persistencia localStorage + meta dinamica de capitulos"
```

---

### Task 6: Atualizar `landing/content.js` com copy + nomes de módulos do protótipo

**Files:**
- Modify: `landing/content.js`

- [ ] **Step 1: Substituir `landing/content.js`** pelo conteúdo abaixo

```js
/* ==========================================================================
   CONTENT.JS — copy editável + IDs de configuração
   AJUSTAR antes do deploy: VIDEO_ID (quando Vimeo real existir), pixels, KIWIFY URL
   ========================================================================== */

window.LANDING_CONFIG = {
  VIDEO_ID: '76979871',  // PLACEHOLDER — Vimeo demo (player simulado por enquanto)
  REVEAL_THRESHOLD_SECONDS: 240,

  META_PIXEL_ID: 'XXXXXXXXXXXX',
  GTM_ID: 'GTM-XXXXXXX',

  KIWIFY_CHECKOUT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_COM_LINK_REAL',

  SUPPORT_EMAIL: 'contato@desinflamacaopro.com.br',
};

window.LANDING_COPY = {
  brand: {
    name: 'Método Desinflamação Pro',
    tag: 'Protocolo Reset · est. mmxxv',
  },
  hero: {
    eyebrow: 'Uma transmissão privada',
    manchete: 'Como _desligar_ o interruptor da inflamação celular que está travando o seu emagrecimento, sugando a sua energia e _envelhecendo_ o seu corpo mais rápido.',
    subtitulo: 'Assista à transmissão completa abaixo. O acesso é liberado ao final.',
  },
  product: {
    name: 'Protocolo _Reset_ Anti-Inflamatório',
    tag: '26 vídeo-aulas · 5 módulos · acesso vitalício',
  },
  modulos: [
    { roman: 'I',   nome: 'O Desafio de 6 Dias — O Reset',     meta: '06 aulas · vitória rápida' },
    { roman: 'II',  nome: 'Os Compostos Bioativos',            meta: '05 aulas · ingredientes da feira' },
    { roman: 'III', nome: 'Reconstrução Intestinal',           meta: '05 aulas · saciedade hormonal' },
    { roman: 'IV',  nome: 'Vida Leve Permanente',              meta: '05 aulas · manutenção sem peso' },
    { roman: 'V',   nome: 'Cozinha de Alta Performance',       meta: '05 aulas · 15 minutos de poder' },
  ],
  bonus: [
    { thumb: 'PDF<br/>guia',    nome: 'Guia de Compras<br/>Sem Erro',   meta: 'Dossiê I · pdf' },
    { thumb: 'PDF<br/>planner', nome: 'Planner do Desafio<br/>de 6 Dias', meta: 'Dossiê II · pdf' },
    { thumb: 'PDF<br/>recipe',  nome: '15 Minutos<br/>de Poder',         meta: 'Dossiê III · pdf' },
  ],
  oferta: {
    eyebrow: '— A oferta oficial —',
    titulo: 'Protocolo Reset _acesso completo_',
    priceWas: 'de R$ 497,00',
    priceCtaLine: '— por apenas —',
    parcelado: '12× R$ 29,70',
    aVista: 'ou R$ 297,00 à vista',
    cta: 'Quero acessar o Protocolo',
    helper: 'Acesso imediato · pagamento seguro',
  },
  garantia: {
    eyebrow: '— Garantia de risco zero —',
    titulo: 'Sete dias incondicionais',
    texto: 'Se em sete dias o protocolo não cumprir o que promete, basta um e-mail e devolvemos cada centavo. O risco é nosso.',
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add landing/content.js
git commit -m "feat(landing): content.js com copy cerimonial + 5 modulos do prototipo"
```

---

### Task 7: Regerar `landing/assets/poster.jpg` com prompt ambicioso

**Files:**
- Create: `nano-banana2/prompts/landing-v2/poster.json`
- Create: `landing/assets/poster.jpg` (substituir existente)

- [ ] **Step 1: Criar `nano-banana2/prompts/landing-v2/poster.json`**

```json
{
  "prompt": "Cinematic editorial product still life shot in the style of Aman Resorts product photography combined with Augustinus Bader's signature lighting. Single antique pharmaceutical glass vial with hand-cut faceted shoulders, filled with translucent amber-honey colored botanical infusion, a single cork stopper visible at top with thin wax seal in deep emerald. Resting on weathered piece of dark slate stone with visible mineral grain. Single warm gold key light from upper-left at 45 degrees creating sharp specular highlight along the vial's edge and cork, with soft falloff into deep mahogany shadow on the right side. Background is layered: deep emerald-tinted carbon (#0a1f15 fading to #050a07) with subtle volumetric haze suggesting cool forest air at twilight inside an Alpine longevity retreat library. Visible imperfections: tiny dust particles drifting suspended in the gold light beam, micro-scratches on the vial's anodized cap, a faint fingerprint smudge on the lower glass curve, mild condensation droplets near the vial's base, slight bubbles trapped in the amber liquid. Shot on Hasselblad H6D-100c, 80mm Macro Planar lens at f/2.8, ISO 200, shallow depth of field with focus locked precisely on the vial label area. Rich shadow detail with deep blacks not crushed (lifted to maintain shadow information), highlights soft-rolled to hold detail in the gold reflections. Mood is silent expensive longevity clinic at dusk, the kind of object found only in private apothecary collections. No human, no smiling face, no fitness equipment, no bright colored food, no commercial gloss, no smoothie bowls. Documentary realism, restrained, slow, Aesop-Lab inspired but more refined.",
  "negative_prompt": "no human, no smile, no fitness gym equipment, no smoothie bowls, no bright colored food, no clinical antibiotic clean surfaces, no plastic surfaces, plastic skin, skin smoothing, beautification filters, airbrushed texture, oversaturated colors, depth flattening, CGI, cartoon, illustration, painting, blurry, distorted, overexposed, no studio key light unless described, no glossy reflections unless described, no perfectly clean surfaces, watermark, text overlay, logo overlay, more realistic reinterpretation, generic stock photo, commercial product shot",
  "api_parameters": {
    "resolution": "2K",
    "output_format": "jpg",
    "aspect_ratio": "16:9"
  },
  "settings": {
    "style": "cinematic editorial product photography Aman x Augustinus Bader Bio-Premium",
    "lighting": "single warm gold key light upper-left 45 degrees, deep mahogany falloff right side",
    "camera_angle": "slight tabletop high-angle 15 degrees",
    "depth_of_field": "shallow f/2.8 focus on vial label",
    "quality": "high detail, rich shadow detail, deep blacks not crushed, soft-rolled highlights"
  }
}
```

- [ ] **Step 2: Rodar geração**

```bash
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/landing-v2/poster.json nano-banana2/images/landing-v2/poster.jpg "16:9"
```

- [ ] **Step 3: Copiar pra `landing/assets/`**

```bash
cp nano-banana2/images/landing-v2/poster.jpg landing/assets/poster.jpg
```

- [ ] **Step 4: Commit**

```bash
git add nano-banana2/prompts/landing-v2/poster.json nano-banana2/images/landing-v2/poster.jpg landing/assets/poster.jpg
git commit -m "feat(landing): poster regerado via nano-banana2 com direcao Aman x Augustinus Bader"
```

---

### Task 8: Regerar `landing/assets/og-image.jpg`

**Files:**
- Create: `nano-banana2/prompts/landing-v2/og-image.json`
- Create: `landing/assets/og-image.jpg` (substituir existente)

- [ ] **Step 1: Criar `nano-banana2/prompts/landing-v2/og-image.json`**

```json
{
  "prompt": "Cinematic horizontal composition for social media share, exactly 1200x630 aspect ratio. Asymmetric editorial layout: lower-left third occupied by a single small antique apothecary glass vial with translucent amber-honey botanical infusion, weathered cork stopper, sitting on weathered dark slate. Upper-right two-thirds is intentional negative space with subtle volumetric haze and a soft gold radial glow at center-top suggesting an unseen overhead light source. The composition leaves a clean rectangular zone on the right for typography overlay (which will be added in post-production with the brand wordmark). No text in the image itself. Single warm gold key light at 45 degrees from upper-left, deep emerald-tinted shadow on right side. Background gradient flows from upper-left (#0f1b15) to lower-right (#050a07). Visible imperfections: dust particles drifting in the light beam, subtle film grain, micro-scratches on cork, mild condensation on vial. Shot on Hasselblad H6D-100c, 80mm f/2.8, ISO 200, shallow DOF focus on vial. Rich shadow detail with deep blacks not crushed. Mood: silent expensive longevity clinic at twilight, restrained, slow, exhibition-quality product still life. No human, no fitness equipment, no smile, no commercial product gloss.",
  "negative_prompt": "no human, no smile, no fitness gym equipment, no text overlay, no logo, no watermark, no commercial product photography, plastic skin, skin smoothing, beautification filters, airbrushed texture, oversaturated colors, depth flattening, CGI, cartoon, illustration, painting, blurry, distorted, overexposed, more realistic reinterpretation",
  "api_parameters": {
    "resolution": "2K",
    "output_format": "jpg",
    "aspect_ratio": "16:9"
  },
  "settings": {
    "style": "cinematic editorial composition for social share, asymmetric subject placement",
    "lighting": "single warm gold key light upper-left, gold radial glow upper-center",
    "camera_angle": "slight tabletop high-angle, asymmetric off-center composition",
    "depth_of_field": "shallow, f/2.8, focus on vial",
    "quality": "high detail, rich shadow detail, clean negative space for text overlay, deep blacks not crushed"
  }
}
```

- [ ] **Step 2: Rodar geração + copiar**

```bash
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/landing-v2/og-image.json nano-banana2/images/landing-v2/og-image.jpg "16:9"
cp nano-banana2/images/landing-v2/og-image.jpg landing/assets/og-image.jpg
```

- [ ] **Step 3: Commit**

```bash
git add nano-banana2/prompts/landing-v2/og-image.json nano-banana2/images/landing-v2/og-image.jpg landing/assets/og-image.jpg
git commit -m "feat(landing): og-image regerado com composicao asimetrica pra typography overlay"
```

---

### Task 9: Remover thumbnails de PDFs antigas (substituídas por pattern CSS)

**Files:**
- Delete: `landing/assets/pdf-guia.jpg`
- Delete: `landing/assets/pdf-planner.jpg`
- Delete: `landing/assets/pdf-receitas.jpg`

- [ ] **Step 1: Remover**

```bash
rm landing/assets/pdf-guia.jpg landing/assets/pdf-planner.jpg landing/assets/pdf-receitas.jpg
```

- [ ] **Step 2: Verificar que `landing/index.html` (já substituído na Task 3) usa `.bonus-thumb` com pattern CSS, não `<img src>`** — confirmar via grep:

```bash
grep -A 1 "bonus-thumb" landing/index.html | head -10
```

Esperado: ver `<div class="bonus-thumb">PDF<br/>guia</div>` (texto), não `<img>`.

- [ ] **Step 3: Commit**

```bash
git rm landing/assets/pdf-guia.jpg landing/assets/pdf-planner.jpg landing/assets/pdf-receitas.jpg
git commit -m "chore(landing): remover thumbnails de PDF (substituidas por pattern CSS no protipo)"
```

---

## Phase 3 — Upsell rebuild

### Task 10: Substituir `upsell/index.html` + `upsell/style.css` pela versão do protótipo

**Files:**
- Modify: `upsell/index.html`
- Modify: `upsell/style.css`

- [ ] **Step 1: Substituir `upsell/index.html`** com o conteúdo de `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/upsell.html`, com as seguintes adaptações:

1. `<link rel="stylesheet" href="shared/tokens.css" />` → `<link rel="stylesheet" href="../identity/tokens.css?v=20260507f" />`
2. Mover `<style>` inline para `upsell/style.css` separado, substituindo por `<link rel="stylesheet" href="style.css?v=20260507f" />`
3. Adicionar imports de `content.js`, `tracking.js`, `reveal.js` no fim do body (mesmo padrão da Task 3 da landing)
4. Adicionar binding script inline que mapeia copy do `UPSELL_COPY` para os elementos do DOM

- [ ] **Step 2: Substituir `upsell/style.css`** com o CSS extraído

- [ ] **Step 3: Commit**

```bash
git add upsell/index.html upsell/style.css
git commit -m "feat(upsell): refactor pra versao do prototipo - confirmacao verde + headline gold + iluminacao em camadas"
```

---

### Task 11: Substituir `upsell/reveal.js` (REVEAL_AT=90 simulado)

**Files:**
- Modify: `upsell/reveal.js`

- [ ] **Step 1: Conteúdo de `upsell/reveal.js`**

Mesmo padrão da Task 5 (landing reveal.js) mas com:
- `STORAGE_KEY = 'mdp:upsell:time'`
- `TOTAL_SECONDS = 180` (vídeo upsell de 3min)
- `REVEAL_AT = 90` (1:30)
- Eventos de tracking: `UpsellPlayed`, `UpsellReveal` (em vez de VSL)

- [ ] **Step 2: Verificar**

```bash
node --check upsell/reveal.js
```

- [ ] **Step 3: Commit**

```bash
git add upsell/reveal.js
git commit -m "feat(upsell): reveal.js com player simulado de 3min e reveal aos 1:30"
```

---

### Task 12: Atualizar `upsell/content.js` com copy do protótipo

**Files:**
- Modify: `upsell/content.js`

- [ ] **Step 1: Adaptar copy do upsell** mantendo a estrutura existente, mas substituindo textos com a copy cerimonial:

```js
window.UPSELL_CONFIG = {
  VIDEO_ID: '76979871',
  REVEAL_THRESHOLD_SECONDS: 90,

  META_PIXEL_ID: 'XXXXXXXXXXXX',
  GTM_ID: 'GTM-XXXXXXX',

  KIWIFY_ACCEPT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_LINK_UPSELL_ACEITAR_1CLICK',
  KIWIFY_DECLINE_URL: 'https://desinflamacaopro.com.br/membros/?skip_upsell=1',

  SUPPORT_EMAIL: 'contato@desinflamacaopro.com.br',
  UPSELL_VALUE: 297.00,
  UPSELL_CURRENCY: 'BRL',
};

window.UPSELL_COPY = {
  confirm: '✓ Sua compra foi aprovada',
  eyebrow: 'ESPERA, ANTES DE PROSSEGUIR',
  subEyebrow: '— Uma adição feita para você —',
  manchete: 'Você quer _nunca mais_ precisar pensar no que vai comer?',
  // ... (resto da copy do prototipo, formato similar)
  cta: {
    accept: 'Sim — adicionar ao meu acesso',
    decline: 'Não, obrigado',
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add upsell/content.js
git commit -m "feat(upsell): content.js com copy cerimonial do prototipo"
```

---

### Task 13: Regerar `upsell/assets/poster.jpg`

**Files:**
- Create: `nano-banana2/prompts/landing-v2/upsell-poster.json`
- Create: `upsell/assets/poster.jpg` (substituir)

- [ ] **Step 1: Criar prompt**

```json
{
  "prompt": "Cinematic editorial still life: triangular composition of small antique apothecary jars and ceramic vessels of varying sizes (5-7 vessels visible), each containing different botanical ingredients in slow visual rhythm — dried saffron threads, ground turmeric, whole cardamom pods, dried rose petals, ceylon cinnamon sticks, raw honey crystals, dried green herbs. Vessels arranged on a weathered dark slate stone surface in loose triangular composition suggesting abundance and curated collection. Single warm gold key light from upper-left at 45 degrees, deep emerald-tinted shadow falloff to the right. Background is deep gradient from emerald-tinted carbon (#0a1f15) at top fading to near-black (#050a07) at bottom. Volumetric haze in the air suggesting cool forest atmosphere at twilight. Visible imperfections: tiny dust particles drifting suspended in light beam, micro-scratches on glass, age patina on ceramic, slight tarnish on metal lids, dried herb particles scattered around vessels. Shot on Hasselblad H6D-100c, 80mm f/2.8 lens, ISO 200, shallow depth of field with focus locked on the central jar. Rich shadow detail, deep blacks not crushed. Mood: rare apothecary collection at the end of a long curation day, the kind found in a Swiss longevity retreat library at twilight. No human, no text overlay, no fitness equipment, no commercial gloss, restrained, documentary realism.",
  "negative_prompt": "no human, no smile, no text overlay, no logo, no fitness equipment, no smoothie, no bright colored food, plastic skin, beautification filters, airbrushed texture, oversaturated colors, depth flattening, CGI, cartoon, illustration, painting, blurry, distorted, overexposed, more realistic reinterpretation, generic stock photo",
  "api_parameters": {
    "resolution": "2K",
    "output_format": "jpg",
    "aspect_ratio": "16:9"
  },
  "settings": {
    "style": "cinematic editorial abundance still life Bio-Premium",
    "lighting": "single warm gold key light upper-left 45 degrees, deep falloff",
    "camera_angle": "slight tabletop high-angle, triangular composition",
    "depth_of_field": "shallow f/2.8 focus on central jar",
    "quality": "high detail, rich shadow detail, deep blacks not crushed"
  }
}
```

- [ ] **Step 2: Rodar geração + copiar**

```bash
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/landing-v2/upsell-poster.json nano-banana2/images/landing-v2/upsell-poster.jpg "16:9"
cp nano-banana2/images/landing-v2/upsell-poster.jpg upsell/assets/poster.jpg
```

- [ ] **Step 3: Commit**

```bash
git add nano-banana2/prompts/landing-v2/upsell-poster.json nano-banana2/images/landing-v2/upsell-poster.jpg upsell/assets/poster.jpg
git commit -m "feat(upsell): poster regerado com triangular abundance still life"
```

---

## Phase 4 — Novas surfaces (checkout/members/validacao)

### Task 14: Criar `checkout/` (referência visual pra Kiwify)

**Files:**
- Create: `checkout/index.html`
- Create: `checkout/style.css`

- [ ] **Step 1: Copiar `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/checkout.html` pra `checkout/index.html`** com adaptações:

1. Path do tokens: `<link rel="stylesheet" href="../identity/tokens.css?v=20260507f" />`
2. Extrair `<style>` pra `checkout/style.css`
3. Adicionar `<link rel="stylesheet" href="style.css?v=20260507f" />`
4. NÃO precisa de scripts de tracking (essa página é só referência visual — em produção é Kiwify)

- [ ] **Step 2: Verificar**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8082/checkout/index.html
```

Esperado: 200.

- [ ] **Step 3: Commit**

```bash
git add checkout/
git commit -m "feat(checkout): referencia visual pra Kiwify - mobile-first 480px com Order Bump destacado"
```

---

### Task 15: Criar `members/` (Botanique LIGHT, parchment + verde + gold escuro)

**Files:**
- Create: `members/index.html`
- Create: `members/style.css`

- [ ] **Step 1: Copiar `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/members.html` pra `members/index.html`** com adaptações:

1. Path do tokens: `<link rel="stylesheet" href="../identity/tokens.css?v=20260507f" />`
2. Extrair `<style>` pra `members/style.css`
3. Adicionar `<link rel="stylesheet" href="style.css?v=20260507f" />`
4. NÃO precisa de scripts (mockup visual)

⚠ **Importante:** confirmar que o body usa `var(--parchment)` como background e `var(--ink-light)` como cor de texto principal. Isso é Botanique LIGHT — diferente das outras pages.

- [ ] **Step 2: Verificar visualmente**

Acessar `http://localhost:8082/members/index.html` no browser. Esperado:
- Background parchment claro
- Texto verde tinta escuro
- Crests em gold-700 (mais escuro)
- Layout desktop max-width 1100px (NÃO mobile-first como as outras)
- Numerais romanos III/VI, 04/26 visíveis

- [ ] **Step 3: Commit**

```bash
git add members/
git commit -m "feat(members): Botanique LIGHT (parchment + verde tinta + gold-700) - referencia visual pra Kiwify Members"
```

---

### Task 16: Criar `validacao/` (QA dashboard interno)

**Files:**
- Create: `validacao/index.html`
- Create: `validacao/style.css`

- [ ] **Step 1: Copiar `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/validacao.html` pra `validacao/index.html`** com adaptações:

1. Path do tokens: `../identity/tokens.css?v=20260507f`
2. Extrair `<style>` pra `validacao/style.css`
3. Atualizar paths de iframe pra apontar pras páginas reais:
   - `landing/index.html` → `../landing/index.html?reveal=true` (pra ver pitch mode)
   - `checkout/index.html` → `../checkout/index.html`
   - `upsell/index.html` → `../upsell/index.html?reveal=true`
   - `members/index.html` → `../members/index.html`

- [ ] **Step 2: Verificar visualmente**

Acessar `http://localhost:8082/validacao/index.html`. Esperado:
- 4 mini-frames mostrando as 4 surfaces lado a lado
- Step rail no topo
- Layout desktop max-width 1700px

- [ ] **Step 3: Commit**

```bash
git add validacao/
git commit -m "feat(validacao): QA dashboard interno mostrando 4 surfaces em iframes lado-a-lado"
```

---

## Phase 5 — Cleanup, docs e tag

### Task 17: Atualizar `docs/curriculo-metodo-desinflamacao.md` com nomes novos

**Files:**
- Modify: `docs/curriculo-metodo-desinflamacao.md`

- [ ] **Step 1: Substituir os 5 títulos de módulo** no arquivo:

| Antigo | Novo |
|---|---|
| I · O Mecanismo | **I · O Desafio de 6 Dias — O Reset** |
| II · O Reset (Desafio 6 Dias) | **II · Os Compostos Bioativos** |
| III · A Cozinha de Poder | **III · Reconstrução Intestinal** |
| IV · O Estilo de Vida | **IV · Vida Leve Permanente** |
| V · A Manutenção | **V · Cozinha de Alta Performance** |

E reorganizar conteúdo de cada módulo conforme as novas ementas (por exemplo, "Os Compostos Bioativos" agora é o módulo II, não parte do I).

- [ ] **Step 2: Manter os textos das aulas** (rasgo da estrutura I.1, I.2, etc) mas reorganizar pra bater com novo módulo. As aulas I.1, I.2, I.3, I.4 do antigo módulo I (O Mecanismo) podem ir pra outros módulos conforme conteúdo.

- [ ] **Step 3: Commit**

```bash
git add docs/curriculo-metodo-desinflamacao.md
git commit -m "docs(curriculo): atualizar nomes dos 5 modulos pra alinhar com prototipo (Desafio/Compostos/Reconstrucao/Vida Leve/Cozinha)"
```

---

### Task 18: Atualizar `docs/checklist-kiwify-hotmart.md` com nomes novos de módulos e e-mail novo

**Files:**
- Modify: `docs/checklist-kiwify-hotmart.md`

- [ ] **Step 1: Search & replace dos nomes de módulos** no arquivo (Fase IX da área de membros):

```bash
sed -i 's/Módulo I — O Mecanismo/Módulo I — O Desafio de 6 Dias — O Reset/g' docs/checklist-kiwify-hotmart.md
sed -i 's/Módulo II — O Reset (Desafio 6 Dias)/Módulo II — Os Compostos Bioativos/g' docs/checklist-kiwify-hotmart.md
# ... e assim por diante pros 5 nomes
```

(executar manualmente ou um por um)

- [ ] **Step 2: Atualizar e-mail de suporte** se mudou de `contato@desinflamacao.com.br` pra `contato@desinflamacaopro.com.br`

- [ ] **Step 3: Atualizar referências de domínio** se aplicável (na seção de Schema.org, etc.)

- [ ] **Step 4: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): atualizar nomes de modulos e dominios pra alinhar com prototipo"
```

---

### Task 19: Verificação final cross-browser e responsividade

**Files:** (sem mudança de código)

- [ ] **Step 1: Server up + verificar via curl que tudo serve 200**

```bash
for url in landing/index.html upsell/index.html checkout/index.html members/index.html validacao/index.html identity/tokens.css; do
  echo "$url: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:8082/$url)"
done
```

Esperado: todos 200.

- [ ] **Step 2: Verificar visualmente** abrindo cada URL no browser:

- `http://localhost:8082/landing/index.html` — hero com headline em gold gradient, player com cantos heráldicos, dev controls escondidos. Acessar `?dev=true` mostra os controles. Click em "Saltar para 4:00" libera reveal zone.

- `http://localhost:8082/upsell/index.html` — confirmação verde no topo, headline italic gold, player upsell, oferta visual da assinatura.

- `http://localhost:8082/checkout/index.html` — Order Bump da Xícara de Ouro destacado em diagonal hatch + emerald.

- `http://localhost:8082/members/index.html` — Botanique LIGHT (parchment + verde + gold-700), nav com brand+welcome, status row com numerais romanos.

- `http://localhost:8082/validacao/index.html` — 4 iframes mostrando as 4 surfaces.

- [ ] **Step 3: Testar responsividade**

DevTools → device toolbar → iPhone 14 Pro (393×852). Verificar:
- Landing fica em coluna única, headline escala apropriadamente
- Upsell fica em coluna única
- Checkout fica em coluna única
- Members ainda funciona em mobile (single column scrollable)
- Touch targets ≥ 44×44px nos botões

- [ ] **Step 4: Lighthouse audit** em `landing/index.html`:

DevTools → Lighthouse → Performance + Accessibility + SEO. Targets mínimos:
- Performance ≥ 80
- Accessibility ≥ 90
- SEO ≥ 80

Investigar e corrigir se algum estiver abaixo (provavelmente acessibilidade — verificar contraste de texto, alt em SVGs).

- [ ] **Step 5: Confirmação visual** — Rafael abre cada URL em modo mobile e desktop e confirma que tá visualmente alinhado com o protótipo.

---

### Task 20: Tag `v1.0.0-redesign-prototipo` + atualizar memória

**Files:** (sem mudança de código)

- [ ] **Step 1: Aplicar tag**

```bash
git tag -a v1.0.0-redesign-prototipo -m "v1.0.0 - REDESIGN MAJOR. Substituicao do sistema visual identity v0.x pelo design do prototipo Bio-Premium. 6 niveis de cor, iluminacao em camadas, brand mark composto, mobile-first 480px, 5 surfaces, copy cerimonial. BREAKING CHANGE em relacao a v0.6.x."
```

- [ ] **Step 2: Verificar tag**

```bash
git tag -l
git show --stat v1.0.0-redesign-prototipo | head -5
```

Esperado: ver `v1.0.0-redesign-prototipo` na lista junto com tags v0.1.0 a v0.6.0.

- [ ] **Step 3: Atualizar memória do projeto**

Editar `~/.claude/projects/.../memory/project_metodo_desinflamacao.md`. Adicionar:

```
- ✅ Redesign major v1.0.0-redesign-prototipo (2026-05-07) — adoção do protótipo Bio-Premium como canonical. Sistema de tokens com 6 níveis de cor, iluminação cinematográfica em 2 camadas no body, brand mark SVG composto (folha+losango), 5 surfaces (landing/checkout/upsell/members/validacao), copy cerimonial, mobile-first 480px estrutural. BREAKING CHANGE em relação a v0.6.x.
```

E remover linhas obsoletas do v0.1.0-identity (mantendo histórico mas marcando como superseded).

- [ ] **Step 4: Commit (não tem arquivos pra commitar — só a tag)**

Tag já foi aplicada. Sem commit adicional.

---

## Spec Coverage (self-review)

| Spec section | Implementado em |
|---|---|
| §3 Sistema de tokens (6 níveis) | Task 1 |
| §4 Iluminação cinematográfica | Task 4 (CSS landing) + Task 10 (CSS upsell) + Task 14 (CSS checkout) + Task 16 (CSS validacao) |
| §5 Brand mark + selo + crest | Task 2 |
| §6.1 Landing rebuild | Tasks 3, 4, 5, 6, 7, 8 |
| §6.2 Checkout | Task 14 |
| §6.3 Upsell rebuild | Tasks 10, 11, 12, 13 |
| §6.4 Members (Botanique LIGHT) | Task 15 |
| §6.5 Validacao QA dashboard | Task 16 |
| §7 Imagens estratégia nova | Tasks 7, 8, 9, 13 (regerar 3 fotográficas + remover 3 de PDF) |
| §8 Mobile-first 480px | Aplicado em Tasks 4, 10, 14 (CSS extraído já segue) |
| §9 Copy + nomes módulos | Tasks 6, 12, 17, 18 |
| §11 Critérios de aceitação 1-16 | Validado em Task 19 |
| Tag v1.0.0 | Task 20 |

---

## Próximos passos pós-implementação

Após `v1.0.0-redesign-prototipo`:

1. **Configuração do checklist Kiwify** continua válida (`docs/checklist-kiwify-hotmart.md` v0.6.0). Os nomes de módulos foram atualizados na Task 18.
2. **Produção das vídeo-aulas** (externo) — quando produzidas, fazer swap do player simulado pelo iframe Vimeo Pro:
   - Em `landing/reveal.js`: substituir `setInterval(tick, 1000)` por `Vimeo.Player(iframe).on('timeupdate', ...)`
   - Mesmo no upsell
3. **Locução + edição da VSL** continua externo (~R$ 5-10k investimento)
4. **Compra de domínio + execução do checklist** continua sob a alçada do Rafael
5. **Tráfego pago** outro projeto, outra conversa
