# Redesign Geral — Adoção do Protótipo como Canonical

**Data:** 2026-05-07
**Status:** Aprovado para implementação
**Escopo:** Substituir o sistema visual e as 4 surfaces atuais (`identity/`, `landing/`, `upsell/`, `pdfs/`) pela base mais sofisticada do protótipo Bio-Premium em `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/`. Adicionar 3 surfaces novas (`checkout/`, `members/`, `validacao/`). Refazer todas as imagens com prompts mais ambiciosos, e mudar paradigma das thumbnails de bônus de fotografia → pattern CSS abstrato. Mobile-first estrutural com 480px max-width.

**Spec-pai (substitui):** `docs/superpowers/specs/2026-05-07-identidade-visual-bio-premium-design.md`

---

## 1. Por que esse redesign

O sistema visual atual (v0.1.0-identity → v0.6.0-checklist-kiwify) ficou **funcional mas sub-ambicioso** comparado ao protótipo Rafael construiu em paralelo. A inspeção comparativa identificou **9 dimensões concretas** onde o protótipo é substantivamente mais sofisticado:

| Dimensão | Atual | Protótipo |
|---|---|---|
| Sistema de cores | 3 anchors + tints | 6 níveis por cor base (emerald 900-400, gold 900-200, parchment 3, carbon 6) |
| Iluminação ambient | `--bg-stage` com 1 gradient | 2 camadas FIXAS no body (3 radial gradients + grain dots + filete vertical de luz) |
| Texto destaque | `color: accent` plano | Gradient gold em 3 stops com `-webkit-background-clip: text` + glow |
| Player frame | border 1px gold simples | 4 cantos em L heráldicos (`::before`, `::after`, `corner-tr`, `corner-bl`) com shadow direcional |
| Pulse no play button | nenhum | Anel exterior pulsante (animation 3s scale + opacity) |
| CTA principal | 1 box-shadow | 5 sombras compostas (outline + inset highlight + inset shadow + halo + ambient) |
| Brand mark | letra "M" só | SVG composto: 2 círculos concêntricos + folha estilizada + linha vertical + losango heráldico |
| Crest pattern | filete simples | Triplete linha · losango · linha em todos os headers |
| Selo de garantia | monograma "M" | SVG complexo: 3 círculos (sólido + mute + dashed) + número 7 + texto DIAS + losango |

Mais: o protótipo tem **mobile-first ESTRUTURAL** (max-width 480px é o default, breakpoints só ESCALAM tipografia), VSL **simulado** com player próprio + timer + meta dinâmica de capítulos, persistência via localStorage, dev controls, e copy mais cerimonial.

A área de membros do protótipo descobriu **um quarto modo** que meu sistema não tinha explicitamente: **Botanique LIGHT** = parchment + verde tinta escuro + gold-700 (não o gold-500 brilhoso do dark mode). Membros estuda em desktop, não mobile.

---

## 2. Premissas confirmadas com Rafael

- **Substituir** TUDO pelo protótipo (não merge cirúrgico)
- **Construir as 5 surfaces** (landing, checkout, upsell, members, validacao) — landing/upsell deployam, outras ficam como referência visual
- **Imagens** todas refeitas com prompts mais ambiciosos
- **VSL simulado** do protótipo é a base; produção troca pra Vimeo iframe quando vídeo real existir
- **Copy** adota tom cerimonial do protótipo
- **Mobile-first** estrutural, não meramente responsivo
- **Nomes dos 5 módulos** seguem o protótipo (substitui o currículo atual nesse aspecto)

---

## 3. Sistema de tokens (foundation)

### 3.1 Substituir `identity/tokens.css` pela versão rica do protótipo

**Cores — 6 níveis por cor base (vs. 3 atuais):**

