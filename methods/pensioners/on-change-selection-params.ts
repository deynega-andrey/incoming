import store from '../../stores/pensioners-store';
import {getDocuments} from '../../api/api-pensioners';

export function onChangeSelectionParams ():void {
  store.setLoadState(true);
  let statesFilterParams:null | number[] | any = null;
  if (!store.isAllDocsChecked) {
    if (store.isActivePaymentsDocsChecked || store.isErrorDocsChecked || store.isDraftDocsChecked || store.isClosedDocsChecked) {
      statesFilterParams = [];
      if (store.isDraftDocsChecked) statesFilterParams.push(2,3);
      if (store.isActivePaymentsDocsChecked) statesFilterParams.push(4);
      if (store.isErrorDocsChecked) statesFilterParams.push(5);
      if (store.isClosedDocsChecked) statesFilterParams.push(6);
    }
  }
  getDocuments(store.itemsPerPage, store.tablePage, store.sortedProperty, store.sortDirection, store.globalSearch, statesFilterParams)
  .then((data) => {
    console.log(data);
    store.updateDocs(data.data);
    store.setDocsAmount(data.totalDocsAmount);
    store.setPagesAmount(data.totalPagesAmount);
    store.setLoadState(false);
  })
  .catch(() => store.setLoadState(false));
};
