import React from 'react';
import {FilterType, IFilterItemConfig} from '../filters-section';
import {DatepickerComponent} from '../datepicker/datepicker-component';
import {Multiselect} from '../../../common/multiselect/multiselect';
import {InputField} from '../../../common/input-field/input-field';
import {observer} from 'mobx-react';


interface IProps {
  fieldConfig: IFilterItemConfig,
  store:{[key:string]:any},
  propName:string,
  intermediateValue: {[key:string]:any},
  setIntermediateValue(fieldType:string, prop: string, propLabel:string, val:any, action: string):void
};

const FilterFieldComponent = ({fieldConfig, store, propName, intermediateValue, setIntermediateValue}:IProps):JSX.Element => {

  let field = null;
  switch(fieldConfig.type) {
    case FilterType.TXT_INPUT:
      field = (<InputField
        label={fieldConfig.label}
        disabled={false}
        initValue={store[propName] ? store[propName] : ''}
        onChange={(event:{[key:string]:any}) => setIntermediateValue(fieldConfig.type, fieldConfig.property, fieldConfig.label, event.currentTarget.value, fieldConfig.action)}
      />);
      break;
    case FilterType.DATE_PICKER:
      // const getDate = (propName: string, index: 0 | 1) => {
      //   if (intermediateValue[propName] && intermediateValue[propName].value && intermediateValue[propName].value[index]) return intermediateValue[propName].value[index];
      //   if (store[propName] && store[propName][index]) return store[propName][index];
      //   return null;
      // }
      field = (<DatepickerComponent
        accumulateValue={intermediateValue}
        store={store}
        fieldConfig={fieldConfig}
        setIntermediateValue={setIntermediateValue}
      />);
      break;
    case FilterType.MULTISELECT:
      if (fieldConfig.options) {
        const list = store[propName] ? store[propName].map((item:{[key:string]:any}[]) => Object.assign({}, item)) : fieldConfig.options.map((item) => Object.assign({}, item))
        field = (<Multiselect
          list={list}
          label={fieldConfig.label}
          onClick={() => setIntermediateValue(fieldConfig.type, fieldConfig.property, fieldConfig.label, list, fieldConfig.action)}
        />
        )
      }
      break;
  }
  return (
    <div className="filters__field-item">
      {field}
    </div>
  );
};

export const FilterField = React.memo(observer(FilterFieldComponent));