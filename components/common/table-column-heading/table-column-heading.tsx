import React from 'react';
import {Tooltip} from 'antd';
import {observer} from 'mobx-react';
import {ReactComponent as SortArrowIcon} from '../../../assets/icons/sort-arrow.svg';
import {SortDirection} from '../../../methods/by-table/on-sort-click';
import {BtnWithIcon} from '../btn-with-icon/btn-with-icon';
import './table-column-heading.scss';

interface IProps {
  headerText: string;
  columnProp: string;
  store: any;
}
function TableColumnHeading({headerText, columnProp, store}: IProps): JSX.Element {
  const isActiveSort: boolean = Boolean(store.sortedProperty === columnProp);
  let additionalSortBtnCls: string = isActiveSort ? ' sort-btn--active' : '';
  additionalSortBtnCls = `${additionalSortBtnCls}${
    isActiveSort && store.sortDirection === SortDirection.ASC ? ' sort-btn--asc' : ''
  }`;
  const descSortTooltipText: string = 'Сортировать по убыванию';
  const ascSortTooltipText: string = 'Сортировать по возрастанию';
  let sortTooltipText: string = descSortTooltipText;
  if (isActiveSort) {
    sortTooltipText = store.sortDirection === SortDirection.DESC ? descSortTooltipText : ascSortTooltipText;
  }
  return (
    <div className="table__column-heading">
      <Tooltip title={sortTooltipText}>
        <div className="sort-btn-wrapper">
          <BtnWithIcon
            disabledBtnsState={store.isLoaded}
            callback={() => {}}
            icon={<SortArrowIcon />}
            additionalCSSCls={`${additionalSortBtnCls}`}
          />
        </div>
      </Tooltip>
      <Tooltip title={headerText}>
        <span className="table__column-heading-text">{headerText}</span>
      </Tooltip>
    </div>
  );
}

export default React.memo(observer(TableColumnHeading));
