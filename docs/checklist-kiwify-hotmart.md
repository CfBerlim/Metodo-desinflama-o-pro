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
