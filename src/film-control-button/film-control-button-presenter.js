import FilmControlButtonView from './film-control-button-view';
import {render} from '../framework/render';
import {TypeControlButton} from '../const';

export default class FilmControlButtonPresenter {
  #container = null;
  #film = null;
  #viewType = null;
  #watchlistButtonView = null;
  #watchedButtonView = null;
  #favoriteButtonView = null;
  constructor({container, film, type}) {
    this.#container = container;
    this.#film = film;
    this.#viewType = type;
  }

  init() {
    this.#watchlistButtonView = new FilmControlButtonView({
      film: this.#film,
      buttonType: TypeControlButton.WATCHLIST_BUTTON,
      viewType: this.#viewType
    });
    this.#watchedButtonView = new FilmControlButtonView({
      film: this.#film,
      buttonType: TypeControlButton.WATCHED_BUTTON,
      viewType: this.#viewType
    });
    this.#favoriteButtonView = new FilmControlButtonView({
      film: this.#film,
      buttonType: TypeControlButton.FAVORITE_BUTTON,
      viewType: this.#viewType
    });
    render(this.#watchlistButtonView, this.#container);
    render(this.#watchedButtonView, this.#container);
    render(this.#favoriteButtonView, this.#container);
  }
}
