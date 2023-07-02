import AbstractView from '../framework/view/abstract-view';
import {createStandardFilmCardTemplate} from './film-card-standard-template';

export default class FilmCardStandardView extends AbstractView {
  #film = null;
  constructor(model) {
    super();
    this.#film = model;
  }

  get template() {
    console.log(this.#film);
    return createStandardFilmCardTemplate(this.#film);
  }
}
