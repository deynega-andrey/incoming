import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import {ReactComponent as ClipIcon} from '../../../assets/icons/clip.svg';
import {ProgressBar} from './progress-bar/progress-bar';
import {sendFiles} from '../../../api/api-pensioners';
import axios from 'axios';
import './file-uploader.scss';

const MAX_SIZE_IN_BYTES = 500 * 1000;
const MAX_FILES_AMOUNT = 8;
const CancelToken = axios.CancelToken;

function getErrorMessage (code:string):string {
  switch (code) {
    case 'file-too-large':
      return 'Превышен допустимый размер файла';
    case 'too-many-files':
      return '';
    default:
      return code;
  }
}

export const ModalContent = React.memo(() => {
  const [loadedFiles, setLoadedFiles]:any = useState([]);
  let files:any = [];
  const removeFileFromTransferData = (fileName:string):void => {
    const currentFileData = loadedFiles.find((item:any): {[key:string]: any} | boolean | undefined => item.name === fileName || item.file.name === fileName);
    if (currentFileData.cancel) {
      currentFileData.cancel();
    };
    const resultTransferData = loadedFiles.slice().filter((item:any):boolean => {
      if (item.name) return (item.name !== fileName) ? true : false;
      return (item.file.name !== fileName) ? true : false;
    });
    setLoadedFiles(resultTransferData);
  };
  const onDrop = (acceptedFiles:any, rejectedFiles:any) => {
    const accepted = acceptedFiles.map((item:any) => {
      return item;
    });
    let rejected = [];
    if (rejectedFiles.length) {
      rejected = rejectedFiles.map((item:any) => {
        item.rejected = true;
        return item;
      });
      rejectedFiles.forEach((file:any) => {
        const reader = new FileReader();
        reader.onabort = () => {
          file.abouted = true;
        }
        reader.onerror = () => {
          file.error = true;
        }
      });
    }
    acceptedFiles.forEach((file:any, index:number) => {
      const reader = new FileReader();
      reader.onabort = () => {
        file.abouted = true;
      }
      reader.onerror = () => {
        file.error = true;
      }
      reader.onloadend = () => {
        const onUploadConfig = {
          cancelToken: new CancelToken(function executor(c) {
            file.cancel = c;
            files.splice(index, 1, file);
            setLoadedFiles(files.slice());
          }),
          onUploadProgress: (progressEvent:any) => {
            file.progress = (progressEvent.loaded / progressEvent.totalSize) * 100;
            files.splice(index, 1, file);
            setLoadedFiles(files.slice());
          }
        };
        const data = new FormData();
        data.append('Files', file, file.name);
        sendFiles(data, onUploadConfig)
        .then(() => {
          delete file.cancel;
          file.loaded = true;
          file.progress = 100;
          files.splice(index, 1, file);
          setLoadedFiles(files.slice());
        })
        .catch((error) => {
          delete file.cancel;
          if (error.message === undefined) {
            file.errors = [{code: `Вы отменили загрузку данного файла`}];
          } else file.errors = [{code: `Сервер ответил ошибкой ${error.message}`}];
          files.splice(index, 1, file);
          setLoadedFiles(files.slice());
        });
      }
      reader.readAsArrayBuffer(file);
    });
    files = accepted.concat(rejected);
    setLoadedFiles(files);
  };
  return (
    <div className="file-uploader">
      <div className="file-uploader__description-heading">Загрузите документы</div>
      <div className="file-uploader__description-text">Максимальный размер файла 500Kb. Максимальное количество файлов — 8.</div>
      <Dropzone 
        onDrop={onDrop}
        maxFiles={MAX_FILES_AMOUNT}
        maxSize={MAX_SIZE_IN_BYTES}
      >
        {({ getRootProps, getInputProps }) => (<div className="file-dropzone" {...getRootProps()}>
          <ClipIcon className="clip-icon"/>
          Перетащите файлы в эту область или нажмите для загрузки
          <input {...getInputProps()} className="file-input" type="file"  multiple/>
        </div>)}
      </Dropzone>
      {loadedFiles.length !== 0 && <div className="file-uploader__progress-bars-container">
        {
        loadedFiles.map((fileData:any) => <ProgressBar
          key={fileData.name ? fileData.name : fileData.file.name}
          fileData={fileData}
          removeFileFromTransferData={removeFileFromTransferData}
          getErrorMessage={getErrorMessage}
        />)
        }
        {
          loadedFiles.some((fileData:any):boolean => {
            let hasToManyFileError:boolean = false
            if (fileData.errors) {
              hasToManyFileError = fileData.errors.some((item:any) => item.code === 'too-many-files');
            }
            return hasToManyFileError;
          }) && <div className="file-uploader__error-message">Файлы не были загружены, так как превышен лимит количества загружаемых файлов</div>
        }
      </div>}
    </div>
  );
});
