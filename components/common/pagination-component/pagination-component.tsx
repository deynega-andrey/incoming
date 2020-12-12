import {PaginationComplex} from '@openvtb/react-ui-kit';
import * as React from 'react';
import {observer} from 'mobx-react';
import './pagination-component.scss';

interface IPagination {
  store:{[key:string]: any},
  onChangeSelectionParams():void
}

const PaginationComponent = (props: IPagination) => {
  const {store} = props;
  const totalItems = props.store.totalDocsAmount;
  return (
    <div className="pagination-component">
      <PaginationComplex
        itemsPerPage={store.itemsPerPage}
        page={store.tablePage}
        totalItems={totalItems}
        onItemsPerPageChange={(newItemsPerPage) => {
          store.setItemsPerPagePart(newItemsPerPage);
          props.onChangeSelectionParams();
        }}
        onPageChange={(newPage) => {
          store.setTablePage(newPage);
          props.onChangeSelectionParams();
        }}
      />
    </div>
  );
};
export default React.memo(observer(PaginationComponent));
