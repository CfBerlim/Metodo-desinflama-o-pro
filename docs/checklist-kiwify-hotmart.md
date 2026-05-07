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

## Fase I — Setup do produto principal

**Goal:** Produto "Método Desinflamação Pro" cadastrado na Kiwify, com URL de checkout pública pronta para uso. Status "Rascunho" até go-live (Fase XI).

**Pré-requisitos:** Conta Kiwify com KYC verificado e conta bancária cadastrada para recebimento.

**Tempo estimado:** 30 min

### Steps

1. **Acessar painel de novo produto.**
   URL: `https://dashboard.kiwify.com.br/produtos/novo`

2. **Tipo de produto.**
   Selecionar "Curso digital".

3. **Nome do produto.**
   Preencher: `Método Desinflamação Pro`

4. **Descrição curta** (até 140 caracteres, aparece em previews e meta tags):
   ```
   Protocolo de 21 dias para reverter a inflamação celular crônica. Sem dietas restritivas, sem medicamentos.
   ```

5. **Descrição longa** (até ~500 caracteres, aparece no checkout):
   ```
   O Método Desinflamação Pro é um protocolo cientificamente validado para reverter a inflamação celular crônica em 21 dias. Inclui 5 módulos com 26 vídeo-aulas curtas, 3 manuais práticos em PDF (Guia de Compras, Planner do Desafio 6 Dias, Receitas 15 Minutos), garantia incondicional de 7 dias, e acesso vitalício. Para homens e mulheres maduros frustrados com dietas tradicionais.
   ```

6. **Preço.**
   - À vista: `R$ 197,00`
   - Parcelamento: até **12× sem juros pro cliente** (12× de R$ 19,70). Marcar campo "Sem juros para o cliente" — o juro fica embutido na taxa do cartão, não cobra a mais do cliente.

7. **Política de reembolso.**
   `7 dias incondicional` — campo padrão Kiwify, marcar.

8. **Conta de recebimento.**
   Confirmar que aponta para a conta bancária já validada na conta. Se houver mais de uma, escolher a principal.

9. **Salvar como Rascunho.**
   Em Status do produto, deixar `Rascunho`. **Não ativar ainda** — só na Fase XI após smoke test.

10. **Coletar a URL de checkout pública** (mesmo em rascunho, Kiwify mostra preview). Anotar no documento de placeholders ao final deste checklist:
    ```
    KIWIFY_CHECKOUT_URL = https://pay.kiwify.com.br/<id-gerado>
    ```

### Verificação ✓

- Acessar a URL gerada em aba anônima → ver a página de preview do checkout (vai mostrar "Rascunho/Em breve" ou similar; não importa, só confirmar que a URL responde)
- Em Kiwify > Produtos: ver "Método Desinflamação Pro" listado com status Rascunho
- Anotação da URL salva no rodapé deste checklist (seção "Lista consolidada de placeholders")

### Common pitfalls ⚠

- ⚠ **Confundir "preço à vista" com "preço com desconto à vista"** — o campo certo é o preço base do produto, não um desconto. Se preencher errado, parcelamento sai errado.
- ⚠ **Esquecer de marcar "Sem juros pro cliente"** no parcelamento — Kiwify por default cobra juros do cliente. Resultado: cliente vê 12× R$ 22 em vez de R$ 19,70 e desiste no checkout.
- ⚠ **Salvar como Ativo antes de ter aulas produzidas** — risco de venda real acidental. Manter Rascunho até smoke test (Fase XI).

---

## Fase II — Order Bump (Xícara de Ouro)

**Goal:** Order Bump "A Xícara de Ouro: 15 Blends de Chás Termogênicos" aparecendo no checkout do produto principal como toggle de aceite, R$ 27,90.

**Pré-requisitos:** Fase I concluída (URL do checkout principal já existe).

**Tempo estimado:** 20 min

### Steps

1. **Gerar imagem de capa do Order Bump via nano-banana2.**
   Em paralelo, antes de mexer na Kiwify, criar uma imagem cinematográfica em modo Apothecary. Prompt sugerido (criar arquivo `nano-banana2/prompts/landing/order-bump-xicara.json` com schema dense-narrative):
   ```
   Cinematic editorial photography of a small antique porcelain teacup filled with steaming amber-honey colored herbal infusion, single warm gold key light from upper-left at 45 degrees, deep emerald-tinted carbon background, micro-scratches on cup rim, faint steam vapor catching the light, dust particles in the beam, weathered dark stone surface, shot on Hasselblad H6D-100c 80mm f/2.8 ISO 200, rich shadow detail, mood of silent expensive longevity clinic at dusk. No human, no text overlay.
   ```
   Rodar:
   ```bash
   python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/landing/order-bump-xicara.json nano-banana2/images/landing/order-bump-xicara.jpg "1:1"
   ```

2. **Acessar painel de Order Bumps.**
   URL: `https://dashboard.kiwify.com.br/order-bumps` (ou Produtos > [Método Desinflamação Pro] > Order Bumps)

3. **Criar novo Order Bump.**
   Clicar "Adicionar Order Bump".

4. **Nome interno** (não aparece pro cliente):
   `Xícara de Ouro - 15 Blends de Chás Termogênicos`

5. **Texto exibido no checkout** (140 caracteres exatos, copy testado):
   ```
   Adicione 15 receitas exclusivas de chás termogênicos anti-inflamatórios, testados pelo método. PDF + entregue junto com o curso.
   ```

6. **Preço.**
   `R$ 27,90`

7. **Imagem de capa.**
   Upload de `nano-banana2/images/landing/order-bump-xicara.jpg` (gerada no step 1).

8. **Vincular ao checkout do Método Desinflamação Pro.**
   Em "Em quais produtos exibir": selecionar `Método Desinflamação Pro`.

9. **Posicionamento.**
   `Abaixo dos campos de cartão` — não acima. Acima vira distração e taxa de aceite cai 50%.

10. **Modo de exibição.**
    `Toggle expandido por default` — mostra a oferta já aberta, usuário só precisa marcar checkbox.

11. **Salvar.**

### Verificação ✓

