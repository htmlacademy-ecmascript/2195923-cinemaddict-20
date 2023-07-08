import AbstractView from '../framework/view/abstract-view';
import {createPopupFilmCardTemplate} from './film-card-popup-template';

export default class FilmCardPopupView extends AbstractView {
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
    this.setHandlers();
  }

  get template() {
    return createPopupFilmCardTemplate({film: this.#film, comments: this.#comments});
  }

  setHandlers() {
    this.#popupCloseButton.addEventListener('click', this.#onPopupCloseButtonClick);
  }

  #onPopupCloseButtonClick = (evt) => {
    evt.preventDefault();
    this.#handlePopupCloseButtonClick();
  };
}
