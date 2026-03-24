export class ViewportEngine {
  constructor(worldEl, viewportEl) {
    this.world = worldEl;
    this.viewport = viewportEl;
    this.x = 0;
    this.y = 0;
    this.scale = 2.25;
    this.targetX = 0;
    this.targetY = 0;
    this.targetScale = 2.25;
    this.minScale = 0.3;
    this.maxScale = 14;
    this.zoomBoost = 1;
    this.vx = 0;
    this.vy = 0;
    this.dragging = false;
    this.lastX = 0;
    this.lastY = 0;
    this.pinchDist = 0;
    this.friction = 0.92;
    this.wheelSensitivity = 0.0011;
    this.floatX = 0;
    this.floatY = 0;
    this.raf = null;
    this.onZoomChange = null;
    this.bindEvents();
    this.loop();
  }

  bindEvents() {
    const vp = this.viewport;

    this.onMouseDown = (e) => {
      if (e.button !== 0) return;
      this.dragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.vx = 0;
      this.vy = 0;
      vp.classList.add('grabbing');
    };

    this.onMouseMove = (e) => {
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.targetX += dx;
      this.targetY += dy;
      this.vx = dx;
      this.vy = dy;
    };

    this.onMouseUp = () => {
      this.dragging = false;
      vp.classList.remove('grabbing');
    };

    this.onWheel = (e) => {
      e.preventDefault();
      const rect = vp.getBoundingClientRect();
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * vp.clientHeight : e.deltaY;
      const factor = Math.exp(-delta * this.wheelSensitivity * this.zoomBoost);
      this.zoomToward(e.clientX - rect.left, e.clientY - rect.top, factor);
    };

    this.onTouchStart = (e) => {
      if (e.touches.length === 1) {
        this.dragging = true;
        this.lastX = e.touches[0].clientX;
        this.lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        this.dragging = false;
        this.pinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    this.onTouchMove = (e) => {
      if (e.touches.length === 1 && this.dragging) {
        e.preventDefault();
        const dx = e.touches[0].clientX - this.lastX;
        const dy = e.touches[0].clientY - this.lastY;
        this.lastX = e.touches[0].clientX;
        this.lastY = e.touches[0].clientY;
        this.targetX += dx;
        this.targetY += dy;
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const ratio = Math.max(0.92, Math.min(1.08, dist / Math.max(1, this.pinchDist)));
        this.pinchDist = dist;
        const rect = vp.getBoundingClientRect();
        const cx = (e.touches[0].clientX + e.touches[1].clientX) * 0.5 - rect.left;
        const cy = (e.touches[0].clientY + e.touches[1].clientY) * 0.5 - rect.top;
        this.zoomToward(cx, cy, ratio);
      }
    };

    this.onTouchEnd = () => {
      this.dragging = false;
      vp.classList.remove('grabbing');
    };

    vp.addEventListener('mousedown', this.onMouseDown, { passive: true });
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('mouseup', this.onMouseUp, { passive: true });
    vp.addEventListener('wheel', this.onWheel, { passive: false });
    vp.addEventListener('touchstart', this.onTouchStart, { passive: true });
    vp.addEventListener('touchmove', this.onTouchMove, { passive: false });
    vp.addEventListener('touchend', this.onTouchEnd, { passive: true });
  }

  setZoomBoost(boost) {
    this.zoomBoost = boost;
  }

  setView(x, y, scale) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.targetX = x;
    this.targetY = y;
    this.targetScale = scale;
  }

  zoomToward(cx, cy, factor) {
    const nextScale = this.clamp(this.targetScale * factor);
    const ratio = nextScale / Math.max(0.0001, this.targetScale);
    this.targetX = cx - (cx - this.targetX) * ratio;
    this.targetY = cy - (cy - this.targetY) * ratio;
    this.targetScale = nextScale;
    if (this.onZoomChange) this.onZoomChange(nextScale);
  }

  getScale() {
    return this.scale;
  }

  getOffset() {
    return { x: this.x, y: this.y };
  }

  loop() {
    const tick = (ts) => {
      const t = ts * 0.001;
      if (!this.dragging) {
        this.targetX += this.vx;
        this.targetY += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
      }
      this.floatX = Math.cos(t * 0.09) * 3.4;
      this.floatY = Math.sin(t * 0.07) * 2.2;
      this.x += (this.targetX + this.floatX - this.x) * 0.08;
      this.y += (this.targetY + this.floatY - this.y) * 0.08;
      this.scale += (this.targetScale - this.scale) * 0.1;
      this.world.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scale(${this.scale})`;
      this.raf = requestAnimationFrame(tick);
    };

    this.raf = requestAnimationFrame(tick);
  }

  clamp(value) {
    return Math.max(this.minScale, Math.min(this.maxScale, value));
  }
}
