import FilmCardStandardView from './film-card-standard-view';
import {render} from '../framework/render';

export default class FilmCardPresenter {
  #container = null;
  #filmCardView = null;
  constructor({container}) {
    this.#container = container;
  }

  init({model}) {
    console.log(model);
    this.#filmCardView = new FilmCardStandardView({
      model: model[0],
      // onButtonAddToWatchlistClick,
      // onButtonMarkAsWatchedClick,
      // onButtonFavoriteClick,
      // onContentCardClick,
    });
    render(this.#filmCardView, this.#container);
  }

  onContentCardClick = () => {
    console.log(1);
  };
}
