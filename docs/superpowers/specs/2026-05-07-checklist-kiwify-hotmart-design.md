# Checklist Kiwify — Configuração End-to-End do Funil

**Data:** 2026-05-07
**Status:** Aprovado para implementação
**Plataforma:** Kiwify
**Premissas confirmadas:**
- Conta Kiwify já verificada (KYC completo, conta bancária cadastrada)
- Domínio próprio já comprado (ex: `desinflamacao.com.br`)
- Vídeo-aulas ainda NÃO produzidas → estratégia de placeholder + warning de go-live

---

## 1. Escopo

Este spec define o que o **deliverable final** (`docs/checklist-kiwify-hotmart.md`) deve conter. O deliverable é um documento markdown linear, denso e acionável, que substitui qualquer onboarding genérico da Kiwify e é específico para a arquitetura deste projeto (modo Apothecary, Order Bump da Xícara de Ouro, upsell Clube Vida Leve, tranca de 8 dias, integração com pixels Meta + GTM).

**Quem executa:** o próprio dono do projeto (Rafael), trabalhando passo-a-passo com o dashboard da Kiwify aberto numa aba e este documento na outra.

**Quem NÃO executa:** ninguém terceirizado. O documento assume nível técnico básico (sabe instalar fonte de DNS, sabe abrir um terminal pra fazer git push) mas não assume conhecimento prévio da Kiwify.

---

## 2. Estrutura: 11 fases lineares

A ordem é executiva — cada fase entrega 1 capability funcional e cada uma DEPENDE da anterior. Pode parar entre fases sem deixar nada quebrado.

| Fase | Nome | Output ao terminar | Tempo estimado |
|---|---|---|---|
| **I** | Setup do produto principal | Produto "Método Desinflamação Pro" cadastrado, com preço, política de reembolso 7 dias, e URL de checkout pública | 30 min |
| **II** | Order Bump | "Xícara de Ouro" aparecendo no checkout do produto principal com toggle de aceite | 20 min |
| **III** | Cadastro do produto upsell | "Clube Vida Leve" cadastrado como produto separado com 1-click upsell habilitado | 25 min |
| **IV** | Página de redirect pós-checkout | Kiwify redirecionando o cliente do produto principal para `seudominio.com.br/upsell/` após pagamento aprovado | 15 min |
| **V** | Hospedagem das páginas | Repositório git deployado em Cloudflare Pages, URL pública servindo `landing/` e `upsell/` | 30 min |
| **VI** | Domínio próprio + DNS | `seudominio.com.br` apontando para Cloudflare Pages + `compre.seudominio.com.br` apontando para o checkout Kiwify (custom domain) | 45 min (até DNS propagar) |
| **VII** | Pixel Meta + GTM | Pixel da Meta + container GTM instalados e disparando eventos PageView, InitiateCheckout, Purchase | 40 min |
| **VIII** | Webhook server-side (Meta CAPI) | Kiwify enviando eventos de "compra aprovada" diretamente para o servidor da Meta (CAPI) — backup do pixel client-side, captura ~30% mais conversões | 30 min |
| **IX** | Área de membros + tranca de 8 dias | Estrutura dos 5 módulos cadastrada, com regra de drip: Módulo III/IV destravam dia 8, Módulo V destrava dia 15. Aulas ficam como placeholder até serem produzidas. | 50 min |
| **X** | Substituição dos placeholders no código | 4 URLs reais substituídas em `landing/content.js`, `upsell/content.js`, e canonical em `landing/index.html`. Commit + redeploy automático via Cloudflare. | 15 min |
| **XI** | Smoke test end-to-end | Compra real (cartão de teste Kiwify) percorrendo o funil inteiro: landing → checkout → order bump → upsell → área de membros → pixel registrou no Meta Events Manager | 45 min |

**Tempo total estimado:** ~5h30 (em 1-2 sessões focadas)

---

## 3. Formato de cada fase no checklist final

Cada fase do markdown deliverable segue este template:

```markdown
## Fase N — [Nome]

**Goal:** [1-2 frases sobre o que essa fase produz funcionalmente]

**Pré-requisitos:** [bulleted — fases anteriores concluídas, info que precisa ter à mão]

**Tempo estimado:** [valor]

### Steps

1. **[Ação 1]**
   [parágrafo curto de instrução]

   - URL do dashboard: [link direto, ex: kiwify.com.br/produtos/novo]
   - Campo a preencher: [valor exato copy-pastable]

2. **[Ação 2]**
   ...

### Verificação ✓

[Como confirmar que essa fase ficou OK antes de seguir. Idealmente um teste prático visual ou via comando.]

### Common pitfalls

- ⚠ **[Erro frequente 1]** — [como evitar]
- ⚠ **[Erro frequente 2]** — [como evitar]

---
```

**Decisões de format:**
- Steps numerados (não bullet) — ordem importa, vê-se progresso
- Negrito + parágrafo (não inline em uma linha) — cada step respira
- Verificação ✓ explícita por fase — bloqueia avanço se algo está quebrado
- Common pitfalls como bullet ⚠ — destaca riscos sem assustar

---

## 4. Conteúdo específico por fase (escopo do deliverable)

### Fase I — Setup do produto principal
- Cadastro completo (Kiwify > Produtos > Novo Produto)
- Tipo: "Curso digital"
- Nome: Método Desinflamação Pro
- Descrição curta (140 chars) e longa (~500 chars) — fornecidas no checklist
- Preço: 1× R$ 197 (à vista) e 12× R$ 19,70 (parcelado, sem juros pro cliente)
- Política de reembolso: 7 dias incondicional
- Conta de recebimento: confirmar a já verificada
- Output: URL pública do checkout (formato `pay.kiwify.com.br/abc123` ou similar)

### Fase II — Order Bump
- Criar "Xícara de Ouro: 15 Blends de Chás Termogênicos" como **produto adicional** (Kiwify > Order Bumps)
- Preço: R$ 27,90
- Vincular ao checkout do produto principal
- Texto do bump: "Adicione 15 receitas de chás termogênicos anti-inflamatórios — testados pelo método e que aceleram o reset" (~140 chars)
- Imagem: gerar via nano-banana2 (xícara de chá com luz dourada) — incluir prompt no checklist
- Output: bump aparecendo no checkout em modo de teste

### Fase III — Cadastro do produto upsell
- Cadastrar "Clube Vida Leve" como produto separado
- Preço: 1× R$ 297 (à vista) ou 12× R$ 29,70
- **Habilitar 1-click upsell** (configuração específica da Kiwify, em Produtos > [Clube Vida Leve] > Configurações de upsell)
- Definir "produto pai" (qual produto leva ao upsell): Método Desinflamação Pro
- Output: URLs `KIWIFY_ACCEPT_URL` e `KIWIFY_DECLINE_URL` geradas

### Fase IV — Página de redirect pós-checkout
- Em Kiwify > Produto Principal > Configurações de Checkout > Pós-compra
- Definir destino do redirect: URL externa → `https://seudominio.com.br/upsell/`
- Tempo de espera: 0s (redirect imediato)
- Comportamento se pagamento falhar: retornar pra tela de checkout com mensagem
- Output: cliente do produto principal sendo redirecionado para a upsell page após pagamento aprovado

### Fase V — Hospedagem (Cloudflare Pages)
- Por que Cloudflare Pages: free tier suficiente, deploy via git push, SSL grátis, edge global
- Criar conta Cloudflare se não tiver
- Conectar repositório git
- Build settings: nenhum (é HTML estático)
- Output diretory: raiz do repositório (ou apontar pra `/`)
- Verificar que `landing/`, `upsell/`, `pdfs/`, `identity/` estão sendo servidos
- Output: URL pública (ex: `metodo-desinflamacao.pages.dev`)

### Fase VI — Domínio próprio + DNS
- No Registro.br (ou onde o domínio foi registrado): mudar nameservers para Cloudflare
- Em Cloudflare > DNS: configurar registros (A/AAAA pra raiz, CNAME pra subdomínios)
- Em Cloudflare Pages > Domínios customizados: adicionar `seudominio.com.br`
- ⚠ **Custom domain do checkout exige plano Kiwify Pro ou superior** — se estiver no plano gratuito, pode pular esta etapa específica do `compre.seudominio.com.br` e continuar usando `pay.kiwify.com.br/abc123` (funciona perfeitamente, só perde 1% do efeito branded). Pode upgradar depois sem mexer no resto.
- Em Kiwify > Produto > Checkout > Domínio: configurar `compre.seudominio.com.br` (apenas se tiver Pro)
- DNS na Kiwify: criar CNAME apontando pro endpoint da Kiwify (eles fornecem)
- Aguardar propagação (até 24h, geralmente <1h)
- Output: URLs públicas funcionando — `seudominio.com.br/landing/` (sempre) e `compre.seudominio.com.br/abc123` (se Pro) ou `pay.kiwify.com.br/abc123` (se free)

### Fase VII — Pixel Meta + GTM
- Criar Pixel da Meta se não existir (Business Manager > Eventos > Pixel)
- Pegar Pixel ID (formato 16 dígitos)
- Em Kiwify > Configurações > Integrações > Meta Pixel: colar ID + ativar eventos PageView/InitiateCheckout/Purchase
- Criar container GTM (tagmanager.google.com) se não existir
- Pegar GTM ID (formato `GTM-XXXXXXX`)
- Substituir IDs em `landing/content.js`, `upsell/content.js`, `landing/index.html` (noscript GTM)
- Commit + redeploy automático
- Verificar via Meta Pixel Helper (extensão Chrome) que pixel está disparando
- Output: pixel + GTM ativos e disparando

### Fase VIII — Webhook Meta CAPI
- Por que: pixel client-side perde 25-35% das conversões por bloqueadores de ads, iOS 14+, fingerprinting protection
- Configurar Conversions API Gateway na Meta
- Em Kiwify > Integrações > Webhook: criar webhook que dispara em "Compra Aprovada" → endpoint da Meta CAPI
- Adicionar Access Token (gerado no Business Manager)
- Validar via Meta Events Manager > Test Events que eventos client + server estão deduplicando corretamente
- Output: 30%+ mais Purchase events registrados no Meta

### Fase IX — Área de membros + tranca de 8 dias
- Em Kiwify > Produto > Área de Membros: ativar
- Estrutura: 5 módulos com 26 aulas (placeholder)
- **Regra de drip (libera progressivamente):**
  - Módulo I (4 aulas) — libera no dia 1 (imediato após compra)
  - Módulo II (6 aulas) — libera no dia 1
  - Módulo III (5 aulas) — libera no dia **8** (após garantia de 7 dias)
  - Módulo IV (5 aulas) — libera no dia **8**
  - Módulo V (6 aulas) — libera no dia **15**
- Para cada módulo, criar a estrutura COM placeholders de "vídeo será adicionado em breve" — quando os vídeos forem produzidos, faz upload nos slots já existentes
- Bônus PDFs (Guia, Planner, Receitas) — upload imediato (já produzidos como templates HTML que o Rafael pode exportar para PDF)
- ⚠ **Warning crítico de go-live:** NÃO publicar o funil até pelo menos Módulos I + II terem vídeos reais. Cliente que comprar e abrir a área de membros vazia gera reembolso garantido.

### Fase X — Substituir placeholders no código
- 4 URLs em `landing/content.js`:
  - `KIWIFY_CHECKOUT_URL` ← URL real do checkout do produto principal (de Fase I)
- 3 URLs em `upsell/content.js`:
  - `KIWIFY_ACCEPT_URL` ← URL de aceite 1-click (de Fase III)
  - `KIWIFY_DECLINE_URL` ← URL da área de membros (`seudominio.com.br/membros/?skip_upsell=1` ou similar)
  - `VIDEO_ID` ← ID real do vídeo upsell no Vimeo (quando tiver, troca; até lá fica placeholder)
