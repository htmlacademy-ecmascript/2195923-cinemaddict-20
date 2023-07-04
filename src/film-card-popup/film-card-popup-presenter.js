import FilmCardPopupView from './film-card-popup-view';
import {render} from '../framework/render';

export default class FilmCardPopupPresenter {
  #container = null;
  #filmCardPopupView = null;
  constructor({container}) {
    this.#container = container;
  }

  init({model}) {
    this.#filmCardPopupView = new FilmCardPopupView({
      model: model[0],
    });
    render(this.#filmCardPopupView, this.#container);
  }
}
