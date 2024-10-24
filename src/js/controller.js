import App from "./app.js";
import filtersView from "./views/filtersView.js";
import giveawayView from "./views/giveawayView.js";
import newGamesView from "./views/newGamesView.js";
import articlesView from "./views/articlesView.js";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView.js";
import tagsView from "./views/tagsView.js";
import gamesView from "./views/gamesView.js";
import countView from "./views/countView.js";
import gamesPaginationView from "./views/gamesPaginationView.js";
import currentGameView from "./views/currentGameView.js";
import navigationView from "./views/navigationView.js";

class Controller {
  async init() {
    await App.init();
    this.#renderComponents();
    this.#hookEvents();
  }

  #renderComponents() {
    this.#renderCount();
    this.#renderTags();
    this.#renderGames();
    this.#renderGamesPagination();
    this.#renderNewGames();
    this.#renderGiveaways();
    this.#renderArticles();
    this.#renderPagination();
  }

  #renderCount() {
    countView.render(App.state.games);
  }

  #renderTags() {
    tagsView.render(App.params.category);
  }

  #renderGames() {
    gamesView.render(App.getGamesPerPage());
  }

  #renderGamesPagination() {
    gamesPaginationView.render([App.state.pageGames, App.state.gamesPerPage, App.state.games]);
  }

  #renderNewGames() {
    newGamesView.render(App.state.trending);
  }

  #renderGiveaways() {
    giveawayView.render(App.state.giveaways);
  }

  #renderArticles() {
    articlesView.render(App.getNewsPerPage());
  }

  #renderPagination() {
    paginationView.render([App.state.page, App.state.articlePerPage, App.state.news]);
  }

  #hookEvents() {
    navigationView.addHandlerClick();
    paginationView.addHandlerClick(this.#controlPaginationNews.bind(this));
    gamesPaginationView.addHandlerClick(this.#controlPaginationGames.bind(this));
    searchView.addHandlerChange();
    searchView.addHandlerClick(this.#controlAddCategory.bind(this));
    filtersView.addHandlerClick(this.#controlPlatform.bind(this), this.#controlSort.bind(this));
    tagsView.addHandlerRemove(this.#controlRemoveCategory.bind(this));
    gamesView.addHandlerHashChange(this.#test);
    currentGameView.addHandlerClose();
  }

  async #test() {
    const id = window.location.hash.slice(1);
    if (!id) return;
    await App.getGameById(id);
    console.log(App.state.currentGame);
    currentGameView.render(App.state.currentGame);
    currentGameView.showCurrentGame();
  }

  #controlPaginationNews(page) {
    App.state.page = page;
    this.#updateNews();
  }

  #updateNews() {
    articlesView.render(App.getNewsPerPage());
    paginationView.render([App.state.page, App.state.articlePerPage, App.state.news]);
  }

  #controlPaginationGames(page) {
    App.state.pageGames = page;
    this.#updateGames();
  }

  #updateGames() {
    gamesView.render(App.getGamesPerPage());
    gamesPaginationView.render([App.state.pageGames, App.state.gamesPerPage, App.state.games]);
  }

  async #controlSort(sort) {
    App.params.sort_by = sort;
    this.#updateFilter();
  }

  async #controlPlatform(platform) {
    App.params.platform = platform;
    this.#updateFilter();
  }

  async #updateFilter() {
    App.state.pageGames = 1;
    await App.getGamesByFilter();
    this.#renderAfterCategoryUpdate();
  }

  async #controlAddCategory(tag) {
    if (App.params.category.length === 4) return;
    console.log(this);
    await this.#updateCategoriesAndGames(() => App.addCategory(tag));
  }

  async #controlRemoveCategory(tag) {
    await this.#updateCategoriesAndGames(() => App.removeCategory(tag));
  }

  async #updateCategoriesAndGames(cb) {
    cb();
    App.state.pageGames = 1;
    await App.getGamesByFilter();
    this.#renderAfterCategoryUpdate();
  }

  #renderAfterCategoryUpdate() {
    countView.render(App.state.games);
    this.#renderTags();
    this.#updateGames();
  }
}

const controller = new Controller();
controller.init();
