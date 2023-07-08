import FilmCardStandardView from './film-card-standard-view';
import {render, remove} from '../framework/render';
import FilmCardPopupView from './film-card-popup-view';
import Observable from '../framework/observable';
import FilmControlButtonPresenter from '../film-control-button/film-control-button-presenter';

export default class FilmCardPresenter extends Observable{
  #container = null;
  #containerControlButton = null;
  #containerPopup = null;
  #filmCardStandardView = null;
  #filmCardPopupView = null;
  #film = null;
  #commentsModel = [];
  #filmControlButtonPresenter = null;
  constructor({container, containerPopup}) {
    super();
    this.#container = container;
    this.#containerPopup = containerPopup;
  }

  init({film: film, commentsModel: commentsModel}) {
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#createStandardView();
    render(this.#filmCardStandardView, this.#container);
  }

  #createStandardView() {
    this.#filmCardStandardView = new FilmCardStandardView({
      film: this.#film,
      // onButtonAddToWatchlistClick,
      // onButtonMarkAsWatchedClick,
      // onButtonFavoriteClick,
      onContentCardClick: this.#handleContentCardClick,
    });
  }

  #createPopupView() {
    this.#filmCardPopupView = new FilmCardPopupView({
      film: this.#film,
      comments: this.#commentsModel.comments.get(this.#film.id),
      onPopupCloseButtonClick: this.#handlePopupCloseButtonClick,
    });
    this.#containerControlButton = this.#filmCardPopupView.controlButtonContainer;
    this.#filmControlButtonPresenter = new FilmControlButtonPresenter({container: this.#containerControlButton, film: this.#film});
    this.#filmControlButtonPresenter.init();
  }

  removeView() {
    remove(this.#filmCardStandardView);
  }

  removePopup() {
    remove(this.#filmCardPopupView);
  }

  #getComments = async () => {
    await this.#commentsModel.init(this.#film.id);
  };

  #handleContentCardClick = () => {
    this.#getComments().then(() => {
      this.#createPopupView();
      render(this.#filmCardPopupView, this.#containerPopup);
      this.#filmCardPopupView.init();
      this._notify('OPEN_POPUP', this.#film.id);
    });
  };

  #handlePopupCloseButtonClick = () => {
    this.removePopup();
    this._notify('CLOSE_POPUP', this.#film.id);
  };
}
