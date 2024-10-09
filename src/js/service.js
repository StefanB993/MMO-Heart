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
}

export default new Service();
