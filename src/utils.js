import {MAX_COMMENT_LENGTH} from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
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
  const time = dayjs.duration(durationInMinutes, 'minutes');
  return `${time.hours()}h ${time.minutes()}m`;
}

function getDescription(description) {
  if (description.length > MAX_COMMENT_LENGTH) {
    return `${description.substring(0, MAX_COMMENT_LENGTH - 1)}&hellip;`;
  }
  return description;
}

function getHumanizedTime(time) {
  return dayjs(time).format('YYYY/MM/DD HH:mm');
}

export {
  getRating,
  formatDuration,
  getDescription,
  getHumanizedTime,
};
