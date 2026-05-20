# Checklist Kiwify Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produzir o documento `docs/checklist-kiwify-hotmart.md` — guia executivo de configuração da Kiwify do zero ao go-live, em 11 fases lineares, com goal/pré-req/steps/verificação/pitfalls por fase.

**Architecture:** Documento markdown único, ~1500-2500 linhas, escrito incrementalmente (1 fase por commit). Cada commit produz um chunk autocontido e committable. Ao final, doc tem TOC navegável, warning de go-live destacado, e lista consolidada de placeholders.

**Tech Stack:** Markdown puro. Sem build, sem framework. Visualizável em qualquer editor com preview ou no GitHub/GitLab.

**Spec de referência:** `docs/superpowers/specs/2026-05-07-checklist-kiwify-hotmart-design.md`

---

## File Structure

```
docs/
├── checklist-kiwify-hotmart.md         # ← deliverable (este plano produz)
├── superpowers/
│   ├── specs/2026-05-07-checklist-kiwify-hotmart-design.md
│   └── plans/2026-05-07-checklist-kiwify-implementation.md  # ← este arquivo
```

Total: 1 arquivo a criar. Plano cobre 14 tasks (1 setup + 11 fases + 1 consolidação + 1 tag).

---

## Phase 1 — Setup

### Task 1: Criar `docs/checklist-kiwify-hotmart.md` com header, TOC, warning de go-live e intro

**Files:**
- Create: `docs/checklist-kiwify-hotmart.md`

- [ ] **Step 1: Criar o arquivo com conteúdo inicial**

```markdown
# Checklist Kiwify — Configuração End-to-End do Funil

> **Quem usa este checklist:** Rafael, dono do projeto, executando o go-live do Método Desinflamação Pro.
> **Pré-requisito:** Conta Kiwify já verificada (KYC completo) + domínio próprio comprado.
> **Tempo total estimado:** ~5h30 em 1-2 sessões focadas.

---

## ⚠ Warning crítico de go-live

**NÃO publique o funil até pelo menos os Módulos I + II terem vídeo-aulas reais carregadas.**

Cliente que comprar e abrir a área de membros vazia gera reembolso garantido — e queima a confiança da marca, que é o ativo mais caro do projeto Bio-Premium. Se você ainda não tem aulas produzidas, configure todo o funil até a Fase IX, mas mantenha o produto em modo **rascunho** (Kiwify > Produto > Status: Rascunho) até ter pelo menos os Módulos I e II prontos.

---

## Sumário

1. [Fase I — Setup do produto principal](#fase-i--setup-do-produto-principal)
2. [Fase II — Order Bump (Xícara de Ouro)](#fase-ii--order-bump-xícara-de-ouro)
3. [Fase III — Cadastro do produto upsell (Clube Vida Leve)](#fase-iii--cadastro-do-produto-upsell-clube-vida-leve)
4. [Fase IV — Página de redirect pós-checkout](#fase-iv--página-de-redirect-pós-checkout)
5. [Fase V — Hospedagem das páginas (Cloudflare Pages)](#fase-v--hospedagem-das-páginas-cloudflare-pages)
6. [Fase VI — Domínio próprio + DNS](#fase-vi--domínio-próprio--dns)
7. [Fase VII — Pixel Meta + GTM](#fase-vii--pixel-meta--gtm)
8. [Fase VIII — Webhook server-side (Meta CAPI)](#fase-viii--webhook-server-side-meta-capi)
9. [Fase IX — Área de membros + tranca de 8 dias](#fase-ix--área-de-membros--tranca-de-8-dias)
10. [Fase X — Substituição dos placeholders no código](#fase-x--substituição-dos-placeholders-no-código)
11. [Fase XI — Smoke test end-to-end](#fase-xi--smoke-test-end-to-end)
12. [Lista consolidada de placeholders](#lista-consolidada-de-placeholders)
13. [Anexos](#anexos)

---

## Como ler este documento

Cada fase tem cinco partes fixas:

- **Goal:** o que essa fase produz funcionalmente quando concluída
- **Pré-requisitos:** fases anteriores ou info que precisa estar à mão antes de começar
- **Tempo estimado:** referência de quanto vai levar (assumindo execução focada)
- **Steps numerados:** ações sequenciais, copy-pastáveis
- **Verificação ✓:** como confirmar que a fase ficou OK antes de avançar
- **Common pitfalls ⚠:** erros frequentes e como evitar

Execute na ordem. Pode parar entre fases sem deixar nada quebrado pela metade.

---

(As 11 fases são adicionadas em tasks subsequentes 2-12)
```

- [ ] **Step 2: Verificar criação do arquivo**

```bash
wc -l docs/checklist-kiwify-hotmart.md
```

Expected: ~50 linhas (header + warning + TOC + intro).

