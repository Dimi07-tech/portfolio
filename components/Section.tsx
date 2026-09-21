import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  kicker?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, kicker, title, lead, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="mb-12 md:mb-16 max-w-2xl">
          {kicker && (
            <p className="mb-3 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-venom">
              <span className="h-px w-8 bg-venom/60" />
              {kicker}
            </p>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
          {lead && <p className="mt-4 text-slate-400 md:text-lg">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}