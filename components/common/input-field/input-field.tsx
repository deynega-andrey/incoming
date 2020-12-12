import React from 'react';
import {getID} from '../../../utils/common';
// import {ReactComponent as SearchIcon} from '../../../assets/icons/search.svg';
import './input-field.scss';
import {observer} from 'mobx-react';

interface IProps {
  label:string
  disabled?:boolean,
  initValue?:string,
  onChange(event:{[key:string]:any}):void
};
const InputFieldComponent = ({label, disabled, initValue, onChange}:IProps) => {
  const id = getID();
  return (
    <div className="input">
      <label className="input__label" htmlFor={id}>{label}</label>
      <div className="input__field-wrapper">
        <input
          className="input__field"
          type="text"
          id={id}
          disabled={disabled}
          defaultValue={initValue}
          onChange={onChange}
        />
        {/* <SearchIcon className="input__search-icon"/> */}
      </div>
    </div>
  );
};
export const InputField = React.memo(observer(InputFieldComponent));