- [ ] **Step 3: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): setup inicial - header + TOC 11 fases + warning de go-live"
```

---

## Phase 2 — As 11 fases

> **Padrão de cada task 2-12:** appendar uma seção da fase ao arquivo, seguindo o template definido no spec (seção 3). Conteúdo de cada fase vem da seção 4 do spec (`docs/superpowers/specs/2026-05-07-checklist-kiwify-hotmart-design.md`).
>
> **Estrutura padrão de cada seção:**
> ```markdown
> ## Fase N — [Nome]
>
> **Goal:** ...
> **Pré-requisitos:** ...
> **Tempo estimado:** ...
>
> ### Steps
> 1. **[Ação 1]** ... [URL] ... [campo a preencher]
> 2. **[Ação 2]** ...
>
> ### Verificação ✓
> ...
>
> ### Common pitfalls ⚠
> - ⚠ ...
> ```

### Task 2: Fase I — Setup do produto principal

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase I**

Appendar ao final do arquivo (substitui o comentário "(As 11 fases são adicionadas em tasks subsequentes 2-12)") com seção completa cobrindo:

- **Goal:** Produto "Protocolo Destrave Celular" cadastrado na Kiwify, com URL de checkout pública pronta para uso
- **Pré-req:** Conta Kiwify verificada
- **Tempo:** 30 min
- **Steps detalhados (8-10 steps):**
  1. Acessar `kiwify.com.br/produtos/novo`
  2. Tipo de produto: "Curso digital"
  3. Nome: `Método Desinflamação Pro`
  4. Descrição curta (140 chars): copy fornecido
  5. Descrição longa (~500 chars): copy fornecido (puxar do spec)
  6. Preço à vista: R$ 197
  7. Parcelamento: até 12× sem juros pro cliente (12× R$ 19,70)
  8. Política de reembolso: 7 dias incondicional
  9. Conta de recebimento: confirmar a já cadastrada
  10. Salvar como rascunho (não ativar ainda — vai ativar só após Fase IX)
- **Verificação ✓:** URL `pay.kiwify.com.br/<id>` gerada e visualizável (mesmo em rascunho dá pra ver preview)
- **Common pitfalls ⚠:**
  - Confundir "preço à vista" com "preço com desconto" — usar campos certos
  - Esquecer de marcar "sem juros pro cliente" no parcelamento — cobra cliente errado
  - Salvar como ativo antes de ter aulas produzidas → publicação prematura

- [ ] **Step 2: Verificação de estrutura**

```bash
grep -c "## Fase I" docs/checklist-kiwify-hotmart.md
```

Expected: 1 ocorrência.

```bash
grep -c "### Verificação ✓" docs/checklist-kiwify-hotmart.md
```

Expected: 1 ocorrência (a partir desta fase, vai aumentando uma por commit).

- [ ] **Step 3: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase I - setup do produto principal Kiwify"
```

---

### Task 3: Fase II — Order Bump (Xícara de Ouro)

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase II**

Conteúdo cobrindo:

- **Goal:** "Xícara de Ouro: 15 Blends de Chás Termogênicos" aparecendo no checkout do produto principal como toggle de aceite, R$ 27,90
- **Pré-req:** Fase I concluída
- **Tempo:** 20 min
- **Steps detalhados:**
  1. Acessar `kiwify.com.br/order-bumps` (ou Produtos > Order Bumps)
  2. Criar novo Order Bump
  3. Nome interno: `Xícara de Ouro - Chás Termogênicos`
  4. Texto exibido no checkout: copy completo (~140 chars) — fornecer texto pronto
  5. Preço: R$ 27,90
  6. Imagem de capa: gerar via nano-banana2 (prompt incluído neste step) → upload
  7. Vincular ao checkout do Método Desinflamação Pro (Fase I)
  8. Modo de exibição: toggle expandido por default, posicionado ABAIXO dos campos de cartão
  9. Salvar
- **Verificação ✓:** Abrir checkout em aba anônima → ver Order Bump aparecendo abaixo dos campos de pagamento
- **Common pitfalls ⚠:**
  - Order Bump posicionado ACIMA dos campos do cartão → vira distração, taxa de aceite cai 50%
  - Imagem genérica de banco de imagens → quebra estética Bio-Premium
  - Texto longo (>180 chars) → cliente não lê, taxa de aceite cai

- [ ] **Step 2: Verificar**

```bash
grep -c "## Fase II" docs/checklist-kiwify-hotmart.md
```

Expected: 1.

