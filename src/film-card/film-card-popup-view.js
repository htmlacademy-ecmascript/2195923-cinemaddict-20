import AbstractView from '../framework/view/abstract-view';
import {createPopupFilmCardTemplate} from './film-card-popup-template';

export default class FilmCardPopupView extends AbstractView {
  #film = null;
  #popupCloseButton = null;
  #handlePopupCloseButtonClick = null;

  constructor({
    model,
    onPopupCloseButtonClick,
  }) {
    super();
    this.#film = model;
    this.#handlePopupCloseButtonClick = onPopupCloseButtonClick;
    this.init();
  }

  init() {
    this.#popupCloseButton = this.element.querySelector('.film-details__close-btn');
    this.setHandlers();
  }

  get template() {
    return createPopupFilmCardTemplate(this.#film);
  }

  setHandlers() {
    this.#popupCloseButton.addEventListener('click', this.#onPopupCloseButtonClick);
  }

  #onPopupCloseButtonClick = (evt) => {
    evt.preventDefault();
    this.#handlePopupCloseButtonClick();
  };
}
