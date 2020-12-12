import React from 'react';
import {Route} from 'react-router-dom';
import './App.scss';
import Incoming from './components/incoming/incoming';
import Login from './components/login/login';
import PensionersTable from './components/pensioners/pensioners-table';
import RoutingComponent from './components/common/routing-component/routing-component';
import Registers from './components/registers/registers';
import Registry from "./components/registry/registry";
import {HandbooksSettings} from './components/handbooks/settings/settings';
import BudgetaryCommitments from './components/budgetary-commitments/budgetary-commitments';
import {observer} from 'mobx-react';
import store from './stores/registers-store';
import BlankPage from './components/blank-page/blank-page';

export enum Path {
  LOGIN = '/login',
  MAIN = '/',
  BUDGETARY_COMMITMENTS = '/budgetary_commitments',
  REGISTERS = '/registers',
  REGISTRY = '/registry',
  HANDBOOKS_SETTINGS = '/handbooks/settings',
  FOURHUNDREDTHREE = '/403'
}

const App = () => {
  const [sidebarWidth, setSidebarWidth] = React.useState<boolean>(false);
  const {accessToken} = store.data;

  return (
    <div className='app'>
      <RoutingComponent
        component={<Incoming/>}
        setSidebarWidth={setSidebarWidth}
        sidebarWidth={sidebarWidth}
        path={Path.REGISTERS}
      />
      <Route exact={true} path={Path.FOURHUNDREDTHREE} render={() => <BlankPage/>}/>
      <RoutingComponent
        component={<PensionersTable/>}
        setSidebarWidth={setSidebarWidth}
        sidebarWidth={sidebarWidth}
        path={Path.MAIN}
        exact={true}
      />
      <RoutingComponent
        component={<HandbooksSettings/>}
        setSidebarWidth={setSidebarWidth}
        sidebarWidth={sidebarWidth}
        path={Path.HANDBOOKS_SETTINGS}
        exact={true}
      />
      <RoutingComponent
        component={<BudgetaryCommitments/>}
        setSidebarWidth={setSidebarWidth}
        sidebarWidth={sidebarWidth}
        path={Path.BUDGETARY_COMMITMENTS}
        exact={true}
      />
      <RoutingComponent
        component={<Registers/>}
        setSidebarWidth={setSidebarWidth}
        sidebarWidth={sidebarWidth}
        path={'/reg'}
        exact={true}
      />
      <RoutingComponent
        component={<Registry/>}
        setSidebarWidth={setSidebarWidth}
        sidebarWidth={sidebarWidth}
        path={Path.REGISTRY}
      />
      <Route exact={true} path={Path.LOGIN} render={() => <Login path={Path}/>}/>
    </div>
  );
};

export default observer(App);
