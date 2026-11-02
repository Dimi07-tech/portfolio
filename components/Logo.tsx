export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={`${size / 16}rem`} height={`${size / 16}rem`} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <rect x="1" y="1" width="30" height="30" rx="9" className="fill-fg" />
      <path
        d="M11 9v14M11 16.5 19.5 9M13.6 14.2 21 23"
        className="stroke-bg"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="22.5" cy="9.5" r="2" className="fill-accent" />
    </svg>
  );
}
