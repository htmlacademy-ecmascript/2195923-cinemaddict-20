import {createButtonShowMoreTemplate} from './button-show-more-template';
import AbstractView from '../framework/view/abstract-view';
export default class ButtonShowMoreView extends AbstractView {
  handleButtonShowMoreButtonClick = null;
  constructor({handleButtonShowMoreButtonClick}) {
    super();
    this.handleButtonShowMoreButtonClick = handleButtonShowMoreButtonClick;
    this.#setHandlers();
  }

  get template() {
    return createButtonShowMoreTemplate();
  }

  #setHandlers() {
    this.element.addEventListener('click', this.onButtonShowMoreViewClick);
  }

  onButtonShowMoreViewClick = (evt) => {
    evt.preventDefault();
    this.handleButtonShowMoreButtonClick();
  };
}
