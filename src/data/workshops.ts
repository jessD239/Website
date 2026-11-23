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
}

export const workshopFormats: WorkshopFormat[] = [
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
      "Action plan: 5 priorities, 3 content ideas and 1 clear message",
    ],
    outcome: "Clarity on one thing, and exactly what to do next.",
  },
  {
    slug: "personal-4hr",
    audience: "For individuals & small teams",
    title: "4-Hour Deep Dive",
    enquiryName: "4-Hour Deep Dive",
    summary:
      "Room to go further. We look at your content as a whole, get hands-on with how you create it and map out what to make next.",
    meta: [
      { label: "Length", value: "4 hours" },
      { label: "Group size", value: "1 – 3 people" },
      { label: "Where", value: "In person or online" },
    ],
    includes: [
      "Everything in the 2-hour session",
      "Review of up to 3 channels before we meet",
      "Hands-on skills and tools, including AI",
      "Session summary and a how-to guide to keep",
    ],
    outcome: "Confidence to create, and a plan you own.",
  },
  {
    slug: "content-lab",
    audience: "For small teams",
    title: "Content Lab",
    enquiryName: "Content Lab",
    summary:
      "A hands-on session for a small team. We look at what you're making, try new ideas together and leave everyone on the same page.",
    meta: [
      { label: "Length", value: "Half or full day" },
      { label: "Group size", value: "Up to 6 people" },
      { label: "Where", value: "Workshop space, gear provided" },
    ],
    includes: [
      "Establishing your unique voice, with a look at 1 or 2 competitors",
      "Hands-on: shaping your content to suit your voice and your customers",
      "Specialists brought in only if you need them",
      "Session summary and a how-to guide to keep",
    ],
    outcome: "A team pulling in the same direction, with clear next steps.",
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
    text: "Where AI genuinely saves time, and where it creates risk around copyright, privacy and authenticity.",
  },
  {
    title: "Team upskilling",
    text: "Building the confidence and habits for your team to keep going without us.",
  },
];

export const workshopSteps: { title: string; text: string }[] = [
  {
    title: "We listen",
    text: "Tell us where you're at, what you've tried and what you want to get out of it. We ask questions first. No brief required.",
  },
  {
    title: "We prepare",
    text: "We look at your content the way a new customer would, then shape the session around what we find.",
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
      "If it's one problem you need solved, the 2-hour session. If you want to look at the bigger picture and get hands-on, the 4-hour deep dive. If you want a small team creating together, the Content Lab. Not sure? Get in touch and we'll point you in the right direction.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "Not much. We'll send a short set of questions beforehand and ask for links to your current content. The more we know going in, the more useful the session.",
  },
  {
    question: "Can sessions be run online?",
    answer:
      "The 2-hour and 4-hour sessions work well online. The Content Lab is hands-on with gear in a dedicated workshop space, so it runs in person.",
  },
  {
    question: "Do you travel outside Wellington?",
    answer: "Yes. We work with teams across New Zealand and Australia. Travel costs are quoted up front.",
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
