import {createFilmListTemplate} from './film-list-template';
import AbstractView from '../framework/view/abstract-view';

export default class FilmListView extends AbstractView {
  get template() {
    return createFilmListTemplate();
  }

  get containerFilms() {
    return this.element.querySelector('.films-list__container');
  }

  get containerShowMoreButton() {
    return this.element.querySelector('.films-list');
  }
}
