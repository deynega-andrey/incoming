import React from 'react';
import './group-buttons.scss';
import {Button} from '@openvtb/react-ui-kit';
import {IGroupButtons} from '../../../utils/interfaces/interfaces';

const GroupButtons = ({buttons}: IGroupButtons) => {
  return (
    <div className='app__group-buttons'>
      {buttons.map((button: any, index: number) => {
        const {marginRight, text, kind, size = 'big', onClick = () => {}} = button;
        const style = {
          marginRight: `${marginRight}px`
        }
        return (
          <div className='app__group-buttons-wrapper' style={style} key={index}>
            <Button
              kind={kind}
              size={size}
              onClick={onClick}
            >
              {text}
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default GroupButtons;