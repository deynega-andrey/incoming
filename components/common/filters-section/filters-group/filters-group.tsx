import React from 'react';
import {IFiltersGroupConfig} from '../filters-section';
import {FilterField} from '../filter-field/filter-field';
import {observer} from 'mobx-react';
import {getID} from '../../../../utils/common';


interface IProps {
  filtersGroupConfig:IFiltersGroupConfig,
  store:{[key:string]:any},
  groupPropertyes:string[],
  intermediateValue: {[key:string]:any},
  setIntermediateValue(fieldType:string, prop: string, propLabel:string, val:any, action: string):void
};
const FiltersGroupComponent = ({filtersGroupConfig, store, groupPropertyes, intermediateValue, setIntermediateValue}:IProps):JSX.Element => {
  return (
    <div className="filters__items-section">
      {filtersGroupConfig.sectionHeading && <div className="filters__section-heading">{filtersGroupConfig.sectionHeading}</div>}
      <div className="filters__items">
        {
          filtersGroupConfig.filters.map((item, index):JSX.Element => {
            return (
              <FilterField
                key={getID()}
                propName={groupPropertyes[index]}
                fieldConfig={item} 
                store={store}
                intermediateValue={intermediateValue}
                setIntermediateValue={setIntermediateValue}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export const FiltersGroup = React.memo(observer(FiltersGroupComponent));