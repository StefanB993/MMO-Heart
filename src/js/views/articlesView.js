import View from "./view.js";

class ArticlesView extends View {
  _parentEl = document.querySelector(".news");

  _generateMarkup() {
    return this._data.reduce((sum, curr) => {
      return (sum += this.#generateArticle(curr));
    }, "");
  }

  #generateArticle(article) {
    return `<article class="article">
                    <figure class="article__figure">
                        <img class="article__img" src="${article.mainImage}" alt="" />
                    </figure>
                    <div class="article__content">
                        <span class="article__span">Article</span>
                        <h3 class="heading heading--tertiary article__heading">
                            ${article.title}
                        </h3>
                        <p class="article__text">${this.#checkIfHTML(article.shortDescription)}</p>
                        <a target="_blank" href="${article.articleUrl}" class="btn btn--full btn--end">More</a>
                    </div>
                </article>`;
  }

  // Due to API responses sometimes being in form of HTML
  #checkIfHTML(data) {
    return data[0] === "<" ? "" : data;
  }
}

export default new ArticlesView();
