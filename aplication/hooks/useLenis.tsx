"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext =
  createContext<React.RefObject<Lenis | null> | null>(null);

export function LenisProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenisControls() {
  const ctx = useContext(LenisContext);

  return {
    stop: () => {
      ctx?.current?.stop();
    },

    start: () => {
      ctx?.current?.start();
    },

    scrollTo: (
      target: string | number | HTMLElement,
      options?: {
        duration?: number;
        offset?: number;
      }
    ) => {
      const lenis = ctx?.current;

      if (!lenis) return;

      if (typeof target === "string") {
        let selector = target;

        if (selector.startsWith("/#")) {
          selector = selector.slice(1);
        }

        if (!selector.startsWith("#")) {
          selector = `#${selector}`;
        }

        const element = document.querySelector(selector);

        if (!element) return;

        lenis.scrollTo(element, {
          duration: options?.duration ?? 1.5,
          offset: options?.offset ?? 0,
        });

        return;
      }

      lenis.scrollTo(target, {
        duration: options?.duration ?? 1.5,
        offset: options?.offset ?? 0,
      });
    },
  };
}