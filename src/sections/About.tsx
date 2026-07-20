import imgAbout from "../assets/IFwebsite_PWI.jpg";
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__inner">
          <div className="about__image reveal">
            <img
              src={imgAbout}
              alt="PWI"
              aria-description="thinking out the box"
            />
          </div>

          <div className="about__copy reveal">
            <p className="section-label">Our Values</p>
            {/* <h2 className="about__title">We think out of the Box.</h2> */}
            <p className="about__text">
              <span>
                <b>People First</b> - We start with the audience, because every
                great idea begins with understanding people.
              </span>
              <span>
                <b>Lead with Curiosity</b> - We ask questions before offering
                answers.
              </span>
              <span>
                <b>Create with Purpose</b> - Every photo, video and strategy
                should have a reason to exist.
              </span>
              <span>
                <b>Keep it Genuine</b> - Authentic stories always outlast
                trends.
              </span>
              <span>
                <b>Grow Together</b> - The best ideas come through collaboration
                and shared perspectives.
              </span>
            </p>
            {/* <p className="about__text">
              We have extensive experience in building strategies, creating
              films & video content for all channels. Keep teams lean, and
              standards high. We've seen what works, what doesn't and what's
              worth pursuing. We're not here to add to the noise. We help you to
              create ideas, experiences and stories worth passing on.
            </p> */}
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
