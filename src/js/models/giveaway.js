export default class Giveaway {
  #url;
  #id;
  #keys;
  #img;
  #title;
  #desc;

  constructor(obj) {
    this.#url = obj?.giveaway_url || "";
    this.#id = obj?.id || 0;
    this.#keys = obj?.keys_left || 0;
    this.#img = obj?.main_image || "";
    this.#title = obj?.title || "";
    this.#desc = obj?.short_description || "";
  }

  // Getters
  get url() {
    return this.#url;
  }

  get id() {
    return this.#id;
  }

  get keys() {
    return this.#keys;
  }

  get img() {
    return this.#img;
  }

  get title() {
    return this.#title;
  }

  get desc() {
    return this.#desc;
  }
}
