import FilmCardStandardView from './film-card-standard-view';
import {render} from '../framework/render';

export default class FilmCardPresenter {
  #container = null;
  #filmCardView = null;
  constructor({container}) {
    this.#container = container;
  }

  init(model) {
    this.#filmCardView = new FilmCardStandardView(model[0]);
    render(this.#filmCardView, this.#container);
  }
}
