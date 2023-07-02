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

export {getRating};
