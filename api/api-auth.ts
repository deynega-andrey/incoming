import {getAxiosInstance} from "./axios";

export const apiAuth = {
  /**
   * Функция для получения токена
   */
  getTokenData (login: string, password: string) {
    return getAxiosInstance().get(`/auth`,
      {headers: {'Authorization':
            'Basic ' + btoa(login + ':' + password)}
      })
  },
  /**
   * Функция для рефрешинга токена
   */
  refreshTokenData (refreshToken: string) {
    return getAxiosInstance().get(`/auth?refreshToken=${refreshToken}`)
  }
};

