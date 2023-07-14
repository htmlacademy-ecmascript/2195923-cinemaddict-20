import AbstractView from '../framework/view/abstract-view';
import {createFilmCommentTemplate} from './film-comment-template';

export default class FilmCommentView extends AbstractView {
  #comment = null;
  #handleCommentDeleteButtonClick = null;
  constructor({comment, handleCommentDeleteButtonClick}) {
    super();
    this.#comment = comment;
    this.#handleCommentDeleteButtonClick = handleCommentDeleteButtonClick;
    this.#setHandlers();
  }

  get template() {
    return createFilmCommentTemplate(this.#comment);
  }

  #setHandlers() {
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#onCommentDeleteButtonClick);
  }

  #onCommentDeleteButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleCommentDeleteButtonClick(this.#comment.id);
  };
}
