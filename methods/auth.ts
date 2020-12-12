import {apiAuth} from "../api/api-auth";
import store from "../stores/registers-store";

/**
 * Функция для сохранения токена в sessionStorage:
 */
export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
}

/**
 * Функция для сохранения в локал сторедж
 * @param refresh_token - рефреш токен
 * @param expTime - время жизни токена
 */
export const saveJWT = (refresh_token: string, exp: string) => {
  localStorage.setItem('refreshToken', refresh_token);
  localStorage.setItem('expTime', exp);
}

/**
 * Функция для авторизации
 */
export const runAutorized = (loginValue: string, passwordValue: string) => {
  apiAuth.getTokenData(loginValue, passwordValue)
    .then((res: any) => {
      if (res && res.status === 200) {
        const {access_token, refresh_token, exp_time, roles} = res.data;
        localStorage.setItem('userRoles', JSON.stringify(roles));
        saveToken(access_token!);
        saveJWT(refresh_token, exp_time);
        store.loadingToken(access_token);
        store.loadingJWT(refresh_token, exp_time)
      }
    })
}

/**
 * Функция для проверки полей авторизации;
 */
export const checkAuth =
  (loginValue: string, passwordValue: string, setErrorMessage: (value: string) => void,
   runAutorized: () => void, setErrorState: (error: string | undefined) => void) => {

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
    runAutorized();
  }