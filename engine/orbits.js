/**
 * COSMIC PORTFOLIO ENGINE
 * engine/orbits.js — Lightweight sin/cos orbit system
 *
 * All positions computed from a master timestamp — no state accumulation,
 * no drift. Planets are simply read from the position at time T.
 */

'use strict';

export class OrbitSystem {
  /**
   * @param {Array}  planets  — planet config array
   * @param {Object} options
   */
  constructor(planets, options = {}) {
    this.planets  = planets;
    this.speed    = options.speed  ?? 0.00008;   // global orbit speed multiplier
    this.paused   = false;
    this._startT  = performance.now();
    this._pauseT  = 0;
    this._elapsed = 0;
  }

  pause()  {
    if (!this.paused) {
      this._pauseT = performance.now();
      this.paused = true;
    }
  }

  resume() {
    if (this.paused) {
      this._startT += performance.now() - this._pauseT;
      this.paused = false;
    }
  }

  /**
   * Returns current {x, y} for each planet.
   * Call this every frame — it's just sin/cos math, super cheap.
   */
  getPositions(now = performance.now()) {
    const t = this.paused
      ? (this._pauseT - this._startT) * this.speed
      : (now          - this._startT) * this.speed;

    return this.planets.map((p) => {
      const angle = t * p.speed + p.phase;
      /* Optional subtle vertical wobble */
      const tilt  = (p.tilt ?? 0.12);
      return {
        id:  p.id,
        x:   Math.cos(angle) * p.radius,
        y:   Math.sin(angle) * p.radius * tilt,
      };
    });
  }

  setSpeed(s) { this.speed = s; }
}
