import React from 'react';
import './modal-component.scss';
import {ReactComponent as CrossIcon} from '../../../assets/icons/cross.svg';
import {IModal} from '../../../utils/interfaces/interfaces';

const ModalComponent = ({setModal}: Partial<IModal>) => {
  const closedModal = () => setModal(null);
  return (
    <div className='app__modal-component'>
      <div className='app__notification'>
        <div className='app__notification-window'>
          <div className='app__notification-cross' onClick={closedModal}>
            <CrossIcon/>
          </div>
          <div className='app__notification-title'>Нотификация по реестру</div>
          <div className='app__notification-text'>
            <p className='app__notification-p'>Организация: ФССП 21-10-2020 Реестр 1 частично обработан</p>
            <p className='app__notification-p'>Иванов Иван Иванович ПД № 	1	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Петров Петр Петрович ПД № 	153	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Сидоров Сидор Сидорович ПД № 	25	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Амелин Тамерлан Алмазович ПД № 	36	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Евстигнеев Николай Николаевич ПД № 	48	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Топченко Василий Иванович ПД № 	96	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Ильина Анна Викторовна	ПД № 	12	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Васенко Ксения Сергеевна ПД № 	28	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Юрьева Дарья Владимировна ПД № 	36	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Жабченко Анна Дмитриевна ПД № 	17	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Организация: ФССП 21-10-2020 Реестр 1 частично обработан</p>
            <p className='app__notification-p'>Иванов Иван Иванович ПД № 	1	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Петров Петр Петрович ПД № 	153	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Сидоров Сидор Сидорович ПД № 	25	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Амелин Тамерлан Алмазович ПД № 	36	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Евстигнеев Николай Николаевич ПД № 	48	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Топченко Василий Иванович ПД № 	96	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Ильина Анна Викторовна	ПД № 	12	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Васенко Ксения Сергеевна ПД № 	28	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Юрьева Дарья Владимировна ПД № 	36	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Жабченко Анна Дмитриевна ПД № 	17	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Организация: ФССП 21-10-2020 Реестр 1 частично обработан</p>
            <p className='app__notification-p'>Иванов Иван Иванович ПД № 	1	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Петров Петр Петрович ПД № 	153	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Сидоров Сидор Сидорович ПД № 	25	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Амелин Тамерлан Алмазович ПД № 	36	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Евстигнеев Николай Николаевич ПД № 	48	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Топченко Василий Иванович ПД № 	96	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Ильина Анна Викторовна	ПД № 	12	Р/С	12345678912345678912	Исполнен</p>
            <p className='app__notification-p'>Васенко Ксения Сергеевна ПД № 	28	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Юрьева Дарья Владимировна ПД № 	36	Р/С	12345678912345678912	Отклонен	Р/С не найден</p>
            <p className='app__notification-p'>Жабченко Анна Дмитриевна ПД № 	17	Р/С	12345678912345678912	Исполнен</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent;