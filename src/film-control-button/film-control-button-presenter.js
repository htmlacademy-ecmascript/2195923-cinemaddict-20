import FilmControlButtonView from './film-control-button-view';
import {remove, render} from '../framework/render';
import {TypeControlButton} from '../const';
import Observable from '../framework/observable';

export default class FilmControlButtonPresenter extends Observable{
  #container = null;
  #filmsModel = null;
  #film = null;
  #viewType = null;
  #watchlistButtonView = null;
  #handleControlButtonClick = null;
  // #watchedButtonView = null;
  // #favoriteButtonView = null;
  constructor({container, filmsModel, film, type, handleControlButtonClick}) {
    super();
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#film = film;
    this.#viewType = type;
    this.#handleControlButtonClick = handleControlButtonClick;
    this.#filmsModel.addObserver(this.#makeAction);
  }

  #makeAction = (event, payload) => {
    switch(event) {
      case 'UPDATE_FILM':
        if(this.#film.id === payload.id) {
          this.#film = payload;
          this.#removeWatchlistButtonView();
          this.init();
        }
        break;
    }
  };

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

  #removeWatchlistButtonView() {
    remove(this.#watchlistButtonView);
  }

  #handleWatchlistClick = (watchlistButtonState) => {
    this.#handleControlButtonClick(watchlistButtonState);
  };
}
