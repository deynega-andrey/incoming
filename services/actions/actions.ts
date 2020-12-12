import {registersAPI} from '../../api/api-registers';
import store from '../../stores/registers-store';
import {IBody} from '../../utils/interfaces/interfaces';
import {apiAuth} from '../../api/api-auth';
import {saveJWT, saveToken} from '../../methods/auth';

export const getRegisters = (body: Partial<IBody>) => {
  return registersAPI
    .getRegisters(body)
    .then((response: any) => {
      if (response) store.loadingData(response.data);
    })
    .catch((err: string) => {
      throw err;
    });
};

export const getAllRegisters = (body: Partial<IBody>) => {
  return registersAPI
    .getAllRegisters(body)
    .then((response: any) => {
      if (response) store.loadingData(response.data);
    })
    .catch((err: string) => {
      throw err;
    });
};

export const getRegister = (id: string, body: Partial<IBody>) => {
  return registersAPI
    .getRegister(id, body)
    .then((response: any) => {
      if (response) store.loadingData(response.data);
    })
    .catch((err: string) => {
      throw err;
    });
};

export const getRegisterInfo = (id: string) => {
  return registersAPI
    .getRegisterInfo(id)
    .then((response: any) => {
      if (response) store.loadingRegistryInfo(response.data);
    })
    .catch((err: string) => {
      throw err;
    });
};

export const getExcel = (body: Partial<IBody>) => {
  return registersAPI.getExcel(body);
};

export const getExcelV2 = (body: Partial<IBody>) => {
  return registersAPI.getExcelV2(body);
};

export const getZFile = (registryId: number, name: string) => {
  return registersAPI.getZFile(registryId, name);
};

export const refreshJwtToken = (token: string) => {
  return apiAuth.refreshTokenData(token)
    .then(res => {
      const {exp_time, refresh_token, access_token} = res.data;
      saveToken(access_token);
      saveJWT(refresh_token, exp_time);
      store.loadingToken(access_token);
      store.loadingJWT(refresh_token, exp_time);
      return access_token
    })
}
