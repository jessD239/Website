import { useState, type ReactNode } from "react";
import { useReveal } from "../functions/Utility";

// import placeholder from "../assets/images/collective/placeholder.jpg";

import jess1 from "../assets/images/collective/jess_main_1.jpg";
import jess2 from "../assets/images/collective/jess_work_2.jpg";
import jess3 from "../assets/images/collective/jess_work_3.jpg";
import matt1 from "../assets/images/collective/matt_main_1.jpg";
import matt2 from "../assets/images/collective/matt_work_2.jpg";
import matt3 from "../assets/images/collective/matt_work_3.png";
import caleb1 from "../assets/images/collective/caleb_main_1.jpg";
import caleb2 from "../assets/images/collective/caleb_work_2.jpg";
import caleb3 from "../assets/images/collective/caleb_work_3.jpg";
import chris1 from "../assets/images/collective/chris_main_1.jpg";
import chris2 from "../assets/images/collective/chris_work_2.jpg";
import chris3 from "../assets/images/collective/chris_work_3.jpg";
import fran1 from "../assets/images/collective/fran_main_1.jpg";
import fran2 from "../assets/images/collective/fran_work_2.jpg";
import fran3 from "../assets/images/collective/fran_work_3.jpg";
import "./Collective.css";

interface ProfileImage {
  src: string;
  orientation?: "portrait" | "landscape";
  /** Overrides the orientation's default aspect-ratio, e.g. "16 / 9". */
  aspectRatio?: string;
  /** Overrides the default floated width (e.g. "220px") for ratios that need more room. */
  width?: string;
  /** Which side the image floats to, with text wrapping the opposite side. Defaults to "left". */
  side?: "left" | "right";
}

interface Profile {
  id: number;
  name: string;
  role: string;
  /** Always visible. Complete sentence/paragraph. */
  bio: ReactNode;
  /** Optional extra bio shown at the top of the expanded dropdown. */
  extendedBio?: ReactNode;
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
    name: "Jess",
    role: "Creative Director | Co-founder",
    bio: (
      <>
        I believe every great idea starts with listening. As Creative Director and co-founder of People with Ideas, I
        help organisations uncover
      </>
    ),
    extendedBio: (
      <>
        authentic stories and transform them into brands, films, campaigns and experiences that genuinely connect with
        people. Whether I'm developing a brand, producing ads, films, documentaries or leading a creative workshop, my
        focus is always on uncovering the stories that matter most.
      </>
    ),
    images: [jess1, jess2],
    innerImage: { src: jess3, orientation: "portrait" },
    dropdownText: (
      <>
        Over the years I've worked alongside businesses, charities and communities across New Zealand and the Pacific,
        creating campaigns, films and digital experiences that put people first. I love building genuine relationships,
        exploring new places and turning meaningful conversations into ideas that inspire action.
      </>
    ),
    linkedin: "https://www.linkedin.com/in/jessdlucht/",
    website: "https://jessdenise.com/",
  },
  {
    id: 2,
    name: "Matt",
    role: "Director of Photography | Co-founder",
    bio: (
      <>
        For more than 25 years, I’ve been crafting stories through film. My career began in the world of feature films,
        working on productions including
      </>
    ),
    extendedBio: (
      <>
        Avatar, King Kong and a wide range of independent films, where I developed a passion for cinematic storytelling,
        visual composition and creating imagery that serves the story.
      </>
    ),
    images: [matt1, matt2],
    innerImage: { src: matt3, orientation: "portrait" },
    dropdownText: (
      <>
        Today, I bring that experience to People with Ideas, helping businesses and organisations create beautifully
        crafted films, commercials and branded content with the same level of care and attention to detail. Whether I’m
        behind the camera, shaping a creative concept or refining the final edit, I believe great cinematography should
        elevate a story, not distract from it.
      </>
    ),
    linkedin: "https://www.linkedin.com/in/matt-sharp-367a5537/",
    website: "https://ma6429.wixsite.com/matt-sharp",
  },
  {
    id: 3,
    name: "Caleb",
    role: "Photographer | Videographer | Documentary Storyteller",
    bio: <>I am a photographer and documentary filmmaker who believes the best stories are built on trust. My work</>,
    extendedBio: (
      <>
        has taken me across New Zealand and the Pacific, where I have spent extended time living and working alongside
        communities to capture authentic stories with honesty and respect.
      </>
    ),
    images: [caleb1, caleb2],
    innerImage: { src: caleb3, orientation: "portrait" },
    dropdownText: (
      <>
        Calm, curious and people-focused, I think I might have a natural ability to make people feel comfortable in
        front of the camera, creating imagery that feels genuine, cinematic and deeply human.
      </>
    ),
    website: "https://www.calebansleymedia.com",
  },
  {
    id: 4,
    name: "Chris",
    role: "Commercial Photographer | Visual Storyteller",
    bio: (
      <>
        I am an award-winning commercial photographer who creates thoughtful, high-quality imagery for businesses,
        hospitality brands and organisations throughout New Zealand.
      </>
    ),
    extendedBio: (
      <>
        With a collaborative approach and an eye for detail, I produce photography that feels authentic, purposeful and
        beautifully crafted.
      </>
    ),
    images: [chris1, chris2],
    innerImage: { src: chris3, orientation: "portrait" },
    dropdownText: (
      <>
        Together with People with Ideas, I help bring brands and stories to life through imagery that captures not only
        what people do, but who they are. My work is grounded in trust, creativity and a genuine passion for creating
        visuals that connect with audiences.
      </>
    ),
    website: "https://www.chrisholloman.com/",
  },
  {
    id: 5,
    name: "Fran",
    role: "Digital Marketing | Strategy | Performance",
    bio: (
      <>
        I believe great marketing starts with understanding people. Through Virtual Marketers, I help businesses develop
      </>
    ),
    extendedBio: (
      <>digital strategies and campaigns that connect with the right audience and turn ideas into measurable results.</>
    ),
    images: [fran1, fran2],
    innerImage: { src: fran3, orientation: "landscape", aspectRatio: "16 / 9", width: "100%" },
    dropdownText: (
      <>
        I love collaborating with creative teams to combine authentic storytelling with data-driven marketing. Together,
        we create campaigns that not only perform but help businesses build genuine, lasting connections with the people
        they want to reach.
      </>
    ),
    website: "https://www.virtualmarketers.co.nz/",
  },
];

