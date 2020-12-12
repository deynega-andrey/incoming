export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC',
};

export const onSortClick = (colProp:string, store: {[key:string]: any}, onChangeSelectionParams:() => void):void => {
  const isActiveSort = Boolean(store.sortedProperty === colProp);
  if (isActiveSort) {
    store.sortDirection === SortDirection.DESC
      ? store.setSortDirection(SortDirection.ASC)
      : store.setSortDirection(SortDirection.DESC);
  } else {
    store.setSortedProperty(colProp);
    store.setSortDirection(SortDirection.DESC);
  }
  onChangeSelectionParams();
}