import {Input} from '@openvtb/react-ui-kit';
import {Button} from '@openvtb/react-ui-kit';
import React, {useEffect} from 'react';
import './login.scss';
import {Redirect} from 'react-router-dom';
import {observer} from "mobx-react";
import store from '../../stores/registers-store';

import {useLogin} from "../../methods/login-hooks";

const Login = ({path}: any)=> {

  const {errorState, setErrorState, isLoadingState, setLoadState, errorMessage, setErrorMessage, autorization,
    setAutorization, checkAuth, checkStatus} = useLogin();

  const {loginValue, passwordValue} = autorization;

  //accessToken не стирать - нужен для обновления страницы
  const {status, accessToken} = store.data;

  const onChange = (field: string, value: any) => {
      setAutorization({...autorization, [field]: value});
      if (errorState === 'error') {
        setErrorState(undefined);
        setLoadState(false);
        setErrorMessage(undefined);
      }
  }

  useEffect(() => {
    checkStatus(status);
  }, [status])

  let token = localStorage.getItem('token');

  if (token) {
    return <Redirect to={path.MAIN}/>
  }

  //Отрисовка

  return (
    <section className="login">
      <div className="login__form-body">
        <div className="login__inner-container">
          <h1 className="login__heading">Вход</h1>
          <div className="login__input-wrapper">
            <Input.Text
              label="Введите логин"
              value={loginValue}
              size={'small'}
              onChange={(event, value) => onChange('loginValue', value)}
              status={errorState}
            />
          </div>
          <div className="login__input-wrapper">
            <Input.Password
              label="Введите пароль"
              value={passwordValue}
              size={'small'}
              onChange={(event, value) => onChange('passwordValue', value)}
              status={errorState}
              additionalText={errorMessage}
            />
          </div>
          <Button
            disabled={Boolean(errorState) || isLoadingState}
            className={`login__action-btn${errorState ? ' login__action-btn--blocked' : ''}`}
            kind="primary"
            size="small"
            onClick={() => {
              setLoadState(true);
              checkAuth();
            }}
          >
            Войти
          </Button>
        </div>
      </div>
    </section>
  );
};

export default observer(Login);