- Abrir o checkout do Método Desinflamação Pro em aba anônima
- Ver Order Bump aparecendo abaixo dos campos de pagamento, com a imagem cinematográfica
- Toggle do checkbox funciona — marca e desmarca, atualizando subtotal de R$ 197 → R$ 224,90

### Common pitfalls ⚠

- ⚠ **Posicionar Order Bump ACIMA dos campos do cartão** — vira distração visual antes do cliente decidir comprar; aceite cai pela metade.
- ⚠ **Usar imagem genérica de banco de imagens** — quebra a estética Bio-Premium. Use sempre a gerada via nano-banana2 com paleta Apothecary.
- ⚠ **Texto longo (>180 chars)** — cliente bate os olhos e não lê; aceite cai. Manter em 140 chars.
- ⚠ **Não testar em aba anônima** — testar logado pode pegar cache ou versão preview, não a real.

---

## Fase III — Cadastro do produto upsell (Clube Vida Leve)

**Goal:** "Clube Vida Leve" cadastrado como produto separado na Kiwify, R$ 297, com 1-click upsell habilitado e linkado ao Método Desinflamação Pro como produto-pai.

**Pré-requisitos:** Fase I concluída.

**Tempo estimado:** 25 min

### Steps

1. **Acessar criação de novo produto.**
   `https://dashboard.kiwify.com.br/produtos/novo`

2. **Tipo de produto.**
   Selecionar "Curso digital" (não recorrência — o Clube é cobrança única que dá acesso a 365 dias de cardápios pré-prontos).

3. **Nome.**
   `Clube Vida Leve - 365 Dias de Refeições Anti-inflamatórias`

4. **Descrição curta** (140 chars):
   ```
   Cardápio diário sequenciado por 365 dias para manter o silêncio celular. Lista de compras pré-pronta. Adapta a restrições.
   ```

5. **Descrição longa** (~500 chars):
   ```
   O Clube Vida Leve entrega, todo dia pelos próximos 365 dias, um cardápio anti-inflamatório completo (café da manhã, almoço, jantar e snacks). Lista de compras semanal pré-pronta, adaptações automáticas para vegetariano/sem lactose/low-carb, e atualização sazonal com ingredientes da feira do mês. Manutenção do método sem precisar pensar em "o que comer hoje".
   ```

6. **Preço.**
   - À vista: `R$ 297,00`
   - Parcelamento: 12× sem juros pro cliente (12× R$ 29,70). Marcar "Sem juros pro cliente".

7. **Política de reembolso.**
   `7 dias incondicional` (mesma do produto principal, mantém coerência).

8. **HABILITAR 1-click upsell** ⭐
   Em `Configurações de upsell` > `Permitir aceite com 1 clique`. Esse é o trigger que permite o cliente aceitar o upsell sem digitar cartão de novo.

9. **Definir produto-pai.**
   Em "Quando exibir esse upsell" > selecionar `Método Desinflamação Pro`. Isso garante que o upsell só aparece pra quem comprou o produto principal.

10. **Coletar URLs geradas.**
    Em Detalhes do produto > URLs:
    ```
    KIWIFY_ACCEPT_URL  = https://pay.kiwify.com.br/upsell/aceitar/<id>
    KIWIFY_DECLINE_URL = (URL custom — ver Fase IX para a URL da área de membros)
    ```
    Anotar na lista de placeholders no fim deste checklist.

11. **Salvar como Rascunho.**
    Mesma lógica da Fase I — só ativar no smoke test.

### Verificação ✓

- Em Produtos: ver "Clube Vida Leve" listado, status Rascunho
- Em Detalhes do produto: ver as duas URLs (accept/decline) preenchidas
- Em Configurações de upsell: ver "1-click upsell: Habilitado" e "Produto-pai: Método Desinflamação Pro"

### Common pitfalls ⚠

- ⚠ **Esquecer de habilitar 1-click upsell** — sem isso, cliente é forçado a digitar cartão de novo na tela de aceite. Taxa de aceite cai 80%+.
- ⚠ **Definir produto-pai errado** ou deixar em branco → upsell pode aparecer pra cliente que comprou outro produto, ou não aparecer pra ninguém.
- ⚠ **Cadastrar como Recorrência mensal** sem deixar isso explícito no copy — cliente espera pagar uma vez e recebe cobrança recorrente, gera disputa de cartão.

---

## Fase IV — Página de redirect pós-checkout

**Goal:** Após pagamento aprovado do Método Desinflamação Pro, Kiwify redireciona automaticamente o cliente para `https://seudominio.com.br/upsell/`.

**Pré-requisitos:** Fase I concluída + Fase III concluída + saber qual será o domínio (Fase VI). Você pode preparar essa fase usando URL temporária `<projeto>.pages.dev/upsell/` se ainda não tiver dominio próprio configurado.

**Tempo estimado:** 15 min

### Steps

1. **Acessar configuração de pós-checkout.**
   Kiwify > Produtos > Método Desinflamação Pro > Configurações de Checkout > Pós-compra

2. **Destino do redirect.**
   Selecionar "URL externa".

3. **URL.**
   ```
   https://seudominio.com.br/upsell/
   ```
   (substituir `seudominio.com.br` pelo domínio real após Fase VI; se ainda não tem, usar URL temporária do Cloudflare Pages)

4. **Tempo de espera antes do redirect.**
   `0 segundos` — redirect imediato. Sem tela de "obrigado pelo pedido" no meio (essa tela mata 30% das conversões de upsell).

5. **Comportamento se pagamento falhar.**
   `Voltar pra checkout com mensagem de erro` — cliente pode tentar de novo com outro cartão.

6. **Comportamento se pagamento for cancelado.**
   `Voltar pra checkout` — sem redirect pro upsell.

7. **Salvar.**

### Verificação ✓

- Em aba anônima, fazer compra-teste com cartão sandbox da Kiwify (`4111 1111 1111 1111`)
- Pagar
- Confirmar redirect imediato pra `/upsell/` (URL na barra de endereço muda)
- Página do upsell carrega corretamente

### Common pitfalls ⚠

