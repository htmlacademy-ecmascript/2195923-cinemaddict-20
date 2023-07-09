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
    this.#commentsModel = commentsModel;
    this.#createStandardView();
    render(this.#filmCardStandardView, this.#container);
  }

  #createStandardView() {
    this.#filmCardStandardView = new FilmCardStandardView({
      film: this.#filmsModel.films.find((film) => film.id === this.#filmId),
      onContentCardClick: this.#handleContentCardClick,
    });
    const containerControlButton = this.#filmCardStandardView.controlButtonContainer;
    this.#filmCardControlButtonPresenter = new FilmControlButtonPresenter({
      container: containerControlButton,
      filmsModel: this.#filmsModel,
      film: this.#filmsModel.films.find((film) => film.id === this.#filmId),
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
      film: this.#filmsModel.films.find((film) => film.id === this.#filmId),
      type: TypeControlButtonView.EXTENDS,
      handleFilmControlButtonClick: this.#handleFilmControlButtonClick,
    });

    this.#filmCommentsListPresenter = new FilmCommentsListPresenter({
      container: containerCommentsList,
      commentsModel: this.#commentsModel,
      comments: comments,
    });

    this.#filmPopupControlButtonPresenter.init();
    this.#filmCommentsListPresenter.init();
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
    this._notify('CLOSE_POPUP', this.#filmId);
  };

  #handleFilmControlButtonClick = (state) => {
    this._notify('WATCHLIST_CLICK', state);
  };
}
