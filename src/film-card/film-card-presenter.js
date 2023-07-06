import FilmCardStandardView from './film-card-standard-view';
import {render, remove} from '../framework/render';
import FilmCardPopupView from './film-card-popup-view';
import Observable from '../framework/observable';

export default class FilmCardPresenter extends Observable{
  #container = null;
  #containerPopup = null;
  #filmCardStandardView = null;
  #filmCardPopupView = null;
  #model = null;
  constructor({container, containerPopup}) {
    super();
    this.#container = container;
    this.#containerPopup = containerPopup;
  }

  init({model}) {
    this.#model = model;
    this.#filmCardStandardView = new FilmCardStandardView({
      model: model,
      // onButtonAddToWatchlistClick,
      // onButtonMarkAsWatchedClick,
      // onButtonFavoriteClick,
      onContentCardClick: this.#handleContentCardClick,
    });
    this.#filmCardPopupView = new FilmCardPopupView({
      model: model,
    });
    render(this.#filmCardStandardView, this.#container);
  }

  removeView() {
    remove(this.#filmCardStandardView);
  }

  removePopup() {
    remove(this.#filmCardPopupView);
  }

  #handleContentCardClick = () => {
    render(this.#filmCardPopupView, this.#containerPopup);
    this._notify('OPEN_POPUP', this.#model.id);
  };
}
