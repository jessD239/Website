import "./Showcase.css";

const Showcase = () => {
  return (
    <section className="showcase" id="showcase">
      <div className="container">
        <div className="showcase__header reveal">
          <p className="section-label">Portfolio</p>
          <h2 className="showcase__title">Thinking visually?</h2>
          <p className="showcase__subtitle">
            A small selection of some of our recent video, storytelling and Ad creation work. Looking for other types of
            marketing material? Maybe commercial photography or perhaps explainer videos or 2D animation? Get in touch.
          </p>
        </div>

        <div className="showcase__thumbs">
          {/* Top row: featured landscape (2/3) + portrait (1/3) */}
          <div className="showcase__main-row">
            <div className="showcase__thumb showcase__thumb--featured reveal">
              <div className="showcase__pad showcase__pad--16x9">
                <iframe
                  src="https://player.vimeo.com/video/1218781562?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  // style="position:absolute;top:0;left:0;width:100%;height:100%;"
                  title="Southward Distilling - Wellington's First Whisky"
                ></iframe>
              </div>
              <span className="showcase__thumb-label">Southward Distilling - Wellington's First Whisky</span>
            </div>

            <div className="showcase__thumb showcase__thumb--portrait reveal">
              <div className="showcase__pad showcase__pad--9x16">
                <iframe
                  src="https://player.vimeo.com/video/1185139123?badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="French Tech MiniStories - Adeline"
                  loading="lazy"
                />
              </div>
              <span className="showcase__thumb-label">French Tech - Adeline</span>
            </div>

            {/* Placeholders: swap each .showcase__placeholder for an <iframe> like the others */}
            <div className="showcase__thumb showcase__thumb--a reveal">
              <div className="showcase__pad showcase__pad--16x9">
                <iframe
                  src="https://player.vimeo.com/video/1185082291?badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Twenty Eight - Coffee, Vibes & More"
                  loading="lazy"
                />
              </div>
              <span className="showcase__thumb-label">Twenty Eight - Coffee, Vibes & More</span>
            </div>

            <div className="showcase__thumb showcase__thumb--b reveal">
              <div className="showcase__pad showcase__pad--16x9">
                <iframe
                  src="https://player.vimeo.com/video/1219062294?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  // frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  // style="position:absolute;top:0;left:0;width:100%;height:100%;"
                  title="QT_A Secret Worth Keeping Highlights _30sec"
                ></iframe>
              </div>
              <span className="showcase__thumb-label">QT - A Secret Worth Keeping</span>
            </div>
          </div>

          {/* Bottom row: 3 supporting videos */}
          <div className="showcase__secondary-row">
            <div className="showcase__thumb reveal">
              <div className="showcase__pad showcase__pad--16x9">
                <iframe
                  src="https://player.vimeo.com/video/1185035368?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Real Talk - Inspirational Video"
                  loading="lazy"
                />
              </div>
              <span className="showcase__thumb-label">Real Talk - Inspirational Video</span>
            </div>

            <div className="showcase__thumb reveal">
              <div className="showcase__pad showcase__pad--16x9">
                <iframe
                  src="https://player.vimeo.com/video/1185124279?badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Mama Says (Breaking Rules) Music Video"
                  loading="lazy"
                />
              </div>
              <span className="showcase__thumb-label">Mama Says - Ainslie Allen</span>
            </div>

            <div className="showcase__thumb reveal">
              <div className="showcase__pad showcase__pad--16x9">
                <iframe
                  src="https://player.vimeo.com/video/1185142851?badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="TeamCloud - Showcase"
                  loading="lazy"
                />
              </div>
              <span className="showcase__thumb-label">TeamCloud - Showcase</span>
            </div>
          </div>
        </div>

        {/* Vimeo CTA */}
        <div className="showcase__cta">
          <p className="showcase__cta-text">View more on our channel</p>
          <a
            href="https://vimeo.com/user257644529"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Vimeo <span className="btn__arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
