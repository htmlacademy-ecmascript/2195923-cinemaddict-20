function createFiltersTemplate(state) {
  return (`
    <nav class="main-navigation">
      <a href="#all" id="all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" id="watchlist" class="main-navigation__item">Watchlist <span
        class="main-navigation__item-count">${state?.countWatchlistFilms || 0}</span></a>
      <a href="#history" id="history" class="main-navigation__item">History <span
        class="main-navigation__item-count">${state?.countWatchedFilms || 0}</span></a>
      <a href="#favorites" id="favorites" class="main-navigation__item">Favorites <span
        class="main-navigation__item-count">${state?.countFavoriteFilms || 0}</span></a>
    </nav>
  `);
}

export {createFiltersTemplate};
