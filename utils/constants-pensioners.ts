import {tableCssCls} from '../utils/table-constants';
import {FilterType} from '../components/common/filters-section/filters-section';

export const PensionerDataKey = {
  PAYMENT_STATE: {
    key: 'paymentState',
  },
  FULL_NAME: {
    key: 'fullName',
    columnHeading: 'ФИО получателя',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.CELL_FIX_TO_LEFT}`
  },
  DOC_STATE: {
    key: 'state'
  },
  BIRTH_DATE: {
    key: 'birthDate',
    columnHeading: 'Дата рождения'
  },
  PENSION_FILE_NUMBER: {
    key: 'paymentDocumentNumber',
    columnHeading: 'Номер ПД'
  },
  RESOLUTION_SERIES_AND_NUMBER: {
    key: 'approvalSeriesAndNumber',
    columnHeading: 'Серия и № Разрешения' 
  },
  RESOLUTION_DATE: {
    key: 'approvalDate',
    columnHeading: 'Дата Разрешения' 
  },
  /* */
  CREATE_DATE: {
    key: 'createDate',
    columnHeading: 'Дата создания'
  },
  /* */
  PAYMENT_TYPE: {
    key: 'paymentType',
    columnHeading: 'Вид выплаты' 
  },
  PAYMENT_SUM: {
    key: 'sum',
    columnHeading: 'Сумма выплаты',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  PAYMENT_PERIODICY: {
    key: 'paymentPeriod',
    columnHeading: 'Периодичность выплат' 
  },
  PAYMENT_START_DATE: {
    key: 'paymentStartDate',
    columnHeading: 'Выплата с'
  },
  PAYMENT_END_DATE: {
    key: 'paymentEndDate',
    columnHeading: 'Выплата по'
  },
  RECIPIENT_ACCOUNT: {
    key: 'recipientAccount',
    columnHeading: 'Счет получателя'
  },
  RECIPIENT_BANK: {
    key: 'bankName',
    columnHeading: 'Банк получатель' 
  },
  BANK_BIK: {
    key: 'bik',
    columnHeading: 'БИК Банка получателя',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  /* */
  DEP:{
    key: 'dep',
    columnHeading: 'Код территориального банка',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  /* */
  KBK: {
    key: 'kbk',
    columnHeading: 'КБК',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  KVD: {
    key: 'kvd',
    columnHeading: 'КВД',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  RETENTION_PROCENTAGE: {
    key: 'monthlyRetentionPercent',
    columnHeading: 'Процент удержания',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  RETENTION_SUM: {
    key: 'monthlyRetentionSum',
    columnHeading: 'Сумма удержания',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  PAYMENT_CODE: {
    key: 'paymentTypeCode',
    columnHeading: 'Код выплаты',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  CATEGORY_CODE: {
    key: 'categoryCode',
    columnHeading: 'Код категории',
    CSS_CLS: `${tableCssCls.COLUMN} ${tableCssCls.NUMBER_TYPE_CELL}`
  },
  DUL: {
    key: 'dul',
    columnHeading: 'ДУЛ' 
  },
  REGISTRATION_ADDRESS: {
    key: 'postalAddress',
    columnHeading: 'Адрес прописки' 
  },
  RESIDENCE_ADDRESS: {
    key: 'factAddress',
    columnHeading: 'Адрес фактический',
  },
  /* */
  FIO_ASSIGNMENT: {
    key: 'fioAssignment',
    columnHeading: 'ФИО получателя по поручению'
  },
  /* */
  /* */
  DOC_NUMBER_DEP: {
    key: 'docNumderDep', // ОПЕЧАТКА!
    columnHeading: 'Номер документа в ведомстве'
  },
  /* */
  // /* */
  // DOC_DATE_DEP: {
  //   key: 'docDateDep',
  //   columnHeading: 'Дата формирования документа ведомством',
  //   CSS_CLS: ''
  // }
  // /* */
};


/*
interface IFiltersGroupConfig {
  sectionHeading?: string,
  filters: IFilterItemConfig[]
};

interface IFilterItemConfig {
  property: string,
  type: FilterType,
  label: string,
  options?:{
    label: string;
    value: string | number;
  }[], // варианты для мультиселекта
  action(val:any):void
};
*/

export const PensionersFiltersConfigiurations = [
  {
    filters: [
      {
        property: 'state',
        type: FilterType.MULTISELECT,
        label: 'Статус',
        options: [
          {
            label: 'тестовый пункт 1',
            value: 0
          },
          {
            label: 'тестовый пункт 2',
            value: 1
          },
          {
            label: 'тестовый пункт 3',
            value: 3
          },
          {
            label: 'тестовый пункт 4',
            value: 4
          }
        ],
        action: 'setState'
      }
    ]
  },
  { 
    sectionHeading: 'Сведения о пенсионере',
    filters: [
      {
        property: 'rcpSurname',
        type: FilterType.TXT_INPUT,
        label: 'Фамилия получателя',
        action: 'setRcpSurname'
      },
      {
        property: 'rcpName',
        type: FilterType.TXT_INPUT,
        label: 'Имя получателя',
        action: 'setRcpName'
      },
      {
        property: 'rcpPatr',
        type: FilterType.TXT_INPUT,
        label: 'Отчество получателя',
        action: 'setRcpPatr'
      },
      {
        property: 'cpBirthDate',
        type: FilterType.DATE_PICKER,
        label: 'Дата рождения',
        action: 'setCpBirthDate'
      },
      {
        property: 'postAdress',
        type: FilterType.TXT_INPUT,
        label: 'Адрес прописки',
        action: 'setPostAdress'
      },
      {
        property: 'factAdress',
        type: FilterType.TXT_INPUT,
        label: 'Адрес фактический',
        action: 'setFactAdress'
      },
      {
        property: 'dul',
        type: FilterType.TXT_INPUT,
        label: 'ДУЛ',
        action: 'setDul'
      }
    ]
  },
  { 
    sectionHeading: 'Сведения о получателе по поручению',
    filters: [
      {
        property: 'assignmentSurname',
        type: FilterType.TXT_INPUT,
        label: 'Фамилия получателя по поручению',
        action: 'setAssignmentSurname'
      },
      {
        property: 'assignmentName',
        type: FilterType.TXT_INPUT,
        label: 'Имя получателя по поручению',
        action: 'setAssignmentName'
      },
      {
        property: 'assignmentPatr',
        type: FilterType.TXT_INPUT,
        label: 'Отчество получателя по поручению',
        action: 'setAssignmentPatr'
      }
    ]
  },
  { 
    sectionHeading: 'Разрешающие документы',
    filters: [
      {
        property: 'pNumber',
        type: FilterType.TXT_INPUT,
        label: '№ ПД',
        action: 'setPNumber'
      },
      {
        property: 'resSn',
        type: FilterType.TXT_INPUT,
        label: 'Серия и № разрешения',
        action: 'setResSn'
      },
      {
        property: 'approvalDate',
        type: FilterType.DATE_PICKER,
        label: 'Дата разрешения',
        action: 'setApprovalDate'
      },
      {
        property: 'createDate',
        type: FilterType.DATE_PICKER,
        label: 'Дата создания в ИС',
        action: 'setCreateDate'
      },
      {
        property: 'docNumderDep',
        type: FilterType.TXT_INPUT,
        label: '№ документа в ведомстве',
        action: 'setDocNumderDep'
      },
      {
        property: 'docDateDep',
        type: FilterType.DATE_PICKER,
        label: 'Дата создания документа ведомством',
        action: 'setCreateDate'
      }
    ]
  },
  { 
    sectionHeading: 'Реквизиты получателя',
    filters: [
      {
        property: 'bankName',
        type: FilterType.TXT_INPUT,
        label: 'Банк получатель',
        action: 'setBankName'
      },
      {
        property: 'bik',
        type: FilterType.TXT_INPUT,
        label: 'БИК банка',
        action: 'setBik'
      },
      {
        property: 'dep',
        type: FilterType.TXT_INPUT,
        label: 'Код территориального банка',
        action: 'setDep'
      },
      {
        property: 'account',
        type: FilterType.TXT_INPUT,
        label: 'Счет получателя',
        action: 'setAccount'
      }
    ]
  },
  { 
    sectionHeading: 'Сведения о выплатах',
    filters: [
      {
        property: 'amountMin',
        type: FilterType.TXT_INPUT,
        label: 'Сумма выплаты, от',
        action: 'setAmount'
      },
      {
        property: 'amountMax',
        type: FilterType.TXT_INPUT,
        label: 'Сумма выплаты, до',
        action: 'setAmount'
      },
      {
        property: 'monthPerRet',
        type: FilterType.TXT_INPUT,
        label: 'Процент удержания',
        action: 'setMonthPerRet'
      },
      {
        property: 'monthAmountRet',
        type: FilterType.TXT_INPUT,
        label: 'Сумма удержания',
        action: 'setMonthAmountRet'
      },
      {
        property: 'startDate',
        type: FilterType.DATE_PICKER,
        label: 'Дата начала выплаты/удержания',
        action: 'setStartDate'
      },
      {
        property: 'endDate',
        type: FilterType.DATE_PICKER,
        label: 'Дата окончания выплаты/удержания',
        action: 'setEndDate'
      },
      {
        property: 'paymentType',
        type: FilterType.MULTISELECT,
        label: 'Вид выплаты',
        options: [
          {
            label: 'тестовый пункт 1',
            value: 0
          },
          {
            label: 'тестовый пункт 2',
            value: 1
          }
        ],
        action: 'setPaymentType'
      },
      {
        property: 'paymentPeriod',
        type: FilterType.MULTISELECT,
        label: 'Периодичность выплаты',
        options: [
          {
            label: 'тестовый пункт 1',
            value: 0
          },
          {
            label: 'тестовый пункт 2',
            value: 1
          }
        ],
        action: 'setPaymentPeriod'
      },
      {
        property: 'kbk',
        type: FilterType.TXT_INPUT,
        label: 'КБК',
        action: 'setKbk'
      },
      {
        property: 'paymentTypeCode',
        type: FilterType.TXT_INPUT,
        label: 'Код выплаты',
        action: 'setPaymentTypeCode'
      },
      {
        property: 'categoryCode',
        type: FilterType.TXT_INPUT,
        label: 'Код категории',
        action: 'setCategoryCode'
      },
      {
        property: 'kvd',
        type: FilterType.TXT_INPUT,
        label: 'КВД',
        action: 'setKvd'
      }
    ]
  }
];
