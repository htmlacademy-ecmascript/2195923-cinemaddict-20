export default class FilmModel {
  #films = [];
  #filmsApiService = null;

  constructor({filmsApiService}) {
    this.#filmsApiService = filmsApiService;
  }

  async init() {
    const films = await this.#filmsApiService.films;
    this.#films = films.map(this.#filmsApiService.adaptToClient);
  }

  get films() {
    return this.#films;
  }
}
