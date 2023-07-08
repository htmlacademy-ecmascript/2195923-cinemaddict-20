import {formatDuration, getHumanizedTime} from '../utils';
import {TimeFormat} from '../const';

function getGenres(genres) {
  let genresList = '';
  for (const genre of genres) {
    genresList += `<span class="film-details__genre">${genre}</span>`;
  }
  return genresList;
}

function createComment(comment) {
  const date = getHumanizedTime(comment.date, TimeFormat.DATE_COMMENT_CREATE);

  return (`
    <li class="film-details__comment" id="${comment.id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `);
}

function createComments(comments) {
  if (comments === undefined) {
    return;
  }
  return comments.map((comment) => createComment(comment)).join('');
}
function createPopupFilmCardTemplate({state: state}) {
  const writers = state.filmInfo.writers.join(', ');
  const actors = state.filmInfo.actors.join(', ');
  const duration = formatDuration(state.filmInfo.duration);
  const genre = state.filmInfo.genre.length > 1 ? 'Genres' : 'Genre';
  const genresList = getGenres(state.filmInfo.genre);
  const releaseFilmDate = getHumanizedTime(state.filmInfo.release.date, TimeFormat.DATE_RELEASE_FILM);
  const activeAddToWatchlist = state.userDetails.watchlist ? 'film-details__control-button--active' : '';
  const activeMarkAsWatched = state.userDetails.alreadyWatched ? 'film-details__control-button--active' : '';
  const activeFavorite = state.userDetails.favorite ? 'film-details__control-button--active' : '';

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
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${state.comments?.length || 0}</span></h3>

            <ul class="film-details__comments-list">
              ${createComments(state.comments)}
            </ul>

            <form class="film-details__new-comment" action="" method="get">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  `);
}

export {createPopupFilmCardTemplate};

