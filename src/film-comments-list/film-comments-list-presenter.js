import FilmCommentsListView from './film-comments-list-view';
import {render} from '../framework/render';
import FilmCommentsPresenter from '../film-comment/film-comments-presenter';
import FilmAddCommentFormPresenter from '../film-add-comment-form/film-add-comment-form-presenter';
import FilmCommentCountPresenter from '../film-comment-count/film-comment-count-presenter';

export default class FilmCommentsListPresenter {
  #container = null;
  #filmCommentsListView = null;
  #commentsModel = null;
  #comments = null;
  #commentsPresenter = null;
  #commentFormPresenter = null;
  #commentCountPresenter = null;

  constructor({container, commentsModel, comments}) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#comments = comments;
  }

  init() {
    this.#filmCommentsListView = new FilmCommentsListView({comments: this.#comments});
    render(this.#filmCommentsListView, this.#container);
    this.#renderCountComments();
    this.#renderComments();
    this.#renderCommentForm();
  }

  #renderCountComments() {
    const countCommentsContainer = this.#filmCommentsListView.filmAddCommentFormContainer;
    this.#commentCountPresenter = new FilmCommentCountPresenter({
      container: countCommentsContainer,
      commentsModel: this.#commentsModel,
      commentsCount: (this.#comments?.length || 0)
    });
    this.#commentCountPresenter.init();
  }

  #renderComments() {
    const commentsContainer = this.#filmCommentsListView.commentsContainer;
    this.#commentsPresenter = new FilmCommentsPresenter({
      container: commentsContainer,
      commentsModel: this.#commentsModel,
      comments: this.#comments
    });
    this.#commentsPresenter.init();
  }

  #renderCommentForm() {
    const commentFormContainer = this.#filmCommentsListView.filmAddCommentFormContainer;
    this.#commentFormPresenter = new FilmAddCommentFormPresenter({container: commentFormContainer});
    this.#commentFormPresenter.init();
  }
}
