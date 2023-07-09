import AbstractView from '../framework/view/abstract-view';
import {createStatisticsTemplate} from './statistics-template';

export default class StatisticsView extends AbstractView {
  #numberOfFilms = null;
  constructor(numberOfFilms) {
    super();
    this.#numberOfFilms = numberOfFilms;
  }

  get template() {
    return createStatisticsTemplate({numberOfFilms: this.#numberOfFilms});
  }
}
