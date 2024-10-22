import { PaginationView } from "./paginationView.js";

class GamesPaginationView extends PaginationView {
  _parentEl = document.querySelector(".pagination--games");
}

export default new GamesPaginationView();
