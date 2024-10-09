import View from "./view.js";

class GiveawayView extends View {
  _parentEl = document.querySelector(".giveaway__wrapper");
  #container = document.querySelector(".giveaway");
  #cardWidth;
  #containerWidth;

  _generateMarkup() {
    return this._data.reduce((sum, curr) => {
      return (sum += this.#renderArticle(curr));
    }, "");
  }

  #renderArticle(article) {
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

  _afterRender() {
    this.#renderKeys();
    this.#setSlider();
    this.#appendArticles();
    this.#hookEvents();
  }

  #renderKeys(element) {
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
  }

  #hookEvents() {
    this.#container.addEventListener("click", this.#controlEvent.bind(this));
  }

  #moveSlider(direction) {
    this._parentEl.scrollLeft += direction === "next" ? this.#cardWidth : -this.#cardWidth;
  }

  #controlEvent(e) {
    const btn = e.target.closest(".control");
    if (!btn) return;
    this.#moveSlider(btn.dataset.direction);
  }

  #appendArticles() {
    const articles = Array.from(document.querySelectorAll(".giveaway__item"));
    if (articles.length === 0) return;
    // Calculate how many articles can fit based on the client width
    const maxVisibleArticles = Math.floor(this.#containerWidth / this.#cardWidth);
    console.log(maxVisibleArticles);
    const itemsToClone = articles.slice(0, maxVisibleArticles);
    // Clone and append items to the parent element
    itemsToClone.forEach((item) => {
      const clonedElement = item.cloneNode(true);
      this._parentEl.appendChild(clonedElement);
    });
  }
}

export default new GiveawayView();
