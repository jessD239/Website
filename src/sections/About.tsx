import imgAbout from "../assets/IFwebsite_PWI.jpg";
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__inner">
          <div className="about__image reveal">
            <img src={imgAbout} alt="PWI" />
          </div>

          <div className="about__copy reveal">
            <p className="section-label">Our Philosophy</p>
            <h2 className="about__title">We think out of the Box.</h2>
            <p className="about__text">
              Every good idea starts somewhere. We explore, challenge, and shape ideas into something meaningful - not
              just something that looks good.
            </p>
            <p className="about__text">
              We have extensive experience in building strategies, creating films & video content for all channels. Keep
              teams lean, and standards high. We've seen what works, what doesn't and what's worth pursuing. We're not
              here to add to the noise. We help you to create ideas, experiences and stories worth passing on.
            </p>
            <a href="#contact" className="btn btn--primary">
              Work With Us <span className="btn__arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
