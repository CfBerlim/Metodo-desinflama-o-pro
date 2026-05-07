# Instruções para o Gemini neste projeto

Este arquivo é carregado automaticamente pelo Gemini CLI quando você entra em qualquer subdiretório deste repositório.

## Sobre o projeto

Funil de vendas Bio-Premium para o infoproduto **Método Desinflamação Pro**. Padrão estético de luxo silencioso (Patek Philippe, Hermès, Aman, Augustinus Bader). Mobile-first. Vanilla HTML/CSS/JS, zero build, zero framework.

Para o panorama completo (arquitetura do funil, todas as superfícies, mecânica de _reveal_, como rodar), leia `README.md` na raiz **antes** de começar qualquer tarefa.

## Geração de imagens

Quando o usuário pedir para **gerar, criar, produzir, renderizar ou "fazer" qualquer imagem** — fotos de produto, food photography, cenas lifestyle, anúncios, retratos, infográficos, qualquer visual — siga `nano-banana2/SKILL.md`. Ela define o schema JSON denso-narrativo e dispara a API Kie.ai Nano Banana 2 (Gemini 3.1 Flash).

Vale **inclusive** quando o pedido vem casual ("faz uma foto de X", "gera uma imagem de Y", "renderiza", "cria uma foto realista de Z") e independentemente do idioma — português ou inglês.

### Convenções

- Prompt JSON em `nano-banana2/prompts/<categoria>/<nome>.json`
- Imagem gerada em `nano-banana2/images/<categoria>/<nome>.<ext>`
- Categoria livre — algo descritivo como `product_ads`, `food`, `lifestyle`, `portraits`, `embalagens`. Use `miscellaneous` quando não couber em nada.
- Para várias imagens no mesmo turno, dispare cada `python …` em chamadas paralelas — Kie.ai aguenta concorrência.

### Como rodar (a partir da raiz do projeto)

```bash
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/<categoria>/<nome>.json nano-banana2/images/<categoria>/<nome>.jpg "4:5"
```

### Pré-requisitos

- `KIE_AI_API_KEY` em variável de ambiente OU em `.env` (raiz do projeto ou em `~`).
- `pip install requests` (única dependência além da stdlib).

## Idioma

O usuário trabalha em **PT-BR**. Toda a copy do funil, documentação, commits e respostas ao usuário devem ser em português brasileiro. Identificadores de código permanecem em inglês quando seguindo a convenção do framework/lib (ex: `KIWIFY_CHECKOUT_URL`).

## Padrão estético — luxo silencioso, NÃO wellness mass-market

Referências corretas: Patek Philippe, Hermès, Aman Resorts, Augustinus Bader, La Prairie.
Referências **erradas**: Sephora, Whole Foods, branding de chá fitness, "wellness millennial".

Tipografia: serifas cerimoniais (Italiana, Cormorant Garamond, Marcellus SC) + Inter pra corpo. Cores: emerald + gold + parchment + carbon. Paleta inteira em `identity/tokens.css`.

## Antes de editar código

1. Servidor local sobe com `python -m http.server 8082` na raiz
2. Abrir `validacao/index.html` mostra 4 superfícies em iframes pra QA rápida
3. Cache busting: bumpar `?v=YYYYMMDDx` nos `<link>` e `<script>` quando editar CSS/JS
4. Mobile-first sempre — começar em 480px, alargar com `@media (min-width: 768px)`

## O que NÃO fazer

- Não introduzir framework JS (Vue/React/etc) — projeto é vanilla por decisão
- Não introduzir bundler (webpack/vite) — projeto é zero-build por decisão
- Não usar `opacity: 0` pra esconder reveal-zone — usar `display: none` (já errado uma vez, layout reservava espaço vazio)
- Não criar arquivos `.md` de documentação a menos que explicitamente pedido
- Não commitar com `.env`, chaves, ou tokens
- Não substituir placeholders (`SUBSTITUIR_*`, `XXXXXXX`) sem confirmação — eles são intencionais até o deploy real

## Documentos de referência

- `README.md` — panorama completo (arquitetura, superfícies, como rodar)
- `AGENTS.md` — convenções universais pra qualquer agente
- `CHANGELOG.md` — histórico de versões do funil
- `docs/roteiro-vsl-metodo-desinflamacao.md` — roteiro da VSL longa
- `docs/curriculo-metodo-desinflamacao.md` — currículo das 26 aulas
- `docs/checklist-kiwify-hotmart.md` — checklist linear pra deploy
- `nano-banana2/SKILL.md` — schema de prompts pra geração de imagem