const Collective = () => {
  useReveal();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="collective-page">
      <section className="collective-hero">
        <div className="container">
          <p className="section-label">Our Collective</p>
          <h1 className="collective-hero__title">Your creative menu.</h1>
          <p className="collective-hero__text">
            Great ideas rarely come from one person. We’ve built a collective of trusted creatives, strategists and
            technical specialists who join us when their expertise is exactly what’s needed.
          </p>
          <p className="collective-hero__text">
            We don’t believe the best ideas come from having the biggest team. We believe they come from bringing
            together the right people.
          </p>
        </div>
      </section>

      <section className="collective-profiles">
        <div className="container">
          <div className="collective-grid">
            {profiles.map((profile, index) => {
              const isOpen = expanded[profile.id] ?? false;
              const hasExpandable = !!(
                profile.extendedBio ||
                profile.innerImage ||
                profile.linkedin ||
                profile.website
              );

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
                    <p className="collective-profile__role">
                      {profile.role.split(" | ").map((rolePart, roleIndex) => (
                        <span key={rolePart}>
                          {roleIndex > 0 && (
                            <>
                              <wbr />
                              <span className="collective-profile__role-separator">&nbsp;|&nbsp;</span>
                            </>
                          )}
                          <span className="collective-profile__role-part">{rolePart}</span>
                        </span>
                      ))}
                    </p>
                    <h2 className="collective-profile__name">{profile.name}</h2>
                    <p
                      className={`collective-profile__bio${
                        hasExpandable && !isOpen ? " collective-profile__bio--truncated" : ""
                      }`}
                    >
                      {profile.bio}
                      {profile.extendedBio && isOpen && <> {profile.extendedBio}</>}
                    </p>

                    {hasExpandable && (
                      <>
                        <div className={`collective-profile__dropdown${isOpen ? " is-open" : ""}`}>
                          <div className="collective-profile__dropdown-inner">
                            {profile.innerImage && (
                              <div className="collective-profile__dropdown-row">
                                <div
                                  className={`collective-profile__image collective-profile__image--tertiary collective-profile__image--${profile.innerImage.orientation ?? "portrait"} collective-profile__image--${profile.innerImage.side ?? "left"}`}
                                  style={{
                                    aspectRatio: profile.innerImage.aspectRatio,
                                    width: profile.innerImage.width,
                                  }}
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
                          <span className="collective-profile__toggle-icon" aria-hidden="true">
                            {isOpen ? "−" : "+"}
                          </span>
                          {isOpen ? "Read less" : "Read more"}
                        </button>
                      </>
                    )}
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
