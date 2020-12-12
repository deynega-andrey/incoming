import {ReactComponent as SearchOutlineIcon} from '../../../assets/icons/search.svg';
import {DatePicker, Input, Select, MultiSelect} from '@openvtb/react-ui-kit';
import React, {useEffect, useState} from 'react';
import {
  IDirectionPayments,
  ITableFilter,
  ITableFiltersProps,
  SIZE
} from '../../../utils/interfaces/interfaces';
import './table-filters.scss';
import DirectionPaymentsFilter from "../direction-payments/direction-payments";

/**
 * Компонент фильтров для таблицы
 * @param filters - Офписание фильтров по колонкам
 */
const TableFilters = React.memo(({filters, params, width, setParams}:
                                   ITableFiltersProps): JSX.Element | null => {

  /**
   * Изменение занчения фильтра
   * @param field - Поле
   * @param type - Тип поля
   * @param event - Событие
   * @param value - Значение
   */
  const handleChangeValue = (field: string, type: string, event: any, value?: any | undefined) => {
    switch (type) {
      case 'datePeriod': {
        setParams!({...params, [field]: event});
        break;
      }
      case 'select': {
        setParams!({...params, [field]: event ? event : null});
        break;
      }
      case 'multiSelect': {
        setParams!({...params, [field]: event});
        break;
      }
      case 'input': {
        setParams!({...params, [field]: value});
        break;
      }
    }
  };

  let ways: any = {};
  if (params && params.paymentCourse) params.paymentCourse.forEach((el: string) => ways[el] = true);

  const [paymentCourse, setPaymentCourse] = useState<IDirectionPayments>({...{
    '00': false,
    '77': false,
    '88': false,
    '99': false
  }, ...ways});

  useEffect(() => {
    const keys = Object.keys(paymentCourse);
    const value = keys.filter(el => paymentCourse[el] === true);
    if (value.length) {
      setParams!({...params, 'paymentCourse': value});
    } else {
      const filterTmp: any = {};
      for (const key in params) {
        if (key !== 'paymentCourse') {
          filterTmp[key] = params[key]
        }
      }
      setParams!(filterTmp);
    }
  }, [paymentCourse])

  /**
   * Функция отрисовки фильтра
   * @param filter - текущий фильтр
   * @param key - ключ
   */
  const renderFilter = (filter: ITableFilter, key: number) => {
    return (
      <div key={key} className="table-filters__wrapper">
        {(() => {
          switch (filter.type) {
            case 'datePeriod':
              return (
                <DatePicker
                  size="small"
                  calendarSize="big"
                  label={filter.label}
                  range={true}
                  startDate={params && params![filter.name] ? params![filter.name][0] : null}
                  endDate={params && params![filter.name] ? params![filter.name][1] : null}
                  onChange={(event, value) => handleChangeValue(filter.name, filter.type, event, value)}
                />
              );
            case 'input':
              return (
                <Input.Text
                  placeholder={filter.placeholder}
                  label={filter.label}
                  value={params ? params![filter.name] : undefined}
                  size={filter.size || SIZE.BIG}
                  width={filter.width ? `${filter.width}px` : undefined}
                  onChange={(event, value) => handleChangeValue(filter.name, filter.type, event, value)}
                  icon={<SearchOutlineIcon/>}
                />
              );
            case 'select':
              let defaultValue;
              if (params) defaultValue = filters.filter(el => el.name === filter.name)[0]
                .variables!.filter(el => el.value === params![filter.name])[0]
              return (
                <Select
                  size={filter.size}
                  list={filter.variables!}
                  label={filter.label}
                  defaultValue={defaultValue}
                  clearable
                  className="select-component"
                  width={filter.width ? `${filter.width}px` : undefined}
                  onChange={(event) => handleChangeValue(filter.name, filter.type, event)}
                />
              );
            /*case 'multiSelect': {
              return (
                <MultiSelect
                  list={filter.variables!}
                  size={filter.size}
                  label={filter.label}
                  defaultValue={params[filter.name]}
                  clearable
                  width={filter.width ? filter.width : undefined}
                  onChange={handleChangeValue(filter.name, filter.type)}
                />
              )
            }*/
            case 'paymentCourse': {
              return (
                <DirectionPaymentsFilter
                  directionPayments={paymentCourse}
                  setDirectionPayments={setPaymentCourse}
                />
              )
            }
          }
        })()}
      </div>
    );
  };

  /**
   * Отрисовка компонента после инициализаци значений фильтров
   */
  return (
    <div className="table-filters" style={{maxWidth: `${width}px`}}>
      {filters.map((item, key) => renderFilter(item, key))}
    </div>
  );
})

export default TableFilters;