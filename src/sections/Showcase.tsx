import "./Showcase.css";

const Showcase = () => {
  return (
    <section className="showcase" id="showcase">
      <div className="container">
        <div className="showcase__header reveal">
          <p className="section-label">Portfolio</p>
          <h2 className="showcase__title">Thinking visually?</h2>
          <p className="showcase__subtitle">
            A small selection of some of our recent work. Looking for something specific, like educational videos, 2D
            animation or just need a new perspective? Get in touch.
          </p>
        </div>

        <div className="showcase__thumbs">
          {/* Top row: featured landscape (2/3) + portrait (1/3) */}
          <div className="showcase__main-row">
            <div className="showcase__thumb showcase__thumb--featured reveal">
              <div className="showcase__pad showcase__pad--16x9">
                <iframe
                  src="https://player.vimeo.com/video/1185082291?badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Twenty Eight"
                />
              </div>
              <span className="showcase__thumb-label">Twenty Eight - Hero Video</span>
            </div>

            <div className="showcase__thumb showcase__thumb--portrait reveal">
              <div className="showcase__pad showcase__pad--9x16">
                <iframe
                  src="https://player.vimeo.com/video/1185139123?badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="French Tech MiniStories - Adeline"
                />
              </div>
              <span className="showcase__thumb-label">French Tech - Adeline</span>
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
