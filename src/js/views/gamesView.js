import { NewGamesView } from "./newGamesView.js";

class GamesView extends NewGamesView {
  _parentEl = document.querySelector(".games__container");

  _generateGame(game) {
    return `<article class="game game--browse" data-id=${game.id}>
                        <figure class="game__header">
                         
                            <img class="game__img" src="${game.thumbnail}" alt="${game.title}" />
                          
                        </figure>
                        <div class="game__body">
                            <div class="game__title">
                                <h3 class="heading heading--tertiary"><a href="#${game.id}">${game.title}</a></h3>
                                <div class="game__title-sub">
                                    <p class="game__dev">${game.developer}</p>
                                    <p class="game__date">${this._formatDate(game.releaseDate)}</p>
                                </div>
                            </div>  
                        </div>
                    </article>`;
  }

  addHandlerHashChange(cb) {
    window.addEventListener("hashchange", cb);
  }

  addHandlerClick() {
    window.addEventListener("click", function (e, cb) {
      const game = e.target.closest(".game");
      if (!game) return;
      location.hash = `#${game.dataset.id}`;
    });
  }
}

export default new GamesView();
