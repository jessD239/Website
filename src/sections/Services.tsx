import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Services.css";

interface Service {
  id: number;
  number: string;
  title: React.ReactNode;
  text: React.ReactNode;
  detailTitle: string;
  detailContent: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Consulting & Workshops",
    text: "From 2-4 hour sessions to multi-day programmes, we identify what's working and give your team clear direction as well as tools to learn and grow.",
    detailTitle: "Make your content work harder",
    detailContent: (
      <>
        <p>If your content isn't landing - or you're not sure what to do next - we can help.</p>
        <p>
          <strong>What we do</strong>
        </p>
        <ul>
          <li>Identify what's working (and what's not)</li>
          <li>Review your current content</li>
          <li>Train and upskill your team where needed</li>
          <li>Guide your team on how to improve</li>
          <li>Introduce tools where useful, including AI</li>
        </ul>
        <p>
          <strong>Formats</strong>
        </p>
        <p>2-4 hour sessions. Full-day workshops. Multi-day programmes or semi-permanent for intense training.</p>
        <p>
          <strong>Outcome</strong>
        </p>
        <p>Clear direction. Practical steps. Confidence to move forward.</p>

        {/* 
        <p>
          We work with teams of all sizes - from founders figuring out their message to established businesses that need
          a creative reset. Our sessions are practical, focused, and built around your specific situation.
        </p>
        <ul>
          <li>Brand &amp; messaging clarity workshops</li>
          <li>Content strategy sessions</li>
          <li>Team training and creative development</li>
          <li>One-on-one advisory retainers</li>
        </ul>
        <p>Every engagement starts with a conversation. No templates, no fluff.</p> */}
      </>
    ),
  },
  {
    id: 2,
    number: "02",
    title: "Media Production",
    text: (
      <>
        We don't just film and shoot. We start with the <i>why</i>. Video production, podcasts, photography, live
        streaming, motion graphics editing and content libraries - all built around strategy first.
      </>
    ),
    detailTitle: "We offer content with a purpose",
    detailContent: (
      <>
        <ul>
          <li>Content strategy and roll-out plan</li>
          <li>Video production</li>
          <li>Podcasts</li>
          <li>Photography</li>
          <li>Live streaming</li>
          <li>Content libraries - create from scratch, add, or refresh</li>
          <li>Editing - one-off or semi-regular</li>
        </ul>
        <p>
          <strong>Approach</strong>
        </p>
        <p>Plan first. Then create. Less guesswork. Better results.</p>
      </>
    ),
  },
  {
    id: 3,
    number: "03",
    title: (
      <>
        Creative Hub&nbsp;
        <span className="service-card__badge">Coming Soon</span>
      </>
    ),
    text: (
      <>
        The right people, without the search.
        <br />A curated network of our most trusted creatives - ready when you need them. No endless CVs, AI search or
        asking your mate. We will connect you to the right person for the job.
      </>
    ),
    detailTitle: "Our people are your people",
    detailContent: (
      <>
        <p>A curated network of trusted creatives - ready when you need them.</p>
        <p>
          <strong>What it means</strong>
        </p>
        <ul>
          <li>No endless CVs</li>
          <li>No guesswork</li>
          <li>Just the right person for the job</li>
          <li>We manage quality control, admin, and communication</li>
        </ul>
      </>
    ),
  },
];

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline
      points="6,9 12,15 18,9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Services = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const interactiveActiveId = isMobile ? null : activeId;
  const activeService = services.find((s) => s.id === interactiveActiveId) ?? null;

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 768px)");

    const updateMobile = () => setIsMobile(mobileMedia.matches);
    updateMobile();

    mobileMedia.addEventListener("change", updateMobile);
    return () => mobileMedia.removeEventListener("change", updateMobile);
  }, []);

  useLayoutEffect(() => {
    if (!detailRef.current || !innerRef.current) return;
    if (interactiveActiveId !== null) {
      detailRef.current.style.height = innerRef.current.scrollHeight + "px";
    } else {
      detailRef.current.style.height = "0px";
    }
  }, [interactiveActiveId]);

  const handleCardClick = (id: number) => {
    if (isMobile) return;
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__header reveal">
          <p className="section-label section-label--light">What We Do &amp; Why you are here</p>
          <h2 className="services__title">Services</h2>
          <p className="services__intro">
            Why do you use AI? Most likely to get an idea. What if you could just ask a human? Someone who understands
            your business and what is actually worth doing. Maybe you have an idea but do not know how to execute it. Or
            you are creating content, but it's just not landing. We help you figure out what to make, where it should
            go, and how to make it work. From planning to execution, we make content feel simple.
            <br />
            <br />
            Got an idea? We'll make something out of it. If not, you're in the right place.
          </p>
        </div>

        <div className="services__list reveal">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card${interactiveActiveId === service.id ? " is-active" : ""}`}
              onClick={isMobile ? undefined : () => handleCardClick(service.id)}
              role={isMobile ? undefined : "button"}
              aria-expanded={isMobile ? undefined : interactiveActiveId === service.id}
            >
              <p className="service-card__number">{service.number}</p>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__text">{service.text}</p>

              {/* Mobile inline detail */}
              <div className="service-card__mobile-detail reveal">
                <h4 className="services__detail-title">{service.detailTitle}</h4>
                <div className="services__detail-text">{service.detailContent}</div>
              </div>

              <div className="service-card__arrow">
                <ChevronIcon />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop expand panel - sits outside the grid */}
        <div ref={detailRef} className={`services__detail${interactiveActiveId !== null ? " is-open" : ""}`}>
          <div ref={innerRef} className="services__detail-inner">
            {activeService && (
              <>
                <h4 className="services__detail-title">{activeService.detailTitle}</h4>
                <div className="services__detail-text">{activeService.detailContent}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
