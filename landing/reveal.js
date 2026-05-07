/* ==========================================================================
   REVEAL.JS — detector do segundo 240 do Vimeo + revelação das seções
   Trigger: timeupdate >= REVEAL_THRESHOLD_SECONDS
   Dev mode: ?reveal=true na URL força revelação imediata
   Fallback: setTimeout de 6min como guard de última instância
   ========================================================================== */

(function() {
  const cfg = window.LANDING_CONFIG;
  if (!cfg) {
    console.warn('LANDING_CONFIG não definido. reveal.js abortado.');
    return;
  }

  const THRESHOLD = cfg.REVEAL_THRESHOLD_SECONDS || 240;
  let revealed = false;

  function reveal(source) {
    if (revealed) return;
    revealed = true;

    document.body.classList.add('revealed');

    // Tracking
    if (window.fbq) {
      try { fbq('trackCustom', 'VSLReveal', { source }); } catch (_) {}
    }
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'vsl_reveal', source });
    }

    // Foco para acessibilidade
    setTimeout(() => {
      const target = document.getElementById('below-fold');
      if (target) {
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  }

  // Modo dev: ?reveal=true força reveal imediato
  if (new URLSearchParams(location.search).has('reveal')) {
    reveal('dev_mode');
    return;
  }

  // Aguarda Vimeo SDK carregar
  function attachVimeoListener() {
    if (typeof Vimeo === 'undefined') {
      // SDK ainda não carregou — tenta de novo em 200ms (max 50 tentativas = 10s)
      attachVimeoListener.attempts = (attachVimeoListener.attempts || 0) + 1;
      if (attachVimeoListener.attempts > 50) {
        console.error('Vimeo SDK não carregou em 10s. Aplicando fallback timeout.');
        setTimeout(() => reveal('fallback_no_sdk'), 360_000);
        return;
      }
      setTimeout(attachVimeoListener, 200);
      return;
    }

    const iframe = document.getElementById('vsl-player');
    if (!iframe) {
      console.error('vsl-player iframe não encontrado.');
      return;
    }

    const player = new Vimeo.Player(iframe);

    // Track de play (para Meta/GTM)
    player.on('play', () => {
      if (window.fbq) {
        try { fbq('trackCustom', 'VSLPlayed'); } catch (_) {}
      }
      if (window.dataLayer) window.dataLayer.push({ event: 'vsl_played' });
    });

    // Detector principal
    player.on('timeupdate', (data) => {
      if (data.seconds >= THRESHOLD) {
        reveal('timeupdate');
      }
    });

    // Se o usuário deu seek manual além do limite, ainda revela
    player.on('seeked', (data) => {
      if (data.seconds >= THRESHOLD) {
        reveal('seeked');
      }
    });

    // Safety: se o vídeo terminar antes de atingir o threshold (vídeo curto, dev, ou edição equivocada), revela mesmo assim — cliente não fica travado num lock que nunca abre
    player.on('ended', () => {
      reveal('video_ended');
    });

    // Quartis de retenção (analytics)
    let quartilesFired = { 25: false, 50: false, 75: false, 95: false };
    player.getDuration().then(duration => {
      player.on('timeupdate', (data) => {
        const pct = (data.seconds / duration) * 100;
        [25, 50, 75, 95].forEach(q => {
          if (pct >= q && !quartilesFired[q]) {
            quartilesFired[q] = true;
            if (window.fbq) {
              try { fbq('trackCustom', `VSL${q}`); } catch (_) {}
            }
            if (window.dataLayer) window.dataLayer.push({ event: `vsl_${q}` });
          }
        });
      });
    });
  }

  attachVimeoListener();

  // Fallback de emergência: garante reveal em 6 min mesmo se Vimeo falhar completamente
  setTimeout(() => {
    if (!revealed) reveal('fallback_timeout');
  }, 360_000);
})();
