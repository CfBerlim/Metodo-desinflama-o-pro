# Identidade Visual Bio-Premium — Método Desinflamação Pro

**Data:** 2026-05-07
**Status:** Aprovado para implementação
**Escopo:** Sistema visual de marca. Logo, tipografia, cor, componentes, fotografia e voz. NÃO inclui layouts de página, copy, currículo do produto ou plataforma de membros — esses entram em specs próprios subsequentes.

---

## 1. Posicionamento e princípio orientador

O Método Desinflamação Pro vende um protocolo de elite contra a inflamação celular crônica para um público maduro frustrado com dietas. O produto custa caro, e a identidade visual precisa fazer o cliente *sentir* esse preço antes mesmo de ver o número.

**O padrão visual de referência é "padrão bilionário"** — luxo silencioso, não fitness, não wellness mass-market.

| Sim, parecido com isso | Não, longe disso |
|---|---|
| Patek Philippe, Hermès Heritage | Whey/Probiótica, marcas fitness |
| Augustinus Bader, La Prairie | Wellness influencer (sage + cream genérico) |
| Aman Resorts, Loro Piana | SaaS clean (gradient + sans-serif) |
| Goop x revista impressa | Healthtech startup |
| Antiga apothecary europeia | Farmácia popular |

**Princípio único:** o cliente é um adulto de alto repertório. Subestimá-lo com clichês de wellness destrói o preço justo.

---

## 2. Arquitetura: uma marca, três modos

A marca tem **DNA fixo** (logo, monograma, tipografia, núcleo da paleta) e **três modos de superfície**, cada um aplicado a um contexto específico do funil. Cada modo apenas re-pondera o DNA — nunca o substitui.

| Modo | Contexto de uso | Personalidade |
|---|---|---|
| **I · Heritage** | Marca-mãe, áreas institucionais, certificados, redes sociais oficiais, cabeçalho da área de membros | Atemporal, cerimonial, joalheria |
| **II · Apothecary** | VSL, página de vendas principal, página de upsell, checkout, anúncios | Imersivo, escuro, clínico, hipnótico |
| **III · Botanique** | PDFs (Guia de Compras, Planner 6 Dias, Receitas 15 Min), e-mails transacionais, materiais impressos | Editorial, claro, livro de luxo |

---

## 3. DNA da marca (imutável)

### 3.1 Marca-mestra (wordmark)

Composição vertical em três linhas, centralizada:

```
                    ─ ESTABELECIDO · MMXXVI ─
                          Desinflamação
                    ─        MÉTODO · PRO        ─
```

**Especificações geométricas** (variável `H` = altura da letra "D" maiúscula em "Desinflamação"):

- **Linha superior** ("Estabelecido · MMXXVI"): Marcellus SC, tamanho `H × 0.18`, letter-spacing `0.5em`, cor = accent do modo. Posição: `H × 0.32` acima do topo da wordmark.
- **Wordmark** ("Desinflamação"): Italiana regular, letter-spacing `0.015em`, sem versalete (mistura de maiúscula inicial + minúsculas). Cor = text.primary do modo.
- **Linha inferior** ("MÉTODO · PRO" entre filetes): Marcellus SC, tamanho `H × 0.22`, letter-spacing `0.5em`. Filetes (rules) cada um com largura `H × 0.45`, espessura 1px, gap de `H × 0.32` entre filete e texto. Posição: `H × 0.32` abaixo da baseline da wordmark. Cor do texto = text.primary; cor dos filetes = accent.

**Variantes obrigatórias** (a serem produzidas como SVGs em subprojeto separado):

1. **Lockup vertical completo** (acima) — uso primário em hero/cabeçalho institucional.
2. **Wordmark horizontal sem linha superior** — uso em barras de navegação compactas.
3. **Wordmark + monograma à esquerda** — uso em assinaturas de e-mail.
4. **Monograma isolado** — uso em favicon, avatar, selo de fim de capítulo.

**Espaço de proteção:** mínimo de `H × 1.0` em todos os lados ao redor do lockup.

**Tamanhos mínimos:**
- Lockup completo: 200px de largura na tela / 38mm em impresso. Abaixo disso, usar variante 2 ou 4.
- Monograma: 32px na tela / 8mm em impresso.

### 3.2 Monograma · Selo

Letra "M" em Italiana dentro de uma moldura circular dupla:

- **Círculo externo:** diâmetro `D`, borda 1px na cor accent a 50% de opacidade.
- **Círculo interno:** inset de `D × 0.054` (ex: 6px num diâmetro de 110px), borda 1px na cor accent a 18% de opacidade.
- **Letra "M":** Italiana regular, font-size `D × 0.51`, alinhada óptica e geometricamente ao centro, cor = accent.

