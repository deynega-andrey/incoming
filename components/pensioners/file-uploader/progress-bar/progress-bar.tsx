import React from 'react';
import {ReactComponent as SmallCrossIcon} from '../../../../assets/icons/cross-small.svg';
import {ReactComponent as ErrorIcon} from '../../../../assets/icons/error-icon.svg';
import {BtnWithIcon} from '../../../common/btn-with-icon/btn-with-icon';
import './progress-bar.scss';

export const ProgressBar = React.memo((props:{[key: string]: any}):JSX.Element => {
  const {fileData, removeFileFromTransferData, getErrorMessage} = props;
  return (
    <div className="progress-bar">
      <div className="progress-bar__item-body">
        {fileData.progress >= 0 && !fileData.errors && <div className="progress-bar__load-progress" style={{width: `${fileData.progress}%`}}></div>}
        <div className="progress-bar__file-name">{fileData.name ? fileData.name : fileData.file.name}</div>
        {fileData.errors && <ErrorIcon className="progress-bar__error-icon" />}
        {!fileData.loaded && <BtnWithIcon
          icon={<SmallCrossIcon/>}
          additionalCSSCls={'button-with-icon--primary progress-bar__item-remove-btn'}
          callback={() => {removeFileFromTransferData(fileData.name ? fileData.name : fileData.file.name)}}
        />}
      </div>
      {fileData.errors && <div className="file-uploader__error-message">{getErrorMessage(fileData.errors[0].code)}</div>}
    </div>
  );
});