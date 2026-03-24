/**
 * Cosmic Portfolio data model for the infinite-zoom experience.
 * Content is split into preview, surface, and deep layers so we can
 * lazy-inject richer markup only when the camera reaches the threshold.
 */

'use strict';

export const INTRO_COPY = {
  kicker: 'Infinite Zoom Portfolio',
  title: 'Cosmic Portfolio',
  description:
    'Scroll to descend through orbit, atmosphere, and surface. Drag to drift across the system. Every story reveals itself only through depth.',
  hint: 'Scroll to enter the universe',
};

export const PLANETS = [
  {
    id: 'about',
    name: 'AETHER',
    subtitle: 'Identity Signal',
    radius: 180,
    size: 44,
    speed: 1.0,
    phase: 0.45,
    tilt: 0.17,
    color: '#8f86ff',
    gradient: 'radial-gradient(circle at 32% 28%, #d4cfff 0%, #8f86ff 42%, #4534aa 76%, #140f31 100%)',
    prompt: 'Keep descending to meet the builder behind the system.',
    preview: () => `
      <div class="zoom-card-grid compact-grid">
        <article class="zoom-card stat-card"><span class="stat-value">6+</span><span class="stat-label">years building</span></article>
        <article class="zoom-card stat-card"><span class="stat-value">40+</span><span class="stat-label">launches shipped</span></article>
      </div>
      <p class="zoom-copy">Full-stack engineer turning systems thinking into cinematic products.</p>
    `,
    surface: () => `
      <section class="content-block">
        <span class="content-kicker">Profile</span>
        <h3>Hello, universe</h3>
        <p>I am Alex Nova, a creative engineer focused on performance-heavy interfaces, spatial UX, and resilient backend systems. I like experiences that feel authored, not assembled.</p>
      </section>
      <section class="content-block two-col">
        <div>
          <span class="content-kicker">Current Orbit</span>
          <ul class="detail-list">
            <li>Senior engineer shaping immersive product systems</li>
            <li>Building with WebGL, realtime rendering, and edge infrastructure</li>
            <li>Exploring interaction models that feel physical and story-led</li>
          </ul>
        </div>
        <div>
          <span class="content-kicker">Operating Style</span>
          <ul class="detail-list muted">
            <li>Design-forward systems thinking</li>
            <li>Fast prototyping with production rigor</li>
            <li>Obsessive about motion, clarity, and performance</li>
          </ul>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-block">
        <span class="content-kicker">Deep Signal</span>
        <h3>How I work</h3>
        <div class="micro-grid">
          <article class="micro-card">
            <h4>Thought Process</h4>
            <p>Begin with feeling first, then reduce everything to interaction primitives: motion, latency, hierarchy, trust.</p>
          </article>
          <article class="micro-card">
            <h4>Stack Bias</h4>
            <p>TypeScript, graphics APIs, distributed services, and tooling that keeps iteration fast under pressure.</p>
          </article>
          <article class="micro-card">
            <h4>Favorite Problems</h4>
            <p>Realtime collaboration, data-rich interfaces, product storytelling, and interaction systems with depth.</p>
          </article>
        </div>
      </section>
    `,
  },
  {
    id: 'skills',
    name: 'FORGE',
    subtitle: 'Capability Matrix',
    radius: 285,
    size: 48,
    speed: 0.78,
    phase: 1.3,
    tilt: 0.14,
    color: '#63e6cb',
    gradient: 'radial-gradient(circle at 35% 30%, #b6fff0 0%, #63e6cb 42%, #1b8e78 76%, #072821 100%)',
    prompt: 'Zoom through the cloud deck to inspect the toolkit.',
    preview: () => `
      <div class="zoom-card-grid compact-grid">
        <article class="zoom-card"><span class="chip-title">Frontend</span><p>React, TypeScript, WebGL</p></article>
        <article class="zoom-card"><span class="chip-title">Backend</span><p>Node, Rust, Go</p></article>
      </div>
    `,
    surface: () => `
      <section class="content-block">
        <span class="content-kicker">Core Stack</span>
        <div class="skill-band">
          ${['React','TypeScript','Next.js','Svelte','WebGL','Three.js','Node.js','Rust','Go','PostgreSQL','Redis','Terraform'].map((skill) => `<span class="skill-orb">${skill}</span>`).join('')}
        </div>
      </section>
      <section class="content-block two-col">
        <div>
          <span class="content-kicker">Strengths</span>
          <ul class="detail-list">
            <li>Motion systems and immersive frontends</li>
            <li>Architecture for product scale and delivery speed</li>
            <li>Design translation from concept to shipped interface</li>
          </ul>
        </div>
        <div>
          <span class="content-kicker">Infra</span>
          <ul class="detail-list muted">
            <li>AWS, GCP, Vercel, Docker, CI pipelines</li>
            <li>Observability and performance budgets</li>
            <li>Pragmatic DevEx tooling</li>
          </ul>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-block">
        <span class="content-kicker">Precision Layer</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Animation</h4><p>Frame-stable transitions, motion language, scroll choreography, shader-friendly composition.</p></article>
          <article class="micro-card"><h4>Systems</h4><p>Event-driven services, API design, edge runtimes, queue-based processing, data modeling.</p></article>
          <article class="micro-card"><h4>Leadership</h4><p>Design reviews, technical direction, prototyping strategy, mentoring through ambiguity.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'projects',
    name: 'ATLAS',
    subtitle: 'Mission Archive',
    radius: 390,
    size: 54,
    speed: 0.56,
    phase: 2.5,
    tilt: 0.12,
    color: '#ffd57f',
    gradient: 'radial-gradient(circle at 30% 28%, #fff2c7 0%, #ffd57f 40%, #d68014 74%, #482100 100%)',
    prompt: 'The closer you get, the more launches emerge from the haze.',
    preview: () => `
      <div class="zoom-card-grid">
        <article class="zoom-card"><span class="chip-title">VoidDB</span><p>Rust distributed store</p></article>
        <article class="zoom-card"><span class="chip-title">Lumina UI</span><p>GPU-first component system</p></article>
        <article class="zoom-card"><span class="chip-title">EdgeStream</span><p>Realtime edge video pipeline</p></article>
      </div>
    `,
    surface: () => `
      <section class="content-block">
        <span class="content-kicker">Featured Missions</span>
        <div class="stacked-cards">
          <article class="zoom-card wide-card"><h4>VoidDB</h4><p>Distributed key-value engine in Rust with consensus-aware recovery and sustained high-throughput benchmarks.</p></article>
          <article class="zoom-card wide-card"><h4>Lumina UI</h4><p>Open-source design system pairing GPU-accelerated visuals with pragmatic product ergonomics.</p></article>
          <article class="zoom-card wide-card"><h4>EdgeStream</h4><p>Realtime ingest and transcoding platform that cut delivery cost while improving playback latency.</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-block">
        <span class="content-kicker">Case Study Layer</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Problem Framing</h4><p>Each project began by modeling the bottleneck first: throughput, UX friction, or infra cost.</p></article>
          <article class="micro-card"><h4>Build Method</h4><p>Prototype fast, instrument early, then narrow the surface area until the product feels inevitable.</p></article>
          <article class="micro-card"><h4>Outcomes</h4><p>Improved latency, clearer product stories, and systems sturdy enough for real user load.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'experience',
    name: 'KRONOS',
    subtitle: 'Timeline Orbit',
    radius: 500,
    size: 40,
    speed: 0.42,
    phase: 0.92,
    tilt: 0.1,
    color: '#ff8d8d',
    gradient: 'radial-gradient(circle at 32% 28%, #ffd0d0 0%, #ff8d8d 42%, #b62727 76%, #330808 100%)',
    prompt: 'Descend to read the trajectory line by line.',
    preview: () => `
      <div class="zoom-card-grid compact-grid">
        <article class="zoom-card stat-card"><span class="stat-value">3</span><span class="stat-label">lead roles</span></article>
        <article class="zoom-card stat-card"><span class="stat-value">8</span><span class="stat-label">years shipped</span></article>
      </div>
    `,
    surface: () => `
      <section class="content-block">
        <span class="content-kicker">Timeline</span>
        <div class="timeline-stream">
          <article class="timeline-node"><span>2023-Present</span><h4>Senior Staff Engineer</h4><p>Nebula Labs</p></article>
          <article class="timeline-node"><span>2021-2023</span><h4>Principal Engineer</h4><p>Vertex Systems</p></article>
          <article class="timeline-node"><span>2019-2021</span><h4>Senior Full-Stack Engineer</h4><p>Quasar IO</p></article>
          <article class="timeline-node"><span>2018-2019</span><h4>Software Engineer</h4><p>Polaris Tech</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-block">
        <span class="content-kicker">Leadership Layer</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Staffing</h4><p>Cross-team execution, system ownership, and architectural steering for product-critical work.</p></article>
          <article class="micro-card"><h4>Delivery</h4><p>Protected build velocity by turning vague asks into scoped, shippable systems.</p></article>
          <article class="micro-card"><h4>Mentorship</h4><p>Coached engineers through motion work, frontend architecture, and system design tradeoffs.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'opensource',
    name: 'NEXUS',
    subtitle: 'Open Source Relay',
    radius: 350,
    size: 32,
    speed: 0.64,
    phase: 4.2,
    tilt: 0.16,
    color: '#9cd8ff',
    gradient: 'radial-gradient(circle at 32% 28%, #edf8ff 0%, #9cd8ff 42%, #2d8bd8 74%, #0a2a4f 100%)',
    prompt: 'Public work resolves into view as you cross the relay field.',
    preview: () => `
      <div class="zoom-card-grid compact-grid">
        <article class="zoom-card stat-card"><span class="stat-value">12</span><span class="stat-label">public repos</span></article>
        <article class="zoom-card stat-card"><span class="stat-value">1.2k+</span><span class="stat-label">commits</span></article>
      </div>
    `,
    surface: () => `
      <section class="content-block">
        <span class="content-kicker">Repositories</span>
        <div class="stacked-cards">
          <article class="zoom-card wide-card"><h4>lumina-ui</h4><p>GPU-accelerated components focused on expressive product interfaces.</p></article>
          <article class="zoom-card wide-card"><h4>voiddb</h4><p>Distributed KV store experiments around reliability, throughput, and consensus.</p></article>
          <article class="zoom-card wide-card"><h4>edgeq</h4><p>Queue system tuned for edge-first compute and simplified deployment.</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-block">
        <span class="content-kicker">Why Open Source</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Testing Ground</h4><p>Where product ideas get pressure-tested in public.</p></article>
          <article class="micro-card"><h4>Teaching Tool</h4><p>Readable code and thoughtful demos help others move faster.</p></article>
          <article class="micro-card"><h4>Signal</h4><p>Shows how I think when no one is simplifying the problem for me.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'writing',
    name: 'LYRA',
    subtitle: 'Signal Essays',
    radius: 560,
    size: 30,
    speed: 0.35,
    phase: 3.32,
    tilt: 0.09,
    color: '#e6a5ff',
    gradient: 'radial-gradient(circle at 32% 28%, #f8dfff 0%, #e6a5ff 42%, #8a2bb4 74%, #2b0534 100%)',
    prompt: 'Text fragments sharpen into essays as you close in.',
    preview: () => `
      <div class="zoom-card-grid compact-grid">
        <article class="zoom-card"><span class="chip-title">Systems</span><p>performance, architecture, edge</p></article>
        <article class="zoom-card"><span class="chip-title">Graphics</span><p>WebGPU, motion, rendering</p></article>
      </div>
    `,
    surface: () => `
      <section class="content-block">
        <span class="content-kicker">Recent Writing</span>
        <div class="stacked-cards">
          <article class="zoom-card wide-card"><h4>Why Rust Outperforms Go for Systems Work</h4><p>Tradeoffs between ergonomics, memory ownership, and confidence under load.</p></article>
          <article class="zoom-card wide-card"><h4>WebGPU and the Future of Browser Graphics</h4><p>Where richer product interactions are headed and what becomes feasible next.</p></article>
          <article class="zoom-card wide-card"><h4>Building a 10M RPS API with Edge Functions</h4><p>Operational lessons from chasing latency across distributed boundaries.</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-block">
        <span class="content-kicker">Writing Lens</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Audience</h4><p>Engineers who want practical depth, not hand-wavy inspiration.</p></article>
          <article class="micro-card"><h4>Style</h4><p>Dense, example-driven writing with strong opinions and operational detail.</p></article>
          <article class="micro-card"><h4>Purpose</h4><p>Clarify hard ideas, document experiments, and surface patterns worth reusing.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'design',
    name: 'PIXEL',
    subtitle: 'Visual Systems',
    radius: 230,
    size: 28,
    speed: 0.88,
    phase: 5.45,
    tilt: 0.15,
    color: '#ffab67',
    gradient: 'radial-gradient(circle at 32% 28%, #ffd8b8 0%, #ffab67 42%, #bc4f11 74%, #341103 100%)',
    prompt: 'Surface patterns emerge first, then the design logic beneath them.',
    preview: () => `
      <div class="zoom-card-grid compact-grid">
        <article class="zoom-card stat-card"><span class="stat-value">18</span><span class="stat-label">systems designed</span></article>
        <article class="zoom-card stat-card"><span class="stat-value">6</span><span class="stat-label">brand kits</span></article>
      </div>
    `,
    surface: () => `
      <section class="content-block">
        <span class="content-kicker">Design Work</span>
        <div class="skill-band">
          ${['Interface Systems','Brand Direction','Motion Language','Figma','Framer','Spline','Rive'].map((skill) => `<span class="skill-orb">${skill}</span>`).join('')}
        </div>
      </section>
      <section class="content-block">
        <p>I design with depth, restraint, and rhythm. Interfaces should feel authored enough to be memorable, but simple enough to disappear once the user is in flow.</p>
      </section>
    `,
    deep: () => `
      <section class="content-block">
        <span class="content-kicker">Design Principles</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Hierarchy</h4><p>Clarity first, ornament second.</p></article>
          <article class="micro-card"><h4>Motion</h4><p>Animation should explain structure, not decorate emptiness.</p></article>
          <article class="micro-card"><h4>Tone</h4><p>Every screen needs a point of view.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'contact',
    name: 'BEACON',
    subtitle: 'Transmission Node',
    radius: 650,
    size: 38,
    speed: 0.28,
    phase: 1.82,
    tilt: 0.08,
    color: '#71d39d',
    gradient: 'radial-gradient(circle at 32% 28%, #cffff0 0%, #71d39d 42%, #1e7e52 74%, #07281a 100%)',
    prompt: 'Lock onto the beacon to reveal ways to connect.',
    preview: () => `
      <div class="zoom-card-grid compact-grid">
        <article class="zoom-card"><span class="chip-title">Email</span><p>alex@cosmicdeveloper.io</p></article>
        <article class="zoom-card"><span class="chip-title">Status</span><p>open to strong fits</p></article>
      </div>
    `,
    surface: () => `
      <section class="content-block">
        <span class="content-kicker">Open Channels</span>
        <div class="stacked-cards">
          <article class="zoom-card wide-card"><h4>Email</h4><p>alex@cosmicdeveloper.io</p></article>
          <article class="zoom-card wide-card"><h4>GitHub</h4><p>github.com/alexnova</p></article>
          <article class="zoom-card wide-card"><h4>LinkedIn</h4><p>linkedin.com/in/alexnova</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-block">
        <span class="content-kicker">Availability</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Projects</h4><p>Selective collaborations with teams that care deeply about product quality.</p></article>
          <article class="micro-card"><h4>Speaking</h4><p>Systems design, frontend motion, and performance storytelling.</p></article>
          <article class="micro-card"><h4>Response Window</h4><p>Usually within 24 hours for serious inquiries.</p></article>
        </div>
      </section>
    `,
  },
];