**Aplicações:**
- Favicon (32×32, 64×64, 128×128) — versão simplificada com 1 só círculo.
- Avatar de redes sociais (1024×1024) — selo completo com "EST · MMXXVI" em Marcellus SC abaixo do círculo.
- Selo de final de capítulo nos PDFs.
- Botão "voltar ao topo" em páginas longas.
- Wax seal feel em certificados (impressos com hot foil dourado, idealmente).

### 3.3 Tipografia

Quatro famílias, todas via Google Fonts. **Não usar nenhuma outra família em nenhum contexto.**

| Função | Fonte | Pesos usados | Uso |
|---|---|---|---|
| **Display** | Italiana | 400 (regular único) | Wordmark, headlines grandes, capitulares, números romanos de capítulo |
| **Editorial** | Cormorant Garamond | 300 ital, 400 ital, 500 ital, 400, 500 | Ledes, pull-quotes, sub-headlines, frases de transição. Predominantemente em itálico. |
| **Marca** | Marcellus SC | 400 (regular único) | Eyebrows, labels, micro-copy, datas em romano, navegação, números de página |
| **Texto** | Inter | 200, 300, 400, 500, 600 | Corpo de texto longo, UI, formulários, botões, tabelas, micro-tipografia técnica |

**Carregamento web:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,300;1,400;1,500&family=Inter:wght@200;300;400;500;600&family=Italiana&family=Marcellus+SC&display=swap" rel="stylesheet">
```

**Escala tipográfica** (base 16px, escala modular 1.25):

| Token | Tamanho | Família | Peso | Letter-spacing | Uso |
|---|---|---|---|---|---|
| `display.xxl` | 96px / 6rem | Italiana | 400 | 0.005em | Hero hero (uma palavra dominante) |
| `display.xl` | 64px / 4rem | Italiana | 400 | 0.01em | Headline principal |
| `display.l` | 48px / 3rem | Italiana | 400 | 0.015em | Headline secundária |
| `display.m` | 36px / 2.25rem | Italiana | 400 | 0.015em | Section titles |
| `display.s` | 28px / 1.75rem | Italiana | 400 | 0.02em | Card titles |
| `editorial.l` | 22px / 1.375rem | Cormorant Garamond | 400 ital | 0 | Lede, pull-quote |
| `editorial.m` | 18px / 1.125rem | Cormorant Garamond | 400 ital | 0 | Subtítulo italic, blockquote |
| `body.l` | 17px / 1.0625rem | Inter | 300 | 0.005em | Corpo de texto principal |
| `body.m` | 15px / 0.9375rem | Inter | 300 | 0.005em | Corpo secundário |
| `body.s` | 13px / 0.8125rem | Inter | 400 | 0.01em | Captions, notas |
| `eyebrow` | 11px / 0.6875rem | Marcellus SC | 400 | 0.32em | Eyebrows acima de headlines |
| `micro` | 9px / 0.5625rem | Marcellus SC | 400 | 0.5em | Tags de marca, datas em romano |

**Line-height padrão:** 1.0 para `display`, 1.4 para `editorial`, 1.65 para `body`, 1.0 para `eyebrow` e `micro` (usados em uma linha).

**Regras invioláveis:**
- Cormorant Garamond é usado **predominantemente em itálico**. Usá-lo em peso reto só em contextos muito específicos (citações longas em peso normal).
- Italiana **nunca em letras versalete**: a fonte tem caps decorativas próprias; usar a mistura natural com minúsculas.
- Marcellus SC sempre com letter-spacing alto (`0.32em` ou mais). É small caps por padrão e exige respiração.
- Inter sempre em peso 300 (Light) para corpo. Peso 400 (Regular) só em micro-tipografia <14px.
- **Nenhuma fonte é usada com `text-transform: uppercase`** salvo em casos isolados de label muito curto. O small caps natural de Marcellus SC dá esse papel.

### 3.4 Núcleo da paleta (presente em todos os modos)

| Token | Hex | RGB | Nome |
|---|---|---|---|
| `core.emerald` | `#0F3D2E` | 15 / 61 / 46 | Forest Emerald |
| `core.gold` | `#A88B4A` | 168 / 139 / 74 | Old Gold |
| `core.ivory` | `#EBE3D0` | 235 / 227 / 208 | Champagne Ivory |

**Esses três valores aparecem em algum lugar de cada modo.** É isso que faz os três modos parecerem da mesma família.

---

## 4. Os três modos

### 4.1 Modo I · Heritage

**Persona:** A marca falando institucionalmente. Joalheria suíça aplicada à saúde.

**Quando usar:**
- Página "Sobre", certificado de conclusão do método.
- Cabeçalho da área de membros, telas de boas-vindas, telas de encerramento.
- Posts de marca em redes sociais (não anúncios).
- Capa institucional de e-books, contracapa de PDFs.
- Embalagem de produto físico (se houver).

**Paleta completa:**

