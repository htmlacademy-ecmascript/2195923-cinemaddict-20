import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createFiltersTemplate} from './filters-template';

export default class FiltersView extends AbstractStatefulView {
  constructor() {
    super();
    this._state = {
      type: 'all',
      countWatchlistFilms: 0,
      countWatchedFilms: 0,
      countFavoriteFilms: 0,
    };
  }

  init(countCountFilmsByFilters) {
    const {countWatchlistFilms, countWatchedFilms, countFavoriteFilms} = countCountFilmsByFilters;
    this.updateElement({
      countWatchlistFilms: countWatchlistFilms,
      countWatchedFilms: countWatchedFilms,
      countFavoriteFilms: countFavoriteFilms,
    });
  }

  _restoreHandlers() {

  }

  get template() {
    return createFiltersTemplate(this._state);
  }
}
