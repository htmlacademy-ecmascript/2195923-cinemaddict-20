import FiltersView from './filters-view';
import {render, RenderPosition} from '../framework/render';

export default class FiltersPresenter {
  #container = null;
  #filtersView = null;
  constructor({container}) {
    this.#container = container;
  }

  init() {
    this.#filtersView = new FiltersView();
    render(this.#filtersView, this.#container, RenderPosition.AFTERBEGIN);
  }
}
