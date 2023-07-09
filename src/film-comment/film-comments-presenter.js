import FilmCommentView from './film-comment-view';
import {render} from '../framework/render';

export default class FilmCommentsPresenter {
  #container = null;
  #comments = null;
  #commentsView = new Map();
  constructor({container, comments}) {
    this.#container = container;
    this.#comments = comments;
  }

  init() {
    for (const comment of this.#comments) {
      const filmCommentView = new FilmCommentView(comment);
      this.#commentsView.set(comment.id, filmCommentView);
      render(filmCommentView, this.#container);
    }
  }
}
