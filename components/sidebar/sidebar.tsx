import React from 'react';
import {useState} from 'react';
import {Path} from '../../App';
import {ReactComponent as NotebooksIcon} from '../../assets/icons/notebooks.svg';
import {ReactComponent as RegistersIcon} from '../../assets/icons/registers.svg';
import {ReactComponent as RetireesIcon} from '../../assets/icons/retirees.svg';
import {ReactComponent as DotsIcon} from '../../assets/icons/union.svg';
import {ReactComponent as AngleArrow} from '../../assets/icons/angle-arrow.svg';
import {ReactComponent as BudgetaryCommitmentsIcon} from '../../assets/icons/budgetary-commitments.svg';
import {INavItem, ISidebar} from '../../utils/interfaces/interfaces';
import {NavLink, useLocation} from 'react-router-dom';
import {Tooltip} from 'antd';
import './sidebar.scss';

const Sidebar: React.FunctionComponent<ISidebar> = (props) => {
  const {sidebarWidth, setSidebarWidth} = props;
  const [expanded, setExpanded] = useState(false);
  /* Возможно, в меню будет более одного элемента с выпадающим списком. Стейт-свойство и сеттер нужен для того, чтобы открытым было только одно */
  const [selectedItemWithSubmenu, setSelectedItemWithSubmenu] = useState('');
  const location = useLocation();
  const currentLocationPath = location.pathname;
  /* Можно было бы декомпозировать в отдельный модуль и преобразовать в компонент,
  но важно понимать, что придётся передавать много дополнительных пропсов (сейчас берется из замыкания), либо использовать глобальный стор(MobX) */
  const getNavItem = ({icon, text, itemLocationPath, itemWithSubmenuConfig}: INavItem):JSX.Element => {
  const iconElement = sidebarWidth ? <span>{icon}</span> : <Tooltip placement="right" title={text}><span>{icon}</span></Tooltip>
    if (!itemWithSubmenuConfig) { // если не передан конфиг подменю, возвращаем обычную ссылку основного меню
      return (
        <NavLink
          to={`${itemLocationPath}`}
          className={currentLocationPath === itemLocationPath ? `sidebar__menu-item sidebar__menu-item_active`  : `sidebar__menu-item`}
          onClick={() => { // при клике на ссылку основного меню, обнулим выбранный элемент с подменю, закрываем подменю у элементов с выпадающим меню
            setSelectedItemWithSubmenu('');
            setExpanded(false);
          }}
        >
          {iconElement}
          <div className='sidebar__item-text'>{text}</div>
        </NavLink>
      )
    } else { // если передан, создадим элемент меню с выпадающим подменю
      return (
        /* если путь текущей страницы содержит itemWithSubmenuConfig.parentDirectoryLocation,
        делаем этот пункт меню с выпадающим списком активным */
        <button className={`${currentLocationPath.includes(itemWithSubmenuConfig.parentDirectoryLocation) ? 
          `sidebar__menu-item sidebar__menu-item_active`
          : `sidebar__menu-item`} sidebar__menu-item_with-submenu
          ${selectedItemWithSubmenu === text && expanded ? ' sidebar__menu-item_expanded' : ''}`} /* если подменю развернуто,
          добавим класс для разворота стрелочки и отображения подменю */
          onClick={() => {
            /* установим выбранный элемент с подменю в качестве текущего,
            переключаем состояние только для текущего, иначе просто открываем подменю
             */
            setSelectedItemWithSubmenu(text);
            selectedItemWithSubmenu === text ? setExpanded(!expanded) : setExpanded(true)
          }}
        >
          {iconElement}
          <div className="sidebar__item-text">{text}</div>
          <AngleArrow className="sidebar__angle-arrow"/>
          <nav className={`sidebar__item-menu`}>
            {itemWithSubmenuConfig.submenuItems.map((item) => (
              <NavLink to={item.itemLocationPath} key={item.itemLocationPath} className={`${currentLocationPath === item.itemLocationPath ? 
                `sidebar__inner-menu-item  sidebar__inner-menu-item_active`
                : `sidebar__inner-menu-item`}`}>
                {/* Проверяем, является ли этот элемент подменю активным, если да, добавим доп. класс */}
                {item.text}
              </NavLink>
            ))}
          </nav>
        </button>
      );
    }
  }
  return (
    <nav className={sidebarWidth ? 'sidebar sidebar_extended' : 'sidebar'}>
      <Tooltip title={sidebarWidth ? "Свернуть панель" : "Развернуть панель"} placement="right">
        <button className="sidebar__nav-state-toggle-btn" onClick={() => setSidebarWidth(!sidebarWidth)}>
          <DotsIcon />
        </button>
      </Tooltip>
      <div className="sidebar__nav-items-container">
        {getNavItem({
          text: 'Список пенсионеров',
          icon: <RetireesIcon/>,
          itemLocationPath: Path.MAIN,
        })}
        {getNavItem({
          text: 'Бюджетные обязательства',
          icon: <BudgetaryCommitmentsIcon/>,
          itemLocationPath: Path.BUDGETARY_COMMITMENTS,
        })}
        {getNavItem({
          text: 'Реестры зачислений',
          icon: <RegistersIcon/>,
          itemLocationPath: Path.REGISTERS,
        })}
        {getNavItem({
          text: 'Справочники',
          icon: <NotebooksIcon/>,
          itemWithSubmenuConfig: {
            parentDirectoryLocation: '/handbooks/',
            submenuItems: [{ text: 'Настройки', itemLocationPath: Path.HANDBOOKS_SETTINGS}]
          }
        })}
      </div>
    </nav>
  );
};

export default React.memo(Sidebar);

