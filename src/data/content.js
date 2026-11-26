/**
 * Verified portfolio content from the existing site, LinkedIn public profile,
 * and GitHub profile. No fabricated roles, dates, or achievements.
 */
export const profile = {
  name: "Sachin Jariyal",
  brand: "Sachin",
  brandAccent: "Jariyal.",
  title: "Fullstack Engineer",
  company: "Apar Technologies",
  location: "Remote",
  headline:
    "Solution Architect · Microservices · Distributed Systems · Cloud · Systems Design",
  tagline:
    "Fullstack · JavaScript · TypeScript · MERN · MEAN · Microservices · Distributed Systems",
  summary:
    "Fullstack engineer and systems thinker with 12+ years designing distributed, cloud-native platforms that stay correct under load. I treat production as the product: clear service boundaries, measurable SLOs, and code that other engineers can evolve without fear.",
  aboutBody: [
    "I design and ship event-driven microservices handling 1M+ requests a day, with resilient architecture that has sustained 99.99% availability. Performance is a first-class concern — latency reductions of ~45% through profiling, caching, and disciplined data-path engineering.",
    "I modernize monoliths into fault-tolerant, async ecosystems and lead execution with production-first rigor: API contracts, observability, CI/CD, and mentoring that raises the bar for the whole team. Comfortable owning the stack end-to-end — React/Angular, Node.js/NestJS/Java, PostgreSQL, Kafka, gRPC, and cloud delivery.",
  ],
  aboutFocus:
    "Currently scaling distributed systems with resilient messaging, clean API boundaries, and strong production observability.",
  aboutHighlights: [
    { value: "12+", label: "Years building systems" },
    { value: "1M+", label: "Requests / day designed for" },
    { value: "99.99%", label: "Availability target hit" },
    { value: "45%", label: "Latency reduced" },
  ],
  languages: ["English", "Hindi", "Punjabi"],
  availability: "Available with 25–30 days notice",
  aboutExtra:
    "Available with 25–30 days notice. Currently focused on scaling distributed, cloud-native systems with resilient messaging, clean API boundaries, and strong observability in production.",
  email: "sachinjariyal9@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1uClNYtXqSLY3AEeLYZfe_ENkg26ret06/view?usp=drive_link",
  linkedin: "https://www.linkedin.com/in/sachin-jariyal/",
  github: "https://github.com/sachin-jariyal",
  avatar: "/images/avatar-cutout.png?v=20261120",
  courses: [],
  recommendation: {
    author: "J S.",
    initials: "JS",
    role: "LinkedIn recommendation",
    // Public LinkedIn profile of the recommender (no API). Photo unavailable without auth.
    linkedin: "https://www.linkedin.com/in/jgjeet",
    image: null,
    text: "Sachin is very good developer and pick up the requirements very quick.",
  },
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export const skillGroups = [
  {
    title: "Full‑Stack & Languages",
    description:
      "Building responsive SPAs and robust backend APIs using modern JavaScript/TypeScript stacks and PHP when required.",
    items: [
      "React",
      "Angular",
      "Node.js",
      "Express",
      "PHP",
      "TypeScript",
      "JavaScript",
      "Java",
    ],
  },
  {
    title: "Databases & Storage",
    description:
      "Experienced in relational and NoSQL data modelling, replication and performance tuning for high‑throughput systems.",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch"],
  },
  {
    title: "Backend, Microservices & Messaging",
    description:
      "Designing scalable microservices and distributed systems with resilient communication patterns and observability.",
    items: ["Microservices", "gRPC", "Kafka", "REST APIs"],
  },
  {
    title: "Cloud, CI/CD & Observability",
    description:
      "Production deployments on AWS using containerization and orchestration, with automated pipelines and monitoring for reliability.",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Prometheus",
      "Grafana",
      "Terraform",
    ],
  },
  {
    title: "AI‑Assisted Development",
    description:
      "Working daily with modern AI coding tools to accelerate design, implementation, and review across full‑stack and distributed systems work.",
    items: ["GitHub Copilot", "Cursor AI", "Generative AI"],
  },
];

