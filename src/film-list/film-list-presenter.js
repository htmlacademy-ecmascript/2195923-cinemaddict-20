import FilmListView from './film-list-view';
import FilmCardPresenter from '../film-card/film-card-presenter';
import ButtonShowMorePresenter from '../button-show-more/button-show-more-presenter';
import {render} from '../framework/render';
import {DEFAULT_NUMBER_FILMS_ON_PAGE} from '../const';

export default class FilmListPresenter {
  #container = null;
  #containerPopup = null;
  #filmListView = null;
  #filmPresenters = new Map();
  #buttonShowMorePresenter = null;
  #filmModel = [];
  #page = 1;
  #popupId = null;
  #currentOpenPopupPresenter = null;
  constructor({container, containerPopup}) {
    this.#container = container;
    this.#containerPopup = containerPopup;
  }

  init({model}) {
    this.#filmModel = model;
    this.#filmListView = new FilmListView();
    render(this.#filmListView, this.#container);
    this.render();
  }

  render() {
    this.#renderCards();
    this.#renderShowMoreButton();
    this.#buttonShowMorePresenter.addObserver(this.#renderFilmList);
  }

  #renderShowMoreButton() {
    const containerShowMoreButton = this.#filmListView.containerShowMoreButton;
    this.#buttonShowMorePresenter = new ButtonShowMorePresenter({container: containerShowMoreButton});
    this.#buttonShowMorePresenter.init();
  }

  #renderCards() {
    const containerFilms = this.#filmListView.containerFilms;
    for (let i = 0; i < DEFAULT_NUMBER_FILMS_ON_PAGE * this.#page; i++) {
      const filmCardPresenter = new FilmCardPresenter({container: containerFilms, containerPopup: this.#containerPopup});
      this.#filmPresenters.set(this.#filmModel[i].id, filmCardPresenter);
      filmCardPresenter.init({model: this.#filmModel[i]});
      this.#filmPresenters.get(this.#filmModel[i].id).addObserver(this.#makeAction);
    }
    if (DEFAULT_NUMBER_FILMS_ON_PAGE * this.#page >= this.#filmModel.length) {
      this.#buttonShowMorePresenter.removeView();
    }
  }

  #removeCards() {
    this.#filmPresenters.forEach((filmPresenter) => filmPresenter.removeView());
    this.#filmPresenters.clear();
  }

  #renderFilmList = (event, page) => {
    this.#page = page;
    this.#removeCards();
    this.#renderCards();
  };

  #makeAction = (event, presenterId) => {
    switch(event) {
      case 'OPEN_POPUP': {
        this.#renderPopup(presenterId);
        break;
      }
      case 'CLOSE_POPUP': {
        this.#closePopup(presenterId);
        break;
      }
    }

  };

  #renderPopup(presenterId) {
    if (this.#popupId === presenterId) {
      return;
    }

    if (this.#popupId === null) {
      this.#currentOpenPopupPresenter = this.#filmPresenters.get(presenterId);
      this.#popupId = presenterId;
      document.addEventListener('keydown', this.#onEscKeydown);
      return;
    }

    this.#currentOpenPopupPresenter.removePopup();
    this.#currentOpenPopupPresenter = this.#filmPresenters.get(presenterId);
    this.#popupId = presenterId;
  }

  #closePopup(presenterId) {
    this.#filmPresenters.get(presenterId).removePopup();
    this.#popupId = null;
  }

  #onEscKeydown = (evt) => {
    evt.preventDefault();
    if (evt.key !== 'Escape') {
      return;
    }
    this.#closePopup(this.#popupId);
    document.removeEventListener('keydown', this.#onEscKeydown);
  };
}
