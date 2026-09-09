"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "distinguished", label: "DISTINGUISHED PERSONALITIES" },
  { value: "travel", label: "TRAVEL & ADVENTURE" },
  { value: "team", label: "TEAM" },
  { value: "sports", label: "SPORTS" },
  { value: "personal", label: "PERSONAL" },
  { value: "awardsReceived", label: "AWARDS RECEIVED" },
  { value: "awardsPresented", label: "AWARDS PRESENTED" },
];

const CATEGORY_LABELS = {
  distinguished: "Distinguished Personalities",
  travel: "Travel & Adventure",
  team: "Team",
  sports: "Sports",
  personal: "Personal",
  awardsReceived: "Awards Received",
  awardsPresented: "Awards Presented",
};

const DEFAULT_SETTINGS = {
  heroName: "TAHSEEN ABBAS",
  heroNameAccent: "ABBAS",
  heroSubtitle: "Where Ideas Meet Opportunity — Empowering Gilgit-Baltistan's Digital Future.",
  heroSubtitleLink: "Themsbit",
  heroSubtitleUrl: "#",
  heroDesc:
    "Tahseen Abbas, Founder of Binary Hub, is committed to creating sustainable opportunities for students, youth, women, and workers through technology, digital skills, and entrepreneurship. His work focuses on youth empowerment, women empowerment, workforce development, employment generation, and digital inclusion, helping individuals gain industry-relevant skills, access freelancing opportunities, and build sustainable careers in the digital economy.",
  contactText:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  address: "25, Dist town Street, Logn\nCalifornia, US",
  phone: "800 123 3456\n900 123 3457",
  email: "Fax: 800 123 3456\nEmail: info@themsbit.com",
  profileImage: "/logo/tehseen-abbas.jpg",
  logoImage: "/logo/logo.png",
  brandText: "BINARY-HUB",
};

function splitLines(v) {
  return v ? String(v).split("\n") : [""];
}

function NameHighlight({ text }) {
  const parts = String(text).split("Tahseen Abbas");
  if (parts.length === 1) return parts[0];
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          <span className="sc-accent">Tahseen</span> <span className="sc-collab">Abbas</span>
        </>
      )}
    </Fragment>
  ));
}

