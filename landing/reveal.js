/* ==========================================================================
   REVEAL.JS — Player simulado de VSL
   8 minutos de duração total, reveal aos 4:00.
   Persistência via localStorage. Dev mode (?dev=true) mostra controles skip/reset.
   Quando o vídeo real estiver no Vimeo, trocar player simulado por iframe
   e plugar timeupdate no Vimeo Player SDK.
   ========================================================================== */

(function() {
  const STORAGE_KEY = 'mdp:vsl:time';
  const TOTAL_SECONDS = 480;
  const REVEAL_AT = 240;

  const player = document.getElementById('player');
  const playerContent = document.getElementById('playerContent');
  const playBtn = document.getElementById('playBtn');
  const progressFill = document.getElementById('progressFill');
  const timeDisplay = document.getElementById('timeDisplay');
  const playerMeta = document.getElementById('playerMeta');
  const revealZone = document.getElementById('revealZone');

  if (!player) {
    console.warn('[reveal] player element não encontrado. Abortado.');
    return;
  }

  let currentTime = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  let playing = false;
  let interval = null;
  let revealFiredOnce = false;

  const metaScript = [
    { at: 0,   text: 'Capítulo I · O incêndio invisível' },
    { at: 45,  text: 'Capítulo II · Por que sua dieta falhou' },
    { at: 95,  text: 'Capítulo III · A descoberta dos compostos bioativos' },
    { at: 160, text: 'Capítulo IV · O método em 5 atos' },
    { at: 210, text: 'Capítulo V · A revelação' },
    { at: 240, text: 'Acesso liberado — leia abaixo' },
    { at: 360, text: 'Considerações finais' },
  ];

  function fmt(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const r = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${r}`;
  }

  function updateMeta() {
    let active = metaScript[0];
    for (const m of metaScript) if (currentTime >= m.at) active = m;
    if (playerMeta.dataset.last !== active.text) {
      playerMeta.style.opacity = '0';
      setTimeout(() => {
        playerMeta.textContent = active.text;
        playerMeta.dataset.last = active.text;
        playerMeta.style.opacity = '1';
      }, 220);
    }
  }

  function tick() {
    currentTime = Math.min(currentTime + 1, TOTAL_SECONDS);
    localStorage.setItem(STORAGE_KEY, currentTime);
    render();
    if (currentTime >= TOTAL_SECONDS) pause();
  }

  function render() {
    progressFill.style.width = (currentTime / TOTAL_SECONDS * 100) + '%';
    timeDisplay.textContent = fmt(currentTime);
    updateMeta();
    if (currentTime >= REVEAL_AT) {
      revealZone.classList.add('unlocked');
      revealZone.setAttribute('aria-hidden', 'false');
      if (!revealFiredOnce) {
        revealFiredOnce = true;
        if (window.fbq) { try { fbq('trackCustom', 'VSLReveal'); } catch(_) {} }
        if (window.dataLayer) window.dataLayer.push({ event: 'vsl_reveal' });
      }
    } else {
      revealZone.classList.remove('unlocked');
      revealZone.setAttribute('aria-hidden', 'true');
    }
  }

  function play() {
    if (playing) return;
    playing = true;
    player.classList.add('playing');
    interval = setInterval(tick, 1000);
    if (window.fbq) { try { fbq('trackCustom', 'VSLPlayed'); } catch(_) {} }
    if (window.dataLayer) window.dataLayer.push({ event: 'vsl_played' });
  }
  function pause() {
    playing = false;
    player.classList.remove('playing');
    clearInterval(interval);
  }

  if (playBtn) playBtn.addEventListener('click', play);
  if (playerContent) {
    playerContent.addEventListener('click', (e) => {
      if (e.target.closest('.play-btn')) return;
      if (playing) pause(); else play();
    });
  }

  render();
  if (currentTime > 0 && currentTime < TOTAL_SECONDS) {
    player.classList.add('playing');
    if (playerMeta) playerMeta.style.opacity = '1';
  }

  // Dev controls — visíveis apenas com ?dev=true na URL
  const devControls = document.getElementById('devControls');
  if (new URLSearchParams(location.search).has('dev')) {
    devControls?.classList.add('visible');
  }
  document.getElementById('skipBtn')?.addEventListener('click', () => {
    currentTime = REVEAL_AT;
    localStorage.setItem(STORAGE_KEY, currentTime);
    play();
    render();
  });
  document.getElementById('resetBtn')?.addEventListener('click', () => {
    pause();
    currentTime = 0;
    localStorage.setItem(STORAGE_KEY, 0);
    render();
    if (playerMeta) {
      playerMeta.textContent = 'Toque para iniciar a transmissão';
      playerMeta.dataset.last = '';
    }
    player.classList.remove('playing');
  });
})();
