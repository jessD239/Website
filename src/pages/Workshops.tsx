import { useEffect, useState } from "react";
import { useReveal } from "../functions/Utility";
import FAQs from "../sections/FAQs";
import Contact from "../sections/Contact";
import { workshopFaqs, workshopFormats, workshopSteps, workshopTopics } from "../data/workshops";
import "./Workshops.css";

interface WorkshopsProps {
  /** Opens the contact modal, optionally with the workshop the visitor is enquiring about. */
  onEnquire: (topic?: string) => void;
}

const painPoints = [
  "You're posting, but nothing's landing.",
  "Your team has ideas, but no shared direction.",
  "You know you need content, but not what to make.",
  "You've tried AI tools and ended up with more noise.",
  "You want to get more out of LinkedIn.",
];

const Workshops = ({ onEnquire }: WorkshopsProps) => {
  useReveal();
  /** Mobile accordion: slug of the expanded format card (ignored on desktop, where all cards are open). */
  const [openFormat, setOpenFormat] = useState<string | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Workshops & Consulting | People with Ideas";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="workshops-page">
      {/* ---------- Hero ---------- */}
      <section className="workshops-hero">
        <div className="container">
          <p className="section-label reveal">Consulting &amp; Workshops</p>
          <h1 className="workshops-hero__title reveal">See your content the way your audience does.</h1>
          <p className="workshops-hero__text reveal">
            Practical sessions that build on what you're already doing well, so the people you want to reach notice,
            understand and remember you. Built around your business, never a template.
          </p>
          <div className="workshops-hero__actions reveal">
            <a href="#formats" className="btn btn--primary">
              See the formats <span className="btn__arrow">↓</span>
            </a>
            <button type="button" className="btn btn--outline" onClick={() => onEnquire()}>
              Ask a question
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Sound familiar ---------- */}
      <section className="workshops-familiar">
        <div className="container workshops-familiar__inner">
          <div className="workshops-familiar__header reveal">
            <p className="section-label">Sound familiar?</p>
            <h2 className="workshops-section-title">If any of these ring true, we can help.</h2>
          </div>
          <ul className="workshops-familiar__list">
            {painPoints.map((point, i) => (
              <li key={point} className="workshops-familiar__item reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Formats ---------- */}
      <section className="workshops-formats" id="formats">
        <div className="container">
          <header className="workshops-formats__header reveal">
            <p className="section-label section-label--light">Formats</p>
            <h2 className="workshops-section-title">Choose how you want to work.</h2>
            <p className="workshops-formats__intro">
              Every format is shaped around your goals. Pick a starting point and we'll tailor the rest.
            </p>
          </header>

          <div className="workshops-formats__grid">
            {workshopFormats.map((format, i) => {
              const isOpen = openFormat === format.slug;
              const bodyId = `${format.slug}-details`;
              return (
                <article
                  key={format.slug}
                  id={format.slug}
                  // className must stay static: useReveal adds "is-visible" directly to the DOM,
                  // and a changing className would make React wipe it. Open state lives in data-open.
                  className="format-card reveal"
                  data-open={isOpen}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* On mobile the head toggles the details; the button is the accessible control. */}
                  <div className="format-card__head" onClick={() => setOpenFormat(isOpen ? null : format.slug)}>
                    <div className="format-card__top">
                      <p className="format-card__number">{String(i + 1).padStart(2, "0")}</p>
                      <button
                        type="button"
                        className="format-card__toggle"
                        aria-expanded={isOpen}
                        aria-controls={bodyId}
                        aria-label={`${isOpen ? "Hide" : "Show"} details for ${format.title}`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <polyline
                            points="6,9 12,15 18,9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="format-card__audience">{format.audience}</p>
                    <h3 className="format-card__title">{format.title}</h3>
                    <p className="format-card__summary">{format.summary}</p>
                  </div>

                  <div className="format-card__body" id={bodyId}>
                    <div className="format-card__body-inner">
                      <dl className="format-card__meta">
                        {format.meta.map((m) => (
                          <div key={m.label} className="format-card__meta-row">
                            <dt>{m.label}</dt>
                            <dd>{m.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <p className="format-card__subhead">What's included</p>
                      <ul className="format-card__list">
                        {format.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>

                      <p className="format-card__subhead">Outcome</p>
                      <p className="format-card__outcome">{format.outcome}</p>

                      <div className="format-card__footer">
                        <p className="format-card__price">{format.price ?? "Pricing on enquiry"}</p>
                        <button
                          type="button"
                          className="btn btn--outline-light format-card__cta"
                          onClick={() => onEnquire(format.enquiryName)}
                        >
                          Enquire <span className="btn__arrow">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Custom programme banner */}
          <div className="workshops-custom reveal">
            <div>
              <p className="format-card__audience">For organisations</p>
              <h3 className="workshops-custom__title">Multi-day &amp; ongoing programmes</h3>
              <p className="workshops-custom__text">
                Need something bigger? We run multi-day programmes and semi-permanent, embedded training for teams who
                want intensive support over time.
              </p>
            </div>
            <button
              type="button"
              className="btn btn--light"
              onClick={() => onEnquire("multi-day / ongoing programme")}
            >
              Let's talk <span className="btn__arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Topics ---------- */}
      <section className="workshops-topics">
        <div className="container">
          <header className="workshops-topics__header reveal">
            <p className="section-label">What we cover</p>
            <h2 className="workshops-section-title">Any topic, any format.</h2>
            <p className="workshops-topics__intro">
              Mix and match. Longer sessions cover two or three of these, depending on where you need the most help.
            </p>
          </header>
          <div className="workshops-topics__grid">
            {workshopTopics.map((topic, i) => (
              <div key={topic.title} className="topic-item reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <h3 className="topic-item__title">{topic.title}</h3>
                <p className="topic-item__text">{topic.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="workshops-steps">
        <div className="container">
          <header className="workshops-steps__header reveal">
            <p className="section-label">How it works</p>
            <h2 className="workshops-section-title">Simple from start to finish.</h2>
          </header>
          <ol className="workshops-steps__list">
            {workshopSteps.map((step, i) => (
              <li key={step.title} className="step-item reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="step-item__number">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="step-item__title">{step.title}</h3>
                <p className="step-item__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQs
        id="workshop-faqs"
        items={workshopFaqs}
        label="Workshop FAQs"
        title="Before you book."
        intro="The things people usually ask before a session."
      />

      <Contact onOpenContact={() => onEnquire()} />
    </div>
  );
};

export default Workshops;
