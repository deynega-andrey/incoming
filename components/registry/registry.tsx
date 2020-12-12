import React, {useEffect, useState} from 'react';
import './registry.scss';
import {
  COLUMN_CLS,
  CONTENT_ROW_CLS,
  IBodyRequest, IButtons,
  IColumn, IInfo,IncomingDataKeys,
  ITableFilter, ITableFilterValues, ITableRows,
  TABLE_CLS
} from '../../utils/interfaces/interfaces';
import {PaginationComplex} from '@openvtb/react-ui-kit';
import FormedColumns from '../common/formed-columns/formed-columns';
import {Table} from 'antd';
import InfoCards from './info-cards/info-cards';
import {SectionHeading} from '../common/section-heading/section-heading';
import SearchChips from '../common/search-chips/search-chips';
import {
  addCheckboxesInTable,
  formedChips, getParamsRoute,
  returnFilters, routeChangeUrl,
} from '../../methods/registers';
import {returnedRegistryNumber} from '../../methods/registry';
import ModalFilters from '../common/modal-filters/modal-filters';
import {useHistory, useLocation} from 'react-router-dom';
import {getRegister, getRegisterInfo} from '../../services/actions/actions';
import store from '../../stores/registers-store';
import {observer} from 'mobx-react';

const Registry = () => {

  /**
   * Стор Мобикса
   */
  const {tableRows, rowsTotalSize, registryInfo} = store.data;

  let name, createDate, sum, status;
  if (registryInfo !== null) {
    // @ts-ignore
    name = registryInfo!.name;
    // @ts-ignore
    createDate = registryInfo!.createDate;
    // @ts-ignore
    sum = registryInfo!.sum;
    // @ts-ignore
    status = registryInfo!.status;
  }

  /**
   * Данные для отрисовки строк таблицы
   */
  const dataSource: Partial<ITableRows>[] | null = tableRows;

  /**
   * Открытие-закрытие модальных окон
   */
  const [modal, setModal] = useState<null | string>(null);

  const location = useLocation();

  /**
   * Номер регистра
   */
  const registryNumber = returnedRegistryNumber(location);

  /**
   * Получение данных из url
   */
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
   * notIncluded - список зачислений не вошедшие в реестр
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
   * Функция для формирования url
   * @param params
   */
  const history = useHistory();
  const routeChange = (params: any) => {
    routeChangeUrl(params, itemsPerPage, bodyRequest, location, history);
  }

  /**
   * Информация для отображения
   */
  const info: IInfo[] = [
    {label: 'Наименование файла реестра', value: name, width: 'long'},
    {label: 'Длинное наименование ЮЛ', value: 'Наименование ЮЛ', width: 'long'},
    {label: 'Дата зачисления', value: '', width: 'short'},
    {label: 'Дата загрузки', value: '', width: 'short'},
    {label: 'Документ покрытия', value: 'Здесь соответствующие данные', width: 'long'},
    {label: 'Сумма реестра, руб.', value: sum, width: 'long'},
    {label: 'Статус реестра', value: status, width: 'short'},
    {label: 'Дата формирования', value: createDate, width: 'short'},
  ]

  /**
   * Применение фильтров
   * @param filters - фильтры
   */
  const applyFilters = () => {
    const body = formedBody(params, 1);
    formedChips(params, setChips);
    getRegister(registryNumber, body);
    routeChange(params);
    setModal(null);
  }

  /**
   * Добавление ячейки с чекбоксом в каждую строку данныx для отрисовки таблицы ;
   */
  addCheckboxesInTable(dataSource, bodyRequest, setBodyRequest);

  /**
   * Функция изменения номера страницы;
   * @param newPage;
   */
  const onPageChange = (newPage: number) => setBodyRequest({...bodyRequest, pageNumber: newPage});

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
   * Поиск по всей таблице
   */
  const [search, setSearch] = useState('');

  /**
   * Отключение чипсов
   */
  const applyChipsFilter = (params: any) => {
    setParams(params);
    const body = formedBody(params, null);
    formedChips(params, setChips);
    getRegister(registryNumber, body);
    routeChange(params);
  }

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
   * Описание фильтров таблицы
   * type: ITableFilter[]
   */
  const filters: ITableFilter[] = [
    {name: 'clientAccount', label: 'Номер счета получателя', type: 'input', width: 320, size: 'small'},
    {name: 'numberAccountIncome', label: '№ счета зачисления', type: 'input', width: 320, size: 'small'},
    {name: 'fio', label: 'ФИО получателя', type: 'input', width: 320, size: 'small'},
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
  ]

  /**
   *  Ключи
   */
  const {
    PAYMENT_AMMOUNT,
    STATUS,
    FIO,
    CLIENT_ACCOUNT,
    INCOME_DATE,
    INCOME_KIND,
    CHECK_OFF_AMMOUNT
  } = IncomingDataKeys;

  /**
   * Columns - Описание ячеек (колонок) хедера таблицы для отрисовки
   */
  const columns: IColumn[] = [
    {dataIndex: 'checkbox', title: '', type: 'str', },
    {dataIndex: CLIENT_ACCOUNT, title: 'Номер счета получателя', type: 'component', className: COLUMN_CLS},
    {dataIndex: FIO, title: 'ФИО', type: 'component', className: COLUMN_CLS},
    {dataIndex: PAYMENT_AMMOUNT, title: 'Сумма', type: 'component', className: COLUMN_CLS},
    {dataIndex: STATUS, title: 'Статус обработки', type: 'component', className: COLUMN_CLS},
    {dataIndex: INCOME_DATE, title: 'Дата зачисления', type: 'component', className: COLUMN_CLS},
    {dataIndex: INCOME_KIND, title: 'КВД', type: 'component', className: COLUMN_CLS},
    {dataIndex: CHECK_OFF_AMMOUNT, title: 'Сумма удержания', type: 'component', className: COLUMN_CLS},
  ];

  /**
   * Очистка фильтров
   */
  const resetFilters = () => {
    routeChange(null);
    setParams(null);
    setModal(null);
    formedChips(null, setChips);
    const body = formedBody(null, 1);
    getRegister(registryNumber, body);
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
   * Загрузка первоначальных данных, применение пагинации, фильтров и сортировок.
   */
  useEffect(() => {
    const body = formedBody(params, null);
    getRegister(registryNumber, body);
  }, [pageNumber, sortField, sortType, perPage]);

  /**
   * Формирование чипсов и url в адресной строке
   */
  useEffect(() => {
    formedChips(params, setChips);
    routeChange(params);
  }, [bodyRequest]);

  /**
   * Загрузка информации по реестру
   */
  useEffect(() => {
    getRegisterInfo(registryNumber);
  }, []);

  /**
   * Формирование чипсов
   */
  const [chips, setChips] = useState<[] | { id: number, label: string }[]>([]);

  /**
   * Очистка основного фильтра по таблице
   */
  const cleanCommonFilter = () => {
    setSearch('');
    const body = {
      filters: returnFilters(params!),
      pageNumber: pageNumber,
      pageSize: itemsPerPage,
      sortField,
      sortType: sortType ? 'asc' : 'desc',
      filter: ''
    };
    getRegister(registryNumber, body);
    getRegisterInfo(registryNumber);
    formedChips(params, setChips);
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
          width={1000}
          params={params}
          buttons={buttons}
          applyFilters={applyFilters}
          setParams={setParams}
          setModal={setModal}
          chips={chips}
          applyChipsFilter={applyChipsFilter}
        />}
      <SectionHeading text={name}/>
      <InfoCards info={info}/>
      <div className='app__registry'>
        <SearchChips
          setModal={setModal}
          setSearch={setSearch}
          chips={chips}
          applyFilters={applyFilters}
          params={params}
          setParams={setParams}
          applyChipsFilter={applyChipsFilter}
          search={search}
          cleanCommonFilter={cleanCommonFilter}
        />
        <Table
          className={TABLE_CLS}
          columns={FormedColumns({columns, bodyRequest, setBodyRequest})}
          dataSource={dataSource!}
          rowClassName={(record) => record.key === id ? `${CONTENT_ROW_CLS} ant-table-row-selected` : CONTENT_ROW_CLS}
          pagination={false}
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
      </div>
      </>
  )
}

export default observer(Registry);