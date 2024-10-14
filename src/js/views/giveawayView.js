import { SLIDER_SEC } from "../config.js";
import View from "./view.js";

class GiveawayView extends View {
  _parentEl = document.querySelector(".giveaway__wrapper");
  #container = document.querySelector(".giveaway");
  #cardWidth;
  #containerWidth;
  #sliderInterval;

  // MARKUP GENERATION
  _generateMarkup() {
    return this._data.reduce((sum, curr) => {
      return (sum += this.#generateArticle(curr));
    }, "");
  }

  #generateArticle(article) {
    return `<article class="giveaway__item">
                <figure class="giveaway__figure">
                    <img class="giveaway__img" src=${article.img} alt="" />
                </figure>
                <h3 class="giveaway__heading">${article.title}</h3>
                <div class="giveaway__keys" data-keys=${article.keys}>
                    <span>Keys left:</span>
                <div class="giveaway__progressbar"></div>
                </div>
                <button class="btn btn--full btn--end btn--redeem">Redeem</button>
            </article>`;
  }

  // RENDERING & INITIALIZATION
  _afterRender() {
    this.#renderKeys();
    this.#setSlider();
    this.#appendArticles();
    this.#hookEvents();
  }

  #renderKeys() {
    const elements = this._parentEl.querySelectorAll(".giveaway__keys");
    elements.forEach((element) => {
      let color;
      const keys = +element.dataset.keys.slice(0, -1);
      if (keys <= 25) color = "var(--clr-main)";
      else if (keys > 25 && keys <= 70) color = "var(--clr-orange)";
      else color = "var(--clr-green)";

      element.style.setProperty("--bg", color);
      element.style.setProperty("--keys", element.dataset.keys);
    });
  }

  #setSlider() {
    const card = document.querySelector(".giveaway__item");
    this.#cardWidth = card.clientWidth;
    this.#containerWidth = this._parentEl.clientWidth;
    this.#setInterval();
  }

  #hookEvents() {
    this.#container.addEventListener("click", this.#controlEvent.bind(this));
    this._parentEl.addEventListener("scroll", this.#scroll.bind(this));
    this.#container.addEventListener("mouseenter", this.#clearInterval.bind(this));
    this.#container.addEventListener("mouseleave", this.#setInterval.bind(this));
  }

  // SLIDER CONTROL
  #moveSlider(direction = "next") {
    this._parentEl.scrollLeft += direction === "next" ? this.#cardWidth : -this.#cardWidth;
  }

  #clearInterval() {
    clearInterval(this.#sliderInterval);
    this.#sliderInterval = null;
  }

  #setInterval() {
    if (this.#sliderInterval) return;
    this.#sliderInterval = setInterval(this.#moveSlider.bind(this), SLIDER_SEC);
  }

  #controlEvent(e) {
    const btn = e.target.closest(".control");
    if (!btn) return;
    this.#moveSlider(btn.dataset.direction);
  }

  // ARTICLE APPENDING
  #appendArticles() {
    const articles = Array.from(document.querySelectorAll(".giveaway__item"));
    if (articles.length === 0) return;

    // Calculate how many articles can fit based on the client width
    const maxVisibleArticles = Math.floor(this.#containerWidth / this.#cardWidth);

    articles.slice(0, maxVisibleArticles).forEach((el) => {
      this._parentEl.insertAdjacentHTML("beforeend", el.outerHTML);
    });

    articles
      .slice(-maxVisibleArticles)
      .reverse()
      .forEach((el) => {
        this._parentEl.insertAdjacentHTML("afterbegin", el.outerHTML);
      });

    this._parentEl.scrollLeft = this._parentEl.clientWidth;
    this._parentEl.style.scrollBehavior = "smooth";
  }

  // SCROLL CONTROL
  #scroll() {
    if (this._parentEl.scrollLeft === 0) {
      this.#resetPosition(this._parentEl.scrollWidth - 2 * this._parentEl.clientWidth);
    }
    if (this._parentEl.scrollLeft === this._parentEl.scrollWidth - this._parentEl.clientWidth) {
      this.#resetPosition(this._parentEl.clientWidth);
    }
  }

  #resetPosition(position) {
    this._parentEl.style.scrollBehavior = "auto";
    this._parentEl.scrollLeft = position;
    this._parentEl.style.scrollBehavior = "smooth";
  }
}

export default new GiveawayView();