- [ ] **Step 3: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase II - Order Bump Xicara de Ouro"
```

---

### Task 4: Fase III — Cadastro do produto upsell (Clube Vida Leve)

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase III**

Conteúdo cobrindo:

- **Goal:** "Clube Vida Leve" cadastrado como produto separado, R$ 297, com 1-click upsell habilitado e linkado ao Protocolo Destrave Celular como produto-pai
- **Pré-req:** Fase I concluída
- **Tempo:** 25 min
- **Steps detalhados:**
  1. Kiwify > Produtos > Novo Produto
  2. Tipo: "Assinatura/Recorrência" OU "Curso digital com renovação opcional" (depende de como vai cobrar — anual único vs. mensal recorrente)
  3. Nome: `Clube Vida Leve - 365 Dias de Refeições Anti-inflamatórias`
  4. Descrição curta + longa (copy fornecido)
  5. Preço: R$ 297 à vista (ou 12× R$ 29,70)
  6. Garantia: 7 dias incondicional
  7. **Critical:** habilitar "1-click upsell" (Configurações de upsell > Permitir aceite com 1 clique)
  8. Definir produto-pai: Método Desinflamação Pro
  9. Coletar URLs geradas: `KIWIFY_ACCEPT_URL` (de aceite) e `KIWIFY_DECLINE_URL` (de recusa) — anotar pra Fase X
  10. Salvar como rascunho
- **Verificação ✓:** As duas URLs (accept/decline) aparecem na seção de URLs do produto. Anotar ambas no documento de placeholders.
- **Common pitfalls ⚠:**
  - Esquecer de habilitar 1-click upsell → cliente é forçado a digitar cartão de novo, taxa de aceite cai 80%+
  - Vincular produto-pai errado → upsell aparece pra cliente que comprou OUTRO produto
  - Definir como recorrência mensal sem clarificar no copy → cliente espera pagar uma vez

- [ ] **Step 2: Verificar**

```bash
grep -c "## Fase III" docs/checklist-kiwify-hotmart.md
```

Expected: 1.

- [ ] **Step 3: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase III - cadastro produto upsell Clube Vida Leve"
```

---

### Task 5: Fase IV — Página de redirect pós-checkout

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase IV**

Conteúdo cobrindo:

- **Goal:** Após pagamento aprovado do Protocolo Destrave Celular, Kiwify redireciona o cliente para `seudominio.com.br/upsell/`
- **Pré-req:** Fase I concluída + Fase III concluída + saber qual será o domínio (Fase VI)
- **Tempo:** 15 min
- **Steps detalhados:**
  1. Kiwify > Produtos > Protocolo Destrave Celular > Configurações de Checkout > Pós-compra
  2. Destino do redirect: "URL externa"
  3. URL: `https://seudominio.com.br/upsell/` (substituir pelo domínio real após Fase VI)
  4. Tempo de espera: 0 segundos (redirect imediato)
  5. Comportamento se pagamento falhar: voltar pra checkout com mensagem de erro
  6. Salvar
- **Verificação ✓:** Em aba anônima, fazer compra-teste com cartão de teste Kiwify (cartão sandbox `4111 1111 1111 1111`, CVV qualquer, validade futura) → confirmar redirect funciona
- **Common pitfalls ⚠:**
  - URL com http (não https) → browser bloqueia mixed-content, cliente vê erro
  - URL sem trailing slash quando o servidor exige → 404
  - Redirect pra área de membros direto (pulando upsell) → perde 30-50% de receita adicional

- [ ] **Step 2: Verificar**

```bash
grep -c "## Fase IV" docs/checklist-kiwify-hotmart.md
```

Expected: 1.

- [ ] **Step 3: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase IV - redirect pos-checkout para upsell"
```

---

### Task 6: Fase V — Hospedagem das páginas (Cloudflare Pages)

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase V**

Conteúdo cobrindo:

- **Goal:** Repositório git deployado em Cloudflare Pages, URL temporária `<projeto>.pages.dev` servindo `landing/`, `upsell/`, `pdfs/`, `identity/`. Deploy automático em cada `git push`.
- **Pré-req:** Repositório git já existe (já tem) + ter conta Cloudflare (criar se não tiver, free)
- **Tempo:** 30 min
- **Steps detalhados:**
  1. Criar conta em cloudflare.com (free tier ilimitado pra Pages)
  2. Acessar `pages.cloudflare.com` > Create a project > Connect to Git
  3. Conectar GitHub/GitLab onde está o repositório
  4. Selecionar repositório do projeto
  5. Build settings: **Framework preset:** None, **Build command:** vazio, **Build output directory:** `/` (raiz do repo)
  6. Variables/secrets: nenhuma necessária
  7. Save and deploy → aguardar build (geralmente <30s pra HTML estático)
  8. Verificar deploy: acessar `https://<projeto>.pages.dev/landing/index.html`
  9. Confirmar que TODOS os 4 diretórios servem: `landing/`, `upsell/`, `pdfs/`, `identity/`
- **Verificação ✓:** As URLs públicas funcionam:
  ```
  https://<projeto>.pages.dev/landing/index.html
  https://<projeto>.pages.dev/upsell/index.html
  https://<projeto>.pages.dev/pdfs/guia-compras.html
  https://<projeto>.pages.dev/identity/styleguide.html
  ```
