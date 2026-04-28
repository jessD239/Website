import { useEffect } from "react";

/**
 * Observes all `.reveal:not(.reveal--manual)` elements in the document
 * and adds `is-visible` when they scroll into view.
 * Call once at the App level.
 */
export function useReveal() {
  useEffect(() => {
    const selector = ".reveal:not(.reveal--manual)";

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(selector).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
