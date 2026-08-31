"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(hash);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          return;
        }

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      });

      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
