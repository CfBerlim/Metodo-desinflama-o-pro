# Landing Page com VSL — Método Desinflamação Pro

**Data:** 2026-05-07
**Status:** Aprovado para implementação
**Escopo:** Página principal de vendas (HTML/CSS/JS estático) com VSL embedded e mecânica de revelação time-locked. Inclui hero imersivo, detector de timestamp da VSL via Vimeo Player API, 5 seções de conversão below-fold reveladas aos 4:00, e integração com checkout externo. NÃO inclui: a produção do vídeo VSL em si, hospedagem da página em si (deploy é separado), checkout/order-bump (esses ficam na plataforma Kiwify/Hotmart).

**Spec-pai:** `docs/superpowers/specs/2026-05-07-identidade-visual-bio-premium-design.md` (modo Apothecary aplicado)

---

## 1. A "Big Idea" da página

A página tem **dois estados visuais distintos**, separados por um instante exato:

| Estado | Período | Modo |
|---|---|---|
| **Imersão** | 00:00 → 03:59 do vídeo | VSL puro. Tela escura com luz cênica gold (Apothecary). Apenas manchete + subtítulo + player. Zero distração. |
| **Pitch** | 04:00 em diante | Página de conversão clássica. As 5 seções strategicas materializam-se abaixo do player com fade-in encadeado. |

**Por que isso funciona:** durante a fase de imersão, nada compete com o vídeo. Quando a oferta é revelada NO vídeo, a página inteira espelha essa revelação visualmente — o cliente vê a transição de "consultoria de elite" para "isso aqui pode ser meu". É um momento cinematográfico, não um botão escondido.

A revelação NÃO é um truque. É a sincronização entre o argumento da VSL e a aparição da prova material: módulos, bônus, garantia, preço.

---

## 2. Arquitetura técnica

**Stack:** HTML5 + CSS3 (custom properties via `tokens.css`) + Vanilla JS + Vimeo Player SDK. Sem framework, sem build, sem npm. Um único arquivo `index.html` (com CSS inline ou linkando `tokens.css` + um CSS próprio da página).

**Hospedagem do vídeo:** **Vimeo Pro**. Razões:
- Player elegante, esconde chrome (sem título, sem sugestões, sem watermark Vimeo).
- Vimeo Player SDK expõe `getCurrentTime()` e evento `timeupdate` confiáveis.
- Suporta privacidade (`hide controls`, `domain restriction`, `unlisted`).
- Custo previsível (~R$100-300/mês) sem surpresas de bandwidth.
- "Padrão silent-luxury" pra VSL — Wistia também serve mas custa 5×.

**Hospedagem da página:** OUT OF SCOPE deste spec. Sugestão: Cloudflare Pages, Netlify, ou Vercel — todos free tier suficientes pra MVP. Domínio próprio na Registro.br/Hostinger.

**Diretório do projeto:** `landing/` (irmão de `identity/` na raiz do repo).

```
landing/
├── index.html              # Página principal (single-file delivery)
├── style.css               # CSS específico da landing (importa identity/tokens.css)
├── reveal.js               # Lógica do detector de 4:00 + animação de reveal
├── tracking.js             # Pixels Meta + Google Tag Manager (placeholders)
└── assets/
    ├── poster.jpg          # Frame de poster do VSL (gerado via nano-banana2)
    ├── module-icons/       # 5 SVGs (1 por módulo) — outline simples
    ├── pdf-mockups/        # 3 PDFs renderizados em mockup (gerado via nano-banana2)
    └── og-image.jpg        # Open Graph 1200×630 (gerado via nano-banana2)
```

A landing **importa** `../identity/tokens.css` e **referencia** os SVGs em `../identity/logo/` por path relativo. Não duplica nada do sistema de design.

---

## 3. Estados da página (em detalhe)

### 3.1 Estado Imersão (0:00 → 3:59)

