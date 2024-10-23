import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Button from '../Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useTheme } from 'hooks/useTheme';
import containerStyles from '../styles/containers.css';
import { BorderTop } from '@material-ui/icons';
import UserDrawer from 'assets/svg/Icon awesome-user-alt.svg';
import { divide } from 'lodash';

const UserImageInput = ({
  name,
  label,
  message,
  value,
  onChange,
  limitMB,
  edit,
  noPic = false,
  ...otherProps
}) => {
  const inputFileRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const { currentTheme } = useTheme();
  const [newPic, setNewPic] = useState(false);

  useEffect(() => {
    //console.log(value.name);
    //console.log(value.size);
    if (!noPic) {
      if (edit) {
        setNewPic(true);
      }

      if (value && imageRef.current) {
        let reader = new FileReader();

        reader.onload = (e) => {
          if (imageRef.current) imageRef.current.src = e.target.result;
        };

        reader.readAsDataURL(value);
      }
    }
  }, [value]);

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, []);

  const openFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const styles = css`
    ${containerStyles()}
    .text {
      color: ${currentTheme.texts};
      font-size: 0.85rem;
    }
    .label {
      margin-top: 10px;
      text-align: left;
      font: normal normal normal 21px Roboto;
      letter-spacing: 0px;
      color: #007CBA;
      opacity: 1;
    }
    .legend {
      right: 34px;
      font-size: 0.65rem;
      opacity: 0.8;
    }

    .subtitle {
      margin-top: 1rem;
      text-align: left;
      font: normal normal normal 16px Roboto;
      letter-spacing: 0px;
      color: #FFFFFF80;
      opacity: 1;
      
    }

    .subsubtitle {
      margin-top: 1rem;
      text-align: left;
      font: normal normal normal 16px Roboto;
      letter-spacing: 0px;
      color: #FCFCFC80;
      opacity: 1;
    }

    .container-image {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      //overflow: hidden;
      width: 170px;
      height: 164px;
      position: relative;
      background: #E1E1E11A 0% 0% no-repeat padding-box;
      border-radius: 8px;
      overflow: hidden;
    }
    .container-image:hover .container-text {
      display: flex;
      transition-delay: 3s;
    }
    .container-text {
      display: none;
      text-align: left;
      font: normal normal normal 16px Roboto;
      letter-spacing: 0px;
      color: #FFFFFF;
      transition 0s display;
    }
    .camera-button {
      position: absolute;
      top: 85px;
      right: 60px;
      left: 90px;
      width: 30px;
      height: 30px;
      border: none;
      background: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 !important;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  `;

  const handleChangeImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      onChange(event);
      setNewPic(true);
    }
  };

  return (
    <div className="container" css={styles}>
      <input
        ref={inputFileRef}
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        name={name}
        {...otherProps}
        onChange={handleChangeImage}
      />
      <div className="row">
        <label className="text label" htmlFor={name}>
          {label}
        </label>
      </div>
      <div className="row">
        <label className="subtitle" htmlFor={name}>
          {'Selecciona una imagen con máximo 5 MB de peso.'}
        </label>
        <label className="subtitle" htmlFor={name}>
          {message}
        </label>
      </div>
      {/* <div className="row">
        <label className="subsubtitle">
          {value && (value.name !== "default.png") ? value.name : 'No se ha seleccionado ningún archivo'}
        </label>
      </div> */}
      {/* <div className="row">
        <label className="subtitle" htmlFor={name}>
          Selecciona una imagen con máximo 5 MB de peso.
        </label>
      </div> */}
      <div className="row">
        <div className="col-4" style={{ paddingLeft: 0 }}>
          <div className="container-image" onClick={openFile}>
            {newPic ? (
              value ? (
                <img ref={imageRef} className="img-fluid" alt="product" />
              ) : (
                <img
                  ref={imageRef}
                  src={UserDrawer}
                  className="img-fluid"
                  alt="product"
                />
              )
            ) : (
              <img
                ref={imageRef}
                src={UserDrawer}
                className="img-fluid"
                alt="product"
              />
            )}
            <div className="row">
              <label className="container-text" htmlFor={name}>
                {'Subir imagen'}
              </label>
            </div>
          </div>
          {/* <button className="camera-button">
            <img src={ProductIcon} alt="my image" onClick={openFile} />
          </button> */}
        </div>
        <div className="col-7">
          {/* <div className="flex start">
            <label className="text legend">
              {value ? value.name : 'Ningún archivo seleccionado'}
            </label>
          </div>
          <div className="flex start pt-2">
            <label className="text legend">Máx. {limitMB || 5} MB</label>
          </div> */}
          {/* <div className="flex start">
            {message ? <label className="text legend">{message}</label> : null}
          </div> */}
        </div>
      </div>
      <div className="row">
        <label className="subsubtitle">
          {value && value.name !== 'default.png'
            ? value.name
            : 'No se ha seleccionado ningún archivo'}
        </label>
      </div>
    </div>
  );
};

export default UserImageInput;
