import * as React from 'react';
import {ReactComponent as CheckBoxEmptyIcon} from '../../../assets/icons/checkbox-empty.svg';
import {ReactComponent as CheckboxOkIcon} from '../../../assets/icons/checkbox-ok.svg';
import './checkbox.scss';

interface IProps {
  checked: boolean;
  btnText?: string;
  disabledBtnsState?: boolean;
  onChange(): void;
}
export const Checkbox = React.memo((props: IProps): JSX.Element => {
  const {checked, btnText, disabledBtnsState, onChange} = props;
  const handleClick = ():void => {
    onChange();
  };
  let checkboxCSSCls: string = 'button-with-icon checkbox';
  if (checked) {
    checkboxCSSCls = `${checkboxCSSCls} checkbox--selected`;
  }
  return (
    <button className={checkboxCSSCls} type="button" onClick={handleClick} disabled={disabledBtnsState}>
      {checked && <CheckboxOkIcon />}
      {!checked && <CheckBoxEmptyIcon />}
      {btnText && <span className="button-with-icon__text">{btnText}</span>}
    </button>
  );
});
