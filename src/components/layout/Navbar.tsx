import { useEffect, useState } from "react";
import "./Navbar.css";
import HamburgerButton from "../ui/HamburgerButton";
import PWILogo from "../ui/PWILogo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contentStart = document.getElementById("contentStart");
      if (contentStart) {
        const triggerPoint = window.innerHeight * 0.3;
        setScrolled(contentStart.getBoundingClientRect().top <= triggerPoint);
      } else {
        setScrolled(window.scrollY > 80);
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

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  return (
    <>
      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="container header__inner">
          <a href="#" className="header__logo">
            <PWILogo scrolled={scrolled} />
          </a>

          <nav className="header__nav" aria-label="Main navigation">
            <a href="#" className="header__link">
              Home
            </a>
            <a href="#work" className="header__link">
              Work
            </a>
            <a href="#services" className="header__link">
              Services
            </a>
            <a href="#about" className="header__link">
              About
            </a>
            <a href="#contact" className="header__link">
              Contact
            </a>
          </nav>

          <HamburgerButton isOpen={navOpen} onClick={() => setNavOpen((prev) => !prev)} />
        </div>
      </header>

      <div className={`mobile-nav${navOpen ? " is-open" : ""}`}>
        <a href="#" className="mobile-nav__link" onClick={closeNav}>
          Home
        </a>
        <a href="#work" className="mobile-nav__link" onClick={closeNav}>
          Work
        </a>
        <a href="#services" className="mobile-nav__link" onClick={closeNav}>
          Services
        </a>
        <a href="#about" className="mobile-nav__link" onClick={closeNav}>
          About
        </a>
        <a href="#contact" className="mobile-nav__link" onClick={closeNav}>
          Contact
        </a>
      </div>
    </>
  );
};

export default Navbar;
