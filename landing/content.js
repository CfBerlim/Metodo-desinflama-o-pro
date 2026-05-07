/* ==========================================================================
   CONTENT.JS — variáveis substituíveis antes do deploy
   AJUSTAR: VIDEO_ID, META_PIXEL_ID, GTM_ID, KIWIFY_CHECKOUT_URL antes de produção
   ========================================================================== */

window.LANDING_CONFIG = {
  // Vimeo Pro video ID — substituir pelo ID real do vídeo
  VIDEO_ID: '76979871',  // PLACEHOLDER — Vimeo demo público pra dev
  REVEAL_THRESHOLD_SECONDS: 240,  // 4:00

  // Tracking IDs — substituir antes do deploy
  META_PIXEL_ID: 'XXXXXXXXXXXX',
  GTM_ID: 'GTM-XXXXXXX',

  // Checkout URL — substituir pelo link real da Kiwify/Hotmart
  KIWIFY_CHECKOUT_URL: 'https://pay.kiwify.com.br/SUBSTITUIR_COM_LINK_REAL',

  // Suporte / contato
  SUPPORT_EMAIL: 'contato@desinflamacao.com.br',
};

/* Copy editável — substituir pelo copy final sem mexer no HTML */
window.LANDING_COPY = {
  hero: {
    eyebrow: 'PARA QUEM CANSOU DE DIETAS',
    manchete: 'Como desligar o interruptor da inflamação celular que está travando seu emagrecimento.',
    subtitulo: 'O método cientificamente comprovado para limpar seu organismo em 21 dias — sem dietas de fome, sem remédios, sem academia.',
    lockNote: '— O acesso ao Método é revelado aos 4 minutos do vídeo —',
  },
  modulos: [
    { roman: 'I', titulo: 'O Mecanismo', desc: 'A biologia da inflamação celular crônica e por que dietas tradicionais falham miseravelmente.', aulas: '4 aulas' },
    { roman: 'II', titulo: 'O Reset', desc: 'O Desafio dos 6 Dias — o protocolo prático de adição que apaga o incêndio invisível.', aulas: '6 aulas' },
    { roman: 'III', titulo: 'A Cozinha de Poder', desc: 'Receitas e compras estratégicas. O que comprar na feira, o que fazer no fogão.', aulas: '5 aulas' },
    { roman: 'IV', titulo: 'O Estilo de Vida', desc: 'Sono, stress, exposição solar — os pilares anti-inflamatórios além da comida.', aulas: '5 aulas' },
    { roman: 'V', titulo: 'A Manutenção', desc: 'Protocolo de longo prazo, ajustes para fases da vida, atletismo e idade avançada.', aulas: '6 aulas' },
  ],
  bonus: [
    { roman: 'I', titulo: 'Guia de Compras Sem Erro', desc: 'A lista exata de 47 ingredientes anti-inflamatórios da feira, com preços médios e onde encontrar.', meta: 'PDF · 32 páginas' },
    { roman: 'II', titulo: 'Planner do Desafio 6 Dias', desc: 'Checklist diário do reset, com receitas e refeições já planejadas para os 6 dias.', meta: 'PDF · 24 páginas' },
    { roman: 'III', titulo: 'Receitas 15 Minutos de Poder', desc: '30 receitas anti-inflamatórias, todas em menos de 15 minutos de preparo.', meta: 'PDF · 48 páginas' },
  ],
  garantia: {
    headline: 'Sete dias para sentir. Zero risco.',
    texto: 'Você tem 7 dias completos para experimentar o método. Se em qualquer momento dentro desse período sentir que não é pra você, basta um e-mail e devolvemos 100% do investimento. Sem perguntas, sem fricção.',
    label: '7 DIAS · GARANTIA · INCONDICIONAL',
  },
  oferta: {
    items: [
      { titulo: 'Método Desinflamação Pro', desc: '5 módulos · 26 aulas', valor: 'R$ 897' },
      { titulo: 'Bônus I · Guia de Compras', desc: 'PDF 32 páginas', valor: 'R$ 97' },
      { titulo: 'Bônus II · Planner 6 Dias', desc: 'PDF 24 páginas', valor: 'R$ 47' },
      { titulo: 'Bônus III · Receitas 15 min', desc: 'PDF 48 páginas', valor: 'R$ 77' },
    ],
    valorTotalAncora: 'R$ 1.118',
    parcelado: '12× R$ 19,70',
    avista: 'R$ 197 à vista',
    contexto: 'Hoje, com o lançamento:',
  },
  cta: {
    eyebrow: 'Última oportunidade',
    botao: 'QUERO ACESSAR O MÉTODO',
    seguranca: ['Compra 100% segura · Acesso imediato', 'Garantia incondicional 7 dias'],
  },
};
