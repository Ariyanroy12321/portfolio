import React, { useRef, useState, useEffect } from 'react'

import cloud_l from '../assets/cloud_l.png'
import cloud_r from '../assets/cloud_r.png'
import label from '../assets/label.png'
import profile from '../assets/profile.png'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EMAIL = "ariyanroy134@gmail.com";
const CV_PATH = "/Ariyan_Roy_CV.pdf"; // put your CV in the public/ folder with this name

/* Theme palettes (applied as CSS variables on the root container)
   --bg: base surface | --sl: light shadow | --sd: dark shadow
   --gold: headings/accents | --crimson: highlights | --text: body text */
const THEMES = {
    dark: {
        "--bg": "#26343d", "--sl": "#324450", "--sd": "#1a242b",
        "--gold": "#D4A94A", "--crimson": "#B3382C", "--text": "#EADBB5",
    },
    light: {
        "--bg": "#e4d9bf", "--sl": "#f6efdb", "--sd": "#bfb293",
        "--gold": "#8a5d0a", "--crimson": "#B3382C", "--text": "#26343d",
    },
};

const display = { fontFamily: "'Pirata One', cursive" };
const body = { fontFamily: "'Montserrat', sans-serif" };

const raised = "shadow-[8px_8px_18px_var(--sd),-8px_-8px_18px_var(--sl)]";
const raisedSm = "shadow-[5px_5px_10px_var(--sd),-5px_-5px_10px_var(--sl)]";
const inset = "shadow-[inset_6px_6px_12px_var(--sd),inset_-6px_-6px_12px_var(--sl)]";
const insetSm = "shadow-[inset_4px_4px_8px_var(--sd),inset_-4px_-4px_8px_var(--sl)]";
const pressed = "active:shadow-[inset_4px_4px_8px_var(--sd),inset_-4px_-4px_8px_var(--sl)]";

const Card = ({ children, className = "" }) => (
    <div className={`rounded-3xl bg-[var(--bg)] p-6 md:p-8 ${raised} ${className}`}>{children}</div>
)

const Chip = ({ children }) => (
    <span className={`inline-block rounded-full bg-[var(--bg)] px-4 py-2 text-xs font-semibold text-[var(--gold)] ${insetSm}`}>
        {children}
    </span>
)

const Title = ({ children, sub }) => (
    <div className="mb-8">
        <h3 style={display} className="text-4xl md:text-5xl text-[var(--gold)] tracking-wide">{children}</h3>
        {sub && <p className="text-xs uppercase tracking-[0.25em] opacity-60 mt-1">{sub}</p>}
    </div>
)

const Wave = () => (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-8 text-[var(--gold)] opacity-30">
        <path
            d="M0 20 Q 50 0 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20"
            fill="none" stroke="currentColor" strokeWidth="2"
        />
    </svg>
)

/* X marks the spot */
const XMark = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 text-[var(--crimson)]" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M4 4L20 20M20 4L4 20" />
    </svg>
)

/* Treasure-map timeline stop: X + dotted path to the next stop */
const MapStop = ({ year, title, sub, last, children }) => (
    <div className="flex gap-4">
        <div className="flex flex-col items-center">
            <XMark />
            {!last && <span className="flex-1 my-1 border-l-2 border-dashed border-[var(--gold)] opacity-60" />}
        </div>
        <div className={`-mt-1 ${last ? "" : "pb-8"}`}>
            <h4 style={display} className="text-2xl text-[var(--gold)]">{year}</h4>
            <p className="font-semibold">{title}</p>
            <p className="text-sm opacity-70 max-w-sm">{sub}</p>
            {children}
        </div>
    </div>
)

/* Social icons */
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
)
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)
const LeetCodeIcon = () => (
    <span style={display} className="text-xl leading-none">LC</span>
)

const SOCIALS = [
    { name: "GitHub", href: "https://github.com/Ariyanroy12321", Icon: GitHubIcon },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ariyan-roy-89b9a9427", Icon: LinkedInIcon },
    { name: "LeetCode", href: "https://leetcode.com/u/Ariyan_Roy/", Icon: LeetCodeIcon },
]

