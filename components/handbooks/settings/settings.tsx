import React, {useState} from 'react';
import {SectionHeading} from '../../common/section-heading/section-heading';
import {BtnWithIcon} from '../../common/btn-with-icon/btn-with-icon';
import {Modal, IWidthOption} from '../../common/modal/modal';
import {ReactComponent as SaveIcon} from '../../../assets/icons/save.svg';
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross.svg';
import {StaticNotification, Button} from '@openvtb/react-ui-kit/dist';
import './settings.scss';

export const HandbooksSettings = React.memo(() => {
  const [isInfoMessageShow, setInfoMessageShowState] = useState(false);
  const [isModalShowState, setModalShowState] = useState(true);
  return (
    <section className="settings">
      <div className="settings__header">
        <SectionHeading
          text={'Настройки'}
        />
        <div className="settings__action-btns-container">
          <BtnWithIcon
            disabledBtnsState={false} //
            callback={() => {setInfoMessageShowState(true)}} //
            icon={<SaveIcon/>}
            btnText={'Сохранить'}
            additionalCSSCls={'button-with-icon--primary'}
          />
          <BtnWithIcon
            disabledBtnsState={false} //
            callback={() => {}} //
            icon={<CrossIcon/>}
            btnText={'Отменить'}
            additionalCSSCls={'button-with-icon--primary'}
          />
        </div>
      </div>

      <div className="settings__fields-container">
        <label className="settings__field-item">
          <div className="settings__field-description">URL директории выгрузки отчётов</div>
          <input type="text" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">URL директории выгрузки исходящих файлов для ФССП</div>
          <input type="text" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">URL директории выгрузки незагруженных файлов от ФССП</div>
          <input type="text" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">URL директории загрузки входящих файлов от ФССП</div>
          <input type="text" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">Тариф на вознаграждение ВТБ, %</div>
          <input type="number" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">Тариф Почты России на перевод без уведомления, %</div>
          <input type="number" className="settings__input"/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">Тариф Почты России на перевод без уведомления, мин. руб.</div>
          <input type="number" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">Тариф Почты России на перевод с уведомлением</div>
          <input type="number" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">Тариф Почты России на перевод с уведомлением, мин. руб.</div>
          <input type="number" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">Тариф Почты России на перевод с доставкой на дом</div>
          <input type="number" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">Тариф Почты России на перевод с доставкой на дом, мин. руб.</div>
          <input type="number" className="settings__input" readOnly/>
        </label>
        <label className="settings__field-item">
          <div className="settings__field-description">Тариф Почты России на возврат</div>
          <input type="number" className="settings__input" readOnly/>
        </label>
      </div>

      {
        isInfoMessageShow && <div className="info-message-wrapper">
          <StaticNotification
            kind={'success'}
          >
            Данные обновлены
          </StaticNotification>
        </div>
      }
      {
        isModalShowState && <Modal
          widthOption={IWidthOption.SMALL}
          headingText={"Изменение данных"}
          content={
          <div>
            <div className="modal__description">
              Вы покидаете раздел не сохранив новые данные.
              Сохранить изменения?
            </div>
            <div className="modal__btns-container">
              <Button
                kind="secondary"
                size="small"
                onClick={() => setModalShowState(false)}
              >
                Не сохранять
              </Button>
              <Button
                kind="primary"
                size="small"
                onClick={() => {setModalShowState(false)}}
                className="modal__btn"
              >
                Сохранить и выйти
              </Button>
            </div>
          </div>}
          state={isModalShowState}
          setState={setModalShowState}
        />
      }
    </section>
  );
});