- **Common pitfalls ⚠:**
  - Build output directory errado (deixar `dist/` ou `build/` quando não há build) → 404
  - Esquecer de subir os assets binários (jpg dos PDFs/poster) → imagens quebradas
  - `.gitignore` excluindo arquivos críticos (verificar antes do push)

- [ ] **Step 2: Verificar**

```bash
grep -c "## Fase V" docs/checklist-kiwify-hotmart.md
```

Expected: 1 (atenção: regex match com "Fase V" também pega "Fase VI" se não usar boundary — usar `## Fase V$` ou `## Fase V —` pra ser preciso).

```bash
grep -cE "^## Fase V " docs/checklist-kiwify-hotmart.md
```

Expected: 1.

- [ ] **Step 3: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase V - hospedagem Cloudflare Pages"
```

---

### Task 7: Fase VI — Domínio próprio + DNS

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase VI**

Conteúdo cobrindo:

- **Goal:** `seudominio.com.br` apontando pra Cloudflare Pages + (se Pro) `compre.seudominio.com.br` apontando pro custom domain Kiwify
- **Pré-req:** Domínio comprado + Fases I e V concluídas
- **Tempo:** 45 min total (~10 min execução + ~35 min aguardando propagação DNS)
- **Steps detalhados:**
  1. Onde foi registrado (Registro.br, GoDaddy, Hostinger, etc.) → mudar **nameservers** para os da Cloudflare:
     - `ns1.cloudflare.com`
     - `ns2.cloudflare.com`
  2. Em cloudflare.com > seu domínio > DNS > Records: configurar:
     - `A` record: `@` → `192.0.2.1` (Cloudflare auto-popula)
     - `CNAME`: `www` → `seudominio.com.br`
  3. Em Cloudflare Pages > Domínios customizados: adicionar `seudominio.com.br` → vincular ao projeto
  4. Aguardar propagação (5-30 min) → testar `https://seudominio.com.br/landing/`
  5. **⚠ Custom domain do checkout exige plano Kiwify Pro ou superior.** Se estiver no plano gratuito, **PULE** os steps 6-9 abaixo e mantenha `pay.kiwify.com.br/<id>` (funciona perfeitamente).
  6. (Pro) Em Kiwify > Produto > Checkout > Domínio personalizado: configurar `compre.seudominio.com.br`
  7. (Pro) Pegar valor de CNAME que Kiwify fornece (ex: `cname-target.kiwify.com.br`)
  8. (Pro) Em Cloudflare > DNS > Records: adicionar `CNAME compre → cname-target.kiwify.com.br`
  9. (Pro) Aguardar Kiwify validar (geralmente <1h)
- **Verificação ✓:**
  ```
  https://seudominio.com.br/landing/index.html  ← carregar OK
  https://seudominio.com.br/upsell/index.html   ← carregar OK
  https://compre.seudominio.com.br/<id>         ← (Pro only) abrir checkout
  ```
- **Common pitfalls ⚠:**
  - Esquecer de mudar nameservers no registro → DNS não cai pra Cloudflare
  - DNS proxy (laranja) ativado em CNAME do checkout Kiwify → quebra a integração; tem que ser DNS-only (cinza)
  - Esperar pouco e dar erro de propagação → algumas operadoras demoram 24h, mas Cloudflare em si é rápido (5-30min)

- [ ] **Step 2: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase VI - dominio proprio e DNS Cloudflare"
```

---

### Task 8: Fase VII — Pixel Meta + GTM

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase VII**

Conteúdo cobrindo:

- **Goal:** Pixel Meta + GTM container instalados no Kiwify (eventos do checkout) e nas páginas (eventos client). Disparando: `PageView`, `InitiateCheckout`, `Purchase`.
- **Pré-req:** Conta Meta Business + conta Google
- **Tempo:** 40 min
- **Steps detalhados:**

  **Pixel Meta:**
  1. Acessar `business.facebook.com/events_manager`
  2. Criar pixel (se ainda não existir): nome "Protocolo Destrave Celular"
  3. Pegar Pixel ID (16 dígitos) → anotar pra Fase X
  4. Em Kiwify > Configurações > Integrações > Meta Pixel: colar Pixel ID
  5. Ativar eventos: Lead, InitiateCheckout, AddPaymentInfo, Purchase
  6. Configurar valor da Purchase = preço do produto (R$ 197)

  **GTM:**
  7. Acessar `tagmanager.google.com`
  8. Criar conta + container: nome "Protocolo Destrave Celular Web"
  9. Pegar GTM ID (formato `GTM-XXXXXXX`) → anotar pra Fase X
  10. (Opcional, mas recomendado) Em GTM, configurar tags básicas: GA4, Google Ads conversion

- **Verificação ✓:**
  - Instalar extensão Chrome "Meta Pixel Helper"
  - Abrir landing em produção → ver pixel disparando "PageView"
  - Iniciar compra teste → ver "InitiateCheckout" no checkout
  - Finalizar compra → ver "Purchase" no Events Manager (com valor R$ 197)
- **Common pitfalls ⚠:**
  - Instalar pixel em modo "automático" (Meta detecta) → captura eventos errados; sempre configurar manual
  - Esquecer de atualizar evento "Purchase" no Kiwify quando preço muda → conversão registrada errada
  - Usar GTM ID de outra conta por engano → tracking aparece em conta errada

- [ ] **Step 2: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase VII - Pixel Meta + GTM"
```