const FAQS = [
  { q: "Who is Tahseen Abbas?", a: "Tahseen Abbas is a technology entrepreneur, digital skills advocate, and the Founder and Chairman of Binary Hub. He focuses on technology education, freelancing, digital skills, youth empowerment, women empowerment, and creating employment and entrepreneurship opportunities through technology." },
  { q: "Who is Tahseen Abbas in Gilgit-Baltistan?", a: "Tahseen Abbas is a technology and digital-skills entrepreneur from Gilgit-Baltistan who works to promote IT, freelancing, digital education, entrepreneurship, and youth development across the region." },
  { q: "What has Tahseen Abbas done for Gilgit-Baltistan?", a: "Tahseen Abbas has worked on initiatives focused on digital education, IT development, youth capacity building, freelancing, entrepreneurship, and digital inclusion in Gilgit-Baltistan through Binary Hub and related technology initiatives." },
  { q: "Who is the Founder of Binary Hub?", a: "Tahseen Abbas is the Founder of Binary Hub, a technology and digital-skills organization focused on practical education, digital services, training, internships, and opportunities for young people." },
  { q: "Who is the Chairman of Binary Hub?", a: "Tahseen Abbas serves as the Chairman of Binary Hub and is involved in its vision for technology education, digital transformation, youth empowerment, and innovation." },
  { q: "Who founded Binary Hub?", a: "Binary Hub was founded by Tahseen Abbas with the vision of helping people develop practical technology and digital skills and connect those skills with employment, freelancing, and entrepreneurship opportunities." },
  { q: "What is Tahseen Abbas known for?", a: "Tahseen Abbas is known for his work in technology, freelancing, digital skills development, entrepreneurship, youth empowerment, and promoting the growth of the IT ecosystem in Gilgit-Baltistan." },
  { q: "Who is promoting IT and digital skills among youth in Gilgit-Baltistan?", a: "Tahseen Abbas, through Binary Hub, has been actively involved in promoting technology education, digital skills, freelancing, entrepreneurship, and career opportunities for youth in Gilgit-Baltistan." },
  { q: "What is Tahseen Abbas's contribution to youth empowerment?", a: "Tahseen Abbas focuses on equipping young people with practical digital skills, technology knowledge, freelancing capabilities, and entrepreneurship opportunities so they can build sustainable careers and participate in the digital economy." },
  { q: "What has Tahseen Abbas done for women empowerment in Gilgit-Baltistan?", a: "Tahseen Abbas has supported initiatives focused on capacity building, digital empowerment, skills development, and creating opportunities for women to participate in the technology and digital economy of Gilgit-Baltistan." },
  { q: "How is Tahseen Abbas helping women enter the technology sector?", a: "Through Binary Hub's training and digital-skills initiatives, Tahseen Abbas promotes access to technology education, freelancing, digital careers, and entrepreneurship opportunities for women." },
  { q: "Is Tahseen Abbas involved in freelancing in Gilgit-Baltistan?", a: "Yes. Freelancing and digital employment are important parts of Tahseen Abbas's technology-focused work. His initiatives aim to help individuals develop marketable digital skills and access global online opportunities." },
  { q: "What is Binary Hub?", a: "Binary Hub is a technology and digital-skills organization founded by Tahseen Abbas. It provides practical learning and digital opportunities in areas such as web development, UI/UX, digital marketing, graphic design, AI, freelancing, and other emerging technologies." },
  { q: "What is Tahseen Abbas's vision for the IT sector in Gilgit-Baltistan?", a: "His vision is to help build a stronger digital ecosystem in Gilgit-Baltistan by developing local talent, expanding digital skills, encouraging innovation and entrepreneurship, and connecting the region's youth with national and global technology opportunities." },
  { q: "How is Tahseen Abbas contributing to digital transformation in Gilgit-Baltistan?", a: "Tahseen Abbas advocates for stronger digital education, technology adoption, IT capacity building, innovation, and collaboration between educational institutions, organizations, and the technology industry to accelerate digital transformation in Gilgit-Baltistan." },
  { q: "Who is working to put Gilgit-Baltistan on the global technology map?", a: "Tahseen Abbas has publicly advocated for developing Gilgit-Baltistan's IT ecosystem and connecting its emerging technology talent with global digital opportunities." },
  { q: "What does Tahseen Abbas do for young entrepreneurs?", a: "He promotes practical technology education, freelancing, digital skills, mentorship, and entrepreneurship so young people can transform their ideas and skills into careers, businesses, and income opportunities." },
  { q: "What is Tahseen Abbas's role in technology education?", a: "Tahseen Abbas works to bridge the gap between traditional education and industry requirements by promoting practical, career-oriented digital skills and technology training." },
  { q: "Who is Tahseen Abbas and why is he important to the digital economy of Gilgit-Baltistan?", a: "Tahseen Abbas is a technology entrepreneur and digital-skills advocate who works on youth development, digital education, freelancing, entrepreneurship, and technology-driven opportunities in Gilgit-Baltistan." },
  { q: "How can young people in Gilgit-Baltistan benefit from Binary Hub?", a: "Young people can develop practical digital skills, explore freelancing and entrepreneurship, gain industry-oriented experience, and prepare for careers in the growing digital economy through Binary Hub's programs and initiatives." },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [data, setData] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: "", role: "", text: "", avatar: "" });
  const [reviewMsg, setReviewMsg] = useState("");
  const [reviewErr, setReviewErr] = useState("");
  const [reviewBusy, setReviewBusy] = useState(false);
  const [reviewUploading, setReviewUploading] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch(() => setData(null));
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewErr("");
    setReviewMsg("");
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) {
      setReviewErr("Please enter your name and a review.");
      return;
    }
    setReviewBusy(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setReviewMsg(json.message || "Thank you! Your review has been submitted.");
      setReviewForm({ name: "", role: "", text: "", avatar: "" });
    } catch (err) {
      setReviewErr(err.message);
    } finally {
      setReviewBusy(false);
    }
  };

  const onReviewAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setReviewErr("Please choose an image file.");
      return;
    }
    setReviewErr("");
    setReviewUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed. Please try again.");
      setReviewForm((f) => ({ ...f, avatar: json.url }));
    } catch (err) {
      setReviewErr(err.message);
    } finally {
      setReviewUploading(false);
    }
  };

  const items = data?.portfolio || [];
  const experience = data?.experience || [];
  const skills = data?.skills || [];
  const awards = data?.awards || [];
  const partners = data?.partners || [];
  const communities = data?.communities || [];
  const testimonials = data?.testimonials || [];
  const settings = DEFAULT_SETTINGS;
  const social = {
    instagram: "https://www.instagram.com/tashfeen460/?hl=en",
    linkedin: "https://www.linkedin.com/in/tashfeen-riaz-39b1a2396/",
    github: "https://github.com/tashfeen635-cmyk",
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);

            const skillCard = entry.target.closest(".skill-card");
            if (skillCard && !skillCard.classList.contains("counted")) {
              skillCard.classList.add("counted");
              const target = parseInt(skillCard.dataset.target, 10);
              const percentEl = skillCard.querySelector(".skill-percent");
              let current = 0;
              const increment = target / 60;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                percentEl.textContent = Math.floor(current) + "%";
              }, 25);
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter, data]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const onScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoScroll) return;

    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, behavior: "auto" });

    let raf = 0;
    let frame = 0;
    let direction = 1; // 1 = down, -1 = up
    let pausedUntil = 0;
    let interruptedUntil = 0;
    const PAUSE_MS = 3000;
    const RESUME_MS = 5000;
    const STEP = window.__AUTOSCROLL_STEP__ || 2.6;

    const step = () => {
      frame++;
      try {
        const now = performance.now();
        const maxScroll = Math.round(
          Math.max(0, root.scrollHeight - window.innerHeight)
        );

        if (now < interruptedUntil || now < pausedUntil) {
          raf = requestAnimationFrame(step);
          return;
        }

        if (maxScroll <= 0) {
          raf = requestAnimationFrame(step);
          return;
        }

        const y = window.scrollY;

        if (direction > 0) {
          if (y >= maxScroll - 1) {
            direction = -1;
            pausedUntil = now + PAUSE_MS;
            console.log(`[autoscroll] flip -> UP (frame=${frame}, y=${Math.round(y)}, bottom=${maxScroll})`);
            raf = requestAnimationFrame(step);
            return;
          }
          window.scrollTo({ top: Math.min(y + STEP, maxScroll), behavior: "auto" });
        } else {
          if (y <= 0) {
            direction = 1;
            pausedUntil = now + PAUSE_MS;
            console.log(`[autoscroll] flip -> DOWN (frame=${frame}, y=${Math.round(y)}, bottom=${maxScroll})`);
            raf = requestAnimationFrame(step);
            return;
          }
          window.scrollTo({ top: Math.max(y - STEP, 0), behavior: "auto" });
        }
      } catch (err) {
        console.error("[autoscroll] step error:", err);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const interrupt = () => {
      if (interruptedUntil > performance.now()) return;
      interruptedUntil = performance.now() + RESUME_MS;
      console.log("[autoscroll] user input -> paused, auto-resuming in 5s");
    };
    const scrollKeys = new Set([
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      " ",
      "Home",
      "End",
    ]);
    const onKeyDown = (e) => {
      if (scrollKeys.has(e.key)) {
        e.preventDefault();
        interrupt();
      }
    };
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("touchmove", interrupt, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      root.style.scrollBehavior = prevBehavior;
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("touchmove", interrupt);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [autoScroll]);

  const toggleSidebar = () => {
    document.getElementById("sidebar").classList.toggle("open");
  };

  const visibleItems = items.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const selectedItem = selectedIdx === null ? null : visibleItems[selectedIdx];

  const goPrev = useCallback(
    () =>
      selectedIdx !== null &&
      setSelectedIdx((i) => (i - 1 + visibleItems.length) % visibleItems.length),
    [selectedIdx, visibleItems.length]
  );
  const goNext = useCallback(
    () => selectedIdx !== null && setSelectedIdx((i) => (i + 1) % visibleItems.length),
    [selectedIdx, visibleItems.length]
  );

  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedIdx(null);
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIdx, visibleItems.length, goNext, goPrev]);

  return (
    <>
      <button className="mobile-toggle" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <aside className="sidebar" id="sidebar">
        <div className="profile-img">
          <img src={settings.profileImage} alt="Tahseen Abbas" />
        </div>
        <ul className="nav-menu">
          <li><a href="#about" className="active">About</a></li>
          <li><a href="#portfolio">Visual Journey</a></li>
          <li><a href="#experience">Mission & Vision</a></li>
          <li><a href="#skills">Partners & Collaborations</a></li>
          <li><a href="#awards">Future Vision</a></li>
          <li><a href="#community">Community Initiatives</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="sidebar-auto-scroll">
          <button
            className={`auto-scroll-btn${autoScroll ? " active" : ""}`}
            onClick={() => setAutoScroll((v) => !v)}
            aria-pressed={autoScroll}
          >
            <i className={`fas ${autoScroll ? "fa-pause" : "fa-play"}`}></i>
            {autoScroll ? "Stop" : "Start"}
          </button>
          <p className="auto-scroll-hint">Auto-scroll through the site</p>
        </div>
      </aside>

      <main className="main-content">
        <section className="hero" id="about">
          <div className="hero-content">
            <div className="logo">
              <div className="logo-icon">
                <img src={settings.logoImage} width="200px" alt="" />
              </div>
            </div>
            <h1><span className="hero-name-first">{settings.heroName.split(" ").slice(0, -1).join(" ")}</span>{" "}
              <span className="hero-name-last">{settings.heroName.split(" ").slice(-1).join(" ")}</span>
            </h1>
            <p className="hero-subtitle">
              {settings.heroSubtitle.split("Gilgit-Baltistan's")[0]}
              <span className="hero-accent">Gilgit</span>-<span className="hero-accent-blue">Baltistan&apos;s</span>
              {settings.heroSubtitle.split("Gilgit-Baltistan's")[1]}
            </p>
            <p className="hero-desc">
              {settings.heroDesc.split("Tahseen Abbas")[0]}
              <span className="hero-accent-blue">Tahseen</span> <span className="hero-accent">Abbas</span>
              {settings.heroDesc.split("Tahseen Abbas")[1].split("Binary Hub")[0]}
              <span className="hero-accent-blue">Binary</span> <span className="hero-accent">Hub</span>
              {settings.heroDesc.split("Tahseen Abbas")[1].split("Binary Hub")[1]}
            </p>
            <div className="social-icons">
              <a href={social.instagram}><i className="fab fa-instagram"></i></a>
              <a href={social.linkedin}><i className="fab fa-linkedin-in"></i></a>
              <a href={social.github}><i className="fab fa-github"></i></a>
            </div>
          </div>
        </section>

        <section className="section portfolio" id="portfolio">
          <h2 className="section-title reveal"><span className="sc-accent">Visual</span> <span className="sc-collab">Journey</span></h2>
          <div className="filter-menu reveal">
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                className={`filter-btn${activeFilter === category.value ? " active" : ""}`}
                onClick={() => setActiveFilter(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="portfolio-grid">
            {visibleItems.map((item, idx) => (
              <div
                key={item.id}
                className="portfolio-item reveal"
                data-category={item.category}
                onClick={() => setSelectedIdx(idx)}
              >
                <img src={item.src} alt={item.description || CATEGORY_LABELS[item.category]} />
                <div className="portfolio-overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section experience" id="experience">
          <h2 className="section-title reveal"><span className="sc-accent">Mission</span> <span className="sc-accent">&</span> <span className="sc-collab">Vision</span></h2>
          <div className="exp-grid">
            {experience.map((exp) => (
              <div className={`exp-card ${exp.color} reveal`} key={exp.id}>
                {exp.image && <img className="exp-image" src={exp.image} alt={exp.title} />}
                <div className="exp-header">
                  <i className={`fas ${exp.icon}`}></i>
                  <h3>{exp.title}</h3>
                </div>
                <p>{exp.description}</p>
                <div className="exp-date">{exp.date}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section skills" id="skills">
          <h2 className="section-title reveal"><span className="sc-accent">Partners</span> <span className="sc-accent">&</span> <span className="sc-collab">Collaborations</span></h2>
          {partners.length > 0 && (
            <div className="partner-marquee">
              <div className="partner-track">
                {[...partners, ...partners].map((p, i) => (
                  <img key={i} src={p.src} alt={p.name || "Partner logo"} />
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="section awards" id="awards">
          <h2 className="section-title reveal"><span className="sc-accent">Future</span> <span className="sc-collab">Vision</span></h2>
          <div className="timeline">
            <div className="timeline-line"></div>
            {awards.map((award) => (
              <div className="timeline-item reveal" key={award.id}>
                <div className="timeline-dot"></div>
                <div className="timeline-connector"></div>
                <div className="timeline-card">
                  {award.image && <img className="timeline-img" src={award.image} alt={award.title} />}
                  <div className="timeline-date">{award.date}</div>
                  <h4>{award.title}</h4>
                  <p>{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section community" id="community">
          <h2 className="section-title reveal"><span className="sc-accent">Community</span> <span className="sc-collab">Initiatives</span></h2>
          <div className="community-grid">
            {communities.map((c) => (
              <div className="community-card reveal" key={c.id}>
                <i className={`fas ${c.icon}`}></i>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section testimonials" id="testimonials">
          <h2 className="section-title reveal"><span className="sc-accent">Testi</span><span className="sc-collab">monials</span></h2>
          <div className="testimonials-head">
            <button type="button" className="btn-review" onClick={() => { setReviewMsg(""); setReviewErr(""); setShowReview(true); }}>
              <i className="fas fa-pen"></i> Leave a Review
            </button>
          </div>
          {testimonials.length > 0 && (
            <div className="testimonials-marquee">
              <div className="testimonials-track">
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div className="testimonial-marquee-card" key={i}>
                    <i className="fas fa-quote-left"></i>
                    <p>&quot;{t.text}&quot;</p>
                    <div className="testimonial-author">
                      <img src={t.avatar || "/images/default-avatar.svg"} alt={t.name} />
                      <div>
                        <h4>{t.name}</h4>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="section faq-section" id="faq">
          <h2 className="section-title reveal"><span className="sc-accent">Frequently</span> <span className="sc-collab">Asked Questions</span></h2>
          <h3 className="faq-sub reveal">About <span className="sc-accent">Tahseen</span> <span className="sc-collab">Abbas</span></h3>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span><NameHighlight text={f.q} /></span>
                  <i className={`fas fa-chevron-${openFaq === i ? "up" : "down"}`}></i>
                </button>
                <div className="faq-a"><NameHighlight text={f.a} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-wrapper">
            <div className="contact-left reveal">
              <h2><span className="sc-accent">Contact</span> <span className="sc-collab">Us</span></h2>
              <p>{settings.contactText}</p>
              <form>
                <div className="form-group"><input type="text" placeholder="Full Name" required /></div>
                <div className="form-group"><input type="email" placeholder="Email Id" required /></div>
                <div className="form-group"><input type="text" placeholder="Subject" required /></div>
                <div className="form-group"><textarea placeholder="Your Message" required></textarea></div>
                <button type="submit" className="btn-send">Send</button>
              </form>
            </div>
            <div className="contact-right reveal">
              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Address</h4>
                  {splitLines(settings.address).map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Phone</h4>
                  {splitLines(settings.phone).map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  {splitLines(settings.email).map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
                </div>
              </div>
              <div className="contact-social">
                <a href={social.instagram} className="ig"><i className="fab fa-instagram"></i></a>
                <a href={social.linkedin} className="li"><i className="fab fa-linkedin-in"></i></a>
                <a href={social.github} className="gh"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </div>
          <div className="prepared-by">
            Designed &amp; Developed by <span className="credit-name">
              <span className="cn-blue">Tashfeen</span> <span className="cn-dark">Bin</span> <span className="cn-orange">Riaz</span>
            </span>
            <br />
            Full-Stack Web Developer
            <br />
            <a href="/hire-tashfeen-riaz-full-stack-web-developer" className="btn-detail">
              <i className="fas fa-user"></i> View Detail
            </a>
          </div>
          <div className="map-wrapper">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.6362821953193!2d74.3505081!3d35.911055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e649006aeec32d%3A0xb9711570d9e6e186!2sBinary%20Hub!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>
      </main>

      {showReview && (
        <div className="review-modal" onClick={() => setShowReview(false)}>
          <div className="review-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="review-modal-close" onClick={() => setShowReview(false)}>&times;</button>
            <h3>Leave a Review</h3>
            <p className="review-modal-sub">Share your experience — your review will appear after review approval.</p>
            <form onSubmit={submitReview}>
              <div className="form-group"><input
                type="text"
                placeholder="Your Name *"
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                required
              /></div>
              <div className="form-group"><input
                type="text"
                placeholder="Your Role / Position (optional)"
                value={reviewForm.role}
                onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
              /></div>
              <div className="form-group review-avatar-row">
                <span className="review-avatar-label">Profile Picture (optional)</span>
                <div className="review-avatar-controls">
                  <label className={`review-file-btn${reviewUploading ? " disabled" : ""}`}>
                    <i className="fas fa-camera"></i>
                    {reviewUploading ? "Uploading..." : reviewForm.avatar ? "Change" : "Choose from PC"}
                    <input type="file" accept="image/*" onChange={onReviewAvatar} disabled={reviewUploading} hidden />
                  </label>
                  {reviewForm.avatar && (
                    <button type="button" className="review-file-remove" onClick={() => setReviewForm((f) => ({ ...f, avatar: "" }))}>
                      Remove
                    </button>
                  )}
                </div>
                {reviewForm.avatar && <img src={reviewForm.avatar} alt="Avatar preview" className="review-avatar-preview" />}
              </div>
              <div className="form-group"><textarea
                placeholder="Your Review *"
                rows={4}
                value={reviewForm.text}
                onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                required
              ></textarea></div>
              {reviewErr && <div className="review-err">{reviewErr}</div>}
              {reviewMsg && <div className="review-ok">{reviewMsg}</div>}
              <button type="submit" className="btn-send" disabled={reviewBusy}>
                {reviewBusy ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="lightbox" onClick={() => setSelectedIdx(null)}>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); goPrev(); }}>&#10094;</button>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); goNext(); }}>&#10095;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedIdx(null)}>&times;</button>
            <img src={selectedItem.src} alt={selectedItem.description || CATEGORY_LABELS[selectedItem.category]} />
            <p className="lightbox-desc">
              {selectedItem.description || "No description provided."}
            </p>
            <span className="lightbox-cat">{CATEGORY_LABELS[selectedItem.category]}</span>
          </div>
        </div>
      )}
    </>
  );
}
