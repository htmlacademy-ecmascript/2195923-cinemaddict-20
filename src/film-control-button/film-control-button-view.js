import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createFilmControlButtonTemplate} from './film-control-button-template';
import {TypeControlButton} from '../const';

export default class FilmControlButtonView extends AbstractStatefulView {
  #type = null;
  constructor({film, type}) {
    super();
    this.#type = type;
    this._state = this.#parseToState(film);
    this.init();
  }

  init() {
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#onFilmControlButtonClick);
  }

  get template() {
    return createFilmControlButtonTemplate({state: this._state});
  }

  #onFilmControlButtonClick = (evt) => {
    evt.preventDefault();
    switch (this.#type) {
      case TypeControlButton.WATCHLIST_BUTTON:
        this.updateElement({watchlist: !this._state.watchlist});
        break;
      case TypeControlButton.FAVORITE_BUTTON:
        this.updateElement({favorite: !this._state.favorite});
        break;
      case TypeControlButton.WATCHED_BUTTON:
        this.updateElement({
          watched: !this._state.watched,
          watchingDate: !this._state.watched ? new Date() : null,
        });
        break;
    }
  };

  #parseToState(film) {
    const state = {
      [this.#type]: film.userDetails[this.#type],
      type: this.#type
    };
    return film.userDetails[this.#type] === TypeControlButton.WATCHED_BUTTON ? {...state, watchingDate: film.userDetails.watchingDate} : state;
  }
}
