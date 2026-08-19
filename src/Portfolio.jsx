import React, { useEffect, useRef, useState } from 'react';
import LINKED_IMG from '../src/assets/LinkedImg.png';
import FRESHCART_IMG from '../src/assets/FreshCartImg.png';
import NOTEFLOW_IMG from '../src/assets/NoteFlowImg.png';
import YUMMY_IMG from '../src/assets/yummyImg.png';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @keyframes blob {
    0%, 100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(24px,-18px) scale(1.08); }
    66% { transform: translate(-16px,14px) scale(0.94); }
  }
  .animate-blob { animation: blob 12s ease-in-out infinite; }

  @keyframes floaty {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  .animate-floaty { animation: floaty 4.5s ease-in-out infinite; }
`;

const display = { fontFamily: "'Fraunces', ui-serif, serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const sans = { fontFamily: "'Inter', ui-sans-serif, sans-serif" };

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

function NavLink({ target, children, className = '' }) {
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <a
      href={`#${target}`}
      onClick={handleClick}
      className={`group relative cursor-pointer ${className}`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

function TechTag({ children, dark = false }) {
  return (
    <span
      style={mono}
      className={`text-[11px] px-2.5 py-1 rounded-md border ${
        dark
          ? 'border-stone-100/25 text-stone-200'
          : 'border-emerald-900/15 text-stone-500'
      }`}
    >
      {children}
    </span>
  );
}

function BrowserFrame({ url, img, alt, dark = true }) {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-2xl ${dark ? 'bg-emerald-950' : 'bg-white'}`}
    >
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-950">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
        </div>
        <div
          style={mono}
          className="flex-1 text-[11px] text-emerald-400/70 bg-emerald-950/60 rounded-full px-3 py-1 truncate"
        >
          {url}
        </div>
      </div>
      <img src={img} alt={alt} className="w-full block" />
    </div>
  );
}

function ProjectCard({ url, title, desc, tech, live, code, img, alt, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group bg-white rounded-2xl border border-emerald-900/10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-950/10 h-full flex flex-col">
        <div className="overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-[1.03]">
            <BrowserFrame url={url} img={img} alt={alt} />
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h4
            style={display}
            className="text-xl font-medium text-emerald-950 mb-2"
          >
            {title}
          </h4>
          <p className="text-sm text-stone-500 mb-4 flex-1">{desc}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {tech.map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold bg-emerald-950 text-stone-50 px-4 py-2 rounded-full transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-0.5"
            >
              Live site
            </a>
            <a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-emerald-950 border-b border-emerald-900/20 pb-0.5 transition-colors duration-200 hover:border-amber-500 hover:text-amber-600"
            >
              Code →
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Portfolio() {
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={sans}
      className="bg-stone-100 text-stone-800 selection:bg-amber-200 selection:text-emerald-950"
    >
      <style>{fontStyle}</style>

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-100/85 border-b border-emerald-900/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 md:px-8 py-4">
          <NavLink
            target="top"
            className="flex items-center gap-2 text-lg font-semibold text-emerald-950"
          >
            <span style={display} className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              Omnia
            </span>
          </NavLink>
          <nav className="hidden md:flex items-center gap-8">
            {' '}
            <NavLink
              target="skills"
              className="text-[13px] text-stone-500 hover:text-emerald-950 transition-colors"
              style={mono}
            >
              Skills
            </NavLink>
            <NavLink
              target="work"
              className="text-[13px] text-stone-500 hover:text-emerald-950 transition-colors"
              style={mono}
            >
              Work
            </NavLink>
            <NavLink
              target="timeline"
              className="text-[13px] text-stone-500 hover:text-emerald-950 transition-colors"
              style={mono}
            >
              Timeline
            </NavLink>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={mono}
              className="text-[13px] bg-emerald-950 text-stone-50 px-4 py-2 rounded-full transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-0.5"
            >
              Say hello
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="pointer-events-none absolute -top-32 -right-24 w-96 h-96 rounded-full bg-amber-300/25 blur-3xl animate-blob" />
          <div
            className="pointer-events-none absolute top-40 -left-24 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl animate-blob"
            style={{ animationDelay: '3s' }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-8">
            <div
              className={`transition-all duration-700 ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                <span
                  style={mono}
                  className="text-xs uppercase tracking-widest text-stone-500"
                >
                  Open to front-end roles
                </span>
              </div>

              <h1
                style={display}
                className="text-[40px] leading-[1.05] md:text-6xl font-medium text-emerald-950 max-w-2xl mb-6 -tracking-tight"
              >
                Interfaces built to be{' '}
                <em className="italic text-amber-500">used</em>, not just
                shipped.
              </h1>

              <p className="text-lg text-stone-500 max-w-xl mb-9">
                I'm Omnia Abdelrahman, a front-end developer working in Next.js
                and React. Computer Science student at Benha National
                University, currently building a social platform called{' '}
                <strong className="text-emerald-950 font-semibold">
                  Linked
                </strong>{' '}
                for Route Academy — alongside e-commerce and productivity apps
                that go from Figma to production.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-14">
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('work')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 font-semibold text-sm bg-emerald-950 text-stone-50 px-6 py-3.5 rounded-full transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/20"
                >
                  View my work ↓
                </a>
                <a
                  href="mailto:omniaabdelrahman799@gmail.com"
                  className="inline-flex items-center gap-2 font-semibold text-sm border border-emerald-900/15 text-emerald-950 px-6 py-3.5 rounded-full transition-all duration-200 hover:border-emerald-950 hover:-translate-y-1"
                >
                  Say hello
                </a>
                <a
                  href="https://github.com/omniaabdelrahman134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-sm border border-emerald-900/15 text-emerald-950 px-6 py-3.5 rounded-full transition-all duration-200 hover:border-emerald-950 hover:-translate-y-1"
                >
                  GitHub ↗
                </a>
              </div>

              <div className="flex flex-wrap gap-10 pt-8 border-t border-emerald-900/10">
                <div>
                  <div
                    style={mono}
                    className="text-[11px] uppercase tracking-wider text-stone-400 mb-1"
                  >
                    Based in
                  </div>
                  <div className="text-sm font-medium text-emerald-950">
                    Cairo, Egypt
                  </div>
                </div>
                <div>
                  <div
                    style={mono}
                    className="text-[11px] uppercase tracking-wider text-stone-400 mb-1"
                  >
                    Focus
                  </div>
                  <div className="text-sm font-medium text-emerald-950">
                    Next.js · React.js
                  </div>
                </div>
                <div>
                  <div
                    style={mono}
                    className="text-[11px] uppercase tracking-wider text-stone-400 mb-1"
                  >
                    Studying
                  </div>
                  <div className="text-sm font-medium text-emerald-950">
                    B.Sc. Computer Science, 2023–2027
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="bg-white border-y border-emerald-900/10 py-20 md:py-24"
        >
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <Reveal>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-px bg-emerald-800" />
                <span
                  style={mono}
                  className="text-xs uppercase tracking-widest text-emerald-800"
                >
                  01 — What I work with
                </span>
              </div>
              <h2
                style={display}
                className="text-3xl md:text-4xl font-medium text-emerald-950 mb-12"
              >
                Tools of the trade
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Languages & core',
                  items: [
                    'HTML5',
                    'CSS',
                    'JavaScript',
                    'C / C++',
                    'C#',
                    'SQL',
                    'OOP',
                    'Data Structures & Algorithms',
                  ],
                },
                {
                  title: 'Frameworks & styling',
                  items: [
                    'React.js',
                    'Next.js',
                    'Tailwind CSS',
                    'Bootstrap',
                    'Responsive Design',
                    'REST API Integration',
                  ],
                },
                {
                  title: 'Tools & practice',
                  items: [
                    'Git / GitHub',
                    'VS Code',
                    'Problem Solving',
                    'Team Leading',
                    'Team Working',
                    'Time Management',
                  ],
                },
              ].map((group, i) => (
                <Reveal key={group.title} delay={i * 120}>
                  <div className="bg-stone-50 border border-emerald-900/10 rounded-2xl p-6 h-full transition-all duration-300 hover:border-amber-400 hover:-translate-y-1">
                    <h3
                      style={mono}
                      className="text-xs uppercase tracking-wider text-amber-600 mb-4"
                    >
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((s) => (
                        <span
                          key={s}
                          className="text-[13px] px-3 py-1.5 rounded-lg bg-white border border-emerald-900/10 text-emerald-950 transition-colors duration-200 hover:border-emerald-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="work" className="py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <Reveal>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-px bg-emerald-800" />
                <span
                  style={mono}
                  className="text-xs uppercase tracking-widest text-emerald-800"
                >
                  02 — Selected projects
                </span>
              </div>
              <h2
                style={display}
                className="text-3xl md:text-4xl font-medium text-emerald-950 mb-12"
              >
                Things I've built
              </h2>
            </Reveal>

            <Reveal>
              <div className="bg-emerald-950 rounded-3xl p-8 md:p-11 grid md:grid-cols-2 gap-10 items-center mb-7">
                <div>
                  <span
                    style={mono}
                    className="text-[11px] uppercase tracking-widest text-amber-300 mb-4 inline-block"
                  >
                    ● In progress — flagship project
                  </span>
                  <h3
                    style={display}
                    className="text-3xl font-medium text-stone-50 mb-4"
                  >
                    Linked
                  </h3>
                  <p className="text-stone-300 text-[15px] mb-6 max-w-md">
                    A LinkedIn-style social platform built for Route Academy,
                    where builders share what they're making and find the people
                    who'd care. Designing the full UI/UX system and building it
                    out in React — feed, profiles, posts, and notifications.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    <TechTag dark>React</TechTag>
                    <TechTag dark>UI/UX Design</TechTag>
                    <TechTag dark>Component Architecture</TechTag>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://linked-app-swart.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold bg-amber-500 text-emerald-950 px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-amber-300 hover:-translate-y-0.5"
                    >
                      View live site
                    </a>
                    <a
                      href="https://github.com/omniaabdelrahman134"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-stone-50 border-b border-stone-50/30 pb-0.5 transition-colors duration-200 hover:border-amber-300 hover:text-amber-300"
                    >
                      Source →
                    </a>
                  </div>
                </div>
                <div className="transition-transform duration-500 hover:scale-[1.02]">
                  <BrowserFrame
                    url="linked-app-swart.vercel.app"
                    img={LINKED_IMG}
                    alt="Linked sign-in screen with the tagline 'Where what you're building finds the people who'd care'"
                  />
                </div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-7 mb-7">
              <ProjectCard
                url="e-commerce-c23o.vercel.app"
                title="Fresh Cart"
                desc="A full e-commerce web app with product listings, cart, wishlist, and checkout flows, wired up to a REST API for dynamic product data."
                tech={['Next.js', 'Tailwind', 'REST API']}
                live="https://e-commerce-c23o.vercel.app/"
                code="https://github.com/omniaabdelrahman134"
                img={FRESHCART_IMG}
                alt="FreshCart storefront home page"
                delay={0}
              />
              <ProjectCard
                url="note-flow-92ka.vercel.app"
                title="Note Flow"
                desc="A notes management app for capturing and organizing thoughts — create, edit, and delete notes with state handled dynamically across the app."
                tech={['Next.js', 'Responsive UI']}
                live="https://note-flow-92ka.vercel.app/"
                code="https://github.com/omniaabdelrahman134"
                img={NOTEFLOW_IMG}
                alt="NoteFlow sign-up screen"
                delay={100}
              />
              <ProjectCard
                url="yummy-ebon.vercel.app"
                title="Yummy"
                desc="A meal recipes site with search by name, letter, category, area, and ingredient — a responsive, interactive front end with dynamic data handling."
                tech={['HTML', 'CSS', 'JavaScript', 'Bootstrap']}
                live="https://yummy-ebon.vercel.app/"
                code="https://github.com/omniaabdelrahman134"
                img={YUMMY_IMG}
                alt="Yummy recipe grid homepage"
                delay={200}
              />
              <Reveal delay={300}>
                <div className="bg-white rounded-2xl border border-dashed border-emerald-900/20 h-full flex flex-col justify-center p-8 transition-all duration-300 hover:border-amber-400 hover:-translate-y-1.5">
                  <h4
                    style={display}
                    className="text-xl font-medium text-emerald-950 mb-2"
                  >
                    More on GitHub
                  </h4>
                  <p className="text-sm text-stone-500 mb-6">
                    A few smaller builds and course projects live in my repos —
                    happy to walk through any of them.
                  </p>
                  <a
                    href="https://github.com/omniaabdelrahman134"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 text-sm font-semibold bg-emerald-950 text-stone-50 px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-0.5"
                  >
                    Browse repos ↗
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal className="text-center">
              <a
                href="https://github.com/omniaabdelrahman134"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-sm bg-amber-500 text-emerald-950 px-6 py-3.5 rounded-full transition-all duration-200 hover:bg-amber-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/30"
              >
                See all my projects on GitHub ↗
              </a>
            </Reveal>
          </div>
        </section>

        {/* TIMELINE */}
        <section
          id="timeline"
          className="bg-white border-y border-emerald-900/10 py-20 md:py-24"
        >
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <Reveal>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-px bg-emerald-800" />
                <span
                  style={mono}
                  className="text-xs uppercase tracking-widest text-emerald-800"
                >
                  03 — Background
                </span>
              </div>
              <h2
                style={display}
                className="text-3xl md:text-4xl font-medium text-emerald-950 mb-12"
              >
                Education &amp; courses
              </h2>
            </Reveal>

            <Reveal>
              <div className="bg-emerald-950 rounded-2xl overflow-hidden text-stone-200">
                <div className="flex items-center gap-2 px-6 py-3.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
                </div>
                <div
                  style={mono}
                  className="text-[13px] text-amber-300 px-6 pb-5 border-b border-white/10"
                >
                  $ git log --oneline --author="omnia" --courses
                </div>
                <div className="divide-y divide-white/10">
                  {[
                    [
                      '2023 – 2027',
                      'B.Sc. Computer Science',
                      'Benha National University',
                    ],
                    ['07/2025 – 02/2025', 'Front End Diploma', 'Route Academy'],
                    [
                      '02/2025 – 05/2025',
                      'Problem Solving — Level 1',
                      'Coach Academy',
                    ],
                    [
                      '09/2024 – 02/2025',
                      'Problem Solving — Level 2',
                      'Coach Academy',
                    ],
                    [
                      '08/2025',
                      'Introduction to Generative AI',
                      'Cisco Academy',
                    ],
                  ].map(([date, title, org]) => (
                    <div
                      key={title}
                      className="grid md:grid-cols-[120px_1fr_auto] gap-1 md:gap-6 items-baseline px-6 py-4 transition-colors duration-200 hover:bg-white/5"
                    >
                      <span
                        style={mono}
                        className="text-[12.5px] text-emerald-400"
                      >
                        {date}
                      </span>
                      <span className="text-[15px] font-medium text-stone-50">
                        {title}
                      </span>
                      <span
                        style={mono}
                        className="text-[12px] text-emerald-400/80"
                      >
                        {org}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 md:py-28 text-center">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <Reveal>
              <span
                style={mono}
                className="text-xs uppercase tracking-widest text-emerald-800 inline-flex items-center gap-2.5"
              >
                <span className="w-5 h-px bg-emerald-800" />
                04 — Get in touch
              </span>
              <h2
                style={display}
                className="text-4xl md:text-5xl font-medium text-emerald-950 my-5 leading-tight"
              >
                Let's build something{' '}
                <em className="italic text-amber-500">worth using</em>.
              </h2>
              <p className="text-stone-500 max-w-md mx-auto mb-10">
                Open to front-end and Next.js/React roles, freelance work, or
                just a conversation about interfaces.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                [
                  'Email',
                  'omniaabdelrahman799@gmail.com',
                  'mailto:omniaabdelrahman799@gmail.com',
                ],
                ['Phone', '01126881444', 'tel:+201126881444'],
                [
                  'LinkedIn',
                  'omniaabdelrahman',
                  'https://www.linkedin.com/in/omniaabdelrahman-8963a3252',
                ],
                [
                  'GitHub',
                  'omniaabdelrahman134',
                  'https://github.com/omniaabdelrahman134',
                ],
              ].map(([label, value, href], i) => (
                <Reveal key={label} delay={i * 90}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="block bg-white border border-emerald-900/10 rounded-xl p-5 h-full transition-all duration-200 hover:border-amber-400 hover:-translate-y-1"
                  >
                    <span
                      style={mono}
                      className="block text-[10.5px] uppercase tracking-wider text-stone-400 mb-2"
                    >
                      {label}
                    </span>
                    <span className="text-[13.5px] font-semibold text-emerald-950 break-words">
                      {value}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-emerald-950 text-emerald-400/80 py-6">
        <div className="max-w-5xl mx-auto px-6 md:px-8 flex flex-wrap items-center justify-between gap-2">
          <span style={mono} className="text-[11.5px] uppercase tracking-wider">
            <span className="text-amber-300">Omnia Abdelrahman</span> —
            Front-End Developer
          </span>
          <span style={mono} className="text-[11.5px] uppercase tracking-wider">
            Cairo, Egypt · © 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
