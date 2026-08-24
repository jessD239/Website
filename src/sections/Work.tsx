import imgTwentyEight from "../assets/TwentyEight_imageV2.jpg";
import imgRealTalk from "../assets/RealTalk.png";
import imgAlex from "../assets/Alex_Image.jpg";
import imgAdeline from "../assets/Adeline_FrenchTech_Final.jpeg";
import imgAnna from "../assets/Anna.jpeg";
import imgSamsBigBrainRun from "../assets/images/in-progress/sams_big_brain_run.png";
import imgTedXWellington from "../assets/images/in-progress/tedx_wellington.jpg";
import "./Work.css";

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
              <img src={imgTwentyEight} alt="Twenty Eight" />
            </div>
            <div className="work__info">
              <p className="work__category">"Best coffee in the Hutt"</p>
              <h3 className="work__name">Twenty Eight - Coffee, Vibes &amp; More</h3>
              <p className="work__desc">
                It's more than just a cafe, it's a hidden gem. Such a good shoot and loved the "retro" video style we
                went for. It reflected the establishment's vibe perfectly.
              </p>
              <a href="#showcase" className="work__link">
                View Project →
              </a>
            </div>
          </div>

          {/* Featured project 2 (large) */}
          <div className="work__item--feature reveal">
            <div className="work__thumbnail" style={{ aspectRatio: "16/9" }}>
              <img src={imgRealTalk} alt="RealTalk" />
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
                <img src={imgSamsBigBrainRun} alt="Sam's Big Brain Run" style={{ objectPosition: "50% 30%" }} />
              </div>
              <div className="work__story-info">
                <p className="work__category">Feature Documentary | Community Movement</p>
                <h3 className="work__name">Sam’s Big Brain Run</h3>
                <p className="work__story-tagline">One run. Twenty-five days. One opportunity to change lives.</p>
                <p className="work__desc">
                  Over 25 consecutive days, Sam will run the length of New Zealand's North Island to raise awareness and
                  vital funds for NANOS, while helping build New Zealand's first Brain Cancer Registry.
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
                <img src={imgTedXWellington} alt="TedX Wellington" style={{ objectPosition: "50% 50%" }} />
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
              <img src={imgAlex} alt="Alex" />
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
              <img src={imgAdeline} alt="Adeline - French Tech" style={{ objectPosition: "center bottom" }} />
            </div>
            <p className="work__category">Social Media, Podcast or TV</p>
            <h3 className="work__name">Knowing your Audience is key.</h3>
            <p className="work__desc">
              Who are you trying to reach? And where? Let's find out, and create solutions together.
            </p>
          </div>

          <div className="work__item--small reveal">
            <div className="work__thumbnail">
              <img src={imgAnna} alt="Anna" />
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
