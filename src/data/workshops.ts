/**
 * Workshop content lives here so it can be edited without touching the page layout.
 *
 * DRAFT: durations, group sizes, inclusions and prices below are placeholders for review.
 * Leave `price` undefined to show "Pricing on enquiry".
 */

export interface WorkshopFormat {
  slug: string;
  /** Small label above the title, e.g. "For teams". */
  audience: string;
  title: string;
  /** Used in the enquiry message, e.g. "Group Workshop". */
  enquiryName: string;
  summary: string;
  meta: { label: string; value: string }[];
  includes: string[];
  outcome: string;
  price?: string;
  featured?: boolean;
}

export const workshopFormats: WorkshopFormat[] = [
  {
    slug: "group",
    audience: "For teams",
    title: "Group Workshop",
    enquiryName: "Group Workshop",
    summary:
      "A hands-on session for your whole team. We look at what you're making, why it's not landing, and leave everyone with a shared plan.",
    meta: [
      { label: "Length", value: "Half or full day" },
      { label: "Group size", value: "4 – 20 people" },
      { label: "Where", value: "Your space or ours" },
    ],
    includes: [
      "Pre-session chat and content review",
      "Interactive, practical workshop",
      "Team exercises built around your real content",
      "Written action plan afterwards",
    ],
    outcome: "A team pulling in the same direction, with clear next steps.",
  },
  {
    slug: "personal-2hr",
    audience: "For individuals",
    title: "2-Hour Personal Session",
    enquiryName: "2-Hour Personal Session",
    summary:
      "Focused, one-on-one time on a single problem. Ideal for founders and marketers who need a fresh set of eyes and a straight answer.",
    meta: [
      { label: "Length", value: "2 hours" },
      { label: "Group size", value: "1 – 2 people" },
      { label: "Where", value: "In person or online" },
    ],
    includes: [
      "Short brief before we meet",
      "Review of one channel, campaign or idea",
      "Practical recommendations on the spot",
      "Summary of next steps",
    ],
    outcome: "Clarity on one thing, and exactly what to do next.",
  },
  {
    slug: "personal-4hr",
    audience: "For individuals",
    title: "4-Hour Deep Dive",
    enquiryName: "4-Hour Deep Dive",
    summary:
      "Room to go properly deep. We review your content end to end, upskill you where it matters and build a plan you can run with.",
    meta: [
      { label: "Length", value: "4 hours" },
      { label: "Group size", value: "1 – 3 people" },
      { label: "Where", value: "In person or online" },
    ],
    includes: [
      "Everything in the 2-hour session",
      "Full review of your current content",
      "Hands-on skills and tools, including AI",
      "Content plan for the next 3 months",
    ],
    outcome: "Confidence, new skills and a plan you own.",
    featured: true,
  },
];

export const workshopTopics: { title: string; text: string }[] = [
  {
    title: "Content review",
    text: "What's working, what's not, and why. An honest look at what you're already putting out.",
  },
  {
    title: "Strategy & planning",
    text: "Who you're talking to, what to make, and where it should go.",
  },
  {
    title: "Storytelling",
    text: "Finding the stories worth telling and shaping them so people actually care.",
  },
  {
    title: "Creating on a budget",
    text: "Shooting, editing and publishing with the tools you already have.",
  },
  {
    title: "AI tools",
    text: "Where AI genuinely helps your content, and where it gets in the way.",
  },
  {
    title: "Team upskilling",
    text: "Building the confidence and habits for your team to keep going without us.",
  },
];

export const workshopSteps: { title: string; text: string }[] = [
  {
    title: "We talk",
    text: "A quick chat about where you're at, what you've tried and what you want to get out of it. No brief required.",
  },
  {
    title: "We prepare",
    text: "We review your content and shape the session around your real situation. No templates.",
  },
  {
    title: "We work",
    text: "Practical, hands-on and honest. You'll be doing, not just listening.",
  },
  {
    title: "You move forward",
    text: "You leave with clear direction, practical steps and a written summary to keep you on track.",
  },
];

export const workshopFaqs: { question: string; answer: string }[] = [
  {
    question: "Which format is right for me?",
    answer:
      "If it's about getting a team aligned, a group workshop. If it's one problem you need solved, the 2-hour session. If you want a full review and a plan to run with, the 4-hour deep dive. Not sure? Get in touch and we'll point you in the right direction.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "Not much. We'll send a short set of questions beforehand and ask for links to your current content. The more we know going in, the more useful the session.",
  },
  {
    question: "Can sessions be run online?",
    answer:
      "Personal sessions work well online. Group workshops are best in person, but we can run them remotely if your team is spread out.",
  },
  {
    question: "Do you travel outside Wellington?",
    answer: "Yes. We work with teams across New Zealand. Travel costs are quoted up front.",
  },
  {
    question: "Can you tailor the content?",
    answer:
      "Always. Every session is built around your business, your audience and the content you're already making.",
  },
  {
    question: "What happens after the workshop?",
    answer:
      "You'll get a written summary and next steps. If you want ongoing support, we can set up follow-up sessions or help bring the plan to life with our production team.",
  },
];
