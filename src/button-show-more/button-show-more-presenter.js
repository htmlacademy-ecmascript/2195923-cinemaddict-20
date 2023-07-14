import ButtonShowMoreView from './button-show-more-view';
import Observable from '../framework/observable';
import {remove, render} from '../framework/render';

export default class ButtonShowMorePresenter extends Observable{
  #container = null;
  #page = 1;
  #buttonShowMoreView = null;
  constructor({container}) {
    super();
    this.#container = container;
  }

  init(page = 1) {
    this.#buttonShowMoreView = new ButtonShowMoreView({handleButtonShowMoreButtonClick: this.handleButtonShowMoreButtonClick});
    this.#page = page;
    render(this.#buttonShowMoreView, this.#container);
  }

  removeView() {
    remove(this.#buttonShowMoreView);
  }


  handleButtonShowMoreButtonClick = () => {
    this.#page++;
    this._notify('ADD_FILMS', this.#page);
  };
}
