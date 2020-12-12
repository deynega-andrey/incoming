import {IParamsRoute, ITableFilterValues, Status} from '../utils/interfaces/interfaces';
import {getCorrectFormatDate} from '../utils/common';
import {transformedUrlDate} from './incoming';
import renderCheckbox from '../components/common/render-checkbox/render-checkbox';

/**
 * Функция returnFilters - переводит объект в массив для отправки на бек, меняет формат даты на "YYYY.MM.DD" и
 * удаляет фильтры с нулевыми значениями
 * @param params - Параметры с фильтров в виде объекта
 */
// @ts-ignore
export const returnFilters = (params: ITableFilterValues | null) => {
  if (params) {
    const array: any = []
    for (const el in params) {
      if (el === 'recordPeriod' && params[el][0] === null || el === 'recordPeriod' && params[el][1] === null) {
        array.map((el: any) => el);
      } else if (el === 'recordPeriod') {
        array.push({name: el, value: [getCorrectFormatDate(params[el][0]), getCorrectFormatDate(params[el][1])]});
      } else if (params[el] === null || params[el] === '') {
        array.map((el: any) => el);
      }
      else {
        array.push({name: el, value: params[el]})
      }
    }
    return array
  }
  return null;
};

/**
 * Формирование чипсов
 */

export const formedChips = (params: null | ITableFilterValues | undefined, setChips: any) => {
  const chips: { id: number, label: string }[] = [];
  if (params === null) {
    setChips([]);
    return;
  }

  Object.keys(params!).forEach((el: string, index: number ) => {

    if ((el === 'recordPeriod' && (params![el] !== null) && params![el][0] === null) || (el === 'recordPeriod' && params![el][1] === null)) {
      return;
    }
    // @ts-ignore
    else if (!params[el]) {
      return;
    }
    else if (el === 'recordPeriod') {
      // @ts-ignore
      const chip =  {id: index, label: `${getCorrectFormatDate(params![el][0])}-${getCorrectFormatDate(params![el][1])}`,
        name: el
      };
      chips.push(chip);
    }
    else if (el === 'status' || el === 'incomeStatus') {
      // @ts-ignore
      const chip = {id: index, label: Status[params![el]], name: el}
      chips.push(chip);
    }
    else if (el === 'paymentCourse') {
      // @ts-ignore
      params![el].forEach((elem, index) => {
        const chip = {id: index + 100, label: elem, name: el};
        chips.push(chip);
      })
    }
    else {
      // @ts-ignore
      const chip = {id: index, label: params![el], name: el}
      chips.push(chip);
    }
  })
  setChips(chips);
}

/**
 * Функция для формирования url;
 */

export const routeChangeUrl = (
  params: any | null,
  itemsPerPage: number | null,
  bodyRequest: any,
  location: any,
  history: any

) => {
  const {pageNumber, sortField, sortType, check, registryId, id} = bodyRequest;
  let str = '';
  const filters = returnFilters(params!);
  if (filters) filters.forEach((el: any) => {
    if (el.name === 'recordPeriod')  {
      str+= `&${el.name}=${el.value[0]}-${el.value[1]}`
    }
    else if (el.name === 'paymentCourse')  {
      let paymentCourse = '';
      el.value.forEach((elem: string, index: number) => paymentCourse += index === 0 ? `${elem}` : `-${elem}`);
      str+= `&${el.name}=${paymentCourse}`;
    }
    else {
      str+= `&${el.name}=${el.value}`
    }
  })
  const page = `pageNumber=${pageNumber}`;
  const pageSize = `pageSize=${itemsPerPage}`;
  const sort = sortField ? (sortType ? `&sortField=${sortField}&sortType=asc`
    : `&sortField=${sortField}&sortType=desc`) : '';
  const registryName = check ? `&registryId=${registryId}&check=${check}&id=${id}` : '';
  let path = `${location.pathname}?${page}&${pageSize}${str}${sort}${registryName}`;
  history.push(path);
}

/**
 * Получение данных из url
 */
export const getParamsRoute = (location: any) =>{

  const params = new URLSearchParams(location.search)

  const pageNumberRoute = +params.get('pageNumber')!;
  const pageSizeRoute = +params.get('pageSize')!;
  const sortFieldRoute = params.get('sortField')!;
  const sortTypeRoute = params.get('sortType') === 'desc' ? false : true;
  const registryIdRoute = +params.get('registryId')!;
  const checkRoute = Boolean(params.get('check'))!;
  const idRoute = +params.get('id')!;

  const paymentCourse = params.get('paymentCourse') ?
    params.get('paymentCourse')!.split('-') : null;

  const par: IParamsRoute = {
    'fio' : params.get('fio'),
    'name' : params.get('name'),
    'bik' : params.get('bik'),
    'status': params.get('status'),
    'incomeStatus': params.get('incomeStatus'),
    'recordPeriod': params.get('recordPeriod'),
    'paymentCourse': paymentCourse
  }
  transformedUrlDate(par)
  /**
   * Формирую объект paramsRoute без нулевых значений
   */
  let paramsRoute: any  = {}
  for (const key in par) {
    if (par[key]) paramsRoute[key] = par[key]
  }
  return {pageNumberRoute, pageSizeRoute, paramsRoute, sortFieldRoute,
    sortTypeRoute, registryIdRoute, checkRoute, idRoute}
}

/**
 * Добавление ячейки с чекбоксом в каждую строку данныx для отрисовки таблицы ;
 */

export const addCheckboxesInTable = (dataSource: any, bodyRequest: any, setBodyRequest: any) => {
  dataSource && dataSource!.forEach((el: any) => {
    el.checkbox = renderCheckbox(el.key!, el.id!, bodyRequest, setBodyRequest)
  });
}