import { useEffect, useRef } from 'react';
import { animateCounter } from '@/utils/formatNumber';

export default function MetricCounter({ value, suffix = '', label, description, variant = 'default' }) {
  const valueRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounter(el, value, 2200);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const isHero = variant === 'hero';
  const isDark = variant === 'dark' || isHero;

  return (
    <article style={isHero ? {} : {
      borderTop: '3px solid var(--color-primary)',
      paddingTop: 'var(--space-4)',
    }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: isHero ? 'clamp(72px, 11vw, 136px)' : 'clamp(36px, 5vw, 56px)',
        fontWeight: 800,
        color: isDark ? 'var(--color-white)' : 'var(--color-text-primary)',
        lineHeight: 1,
        marginBottom: '6px',
        letterSpacing: isHero ? '-0.04em' : '-0.02em',
      }}>
        <span ref={valueRef}>{value.toLocaleString('es-CO')}</span>
        <span style={{ color: 'var(--color-primary)' }}>{suffix}</span>
      </p>
      <p style={{
        fontSize: isHero ? 'var(--text-body)' : 'var(--text-sm)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: isDark ? 'var(--color-primary)' : 'var(--color-text-secondary)',
        marginBottom: description ? '4px' : 0,
      }}>
        {label}
      </p>
      {description && (
        <p style={{
          fontSize: 'var(--text-sm)',
          color: isDark ? 'rgba(138,163,180,0.9)' : 'var(--color-text-muted)',
        }}>
          {description}
        </p>
      )}
    </article>
  );
}
