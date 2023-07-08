import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createPopupFilmCardTemplate} from './film-card-popup-template';

export default class FilmCardPopupView extends AbstractStatefulView {
  #popupCloseButton = null;
  #handlePopupCloseButtonClick = null;

  constructor({
    film,
    comments,
    onPopupCloseButtonClick,
  }) {
    super();
    this._state = this.#parseToState({film, comments});
    this.#handlePopupCloseButtonClick = onPopupCloseButtonClick;
    this.init();
  }

  init() {
    this._restoreHandlers();
  }

  get template() {
    return createPopupFilmCardTemplate({state: this._state});
  }

  get controlButtonContainer() {
    return this.element.querySelector('.film-details__controls');
  }

  _restoreHandlers() {
    this.#popupCloseButton = this.element.querySelector('.film-details__close-btn');
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
