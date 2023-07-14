import AbstractView from '../framework/view/abstract-view';
import { createProfileTemplate } from './profile-template';

export default class ProfileView extends AbstractView {
  #rating = null;
  constructor({rating}) {
    super();
    this.#rating = rating;
  }

  get template() {
    return createProfileTemplate({rating: this.#rating});
  }
}
