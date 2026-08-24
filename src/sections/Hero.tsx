import { useEffect, useRef, useState } from "react";
import "./Hero.css";
import showreelVideo from "../assets/video/People WIth Ideas Showreel 2026_10MB Compressed.mp4";

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
            {/*
            <iframe
              src="https://player.vimeo.com/video/1185033344?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              title="People With Ideas Showreel 2026"
            />
            */}
            <video
              src={showreelVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
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
          <p className="section-label">People with Ideas: a creative studio</p>
          <h1 className="intro__heading">Strategy. Storytelling. Content that works.</h1>
          {/* Good ideas are the beginning, what we do with them is what matters. */}

          <p className="intro__subheading">
            <strong>Strategy first. Content second. Results that last.</strong>
          </p>
          <p className="intro__text">
            People with Ideas help businesses clarify their message, develop practical marketing strategies, create
            engaging content, and deliver campaigns that connect with the right audience.
            <br />
            Whether you need a workshop, video production, photography, advertising, or ongoing creative support, we
            become an extension of your team.
          </p>

          <div className="intro__actions">
            <a href="/collective" className="btn btn--primary">
              Our Collective <span className="btn__arrow">→</span>
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
