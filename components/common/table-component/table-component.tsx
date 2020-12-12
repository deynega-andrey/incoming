import {Table} from 'antd';
import React from 'react';
import PaginationComponent from '../pagination-component/pagination-component';
import {observer} from 'mobx-react';
import './table-component.scss';

interface ITableComponent {
  rowKey?: string;
  rowSelection?: any;
  dataRows?: any;
  tableClassName?: string;
  columns: any;
  rowClassName: string;
  store?: any;
  onChangeSelectionParams():void;
}

function TableComponent(props: ITableComponent) {
  return (
    <>
      <Table
        rowKey={props.rowKey}
        rowSelection={props.rowSelection}
        className={props.tableClassName}
        columns={props.columns}
        dataSource={props.store.docs}
        rowClassName={props.rowClassName}
        pagination={false}
      />
      <PaginationComponent
        store={props.store}
        onChangeSelectionParams={props.onChangeSelectionParams}
      />
    </>
  );
}

export default React.memo(observer(TableComponent));