---

### Task 9: Fase VIII — Webhook server-side (Meta CAPI)

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase VIII**

Conteúdo cobrindo:

- **Goal:** Kiwify envia eventos de "compra aprovada" diretamente pro servidor da Meta (Conversions API) — backup do pixel client-side. Captura ~30% mais conversões (clientes com adblock, iOS 14+, fingerprinting protection).
- **Pré-req:** Fase VII concluída
- **Tempo:** 30 min
- **Steps detalhados:**
  1. Em business.facebook.com > Events Manager > [seu pixel] > Settings > Conversions API
  2. Generate Access Token → copiar (longo, ~150 chars)
  3. Em Kiwify > Configurações > Integrações > Conversions API: colar Pixel ID + Access Token
  4. Ativar eventos: Purchase (mínimo), InitiateCheckout, Lead
  5. Em Meta Events Manager > Test Events: gerar test event code → salvar no Kiwify
  6. Fazer compra teste → verificar que evento "Purchase" aparece com TANTO `Browser` (pixel client) QUANTO `Server` (CAPI)
  7. Verificar **deduplication** — Meta deve mostrar "Deduplicated" status nos eventos. Sem isso, conta dobrado.
  8. Após validar, desativar test event code (vai pra produção)
- **Verificação ✓:** No Events Manager → seção "Total Events" → ver Purchase aparecendo com fonte "Server" e Match Quality > 6.0/10
- **Common pitfalls ⚠:**
  - Esquecer de configurar deduplicação por `event_id` (Kiwify faz isso automaticamente, mas verificar) → conversão dobrada
  - Access Token vazado em git público → REVOGAR imediatamente, gerar novo
  - Não testar antes de ir pra produção → descobrir erro só no relatório de meses depois

- [ ] **Step 2: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase VIII - webhook Meta CAPI server-side"
```

---

### Task 10: Fase IX — Área de membros + tranca de 8 dias

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase IX**

Conteúdo cobrindo:

- **Goal:** Estrutura dos 5 módulos cadastrada em Kiwify Members. Regra de drip configurada: M I-II liberam dia 1, M III-IV liberam dia 8, M V libera dia 15. Aulas como placeholder até serem produzidas.
- **Pré-req:** Fase I concluída + estrutura curricular do projeto (`docs/curriculo-metodo-desinflamacao.md`)
- **Tempo:** 50 min
- **Steps detalhados:**
  1. Em Kiwify > Produto > Área de Membros: ativar
  2. Criar 5 módulos com nomes do currículo:
     - Módulo I — O Mecanismo
     - Módulo II — O Reset (Desafio 6 Dias)
     - Módulo III — A Cozinha de Poder
     - Módulo IV — O Estilo de Vida
     - Módulo V — A Manutenção
  3. **Configurar drip por módulo:**
     - Módulos I e II: Liberar imediatamente após compra
     - Módulos III e IV: Liberar após **8 dias** da compra
     - Módulo V: Liberar após **15 dias** da compra
  4. Para cada módulo, criar slots de aulas conforme currículo:
     - I: 4 aulas (I.1, I.2, I.3, I.4) — títulos do `docs/curriculo-metodo-desinflamacao.md`
     - II: 6 aulas
     - III: 5 aulas
     - IV: 5 aulas
     - V: 6 aulas
  5. Em cada slot de aula: deixar **placeholder** "Vídeo em produção — disponível em breve"
  6. Carregar os 3 PDFs bônus (Guia, Planner, Receitas) no Módulo I como complementos
  7. Em Configurações > Layout: aplicar tema Apothecary (se Kiwify permite custom CSS no plano que está)
- **Verificação ✓:** Login na área de membros como usuário-teste → ver Módulos I e II destravados, III-V com cadeado e mensagem "destrava em 8 dias"
- **Common pitfalls ⚠:**
  - Configurar drip em DIAS CORRIDOS vs. DIAS ÚTEIS — Kiwify default é corridos, mas verificar
  - Esquecer de aplicar drip em algum módulo → cliente pede reembolso após receber Módulo V no dia 1
  - Carregar aulas no slot errado → corrigir é trabalhoso depois

- [ ] **Step 2: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase IX - area de membros e tranca de 8 dias"
```

---

