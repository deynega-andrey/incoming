import React from 'react';
import Sidebar from '../../sidebar/sidebar';
import {Redirect, Route} from 'react-router-dom';

const RoutingComponent = (props: any) => {

  let token = localStorage.getItem('token');
  if (!token) {return <Redirect to={'/login'}/>}

  return (
    <Route
      path={props.path}
      exact={props.exact}
      render={() => (
        <>
          <Sidebar
            setSidebarWidth={props.setSidebarWidth}
            sidebarWidth={props.sidebarWidth}
          />
          <div className={props.sidebarWidth ? 'app__main app__main_extended' : 'app__main'}>
            {props.component}
          </div>
        </>
      )}
    />
  )
};

export default RoutingComponent;