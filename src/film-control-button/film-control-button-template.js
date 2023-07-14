import {TypeControlButton, TypeControlButtonView} from '../const';
function getTextButton(buttonType, templateType) {
  let text = '';
  if (templateType === TypeControlButtonView.EXTENDS) {
    switch(buttonType) {
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
  } else if (templateType === TypeControlButtonView.STANDARD) {
    switch(buttonType) {
      case TypeControlButton.WATCHLIST_BUTTON:
        text = 'Add to watchlist';
        break;
      case TypeControlButton.WATCHED_BUTTON:
        text = 'Mark as watched';
        break;
      case TypeControlButton.FAVORITE_BUTTON:
        text = 'Mark as favorite';
        break;
    }
  }
  return text;
}

function getButtonClass(buttonType) {
  let buttonClass = '';
  switch(buttonType) {
    case TypeControlButton.WATCHLIST_BUTTON:
      buttonClass = 'film-card__controls-item--add-to-watchlist';
      break;
    case TypeControlButton.WATCHED_BUTTON:
      buttonClass = 'film-card__controls-item--mark-as-watched';
      break;
    case TypeControlButton.FAVORITE_BUTTON:
      buttonClass = 'film-card__controls-item--favorite';
      break;
  }
  return buttonClass;
}

function createFilmControlButtonTemplate({state, templateType}) {
  if (templateType === TypeControlButtonView.EXTENDS) {
    const isActiveButton = state[state.type] ? 'film-details__control-button--active' : '';
    const textButton = getTextButton(state.type, TypeControlButtonView.EXTENDS);
    return (`
        <button
            type="button"
            class="film-details__control-button film-details__control-button--${state.type} ${isActiveButton}"
            id="${state.type}"
            name="${state.type}">
            ${textButton}
        </button>`);
  } else if (templateType === TypeControlButtonView.STANDARD) {
    const isActiveButton = state[state.type] ? 'film-card__controls-item--active' : '';
    const textButton = getTextButton(state.type, TypeControlButtonView.STANDARD);
    const buttonClass = getButtonClass(state.type);
    return (`
        <button
            type="button"
            class="film-card__controls-item ${buttonClass} ${isActiveButton}">
            ${textButton}
        </button>`);
  }
}

export {createFilmControlButtonTemplate};

