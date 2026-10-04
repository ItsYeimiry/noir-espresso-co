export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <ellipse cx="12" cy="12" rx="6.6" ry="10" transform="rotate(32 12 12)" fill="currentColor" />
      <path
        d="M8.2 20.4c3.6-2.6 2.2-5.4 4.6-8 2-2.2 2.6-4.6 2.9-8.6"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
