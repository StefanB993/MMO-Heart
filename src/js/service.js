import { API_MB, OPTIONS } from "./config.js";

class Service {
  async #fetchData(enpoint) {
    const response = await fetch(enpoint, OPTIONS);
    if (!response.ok) throw new Error(`Error fetching data`);
    return response.json();
  }
  async getGiveaways() {
    return this.#fetchData(`${API_MB}giveaways`);
  }

  async getGames(options) {
    const params = this.#objectToSearchParams(options);
    return this.#fetchData(`${API_MB}games?${params}`);
  }

  async getGameById(id) {
    return this.#fetchData(`${API_MB}game?id=${id}`);
  }

  async getGamesByFilter(options) {
    if (!options.category.length) {
      return await this.getGames(options);
    }
    const promise = options.category.map(async (category) => {
      const obj = JSON.parse(JSON.stringify(options));
      obj.category = category;
      return await this.getGames(obj);
    });

    const arr = await Promise.all(promise);
    if (!arr.length) throw new Error("No games found");
    return arr.length > 1 ? this.#findCommon(arr) : arr[0];
  }

  async getNews() {
    return this.#fetchData(`${API_MB}latestnews`);
  }

  #objectToSearchParams(obj) {
    const searchParams = new URLSearchParams();
    for (const key in obj) {
      if (!obj.hasOwnProperty(key) || obj[key].length == 0 || obj[key] === "") continue;
      const formattedKey = key.replaceAll("_", "-").toLowerCase();
      searchParams.append(formattedKey, obj[key]);
    }
    return searchParams.toString();
  }

  #findCommon(arr) {
    let common = arr[0];
    for (let i = 1; i < arr.length; i++) {
      common = common.filter((el) => arr[i].some((x) => el.id === x.id));
    }
    return common;
  }
}

export default new Service();