### Task 11: Fase X — Substituição dos placeholders no código

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase X**

Conteúdo cobrindo:

- **Goal:** Substituir 4 URLs + 2 IDs + 1 canonical no código. Commit + redeploy automático Cloudflare.
- **Pré-req:** Fases I, III, VI, VII concluídas (URLs/IDs reais já em mãos)
- **Tempo:** 15 min
- **Steps detalhados (com código exato):**

  1. Editar `landing/content.js` linha do `KIWIFY_CHECKOUT_URL`:
     ```js
     // ANTES:
     KIWIFY_CHECKOUT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_COM_LINK_REAL',
     // DEPOIS:
     KIWIFY_CHECKOUT_URL: '<URL real da Fase I>',
     ```

  2. Editar `landing/content.js` `META_PIXEL_ID` e `GTM_ID`:
     ```js
     META_PIXEL_ID: '<ID real da Fase VII>',  // 16 dígitos
     GTM_ID: 'GTM-<ID real da Fase VII>',
     ```

  3. Editar `upsell/content.js` `KIWIFY_ACCEPT_URL`, `KIWIFY_DECLINE_URL`, `META_PIXEL_ID`, `GTM_ID`:
     ```js
     KIWIFY_ACCEPT_URL: '<URL de aceite da Fase III>',
     KIWIFY_DECLINE_URL: 'https://seudominio.com.br/membros/?skip_upsell=1',
     META_PIXEL_ID: '<mesmo da landing>',
     GTM_ID: '<mesmo da landing>',
     ```

  4. Editar `landing/index.html` — Schema.org canonical:
     ```html
     <!-- ANTES: "url": "https://desinflamacao.com.br/" -->
     <!-- DEPOIS: "url": "https://<seudominio.com.br>/" -->
     ```

  5. Editar `landing/index.html` — GTM noscript fallback:
     ```html
     <!-- ANTES: src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" -->
     <!-- DEPOIS: src="https://www.googletagmanager.com/ns.html?id=GTM-<ID real>" -->
     ```

  6. Bump cache-busting version em todos os imports de `landing/index.html` e `upsell/index.html`:
     ```html
     <!-- Trocar todos ?v=20260507d para ?v=PROD-20260DDD -->
     ```

  7. Commit + push:
     ```bash
     git add landing/content.js upsell/content.js landing/index.html
     git commit -m "feat(prod): substituir placeholders Kiwify + IDs reais Meta/GTM"
     git push
     ```

  8. Aguardar Cloudflare Pages fazer redeploy automático (~30s) → verificar versão nova online

- **Verificação ✓:**
  - Abrir DevTools em `seudominio.com.br/landing/?reveal=true`
  - No Console digitar `LANDING_CONFIG.KIWIFY_CHECKOUT_URL` → não pode aparecer "SUBSTITUIR" no string
  - No Console digitar `LANDING_CONFIG.META_PIXEL_ID` → tem que ser 16 dígitos
- **Common pitfalls ⚠:**
  - Esquecer de fazer push após commit → Cloudflare não redeploya
  - Substituir só na landing e esquecer da upsell → upsell continua com placeholder
  - Esquecer GTM noscript no `<body>` (só substituir no `<script>`) → noscript permanece quebrado

- [ ] **Step 2: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase X - substituicao dos placeholders no codigo"
```

---

### Task 12: Fase XI — Smoke test end-to-end

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append)

- [ ] **Step 1: Appendar Fase XI**

Conteúdo cobrindo:

- **Goal:** Compra real de teste percorrendo o funil inteiro. Sair com confiança total que tudo funciona em produção.
- **Pré-req:** Fases I-X concluídas
- **Tempo:** 45 min
- **Steps detalhados:**
  1. **Preparação:**
     - Abrir 3 abas: (a) `seudominio.com.br/landing/?reveal=true`, (b) Meta Events Manager → Test Events, (c) GTM Preview Mode
     - Cartão de teste Kiwify: `4111 1111 1111 1111`, CVV `123`, validade qualquer futura
  2. **Aba (a):** Clicar no botão `QUERO ACESSAR O MÉTODO`. Verificar:
     - Vai pra `compre.seudominio.com.br/<id>` ou `pay.kiwify.com.br/<id>`
     - Order Bump da Xícara de Ouro aparece visível
  3. Marcar Order Bump → ver subtotal mudar pra R$ 224,90 (R$ 197 + R$ 27,90)
  4. Preencher cartão de teste → finalizar compra
  5. **Pagamento aprovado** → Kiwify deve redirecionar pra `seudominio.com.br/upsell/`
  6. **Aba (a) agora na upsell:** vídeo do upsell carrega. Esperar 1:30 (ou usar `?reveal=true`) → ver botões aparecem
  7. Clicar `SIM, QUERO ADICIONAR` → 1-click upsell processa (sem pedir cartão de novo) → redireciona pra área de membros
  8. **Área de membros:**
     - Login automático funciona (Kiwify gera credenciais)
     - Módulos I e II destravados, III-V com cadeado
     - Bônus PDFs visíveis no Módulo I
  9. **Aba (b) Events Manager:** verificar 3 eventos chegaram com event_id matched:
     - InitiateCheckout (do clique inicial)
     - AddPaymentInfo (do preenchimento do cartão)
     - Purchase R$ 224,90 (compra principal + Order Bump) — fonte BOTH browser + server (CAPI)
     - Purchase R$ 297 (do upsell) — separado
  10. **Aba (c) GTM Preview:** verificar tags disparadas no fluxo
- **Verificação ✓:** Todas as 4 conversões aparecem no Meta Events Manager + GTM Preview confirma tags. ZERO erros no console do browser.
- **Common pitfalls ⚠:**
  - Cartão de teste não funciona em modo produção da Kiwify → verificar que está em modo sandbox (Configurações > Sandbox)
  - Pixel dispara duplicado (uma vez por click duplo, etc.) → checar event_id deduplicação
  - Cliente recebe acesso ANTES do redirect concluir → race condition; aumentar tempo de espera no redirect

- [ ] **Step 2: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): Fase XI - smoke test end-to-end"
```

