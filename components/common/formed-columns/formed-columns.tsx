import * as React from 'react';
import {ReactComponent as SortIcon} from '../../../assets/icons/sort-arrow.svg';
import {IFormedColumns, IFormedTitle, IHeaderCell} from '../../../utils/interfaces/interfaces';
import './formed-columns.scss';
import {Tooltip} from 'antd';

/**
 * Компонент для вставки в ячейку хедера таблицы когда требуется ячейка в виде текста и иконки сортировки
 * @param text
 * @param id
 * @param bodyRequest
 * @param formedBodtRequest
 * @constructor
 */

export const FormedCell = (props: IHeaderCell) => {
  const {column, bodyRequest} = props;
  const {title, dataIndex} = column;
  const {sortField, sortType} = bodyRequest;
  return (

    <div className='app__table-header-cell'>
      <Tooltip title={title}>
        <div className={`app__table-header-text`}>{title}</div>
      </Tooltip>
      <div
        className={
          sortField === dataIndex
            ? `app__table-header-icon app__table-header-icon_blue`
            : `app__table-header-icon`
        }
      >
        <div
          className={
            sortField === dataIndex && sortType
              ? `app__table-header-wrapper app__table-header-wrapper_rotated`
              : `app__table-header-wrapper`
          }
        >
          <Tooltip
            title={
              sortField !== dataIndex || sortType === false
                ? 'Сортировка по убыванию'
                : 'Сортировка по возрастанию'
            }>
            <SortIcon />
          </Tooltip>
        </div>
      </div>
    </div>

  );
};

/**
 * Формирование значения title для ячейки хэдера таблицы
 * column - одна колонка (объект с параметрами)
 * bodyRequest - вспомогательный объект для формирования тела запроса на бекенд
 * setBodyRequest - функция для фомирования вспомогательного объекта
 */

const FormedTitle = (props: IFormedTitle) => {
  return (
    <>
      {(() => {
        switch (props.column.type) {
          case 'str': {
            return props.column.title;
          }
          case 'component': {
            return <FormedCell {...props}/>
          }
        }
      })()}
    </>
  );
};

/**
 * Коомпонент для формирования колонок (шапки таблицы)
 */
const FormedColumns = (props: IFormedColumns) => {
  const {sortType, sortField} = props.bodyRequest;
  return props.columns.map((column, key) => {
    const {dataIndex, className} = column;
    return {
      className,
      dataIndex,
      key,
      title: <FormedTitle column={column} {...props}/>,
      onHeaderCell: () => {
        return {
          onClick: () => {
            if (column.dataIndex !== 'checkbox')
            props.setBodyRequest({
              ...props.bodyRequest,
              sortField: dataIndex,
              sortType: dataIndex === sortField ? !sortType : false,
            })
          }
        };
      }
    };
  });
};

export default FormedColumns;