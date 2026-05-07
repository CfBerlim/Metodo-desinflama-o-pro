# Americo Alimentação Saudável

## Geração de imagens

Quando o usuário pedir para **gerar, criar, produzir, renderizar ou "fazer" qualquer imagem** — fotos de produto, food photography, cenas lifestyle, anúncios, retratos, infográficos, qualquer visual — siga `nano-banana2/SKILL.md`. Ela define o schema JSON denso-narrativo e dispara a API Kie.ai Nano Banana 2 (Gemini 3.1 Flash).

Vale **inclusive** quando o pedido vem casual ("faz uma foto de X", "gera uma imagem de Y", "renderiza", "cria uma foto realista de Z") e independentemente do idioma — português ou inglês.

### Convenções deste projeto

- Prompt JSON em `nano-banana2/prompts/<categoria>/<nome>.json`
- Imagem gerada em `nano-banana2/images/<categoria>/<nome>.<ext>`
- Categoria livre — algo descritivo como `product_ads`, `food`, `lifestyle`, `portraits`, `embalagens`. Use `miscellaneous` quando não couber em nada.
- Para várias imagens no mesmo turno, dispare cada `python …` em chamadas Bash paralelas. Kie.ai aguenta concorrência e fica mais rápido.

### Como rodar

A partir da raiz deste projeto (cwd default do Claude Code):

```bash
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/<categoria>/<nome>.json nano-banana2/images/<categoria>/<nome>.jpg "4:5"
```

### Pré-requisitos

- `KIE_AI_API_KEY` em variável de ambiente OU em `.env` (raiz do projeto ou em `~`).
- `pip install requests` (única dependência além da stdlib).
