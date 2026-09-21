import { cn } from "@/lib/cn";

interface LogoProps {
  size?: number;
  className?: string;
  idSuffix?: string;
  showText?: boolean;
}

export function Logo({ size = 32, className, idSuffix = "", showText = false }: LogoProps) {
  const gid = `scorp-grad${idSuffix}`;
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gid} x1="4" y1="8" x2="52" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34ffb0" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* tail — curled over the body */}
        <path
          d="M44 32 C 50 30, 50 20, 44 15 C 38 10, 27 9, 24 15 C 22 19, 23 24, 27 26"
          stroke={`url(#${gid})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* stinger */}
        <path
          d="M27 26 l4.5 2"
          stroke="#34ffb0"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="32.5" cy="28.8" r="2.4" fill="#34ffb0" />

        {/* body */}
        <path
          d="M14 32 H44"
          stroke={`url(#${gid})`}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* head */}
        <path d="M17 32 h-4" stroke={`url(#${gid})`} strokeWidth="5" strokeLinecap="round" />

        {/* claws */}
        <path
          d="M16 29 C 11 22, 5 22, 3 27"
          stroke={`url(#${gid})`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M3 27 l-2.5 -3" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" />
        <path d="M3 27 l-2 3.5" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" />
        <path
          d="M16 35 C 12 42, 6 42, 4 37"
          stroke={`url(#${gid})`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M4 37 l-2.5 4" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" />
        <path d="M4 37 l3 -2.5" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" />

        {/* legs */}
        <path d="M25 37 l-3 7" stroke={`url(#${gid})`} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 37 l-1 8" stroke={`url(#${gid})`} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M39 37 l1 8" stroke={`url(#${gid})`} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M45 37 l3 6" stroke={`url(#${gid})`} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className="font-display font-bold tracking-widest text-white">K0BR4</span>
      )}
    </span>
  );
}