| Token | Hex | Uso |
|---|---|---|
| `heritage.bg.primary` | `#0F3D2E` | Fundo principal |
| `heritage.bg.lift` | `#163F31` | Painéis levemente elevados |
| `heritage.bg.deep` | `#0A3024` | Áreas de profundidade (footer, sombra) |
| `heritage.text.primary` | `#EBE3D0` | Texto principal |
| `heritage.text.muted` | `rgba(235,227,208,0.75)` | Texto secundário |
| `heritage.accent` | `#A88B4A` | Filetes, números, eyebrows, monograma |
| `heritage.accent.muted` | `rgba(168,139,74,0.55)` | Acentos discretos |
| `heritage.hairline` | `rgba(168,139,74,0.22)` | Bordas duplas, divisores |

**Elementos de superfície característicos:**
- **Moldura dupla:** todo card institucional ganha um filete interno (1px na cor `hairline`) com inset de 18px do limite externo. É a assinatura visual do modo.
- **Labels verticais:** seções importantes recebem uma label em Marcellus SC rotacionada `-90deg` na borda esquerda (escrita de baixo pra cima). Texto curto, 1-3 palavras.
- **Selo no fim:** páginas institucionais terminam com o monograma centralizado seguido de `EST · MMXXVI` em micro tipografia.

### 4.2 Modo II · Apothecary

**Persona:** A marca convertendo. Imersão clínica que prende atenção em vídeo longo.

**Quando usar:**
- Landing page com VSL (a página principal de vendas).
- Página de upsell.
- Checkout (background) — o widget de pagamento da plataforma fica em ilha clara contrastada.
- Página de obrigado / confirmação.
- Anúncios em vídeo (background dos overlays).
- E-mails de venda (campanhas de oferta, lançamento).

**Paleta completa:**

| Token | Hex | Uso |
|---|---|---|
| `apothecary.bg.primary` | `#07100C` | Fundo principal (carbono profundo) |
| `apothecary.bg.lift` | `#0A1410` | Áreas elevadas (cards, video frames) |
| `apothecary.bg.deep` | `#050A07` | Profundidade extrema (vinheta, footer) |
| `apothecary.text.primary` | `#EFE7D2` | Texto principal (bone, ligeiramente mais quente que ivory) |
| `apothecary.text.muted` | `rgba(239,231,210,0.72)` | Texto secundário |
| `apothecary.accent` | `#C9A876` | Champagne Gold — versão mais luminosa do gold para contraste em fundo escuro |
| `apothecary.accent.muted` | `rgba(201,168,118,0.55)` | Acentos discretos |
| `apothecary.hairline` | `rgba(201,168,118,0.30)` | Divisores, bordas finas (mais luminoso que os outros modos pra dar presença ao ouro) |
| `apothecary.bg.stage` | gradient multi-camada | Fundo cinematográfico do hero/VSL — ver "Atmosfera de stage" abaixo |
| `apothecary.ambient.glow` | `0 0 64px rgba(201,168,118,0.12)` | Box-shadow aplicável em frames e cards pra criar halo gold |
| `apothecary.ambient.text-glow` | `0 0 24px rgba(201,168,118,0.45)` | Text-shadow nos destaques em italic dourado (h1 em, eyebrow) |

**Por que o accent muda de hex no modo Apothecary:** `#A88B4A` em fundo carbono fica com aspecto opaco e perde a aura "ouro". `#C9A876` resolve com mesma família tonal mas mais luz. É o mesmo recurso que joalherias usam — ouro fotografado em estúdio escuro recebe iluminação adicional pra parecer "ouro" e não "marrom".

**Atmosfera de stage — o segredo do "padrão bilionário":**

O modo Apothecary não é "preto chapado" — é **clínica de longevidade de elite com luz cênica controlada**. Diferença prática: pretos sólidos parecem dead-flat, sem profundidade, e roubam o "luxo" da página por mais que o ouro seja bonito.

A solução é construir o fundo em camadas, simulando iluminação de estúdio. O token `--bg-stage` aplica três camadas de luz sobre um gradient warm vertical:

1. **Glow gold central (atrás do conteúdo principal — ex: VSL player):** radial gradient com `rgba(201, 168, 118, 0.14)` no centro, fade pra transparente em 68%. É o "spot" que ilumina o vídeo.
2. **Luz emerald inferior-esquerda:** radial gradient com `rgba(15, 61, 46, 0.42)` ancorado em `18% 100%`. Cria atmosfera quente-fria, sugere profundidade vegetal/natural.
3. **Acento gold superior-direito (highlight cinematográfico):** radial gradient sutil em `88% 8%`. Adiciona movimento e quebra simetria.
4. **Base:** gradient vertical `#050A07 → #0F1B15 (pico) → #060B08`. O "pico" no meio cria sensação de painel iluminado, não de buraco preto.

