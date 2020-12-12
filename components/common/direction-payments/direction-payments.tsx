import React, {useState} from 'react';
import {Checkbox} from '@openvtb/react-ui-kit';
import './direction-payments.scss';
import {IDirectionPayments} from "../../../utils/interfaces/interfaces";

interface IDirectionFilters {
  directionPayments: IDirectionPayments
  setDirectionPayments: any
}

const DirectionPaymentsFilter = ({directionPayments, setDirectionPayments}: IDirectionFilters) => {

  const keys = Object.keys(directionPayments);
  return (
    <div className='app__direction-payments'>
      <div className='app__direction-payments-title'>Направление выплат</div>
      <div className='app__direction-payments-wrapper-checkboxes'>
        {keys.map((el: string, index: number) => {
          return (
            <div className='app__direction-payments-checkbox' key={index}>
              <Checkbox
                checked={directionPayments[el]}
                size={'small'}
                id={el}
                onChange={() => {
                  setDirectionPayments({...directionPayments, [el] : !directionPayments[el]})
                }}
              />
              <label
                className='app__direction-payments-text'
                htmlFor={el}
              >
                {el}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DirectionPaymentsFilter;