**O que é visível:**

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ◯ M  Desinflamação                                │
│       (top bar minimalista, hairline gold no topo) │
│                                                     │
│                                                     │
│        PARA QUEM CANSOU DE DIETAS                   │
│                                                     │
│        Como "desligar" o interruptor                │
│        da inflamação celular que está               │
│        travando seu emagrecimento.                  │
│                                                     │
│        — método cientificamente comprovado          │
│        para limpar seu organismo em 21 dias —       │
│                                                     │
│        ┌─────────────────────────────────┐         │
│        │                                 │         │
│        │     [ ► PLAYER VIMEO ]          │         │
│        │     (gold halo glow)            │         │
│        │                                 │         │
│        └─────────────────────────────────┘         │
│                                                     │
│        — O acesso ao Método é revelado              │
│           aos 4 minutos do vídeo —                  │
│                                                     │
│  (hairline gold sutil na base)                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**O que NÃO é visível:**
- Nav bar com menu (não há menu)
- Footer com links institucionais
- Sidebar
- Pop-ups, banners, exit-intent
- Qualquer botão de compra
- Seções de conversão (módulos, bônus, garantia, oferta)

**Background:** `var(--bg-stage)` do modo Apothecary — gradient cinematográfico multi-camada (gold central + emerald inferior-esquerda + acento gold superior-direito + base warm vertical).

**Hero copy** (rascunho — pode ser ajustado pelo copywriter, mas mantém estrutura):

- **Eyebrow** (Marcellus SC, 11px, gold): `PARA QUEM CANSOU DE DIETAS`
- **Manchete** (Italiana, 56-72px responsivo, ivory): `Como desligar o interruptor da inflamação celular que está travando seu emagrecimento.`
- **Subtítulo italic** (Cormorant Garamond italic, 20-22px, ivory muted): `O método cientificamente comprovado para limpar seu organismo em 21 dias — sem dietas de fome, sem remédios, sem academia.`
- **Lock note** (Cormorant italic, 13px, gold opacidade 0.78): `— O acesso ao Método é revelado aos 4 minutos do vídeo —`

A lock note **some** quando o reveal acontece.

### 3.2 Estado Pitch (4:00 →)

**O que muda:**

1. A `lock-note` desaparece (`opacity: 0` com transição de 400ms).
2. As 5 seções materializam-se abaixo do hero, com fade-in + slide-up encadeados (cada uma com 200ms de stagger entre elas).
3. A página agora é scrollável fluida — o usuário pode descer e ver o stack de oferta.
4. A primeira CTA aparece logo abaixo das seções.
5. (Opcional) Sticky button na base da viewport mobile só aparece após o reveal.

**O que NÃO muda:**
- O hero permanece intacto. Manchete, subtítulo, player continuam ali.
- O background do hero continua na atmosfera Apothecary cinematográfica.
- Nada é adicionado ao topo. Tudo desce.

---

## 4. As 5 seções below-fold

Ordem importa. Cada seção tem ~480-640px de altura, com margens generosas entre elas (`var(--space-xxl)` = 64px ou `var(--space-xxxl)` = 96px).

### Seção I · Os 5 Módulos do Método

**Eyebrow:** `O QUE VOCÊ VAI APRENDER`
**Headline:** `Cinco módulos para desligar o incêndio.` (Italiana, 48px)
**Subtítulo:** `Vinte e seis aulas curtas, em vídeo, com locução cinematográfica.` (Cormorant italic, 20px)

**Layout:** Grid 5 colunas (desktop), 2 colunas (tablet), 1 coluna (mobile). Cada card tem:

```
┌──────────────────────┐
│  I                   │  ← numeral romano em italic gold gigante (Italiana 64px)
│                      │
│  O Mecanismo         │  ← título do módulo (Italiana 22px ivory)
│                      │
│  ○                   │  ← ícone outline 1px gold (16px)
│                      │
│  Por que dietas      │
│  falham. A biologia  │  ← descrição (Inter Light 14px muted)
│  da inflamação       │
│  celular.            │
│                      │
│  4 aulas             │  ← meta (Marcellus SC 9px gold)
└──────────────────────┘
```

**Os 5 módulos** (rascunhos finais ficam em outro spec, do produto):
1. **I · O Mecanismo** — biologia da inflamação celular (4 aulas)
2. **II · O Reset (Desafio 6 Dias)** — protocolo prático de adição (6 aulas, vitória rápida)
3. **III · A Cozinha de Poder** — receitas e compras estratégicas (5 aulas)
4. **IV · O Estilo de Vida Anti-inflamatório** — sono, stress, exposição solar (5 aulas)
5. **V · A Manutenção Vitalícia** — protocolo de longo prazo, ajustes para fases da vida (6 aulas)

