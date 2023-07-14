import FilmCardStandardView from './film-card-standard-view';
import {render, remove} from '../framework/render';
import FilmCardPopupView from './film-card-popup-view';
import Observable from '../framework/observable';
import FilmControlButtonPresenter from '../film-control-button/film-control-button-presenter';
import {TypeControlButtonView} from '../const';
import FilmCommentsListPresenter from '../film-comments-list/film-comments-list-presenter';

export default class FilmCardPresenter extends Observable{
  #container = null;
  #containerPopup = null;
  #filmCardStandardView = null;
  #filmCardPopupView = null;
  #filmId = null;
  #filmsModel = null;
  #film = null;
  #commentsModel = [];
  #filmCardControlButtonPresenter = null;
  #filmPopupControlButtonPresenter = null;
  #filmCommentsListPresenter = null;
  constructor({container, containerPopup}) {
    super();
    this.#container = container;
    this.#containerPopup = containerPopup;
  }

  init({filmId: filmId, filmsModel: filmsModel, commentsModel: commentsModel}) {
    this.#filmId = filmId;
    this.#filmsModel = filmsModel;
    this.#film = this.#filmsModel.films.find((film) => film.id === this.#filmId);
    this.#commentsModel = commentsModel;
    // this.#commentsModel.addObserver(this.#updateCountComments);
    this.#createStandardView();
    render(this.#filmCardStandardView, this.#container);
  }

  #createStandardView() {
    this.#filmCardStandardView = new FilmCardStandardView({
      film: this.#film,
      onContentCardClick: this.#handleContentCardClick,
    });
    const containerControlButton = this.#filmCardStandardView.controlButtonContainer;
    this.#filmCardControlButtonPresenter = new FilmControlButtonPresenter({
      container: containerControlButton,
      filmsModel: this.#filmsModel,
      film: this.#film,
      type: TypeControlButtonView.STANDARD,
      handleFilmControlButtonClick: this.#handleFilmControlButtonClick,
    });
    this.#filmCardControlButtonPresenter.init();
  }

  #createPopupView() {
    const comments = [];
    this.#commentsModel.comments.forEach((value) => {
      comments.push(value);
    });

    this.#filmCardPopupView = new FilmCardPopupView({
      film: this.#filmsModel.films.find((film) => film.id === this.#filmId),
      comments: comments,
      onPopupCloseButtonClick: this.#handlePopupCloseButtonClick,
    });

    const containerControlButton = this.#filmCardPopupView.controlButtonContainer;
    const containerCommentsList = this.#filmCardPopupView.commentsListContainer;

    this.#filmPopupControlButtonPresenter = new FilmControlButtonPresenter({
      container: containerControlButton,
      filmsModel: this.#filmsModel,
      film: this.#film,
      type: TypeControlButtonView.EXTENDS,
      handleFilmControlButtonClick: this.#handleFilmControlButtonClick,
    });

    this.#filmCommentsListPresenter = new FilmCommentsListPresenter({
      container: containerCommentsList,
      commentsModel: this.#commentsModel,
      comments: comments,
      filmId: this.#filmId,
    });

    this.#filmPopupControlButtonPresenter.init();
    this.#filmCommentsListPresenter.init();
    document.addEventListener('keydown', this.#onEnterCommentFormKeydown);
  }

  removeView() {
    remove(this.#filmCardStandardView);
  }

  removePopup() {
    remove(this.#filmCardPopupView);
  }

  #getComments = async () => {
    await this.#commentsModel.init(this.#filmId);
  };

  #handleContentCardClick = () => {
    this.#getComments().then(() => {
      this.#createPopupView();
      render(this.#filmCardPopupView, this.#containerPopup);
      this.#filmCardPopupView.init();
      this._notify('OPEN_POPUP', this.#filmId);
    });
  };

  #handlePopupCloseButtonClick = () => {
    this.removePopup();
    this.#removeObserver();
    document.removeEventListener('keydown', this.#onEnterCommentFormKeydown);
    this._notify('CLOSE_POPUP', this.#filmId);
  };

  #handleFilmControlButtonClick = (state) => {
    this._notify('WATCHLIST_CLICK', state);
  };

  #onEnterCommentFormKeydown = (evt) => {
    evt.preventDefault();
    if ((evt.metaKey || evt.ctrlKey) && evt.key === 'Enter') {
      this.#filmCommentsListPresenter.handleEnterCommentFormKeydown();
    }
  };

  #removeObserver() {
    this.#filmCommentsListPresenter.removeObserver();
  }
}
