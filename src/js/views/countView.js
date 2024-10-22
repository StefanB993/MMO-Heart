import View from "./view.js";

class CountView extends View {
  _parentEl = document.querySelector(".tags__results");

  _generateMarkup() {
    return this._data.length;
  }
}

export default new CountView();
