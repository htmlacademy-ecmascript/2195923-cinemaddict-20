import Observable from '../framework/observable';

export default class FilmModel extends Observable{
  #films = [];
  #filmsApiService = null;
  #sorting = (firstFilm, secondFilm) => firstFilm.id - secondFilm.id;
  #filter = () => true;

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
    return structuredClone(this.#films).filter(this.filter).sort(this.sorting);
  }

  set sorting(sortingFunction) {
    this.#sorting = sortingFunction;
  }

  get sorting() {
    return this.#sorting;
  }

  set filter(filterFunction) {
    this.#filter = filterFunction;
  }

  get filter() {
    return this.#filter;
  }
}
