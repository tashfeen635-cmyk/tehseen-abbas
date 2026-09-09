import Link from "next/link";

const ROUTE = "/hire-tashfeen-riaz-full-stack-web-developer";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const PAGE_URL = `${SITE_URL}${ROUTE}`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tashfeen Bin Riaz — Full-Stack Web Developer in Gilgit-Baltistan, Pakistan",
  description:
    "Tashfeen Bin Riaz is a full-stack web developer in Gilgit-Baltistan, Pakistan, specializing in React, Vue.js, Next.js, JavaScript, TypeScript and Shopify. Hire him for freelance and remote web development projects.",
  keywords:
    "Tashfeen Bin Riaz, Tashfeen Riaz, full-stack web developer, hire web developer, hire full-stack developer, front-end developer, React developer, Next.js developer, Vue.js developer, JavaScript developer, TypeScript developer, Shopify developer, web developer Gilgit-Baltistan, web developer Gilgit, web developer Pakistan, freelance web developer, remote web developer, Pakistani web developer",
  alternates: { canonical: ROUTE },
  openGraph: {
    title: "Tashfeen Bin Riaz — Full-Stack Web Developer in Gilgit-Baltistan, Pakistan",
    description:
      "Full-stack web developer in Gilgit-Baltistan, Pakistan. React, Vue.js, Next.js, JavaScript, TypeScript and Shopify. Available for remote and freelance projects.",
    url: PAGE_URL,
    type: "profile",
    images: [`${SITE_URL}/images/tashfeen-bin-riaz.png`],
    profile: { firstName: "Tashfeen", lastName: "Riaz" },
  },
  twitter: {
    card: "summary_large_image",
    title: "Tashfeen Bin Riaz — Full-Stack Web Developer in Gilgit-Baltistan, Pakistan",
    description:
      "Full-stack web developer in Gilgit-Baltistan, Pakistan. React, Vue.js, Next.js, JavaScript, TypeScript and Shopify.",
    images: [`${SITE_URL}/images/tashfeen-bin-riaz.png`],
  },
};

const social = {
  instagram: "https://www.instagram.com/tashfeen460/?hl=en",
  linkedin: "https://www.linkedin.com/in/tashfeen-riaz-39b1a2396/",
  github: "https://github.com/tashfeen635-cmyk",
  upwork: "https://www.upwork.com/freelancers/~0100aa908ffb1d0943?mp_source=share",
  whatsapp: "https://wa.me/923170885816",
};

const FAQS = [
  {
    q: "Who is Tashfeen Riaz?",
    a: "Tashfeen Bin Riaz — also known as Tashfeen Riaz — is a professional full-stack web developer based in Gilgit-Baltistan, Pakistan. He designs and develops modern websites and web applications for businesses, and he built the Binary Hub portfolio website you are currently viewing.",
  },
  {
    q: "What does Tashfeen Bin Riaz do?",
    a: "Tashfeen Bin Riaz plans, builds and maintains responsive websites and web applications. He works across the full stack — front-end interfaces, back-end logic, databases and deployment — and also builds Shopify and e-commerce stores.",
  },
  {
    q: "Where is Tashfeen Bin Riaz based?",
    a: "Tashfeen Bin Riaz is based in Gilgit-Baltistan, Pakistan. He works remotely and is available to clients and teams internationally.",
  },
  {
    q: "Is Tashfeen Bin Riaz a full-stack developer?",
    a: "Yes. Tashfeen Bin Riaz works with front-end technologies (React, Next.js, Vue.js, JavaScript, TypeScript) and back-end technologies (Node.js, Express, MongoDB, SQL), covering the complete build of a web project.",
  },
  {
    q: "Is Tashfeen Bin Riaz a Vue.js developer?",
    a: "Yes. Vue.js is part of Tashfeen Bin Riaz's front-end toolkit alongside React and Next.js, allowing flexible and maintainable component-based interfaces.",
  },
  {
    q: "Is Tashfeen Bin Riaz a React developer?",
    a: "Yes. Tashfeen Bin Riaz builds interactive user interfaces with React, and he uses Next.js for fast, SEO-friendly, server-rendered React applications.",
  },
  {
    q: "What technologies does Tashfeen Bin Riaz use?",
    a: "Tashfeen Bin Riaz works with HTML, CSS, JavaScript, TypeScript, React, Vue.js, Next.js, Node.js, Express, MongoDB, SQL, REST APIs, Tailwind CSS, Bootstrap, Git, GitHub, Vercel and Shopify.",
  },
  {
    q: "Can I hire Tashfeen Bin Riaz as a freelance developer?",
    a: "Yes. Tashfeen Bin Riaz offers freelance web development and is reachable through Upwork, WhatsApp, LinkedIn and the contact channels on this page.",
  },
  {
    q: "Does Tashfeen Bin Riaz work with international clients?",
    a: "Yes. Tashfeen Bin Riaz works remotely and is set up for international projects through his Upwork profile, and he is available to clients and teams in any timezone-friendly working arrangement.",
  },
  {
    q: "What types of websites does Tashfeen Bin Riaz build?",
    a: "Tashfeen Bin Riaz builds business websites, personal and company portfolios, web applications, landing pages and e-commerce stores. The Binary Hub portfolio website on this site is an example of his work.",
  },
  {
    q: "Can Tashfeen Bin Riaz build e-commerce websites?",
    a: "Yes. Tashfeen Bin Riaz can build e-commerce websites, including Shopify stores, with product pages, responsive layouts and secure checkout-oriented setups.",
  },
  {
    q: "Can Tashfeen Bin Riaz build Shopify stores?",
    a: "Yes. Tashfeen Bin Riaz works with Shopify and Shopify Liquid to build and customize online stores for e-commerce businesses.",
  },
  {
    q: "How can I contact Tashfeen Bin Riaz?",
    a: "You can contact Tashfeen Bin Riaz through WhatsApp, Upwork, GitHub, LinkedIn or Instagram. The contact links are listed in the 'Hire Tashfeen Bin Riaz' section at the bottom of this page.",
  },
];

