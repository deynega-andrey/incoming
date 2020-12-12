import React from 'react';
import {BtnWithIcon} from '../btn-with-icon/btn-with-icon';
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross.svg';
import './modal.scss';

export enum IWidthOption {
  BIG = 'big',
  MEDIUM = 'medium',
  SMALL = 'small',
  EXTRA_SMALL = 'extra-small'
};

interface IProps {
  content: JSX.Element,
  state:boolean,
  setState(newState:boolean):void,
  widthOption?: IWidthOption,
  headingText?:string
};

export const Modal = React.memo((props:IProps) => {
  const closeModal = () => {
    props.setState(false);
    window.removeEventListener('keydown', handleEscBtnPress);
  };
  const handleEscBtnPress = (event:any) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };
  window.addEventListener('keydown', handleEscBtnPress); 
  return (
    <section className={props.state ? 'modal modal--opened' : 'modal'}>
      <div className="modal__overlay" onClick={() => closeModal()}></div>
      <div className={props.widthOption ? `modal__container  modal__container_${props.widthOption}` : `modal__container`}>
        <BtnWithIcon
          icon={<CrossIcon/>}
          additionalCSSCls={'modal__close-btn'}
          callback={closeModal}
        />
        {props.headingText && <div className="modal__heading">{props.headingText}</div>}
        <div className="modal__content">{props.content}</div>
      </div>
    </section>
  );
});