- ⚠ **URL com `http://` em vez de `https://`** — browser bloqueia mixed-content e cliente vê tela em branco.
- ⚠ **URL sem trailing slash quando o servidor exige** — Cloudflare Pages costuma redirecionar, mas alguns servidores retornam 404. Sempre incluir o `/` final.
- ⚠ **Redirect direto pra área de membros (pulando upsell)** — perde 30-50% de receita adicional do upsell. Sempre redirecionar pra upsell page primeiro.
- ⚠ **Tempo de espera > 0** — qualquer tela intermediária reduz conversão do upsell. Imediato.

---

## Fase V — Hospedagem das páginas (Cloudflare Pages)

**Goal:** Repositório git deployado em Cloudflare Pages. URL temporária `<projeto>.pages.dev` servindo `landing/`, `upsell/`, `pdfs/`, `identity/`. Deploy automático em cada `git push`.

**Pré-requisitos:** Repositório git já existe. Conta Cloudflare (criar se ainda não tiver — free tier ilimitado pra Pages).

**Tempo estimado:** 30 min

### Steps

1. **Criar conta Cloudflare** (se ainda não tiver).
   `https://dash.cloudflare.com/sign-up`

2. **Acessar Pages.**
   `https://pages.cloudflare.com` > `Create a project` > `Connect to Git`

3. **Conectar repositório.**
   Autorizar Cloudflare a ler do GitHub/GitLab. Selecionar o repositório `americo-alimentacao-saudavel` (ou nome equivalente).

4. **Configurar build settings.**
   - Framework preset: `None`
   - Build command: (deixar vazio)
   - Build output directory: `/` (raiz do repositório)
   - Root directory: `/` (raiz)
   - Variables/secrets: nenhuma necessária

5. **Save and Deploy.**
   Aguardar build (geralmente <30s pra HTML estático).

6. **Obter URL temporária.**
   Cloudflare gera algo como `https://americo-alimentacao-saudavel.pages.dev`. Anotar.

7. **Verificar todos os 4 diretórios respondendo.**
   Acessar:
   ```
   https://<projeto>.pages.dev/landing/index.html
   https://<projeto>.pages.dev/upsell/index.html
   https://<projeto>.pages.dev/pdfs/guia-compras.html
   https://<projeto>.pages.dev/identity/styleguide.html
   ```

### Verificação ✓

- Todas as 4 URLs acima respondem com 200 e renderizam corretamente
- DevTools > Network: ver `tokens.css`, `style.css`, `reveal.js`, `content.js` baixando OK
- Console sem erros de CORS, mixed-content, ou recursos faltando
- Imagens dos PDFs (capas Botanique) aparecem renderizadas

### Common pitfalls ⚠

- ⚠ **Build output directory errado** — deixar `dist/` ou `build/` quando não há build → 404 em tudo. Tem que ser `/`.
- ⚠ **Esquecer de subir os assets binários** (`.jpg` dos PDFs/poster) — git LFS ou tamanho do repo. Verificar via `git ls-files | grep '\.jpg'` antes do push.
- ⚠ **`.gitignore` excluindo arquivos críticos** — verificar que `landing/assets/*.jpg` e `pdfs/` não estão sendo ignorados.
- ⚠ **Cache stale** entre commits — Cloudflare Pages tem CDN agressivo; após push, esperar 30s ou usar query string `?v=novo` pra forçar refresh.

---

## Fase VI — Domínio próprio + DNS

**Goal:** `seudominio.com.br` apontando pra Cloudflare Pages. Se plano Kiwify Pro: `compre.seudominio.com.br` apontando para o checkout customizado. Se plano gratuito: manter `pay.kiwify.com.br/<id>`.

**Pré-requisitos:** Domínio comprado (Registro.br ou similar) + Fases I e V concluídas.

**Tempo estimado:** 45 min total (~10 min execução + ~35 min aguardando propagação DNS)

### Steps

1. **Mudar nameservers do domínio para Cloudflare.**
   No site onde o domínio foi registrado (Registro.br, GoDaddy, Hostinger, etc.), localizar "DNS" ou "Nameservers" e substituir pelos da Cloudflare:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
   (Cloudflare mostra os exatos no painel quando você adiciona o domínio.)

2. **Adicionar domínio no Cloudflare.**
   `dash.cloudflare.com` > `Add a Site` > digitar `seudominio.com.br` > selecionar plano Free.

3. **Importar registros DNS existentes.**
   Cloudflare auto-detecta. Se não tinha nada antes, OK.

4. **Configurar registros DNS para apontar pro Cloudflare Pages.**
   Em DNS > Records, adicionar:
   - `CNAME`: nome `@`, valor `<projeto>.pages.dev`, proxy: `Proxied (laranja)`
   - `CNAME`: nome `www`, valor `seudominio.com.br`, proxy: `Proxied`

5. **Vincular domínio ao Cloudflare Pages.**
   Em `pages.cloudflare.com` > seu projeto > `Custom domains` > `Set up a custom domain` > `seudominio.com.br`. Aguardar SSL provisionar (1-5 min).

6. **Aguardar propagação DNS.**
   Geralmente 5-30 min. Verificar com:
   ```bash
   nslookup seudominio.com.br
   ```
   Esperado: ver IPs da Cloudflare (104.21.x.x ou similar).

7. **⚠ Custom domain do checkout exige plano Kiwify Pro ou superior.**
   Se estiver no plano gratuito, **PULE** os steps 8-11 abaixo e mantenha `pay.kiwify.com.br/<id>` (funciona perfeitamente, perde 1% do efeito branded). Pode upgradar pra Pro depois sem mexer no resto.

8. **(Pro) Configurar custom domain Kiwify.**
   Em Kiwify > Configurações > Domínio personalizado: adicionar `compre.seudominio.com.br`.

9. **(Pro) Pegar valor de CNAME que Kiwify fornece.**
   Algo como `cname-target.kiwify.com.br`.

10. **(Pro) Em Cloudflare > DNS > Records: adicionar CNAME.**
    - Nome: `compre`
    - Valor: `<cname-target.kiwify.com.br>`
    - Proxy: `DNS only (cinza)` ⚠ — **NÃO** marcar como Proxied. Kiwify exige DNS-only, senão a integração quebra.

