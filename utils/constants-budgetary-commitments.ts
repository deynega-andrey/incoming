import {tableCssCls} from '../utils/table-constants';
export interface ICellConfig {
  key:string,
  columnHeading:string
};
export const BudgetaryCommitmentsKey = {
  BO_STATE: {
    key: 'state', // составное
    columnHeading: 'Статус'
  },
  PAYMENT_AMOUNT: {
    key: 'paymentAmount', // fl
    columnHeading: 'Сумма к выплате (руб)',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  PAYMENT_DIRECTION_CODE: {
    key: 'paymentDirectionCode', // n
    columnHeading: 'Направление выплаты',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  KIND_BO: {
    key: 'kindBo', // составное
    columnHeading: 'Вид обязательства'
  },
  TYPE_BO: {
    key: 'typeBo', // s
    columnHeading: 'Тип обязательства'
  },
  RECEPIENT: {
    key: 'recipient', // s
    columnHeading: 'Получатель'
  },
  REQUISITES: {
    key: 'requisites', // s
    columnHeading: 'Реквизиты получателя'
  },
  RECORD_PERIOD: {
    key: 'recordPeriod', // date
    columnHeading: 'Отчетный период'
  },
  PAYMENT_DATE: {
    key: 'paymentDate', // date
    columnHeading: 'Дата расчета платежа'
  },
  DATE_CREATE: {
    key: 'dateCreate', // datetime
    columnHeading: 'Дата создания БО'
  },
  PAY_DATE: {
    key: 'paymentDate', // date
    columnHeading: 'Дата перечисления БО'
  },
  BO_ID: {
    key: 'boId', // n
    columnHeading: 'ID БО',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  RID: {
    key: 'rid', // uuid
    columnHeading: 'Код начисления на выплату',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  CODE_GRBS: {
    key: 'codeGRBS', // n
    columnHeading: 'Код ГРБС',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  POST_KIND: {
    key: 'postKind', // n
    columnHeading: 'Вид почтового перевода',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  AMOUNT: {
    key: 'amount', // fl
    columnHeading: 'Сумма выплаты',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  INN: {
    key: 'inn', // n
    columnHeading: 'ИНН',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  KPP: {
    key: 'kpp', // n
    columnHeading: 'КПП',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  CORP_NAME: {
    key: 'corpName', // s
    columnHeading: 'Наименование организации'
  },
  CATEGORY_CODE: {
    key: 'categoryCode', // s
    columnHeading: 'Код категории целевой статьи'
  },
  PAYMENT_TYPE_CODE: {
    key: 'paymentTypeCode', // s
    columnHeading: 'Код вида выплат'
  },
  KBK: {
    key: 'kbk', // s
    columnHeading: 'КБК'
  },
  DOC_DATE_DEP: {
    key: 'docDateDep', // date
    columnHeading: 'Дата формирования документа ведомством'
  },
  DOC_NUMBER_DEP: {
    key: 'docNumberDep', // s
    columnHeading: 'Номер документа в ведомстве'
  },
  KVD: {
    key: 'kvd', // n
    columnHeading: 'Код вида дохода',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  CHECKOFF_AMOUNT: {
    key: 'checkoffAmount', // fl
    columnHeading: 'Сумма удержания',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  P_NUMBER: {
    key: 'pnumber', // s
    columnHeading: 'Номер пенсионного дела с префиксом'
  },
  START_DATE: {
    key: 'startDate', //  date
    columnHeading: 'Дата начала выплаты/удержания'
  },
  END_DATE: {
    key: 'endDate', // date
    columnHeading: 'Дата окончания выплаты'
  },
  MANUAL: {
    key: 'manual', // n
    columnHeading: 'Признак ручного создания БО',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  INCOMING_BO_ID: {
    key: 'incomingBoId', // n
    columnHeading: 'ID БО входящих платежей',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  OUTGOING_BO_ID: {
    key: 'outgoingBoId', // n
    columnHeading: 'ID БО тариф Почты России',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  ID_EDO_RECORD: {
    key: 'idEdoRecord', // n
    columnHeading: 'Уникальный идентификатор записи сущности Список пенсионеров РЦ',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  ID_REWARD: {
    key: 'idReward', // n
    columnHeading: 'Уникальный номер БО вознаграждения ВТБ',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  UNFORESEEN_PAYMENT: {
    key: 'unforeseenPayment', // n
    columnHeading: 'Признак непредвиденной выплаты',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  }
};

export const mockData = [
  {
    state: 'Тестировочный',
    paymentAmount: 4578.4,
    paymentDirectionCode: 460,
    kindBO: 'Вознаграждение',
    typeBO: 'Выплата',
    recepient: 'Подпорин Владислав Ильич',
    requisites: 'ул. Пушкина, д. Колотушкина',
    recordPeriod: '15.07.2020',
    paymentDate: '23.07.2020',
    dateCreate: '20.07.2020 16:49',
    payDate: '23.07.2020',
    BOID: 700,
    rid: 'fghg45',
    codeGRBS: 45,
    postKind: 691,
    amount: 20538.23,
    INN: 346234753,
    KPP: 679444264,
    corpName: 'ВСП',
    categoryCode: 'CGH 65 5432',
    paymentTypeCode: 'G 543',
    KBK: '435',
    docDateDep: '13.07.2020',
    docNumberDep: 's 563 45',
    KVD: 822,
    checkoffAmount: 0,
    pNumber: 'h 24325 456',
    startDate: '26.07.2020',
    endDate: '26.07.2023',
    manual: 400,
    incomingBOId: 3434,
    outgoingBOId: 167,
    IDEdoRecord: 345,
    IDReward: 5,
    unforeseenPayment: 1
  }

// RID: {
//   key: 'rId', // uuid
//   columnHeading: 'ID изменения пенсионного дела'
// },
]