export const BLACK_HOLE = {
  id: 'singularity',
  name: 'EVENT HORIZON',
  subtitle: 'Singularity Archive',
  radius: 880,
  size: 92,
  speed: 0.12,
  phase: 2.2,
  tilt: 0.05,
  color: '#8ec5ff',
  prompt: 'The closer you drift, the faster space begins to fold.',
  preview: () => `
    <div class="zoom-card-grid compact-grid">
      <article class="zoom-card"><span class="chip-title">Transition</span><p>space bends under depth</p></article>
      <article class="zoom-card"><span class="chip-title">Archive</span><p>process, experiments, raw notes</p></article>
    </div>
  `,
  surface: () => `
    <section class="content-block">
      <span class="content-kicker">Archive Sector</span>
      <h3>The universe folds inward here</h3>
      <p>This is the meta-layer: experiments, prototypes, and unfinished directions that shaped the shipped work around the rest of the system.</p>
    </section>
    <section class="content-block two-col">
      <div>
        <span class="content-kicker">Contains</span>
        <ul class="detail-list">
          <li>interface prototypes</li>
          <li>motion studies</li>
          <li>system diagrams</li>
        </ul>
      </div>
      <div>
        <span class="content-kicker">Effect</span>
        <ul class="detail-list muted">
          <li>accelerated zoom</li>
          <li>distortion field</li>
          <li>scene tint shift</li>
        </ul>
      </div>
    </section>
  `,
  deep: () => `
    <section class="content-block">
      <span class="content-kicker">Micro Archive</span>
      <div class="micro-grid">
        <article class="micro-card"><h4>Prototype Vault</h4><p>Discarded UI directions that still taught the final product what to become.</p></article>
        <article class="micro-card"><h4>Motion Lab</h4><p>Tests around inertia, camera focus, and nested reveal systems.</p></article>
        <article class="micro-card"><h4>Operating Thesis</h4><p>People remember interfaces that feel spatial, coherent, and inevitable.</p></article>
      </div>
    </section>
  `,
};
