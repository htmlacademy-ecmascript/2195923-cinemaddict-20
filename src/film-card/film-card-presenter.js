import FilmCardStandardView from './film-card-standard-view';
import {render, remove} from '../framework/render';
import FilmCardPopupView from './film-card-popup-view';
import Observable from '../framework/observable';

export default class FilmCardPresenter extends Observable{
  #container = null;
  #containerPopup = null;
  #filmCardStandardView = null;
  #filmCardPopupView = null;
  #filmModel = null;
  #commentsModel = [];
  constructor({container, containerPopup}) {
    super();
    this.#container = container;
    this.#containerPopup = containerPopup;
  }

  init({filmModel: filmModel, commentsModel: commentsModel}) {
    this.#filmModel = filmModel;
    this.#commentsModel = commentsModel;
    this.#filmCardStandardView = new FilmCardStandardView({
      filmModel: this.#filmModel,
      // onButtonAddToWatchlistClick,
      // onButtonMarkAsWatchedClick,
      // onButtonFavoriteClick,
      onContentCardClick: this.#handleContentCardClick,
    });
    this.#filmCardPopupView = new FilmCardPopupView({
      filmModel: this.#filmModel,
      commentsModel: this.#commentsModel,
      onPopupCloseButtonClick: this.#handlePopupCloseButtonClick,
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
    this.#filmCardPopupView.init();
    this._notify('OPEN_POPUP', this.#filmModel.id);
  };

  #handlePopupCloseButtonClick = () => {
    this.removePopup();
    this._notify('CLOSE_POPUP', this.#filmModel.id);
  };
}
