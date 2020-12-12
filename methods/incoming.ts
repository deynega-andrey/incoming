import {IParamsRoute} from '../utils/interfaces/interfaces';
import renderCheckbox from "../components/common/render-checkbox/render-checkbox";

/**
 * Функция для перевода данных фильтра recordPeriod, полученных из url в формат new Date(year, month, day);
 */
export const transformedUrlDate = (params: any) => {
  if (params && params.recordPeriod) {
    const recordPeriod = params.recordPeriod.split('-');
    const newRecordPeriod = recordPeriod.map((str: any) => {
      const year = str.split('.')[2];
      const month = +str.split('.')[1] - 1;
      const day = str.split('.')[0];
      return new Date(year, month, day);
    })
    params.recordPeriod = newRecordPeriod;
  }
}

/**
 * Получение данных из url компонета Incoming
 */
export const getParamsRouteIncoming = (location: any) => {

  const params = new URLSearchParams(location.search)
  const pageNumberRoute = +params.get('pageNumber')!;
  const pageSizeRoute = +params.get('pageSize')!;
  const notIncludedRoute = Boolean(params.get('notIncluded'));
  const sortFieldRoute = params.get('sortField')!;
  const sortTypeRoute = params.get('sortType') === 'desc' ? false : true;
  const registryIdRoute = +params.get('registryId')!;
  const checkRoute = Boolean(params.get('check'))!;
  const idRoute = +params.get('id')!;

  const par: IParamsRoute = {
    'fio': params.get('fio'),
    'name': params.get('name'),
    'bik': params.get('bik'),
    'status': params.get('status'),
    'recordPeriod': params.get('recordPeriod')
  }
  /**
   * Формирую объект paramsRoute без нулевых значений
   */
  let paramsRoute: any = {}
  Object.keys(par)
    .filter(el => par[el])
    .forEach(elem => paramsRoute[elem] = par[elem]);
  paramsRoute = Object.keys(paramsRoute).length === 0 ? null : paramsRoute;

  return {
    pageNumberRoute, pageSizeRoute, notIncludedRoute, paramsRoute, sortFieldRoute,
    sortTypeRoute, registryIdRoute, checkRoute, idRoute
  }
}

/**
 * Добавление ячейки с чекбоксом в каждую строку данныx для отрисовки таблицы addCheckboxesInTableIncoming;
 */
export const addCheckboxesInTableIncoming = (dataSource: any, bodyRequest: any, setBodyRequest: any) => {
  dataSource && dataSource!.forEach((el: any) => {
    el.checkbox = renderCheckbox(el.key!, el.registryId!, bodyRequest, setBodyRequest)
  });
}