export const experience = [
  {
    role: "Senior Staff Engineer — Apar Technologies",
    meta: "Present · Remote",
    side: "left",
    bullets: [
      "Building backend services and business workflows with Node.js, NestJS, and TypeScript across a multi-repo microservices setup.",
      "Extending Angular frontend modules and micro-apps within a monorepo, coordinated with multi-service and multi-microapp delivery.",
      "Implementing REST integrations and gRPC service communication under domain-driven and event-driven design with Apache Kafka.",
      "Modeling PostgreSQL data (including JSONB) for asset management, Personal Effects, appointments, and vendor workflows.",
      "Shipping on Azure with CI/CD and GitHub workflows; collaborating via Jira, pull requests, and GitHub Copilot.",
    ],
    source: "linkedin-github",
  },
  {
    role: "Technical Lead / Assistant Consultant — Tata Consultancy Services",
    meta: "Oct 2022 · Hyderabad / Noida, IN",
    side: "right",
    bullets: [
      "Leading design and development of enterprise integrations and microservices for financial systems.",
      "Architected Spring Boot + Angular microservices handling 1M+ transactions daily.",
      "Implemented event-driven messaging (Kafka, RabbitMQ) and orchestrated workflows (AWS Step Functions, Airflow).",
      "Mentored junior engineers and conducted architecture/design reviews.",
    ],
  },
  {
    role: "Technical Lead — Netsmartz",
    meta: "Sep 2020 — Sep 2022 · Chandigarh, IN",
    side: "left",
    bullets: [
      "Developed enterprise financial services platform with Angular, React, Node.js, Spring Boot, and PostgreSQL.",
      "Integrated banking APIs (Stripe, Plaid) with OAuth2 and messaging systems (Kafka, RabbitMQ).",
      "Automated data pipelines using Apache Airflow and enhanced observability.",
    ],
  },
  {
    role: "Senior Consultant — Seasia Infotech",
    meta: "Aug 2018 — May 2020 · Mohali, IN",
    side: "right",
    bullets: [
      "Built conversational AI chatbot platform (Angular + Node.js + Dialogflow) for 20K+ users.",
      "Refactored monolithic apps into Dockerized microservices with Kafka integration.",
      "Implemented CI/CD pipelines reducing deployment time by 60%.",
    ],
  },
  {
    role: "Senior Software Engineer — Igniva Infotech",
    meta: "Mar 2015 — Aug 2018 · Mohali, IN",
    side: "left",
    bullets: [
      "Developed SaaS and e-commerce platforms using Angular + Node.js.",
      "Automated deployments with Jenkins and monitoring using ELK, Prometheus, and Grafana.",
    ],
  },
  {
    role: "Senior Software Engineer — Miracle Group",
    meta: "Feb 2014 — Feb 2015 · Mohali, IN",
    side: "right",
    bullets: [
      "Developed modular Spring Boot and Node.js services with Redis caching.",
      "Integrated 15+ APIs using token-based authentication.",
    ],
  },
  {
    role: "Junior Developer — Master Software Solutions",
    meta: "Sep 2013 — Jan 2014 · Panchkula, IN",
    side: "left",
    bullets: [
      "Developed responsive SPAs using Angular and Node.js.",
      "Collaborated with UX/QA teams to optimize performance and accessibility.",
    ],
  },
];

export const education = [
  {
    role: "M.C.A — Computer Applications",
    degree: "M.C.A",
    field: "Computer Applications",
    years: "2008 — 2011",
    school: "Punjabi University",
    meta: "2008 — 2011 · Punjabi University",
    description:
      "Focused on algorithms, data structures, software engineering, and system design.",
    index: "01",
  },
  {
    role: "B.C.A — Computer Applications",
    degree: "B.C.A",
    field: "Computer Applications",
    years: "2005 — 2008",
    school: "Himachal Pradesh University",
    meta: "2005 — 2008 · Himachal Pradesh University",
    description:
      "Studied fundamentals of programming, databases, and web development foundations.",
    index: "02",
  },
];
