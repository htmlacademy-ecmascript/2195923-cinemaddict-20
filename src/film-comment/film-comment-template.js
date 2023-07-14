import {getHumanizedTime} from '../utils';
import {TimeFormat} from '../const';

function createFilmCommentTemplate(comment) {
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
      </li>`);
}

export {createFilmCommentTemplate};
