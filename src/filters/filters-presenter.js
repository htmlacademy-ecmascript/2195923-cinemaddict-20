import FiltersView from './filters-view';
import {render, remove, RenderPosition} from '../framework/render';

export default class FiltersPresenter {
  #container = null;
  #filtersView = null;
  #filmListPresenter = null;
  #filmsModel = null;
  #filterFilms = null;
  #currentFilter = 'all';
  constructor({container}) {
    this.#container = container;
  }

  init({filmsModel, filmListPresenter}) {
    this.#filmsModel = filmsModel;
    this.#filmListPresenter = filmListPresenter;
    this.#filtersView = new FiltersView({handleFiltersClick: this.#handleFiltersClick});
    this.#filtersView.init(this.countCountFilmsByFilters);
    render(this.#filtersView, this.#container, RenderPosition.AFTERBEGIN);
    this.#filmsModel.addObserver(this.#rerenderFilters);
    this.#filmsModel.addObserver(this.#rerenderFilterFilms);
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
      this.#filtersView = new FiltersView({handleFiltersClick: this.#handleFiltersClick});
      this.#filtersView.init(this.countCountFilmsByFilters);
      render(this.#filtersView, this.#container, RenderPosition.AFTERBEGIN);
    }
  };

  #rerenderFilterFilms = (event) => {
    if (event === 'UPDATE_FILM') {
      this.#handleFiltersClick(this.#currentFilter);
    }
  };

  #handleFiltersClick = (filterType) => {
    let filterFunction = null;
    this.#currentFilter = filterType;
    switch (filterType) {
      case 'watchlist':
        filterFunction = (film) => film.userDetails.watchlist;
        break;
      case 'history':
        filterFunction = (film) => film.userDetails.watched;
        break;
      case 'favorites':
        filterFunction = (film) => film.userDetails.favorite;
        break;
      case 'all':
        filterFunction = () => true;
        break;
      default:
        return;
    }
    this.#filterFilms = this.#filmsModel.getFilterFilms(filterFunction);
    this.#filmListPresenter.removeCards();
    this.#filmListPresenter.resetDisplayFilmsCount();
    this.#filmListPresenter.renderCards(this.#filterFilms);
  };
}
