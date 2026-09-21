"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { buildBoot, runCommand, TERM_UI, type TermLine } from "@/lib/term";

type HistItem = {
  kind: "cmd" | "out";
  text: string;
  cls?: TermLine["cls"];
  href?: string;
};

const QUICK = ["help", "whoami", "skills", "projects", "matrix", "hack", "sudo", "cv", "clear"];

/* ─── mini "synthé" WebAudio : blips de console ─── */
let audioCtx: AudioContext | null = null;
const mutedRef = { current: false };

function ensureAudio() {
  try {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx ||= new Ctor();
    if (audioCtx.state === "suspended") void audioCtx.resume();
  } catch {
    /* audio indisponible */
  }
}

function blip(freq: number, dur = 0.05, vol = 0.02) {
  if (mutedRef.current) return;
  try {
    ensureAudio();
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "square";
    o.frequency.value = freq;
    g.gain.value = vol;
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + dur);
  } catch {
    /* silencieux */
  }
}

function arpeggio() {
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => blip(f, 0.09, 0.025), i * 80));
}

function clsOf(cls?: TermLine["cls"]) {
  switch (cls) {
    case "ok":
      return "ok";
    case "err":
      return "err";
    case "cyan":
      return "cyan";
    case "gold":
      return "gold";
    default:
      return "dim";
  }
}

export function Terminal() {
  const { lang } = useLang();
  const [steps] = useState(() => buildBoot(lang));
  const [bootIdx, setBootIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [hist, setHist] = useState<HistItem[]>([]);
  const [input, setInput] = useState("");
  const [muted, setMuted] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef(false);
  doneRef.current = done;

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  /* déblocage de l'audio au premier geste */
  useEffect(() => {
    const once = () => ensureAudio();
    window.addEventListener("pointerdown", once, { once: true });
    window.addEventListener("keydown", once, { once: true });
    return () => {
      window.removeEventListener("pointerdown", once);
      window.removeEventListener("keydown", once);
    };
  }, []);

  /* séquence de boot animée */
  useEffect(() => {
    if (done) return;
    if (bootIdx >= steps.length) {
      setDone(true);
      inputRef.current?.focus();
      arpeggio();
      return;
    }
    const step = steps[bootIdx];
    const timer = setTimeout(() => {
      if (step.kind === "cmd") {
        setHist((h) => [...h, { kind: "cmd", text: step.text }]);
        blip(430, 0.035, 0.022);
      } else {
        setHist((h) => [
          ...h,
          { kind: "out", text: step.line.text, cls: step.line.cls, href: step.line.href },
        ]);
        blip(step.line.cls === "gold" ? 1100 : step.line.cls === "ok" ? 900 : 660 + Math.random() * 200, 0.04, 0.016);
      }
      setBootIdx((i) => i + 1);
    }, step.kind === "cmd" ? 380 : 95);
    return () => clearTimeout(timer);
  }, [bootIdx, done, steps]);

  /* autoscroll */
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [hist]);

  const exec = (raw: string) => {
    const full = raw.trim();
    if (!full || !done) return;
    const [name, ...args] = full.split(/\s+/);
    const res = runCommand(name.toLowerCase(), args, lang);
    setInput("");
    if (res === "clear") {
      setHist([]);
      blip(540, 0.06, 0.03);
      return;
    }
    setHist((h) => [...h, { kind: "cmd", text: full }]);
    blip(430, 0.04, 0.03);
    res.forEach((ln, i) => {
      setTimeout(() => {
        setHist((h) => [...h, { kind: "out", text: ln.text, cls: ln.cls, href: ln.href }]);
        blip(ln.cls === "gold" ? 1100 : ln.cls === "ok" ? 860 : 620 + Math.random() * 160, 0.04, 0.018);
      }, 90 * (i + 1));
    });
  };

  return (
    <div className="tterm matrix-canvas relative overflow-hidden rounded-2xl border border-[#1e4b37] shadow-[0_0_0_1px_rgba(46,222,120,0.12),0_0_38px_rgba(46,222,120,0.2)]">
      {/* scanline CRT */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* header */}
      <div className="relative flex items-center gap-2 border-b border-[#12382b] bg-[#06110c] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 truncate font-mono text-xs text-[#4d7a66]">
          {pick(lang, TERM_UI.title)} ~ k0br4.sh
        </span>
        <span className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#43e97b]">
            <span className="inline-block h-2 w-2 animate-pulse-glow rounded-full bg-green-400 shadow-[0_0_8px_#43e97b]" />
            ONLINE
          </span>
          <span className="rounded border border-[#1e4b37] px-2 py-0.5 font-mono text-[10px] text-[#7de8ff]">
            {pick(lang, TERM_UI.mode)}
          </span>
          <button
            type="button"
            onClick={() => {
              setMuted((m) => !m);
              if (muted) blip(880, 0.05, 0.025);
            }}
            aria-label={muted ? "Activer le son" : "Couper le son"}
            className={`rounded border px-2 py-0.5 font-mono text-[10px] transition-colors ${
              muted
                ? "border-[#3a1f1f] text-[#7a4a4a]"
                : "border-[#1e4b37] text-[#43e97b] hover:border-[#43e97b]"
            }`}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </span>
      </div>

      {/* body */}
      <div ref={bodyRef} className="h-80 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed md:h-96">
        {hist.map((h, i) => {
          const isLast = i === hist.length - 1;
          return h.kind === "cmd" ? (
            <p key={i} className="mt-1 whitespace-pre-wrap break-words">
              <span className="prompt">
                {pick(lang, TERM_UI.prompt)}:~$&nbsp;
              </span>
              <span className="text-[#eafff2]">{h.text}</span>
            </p>
          ) : (
            <p key={i} className={`mt-1 whitespace-pre-wrap break-words ${clsOf(h.cls)}`}>
              {h.href ? (
                <a
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ok underline underline-offset-2"
                >
                  {h.text} ↗
                </a>
              ) : (
                h.text
              )}
              {!done && isLast && <span className="animate-blink text-[#7dffa9]">▮</span>}
            </p>
          );
        })}
        {hist.length === 0 && <p className="dim">.</p>}

        {/* prompt utilisateur (prêt après la démo) */}
        {done && (
          <form
            className="mt-1 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              exec(input);
            }}
          >
            <span className="prompt shrink-0">{pick(lang, TERM_UI.prompt)}:~$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder={pick(lang, TERM_UI.placeholder)}
              className="w-full bg-transparent font-mono text-[12.5px] text-[#eafff2] placeholder:text-[#2e5c45] outline-none"
              aria-label="Commande"
            />
          </form>
        )}
      </div>

      {/* raccourcis */}
      <div className="relative flex flex-wrap items-center gap-2 border-t border-[#12382b] bg-[#06110c] px-4 py-3">
        <span className="font-mono text-[10px] text-[#4d7a66]">$</span>
        {QUICK.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => exec(c)}
            className="rounded-md border border-[#1e4b37] bg-[#0a1812] px-2.5 py-1 font-mono text-[11px] text-[#7de8ff] transition-colors hover:border-[#43e97b] hover:text-[#7dffa9]"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}