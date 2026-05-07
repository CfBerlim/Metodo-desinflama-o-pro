/* ==========================================================================
   CONTENT.JS — config (URLs, IDs) editável antes do deploy.
   AJUSTAR: VIDEO_ID (quando Vimeo real existir), pixels, KIWIFY_CHECKOUT_URL
   ========================================================================== */

window.LANDING_CONFIG = {
  // Vimeo Pro video ID — futuro: substituir player simulado pelo iframe Vimeo
  VIDEO_ID: '76979871',  // PLACEHOLDER (player simulado por enquanto)
  REVEAL_THRESHOLD_SECONDS: 240,  // 4:00

  // Tracking IDs — substituir antes do deploy
  META_PIXEL_ID: 'XXXXXXXXXXXX',
  GTM_ID: 'GTM-XXXXXXX',

  // Checkout URL — substituir pelo link real da Kiwify/Hotmart
  KIWIFY_CHECKOUT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_COM_LINK_REAL',

  // Suporte
  SUPPORT_EMAIL: 'contato@desinflamacaopro.com.br',
};
