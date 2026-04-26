import { useState } from "react";
import "./Testimonials.css";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "So easy to work with! Loved the guys and their passion for anything creative. I highly recommend them.",
    author: "Joshua Ross",
    role: "Owner - Twenty Eight",
  },
  {
    id: 2,
    quote:
      "The team brought a level of creative thinking we hadn't experienced before. Strategic, considered, and beautifully executed.",
    author: "Michelle Henry",
    role: "Marketing & Communications",
  },
  {
    id: 3,
    quote:
      "From the first conversation, it was clear they cared about getting it right - not just getting it done. That difference shows in every frame.",
    author: "Prashanth Gunasekaran",
    role: "Film Director",
  },
];

const Testimonials = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials__header reveal">
          <p className="section-label">Testimonials</p>
          <h2 className="testimonials__title">
            Supported by People
            <br />
            for the people.
          </h2>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <div key={t.id} className={`testimonial reveal${expanded[t.id] ? " is-expanded" : ""}`}>
              <p className="testimonial__quote">"{t.quote}"</p>
              <button
                className="testimonial__toggle"
                aria-expanded={expanded[t.id] ?? false}
                onClick={() => toggle(t.id)}
              >
                {expanded[t.id] ? "Read less" : "Read more"}
              </button>
              <div className="testimonial__divider" />
              <p className="testimonial__author">{t.author}</p>
              <p className="testimonial__role">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
