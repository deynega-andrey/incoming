import {action, decorate, observable} from 'mobx';
import {SortDirection} from '../methods/by-table/on-sort-click';
// import {mockData} from '../utils/constants-budgetary-commitments';

class Store {
  public docs:[] | { [key: string]: string | boolean| number }[] = [];
  public tablePage:number = 1;
  public itemsPerPage:number = 20;
  public totalDocsAmount:number = 0;
  public totalPagesAmount:number = 1;
  public sortedProperty: string = '';
  public sortDirection: string = SortDirection.DESC;
  public isLoaded: boolean = false;
  public updateDocs(documents: any):void {
    this.docs = documents;
  }
  public setTablePage(pageNumber:number):void {
    this.tablePage = pageNumber;
  }
  public setItemsPerPagePart(part:number):void {
    this.itemsPerPage = part;
  }
  public setDocsAmount(amount:number):void {
    this.totalDocsAmount = amount;
  }
  public setPagesAmount(amount:number):void {
    this.totalPagesAmount = amount;
  }
  public setSortedProperty(property: string):void {
    this.sortedProperty = property;
  }
  public setSortDirection(direction: SortDirection):void {
    this.sortDirection = direction;
  }
  public setLoadState(state: boolean):void {
    this.isLoaded = state;
  }
}

decorate(Store, {
  docs: observable,
  tablePage: observable,
  itemsPerPage: observable,
  totalDocsAmount: observable,
  totalPagesAmount: observable,
  isLoaded: observable,
  updateDocs: action,
  setTablePage: action,
  setItemsPerPagePart: action,
  setDocsAmount: action,
  setPagesAmount: action,
  setLoadState: action
});

export default new Store();