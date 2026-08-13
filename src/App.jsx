import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  GraduationCap, Users, Database, Brain, Globe, Terminal, Settings,
  Mail, FileText, ArrowUpRight, Eye, Download, GitBranch,
  Menu, X, ChevronUp,
} from 'lucide-react';

const SITE = 'https://upendra-singh-tomar.vercel.app';
const cert = (name) => `${SITE}/certificates/${encodeURIComponent(name)}`;
const RESUME_URL = cert('Upendra_Singh_Tomar_Resume.pdf');

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Projects', id: 'projects' },
  { label: 'Publications', id: 'publications' },
  { label: 'Contact', id: 'contact' },
];

function GitHubLogo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.27c0 4.5 2.87 8.32 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.61-3.37-1.35-3.37-1.35-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.03 1.53 1.03.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.4-2.04 1.05-2.75-.1-.26-.45-1.31.1-2.72 0 0 .85-.27 2.77 1.04a9.38 9.38 0 0 1 5.05 0c1.92-1.31 2.76-1.04 2.76-1.04.55 1.41.21 2.46.1 2.72.66.71 1.05 1.63 1.05 2.75 0 3.95-2.35 4.82-4.59 5.08.36.31.68.94.68 1.9 0 1.37-.01 2.47-.01 2.82 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.27C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInLogo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M6.94 8.5A1.94 1.94 0 1 1 6.94 4.6a1.94 1.94 0 0 1 0 3.9ZM5.25 9.8h3.38v11.2H5.25V9.8Zm6.68 0h3.24v1.53h.05c.45-.86 1.56-1.76 3.21-1.76 3.43 0 4.06 2.25 4.06 5.18V21h-3.38v-19.4h3.38v1.7h.05c.45-.85 1.55-1.75 3.2-1.75 3.43 0 4.6 2.26 4.6 5.19V21h-3.38v-18.3h-3.38v-.1c-.14.06-.31.12-.47.17-.37.18-.72.42-1.02.72-.7.7-1.18 1.72-1.18 3.22V21h-3.38V9.8Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/upendra-sin1100', icon: GitHubLogo },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/upendra-singh-tomar-222a41312/', icon: LinkedInLogo },
  { label: 'Email', href: 'mailto:upendratomar1100@gmail.com', icon: Mail },
];

const SKILLS = [
  {
    group: 'Languages', items: [
      { name: 'Python', icon: Terminal }, { name: 'JavaScript', icon: Terminal }, { name: 'SQL', icon: Database },
    ]
  },
  {
    group: 'Frameworks & Tools', items: [
      { name: 'React.js', icon: Globe }, { name: 'FastAPI', icon: Settings }, { name: 'Streamlit', icon: Globe },
    ]
  },
  {
    group: 'AI & ML', items: [
      { name: 'TensorFlow', icon: Brain }, { name: 'Scikit-Learn', icon: Brain },
      { name: 'Hugging Face', icon: Brain }, { name: 'Pandas', icon: Database },
    ]
  },
];

const STATS = [
  { value: 3, label: 'Full-stack ML projects shipped' },
  { value: 1, label: 'Fine-tuned LLM pushed to Hugging Face' },
  { value: 2, label: 'Published research papers' },
];

const TIMELINE = [
  {
    period: 'Sep 2023 — May 2027', title: 'B.Tech in Data Science',
    org: 'Institute of Technology and Management, Gwalior', icon: GraduationCap,
    description: "Currently in the 3rd year, 6th semester. Coursework spans programming, data structures & algorithms, machine learning, deep learning, and artificial intelligence — the foundation behind every project below.",
    chips: ['Python', 'DSA', 'Machine Learning', 'Deep Learning', 'Data Science', 'AI'],
  },
  {
    period: '2023 — 2025', title: 'Theater Performer',
    org: 'RGPV University · Central Zone AIU', icon: Users,
    description: 'Performed in 4 major productions for live audiences of 1,000+, and represented RGPV University at Central Zone AIU inter-university theater competitions.',
    chips: ['Performance', 'Collaboration', 'Live Audiences'],
  },
];

