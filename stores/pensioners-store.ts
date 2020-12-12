import {action, decorate, observable} from 'mobx';
import {SortDirection} from '../methods/by-table/on-sort-click';
import {ViewMode} from '../components/pensioners/pensioners-table-actions';
type anyObj  = {[key:string]:string}
class Store {
  // ФИЛЬТРЫ
  state:anyObj | null = null; // статус
  setState(val:anyObj | null) {
    this.state = val;
  };
  rcpSurname:string | null = null; // фамилия получателя
  setRcpSurname(val:string | null) {
    this.rcpSurname = val;
  };
  rcpName: string | null = null; // Имя получателя
  setRcpName(val:string | null) {
    this.rcpName = val;
  };
  rcpPatr: string | null = null; // Отчество получателя
  setRcpPatr(val:string | null) {
    this.rcpPatr = val;
  };
  cpBirthDate: null | any[] = null; // Дата рождения
  setCpBirthDate(val: null | any[]) {
    this.cpBirthDate = val;
  }
  postAdress: string | null = null; // Адрес прописки
  setPostAdress(val:string | null) {
    this.postAdress = val;
  };
  factAdress: string | null = null; // Адрес фактический
  setFactAdress(val:string | null) {
    this.factAdress = val;
  };
  dul: string | null = null; // ДУЛ
  setDul(val:string | null) {
    this.dul = val;
  };
  assignmentSurname: string | null = null; // Фамилия получателя по поручению
  setAssignmentSurname(val:string | null) {
    this.assignmentSurname = val;
  };
  assignmentName: string | null = null; // Имя получателя по поручению
  setAssignmentName(val:string | null) {
    this.assignmentName = val;
  };
  assignmentPatr: string | null = null; // Отчество получателя по поручению
  setAssignmentPatr(val:string | null) {
    this.assignmentPatr = val;
  };
  pNumber: string | null = null; // № ПД
  setPNumber(val:string | null) {
    this.pNumber = val;
  };
  resSn: string | null = null; // Серия и № разрешения
  setResSn(val:string | null) {
    this.resSn = val;
  };
  approvalDate: null | any[] = null; // Дата разрешения
  setApprovalDate(val: null | any[]) {
    this.approvalDate = val;
  };
  createDate: null | any[] = null; // Дата создания в ИС
  setCreateDate(val: null | any[]) {
    this.createDate = val;
  };
  docNumderDep: string | null = null; // № документа в ведомстве
  setDocNumderDep(val:string | null) {
    this.docNumderDep = val;
  };
  // createDate: null | any[] = null; // Дата создания документа ведомством
  // setCreateDate(val: null | any[]) {
  //   this.createDate = val;
  // };
  bankName:  string | null = null; // Банк получатель
  setBankName(val:string | null) {
    this.bankName = val;
  };
  bik:  string | null = null; // БИК банка
  setBik(val:string | null) {
    this.bik = val;
  };
  dep:  string | null = null; // Код территориального банка
  setDep(val:string | null) {
    this.dep = val;
  };
  account:  string | null = null; // Счет получателя
  setAccount(val:string | null) {
    this.account = val;
  };
  amount:  string | null = null; // Сумма выплаты, от
  setAmount(val:string | null) {
    this.amount = val;
  };
  // amount:  string | null = null; // Сумма выплаты, до ///
  // setAmount(val:string | null) { ////////////////////////
  //   this.amount = val; //////////////////////////////////
  // };
  monthPerRet:  string | null = null; // Процент удержания
  setMonthPerRet(val:string | null) {
    this.monthPerRet = val;
  };
  monthAmountRet:  string | null = null; // Сумма удержания
  setMonthAmountRet(val:string | null) {
    this.monthAmountRet = val;
  };
  startDate: null | any[] = null; // Дата начала выплаты/удержания
  setStartDate(val: null | any[]) {
    this.startDate = val;
  };
  endDate: null | any[] = null; // Дата окончания выплаты/удержания
  setEndDate(val: null | any[]) {
    this.endDate = val;
  };
  paymentType:anyObj | null = null; // Вид выплаты
  setPaymentType(val:anyObj | null) {
    this.paymentType = val;
  };
  paymentPeriod:anyObj | null = null; // Периодичность выплаты
  setPaymentPeriod(val:anyObj | null) {
    this.paymentPeriod = val;
  };
  kbk:  string | null = null; // КБК
  setKbk(val:string | null) {
    this.kbk = val;
  };
  paymentTypeCode:  string | null = null; // Код выплаты
  setPaymentTypeCode(val:string | null) {
    this.paymentTypeCode = val;
  };
  categoryCode:  string | null = null; // Код категории
  setCategoryCode(val:string | null) {
    this.categoryCode = val;
  };
  kvd:  string | null = null; // КВД
  setKvd(val:string | null) {
    this.kvd = val;
  };
  //

