/* ==========================================================================
   TRACKING.JS — bootstrap do Meta Pixel e Google Tag Manager
   IDs vêm de window.LANDING_CONFIG (substituídos antes do deploy)
   ========================================================================== */

(function() {
  const cfg = window.LANDING_CONFIG;
  if (!cfg) {
    console.warn('LANDING_CONFIG não definido. tracking.js abortado.');
    return;
  }

  // Meta Pixel
  if (cfg.META_PIXEL_ID && cfg.META_PIXEL_ID !== 'XXXXXXXXXXXX') {
    !function(f,b,e,v,n,t,s) {
      if(f.fbq) return;
      n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq) f._fbq=n;
      n.push=n; n.loaded=!0; n.version='2.0';
      n.queue=[]; t=b.createElement(e); t.async=!0; t.src=v;
      s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', cfg.META_PIXEL_ID);
    fbq('track', 'PageView');
  } else {
    console.info('META_PIXEL_ID não configurado — Meta Pixel inativo.');
  }

  // Google Tag Manager
  if (cfg.GTM_ID && cfg.GTM_ID !== 'GTM-XXXXXXX') {
    (function(w,d,s,l,i) {
      w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
      j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',cfg.GTM_ID);
  } else {
    console.info('GTM_ID não configurado — Google Tag Manager inativo.');
    window.dataLayer = window.dataLayer || [];
  }

  // ScrollDepth tracker (quartis 25/50/75/100)
  let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
  function trackScrollDepth() {
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    const pct = (scrolled / total) * 100;
    [25, 50, 75, 100].forEach(q => {
      if (pct >= q && !scrollMarks[q]) {
        scrollMarks[q] = true;
        if (window.dataLayer) window.dataLayer.push({ event: `scroll_depth_${q}` });
        if (window.fbq) {
          try { fbq('trackCustom', `ScrollDepth${q}`); } catch (_) {}
        }
      }
    });
  }
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
})();
