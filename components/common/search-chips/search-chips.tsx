import React, {useCallback, useRef, useState} from 'react';
import './search-chips.scss';
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross.svg';
import {ReactComponent as SearchIcon} from '../../../assets/icons/search.svg';
import {ReactComponent as FilterIcon} from '../../../assets/icons/filter.svg';
import ChipsComponent from "../chips-component/chips-component";
import {Tooltip} from "antd";

interface ISearchFilters {
  setModal?: any,
  setSearch?: any,
  chips?: any,
  applyFilters?: any,
  params?: any,
  setParams?: any,
  applyChipsFilter?: any,
  search?: any,
  cleanCommonFilter?: any
}

const SearchChips = (props: ISearchFilters) => {

  const {setModal, setSearch, applyFilters, search, cleanCommonFilter} = props
  const [filterSearch, setFilterSearch] = useState(false);
  const inputRef = useRef(null);
  // @ts-ignore
  const focus = () => inputRef.current!.focus();

  /*const debounceSave = useCallback(
    debounce((nextValue) => setSearch(nextValue), 1000),
    []
  )*/

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') applyFilters();
  }

  /**
   * Отрисовка
   */

  return (
    <div className='app__search-chips'>

      <div className='app__search-chips-search'>
        <div className='app__search-chips-wrapper-input'>
          <input className={filterSearch ? `app__search-chips-input` :
            `app__search-chips-input app__search-chips-input_hide`}
                 value={search}
                 ref={inputRef}
                 onChange={(event) => setSearch(event.target.value)}
                 onKeyPress={handleKeyPress}
                 placeholder={filterSearch ? `Искать в таблице` : ''}
          />
          <div className='app__search-chips-search-icon'
            onClick={() => {
              setFilterSearch(!filterSearch);
              focus();
            }}
          >
            {filterSearch ?
              <div onClick={cleanCommonFilter}>
                <CrossIcon/>
              </div>
               :
              <Tooltip title={'Быстрый поиск'}>
                <SearchIcon/>
              </Tooltip>
            }
          </div>
        </div>
        <div className='app__search-chips-budge'
             onClick={()=>setModal('filters')}
        >
          <Tooltip title={'Фильтры'}>
            <FilterIcon/>
          </Tooltip>
        </div>

      </div>

      <div className='app__search-chips-chips'><ChipsComponent {...props}/></div>
    </div>
  )
}

export default SearchChips;