---

## Phase 3 — Consolidação e tag

### Task 13: Lista consolidada de placeholders + cross-references + revisão final

**Files:** Modify `docs/checklist-kiwify-hotmart.md` (append seção final)

- [ ] **Step 1: Appendar seção "Lista consolidada de placeholders"**

Conteúdo:

```markdown
---

## Lista consolidada de placeholders

Tudo que precisa ser substituído antes do go-live, em ordem de aparição no código:

### `landing/content.js`
| Linha aprox | Placeholder | Vira | Origem |
|---|---|---|---|
| 8 | `VIDEO_ID: '76979871'` | ID real do Vimeo Pro do VSL | Após upload do VSL no Vimeo |
| 13 | `META_PIXEL_ID: 'XXXXXXXXXXXX'` | 16 dígitos do Pixel ID | Fase VII |
| 14 | `GTM_ID: 'GTM-XXXXXXX'` | `GTM-<ID real>` | Fase VII |
| 17 | `KIWIFY_CHECKOUT_URL: '...SUBSTITUIR_COM_LINK_REAL'` | URL completa do checkout do Método | Fase I |

### `upsell/content.js`
| Linha aprox | Placeholder | Vira | Origem |
|---|---|---|---|
| 8 | `VIDEO_ID: '76979871'` | ID real do Vimeo Pro do upsell video | Após upload do upsell video |
| 13 | `META_PIXEL_ID: 'XXXXXXXXXXXX'` | mesmo da landing | Fase VII |
| 14 | `GTM_ID: 'GTM-XXXXXXX'` | mesmo da landing | Fase VII |
| 17 | `KIWIFY_ACCEPT_URL: '...SUBSTITUIR_LINK_UPSELL_ACEITAR_1CLICK'` | URL real de aceite | Fase III |
| 18 | `KIWIFY_DECLINE_URL: '...SUBSTITUIR_COM_LINK_REAL'` | URL da área de membros (skip_upsell) | Fases III + IX |

### `landing/index.html`
| Onde | Placeholder | Vira | Origem |
|---|---|---|---|
| `<script type="application/ld+json">` | `"url": "https://desinflamacao.com.br/"` | URL real | Fase VI |
| `<script type="application/ld+json">` | `"image": "https://desinflamacao.com.br/landing/assets/og-image.jpg"` | URL real do og-image | Fase VI |
| `<link rel="canonical">` | `href="https://desinflamacao.com.br/"` | URL real | Fase VI |
| GTM noscript no `<body>` | `id=GTM-XXXXXXX` | `GTM-<ID real>` | Fase VII |

### Cache-busting (recomendado bumpar antes do go-live)

Em ambos `landing/index.html` e `upsell/index.html`, todos imports usam `?v=20260507d`.
Antes do go-live, trocar para `?v=PROD-<data>` pra forçar refresh em quem já visitou versões dev.

---

## Anexos

### Anexo A: Cartão de teste Kiwify

Em modo sandbox:
- Número: `4111 1111 1111 1111`
- CVV: `123`
- Validade: qualquer data futura
- Nome: qualquer

### Anexo B: Texto pronto pro Order Bump (Xícara de Ouro)

> Adicione 15 receitas exclusivas de chás termogênicos anti-inflamatórios — testados pelo método e que aceleram o reset celular. Use durante e após o protocolo. PDF entregue junto com o Método.

(140 chars exatos.)

### Anexo C: Referências cruzadas

- Spec deste checklist: `docs/superpowers/specs/2026-05-07-checklist-kiwify-hotmart-design.md`
- Currículo das 26 aulas: `docs/curriculo-metodo-desinflamacao.md`
- Roteiro da VSL: `docs/roteiro-vsl-metodo-desinflamacao.md`
- Sistema visual: `docs/superpowers/specs/2026-05-07-identidade-visual-bio-premium-design.md`
```

