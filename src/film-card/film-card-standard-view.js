import AbstractView from '../framework/view/abstract-view';
import {createStandardFilmCardTemplate} from './film-card-standard-template';

export default class FilmCardStandardView extends AbstractView {
  #film = null;
  #contentCard = null;
  #handleContentCardClick = null;
  constructor({
    film,
    onContentCardClick,
  }) {
    super();
    this.#film = film;

    this.#contentCard = this.element.querySelector('.film-card > a');
    this.#handleContentCardClick = onContentCardClick;
    this.#addListener();
  }

  get template() {
    return createStandardFilmCardTemplate(this.#film);
  }

  get controlButtonContainer() {
    return this.element.querySelector('.film-card__controls');
  }

  #addListener() {
    this.#contentCard.addEventListener('click', this.onContentCardClick);
  }

  onContentCardClick = (evt) => {
    evt.preventDefault();
    this.#handleContentCardClick();
  };
}
