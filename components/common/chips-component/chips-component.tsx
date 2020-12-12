import React from 'react';
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross-in-a-circle.svg';
import './chips-component.scss';
import {Tooltip} from "antd";

const ChipsComponent = ({chips, params, applyChipsFilter}: any) => {
  return (
    chips.length === 0 ?
        <div className='app__search-chips-empty'>Фильтр не настроен</div> :
        <div className='app__chips'>
          {chips && chips.map((el: any) => {
            const {id} = el;
            return (
              <div className='app__chip' key={id}>
                <Tooltip title={el.label}>
                  <div className='app__chip-text'>{el.label}</div>
                </Tooltip>
                <button className='app__chip-remove'
                     onClick={
                       () => {
                         const param = chips.filter((el: any) => id === el.id)[0];
                         const {name, label} = param;
                         const newParams: any = {};
                         Object.keys(params!).forEach(el => {
                           if (el === 'paymentCourse') {
                             const newPaymentCourse = params.paymentCourse.filter((el: string) => el !== label);
                             if (newPaymentCourse.length === 0) return;
                             newParams['paymentCourse'] = newPaymentCourse;
                           } else if (el !== name) newParams[el] = params[el];
                         })
                         applyChipsFilter(newParams);
                       }
                     }
                >
                  <CrossIcon/>
                </button>
              </div>
            )
          })}
        </div>
    )
}

export default ChipsComponent;