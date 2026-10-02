/**
 * Homepage content. Layout lives in components/; this file holds only data.
 */

/* ------------------------------------------------------------------ */
/* Hero slider                                                         */
/* ------------------------------------------------------------------ */

/**
 * Per-breakpoint value, ordered [>1024px, 779–1024px, 481–778px, ≤480px].
 * Offsets, sizes and dimensions are in "grid pixels": they are scaled by
 * min(1, sliderWidth / gridWidth) for the active breakpoint.
 */
export type Responsive<T> = readonly [T, T, T, T];

export type HeroLayer = {
  /** Lines of text; each entry after the first starts on a new line. */
  lines: readonly string[];
  /** Horizontal offset from the slider centre. */
  x: Responsive<number>;
  /** Vertical alignment: "middle" offsets from the centre, "top" from the top edge. */
  align: Responsive<"top" | "middle">;
  y: Responsive<number>;
  fontSize: Responsive<number>;
  lineHeight: Responsive<number>;
  fontWeight: Responsive<400 | 500 | 700>;
  /** Wrap text inside `width` ("normal") or keep it on one line ("nowrap"). */
  wrap: Responsive<"normal" | "nowrap">;
  /** Fixed box width in grid pixels, or null for auto. */
  width?: Responsive<number | null>;
  /** Fixed box height in grid pixels, or null for auto. */
  height?: Responsive<number | null>;
  zIndex: number;
};

export type HeroSlide = {
  image: { src: string; alt: string };
  layers: readonly HeroLayer[];
};

const all = <const T,>(v: T): Responsive<T> => [v, v, v, v];

/**
 * Grid size per breakpoint (width × height) the layer geometry is authored against.
 * Heights are deliberately shorter than the source images' own near-square grid
 * (a modern, widescreen-proportioned banner rather than the original's tall block).
 */
export const heroGrid = {
  widths: [1170, 1024, 778, 480],
  heights: [560, 520, 460, 480],
} as const;

/** Time each slide stays up, measured from one slide change to the next (ms). */
export const heroSlideInterval = 6360;

const tagline = {
  x: all(0),
  align: all("middle"),
  fontSize: [27, 27, 23, 26],
  lineHeight: [30, 34, 42, 42],
  fontWeight: [400, 500, 500, 500],
  wrap: all("normal"),
  zIndex: 7,
} as const;

const headline = {
  align: all("middle"),
  fontWeight: all(700),
  wrap: all("nowrap"),
} as const;

