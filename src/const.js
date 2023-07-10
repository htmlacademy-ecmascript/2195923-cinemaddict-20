const Method = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const TimeFormat = {
  DATE_RELEASE_FILM: 'DD MMMM YYYY',
  DATE_COMMENT_CREATE: 'YYYY/MM/DD HH:mm'
};

const Emoji = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

const TypeControlButton = {
  FAVORITE_BUTTON: 'favorite',
  WATCHED_BUTTON: 'watched',
  WATCHLIST_BUTTON: 'watchlist',
};

const TypeControlButtonView = {
  STANDARD: 'STANDARD',
  EXTENDS: 'EXTENDS',
};

const MAX_COMMENT_LENGTH = 140;
const DEFAULT_NUMBER_FILMS_ON_PAGE = 5;
const AUTHORIZATION = 'Basic dPy4sfS45wcl1sh5I';
const END_POINT = 'https://20.ecmascript.pages.academy/cinemaddict';

export {
  Method,
  Emoji,
  TypeControlButton,
  TypeControlButtonView,
  TimeFormat,
  AUTHORIZATION,
  END_POINT,
  MAX_COMMENT_LENGTH,
  DEFAULT_NUMBER_FILMS_ON_PAGE,
};
