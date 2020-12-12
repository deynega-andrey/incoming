import {getInstance} from './axios';
import {apiFileUpload} from './api-file-upload';
import {replaceSpecChar} from '../methods/replace-spec-char';

enum Endpoint {
  GET_PENSIONERS_LIST = 'settlement/edorecord', // GET
  STOP_PAYMENTS = 'settlement/edorecord/payment/stop', // PUT => POST rID: []
  START_PAYMENTS = 'settlement/edorecord/payment/start', // PUT => POST rID: []
  SEND_FILES = 'settlement/edorecord/import', // POST Массив объектов с name, type, size
  CASH_REQUEST = 'settlement/edorecord/bocreate' // POST
};

export const getDocuments = (docsPart:number, pageNumber: number, sortable = '', sortDirection = '', globalSearch = '', statesFilterParams = null) => { 
  let parameters = `?pageSize=${docsPart}&pageNumber=${pageNumber}`;
  if (sortable) {
    parameters = `${parameters}&sort=${sortable}&sortDirection=${sortDirection}`
  }
  if (globalSearch) {
    parameters = `${parameters}&globalSearch=${replaceSpecChar(globalSearch)}`;
  }
  if (statesFilterParams) {
    parameters = `${parameters}&states=${statesFilterParams}`; 
  }
  return getInstance().get(`/${Endpoint.GET_PENSIONERS_LIST}${parameters}`)
  .then((response) => response.data)
  .catch((err) => {
    throw err;
  });
};
export const startPayments = (idList: string[]) => {
  return getInstance().post(`/${Endpoint.START_PAYMENTS}`, idList)
  .then(() => null)
  .catch((err) => {
    throw err;
  });
};
export const stopPayments = (idList: string[]) => {
  return getInstance().post(`/${Endpoint.STOP_PAYMENTS}`, idList)
  .then(() => null)
  .catch((err) => {
    throw err;
  });
};
export const sendFiles = (filesData: any, config: {[key:string]: any}) => {
  return apiFileUpload().post(`/${Endpoint.SEND_FILES}`, filesData, config)
  .then(() => null)
  // .catch((err) => {
  //   throw err;
  // });
};
export const sendCashRequest = () => {
  return getInstance().post(`/${Endpoint.CASH_REQUEST}`)
  .then(() => null)
  .catch((err) => {
    throw err;
  });
};