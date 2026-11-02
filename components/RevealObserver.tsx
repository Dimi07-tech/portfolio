"use client";

import { useEffect } from "react";

/** Ajoute `.is-in` aux éléments `.reveal` quand ils entrent dans le viewport (y compris ceux ajoutés plus tard). */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const scan = (root: ParentNode) =>
      root.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    scan(document);

    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof Element && scan(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
