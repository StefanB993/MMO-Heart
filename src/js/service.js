import { API_MB, OPTIONS } from "./config.js";

class Service {
  async getGiveaways() {
    try {
      const data = await fetch(`${API_MB}giveaways`, OPTIONS);
      const res = await data.json();
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getGames(options) {
    try {
      const params = this.#objectToSearchParams(options);
      const data = await fetch(`${API_MB}games?${params}`, OPTIONS);
      const res = await data.json();
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getGamesByFilter(options) {
    try {
      if (!options.category.length) {
        return await this.getGames(options);
      }
      const promise = options.category.map(async (category) => {
        const obj = JSON.parse(JSON.stringify(options));
        obj.category = category;
        return await this.getGames(obj);
      });

      const arr = await Promise.all(promise);
      if (!arr.length) throw new Error();
      return arr.length > 1 ? this.#findCommon(arr) : arr[0];
    } catch (error) {
      throw error;
    }
  }

  async getNews() {
    try {
      const data = await fetch(`${API_MB}latestnews`, OPTIONS);
      const res = await data.json();
      return res;
    } catch (error) {
      throw error;
    }
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
