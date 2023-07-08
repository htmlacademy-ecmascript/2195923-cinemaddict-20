import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createPopupFilmCardTemplate} from './film-card-popup-template';

export default class FilmCardPopupView extends AbstractStatefulView {
  #film = null;
  #comments = [];
  #popupCloseButton = null;
  #handlePopupCloseButtonClick = null;

  constructor({
    film,
    comments,
    onPopupCloseButtonClick,
  }) {
    super();
    this.#film = film;
    this.#comments = comments;
    this.#handlePopupCloseButtonClick = onPopupCloseButtonClick;
    this.init();
  }

  init() {
    this.#popupCloseButton = this.element.querySelector('.film-details__close-btn');
    this._restoreHandlers();
  }

  get template() {
    return createPopupFilmCardTemplate({film: this.#film, comments: this.#comments});
  }

  _restoreHandlers() {
    this.#popupCloseButton.addEventListener('click', this.#onPopupCloseButtonClick);
  }

  #onPopupCloseButtonClick = (evt) => {
    evt.preventDefault();
    this.#handlePopupCloseButtonClick();
  };

  #parseToState({film, comments}) {
    return {...structuredClone(film), comments: structuredClone(comments)};
  }

  #parseToModels(state) {
    const comments = structuredClone(state.comments);
    const film = { ...structuredClone(state), comments: Array.from(state.comments, (comment) => comment.id)};
    return {film: film, comments: comments};
  }
}
