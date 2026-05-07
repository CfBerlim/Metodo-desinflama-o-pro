# Changelog

Histórico de versões do funil **Método Desinflamação Pro**. Convenção [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), versionamento [SemVer](https://semver.org/lang/pt-BR/).

---

## [Não lançado]

### Pendente antes do v1.0.0 final

- Aprovação do roteiro VSL (`docs/roteiro-vsl-metodo-desinflamacao.md`)
- Aprovação do currículo das 26 aulas (`docs/curriculo-metodo-desinflamacao.md`)
- Aprovação dos PDFs bônus (3 templates em `pdfs/`)
- Substituição dos 7 placeholders pré-deploy (Vimeo IDs, Pixel ID, GTM ID, URLs Kiwify)

---

## [1.0.0-redesign-prototipo] — 2026-05-07

### Adicionado

- **README.md** completo com inventário das 7 superfícies, arquitetura do funil, mecânica de reveal, pipeline de imagens e checklist pré-deploy
- **AGENTS.md** — convenções universais pra agentes LLM
- **GEMINI.md** — instruções específicas pro Gemini CLI
- **CHANGELOG.md** — este arquivo

### Alterado — `upsell/`

- Substituído player fake (botão visual) por **Vimeo iframe real**
- Adicionada **mecânica de reveal aos 1:30** (paridade com landing)
- Reveal-zone (`#upsellReveal`) esconde oferta + price card + 2 botões + nota 1-click até disparo
- Atalho `?reveal=true` na URL agora funciona (revela imediatamente)
- Adicionada barra de progresso dourada + display de tempo + lock note
- `scrollIntoView` automático após reveal
- `content.js` agora expõe `VIDEO_ID` e `REVEAL_THRESHOLD_SECONDS` configuráveis

### Corrigido — `landing/`

- **Crítico**: trocado player simulado por Vimeo iframe (player anterior era apenas mockup, não tinha vídeo real — usuário não conseguia testar reveal)
- **Crítico**: trocado `opacity: 0` por `display: none` no reveal-zone (versão anterior reservava layout, deixando vazio gigante abaixo do vídeo até disparar)
- Adicionado `scrollIntoView` automático 600ms após reveal pra trazer o usuário até a oferta

### Alterado — sistema visual

- **BREAKING**: adoção do protótipo Bio-Premium em `doc/Protocolo Reset Anti-Inflamatório_ O Guia da Vida Leve/` como canonical
- Sistema de tokens com **6 níveis por cor** (emerald 900-400, gold 900-200, parchment 3, carbon 6)
- Iluminação cinematográfica em **2 camadas** no body (`::before` ambient + `::after` grid texture)
- Brand-mark SVG composto: **folha estilizada + losango heráldico** (substitui letra "M")
- Selo **"7 DIAS"** SVG: 3 círculos concêntricos + heraldic diamond
- 5 surfaces alinhadas: `landing/`, `checkout/`, `upsell/`, `members/`, `validacao/`
- Copy cerimonial em todas as superfícies
- Mobile-first estrutural com `max-width: 480px`
- Bonus thumbnails agora são **pattern CSS** (não imagens — corte de peso)
- Novas imagens hero com direção visual Aman × Augustinus Bader

### Supersede

Esta release supersede visualmente todas as anteriores (v0.1.0 a v0.6.0).

---

## [0.6.0-checklist-kiwify] — 2026-05-07

### Adicionado

- `docs/checklist-kiwify-hotmart.md` — 11 fases lineares (~975 linhas) do cadastro do produto até smoke test E2E
- 6 anexos: cartão teste, copy Order Bump, prompt nano-banana, export PDFs, refs, sugestão de domínio
- Warning de go-live (não publicar sem as aulas produzidas)
- Lista consolidada dos 7 placeholders pré-deploy

---

## [0.5.0-curriculo] — 2026-05-07

### Adicionado

- `docs/curriculo-metodo-desinflamacao.md` — currículo completo das 26 aulas em 5 módulos
- Cada aula documentada com: título, objetivo, outline, duração, voz dominante
- Regra de tranca por dia: Módulos I-II liberados dia 1, M III-IV dia 8, M V dia 15
- Estratégia de produção faceless cinematográfica

---

## [0.4.0-pdfs] — 2026-05-07

### Adicionado

- `pdfs/style.css` — Botanique PRINT mode (A5)
- `pdfs/guia-compras.html` — Guia de Compras Sem Erro (cover + frontispiece + TOC + capítulos + back-cover)
- `pdfs/planner-6-dias.html` — Planner do Desafio 6 Dias
- `pdfs/receitas-15min.html` — Livro de Receitas 15 Minutos
- Conteúdo real nas primeiras 2-3 seções de cada PDF + placeholder editorial pro restante
- Pipeline de export: print-to-PDF via navegador (Ctrl+P → A5)

---

## [0.3.0-upsell] — 2026-05-06

### Adicionado

- `upsell/index.html`, `upsell/style.css`, `upsell/reveal.js`, `upsell/content.js`
- Apothecary Noir + price card com cantos heráldicos
- Configuração: Clube Vida Leve · R$ 297 ancorado em R$ 564
- Poster cinematográfico via nano-banana2

---

## [0.2.0-landing] — 2026-05-06

### Adicionado

- `landing/index.html`, `landing/style.css`, `landing/reveal.js`, `landing/tracking.js`, `landing/content.js`
- Detector de reveal aos 4:00
- Tracking Meta Pixel + GTM
- 5 assets cinematográficos via nano-banana2

### Adicionado — docs

- `docs/roteiro-vsl-metodo-desinflamacao.md` — 5 atos, script verbatim, storyboard faceless, direção de voz, métricas-alvo

---

## [0.1.0-identity] — 2026-05-06

### Adicionado

- Sistema de identidade visual em `identity/`:
  - `tokens.css` — paleta completa, tipografia, espaçamento, easings
  - `validate.html` + `validate.js` — checklist visual de regressão
  - `styleguide.html` — guia de estilo vivo
- 5 logos SVG: `brand-mark`, `lockup-horizontal`, `lockup-vertical`, `favicon`, `seal-7-dias`

---

## Convenções

- Tags Git seguem `vMAJOR.MINOR.PATCH-<slug>`
- BREAKING CHANGES marcadas explicitamente em **Alterado**
- Cada release tem entrada datada em formato `YYYY-MM-DD`
