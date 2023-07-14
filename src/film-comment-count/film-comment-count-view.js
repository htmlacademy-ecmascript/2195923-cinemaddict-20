import AbstractView from '../framework/view/abstract-view';
import {createCommentCountTemplate} from './film-comment-count-template';

export default class FilmCommentCountView extends AbstractView {
  #commentsCount = null;
  constructor(commentsCount) {
    super();
    this.#commentsCount = commentsCount;
  }

  get template() {
    return createCommentCountTemplate(this.#commentsCount);
  }
}