```
Emerald: 900 (#0a1f15) → 800 → 700 → 600 → 500 → 400 (#3e8160)
Gold:    900 (#5a4416) → 700 → 500 → 400 → 300 → 200 (#e6cf9e)
Champagne: champagne (#f0e6cf) + champagne-soft (#ede4cb)
Parchment: parchment (#f5f0e4) → parchment-dark → parchment-deep
Carbon:    carbon-1000 (#07090a) → 950 → 900 → 800 → 700
Ink (texto): ink-noir, ink-noir-mute, ink-noir-faint, ink-light, ink-light-mute
Lines:     line-noir/strong, line-light/strong (rgba específicos)
```

**Tipografia (mantém as 4 famílias atuais):**

```
--ff-display: 'Italiana', 'Cormorant Garamond', serif;
--ff-editorial: 'Cormorant Garamond', 'Times New Roman', serif;
--ff-smallcaps: 'Marcellus SC', 'Cormorant Garamond', serif;
--ff-body: 'Inter', system-ui, sans-serif;
```

**Easings cinematográficos (NOVOS):**

```
--ease-elegant: cubic-bezier(0.22, 0.61, 0.36, 1);
--ease-dramatic: cubic-bezier(0.16, 1, 0.3, 1);
```

**Motifs reutilizáveis em CSS (NOVOS):**

- `.gold-rule` — filete dourado fino em gradient horizontal
- `.heraldic-mark` — losango 6×6 rotated 45° em gold-500
- `.smallcaps` — Marcellus SC + letter-spacing 0.22em + uppercase
- `.italic-editorial` — Cormorant italic 400
- `.brand-wordmark` — Italiana letter-spacing 0.04em
- `.tex-grain-dark` — pattern de pontos sutis pra fundo dark
- `.tex-grain-light` — equivalent pra parchment

### 3.2 Eliminar conceito antigo de "3 modos" — adotar **4 modos** mais granulares

| Modo | Onde aplica | Característica |
|---|---|---|
| **Apothecary Noir** | landing, checkout, upsell | Carbon + gold luminoso, iluminação cinematográfica em 2 camadas |
| **Heritage** | (uso institucional, certificados) | Emerald sólido + ouro antigo |
| **Botanique LIGHT** | members | Parchment + verde tinta escuro + gold-700 (mais escurecido pra contraste em fundo claro) |
| **Botanique PRINT** | PDFs (mantém atual) | Parchment + verde + brass — versão impressa que já funciona |

**Removidos:** `--bg-stage`, `--ambient-glow`, `--ambient-text-glow` (substituídos pelos motifs específicos por superfície).

---

## 4. Iluminação cinematográfica em camadas

### 4.1 Pattern obrigatório em TODAS as surfaces dark

Todo `<body>` em modo Apothecary recebe duas camadas FIXAS na viewport:

**Camada 1 — luz de estúdio dourada superior + central + emerald inferior:**

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 90% 55% at 50% -10%, rgba(216,184,120,0.18), rgba(184,146,63,0.08) 30%, transparent 65%),
    radial-gradient(ellipse 60% 45% at 50% 35%, rgba(216,184,120,0.10), transparent 60%),
    radial-gradient(ellipse 70% 60% at 50% 100%, rgba(23,58,40,0.30), transparent 70%);
  pointer-events: none;
  z-index: 0;
}
```

**Camada 2 — grain dots + filete de luz vertical:**

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(rgba(216,184,120,0.025) 1px, transparent 1px),
    linear-gradient(180deg, transparent 0%, rgba(216,184,120,0.04) 50%, transparent 100%);
  background-size: 4px 4px, auto;
  pointer-events: none;
  z-index: 0;
  opacity: 0.7;
}
```

Conteúdo da página fica em `position: relative; z-index: 1;` pra ficar por cima das camadas de luz.

### 4.2 Modo Botanique LIGHT (members)

Versão equivalente pra fundo parchment:

```css
body::before {
  background-image:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(184,146,63,0.06), transparent 60%),
    radial-gradient(rgba(58,40,14,0.04) 1px, transparent 1px);
  background-size: auto, 4px 4px;
}
```

---

## 5. Brand mark — SVG novo canônico

