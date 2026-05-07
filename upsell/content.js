/* ==========================================================================
   UPSELL CONTENT.JS — config (URLs, IDs)
   AJUSTAR: KIWIFY_ACCEPT_URL, KIWIFY_DECLINE_URL, pixels
   ========================================================================== */

window.UPSELL_CONFIG = {
  // URLs Kiwify — substituir antes do deploy
  KIWIFY_ACCEPT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_LINK_UPSELL_ACEITAR_1CLICK',
  KIWIFY_DECLINE_URL: 'https://desinflamacaopro.com.br/membros/?skip_upsell=1',

  // Tracking
  META_PIXEL_ID: 'XXXXXXXXXXXX',
  GTM_ID: 'GTM-XXXXXXX',

  // Valores do upsell pra Purchase event
  UPSELL_VALUE: 147.00,
  UPSELL_CURRENCY: 'BRL',

  SUPPORT_EMAIL: 'contato@desinflamacaopro.com.br',
};
