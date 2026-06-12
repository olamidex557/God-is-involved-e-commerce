import gsap from "gsap";

export const fadeUp = (
  element: HTMLElement
) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }
  );
};