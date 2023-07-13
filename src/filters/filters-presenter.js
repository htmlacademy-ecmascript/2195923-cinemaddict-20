import FiltersView from './filters-view';
import {render, remove, RenderPosition} from '../framework/render';

export default class FiltersPresenter {
  #container = null;
  #filtersView = null;
  #filmsModel = null;
  constructor({container}) {
    this.#container = container;
  }

  init({filmsModel}) {
    this.#filmsModel = filmsModel;
    this.#filtersView = new FiltersView();
    this.#filtersView.init(this.countCountFilmsByFilters);
    render(this.#filtersView, this.#container, RenderPosition.AFTERBEGIN);
    this.#filmsModel.addObserver(this.#rerenderFilters);
  }

  get countCountFilmsByFilters() {
    let countWatchlistFilms = 0;
    let countWatchedFilms = 0;
    let countFavoriteFilms = 0;
    this.#filmsModel.films.forEach((film) => {
      if (film.userDetails.watchlist) {
        countWatchlistFilms++;
      }
      if (film.userDetails.watched) {
        countWatchedFilms++;
      }
      if (film.userDetails.favorite) {
        countFavoriteFilms++;
      }
    });
    return {countWatchlistFilms, countWatchedFilms, countFavoriteFilms};
  }

  #rerenderFilters = (event) => {
    if (event === 'UPDATE_FILM') {
      remove(this.#filtersView);
      this.#filtersView = new FiltersView();
      this.#filtersView.init(this.countCountFilmsByFilters);
      render(this.#filtersView, this.#container, RenderPosition.AFTERBEGIN);
    }
  };
}
