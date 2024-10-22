import { GENRES } from "../config.js";

class SearchView {
  #suggestions = document.querySelector(".browse__suggestions");
  #list = document.querySelector(".browse__list");
  #search = document.querySelector(".browse__input");
  #genres;

  addHandlerChange() {
    this.#search.addEventListener("input", this.#change.bind(this));
  }

  addHandlerClick(cb) {
    this.#list.addEventListener("click", (e) => this.#click(e, cb));
  }

  #click(e, cb) {
    const tag = e.target.closest(".browse__tag");
    if (!tag) return;
    this.#hideSuggestions();
    this.#clearInput();
    cb(tag.dataset.tag);
  }

  #change(e) {
    const input = this.#search.value.toUpperCase();

    if (!input) {
      this.#hideSuggestions();
      return;
    }

    this.#genres = GENRES.filter((g) => g.includes(input));

    if (!this.#genres.length) {
      this.#hideSuggestions();
      return;
    }

    this.#renderSuggestions(input);
    this.#showSuggestions();
  }

  #renderSuggestions(input) {
    this.#list.innerHTML = this.#renderTags(input);
  }

  #renderTags(str) {
    return this.#genres.map((g) => `<li data-tag=${g} class="browse__tag">${g.replace(str, `<strong>${str}</strong>`)}</li>`).join("");
  }

  #showSuggestions() {
    this.#suggestions.classList.add("show");
  }

  #hideSuggestions() {
    this.#suggestions.classList.remove("show");
  }

  #clearInput() {
    this.#search.value = "";
  }
}

export default new SearchView();
