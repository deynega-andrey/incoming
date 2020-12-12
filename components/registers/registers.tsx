import React, {useEffect, useState} from 'react';
import {SectionHeading} from '../common/section-heading/section-heading';
import RowActions from '../common/row-actions/row-actions';
import {
  COLUMN_CLS, CONTENT_ROW_CLS,
  IActions, IBodyRequest, IButtons,
  IColumn, IncomingDataKeys,
  ITableFilter, ITableFilterValues, ITableRows,
  SIZE, TABLE_CLS
} from '../../utils/interfaces/interfaces';
import {ReactComponent as DumplingIcon} from '../../assets/icons/registry-icon.svg';
import {ReactComponent as DownloadIcon} from '../../assets/icons/download.svg';
import {ReactComponent as RefreshIcon} from '../../assets/icons/refresh.svg';
import FormedColumns from '../common/formed-columns/formed-columns';
import {Table} from 'antd';
import {PaginationComplex} from '@openvtb/react-ui-kit';
import {useHistory, useLocation} from 'react-router-dom';
import {
  addCheckboxesInTable,
  formedChips,
  getParamsRoute,
  returnFilters,
  routeChangeUrl,
} from '../../methods/registers';
import ModalComponent from '../common/modal-component/modal-component';
import ModalFilters from '../common/modal-filters/modal-filters';
import SearchChips from "../common/search-chips/search-chips";
import {getAllRegisters, getExcelV2, getZFile} from "../../services/actions/actions";
import store from '../../stores/registers-store';
import {observer} from "mobx-react";