const expertise = [
  { title: "Full-Stack Web Developer", text: "End-to-end development — front-end, back-end, database and deployment." },
  { title: "Front-End Developer", text: "Interactive, responsive and accessible user interfaces." },
  { title: "React Developer", text: "Component-based UI development with modern React patterns." },
  { title: "Next.js Developer", text: "Fast, SEO-friendly, server-rendered Next.js applications." },
  { title: "Vue.js Developer", text: "Flexible, maintainable Vue.js applications and components." },
  { title: "JavaScript / TypeScript Developer", text: "Clean, typed JavaScript with TypeScript where it adds safety." },
  { title: "Shopify Developer", text: "Shopify store builds and customization with Liquid." },
  { title: "UI/UX-focused Developer", text: "Design-minded development that balances visuals with usability." },
  { title: "Freelance & Remote Developer", text: "Available for freelance and remote projects, local and international." },
];

const stack = [
  {
    group: "Front-End",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    group: "Back-End",
    items: ["Node.js", "Express"],
  },
  {
    group: "Data & APIs",
    items: ["MongoDB", "SQL", "PostgreSQL", "REST API design"],
  },
  {
    group: "Workflow & Platforms",
    items: ["Git & GitHub", "Vercel", "Shopify & Liquid", "Responsive development"],
  },
];

const services = [
  { title: "Custom Website Development", text: "Business websites, portfolios and landing pages built to suit your brand and goals." },
  { title: "Full-Stack Web Applications", text: "Complete applications with interface, server logic and database working together." },
  { title: "Front-End Development", text: "React, Next.js and Vue.js interfaces that are fast, responsive and accessible." },
  { title: "Shopify & E-commerce Development", text: "Online stores and Shopify storefronts for selling products and services." },
  { title: "Responsive & Performance-focused Builds", text: "Websites that look right on every screen and load quickly for every visitor." },
  { title: "API Development & Maintenance", text: "REST API design, integration and ongoing maintenance and support." },
];

const processSteps = [
  { step: "01", title: "Discovery & Planning", text: "Understand your goals, audience and scope before writing code." },
  { step: "02", title: "Design & Prototype", text: "Build responsive, user-focused layouts and UI structure." },
  { step: "03", title: "Development", text: "Build the front-end and back-end with version control and clean structure." },
  { step: "04", title: "Testing & Optimization", text: "Check cross-browser behavior, performance and fix issues." },
  { step: "05", title: "Launch & Support", text: "Deploy the site, hand it over, and provide ongoing maintenance." },
];