11. **(Pro) Aguardar Kiwify validar.**
    Em Kiwify > Domínio personalizado, status muda de "Validando" para "Ativo". Geralmente <1h.

### Verificação ✓

```
https://seudominio.com.br/landing/index.html  ← carrega
https://seudominio.com.br/upsell/index.html   ← carrega
https://compre.seudominio.com.br/<id>         ← (apenas Pro) abre checkout
```

E no SSL Labs (`https://ssllabs.com/ssltest/`): grade A ou A+.

### Common pitfalls ⚠

- ⚠ **Esquecer de mudar nameservers no registro do domínio** — DNS continua resolvendo no DNS antigo, Cloudflare nunca recebe queries.
- ⚠ **DNS proxy ativado (laranja) em CNAME do checkout Kiwify** — quebra a integração. Tem que ser `DNS only (cinza)`.
- ⚠ **Esperar pouco e dar erro de propagação** — algumas operadoras de internet domésticas demoram até 24h pra atualizar cache de DNS. Testar com `nslookup` específico (1.1.1.1 ou 8.8.8.8) bypassa isso.
- ⚠ **SSL não provisiona** — Cloudflare leva alguns minutos. Se passar 30 min sem provisionar, verificar que o CNAME do `@` está correto e o domain status é "Active" no painel.

---

## Fase VII — Pixel Meta + GTM

**Goal:** Pixel Meta + GTM container instalados no Kiwify (eventos do checkout) e nas páginas (eventos client-side). Disparando: `PageView`, `InitiateCheckout`, `Purchase`.

**Pré-requisitos:** Conta Meta Business + conta Google.

**Tempo estimado:** 40 min

### Steps

**Pixel Meta (~15 min)**

1. **Acessar Events Manager.**
   `https://business.facebook.com/events_manager`

2. **Criar pixel** (se ainda não existir).
   `Connect Data Sources` > `Web` > `Meta Pixel` > Continue > nome: `Método Desinflamação Pro`.

3. **Pegar Pixel ID.**
   16 dígitos no formato `1234567890123456`. Anotar para Fase X.

4. **Instalar pixel no Kiwify.**
   Kiwify > Configurações > Integrações > Meta Pixel: colar Pixel ID. Ativar eventos: `Lead`, `InitiateCheckout`, `AddPaymentInfo`, `Purchase`.

5. **Configurar valor da Purchase.**
   Em "Valor do evento Purchase": colocar `R$ 197` (preço do produto principal). Kiwify automaticamente soma o Order Bump quando ele é aceito.

6. **Confirmar conta de anúncios vinculada.**
   Em Events Manager > seu pixel > Settings > Ad Accounts: vincular a conta de anúncios que vai usar pra rodar Meta Ads.

**GTM (~15 min)**

7. **Acessar Tag Manager.**
   `https://tagmanager.google.com`

8. **Criar conta + container.**
   Account name: `Desinflamação Pro`. Container name: `Desinflamação Pro Web`. Plataforma: `Web`.

9. **Pegar GTM ID.**
   Formato `GTM-XXXXXXX`. Anotar para Fase X.

10. **(Opcional, recomendado) Configurar tags básicas no GTM.**
    Adicionar tags pra GA4, Google Ads conversion (se for usar). Mas mínimo: deixar o container ativo, mesmo vazio — permite adicionar tags depois sem mexer no código.

**Substituir IDs no código (~10 min)**

11. **Editar `landing/content.js`** (linhas ~13-14):
    ```js
    META_PIXEL_ID: '<seu Pixel ID de 16 dígitos>',
    GTM_ID: 'GTM-<seu ID>',
    ```

12. **Editar `upsell/content.js`** (linhas ~13-14):
    Mesmas substituições.

13. **Editar `landing/index.html` GTM noscript fallback** (no `<body>`):
    ```html
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-<seu ID>" ...></iframe>
    ```

14. **Commit e push.**
    ```bash
    git add landing/content.js upsell/content.js landing/index.html
    git commit -m "feat(prod): instalar Meta Pixel e GTM IDs reais"
    git push
    ```

15. **Aguardar redeploy automático Cloudflare.**
    ~30s.

### Verificação ✓

- Instalar extensão Chrome **Meta Pixel Helper**.
- Abrir `seudominio.com.br/landing/?reveal=true` em aba anônima.
- Pixel Helper deve mostrar:
  - Pixel ID detectado
  - Eventos disparados: `PageView` (no load), `VSLPlayed`/`VSLReveal` (custom events do reveal.js)
- Iniciar uma compra teste → ver `InitiateCheckout` aparecer
- Finalizar com cartão sandbox → ver `Purchase` no Events Manager (com valor R$ 197 ou R$ 224,90 com Order Bump)
- GTM Preview Mode (`tagmanager.google.com` > Preview): conectar à URL → ver tags disparadas

### Common pitfalls ⚠

- ⚠ **Instalar pixel em modo "automático"** (Meta detecta) — captura eventos errados/duplicados. Sempre configurar manual via Kiwify.
- ⚠ **Esquecer de atualizar valor "Purchase" no Kiwify quando preço muda** — se você mudar o preço do produto, atualizar também esse campo. Senão conversão registrada com valor errado.
- ⚠ **Usar GTM ID de outra conta por engano** — tracking aparece em conta errada. Verificar duas vezes antes do commit.
- ⚠ **Esquecer cache-busting após substituir IDs** — bumpar `?v=` em todos os imports do `index.html` pra forçar refresh em quem já visitou.

---

## Fase VIII — Webhook server-side (Meta CAPI)

**Goal:** Kiwify envia eventos de "compra aprovada" diretamente pro servidor da Meta (Conversions API) — backup do pixel client-side. Captura ~30% mais conversões (clientes com adblock, iOS 14+, fingerprinting protection).

**Pré-requisitos:** Fase VII concluída.

**Tempo estimado:** 30 min

### Steps

1. **Acessar configuração CAPI.**
   `business.facebook.com` > Events Manager > [seu pixel] > Settings > Conversions API > `Set up manually`.

