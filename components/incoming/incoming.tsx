import React, {useEffect, useState} from 'react';
import {SectionHeading} from '../common/section-heading/section-heading';
import TableFilters from './table-filters-incoming/table-filters-incoming';
import {PaginationComplex} from '@openvtb/react-ui-kit';
import {Table} from 'antd';
import {observer} from 'mobx-react';
import store from '../../stores/registers-store';
import {returnFilters, routeChangeUrl} from '../../methods/registers';
import {addCheckboxesInTableIncoming, getParamsRouteIncoming} from '../../methods/incoming';
import {ReactComponent as PrintIcon} from '../../assets/icons/print-icon.svg';
import {ReactComponent as DumplingIcon} from '../../assets/icons/registry-icon.svg';
import {
  COLUMN_CLS,
  CONTENT_ROW_CLS,
  IColumn,
  IncomingDataKeys,
  ITableFilterValues,
  TABLE_CLS,
  ITableRows, ITableFilter, SIZE, IActions, IBodyRequest
} from '../../utils/interfaces/interfaces';
import {getExcel, getRegisters, getZFile} from '../../services/actions/actions';
import 'antd/dist/antd.css';
import FormedColumns from '../common/formed-columns/formed-columns';
import { useHistory, useLocation } from "react-router-dom";

import RowActions from "../common/row-actions/row-actions";

