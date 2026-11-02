import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  kicker?: string;
  index?: string;
  title: string;
  lead?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, kicker, index, title, lead, action, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-20 py-16 md:py-24", className)}>
      <div className="shell">
        <header className="reveal mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {kicker && (
              <p className="eyebrow mb-4">
                {index && <span className="text-faint">{index}</span>}
                <span className="h-px w-6 bg-accent/50" />
                {kicker}
              </p>
            )}
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              {title}
            </h2>
            {lead && <p className="mt-4 text-base leading-relaxed md:text-lg">{lead}</p>}
          </div>
          {action}
        </header>
        <div className="reveal [--reveal-delay:120ms]">{children}</div>
      </div>
    </section>
  );
}
