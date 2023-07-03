import AbstractView from '../framework/view/abstract-view';
import {createStandardFilmCardTemplate} from './film-card-standard-template';

export default class FilmCardStandardView extends AbstractView {
  #film = null;
  #buttonAddToWatchlist = null;
  #buttonMarkAsWatched = null;
  #buttonFavorite = null;
  #contentCard = null;
  #onButtonAddToWatchlistClick = null;
  #onButtonMarkAsWatchedClick = null;
  #onButtonFavoriteClick = null;
  #handleContentCardClick = null;
  constructor({
    model,
    onButtonAddToWatchlistClick,
    onButtonMarkAsWatchedClick,
    onButtonFavoriteClick,
    onContentCardClick,
  }) {
    super();
    this.#film = model;

    this.#buttonAddToWatchlist = this.element.querySelector('.film-card__controls-item--add-to-watchlist');
    this.#buttonMarkAsWatched = this.element.querySelector('.film-card__controls-item--mark-as-watched');
    this.#buttonFavorite = this.element.querySelector('.film-card__controls-item--favorite');
    this.#contentCard = this.element.querySelector('.film-card > a');
    this.#onButtonAddToWatchlistClick = onButtonAddToWatchlistClick;
    this.#onButtonMarkAsWatchedClick = onButtonMarkAsWatchedClick;
    this.#onButtonFavoriteClick = onButtonFavoriteClick;
    this.#handleContentCardClick = onContentCardClick;
    this.#addListener();
  }

  get template() {
    return createStandardFilmCardTemplate(this.#film);
  }

  #addListener() {
    this.#buttonAddToWatchlist.addEventListener('click',this.#onButtonAddToWatchlistClick);
    this.#buttonMarkAsWatched.addEventListener('click', this.#onButtonMarkAsWatchedClick);
    this.#buttonFavorite.addEventListener('click', this.#onButtonFavoriteClick);
    this.#contentCard.addEventListener('click', this.#onContentCardClick);
  }

  #onContentCardClick = (evt) => {
    evt.preventDefault();
    this.#handleContentCardClick();
  };
}
