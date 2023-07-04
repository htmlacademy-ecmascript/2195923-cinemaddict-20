import FilmListView from './film-list-view';
import FilmCardPresenter from '../film-card/film-card-presenter';
import {render} from '../framework/render';
import {DEFAULT_NUMBER_FILMS_ON_PAGE} from '../const';

export default class FilmListPresenter {
  #container = null;
  #filmListView = null;
  #filmPresenters = new Map();
  #filmModel = [];
  constructor({container}) {
    this.#container = container;
  }

  init({model}) {
    this.#filmModel = model;
    this.#filmListView = new FilmListView();
    render(this.#filmListView, this.#container);
    this.render();
  }

  render() {
    const container = this.#filmListView.container;
    for (let i = 0; i < DEFAULT_NUMBER_FILMS_ON_PAGE; i++) {
      const filmCardPresenter = new FilmCardPresenter({container});
      this.#filmPresenters.set(this.#filmModel[i].id, filmCardPresenter);
      filmCardPresenter.init({model: this.#filmModel[i]});
    }
  }
}