const whyHire = [
  { title: "Full-stack coverage", text: "One developer for interface, logic, database and deployment — fewer hand-offs, faster delivery." },
  { title: "Modern, SEO-friendly stack", text: "React, Next.js and Vue.js for fast, crawlable sites that perform well." },
  { title: "Responsive & performance-focused", text: "Clean, accessible layouts that work on every device and load quickly." },
  { title: "Clear remote collaboration", text: "Available for freelance and remote work with straightforward communication." },
  { title: "Verifiable work", text: "This very portfolio website was designed and developed by Tashfeen Bin Riaz." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Binary Hub",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Tashfeen Bin Riaz",
      alternateName: "Tashfeen Riaz",
      url: PAGE_URL,
      jobTitle: "Full-Stack Web Developer",
      description:
        "Professional full-stack web developer based in Gilgit-Baltistan, Pakistan, specialising in React, Vue.js, Next.js, JavaScript, TypeScript and Shopify.",
      image: `${SITE_URL}/images/tashfeen-bin-riaz.png`,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gilgit",
        addressRegion: "Gilgit-Baltistan",
        addressCountry: "PK",
      },
      sameAs: [social.github, social.linkedin, social.instagram, social.upwork],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Binary Hub Portfolio",
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: metadata.title,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Tashfeen Bin Riaz", item: PAGE_URL },
      ],
    },
  ],
};

