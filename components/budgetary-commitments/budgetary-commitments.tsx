import React, {useState, useEffect} from 'react';
import {SectionHeading} from '../common/section-heading/section-heading';
import {onChangeSelectionParams} from '../../methods/budgetary-commitments/on-change-selection-params';
import TableComponent from '../common/table-component/table-component';
//import {Checkbox} from '../common/checkbox/checkbox';
import {BudgetaryCommitmentsKey} from '../../utils/constants-budgetary-commitments';
import {getColumnsCellsConfig} from '../../methods/by-table/get-column-cell-config';
import {tableCssCls} from '../../utils/table-constants';
import {getDocuments} from '../../api/api-budgetary-commitments';
import store from '../../stores/budgetary-commitments-store';
import {observer} from 'mobx-react';
import './budgetary-commitments.scss';

const TABLE_CLS =`${tableCssCls.BASE}  ${tableCssCls.BASE}--budgetary-commitments`;
const columns = getColumnsCellsConfig(BudgetaryCommitmentsKey, store, onChangeSelectionParams);

function BudgetaryCommitments ():JSX.Element {
  useEffect(() => {
    store.setLoadState(true);
    getDocuments(store.itemsPerPage, store.tablePage)
    .then((data) => {
      store.updateDocs(data.data);
      store.setDocsAmount(data.totalDocsAmount);
      store.setPagesAmount(data.totalPagesAmount);
      store.setLoadState(false);
      console.log(data);
    })
    .catch(() => store.setLoadState(false));
    }, [])
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onChange = (selectedRows: []): void => {
    setSelectedRowKeys(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange,
  };
  return (<section className="budgetary-commitments">
    <SectionHeading text={'Бюджетные обязательства'}/>
    {/* <div className="actions-panel">
      <Checkbox
        disabledBtnsState={false}
        checked={true}
        btnText={'Все'}
        onChange={() => {}}
      />
      <Checkbox
        disabledBtnsState={false}
        checked={true}
        btnText={'Входящие'}
        onChange={() => {}}
      />
      <Checkbox
        disabledBtnsState={false}
        checked={true}
        btnText={'Исходящие'}
        onChange={() => {}}
      />
    </div> */}
    <TableComponent
      rowKey={'boId'}
      tableClassName={TABLE_CLS}
      rowSelection={rowSelection}
      dataRows={store.docs}
      columns={columns}
      rowClassName={tableCssCls.CONTENT_ROW}
      store={store}
      onChangeSelectionParams={onChangeSelectionParams}
    />
  </section>);
};

export default React.memo(observer(BudgetaryCommitments));
