import React from 'react';
import './blank-page.scss';
import {NavLink} from "react-router-dom";

const BlankPage = () => {
  return (
    <div className = 'app__blank-page'>
      <div className = 'app__blank-page-text'>У вас нет прав доступа. Обратитесь в службу поддержки пользователей.
        Нажмите
        <NavLink to={'/'} className='app__blank-page-link'>
          {` здесь`}
        </NavLink>
        , чтобы перейти на главную страницу.
        </div>
    </div>
  )
}

export default BlankPage;