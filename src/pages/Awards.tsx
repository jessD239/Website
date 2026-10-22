import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../functions/Utility";
import "./Awards.css";
import {
  SmallBusinessVideo,
  DiversityInclusionVideo,
  SustainabilityVideo,
  HealthSafetyVideo,
  TechnologyInnovationVideo,
  ServiceSupportVideo,
  ManufacturingVideo,
  ConstructionTradesVideo,
  HospitalityRetailTourismVideo,
} from "./AwardsVideos";

interface AwardsProps {
  onOpenContact: () => void;
}

const SITE_URL = "https://peoplewithideas.co.nz";
const SESSION_UNLOCK_KEY = "pwi_awards_unlocked";
const ACCESS_CODE = "AWARDS2026";

const categories = [
  { id: "small-business", name: "Best Small Business", video: SmallBusinessVideo },
  {
    id: "diversity-inclusion",
    name: "Celebrating Diversity, Inclusion, and Growing People",
    video: DiversityInclusionVideo,
  },
  { id: "sustainability", name: "Excellence in Sustainable and Environmental Practices", video: SustainabilityVideo },
  { id: "health-safety", name: "Excellence in Health, Safety, and Wellbeing Innovation", video: HealthSafetyVideo },
  { id: "technology-innovation", name: "Technology and Innovation", video: TechnologyInnovationVideo },
  { id: "service-support", name: "Service and Support", video: ServiceSupportVideo },
  { id: "manufacturing", name: "Manufacturing", video: ManufacturingVideo },
  { id: "construction-trades", name: "Construction, Trades, and Infrastructure", video: ConstructionTradesVideo },
  { id: "hospitality-retail-tourism", name: "Hospitality, Retail, and Tourism", video: HospitalityRetailTourismVideo },
];

const Awards = ({ onOpenContact }: AwardsProps) => {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return window.sessionStorage.getItem(SESSION_UNLOCK_KEY) === "true";
    } catch (error) {
      console.error("Unable to read the awards access session.", error);
      return false;
    }
  });
  const [accessCode, setAccessCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sessionWarning, setSessionWarning] = useState("");

  useReveal(unlocked);

  useEffect(() => {
    document.title = "2Degrees Wellington Regional Business Awards 2026 | People with Ideas";

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `${SITE_URL}/awards/`;

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.append(robots);
    }
    robots.content = "noindex,follow";

    return () => {
      document.title = "PwI - Creative Studio";
      canonical?.remove();
      robots?.remove();
      const homeCanonical = document.createElement("link");
      homeCanonical.rel = "canonical";
      homeCanonical.href = `${SITE_URL}/`;
      document.head.append(homeCanonical);
    };
  }, []);

  const handleUnlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedCode = accessCode.trim().toUpperCase();

    if (!normalizedCode) {
      setErrorMessage("Please enter the access code provided by PwI.");
      return;
    }

    if (normalizedCode !== ACCESS_CODE) {
      setErrorMessage("That code doesn't look right. Please check it and try again.");
      return;
    }

    setErrorMessage("");
    setUnlocked(true);

    try {
      window.sessionStorage.setItem(SESSION_UNLOCK_KEY, "true");
    } catch (error) {
      console.error("Unable to save the awards access session.", error);
      setSessionWarning(
        "You’re in. This browser couldn’t save your access, so you may need to enter the code again if you leave this page.",
      );
    }
  };

  if (!unlocked) {
    return (
      <main className="awards-page">
        <section className="awards-gate">
          <div className="container">
            <div className="awards-gate__content reveal">
              <p className="section-label">2Degrees Wellington Regional</p>
              <h1 className="awards-gate__title">Business Awards 2026</h1>
              <p className="awards-gate__description">
                Enter the access code shared with you by People with Ideas to continue.
              </p>

              <form className="awards-gate__form" onSubmit={handleUnlock}>
                <label className="awards-gate__label" htmlFor="awards-access-code">
                  Access code
                </label>
                <input
                  autoComplete="off"
                  className="awards-gate__input"
                  id="awards-access-code"
                  aria-describedby={errorMessage ? "access-code-error" : undefined}
                  aria-invalid={Boolean(errorMessage)}
                  name="accessCode"
                  onChange={(event) => {
                    setAccessCode(event.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  type="text"
                  value={accessCode}
                />
                {errorMessage && (
                  <p className="awards-gate__error" id="access-code-error" role="alert">
                    {errorMessage}
                  </p>
                )}
                <button className="btn btn--primary awards-gate__submit" type="submit">
                  Continue{" "}
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </form>

              <div className="awards-gate__help">
                <Link className="awards-gate__link" to="/">
                  Return to the PwI website
                </Link>
                <span aria-hidden="true">·</span>
                <button className="awards-gate__link" onClick={onOpenContact} type="button">
                  Need help? Contact us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="awards-page">
      <section className="awards-intro">
        <div className="container reveal">
          <p className="section-label">2Degrees Wellington Regional Business Awards 2026</p>
          <h1 className="awards-intro__title">Your story in under a minute.</h1>
          <p className="awards-intro__description">
            Find and watch an example from previous years.
            <br />
            Thirty seconds can’t tell your whole story but it can give people a reason to remember it.
          </p>
          <nav className="awards-categories" aria-label="Award categories">
            {categories.map((category) => (
              <a className="awards-categories__link" href={`#${category.id}`} key={category.id}>
                {category.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="awards-list" aria-label="Video examples by award category">
        <div className="container">
          {categories.map((category) => (
            <section className="awards-category reveal" id={category.id} key={category.id}>
              <div className="awards-category__heading">
                <p className="section-label">Award category</p>
                <h2 className="awards-category__title">
                  {category.name}
                  <svg
                    className="awards-category__brackets"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <polyline className="awards-category__bracket" points="73,100 0,100 0,0 6,0" />
                    <polyline
                      className="awards-category__bracket awards-category__bracket--right"
                      points="52,0 100,0 100,100 94,100"
                    />
                  </svg>
                </h2>
              </div>
              <div className="awards-video">{category.video && <category.video />}</div>
            </section>
          ))}
        </div>
      </section>

      <section className="awards-contact">
        <div className="container">
          <p className="section-label section-label--light">People with Ideas</p>
          <h2 className="awards-contact__title">Any further questions?</h2>
          <div className="awards-contact__actions">
            <button className="btn btn--light" onClick={onOpenContact} type="button">
              Get in touch{" "}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
            <a className="awards-contact__email" href="mailto:hello@peoplewithideas.co.nz">
              jess@peoplewithideas.co.nz
            </a>
          </div>
        </div>
      </section>

      {sessionWarning && (
        <p className="awards-session-warning" role="status">
          {sessionWarning}
        </p>
      )}
    </main>
  );
};

export default Awards;
