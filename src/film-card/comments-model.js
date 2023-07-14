import Observable from '../framework/observable';

export default class CommentsModel extends Observable{
  #comments = new Map();
  #commentsApiService = null;

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  async init(filmId) {
    const comments = await this.#commentsApiService.getComments(filmId);
    this.#comments.clear();
    for (const comment of comments) {
      this.#comments.set(comment.id, this.#commentsApiService.adaptToClient(comment));
    }
  }

  get comments() {
    return this.#comments;
  }

  async addComment({filmId, comment}) {
    const commentAndMovie = await this.#commentsApiService.addComment({filmId, comment});
    this.#comments.clear();
    for (const commentElement of commentAndMovie.comments) {
      this.#comments.set(commentElement.id, this.#commentsApiService.adaptToClient(commentElement));
    }
    this._notify('ADD_COMMENT', this.#comments);
  }

  async deleteComment(commentId) {
    // const index = this.#films.findIndex((film) => film.id === filmForUpdate.id);
    const response = await this.#commentsApiService.deleteComment(commentId);
    this.#comments.delete(commentId);
    this._notify('DELETE_COMMENT', commentId);
  }
}
