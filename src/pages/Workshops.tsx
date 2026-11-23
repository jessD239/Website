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
];

const Workshops = ({ onEnquire }: WorkshopsProps) => {
  useReveal();

  return (
    <div className="workshops-page">
      {/* ---------- Hero ---------- */}
      <section className="workshops-hero">
        <div className="container">
          <p className="section-label reveal">Consulting &amp; Workshops</p>
          <h1 className="workshops-hero__title reveal">Make your content work harder.</h1>
          <p className="workshops-hero__text reveal">
            Practical sessions that show you what's working, fix what isn't and give you the tools and confidence to
            move forward. Built around your business, never a template.
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
            {workshopFormats.map((format, i) => (
              <article
                key={format.slug}
                id={format.slug}
                className={`format-card reveal${format.featured ? " format-card--featured" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="format-card__top">
                  <p className="format-card__number">{String(i + 1).padStart(2, "0")}</p>
                  {format.featured && <span className="format-card__badge">Most popular</span>}
                </div>
                <p className="format-card__audience">{format.audience}</p>
                <h3 className="format-card__title">{format.title}</h3>
                <p className="format-card__summary">{format.summary}</p>

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
              </article>
            ))}
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
              Mix and match. Most sessions cover two or three of these, depending on where you need the most help.
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
