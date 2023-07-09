import FilmCommentView from './film-comment-view';
import {render, remove} from '../framework/render';

export default class FilmCommentsPresenter {
  #container = null;
  #comments = [];
  #commentsModel = null;
  #commentsView = new Map();
  constructor({container, commentsModel, comments}) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#comments = comments;
    this.#commentsModel.addObserver(this.#removeComment);
  }

  init() {
    for (const comment of this.#comments) {
      const filmCommentView = new FilmCommentView({
        comment: comment,
        handleCommentDeleteButtonClick: this.#handleCommentDeleteButtonClick
      });
      this.#commentsView.set(comment.id, filmCommentView);
      render(filmCommentView, this.#container);
    }
  }

  #handleCommentDeleteButtonClick = (commentId) => {
    this.#commentsModel.deleteComment(commentId);
  };


  #removeComment = (event, commentId) => {
    let x;
    switch (event) {
      case 'DELETE_COMMENT':
        console.log(this.#commentsView);
        x = this.#commentsView.get(commentId);
        remove(x);
        this.#commentsView.delete(commentId);
    }
  };
}