export default function HireDeveloperPage() {
  return (
    <div className="hire-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="hire-nav">
        <Link href="/" className="hire-nav-brand">
          <i className="fas fa-arrow-left"></i> Binary Hub
        </Link>
        <nav className="hire-nav-links" aria-label="Primary">
          <Link href="/#portfolio">Portfolio</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="#hire" className="hire-nav-cta">Hire Me</Link>
        </nav>
      </header>

      <section className="hire-hero">
        <div className="hire-hero-inner">
          <p className="hire-eyebrow">Full-Stack Web Developer · Gilgit-Baltistan, Pakistan · Available remotely</p>
          <h1>Tashfeen Bin Riaz — Full-Stack Web Developer</h1>
          <p className="hire-hero-sub">
            Tashfeen Bin Riaz is a Full-Stack Web Developer from Gilgit-Baltistan, Pakistan, specializing
            in modern web applications, frontend development, React, Vue.js, Next.js, JavaScript,
            TypeScript, Shopify and backend technologies.
          </p>
          <div className="hire-hero-actions">
            <a href="#hire" className="hire-btn hire-btn-primary">Hire Me</a>
            <Link href="/#portfolio" className="hire-btn hire-btn-ghost">View Portfolio</Link>
          </div>
        </div>
      </section>

      <div className="hire-body">
        <section className="hire-block" id="who">
          <h2>Who is Tashfeen Bin Riaz?</h2>
          <p className="hire-lead">
            Tashfeen Bin Riaz is a Full-Stack Web Developer from Gilgit-Baltistan, Pakistan,
            specializing in modern web applications, frontend development, React, Vue.js, Next.js,
            JavaScript, TypeScript, Shopify and backend technologies. He designs and develops
            responsive websites and web applications for businesses, and works with clients
            remotely and internationally.
          </p>
          <p>
            Sometimes referred to simply as Tashfeen Riaz, he is the developer behind the Binary
            Hub portfolio website you are browsing right now — from layout and interface to the
            backend, database and deployment. He cares about clean code, fast pages and clear
            communication, whether the project is a business website, a web application or an
            e-commerce store.
          </p>
          <p>
            Learn more about the organisation he develops for in the{" "}
            <Link href="/#about">About section of the main portfolio</Link>, and see examples of the
            site&apos;s projects in the <Link href="/#portfolio">portfolio gallery</Link>.
          </p>
        </section>

        <section className="hire-block" id="expertise">
          <h2>Developer Expertise</h2>
          <div className="hire-grid hire-grid-3">
            {expertise.map((e) => (
              <div className="hire-card" key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hire-block hire-soft" id="stack">
          <h2>Technology Stack</h2>
          <div className="hire-grid hire-grid-4">
            {stack.map((g) => (
              <div className="hire-stack-group" key={g.group}>
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="hire-block" id="services">
          <h2>Services</h2>
          <div className="hire-grid hire-grid-2">
            {services.map((s) => (
              <div className="hire-service" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <p className="hire-note">
            You can also explore the services and experience covered in the{" "}
            <Link href="/#experience">services &amp; experience section</Link> of the portfolio.
          </p>
        </section>

        <section className="hire-block" id="projects">
          <h2>Selected Projects</h2>
          <div className="hire-card hire-project">
            <h3>Binary Hub Portfolio Website</h3>
            <p>
              Designed and developed by Tashfeen Bin Riaz — a full custom portfolio for Binary Hub with
              profile, portfolio gallery, experience, skills, awards, community, testimonials,
              FAQ and contact sections, an admin panel, image uploads and a MongoDB backend.
            </p>
            <Link href="/" className="hire-link">Open this website <i className="fas fa-arrow-right"></i></Link>
          </div>
          <p className="hire-note">
            Further project case studies are being documented. For now, the{" "}
            <Link href="/#portfolio">portfolio gallery on the main profile</Link> shows current work,
            and more details for new projects will be added here.
          </p>
        </section>

        <section className="hire-block" id="industries">
          <h2>Industries &amp; Clients Served</h2>
          <div className="hire-grid hire-grid-4">
            <div className="hire-card"><h3>Startups &amp; Small Businesses</h3><p>Business websites and web apps that grow with the company.</p></div>
            <div className="hire-card"><h3>Education &amp; Digital Skills</h3><p>Sites for training organisations such as Binary Hub and the community initiatives it supports.</p></div>
            <div className="hire-card"><h3>E-commerce &amp; Retail</h3><p>Shopify stores and online selling setups for products and services.</p></div>
            <div className="hire-card"><h3>International &amp; Remote</h3><p>Developers and businesses abroad looking for a remote Pakistani web developer.</p></div>
          </div>
        </section>

        <section className="hire-block" id="process">
          <h2>Development Process</h2>
          <div className="hire-process">
            {processSteps.map((p) => (
              <div className="hire-process-step" key={p.step}>
                <span className="hire-process-num">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="hire-block hire-soft" id="why">
          <h2>Why Hire Tashfeen Bin Riaz</h2>
          <div className="hire-grid hire-grid-3">
            {whyHire.map((w) => (
              <div className="hire-card" key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hire-block" id="gilgit">
          <h2>Technology in Gilgit-Baltistan</h2>
          <p>
            Gilgit-Baltistan, in northern Pakistan, has a growing community of technology talent —
            software and web developers, IT professionals and freelancers building digital careers
            across Gilgit, Skardu, Hunza, Ghizer, Diamer, Astore, Nagar and Baltistan. Tashfeen Bin Riaz
            is part of this ecosystem, developing for Binary Hub in Gilgit and contributing to
            digital skills and tech development across the region.
          </p>
          <p>
            Those searches for a web developer in Gilgit, a full-stack developer in Pakistan, or
            remote Pakistani software developers for international projects are served by the same
            growing pool of regional talent — and this page introduces one of its professional
            developers.
          </p>
          <p>
            You can learn about the technology and community initiatives behind this region in the{" "}
            <Link href="/#community">community section</Link> and the{" "}
            <Link href="/#experience">experience &amp; mission section</Link> of the portfolio.
          </p>
        </section>

        <section className="hire-block" id="remote">
          <h2>International &amp; Remote Development</h2>
          <p>
            Tashfeen Bin Riaz is available as a remote full-stack and front-end developer for clients
            and teams overseas. He works through clear requirements, regular communication and
            straightforward handovers, with a professional profile on Upwork and the contact
            channels below.
          </p>
        </section>

        <section className="hire-block" id="faq">
          <h2><span className="hire-accent">Frequently</span> <span className="hire-collab">Asked Questions</span></h2>
          <div className="hire-faqs">
            {FAQS.map((f) => (
              <div className="hire-faq" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hire-block hire-cta" id="hire">
          <h2>Hire Tashfeen Bin Riaz</h2>
          <p className="hire-lead">
            Looking for a freelance or remote full-stack web developer for your website, web
            application or e-commerce project? Reach out through any channel below.
          </p>
          <div className="hire-upwork">
            <a href={social.upwork} target="_blank" rel="noopener noreferrer">
              <span className="hire-upwork-logo"><i className="fab fa-upwork"></i></span>
              <span>
                <strong>Available on Upwork</strong>
                <small>Full-Stack Web Developer · Hire for freelance projects</small>
              </span>
              <span className="hire-upwork-cta">View Profile <i className="fas fa-arrow-right"></i></span>
            </a>
          </div>
          <div className="hire-contact">
            <a href={social.whatsapp} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> WhatsApp <span>+92 317 0885816</span></a>
            <a href={social.upwork} target="_blank" rel="noopener noreferrer"><i className="fab fa-upwork"></i> Upwork <span>Profile</span></a>
            <a href={social.github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> GitHub <span>tashfeen635-cmyk</span></a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i> LinkedIn <span>Tashfeen Bin Riaz</span></a>
            <a href={social.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram <span>tashfeen460</span></a>
          </div>
        </section>
      </div>

      <footer className="hire-foot">
        <Link href="/">← Back to Binary Hub Portfolio</Link>
      </footer>
    </div>
  );
}