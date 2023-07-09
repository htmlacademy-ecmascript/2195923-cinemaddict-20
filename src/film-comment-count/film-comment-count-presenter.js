import FilmCommentCountView from './film-comment-count-view';
import {render, remove, RenderPosition} from '../framework/render';

export default class FilmCommentCountPresenter {
  #container = null;
  #commentsModel = null;
  #commentsCount = [];
  #filmCommentCountView = null;
  constructor({container, commentsModel, commentsCount}) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#commentsCount = commentsCount;
    this.#commentsModel.addObserver(this.#updateCountComments);
  }

  init() {
    this.#filmCommentCountView = new FilmCommentCountView(this.#commentsCount);
    render(this.#filmCommentCountView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #updateCountComments = (event) => {
    switch(event) {
      case 'DELETE_COMMENT':
        remove(this.#filmCommentCountView);
        this.#commentsCount--;
        this.init();
    }
  };
}
