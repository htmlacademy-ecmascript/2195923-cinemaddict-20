import ProfilePresenter from './profile/profile-presenter';
import StatisticsPresenter from './statistics/statistics-presenter';
import FilmModel from './film-card/film-model';
import FilmsApiService from './api/films-api-service';
import {AUTHORIZATION, END_POINT} from './const';
// import FilmCardPresenter from './film-card/film-card-presenter';
// import FilmCardPopupPresenter from './film-card-popup/film-card-popup-presenter';
import FilmListPresenter from './film-list/film-list-presenter';
import CommentsApiService from './api/comments-api-service';
import CommentsModel from './film-card/comments-model';

const filmsModel = new FilmModel({filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)});
const commentsModel = new CommentsModel({commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)});

const header = document.querySelector('.header');
const statistics = document.querySelector('.footer__statistics');
// const filmCardContainer = document.querySelector('.films-list__container');
const body = document.querySelector('body');
const main = document.querySelector('.main');
const profilePresenter = new ProfilePresenter({container: header});
const statisticsPresenter = new StatisticsPresenter({container: statistics});
// const filmCardPresenter = new FilmCardPresenter({container: filmCardContainer});
// const filmCardPopupPresenter = new FilmCardPopupPresenter({container: body});
const filmListPresenter = new FilmListPresenter({container: main, containerPopup: body});
profilePresenter.init({numberOfFilmsWatched: 25});
statisticsPresenter.init({numberOfFilms: 1035});

const getComments = async () => {
  for await (const film of filmsModel.films) {
    await commentsModel.init(film.id);
  }
};

filmsModel.init().then(() => getComments()).then(() => {
  filmListPresenter.init({filmsModel: filmsModel.films, commentsModel: commentsModel.comments});
});
