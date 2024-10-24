import View from "./view.js";

export class NewGamesView extends View {
  _parentEl = document.querySelector(".new-games");

  _generateMarkup() {
    return this._data.reduce((sum, curr) => (sum += this._generateGame(curr)), "");
  }

  _generateGame(game) {
    return `<article class="game">
                    <figure class="game__header">
                        <img class="game__img" src="${game.thumbnail}" alt="${game.title}" />
                    </figure>
                    <div class="game__body">
                        <div class="game__title">
                            <h3 class="heading heading--tertiary"><a target="_blank" href="${game.gameUrl}">${game.title}</a></h3>
                            <div class="game__title-sub">
                                <p class="game__dev">${game.developer}</p>
                                <p class="game__date">${this._formatDate(game.releaseDate)}</p>
                            </div>
                        </div>
                        <p class="game_desc">${game.shortDescription}</p>
                    </div>
                </article>`;
  }

  _formatDate(date) {
    const newDate = new Date(date);
    const formatedDate = newDate.toLocaleDateString(this._data.language, { day: "numeric", month: "numeric", year: "numeric" });
    return formatedDate;
  }
}

export default new NewGamesView();
