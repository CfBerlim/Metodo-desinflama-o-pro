/* ==========================================================================
   REVEAL.JS — detector do segundo 90 (1:30) do Vimeo + revelação da oferta
   Pattern idêntico ao landing/reveal.js mas com threshold curto.
   Dev mode: ?reveal=true força revelação imediata
   Fallback: setTimeout de 4min como guard de última instância
   ========================================================================== */

(function() {
  const cfg = window.UPSELL_CONFIG;
  if (!cfg) {
    console.warn('[upsell-reveal] UPSELL_CONFIG não definido. Abortado.');
    return;
  }

  const THRESHOLD = cfg.REVEAL_THRESHOLD_SECONDS || 90;
  let revealed = false;
  let videoDuration = 0;

  console.info(`[upsell-reveal] inicializando. Threshold padrão: ${THRESHOLD}s.`);

  function reveal(source) {
    if (revealed) return;
    revealed = true;

    console.info(`[upsell-reveal] DISPARADO. Source: ${source}`);
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

  function effectiveThreshold() {
    if (videoDuration > 0 && videoDuration < THRESHOLD) {
      return Math.max(videoDuration * 0.95, 5);
    }
    return THRESHOLD;
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
    console.info('[upsell-reveal] Vimeo Player criado, listeners ativos.');

    player.getDuration().then(d => {
      videoDuration = d;
      console.info(`[upsell-reveal] Duração: ${d.toFixed(1)}s. Threshold efetivo: ${effectiveThreshold().toFixed(1)}s.`);
      if (d < THRESHOLD) {
        console.warn(`[upsell-reveal] Vídeo (${d.toFixed(1)}s) menor que threshold (${THRESHOLD}s) — auto-ajustando.`);
      }
    }).catch(err => console.warn('[upsell-reveal] getDuration falhou:', err));

    player.on('play', () => {
      console.info('[upsell-reveal] vídeo: play');
      if (window.fbq) {
        try { fbq('trackCustom', 'UpsellPlayed'); } catch (_) {}
      }
      if (window.dataLayer) window.dataLayer.push({ event: 'upsell_played' });
    });

    player.on('timeupdate', (data) => {
      if (data.seconds >= effectiveThreshold()) reveal('timeupdate');
    });

    player.on('seeked', (data) => {
      if (data.seconds >= effectiveThreshold()) reveal('seeked');
    });

    player.on('ended', () => {
      console.info('[upsell-reveal] vídeo: ended');
      reveal('video_ended');
    });
  }

  attachVimeoListener();

  // Fallback de emergência: 4 minutos
  setTimeout(() => {
    if (!revealed) reveal('fallback_timeout');
  }, 240_000);
})();
