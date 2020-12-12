import {useState} from "react";
import {runAutorized} from "./auth";
import store from "../stores/registers-store";

export const useLogin = () => {
  const [errorState, setErrorState]: any = useState(undefined);
  const [isLoadingState, setLoadState] = useState(false);
  const [errorMessage, setErrorMessage]: any = useState(undefined);
  const [autorization, setAutorization] = useState({
    loginValue: '',
    passwordValue: ''
  });

  const {loginValue, passwordValue} = autorization;

  const checkAuth = () => {

      const setErrorStateMessage = (text: string) => {
        setErrorState('error');
        setErrorMessage(text);
      }
      /**
       * Проверка  на заполненность полей логина и пароля
       */
      if (loginValue === '' && passwordValue !== '') {
        setErrorStateMessage('Введите логин');
        return;
      }
      if (passwordValue === '' && loginValue !== '') {
        setErrorStateMessage('Введите пароль');
        return;
      }
      if (loginValue === '' && passwordValue === '') {
        setErrorStateMessage('Введите логин и пароль');
        return;
      }
      /**
       * Проверка на ввод кирилицы
       */
      if (/[а-я]/i.test(loginValue) || /[а-я]/i.test(passwordValue)) {
        setErrorStateMessage('Неверный логин или пароль');
        return;
      }
      runAutorized(loginValue, passwordValue);
    }

  /**
   * Проверка на ошибку 400
   */
  const checkStatus = (status: any) => {
    if (status === 400) {
      setErrorMessage('Неверный логин или пароль');
      setErrorState('error');
      store.loadingStatus(null)
    };
    if (status === 'access_denied') {
      setErrorMessage('Нет прав на доступ в систему');
      setErrorState('error');
      store.loadingStatus(null)
    };
    if (status) {
      setLoadState(false)
    }
  }

  return {errorState, setErrorState, isLoadingState, setLoadState, errorMessage, setErrorMessage, autorization,
    setAutorization, checkAuth, checkStatus}
}