/**
 * COSMIC PORTFOLIO ENGINE
 * components/minimap.js — Lightweight canvas minimap
 */

'use strict';

export class Minimap {
  /**
   * @param {HTMLElement} container
   * @param {Array}       planets   — planet config + position getters
   * @param {Object}      viewport  — ViewportEngine instance
   */
  constructor(container, planets, viewport) {
    this.container = container;
    this.planets   = planets;
    this.viewport  = viewport;

    this.canvas = document.createElement('canvas');
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.W = container.offsetWidth  || 110;
    this.H = container.offsetHeight || 110;
    this.canvas.width  = this.W * 2;
    this.canvas.height = this.H * 2;
    this.canvas.style.width  = this.W + 'px';
    this.canvas.style.height = this.H + 'px';
    this.ctx.scale(2, 2);

    /* World bounds for minimap */
    this.WORLD_RADIUS = 900; // rough bounding radius of all planets

    /* Viewport indicator */
    this.indicator = document.createElement('div');
    this.indicator.id = 'minimap-viewport-indicator';
    container.appendChild(this.indicator);
  }

  /** Call each frame with current planet positions */
  update(positions) {
    const ctx = this.ctx;
    const W = this.W; const H = this.H;
    const R = this.WORLD_RADIUS;

    /* Clear */
    ctx.clearRect(0, 0, W, H);

    /* Background */
    ctx.fillStyle = 'rgba(4,5,13,0.6)';
    ctx.fillRect(0, 0, W, H);

    /* Scale: world coords → minimap coords */
    const scale = Math.min(W, H) / (R * 2.4);
    const cx = W / 2; const cy = H / 2;

    const wToM = (wx, wy) => ({
      x: cx + wx * scale,
      y: cy + wy * scale * 0.12, // flatten y like orbit tilt average
    });

    /* Orbit rings */
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    for (const p of this.planets) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, p.radius * scale, p.radius * scale * 0.12, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    /* Sun */
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd47e';
    ctx.fill();

    /* Planets */
    for (const pos of positions) {
      const planet = this.planets.find(p => p.id === pos.id);
      if (!planet) continue;
      const m = wToM(pos.x, pos.y);
      ctx.beginPath();
      ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();
    }

    /* Viewport indicator */
    this._updateIndicator();
  }

  _updateIndicator() {
    const vp = this.viewport;
    const W = this.W; const H = this.H;
    const R = this.WORLD_RADIUS;
    const scale = Math.min(W, H) / (R * 2.4);
    const vW = window.innerWidth;
    const vH = window.innerHeight;
    const vs = vp.getScale();
    const off = vp.getOffset();

    /* Visible world region */
    const worldW = vW / vs;
    const worldH = vH / vs;
    const worldX = (-off.x - vW / 2) / vs;
    const worldY = (-off.y - vH / 2) / vs;

    const cx = W / 2; const cy = H / 2;

    const ix = cx + worldX * scale;
    const iy = cy + worldY * scale * 0.12;
    const iw = worldW * scale;
    const ih = worldH * scale * 0.12;

    const ind = this.indicator;
    ind.style.left   = Math.max(0, ix) + 'px';
    ind.style.top    = Math.max(0, iy) + 'px';
    ind.style.width  = Math.min(iw, W - Math.max(0, ix)) + 'px';
    ind.style.height = Math.min(ih, H - Math.max(0, iy)) + 'px';
  }
}