**Tokens de glow:**
- `--ambient-glow` — box-shadow gold halo (`0 0 64px rgba(201, 168, 118, 0.12)`). Aplicar em frames de vídeo, cards de oferta, módulos. Cria o halo de "objeto iluminado por trás".
- `--ambient-text-glow` — text-shadow gold (`0 0 24px rgba(201, 168, 118, 0.45)`). Aplicar nas italics em destaque (`h1 em`, headlines com palavras-chave em Cormorant). Faz o ouro "acender" sem ofuscar.

**Hairlines em Apothecary são MAIS luminosos que nos outros modos** (`rgba(201, 168, 118, 0.30)` vs `0.14`/`0.18`/`0.22` dos outros). É proposital — o ouro precisa estar presente nos divisores pra "amarrar" a página, não desaparecer.

Adicionalmente, o stage tem hairlines luminosos no topo e na base via pseudo-elementos:
- `::before` (topo): gradient horizontal com pico de `rgba(201, 168, 118, 0.55)` no centro, fade pras laterais — cria a sensação de "moldura iluminada por cima".
- `::after` (base): mesmo padrão com pico de `0.22` — eco mais discreto na base.

**Elementos de superfície característicos:**
- **Eyebrow + headline + lede** em todo bloco: pequeno texto de marcação em Marcellus SC (com `--ambient-text-glow` aplicado), depois headline em Italiana (a parte italic em Cormorant recebe `--ambient-text-glow`), depois lede em Cormorant Garamond italic. É a estrutura padrão de ritmo.
- **Hairline divisores:** linhas finas de 1px na cor `hairline` (0.30 opacity) separam seções, nunca espaço em branco sozinho.
- **Vídeo frame:** moldura 1px em ouro a 0.45 de opacidade, com `--ambient-glow` (halo gold ao redor), `inset 0 1px 0` highlight bem sutil no topo, e radial gradient interno gold a 0.08 — o frame parece "acender" sozinho.
- **Play button:** círculo dourado com box-shadow gold a 0.32 de opacidade (glow sutil), fundo radial gold suave, e drop-shadow no triângulo central. NÃO é o play opaco genérico — é uma joia iluminada.
- **Botão de compra (oculto até 4 minutos do VSL):** retângulo levemente arredondado (radius 2px), background `#C9A876`, text color `#07100C`, font-family Marcellus SC, padding generoso (20px / 56px), letter-spacing alto. Aparece com fade-in suave de 800ms, sem bounce, sem pulse.
- **"Lock note" abaixo do vídeo:** texto em Cormorant Garamond italic, font-size 13px, color `rgba(201, 168, 118, 0.78)`. Frase: "— O acesso ao Método é revelado aos 4 minutos do vídeo —". Some quando o botão aparece.

### 4.3 Modo III · Botanique

**Persona:** A marca entregando o conteúdo. Livro de luxo, consultoria escrita.

**Quando usar:**
- Todos os PDFs (Guia de Compras Sem Erro, Planner do Desafio 6 Dias, Livro de Receitas 15 Minutos).
- E-mails transacionais (boas-vindas, recibo, link de acesso).
- Conteúdo escrito dentro da área de membros (transcrições de aulas, complementos textuais).
- Posts longos de blog (se houver blog).
- Material impresso (cartas físicas se houver, impressões internas).

**Paleta completa:**

| Token | Hex | Uso |
|---|---|---|
| `botanique.bg.primary` | `#F2ECDD` | Fundo principal (parchment quente) |
| `botanique.bg.lift` | `#E8DFC8` | Painéis secundários, sidebars |
| `botanique.bg.deep` | `#D8CEB4` | Footer, capítulo final |
| `botanique.text.primary` | `#1F3D2E` | Texto principal (verde tinta — mais escuro que `core.emerald` para legibilidade) |
| `botanique.text.muted` | `rgba(31,61,46,0.78)` | Texto secundário |
| `botanique.accent` | `#9C7C42` | Aged Brass — gold mais escurecido para contraste em fundo creme |
| `botanique.accent.muted` | `rgba(156,124,66,0.55)` | Versão muted do brass — usado em borders de botões ghost, hairlines de ênfase |
| `botanique.hairline` | `rgba(31,61,46,0.18)` | Filetes, bordas, divisórias |

**Por que o text é `#1F3D2E` (mais escuro que `#0F3D2E`):** em fundo claro, o emerald do core fica com contraste insuficiente para corpo de texto longo (WCAG 4.5:1). `#1F3D2E` mantém a percepção "verde da marca" e atinge ~10:1 em parchment.

**Por que o accent é `#9C7C42` em vez de `#A88B4A`:** mesma lógica inversa do Apothecary. Em fundo claro, gold luminoso some. Brass mais saturado/escuro segura presença sem virar marrom.

