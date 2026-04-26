import { useEffect, useState } from "react";
import "./PWILogo.css";

interface PWILogoProps {
  scrolled?: boolean;
}

const PWILogo = ({ scrolled = false }: PWILogoProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (scrolled) setHasScrolled(true);
  }, [scrolled]);

  let cls = "logo-svg";
  if (scrolled) cls += " logo-svg--scrolled";
  else if (hasScrolled) cls += " logo-svg--unscrolled";

  return (
    <svg className={cls} viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <polyline className="logo-bracket logo-bracket--left" points="50,42 15,42 15,10 18,10" />
      <polyline className="logo-bracket logo-bracket--right" points="38,10 63,10 63,42 60,42" />
      <text className="logo-text" x="38" y="35">
        P<tspan className="logo-text__accent">w</tspan>I
      </text>
    </svg>
  );
};

export default PWILogo;