const Registers = () => {

  /**
   * Стор Мобикса
   */
  const {rowsTotalSize, tableRows} = store.data;

  /**
   * Открытие-закрытие модальных окон
   */
  const [modal, setModal] = useState<null | string>(null);

  /**
   * Получение данных из url
   */
  const location = useLocation();
  const {pageNumberRoute, pageSizeRoute, paramsRoute, sortFieldRoute, sortTypeRoute,
    registryIdRoute, checkRoute, idRoute} = getParamsRoute(location);

  /**
   * Фиксируется количество записей при переключении пагинации в низу страницы
   */
  const [perPage, onItemsPerPageChange] = useState<number | null>(pageSizeRoute || null);

  /**
   * params - объект с данными с фильтров
   */
  const [params, setParams] = useState<ITableFilterValues[] | null>(paramsRoute || null)

  /**
   * pageNumber - текущая страница,
   * sortField - название поля для сортировки,
   * sortType - тип сортировки,
   * check, id, registryId - запись данных с чекбоксов в левой части таблицы
   */
  const [bodyRequest, setBodyRequest] = useState<Partial<IBodyRequest>>({
    pageNumber: pageNumberRoute || 1,
    sortField: sortFieldRoute || null,
    sortType: sortTypeRoute || null,
    check: checkRoute || false,
    id: idRoute || null,
    registryId: registryIdRoute || null,
  });

  const {sortType, sortField, pageNumber, check, registryId, id} = bodyRequest;

  /**
   * Данные для отрисовки строк таблицы
   */
  const dataSource: Partial<ITableRows>[] | null = tableRows;

  /**
   * Добавление ячейки с чекбоксом в каждую строку данныx для отрисовки таблицы ;
   */
  addCheckboxesInTable(dataSource, bodyRequest, setBodyRequest);

  /**
   * Описание фильтров таблицы
   * type: ITableFilter[]
   */
  const filters: ITableFilter[] = [
    {name: 'recordPeriod', label: 'Период', type: 'datePeriod', calendarSize: 'big'},
    {
      name: 'status',
      label: 'Статус реестра',
      type: 'select',
      size: SIZE.SMALL,
      width: 320,
      variables: [
        {label: 'Создан', value: 'Created'},
        {label: 'В обработке', value: 'Processing'},
        {label: 'Обработан', value: 'Processed'},
        {label: 'Частично обработан', value: 'PartlyProcessed'},
      ],
    },
    {name: 'clientAccount', label: 'Счет/карта', type: 'input', width: 320, size: 'small'},
    {name: 'inn', label: 'ИНН ЮЛ', type: 'input', width: 320, size: 'small'},
    {
      name: 'incomeStatus',
      label: 'Статус обработки реестра ',
      type: 'select',
      size: 'small',
      width: 320,
      variables: [
        {label: 'Создан', value: 'Created'},
        {label: 'В обработке', value: 'Processing'},
        {label: 'Обработан', value: 'Processed'},
        {label: 'Частично обработан', value: 'PartlyProcessed'},
      ],
    },
    {name: 'paymentCourse', label: 'Направление выплат', type: 'paymentCourse', width: 320, size: 'small'},
    {name: 'name', label: 'Имя реестра', type: 'input', width: 320, size: 'small'},
    {name: 'fio', label: 'ФИО пенсионера', type: 'input', width: 320, size: 'small'},
    {name: 'bik', label: 'БИК банка ', type: 'input', width: 320, size: 'small'},
  ];

  /**
   * Формирование чипсов и url в адресной строке
   */
  useEffect(() => {
    formedChips(params, setChips);
    routeChange(params);
  }, [bodyRequest]);

  /**
   * Загрузка первоначальных данных, применение пагинации, фильтров и сортировок.
   */
  useEffect(() => {
    const body = formedBody(params, null);
    getAllRegisters(body);
  }, [pageNumber, sortField, sortType, perPage]);

  /**
   * Функция для формирования тела запроса
   */
  const formedBody = (params: any, page: number | null) => {
    return {
      filters: returnFilters(params!),
      pageNumber: page || pageNumber,
      pageSize: itemsPerPage,
      sortField,
      sortType: sortType ? 'asc' : 'desc',
      filter: search
    };
  };

  /**
   * Применение фильтров
   * @param filters - фильтры
   */
  const applyFilters = () => {
    const body = formedBody(params, null);
    formedChips(params, setChips);
    getAllRegisters(body);
    routeChange(params);
    setModal(null);
  }

  /**
   * Функция для формирования url
   * @param params
   */
  const history = useHistory();
  const routeChange = (params: any) => {
    routeChangeUrl(params, itemsPerPage, bodyRequest, location, history);
  }

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
   *  Ключи
   */
  const {
    NAME,
    LOAD_DATE,
    CREATE_DATE,
    PROCESS_DATE,
    SUM,
    PAYMENT_AMOUNT,
    STATUS,
  } = IncomingDataKeys;

  /**
   * Columns - Описание ячеек (колонок) хедера таблицы для отрисовки
   */
  const columns: IColumn[] = [
    {dataIndex: 'checkbox', title: '', type: 'str'},
    {dataIndex: NAME, title: 'Имя реестра', type: 'component', className: COLUMN_CLS},
    {dataIndex: LOAD_DATE, title: 'Дата загрузки', type: 'component', className: COLUMN_CLS},
    {dataIndex: CREATE_DATE, title: 'Дата формирования', type: 'component', className: COLUMN_CLS},
    {dataIndex: PROCESS_DATE, title: 'Дата обработки', type: 'component', className: COLUMN_CLS},
    {dataIndex: SUM, title: 'Сумма расчетная', type: 'component', className: COLUMN_CLS},
    {dataIndex: PAYMENT_AMOUNT, title: 'Сумма зачислений', type: 'component', className: COLUMN_CLS},
    {dataIndex: STATUS, title: 'Статус реестра', type: 'component', className: COLUMN_CLS},
  ];

  /**
   * Функция для распечатки реестра зачислений
   */
  const printExcel = () => {
    const body = formedBody(params, null);
    getExcelV2(body);
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
    {text: 'Обновить', type: 'button', icon: <RefreshIcon/>, onClick: applyFilters},
    {text: 'Сформировать отчет', type: 'button', icon: <DumplingIcon/>, onClick: printExcel},
    {text: 'Нотификация реестра', type: 'button', icon: <DumplingIcon/>, param: false},
    {text: 'Выгрузить реестр', onClick: () => {
      if (registryId && check) {
        const {name} = dataSource!.filter(el => el.key === id)[0];
        getZFile(registryId!, name!);
        disabledDownloadRegistry();
      }
      },
      type: 'button', icon: <DownloadIcon/>, param: check,},
  ]

  /**
   * Очистка фильтров
   */
  const resetFilters = () => {
    setModal(null);
    routeChange(null);
    setParams(null);
    formedChips(null, setChips);
    const body = formedBody(null, 1);
    getAllRegisters(body);
  }
  /**
   * Описание кнопок модального окна
   */
  const buttons: IButtons[] = [
    {marginRight: 20, text: 'Применить', kind: 'primary', size: 'small', onClick: applyFilters
      },
    {marginRight: 20, text: 'Очистить', kind: 'secondary', size: 'small', onClick: resetFilters},
  ]

  /**
   * Функция изменения номера страницы;
   * @param newPage;
   */
  const onPageChange = (newPage: number) => setBodyRequest({...bodyRequest, pageNumber: newPage});

  /**
   * Поиск по всей таблице
   */
  const [search, setSearch] = useState<string | null>('');

  /**
   * Применение чипсов
   */
  const applyChipsFilter = (params: any) => {
    setParams(params);
    const body = formedBody(params, 1);
    formedChips(params, setChips);
    getAllRegisters(body);
    routeChange(params);
  }

  /**
   * Формирование чипсов
   */
  const [chips, setChips] = useState<[] | { id: number, label: string }[]>([]);

  /**
   * Очистка основного фильтра по таблице
   */
  const cleanCommonFilter = () => {
    setSearch('');
    setParams(params);
    const body = {
      filters: returnFilters(params!),
      pageNumber: pageNumber,
      pageSize: itemsPerPage,
      sortField,
      sortType: sortType ? 'asc' : 'desc',
      filter: ''
    };
    formedChips(params, setChips);
    getAllRegisters(body);
    routeChange(params);
  }

  /**
   * Отрисовка
   */
  return (
      <>
        {modal === 'filters' &&
          <ModalFilters
            filters={filters}
            width={1300}
            params={params}
            buttons={buttons}
            applyFilters={applyFilters}
            setParams={setParams}
            setModal={setModal}
            chips={chips}
            applyChipsFilter={applyChipsFilter}
          />}
        {modal === 'notation' && <ModalComponent setModal={setModal}/>}
        <SectionHeading text={'Реестры зачислений'}/>
        <div className='app__registers-row-actions'>
          <RowActions actions={actions}/>
        </div>
        <SearchChips
          setModal={setModal}
          setSearch={setSearch}
          chips={chips}
          applyFilters={applyFilters}
          params={params}
          setParams={setParams}
          applyChipsFilter={applyChipsFilter}
          cleanCommonFilter={cleanCommonFilter}
          search={search}
        />
        <Table
          className={TABLE_CLS}
          columns={FormedColumns({columns, bodyRequest, setBodyRequest})}
          dataSource={dataSource!}
          pagination={false}
          rowClassName={(record) => {
            return record.key === id ? `${CONTENT_ROW_CLS} ant-table-row-selected table-registers-row` :
              `${CONTENT_ROW_CLS} table-registers-row`
          }}
          onRow={(record) => ({
            onClick: (event) => {
              window.open(`registry/${record.key}`, '_blank');
            },
          })}
        />
        <div className='app__table-pagination app__table-pagination_right'>
          <PaginationComplex
            itemsPerPage={itemsPerPage}
            page={pageNumber!}
            totalItems={rowsTotalSize || 0}
            onItemsPerPageChange={onItemsPerPageChange}
            onPageChange={onPageChange}
          />
        </div>
      </>
  )
}

export default observer(Registers);