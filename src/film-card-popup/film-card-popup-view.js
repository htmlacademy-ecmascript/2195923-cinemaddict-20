import AbstractView from '../framework/view/abstract-view';
import {createPopupFilmCardTemplate} from './film-card-popup-template';

export default class FilmCardPopupView extends AbstractView {
  #film = null;

  constructor({
    model,
  }) {
    super();
    this.#film = model;
  }

  get template() {
    return createPopupFilmCardTemplate(this.#film);
  }
}
