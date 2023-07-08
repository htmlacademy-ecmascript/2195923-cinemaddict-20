import Observable from '../framework/observable';

export default class FilmModel extends Observable{
  #films = [];
  #filmsApiService = null;

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  async init() {
    const films = await this.#filmsApiService.films;
    this.#films = films.map(this.#filmsApiService.adaptToClient);
  }

  async update(filmForUpdate) {
    const index = this.#films.findIndex((film) => film.id === filmForUpdate.id);
    const response = await this.#filmsApiService.updateUserDetails(filmForUpdate);
    const updateFilm = this.#filmsApiService.adaptToClient(response);
    this.#films = [
      ...this.#films.slice(0, index),
      updateFilm,
      ...this.#films.slice(index + 1),
    ];
    this._notify('UPDATE_FILM', this.films[index]);
  }

  get films() {
    return this.#films;
  }
}
