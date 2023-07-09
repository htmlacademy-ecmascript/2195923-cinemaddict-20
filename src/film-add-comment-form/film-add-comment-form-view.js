import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createAddCommentFormTemplate} from './film-add-comment-form-template';

export default class FilmAddCommentFormView extends AbstractStatefulView {
  constructor() {
    super();
  }

  get template() {
    return createAddCommentFormTemplate();
  }

  _restoreHandlers() {

  }
}