2. **Generate Access Token.**
   Sistema gera um token longo (~150 caracteres). **NÃO commitar em git público** — só usar no painel da Kiwify (eles armazenam encriptado).

3. **Configurar CAPI no Kiwify.**
   Kiwify > Configurações > Integrações > Conversions API:
   - Pixel ID: o mesmo da Fase VII
   - Access Token: colar o gerado no step 2
   - Eventos a enviar: `Purchase` (mínimo), `InitiateCheckout`, `AddPaymentInfo`, `Lead`

4. **Configurar Test Event Code** (pra teste antes da produção).
   Em Events Manager > Test Events > "Test events code": copiar (formato `TEST123`).
   No Kiwify > CAPI > Test Mode: colar o código.

5. **Disparar evento de teste.**
   Fazer compra-teste com cartão sandbox.
   Em Events Manager > Test Events: ver eventos chegando com source `Server`.

6. **Validar deduplication.**
   Mesmo evento Purchase deve aparecer com source `Browser` (do pixel client) E `Server` (do CAPI), com status `Deduplicated`. Se aparecer 2× contado, deduplicação está quebrada — verificar `event_id` matching.

7. **Após validar, desativar Test Mode.**
   Em Kiwify > CAPI: remover o Test Event Code. Vai pra produção.

### Verificação ✓

- Em Events Manager > Overview > seção "Total Events": ver Purchase aparecendo com fonte `Server` ativa
- Match Quality: > 6.0/10 (idealmente >7.0)
- Deduplication rate: > 90%

### Common pitfalls ⚠

- ⚠ **Esquecer de configurar deduplicação por `event_id`** — Kiwify faz isso automaticamente, mas verificar nos primeiros eventos se Match Quality está alto. Sem isso, conversão dobrada.
- ⚠ **Access Token vazado em git público** — REVOGAR imediatamente em Events Manager > CAPI > Manage Access Tokens; gerar novo.
- ⚠ **Não testar antes de ir pra produção** — descobrir erro só no relatório de meses depois é muito caro.
- ⚠ **Deixar Test Event Code ativo em produção** — eventos de produção vão pra modo de teste e não contam pra otimização do Meta. Remover assim que validar.

---

## Fase IX — Área de membros + tranca de 8 dias

**Goal:** Estrutura dos 5 módulos cadastrada em Kiwify Members. Regra de drip configurada: M I-II liberam dia 1, M III-IV liberam dia 8, M V libera dia 15. Aulas como placeholder até serem produzidas.

**Pré-requisitos:** Fase I concluída + estrutura curricular do projeto (`docs/curriculo-metodo-desinflamacao.md`).

**Tempo estimado:** 50 min

### Steps

1. **Ativar área de membros.**
   Kiwify > Produtos > Método Desinflamação Pro > Área de Membros > `Ativar`.

2. **Criar 5 módulos.**
   Em estrutura do curso, adicionar:
   - `Módulo I — O Mecanismo`
   - `Módulo II — O Reset (Desafio 6 Dias)`
   - `Módulo III — A Cozinha de Poder`
   - `Módulo IV — O Estilo de Vida`
   - `Módulo V — A Manutenção`

3. **Configurar drip por módulo** ⭐
   Para cada módulo, em "Configurações de liberação":
   - Módulo I: `Liberar imediatamente após compra`
   - Módulo II: `Liberar imediatamente após compra`
   - Módulo III: `Liberar após 8 dias da compra`
   - Módulo IV: `Liberar após 8 dias da compra`
   - Módulo V: `Liberar após 15 dias da compra`

4. **Criar slots de aulas conforme currículo.**
   Para cada módulo, criar os slots numerados (com nomes do `docs/curriculo-metodo-desinflamacao.md`):
   - Módulo I: 4 aulas (I.1 O incêndio invisível / I.2 Por que dietas falham / I.3 Os compostos bioativos / I.4 Sua linha de base)
   - Módulo II: 6 aulas (II.1 a II.6)
   - Módulo III: 5 aulas (III.1 a III.5)
   - Módulo IV: 5 aulas (IV.1 a IV.5)
   - Módulo V: 6 aulas (V.1 a V.6)

5. **Em cada slot de aula, deixar placeholder.**
   Texto: `Vídeo em produção — disponível em breve. Você será notificado por e-mail quando esta aula for liberada.`
   ⚠ Quando o vídeo for produzido, faz upload nesse mesmo slot (não cria slot novo).

6. **Carregar os 3 PDFs bônus.**
   Os PDFs são produzidos via "Salvar como PDF" no navegador a partir dos templates HTML em `pdfs/`:
   - `pdfs/guia-compras.html` → exportar PDF → upload no Módulo I como complemento
   - `pdfs/planner-6-dias.html` → exportar PDF → upload no Módulo I
   - `pdfs/receitas-15min.html` → exportar PDF → upload no Módulo I

7. **(Opcional) Aplicar tema visual customizado.**
   Em Configurações de Layout: se Kiwify permitir CSS custom no plano que está, aplicar paleta Apothecary (background `#07100C`, accent `#C9A876`). Se não permitir, manter tema padrão.

8. **Coletar URL da área de membros.**
   Geralmente `https://members.kiwify.com.br/<id-produto>` ou customizado. Anotar para Fase X (será usado como `KIWIFY_DECLINE_URL` na upsell).

### Verificação ✓

- Login na área de membros como usuário-teste (Kiwify gera credenciais após compra-teste)
- Ver Módulos I e II destravados, com aulas em modo placeholder + os 3 PDFs bônus disponíveis pra download
- Ver Módulos III, IV, V com cadeado e mensagem `Destrava em X dias`
- PDFs abrem corretamente (verificar que o export ficou bem formatado em A5 portrait)

### Common pitfalls ⚠

- ⚠ **Configurar drip em DIAS ÚTEIS vs. DIAS CORRIDOS** — Kiwify default é corridos. Se sua intenção é úteis, ajustar manualmente (mas o spec do funil usa corridos — manter assim).
- ⚠ **Esquecer de aplicar drip em algum módulo** — cliente recebe Módulo V no dia 1 e pede reembolso após pegar todo o conteúdo. Verificar TODOS os 5 módulos têm drip.
- ⚠ **Carregar aulas no slot errado** — corrigir é trabalhoso depois (alunos podem ter linkado a aula errada em e-mail). Sempre conferir o número da aula antes do upload.
- ⚠ **Esquecer de dar acesso aos PDFs no Módulo I** — bônus existem mas cliente não vê. Verificar visibilidade na área de membros após upload.

