import { useState, type ReactNode } from "react";
import PWILogo from "../components/ui/PWILogo";
import { useReveal } from "../functions/Utility";
import imgTwentyEightA from "../assets/TwentyEight_imageV2.png";
import imgTwentyEightB from "../assets/Twentyeight_Image.png";
import imgBrandHeadshot from "../assets/BrandHeadshotPWI.jpeg";
import imgMarketingManager from "../assets/MarketingManagerPWI.jpeg";
import imgBusinessHeadshot from "../assets/BusinessheadshotPWI.jpeg";
import imgSocialMediaManager from "../assets/Socialmedia-Manager-Photography-PWI.jpg";
import imgRealTalkA from "../assets/RealTalk.png";
import imgRealTalkB from "../assets/RealTalk_Man-2.jpg";
import imgHeadshots from "../assets/HeadshotsPWI.jpeg";
import imgAlex from "../assets/Alex_Image.jpg";
import imgContentCreator from "../assets/ContenCreatorPWI.jpg";
import imgProductionPhotography from "../assets/Production_Lady_Photography_PWI.jpg";
import imgAdelineA from "../assets/Adeline_FrenchTech_Final.jpeg";
import imgAdelineB from "../assets/Adeline_FrenchTech_v2.jpg";
import imgAinslie from "../assets/Ainsle_image.png";
import imgAnna from "../assets/Anna.jpeg";
import imgCreativePhotography from "../assets/CreativePhotographyPWI.jpg";
import imgLady from "../assets/Lady_Image.jpg";
import "./Collective.css";

interface ProfileImage {
  src: string;
  orientation?: "portrait" | "landscape";
}

interface Profile {
  id: number;
  name: string;
  role: string;
  /** Always visible. Should read naturally on its own, and flow into `bioMore` when expanded. */
  bioPreview: ReactNode;
  /** Only rendered once the profile is expanded. */
  bioMore: ReactNode;
  images: [string, string];
  innerImage?: ProfileImage;
  /** Extra paragraph shown alongside `innerImage` inside the expanded dropdown. */
  dropdownText?: ReactNode;
  linkedin?: string;
  website?: string;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Jess Denise",
    role: "Creative Director | Co-founder",
    bioPreview: (
      <>
        I believe every great idea starts with listening. As Creative Director and co-founder of People with Ideas, I
        combine
      </>
    ),
    bioMore: (
      <>
        {" "}
        strategy, storytelling and creativity to help organisations connect with people in authentic and meaningful
        ways. Whether I'm developing a brand, producing ads, films, documentaries or leading a creative workshop, my
        focus is always on uncovering the stories that matter most.
      </>
    ),
    images: [imgTwentyEightA, imgTwentyEightB],
    innerImage: { src: imgBrandHeadshot, orientation: "portrait" },
    dropdownText: (
      <>
        Over the years I've worked alongside businesses, charities and communities across New Zealand and the Pacific,
        creating campaigns, films and digital experiences that put people first. I love building genuine relationships,
        exploring new places and turning meaningful conversations into ideas that inspire action.
      </>
    ),
    linkedin: "#",
    website: "#",
  },
  {
    id: 2,
    name: "Michelle Henry",
    role: "Marketing & Communications",
    bioPreview: <>We worked together to build content that speaks directly to the right audience, at the right time.</>,
    bioMore: (
      <>
        {" "}
        Michelle's eye for detail and clarity of message shaped a campaign that felt considered from start to finish.
      </>
    ),
    images: [imgMarketingManager, imgBusinessHeadshot],
    innerImage: { src: imgSocialMediaManager, orientation: "portrait" },
    linkedin: "#",
  },
  {
    id: 3,
    name: "Prashanth Gunasekaran",
    role: "Film Director — RealTalk",
    bioPreview: <>Together we crafted a distinct look and feel for RealTalk that made sure the message landed.</>,
    bioMore: <> It's a reminder that content doesn't need to shout to be heard — it just needs to be honest.</>,
    images: [imgRealTalkA, imgRealTalkB],
    innerImage: { src: imgHeadshots, orientation: "portrait" },
    linkedin: "#",
    website: "#",
  },
  {
    id: 4,
    name: "Alex",
    role: "Content Creator",
    bioPreview: <>We helped build a library Alex could lean on across every platform —</>,
    bioMore: <> polished enough to feel premium, versatile enough to keep up with a fast-moving content calendar.</>,
    images: [imgAlex, imgContentCreator],
    innerImage: { src: imgProductionPhotography, orientation: "landscape" },
    website: "#",
  },
  {
    id: 5,
    name: "Adeline",
    role: "French Tech",
    bioPreview: <>We partnered with Adeline to find the right voice for French Tech across social, podcast and TV.</>,
    bioMore: <> The result: content that felt native to every platform it landed on.</>,
    images: [imgAdelineA, imgAdelineB],
    innerImage: { src: imgAinslie, orientation: "portrait" },
    linkedin: "#",
  },
  {
    id: 6,
    name: "Anna",
    role: "Creative Strategy",
    bioPreview: <>We worked with Anna to think ahead and execute with intent,</>,
    bioMore: <> building a strategy first so every piece of content that followed had a clear purpose.</>,
    images: [imgAnna, imgCreativePhotography],
    innerImage: { src: imgLady, orientation: "portrait" },
    linkedin: "#",
    website: "#",
  },
];

