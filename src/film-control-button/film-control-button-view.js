import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createFilmControlButtonTemplate} from './film-control-button-template';
import {TypeControlButton} from '../const';

export default class FilmControlButtonView extends AbstractStatefulView {
  #buttonType = null;
  #viewType = null;
  #handleControlButtonClick = null;
  #film = null;
  constructor({
    film,
    buttonType,
    viewType,
    handleControlButtonClick
  }) {
    super();
    this.#buttonType = buttonType;
    this.#viewType = viewType;
    this.#film = film;
    this._state = this.#parseToState(film);
    this.#handleControlButtonClick = handleControlButtonClick;
    this.init();
  }

  init() {
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#onFilmControlButtonClick);
  }

  get template() {
    return createFilmControlButtonTemplate({state: this._state, templateType: this.#viewType});
  }

  #onFilmControlButtonClick = (evt) => {
    evt.preventDefault();
    switch (this.#buttonType) {
      case TypeControlButton.WATCHLIST_BUTTON:
        this.#handleControlButtonClick({
          ...this.#film,
          userDetails: {
            watched: this.#film.userDetails.watched,
            watchingDate: this.#film.userDetails.watchingDate,
            favorite: this.#film.userDetails.favorite,
            watchlist: !this._state.watchlist
          }
        });
        break;
      case TypeControlButton.FAVORITE_BUTTON:
        this.#handleControlButtonClick({
          ...this.#film,
          userDetails: {
            watched: this.#film.userDetails.watched,
            watchingDate: this.#film.userDetails.watchingDate,
            favorite: !this._state.favorite,
            watchlist: this.#film.userDetails.watchlist
          }
        });
        break;
      case TypeControlButton.WATCHED_BUTTON:
        this.#handleControlButtonClick({
          ...this.#film,
          userDetails: {
            watched: !this._state.watched,
            watchingDate: !this._state.watched ? new Date() : null,
            favorite: this.#film.userDetails.favorite,
            watchlist: this.#film.userDetails.watchlist
          }
        });
        break;
    }
  };

  #parseToState(film) {
    const state = {
      [this.#buttonType]: film.userDetails[this.#buttonType],
      type: this.#buttonType
    };
    return film.userDetails[this.#buttonType] === TypeControlButton.WATCHED_BUTTON ? {...state, watchingDate: film.userDetails.watchingDate} : state;
  }
}
