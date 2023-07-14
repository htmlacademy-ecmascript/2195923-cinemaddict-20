function createFiltersTemplate(state) {
  const isAllFilter = state.type === 'all';
  const isWatchlistFilter = state.type === 'watchlist';
  const isHistoryFilter = state.type === 'history';
  const isFavoritesFilter = state.type === 'favorites';

  return (`
    <nav class="main-navigation">
      <a href="#all" id="all" class="main-navigation__item ${isAllFilter ? 'main-navigation__item--active' : ''}">All movies</a>
      <a href="#watchlist" id="watchlist" class="main-navigation__item ${isWatchlistFilter ? 'main-navigation__item--active' : ''}">Watchlist <span
        class="main-navigation__item-count">${state?.countWatchlistFilms || 0}</span></a>
      <a href="#history" id="history" class="main-navigation__item ${isHistoryFilter ? 'main-navigation__item--active' : ''}">History <span
        class="main-navigation__item-count">${state?.countWatchedFilms || 0}</span></a>
      <a href="#favorites" id="favorites" class="main-navigation__item ${isFavoritesFilter ? 'main-navigation__item--active' : ''}">Favorites <span
        class="main-navigation__item-count">${state?.countFavoriteFilms || 0}</span></a>
    </nav>
  `);
}

export {createFiltersTemplate};
