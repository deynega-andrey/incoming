import {getInstance} from './axios';
//import {replaceSpecChar} from '../methods/replace-spec-char';

enum Endpoint {
  GET_BC_LIST = 'settlement/budgetaryCommitments', // GET
};

export const getDocuments = (docsPart:number, pageNumber: number, sortable = '', sortDirection = '') => {
  let parameters = `?pageSize=${docsPart}&pageNumber=${pageNumber}`;
  if (sortable) {
    parameters = `${parameters}&sort=${sortable}&sortDirection=${sortDirection}`
  }
  return getInstance().get(`/${Endpoint.GET_BC_LIST}${parameters}`)
  .then((response) => response.data)
  .catch((err) => {
    throw err;
  });
};