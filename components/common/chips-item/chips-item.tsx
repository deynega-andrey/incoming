import React from 'react';
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross-in-a-circle.svg';
import {Tooltip} from "antd";
import './chips-item.scss';

interface IProps {
  label:string,
  callback?:() => void
}
export const ChipsItem = ({label, callback}:IProps) => {
  return (
    <div className={`chips${callback ? ' chips_with-btn' : ''}`}>
      {callback &&
        <Tooltip title={label}>
          <div className="chips__name">{label}</div>
        </Tooltip>
      }
      {!callback && <div className="chips__name">{label}</div>}
      {callback &&
        <Tooltip title={'Очистить фильтр'}>
          <button type="button" className="chips__remove-btn" onClick={callback}><CrossIcon/></button>
        </Tooltip>
      }
    </div>
  );
}