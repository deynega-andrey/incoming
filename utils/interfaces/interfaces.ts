import {ISelectComponentItem} from '@openvtb/react-ui-kit';

export enum SIZE {
  BIG = 'big',
  SMALL = 'small',
  MICRO = 'micro',
}

export interface IColumn {
  dataIndex: string;
  title: string | JSX.Element;
  type: 'str' | 'component';
  className?: string;
  render?: JSX.Element;
  key?: string
}

export const TABLE_CLS: string = 'table table--registers';
export const CONTENT_ROW_CLS: string = 'table__item-row';
export const COLUMN_CLS: string = 'table__column--separate';

export interface ITableFilter {
  name: string;
  label: string;
  type: 'input' | 'select' | 'datePeriod' | 'multiSelect' | 'paymentCourse';
  placeholder?: string;
  size?: 'big' | 'small';
  width?: number;
  variables?: ISelectComponentItem[];
  calendarSize?: 'big' | 'small';
}

export interface ITableFiltersProps {
  applyFilters?: Function;
  filters: ITableFilter[];
  params?: any,
  width?: number,
  setParams?: Function
}

export interface ITableFilterValues {
  [key: string]: any | any[] ;
}

export enum IncomingDataKeys {
  NAME = 'name', // Имя регистра
  LOAD_DATE = 'loadDate', // Дата загрузки
  CREATE_DATE = 'createDate', // Дата формирования
  PROCESS_DATE = 'processDate', // Дата обработки
  SUM = 'sum', // Сумма реестра
  PAYMENT_AMOUNT = 'paymentAmount', // Сумма зачислений
  STATUS = 'status', //
  FIO = 'fio', // ФИО
  CLIENT_ACCOUNT = 'clientAccount', // Счет зачислений
  INCOME_STATUS = 'incomeStatus', // Статус обработки зачисления
  BIK = 'bik', // Банковский идентификационный код
  PAYMENT_CODE = 'paymentCode', // Код платежа,
  PAYMENT_CATEGORY_CODE = 'paymentCategoryCode', // Код категории платежа
  KBK = 'kbk', // Код бюджетной классификации
  ACCONT_NUMBER = 'accountNumber', // Номер счета
  INCOME_DATE = 'incomeDate', // дата зачисления
  CHECK_OFF_AMMOUNT = 'checkoffAmmount', // сумма удержания
  KVD = 'kvd', // код вида доходов,
  PAYMENT_AMMOUNT = 'paymentAmount',
  INCOME_KIND = 'incomeKind',
}

export interface ITableRows {
  checkbox: JSX.Element,
  name: string,
  loadDate: string,
  createDate: string,
  processDate: string,
  sum: number,
  paymentAmount: number,
  status: string,
  fio: string,
  clientAccount: number,
  incomeStatus: string,
  bik: string,
  key: null | number,
  paymentCode: string,
  paymentCategoryCode: string,
  kbk: string,
  registryId: null | number,
  accountNumber: null | string,
  incomeDate: null | string,
  retentionSum: null | number,
  kvd: null | string,
  id: null | number,
  className: string
}

export interface IHeaderCell {
  column: any,
  bodyRequest: any;
}

export interface IBodyRequest {
  notIncluded: boolean,
  pageNumber: number,
  params: null | ITableFilterValues[],
  sortField: string | null,
  sortType: boolean | null,
  check: boolean,
  id: number | null,
  registryId: number | null,
  search: string | null,
  filter: string
}

export interface IFormedColumns {
  columns: IColumn[],
  bodyRequest: Partial<IBodyRequest>,
  setBodyRequest: any,
}

export interface IFormedTitle {
  bodyRequest: Partial<IBodyRequest>,
  column: IColumn
}

export interface ISidebar {
  sidebarWidth: boolean;
  setSidebarWidth: (sidebarWidth: boolean) => void;
}

/* Интерфейс для элементов выпадающего подменю */
interface ISubmenuItems {
  text: string, // текст элемента подменю
  itemLocationPath: string // конечный путь
}
export interface INavItem {
  icon: JSX.Element,
  text: string, // текст основного элемента меню
  itemLocationPath?: string, // конечный путь
  /* Конфигурация, передаваемая для создания элемента меню, имеющего выпадающее подменю */
  itemWithSubmenuConfig?: {
    parentDirectoryLocation: string, // Начало пути у всех ссылок из подменю для определения активности данного пункта
    submenuItems: ISubmenuItems[] // Массив элементов подменю, имеет структуру ISubmenuItems
  }
}

export interface IBody {
  sortType: string;
  sortField: string | null;
  pageNumber: number;
  pageSize: number;
  filters: null | any;
}

export interface IParamsRoute {
  [key: string]: any | Date[]
}

export interface IGetParamsRoute {
  pageNumberRoute: number,
  pageSizeRoute: number,
  notIncludedRoute: boolean,
  sortFieldRoute: string,
  sortTypeRoute: boolean,
  paramsRoute: any,
  registryIdRoute: number| null
  checkRoute: boolean | null,
  idRoute: number | null,
  location: any
}

export interface IActions {
  text?: string,
  type?: string,
  icon?: JSX.Element,
  onClick?: () => void,
  param?: boolean,
  onChange?: () => void,
  checked?: boolean,
  href?: string
}

export interface IRowActions {
  actions: IActions[],
  searchIcon?: boolean,
  setSearch?: any
}

export interface IInfo {
  label: string,
  value: string,
  width: string
}
export interface IInfoCards {
  info: IInfo[]
}
export interface IInfoCard {
  el: IInfo
}
export interface IModal extends ITableFiltersProps {
  buttons: IButtons[],
  setModal: any,
  chips: any,
  applyChipsFilter: any
}

export  interface IButtons {
  marginRight?: number,
  text?: string,
  kind?: 'primary' | 'secondary',
  size?: 'small' | 'big',
  onClick?: any
}

export interface IGroupButtons {
  buttons: IButtons[],
}

export interface IDirectionPayments {
  [key: string]: boolean
}

export enum Status {
  Created = 'Создан',
  Processing = 'В обработке',
  Processed = 'Обработан',
  PartlyProcessed = 'Частично обработан'
}
