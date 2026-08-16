import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVimeo, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Socials.css";

const LINKS = [
  { icon: faInstagram, label: "Instagram", href: "https://www.instagram.com/peoplewithideas_" },
  { icon: faVimeo, label: "Vimeo", href: "https://vimeo.com/user257644529" },
  { icon: faLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/people-with-ideasnz" },
];

export default function Socials({ heading = "Need more ideas? Follow our socials:" }: { heading?: string }) {
  return (
    <div className="socials">
      {heading && <p className="socials__heading">{heading}</p>}
      <div className="socials__links">
        {LINKS.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="socials__link"
            aria-label={label}
          >
            <FontAwesomeIcon icon={icon} />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