  docs:[] | { [key: string]: string | boolean| number }[] = [];
  tablePage:number = 1;
  itemsPerPage:number = 20;
  totalDocsAmount:number = 0;
  totalPagesAmount:number = 1;
  isAllDocsChecked: boolean = true;
  isActivePaymentsDocsChecked: boolean = false;
  isStoppedPaymentsDocsChecked: boolean = false;
  isErrorDocsChecked: boolean = false;
  isDraftDocsChecked: boolean = false;
  isClosedDocsChecked: boolean = false;
  sortedProperty: string = '';
  sortDirection: SortDirection = SortDirection.DESC;
  globalSearch: string = '';
  isLoaded: boolean = false;
  actionsPanelState: ViewMode = ViewMode.SHOW_ACTION_BTNS;
  isFilterShow:boolean = false;
  // { [key: string]: string | boolean| number }[]
  updateDocs(documents: any):void {
    this.docs = documents;
  }
  setTablePage(pageNumber:number):void {
    this.tablePage = pageNumber;
  }
  setItemsPerPagePart(part:number):void {
    this.itemsPerPage = part;
  }
  setDocsAmount(amount:number):void {
    this.totalDocsAmount = amount;
  }
  setPagesAmount(amount:number):void {
    this.totalPagesAmount = amount;
  }
  toggleAllDocsCheckedState():void {
    this.tablePage = 1;
    this.isAllDocsChecked = !this.isAllDocsChecked;
  }
  toggleActiviePaymentsDocsCheckedState():void {
    this.tablePage = 1;
    this.isActivePaymentsDocsChecked = !this.isActivePaymentsDocsChecked;
  }
  toggleStoppedPaymentsDocsCheckedState():void {
    this.tablePage = 1;
    this.isStoppedPaymentsDocsChecked = !this.isStoppedPaymentsDocsChecked;
  }
  toggleErrorDocsCheckedState():void {
    this.tablePage = 1;
    this.isErrorDocsChecked = !this.isErrorDocsChecked;
  }
  toggleDraftDocsCheckedState():void {
    this.tablePage = 1;
    this.isDraftDocsChecked = !this.isDraftDocsChecked;
  }
  toggleClosedDocsCheckedState():void {
    this.tablePage = 1;
    this.isClosedDocsChecked = !this.isClosedDocsChecked;
  }
  setSortedProperty(property: string):void {
    this.sortedProperty = property;
  }
  setSortDirection(direction: SortDirection):void {
    this.sortDirection = direction;
  }
  setGlobalSearchValue(val: string):void {
    this.tablePage = 1;
    this.globalSearch = val;
  }
  setLoadState(state: boolean):void {
    this.isLoaded = state;
  }
  setActionsPanelState(state:ViewMode) {
    this.actionsPanelState = state;
  }
  setFiltersShowState(state:boolean) {
    this.isFilterShow = state;
  }
}

decorate(Store, {
  // ФИЛЬТРЫ
  state: observable, // статус
  setState: action,
  rcpSurname: observable, // фамилия получателя
  setRcpSurname: action,
  rcpName: observable, // Имя получателя
  setRcpName: action,
  rcpPatr: observable, // Отчество получателя
  setRcpPatr: action,
  cpBirthDate: observable, // Дата рождения
  setCpBirthDate: action,
  postAdress: observable, // Адрес прописки
  setPostAdress: action,
  factAdress: observable, // Адрес фактический
  setFactAdress: action,
  dul: observable, // ДУЛ
  setDul: action,
  assignmentSurname: observable, // Фамилия получателя по поручению
  setAssignmentSurname: action,
  assignmentName: observable, // Имя получателя по поручению
  setAssignmentName: action,
  assignmentPatr: observable, // Отчество получателя по поручению
  setAssignmentPatr: action,
  pNumber: observable, // № ПД
  setPNumber: action,
  resSn: observable, // Серия и № разрешения
  setResSn: action,
  approvalDate: observable, // Дата разрешения
  setApprovalDate: action,
  createDate: observable, // Дата создания в ИС
  setCreateDate: action,
  docNumderDep: observable, // № документа в ведомстве
  setDocNumderDep: action,
  // createDate: observable, // Дата создания документа ведомством
  // setCreateDate: action,
  bankName: observable, // Банк получатель
  setBankName: action,
  bik: observable, // БИК банка
  setBik: action,
  dep: observable, // Код территориального банка
  setDep: action,
  account: observable, // Счет получателя
  setAccount: action,
  amount: observable, // Сумма выплаты, от
  setAmount: action,
  // amount: observable, // Сумма выплаты, до ///
  // setAmount: action,
  monthPerRet: observable, // Процент удержания
  setMonthPerRet: action,
  monthAmountRet: observable, // Сумма удержания
  setMonthAmountRet: action,
  startDate: observable, // Дата начала выплаты/удержания
  setStartDate: action,
  endDate: observable, // Дата окончания выплаты/удержания
  setEndDate: action,
  paymentType: observable,// Вид выплаты
  setPaymentType: action,
  paymentPeriod: observable, // Периодичность выплаты
  setPaymentPeriod: action,
  kbk: observable, // КБК
  setKbk: action,
  paymentTypeCode: observable, // Код выплаты
  setPaymentTypeCode: action,
  categoryCode: observable, // Код категории
  setCategoryCode: action,
  kvd: observable, // КВД
  setKvd: action,
  //
  docs: observable,
  tablePage: observable,
  itemsPerPage: observable,
  totalDocsAmount: observable,
  totalPagesAmount: observable,
  isAllDocsChecked: observable,
  isActivePaymentsDocsChecked: observable,
  isStoppedPaymentsDocsChecked: observable,
  isErrorDocsChecked: observable,
  isDraftDocsChecked: observable,
  isClosedDocsChecked: observable,
  sortedProperty: observable,
  sortDirection: observable,
  isLoaded: observable,
  globalSearch: observable,
  actionsPanelState: observable,
  isFilterShow: observable,
  updateDocs: action,
  setTablePage: action,
  setItemsPerPagePart: action,
  setDocsAmount: action,
  setPagesAmount: action,
  toggleAllDocsCheckedState: action,
  toggleActiviePaymentsDocsCheckedState: action,
  toggleStoppedPaymentsDocsCheckedState: action,
  toggleErrorDocsCheckedState: action,
  toggleDraftDocsCheckedState: action,
  toggleClosedDocsCheckedState: action,
  setSortedProperty: action,
  setSortDirection: action,
  setGlobalSearchValue: action,
  setLoadState: action,
  setActionsPanelState: action,
  setFiltersShowState: action
});

export default new Store();
