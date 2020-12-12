import * as React from 'react';
import {useState} from 'react';
import {Tooltip} from 'antd';
import {observer} from 'mobx-react';
import {ReactComponent as CrossInCircleIcon} from '../../assets/icons/cross-in-circle.svg';
import {ReactComponent as CrossIcon} from '../../assets/icons/cross.svg';
import {ReactComponent as DownloadIcon} from '../../assets/icons/download.svg';
import {ReactComponent as ResumeIcon} from '../../assets/icons/resume.svg';
import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg';
import {ReactComponent as RubleIcon} from '../../assets/icons/ruble.svg';
import {ReactComponent as FilterIcon} from '../../assets/icons/filter.svg';
import {Modal} from '../common/modal/modal';
import {BtnWithIcon} from '../common/btn-with-icon/btn-with-icon';
import {Checkbox} from '../common/checkbox/checkbox';
import {ModalContent} from './file-uploader/file-uploader';
import {Role, checkUserRole} from '../../methods/check-user-role';
import {AppliedFiltersChips} from '../common/applied-filters-chips/applied-filters-chips';
import {PensionersFiltersConfigiurations} from '../../utils/constants-pensioners';

interface IProps {
  // disabledBtnsState:boolean,
  selectedRowsData: any;
  store: any;
  onStopPayments(): void;
  onResumePayments(): void;
  onChangeSelectionParams(): void;
  onSendCashRequest(): void;
}
export enum ViewMode {
  SHOW_ACTION_BTNS = 'SHOW_ACTION_BTNS',
  SHOW_SEARCH_INPUT = 'SHOW_SEARCH_INPUT',
}
function PensionersTableActions(props: IProps): JSX.Element {
  const {selectedRowsData, store, onStopPayments, onResumePayments, onChangeSelectionParams, onSendCashRequest} = props;
  const [isModalShow, setModalShowState] = useState(false);
  const handleShowSearchBtn = (): void => {
    store.setActionsPanelState(ViewMode.SHOW_SEARCH_INPUT);
  };
  const handleHideSearchBtn = (): void => {
    store.setActionsPanelState(ViewMode.SHOW_ACTION_BTNS);
    store.setGlobalSearchValue('');
    onChangeSelectionParams();
  };
  const handleSearch = (event: any): void => {
    event.preventDefault();
    if (!store.isLoaded) {
      store.setGlobalSearchValue(event.currentTarget.elements.search.value);
      onChangeSelectionParams();
    }
  };
  return (
    <div className="pensioners-table__actions">
      <div className="pensioners-table__actions-btns-container">
        {store.actionsPanelState === ViewMode.SHOW_ACTION_BTNS && checkUserRole(Role.USER) && (
          <div className="pensioners-table__with-icon-btns">
            <BtnWithIcon
              disabledBtnsState={!selectedRowsData.length || store.isLoaded}
              callback={onStopPayments}
              icon={<CrossInCircleIcon />}
              btnText={'Приостановить выплаты'}
              additionalCSSCls={'button-with-icon--primary'}
            />
            <BtnWithIcon
              disabledBtnsState={!selectedRowsData.length || store.isLoaded}
              callback={onResumePayments}
              icon={<ResumeIcon />}
              btnText={'Возобновить выплаты'}
              additionalCSSCls={'button-with-icon--primary'}
            />
            <BtnWithIcon
              disabledBtnsState={store.isLoaded}
              callback={() => setModalShowState(true)}
              icon={<DownloadIcon />}
              btnText={'Загрузить'}
              additionalCSSCls={'button-with-icon--primary'}
            />
            <BtnWithIcon
              disabledBtnsState={store.isLoaded}
              callback={onSendCashRequest}
              icon={<RubleIcon />}
              btnText={'Запрос ДС'}
              additionalCSSCls={'button-with-icon--primary'}
            />
          </div>
        )}
        {store.actionsPanelState === ViewMode.SHOW_SEARCH_INPUT && (
          <form onSubmit={handleSearch} action="#" method="#">
            <input
              name="search"
              disabled={store.isLoaded}
              autoFocus={true}
              type="text"
              className="input-field"
              placeholder="Искать в таблице"
              defaultValue={store.globalSearch}
            />
          </form>
        )}
        <div className="pensioners-table__with-call-btns">
          {store.actionsPanelState === ViewMode.SHOW_ACTION_BTNS && (
            <>
              <Tooltip title="Быстрый поиск">
                <span>
                  <BtnWithIcon
                    disabledBtnsState={store.isLoaded}
                    callback={handleShowSearchBtn}
                    icon={<SearchIcon />}
                    additionalCSSCls={'button-with-icon--primary'}
                  />
                </span>
              </Tooltip>

              <Tooltip title="Фильтры">
              <span>
                <BtnWithIcon
                  disabledBtnsState={store.isLoaded}
                  callback={() => store.setFiltersShowState(true)}
                  icon={<FilterIcon />}
                  additionalCSSCls={'button-with-icon--primary'}
                />
              </span>
              </Tooltip>
            </>
          )}
          {store.actionsPanelState === ViewMode.SHOW_SEARCH_INPUT && (
            <Tooltip title="Скрыть поиск">
              <span>
                <BtnWithIcon
                  disabledBtnsState={store.isLoaded}
                  callback={handleHideSearchBtn}
                  icon={<CrossIcon />}
                  additionalCSSCls={'button-with-icon--primary  cross-btn'}
                />
              </span>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="pensioners-table__filters">
        <Checkbox
          disabledBtnsState={store.isLoaded}
          checked={store.isAllDocsChecked}
          btnText={'Все'}
          onChange={() => {
            store.toggleAllDocsCheckedState();
            onChangeSelectionParams();
          }}
        />
        <Checkbox
          disabledBtnsState={store.isLoaded || store.isAllDocsChecked}
          checked={store.isActivePaymentsDocsChecked}
          btnText={'Действующие'}
          onChange={() => {
            store.toggleActiviePaymentsDocsCheckedState();
            onChangeSelectionParams();
          }}
        />
        {/* <Checkbox
            disabledBtnsState={store.isLoaded || store.isAllDocsChecked}
            checked={store.isStoppedPaymentsDocsChecked}
            btnText={'Приостановленные'}
            onChange={() => {
              store.toggleStoppedPaymentsDocsCheckedState();
              onChangeSelectionParams();
            }}
          /> */}
        <Checkbox
          disabledBtnsState={store.isLoaded || store.isAllDocsChecked}
          checked={store.isErrorDocsChecked}
          btnText={'Ошибка'}
          onChange={() => {
            store.toggleErrorDocsCheckedState();
            onChangeSelectionParams();
          }}
        />
        <Checkbox
          disabledBtnsState={store.isLoaded || store.isAllDocsChecked}
          checked={store.isDraftDocsChecked}
          btnText={'Черновики'}
          onChange={() => {
            store.toggleDraftDocsCheckedState();
            onChangeSelectionParams();
          }}
        />
        <Checkbox
          disabledBtnsState={store.isLoaded || store.isAllDocsChecked}
          checked={store.isClosedDocsChecked}
          btnText={'Закрытые'}
          onChange={() => {
            store.toggleClosedDocsCheckedState();
            onChangeSelectionParams();
          }}
        />
      </div>
      {isModalShow && <Modal
        state={isModalShow}
        setState={setModalShowState}
        content={<ModalContent/>}
      />}
      <AppliedFiltersChips
        filtersConfig={PensionersFiltersConfigiurations}
        store={store}
      />
    </div>
  );
}
export default React.memo(observer(PensionersTableActions));
