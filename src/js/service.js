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
      if (!obj.hasOwnProperty(key)) return;
      const formattedKey = key.replaceAll("_", "-").toLowerCase();
      searchParams.append(formattedKey, obj[key]);
    }

    return searchParams.toString();
  }
}

export default new Service();
