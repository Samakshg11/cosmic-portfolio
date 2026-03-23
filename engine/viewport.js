/**
 * COSMIC PORTFOLIO ENGINE
 * engine/viewport.js — Zoom, pan, physics, orbit math
 */

'use strict';

export class ViewportEngine {
  constructor(worldEl, viewportEl) {
    this.world    = worldEl;
    this.viewport = viewportEl;

    /* State */
    this.x = 0; this.y = 0; this.scale = 0.55;
    this.targetX = 0; this.targetY = 0; this.targetScale = 0.55;

    /* Limits */
    this.MIN_SCALE = 0.18;
    this.MAX_SCALE = 3.2;

    /* Pan inertia */
    this.vx = 0; this.vy = 0;
    this.FRICTION = 0.88;

    /* RAF handle */
    this._raf = null;
    this._running = false;

    /* Interaction state */
    this._dragging   = false;
    this._lastX      = 0; this._lastY = 0;
    this._pinchDist  = 0;

    /* Callbacks */
    this.onZoomChange = null;

    this._bindEvents();
    this._startLoop();
  }

  /* ── PUBLIC API ─────────────────────────────────── */

  zoomTo(targetX, targetY, scale, durationMs = 700) {
    /* Animate camera to a world position */
    const vW = this.viewport.offsetWidth;
    const vH = this.viewport.offsetHeight;
    this.targetScale = this._clampScale(scale);
    this.targetX = -targetX * this.targetScale + vW / 2;
    this.targetY = -targetY * this.targetScale + vH / 2;
    this.vx = 0; this.vy = 0;
    if (this.onZoomChange) this.onZoomChange(this.targetScale);
  }

  reset() {
    this.targetX = 0; this.targetY = 0;
    this.targetScale = 0.55;
    this.vx = 0; this.vy = 0;
    if (this.onZoomChange) this.onZoomChange(this.targetScale);
  }

  getScale() { return this.scale; }
  getOffset() { return { x: this.x, y: this.y }; }

  worldToScreen(wx, wy) {
    const vW = this.viewport.offsetWidth;
    const vH = this.viewport.offsetHeight;
    return {
      x: wx * this.scale + this.x + vW / 2,
      y: wy * this.scale + this.y + vH / 2,
    };
  }

  screenToWorld(sx, sy) {
    const vW = this.viewport.offsetWidth;
    const vH = this.viewport.offsetHeight;
    return {
      x: (sx - this.x - vW / 2) / this.scale,
      y: (sy - this.y - vH / 2) / this.scale,
    };
  }

  destroy() {
    this._running = false;
    cancelAnimationFrame(this._raf);
    this._unbindEvents();
  }

  /* ── INTERNAL LOOP ──────────────────────────────── */

  _startLoop() {
    this._running = true;
    const tick = () => {
      if (!this._running) return;
      this._update();
      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }

  _update() {
    const EASE = 0.10;

    if (!this._dragging) {
      /* Apply inertia */
      this.targetX += this.vx;
      this.targetY += this.vy;
      this.vx *= this.FRICTION;
      this.vy *= this.FRICTION;
    }

    /* Lerp toward target */
    this.x     += (this.targetX - this.x)     * EASE;
    this.y     += (this.targetY - this.y)     * EASE;
    this.scale += (this.targetScale - this.scale) * EASE;

    /* Apply to DOM — ONE transform call, no layout thrashing */
    this.world.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;

    if (this.onZoomChange && Math.abs(this.scale - this.targetScale) < 0.001) {
      /* settled — emit final value once */
    }
  }

  /* ── EVENT BINDING ──────────────────────────────── */

  _bindEvents() {
    const vp = this.viewport;

    /* Mouse */
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp   = this._onMouseUp.bind(this);
    this._onWheel     = this._onWheel.bind(this);

    vp.addEventListener('mousedown',  this._onMouseDown, { passive: true });
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('mouseup',   this._onMouseUp,   { passive: true });
    vp.addEventListener('wheel',      this._onWheel,     { passive: false });

    /* Touch */
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove  = this._onTouchMove.bind(this);
    this._onTouchEnd   = this._onTouchEnd.bind(this);

    vp.addEventListener('touchstart', this._onTouchStart, { passive: true });
    vp.addEventListener('touchmove',  this._onTouchMove,  { passive: false });
    vp.addEventListener('touchend',   this._onTouchEnd,   { passive: true });
  }

  _unbindEvents() {
    const vp = this.viewport;
    vp.removeEventListener('mousedown',  this._onMouseDown);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup',   this._onMouseUp);
    vp.removeEventListener('wheel',      this._onWheel);
    vp.removeEventListener('touchstart', this._onTouchStart);
    vp.removeEventListener('touchmove',  this._onTouchMove);
    vp.removeEventListener('touchend',   this._onTouchEnd);
  }

  /* ── MOUSE ──────────────────────────────────────── */

  _onMouseDown(e) {
    if (e.button !== 0) return;
    this._dragging = true;
    this._lastX = e.clientX; this._lastY = e.clientY;
    this.vx = 0; this.vy = 0;
    this.viewport.classList.add('grabbing');
  }

  _onMouseMove(e) {
    if (!this._dragging) return;
    const dx = e.clientX - this._lastX;
    const dy = e.clientY - this._lastY;
    this._lastX = e.clientX; this._lastY = e.clientY;
    this.targetX += dx; this.targetY += dy;
    this.vx = dx; this.vy = dy;
  }

  _onMouseUp() {
    this._dragging = false;
    this.viewport.classList.remove('grabbing');
  }

  _onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.12 : 0.89;
    const rect  = this.viewport.getBoundingClientRect();
    const cx    = e.clientX - rect.left;
    const cy    = e.clientY - rect.top;
    this._zoomAround(cx, cy, delta);
  }

  /* ── TOUCH ──────────────────────────────────────── */

  _onTouchStart(e) {
    if (e.touches.length === 1) {
      this._dragging = true;
      this._lastX = e.touches[0].clientX;
      this._lastY = e.touches[0].clientY;
      this.vx = 0; this.vy = 0;
    } else if (e.touches.length === 2) {
      this._dragging = false;
      this._pinchDist = this._getTouchDist(e.touches);
    }
  }

  _onTouchMove(e) {
    if (e.touches.length === 1 && this._dragging) {
      e.preventDefault();
      const dx = e.touches[0].clientX - this._lastX;
      const dy = e.touches[0].clientY - this._lastY;
      this._lastX = e.touches[0].clientX;
      this._lastY = e.touches[0].clientY;
      this.targetX += dx; this.targetY += dy;
      this.vx = dx; this.vy = dy;
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const dist  = this._getTouchDist(e.touches);
      const ratio = dist / this._pinchDist;
      this._pinchDist = dist;
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      this._zoomAround(cx, cy, ratio);
    }
  }

  _onTouchEnd() {
    this._dragging = false;
  }

  /* ── HELPERS ────────────────────────────────────── */

  _zoomAround(cx, cy, factor) {
    const vW = this.viewport.offsetWidth;
    const vH = this.viewport.offsetHeight;
    const newScale  = this._clampScale(this.targetScale * factor);
    const scaleRatio = newScale / this.targetScale;
    /* Zoom toward cursor point */
    this.targetX = cx - (cx - this.targetX) * scaleRatio;
    this.targetY = cy - (cy - this.targetY) * scaleRatio;
    this.targetScale = newScale;
    if (this.onZoomChange) this.onZoomChange(newScale);
  }

  _clampScale(s) {
    return Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, s));
  }

  _getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }
}
