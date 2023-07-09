import FilmAddCommentFormView from './film-add-comment-form-view';
import {render} from '../framework/render';

export default class FilmAddCommentFormPresenter {
  #container = null;
  #filmAddCommentFromView = null;
  constructor({container}) {
    this.#container = container;
  }

  init() {
    this.#filmAddCommentFromView = new FilmAddCommentFormView();
    render(this.#filmAddCommentFromView, this.#container);
  }
}
