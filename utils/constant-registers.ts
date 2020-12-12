export interface IItemData {
  name?: string;
  loadDate?: string;
  processDate?: string;
  sum?: number;
  paymentAmount?: number;
  status?: string;
  clientAccount?: number;
  incomeStatus?: string;
  bik?: number;
  paymentCode?: number;
  paymentCategoryCode?: number;
  kbk?: number;
  key?: number;
  fio?: string;
}

export enum IncomingDataKeys {
  NAME = 'name', // Имя регистра
  LOAD_DATE = 'loadDate', // Дата загрузки
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
}
