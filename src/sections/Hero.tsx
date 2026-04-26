import { useEffect, useRef, useState } from "react";
import "./Hero.css";

interface HeroProps {
  onOpenContact?: () => void;
}

const Hero = ({ onOpenContact }: HeroProps) => {
  const introRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!introRef.current) return;

      // Reset visibility if scrolled back to the very top
      if (window.scrollY <= 8) {
        setIntroVisible(false);
        return;
      }

      const triggerPoint = window.innerHeight * 0.88;
      if (introRef.current.getBoundingClientRect().top <= triggerPoint) {
        setIntroVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/1185033344?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              title="People With Ideas Showreel 2026"
            />
          </div>
          <div className="hero__overlay" />
        </div>
      </section>

      <section className="intro" id="contentStart">
        <div
          ref={introRef}
          className={`container intro__content reveal reveal--manual${introVisible ? " is-visible" : ""}`}
        >
          <p className="section-label">Creative Studio</p>
          <h1 className="intro__heading">
            Ideas are easy.
            <br />
            Making them happen is where we come in.
          </h1>
          <p className="intro__subheading">
            People with Ideas is a creative studio built around one thing only; solving problems creatively. We help
            turn thoughts into something real.
            <br />
            <br />
            Sometimes that means strategy.
            <br />
            Sometimes it's content.
            <br />
            Sometimes it's just a better way of thinking about what you already have.
          </p>

          <div className="intro__actions">
            <a href="#work" className="btn btn--primary">
              Some of our Ideas <span className="btn__arrow">→</span>
            </a>
            <button onClick={onOpenContact} className="btn btn--outline">
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
