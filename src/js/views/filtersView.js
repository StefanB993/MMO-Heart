class FiltersView {
  #toggleBtn = document.querySelector(".filter");
  #filterContainer = document.querySelector(".browse__filters");

  constructor() {
    this.#hookEvents();
  }

  #hookEvents() {
    this.#toggleBtn.addEventListener("click", this.#toggleFilters.bind(this));
    document.addEventListener("click", this.#handleDocumentClick.bind(this));
  }

  #toggleFilters() {
    this.#filterContainer.classList.toggle("show");
  }

  #handleDocumentClick(e) {
    this.#handleFilterClick(e);
    this.#handleOutsideClick(e);
  }

  #handleFilterClick(e) {
    const filter = e.target.closest(".browse__filter");
    if (!filter) return;

    filter.classList.toggle("active");
    this.#toggleIcons(filter);
  }

  #handleOutsideClick(e) {
    const filter = e.target.closest(".browse__filter");
    if (!filter) {
      this.#removeActiveClasses();
    }
  }

  #toggleIcons(filter) {
    filter.querySelectorAll(".fas").forEach((icon) => icon.classList.toggle("hidden"));
  }

  #removeActiveClasses() {
    document.querySelectorAll(".browse__filter").forEach((el) => el.classList.remove("active"));
  }

  addHandlerClick(callbackPlatform, callbackSort) {
    this.#filterContainer.addEventListener("click", (e) => {
      const sortElement = e.target.closest("[data-role]");
      if (!sortElement) return;
      const role = sortElement.dataset.role;
      const filter = sortElement.dataset.filter;
      role === "platform" ? callbackPlatform(filter) : callbackSort(filter);
    });
  }
}

export default new FiltersView();