Card tem hover sutil — border-color passa de `accent-muted` pra `accent` (não escala, sem sombra extra além do `--ambient-glow` já presente).

### Seção II · Os 3 Bônus Inclusos (PDFs)

**Eyebrow:** `BÔNUS INCLUSOS NO MÉTODO`
**Headline:** `Três manuais para tornar tudo prático.` (Italiana, 48px)

**Layout:** 3 colunas (desktop), 1 coluna (mobile). Cada card mostra mockup do PDF (gerado via nano-banana2 com prompt "luxury hardcover book mockup, dark backdrop, gold foil title, editorial photography lighting, single source") + título + descrição curta.

```
┌────────────────────┐
│   ┌──────────┐     │
│   │ [MOCKUP] │     │  ← mockup do PDF (raster, gerado nano-banana2)
│   │   PDF    │     │
│   └──────────┘     │
│                    │
│   I · GUIA DE      │  ← Marcellus SC 11px gold (eyebrow)
│       COMPRAS      │
│   SEM ERRO         │  ← Italiana 22px ivory (título)
│                    │
│   A lista exata    │
│   de 47 ingre-     │  ← Inter Light 14px muted
│   dientes anti-    │
│   inflamatórios    │
│   da feira.        │
│                    │
│   PDF · 32 páginas │  ← Marcellus SC 9px gold muted (meta)
└────────────────────┘
```

**Os 3 bônus:**
1. **I · Guia de Compras Sem Erro** — 47 ingredientes anti-inflamatórios da feira, com preços médios e onde encontrar (32 páginas).
2. **II · Planner do Desafio 6 Dias** — checklist diário do reset, com receitas e refeições já planejadas (24 páginas).
3. **III · Receitas 15 Minutos de Poder** — 30 receitas anti-inflamatórias, todas em <15 min de preparo (48 páginas).

Sem hover scale. Discreto.

### Seção III · A Garantia

**Eyebrow:** `GARANTIA INCONDICIONAL`
**Headline:** `Sete dias para sentir. Zero risco.` (Italiana, 48px)

