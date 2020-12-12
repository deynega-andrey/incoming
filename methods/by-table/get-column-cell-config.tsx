import {Tooltip} from 'antd';
import * as React from 'react';
import {Switch} from '../../components/common/switch/switch';
import TableColumnHeading from '../../components/common/table-column-heading/table-column-heading';
import {PensionerDataKey} from '../../utils/constants-pensioners';
import {onSortClick} from '../by-table/on-sort-click';

const COLUMN_WITH_BORDER_CLS: string = 'table__column--separate';
interface IDataItem {[key:string] : string | number | null };
/* Колонки-"исключения", имеющие уникальную структуру */

/* Для модуля Список пенсионеров */
const getPaymentStateCell = (): IColumn => {
  return {
    render: (data: IDataItem): JSX.Element => {
      const isActivePayment: boolean = data[PensionerDataKey.PAYMENT_STATE.key] === 0;
      return (
        <Tooltip title={isActivePayment ? 'Выплаты активны' : 'Выплаты приостановлены'} placement="right">
          <div>
            <Switch additionalClasses={'switch--not-allowed'} activityState={isActivePayment} />
          </div>
        </Tooltip>
      );
    },
  };
};
export enum TableType {
  PENSIONERS = 'pensioners',
  ANY = 'ANY'
} 
const getDocumentStateCell = (store: {[key:string]: any}, onChangeParams: () => void, tableType: TableType): IColumn => {
  return {
    title: <TableColumnHeading
      columnProp={'state'} 
      headerText={'Статус'} 
      store={store}
    />,
    onHeaderCell: () => {
      return {
        onClick: () => onSortClick('state', store, onChangeParams)
      };
    },
    render: (data:any):JSX.Element => {
      const status:string = data.state.name;
      const isActivePayment:boolean = (tableType === TableType.PENSIONERS) ? data[PensionerDataKey.PAYMENT_STATE.key] === 0 : false;
      if (tableType === TableType.ANY || isActivePayment) {
        return <span className="table__cell-text">{status}</span>;
      } else {
        return (
          <Tooltip title="Выплаты приостановлены">
            <span className="table__cell-text table__cell-text--suspended">{status}</span>
          </Tooltip>
        );
      }
    },
    className: COLUMN_WITH_BORDER_CLS,
  };
};
//
/**/
const formatToNumberRank = (num:number):string => {
  return num.toLocaleString().replace('.', ',');
};
type val = string | number | null | undefined;
const getContent = (value:val):string => {
  if (value !== null && value !== undefined) {
    if (typeof value === 'number')  {
      return formatToNumberRank(value);
    }
    return `${value}`;
  }
  return '';
};
export interface IColumn {
  title?: string | JSX.Element;
  dataIndex?: string;
  className?: string;
  render?: (value: any, dataItem: any) => JSX.Element | string;
  onHeaderCell?:() => void;
};
interface IDataKey {
  [key:string]: {
    key: any,
    columnHeading?: string,
    CSS_CLS?: string
  }
}
const renderCellContent = (value: val, dataItem: any, tableType: string): JSX.Element => {
  if (tableType === TableType.PENSIONERS) {
    const isActivePayment: boolean = dataItem[PensionerDataKey.PAYMENT_STATE.key] === 0;
    if (isActivePayment) {
      return <span className="table__cell-text">{getContent(value)}</span>;
    } else {
      return (
        <Tooltip title="Выплаты приостановлены">
          <span className="table__cell-text  table__cell-text--suspended">{getContent(value)}</span>
        </Tooltip>
      );
    }
  }
  return (<span className="table__cell-text">{getContent(value)}</span>);
};
const getCellFromDataProperty = (propName:string, store:{[key:string]: any}, onChangeParams:() => void, heading:string = '', cellCssCls: string = COLUMN_WITH_BORDER_CLS, tableType:string): IColumn => {
  return {
    dataIndex: propName,
    title: (
      <TableColumnHeading
        columnProp={typeof propName === 'string' ? propName : ''}
        headerText={heading}
        store={store}
      />
    ),
    onHeaderCell: () => {
      return {
        onClick: () => onSortClick(propName, store, onChangeParams)
      };
    },
    render: (value: val, data: {[key:string] : string | number | null }): JSX.Element => renderCellContent(value, data, tableType),
    className: cellCssCls,
  };
};

const getConfig = (dataKey:IDataKey, prop:string, store: {[key:string]: any}, onChangeParams:() => void, tableType:TableType) => {
  switch (prop) {
    case 'PAYMENT_STATE':
      return getPaymentStateCell();
    case 'DOC_STATE':
      return getDocumentStateCell(store, onChangeParams, tableType);
    case 'BO_STATE':
      return getDocumentStateCell(store, onChangeParams, tableType);
    default:
      return getCellFromDataProperty(dataKey[prop].key, store, onChangeParams, dataKey[prop].columnHeading, dataKey[prop].CSS_CLS, tableType);
  }
};

export const getColumnsCellsConfig = (dataKey: IDataKey, store: {[key:string]: any}, onChangeParams:() => void, tableType:TableType = TableType.ANY) => {
  const columnsCellsConfig = [];
  for (let prop in dataKey) {
    columnsCellsConfig.push(getConfig(dataKey, prop, store, onChangeParams, tableType))
  }
  return columnsCellsConfig;
};