---

## Fase X — Substituição dos placeholders no código

**Goal:** Substituir 4 URLs + 2 IDs + 1 canonical no código. Commit + redeploy automático Cloudflare.

**Pré-requisitos:** Fases I, III, VI, VII, IX concluídas (URLs/IDs reais já em mãos, anotados na lista de placeholders).

**Tempo estimado:** 15 min

### Steps

1. **Editar `landing/content.js`** — `KIWIFY_CHECKOUT_URL`:
   ```js
   // ANTES:
   KIWIFY_CHECKOUT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_COM_LINK_REAL',
   // DEPOIS:
   KIWIFY_CHECKOUT_URL: 'https://pay.kiwify.com.br/<id-real-da-Fase-I>',
   // ou se usou custom domain Kiwify Pro:
   KIWIFY_CHECKOUT_URL: 'https://compre.seudominio.com.br/<id-real-da-Fase-I>',
   ```

2. **Editar `landing/content.js`** — `META_PIXEL_ID` e `GTM_ID`:
   ```js
   META_PIXEL_ID: '<16 dígitos da Fase VII>',
   GTM_ID: 'GTM-<sufixo da Fase VII>',
   ```

3. **Editar `upsell/content.js`** — todas as 4 chaves:
   ```js
   VIDEO_ID: '<id-real-do-Vimeo-do-upsell-video>',  // após upload do upsell video
   META_PIXEL_ID: '<mesmo da landing>',
   GTM_ID: '<mesmo da landing>',
   KIWIFY_ACCEPT_URL: '<URL-de-aceite-da-Fase-III>',
   KIWIFY_DECLINE_URL: 'https://members.kiwify.com.br/<id-area-de-membros>',
   ```

4. **Editar `landing/content.js`** — `VIDEO_ID` (após upload do VSL real no Vimeo Pro):
   ```js
   VIDEO_ID: '<id-real-do-Vimeo-do-VSL>',
   ```

5. **Editar `landing/index.html`** — Schema.org canonical (linhas do JSON-LD `"url"` e `"image"`):
   ```html
   "url": "https://seudominio.com.br/",
   "image": "https://seudominio.com.br/landing/assets/og-image.jpg"
   ```

6. **Editar `landing/index.html`** — `<link rel="canonical">`:
   ```html
   <link rel="canonical" href="https://seudominio.com.br/">
   ```

7. **Editar `landing/index.html`** — GTM noscript fallback no `<body>`:
   ```html
   <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-<seu-ID>" ...></iframe>
   ```

8. **Bump cache-busting version em ambos os HTMLs.**
   Substituir `?v=20260507d` por `?v=PROD-<hoje-em-yyyymmdd>` em todos os imports de `landing/index.html` e `upsell/index.html`. Isso força refresh em qualquer cliente que tenha visitado versões dev anteriormente.

9. **Commit + push.**
   ```bash
   git add landing/content.js upsell/content.js landing/index.html upsell/index.html
   git commit -m "feat(prod): substituir placeholders Kiwify + Meta + GTM com IDs reais"
   git push
   ```

10. **Aguardar Cloudflare Pages redeploy.**
    ~30s. Confirmar em `pages.cloudflare.com` que o deploy mais recente é o commit recém-pushed.

### Verificação ✓

- Abrir `seudominio.com.br/landing/?reveal=true` em DevTools > Console
- Digitar:
  ```js
  LANDING_CONFIG.KIWIFY_CHECKOUT_URL
  // deve retornar a URL real, não 'SUBSTITUIR'

  LANDING_CONFIG.META_PIXEL_ID
  // deve retornar 16 dígitos, não 'XXXXXXXXXXXX'

  LANDING_CONFIG.GTM_ID
  // deve retornar 'GTM-XXXXXXX' real
  ```
- Mesmo procedimento em `seudominio.com.br/upsell/?reveal=true` com `UPSELL_CONFIG`
- Clicar nos botões de CTA → confirmar que link abre URL real (Kiwify), não placeholder

### Common pitfalls ⚠

- ⚠ **Esquecer de fazer push após commit** — Cloudflare não redeploya, código novo fica só local.
- ⚠ **Substituir só na landing e esquecer da upsell** — upsell continua com placeholder e quebra fluxo.
- ⚠ **Esquecer GTM noscript no `<body>`** (só substituir no `<script>`) — noscript fallback permanece quebrado pra usuários com JS desabilitado.
- ⚠ **Não bumpar cache-busting** — clientes antigos continuam servindo versão dev cached.

---

## Fase XI — Smoke test end-to-end

**Goal:** Compra real (cartão sandbox) percorrendo o funil inteiro. Sair com confiança total que tudo funciona em produção. Após esse smoke test, ativar o produto (sair de Rascunho) e ir ao ar.

**Pré-requisitos:** Fases I-X concluídas. Pelo menos Módulos I e II com vídeos reais (warning de go-live).

**Tempo estimado:** 45 min

### Steps

**Preparação (~5 min)**

1. Abrir 3 abas:
   - **(a)** `https://seudominio.com.br/landing/?reveal=true`
   - **(b)** `https://business.facebook.com/events_manager` > seu pixel > Test Events
   - **(c)** GTM Preview Mode (`tagmanager.google.com` > seu container > Preview > digitar URL da landing > Connect)

2. Ter à mão o cartão de teste Kiwify:
   - Número: `4111 1111 1111 1111`
   - CVV: `123`
   - Validade: qualquer data futura
   - Nome: qualquer

**Fluxo (~30 min)**

3. **Aba (a):** Clicar `QUERO ACESSAR O MÉTODO`. Verificar:
   - Vai pra `compre.seudominio.com.br/<id>` (se Pro) ou `pay.kiwify.com.br/<id>`
   - Order Bump da Xícara de Ouro aparece visível abaixo dos campos de cartão