const CERTIFICATIONS = [
  { title: 'AI-ML Virtual Internship', file: 'UPENDRA SINGH TOMAR (AI-ML Virtual Internship).pdf' },
  { title: 'Android Developer Virtual Internship', file: 'UPENDRA SINGH TOMAR (Android Developer Virtual Internship).pdf' },
  { title: 'Data Analytic Virtual Internship', file: 'UPENDRA SINGH TOMAR (Data Analytic Virtual Internship).pdf' },
  { title: 'Data Analytics Process Automation Virtual Internship', file: 'UPENDRA SINGH TOMAR (Data Analytics Process Automation Virtual Internship).pdf' },
  { title: 'Python Full Stack Developer Virtual Internship', file: 'UPENDRA SINGH TOMAR (Python Full Stack Developer Virtual Internship).pdf' },
  { title: 'Research Paper on Data-Driven Sustainability', file: 'Upendra Singh Tomar (Resarch Paper on Data-Driven Sustainability) Certificate.pdf' },
  { title: 'Research Paper on Generative AI for Carbon Capture (MOFs)', file: 'Upenrda Singh Tomar (Research Paper on Generative AI for Carbon Capture Materials(MOFs) Certificate.pdf' },
];

const COURSEWORK = ['Programming in Python', 'Data Structures & Algorithms', 'Machine Learning', 'Deep Learning', 'Data Science', 'Artificial Intelligence'];

const PROJECTS = [
  {
    title: 'UpFeed — News Aggregator', period: 'May 2026', stack: ['React.js', 'GNews API', 'Vercel'],
    description: 'A responsive news aggregator pulling live articles from GNews and NewsAPI across multiple categories and sources.',
    demo: 'https://up-feed.vercel.app', big: true, accent: '#00F0FF',
  },
  {
    title: 'Resume Analyzer', period: 'April 2026', stack: ['Python', 'Scikit-Learn', 'K-Means'],
    description: 'An ML pipeline trained on 78,670 resume entries that sorts resumes into 7 job categories using MiniBatch K-Means clustering over TF-IDF vectors.',
    demo: 'https://resume-analyzer-with-unsupervised-learning.streamlit.app', big: false, accent: '#F59E0B',
  },
  {
    title: 'Disease X Command Center', period: 'April 2026', stack: ['Streamlit', 'PostgreSQL', 'Supabase', 'ML'],
    description: 'A real-time, full-stack hospital management dashboard for patient triage. It flags critical cases as data comes in and surfaces actionable insight.',
    demo: 'https://disease-x-project.streamlit.app', big: false, accent: '#70F8FF',
  },
];

const PUBLICATIONS = [
  {
    title: 'Data-Driven Sustainability in Pharmaceutical Logistics', venue: 'IIP Series, Vol. 6',
    description: 'Explores cognitive decision intelligence frameworks aimed at reducing medical waste across pharmaceutical supply chains.',
    pdf: cert('Upendra Singh Tomar (Resarch Paper on Data-Driven Sustainability).pdf'),
    certificate: cert('Upendra Singh Tomar (Resarch Paper on Data-Driven Sustainability) Certificate.pdf'),
    publisher: 'Iterative International Publishers', details: 'e-ISBN 978-93-7020-972-5',
  },
  {
    title: 'Inverse Design: Generative AI for Carbon Capture Materials (MOFs)', venue: 'IJAMRED',
    description: 'Investigates generative AI approaches for designing Metal-Organic Frameworks optimized for carbon capture applications.',
    pdf: cert('Upenrda Singh Tomar (Research Paper on Generative AI for Carbon Capture Materials(MOFs).pdf'),
    certificate: cert('Upenrda Singh Tomar (Research Paper on Generative AI for Carbon Capture Materials(MOFs) Certificate.pdf'),
    publisher: 'International Journal of Advanced Multidisciplinary Research and Educational Development', details: 'Paper ID IJAMRED-V1I4P96',
  },
];

