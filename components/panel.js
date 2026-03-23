/**
 * COSMIC PORTFOLIO ENGINE
 * components/panel.js — Content panel renderer (lazy)
 *
 * Content is built as a string and inserted only when the panel opens.
 * This avoids rendering all planet content up front.
 */

'use strict';

export class ContentPanel {
  constructor(panelEl) {
    this.el     = panelEl;
    this.header = panelEl.querySelector('#panel-header');
    this.dot    = panelEl.querySelector('#panel-dot');
    this.title  = panelEl.querySelector('#panel-title');
    this.sub    = panelEl.querySelector('#panel-subtitle');
    this.body   = panelEl.querySelector('#panel-body');
    this.close  = panelEl.querySelector('#panel-close');

    this._currentId = null;
    this.onClose = null;

    this.close.addEventListener('click', () => {
      this.hide();
      if (this.onClose) this.onClose();
    });
  }

  show(planet) {
    if (this._currentId === planet.id) return;
    this._currentId = planet.id;

    /* Header */
    this.dot.style.background   = planet.color;
    this.dot.style.boxShadow    = `0 0 10px ${planet.color}`;
    this.title.textContent      = planet.name;
    this.sub.textContent        = planet.subtitle;

    /* Lazy content build */
    this.body.innerHTML = planet.content();

    this.el.classList.add('visible');
  }

  hide() {
    this.el.classList.remove('visible');
    /* Defer clearing to after animation */
    setTimeout(() => {
      if (!this.el.classList.contains('visible')) {
        this._currentId = null;
        this.body.innerHTML = '';
      }
    }, 450);
  }
}