const SocialButton = ({ name, href, Icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={name}
        title={name}
        className={`w-14 h-14 rounded-full bg-[var(--bg)] flex items-center justify-center text-[var(--gold)]
                    hover:text-[var(--crimson)] ${pressed} transition ${raisedSm}`}
    >
        <Icon />
    </a>
)

const Base = () => {
    const container = useRef(null);
    const contentRef = useRef(null);
    const needleRef = useRef(null);

    /* ---- Theme (remembered between visits) ---- */
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem("portfolio-theme") || "dark"; }
        catch { return "dark"; }
    });
    useEffect(() => {
        try { localStorage.setItem("portfolio-theme", theme); } catch { /* ignore */ }
    }, [theme]);
    const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

    /* ---- Contact form ---- */
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
        const bodyText = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${bodyText}`;
    };

    useGSAP(() => {
        const split = SplitText.create(".sig", { type: "chars" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: () => "+=" + (2500 + contentRef.current.scrollHeight),
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    gsap.set(needleRef.current, {
                        rotation: self.progress * 720,
                        transformOrigin: "50% 50%",
                    });
                },
            },
        });

        tl.to(split.chars, {
            opacity: 0, y: -30, duration: 0.5, stagger: 0.1, ease: "power2.out",
        })
        .to(".label", { opacity: 0, duration: 1 }, "-=0.3")
        .to(".cloudl", { x: "-80%", duration: 2.5, ease: "none" }, "+=0.2")
        .to(".cloudr", { x: "80%", duration: 2.5, ease: "none" }, "<")
        .to(contentRef.current, {
            y: () => -(contentRef.current.scrollHeight - window.innerHeight),
            duration: 10,
            ease: "none",
        });

        return () => split.revert();
    }, { scope: container });

    return (
        <div>
            <div
                ref={container}
                style={{ ...body, ...THEMES[theme] }}
                className="relative h-screen bg-[var(--bg)] overflow-hidden transition-colors duration-500"
            >

                {/* ===== Content layer (this is what scrolls) ===== */}
                <div ref={contentRef} className="absolute inset-x-0 top-0 z-0 text-[var(--text)]">

                    {/* ---------- 1. HERO ---------- */}
                    <section className="min-h-screen flex flex-col items-center justify-center text-center px-[14%] py-16">
                        <p className="text-xs uppercase tracking-[0.35em] opacity-60 mb-8">
                            ⚓ Welcome aboard ⚓
                        </p>

                        <div className={`rounded-full bg-[var(--bg)] p-4 ${raised}`}>
                            <div className={`rounded-full bg-[var(--bg)] p-3 ${inset}`}>
                                <div className="rounded-full overflow-hidden border-4 border-[var(--gold)] w-56 h-56 md:w-64 md:h-64">
                                    <img src={profile} alt="Ariyan Roy" className="w-full h-full object-cover object-top" />
                                </div>
                            </div>
                        </div>

                        <h1 style={display} className="mt-10 text-6xl md:text-8xl tracking-wide">
                            Ariyan Roy
                        </h1>
                        <p className="mt-8 text-sm md:text-base uppercase tracking-[0.3em] text-[var(--gold)]">
                            Computer Science Fresher · Full-Stack
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Chip>B.Tech · 2027</Chip>
                            <Chip>Android Intern</Chip>
                            <Chip>President, Tech Club</Chip>
                        </div>

                        <div className="mt-8 flex gap-4">
                            {SOCIALS.map(s => <SocialButton key={s.name} {...s} />)}
                        </div>

                        <div className={`mt-10 w-24 h-24 rounded-full bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--gold)] leading-tight ${raisedSm}`}>
                            Set sail<br />↓
                        </div>
                    </section>

                    <div className="px-[14%]"><Wave /></div>

                    {/* ---------- 2. CAPTAIN'S LOG ---------- */}
                    <section className="px-[14%] py-20">
                        <Title sub="About me">The Captain's Log</Title>
                        <div className="grid md:grid-cols-[3fr_2fr] gap-8">
                            <Card>
                                <h2 style={display} className="text-4xl md:text-5xl">Ahoy, I'm Ariyan!</h2>
                                <p className="mt-4 leading-relaxed opacity-90">
                                    I'm a Computer Science student (B.Tech, graduating in 2027) who enjoys
                                    turning ideas into working software. I've built full-stack web projects,
                                    completed an Android development internship, and I'm looking for an
                                    entry-level software role where I can keep learning, contribute to a
                                    team and solve real problems.
                                </p>
                            </Card>

                            <Card>
                                <h3 style={display} className="text-3xl text-[var(--gold)]">Find Me At Port</h3>
                                <ul className="mt-5 space-y-4 text-sm">
                                    <li className={`rounded-2xl bg-[var(--bg)] px-4 py-3 ${insetSm}`}>📍 Kolkata, West Bengal, India</li>
                                    <li className={`rounded-2xl bg-[var(--bg)] px-4 py-3 ${insetSm}`}>
                                        <a href={`mailto:${EMAIL}`} className="break-all hover:text-[var(--gold)]">✉ {EMAIL}</a>
                                    </li>
                                    <li className={`rounded-2xl bg-[var(--bg)] px-4 py-3 ${insetSm}`}>
                                        <a href="tel:+917439445598" className="hover:text-[var(--gold)]">📞 +91 74394 45598</a>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </section>

                    <div className="px-[14%]"><Wave /></div>

                    {/* ---------- 3. TREASURE-MAP TIMELINES ---------- */}
                    <section className="px-[14%] py-20">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <Title sub="Education">Navigation School</Title>
                                <Card>
                                    <MapStop year="2021" title="Class X" sub="The Assembly of God Church School, Tollygunge" />
                                    <MapStop year="2023" title="Class XII" sub="The Assembly of God Church School, Tollygunge" />
                                    <MapStop
                                        last
                                        year="2023 – 2027"
                                        title="B.Tech, Computer Science & Engineering"
                                        sub="Future Institute of Technology, Kolkata"
                                    />
                                </Card>
                            </div>

                            <div>
                                <Title sub="Internship">First Voyage</Title>
                                <Card>
                                    <MapStop
                                        last
                                        year="Jan – May 2026"
                                        title="Android App Development Intern"
                                        sub="Techno Exponent (Euphoria GenX) · 20 Jan – 18 May 2026"
                                    >
                                        <ul className="mt-3 list-disc pl-4 space-y-1 text-sm opacity-90">
                                            <li>4-month internship on Android App Development using Java, certified on 20 May 2026.</li>
                                            <li>Worked on the Farmer's Ultimate Assistant project.</li>
                                        </ul>
                                    </MapStop>
                                </Card>
                            </div>
                        </div>
                    </section>

                    <div className="px-[14%]"><Wave /></div>

                    {/* ---------- 4. SKILLS + CREW ---------- */}
                    <section className="px-[14%] py-20">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <Title sub="Technical skills">The Arsenal</Title>
                                <Card className="space-y-6">
                                    {[
                                        ["Languages", ["C", "Python", "Java"]],
                                        ["Web", ["HTML", "CSS", "JavaScript"]],
                                        ["Frameworks", ["React", "Express.js", "Tailwind CSS"]],
                                        ["Build tools", ["Vite"]],
                                        ["Databases", ["SQL", "MongoDB"]],
                                        ["Core concepts", ["DSA", "OOP"]],
                                    ].map(([group, items]) => (
                                        <div key={group}>
                                            <h4 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-2">{group}</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {items.map(i => <Chip key={i}>{i}</Chip>)}
                                            </div>
                                        </div>
                                    ))}
                                </Card>
                            </div>

                            <div>
                                <Title sub="Leadership & strengths">The Crew</Title>
                                <div className="space-y-6">
                                    <Card>
                                        <h4 style={display} className="text-2xl text-[var(--gold)]">President, Tech Club</h4>
                                        <p className="mt-2 text-sm leading-relaxed opacity-90">
                                            Led a student technology club, organizing coding workshops, hackathons
                                            and peer-learning sessions; coordinated a team to run technical events
                                            and mentored fellow students in programming fundamentals and robotics.
                                        </p>
                                    </Card>
                                    <Card>
                                        <h4 style={display} className="text-2xl text-[var(--gold)]">Problem Solver</h4>
                                        <p className="mt-2 text-sm leading-relaxed opacity-90">
                                            Strong problem-solving skills built through Data Structures &amp;
                                            Algorithms coursework and regular coding practice.
                                        </p>
                                    </Card>
                                    <Card>
                                        <h4 style={display} className="text-2xl text-[var(--gold)]">Quick Learner</h4>
                                        <p className="mt-2 text-sm leading-relaxed opacity-90">
                                            Eager to pick up new technologies and frameworks on a solid
                                            programming foundation.
                                        </p>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="px-[14%]"><Wave /></div>

                    {/* ---------- 5. WANTED POSTER + MESSAGE IN A BOTTLE ---------- */}
                    <section className="px-[14%] py-20">
                        <div className="grid md:grid-cols-2 gap-10 items-center">

                            {/* WANTED poster (stays parchment in both themes) */}
                            <div className={`rotate-[-2deg] rounded-xl bg-[#EADBB5] text-[#26343d] p-6 text-center border-4 border-double border-[#26343d]/60 ${raised}`}>
                                <h3 style={display} className="text-6xl tracking-widest">WANTED</h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">For crimes against bugs</p>

                                <div className="mt-4 mx-auto w-44 h-52 overflow-hidden border-4 border-[#26343d]">
                                    <img src={profile} alt="Ariyan Roy" className="w-full h-full object-cover object-top sepia contrast-110" />
                                </div>

                                <h4 style={display} className="mt-4 text-3xl">Ariyan "The Coder" Roy</h4>
                                <p className="text-sm font-semibold">Entry-Level Software Engineer</p>
                                <p className="mt-3 text-xs uppercase tracking-widest opacity-70">Reward</p>
                                <p style={display} className="text-2xl text-[#B3382C]">Clean Code &amp; Fast Learning</p>

                                <a
                                    href={CV_PATH}
                                    download
                                    className="mt-5 inline-block rounded-full bg-[#26343d] px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#D4A94A] hover:text-[#B3382C] transition shadow-[4px_4px_8px_rgba(0,0,0,0.35)]"
                                >
                                    ⬇ Download CV
                                </a>
                            </div>

                            {/* Message in a bottle */}
                            <div>
                                <Title sub="Contact">Message in a Bottle</Title>
                                <Card>
                                    <form onSubmit={onSubmit} className="space-y-5">
                                        <input
                                            name="name" value={form.name} onChange={onChange} required
                                            placeholder="Your name"
                                            className={`w-full rounded-2xl bg-[var(--bg)] px-5 py-3 text-sm placeholder:text-[var(--text)] placeholder:opacity-40 outline-none focus:text-[var(--gold)] ${insetSm}`}
                                        />
                                        <input
                                            name="email" type="email" value={form.email} onChange={onChange} required
                                            placeholder="Your email"
                                            className={`w-full rounded-2xl bg-[var(--bg)] px-5 py-3 text-sm placeholder:text-[var(--text)] placeholder:opacity-40 outline-none focus:text-[var(--gold)] ${insetSm}`}
                                        />
                                        <textarea
                                            name="message" rows={5} value={form.message} onChange={onChange} required
                                            placeholder="Write your message..."
                                            className={`w-full rounded-2xl bg-[var(--bg)] px-5 py-3 text-sm placeholder:text-[var(--text)] placeholder:opacity-40 outline-none resize-none focus:text-[var(--gold)] ${insetSm}`}
                                        />
                                        <button
                                            type="submit"
                                            className={`w-full rounded-full bg-[var(--bg)] py-3 text-sm font-bold uppercase tracking-widest text-[var(--gold)] hover:text-[var(--crimson)] ${pressed} transition ${raisedSm}`}
                                        >
                                            Send the bottle 🍾
                                        </button>
                                    </form>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* ---------- FOOTER ---------- */}
                    <footer className="px-[14%] py-20 text-center">
                        <h3 style={display} className="text-5xl md:text-6xl">Ready to set sail together?</h3>
                        <div className="mt-8 flex justify-center gap-5">
                            {SOCIALS.map(s => <SocialButton key={s.name} {...s} />)}
                        </div>
                        <p className="mt-12 text-xs opacity-50">© 2026 Ariyan Roy</p>
                    </footer>
                </div>

                {/* ===== Compass + theme toggle (right side, toggle below compass) ===== */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4">

                    {/* Compass */}
                    <div className={`pointer-events-none w-16 h-16 rounded-full bg-[var(--bg)] p-1.5 ${raisedSm}`}>
                        <div className={`relative w-full h-full rounded-full bg-[var(--bg)] ${insetSm}`}>
                            <span style={display} className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] text-[var(--gold)] leading-none">N</span>
                            <svg ref={needleRef} viewBox="0 0 24 24" className="absolute inset-0 w-full h-full p-2">
                                <path d="M12 2L15 12H9Z" className="fill-[var(--crimson)]" />
                                <path d="M12 22L9 12H15Z" className="fill-[var(--text)]" />
                                <circle cx="12" cy="12" r="1.5" className="fill-[var(--gold)]" />
                            </svg>
                        </div>
                    </div>
                    {/* Theme toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        title={theme === "dark" ? "Light mode" : "Dark mode"}
                        className={`pointer-events-auto cursor-pointer w-12 h-12 rounded-full bg-[var(--bg)] flex items-center justify-center text-xl ${pressed} transition ${raisedSm}`}
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </div>

                {/* ===== Cloud layer (fixed on top, doesn't scroll) ===== */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <img src={cloud_l} alt="Left cloud"
                        className="cloudl absolute left-0 top-0 h-screen w-[75%] object-cover z-20" />
                    <img src={cloud_r} alt="Right cloud"
                        className="cloudr absolute right-0 top-0 h-screen w-[75%] object-cover z-10" />
                    <img src={label} alt="Label"
                        className="label absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[500px] h-auto" />
                    <div className="relative z-[31] min-h-screen flex justify-center items-center">
                        <h1 style={{ fontFamily: 'Qwitcher Grypen' }} className="sig text-6xl font-bold text-black">
                            Ariyan Roy
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Base