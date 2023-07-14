import ProfilePresenter from './profile/profile-presenter';
import StatisticsPresenter from './statistics/statistics-presenter';
import FilmModel from './film-card/film-model';
import FilmsApiService from './api/films-api-service';
import {AUTHORIZATION, END_POINT} from './const';
import FilmListPresenter from './film-list/film-list-presenter';
import CommentsApiService from './api/comments-api-service';
import CommentsModel from './film-card/comments-model';
import SortingPresenter from './sorting/sorting-presenter';
import FiltersPresenter from './filters/filters-presenter';

const filmsModel = new FilmModel({filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)});
const commentsModel = new CommentsModel({commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)});

const header = document.querySelector('.header');
const statistics = document.querySelector('.footer__statistics');
const body = document.querySelector('body');
const main = document.querySelector('.main');

const profilePresenter = new ProfilePresenter({container: header, filmsModel: filmsModel});
const filtersPresenter = new FiltersPresenter({container: main});
const sortingPresenter = new SortingPresenter({container: main});
const statisticsPresenter = new StatisticsPresenter({container: statistics, filmsModel: filmsModel});
const filmListPresenter = new FilmListPresenter({container: main, containerPopup: body});


filmsModel.init().then(() => {
  profilePresenter.init();
  sortingPresenter.init({filmsModel: filmsModel, filmListPresenter: filmListPresenter});
  filtersPresenter.init({filmsModel: filmsModel, filmListPresenter: filmListPresenter});
  filmListPresenter.init({filmsModel: filmsModel, commentsModel: commentsModel});
  statisticsPresenter.init({numberOfFilms: 1035});
});

