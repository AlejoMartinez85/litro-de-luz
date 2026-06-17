export function formatNumber(value: number): string {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace('.0', '') + 'M';
  if (value >= 1_000) return value.toLocaleString('es-CO');
  return value.toString();
}

export function animateCounter(
  el: HTMLElement,
  target: number,
  duration = 2000
): void {
  const start = performance.now();
  const update = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = formatNumber(Math.floor(eased * target));
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
