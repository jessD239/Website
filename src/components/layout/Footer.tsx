import "./Footer.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PrivacyPolicyModal from "../PrivacyPolicyModal";
// import logoBlack from "../../assets/PWI Logo SHORT_Black.png";
import logoLongBlack from "../../assets/pwi_logo_long_black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faVimeo } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const isHome = useLocation().pathname === "/";
  const homeHref = isHome ? "#" : "/";
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo-container">
            <a href={homeHref} className="footer__logo">
              <img src={logoLongBlack} alt="PWI Logo" className="footer__logo-img" />
            </a>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <a href={homeHref} className="footer__link">
              Home
            </a>
            <a href={sectionHref("#work")} className="footer__link">
              Work
            </a>
            <a href={sectionHref("#services")} className="footer__link">
              Services
            </a>
            <a href={sectionHref("#about")} className="footer__link">
              About
            </a>
            <a href={sectionHref("#contact")} className="footer__link">
              Contact
            </a>
          </nav>

          <div className="footer__social">
            <a
              href="https://www.instagram.com/peoplewithideas_"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
              Instagram
            </a>
            <a
              href="https://vimeo.com/user257644529"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Vimeo"
            >
              <FontAwesomeIcon icon={faVimeo} />
              Vimeo
            </a>
            <a
              href="https://www.linkedin.com/company/people-with-ideasnz"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">&copy; 2026 People with Ideas. All rights reserved.</p>
          <p className="footer__copy">
            <button type="button" className="footer__privacy" onClick={() => setPrivacyOpen(true)}>
              Privacy Policy
            </button>
            <span aria-hidden="true"> · </span>A Creative Studio.
          </p>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
};

export default Footer;
