import React, {useState} from 'react';
import {getID} from '../../../utils/common';
import {Checkbox} from '../checkbox/checkbox';
import {BtnWithIcon} from '../btn-with-icon/btn-with-icon';
import {ChipsItem} from '../chips-item/chips-item';
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross.svg';
import {ReactComponent as AngleArrow} from '../../../assets/icons/angle-arrow.svg';
import {Tooltip} from "antd";
import './multiselect.scss';

interface IProps {
  list:{
    label:string,
    value:string | number,
    [key:string]:any
  }[],
  disabled?:boolean,
  openByDefault?:boolean,
  label:string,
  onClick():void
};
export const Multiselect = ({list, disabled, label, openByDefault, onClick}:IProps) => {
  const [isShowMenu, setMenuShowState] = useState(openByDefault ? openByDefault : false);
  const [optionsList, changeOptionsList] = useState(list);
  const selectedOptions = optionsList.filter((item) => item.checked);
  const clearSelected = () => {
    changeOptionsList(optionsList.map((item) => {
      item.checked = false;
      return item;
    }));
  };
  return (
    <div className="multiselect">
      <label className="multiselect__label" 
        onClick={() => setMenuShowState(!isShowMenu)}
      >{label}</label>
      <div 
        className={`multiselect__inner-wrapper
        ${disabled ? ' multiselect__inner-wrapper_disabled' : ''}
        ${isShowMenu ? ' multiselect__inner-wrapper_show-menu' : ''}
        `}
      > 
        {selectedOptions.length !== 0 &&
          <>
            {selectedOptions.map((item, index) => {
              if (index === 0 || index === 1) {
                return (
                  <ChipsItem
                    label={item.label}
                    callback={() => {
                      changeOptionsList(optionsList.map((currentItem) => {
                        if (currentItem.label === item.label) currentItem.checked = false;
                        return currentItem;
                      }))
                    }}
                    key={getID()} 
                  />
                );
              } else if (index === (selectedOptions.length - 1)) {
                return(<ChipsItem
                    label={`+${(selectedOptions.length) - 2}`}
                    key={getID()}
                />);
              }
              return null;
            })}
            <Tooltip title="Очистить">
              <div className="multiselect__clear-btn">
                <BtnWithIcon
                  icon={<CrossIcon/>}
                  callback={clearSelected}
                  additionalCSSCls="button-with-icon--primary"
                />
              </div>
            </Tooltip>
          </>
        }
        <Tooltip title={isShowMenu ? 'Свернуть' : 'Развернуть'}>
          <div className="multiselect__state-control-btn">
            <BtnWithIcon
              icon={<AngleArrow/>}
              callback={() => setMenuShowState(!isShowMenu)}
              additionalCSSCls="button-with-icon--primary"
            />
          </div>
        </Tooltip>
      </div>
      <div className="multiselect__options">
          {
            optionsList.map((item, index, array) => (
            <div className="multiselect__option-item" 
              key={getID()}
            >
              <Checkbox
                checked={item.checked}
                onChange={() => {
                  item.checked = item.checked ? false : true;
                  onClick();
                  changeOptionsList(array.slice());
                }}
                btnText={item.label}
              />
            </div>))
          }
        </div>
    </div>
  );
};