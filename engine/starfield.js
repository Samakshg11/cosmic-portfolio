/**
 * COSMIC PORTFOLIO ENGINE
 * engine/starfield.js — Optimized canvas-based star renderer
 *
 * Uses a flat typed array for star data to minimize GC pressure.
 * Renders in a single drawImage pass using an offscreen canvas
 * for the static star layer, only the twinkling ones animate.
 */

'use strict';

export class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d', { alpha: false });

    /* Mobile perf mode — reduce star count */
    const isMobile = window.innerWidth < 700;
    this.STATIC_COUNT   = isMobile ? 280 : 520;
    this.TWINKLE_COUNT  = isMobile ? 18  : 36;

    /* Static star data: [x, y, r, opacity] packed Float32 */
    this.staticBuf = null;

    /* Twinkle star data: {x,y,r,phase,speed} */
    this.twinklers = [];

    /* Offscreen for static layer */
    this.offscreen    = document.createElement('canvas');
    this.offCtx       = this.offscreen.getContext('2d', { alpha: false });

    this._raf     = null;
    this._running = false;
    this._resizeObserver = null;

    this._init();
  }

  _init() {
    this._resize();
    this._buildStars();
    this._renderOffscreen();
    this._startLoop();

    /* Listen for resize */
    this._resizeObserver = new ResizeObserver(() => {
      this._resize();
      this._buildStars();
      this._renderOffscreen();
    });
    this._resizeObserver.observe(document.documentElement);
  }

  _resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.dpr = dpr;
    this.w   = w;
    this.h   = h;

    this.canvas.width  = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width  = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.offscreen.width  = w * dpr;
    this.offscreen.height = h * dpr;
    this.offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  _buildStars() {
    const w = this.w; const h = this.h;

    /* Static stars */
    this.staticBuf = new Float32Array(this.STATIC_COUNT * 4);
    for (let i = 0; i < this.STATIC_COUNT; i++) {
      const b = i * 4;
      this.staticBuf[b]     = Math.random() * w;
      this.staticBuf[b + 1] = Math.random() * h;
      this.staticBuf[b + 2] = Math.random() * 1.2 + 0.2;    // radius
      this.staticBuf[b + 3] = Math.random() * 0.6 + 0.2;    // opacity
    }

    /* Twinkling stars */
    this.twinklers = Array.from({ length: this.TWINKLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: (Math.random() * 0.6 + 0.3) * 0.01,
    }));

    /* Orbital star layers so the galaxy visibly revolves */
    const maxOrbit = Math.hypot(w, h) * 0.62;
    const isMobile = window.innerWidth < 700;
    const layerCounts = isMobile ? [36, 26, 16] : [88, 58, 34];
    this.layers = layerCounts.map((count, li) => {
      const depth = li + 1;
      const layerVelocity = 0.12 - li * 0.028;
      return Array.from({ length: count }, () => {
        const isWarm = Math.random() < 0.18;
        const orbit = Math.pow(Math.random(), 0.72) * maxOrbit;
        return {
          x: 0,
          y: 0,
          r: Math.random() * (0.45 + depth * 0.28) + 0.25,
          a: Math.random() * 0.6 + 0.25,
          orbit,
          angle: Math.random() * 6.2832,
          vel: (Math.random() * 0.45 + 0.8) * layerVelocity * (1 - Math.min(0.72, orbit / maxOrbit) * 0.35),
          flatten: 0.62 + Math.random() * 0.28,
          arm: Math.random() * 8 + 2,
          pulse: Math.random() * Math.PI * 2,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 1.2 + 0.5,
          color: isWarm ? [255, 235, 200] : [208, 225, 255],
        };
      });
    });
  }

  /* Render the static layer once onto offscreen canvas */
  _renderOffscreen() {
    const ctx = this.offCtx;
    const w = this.w; const h = this.h;
    ctx.fillStyle = '#04050d';
    ctx.fillRect(0, 0, w, h);

    /* Nebula blobs — cheap, drawn once */
    const blobs = [
      { x: w * 0.15, y: h * 0.25, r: w * 0.22, c: 'rgba(50,30,120,0.18)' },
      { x: w * 0.82, y: h * 0.65, r: w * 0.18, c: 'rgba(20,80,120,0.14)' },
      { x: w * 0.55, y: h * 0.80, r: w * 0.25, c: 'rgba(80,20,100,0.12)' },
    ];
    for (const b of blobs) {
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, b.c); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    /* Static stars */
    const buf = this.staticBuf;
    for (let i = 0; i < this.STATIC_COUNT; i++) {
      const bx = i * 4;
      const x = buf[bx]; const y = buf[bx + 1];
      const r = buf[bx + 2]; const op = buf[bx + 3];
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 6.2832);
      ctx.fillStyle = `rgba(220,230,255,${op})`;
      ctx.fill();
    }
  }

  _startLoop() {
    this._running = true;
    let t = 0;
    let prevTs = 0;

    const tick = (ts) => {
      if (!this._running) return;
      t = ts * 0.001;
      const dt = prevTs ? Math.min(0.05, (ts - prevTs) * 0.001) : 0.016;
      prevTs = ts;

      const ctx = this.ctx;
      const w   = this.w; const h = this.h;
      const cx = w * 0.5 + Math.cos(t * 0.08) * w * 0.018;
      const cy = h * 0.5 + Math.sin(t * 0.06) * h * 0.014;

      /* Blit static layer (no re-render cost) */
      ctx.drawImage(this.offscreen, 0, 0, w, h);

      /* Revolving orbital layers */
      for (const layer of this.layers) {
        for (const s of layer) {
          s.angle += s.vel * dt;
          const pulse = Math.sin(t * 0.42 + s.pulse) * s.arm;
          const orbit = s.orbit + pulse;
          s.x = cx + Math.cos(s.angle) * orbit;
          s.y = cy + Math.sin(s.angle) * orbit * s.flatten;

          const tw = 0.7 + 0.3 * Math.sin(t * s.twinkleSpeed + s.twinkle);
          const alpha = Math.min(1, s.a * tw);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, 6.2832);
          ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${alpha.toFixed(3)})`;
          ctx.fill();

          if (s.r > 1.25) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 2.8, 0, 6.2832);
            ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${(alpha * 0.13).toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      /* Animated twinkling stars only */
      for (const s of this.twinklers) {
        const op = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.speed * 628 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.2832);
        ctx.fillStyle = `rgba(210,220,255,${op.toFixed(2)})`;
        ctx.fill();
      }

      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }

  destroy() {
    this._running = false;
    cancelAnimationFrame(this._raf);
    if (this._resizeObserver) this._resizeObserver.disconnect();
  }
}