const Incoming: React.FC = (props) => {

  /**
   * Получение данных из юрл
   */
  const location = useLocation();
  const {pageNumberRoute, pageSizeRoute, notIncludedRoute, paramsRoute, sortFieldRoute, sortTypeRoute,
    registryIdRoute, checkRoute, idRoute} = getParamsRouteIncoming(location);

  /**
   * Фиксируется количество записей при переключении пагинации в низу страницы
   */
  const [perPage, onItemsPerPageChange] = useState<number | null>(pageSizeRoute || null);

  /**
   * pageNumber - текущая страница,
   * sortField - название поля для сортировки,
   * sortType - тип сортировки,
   * notIncluded - список зачислений не вошедшие в реестр
   * check, id, registryId - Запись данных с чекбоксов в левой части таблицы
   */
  const [bodyRequest, setBodyRequest] = useState<Partial<IBodyRequest>>({
    notIncluded: notIncludedRoute || false,
    params: paramsRoute || null,
    pageNumber: pageNumberRoute || 1,
    sortField: sortFieldRoute || null,
    sortType: sortTypeRoute || null,
    check: checkRoute || false,
    id: idRoute || null,
    registryId: registryIdRoute || null,
  });

  const {sortType, sortField, pageNumber, notIncluded, check, registryId, id, params} = bodyRequest;

  /**
   * Стор Мобикса
   */
  const {tableRows, rowsTotalSize} = store.data;

  /**
   * Данные для отрисовки строк таблицы
   */
  const dataSource: ITableRows[] | null = tableRows;

  /**
   * Добавление ячейки с чекбоксом в каждую строку данныx для отрисовки таблицы ;
   */
  addCheckboxesInTableIncoming(dataSource, bodyRequest, setBodyRequest);

  /**
   * Описание фильтров таблицы
   * type: ITableFilter[]
   */
  const filters: ITableFilter[] = [
    {name: 'recordPeriod', label: 'Период', type: 'datePeriod', calendarSize: 'small'},
    {name: 'fio', label: 'ФИО пенсионера', type: 'input', width: 240, size: SIZE.SMALL},
    {name: 'name', label: 'Имя реестра', type: 'input', width: 240, size: SIZE.SMALL},
    {
      name: 'status',
      label: 'Статус реестра',
      type: 'select',
      size: SIZE.SMALL,
      width: 220,
      variables: [
        {label: 'Создан', value: 'Created'},
        {label: 'В обработке', value: 'Processing'},
        {label: 'Обработан', value: 'Processed'},
        {label: 'Частично обработан', value: 'PartlyProcessed'},
      ],
    },
    {name: 'bik', label: 'БИК банка получателя', type: 'input', width: 160, size: SIZE.SMALL},
  ];

  /**
   * Применение фильтров
   * @param filters - фильтры
   */
  const applyFilters = (filters: ITableFilterValues[]) =>
    setBodyRequest({...bodyRequest, params: filters, pageNumber: 1});

  /**
   * Переменная itemsPerPage для определения количества записей на странице;
   * При первоначальном открытии страницы количество записей равно 20
   * При переключении внизу страницы количества записей в компоненте пагинация количество записей равно параметру
   * perPage
   * При открытии страницы при переходе по ссылке количество записей равно параметру pageSizeRoute
   * (взятого из адресной строки)
   */
  const itemsPerPage = perPage || pageSizeRoute || 20;

  /**
   * Функция для формирования тела запроса
   */

  const formedBody = () => {
    return {
      filterId: notIncluded ? 'NotIncluded' : null,
      filters: returnFilters(params!),
      pageNumber,
      pageSize: itemsPerPage,
      sortField,
      sortType: sortType ? 'asc' : 'desc',
    };
  };

  /**
   * Функция для формирования url
   * @param params
   */
  const history = useHistory();
  const routeChange = (params: any) => {
    routeChangeUrl(params, itemsPerPage, bodyRequest, location, history);
  }

  /**
   * Загрузка первоначальных данных, применение пагинации, фильтров и сортировок.
   */

  useEffect(() => {
    const body = formedBody();
    getRegisters(body);
  }, [pageNumber, sortField, sortType, perPage, notIncluded, params]);

  /**
   * Формирование чипсов и url в адресной строке
   */
  useEffect(() => {
    routeChange(params);
  }, [bodyRequest]);

  /**
   *  Ключи
   */

  const {
    NAME,
    LOAD_DATE,
    PROCESS_DATE,
    SUM,
    PAYMENT_AMOUNT,
    STATUS,
    FIO,
    CLIENT_ACCOUNT,
    INCOME_STATUS,
    BIK,
    PAYMENT_CODE,
    PAYMENT_CATEGORY_CODE,
    KBK,
  } = IncomingDataKeys;

  /**
   * Columns - Описание ячеек (колонок) хедера таблицы для отрисовки
   */

  const columns: IColumn[] = [
    {dataIndex: 'checkbox', title: '', type: 'str'},
    {dataIndex: NAME, title: 'Имя реестра', type: 'component', className: COLUMN_CLS},
    {dataIndex: LOAD_DATE, title: 'Дата загрузки', type: 'component', className: COLUMN_CLS},
    {dataIndex: PROCESS_DATE, title: 'Дата обработки', type: 'component', className: COLUMN_CLS},
    {dataIndex: SUM, title: 'Сумма реестра', type: 'component', className: COLUMN_CLS},
    {dataIndex: PAYMENT_AMOUNT, title: 'Сумма зачислений', type: 'component', className: COLUMN_CLS},
    {dataIndex: STATUS, title: 'Статус реестра', type: 'component', className: COLUMN_CLS},
    {dataIndex: FIO, title: 'ФИО', type: 'component', className: COLUMN_CLS},
    {dataIndex: CLIENT_ACCOUNT, title: 'Счет зачислений', type: 'component', className: COLUMN_CLS},
    {dataIndex: INCOME_STATUS, title: 'Статус обработки зачислений', type: 'component', className: COLUMN_CLS},
    {dataIndex: BIK, title: 'Бик банка получателя', type: 'component', className: COLUMN_CLS},
    {dataIndex: PAYMENT_CODE, title: 'Код выплаты', type: 'component', className: COLUMN_CLS},
    {dataIndex: PAYMENT_CATEGORY_CODE, title: 'Код категории выплаты', type: 'component', className: COLUMN_CLS},
    {dataIndex: KBK, title: 'КБК', type: 'component'},
  ];

  /**
   * Функция для распечатки реестра зачислений
   */
  const printExcel = () => {
    if (notIncluded === true) {
      const body = formedBody();
      getExcel(body);
    }
  };

  /**
   * Функция изменения страницы;
   * @param newPage;
   */
  const onPageChange = (newPage: number) => setBodyRequest({...bodyRequest, pageNumber: newPage});

  /**
   * Функция включает-выключает флажок чекбокса "Не вошедшие"
   */
  const onChangeNotIncluded = () => {
    setBodyRequest({
      ...bodyRequest,
      notIncluded: !notIncluded,
    });
  };

  /**
   * Функция отключает кнопку "Выгрузить реестр"
   */
  const disabledDownloadRegistry = () => {
      setBodyRequest({
        ...bodyRequest,
        check: false,
        id: null,
        registryId: null,
      });
  };

  /**
   *  Описание строки действий таблицы
   */

  const actions: IActions[] = [
    {text: "Печать реестра", type: 'button', icon: <PrintIcon />, onClick: printExcel, param: notIncluded},
    {text: "Выгрузить реестр", type: 'button', param: check && !notIncluded && registryId !== null, onClick: () => {
      if (registryId && check) {
        const {name} = dataSource!.filter(el => el.key === id)[0];
        getZFile(registryId!, name);
        disabledDownloadRegistry();
      }},
    icon: <DumplingIcon />,
    },
    {text: "Не вошедшие", type: 'checkbox', onChange: onChangeNotIncluded, checked: notIncluded }
  ]

  /**
   * Отрисовка страницы
   */

  return (
    <>
      <SectionHeading text={'Реестры зачислений'} />
      <RowActions actions={actions}/>
      <div className='app__incoming-gap'></div>
      <TableFilters applyFilters={applyFilters} filters={filters} params={params}/>
      <Table
        className={TABLE_CLS}
        columns={FormedColumns({columns, bodyRequest, setBodyRequest})}
        dataSource={dataSource!}
        rowClassName={(record) => record.key === id ? `${CONTENT_ROW_CLS} ant-table-row-selected` : CONTENT_ROW_CLS}
        pagination={false}
      />
      <div className='app__table-pagination'>
        <PaginationComplex
          itemsPerPage={itemsPerPage}
          page={pageNumber!}
          totalItems={rowsTotalSize || 0}
          onItemsPerPageChange={onItemsPerPageChange}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default observer(Incoming);
