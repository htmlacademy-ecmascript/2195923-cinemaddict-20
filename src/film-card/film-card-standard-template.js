import {formatDuration, getDescription} from '../utils';

function createStandardFilmCardTemplate(film) {
  const filmYear = (new Date(film.filmInfo.release.date)).getFullYear();
  const durationFilm = formatDuration(film.filmInfo.duration);
  const description = getDescription(film.filmInfo.description);

  return (`
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${film.filmInfo.title}</h3>
        <p class="film-card__rating">${film.filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${filmYear}</span>
          <span class="film-card__duration">${durationFilm}</span>
          <span class="film-card__genre">${film.filmInfo.genre[0]}</span>
        </p>
        <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${film.comments.length} comments</span>
      </a>
      <div class="film-card__controls">
      </div>
    </article>
  `);
}

export {createStandardFilmCardTemplate};
