import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useTheme } from 'hooks/useTheme';
import containerStyles from '../styles/containers.css';
import { config } from 'providers/config';
import useAxios from 'hooks/useAxios';
import useApi from '../api';

const api = config.siteConfig.apiUrl;

const ImageInput = ({
  name,
  label,
  message,
  value,
  onChange,
  limitMB,
  id,
  ...otherProps
}) => {
  const { get } = useAxios();
  const inputFileRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const { currentTheme } = useTheme();
  const [cardImage, setCardImage] = useState(
    `${api}/userImages/user_${id}.png`
  );
  const { getProfilePhoto, getMyInfo, updateMyInfo, resetPassword, updateUser, getFile, doPut, doGet } = useApi();
  var imageUrl = 0;

  useEffect(() => {
    //(async () => {
      // console.log("is",id)
      // imageUrl = await getProfilePhoto(id);
      //let imageUrl = await get(`/userImages/user_${5}.png`);

      if (value && imageRef.current) {
        let reader = new FileReader();

        reader.onload = (e) => {
          if (imageRef.current) imageRef.current.src = e.target.result;
        };

        reader.readAsDataURL(value);
      }
    //})();
  }, [value]);

  const openFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const onErrorImage = () => {
    setCardImage(`${api}/profilePhotos/default.png`);
  };

  //<img onError={onErrorImage} src={cardImage} />

  const styles = css`
    ${containerStyles()}
    .text {
      color: ${currentTheme.texts};
      font-size: 0.85rem;
    }
    .label {
      margin-top: '0px;
      text-align: 'left';
      font: normal normal normal 21px Roboto;
      letter-spacing: '0px';
      color: #007CBA;
      opacity: 1;
    }
    .legend {
      right: 34px;
      font-size: 0.65rem;
      opacity: 0.8;
    }

    .subtitle {
      margin-top: 4px;
      margin-right: 150px;
      text-align: left;
      font: normal normal normal 16px Roboto;
      letter-spacing: 0px;
      color: #FFFFFF80;
      opacity: 1;
    }

    .container-image {
      display: flex;
      justify-content: center;
      align-items: center;
      //overflow: hidden;
      width: 70px;
      height: 70px;
      position: relative;
      background-color: ${currentTheme.button};
      border-radius: 8px;
      overflow: hidden;
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

    @media screen and (min-width: 100px) {
      .container-image {
        width: 110px;
        height: 110px;
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
        {...otherProps}
        onChange={onChange}
      />
      <div className="row">
        <label className="text label" htmlFor={name}>
          {label}
        </label>
      </div>
      <div className="row">
        <label className="subtitle" htmlFor={name}>
          Selecciona una imagen con máximo 5 MB de peso.
        </label>
      </div>
      <div className="row">
        <div className="col-4" style={{ paddingLeft: 0 }}>
          <div className="container-image">
            <img ref={imageRef} className="img-fluid" alt="user" />
            {/* <img onError={onErrorImage} src={imageUrl.name} className="img-fluid"/> */}
          </div>
          <button onClick={openFile} className="camera-button">
            <CameraAltIcon />
          </button>
        </div>
        {/* <div className="col-7">
          <div className="flex start">
            <label className="text legend">
              {value ? value.name : 'Ningún archivo seleccionado'}
            </label>
          </div>
          <div className="flex start pt-2">
            <label className="text legend">Máx. {limitMB || 5} MB</label>
          </div>
          <div className="flex start">
            {message ? <label className="text legend">{message}</label> : null}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ImageInput;
