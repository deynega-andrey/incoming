import * as React from 'react';
import './section-heading.scss';
import {ReactComponent as ExitIcon} from '../../../assets/icons/exit.svg';
import {Tooltip} from "antd";
import {useState} from "react";
import {Redirect} from "react-router-dom";

const SECTION_HEADING = 'app__section-heading';
interface IProps {
  text: string;
}
export const SectionHeading = React.memo((props: IProps): JSX.Element => {

  const [logOut, setLogOut] = useState(false)

  const leavedSystem = () => {
    localStorage.clear();
    setLogOut(true);
  }

  if (logOut) return <Redirect to='/login'/>

  return (
    <div className={SECTION_HEADING}>
      <div className='app__section-heading-title'>{props.text}</div>
      <Tooltip title='Выход'>
        <button className='app__section-heading-button' onClick = {leavedSystem}>
          <ExitIcon/>
        </button>
      </Tooltip>
    </div>
  )
});