const CONTACT = [
  { label: 'Email', value: 'upendratomar1100@gmail.com', href: 'mailto:upendratomar1100@gmail.com' },
  { label: 'Phone', value: '+91 887-123-2117', href: 'tel:+918871232117' },
  { label: 'Location', value: 'Gwalior, Madhya Pradesh', href: null },
];

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

    .ust-root { --void:#0a0a0a; --slate-deep:#121212; --steel:#8892A8; --ice:#E4E8F0;
      --sapphire:#00F0FF; --sapphire-hover:#00D1DF; --sapphire-light:#70F8FF; --amber:#F59E0B;
      background:var(--void); color:var(--ice); font-family:'Inter',sans-serif;
      position:relative; overflow-x:hidden; isolation:isolate; scroll-behavior:smooth; }
    .ust-root *{ box-sizing:border-box; }
    .ust-root ::selection{ background:rgba(0,240,255,0.3); color:#fff; }
    .ust-root ::-webkit-scrollbar{ width:8px; }
    .ust-root ::-webkit-scrollbar-track{ background:var(--void); }
    .ust-root ::-webkit-scrollbar-thumb{ background:var(--slate-deep); border:1px solid rgba(136,146,168,0.2); border-radius:4px; }
    .ust-root ::-webkit-scrollbar-thumb:hover{ background:var(--sapphire); }
    .ust-root a:focus-visible, .ust-root button:focus-visible{ outline:2px solid var(--sapphire); outline-offset:3px; border-radius:4px; }

    .u-font-display{ font-family:'Outfit',sans-serif; letter-spacing:-0.02em; }
    .u-font-mono{ font-family:'Space Mono',monospace; }
    .u-ice{ color:var(--ice); } .u-steel{ color:var(--steel); } .u-white{ color:#fff; }
    .u-sapphire{ color:var(--sapphire); } .u-amber{ color:var(--amber); }
    .u-bg-sapphire{ background:var(--sapphire); } .u-bg-void{ background:var(--void); }

    .container-custom{ max-width:1280px; margin:0 auto; padding:0 1.5rem; }
    .section-shell{ padding:6rem 0; } @media(min-width:768px){ .section-shell{ padding:8rem 0; } }
    .section-kicker{ display:inline-block; font-family:'Space Mono',monospace; font-size:.72rem; font-weight:700;
      letter-spacing:.2em; text-transform:uppercase; color:var(--sapphire); margin-bottom:1rem; }
    .section-title{ font-family:'Outfit',sans-serif; font-size:clamp(2.1rem,5vw,3.6rem); line-height:1.05;
      letter-spacing:-0.03em; color:#fff; margin:0; }
    .section-lead{ max-width:40rem; color:var(--steel); line-height:1.8; font-size:1.05rem; }
    .text-display-xl{ font-family:'Outfit',sans-serif; font-size:clamp(2.6rem,8vw,6rem); line-height:1;
      letter-spacing:-0.04em; font-weight:800; }
    .accent-gradient{ background:linear-gradient(135deg,#70F8FF 0%,#00F0FF 50%,#00D1DF 100%);
      -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }

    .surface-card{ background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
      border:1px solid rgba(255,255,255,0.08); border-radius:1.5rem; transition:border-color .3s ease; }
    .surface-card:hover{ border-color:rgba(0,240,255,0.4); }
    .surface-card-strong{ background:rgba(255,255,255,0.05); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
      border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; }
    .glass-panel{ background:rgba(255,255,255,0.02); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,0.06); border-radius:1rem; transition:all .35s cubic-bezier(.16,1,.3,1); }
    .glass-panel:hover{ background:rgba(255,255,255,0.05); border-color:rgba(0,240,255,0.35); box-shadow:0 10px 40px -10px rgba(0,240,255,0.15); }

    .hero-cursor-lens{ position:absolute; pointer-events:none; width:220px; height:220px; border-radius:50%;
      background:radial-gradient(circle at 30% 30%, rgba(112,248,255,0.42), rgba(0,240,255,0.18) 18%, rgba(9,13,20,0.12) 46%, rgba(9,13,20,0.75) 100%);
      border:1px solid rgba(112,248,255,0.32); box-shadow:0 0 60px rgba(0,240,255,0.18), inset 0 0 36px rgba(255,255,255,0.08);
      backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); mix-blend-mode:screen; opacity:0; z-index:0; }

    .chip{ padding:.5rem .9rem; border-radius:.75rem; background:rgba(0,0,0,0.4); backdrop-filter:blur(8px);
      border:1px solid rgba(255,255,255,0.1); font-size:.72rem; font-weight:500; color:var(--ice); transition:border-color .3s; }
    .chip:hover{ border-color:rgba(255,255,255,0.25); }

    .section-divider{ height:1px; background:linear-gradient(90deg,transparent,rgba(0,240,255,.3),transparent); opacity:.5; }

    @keyframes ust-float{ 0%,100%{ transform:translate(0,0) scale(1);} 50%{ transform:translate(2%,-4%) scale(1.05);} }
    @keyframes ust-pulse{ 0%,100%{ opacity:.5;} 50%{ opacity:1;} }
    @keyframes ust-spin-slow{ from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
    .orb{ position:absolute; border-radius:50%; filter:blur(120px); pointer-events:none; animation:ust-float 22s ease-in-out infinite; }

    .reveal{ opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal.in{ opacity:1; transform:translateY(0); }
    .reveal-scale{ opacity:0; transform:scale(.94) translateY(16px); transition:opacity .55s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1); }
    .reveal-scale.in{ opacity:1; transform:scale(1) translateY(0); }

    .nav-pill{ position:relative; padding:.4rem .9rem; font-size:.75rem; font-weight:500; color:var(--steel);
      border-radius:999px; transition:color .2s; white-space:nowrap; }
    .nav-pill.active{ color:#fff; font-weight:600; }
    .nav-pill:hover{ color:var(--ice); }
    .nav-underline{ position:absolute; bottom:0; left:14px; right:14px; height:2px; background:var(--sapphire); border-radius:2px;
      transform:scaleX(0); transition:transform .3s cubic-bezier(.34,1.56,.64,1); }
    .nav-pill.active .nav-underline{ transform:scaleX(1); }

    .magnetic{ transition:transform .25s cubic-bezier(.16,1,.3,1); will-change:transform; }

    .shimmer{ position:relative; overflow:hidden; }
    .shimmer::after{ content:''; position:absolute; inset:0; opacity:0; pointer-events:none;
      background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.06) 50%,transparent 60%);
      transition:opacity .3s; }
    .shimmer:hover::after{ opacity:1; animation:ust-shimmer .8s ease forwards; }
    @keyframes ust-shimmer{ 0%{ transform:translateX(-100%) skewX(-12deg);} 100%{ transform:translateX(200%) skewX(-12deg);} }

    .spotlight-card{ position:relative; overflow:hidden; transform-style:preserve-3d; }
    .spotlight-card::before{ content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; opacity:0;
      transition:opacity .3s; background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%), var(--sp,rgba(0,240,255,.15)), transparent 70%); }
    .spotlight-card:hover::before{ opacity:1; }

    @media (prefers-reduced-motion: reduce){
      .ust-root *{ animation-duration:.01ms !important; transition-duration:.01ms !important; }
    }
  `}</style>
);

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, scale = false, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`${scale ? 'reveal-scale' : 'reveal'} ${inView ? 'in' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}>
      {children}
    </div>
  );
}

