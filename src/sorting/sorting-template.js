function createSortingTemplate(activeSort) {
  const isDateSorting = activeSort.type === 'date';
  const isRatingSorting = activeSort.type === 'rating';
  const isDefaultSorting = activeSort.type === 'default';
  return(`
    <ul class="sort">
      <li><a href="#" class="sort__button ${isDefaultSorting ? 'sort__button--active' : ''}" id="default">Sort by default</a></li>
      <li><a href="#" class="sort__button ${isDateSorting ? 'sort__button--active' : ''}" id="date">Sort by date</a></li>
      <li><a href="#" class="sort__button ${isRatingSorting ? 'sort__button--active' : ''}" id="rating">Sort by rating</a></li>
    </ul>`);
}

export {createSortingTemplate};