Substituir `identity/logo/monogram.svg` pelo SVG composto do protótipo:

```svg
<svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
  <circle cx="40" cy="40" r="38" stroke="currentColor" stroke-width="0.6" opacity="0.5"/>
  <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="0.4" opacity="0.3"/>
  <path d="M40 18 C 30 28, 28 42, 40 58 C 52 42, 50 28, 40 18 Z" stroke="currentColor" stroke-width="0.8" fill="none"/>
  <line x1="40" y1="22" x2="40" y2="56" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
  <rect x="38" y="38" width="4" height="4" fill="currentColor" transform="rotate(45 40 40)"/>
</svg>
```

Componentes:
- 2 círculos concêntricos (hairline duplo)
- Folha estilizada (path simétrico bezier)
- Linha vertical central (caule)
- Losango heráldico no centro

Usa `currentColor` — pega cor do contexto onde for inserido (gold no dark, gold-700 no light).

### 5.1 Selo de garantia — SVG complexo

Substituir `identity/logo/monogram-seal.svg` pela versão "7 DIAS":

```svg
<svg viewBox="0 0 110 110" fill="none">
  <circle cx="55" cy="55" r="52" stroke="currentColor" stroke-width="0.6"/>
  <circle cx="55" cy="55" r="46" stroke="currentColor" stroke-width="0.4" opacity="0.6"/>
  <circle cx="55" cy="55" r="40" stroke="currentColor" stroke-width="0.3" opacity="0.4" stroke-dasharray="2 3"/>
  <text x="55" y="48" text-anchor="middle" font-family="Italiana, serif" font-size="28" fill="currentColor">7</text>
  <text x="55" y="68" text-anchor="middle" font-family="Marcellus SC, serif" font-size="6" letter-spacing="2" fill="currentColor">DIAS</text>
  <rect x="53" y="78" width="4" height="4" fill="currentColor" transform="rotate(45 55 80)"/>
</svg>
```

3 círculos concêntricos com texturas diferentes + número 7 grande + texto DIAS small caps + losango.

### 5.2 Crest pattern (header reusable)

Padrão `linha · losango · linha` aparece em TODA superfície:

```html
<div class="crest-rules">
  <span class="line"></span>
  <span class="diamond"></span>
  <span class="line"></span>
</div>
```

CSS:
```css
.crest-rules { display: flex; align-items: center; gap: 8px; }
.crest-rules .line { width: 28px; height: 1px; background: var(--gold-500); opacity: 0.55; }
.crest-rules .diamond { width: 4px; height: 4px; background: var(--gold-500); transform: rotate(45deg); }
```

Mobile usa rules de 18px ou 14px conforme proporção.

---

## 6. As 5 surfaces detalhadas

### 6.1 `landing/index.html` — Apothecary Noir

**Trocar a base atual pela do protótipo.** Estrutura:

- **Header crest** — triplete + wordmark "MÉTODO DESINFLAMAÇÃO PRO" em gold-200 letter-spaced + tag "Protocolo Reset · est. mmxxv"
- **Hero** — eyebrow "Uma transmissão privada" + headline gigante Italiana com palavras-chave em gradient gold + headline-divider (line · diamond · line) + subhead italic
- **Player simulado** — frame com 4 cantos heráldicos em L + grid pattern interno + vignette + play-circle com pulse ring + label "Iniciar transmissão" + progress bar com timer + meta dinâmica de capítulos
- **Reveal zone** (oculta até 4:00):
  - Cerimônia (filete vertical de luz + label "— Acesso liberado —")
  - Product card (com brand mark mini, nome do produto com em italic gold, tag, módulos numerados em romanos com nome em italic e meta em small caps)
  - Bonuses (grid com bonus-thumb em diagonal hatch + nome italic + meta)
  - Offer stack (cantos heráldicos em L, eyebrow, título, price-was riscado, CTA line, price-installment GIGANTE em gradient gold, price-cash, CTA button verde com 5 sombras, helper italic)
  - Garantia (selo SVG + texto "Sete dias incondicionais" + body italic)
