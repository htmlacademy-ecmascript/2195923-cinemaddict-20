import StatisticsView from './statistics-view';
import {render} from '../framework/render';

export default class StatisticsPresenter {
  #container = null;
  #filmsModel = null;
  #statisticsView = null;
  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#statisticsView = new StatisticsView(this.#filmsModel.films.length);
    render(this.#statisticsView, this.#container);
  }
}
