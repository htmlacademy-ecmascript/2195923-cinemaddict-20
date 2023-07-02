import ProfileView from './profile-view';
import {getRating} from '../utils';
import {render} from '../framework/render';
export default class ProfilePresenter {
  #container = null;
  #profileView = null;
  #rating = null;
  constructor({container}) {
    this.#container = container;
  }

  init({numberOfFilmsWatched}) {
    if (numberOfFilmsWatched !== 0) {
      this.#rating = getRating(numberOfFilmsWatched);
      this.#profileView = new ProfileView({rating: this.#rating});
      render(this.#profileView, this.#container);
    }
  }
}
