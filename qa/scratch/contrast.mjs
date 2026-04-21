#!/usr/bin/env node
// WCAG contrast calculator for 5 token pairings flagged as highest-risk.

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const s = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}
function luminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function ratio(fg, bg) {
  const L1 = luminance(hexToRgb(fg));
  const L2 = luminance(hexToRgb(bg));
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
function grade(r, isLarge = false) {
  const aa = isLarge ? 3 : 4.5;
  const aaa = isLarge ? 4.5 : 7;
  if (r >= aaa) return 'AAA';
  if (r >= aa) return 'AA';
  if (r >= 3) return 'AA (only large text)';
  return 'FAIL';
}

const pairs = [
  // High-risk pairings called out in the prompt
  ['--text-muted on --surface-subtle',         '#785a46', '#f7f0e8'],
  ['--text-link on --surface-info-soft',       '#8d3f32', '#edf3f8'],
  ['--text-muted on --surface-info-soft',      '#785a46', '#edf3f8'],
  ['--text-danger on --surface-danger-soft',   '#8d3f32', '#fff1eb'],
  ['--text-inverse-muted on --surface-inverse-top', '#eadfce', '#3f322b'],
  // Secondary risk pairs (badges, soft states)
  ['--footer-text-muted on --footer-surface-top', '#8a705f', '#f5ede2'],
  ['--text-secondary on --surface-muted',      '#5e493d', '#f1e7d8'],
  ['--text-primary on --surface-page',         '#2f2f28', '#f9f4ee'],
  ['--text-danger-label on --surface-warning-strong-soft', '#9a4b3c', '#fffbeb'],
];

console.log('Pair | Ratio | Grade');
for (const [label, fg, bg] of pairs) {
  const r = ratio(fg, bg);
  console.log(`${label.padEnd(56)} | ${r.toFixed(2)} | ${grade(r)}`);
}
