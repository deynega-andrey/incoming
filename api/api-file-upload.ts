import axios from 'axios';
import {refreshJwtToken} from "../services/actions/actions";

const baseURL = process.env.REACT_APP_API;
const onFail = (error: any) => {
  if (error.response.status === 403) { 
    window.location.replace('/403');
  }
  if (error.response.status === 400) {
    //localStorage.removeItem('token');
  }
  if (error.response.status === 401) {
    window.location.replace('/login');
  }
  return error;
};

export const apiFileUpload = () => {
  const headers: {[key:string]:string} = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data'
  };
  const api = axios.create({
    baseURL,
    headers,
  });
  api.interceptors.request.use(
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
    onFail
  );
  return api;
};