function useCountUp(end, inView, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) raf = requestAnimationFrame(step); else setN(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return n;
}

function MagneticButton({ children, className = '', onClick, href, target, style }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    setPos({ x: mx * 0.22, y: my * 0.22 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={target ? 'noreferrer' : undefined}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`magnetic inline-flex items-center ${className}`}
      style={{ transform: `translate(${pos.x}px,${pos.y}px)`, ...style }}
    >
      {children}
    </Tag>
  );
}

function BlueprintGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, raf;
    const mouse = { x: -1000, y: -1000 };
    const gridSize = 46;

    const resize = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };
    resize();
    const onResize = () => resize();
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);

    let t = 0;
    const draw = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(136,146,168,0.05)';
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
      for (let y = 0; y < height; y += gridSize) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
      ctx.stroke();

      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize, y = j * gridSize;
          const dx = mouse.x - x, dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 170;
          let alpha = 0.12, radius = 1.4, color = 'rgba(136,146,168,';
          if (dist < maxDist) {
            const f = 1 - dist / maxDist;
            alpha = 0.12 + f * 0.75;
            radius = 1.4 + f * 2.2;
            color = dist < 38 ? 'rgba(245,158,11,' : 'rgba(0,240,255,';
          } else {
            alpha += Math.max(0, Math.sin(t + (i + j) * 0.3) * 0.04);
          }
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${alpha})`;
          ctx.fill();
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0,240,255,${(1 - dist / 95) * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

function BlueprintCore() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    let renderer, raf;
    let disposed = false;

    try {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let width = container.clientWidth || 400;
      let height = container.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 7);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      const coreGeo = new THREE.IcosahedronGeometry(1.7, 1);
      const coreEdges = new THREE.EdgesGeometry(coreGeo);
      const coreMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.55 });
      const coreLines = new THREE.LineSegments(coreEdges, coreMat);

      const shellGeo = new THREE.IcosahedronGeometry(2.65, 0);
      const shellEdges = new THREE.EdgesGeometry(shellGeo);
      const shellMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.16 });
      const shellLines = new THREE.LineSegments(shellEdges, shellMat);

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute('position', coreGeo.attributes.position.clone());
      const nodeMat = new THREE.PointsMaterial({ color: 0x70f8ff, size: 0.055, transparent: true, opacity: 0.85, sizeAttenuation: true });
      const nodePoints = new THREE.Points(nodeGeo, nodeMat);

      const count = 220;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3.6 + Math.random() * 2.4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({ color: 0x8892a8, size: 0.026, transparent: true, opacity: 0.45 });
      const particles = new THREE.Points(particleGeo, particleMat);

      const glowGeo = new THREE.SphereGeometry(0.42, 24, 24);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending });
      const glow = new THREE.Mesh(glowGeo, glowMat);

      const spinGroup = new THREE.Group();
      spinGroup.add(coreLines, nodePoints, glow);

      const tiltGroup = new THREE.Group();
      tiltGroup.add(spinGroup, shellLines);

      scene.add(tiltGroup);
      scene.add(particles);

      let targetRotX = 0, targetRotY = 0.3;
      let curRotX = 0, curRotY = 0.3;

      const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        targetRotY = 0.3 + nx * 0.5;
        targetRotX = ny * 0.32;
      };
      window.addEventListener('mousemove', onMouseMove);

      const onResize = () => {
        width = container.clientWidth || width;
        height = container.clientHeight || height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', onResize);

      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        const t = clock.getElapsedTime();
        if (!prefersReduced) {
          spinGroup.rotation.y += 0.0032;
          spinGroup.rotation.x += 0.0006;
          shellLines.rotation.y -= 0.0014;
          shellLines.rotation.x += 0.0007;
          particles.rotation.y += 0.0006;
          const s = 1 + Math.sin(t * 1.4) * 0.14;
          glow.scale.set(s, s, s);
          nodeMat.opacity = 0.65 + Math.sin(t * 2) * 0.2;
        }
        curRotX += (targetRotX - curRotX) * 0.045;
        curRotY += (targetRotY - curRotY) * 0.045;
        tiltGroup.rotation.x = curRotX;
        tiltGroup.rotation.y = curRotY;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        [coreGeo, coreEdges, shellGeo, shellEdges, nodeGeo, particleGeo, glowGeo].forEach((g) => g.dispose());
        [coreMat, shellMat, nodeMat, particleMat, glowMat].forEach((m) => m.dispose());
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    } catch (err) {
      return () => { };
    }
  }, []);

  return <div ref={mountRef} className="absolute inset-0" style={{ pointerEvents: 'none' }} />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) { setActive(item.id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[200]" style={{ background: 'var(--sapphire)', transformOrigin: 'left', transform: `scaleX(${progress})`, transition: 'transform .1s linear' }} />
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
        background: scrolled ? 'rgba(18,18,18,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(136,146,168,0.15)' : '1px solid transparent',
        padding: scrolled ? '14px 0' : '20px 0',
      }}>
        <div className="container-custom flex justify-between items-center">
          <a href="#hero" onClick={go('hero')} className="flex items-center gap-2 u-font-display font-bold text-lg u-white">
            <span className="w-7 h-7 rounded flex items-center justify-center text-[11px] u-font-mono font-bold" style={{ background: 'var(--sapphire)', color: '#00131a' }}>UST</span>
            <span className="u-ice">Upendra</span>
          </a>

          <div className="hidden md:flex items-center gap-1 rounded-full px-3 py-1.5" style={{ background: 'rgba(18,18,18,0.6)', border: '1px solid rgba(136,146,168,0.15)' }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={go(item.id)} className={`nav-pill ${active === item.id ? 'active' : ''}`}>
                {item.label}
                <span className="nav-underline" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="px-4 py-1.5 text-xs u-font-display font-semibold rounded-lg transition-shadow" style={{ background: 'var(--sapphire)', color: '#00131a' }}>
              Resume ↗
            </a>
          </div>

          <button className="md:hidden p-2 rounded-lg u-steel" style={{ border: '1px solid rgba(136,146,168,0.2)' }} onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-3 mt-3" style={{ background: 'var(--slate-deep)', borderTop: '1px solid rgba(136,146,168,0.15)' }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={go(item.id)} className="text-sm font-medium u-steel">{item.label}</a>
            ))}
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold u-sapphire">Resume ↗</a>
          </div>
        )}
      </nav>
    </>
  );
}

function Hero() {
  const [scrollFx, setScrollFx] = useState({ opacity: 1, y: 0 });
  const heroRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(window.scrollY / 700, 1);
      setScrollFx({ opacity: 1 - p, y: -60 * p });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [lettersIn, setLettersIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLettersIn(true), 80); return () => clearTimeout(t); }, []);

  const handleHeroMove = (event) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCursor({ x, y, visible: true });
  };

  const AnimatedText = ({ text, gradient }) => (
    <span className="inline-block">
      {text.split('').map((ch, i) => (
        <span key={i} className={gradient ? 'accent-gradient' : ''} style={{
          display: 'inline-block', opacity: lettersIn ? 1 : 0,
          transform: lettersIn ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity .5s cubic-bezier(.16,1,.3,1) ${i * 28}ms, transform .5s cubic-bezier(.16,1,.3,1) ${i * 28}ms`,
        }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );

  return (
    <div id="hero" ref={heroRef} className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden" style={{ opacity: scrollFx.opacity, transform: `translateY(${scrollFx.y}px)` }} onMouseMove={handleHeroMove} onMouseLeave={() => setCursor((prev) => ({ ...prev, visible: false }))}>
      <div className="hero-cursor-lens" style={{ left: cursor.x, top: cursor.y, opacity: cursor.visible ? 1 : 0, transform: `translate(-50%, -50%) scale(${cursor.visible ? 1 : 0.7})` }} />
      <BlueprintGrid />
      <div className="container-custom relative w-full" style={{ zIndex: 1 }}>
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--sapphire)', animation: 'ust-pulse 2s ease-in-out infinite' }} />
              <span className="text-xs u-ice">Gwalior, Madhya Pradesh · Open to ML/AI roles</span>
            </div>

            <h1 className="text-display-xl u-font-display u-white m-0">
              <span className="block overflow-hidden pb-1"><AnimatedText text="Upendra Singh" /></span>
              <span className="block overflow-hidden pb-2"><AnimatedText text="Tomar" gradient /></span>
            </h1>

            <p className="mt-6 text-lg u-steel leading-relaxed max-w-xl" style={{ opacity: lettersIn ? 1 : 0, transform: lettersIn ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity .5s ease .6s, transform .5s ease .6s' }}>
              Data Science undergraduate building end-to-end ML applications — from real-time patient triage dashboards to unsupervised generative AI systems — with two published research papers.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5" style={{ opacity: lettersIn ? 1 : 0, transform: lettersIn ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity .5s ease .8s, transform .5s ease .8s' }}>
              <MagneticButton href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-7 py-3.5 rounded-xl text-sm u-font-display font-bold" style={{ background: 'var(--sapphire)', color: '#00131a' }}>
                View Projects
              </MagneticButton>
              <MagneticButton href={RESUME_URL} target="_blank" className="px-7 py-3.5 rounded-xl text-sm u-font-display font-bold gap-2 glass-panel">
                <FileText className="w-4 h-4" /> Download Resume
              </MagneticButton>
              <div className="flex items-center gap-2 pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                {SOCIALS.map((s) => (
                  <MagneticButton key={s.label} href={s.href} target={s.href.startsWith('http') || s.href.startsWith('mailto') ? '_blank' : undefined}
                    className="w-11 h-11 rounded-xl glass-panel items-center justify-center u-steel hover:text-white">
                    <s.icon className="w-4 h-4" />
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block" style={{ aspectRatio: '1 / 1', width: '100%' }}>
            <BlueprintCore />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 u-steel" style={{ transform: 'translateX(-50%)', zIndex: 1 }}>
        <span className="text-[10px] u-font-mono tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-9" style={{ background: 'linear-gradient(to bottom, rgba(136,146,168,.6), transparent)', animation: 'ust-pulse 1.6s ease-in-out infinite' }} />
      </div>
    </div>
  );
}

