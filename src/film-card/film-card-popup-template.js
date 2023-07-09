import {formatDuration, getHumanizedTime} from '../utils';
import {TimeFormat} from '../const';

function getGenres(genres) {
  let genresList = '';
  for (const genre of genres) {
    genresList += `<span class="film-details__genre">${genre}</span>`;
  }
  return genresList;
}

function createPopupFilmCardTemplate({state: state}) {
  const writers = state.filmInfo.writers.join(', ');
  const actors = state.filmInfo.actors.join(', ');
  const duration = formatDuration(state.filmInfo.duration);
  const genre = state.filmInfo.genre.length > 1 ? 'Genres' : 'Genre';
  const genresList = getGenres(state.filmInfo.genre);
  const releaseFilmDate = getHumanizedTime(state.filmInfo.release.date, TimeFormat.DATE_RELEASE_FILM);

  return (`
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${state.filmInfo.poster}" alt="">

              <p class="film-details__age">${state.filmInfo.ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${state.filmInfo.title}</h3>
                  <p class="film-details__title-original">Original: ${state.filmInfo.alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${state.filmInfo.totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${state.filmInfo.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseFilmDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Duration</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${state.filmInfo.release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genre}</td>
                  <td class="film-details__cell">
                    ${genresList}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${state.filmInfo.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
          </section>
        </div>

        <div class="film-details__bottom-container">

        </div>
      </div>
    </section>
  `);
}

export {createPopupFilmCardTemplate};

