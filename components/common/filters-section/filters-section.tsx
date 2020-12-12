import React from 'react';
import {Button} from '@openvtb/react-ui-kit/dist';
import {AppliedFilters} from './applied-filters/applied-filters';
import {FiltersGroup} from './filters-group/filters-group';
import {getID} from '../../../utils/common';
import {observer} from 'mobx-react';
import './filters-section.scss';

export enum FilterType {
  TXT_INPUT = 'txtInput',
  NUM_INPUT = 'numInput',
  DATE_PICKER = 'datePicker',
  MULTISELECT = 'multiSelect'
};
export interface IFilterItemConfig {
  property: string,
  type: FilterType,
  label: string,
  options?:{
    label: string;
    value: string | number;
  }[], // варианты для мультиселекта
  action: string
};
export interface IFiltersGroupConfig {
  sectionHeading?: string,
  filters: IFilterItemConfig[]
};
interface IProps {
  allFiltersGroupsConfigurations: IFiltersGroupConfig[],
  store:{[key:string]: any}
};
let intermediateValue:{[key:string]: any} = {};
const setIntermediateValue = (fieldType: string, property: string, propLabel:string, value: any, action: string) => {
  intermediateValue[property] = {
    propLabel,
    value,
    fieldType,
    action
  };
};
const Filters = ({allFiltersGroupsConfigurations, store}:IProps):JSX.Element => {
  const allFiltersPropertyNames = allFiltersGroupsConfigurations.map((item) => item.filters.map((filterItem) => filterItem.property));
  const closeFilters = () => {
    store.setFiltersShowState(false);
    window.removeEventListener('keydown', handleEscBtnPress);
    intermediateValue = {};
  };
  const handleEscBtnPress = (event:any) => {
    if (event.key === 'Escape' && !store.isLoaded) closeFilters()
  };
  window.addEventListener('keydown', handleEscBtnPress);
  const applyFilters = () => {
    for (let key in intermediateValue) {
      store[intermediateValue[key].action](intermediateValue[key].value);
    }
    closeFilters();
  }
  const clearFilters = () => {
    allFiltersGroupsConfigurations.forEach((groupItem) => {
      groupItem.filters.forEach((filterConfig) => store[filterConfig.action](null))
    })
    closeFilters();
  }
  return (<section className="filters">
    <AppliedFilters
      allFiltersGroupsConfigurations={allFiltersGroupsConfigurations}
      store={store}
      closeFilters={closeFilters}
    />
    <div className="filters__form">
      <div className="filters__items-container">
        {
          allFiltersGroupsConfigurations.map((configItem, index) => 
            <FiltersGroup
              key={getID()}
              groupPropertyes={allFiltersPropertyNames[index]}
              filtersGroupConfig={configItem} 
              store={store}
              intermediateValue={intermediateValue}
              setIntermediateValue={setIntermediateValue}
            />
          )
        }
      </div>
      <div className="filters__action-btns">
        <Button
          disabled={store.isLoaded}
          className="filters__btn"
          kind="primary"
          size="small"
          onClick={applyFilters}
        >
          Применить
        </Button>
        <Button
          className="filters__btn"
          disabled={store.isLoaded}
          kind="secondary"
          size="small"
          onClick={clearFilters}
        >
          Очистить
        </Button>
      </div>
    </div>
  </section>);
};
export const FiltersSection = React.memo(observer(Filters));