- **Compliance footer** — crest-rules + brand + disclaimer + legal links

**Reveal mecânica:** mantém logic JS do protótipo (TOTAL_SECONDS=480, REVEAL_AT=240, localStorage persistido, dev controls). Em produção, swap player simulado por Vimeo iframe + reveal.js plugged.

**Mobile-first:** `.page { max-width: 480px; padding: 0 20px; }`. Breakpoint 768px só escala headline 38→56, subhead 17→19, etc.

### 6.2 `checkout/index.html` — Apothecary com Order Bump destacado

Layout vertical mobile-first 480px, mesma iluminação do landing. Elementos:

- Header check-top com crest-rules + brand + back-link
- Section: resumo do pedido (lista de items + subtotal)
- **Order Bump card destacado** — borda dashed gold + diagonal hatching pattern verde (`repeating-linear-gradient(135deg, rgba(184,146,63,0.08) 0 4px, transparent 4px 8px)`) + thumbnail "+ A Xícara de Ouro" com emerald sólido + checkbox grande
- Form-card (cartão, validade, CVV) com inputs Apothecary
- Total recalculado (R$ 197 + R$ 27,90 = R$ 224,90)
- pay-cta verde gradient com 4 sombras
- Garantia compacta + selos de segurança

**NOTA:** página é **referência visual** (Kiwify hospeda em produção). Se Pro permitir CSS custom, código fica pronto pra colar.

### 6.3 `upsell/index.html` — Apothecary com confirmação verde

Layout 480px mobile-first. Elementos:

- Confirmação no topo: pill verde "✓ Sua compra foi aprovada" (border verde + bg emerald translúcido + texto small caps)
- Eyebrow grande "ESPERA, ANTES DE PROSSEGUIR"
- Sub-eyebrow italic "— Uma adição feita para você —"
- Headline gigante com palavras italic em gradient gold: "Você quer **nunca mais** precisar pensar no que vai comer?"
- Player upsell (mesma estrutura cinematográfica do landing player, mas threshold 90s)
- Product description card
- Inclui-list com en-dash bullets
- Price card com cantos heráldicos + price-was + price-installment GIGANTE gold gradient
- btn-accept verde gradient com gold border + 3 sombras compostas
- btn-decline (link discreto, opacity 0.55)
- Garantia compacta

### 6.4 `members/index.html` — Botanique LIGHT (parchment)

**MODO COMPLETAMENTE DIFERENTE.** Background `--parchment`, texto `--ink-light`, accents `--gold-700` (mais escuro pra contraste em claro).

Layout DESKTOP-FIRST max-width 1100px (membros estuda em desktop tipicamente). Mobile responsive mas não primário.

Estrutura:

- **Nav** — bar bg `--parchment-dark` + crest-rules dark + brand "MÉTODO DESINFLAMAÇÃO PRO" + welcome name "Bem-vindo, Carolina" + avatar circle dark com inicial
- **Hero** — eyebrow "— A sua jornada começa aqui —" + headline gigante "A vida leve, *em cinco atos.*" (em italic gold-700) + sub italic + headline-divider (parchment versions of line/diamond)
- **Status row** — 3 colunas (Dia atual III/VI, Aulas concluídas 04/26, Avanço em rota) com numerais romanos + labels em smallcaps + values em italic gold-700
- **Section "Os cinco atos"** — eyebrow + headline + 5 module cards em grid (1 col mobile, 5 col desktop) com numeral romano grande + nome italic + meta + status (concluído/em curso/bloqueado dia X)
- **Bonus grid** — 3 PDFs com thumbnail + nome + meta + button "Baixar"
- **Footer** — disclaimer + suporte

**NOTA:** página é referência visual (Kiwify Members hospeda em produção).

### 6.5 `validacao/index.html` — QA Dashboard pro Rafael

**NÃO é página de cliente.** É um dashboard de validação visual onde Rafael vê todas as 4 surfaces (landing, checkout, upsell, members) renderizadas em mini-frames lado a lado, pra checar coerência visual antes de cada deploy.

