import App from "./app.js";
import giveawayView from "./views/giveawayView.js";
import newGamesView from "./views/newGamesView.js";
import articlesView from "./views/articlesView.js";
import PaginationView from "./views/paginationView.js";
import paginationView from "./views/paginationView.js";

class Controller {
  async init() {
    await App.init();
    this.#renderComponents();
    this.#hookEvents();
  }

  #renderComponents() {
    giveawayView.render(App.state.giveaways);
    newGamesView.render(App.state);
    articlesView.render(App.getNewsPerPage());
    PaginationView.render(App.state);
  }

  #hookEvents() {
    paginationView.addHandlerClick(this.#controlPagination);
  }

  #controlPagination(page) {
    App.state.page = page;
    articlesView.render(App.getNewsPerPage());
    PaginationView.render(App.state);
  }
}

const controller = new Controller();
controller.init();
