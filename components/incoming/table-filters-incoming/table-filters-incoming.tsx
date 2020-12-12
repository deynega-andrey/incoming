import {ReactComponent as SearchOutlineIcon} from '../../../assets/icons/search.svg';
import {DatePicker, Input, Select} from '@openvtb/react-ui-kit';
import React, {useEffect, useState} from 'react';
import {ITableFilter, ITableFiltersProps, ITableFilterValues, SIZE} from '../../../utils/interfaces/interfaces';
import './table-filters-incoming.scss';
import {transformedUrlDate} from '../../../methods/incoming';

/**
 * Компонент фильтров для таблицы
 * @param filters - Офписание фильтров по колонкам
 */
const TableFilters = React.memo(({applyFilters, filters, params}: ITableFiltersProps): JSX.Element | null => {

  /**
   * Значения фильтров
   */
  const [filtersValues, setFiltersValues] = useState<ITableFilterValues | null>(null);

  /**
   * Инициализация стейта значения льтров
   */
  useEffect(() => {
    const filterValuesTmp = {};
    /**
     * Функция для перевода данных фильтра recordPeriod, полученных из url в формат new Date(year, month, day);
     */
    transformedUrlDate(params);
    const body = params ? params : filterValuesTmp
    setFiltersValues(body);
  }, []);

  /**
   * Изменение занчения фильтра
   * @param field - Поле
   * @param type - Тип поля
   * @param event - Событие
   * @param value - Значение
   */
  const handleChangeValue = (field: string, type: string, event: any, value?: any) => {
    switch (type) {
      case 'datePeriod': {
        const filterTmp = {...filtersValues, [field]: event};
        setFiltersValues(filterTmp);
        handleApplyFilters(filterTmp);
        break;
      }
      case 'select': {
        let filterTmp = {...filtersValues, [field]: event ? event : null};
        setFiltersValues(filterTmp);
        handleApplyFilters(filterTmp);
        break;
      }
      case 'input': {
        setFiltersValues({
          ...filtersValues,
          [field]: value,
        });
        break;
      }
    }
  };

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
                  calendarSize="small"
                  label={filter.label}
                  range={true}
                  startDate={filtersValues![filter.name] ? filtersValues![filter.name][0] : null}
                  endDate={filtersValues![filter.name] ? filtersValues![filter.name][1] : null}
                  onChange={(event, value) => handleChangeValue(filter.name, filter.type, event, value)}
                />
              );
            case 'input':
              return (
                <Input.Text
                  placeholder={filter.placeholder}
                  label={filter.label}
                  value={filtersValues![filter.name]}
                  size={filter.size || SIZE.BIG}
                  width={filter.width ? `${filter.width}px` : undefined}
                  onChange={(event, value) => handleChangeValue(filter.name, filter.type, event, value)}
                  icon={<SearchOutlineIcon onClick={() => handleApplyFilters()} />}
                />
              );
            case 'select':
              const defaultValue = filters.filter(el => el.name === 'status')[0]
                .variables!.filter(el => el.value === filtersValues![filter.name])[0]
              return (
                <Select
                  size={filter.size || SIZE.BIG}
                  list={filter.variables!}
                  label={filter.label}
                  defaultValue={defaultValue}
                  clearable
                  className="select-component"
                  width={filter.width ? `${filter.width}px` : undefined}
                  onChange={(event) => handleChangeValue(filter.name, filter.type, event)}
                />
              );
          }
        })()}
      </div>
    );
  };

  /**
   * Применение фильтров
   */
  const handleApplyFilters = (filters = filtersValues) => applyFilters!(filters);

  /**
   * Отрисовка компонента после инициализаци значений фильтров
   */
  return (
    filtersValues && (
      <div className="table-filters">
        <div className="table-filters__row">{filters.map((item, key) => renderFilter(item, key))}</div>
      </div>
    )
  );
})


export default TableFilters;