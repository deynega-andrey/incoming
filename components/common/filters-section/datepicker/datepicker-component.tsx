import React, {useState} from 'react';
import {DatePicker} from '@openvtb/react-ui-kit/';

interface IProps {
  accumulateValue:{[key:string]:any},
  store:{[key:string]:any},
  fieldConfig:{
    label:string,
    property:string,
    type:string,
    [key:string]:any
  },
  setIntermediateValue(fieldType:string, prop: string, propLabel:string, val:any, action: string):void
}
export const DatepickerComponent = ({accumulateValue, store, fieldConfig, setIntermediateValue}:IProps) => {
  const [intermediateValue, setNewValue] = useState(accumulateValue);
  const getDate = (propName:string, index: 0 | 1) => {
    if (intermediateValue[propName] && intermediateValue[propName].value && intermediateValue[propName].value[index]) return intermediateValue[propName].value[index];
    if (store[propName] && store[propName][index]) return store[propName][index];
    return null;
  };
  return (
    <DatePicker
      width={320}
      range={true}
      startDate={getDate(fieldConfig.property, 0)}
      endDate={getDate(fieldConfig.property, 1)}
      label={fieldConfig.label}
      disabled={store.isLoaded}
      size={'small'}
      calendarSize={'small'}
      selected={intermediateValue[fieldConfig.property]}
      onChange={(date: Date | Array<Date | null> | null) => {
        setIntermediateValue(fieldConfig.type, fieldConfig.property, fieldConfig.label, date, fieldConfig.action);
        setNewValue(Object.assign({}, accumulateValue))
      }}
    />
  );
};