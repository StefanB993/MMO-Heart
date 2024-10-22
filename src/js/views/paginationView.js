import View from "./view.js";

export class PaginationView extends View {
  _parentEl = document.querySelector(".pagination--news");

  _generateMarkup() {
    const [page, elementsPerPage, elements] = this._data;
    const totalPages = Math.ceil(elements.length / elementsPerPage);

    const leftButton =
      page > 1
        ? `
        <button class="pagination__control control control--left" data-go-to="${page - 1}">
            <i class="fas fa-chevron-left"></i>
        </button>`
        : "";

    const rightButton =
      page < totalPages
        ? `
        <button class="pagination__control control control--right" data-go-to="${page + 1}">
            <i class="fas fa-chevron-right"></i>
        </button>`
        : "";

    return `
        ${leftButton}
        <span class="pagination__page">${page}</span>
        ${rightButton}`;
  }

  addHandlerClick(cb) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".pagination__control");
      if (!btn) return;
      cb(+btn.dataset.goTo);
      this._parentEl.parentElement.scrollIntoView();
    });
  }
}

export default new PaginationView();
