import FilmListView from './film-list-view';
import FilmCardPresenter from '../film-card/film-card-presenter';
import ButtonShowMorePresenter from '../button-show-more/button-show-more-presenter';
import {render} from '../framework/render';
import {DEFAULT_NUMBER_FILMS_ON_PAGE} from '../const';

export default class FilmListPresenter {
  #container = null;
  #filmListView = null;
  #filmPresenters = new Map();
  #buttonShowMorePresenter = null;
  #filmModel = [];
  #page = 1;
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
    this.#renderCards();
    this.#renderShowMoreButton();
    this.#buttonShowMorePresenter.addObserver(this.#renderFilmList);
  }

  #renderShowMoreButton() {
    const containerShowMoreButton = this.#filmListView.containerShowMoreButton;
    this.#buttonShowMorePresenter = new ButtonShowMorePresenter({container: containerShowMoreButton});
    this.#buttonShowMorePresenter.init();
  }

  #renderCards() {
    const containerFilms = this.#filmListView.containerFilms;
    for (let i = 0; i < DEFAULT_NUMBER_FILMS_ON_PAGE * this.#page; i++) {
      const filmCardPresenter = new FilmCardPresenter({container: containerFilms});
      this.#filmPresenters.set(this.#filmModel[i].id, filmCardPresenter);
      filmCardPresenter.init({model: this.#filmModel[i]});
    }
  }

  #removeCards() {
    this.#filmPresenters.forEach((filmPresenter) => filmPresenter.removeView());
    this.#filmPresenters.clear();
  }

  #renderFilmList = (event, page) => {
    this.#page = page;
    this.#removeCards();
    this.#renderCards();
  };
}

