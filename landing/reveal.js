/* ==========================================================================
   REVEAL.JS — detector do segundo 240 do Vimeo + revelação das seções
   Trigger: timeupdate >= effectiveThreshold (auto-ajustado se vídeo < threshold)
   Dev mode: ?reveal=true na URL força revelação imediata
   Fallback 1: player.on('ended') — vídeo terminou antes do threshold
   Fallback 2: setTimeout de 6min — guard de última instância
   ========================================================================== */

(function() {
  const cfg = window.LANDING_CONFIG;
  if (!cfg) {
    console.warn('[reveal] LANDING_CONFIG não definido. Abortado.');
    return;
  }

  const THRESHOLD = cfg.REVEAL_THRESHOLD_SECONDS || 240;
  let revealed = false;
  let videoDuration = 0;  // populado quando getDuration resolve

  console.info(`[reveal] inicializando. Threshold padrão: ${THRESHOLD}s.`);

  function reveal(source) {
    if (revealed) return;
    revealed = true;

    console.info(`[reveal] DISPARADO. Source: ${source}`);
    document.body.classList.add('revealed');

    if (window.fbq) {
      try { fbq('trackCustom', 'VSLReveal', { source }); } catch (_) {}
    }
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'vsl_reveal', source });
    }

    setTimeout(() => {
      const target = document.getElementById('below-fold');
      if (target) {
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  }

  // Calcula o threshold efetivo a cada chamada de timeupdate.
  // Se a duração do vídeo for menor que o THRESHOLD configurado,
  // ajusta para 95% da duração (cobre dev/placeholder e edição curta acidental).
  function effectiveThreshold() {
    if (videoDuration > 0 && videoDuration < THRESHOLD) {
      return Math.max(videoDuration * 0.95, 5);
    }
    return THRESHOLD;
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
    console.info('[reveal] Vimeo Player criado, listeners ativos.');

    // Captura duração assim que disponível pra ajustar threshold dinamicamente
    player.getDuration().then(d => {
      videoDuration = d;
      console.info(`[reveal] Duração do vídeo: ${d.toFixed(1)}s. Threshold efetivo: ${effectiveThreshold().toFixed(1)}s.`);
      if (d < THRESHOLD) {
        console.warn(`[reveal] Vídeo (${d.toFixed(1)}s) é menor que threshold (${THRESHOLD}s) — auto-ajustando para 95% da duração.`);
      }
    }).catch(err => console.warn('[reveal] getDuration falhou:', err));

    player.on('play', () => {
      console.info('[reveal] vídeo: play');
      if (window.fbq) {
        try { fbq('trackCustom', 'VSLPlayed'); } catch (_) {}
      }
      if (window.dataLayer) window.dataLayer.push({ event: 'vsl_played' });
    });

    // Detector principal — usa threshold efetivo (auto-ajusta a vídeos curtos)
    player.on('timeupdate', (data) => {
      if (data.seconds >= effectiveThreshold()) {
        reveal('timeupdate');
      }
    });

    player.on('seeked', (data) => {
      if (data.seconds >= effectiveThreshold()) {
        reveal('seeked');
      }
    });

    // Belt-and-suspenders: se 'ended' disparar antes de timeupdate, ainda revela
    player.on('ended', () => {
      console.info('[reveal] vídeo: ended');
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
