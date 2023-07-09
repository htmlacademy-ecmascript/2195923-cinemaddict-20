import AbstractView from '../framework/view/abstract-view';
import {createFilmCommentTemplate} from './film-comment-template';

export default class FilmCommentView extends AbstractView {
  #comment = null;
  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createFilmCommentTemplate(this.#comment);
  }
}
