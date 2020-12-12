/**
 * Функция генерирует случайный id
 */
export const getID = ():string => ('_' + Math.random().toString(36).substr(2, 9));

/**
 * функция getCorrectFormatDate - для перевода даты в формат "YYYY.MM.DD"
 * @param propsDate
 */
export function getCorrectFormatDate(propsDate: Date | null | any | string): string | null {
  if (propsDate === null) {
    return null;
  } else {
    const date = new Date(propsDate);
    const day = date.getDate() <= 8 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() <= 8 ? '0' + (+date.getMonth() + 1) : +date.getMonth() + 1;
    return day + '.' + month + '.' + date.getFullYear();
  }
}

/**
 * getCorrectDate - формирует дату вида YYYY.MM.DD HH:MM:SS
 * @param propsDate
 */
export function getCorrectDate(propsDate: Date | null | any | string): string | null {
  if (propsDate === null) {
    return null;
  } else {
    const date = new Date(propsDate);
    const month = date.getMonth() <= 8 ? '0' + (+date.getMonth() + 1) : +date.getMonth() + 1;
    const day = date.getDate() <= 8 ? '0' + date.getDate() : date.getDate();
    const hours = date.getHours() <= 8 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() <= 8 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() <= 8 ? '0' + date.getSeconds() : date.getSeconds();
    return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + '-' + minutes + '-' + seconds;
  }
}