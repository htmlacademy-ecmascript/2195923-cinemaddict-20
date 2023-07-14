import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createAddCommentFormTemplate} from './film-add-comment-form-template';

export default class FilmAddCommentFormView extends AbstractStatefulView {
  #textarea = null;
  #handleEnterCommentKeydown = null;
  constructor({handleEnterCommentKeydown}) {
    super();
    this._state = {
      emotion: null,
      comment: 'text'
    };
    this._restoreHandlers();
    this.#handleEnterCommentKeydown = handleEnterCommentKeydown;
  }

  get template() {
    return createAddCommentFormTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#onEmojiChange);
  }

  #onEmojiChange = (evt) => {
    evt.preventDefault();
    this.updateElement({emotion: evt.target.value});
  };

  handleEnterCommentFormKeydown = () => {
    this.#handleEnterCommentKeydown(this._state);
  };
}
