import {TypeControlButton} from '../const';
function getTextButton(type) {
  let text = '';
  switch(type) {
    case TypeControlButton.WATCHLIST_BUTTON:
      text = 'Add to watchlist';
      break;
    case TypeControlButton.WATCHED_BUTTON:
      text = 'Already watched';
      break;
    case TypeControlButton.FAVORITE_BUTTON:
      text = 'Add to favorites';
      break;
  }
  return text;
}

function createFilmControlButtonTemplate({state: state}) {
  const isActiveButton = state[state.type] ? 'film-details__control-button--active' : '';
  const textButton = getTextButton(state.type);
  return (`<button type="button" class="film-details__control-button film-details__control-button--${state.type} ${isActiveButton}" id="${state.type}" name="${state.type}">${textButton}</button>
  `);
}

export {createFilmControlButtonTemplate};
