class TagsView {
  _parentEl = document.querySelector(".tags__container");

  render(data) {
    this._data = data;
    this._parentEl.innerHTML = this.#renderTags();
  }

  #renderTags() {
    return this._data.map((tag) => `<div data-id=${tag} class="tags__tag"><span>${tag}</span> <i class="remove fas fa-times"></i></div>`).join("");
  }

  addHandlerRemove(cb) {
    this._parentEl.addEventListener("click", (e) => this.#removeTag(e, cb));
  }

  #removeTag(e, cb) {
    if (!e.target.classList.contains("remove")) return;
    const id = e.target.closest(".tags__tag").dataset.id;
    cb(id);
  }
}

export default new TagsView();