Layout horizontal max-width 1700px desktop. Apothecary mode.

Estrutura:
- Header com brand + h1 "Validação do funil" + sub italic
- Step rail: 4 colunas (01 Landing → 02 Checkout → 03 Upsell → 04 Members) com numeral grande + nome em smallcaps + status (OK/pendente)
- Quatro mini-frames iframe (cada um carregando a respectiva página em iframe scaled-down)
- Quick links pra abrir cada surface em nova aba

Útil pra desenvolvimento. Não vai ao ar.

---

## 7. Imagens — estratégia nova

### 7.1 Mudança paradigmática

**Atual:** todas as imagens (poster, og-image, 3 PDF mockups, upsell poster) eram FOTOGRÁFICAS via nano-banana2 com prompts genéricos ("frasco em luz dourada"). Resultado: comerciais demais.

**Novo:** dividir entre 2 categorias:

1. **Imagens fotográficas (poster VSL, og-image, upsell poster)** — manter fotografia, mas com prompts MUITO mais ambiciosos. Direção: **Aman Resorts product photography** + **Augustinus Bader** + **La Prairie hero shots**. Especificações de câmera (Hasselblad H6D, lens, ISO, aperture), imperfeições explícitas (poeira no feixe de luz, micro-arranhões, condensação), referências de mood ("Alpine longevity retreat at twilight", "rare apothecary collection"). Mínimo 200 chars por prompt.

2. **Bonus thumbnails (3 PDFs):** **MUDAR PARADIGMA** — em vez de fotos de capas de livro, usar **pattern CSS abstrato** como o protótipo:
   ```css
   .bonus-thumb {
     aspect-ratio: 3/4;
     background:
       repeating-linear-gradient(135deg, rgba(184,146,63,0.08) 0 4px, transparent 4px 8px),
       var(--carbon-800);
     border: 1px solid var(--line-noir-strong);
     /* texto em smallcaps gold-500 centro */
   }
   ```
   Resultado: thumbnails minimalistas, premium, fazem parte do design system, custo zero, sem inconsistência visual.

### 7.2 Lista de imagens a regerar (todas via nano-banana2)

| Arquivo | Aspect | Direção |
|---|---|---|
| `landing/assets/poster.jpg` | 16:9 | Vial de vidro lapidado em luz dourada lateral, surface de pedra escura, partículas de pó no feixe — Aman/Augustinus Bader mood |
| `landing/assets/og-image.jpg` | 16:9 | Composição editorial cinematográfica com vial off-center + zona vazia direita pra typography overlay |
| `upsell/assets/poster.jpg` | 16:9 | Cluster triangular de jars com ervas/especiarias variadas — abundância, "365 dias" simbólico |
| (NOVO) `landing/assets/hero-bg.jpg` | 16:9 / 4:3 | OPCIONAL: imagem ambient pra usar como background sutil atrás do hero (com opacity baixa). Estudo de luz dourada texturizada |
| (NOVO) `members/assets/atos-divider.jpg` | 21:9 ultrawide | OPCIONAL: imagem horizontal sutil pra usar como divisor entre seções da members area |

### 7.3 Removidos

- `landing/assets/pdf-guia.jpg`
- `landing/assets/pdf-planner.jpg`
- `landing/assets/pdf-receitas.jpg`

Substituídos por pattern CSS no `.bonus-thumb`. Ganho: zero peso de download, design system consistente, fácil de manter.

---

## 8. Mobile-first ESTRUTURAL

### 8.1 Princípio

`.page { max-width: 480px; padding: 0 20px; }` é o canon. Tudo desenhado pro celular PRIMEIRO. Desktop é "celular esticado" — só escala tipografia/grid, nunca rearranja.

### 8.2 Breakpoints

