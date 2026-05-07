/* ==========================================================================
   UPSELL CONTENT.JS — Clube Vida Leve
   AJUSTAR antes do deploy: VIDEO_ID, KIWIFY_ACCEPT_URL, KIWIFY_DECLINE_URL,
   META_PIXEL_ID, GTM_ID
   ========================================================================== */

window.UPSELL_CONFIG = {
  // Vimeo Pro video ID — substituir pelo ID real do upsell video (2-3min)
  VIDEO_ID: '76979871',  // PLACEHOLDER — Vimeo demo público pra dev
  REVEAL_THRESHOLD_SECONDS: 90,  // 1:30 — vídeo é curto, revelação cedo

  // URLs de 1-click upsell (Kiwify/Hotmart) — substituir antes do deploy
  KIWIFY_ACCEPT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_LINK_UPSELL_ACEITAR_1CLICK',
  KIWIFY_DECLINE_URL: 'https://desinflamacao.com.br/membros/?skip_upsell=1',  // ou URL da área de membros direto

  // Tracking IDs (mesmos da landing)
  META_PIXEL_ID: 'XXXXXXXXXXXX',
  GTM_ID: 'GTM-XXXXXXX',

  // Suporte
  SUPPORT_EMAIL: 'contato@desinflamacao.com.br',

  // Valor do upsell (para tracking de Purchase event)
  UPSELL_VALUE: 297.00,
  UPSELL_CURRENCY: 'BRL',
};

window.UPSELL_COPY = {
  topbar: {
    status: 'PEDIDO APROVADO · MEMBRO #2026',  // placeholder; idealmente dinâmico via URL params
  },
  hero: {
    eyebrow: 'UMA ÚLTIMA OFERTA — APENAS NESTA TELA',
    manchete: 'Antes de você acessar o Método...',
    sub: 'Existe uma maneira de garantir que você nunca mais precise pensar em "o que comer hoje" pelos próximos doze meses.',
    lockNote: '— A oferta é revelada aos 1:30 do vídeo —',
  },
  oferta: {
    eyebrow: 'CLUBE VIDA LEVE',
    titulo: 'Trezentos e sessenta e cinco dias',
    tituloItalic: 'de refeições anti-inflamatórias prontas.',
    descricao: 'Toda manhã, um cardápio do dia chega no seu app: café da manhã, almoço, jantar e snacks — sequenciados pra manter o silêncio celular indefinidamente. Lista de compras semanal pré-pronta. Adapta automaticamente para vegetariano, low-carb, sem lactose, ou conforme sua restrição.',
    incluiTitulo: 'O que está incluso:',
    inclui: [
      'Cardápio diário sequenciado por trezentos e sessenta e cinco dias',
      'Lista de compras semanal pré-pronta',
      'Receitas em quinze minutos para os dias corridos',
      'Adaptações por restrição (vegetariano, sem lactose, low-carb)',
      'Atualização sazonal (com ingredientes da feira do mês)',
    ],
  },
  pricing: {
    contexto: 'Hoje, com a sua compra do Método:',
    valorAncora: 'Assinatura mensal × 12: R$ 564',
    parcelado: '12× R$ 29,70',
    avista: 'ou R$ 297 à vista',
    economia: 'Você economiza R$ 267 hoje — quase metade.',
  },
  garantia: 'A mesma garantia incondicional de 7 dias se estende ao Clube. Se mudar de ideia, devolvemos sem perguntas.',
  cta: {
    aceitar: 'SIM, QUERO ADICIONAR O CLUBE VIDA LEVE',
    aceitarSub: '12× R$ 29,70 — adicionado em um clique, sem digitar cartão de novo',
    recusar: 'Não, obrigado. Prefiro continuar apenas com o Método.',
  },
};
