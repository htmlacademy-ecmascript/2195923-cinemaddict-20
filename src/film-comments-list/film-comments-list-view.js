import AbstractView from '../framework/view/abstract-view';
import {createCommentsListTemplate} from './film-comments-list-template';

export default class FilmCommentsListView extends AbstractView {
  #comments = null;
  constructor({comments: comments}) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createCommentsListTemplate();
  }

  get commentsContainer() {
    return this.element.querySelector('.film-details__comments-list');
  }

  get filmAddCommentFormContainer() {
    return this.element;
  }
}
