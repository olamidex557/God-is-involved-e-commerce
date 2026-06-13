import { useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useReveal = (
  ref: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [ref]);
};

