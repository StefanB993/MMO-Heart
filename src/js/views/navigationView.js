class NavigationView {
  #open = document.querySelector(".btn--nav");
  #close = document.querySelector(".nav-mob__btn");
  #mobNavigation = document.querySelector(".nav-mob");

  addHandlerClick() {
    document.addEventListener("click", (e) => this.#control(e));
  }

  #showNavigation() {
    this.#mobNavigation.classList.add("open");
  }

  #closeNavigation() {
    this.#mobNavigation.classList.remove("open");
  }

  #control(e) {
    const btn = e.target.closest(".btn--nav") || e.target.closest(".nav-mob__btn");
    if (!btn) return;
    btn.classList.contains("btn--nav") ? this.#showNavigation() : this.#closeNavigation();
  }
}

export default new NavigationView();
