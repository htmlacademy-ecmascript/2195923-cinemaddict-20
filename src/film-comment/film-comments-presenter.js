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
    this.#commentsModel.addObserver(this.#addComment);
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

  #addComment = (event, comments) => {
    switch (event) {
      case 'ADD_COMMENT':
        comments.forEach((comment, commentId) => {
          if (!this.#commentsView.has(commentId)) {
            const filmCommentView = new FilmCommentView({
              comment: comment,
              handleCommentDeleteButtonClick: this.#handleCommentDeleteButtonClick
            });
            this.#commentsView.set(comment.id, filmCommentView);
            render(filmCommentView, this.#container);
            this.#comments.push(comment);
          }
        });
    }
  };

  #removeComment = (event, commentId) => {
    switch (event) {
      case 'DELETE_COMMENT':
        remove(this.#commentsView.get(commentId));
        this.#commentsView.delete(commentId);
    }
  };

  removeObserver = () => {
    this.#commentsModel.removeObserver(this.#removeComment);
  };
}