**Elementos de superfície característicos:**
- **Numerais romanos de capítulo grandes:** Cormorant Garamond italic, 60-80px, na cor `accent`. Marcam abertura de capítulo.
- **Corpo em duas colunas** quando largura permitir: Inter Light 12-13px, gap 18-24px entre colunas. Alinhamento justificado com hifenização.
- **Lede com filete lateral:** Cormorant italic 14px, padding-left 14px, border-left 2px solid `accent`. Abre todo capítulo.
- **Capitular (drop-cap)** opcional na primeira letra do primeiro parágrafo de capítulo: Italiana, font-size = 4 linhas, float esquerda, color `accent`.
- **Cabeçalho e rodapé tipo livro:** filete fino superior e inferior, com micro-tipografia Marcellus SC na esquerda (nome do método) e direita (capítulo / página).
- **Listas:** bullets como filetes finos (–), nunca círculos. Numeração com numerais romanos para pontos importantes, arábicos para passos operacionais.

---

## 5. Componentes primitivos

Todos os componentes existem em três variantes, uma por modo. As regras geométricas são as mesmas em todos os modos; apenas as cores mudam.

### 5.1 Botão primário

- Padding: 18px / 48px (vertical / horizontal).
- Border-radius: 2px (quase reto, nunca pílula).
- Font-family: Marcellus SC, 12px, letter-spacing 0.32em.
- Background: `accent` do modo.
- Text color: `bg.primary` do modo (contraste máximo).
- Hover: aumenta levemente o brightness do background (5%) e adiciona uma sombra interna fina na borda inferior. Sem transform/scale.
- **Sem ícone, sem flechas decorativas, sem brilho/glow.** A palavra é o botão.

### 5.2 Botão secundário (ghost)

- Mesma geometria.
- Background: transparente.
- Border: 1px solid `accent.muted`.
- Text color: `accent`.
- Hover: border vira `accent` (full opacity), background ganha um wash de `accent` a 4% de opacidade.

### 5.3 Hairline / filete

Cinco padrões reutilizáveis:

1. **Hairline reto** — 1px sólido na cor `hairline`. Divide seções verticalmente.
2. **Hairline com gradient** — `linear-gradient(90deg, transparent, accent.muted, transparent)`. Divide seções com cerimônia (cabeçalho de seção).
3. **Hairline com label centralizada** — duas hairlines flanqueando uma label em Marcellus SC. Padrão de seção numerada (`I · DNA da Marca`).
4. **Filete duplo** — duas linhas paralelas a 4px de distância, na cor `accent.muted`. Marca decorações de moldura institucional (modo Heritage).
5. **Filete vertical lateral** — 2px sólido vertical na cor `accent`, usado em ledes (padding-left 14px).

### 5.4 Eyebrow + Headline + Lede (bloco padrão)

A unidade de ritmo do sistema. Toda seção começa com:

```
[EYEBROW EM SMALL CAPS · MARCELLUS SC]
        ↓ 14px
Headline em Italiana
        ↓ 18px
Lede em Cormorant Garamond italic, máx 60ch
```

### 5.5 Pull-quote

Cormorant Garamond italic, 22-28px conforme contexto. Aspas ornamentais (Italiana, font-size 200% da quote, posicionadas como pontuação grande no início). Atribuição em Marcellus SC eyebrow abaixo.

### 5.6 Lista de tópicos

- Bullet character: `–` (en-dash), nunca `•`.
- Indentação: 20px do filete esquerdo do parágrafo.
- Espaçamento entre itens: 8px.
- Para listas importantes, substituir `–` por numerais romanos pequenos em Marcellus SC.

### 5.7 Card

- Border-radius: 4px.
- Border: 1px solid `hairline`.
- Padding interno: 32px horizontal / 36px vertical em mobile; 40px horizontal / 48px vertical em desktop.
- **Em Heritage e Botanique: sem sombra.** Profundidade vem da hierarquia de bg.primary / bg.lift / bg.deep do modo.
- **Em Apothecary: aplicar `--ambient-glow`** (`box-shadow: 0 0 64px rgba(201,168,118,0.12)`) em frames de vídeo, cards de oferta, módulos. É o que cria o efeito "objeto iluminado por trás" característico de clínica de longevidade. Sem o glow, o card desaparece no fundo.

### 5.8 Formulário (input, label)

- Label: Marcellus SC eyebrow acima do input, espaçamento 8px.
- Input: sem fill (background transparente). Border bottom 1px solid `accent.muted`, sem outras bordas. Focus = border vira `accent` com altura 2px.
- Padding interno do input: 12px 0 (sem padding lateral, alinhado à coluna).
- Texto digitado: Inter 16px, peso 400, color `text.primary`.

### 5.9 Tabela

- Sem zebra-stripes (alternância de cor de fundo).
- Apenas hairlines horizontais entre linhas.
- Cabeçalho em Marcellus SC eyebrow, alinhado à esquerda.
- Conteúdo em Inter 14px, peso 300.
- Números alinhados à direita, com tabular-nums.

