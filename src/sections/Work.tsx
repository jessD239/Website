import ResponsiveImage from "../components/ResponsiveImage";
import southward from "../assets/images/featured/southward.jpg?preset=feature";
import realTalk from "../assets/RealTalk.png?preset=wide";
import alex from "../assets/Alex_Image.jpg?preset=card";
import adeline from "../assets/Adeline_FrenchTech_Final.jpeg?position=bottom&preset=card";
import anna from "../assets/Anna.jpeg?preset=card";
import sams from "../assets/images/in-progress/big_brain_run.png?preset=wide";
import tedx from "../assets/images/in-progress/tedx_wellington.jpg?preset=wide";
import "./Work.css";

// Container: max 1320px, 32px side padding. Grid gaps: feature 64px, small row / stories 32px.
const FEATURE_SIZES = "(max-width: 1024px) calc(100vw - 64px), (max-width: 1320px) calc((100vw - 128px) / 2), 596px";
const SMALL_SIZES =
  "(max-width: 768px) calc(100vw - 64px), (max-width: 1024px) calc((100vw - 96px) / 2), (max-width: 1320px) calc((100vw - 128px) / 3), 397px";
const STORY_SIZES = "(max-width: 1024px) calc(100vw - 64px), (max-width: 1320px) calc((100vw - 96px) / 2), 612px";

const Work = () => {
  return (
    <section className="work" id="work">
      <div className="container">
        <div className="work__header reveal">
          <div>
            <p className="section-label">Selected Projects</p>
            <h2 className="work__title">Featured Work</h2>
          </div>
          <a href="#showcase" className="work__browse">
            Browse more projects →
          </a>
        </div>

        <div className="work__grid">
          {/* Featured project 1 (large) */}
          <div className="work__item--feature reveal">
            <div className="work__thumbnail">
              <ResponsiveImage image={southward} sizes={FEATURE_SIZES} alt="Southward Distillery" loading="eager" />
            </div>
            <div className="work__info">
              <p className="work__category">BORN TO DISRUPT</p>
              <h3 className="work__name">Southward Distilling - Whisky, But Not as You Know It</h3>
              <p className="work__desc">
                Frankie wanted Southward Whisky to have an identity of its own; distinct from the gin brand she had
                already built. Sophisticated and considered, but still bold, honest and unmistakably her, with a
                feminine edge. We brought that idea to life through cinematic storytelling, rich colour and a little
                theatre, creating a world that feels less like traditional whisky and more like Southward.
              </p>
              <a href="#showcase" className="work__link">
                View Project →
              </a>
            </div>
          </div>

          {/* Featured project 2 (large) */}
          <div className="work__item--feature reveal">
            <div className="work__thumbnail" style={{ aspectRatio: "16/9" }}>
              <ResponsiveImage image={realTalk} sizes={FEATURE_SIZES} alt="RealTalk" />
            </div>
            <div className="work__info">
              <p className="work__category">A one word story</p>
              <h3 className="work__name">RealTalk - An impactful message</h3>
              <p className="work__desc">
                Content can be more than just another video, reel or post. For RealTalk, we created a distinct look and
                feel to capture the attention of their audience and make sure the message created an impact.
              </p>
              <a href="#showcase" className="work__link">
                View Project →
              </a>
            </div>
          </div>
        </div>

        <div className="work__stories">
          <div className="work__stories-header reveal">
            <div>
              <p className="section-label">In progress</p>
              <h2 className="work__stories-title">Stories Still Being Written</h2>
            </div>
          </div>

          <div className="work__stories-grid">
            <article className="work__story reveal">
              <div className="work__story-image">
                <ResponsiveImage
                  image={sams}
                  sizes={STORY_SIZES}
                  alt="Sam's Big Brain Run"
                  style={{ objectPosition: "50% 30%" }}
                />
              </div>
              <div className="work__story-info">
                <p className="work__category">Feature Documentary | Community Movement</p>
                <h3 className="work__name">Sam’s Big Brain Run</h3>
                <p className="work__story-tagline">
                  1,250 kilometres. 25 days. One young New Zealander running the length of the North Island.
                </p>
                <p className="work__desc">
                  What begins as an extraordinary endurance challenge becomes the catalyst for a much bigger national
                  conversation about brain tumours, the data New Zealand is missing and what we could build for the
                  future.
                </p>
                <p className="work__story-status">Status: In production</p>
                <a
                  className="work__link"
                  href="https://www.bigbrainfoundation.org/sams-big-brain-run"
                  target="_blank"
                  rel="noreferrer"
                >
                  Follow the journey <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            <article className="work__story reveal">
              <div className="work__story-image">
                <ResponsiveImage
                  image={tedx}
                  sizes={STORY_SIZES}
                  alt="TedX Wellington"
                  style={{ objectPosition: "50% 50%" }}
                />
              </div>
              <div className="work__story-info">
                <p className="work__category">Mini documentary series | Official sponsor</p>
                <h3 className="work__name">TEDx Wellington Studio Talks</h3>
                <p className="work__story-tagline">Every great idea begins with a story.</p>
                <p className="work__desc">
                  We're partnering with TEDx Wellington to create cinematic studio documentaries that introduce the
                  people behind this year's talks, exploring each speaker's journey, perspective and purpose before they
                  step onto the TEDx stage.
                </p>
                <p className="work__story-status">Status: Filming September 2026</p>
                <span className="work__link work__link--muted">Coming soon</span>
              </div>
            </article>
          </div>
        </div>

        <div className="work__divider" aria-hidden="true" />

        {/* Smaller projects row */}
        <div className="work__row">
          <div className="work__item--small reveal">
            <div className="work__thumbnail">
              <ResponsiveImage image={alex} sizes={SMALL_SIZES} alt="Alex" />
            </div>
            <p className="work__category">Photography</p>
            <h3 className="work__name">Elevate your Content library.</h3>
            <p className="work__desc">
              A picture says more than a thousand words. Great photography can elevate your content and make it feel
              more premium, engaging and on-brand.
            </p>
          </div>

          <div className="work__item--small reveal">
            <div className="work__thumbnail">
              <ResponsiveImage
                image={adeline}
                sizes={SMALL_SIZES}
                alt="Adeline - French Tech"
                style={{ objectPosition: "center bottom" }}
              />
            </div>
            <p className="work__category">Social Media, Podcast or TV</p>
            <h3 className="work__name">Knowing your Audience is key.</h3>
            <p className="work__desc">
              Who are you trying to reach? And where? Let's find out, and create solutions together.
            </p>
          </div>

          <div className="work__item--small reveal">
            <div className="work__thumbnail">
              <ResponsiveImage image={anna} sizes={SMALL_SIZES} alt="Anna" />
            </div>
            <p className="work__category">Creative Strategy</p>
            <h3 className="work__name">Think ahead.</h3>
            <p className="work__desc">
              Sometimes you don't need more content, you might just need a better strategy and execution plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