- [ ] **Step 2: Verificação final do documento inteiro**

```bash
wc -l docs/checklist-kiwify-hotmart.md
```

Expected: ~1500-2500 linhas.

```bash
grep -c "^## Fase" docs/checklist-kiwify-hotmart.md
```

Expected: 11 (todas as 11 fases presentes).

```bash
grep -c "### Verificação ✓" docs/checklist-kiwify-hotmart.md
```

Expected: 11 (uma por fase).

```bash
grep -c "### Common pitfalls" docs/checklist-kiwify-hotmart.md
```

Expected: 11 (uma por fase).

- [ ] **Step 3: Commit**

```bash
git add docs/checklist-kiwify-hotmart.md
git commit -m "docs(checklist): lista consolidada de placeholders + anexos + revisao final"
```

---

### Task 14: Tag `v0.6.0-checklist-kiwify`

**Files:** (sem mudanças de código)

- [ ] **Step 1: Aplicar tag**

```bash
git tag -a v0.6.0-checklist-kiwify -m "Checklist Kiwify v0.6.0 - 11 fases lineares, ~1500-2500 linhas, do cadastro do produto ao smoke test, com warning de go-live e lista consolidada de placeholders"
```

- [ ] **Step 2: Verificar**

```bash
git tag -l
```

Expected: vê `v0.6.0-checklist-kiwify` na lista, junto com tags anteriores (v0.1.0-identity até v0.5.0-curriculo).

```bash
git show --stat v0.6.0-checklist-kiwify | head -5
```

Expected: tag aponta pra commit de Task 13 (último commit do checklist).

- [ ] **Step 3: Atualizar memória do projeto**

Editar `~/.claude/projects/.../memory/project_metodo_desinflamacao.md` adicionando:

```
- ✅ Checklist Kiwify `v0.6.0-checklist-kiwify` — `docs/checklist-kiwify-hotmart.md` com 11 fases lineares (~1500-2500 linhas), do cadastro do produto ao smoke test end-to-end. Inclui warning de go-live (não publicar sem aulas) e lista consolidada de placeholders.
```

E remover a linha "⏳ Próximos: estruturação dos 26 aulas, config Kiwify/Hotmart" se ainda existir (substituir por "Próximos: produção das vídeo-aulas — fora de escopo de código").

---

## Spec Coverage (self-review)

| Spec section | Implementado em |
|---|---|
| §1 Escopo | Setup do header em Task 1 |
| §2 Estrutura 11 fases | Tasks 2-12 |
| §3 Formato de cada fase | Aplicado consistentemente em Tasks 2-12 (template Goal/Pré/Steps/Verificação/Pitfalls) |
| §4 Conteúdo específico (Fase I) | Task 2 |
| §4 Conteúdo específico (Fase II) | Task 3 |
| §4 Conteúdo específico (Fase III) | Task 4 |
| §4 Conteúdo específico (Fase IV) | Task 5 |
| §4 Conteúdo específico (Fase V) | Task 6 |
| §4 Conteúdo específico (Fase VI, com warning Pro) | Task 7 |
| §4 Conteúdo específico (Fase VII) | Task 8 |
| §4 Conteúdo específico (Fase VIII) | Task 9 |
| §4 Conteúdo específico (Fase IX, com tranca de 8/15 dias) | Task 10 |
| §4 Conteúdo específico (Fase X, com lista de placeholders) | Tasks 11 + 13 |
| §4 Conteúdo específico (Fase XI smoke test) | Task 12 |
| §5 Critérios de aceitação | Verificações nas Tasks 2-13 cobrem critérios 1-8 |
| §6 O que NÃO está incluso | Fora do escopo do plano (honrado) |
| §7 Próximos passos | Task 14 (tag + memory update) |

---

## Próximos passos pós-implementação

Após `v0.6.0-checklist-kiwify`:

1. **Esse é o último subprojeto de código/documentação do roadmap.** Trabalho restante é externo:
   - Produção das 26 vídeo-aulas (sessões dedicadas — não código)
   - Locução + edição da VSL (terceiros profissionais)
   - Compra de domínio + execução do checklist propriamente dita (Rafael, seguindo o doc)
   - Compra de tráfego (Meta Ads, Google Ads — outro projeto, outra conversa)

2. Se quiser ainda mais documentação assistida por IA, sub-projetos opcionais:
   - **Aula I.1 como template-mãe** — escrever roteiro completo da primeira aula como blueprint para as outras 25
   - **Templates de e-mails transacionais e marketing** — boas-vindas, pré-lançamento, recuperação de carrinho
   - **Página de obrigado / confirmação** (depois do upsell, antes da área de membros)
