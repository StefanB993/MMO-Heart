import service from "./service.js";
import Giveaway from "./models/giveaway.js";
import Game from "./models/game.js";
import giveawayView from "./views/giveawayView.js";
import newGamesView from "./views/newGamesView.js";

class App {
  #giveaways;
  #games;
  #params = {
    sort_by: "",
  };

  async init() {
    await Promise.all([this.#initGiveaway(), this.#initGames()]);
  }

  async #initGiveaway() {
    this.#giveaways = await service.getGiveaways();
    this.#giveaways = this.#giveaways.map((el) => new Giveaway(el));
    giveawayView.render(this.#giveaways);
  }

  async #initGames() {
    this.#params.sort_by = "release-date";
    this.#games = await service.getGames(this.#params);
    this.#games = this.#games.slice(0, 6).map((el) => new Game(el));
    console.log(this.#games);
    newGamesView.render(this.#games);
  }
}

const app = new App();
app.init();
