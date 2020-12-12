import React from 'react';
import './modal-filters.scss';
import {IModal} from '../../../utils/interfaces/interfaces';
import TableFilters from "../table-filters/table-filters";
import GroupButtons from "../group-buttons/group-buttons";
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross.svg';
import ChipsComponent from "../chips-component/chips-component";

const ModalFilters = (props: IModal) => {

  return (
    <div className='app__modal-filters'>
      <div className='app__modal-filters-chips'>
        <div className='app__modal-filters-text'>Фильтр:</div>
        <div className='app__modal-filters-content'>
          <ChipsComponent {...props}/>
          <div className='app__modal-filters-cross'
               onClick={() => props.setModal(null)}
          ><CrossIcon/></div>
        </div>

      </div>
      <div className='app__modal-table-filters'>
        <TableFilters {...props}/>
      </div>
      <div className='app__modal-buttons'>
        <GroupButtons {...props}/>
      </div>
    </div>
  )
}

export default ModalFilters;