---

## 6. Fotografia, iconografia e ilustração

### 6.1 Fotografia

**Regra zero: nada de banco de imagens genérico.** Toda imagem visível ao cliente final é original ou gerada via Nano Banana 2 (ferramenta `nano-banana2/` já configurada neste projeto, conforme `CLAUDE.md`).

**Direção fotográfica:**
- **Iluminação:** sempre uma única fonte direcional, lateral ou ¾, com fall-off rico em sombra. Nunca chapado, nunca soft box frontal.
- **Profundidade de campo:** rasa. Aperture f/1.8–f/2.8 simulado. Foco em um único elemento.
- **Paleta in-camera:** alinhada ao modo onde a foto vai aparecer (predominância de pretos em Apothecary, parchment em Botanique).
- **Composição:** muito ar negativo. Ingredientes fotografados como joias — um único item, levemente off-center, sobre superfície monocromática.
- **Cor:** ingredientes naturais ganham levemente saturação verde-azulada e black-point profundo. Pele humana (raríssima) é tratada como objeto: textura, sombra, sem retoque para "perfeição".

**Proibido:**
- Pessoas sorrindo para câmera (qualquer estoque "happy lifestyle").
- Tigelas coloridas com smoothie multicolor (clichê wellness).
- Mãos segurando vegetais com luz frontal artificial.
- Imagens de academia, halteres, fitas métricas, balanças.
- Antes-e-depois ou qualquer variação de "shape transformation".

### 6.2 Iconografia

**Regra:** o sistema **não usa ícones decorativos**. Em vez disso, usa numerais romanos, filetes e small caps para indicar estado/categoria.

Quando ícone for absolutamente necessário (raríssimo — ex: ícone de tocar/pausar no player, ícone de cadeado nos módulos travados):
- Estilo: contorno (outline), 1px de espessura, sem preenchimento.
- Cor: `accent` do modo.
- Tamanho: 16-20px.
- Família: traçar à mão como SVG. **Não usar Material Icons, Heroicons, Lucide ou qualquer set de mercado.**

### 6.3 Ilustração

Quando ilustração for necessária (ex: anatomia simplificada do processo inflamatório no curso):
- Estilo: gravura de manual médico antigo (botanical illustration / medical engraving do século XIX).
- Cor: monocromática na cor `text.primary` ou `accent` do modo.
- Traço: linhas finas e detalhadas, hatching para profundidade, sem cores chapadas.
- Pode ser gerado via Nano Banana 2 com prompt direcionado a "vintage medical engraving".

---

## 7. Voz e tom

### 7.1 Princípios

- **Autoridade + empatia.** Nunca um sem o outro.
- **Latim parcimonioso.** "Ritual", "Reset", "Renascimento", "Protocolo", numerais romanos para capítulos. Mas nunca virar paródia clínica.
- **Diretiva de tratamento:** "você" (não "vocês"), tom de consultor sênior dirigindo-se a um par, não a um aluno.
- **Frases curtas em momentos importantes.** Frases longas apenas quando há complexidade real a entregar.

### 7.2 Vocabulário-marca

**Usar:**
protocolo · método · ritual · reset · silêncio celular · renascimento · liberdade · clareza · longevidade · compostos bioativos · feira · mercado de feirante · inflamação · incêndio invisível · alerta vermelho · biologia · receptores celulares · 21 dias · seis dias

**Evitar:**
fitness · queimar · shape · forma física · turbinar · acelerar metabolismo (clichê) · suco detox · barriga negativa · zero açúcar · low carb · keto · jejum (mesmo se for usado) · bater meta · transformação radical · você merece · ame seu corpo

### 7.3 Eyebrows e marcadores

Os eyebrows em Marcellus SC são onde a voz da marca aparece mais condensada. Exemplos canônicos:

- `MÉTODO · ESTABELECIDO MMXXVI`
- `CAPÍTULO I · O MECANISMO`
- `RITUAL DE SEIS DIAS · DIA III`
- `PROTOCOLO ANTI-INFLAMATÓRIO`
- `PARA QUEM CANSOU DE DIETAS`
- `O PRIMEIRO PROTOCOLO QUE NÃO PEDE FOME`

---

## 8. Aplicação no funil de vendas (mapa modo × superfície)

