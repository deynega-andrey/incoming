import * as React from 'react';
import './btn-with-icon.scss';

interface IProps {
  icon: JSX.Element;
  additionalCSSCls?: string;
  disabledBtnsState?: boolean;
  btnText?: string;
  callback(): void;
}
const BASE_CSS_CLS:string = 'button-with-icon';
export const BtnWithIcon = React.memo((props: IProps): JSX.Element => {
  const btnCSSCls:string = props.additionalCSSCls ? `${BASE_CSS_CLS} ${props.additionalCSSCls}` : BASE_CSS_CLS;
  return (
    <button
      className={btnCSSCls}
      type="button"
      disabled={props.disabledBtnsState}
      onClick={props.callback}
    >
      {props.icon}
      {props.btnText && <span className="button-with-icon__text">{props.btnText}</span>}
    </button>
  );
});
