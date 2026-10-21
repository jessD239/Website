import { useState } from "react";
import "./FAQs.css";

const faqs = [
  {
    question: "What can I actually hire People with Ideas for?",
    answer:
      "Anything from a workshop, shoot or strategy session through to a larger campaign. We can help develop the idea, work out what you need, bring together the right people and deliver the project from start to finish.",
  },
  {
    question: "Do I need to know exactly what I need before getting in touch?",
    answer:
      "Not at all. You can come to us with a finished brief, a half-formed idea, or simply a problem you’re trying to solve. We’ll help you work out what actually makes sense before we start making things.",
  },
  {
    question: "Do you only do video and photography?",
    answer:
      "No. Video and photography are a big part of what we do, but People with Ideas is a creative studio and production company. We also work across strategy, campaigns and workshops, and can connect you with specialists when a project needs expertise outside our core team.",
  },
  {
    question: "Who will actually work on my project?",
    answer:
      "That depends on who is the best fit for your project. Jess or Matt will always be your first point of contact, and from there we’ll build the right team based on the scope, skills and expertise needed. You’ll always know who’s working on your project, and Jess or Matt will oversee the work and quality throughout. No random contractors behind the scenes. Just real, talented creatives we’ve chosen for a reason.",
  },
  {
    question: "What exactly is the Creative Hub?",
    answer:
      "Think of us as a creative broker. If you have a project or idea but don’t know who you need to make it happen, we’ll help you figure that out. Through our Creative Hub, we can connect you with talented creatives you may never have come across otherwise. Where it makes sense, we’ll introduce you to a few people who could be a great fit and let you choose. Every creative works differently, and we think it’s only fair that you have a say in who’s right for your project.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every project is different. A workshop, photography shoot and full campaign all require very different levels of time and resources, so we scope each project individually. If you already have a budget in mind, that’s helpful too. We can often work backwards from it and recommend where your money will have the most impact.",
  },
  {
    question: "Can you work with our existing marketing team or agency?",
    answer:
      "Absolutely. We can become an extension of your internal team, work alongside your existing agency, designer or digital specialists, or simply bring in the missing pieces you need for a particular project. We’re not here to replace good people. We’re here to help fill the gaps and make the project work.",
  },
  {
    question: "Do you only work with businesses in Wellington?",
    answer:
      "No. We’re based in Wellington, but work with businesses across New Zealand and Australia. Strategy sessions and workshops can happen in person or online, and when a project needs someone on the ground elsewhere, we can use our Creative Hub to find and vet the right person locally. Sometimes that’s simply a smarter and more cost-effective way of doing things.",
  },
  {
    question: "Can I hire you for a small project?",
    answer:
      "Absolutely. Not every good idea needs a huge campaign or budget. Sometimes you just need a workshop, a few hours of strategic thinking, a photographer, a video or someone to help point you in the right direction. If we think we can help, we’ll tell you how. If we’re not the right fit, we’ll tell you that too.",
  },
  {
    question: "What happens after I get in touch?",
    answer:
      "We start with a conversation. Tell us what you’re working on, what’s not working, or the idea you can’t quite get out of your head. From there, we’ll ask a few questions, work out what you actually need and recommend the best way forward. No perfectly written brief required.",
  },
];

const FAQItem = ({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;

  return (
    <div className="reveal">
      <article className={`faqs__item${open ? " is-open" : ""}`}>
        <h3 className="faqs__question">
          <button
            type="button"
            className="faqs__trigger"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="faqs__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="faqs__question-text">{question}</span>
            <svg
              className="faqs__caret"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <polyline
                points="6,9 12,15 18,9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </h3>
        <div
          className="faqs__panel"
          id={panelId}
          role="region"
          aria-hidden={!open}
          inert={!open}
        >
          <div className="faqs__panel-inner">
            <p className="faqs__answer">{answer}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

const FAQs = () => {
  return (
    <section className="faqs" id="faqs">
      <div className="container">
        <header className="faqs__header reveal">
          <p className="section-label">Frequently Asked Questions</p>
          <h2 className="faqs__title">Good to know.</h2>
          <p className="faqs__intro">
            A few things you might be wondering before we get started.
          </p>
        </header>

        <div className="faqs__grid">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              index={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
