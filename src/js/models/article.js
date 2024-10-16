export default class Article {
  #articleUrl;
  #mainImage;
  #shortDescription;
  #thumbnail;
  #title;

  constructor(data) {
    this.#articleUrl = data?.article_url || "";
    this.#mainImage = data?.main_image || "";
    this.#shortDescription = data?.short_description || "";
    this.#thumbnail = data?.thumbnail || "";
    this.#title = data?.title || "";
  }

  get articleUrl() {
    return this.#articleUrl;
  }

  get mainImage() {
    return this.#mainImage;
  }

  get shortDescription() {
    return this.#shortDescription;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  get title() {
    return this.#title;
  }
}
