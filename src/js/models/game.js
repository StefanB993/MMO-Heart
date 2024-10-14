export default class Game {
  #id;
  #title;
  #thumbnail;
  #short_description;
  #description;
  #game_url;
  #genre;
  #platform;
  #developer;
  #release_date;
  #system_requirements;
  #screenshots;

  constructor(obj) {
    this.#id = obj?.id || ""; // Default to "" if id is not provided
    this.#title = obj?.title || "";
    this.#thumbnail = obj?.thumbnail || "";
    this.#short_description = obj?.short_description || "";
    this.#description = obj?.description || "";
    this.#game_url = obj?.game_url || "";
    this.#genre = obj?.genre || "";
    this.#platform = obj?.platform || "";
    this.#developer = obj?.developer || "";
    this.#release_date = this.#formatDate(obj?.release_date) || "";
    this.#system_requirements = obj?.minimum_system_requirements || {};
    this.#screenshots = obj?.screenshots || {};
  }

  #formatDate(date) {
    if (!date) return;
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-US");
  }

  // Getters
  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  get shortDescription() {
    return this.#short_description;
  }

  get description() {
    return this.#description;
  }

  get gameUrl() {
    return this.#game_url;
  }

  get genre() {
    return this.#genre;
  }

  get platform() {
    return this.#platform;
  }

  get developer() {
    return this.#developer;
  }

  get releaseDate() {
    return this.#release_date;
  }

  get systemRequirements() {
    return this.#system_requirements;
  }

  get screenshots() {
    return this.#screenshots;
  }
}
