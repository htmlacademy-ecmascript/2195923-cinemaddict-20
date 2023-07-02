import ProfilePresenter from './profile/profile-presenter';
import StatisticsPresenter from './statistics/statistics-presenter';
import FilmModel from './film-card/film-model';
import FilmsApiService from './api/films-api-service';
import {AUTHORIZATION, END_POINT} from './const';
import FilmCardPresenter from './film-card/film-card-presenter';

const filmsModel = new FilmModel({filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)});

const header = document.querySelector('.header');
const statistics = document.querySelector('.footer__statistics');
const filmCardContainer = document.querySelector('.films-list__container');
const profilePresenter = new ProfilePresenter({container: header});
const statisticsPresenter = new StatisticsPresenter({container: statistics});
const filmCardPresenter = new FilmCardPresenter({container: filmCardContainer});
profilePresenter.init({numberOfFilmsWatched: 25});
statisticsPresenter.init({numberOfFilms: 1035});

filmsModel.init().then(() => {
  filmCardPresenter.init(filmsModel.films);
});
