// import imgAbout from "../assets/IFwebsite_PWI.jpg";
import advertisingLuxury from "../assets/Advertisingluxury.jpeg";
import brandHeadshotPWI from "../assets/BrandHeadshotPWI.jpeg";
import businessHeadshotPWI from "../assets/BusinessheadshotPWI.jpeg";
import contentCreatorPWI from "../assets/ContenCreatorPWI.jpg";
import creativePhotographyPWI from "../assets/CreativePhotographyPWI.jpg";
import drMorseTattooArtistPWI from "../assets/Dr.Morse-TattooArtist_PWI.jpg";
import gymLadyTrainingSessionPWI from "../assets/GymLadytrainingsessionPWI.jpeg";
import headshotsPWI from "../assets/HeadshotsPWI.jpeg";
import marketingManagerPWI from "../assets/MarketingManagerPWI.jpeg";
import productionLadyPhotographPWI from "../assets/Production_Lady_Photography_PWI.jpg";
import socialMediaManagerPhotographPWI from "../assets/Socialmedia-Manager-Photography-PWI.jpg";
import tattooArtistWellingtonPWI from "../assets/TattooartistWellington-PWI.jpg";
import wellingtonOrchestraPWI from "../assets/WellingtonOrchestraPWI.jpeg";
import "./About.css";
import { useEffect, useState } from "react";

const FADE_TIME = 500; // milliseconds
const DISPLAY_TIME = 3000; // milliseconds

const About = () => {
  const images = [
    advertisingLuxury,
    brandHeadshotPWI,
    businessHeadshotPWI,
    contentCreatorPWI,
    creativePhotographyPWI,
    drMorseTattooArtistPWI,
    gymLadyTrainingSessionPWI,
    headshotsPWI,
    marketingManagerPWI,
    productionLadyPhotographPWI,
    socialMediaManagerPhotographPWI,
    tattooArtistWellingtonPWI,
    wellingtonOrchestraPWI,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      // Fade the current image out

      setIsVisible(false);

      window.setTimeout(() => {
        // Change the image once it has faded out

        setCurrentImage((previousImage) =>
          previousImage === images.length - 1 ? 0 : previousImage + 1,
        );

        window.setTimeout(() => {
          setIsVisible(true);
        }, 50);
      }, FADE_TIME);
    }, DISPLAY_TIME);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__inner">
          <div className="about__image reveal">
            <img
              src={images[currentImage]}
              alt="People with Ideas"
              className={
                isVisible
                  ? "about__slideshow-image is-visible"
                  : "about__slideshow-image"
              }
            />
          </div>

          <div className="about__copy reveal">
            <p className="section-label">Our Values</p>
            {/* <h2 className="about__title">We think out of the Box.</h2> */}
            <p className="about__text">
              <span>
                <b className="about__highlight">People First</b> - We start with
                the audience, because every great idea begins with understanding
                people.
              </span>
              <span>
                <b className="about__highlight">Lead with Curiosity</b> - We ask
                questions before offering answers.
              </span>
              <span>
                <b className="about__highlight">Create with Purpose</b> - Every
                photo, video and strategy should have a reason to exist.
              </span>
              <span>
                <b className="about__highlight">Keep it Genuine</b> - Authentic
                stories always outlast trends.
              </span>
              <span>
                <b className="about__highlight">Grow Together</b> - The best
                ideas come through collaboration and shared perspectives.
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
