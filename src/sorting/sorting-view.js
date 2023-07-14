import {createSortingTemplate} from './sorting-template';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

export default class SortingView extends AbstractStatefulView {
  #handleSort = null;
  constructor({handleSort}) {
    super();
    this._state = {
      type: 'default'
    };
    this.#handleSort = handleSort;
    this._restoreHandlers();
  }

  get template() {
    return createSortingTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#onSortingClick);
  }

  #onSortingClick = (evt) => {
    evt.preventDefault();
    if (evt.target.id !== '') {
      this.updateElement({type: evt.target.id});
      this.#handleSort(evt.target.id);
    }
  };
}
