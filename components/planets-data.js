/**
 * Realistic infinite-zoom content model.
 * Each world reveals orbit, surface, and deep layers as the camera
 * physically approaches rather than opening a separate UI.
 */

'use strict';

const VIDEO_LIBRARY = {
  earthNight: {
    src: 'https://cdn.pixabay.com/video/2015/08/07/2-135653517_large.mp4',
    poster: 'https://cdn.pixabay.com/video/2015/08/07/2-135653517_tiny.jpg',
  },
  earthDay: {
    src: 'https://cdn.pixabay.com/video/2016/02/10/2118-155244104_large.mp4',
    poster: 'https://cdn.pixabay.com/video/2016/02/10/2118-155244104_tiny.jpg',
  },
  singularity: {
    src: 'https://cdn.pixabay.com/video/2022/11/27/140733-775596128_large.mp4',
    poster: 'https://cdn.pixabay.com/video/2022/11/27/140733-775596128_tiny.jpg',
  },
};

export const WORLD_CONFIG = {
  title: 'Cosmic Portfolio',
  subtitle: 'Inside the field',
  hint: 'Scroll to move through depth. Drag to drift between worlds.',
  initialPlanetId: 'about',
};

export const PLANETS = [
  {
    id: 'about',
    name: 'AETHER',
    subtitle: 'Identity Signal',
    radius: 180,
    size: 132,
    speed: 0.92,
    phase: 0.46,
    tilt: 0.21,
    albedo: '#6f7b8f',
    material: 'terrestrial-blue',
    detailColor: '#c6d8eb',
    prompt: 'A quiet terrestrial world carrying the builder behind the work.',
    video: VIDEO_LIBRARY.earthNight,
    preview: () => `
      <article class="content-card compact-card">
        <span class="content-eyebrow">Signal</span>
        <h3>Full-stack engineer</h3>
        <p>Designing cinematic interfaces and resilient systems.</p>
      </article>
    `,
    surface: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Profile</span>
        <h3>Closer to the atmosphere</h3>
        <p>I build interfaces that feel authored and physical, with the same care for latency, trust, and system resilience as I do for motion and tone.</p>
      </section>
      <section class="content-panel-block two-col">
        <div>
          <span class="content-eyebrow">Current focus</span>
          <ul class="content-list">
            <li>Spatial product interfaces</li>
            <li>Rendering-heavy frontend systems</li>
            <li>Edge-aware architecture</li>
          </ul>
        </div>
        <div>
          <span class="content-eyebrow">Base of operations</span>
          <ul class="content-list muted-list">
            <li>San Francisco</li>
            <li>Staff-level engineering</li>
            <li>Design-forward technical direction</li>
          </ul>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Micro details</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Thinking style</h4><p>Feeling first, systems second, details always.</p></article>
          <article class="micro-card"><h4>Favorite work</h4><p>Interfaces where depth and clarity coexist.</p></article>
          <article class="micro-card"><h4>Bias</h4><p>Fast prototypes, strong constraints, honest polish.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'skills',
    name: 'FORGE',
    subtitle: 'Capability Matrix',
    radius: 330,
    size: 114,
    speed: 0.62,
    phase: 1.42,
    tilt: 0.18,
    albedo: '#866e59',
    material: 'rocky-umber',
    detailColor: '#c8ab86',
    prompt: 'A dry mineral planet etched with the tools used to build complex systems.',
    video: VIDEO_LIBRARY.earthDay,
    preview: () => `
      <article class="content-card compact-card">
        <span class="content-eyebrow">Toolkit</span>
        <h3>Frontend to infra</h3>
        <p>React, TypeScript, rendering, APIs, Rust, Go, cloud tooling.</p>
      </article>
    `,
    surface: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Core stack</span>
        <div class="skill-band">
          ${['React','TypeScript','Next.js','WebGL','Three.js','Node.js','Rust','Go','PostgreSQL','Redis','Terraform','Docker'].map((skill) => `<span class="skill-pill">${skill}</span>`).join('')}
        </div>
      </section>
      <section class="content-panel-block two-col">
        <div>
          <span class="content-eyebrow">Strengths</span>
          <ul class="content-list">
            <li>Expressive frontend systems</li>
            <li>Architecture for scale and clarity</li>
            <li>Bridging design and implementation</li>
          </ul>
        </div>
        <div>
          <span class="content-eyebrow">Infrastructure</span>
          <ul class="content-list muted-list">
            <li>AWS and GCP</li>
            <li>Observability and CI</li>
            <li>Delivery-focused tooling</li>
          </ul>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Depth layer</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Motion</h4><p>Frame-stable animations and spatial transitions.</p></article>
          <article class="micro-card"><h4>Systems</h4><p>Distributed thinking without losing product empathy.</p></article>
          <article class="micro-card"><h4>Leadership</h4><p>Turning ambiguity into strong, buildable direction.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'projects',
    name: 'ATLAS',
    subtitle: 'Mission Archive',
    radius: 470,
    size: 176,
    speed: 0.34,
    phase: 2.36,
    tilt: 0.14,
    albedo: '#b4996f',
    material: 'gas-giant',
    detailColor: '#e4d3b5',
    prompt: 'A massive gas world holding the heaviest launches in the archive.',
    video: VIDEO_LIBRARY.earthDay,
    preview: () => `
      <article class="content-card compact-card">
        <span class="content-eyebrow">Archive</span>
        <h3>Major launches</h3>
        <p>Distributed systems, GPU-first UI, edge video, collaboration tooling.</p>
      </article>
    `,
    surface: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Featured missions</span>
        <div class="stacked-cards">
          <article class="content-card wide-card"><h4>VoidDB</h4><p>Rust-based distributed store designed around operational confidence and throughput.</p></article>
          <article class="content-card wide-card"><h4>Lumina UI</h4><p>GPU-aware design system for expressive product interfaces.</p></article>
          <article class="content-card wide-card"><h4>EdgeStream</h4><p>Realtime ingest pipeline reducing cost while improving latency.</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Case study signals</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Problem framing</h4><p>Find the real bottleneck first.</p></article>
          <article class="micro-card"><h4>Build style</h4><p>Prototype, instrument, tighten, refine.</p></article>
          <article class="micro-card"><h4>Outcome</h4><p>Clearer stories with stronger systems underneath.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'experience',
    name: 'KRONOS',
    subtitle: 'Timeline Orbit',
    radius: 620,
    size: 102,
    speed: 0.27,
    phase: 0.94,
    tilt: 0.12,
    albedo: '#7f6253',
    material: 'rocky-cratered',
    detailColor: '#bda08f',
    prompt: 'A weathered world with layered strata from each chapter of work.',
    video: VIDEO_LIBRARY.earthNight,
    preview: () => `
      <article class="content-card compact-card">
        <span class="content-eyebrow">Trajectory</span>
        <h3>Staff and principal roles</h3>
        <p>Multiple years leading product-critical systems and teams.</p>
      </article>
    `,
    surface: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Timeline</span>
        <div class="timeline-band">
          <article class="timeline-card"><span>2023-Present</span><h4>Senior Staff Engineer</h4><p>Nebula Labs</p></article>
          <article class="timeline-card"><span>2021-2023</span><h4>Principal Engineer</h4><p>Vertex Systems</p></article>
          <article class="timeline-card"><span>2019-2021</span><h4>Senior Full-Stack Engineer</h4><p>Quasar IO</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Leadership layer</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Execution</h4><p>Protected product velocity through strong architecture.</p></article>
          <article class="micro-card"><h4>Direction</h4><p>Clarified tradeoffs before teams paid the cost.</p></article>
          <article class="micro-card"><h4>Mentorship</h4><p>Raised confidence while raising standards.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'opensource',
    name: 'NEXUS',
    subtitle: 'Open Source Relay',
    radius: 520,
    size: 94,
    speed: 0.41,
    phase: 4.12,
    tilt: 0.16,
    albedo: '#7d8ea2',
    material: 'ice-world',
    detailColor: '#dce7ef',
    prompt: 'A cold relay world broadcasting public experiments and reusable tools.',
    video: VIDEO_LIBRARY.earthNight,
    preview: () => `
      <article class="content-card compact-card">
        <span class="content-eyebrow">Public signal</span>
        <h3>12 repos, 1.2k+ commits</h3>
        <p>Open work as a testing ground for stronger product systems.</p>
      </article>
    `,
    surface: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Repositories</span>
        <div class="stacked-cards">
          <article class="content-card wide-card"><h4>lumina-ui</h4><p>GPU-accelerated components for expressive product interfaces.</p></article>
          <article class="content-card wide-card"><h4>voiddb</h4><p>Consensus and throughput experiments in distributed storage.</p></article>
          <article class="content-card wide-card"><h4>edgeq</h4><p>Queueing system shaped for edge-first compute.</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Why in public</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Testing ground</h4><p>Where new ideas get real pressure.</p></article>
          <article class="micro-card"><h4>Teaching</h4><p>Readable systems help others move faster.</p></article>
          <article class="micro-card"><h4>Signal</h4><p>Shows how I think without simplification.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'writing',
    name: 'LYRA',
    subtitle: 'Signal Essays',
    radius: 760,
    size: 88,
    speed: 0.18,
    phase: 3.25,
    tilt: 0.1,
    albedo: '#5f6070',
    material: 'ashen-world',
    detailColor: '#d2ced3',
    prompt: 'A dark quiet body where technical writing condenses into clear signal.',
    video: VIDEO_LIBRARY.earthNight,
    preview: () => `
      <article class="content-card compact-card">
        <span class="content-eyebrow">Writing</span>
        <h3>Systems, graphics, edge</h3>
        <p>Dense, example-driven essays for engineers who want depth.</p>
      </article>
    `,
    surface: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Recent essays</span>
        <div class="stacked-cards">
          <article class="content-card wide-card"><h4>Why Rust Outperforms Go for Systems Work</h4><p>Confidence, ownership, and performance under load.</p></article>
          <article class="content-card wide-card"><h4>WebGPU and the Future of Browser Graphics</h4><p>What richer product interactions make possible next.</p></article>
          <article class="content-card wide-card"><h4>Building a 10M RPS API with Edge Functions</h4><p>Operational lessons from chasing latency across boundaries.</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Writing lens</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Audience</h4><p>Engineers who prefer practical depth.</p></article>
          <article class="micro-card"><h4>Style</h4><p>Dense, opinionated, example-driven.</p></article>
          <article class="micro-card"><h4>Purpose</h4><p>To make difficult systems legible.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'design',
    name: 'PIXEL',
    subtitle: 'Visual Systems',
    radius: 250,
    size: 126,
    speed: 0.71,
    phase: 5.36,
    tilt: 0.19,
    albedo: '#9c8f75',
    material: 'clouded-world',
    detailColor: '#e4d8c4',
    prompt: 'A pale clouded world where visual systems emerge from restraint and rhythm.',
    video: VIDEO_LIBRARY.earthDay,
    preview: () => `
      <article class="content-card compact-card">
        <span class="content-eyebrow">Design</span>
        <h3>Systems with point of view</h3>
        <p>Interfaces shaped by hierarchy, tone, and motion discipline.</p>
      </article>
    `,
    surface: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Tools and systems</span>
        <div class="skill-band">
          ${['Interface Systems','Motion Language','Figma','Framer','Spline','Rive','Brand Direction'].map((skill) => `<span class="skill-pill">${skill}</span>`).join('')}
        </div>
      </section>
      <section class="content-panel-block">
        <p>I design with enough character to be memorable and enough restraint to stay useful once the work begins.</p>
      </section>
    `,
    deep: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Principles</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Hierarchy</h4><p>Clarity before ornament.</p></article>
          <article class="micro-card"><h4>Motion</h4><p>Animation should explain structure.</p></article>
          <article class="micro-card"><h4>Tone</h4><p>Every screen needs a point of view.</p></article>
        </div>
      </section>
    `,
  },
  {
    id: 'contact',
    name: 'BEACON',
    subtitle: 'Transmission Node',
    radius: 920,
    size: 96,
    speed: 0.14,
    phase: 1.74,
    tilt: 0.08,
    albedo: '#687d6a',
    material: 'green-world',
    detailColor: '#ced7c9',
    prompt: 'A quiet green transmitter for projects, collaborations, and conversations.',
    video: VIDEO_LIBRARY.earthDay,
    preview: () => `
      <article class="content-card compact-card">
        <span class="content-eyebrow">Connection</span>
        <h3>Open to strong fits</h3>
        <p>Projects, speaking, collaborations, and deep product work.</p>
      </article>
    `,
    surface: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Channels</span>
        <div class="stacked-cards">
          <article class="content-card wide-card"><h4>Email</h4><p>alex@cosmicdeveloper.io</p></article>
          <article class="content-card wide-card"><h4>GitHub</h4><p>github.com/alexnova</p></article>
          <article class="content-card wide-card"><h4>LinkedIn</h4><p>linkedin.com/in/alexnova</p></article>
        </div>
      </section>
    `,
    deep: () => `
      <section class="content-panel-block">
        <span class="content-eyebrow">Availability</span>
        <div class="micro-grid">
          <article class="micro-card"><h4>Projects</h4><p>Selective collaborations with teams that care deeply about product quality.</p></article>
          <article class="micro-card"><h4>Speaking</h4><p>Systems design, motion, and performance storytelling.</p></article>
          <article class="micro-card"><h4>Response</h4><p>Usually within 24 hours for serious inquiries.</p></article>
        </div>
      </section>
    `,
  },
];

export const BLACK_HOLE = {
  id: 'singularity',
  name: 'EVENT HORIZON',
  subtitle: 'Archive Singularity',
  radius: 1180,
  size: 180,
  speed: 0.08,
  phase: 2.12,
  tilt: 0.05,
  albedo: '#2c3e63',
  material: 'singularity',
  detailColor: '#bfd4ff',
  prompt: 'Gravity begins to shear the field as you cross the lensing ring.',
  video: VIDEO_LIBRARY.singularity,
  preview: () => `
    <article class="content-card compact-card">
      <span class="content-eyebrow">Singularity</span>
      <h3>Process archive</h3>
      <p>Prototype trails, motion studies, and raw systems thinking.</p>
    </article>
  `,
  surface: () => `
    <section class="content-panel-block">
      <span class="content-eyebrow">Archive sector</span>
      <h3>The field folds inward</h3>
      <p>This zone holds unfinished directions, motion experiments, and discarded prototypes that taught the final work what it needed to become.</p>
    </section>
    <section class="content-panel-block two-col">
      <div>
        <span class="content-eyebrow">Contains</span>
        <ul class="content-list">
          <li>interface prototypes</li>
          <li>camera experiments</li>
          <li>system diagrams</li>
        </ul>
      </div>
      <div>
        <span class="content-eyebrow">Effect</span>
        <ul class="content-list muted-list">
          <li>stronger zoom pull</li>
          <li>subtle lensing</li>
          <li>scene collapse</li>
        </ul>
      </div>
    </section>
  `,
  deep: () => `
    <section class="content-panel-block">
      <span class="content-eyebrow">Micro archive</span>
      <div class="micro-grid">
        <article class="micro-card"><h4>Prototype vault</h4><p>Interfaces that never shipped but still shaped the final system.</p></article>
        <article class="micro-card"><h4>Motion lab</h4><p>Tests around inertia, focus, lensing, and visual calm.</p></article>
        <article class="micro-card"><h4>Operating thesis</h4><p>The best interfaces feel spatial, inevitable, and quietly alive.</p></article>
      </div>
    </section>
  `,
};
