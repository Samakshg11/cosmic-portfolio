import { PLANETS, BLACK_HOLE, WORLD_CONFIG } from '../components/planets-data.js';
import { Starfield } from '../engine/starfield.js';
import { ViewportEngine } from '../engine/viewport.js';

export class CosmicApp {
  constructor() {
    this.viewport = document.getElementById('viewport');
    this.world = document.getElementById('world');
    this.focusReadout = document.getElementById('focus-readout');
    this.zoomReadout = document.getElementById('zoom-readout');
    this.hint = document.getElementById('world-hint');
    this.warp = document.getElementById('warp-overlay');
    this.minimap = document.getElementById('minimap');
    this.objects = [...PLANETS, BLACK_HOLE];
    this.items = [];
    this.positions = [];
    this.startTime = performance.now();
    this.currentFocus = null;
    this.currentBlackHoleDepth = 0;
    this.initializedView = false;
    this.activeVideoId = null;
    this.minimapFrame = 0;
  }

  init() {
    this.starfield = new Starfield(document.getElementById('starfield'));
    this.camera = new ViewportEngine(this.world, this.viewport);
    this.camera.onZoomChange = (scale) => {
      this.zoomReadout.textContent = Math.round(scale * 100) + '%';
    };

    this.buildScene();
    this.buildMinimap();
    this.bindEvents();

    const loop = (ts) => {
      this.updateScene(ts);
      this.minimapFrame += 1;
      if (this.minimapFrame % 2 === 0) {
        this.updateMinimap();
      }
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') {
        const target = this.items.find((item) => item.data.id === WORLD_CONFIG.initialPlanetId);
        if (target) this.setInitialView(target);
      }
    }, { passive: true });
  }

  buildScene() {
    const radii = [...new Set(this.objects.map((obj) => obj.radius))].sort((a, b) => a - b);
    radii.forEach((radius) => {
      const ring = document.createElement('div');
      ring.className = 'orbit-ring';
      ring.style.width = `${radius * 2}px`;
      ring.style.height = `${radius * 2 * 0.14}px`;
      this.world.appendChild(ring);
    });

    const sun = document.createElement('div');
    sun.id = 'sun-source';
    sun.innerHTML = '<div class="sun-disc"></div><div class="sun-field"></div>';
    this.world.appendChild(sun);

    this.items = this.objects.map((obj) => {
      const wrap = document.createElement('article');
      wrap.className = obj.id === BLACK_HOLE.id ? 'space-object black-hole-object' : 'space-object';
      wrap.dataset.id = obj.id;
      wrap.style.setProperty('--planet-base', obj.albedo);
      wrap.style.setProperty('--detail-color', obj.detailColor);

      const planet = document.createElement('div');
      planet.className = obj.id === BLACK_HOLE.id ? 'planet-shell black-hole-shell' : `planet-shell material-${obj.material}`;
      planet.style.width = `${obj.size}px`;
      planet.style.height = `${obj.size}px`;
      if (obj.id === BLACK_HOLE.id) {
        planet.innerHTML = '<div class="lensing-ring"></div><div class="singularity-core"></div><div class="lensing-halo"></div>';
      } else {
        planet.innerHTML = '<div class="surface-noise"></div><div class="surface-shadow"></div>';
      }

      const label = document.createElement('div');
      label.className = 'planet-label';
      label.innerHTML = `<span class="planet-name">${obj.name}</span><span class="planet-subtitle">${obj.subtitle}</span>`;

      const shell = document.createElement('div');
      shell.className = 'content-shell';
      shell.innerHTML = `
        <div class="zoom-layer zoom-layer-2">
          <div class="content-card intro-card">
            <span class="content-eyebrow">Approach</span>
            <h3>${obj.name}</h3>
            <p>${obj.prompt}</p>
          </div>
        </div>
        <div class="zoom-layer zoom-layer-3">${obj.preview()}</div>
        <div class="zoom-layer zoom-layer-4"></div>
        <div class="zoom-layer zoom-layer-5"></div>
      `;

      wrap.appendChild(planet);
      wrap.appendChild(label);
      wrap.appendChild(shell);
      this.world.appendChild(wrap);

      return {
        data: obj,
        el: wrap,
        planet,
        shell,
        baseX: Math.cos(obj.phase) * obj.radius,
        baseY: Math.sin(obj.phase) * obj.radius * obj.tilt,
        driftSeed: obj.phase * 10.73 + obj.radius * 0.0027,
        surfaceEl: shell.querySelector('.zoom-layer-4'),
        deepEl: shell.querySelector('.zoom-layer-5'),
        surfaceLoaded: false,
        deepLoaded: false,
        videoLoaded: false,
        videoPlaying: false,
        videoStage: null,
        videoEl: null,
        localDepth: 0,
        proximity: 0,
        screenX: 0,
        screenY: 0,
      };
    });
  }

  buildMinimap() {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 240;
    canvas.style.width = '120px';
    canvas.style.height = '120px';
    this.minimap.appendChild(canvas);
    this.mmCanvas = canvas;
    this.mmCtx = canvas.getContext('2d');
  }

  ensureVideo(item) {
    if (item.videoLoaded) return;
    const stage = document.createElement('div');
    stage.className = 'video-stage';
    stage.innerHTML = `
      <div class="video-frame">
        <video muted playsinline loop preload="none" poster="${item.data.video.poster}"></video>
        <div class="video-overlay"></div>
      </div>
    `;
    item.surfaceEl.prepend(stage);
    item.videoStage = stage;
    item.videoEl = stage.querySelector('video');
    item.videoEl.src = item.data.video.src;
    item.videoLoaded = true;
  }

  unloadVideo(item) {
    if (!item.videoLoaded) return;
    if (item.videoPlaying) item.videoEl.pause();
    item.videoEl.removeAttribute('src');
    item.videoEl.load();
    item.videoStage?.remove();
    item.videoLoaded = false;
    item.videoPlaying = false;
    item.videoEl = null;
    item.videoStage = null;
    item.el.classList.remove('video-active');
  }

  updateVideo(item, shouldPlay, shouldUnload) {
    if (!item.data.video) return;
    if (shouldPlay) {
      if (this.activeVideoId && this.activeVideoId !== item.data.id) {
        const activeItem = this.items.find((entry) => entry.data.id === this.activeVideoId);
        if (activeItem) this.unloadVideo(activeItem);
      }
      this.ensureVideo(item);
      if (!item.videoPlaying) {
        item.videoEl.play().catch(() => {});
        item.videoPlaying = true;
      }
      item.el.classList.add('video-active');
      this.activeVideoId = item.data.id;
    } else if (shouldUnload) {
      this.unloadVideo(item);
      if (this.activeVideoId === item.data.id) this.activeVideoId = null;
    } else if (item.videoLoaded && item.videoPlaying) {
      item.videoEl.pause();
      item.videoPlaying = false;
      item.el.classList.remove('video-active');
    } else {
      item.el.classList.remove('video-active');
    }
  }

  setInitialView(item) {
    const pos = this.positions.find((entry) => entry.id === item.data.id);
    if (!pos) return;
    const scale = 2.35;
    const targetX = window.innerWidth * 0.68 - pos.x * scale;
    const targetY = window.innerHeight * 0.56 - pos.y * scale;
    this.camera.setView(targetX - window.innerWidth * 0.5, targetY - window.innerHeight * 0.5, scale);
    this.initializedView = true;
  }

  updateScene(ts) {
    const t = (ts - this.startTime) * 0.001;
    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.5;
    let focus = null;
    let focusScore = -1;
    let blackHoleDepth = 0;
    this.positions = [];

    for (const item of this.items) {
      const obj = item.data;
      const driftX = Math.sin(t * (0.08 + obj.speed * 0.02) + item.driftSeed) * 8;
      const driftY = Math.cos(t * (0.06 + obj.speed * 0.018) + item.driftSeed * 0.8) * 5;
      const x = item.baseX + driftX;
      const y = item.baseY + driftY;
      const depth = y / Math.max(1, obj.radius * obj.tilt);
      const orbitScale = 0.84 + (depth + 1) * 0.19;
      item.el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${orbitScale.toFixed(3)})`;
      item.el.style.zIndex = `${Math.round(2000 + depth * 1200)}`;
      item.el.style.opacity = `${(0.78 + (depth + 1) * 0.11).toFixed(3)}`;

      const apparent = obj.size * this.camera.getScale() * orbitScale;
      const screenX = centerX + this.camera.x + x * this.camera.getScale();
      const screenY = centerY + this.camera.y + y * this.camera.getScale();
      item.screenX = screenX;
      item.screenY = screenY;
      const dist = Math.hypot(screenX - centerX, screenY - centerY);
      const proximity = this.smoothstep(1, 0, dist / (Math.min(window.innerWidth, window.innerHeight) * 0.7));
      const localDepth = (apparent / 50) * (0.45 + proximity * 0.55);
      item.localDepth = localDepth;
      item.proximity = proximity;

      item.el.style.setProperty('--reveal-2', this.smoothstep(0.75, 1.25, localDepth).toFixed(3));
      item.el.style.setProperty('--reveal-3', this.smoothstep(1.2, 2.0, localDepth).toFixed(3));
      item.el.style.setProperty('--reveal-4', this.smoothstep(2.2, 3.8, localDepth).toFixed(3));
      item.el.style.setProperty('--reveal-5', this.smoothstep(4.2, 6.6, localDepth).toFixed(3));
      item.el.style.setProperty('--shell-scale', (0.96 + this.smoothstep(1.1, 6.4, localDepth) * 0.1).toFixed(3));
      item.el.style.setProperty('--planet-shadow', (0.48 - depth * 0.08).toFixed(3));
      item.el.style.setProperty('--planet-light', (0.24 + (depth + 1) * 0.08).toFixed(3));

      if (localDepth > 2.4 && !item.surfaceLoaded) {
        item.surfaceEl.innerHTML += obj.surface();
        item.surfaceLoaded = true;
      }
      if (localDepth > 4.6 && !item.deepLoaded) {
        item.deepEl.innerHTML = obj.deep();
        item.deepLoaded = true;
      }

      const score = localDepth * (0.35 + proximity * 0.65);
      if (score > focusScore) {
        focusScore = score;
        focus = item;
      }
      if (obj.id === BLACK_HOLE.id) blackHoleDepth = localDepth;
      this.positions.push({ id: obj.id, x, y, color: obj.albedo });
    }

    if (!this.initializedView) {
      const startItem = this.items.find((item) => item.data.id === WORLD_CONFIG.initialPlanetId) || this.items[0];
      this.setInitialView(startItem);
    }

    this.currentFocus = focus;
    this.currentBlackHoleDepth = blackHoleDepth;
    for (const item of this.items) {
      const shouldPlayVideo = focus === item && item.localDepth > 4.2 && item.proximity > 0.68;
      const shouldUnloadVideo = focus !== item || item.localDepth < 3.4 || item.proximity < 0.52;
      this.updateVideo(item, shouldPlayVideo, shouldUnloadVideo);
    }
    this.camera.setZoomBoost(1 + this.smoothstep(2.6, 5.6, blackHoleDepth) * 0.45);
    this.warp.style.opacity = this.smoothstep(2.8, 6.2, blackHoleDepth).toFixed(3);
    this.starfield.setWarp(this.smoothstep(3.0, 6.4, blackHoleDepth));
    this.starfield.setParallax(this.camera.x, this.camera.y);
    this.updateReadout(focus, blackHoleDepth);
  }

  updateReadout(focus, blackHoleDepth) {
    if (!focus) return;
    this.focusReadout.textContent = `${focus.data.name} - ${focus.data.subtitle}`;
    if (focus.data.id === BLACK_HOLE.id && blackHoleDepth > 2.2) {
      this.hint.textContent = blackHoleDepth > 5
        ? 'The archive is collapsing inward. Keep drifting if you want the deepest process notes.'
        : 'Space is bending around the singularity. Scroll carefully through the lensing ring.';
      return;
    }
    if (focus.localDepth < 1.1) {
      this.hint.textContent = WORLD_CONFIG.hint;
    } else if (focus.localDepth < 2.2) {
      this.hint.textContent = `${focus.data.name} is resolving out of the dark. Stay near it and keep moving forward.`;
    } else if (focus.localDepth < 4.4) {
      this.hint.textContent = `${focus.data.name} surface layer active. Content and video will deepen as you keep approaching.`;
    } else {
      this.hint.textContent = `${focus.data.name} deep layer active. Zoom back out to re-enter the wider system.`;
    }
  }

  updateMinimap() {
    const ctx = this.mmCtx;
    const W = 120;
    const H = 120;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(5, 8, 16, 0.88)';
    ctx.fillRect(0, 0, W, H);
    const worldRadius = 1260;
    const scale = Math.min(W, H) / (worldRadius * 2.5);
    const cx = W / 2;
    const cy = H / 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    this.objects.forEach((obj) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, obj.radius * scale, obj.radius * scale * 0.14, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    this.positions.forEach((pos) => {
      ctx.beginPath();
      ctx.arc(cx + pos.x * scale, cy + pos.y * scale * 0.14, pos.id === BLACK_HOLE.id ? 3.6 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = pos.id === BLACK_HOLE.id ? '#9fb6d8' : pos.color;
      ctx.fill();
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = '#f2d5a0';
    ctx.fill();

    const cameraScale = this.camera.getScale();
    const off = this.camera.getOffset();
    const worldX = (-off.x) / cameraScale;
    const worldY = (-off.y) / cameraScale;
    const viewportW = window.innerWidth / cameraScale;
    const viewportH = window.innerHeight / cameraScale;
    ctx.strokeStyle = 'rgba(173, 191, 220, 0.84)';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(
      cx + (worldX - window.innerWidth * 0.5 / cameraScale) * scale,
      cy + (worldY - window.innerHeight * 0.5 / cameraScale) * scale * 0.14,
      viewportW * scale,
      viewportH * scale * 0.14
    );
  }

  smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / Math.max(0.0001, max - min)));
    return x * x * (3 - 2 * x);
  }
}
