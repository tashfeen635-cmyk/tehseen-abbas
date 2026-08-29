"use client";

import { useEffect, useState } from "react";

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
  heroName: "TEHSEEN ABBAS",
  heroNameAccent: "ABBAS",
  heroSubtitle: "The next big idea is waiting for its next big changer with",
  heroSubtitleLink: "Themsbit",
  heroSubtitleUrl: "#",
  heroDesc:
    "I am experienced in leveraging agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
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

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch(() => setData(null));
  }, []);

  const items = data?.portfolio || [];
  const experience = data?.experience || [];
  const skills = data?.skills || [];
  const awards = data?.awards || [];
  const settings = DEFAULT_SETTINGS;
  const social = {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    github: "#",
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

  const toggleSidebar = () => {
    document.getElementById("sidebar").classList.toggle("open");
  };

  const visibleItems = items.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <>
      <button className="mobile-toggle" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <aside className="sidebar" id="sidebar">
        <div className="profile-img">
          <img src={settings.profileImage} alt="Tehseen Abbas" />
        </div>
        <ul className="nav-menu">
          <li><a href="#about" className="active">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#awards">Awards</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </aside>

      <main className="main-content">
        <section className="hero" id="about">
          <div className="hero-content">
            <div className="logo">
              <div className="logo-icon">
                <img src={settings.logoImage} width="100px" alt="" />
              </div>
              <span className="logo-text">{settings.brandText}</span>
            </div>
            <h1>{settings.heroName.split(" ").slice(0, -1).join(" ")}{" "}
              <span>{settings.heroName.split(" ").slice(-1).join(" ")}</span>
            </h1>
            <p className="hero-subtitle">
              {settings.heroSubtitle}{" "}
              <a href={settings.heroSubtitleUrl}>{settings.heroSubtitleLink}</a>
            </p>
            <p className="hero-desc">{settings.heroDesc}</p>
            <div className="social-icons">
              <a href={social.facebook}><i className="fab fa-facebook-f"></i></a>
              <a href={social.twitter}><i className="fab fa-twitter"></i></a>
              <a href={social.linkedin}><i className="fab fa-linkedin-in"></i></a>
              <a href={social.github}><i className="fab fa-github"></i></a>
            </div>
          </div>
        </section>

        <section className="section experience" id="experience">
          <h2 className="section-title reveal">Experience</h2>
          <div className="exp-grid">
            {experience.map((exp) => (
              <div className={`exp-card ${exp.color} reveal`} key={exp.id}>
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

        <section className="section portfolio" id="portfolio">
          <h2 className="section-title reveal">Portfolio</h2>
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
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-item reveal"
                data-category={item.category}
              >
                <img src={item.src} alt={CATEGORY_LABELS[item.category]} />
                <div className="portfolio-overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section skills" id="skills">
          <h2 className="section-title reveal">Coding Skills</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card reveal" data-target={skill.target} key={skill.id}>
                <div className="skill-icon"><i className={`${skill.icon.includes("fab") ? "fab" : "fas"} ${skill.icon}`}></i></div>
                <div className="skill-percent">0%</div>
                <div className="skill-name">{skill.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section awards" id="awards">
          <h2 className="section-title reveal">Awards</h2>
          <div className="timeline">
            <div className="timeline-line"></div>
            {awards.map((award) => (
              <div className="timeline-item reveal" key={award.id}>
                <div className="timeline-dot"></div>
                <div className="timeline-connector"></div>
                <div className="timeline-card">
                  <div className="timeline-date">{award.date}</div>
                  <h4>{award.title}</h4>
                  <p>{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-wrapper">
            <div className="contact-left reveal">
              <h2>Contact Us</h2>
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
                <a href={social.facebook} className="fb"><i className="fab fa-facebook-f"></i></a>
                <a href={social.twitter} className="tw"><i className="fab fa-twitter"></i></a>
                <a href={social.linkedin} className="gp"><i className="fab fa-linkedin-in"></i></a>
                <a href={social.github} className="gp"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </div>
          <div className="map-wrapper">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58368.8038862775!2d-111.38002865!3d26.01184095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86baf4f7b9f9e1c1%3A0x3e2e5c5f5b5e5e5e!2sLoreto%2C%20Baja%20California%20Sur%2C%20Mexico!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>
      </main>
    </>
  );
}
