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
    for (const comment of comments) {
      this.#comments.set(comment.id, this.#commentsApiService.adaptToClient(comment));
    }
  }

  get comments() {
    return this.#comments;
  }

  async deleteComment(commentId) {
    // const index = this.#films.findIndex((film) => film.id === filmForUpdate.id);
    const response = await this.#commentsApiService.deleteComment(commentId);
    this.#comments.delete(commentId);
    this._notify('DELETE_COMMENT', commentId);
  }
}