| Etapa do funil | Modo | Notas |
|---|---|---|
| Anúncio em vídeo (Meta/YouTube) | Apothecary | Card escuro, gold accent, headline Italiana, mesmo lockup do site |
| Anúncio estático | Apothecary ou Heritage | Heritage para reconhecimento de marca; Apothecary para venda direta |
| Landing page com VSL | **Apothecary** | Página principal. Lock de botão aos 4 minutos. |
| Checkout | Apothecary (background) | Widget de pagamento da plataforma fica numa "ilha" clara contrastada com bg escuro ao redor |
| Order Bump ("Xícara de Ouro") | Apothecary | Card destacado em `accent` com text em `bg.primary`. Selo de ouro. |
| Página de upsell ("Clube Vida Leve") | **Apothecary** | Vídeo curto, dois botões: principal `accent` (sim), recusa em ghost |
| Página de obrigado | Heritage | Cerimônia. Selo monograma. |
| E-mail de boas-vindas | Botanique | HTML simples, parchment, monograma topo |
| Área de membros — wrapper/header | Heritage | Cabeçalho institucional, lockup completo |
| Área de membros — conteúdo de aula | Apothecary | Player de vídeo emoldurado, transcrição abaixo |
| Área de membros — material textual | Botanique | Quando usuário "abre" um PDF embutido |
| PDFs (Guia / Planner / Receitas) | **Botanique** | Diagramação em livro |
| Certificado de conclusão | Heritage | Hot foil dourado se imprimível; selo monograma; numerais romanos |
| Redes sociais — feed orgânico | Heritage | Tom institucional |
| Redes sociais — anúncio pago | Apothecary | Tom de conversão |
| Assinatura de e-mail pessoal | Heritage | Lockup horizontal + monograma |

---

## 9. Tokens CSS (referência de implementação)

Padrão: o site/PDF aplica `data-mode="heritage|apothecary|botanique"` em um container raiz, e o CSS lê os tokens corretos via cascade.

```css
:root {
  /* DNA — sempre disponível */
  --core-emerald: #0F3D2E;
  --core-gold: #A88B4A;
  --core-ivory: #EBE3D0;

  /* Tipografia */
  --font-display: 'Italiana', serif;
  --font-editorial: 'Cormorant Garamond', serif;
  --font-marca: 'Marcellus SC', serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Escala (defaults — modo pode sobrescrever) */
  --size-display-xxl: 6rem;
  --size-display-xl: 4rem;
  --size-display-l: 3rem;
  --size-display-m: 2.25rem;
  --size-display-s: 1.75rem;
  --size-editorial-l: 1.375rem;
  --size-editorial-m: 1.125rem;
  --size-body-l: 1.0625rem;
  --size-body-m: 0.9375rem;
  --size-body-s: 0.8125rem;
  --size-eyebrow: 0.6875rem;
  --size-micro: 0.5625rem;

  /* Espaçamento (8px base) */
  --space-xs: 4px;
  --space-s: 8px;
  --space-m: 16px;
  --space-l: 24px;
  --space-xl: 40px;
  --space-xxl: 64px;
  --space-xxxl: 96px;
}

[data-mode="heritage"] {
  --bg-primary: #0F3D2E;
  --bg-lift: #163F31;
  --bg-deep: #0A3024;
  --text-primary: #EBE3D0;
  --text-muted: rgba(235,227,208,0.75);
  --accent: #A88B4A;
  --accent-muted: rgba(168,139,74,0.55);
  --hairline: rgba(168,139,74,0.22);

  /* Heritage não tem stage cinematográfico — fundo emerald cerimonial e pronto */
  --bg-stage: var(--bg-primary);
  --ambient-glow: 0 0 32px rgba(168,139,74,0.18);
}

[data-mode="apothecary"] {
  --bg-primary: #07100C;
  --bg-lift: #0A1410;
  --bg-deep: #050A07;
  --text-primary: #EFE7D2;
  --text-muted: rgba(239,231,210,0.72);
  --accent: #C9A876;
  --accent-muted: rgba(201,168,118,0.55);
  --hairline: rgba(201,168,118,0.30);

  /* Atmosfera de stage — clínica de longevidade de elite (3 camadas de luz) */
  --bg-stage:
    radial-gradient(ellipse 75% 50% at 50% 38%,
      rgba(201,168,118,0.14) 0%,
      rgba(201,168,118,0.05) 38%,
      transparent 68%),
    radial-gradient(ellipse 65% 55% at 18% 100%,
      rgba(15,61,46,0.42) 0%,
      transparent 65%),
    radial-gradient(ellipse 50% 40% at 88% 8%,
      rgba(201,168,118,0.05) 0%,
      transparent 60%),
    linear-gradient(180deg,
      #050A07 0%,
      #0B1612 28%,
      #0F1B15 52%,
      #0A1410 78%,
      #060B08 100%);
  --ambient-glow: 0 0 64px rgba(201,168,118,0.12);
  --ambient-text-glow: 0 0 24px rgba(201,168,118,0.45);
}

[data-mode="botanique"] {
  --bg-primary: #F2ECDD;
  --bg-lift: #E8DFC8;
  --bg-deep: #D8CEB4;
  --text-primary: #1F3D2E;
  --text-muted: rgba(31,61,46,0.78);
  --accent: #9C7C42;
  --accent-muted: rgba(31,61,46,0.55);
  --hairline: rgba(31,61,46,0.18);

  /* Botanique = livro de luxo, parchment puro, sem cinematografia */
  --bg-stage: var(--bg-primary);
  --ambient-glow: none;
}
```

