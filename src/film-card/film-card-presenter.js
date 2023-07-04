import FilmCardStandardView from './film-card-standard-view';
import {render, remove} from '../framework/render';

export default class FilmCardPresenter {
  #container = null;
  #filmCardView = null;
  constructor({container}) {
    this.#container = container;
  }

  init({model}) {
    this.#filmCardView = new FilmCardStandardView({
      model: model,
      // onButtonAddToWatchlistClick,
      // onButtonMarkAsWatchedClick,
      // onButtonFavoriteClick,
      // onContentCardClick,
    });
    render(this.#filmCardView, this.#container);
  }

  removeView() {
    remove(this.#filmCardView);
  }

  onContentCardClick = () => {
  };
}
