import React from 'react';
import {BtnWithIcon} from '../../btn-with-icon/btn-with-icon';
import {IFiltersGroupConfig} from '../filters-section'
import {ReactComponent as CrossIcon} from '../../../../assets/icons/cross.svg';
import {AppliedFiltersChips} from '../../applied-filters-chips/applied-filters-chips';
import {Tooltip} from "antd";
import {observer} from 'mobx-react';

interface IProps {
  allFiltersGroupsConfigurations: IFiltersGroupConfig[],
  store: {[key:string]: any},
  closeFilters():void
};
const AppliedFiltersComponent = ({allFiltersGroupsConfigurations, store, closeFilters}:IProps) => {
  return (
    <div className="filters__applied-filters">
      <div className="filters__applied-heading">Фильтры:</div>
      <AppliedFiltersChips
        filtersConfig={allFiltersGroupsConfigurations}
        store={store}
      />
      <Tooltip title='Закрыть Фильтры'>
        <div className="filters__close-btn">
          <BtnWithIcon
            disabledBtnsState={store.isLoaded}
            icon={<CrossIcon/>}
            callback={closeFilters}
            additionalCSSCls="button-with-icon--primary"
          />
        </div>
      </Tooltip>
    </div>
  );
}

export const AppliedFilters = React.memo(observer(AppliedFiltersComponent));
