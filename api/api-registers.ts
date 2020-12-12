import axios from 'axios';
import {getCorrectDate} from '../utils/common';
import {IBody} from '../utils/interfaces/interfaces';
import {getInstance} from './axios';

const api: string | undefined = process.env.REACT_APP_PC_INTGR_UI_API;

export const registersAPI = {

  getRegisters(body: Partial<IBody>) {
    return getInstance().post(`/intgr/incomeRegistry/table`, body);
  },
  getAllRegisters(body: Partial<IBody>) {
      return getInstance().post(`/intgr/incomeRegistry/v2/table`, body);
  },
  getRegister(id: any, body: Partial<IBody>) {
      return getInstance().post(`/intgr/incomeRegistry/${id}/incomes`, body);
  },
  getRegisterInfo(id: any) {
      return getInstance().get(`/intgr/incomeRegistry/${id}/general`);
  },
  getExcel(body: Partial<IBody>) {
    const strBody = encodeURIComponent(JSON.stringify(body));
      return getInstance().get(`/intgr/incomeRegistry/table/excel?paginationInfo=${strBody}`, {responseType: 'blob'})
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const date = getCorrectDate(new Date());
        link.setAttribute('download', `Список зачислений ${date}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  },
  getExcelV2(body: Partial<IBody>) {
      const strBody = encodeURIComponent(JSON.stringify(body));
      return getInstance().get(`/intgr/incomeRegistry/v2/table/excel?paginationInfo=${strBody}`, {responseType: 'blob'})
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const date = getCorrectDate(new Date());
        link.setAttribute('download', `Список зачислений ${date}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  },
    getZFile(registryId: number, name: string) {
      const api = process.env.REACT_APP_API;
          return getInstance().get(`/intgr/incomeRegistry/${registryId}/file`, {responseType: 'blob'})
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
          });
    },
};
