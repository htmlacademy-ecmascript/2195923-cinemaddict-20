import SortingView from './sorting-view';
import {render, RenderPosition} from '../framework/render';
import dayjs from 'dayjs';

export default class SortingPresenter {
  #container = null;
  #sortingView = null;
  #filmsModel = null;
  #filmListPresenter = null;
  constructor({container}) {
    this.#container = container;
  }

  init({filmsModel, filmListPresenter}) {
    this.#filmsModel = filmsModel;
    this.#filmListPresenter = filmListPresenter;
    this.#sortingView = new SortingView({handleSort: this.#handleSort});
    render(this.#sortingView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleSort = (sortType) => {
    let sortingFunction = null;
    switch (sortType) {
      case 'date':
        sortingFunction = (firstFilm, secondFilm) => dayjs(secondFilm.filmInfo.release.date) - dayjs(firstFilm.filmInfo.release.date);
        break;
      case 'rating':
        sortingFunction = (firstFilm, secondFilm) => secondFilm.filmInfo.totalRating - firstFilm.filmInfo.totalRating;
        break;
      case 'default':
        sortingFunction = (firstFilm, secondFilm) => firstFilm.id - secondFilm.id;
        break;
      default:
        return;
    }
    this.#filmsModel.getSortingFilms(sortingFunction);
    this.#filmListPresenter.removeCards();
    this.#filmListPresenter.resetDisplayFilmsCount();
    this.#filmListPresenter.renderCards();
  };
}
