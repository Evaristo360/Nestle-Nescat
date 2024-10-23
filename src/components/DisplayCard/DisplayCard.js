/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, useEffect } from 'react';
import { displayCard, displayCardUser } from '../styles/DisplayCard.css.js';
import editIcon from 'assets/icons/edit.svg';
import editIconActive from 'assets/icons/editOn.svg';
import deleteIcon from 'assets/icons/icono_eliminar.svg';
import statusIcon from 'assets/digitalDisplay/Icon material-network-cell.svg';
import digitalDisplayIcon from 'assets/digitalDisplay/icono.svg';
import totemIcon from 'assets/totems/icono.svg';

import moment from 'moment';
import useAxios from 'hooks/useAxios';
import { Link } from 'react-router-dom';
// import { api } from '../../env';
import { config } from 'providers/config';
import { useIntl } from 'react-intl';
import { messages } from './messages';
import { DeleteUserContext } from 'components/DeleteUser/hooks/DeleteUserContext';
import { UpdatePasswordContext } from 'components/UpdatePassword/hooks/UpdatePasswordContext';
import { EditUserContext } from 'views/Users/UserEdit/hooks/EditUserContext';

const { get } = useAxios();
const { put } = useAxios();
const api = config.siteConfig.apiUrl;

const DisplayCard = (props) => {
  //console.log('props data', props);
  const intl = useIntl();
  //User status
  const [status, setStatus] = useState(props.clientInfo.is_active);
  const [editIconSel, setEditIconSel] = useState(editIcon);
  const [optionsShow, setOptionsShow] = useState(false);
  const { showModal, setShowModal } = useContext(UpdatePasswordContext);
  const { showDeleteModal, setShowDeleteModal } = useContext(DeleteUserContext);
  const { userEdit, setUserEdit } = useContext(EditUserContext);

  async function changeStatus() {
    let response = await put('/clients', {
      id: props.clientInfo.id,
      is_active: status ? 'false' : 'true'
    });

    setStatus(!status);
  }

  const [cardImage, setCardImage] = useState(
    `${api}/userImages/user_${props.clientInfo.id}.png`
  );
  const [cardImageClient, setCardImageClient] = useState(
    `${api}/userImages/user_${props.clientInfo.id}.png`
  );

  const onErrorImage = () => {
    setCardImage(`${api}/profilePhotos/default.png`);
    setCardImageClient(`${api}/profilePhotos/default.png`);
  };

  return (
    <>
      <div
        onClick={() => props.onClickCard(props.clientInfo)}
        css={displayCardUser()}
      >
        {/* <div id="top">
            <p className="greyText">
              {intl.formatMessage(messages.lastAccess)}
            </p>{' '}
            <p className="lastAcces">{intl.formatMessage(messages.now)}</p>
          </div> */}
        <div id="bottom">
          <div id="leftInfo">
            <p id="nameLabel">Nombre:</p>
            <p id="name">{props.clientInfo.name}</p>
            {props.clientInfo.is_assigned === 1 || props.clientInfo.branch_name !== undefined ? (
              <>
                <br />
                <p id="nameLabel">Sucursal:</p>
                <p id="sucursal">{props.clientInfo.branch_name}</p>
              </>
            ) : null}
          </div>
          <div id="rightImages">
            <div id="topImage">
              {props.typeCard === "true" ?
                <img src={totemIcon} /> :
                <img src={digitalDisplayIcon} />
              }
            </div>
          </div>
        </div>
        <hr className="new2" />
        <div id="top">
          <div className="row">
            {props.typeView === "totem" ?
              <div className="col-md-4">
                {props.clientInfo.floor_totem ?
                  <div style={{ textAlign: 'left', font: 'normal normal normal 10px/18px Roboto', letterSpacing: '0px', color: '#007CBA', opacity: 1 }}>Tótem de piso</div> :
                  <div style={{ textAlign: 'left', font: 'normal normal normal 10px/18px Roboto', letterSpacing: '0px', color: '#007CBA', opacity: 1 }}>Mini tótem</div>
                }
              </div> : null
            }
            <div className="col-md-1">
              <img onError={onErrorImage} src={statusIcon} />
            </div>
            <div className="col-md-2">
              <div style={{ marginTop: '4px', color: '#63513D80' }}>Status</div>
            </div>
            <div className="col-md-3">
              <div style={{ marginTop: '4px', color: '#007CBA' }}>
                {props.clientInfo.state === 1 ? 'On-line' : 'Off-line'}
              </div>
            </div>
          </div>
          {/* <p className="greyText">
          </p>{' '} */}
        </div>
      </div>
    </>
  );
};

export default DisplayCard;