export const heroSlides: readonly HeroSlide[] = [
  {
    image: { src: "/wp-content/uploads/2020/06/banner-01a.jpg", alt: "" },
    layers: [
      {
        ...tagline,
        lines: ["Innovative experiences for forward-thinking brands."],
        x: [-167, 0, 0, 6],
        y: [31, 50, 29, 71],
        width: [768, 768, 545, 440],
      },
      {
        ...headline,
        lines: ["Creating Businesses"],
        x: [-170, -170, 0, -4],
        y: [-126, -126, -67, -26],
        fontSize: [65, 65, 74, 44],
        lineHeight: [71, 71, 90, 90],
        zIndex: 6,
      },
      {
        ...headline,
        lines: ["Designing Products"],
        x: [-187, -187, 0, -2],
        y: [-31, -31, -157, -97],
        fontSize: [65, 65, 74, 44],
        lineHeight: [56, 56, 90, 90],
        zIndex: 5,
      },
    ],
  },
  {
    image: { src: "/wp-content/uploads/2020/06/banner-01b.jpg", alt: "" },
    layers: [
      {
        ...tagline,
        // "Byets" is how the live site spells it.
        lines: ["Helping Your Business Sustain", "Through World of Bits and Byets"],
        x: [-243, 1, 0, -4],
        y: [-77, 51, 29, 116],
        wrap: ["normal", "normal", "nowrap", "normal"],
        width: [768, 768, null, 440],
        height: [31, null, null, 110],
      },
      {
        ...headline,
        lines: ["Offering Reliable", "Digital Solutions"],
        x: [-189, 0, 0, -15],
        align: ["top", "middle", "middle", "middle"],
        y: [305, -172, -157, -40],
        fontSize: [65, 90, 74, 44],
        lineHeight: [65, 90, 90, 90],
        zIndex: 5,
      },
    ],
  },
  {
    image: { src: "/wp-content/uploads/2020/06/banner-01c.jpg", alt: "" },
    layers: [
      {
        ...tagline,
        lines: ["E-shops, portals, blogs and all aspects of web development."],
        x: [-108, 0, 0, -2],
        y: [-9, 51, 29, 53],
        fontSize: [27, 27, 23, 20],
        width: [768, 768, 660, 450],
      },
      {
        ...headline,
        lines: ["Customized With Care."],
        x: [-175, 0, 0, 0],
        y: [-78, -67, -67, -58],
        fontSize: [57, 90, 69, 44],
        lineHeight: [78, 90, 90, 90],
        zIndex: 6,
      },
      {
        ...headline,
        lines: ["UX Driven Websites"],
        x: [-201, 0, 0, -3],
        y: [-152, -172, -172, -125],
        fontSize: [59, 90, 70, 44],
        lineHeight: [82, 90, 90, 90],
        zIndex: 5,
      },
    ],
  },
  {
    image: { src: "/wp-content/uploads/2020/06/banner-01b-1.png", alt: "" },
    layers: [
      {
        ...tagline,
        lines: ["From Cyber Security to Development", "All IT Solutions Under One Roof"],
        x: [-201, 0, 0, 2],
        y: [-32, 51, 29, 76],
        fontSize: [27, 27, 23, 20],
        width: [492, 768, 660, 450],
      },
      {
        ...headline,
        lines: ["Your IT Goals"],
        x: [-245, 0, 0, 3],
        y: [-104, -67, -67, -15],
        fontSize: [61, 90, 69, 44],
        lineHeight: [61, 90, 90, 90],
        zIndex: 6,
      },
      {
        ...headline,
        lines: ["Helping You In Meeting"],
        x: [-110, 0, 0, 4],
        y: [-174, -172, -172, -99],
        fontSize: [62, 90, 70, 44],
        lineHeight: [62, 90, 90, 90],
        zIndex: 5,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

/** A list item that starts with an emphasised lead-in, e.g. "2013: …". */
export type LeadItem = { lead: string; text: string };

export type AboutTab =
  | { title: string; kind: "milestones"; items: readonly LeadItem[] }
  | { title: string; kind: "values"; intro: string; items: readonly LeadItem[] }
  | { title: string; kind: "text"; paragraphs: readonly string[] };

export const about = {
  id: "about-us",
  image: { src: "/wp-content/uploads/2020/06/02.jpg", width: 960, height: 649 },
  heading: "About eWorld Innovative Solutions",
  paragraphs: [
    "eWorld Innovative Solutions LLC was founded in 2013 with a vision of providing innovative technology solutions to businesses. The company initially operated as a home-based startup, offering IT consulting services to small businesses in the local area.",
    "Over the years, we have continued to innovate and helped develop new products that align with our commitment to sustainability and customer satisfaction. We have invested in research and development to create cutting-edge technology that is both effective and technology-friendly.",
  ],
  tabs: [
    {
      title: "Key Milestones",
      kind: "milestones",
      items: [
        { lead: "2013", text: "eWorld Innovative Solutions LLC was officially registered as a **limited liability company (LLC)** in **Florida**." },
        { lead: "2014", text: "eWorld Innovative Solutions LLC expanded its service offerings to include **web development** and **digital marketing**, catering to a broader clientele." },
        { lead: "2015", text: "Achieved a significant milestone by securing contracts with local education, manufacturing, and distribution companies, **increasing annual revenue by 150%**." },
        { lead: "2017", text: "Opened an **offshore office** to accommodate a growing team and to serve clients better." },
        { lead: "2021", text: "eWorld Innovative Solutions LLC expanded its reach beyond Florida, establishing a presence in the **Chicago Metro area** and serving clients **nationwide**." },
      ],
    },
    {
      title: "The Company Values",
      kind: "values",
      intro: "eWorld Innovative Solutions success has been built upon a strong foundation of values:",
      items: [
        { lead: "Innovation", text: "We constantly seek **innovative solutions** to solve complex problems and stay ahead of technological advancements." },
        { lead: "Customer-Centric", text: "Our clients are at the **heart of everything we do**. We prioritize their needs and provide tailored solutions to help them succeed." },
        { lead: "Integrity", text: "We operate with the **highest ethical standards**, ensuring **transparency and trust** in all our business relationships." },
        { lead: "Team Collaboration", text: "Our diverse and talented team collaborates **seamlessly** to deliver **exceptional results**." },
      ],
    },
    {
      title: "Future Vision",
      kind: "text",
      paragraphs: [
        "Looking ahead, eWorld Innovative Solutions LLC is committed to continuing its growth and becoming a **leading technology solutions provider** on a **national scale**. We aim to expand our product & service offerings in multiple competencies in Information Technology, enter new markets, and maintain our reputation for **excellence in the technology industry**.",
      ],
    },
  ] satisfies AboutTab[],
} as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type ServiceRow = {
  /** Anchor used by the main menu and footer quick links (it sits on the service's carousel card). */
  id: string;
  heading: string;
  /** Short label for the card's "View … details" button (matches the main menu). */
  shortName: string;
  /** One- or two-sentence summary shown on the carousel card, condensed from `paragraphs`. */
  teaser: string;
  image: { src: string; width: number; height: number };
  /** Full copy, shown in the service's details dialog. */
  paragraphs: readonly string[];
};

const serviceImage = (file: string) => ({ src: `/wp-content/uploads/2020/06/${file}`, width: 570, height: 507 });

const lmsIntro =
  "The ongoing Covid-19 pandemic has revealed the vast need for an online market, as well as online education and lectures. Just recently, Oxford University had pledged that only online classes will be conducted until June of 2021. Many students have demanded refunds since they do not want to pay full-time fees for a part-time education that is not as effective as a learning experience.";
const lmsOffer = (company: string) =>
  `Considering these shortcomings, we at ${company} provide the best services to make these learning experiences not only advanced and user-friendly, but also fun and entertaining. In addition to LMS, we also offer complete school management systems and to train the trainers’ seminars to boost faculty productivity and well-being.`;

const webSuite = (company: string) =>
  `We at ${company} offer the full suite of web-development from custom-made code to leveraging open-source software packages to deliver your web-development needs. Our expert team works with you to define the requirements, helps you choose a solution and develop to your satisfaction. No matter how small or large your scope is, we work to maximize the value of your budget and time and help you succeed.`;
const webCanvas =
  "Whether it is e-commerce application, marketing website, javascript development or a custom development we will paint the canvas with your vision.";

const cyberLandscape =
  "The world of technology is continuously evolving, from the rise in the Internet of Things (IoT) to the adoption of Software as a Service (SaaS) over traditional in-house applications, and cloud-based remote infrastructure, and ever increasing use of integrated & connected operational technologies (OT). As technologies shift, the threat landscape and the need for advanced security mechanisms has also evolved. However, despite this need for greater adaptability in and understanding of security management, many organizations adjust their technology without any guidance or direction from IT/OT, information security, procurement, or risk specialists. They are often caught off-guard with rapid adoption of IT/OT without commensurate review of their security, vulnerabilities and risks.";
const cyberMssp = (company: string) =>
  `As a Managed Security Services Provider (MSSP), we help our clients bring advanced expertise in the current threat landscape to proactively identify and mitigate threats and risks as infrastructures, platforms and software evolve. Let us at ${company} become an extension of your team, whether you are seeking assistance with 24/7 network security monitoring, virtual CISO services, with Penetration Testing, or SCADA/OT security for utilities’ and industry needs. IR 4 on the verge of exploding, security needs cannot be over emphasized.`;

const EWORLD = "eWorld Innovative Solutions";
const DMS = "Data Management Services";

export const services: readonly ServiceRow[] = [
  {
    id: "lms-and-tools",
    heading: "Learning Management System and Tools",
    shortName: "LMS & Tools",
    teaser:
      "Advanced, user-friendly learning experiences that are also fun and engaging, plus complete school management systems and train-the-trainer seminars.",
    image: serviceImage("Learning-Management-System-and-Tools.jpg"),
    paragraphs: [lmsIntro, lmsOffer(EWORLD)],
  },
  {
    id: "mobile-app-development",
    heading: "Mobile App Development",
    shortName: "Mobile App",
    teaser:
      "iOS and Android apps delivered in a fast, seamless and intuitive way, with creative UI/UX design that sets you apart from your competitors.",
    image: serviceImage("Data-Analytics-02.jpg"),
    paragraphs: [
      "Regardless of the scale or scope of your business, it needs to have an iOS or Android footprint. User experience is critical to your business’ success. Your solution needs to be delivered to your customers in a fast, seamless and intuitive way so that they keep coming back to you.",
      `With ${EWORLD}’ creative design process and expertise in UI/UX design your business needs are prioritized to deliver Mobile Applications that differentiate you from your competitors.`,
      `You can rest assured that your success in the bricks & mortar business world translates into an effective digital presence. With ${EWORLD} hands-on expertise in mobile software development, we deliver complete solution from design till the end product, making it easier for you to bring your solution to your customers’ finger tips.`,
      `Trust ${EWORLD} with your digital and mobile needs, and set free your mind for business as we take care of all your business IT needs!`,
    ],
  },
  {
    id: "web-development",
    heading: "Web Development",
    shortName: "Web Development",
    teaser:
      "The full suite of web development, from custom-made code to open-source packages, scoped to make the most of your budget and time.",
    image: serviceImage("Web-Development.jpg"),
    paragraphs: [webSuite(EWORLD), webCanvas],
  },
  {
    id: "digital-marketing",
    heading: "Digital Marketing",
    shortName: "Digital Marketing",
    teaser:
      "Reshape your advertising spend to accelerate sales, and bring every facet of your online presence together to show your business in the best light.",
    image: serviceImage("Digital-Marketing.jpg"),
    paragraphs: [
      "In a recent post by PwC it was estimated that FMCGs will invest more than 50% of their marketing budgets into digital marketing. Our digital marketing consultancy team can help you reshape your advertising spend to scientifically accelerate your sales, aiding you in effectively meeting your sales goals.",
      `Our skilled and experienced online marketing experts at ${EWORLD} will increase both the quantity and the quality of your businesses. ${EWORLD} concentrates on bringing all facets of your online presence together in order to successfully endorse your business or product in the best light.`,
    ],
  },
  {
    id: "cyber-security",
    heading: "Cyber Security",
    shortName: "Cyber Security",
    teaser:
      "Managed security services that proactively identify and mitigate threats, from 24/7 network monitoring to virtual CISO, penetration testing and SCADA/OT security.",
    image: serviceImage("cyber-security.jpg"),
    paragraphs: [cyberLandscape, cyberMssp(EWORLD), `Let ${EWORLD} make you more secure than ever.`],
  },
  {
    id: "data-analytics",
    heading: "Data Analytics",
    shortName: "Data Analytics",
    teaser:
      "Big Data, AI and advanced analytics expertise to build or upgrade your data warehouse, stitch your data together and turn it into dashboards and insights.",
    image: serviceImage("Data-Analytics.jpg"),
    paragraphs: [
      `In the fast paced world of today, no organization can succeed without meaningful investments in Big Data, Artificial Intelligence and Advanced Analytics. We at ${DMS} have a unique blend of industry expertise and impressive academic credentials to deliver data solutions that your firm needs to be competitive and serve its customers better.`,
      `Working with a systems integrator like ${DMS} will pay your firm dividends generously as we at ${DMS} build, upgrade, expand, and/or re-tool the fundamental business tool that is your data warehouse. Please don’t hesitate to contact us for advice, system assessments, and/or a prototype proof of concept!`,
      "We can help stitch multi-dimensional data together, create dashboards and derive insights that can help your business scale faster and eliminate any operational inefficiencies. Let us help you take a second look at your data and find patterns that can help your business succeed.",
    ],
  },
];
