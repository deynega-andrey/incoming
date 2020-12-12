import store from '../stores/registers-store';
import axios from 'axios';
import {refreshJwtToken} from "../services/actions/actions";
const baseURL = process.env.REACT_APP_API;

const onSuccess = (response: any) => {
  store.loadingStatus(response.status);
  return response;
}

const onFail = (error: any) => {

  if (!error.response) {
    return new Promise((resolve, reject) => {
      store.loadingStatus(200);
      reject(error)
    })
  }
  if (error.response.status === 403) {
    if (error.response.data.error === 'access_denied') {
      store.loadingStatus(error.response.data.error);
    } else {
      window.location.replace('/403');
    }
  }
  if (error.response.status === 400) {
    store.loadingStatus(400);
  }
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.replace('/login');
  }
}

/**
 * Фомирование экземпляра аксиоса для ауторизации и обновления токена
 */
export const getAxiosInstance = () => {

  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  instance.interceptors.response.use(
    onSuccess,
    onFail
  )
  return instance
}


/**
 * Фомирование экземпляра аксиоса для методов, не связанных с ауторизацией и обновлением токена
 */

export const getInstance = () => {
  const headers: {[key:string]:string} = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  const instance = axios.create({
    baseURL,
    headers
  })

  instance.interceptors.response.use(
    onSuccess,
    onFail
  )

  /**
   * Проверка токена на свежесть
   * expTime - дата смерти токена в милисекундах;
   */
  instance.interceptors.request.use(
    async config => {
      const refreshToken = localStorage.getItem('refreshToken');
      const expTime = Number(localStorage.getItem('expTime'));

      if (expTime && Date.now() > expTime! && refreshToken) {
        const token = await refreshJwtToken(refreshToken!);
        config.headers = {
          'Authorization': `Bearer ${token}`
        }
      }
      return config;
    },
    error => {
      Promise.reject(error)
    }
  )
  return instance;
}
