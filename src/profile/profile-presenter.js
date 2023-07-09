import ProfileView from './profile-view';
import {getRating} from '../utils';
import {remove, render} from '../framework/render';
export default class ProfilePresenter {
  #container = null;
  #profileView = null;
  #filmsModel = null;
  #rating = null;
  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#rerenderView);
  }

  init() {
    const countWatchedFilms = this.#getCountWatchedFilms(this.#filmsModel.films);
    if (countWatchedFilms) {
      this.#rating = getRating(countWatchedFilms);
      this.#profileView = new ProfileView({rating: this.#rating});
      render(this.#profileView, this.#container);
    }
  }

  #rerenderView = () => {
    remove(this.#profileView);
    this.init();
  };

  #getCountWatchedFilms(films) {
    return films.reduce((countWatchedFilms, film) => {
      if (film.userDetails.watched) {
        return countWatchedFilms + 1;
      }
      return countWatchedFilms;
    }, 0);
  }
}
