import ProfilePresenter from './profile/profile-presenter';

const header = document.querySelector('.header');
const profilePresenter = new ProfilePresenter({container: header});
profilePresenter.init({numberOfFilmsWatched: 25});
