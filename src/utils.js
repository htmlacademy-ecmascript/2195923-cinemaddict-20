import {MAX_COMMENT_LENGTH} from './const';

function getRating(numberOfFilmsWatched) {
  if (numberOfFilmsWatched === 0){
    return '';
  } else if (numberOfFilmsWatched >= 1 && numberOfFilmsWatched <= 10) {
    return 'Novice';
  } else if (numberOfFilmsWatched >= 11 && numberOfFilmsWatched <= 20) {
    return 'Fan';
  } else {
    return 'Movie Buff';
  }
}

function formatDuration(durationInMinutes) {
  const hour = Math.floor(durationInMinutes / 60);
  const minute = durationInMinutes - hour * 60;
  return `${hour}h ${minute}m`;
}

function getDescription(description) {
  if (description.length > MAX_COMMENT_LENGTH) {
    return `${description.substring(0, MAX_COMMENT_LENGTH - 1)}&hellip;`;
  }
  return description;
}


export {getRating, formatDuration, getDescription};
