import ButtonShowMoreView from './button-show-more-view';
import Observable from '../framework/observable';
import {render} from '../framework/render';

export default class ButtonShowMorePresenter extends Observable{
  #container = null;
  #page = 1;
  #buttonShowMoreView = null;
  constructor({container}) {
    super();
    this.#container = container;
  }

  init() {
    this.#buttonShowMoreView = new ButtonShowMoreView({handleButtonShowMoreButtonClick: this.handleButtonShowMoreButtonClick});
    render(this.#buttonShowMoreView, this.#container);
  }

  handleButtonShowMoreButtonClick = () => {
    this.#page++;
    this._notify('ADD_FILMS', this.#page);
  };
}