**Layout:** Centralizado, `max-width: 720px`. Layout horizontal:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   ╭─────╮                                       │
│   │  M  │     Você tem 7 dias completos para    │
│   │ EST │     experimentar o método. Se em      │
│   │MMXVI│     qualquer momento dentro desse     │
│   ╰─────╯     período sentir que não é pra      │
│   (selo       você, basta um e-mail e devol-    │
│    monograma) vemos 100% do investimento. Sem   │
│               perguntas, sem fricção.           │
│                                                 │
│               7 DIAS · GARANTIA · INCONDICIONAL │ ← Marcellus SC small caps gold
└─────────────────────────────────────────────────┘
```

Selo é o `monogram-seal.svg` em tamanho 120px. Texto à direita em Cormorant italic 18px ivory muted. Hairline gold acima e abaixo do bloco.

### Seção IV · Stack de Oferta (apresentação de valor + preço ancorado)

**Eyebrow:** `O INVESTIMENTO`
**Headline:** `Tudo que está incluso.` (Italiana, 48px)

**Layout:** Card centralizado, `max-width: 600px`. **Apresentação pura do valor** — sem botão. O CTA fica isolado na Seção V seguinte, ganhando seu próprio momento.

```
┌───────────────────────────────────────────────┐
│                                               │
│   ─ O QUE VOCÊ RECEBE ─                       │
│                                               │
│   Método Desinflamação Pro                    │
│   (5 módulos · 26 aulas)         R$  897 ─    │
│                                               │
│   Bônus I · Guia de Compras       R$  97 ─    │
│   Bônus II · Planner 6 Dias       R$  47 ─    │
│   Bônus III · Receitas 15 min     R$  77 ─    │
│                                               │
│   ────────────────────────────────────        │
│                                               │
│   Valor real do pacote          R$ 1.118     │  ← preço riscado pequeno
│                                               │
│                                               │
│   ┌──────────────────────────────────────┐    │
│   │                                      │    │
│   │     Hoje, com o lançamento:          │    │  ← Cormorant italic 16px gold
│   │                                      │    │
│   │       12× R$ 19,70                   │    │  ← Italiana 56px ivory
│   │     ou R$ 197 à vista                │    │  ← Marcellus SC 14px gold
│   │                                      │    │
│   └──────────────────────────────────────┘    │
│                                               │
└───────────────────────────────────────────────┘
```

**Notas de implementação:**
- Os valores dos itens individuais (R$ 897, R$ 97, R$ 47, R$ 77) são **ancoragens** — não são preços reais cobráveis separadamente. Apenas inflam a percepção de valor antes da revelação do preço real (R$ 197).
- "Hoje, com o lançamento" pode ser substituído por "Para esta turma" se a estratégia for evergreen.
- O preço final é mostrado em destaque visual máximo: Italiana 56px (a mesma fonte da manchete principal — sinal de gravitas), centralizado, com glow gold sutil via `--ambient-text-glow`.
- **Sem CTA aqui.** O olho do usuário sai daqui já sabendo o número. O próximo elemento na página é o botão.

### Seção V · CTA Principal (momento da conversão)

**Layout:** Standalone, full-width centralizado, com ar máximo. O botão é o único objeto interativo visível. Sem competição.

```
                                                       
                                                       
                                                       
                Última oportunidade                    ← Cormorant italic 22px gold
                                                       
                                                       
       ┌────────────────────────────────────────┐      
       │                                        │      
       │   QUERO ACESSAR O MÉTODO     →         │      ← btn-primary-xl
       │                                        │      ← font Marcellus SC 14px ls 0.32em
       │                                        │      ← padding 28px / 80px
       │                                        │      ← bg accent (#C9A876)
       │                                        │      ← color carbon (#07100C)
       │                                        │      ← border-radius 2px
       │                                        │      ← box-shadow ambient-glow forte
       └────────────────────────────────────────┘      
                                                       
                                                       
       ◯  Compra 100% segura · Acesso imediato         ← Marcellus SC 10px gold opacity 0.7
       ◯  Garantia incondicional 7 dias                
                                                       
                                                       
                                                       
```

- Padding vertical da seção: `var(--space-xxxl)` (96px) acima e abaixo, pra dar respiro de teatro.
- Botão `btn-primary-xl` é uma variante do `.btn-primary` do design system, mas com padding aumentado, font-size 14px (vs. 12px), e box-shadow `--ambient-glow` mais intenso (`0 0 80px rgba(201, 168, 118, 0.20)`) — o botão "irradia" no escuro.
- Hover: brightness 1.08 + box-shadow expand (`0 0 100px rgba(201, 168, 118, 0.30)`).
- Microcopy abaixo (`Compra 100% segura ...`) usa pequenos círculos outline gold como bullets (do mesmo estilo do play-circle).
- O `<a>` tem `href="{{KIWIFY_CHECKOUT_URL}}"` (variável substituída antes de deploy).
- Tracking: `onclick` dispara `fbq('track', 'InitiateCheckout')` e `dataLayer.push({event: 'cta_click'})`.

### Footer minimal

Após a Seção V, antes do `</body>`, um footer discreto que NÃO é seção contada (é só rodapé administrativo):

```
                                                    
                                                    
            [logo monograma 32px gold]              
                                                    
        MÉTODO DESINFLAMAÇÃO · PRO · MMXXVI         ← Marcellus SC 9px gold opacity 0.5
                                                    
        Suporte: contato@desinflamacao.com.br       ← Inter Light 12px ivory opacity 0.4
        Política de Privacidade · Termos de Uso     ← links Inter Light 11px gold opacity 0.5
                                                    
                                                    
```

- Sem disclaimer médico-legal massivo (que destrói o premium). Apenas 3 linhas de info essencial.
- Background do footer: `var(--bg-deep)` do modo Apothecary (carbon mais profundo).
- Hairline gold sutil no topo do footer separando da Seção V.

---

## 5. Mecânica do Reveal (lógica JS)

### 5.1 Setup Vimeo Player

```html
<!-- HTML -->
<div id="vsl-player">
  <iframe
    src="https://player.vimeo.com/video/{{VIDEO_ID}}?title=0&byline=0&portrait=0&badge=0&color=C9A876&autopause=0&dnt=1"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen></iframe>
</div>

<script src="https://player.vimeo.com/api/player.js"></script>
```

### 5.2 Lógica do Time-Lock (`reveal.js`)

```js
const REVEAL_THRESHOLD_SECONDS = 240;  // 4:00

(function() {
  const iframe = document.querySelector('#vsl-player iframe');
  if (!iframe || typeof Vimeo === 'undefined') return;

  const player = new Vimeo.Player(iframe);
  let revealed = false;

  function reveal() {
    if (revealed) return;
    revealed = true;

    document.body.classList.add('revealed');
    // CSS faz o resto: classes .revealed mostram seções com animação encadeada

    // Tracking
    if (window.fbq) fbq('trackCustom', 'VSLReveal');
    if (window.dataLayer) window.dataLayer.push({ event: 'vsl_reveal' });

    // Scroll suave até o início das seções (após 800ms pra dar tempo da animação)
    setTimeout(() => {
      const target = document.querySelector('#below-fold');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  }

  player.on('timeupdate', (data) => {
    if (data.seconds >= REVEAL_THRESHOLD_SECONDS) {
      reveal();
    }
  });

  // Se o usuário deu seek manual pra além do limite, ainda revela
  player.on('seeked', (data) => {
    if (data.seconds >= REVEAL_THRESHOLD_SECONDS) {
      reveal();
    }
  });

  // Modo dev: ?reveal=true na URL força reveal imediato
  if (new URLSearchParams(location.search).has('reveal')) {
    reveal();
  }
})();
```

### 5.3 CSS do Reveal

As seções below-fold ficam **renderizadas no DOM** desde o load (importante para SEO e acessibilidade), mas escondidas via `opacity: 0; visibility: hidden; transform: translateY(40px)`. Quando `body.revealed` é adicionado, elas se materializam em sequência:

```css
#below-fold {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

body.revealed #below-fold {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 600ms ease-out;
}

#below-fold > section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1),
              transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

body.revealed #below-fold > section:nth-child(1) { transition-delay: 200ms; opacity: 1; transform: translateY(0); }
body.revealed #below-fold > section:nth-child(2) { transition-delay: 400ms; opacity: 1; transform: translateY(0); }
body.revealed #below-fold > section:nth-child(3) { transition-delay: 600ms; opacity: 1; transform: translateY(0); }
body.revealed #below-fold > section:nth-child(4) { transition-delay: 800ms; opacity: 1; transform: translateY(0); }
body.revealed #below-fold > section:nth-child(5) { transition-delay: 1000ms; opacity: 1; transform: translateY(0); }

.lock-note {
  transition: opacity 400ms ease-out;
}
body.revealed .lock-note { opacity: 0; pointer-events: none; }
```

**`prefers-reduced-motion`:** se ativo, remove `translateY` e usa apenas opacity (acessibilidade).

### 5.4 Fallback se JS falhar

Se o Vimeo SDK não carregar ou JS estiver desabilitado: aplicar `body.revealed` automaticamente após 6 minutos via `<noscript>` redirect ou via setTimeout no próprio `reveal.js` como fallback final. **Nunca deixar o cliente preso sem botão de compra.**

```js
// Fallback de emergência: se algo der errado, garantir reveal após 6 min
setTimeout(reveal, 360_000);
```

---

## 6. Tracking e Analytics

### 6.1 Eventos a disparar

| Evento | Quando | Provider |
|---|---|---|
| `PageView` | DOMContentLoaded | Meta Pixel + GTM |
| `VSLPlayed` | Primeiro `play` do Vimeo | Meta `trackCustom`, GTM `vsl_played` |
| `VSL25` `VSL50` `VSL75` `VSL95` | aos 25/50/75/95% do vídeo | Custom events (medem retenção) |
| `VSLReveal` | quando o reveal aos 4:00 dispara | Custom — momento de qualificação |
| `CTAClick` | clique em qualquer btn-primary-xl | Meta `InitiateCheckout` event padrão |
| `ScrollDepth25/50/75/100` | quartis de scroll | GTM nativo |

### 6.2 Implementação

`tracking.js` carrega Meta Pixel e GTM. Variáveis no topo:

```js
// AJUSTAR ANTES DE DEPLOY:
const META_PIXEL_ID = 'XXXXXXXXXXXX';      // Pixel ID da Meta
const GTM_CONTAINER_ID = 'GTM-XXXXXXX';    // Container ID do Google Tag Manager
const KIWIFY_CHECKOUT_URL = 'https://pay.kiwify.com.br/XXXXX';
```

Esses placeholders **DEVEM** ser substituídos antes de deploy. O spec marca explicitamente como "configurar antes de produção".

### 6.3 Privacidade / LGPD

- Banner sutil de cookies no rodapé que aparece apenas no primeiro acesso (não o monstro de 200px que destrói a estética).
- Texto: `Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa Política de Privacidade.` + [OK] em ghost button gold.
- Localizado no canto inferior esquerdo, max 380px de largura, alinhado com a estética Apothecary.

---

## 7. Performance

**Targets:**
- LCP < 2.5s em 4G
- TTI < 4s
- Tamanho total HTML+CSS+JS < 80KB (gzipped). Excl. fontes Google e player Vimeo (carregados via CDN).
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90.

**Otimizações:**
- Fontes Google: `preconnect` + `display=swap`. Carregar apenas pesos que a página usa (não todos os 6 do plano).
- Vimeo Player SDK: `defer`, carregar só após `DOMContentLoaded`.
- Imagens (poster, mockups, og-image): WebP com fallback JPEG. `loading="lazy"` em todas exceto a hero.
- CSS crítico inline no `<head>` (apenas o necessário pro hero render no first paint). Resto do CSS via `<link>` com `media="print" onload="this.media='all'"` (pattern de async CSS).
- Sem libraries pesadas: nenhum jQuery, nenhum framework. Vanilla JS apenas.

---

## 8. Acessibilidade

- `lang="pt-BR"` no `<html>`.
- Hierarquia de heads: `<h1>` na manchete principal (uma só), `<h2>` em cada section title, `<h3>` em sub-títulos.
- Hero/manchete antes do hero é `<h1>`, mesmo que visualmente o player venha antes.
- Vimeo player: legendas (CC) habilitadas no upload do vídeo.
- Lock-note tem `aria-live="polite"` (avisa screen reader quando a state muda).
- Quando reveal acontece, foco é trazido pra primeira section: `document.querySelector('#below-fold').focus()` (com `tabindex="-1"` no container).
- Contraste: text.primary (`#EFE7D2`) sobre `#07100C` = 15.65:1 (AAA).
- Botão CTA: contraste do gold (`#C9A876`) sobre carbon = 8.59:1 (AAA).
- `prefers-reduced-motion: reduce` desabilita translate na animação de reveal.

---

## 9. Mobile / Responsivo

**Breakpoints:**
- < 600px: 1 coluna em todos os grids. Hero full-bleed. Padding lateral reduz pra 24px. Manchete escala pra 32-40px.
- 600-1024px: 2-3 colunas em grids. Padding 32px.
- > 1024px: layout completo conforme mockups.

**Considerações específicas mobile:**
- VSL player respeita `aspect-ratio: 16/9` em todas as larguras.
- Player tem **autoplay com som mutado por padrão** (compliance com policies do iOS Safari) e overlay grande "TOQUE PARA ATIVAR ÁUDIO" antes do primeiro play. Desaparece ao primeiro touch.
- Sticky CTA na base após reveal (apenas mobile, < 768px). Background gradient fade para garantir legibilidade. Z-index alto, padding generoso, mesmo botão visualmente do CTA principal.
- Hero não tem altura mínima `100vh` em mobile (causa scroll quirks com nav bars dinâmicas). Usa `min-height: max(640px, 90svh)` (small viewport units).

---

## 10. Copy: o que tá no spec vs. o que fica fluido

**No spec (estrutura fixa):**
- Eyebrows
- Lock-note
- Labels de meta (PDF · 32 páginas, 4 aulas, etc.)
- Disclaimer footer

**Fluido (substituível pelo copywriter sem mexer em código):**
- Manchete principal
- Subtítulo italic
- Headlines de cada section
- Descrições dos módulos e bônus
- Texto da garantia
- Valores ancorados e preço final

Os textos fluidos ficam em variáveis JS no topo de uma `content.js` (ou diretamente no HTML — escolha de implementação). **Não devem virar uma camada de i18n** — YAGNI. PT-BR direto no HTML, copywriter edita o arquivo HTML.

Rascunho inicial dos textos vem de `doc/1-venda.md` (Manchete, Gancho, Mecanismo, Oferta, CTA).

---

## 11. SEO (mínimo viável)

- `<title>`: `Método Desinflamação Pro · Como Desligar a Inflamação Celular em 21 Dias`
- `<meta name="description">`: 150-160 chars, foca em "inflamação celular crônica" + "21 dias" + "sem dietas"
- Open Graph: `og:title`, `og:description`, `og:image` (1200×630 gerado via nano-banana2), `og:type=website`
- Twitter Card: summary_large_image
- Schema.org: `Product` com `Offer` (preço, currency BRL), `aggregateRating` opcional se houver social proof real
- Canonical URL apontando pra própria página

---

## 12. Estados de erro

- **Vimeo iframe falha:** mostrar mensagem fallback elegante: "Estamos com instabilidade no player. Por favor recarregue a página ou volte em alguns minutos." Em Apothecary mode com selo monograma. Sem stack trace, sem 500 page genérica.
- **JS desabilitado:** seções below-fold ficam visíveis (sem fade-in), e o lock-note muda para "Acesso completo abaixo". Página continua funcional. (`<noscript>` block.)
- **Conexão lenta (LCP > 4s):** loading spinner fininho gold no center-stage. Sem texto. Apenas linha que pulsa.

---

## 13. O que NÃO está no escopo deste spec

- **Produção do vídeo VSL** (script + roteiro + edição) — virá em spec próprio, possivelmente o próximo subprojeto.
- **Página de checkout** — fica na plataforma Kiwify/Hotmart. Apenas o link de redirect.
- **Order Bump da Xícara de Ouro** — fica na página de checkout da plataforma, não nesta landing.
- **Página de upsell** (Clube Vida Leve) — outro subprojeto.
- **Área de membros** — outro subprojeto.
- **Configuração da plataforma de membros (Kiwify/Hotmart)** — outro subprojeto.
- **Geração das imagens de poster/og/mockups** — task dentro do plano de implementação, mas a produção das imagens é via `nano-banana2/` e pode ser delegada.
- **A/B testing infrastructure** — YAGNI no v1; instrumentação básica via Meta + GTM cobre v1.
- **Localização** — PT-BR only.

---

## 14. Critérios de aceitação (v1)

A landing page é considerada pronta para v1 quando:

1. ✅ Modo Apothecary aplicado completo (atmosfera cinematográfica do `--bg-stage`).
2. ✅ Hero com manchete + subtítulo + Vimeo player + lock-note renderizam corretamente em desktop e mobile.
3. ✅ Antes de 4:00 do vídeo, NENHUMA seção below-fold é visível ou acessível via scroll.
4. ✅ Aos exatos 4:00 do vídeo, lock-note fade-out + below-fold reveal com stagger encadeado funcionam.
5. ✅ As 5 seções renderizam com conteúdo de placeholder coerente (módulos numerados I-V, 3 PDFs com mockups, garantia, stack de oferta com R$ 197 placeholder, CTA).
6. ✅ Todos os botões CTA redirecionam pra `KIWIFY_CHECKOUT_URL` (placeholder).
7. ✅ Tracking script carrega sem console errors. Eventos `PageView`, `VSLPlayed`, `VSLReveal`, `CTAClick` disparam corretamente (verificado via Meta Pixel Helper + GTM debug).
8. ✅ Modo dev `?reveal=true` força reveal imediato (pra testar o estado pitch sem precisar esperar 4 min).
9. ✅ Lighthouse: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 85, Best Practices ≥ 90.
10. ✅ `prefers-reduced-motion` respeitado.
11. ✅ Mobile: hero full-bleed, sticky CTA aparece após reveal, sem scroll quirks.
12. ✅ Vimeo Player ID é variável (não hardcoded), assim como pixel IDs e checkout URL.

---

## 15. Próximos passos

Após aprovação deste spec:

1. Skill `writing-plans` cria o plano de implementação task-por-task.
2. Implementação cobre: estrutura HTML, CSS específico da landing, lógica JS do reveal, tracking, geração das imagens via nano-banana2 (poster do VSL, mockups dos PDFs, og:image), configuração das variáveis (pixel IDs, vimeo ID, checkout URL), checklist de QA cross-browser e mobile.
3. Deploy da landing — fora do escopo deste spec, mas deve seguir junto (Cloudflare Pages free tier ou Vercel).
4. Próximo subprojeto possível: **roteiro completo da VSL** (script de 6-8min com storyboard de cenas faceless), porque a landing sem o vídeo não vende. Ou: **estruturação do produto** (definir os 5 módulos × 26 aulas em detalhe, gerar conteúdo dos PDFs).