---

## 10. Acessibilidade

- **Contraste:** todas as combinações `text.primary / bg.primary` em cada modo atingem ≥ 7:1 (WCAG AAA para texto normal). Combinações `text.muted / bg.primary` atingem ≥ 4.5:1 (WCAG AA para texto normal).
- **Exceção documentada — botão primário em Heritage e Botanique:** O `.btn-primary` usa `bg.primary` (verde escuro) sobre `accent` (gold/brass) — as combinações resultantes são Heritage 3.74:1 e Botanique 3.31:1, abaixo do AA normal (4.5:1). Como `Marcellus SC` em 12px com letter-spacing 0.32em é renderizado em small caps (≈ 8.5pt), e a forma das letras é alta-x-height, na prática a leitura é confortável, mas formalmente não atinge AA. Esta é uma limitação inerente da paleta gold/brass — depend de cor mid-luminance pra ser "ouro" e não "amarelo limão" ou "marrom-escuro". Quaisquer versões alternativas (gold mais escuro pra contraste, ou texto branco) destruiriam o caráter Bio-Premium. Apothecary atinge 8.59:1 sem problema (text é bone, não verde escuro). Para CTAs em Heritage e Botanique que precisem ser AA-compliant em contextos críticos (acessibilidade legal etc), substituir o `.btn-primary` por `.btn-ghost` (border + texto accent) ou usar `bg.primary` no botão com texto `text.primary` (verde sobre verde escuro).
- **Tamanho mínimo de corpo:** 15px (`body.m`). Nunca abaixo disso para texto contínuo.
- **Foco em formulários:** estado de foco SEMPRE visível com `accent` em altura de 2px. Nunca remover outline.
- **Cor não é único portador de informação:** estados de erro, sucesso, aviso usam ícone outline + label de texto, nunca só cor.
- **Animações:** respeitam `prefers-reduced-motion`. Sem parallax, sem scroll-jacking, sem animações decorativas além de fade-in suaves <800ms.

---

## 11. Estados de erro, sucesso e atenção

Sistema deliberadamente **não tem cor vermelha vibrante nem verde de "sucesso"**. Usa neutros do próprio modo + texto explícito.

- **Erro:** texto em `accent` (que vira destaque, não pânico) + ícone outline (alerta), label "Erro." em Marcellus SC.
- **Sucesso:** texto em `accent` + ícone outline (check circle), label "Concluído." em Marcellus SC.
- **Atenção:** texto em `accent` + ícone outline (exclamação), label "Atenção." em Marcellus SC.

---

## 12. O que NÃO está no escopo deste spec

Os itens abaixo são reconhecidos como necessários ao projeto inteiro, mas terão specs próprios subsequentes:

- Layouts específicos da landing page e da página de upsell (HTML/CSS implementação).
- Estrutura de currículo do produto (5 módulos × 26 vídeo-aulas) e roteiro de cada aula.
- Roteiro completo da VSL (6-8 minutos) e do upsell video (2-3 minutos).
- Conteúdo dos PDFs (Guia de Compras, Planner 6 Dias, Receitas 15 Min).
- Configuração da plataforma de membros (Kiwify/Hotmart/Eduzz) e regra de tranca de 8 dias.
- Estratégia de tráfego (anúncios, segmentação, criativos específicos).
- Produção dos SVGs finais do logo (a partir das specs deste documento).

---

## 13. Próximos passos

Após aprovação deste spec:

1. Skill `writing-plans` cria o plano de implementação correspondente a este spec — provavelmente focado em produzir os artefatos canônicos: SVGs do logo, arquivo de tokens CSS, página de demonstração / styleguide HTML, e templates iniciais para cada modo.
2. Os subprojetos do funil (página de vendas, upsell, PDFs, etc.) entram em ordem definida pelo usuário, cada um herdando o sistema definido aqui.

---

## 14. Referências visuais externas (mood board)

Para qualquer dúvida de execução, este spec é orientado pelas seguintes marcas. Em caso de ambiguidade, decidir pelo que essas marcas fariam:

- **Patek Philippe** (heritage, gravura, atemporalidade)
- **Hermès Heritage** (cerimônia, papel, ouro discreto)
- **Augustinus Bader** (clínica de luxo, fundo escuro, ouro champanhe, ciência calorosa)
- **La Prairie** (skincare ultra-premium, embalagem prata/preto, luz cirúrgica)
- **Aman Resorts** (silêncio, parchment, fotografia editorial, slow living)
- **Loro Piana** (cashmere, beges, brancos, brown, caligrafia)
- **Aesop Lab** (apothecary moderna, frascos âmbar, tipografia limpa)
- **Goop print magazine** (editorial, foto-driven, sem barulho visual)
