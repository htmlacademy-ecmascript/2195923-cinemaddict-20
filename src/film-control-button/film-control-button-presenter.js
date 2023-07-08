import FilmControlButtonView from './film-control-button-view';
import {render} from '../framework/render';
import {TypeControlButton} from '../const';
import Observable from '../framework/observable';

export default class FilmControlButtonPresenter extends Observable{
  #container = null;
  #film = null;
  #viewType = null;
  #watchlistButtonView = null;
  #handleControlButtonClick = null;
  // #watchedButtonView = null;
  // #favoriteButtonView = null;
  constructor({container, film, type, handleControlButtonClick}) {
    super();
    this.#container = container;
    this.#film = film;
    this.#viewType = type;
    this.#handleControlButtonClick = handleControlButtonClick;
  }

  init() {
    this.#watchlistButtonView = new FilmControlButtonView({
      film: this.#film,
      buttonType: TypeControlButton.WATCHLIST_BUTTON,
      viewType: this.#viewType,
      handle: {
        handleWatchlistClick: this.#handleWatchlistClick,
      }
    });
    // this.#watchedButtonView = new FilmControlButtonView({
    //   film: this.#film,
    //   buttonType: TypeControlButton.WATCHED_BUTTON,
    //   viewType: this.#viewType
    // });
    // this.#favoriteButtonView = new FilmControlButtonView({
    //   film: this.#film,
    //   buttonType: TypeControlButton.FAVORITE_BUTTON,
    //   viewType: this.#viewType
    // });
    render(this.#watchlistButtonView, this.#container);
    // render(this.#watchedButtonView, this.#container);
    // render(this.#favoriteButtonView, this.#container);
  }

  #handleWatchlistClick = (watchlistButtonState) => {
    this.#handleControlButtonClick(watchlistButtonState);
  };
}
