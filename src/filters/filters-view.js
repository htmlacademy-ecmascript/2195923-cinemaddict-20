import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createFiltersTemplate} from './filters-template';

export default class FiltersView extends AbstractStatefulView {
  #handleFiltersClick = null;
  constructor({handleFiltersClick}) {
    super();
    this._state = {
      type: 'all',
      countWatchlistFilms: 0,
      countWatchedFilms: 0,
      countFavoriteFilms: 0,
    };
    this.#handleFiltersClick = handleFiltersClick;
    this._restoreHandlers();
  }

  init(countFilmsByFilters) {
    const {countWatchlistFilms, countWatchedFilms, countFavoriteFilms} = countFilmsByFilters;
    this.updateElement({
      countWatchlistFilms: countWatchlistFilms,
      countWatchedFilms: countWatchedFilms,
      countFavoriteFilms: countFavoriteFilms,
    });
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#onFiltersClick);
  }

  get template() {
    return createFiltersTemplate(this._state);
  }

  #onFiltersClick = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.id,
    });
    this.#handleFiltersClick(evt.target.id);
  };
}
