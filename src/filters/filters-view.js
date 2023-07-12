import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {createFiltersTemplate} from './filters-template';

export default class FiltersView extends AbstractStatefulView {
  constructor() {
    super();
    this._state = {
      type: 'all'
    };
  }

  get template() {
    return createFiltersTemplate(this._state);
  }
}