4. **Marcar Order Bump.** Verificar:
   - Subtotal muda de R$ 197,00 → R$ 224,90 (R$ 197 + R$ 27,90)

5. **Preencher cartão de teste e finalizar.**

6. **Pagamento aprovado.** Verificar:
   - Redirect imediato pra `seudominio.com.br/upsell/`
   - Página do upsell carrega com vídeo

7. **Esperar reveal do upsell aos 1:30** (ou usar `?reveal=true` se quiser pular o vídeo).

8. **Clicar `SIM, QUERO ADICIONAR O CLUBE VIDA LEVE`.** Verificar:
   - 1-click upsell processa SEM pedir cartão de novo
   - Após confirmação, redireciona pra área de membros

9. **Área de membros.** Verificar:
   - Login automático funciona (Kiwify gera credenciais via e-mail)
   - Módulos I e II destravados
   - Módulos III, IV, V com cadeado e mensagem "destrava em X dias"
   - Bônus PDFs visíveis no Módulo I e fazem download corretamente

**Validação de tracking (~10 min)**

10. **Aba (b) Events Manager:** verificar 4 eventos chegaram:
    - `InitiateCheckout` (do clique inicial)
    - `AddPaymentInfo` (do preenchimento do cartão)
    - `Purchase R$ 224,90` (compra principal + Order Bump) — fonte BOTH `Browser` + `Server` (CAPI) — Match Quality > 7.0
    - `Purchase R$ 297` (do upsell) — separado, mesma fonte dupla

11. **Aba (c) GTM Preview:** verificar tags disparadas:
    - PageView no carregamento de cada página
    - Custom events: `vsl_played`, `vsl_reveal`, `cta_click`, `upsell_played`, `upsell_reveal`, `upsell_accept`

12. **Console do browser nas 2 páginas:** ZERO erros vermelhos. Warnings de cache OK, mas erros de script ou network não.

### Verificação ✓ (final)

Após todos os steps acima:
- ✅ Compra principal processou e Order Bump cobrado corretamente
- ✅ Redirect pra upsell automático e instantâneo
- ✅ 1-click upsell aceito sem fricção
- ✅ Acesso à área de membros liberado
- ✅ Drip funcionando (módulos travados conforme regra de 8/15 dias)
- ✅ Pixel client + CAPI dedup funcionando, Match Quality > 7.0
- ✅ Console limpo

**Se TODOS os checks passaram:**

```
1. Voltar em Kiwify > Produtos > Método Desinflamação Pro: mudar status de "Rascunho" para "Ativo"
2. Mesma coisa em Clube Vida Leve
3. Reembolsar a compra-teste em Kiwify > Vendas > [sua compra-teste] > Estornar
4. Comemorar — você está no ar
```

### Common pitfalls ⚠

- ⚠ **Cartão de teste não funciona em modo produção** — verificar que está em modo Sandbox (Kiwify > Configurações > Sandbox). Após validar tudo, sair do sandbox.
- ⚠ **Pixel dispara duplicado** (uma vez por click duplo, etc.) — verificar `event_id` deduplicação em Events Manager.
- ⚠ **Cliente recebe acesso à área de membros antes do redirect concluir** — race condition rara; aumentar tempo de espera no redirect Kiwify pra 1s se acontecer.
- ⚠ **Esquecer de reembolsar a compra-teste** — fica como venda real no relatório financeiro e na Receita Federal. Estornar imediatamente após smoke test.
- ⚠ **Ativar produto antes de ter aulas dos Módulos I e II** — relembrando o warning de go-live: cliente compra, abre área de membros vazia, pede reembolso garantido + queima a marca.

---

## Lista consolidada de placeholders

Tudo que precisa ser substituído antes do go-live, em ordem de aparição no código. **Anote os valores reais conforme você passa pelas fases — depois usa essa tabela como roteiro de Find & Replace na Fase X.**

### `landing/content.js`

| Linha aprox | Placeholder atual | Vira | Fonte (de qual fase pegar) |
|---|---|---|---|
| 8 | `VIDEO_ID: '76979871'` | ID do Vimeo Pro do VSL | Após upload do VSL no Vimeo |
| 13 | `META_PIXEL_ID: 'XXXXXXXXXXXX'` | 16 dígitos do Pixel ID | Fase VII step 3 |
| 14 | `GTM_ID: 'GTM-XXXXXXX'` | `GTM-<seu-ID>` | Fase VII step 9 |
| 17 | `KIWIFY_CHECKOUT_URL: '...SUBSTITUIR_COM_LINK_REAL'` | URL completa do checkout do Método | Fase I step 10 |

### `upsell/content.js`

| Linha aprox | Placeholder atual | Vira | Fonte |
|---|---|---|---|
| 8 | `VIDEO_ID: '76979871'` | ID do Vimeo Pro do upsell video (2-3min) | Após produção do upsell video |
| 13 | `META_PIXEL_ID: 'XXXXXXXXXXXX'` | mesmo da landing | Fase VII |
| 14 | `GTM_ID: 'GTM-XXXXXXX'` | mesmo da landing | Fase VII |
| 17 | `KIWIFY_ACCEPT_URL: '...SUBSTITUIR_LINK_UPSELL_ACEITAR_1CLICK'` | URL real de aceite 1-click | Fase III step 10 |
| 18 | `KIWIFY_DECLINE_URL: 'https://desinflamacao.com.br/membros/?skip_upsell=1'` | URL da área de membros | Fase IX step 8 |

### `landing/index.html`

| Onde | Placeholder atual | Vira | Fonte |
|---|---|---|---|
| `<script type="application/ld+json">` JSON-LD `"url"` | `"https://desinflamacao.com.br/"` | URL real do domínio | Fase VI |
| `<script type="application/ld+json">` JSON-LD `"image"` | `"https://desinflamacao.com.br/landing/assets/og-image.jpg"` | URL real do og-image | Fase VI |
| `<link rel="canonical">` | `href="https://desinflamacao.com.br/"` | URL real | Fase VI |
| GTM `<noscript>` no `<body>` | `id=GTM-XXXXXXX` | `GTM-<seu-ID>` | Fase VII |

