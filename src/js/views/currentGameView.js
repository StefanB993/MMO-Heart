import View from "./view.js";

class CurrentGameView extends View {
  _parentEl = document.querySelector(".background");

  _generateMarkup() {
    return `<div class="current-game">
                <div class="current-game__header">
                    <h4 class="current-game__heading current-game__heading--main">${this._data.title}</h4>
                    <p>
                        ${this._data.description}
                    </p>
                </div>
                <div class="current-game__content">
                    <div class="current-game__about">
                        <h5 class="current-game__heading current-game__heading--sub">About</h5>
                        <div class="current-game__additional-info">
                            <div class="current-game__info">
                                <span>Platform</span>
                                <p>${this._data.platform}</p>
                            </div>
                            <div class="current-game__info">
                                <span>Publisher</span>
                                <p>${this._data.publisher}</p>
                            </div>
                            <div class="current-game__info">
                                <span>Developer</span>
                                <p>${this._data.developer}</p>
                            </div>
                            <div class="current-game__info">
                                <span>Genre</span>
                                <p>${this._data.genre}</p>
                            </div>
                            <div class="current-game__info">
                                <span>Release date</span>
                                <p>${this._data.releaseDate}</p>
                            </div>
                            <div class="current-game__info">
                                <span>Website</span>
                                <p><a href="${this._data.gameUrl}">${this._data.title}</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="current-game__system-requirements">
                        ${this.#renderSystemRequirements(this._data.systemRequirements)}
                    </div>
                </div>
            <div class="gallery">
                ${this.#renderScreenshots(this._data.screenshots)}
            </div>
        <button class='current-game__btn btn btn--full'><i class="fas fa-times"></i></button>
      </div>`;
  }

  #renderScreenshots(screenshots) {
    return screenshots
      .map(
        (sc) => `<figure class="gallery__container">
            <img class="gallery__img" src="${sc.image}" alt="" />
          </figure>`
      )
      .join("");
  }

  #renderSystemRequirements(req) {
    if (this.#checkIfNull(req) || Object.keys(req).length === 0) return "";
    return `<h5 class="current-game__heading current-game__heading--sub">System requirements</h5>
          <div class="current-game__requirements">
          <p class="current-game__requirement"><span>OS:</span> ${req.os}</p>
          <p class="current-game__requirement"><span>Processor:</span> ${req.processor}</p>
          <p class="current-game__requirement"><span>Memory:</span> ${req.memory}</p>
          <p class="current-game__requirement"><span>Graphics:</span> ${req.graphics}</p>
          <p class="current-game__requirement"><span>Storage:</span> ${req.storage}</p>
          </div>`;
  }

  showCurrentGame() {
    this._parentEl.classList.add("show");
  }

  hideCurrentGame() {
    this._parentEl.classList.remove("show");
  }

  addHandlerClose() {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".current-game__btn");
      if (!btn) return;
      history.replaceState(null, null, " ");
      this.hideCurrentGame();
    });
  }

  #checkIfNull(arr) {
    return Object.values(arr).some((el) => el === null || el === undefined);
  }
}

export default new CurrentGameView();
