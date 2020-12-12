import React from 'react';
import {useState, useEffect} from 'react';
import {onChangeSelectionParams} from '../../methods/pensioners/on-change-selection-params';
import {PensionerDataKey, PensionersFiltersConfigiurations} from '../../utils/constants-pensioners';
import {FiltersSection} from '../common/filters-section/filters-section';
import {SectionHeading} from '../common/section-heading/section-heading';
import TableComponent from '../common/table-component/table-component';
import PensionersTableActions from './pensioners-table-actions';
import {getColumnsCellsConfig, TableType} from '../../methods/by-table/get-column-cell-config';
import {tableCssCls} from '../../utils/table-constants';
import store from '../../stores/pensioners-store';
import {stopPayments, startPayments, sendCashRequest} from '../../api/api-pensioners';
import {observer} from 'mobx-react';
import './pensioners-table.scss';


const TABLE_CLS = `${tableCssCls.BASE}  ${tableCssCls.BASE}--pensioners`;
const columns = getColumnsCellsConfig(PensionerDataKey, store, onChangeSelectionParams, TableType.PENSIONERS);

function PensionersTable(): JSX.Element {
  useEffect(() => {
    onChangeSelectionParams();
  }, []);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const toStopPayments = ():void => {
    store.setLoadState(true);
    stopPayments(selectedRowKeys)
    .then(() => {
      onChangeSelectionParams();
      setSelectedRowKeys([]);
    })
    .catch(() => store.setLoadState(false));
  };
  const resumePayments = ():void => {
    store.setLoadState(true);
    startPayments(selectedRowKeys)
    .then(() => {
      onChangeSelectionParams();
      setSelectedRowKeys([]);
    })
    .catch(() => store.setLoadState(false));
  };
  const runCashRequest = ():void => {
    store.setLoadState(true);
    sendCashRequest()
    .then(() => store.setLoadState(false))
    .catch(() => store.setLoadState(false));
  };
  const onChange = (selectedRows: []): void => {
    setSelectedRowKeys(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange,
  };

  return (
    <section className="pensioners">
      <SectionHeading text={'Список пенсионеров'} />
      {store.isFilterShow &&
        <FiltersSection
          allFiltersGroupsConfigurations={PensionersFiltersConfigiurations}
          store={store}
        />
      }
      {!store.isFilterShow &&
        <>
          <PensionersTableActions
            selectedRowsData={selectedRowKeys}
            onStopPayments={toStopPayments}
            onResumePayments={resumePayments}
            onSendCashRequest={runCashRequest}
            store={store}
            onChangeSelectionParams={onChangeSelectionParams}
          />
          <TableComponent
            rowKey='id'
            tableClassName={TABLE_CLS}
            rowSelection={rowSelection}
            dataRows={store.docs}
            columns={columns}
            rowClassName={tableCssCls.CONTENT_ROW}
            store={store}
            onChangeSelectionParams={onChangeSelectionParams}
          />
        </>
      }
    </section>
  );
}
export default React.memo(observer(PensionersTable));
