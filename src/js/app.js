import service from "./service.js";
import Giveaway from "./models/giveaway.js";
import giveawayView from "./views/giveawayView.js";

class App {
  #giveaways;

  async init() {
    await this.#initGiveaway();
    giveawayView.render(this.#giveaways);
  }

  async #initGiveaway() {
    this.#giveaways = await service.getGiveaways();
    this.#giveaways = this.#giveaways.map((el) => new Giveaway(el));
    console.log(this.#giveaways);
  }
}

const app = new App();
app.init();
