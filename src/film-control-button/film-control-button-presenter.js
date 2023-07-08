import FilmControlButtonView from './film-control-button-view';
import {render} from '../framework/render';
import {TypeControlButton} from '../const';

export default class FilmControlButtonPresenter {
  #container = null;
  #film = null;
  #watchlistButtonView = null;
  #watchedButtonView = null;
  #favoriteButtonView = null;
  constructor({container, film}) {
    this.#container = container;
    this.#film = film;
  }

  init() {
    this.#watchlistButtonView = new FilmControlButtonView({film: this.#film, type: TypeControlButton.WATCHLIST_BUTTON});
    this.#watchedButtonView = new FilmControlButtonView({film: this.#film, type: TypeControlButton.WATCHED_BUTTON});
    this.#favoriteButtonView = new FilmControlButtonView({film: this.#film, type: TypeControlButton.FAVORITE_BUTTON});
    render(this.#watchlistButtonView, this.#container);
    render(this.#watchedButtonView, this.#container);
    render(this.#favoriteButtonView, this.#container);
  }
}
