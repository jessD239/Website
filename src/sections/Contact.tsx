import "./Contact.css";

interface ContactProps {
  onOpenContact?: () => void;
}

const Contact = ({ onOpenContact }: ContactProps) => {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta__inner reveal">
          <p className="section-label section-label--light">Start a Project</p>
          <h2 className="cta__title">
            Not sure where to start?
            <br />
            <br />
            We do.
          </h2>
          <p className="cta__text">
            Whether you have a brief ready or a concept taking shape, we'd love to hear from you. Every great project
            starts with a conversation.
          </p>
          <div className="cta__actions">
            <button onClick={onOpenContact} className="btn btn--light">
              Get in Touch <span className="btn__arrow">→</span>
            </button>
          </div>
          <div className="cta__details">
            <div className="cta__detail">
              <p className="cta__detail-label">Email</p>
              <a href="mailto:hello@peoplewithideas.co.nz" className="cta__detail-value">
                hello@peoplewithideas.co.nz
              </a>
            </div>
            <div className="cta__detail">
              <p className="cta__detail-label">Phone</p>
              <a href="tel:+64272660314" className="cta__detail-value">
                +64 272 66 03 14
              </a>
            </div>
            <div className="cta__detail">
              <p className="cta__detail-label">Location</p>
              <a
                href="https://www.google.com/maps/place/New+Zealand"
                target="_blank"
                rel="noopener noreferrer"
                className="cta__detail-value"
              >
                New Zealand
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
