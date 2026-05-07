/* ==========================================================================
   REVEAL.JS — detector do segundo 90 (1:30) do Vimeo + revelação da oferta
   Pattern idêntico ao landing/reveal.js mas com threshold curto.
   Dev mode: ?reveal=true força revelação imediata
   Fallback: setTimeout de 4min como guard de última instância
   ========================================================================== */

(function() {
  const cfg = window.UPSELL_CONFIG;
  if (!cfg) {
    console.warn('UPSELL_CONFIG não definido. reveal.js abortado.');
    return;
  }

  const THRESHOLD = cfg.REVEAL_THRESHOLD_SECONDS || 90;
  let revealed = false;

  function reveal(source) {
    if (revealed) return;
    revealed = true;

    document.body.classList.add('revealed');

    if (window.fbq) {
      try { fbq('trackCustom', 'UpsellReveal', { source }); } catch (_) {}
    }
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'upsell_reveal', source });
    }

    setTimeout(() => {
      const target = document.getElementById('upsell-actions');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  }

  if (new URLSearchParams(location.search).has('reveal')) {
    reveal('dev_mode');
    return;
  }

  function attachVimeoListener() {
    if (typeof Vimeo === 'undefined') {
      attachVimeoListener.attempts = (attachVimeoListener.attempts || 0) + 1;
      if (attachVimeoListener.attempts > 50) {
        console.error('Vimeo SDK não carregou em 10s. Aplicando fallback.');
        setTimeout(() => reveal('fallback_no_sdk'), 240_000);  // 4 min
        return;
      }
      setTimeout(attachVimeoListener, 200);
      return;
    }

    const iframe = document.getElementById('upsell-vsl');
    if (!iframe) {
      console.error('upsell-vsl iframe não encontrado.');
      return;
    }

    const player = new Vimeo.Player(iframe);

    player.on('play', () => {
      if (window.fbq) {
        try { fbq('trackCustom', 'UpsellPlayed'); } catch (_) {}
      }
      if (window.dataLayer) window.dataLayer.push({ event: 'upsell_played' });
    });

    player.on('timeupdate', (data) => {
      if (data.seconds >= THRESHOLD) reveal('timeupdate');
    });

    player.on('seeked', (data) => {
      if (data.seconds >= THRESHOLD) reveal('seeked');
    });
  }

  attachVimeoListener();

  // Fallback de emergência: 4 minutos
  setTimeout(() => {
    if (!revealed) reveal('fallback_timeout');
  }, 240_000);
})();
