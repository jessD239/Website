import imgTwentyEight from "../assets/TwentyEight_imageV2.png";
import imgRealTalk from "../assets/RealTalk.png";
import imgAlex from "../assets/Alex_Image.jpg";
import imgAdeline from "../assets/Adeline_FrenchTech_Final.jpeg";
import imgAnna from "../assets/Anna.jpeg";
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
