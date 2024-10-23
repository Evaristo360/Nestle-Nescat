import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Button from '../Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useTheme } from 'hooks/useTheme';
import containerStyles from '../styles/containers.css';
import { BorderTop } from '@material-ui/icons';
import ProductIcon from 'assets/ProductIcon.png';
import Dark_ProductIcon from 'assets/Dark_ProductIcon.png';
import { divide } from 'lodash';

const ProductImageInput = ({
  showText = true,
  name,
  label,
  message,
  value,
  onChange,
  limitMB,
  edit,
  description,
  disabled,
  ...otherProps
}) => {
  const inputFileRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const { currentTheme, mode } = useTheme();
  const [newPic, setNewPic] = useState(false);
  const [pic, setPic] = useState(false);

  useEffect(() => {
    //console.log(value);
    if (description) {
      setPic(true);
    }

    if (edit) {
      setPic(true);
    }

    if (value && imageRef.current) {
      let reader = new FileReader();

      reader.onload = (e) => {
        if (imageRef.current) imageRef.current.src = e.target.result;
      };

      reader.readAsDataURL(value);
    }
  }, [value]);

  const openFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
      setNewPic(true);
    }
  };

  const handleChange = (event) => {
    onChange(event);
  }

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
      margin-top: 1rem;
      text-align: left;
      font: normal normal normal 16px Roboto;
      letter-spacing: 0px;
      color: #FFFFFF80;
      opacity: 1;
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
      text-align: center;
      font: normal normal normal 14px Roboto;
      letter-spacing: 0px;
      color: #FFFFFF;
      opacity: 1;
    }

    .container-image {
      display: flex;
      justify-content: center;
      align-items: center;
      //overflow: hidden;
      width: 180px;
      height: 180px;
      position: relative;
      background: #E1E1E11A 0% 0% no-repeat padding-box;
      border-radius: 8px;
      overflow: hidden;
      ${ description ? ('') : (disabled ? '' : 'cursor: pointer;')}
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

  return (
    <div className="container" css={styles}>
      <input
        ref={inputFileRef}
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        name={name}
        value=""
        {...otherProps}
        onChange={handleChange}
      />
      {showText?
        <div>
          <div className="row">
            <label className="text label" htmlFor={name}>
              {label}
            </label>
          </div>
          <div className="row">
            {description ? null : ( disabled ? null :
              <label className="subtitle" htmlFor={name}>
                {
                  'Selecciona la imagen del producto que se visualizará en los dispositivos tótem y digital display.'
                }
              </label>
            )}
          </div>
          <div className="row">
            {description ? null : ( disabled ? null :
              <label className="subtitle" htmlFor={name}>
                {
                  'Recuerda que la imagen debe ser en formato PNG, con resolución mínima de 800 x 600 y debe pesar máximo 5MB.'
                }
              </label>
            )}
          </div>
        </div>
      :
      null}
      
      <div className="row">
        <label className="subsubtitle">
          {value && (value.name !== "default.png") ? value.name : 'No se ha seleccionado ningún archivo'}
        </label>
      </div>
      {/* <div className="row">
        <label className="subtitle" htmlFor={name}>
          Selecciona una imagen con máximo 5 MB de peso.
        </label>
      </div> */}
      <div className="row">
        <div className="col-4" style={{ paddingLeft: 0 }}>
          {description ? (
            <div className="container-image">
              {newPic ? (
                <img ref={imageRef} className="img-fluid" alt="product" />
              ) : pic ? (
                <img src={value} className="img-fluid" alt="product" />
              ) : (
                <img src={mode !== 'dark' ? ProductIcon : Dark_ProductIcon} className="img-fluid" alt="product" />
              )}
            </div>
          ) : (
            <div className="container-image" onClick={disabled ? null : openFile}>
              {newPic ? (
                pic ? (
                  <img src={value ? ( value.type ? URL.createObjectURL(value) : value ) : (mode !== 'dark' ? ProductIcon : Dark_ProductIcon)} ref={imageRef} className="img-fluid" alt="product" />
                ) : (
                  <img src={mode !== 'dark' ? ProductIcon : Dark_ProductIcon} ref={imageRef} className="img-fluid" alt="product" />
                )
              ) : pic ? (
                <img src={value ? ( value.type ? URL.createObjectURL(value) : value ) : (mode !== 'dark' ? ProductIcon : Dark_ProductIcon)} className="img-fluid" alt="product" />
              ) : (
                <img src={mode !== 'dark' ? ProductIcon : Dark_ProductIcon} className="img-fluid" alt="product" />
              )}
            </div>
          )}
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
        </div>
        <div className="flex start">
          {message ? <label className="text legend">{message}</label> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductImageInput;