const Collective = () => {
  useReveal();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="collective-page">
      <a href="/" className="collective-page__back" aria-label="Back to People With Ideas">
        <PWILogo scrolled />
      </a>

      <section className="collective-hero">
        <div className="container">
          <p className="section-label">The Collective</p>
          <h1 className="collective-hero__title">People we're proud to feature.</h1>
          <p className="collective-hero__text">
            Great ideas rarely come from one person. Over the years, we’ve built a collective of talented specialists:
            photographers, designers, developers, filmmakers, strategists, Meta and SEO experts, who join us when their
            expertise is exactly what’s needed. We don’t believe in building a big agency. We believe in building the
            right team for every project.
          </p>
        </div>
      </section>

      <section className="collective-profiles">
        <div className="container">
          <div className="collective-grid">
            {profiles.map((profile, index) => {
              const isOpen = expanded[profile.id] ?? false;

              return (
                <article
                  key={profile.id}
                  className={`collective-profile reveal${index % 2 === 1 ? " collective-profile--reverse" : ""}`}
                >
                  <div className="collective-profile__gallery">
                    <div className="collective-profile__image collective-profile__image--primary">
                      <img src={profile.images[0]} alt={`${profile.name} — ${profile.role}`} />
                    </div>
                    <div className="collective-profile__image collective-profile__image--secondary">
                      <img src={profile.images[1]} alt={`${profile.name} — ${profile.role}`} />
                    </div>
                  </div>

                  <div className="collective-profile__info">
                    <p className="collective-profile__role">{profile.role}</p>
                    <h2 className="collective-profile__name">{profile.name}</h2>

                    <p className="collective-profile__bio">
                      {profile.bioPreview}
                      {isOpen ? profile.bioMore : "…"}
                    </p>

                    <div className={`collective-profile__dropdown${isOpen ? " is-open" : ""}`}>
                      <div className="collective-profile__dropdown-inner">
                        {profile.innerImage && (
                          <div className="collective-profile__dropdown-row">
                            <div
                              className={`collective-profile__image collective-profile__image--tertiary collective-profile__image--${profile.innerImage.orientation ?? "portrait"}`}
                            >
                              <img src={profile.innerImage.src} alt={`${profile.name} — ${profile.role}`} />
                            </div>
                            {profile.dropdownText && (
                              <p className="collective-profile__dropdown-text">{profile.dropdownText}</p>
                            )}
                          </div>
                        )}
                        {(profile.linkedin || profile.website) && (
                          <div className="collective-profile__links">
                            <p className="collective-profile__links-label">More about {profile.name} on:</p>
                            {profile.linkedin && (
                              <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="collective-profile__link"
                              >
                                LinkedIn →
                              </a>
                            )}
                            {profile.website && (
                              <a
                                href={profile.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="collective-profile__link"
                              >
                                Website →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="collective-profile__toggle"
                      aria-expanded={isOpen}
                      onClick={() => toggle(profile.id)}
                    >
                      {isOpen ? "Read less" : "Read more"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collective;
