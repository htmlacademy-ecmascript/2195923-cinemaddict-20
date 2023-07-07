export default class CommentsModel {
  #comments = new Map();
  #commentsApiService = null;

  constructor({commentsApiService}) {
    this.#commentsApiService = commentsApiService;
  }

  async init(filmId) {
    const comments = await this.#commentsApiService.getComments(filmId);
    this.#comments.set(filmId, comments.map(this.#commentsApiService.adaptToClient));
  }

  get comments() {
    return this.#comments;
  }
}
