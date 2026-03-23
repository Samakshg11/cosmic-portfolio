/**
 * COSMIC PORTFOLIO ENGINE
 * components/planets-data.js — Planet config and lazy content builders
 *
 * Each planet's `content` is a function so it's never evaluated until
 * the user actually zooms in. Keeps initial load cost near zero.
 */

'use strict';

export const PLANETS = [
  /* ── 0: ABOUT ──────────────────────────────────────────────── */
  {
    id:       'about',
    name:     'AETHER',
    subtitle: 'About Me',
    radius:   170,
    size:     38,
    speed:    1.0,
    phase:    0.4,
    tilt:     0.14,
    color:    '#7b6fff',
    gradient: 'radial-gradient(circle at 32% 28%, #a99fff 0%, #7b6fff 40%, #3d2fa0 80%, #1a1040 100%)',
    content: () => `
      <div class="panel-section">
        <h3>Hello, Universe</h3>
        <p style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted);line-height:1.75">
          I'm <strong style="color:var(--text-primary)">Alex Nova</strong> — a full-stack engineer
          and creative technologist crafting digital experiences that live at the intersection
          of performance, design, and storytelling. Currently building the future at
          <strong style="color:var(--teal)">Nebula Labs</strong>.
        </p>
      </div>
      <div class="panel-section">
        <h3>At a Glance</h3>
        <div class="stat-grid">
          <div class="stat-box"><div class="stat-num">6+</div><div class="stat-lbl">Years Exp</div></div>
          <div class="stat-box"><div class="stat-num">40+</div><div class="stat-lbl">Projects</div></div>
          <div class="stat-box"><div class="stat-num">12</div><div class="stat-lbl">OSS Repos</div></div>
          <div class="stat-box"><div class="stat-num">3</div><div class="stat-lbl">Companies</div></div>
        </div>
      </div>
      <div class="panel-section">
        <h3>Currently</h3>
        <p style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);line-height:1.6">
          🌍 Based in San Francisco<br>
          💼 Senior Engineer @ Nebula Labs<br>
          🎯 Focused on WebGPU & Edge computing<br>
          ✍️ Writing about systems design
        </p>
      </div>
    `,
  },

  /* ── 1: SKILLS ──────────────────────────────────────────────── */
  {
    id:       'skills',
    name:     'FORGE',
    subtitle: 'Skills & Stack',
    radius:   260,
    size:     44,
    speed:    0.72,
    phase:    1.2,
    tilt:     0.13,
    color:    '#52e3c2',
    gradient: 'radial-gradient(circle at 35% 30%, #8ffce5 0%, #52e3c2 40%, #1a9e85 75%, #0a3d30 100%)',
    content: () => `
      <div class="panel-section">
        <h3>Frontend</h3>
        <div class="skill-grid">
          ${['React', 'TypeScript', 'Next.js', 'Svelte', 'Three.js', 'WebGL', 'CSS/Animations'].map(s =>
            `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div class="panel-section">
        <h3>Backend</h3>
        <div class="skill-grid">
          ${['Node.js', 'Rust', 'Go', 'PostgreSQL', 'Redis', 'GraphQL', 'REST', 'gRPC'].map(s =>
            `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div class="panel-section">
        <h3>Infrastructure</h3>
        <div class="skill-grid">
          ${['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Vercel', 'CI/CD'].map(s =>
            `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div class="panel-section">
        <h3>Proficiency</h3>
        ${[
          { name: 'TypeScript / JS', pct: 95 },
          { name: 'Rust',            pct: 78 },
          { name: 'System Design',   pct: 88 },
          { name: 'UX / Design',     pct: 82 },
        ].map(b => `
          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px">
              <span style="font-family:var(--font-mono);font-size:10px">${b.name}</span>
              <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted)">${b.pct}%</span>
            </div>
            <div style="height:3px;background:var(--border);border-radius:2px">
              <div style="height:100%;width:${b.pct}%;background:linear-gradient(90deg,var(--teal),var(--accent));border-radius:2px;transition:width 0.8s"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `,
  },

  /* ── 2: PROJECTS ────────────────────────────────────────────── */
  {
    id:       'projects',
    name:     'ATLAS',
    subtitle: 'Featured Work',
    radius:   360,
    size:     50,
    speed:    0.55,
    phase:    2.5,
    tilt:     0.11,
    color:    '#ffd47e',
    gradient: 'radial-gradient(circle at 30% 28%, #fff2b8 0%, #ffd47e 35%, #e8960a 75%, #6b3a00 100%)',
    content: () => `
      <div class="panel-section">
        <h3>Featured Projects</h3>
        ${[
          {
            name: 'VoidDB',
            desc: 'Distributed key-value store in Rust with Raft consensus. 2M ops/sec on commodity hardware.',
            tag: '⚡ Rust · Raft · gRPC',
          },
          {
            name: 'Lumina UI',
            desc: 'Open-source component library with GPU-accelerated animations. 4k GitHub stars.',
            tag: '★ React · WebGL · 4.1k ⭐',
          },
          {
            name: 'EdgeStream',
            desc: 'Real-time video transcoding at the edge. 40% cost reduction vs cloud-only solutions.',
            tag: '🌐 Go · Cloudflare · WASM',
          },
          {
            name: 'CosmicCMS',
            desc: 'Headless CMS with live collaboration built on CRDTs. Powers 200+ production sites.',
            tag: '🧩 Node · CRDTs · GraphQL',
          },
        ].map(p => `
          <div class="project-card">
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
            <p style="margin-top:6px;color:var(--accent);font-size:10px">${p.tag}</p>
          </div>
        `).join('')}
      </div>
    `,
  },

  /* ── 3: EXPERIENCE ──────────────────────────────────────────── */
  {
    id:       'experience',
    name:     'KRONOS',
    subtitle: 'Work History',
    radius:   460,
    size:     34,
    speed:    0.42,
    phase:    0.9,
    tilt:     0.10,
    color:    '#ff8080',
    gradient: 'radial-gradient(circle at 32% 28%, #ffb8b8 0%, #ff8080 38%, #cc2222 78%, #550000 100%)',
    content: () => `
      <div class="panel-section">
        <h3>Timeline</h3>
        <div class="timeline-item">
          <div class="timeline-year">2023 — Present</div>
          <div class="timeline-title">Senior Staff Engineer</div>
          <div class="timeline-sub">Nebula Labs · San Francisco</div>
        </div>
        <div class="timeline-item">
          <div class="timeline-year">2021 — 2023</div>
          <div class="timeline-title">Principal Engineer</div>
          <div class="timeline-sub">Vertex Systems · Remote</div>
        </div>
        <div class="timeline-item">
          <div class="timeline-year">2019 — 2021</div>
          <div class="timeline-title">Senior Full-Stack Engineer</div>
          <div class="timeline-sub">Quasar IO · New York</div>
        </div>
        <div class="timeline-item">
          <div class="timeline-year">2018 — 2019</div>
          <div class="timeline-title">Software Engineer</div>
          <div class="timeline-sub">Polaris Tech · Boston</div>
        </div>
      </div>
      <div class="panel-section">
        <h3>Education</h3>
        <div class="timeline-item">
          <div class="timeline-year">2014 — 2018</div>
          <div class="timeline-title">B.S. Computer Science</div>
          <div class="timeline-sub">MIT · Magna Cum Laude</div>
        </div>
      </div>
    `,
  },

  /* ── 4: OPEN SOURCE ─────────────────────────────────────────── */
  {
    id:       'opensource',
    name:     'NEXUS',
    subtitle: 'Open Source',
    radius:   340,
    size:     30,
    speed:    0.65,
    phase:    4.1,
    tilt:     0.16,
    color:    '#a0d4ff',
    gradient: 'radial-gradient(circle at 32% 28%, #e0f2ff 0%, #a0d4ff 38%, #3090e0 78%, #0a3060 100%)',
    content: () => `
      <div class="panel-section">
        <h3>Open Source Contributions</h3>
        <p style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:14px">
          Passionate about building in public. 1,200+ commits across 12 repositories.
        </p>
        ${[
          { name: 'lumina-ui', stars: '4.1k', desc: 'GPU-accelerated React components' },
          { name: 'voiddb',    stars: '2.8k', desc: 'Distributed KV store in Rust' },
          { name: 'edgeq',     stars: '1.2k', desc: 'Edge-first job queue system' },
          { name: 'cssmagic',  stars: '980',  desc: 'Zero-runtime CSS animation DSL' },
        ].map(r => `
          <div class="project-card">
            <h4 style="font-family:var(--font-mono)">⬡ ${r.name}</h4>
            <p>${r.desc} &nbsp;·&nbsp; ★ ${r.stars}</p>
          </div>
        `).join('')}
      </div>
    `,
  },

  /* ── 5: WRITING ─────────────────────────────────────────────── */
  {
    id:       'writing',
    name:     'LYRA',
    subtitle: 'Blog & Writing',
    radius:   510,
    size:     28,
    speed:    0.35,
    phase:    3.3,
    tilt:     0.09,
    color:    '#e8a0ff',
    gradient: 'radial-gradient(circle at 32% 28%, #f8d8ff 0%, #e8a0ff 38%, #9030c0 78%, #300050 100%)',
    content: () => `
      <div class="panel-section">
        <h3>Recent Articles</h3>
        ${[
          { title: 'Why Rust Outperforms Go for Systems Work',      date: 'Mar 2026', read: '8 min' },
          { title: 'WebGPU: The Future of Browser Graphics',        date: 'Feb 2026', read: '12 min' },
          { title: 'Building a 10M RPS API with Edge Functions',    date: 'Jan 2026', read: '6 min' },
          { title: 'CRDTs Explained: Conflict-Free Collaboration',  date: 'Dec 2025', read: '10 min' },
        ].map(a => `
          <div class="project-card" style="cursor:pointer">
            <h4 style="font-size:12px">${a.title}</h4>
            <p style="margin-top:5px">${a.date} &nbsp;·&nbsp; ${a.read} read</p>
          </div>
        `).join('')}
      </div>
    `,
  },

  /* ── 6: DESIGN ──────────────────────────────────────────────── */
  {
    id:       'design',
    name:     'PIXEL',
    subtitle: 'Design Work',
    radius:   220,
    size:     26,
    speed:    0.88,
    phase:    5.5,
    tilt:     0.15,
    color:    '#ff9f52',
    gradient: 'radial-gradient(circle at 32% 28%, #ffcc99 0%, #ff9f52 38%, #c04010 78%, #3d0f00 100%)',
    content: () => `
      <div class="panel-section">
        <h3>Design Portfolio</h3>
        <p style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:14px">
          Selected UI/UX and visual design projects from 2023–2026.
        </p>
        <div class="stat-grid">
          <div class="stat-box"><div class="stat-num">18</div><div class="stat-lbl">UI Systems</div></div>
          <div class="stat-box"><div class="stat-num">6</div><div class="stat-lbl">Brand Kits</div></div>
          <div class="stat-box"><div class="stat-num">99</div><div class="stat-lbl">Figma Score</div></div>
          <div class="stat-box"><div class="stat-num">3k</div><div class="stat-lbl">Dribbble ♥</div></div>
        </div>
      </div>
      <div class="panel-section">
        <h3>Tools</h3>
        <div class="skill-grid">
          ${['Figma', 'Framer', 'Spline', 'Rive', 'Adobe XD', 'Principle'].map(s =>
            `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
    `,
  },

  /* ── 7: CONTACT ─────────────────────────────────────────────── */
  {
    id:       'contact',
    name:     'BEACON',
    subtitle: 'Get In Touch',
    radius:   600,
    size:     36,
    speed:    0.28,
    phase:    1.8,
    tilt:     0.08,
    color:    '#60d090',
    gradient: 'radial-gradient(circle at 32% 28%, #a0ffc0 0%, #60d090 38%, #208050 78%, #062818 100%)',
    content: () => `
      <div class="panel-section">
        <h3>Let's Connect</h3>
        <p style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:14px">
          Open to interesting projects, collaborations, and conversations.
          Response time: usually under 24 hours.
        </p>
        <a class="contact-link" href="mailto:alex@cosmicdeveloper.io">
          <div class="contact-icon" style="background:rgba(96,208,144,0.15)">📧</div>
          alex@cosmicdeveloper.io
        </a>
        <a class="contact-link" href="https://github.com/alexnova" target="_blank">
          <div class="contact-icon" style="background:rgba(255,255,255,0.07)">⬡</div>
          github.com/alexnova
        </a>
        <a class="contact-link" href="https://linkedin.com/in/alexnova" target="_blank">
          <div class="contact-icon" style="background:rgba(100,160,255,0.12)">in</div>
          linkedin.com/in/alexnova
        </a>
        <a class="contact-link" href="https://twitter.com/alexnova" target="_blank">
          <div class="contact-icon" style="background:rgba(100,200,255,0.1)">𝕏</div>
          @alexnova
        </a>
      </div>
      <div class="panel-section">
        <h3>Availability</h3>
        <div class="project-card">
          <h4 style="color:var(--teal)">✓ Open to Freelance</h4>
          <p>Limited slots available for Q2 2026. Min 3-month engagements.</p>
        </div>
        <div class="project-card">
          <h4 style="color:var(--gold)">✦ Speaking</h4>
          <p>Available for conferences and podcasts on systems design & performance.</p>
        </div>
      </div>
    `,
  },
];