```css
/* Default: mobile (até 767px) */
.page { max-width: 480px; padding: 0 20px; }
.headline { font-size: 38px; }
.subhead { font-size: 17px; }

/* Tablet/Desktop pequeno */
@media (min-width: 768px) {
  .page { max-width: 720px; padding: 0 40px; }
  .headline { font-size: 56px; }
  .subhead { font-size: 19px; }
  .product-name { font-size: 38px; }
  .offer-title { font-size: 34px; }
  .price-installment { font-size: 72px; }
  .bonus-grid { grid-template-columns: 1fr 1fr; }
}

/* Desktop wide */
@media (min-width: 1100px) {
  .page { max-width: 880px; }
  .headline { font-size: 68px; }
}
```

### 8.3 Touch targets

Mínimo 44×44px em qualquer elemento interativo (Apple HIG). Buttons CTA com padding 22px+ em altura. Toggles no Order Bump com área de 48×48 mínima.

### 8.4 viewport-fit

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

`viewport-fit=cover` permite usar `env(safe-area-inset-bottom)` em iOS pra respeitar a home indicator. Sticky CTAs em mobile DEVEM usar isso.

---

## 9. Copy + nomes de módulos

### 9.1 Tom cerimonial (substitui o atual)

Em vez de "PARA QUEM CANSOU DE DIETAS" (atual), usar:
- Eyebrow: "Uma transmissão privada"
- Tag de marca: "Protocolo Reset · est. mmxxv"
- Selo de revelação: "— Acesso liberado —"
- Section dividers: "— Os cinco atos —", "— A sua jornada começa aqui —", "— Materiais de apoio —"
- Selos de qualidade: "— Garantia de risco zero —", "— A oferta oficial —"

Manchete (substitui a atual):
> Como _desligar_ o interruptor da inflamação celular que está travando o seu emagrecimento, sugando a sua energia e _envelhecendo_ o seu corpo mais rápido.

(palavras em itálico recebem gradient gold + glow)

### 9.2 Nomes dos 5 módulos (substituir `docs/curriculo-metodo-desinflamacao.md`)

| # | Nome do módulo | Aulas | Tag |
|---|---|---|---|
| **I** | O Desafio de 6 Dias — O Reset | 06 aulas | vitória rápida |
| **II** | Os Compostos Bioativos | 05 aulas | ingredientes da feira |
| **III** | Reconstrução Intestinal | 05 aulas | saciedade hormonal |
| **IV** | Vida Leve Permanente | 05 aulas | manutenção sem peso |
| **V** | Cozinha de Alta Performance | 05 aulas | 15 minutos de poder |

Total: **26 aulas em 5 módulos**, mantendo a estrutura.

### 9.3 Nomes dos 3 bônus

- "Guia de Compras Sem Erro" → tag "Dossiê I · pdf"
- "Planner do Desafio de 6 Dias" → tag "Dossiê II · pdf"
- "15 Minutos de Poder" → tag "Dossiê III · pdf"

---

## 10. Estrutura de arquivos final

```
identity/                                         # SUBSTITUIR
├── tokens.css                                    # ← versão rica do protótipo
├── styleguide.html                               # demo das 5 surfaces + 4 modos
├── validate.html + validate.js                   # tests dos tokens (existente, ajustar)
└── logo/
    ├── brand-mark.svg                            # ← SVG composto novo (folha + losango)
    ├── seal-7-dias.svg                           # ← SVG selo de garantia
    ├── lockup-vertical.svg                       # mantém (atualiza cores)
    ├── lockup-horizontal.svg                     # mantém (atualiza cores)
    └── favicon.svg                               # mantém

landing/
├── index.html                                    # ← substituir base pela do protótipo
├── style.css                                     # ← substituir
├── reveal.js                                     # ← substituir (lógica simulada do protótipo)
├── content.js                                    # ajustar copy
├── tracking.js                                   # mantém
└── assets/
    ├── poster.jpg                                # ← REGERAR
    └── og-image.jpg                              # ← REGERAR

upsell/
├── index.html                                    # ← substituir
├── style.css                                     # ← substituir
├── reveal.js                                     # ← substituir
├── content.js                                    # ajustar copy
└── assets/
    └── poster.jpg                                # ← REGERAR

checkout/                                         # NOVO
├── index.html                                    # mockup pra Kiwify (referência visual)
└── style.css

members/                                          # NOVO
├── index.html                                    # mockup pra Kiwify Members (referência)
└── style.css

validacao/                                        # NOVO
├── index.html                                    # QA dashboard
└── style.css

pdfs/                                             # MANTÉM (já está em Botanique PRINT)
├── style.css
├── guia-compras.html
├── planner-6-dias.html
└── receitas-15min.html
```

