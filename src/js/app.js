import service from "./service.js";
import Giveaway from "./models/giveaway.js";
import Game from "./models/game.js";
import Article from "./models/article.js";
import { ARTICLE_PER_PAGE } from "./config.js";

class App {
  state = {
    page: 1,
    articlePerPage: ARTICLE_PER_PAGE,
    language: navigator.language,
  };
  params = {
    sort_by: "",
  };

  async init() {
    await Promise.all([this.#initGiveaway(), this.#initGames(), this.#initNews()]);
  }

  async #initGiveaway() {
    this.state.giveaways = await service.getGiveaways();
    this.state.giveaways = this.state.giveaways.map((el) => new Giveaway(el));
  }

  async #initGames() {
    this.params.sort_by = "release-date";
    this.state.games = await service.getGames(this.params);
    this.state.games = this.state.games.slice(0, 6).map((el) => new Game(el));
  }

  async #initNews() {
    this.state.news = await service.getNews();
    this.state.news = this.state.news.map((el) => new Article(el));
  }

  getNewsPerPage(page = this.state.page) {
    this.state.page = page;
    const start = (this.state.page - 1) * this.state.articlePerPage;
    const end = this.state.page * this.state.articlePerPage;
    return this.state.news.slice(start, end);
  }
}

export default new App();
