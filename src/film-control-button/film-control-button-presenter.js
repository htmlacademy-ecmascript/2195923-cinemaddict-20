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
  #watchedButtonView = null;
  #favoriteButtonView = null;
  #handleFilmControlButtonClick = null;
  constructor({container, filmsModel, film, type, handleFilmControlButtonClick}) {
    super();
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#film = film;
    this.#viewType = type;
    this.#handleFilmControlButtonClick = handleFilmControlButtonClick;
    this.#filmsModel.addObserver(this.#makeAction);
  }

  #makeAction = (event, payload) => {
    switch(event) {
      case 'UPDATE_FILM':
        if(this.#film.id === payload.id) {
          this.#film = payload;
          this.#removeControlButtonViews();
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
      handleControlButtonClick: this.#handleControlButtonClick,
    });
    this.#watchedButtonView = new FilmControlButtonView({
      film: this.#film,
      buttonType: TypeControlButton.WATCHED_BUTTON,
      viewType: this.#viewType,
      handleControlButtonClick: this.#handleControlButtonClick,
    });
    this.#favoriteButtonView = new FilmControlButtonView({
      film: this.#film,
      buttonType: TypeControlButton.FAVORITE_BUTTON,
      viewType: this.#viewType,
      handleControlButtonClick: this.#handleControlButtonClick,
    });
    render(this.#watchlistButtonView, this.#container);
    render(this.#watchedButtonView, this.#container);
    render(this.#favoriteButtonView, this.#container);
  }

  #removeControlButtonViews() {
    remove(this.#watchlistButtonView);
    remove(this.#favoriteButtonView);
    remove(this.#watchedButtonView);
  }

  #handleControlButtonClick = (state) => {
    this.#handleFilmControlButtonClick(state);
  };
}
