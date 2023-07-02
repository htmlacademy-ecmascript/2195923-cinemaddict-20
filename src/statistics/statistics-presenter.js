import StatisticsView from './statistics-view';
import {render} from '../framework/render';

export default class StatisticsPresenter {
  #container = null;
  #statisticsView = null;
  constructor({container}) {
    this.#container = container;
  }

  init({numberOfFilms}) {
    this.#statisticsView = new StatisticsView({numberOfFilms});
    render(this.#statisticsView, this.#container);
  }
}
