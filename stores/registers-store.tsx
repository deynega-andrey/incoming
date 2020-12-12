import {action, decorate, observable} from 'mobx';

class StoreRegisters {
  public data = {
    tableRows: [],
    rowsTotalSize: null,
    accessToken: null,
    status: null,
    refreshToken: null,
    expTime: null,
    registryInfo: null
  };
  public loadingData = (data: any) => {
    this.data.tableRows = data.tableRows;
    this.data.rowsTotalSize = data.rowsTotalSize;
  };
  public loadingToken = (accessToken: any) => {
    this.data.accessToken = accessToken;
  };
  public loadingStatus = (status: any) => {
    this.data.status = status;
  };
  public loadingJWT = (refreshToken: any, expTime: any) => {
    this.data.refreshToken = refreshToken;
    this.data.expTime = expTime;
  }
  public loadingRegistryInfo = (registryInfo: any) => {
    this.data.registryInfo = registryInfo;
  }
}

decorate(StoreRegisters, {
  data: observable,
  loadingData: action,
  loadingToken: action,
  loadingStatus: action,
  loadingJWT: action
});
export default new StoreRegisters();
