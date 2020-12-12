import React from 'react';
import {ChipsItem} from '../chips-item/chips-item';
import {getID} from '../../../utils/common';
import {IFiltersGroupConfig, IFilterItemConfig} from '../filters-section/filters-section'
import {observer} from 'mobx-react';

interface IProps {
  filtersConfig: IFiltersGroupConfig[],
  store: {[key:string]: any}
}
const AppliedFiltersChipsComponent = ({filtersConfig, store}:IProps) => {
  const appliedFiltersConfigs:IFilterItemConfig[] = [];
  filtersConfig.forEach((sectionItem) => {
    sectionItem.filters.forEach((filter) => {
      if (store[filter.property]) appliedFiltersConfigs.push(filter);
    })
  });

  return (
    <div className="filters__applied-items">
        {appliedFiltersConfigs.length !== 0 && appliedFiltersConfigs.map((item) => (
          <ChipsItem
            key={getID()}
            label={item.label}
            callback={() => store[item.action](null)}
          />
        ))}
        {appliedFiltersConfigs.length === 0 && 
          <ChipsItem
            label={'Фильтр не настроен'}
          />
        }
      </div>
  );
};
export const AppliedFiltersChips = React.memo(observer(AppliedFiltersChipsComponent));