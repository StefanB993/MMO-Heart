import View from "./view.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  _generateMarkup() {
    const { page, articlePerPage, news } = this._data;
    const totalPages = Math.ceil(news.length / articlePerPage);

    console.log(page, totalPages);

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
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination__control");
      if (!btn) return;
      cb(+btn.dataset.goTo);
    });
  }
}

export default new PaginationView();
