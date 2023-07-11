import FilmAddCommentFormView from './film-add-comment-form-view';
import {render} from '../framework/render';

export default class FilmAddCommentFormPresenter {
  #container = null;
  #commentsModel = null;
  #filmId = null;
  #filmAddCommentFromView = null;
  constructor({container, commentsModel, filmId}) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#filmId = filmId;
  }

  init() {
    this.#filmAddCommentFromView = new FilmAddCommentFormView({handleEnterCommentKeydown: this.#handleEnterCommentKeydown});
    render(this.#filmAddCommentFromView, this.#container);
  }

  #handleEnterCommentKeydown = (comment) => {
    this.#commentsModel.addComment({filmId: this.#filmId, comment: comment});
  };

  handleEnterCommentFormKeydown = () => {
    this.#filmAddCommentFromView.handleEnterCommentFormKeydown();
  };
}