function StatCard({ s, i }) {
  const [ref, inView] = useInView();
  const n = useCountUp(s.value, inView, 1200);
  return (
    <div ref={ref} className="reveal in" style={{ transitionDelay: `${i * 120}ms` }}>
      <p className="text-3xl md:text-4xl font-black u-font-display accent-gradient">{n}+</p>
      <p className="mt-2 text-xs u-steel leading-relaxed">{s.label}</p>
    </div>
  );
}

function About() {
  return (
    <div id="about" className="section-shell">
      <div className="container-custom relative">
        <Reveal><div className="mb-12 max-w-2xl">
          <span className="section-kicker">About &amp; Skills</span>
          <h2 className="section-title">Background &amp; Expertise</h2>
          <p className="section-lead mt-4">A practical mix of machine learning, product thinking, and deployment discipline — from data and model selection to interfaces people can actually use.</p>
        </div></Reveal>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          <Reveal className="md:col-span-3" delay={80}>
            <div className="surface-card p-8 space-y-5">
              <p className="text-lg u-steel leading-relaxed">
                I'm a Data Science undergraduate at the Institute of Technology and Management, Gwalior, currently in my third year. I build machine learning applications end to end — from data pipeline to deployed interface — using Python, TensorFlow, Scikit-Learn, PostgreSQL, and React.js.
              </p>
              <p className="text-lg u-steel leading-relaxed">
                My project work spans healthcare analytics and automated resume classification, and I've co-authored published research on AI-driven sustainability in pharmaceutical logistics and generative AI for carbon capture materials.
              </p>
              <p className="text-lg u-steel leading-relaxed">
                Right now I'm most interested in machine learning engineering and intelligent data systems — the layer between a trained model and something people can actually use.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-2 space-y-6">
            <Reveal delay={140}>
              <div className="surface-card p-8">
                {SKILLS.map((group, i) => (
                  <div key={group.group} className={i > 0 ? 'mt-7' : ''}>
                    <p className="text-xs u-font-mono font-bold tracking-[0.15em] u-sapphire uppercase mb-3">{group.group}</p>
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((item) => (
                        <div key={item.name} className="chip flex items-center gap-2">
                          <item.icon className="w-3.5 h-3.5 u-steel" />
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="surface-card p-8 grid grid-cols-3 gap-4">
                {STATS.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <div id="experience" className="section-shell">
      <div className="container-custom">
        <Reveal><div className="mb-12 max-w-2xl">
          <span className="section-kicker">Timeline</span>
          <h2 className="section-title">Education &amp; Involvement</h2>
          <p className="section-lead mt-4">A short timeline of the academic and performance work that shapes how I collaborate, present ideas, and ship carefully.</p>
        </div></Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="surface-card shimmer p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <item.icon className="w-6 h-6 u-sapphire" />
                  </div>
                  <span className="text-xs u-font-mono font-bold tracking-wider u-sapphire px-3 py-1 rounded-full uppercase" style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}>
                    {item.period}
                  </span>
                </div>
                <h3 className="text-2xl u-font-display font-bold u-white mb-2">{item.title}</h3>
                <p className="text-sm font-medium u-steel mb-4" style={{ opacity: 0.8 }}>{item.org}</p>
                <p className="text-sm u-steel leading-relaxed">{item.description}</p>
                <div className="mt-7 pt-5 flex flex-wrap gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {item.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function Certifications() {
  return (
    <div id="certifications" className="section-shell">
      <div className="container-custom">
        <Reveal><div className="mb-12 max-w-2xl">
          <span className="section-kicker">Certifications</span>
          <h2 className="section-title">Verified Credentials &amp; Coursework</h2>
          <p className="section-lead mt-4">Certificates, internship completions, and the coursework backbone that supports the ML and data work shown elsewhere.</p>
        </div></Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.file} delay={i * 60}>
              <a href={cert(c.file)} target="_blank" rel="noreferrer" className="surface-card shimmer p-6 flex flex-col justify-between h-full group" style={{ minHeight: 150 }}>
                <h3 className="u-font-display font-bold u-white text-base leading-snug">{c.title}</h3>
                <div className="mt-6 flex items-center gap-2 text-xs u-sapphire font-semibold">
                  <Eye className="w-3.5 h-3.5" /> View certificate <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 surface-card p-8">
            <p className="text-xs u-font-mono font-bold tracking-[0.15em] u-sapphire uppercase mb-5">Relevant Academic Coursework</p>
            <div className="flex flex-wrap gap-2.5">
              {COURSEWORK.map((item) => <span key={item} className="chip">{item}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function SpotlightCard({ p, i }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    ref.current.style.setProperty('--mx', `${mx}px`);
    ref.current.style.setProperty('--my', `${my}px`);
    const rotateY = ((mx / r.width) - 0.5) * 8;
    const rotateX = ((my / r.height) - 0.5) * -8;
    setTilt({ x: rotateX, y: rotateY });
  };
  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <Reveal delay={i * 100} className={p.big ? 'md:col-span-2 md:row-span-2' : ''}>
      <a
        ref={ref}
        href={p.demo} target="_blank" rel="noreferrer"
        onMouseMove={handleMove} onMouseLeave={reset}
        className="spotlight-card surface-card shimmer p-8 flex flex-col justify-between h-full"
        style={{
          minHeight: p.big ? 340 : 300,
          '--sp': `${p.accent}26`,
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform .15s ease-out',
        }}
      >
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs u-font-mono font-bold tracking-[0.18em] u-steel uppercase">Case Study {String(i + 1).padStart(2, '0')}</p>
            <span className="w-9 h-9 rounded-full flex items-center justify-center u-steel" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <h3 className="mt-5 text-2xl u-font-display font-bold u-white leading-tight">{p.title}</h3>
          <p className="mt-3 text-sm u-steel leading-relaxed">{p.description}</p>
        </div>
        <div className="relative mt-6 pt-5 flex flex-wrap gap-2" style={{ zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {p.stack.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </a>
    </Reveal>
  );
}

function Projects() {
  return (
    <div id="projects" className="section-shell">
      <div className="container-custom">
        <Reveal><div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-2xl">
            <span className="section-kicker">Selected Work</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <a href="https://github.com/upendra-sin1100" target="_blank" rel="noreferrer" className="text-sm font-bold u-steel flex items-center gap-1.5">
            More on GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </div></Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ gridAutoRows: 'minmax(300px,auto)' }}>
          {PROJECTS.map((p, i) => <SpotlightCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </div>
  );
}

function Publications() {
  return (
    <div id="publications" className="section-shell">
      <div className="container-custom">
        <Reveal><div className="mb-12 max-w-2xl">
          <span className="section-kicker">Research</span>
          <h2 className="section-title">Published Research Papers</h2>
          <p className="section-lead mt-4">Two papers that sit between applied machine learning and practical systems thinking.</p>
        </div></Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {PUBLICATIONS.map((pub, i) => (
            <Reveal key={pub.title} delay={i * 120}>
              <div className="surface-card p-7 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block text-xs u-font-mono font-bold tracking-wider u-amber uppercase mb-2">{pub.venue}</span>
                  <h3 className="text-xl u-font-display font-bold u-white leading-snug">{pub.title}</h3>
                  <p className="mt-3 text-sm u-steel leading-relaxed">{pub.description}</p>
                  <div className="mt-4 space-y-1 text-xs" style={{ color: 'rgba(228,232,240,0.8)' }}>
                    <p className="font-medium u-ice">{pub.publisher}</p>
                    <p className="u-font-mono" style={{ opacity: 0.6 }}>{pub.details}</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3 pt-4" style={{ borderTop: '1px solid rgba(136,146,168,0.1)' }}>
                  <a href={pub.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg px-4 py-2 text-xs font-semibold" style={{ background: 'var(--sapphire)', color: '#00131a' }}>Read Paper ↗</a>
                  <a href={pub.certificate} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg px-4 py-2 text-xs font-medium u-ice" style={{ border: '1px solid rgba(136,146,168,0.2)' }}>View Certificate</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div id="contact" className="section-shell" style={{ paddingBottom: '4rem' }}>
      <div className="container-custom">
        <Reveal>
          <div className="surface-card-strong p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <span className="section-kicker">Get In Touch</span>
                <h2 className="section-title max-w-xl" style={{ lineHeight: 0.98 }}>Let's build something worth shipping.</h2>
                <p className="section-lead mt-4">Open to machine learning engineering and data science roles, internships, and collaborations where design, systems, and research matter together.</p>
                <MagneticButton href="mailto:upendratomar1100@gmail.com" className="mt-8 px-7 py-3 rounded-lg text-sm font-semibold" style={{ background: 'var(--sapphire)', color: '#00131a' }}>
                  Say Hello ↗
                </MagneticButton>
              </div>

              <div className="surface-card p-6 md:p-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  {CONTACT.map((c) => (
                    <div key={c.label} className="rounded-2xl p-4" style={{ background: 'rgba(10,10,10,0.45)', border: '1px solid rgba(136,146,168,0.15)' }}>
                      <p className="text-[11px] u-font-mono font-bold tracking-[0.16em] uppercase u-sapphire">{c.label}</p>
                      {c.href ? <a href={c.href} className="mt-2 block text-sm u-ice break-words">{c.value}</a> : <span className="mt-2 block text-sm u-ice break-words">{c.value}</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl p-4" style={{ border: '1px solid rgba(136,146,168,0.15)', background: 'rgba(10,10,10,0.45)' }}>
                  <p className="text-[11px] u-font-mono font-bold tracking-[0.16em] uppercase u-steel">Quick Links</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SOCIALS.map((s) => (
                      <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold u-ice" style={{ border: '1px solid rgba(136,146,168,0.2)', background: 'rgba(18,18,18,0.6)' }}>
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs pt-6" style={{ color: 'rgba(136,146,168,0.6)', borderTop: '1px solid rgba(136,146,168,0.1)' }}>
          <p>© {new Date().getFullYear()} Upendra Singh Tomar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="font-medium u-steel">{s.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-lg flex items-center justify-center u-ice"
      style={{ background: 'var(--slate-deep)', border: '1px solid rgba(136,146,168,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none" style={{ zIndex: -1 }}>
      <div className="absolute inset-0" style={{ background: 'var(--void)' }} />
      <div className="orb" style={{ top: '-15%', left: '5%', width: 620, height: 620, background: 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 70%)', animationDuration: '24s' }} />
      <div className="orb" style={{ bottom: '-10%', right: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)', animationDuration: '30s' }} />
      <div className="absolute inset-0" style={{ opacity: 0.035, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="ust-root min-h-screen">
      <GlobalStyle />
      <AmbientBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <div className="section-divider container-custom" />
        <About />
        <div className="section-divider container-custom" />
        <Experience />
        <div className="section-divider container-custom" />
        <Certifications />
        <div className="section-divider container-custom" />
        <Projects />
        <div className="section-divider container-custom" />
        <Publications />
        <div className="section-divider container-custom" />
        <Footer />
      </main>
      <ScrollToTop />
    </div>
  );
}

