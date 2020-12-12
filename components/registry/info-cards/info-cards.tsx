import React from 'react';
import './info-cards.scss';
import {IInfo, IInfoCard, IInfoCards} from "../../../utils/interfaces/interfaces";


const InfoCard = ({el}: IInfoCard) => {
  const {label, value, width} = el;
  return (
    <div className={`app__info-card app__info-card_${width}`}>
      <div className='app__info-card-value'>{value}</div>
      <div className='app__info-card-label'>{label}</div>
    </div>
  )
}

const InfoCards = ({info}: IInfoCards) => {
  return (
    <div className = 'app__info-cards'>
      {info.map((el: IInfo, index: number) =>
        <div className='app__info-card-wrapper' key={index} >
          <InfoCard el={el}/>
        </div>
      )}
    </div>
  )
}

export default InfoCards;