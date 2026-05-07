/* ==========================================================================
   VALIDATE — runner de asserções para identity/tokens.css e logos
   ========================================================================== */

(function () {
  const results = { pass: 0, fail: 0 };

  function assert(condition, name, detail = '') {
    const passed = !!condition;
    if (passed) results.pass++; else results.fail++;
    return { passed, name, detail };
  }

  function render(targetId, items) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = items.map(item => `
      <div class="test ${item.passed ? 'pass' : 'fail'}">
        <span class="icon"></span>
        <span class="name">${item.name}</span>
        <span class="detail">${item.detail}</span>
      </div>
    `).join('');
  }

  function getVar(fixtureId, name) {
    const el = document.getElementById(fixtureId);
    if (!el) return null;
    const value = getComputedStyle(el).getPropertyValue(name).trim();
    return value || null;
  }

  // Converte hex / rgb() / rgba() para [r, g, b, a] em 0..1
  function parseColor(input) {
    if (!input) return null;
    input = input.trim();
    if (input.startsWith('#')) {
      const hex = input.slice(1);
      const full = hex.length === 3
        ? hex.split('').map(c => c + c).join('')
        : hex;
      return [
        parseInt(full.slice(0, 2), 16) / 255,
        parseInt(full.slice(2, 4), 16) / 255,
        parseInt(full.slice(4, 6), 16) / 255,
        1,
      ];
    }
    const m = input.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const parts = m[1].split(',').map(s => parseFloat(s.trim()));
      return [parts[0]/255, parts[1]/255, parts[2]/255, parts[3] !== undefined ? parts[3] : 1];
    }
    return null;
  }

  // Composição alfa contra fundo (assume bg opaco)
  function composite(fg, bg) {
    const a = fg[3];
    return [
      fg[0]*a + bg[0]*(1-a),
      fg[1]*a + bg[1]*(1-a),
      fg[2]*a + bg[2]*(1-a),
      1,
    ];
  }

  // Luminância relativa (WCAG)
  function relLum([r, g, b]) {
    const lin = c => (c <= 0.03928) ? c/12.92 : Math.pow((c + 0.055)/1.055, 2.4);
    return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b);
  }

  function contrastRatio(fg, bg) {
    const composed = composite(fg, bg);
    const L1 = relLum(composed);
    const L2 = relLum(bg);
    const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
    return (hi + 0.05) / (lo + 0.05);
  }

  // ==========================================================================
  // 1 · DNA tokens
  // ==========================================================================
  const dnaTests = [
    assert(getVar('fx-dna', '--core-emerald') === '#0F3D2E', '--core-emerald = #0F3D2E', getVar('fx-dna', '--core-emerald') || 'undefined'),
    assert(getVar('fx-dna', '--core-gold') === '#A88B4A', '--core-gold = #A88B4A', getVar('fx-dna', '--core-gold') || 'undefined'),
    assert(getVar('fx-dna', '--core-ivory') === '#EBE3D0', '--core-ivory = #EBE3D0', getVar('fx-dna', '--core-ivory') || 'undefined'),
    assert(getVar('fx-dna', '--font-display').includes('Italiana'), '--font-display contém Italiana'),
    assert(getVar('fx-dna', '--font-editorial').includes('Cormorant'), '--font-editorial contém Cormorant'),
    assert(getVar('fx-dna', '--font-marca').includes('Marcellus'), '--font-marca contém Marcellus'),
    assert(getVar('fx-dna', '--font-body').includes('Inter'), '--font-body contém Inter'),
    assert(getVar('fx-dna', '--size-display-xl') === '4rem', '--size-display-xl = 4rem'),
    assert(getVar('fx-dna', '--size-body-l') === '1.0625rem', '--size-body-l = 1.0625rem'),
    assert(getVar('fx-dna', '--size-eyebrow') === '0.6875rem', '--size-eyebrow = 0.6875rem'),
    assert(getVar('fx-dna', '--space-l') === '24px', '--space-l = 24px'),
    assert(getVar('fx-dna', '--tracking-eyebrow') === '0.32em', '--tracking-eyebrow = 0.32em'),
  ];
  render('dna-results', dnaTests);

  // ==========================================================================
  // 2-4 · Mode tokens
  // ==========================================================================
  const modes = {
    heritage: { bg: '#0F3D2E', text: '#EBE3D0', accent: '#A88B4A' },
    apothecary: { bg: '#07100C', text: '#EFE7D2', accent: '#C9A876' },
    botanique: { bg: '#F2ECDD', text: '#1F3D2E', accent: '#9C7C42' },
  };

  for (const [mode, expected] of Object.entries(modes)) {
    const fx = `fx-${mode}`;
    const tests = [
      assert(getVar(fx, '--bg-primary') === expected.bg, `${mode}: --bg-primary = ${expected.bg}`, getVar(fx, '--bg-primary') || 'undefined'),
      assert(getVar(fx, '--text-primary') === expected.text, `${mode}: --text-primary = ${expected.text}`, getVar(fx, '--text-primary') || 'undefined'),
      assert(getVar(fx, '--accent') === expected.accent, `${mode}: --accent = ${expected.accent}`, getVar(fx, '--accent') || 'undefined'),
      assert(getVar(fx, '--bg-lift'), `${mode}: --bg-lift definido`),
      assert(getVar(fx, '--bg-deep'), `${mode}: --bg-deep definido`),
      assert(getVar(fx, '--text-muted'), `${mode}: --text-muted definido`),
      assert(getVar(fx, '--accent-muted'), `${mode}: --accent-muted definido`),
      assert(getVar(fx, '--hairline'), `${mode}: --hairline definido`),
      assert(getVar(fx, '--logo-accent') === expected.accent, `${mode}: --logo-accent = ${expected.accent}`),
      assert(getVar(fx, '--logo-text') === expected.text, `${mode}: --logo-text = ${expected.text}`),
    ];
    render(`${mode}-results`, tests);
  }

  // ==========================================================================
  // 5 · Contraste WCAG
  // ==========================================================================
  const contrastTests = [];
  for (const [mode, expected] of Object.entries(modes)) {
    const fx = `fx-${mode}`;
    const bgVal = parseColor(getVar(fx, '--bg-primary'));
    const textVal = parseColor(getVar(fx, '--text-primary'));
    const mutedVal = parseColor(getVar(fx, '--text-muted'));

    if (bgVal && textVal) {
      const ratio = contrastRatio(textVal, bgVal);
      contrastTests.push(assert(
        ratio >= 7,
        `${mode}: text.primary / bg.primary ≥ 7:1 (AAA)`,
        `${ratio.toFixed(2)}:1`
      ));
    }

    if (bgVal && mutedVal) {
      const ratio = contrastRatio(mutedVal, bgVal);
      contrastTests.push(assert(
        ratio >= 4.5,
        `${mode}: text.muted / bg.primary ≥ 4.5:1 (AA)`,
        `${ratio.toFixed(2)}:1`
      ));
    }
  }
  render('contrast-results', contrastTests);

  // ==========================================================================
  // 6 · SVGs de logo
  // ==========================================================================
  const logoFiles = [
    'logo/lockup-vertical.svg',
    'logo/lockup-horizontal.svg',
    'logo/monogram.svg',
    'logo/monogram-seal.svg',
    'logo/favicon.svg',
  ];

  Promise.all(logoFiles.map(file =>
    fetch(file).then(r => ({ file, ok: r.ok, status: r.status }))
      .catch(err => ({ file, ok: false, status: 'fetch error' }))
  )).then(results_ => {
    const logoTests = results_.map(r => assert(
      r.ok,
      `${r.file} carrega (HTTP ${r.status})`,
      r.ok ? 'OK' : 'falha'
    ));
    render('logos-results', logoTests);

    // Summary final
    const total = results.pass + results.fail;
    const summary = document.getElementById('summary');
    summary.className = 'summary ' + (results.fail === 0 ? 'all-pass' : 'has-fail');
    summary.innerHTML = `<strong>${results.pass}</strong> pass · <strong>${results.fail}</strong> fail · ${total} total`;
  });
})();
