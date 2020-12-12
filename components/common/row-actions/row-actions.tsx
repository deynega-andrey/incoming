import React, {useState} from 'react';
import './row-actions.scss';
import {Checkbox} from '@openvtb/react-ui-kit';
import {IRowActions} from '../../../utils/interfaces/interfaces';
import {ReactComponent as SearchIcon} from '../../../assets/icons/search.svg';
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross.svg';

/**
 * Строка действий таблицы
 */

const RowActions = ({actions, searchIcon = false, setSearch}: IRowActions) => {

  const [filterSearch, setFilterSearch] = useState(false);
  const changedFilterSearch = () => setFilterSearch(!filterSearch);
  const changedSearch = (event: any) => setSearch(event.target.value);
  const renderAction = (action: any, key: number) => {
    const {type, param, onClick, icon, text, href, onChange, checked} = action;
    return (
      <div key={key} className='app__row-actions-wrapper'>
        {(() => {
          switch(type) {
            case 'button':
              return (
                <button
                  className={
                    param === false
                      ? `app__row-actions-button app__row-actions-button_disabled`
                      : `app__row-actions-button app__row-actions-button_hover`
                  }
                  onClick={onClick}
                >
                  {icon}
                  <div className="app__row-actions-text">{text}</div>
                </button>
              )
            case 'link':
              return (
                <a href={href}>
                  <button
                    className={
                      param === false
                        ? `app__row-actions-button app__row-actions-button_disabled`
                        : `app__row-actions-button app__row-actions-button_hover`
                    }
                    onClick={onClick}
                  >
                    {icon}
                    <div className='app__row-actions-text'>{text}</div>
                  </button>
                </a>
              )
            case 'checkbox':
              return (
                <div className='app__row-actions-button'>
                  <Checkbox checked={checked} size='small' onChange={onChange} />
                  <div className='app__row-actions-text'>{text}</div>
                </div>
              )
          }
        })()}
      </div>
    )
  }

  if (filterSearch) return (
    <div className='app__row-actions app__row-actions_with-input'>
      <div className='app__row-actions-wrapper-input'>
        <input
          className='app__row-actions-input'
          type='text'
          placeholder='Искать в таблице'
          onChange={changedSearch}
        />
        <div className='app__row-actions-input-icon'
             onClick={changedFilterSearch}
        >
          <CrossIcon/>
        </div>
      </div>
    </div>
  )

  return (
    <div className='app__row-actions'>
      <div className='app__row-actions-side'>
        {actions.map((action: any, key: number) => renderAction(action, key))}
      </div>
      {searchIcon && <div className='app__row-actions-icon' onClick={()=> setFilterSearch(true)}>

          <SearchIcon/>

      </div>}
    </div>
  )
}

export default RowActions;