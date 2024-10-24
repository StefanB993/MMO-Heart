import service from "./service.js";
import Giveaway from "./models/giveaway.js";
import Game from "./models/game.js";
import Article from "./models/article.js";
import { ARTICLE_PER_PAGE, GAMES_PER_PAGE } from "./config.js";

class App {
  state = {
    currentGame: null,
    page: 1,
    pageGames: 1,
    articlePerPage: ARTICLE_PER_PAGE,
    gamesPerPage: GAMES_PER_PAGE,
    language: navigator.language,
  };
  params = {
    sort_by: "",
    category: [],
    platform: "",
  };

  async init() {
    await Promise.all([this.#initGiveaway(), this.#initGames(), this.#initNews(), this.getGamesByFilter()]);
  }

  async #initGiveaway() {
    this.state.giveaways = await service.getGiveaways();
    this.state.giveaways = this.state.giveaways.map((el) => new Giveaway(el));
  }

  async #initGames() {
    this.params.sort_by = "release-date";
    this.state.trending = await service.getGames(this.params);
    this.state.trending = this.state.trending.slice(0, 6).map((el) => new Game(el));
  }

  async #initNews() {
    this.state.news = await service.getNews();
    this.state.news = this.state.news.map((el) => new Article(el));
  }

  async getGamesByFilter() {
    this.state.games = await service.getGamesByFilter(this.params);
    this.state.games = this.state.games.map((game) => new Game(game));
  }

  async getGameById(id) {
    const game = await service.getGameById(id);
    this.state.currentGame = new Game(game);
  }

  getNewsPerPage(page = this.state.page) {
    this.state.page = page;
    const start = (this.state.page - 1) * this.state.articlePerPage;
    const end = this.state.page * this.state.articlePerPage;
    return this.state.news.slice(start, end);
  }

  getGamesPerPage(page = this.state.pageGames) {
    this.state.pageGames = page;
    const start = (this.state.pageGames - 1) * this.state.gamesPerPage;
    const end = this.state.pageGames * this.state.gamesPerPage;
    return this.state.games.slice(start, end);
  }

  addCategory(category) {
    if (this.params.category.find((e) => e === category)) return;
    this.params.category.push(category);
    console.log(this.params.category);
  }

  async removeCategory(category) {
    const index = this.params.category.findIndex((el) => el === category);
    this.params.category.splice(index, 1);
  }
}

export default new App();