---

## 11. Critérios de aceitação

O redesign é considerado pronto quando:

1. ✅ `identity/tokens.css` substituído pela versão de 6 níveis de cor
2. ✅ Brand mark canonical é o SVG composto (folha + losango), aplicado em landing, upsell, checkout, members, validacao
3. ✅ Selo de garantia é o SVG "7 DIAS" complexo
4. ✅ Crest pattern (linha · losango · linha) presente em TODOS os headers
5. ✅ Iluminação cinematográfica em 2 camadas (`body::before` + `body::after`) ativa em landing, checkout, upsell, validacao
6. ✅ Modo Botanique LIGHT ativo em members (parchment + ink-light + gold-700)
7. ✅ Mobile-first 480px max-width default em landing/upsell/checkout — desktop só ESCALA tipografia
8. ✅ Player simulado funcional na landing e upsell (timer + reveal at 4:00 / 1:30 + persistência localStorage + meta dinâmica de capítulos + dev controls)
9. ✅ Imagens fotográficas refeitas com prompts ambicioso (Aman/Augustinus Bader direção)
10. ✅ Bonus thumbnails são pattern CSS (NÃO mais imagens), em landing e upsell
11. ✅ Copy cerimonial aplicada (eyebrows, manchete, selos, dividers seguindo protótipo)
12. ✅ Nomes dos 5 módulos atualizados pra: O Desafio / Compostos Bioativos / Reconstrução / Vida Leve / Cozinha de Alta Performance
13. ✅ Tag `v1.0.0-redesign-prototipo` aplicada
14. ✅ Validacao dashboard mostra as 4 surfaces lado-a-lado funcionando
15. ✅ `docs/curriculo-metodo-desinflamacao.md` atualizado com nomes novos
16. ✅ `docs/checklist-kiwify-hotmart.md` atualizado se afetar (placeholders, nomes de produto, etc.)

---

## 12. O que NÃO está no escopo

- **Produção das vídeo-aulas em si** — ainda externo
- **Locução + edição da VSL** — externo
- **Vimeo Pro real do VSL** — quando o vídeo for produzido, troca-se o player simulado pelo iframe Vimeo + plug do reveal.js. Spec separado se necessário.
- **PDFs em Botanique PRINT** — já estão prontos (v0.4.0-pdfs), só ajustar nomes de módulos referenciados no conteúdo.
- **Configuração real Kiwify/Hotmart** — fica em `docs/checklist-kiwify-hotmart.md` (v0.6.0)
- **Roteiro completo da VSL** — fica em `docs/roteiro-vsl-metodo-desinflamacao.md` (mantém)
- **Tráfego pago** — outro projeto

---

## 13. Próximos passos

Após aprovação deste spec:

1. Skill `writing-plans` cria plano de implementação task-por-task — provavelmente 25-35 tasks (1 por arquivo de código + 1 por imagem nova)
2. Implementação inline: substituir tokens, refazer landing, refazer upsell, criar checkout/members/validacao, regerar imagens via nano-banana2, atualizar docs
3. Self-review valida critérios 1-16
4. Tag `v1.0.0-redesign-prototipo` no histórico git (versionamento major porque substitui o sistema visual inteiro)
5. Commit que invalida o sistema visual antigo: `BREAKING CHANGE: substituicao do sistema visual identity v0.x pelo design system v1.0.0 baseado no prototipo`