- 2 IDs em ambos os `content.js` + GTM noscript em `index.html`:
  - `META_PIXEL_ID`
  - `GTM_ID`
- 1 canonical URL em `landing/index.html`:
  - Schema.org JSON-LD: `desinflamacao.com.br` ← `seudominio.com.br` real
  - GTM noscript fallback: `GTM-XXXXXXX` real
- Commit + redeploy automático Cloudflare
- Output: produção 100% conectada com plataforma

### Fase XI — Smoke test end-to-end
- Cartão de teste Kiwify (provido pela plataforma para sandbox)
- Percorrer fluxo:
  1. Acessar `seudominio.com.br/landing/?reveal=true` (modo dev pra disparar reveal sem esperar 4min)
  2. Clicar CTA → ir para `compre.seudominio.com.br`
  3. Marcar Order Bump → checkout
  4. Pagar com cartão de teste
  5. Verificar redirect automático para `seudominio.com.br/upsell/?reveal=true`
  6. Clicar "SIM, QUERO ADICIONAR" → confirmar 1-click upsell processou
  7. Verificar redirect para área de membros
  8. Verificar Módulos I-II destravados, III-V travados
- Em paralelo: abrir Meta Events Manager → ver eventos chegando
- Em paralelo: abrir GTM Preview Mode → ver tags disparando
- Output: TODO o funil funcionando em produção

---

## 5. Critérios de aceitação

O deliverable é considerado pronto quando:

1. ✅ Documento markdown criado em `docs/checklist-kiwify-hotmart.md` (~1500-2500 linhas)
2. ✅ As 11 fases estão presentes, na ordem definida
3. ✅ Cada fase tem: Goal, Pré-requisitos, Tempo estimado, Steps numerados, Verificação ✓, Common pitfalls
4. ✅ URLs reais do dashboard Kiwify referenciadas onde aplicável
5. ✅ Comandos copy-pastable (git, DNS, scripts) onde aplicável
6. ✅ Warning de go-live (não publicar sem aulas) destacado em local visível
7. ✅ Lista final consolidada de "placeholders a substituir" (Fase X), com path:linha de cada um
8. ✅ Linkagem cruzada: cada fase que dependa de output anterior tem link interno

---

## 6. O que NÃO está incluso

- **Conteúdo das vídeo-aulas em si** — está em `docs/curriculo-metodo-desinflamacao.md`, não duplica aqui
- **Roteiro da VSL** — está em `docs/roteiro-vsl-metodo-desinflamacao.md`
- **Configuração de e-mail marketing** (ActiveCampaign/Mailchimp) — outro spec se quiser
- **Análise de concorrência ou pricing** — fora de escopo
- **Estratégia de tráfego pago** — outro projeto
- **Customização visual da área de membros** — Kiwify limita CSS custom; outro spec se quiser usar plataforma própria
- **Checklist Hotmart ou Eduzz** — esse spec é Kiwify-specific. Se mudar de plataforma, escreve novo checklist.

---

## 7. Próximos passos

Após aprovação deste spec:

1. Skill `writing-plans` cria plano de implementação com 11 tarefas (uma por fase)
2. Implementação inline ou subagent-driven escreve o checklist completo em `docs/checklist-kiwify-hotmart.md`
3. Self-review valida critérios de aceitação 1-8
4. Tag `v0.6.0-checklist-kiwify` no histórico git
5. **Esse é o último subprojeto de código/documentação do roadmap.** Após v0.6.0, o trabalho de implementação que sobra é externo:
   - Produção das 26 vídeo-aulas (sessões dedicadas, não código)
   - Locução + edição da VSL (terceiros)
   - Compra de domínio + execução do checklist propriamente dita (Rafael, seguindo o doc)
   - Compra de tráfego (Meta Ads, Google Ads — outro projeto)
