export class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.offscreen = document.createElement('canvas');
    this.offCtx = this.offscreen.getContext('2d', { alpha: false });
    this.parallaxX = 0;
    this.parallaxY = 0;
    this.warp = 0;
    this.raf = null;
    this.prevTs = 0;
    this.init();
  }

  init() {
    this.resize();
    this.build();
    this.renderBase();
    this.loop();
    window.addEventListener('resize', () => {
      this.resize();
      this.build();
      this.renderBase();
    }, { passive: true });
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    [this.canvas, this.offscreen].forEach((c) => {
      c.width = this.w * dpr;
      c.height = this.h * dpr;
      c.style.width = this.w + 'px';
      c.style.height = this.h + 'px';
    });

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  build() {
    const nearCount = window.innerWidth < 760 ? 40 : 70;
    const midCount = window.innerWidth < 760 ? 90 : 160;
    const farCount = window.innerWidth < 760 ? 180 : 260;

    this.layers = [
      this.makeLayer(nearCount, 0.018, 1.5, 0.55),
      this.makeLayer(midCount, 0.01, 1.05, 0.34),
      this.makeLayer(farCount, 0.004, 0.75, 0.2),
    ];
  }

  makeLayer(count, driftScale, maxSize, alphaBase) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      r: Math.random() * maxSize + 0.2,
      alpha: Math.random() * alphaBase + alphaBase * 0.25,
      driftScale,
      warm: Math.random() < 0.08,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.65 + 0.35,
    }));
  }

  setParallax(x, y) {
    this.parallaxX = x;
    this.parallaxY = y;
  }

  setWarp(amount) {
    this.warp = amount;
  }

  renderBase() {
    const ctx = this.offCtx;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.fillStyle = '#02040a';
    ctx.fillRect(0, 0, this.w, this.h);

    [
      [this.w * 0.18, this.h * 0.22, this.w * 0.3, 'rgba(20,34,78,0.10)'],
      [this.w * 0.78, this.h * 0.66, this.w * 0.24, 'rgba(9,18,42,0.10)'],
      [this.w * 0.52, this.h * 0.5, this.w * 0.36, 'rgba(30,18,50,0.06)'],
    ].forEach(([x, y, r, color]) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, this.w, this.h);
    });
  }

  loop() {
    const tick = (ts) => {
      const t = ts * 0.001;
      this.prevTs = this.prevTs ? Math.min(0.05, (ts - this.prevTs) * 0.001) : 0.016;
      this.ctx.drawImage(this.offscreen, 0, 0, this.w, this.h);

      const lensAlpha = this.warp * 0.18;
      if (lensAlpha > 0.001) {
        this.ctx.fillStyle = `rgba(116,154,220,${lensAlpha.toFixed(3)})`;
        this.ctx.fillRect(0, 0, this.w, this.h);
      }

      this.layers.forEach((layer, layerIndex) => {
        layer.forEach((star) => {
          const px = star.x - this.parallaxX * star.driftScale + Math.sin(t * star.speed + star.pulse) * 0.25 * (layerIndex + 1);
          const py = star.y - this.parallaxY * star.driftScale + Math.cos(t * (star.speed * 0.75) + star.pulse) * 0.18 * (layerIndex + 1);
          const alpha = star.alpha * (0.72 + 0.28 * Math.sin(t * star.speed + star.pulse));
          this.ctx.beginPath();
          this.ctx.arc(px, py, star.r, 0, Math.PI * 2);
          this.ctx.fillStyle = star.warm
            ? `rgba(230,224,214,${alpha.toFixed(3)})`
            : `rgba(210,220,235,${alpha.toFixed(3)})`;
          this.ctx.fill();
        });
      });

      this.raf = requestAnimationFrame(tick);
    };

    this.raf = requestAnimationFrame(tick);
  }
}
