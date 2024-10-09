export default class View {
  _parentEl;
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.innerHTML = markup;

    this._afterRender();
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  _generateMarkup() {}

  _afterRender() {}
}
