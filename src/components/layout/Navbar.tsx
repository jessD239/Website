import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";
import HamburgerButton from "../ui/HamburgerButton";
import PWILogo from "../ui/PWILogo";

interface NavbarProps {
  onOpenContact?: () => void;
  /** Forces the dark (scrolled) text style, e.g. on pages without a hero to scroll past. */
  forceDark?: boolean;
}

const Navbar = ({ onOpenContact, forceDark = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const homeHref = isHome ? "#" : "/";
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome && onOpenContact) {
      e.preventDefault();
      onOpenContact();
    }
  };

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
  const isScrolled = scrolled || forceDark;

  return (
    <>
      <header className={`header${isScrolled ? " header--scrolled" : ""}`}>
        <div className="container header__inner">
          <a href={homeHref} className="header__logo">
            <PWILogo scrolled={isScrolled} />
          </a>

          <nav className="header__nav" aria-label="Main navigation">
            <a href={homeHref} className="header__link">
              Home
            </a>
            <a href={sectionHref("#work")} className="header__link">
              Work
            </a>
            <a href={sectionHref("#services")} className="header__link">
              Services
            </a>
            <a href={sectionHref("#about")} className="header__link">
              About
            </a>
            <a href={sectionHref("#contact")} className="header__link" onClick={handleContactClick}>
              Contact
            </a>
            <span className="header__divider" aria-hidden="true" />
            <a href="/collective" className="header__link">
              Collective
            </a>
          </nav>

          <HamburgerButton isOpen={navOpen} onClick={() => setNavOpen((prev) => !prev)} />
        </div>
      </header>

      <div className={`mobile-nav${navOpen ? " is-open" : ""}`}>
        <a href={homeHref} className="mobile-nav__link" onClick={closeNav}>
          Home
        </a>
        <a href={sectionHref("#work")} className="mobile-nav__link" onClick={closeNav}>
          Work
        </a>
        <a href={sectionHref("#services")} className="mobile-nav__link" onClick={closeNav}>
          Services
        </a>
        <a href={sectionHref("#about")} className="mobile-nav__link" onClick={closeNav}>
          About
        </a>
        <a
          href={sectionHref("#contact")}
          className="mobile-nav__link"
          onClick={(e) => {
            handleContactClick(e);
            closeNav();
          }}
        >
          Contact
        </a>
        <a href="/collective" className="mobile-nav__link" onClick={closeNav}>
          Collective
        </a>
      </div>
    </>
  );
};

export default Navbar;