### Cache-busting (recomendado bumpar antes do go-live)

Em ambos `landing/index.html` e `upsell/index.html`, todos os imports usam `?v=20260507d`. Antes do go-live, trocar para `?v=PROD-<data-do-go-live>` pra forçar refresh em qualquer cliente que tenha visitado versões dev anteriormente.

Comando rápido (substitua a data):

```bash
sed -i 's/?v=20260507d/?v=PROD-20260520/g' landing/index.html upsell/index.html
git add landing/index.html upsell/index.html
git commit -m "chore: bump cache-bust antes do go-live"
git push
```

---

## Anexos

### Anexo A: Cartão de teste Kiwify (modo Sandbox)

```
Número:    4111 1111 1111 1111
CVV:       123
Validade:  qualquer data futura (ex: 12/2030)
Nome:      qualquer nome
CPF:       000.000.000-00 (Kiwify aceita CPFs inválidos no sandbox)
```

⚠ Esses dados só funcionam em **modo Sandbox**. Para ativar:
- Kiwify > Configurações > Modo Sandbox: `Ativado`
- Após smoke test, **desativar**: Modo Sandbox: `Desativado`

### Anexo B: Texto pronto pro Order Bump (Xícara de Ouro)

Copiar e colar no campo "Texto exibido no checkout" da Fase II:

```
Adicione 15 receitas exclusivas de chás termogênicos anti-inflamatórios, testados pelo método. PDF + entregue junto com o curso.
```

(140 caracteres exatos, testado em copy testes — não modificar.)

### Anexo C: Prompt nano-banana2 pro poster do Order Bump

Salvar em `nano-banana2/prompts/landing/order-bump-xicara.json`:

```json
{
  "prompt": "Cinematic editorial photography of a small antique porcelain teacup filled with steaming amber-honey colored herbal infusion, single warm gold key light from upper-left at 45 degrees, deep emerald-tinted carbon background (#0F1B15 to #050A07), micro-scratches on cup rim suggesting wear, faint steam vapor catching the gold light beam, dust particles drifting in the light, weathered dark stone surface beneath, shot on Hasselblad H6D-100c 80mm f/2.8 ISO 200, shallow depth of field with focus on the teacup rim, rich shadow detail with deep blacks not crushed, mood of silent expensive longevity clinic at dusk. No human, no text overlay, no commercial gloss, no oversaturated colors, documentary realism, restrained composition.",
  "negative_prompt": "no human, no text overlay, no logo, no commercial product look, plastic skin, beautification filters, oversaturated colors, depth flattening, CGI, cartoon, illustration, painting, blurry, distorted, overexposed, watermark, more realistic reinterpretation",
  "api_parameters": {
    "resolution": "2K",
    "output_format": "jpg",
    "aspect_ratio": "1:1"
  },
  "settings": {
    "style": "cinematic editorial product photography Bio-Premium",
    "lighting": "single warm gold key light upper-left 45 degrees, deep falloff",
    "camera_angle": "slight tabletop high-angle",
    "depth_of_field": "shallow f/2.8",
    "quality": "high detail, rich shadow detail, deep blacks not crushed"
  }
}
```

Rodar:
```bash
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/landing/order-bump-xicara.json nano-banana2/images/landing/order-bump-xicara.jpg "1:1"
```

### Anexo D: Como exportar os PDFs em Botanique

Os 3 PDFs (Guia, Planner, Receitas) são gerados pelos templates HTML em `pdfs/`. Para exportar como PDF de verdade pra upload na área de membros:

1. Abrir o template no navegador:
   ```
   http://localhost:8082/pdfs/guia-compras.html
   http://localhost:8082/pdfs/planner-6-dias.html
   http://localhost:8082/pdfs/receitas-15min.html
   ```
2. `Ctrl+P` (ou `Cmd+P` no Mac)
3. Destino: `Salvar como PDF`
4. Layout: `Retrato`
5. Margens: `Padrão` (já configurado no `@page`)
6. Em "Mais configurações":
   - Desabilitar `Cabeçalhos e rodapés`
   - **Manter habilitado** `Plano de fundo` (preserva a paleta Botanique parchment)
7. Salvar como:
   - `metodo-desinflamacao-bonus-1-guia-compras.pdf`
   - `metodo-desinflamacao-bonus-2-planner-6-dias.pdf`
   - `metodo-desinflamacao-bonus-3-receitas-15min.pdf`

Quando os capítulos II-IV do Guia, dias III-VI do Planner e receitas 3-30 forem produzidos, repetir o export para a versão final.

### Anexo E: Referências cruzadas

- **Spec deste checklist:** `docs/superpowers/specs/2026-05-07-checklist-kiwify-hotmart-design.md`
- **Plano de execução deste checklist:** `docs/superpowers/plans/2026-05-07-checklist-kiwify-implementation.md`
- **Currículo das 26 aulas:** `docs/curriculo-metodo-desinflamacao.md`
- **Roteiro completo da VSL:** `docs/roteiro-vsl-metodo-desinflamacao.md`
- **Sistema visual Bio-Premium:** `docs/superpowers/specs/2026-05-07-identidade-visual-bio-premium-design.md`
- **Spec da landing page:** `docs/superpowers/specs/2026-05-07-landing-page-vsl-design.md`
- **Templates dos PDFs:** `pdfs/style.css`, `pdfs/guia-compras.html`, `pdfs/planner-6-dias.html`, `pdfs/receitas-15min.html`

### Anexo F: Domínio sugerido

Algumas opções defensáveis para registro:

- `desinflamacao.com.br` — direto, descritivo, alinhado com a marca
- `metododesinflamacao.com.br` — mais formal, talvez longo demais
- `protocolodesinflamacao.com.br` — formal
- `desinflame.com.br` — verbal, imperativo, ousado
- `silenciocelular.com.br` — conceitual, mais reservado

Verificar disponibilidade em `https://registro.br`. Custo médio: R$ 40/ano para `.com.br`.

---

**Fim do checklist.** Após Fase XI bem-sucedida, você está formalmente em produção. Bem-vindo ao ar.


