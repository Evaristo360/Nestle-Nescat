/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, useEffect } from 'react';
import { accountCard, accountCardUser } from '../styles/AccountCard.css';
import editIcon from 'assets/icons/edit.svg';
import editIconActive from 'assets/icons/editOn.svg';
import deleteIcon from 'assets/icons/icono_eliminar.svg';
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

const AccountCard = (props) => {
  const intl = useIntl();
  //User status
  const [status, setStatus] = useState(props.clientInfo.is_active);
  const [editIconSel, setEditIconSel] = useState(editIcon);
  const [optionsShow, setOptionsShow] = useState(false);
  const { showModal, setShowModal } = useContext(UpdatePasswordContext);
  const { showDeleteModal, setShowDeleteModal } = useContext(DeleteUserContext);
  const {userEdit, setUserEdit} = useContext(EditUserContext);
  let lastLogin = moment(props.clientInfo.last_login).format('DD-MM-YYYY');
  //console.log(lastLogin);
  //console.log(props.clientInfo.last_login);
  let nowCondition = moment().diff(moment(lastLogin), 'h');
  //console.log(nowCondition);
  // let lastLoginMessage =  nowCondition > 10 ? lastLogin.format('DD-MM-YYYY') : intl.formatMessage(messages.now)

  async function changeStatus() {
    let response = await put('/clients', {
      id: props.clientInfo.id,
      is_active: status ? 'false' : 'true'
    });

    setStatus(!status);
  }

  const [cardImage, setCardImage] = useState(
    api + '/' + props.clientInfo.image_url
  );
  const [cardImageClient, setCardImageClient] = useState(
    api + '/' + props.clientInfo.image_url
  );

  const onErrorImage = () => {
    setCardImage(`${api}/userImages/default.png`);
    setCardImageClient(`${api}/userImages/default.png`);
  };

  return (
    <>
      {/*This distintion if for showing the type of card depending on the section that is consulted*/}
      {props.type === 'user' ? (
        <div css={accountCardUser()}>
          <div id="top">
            <p className="rolUser">
              {intl.formatMessage(messages.lastAccess)}
            </p>{' '}
            <p className="lastAcces">{lastLogin}</p>
          </div>
          <div id="bottom">
            <div id="leftInfo">
              <p id="name">{props.clientInfo.name}</p>
              <p id="email">{props.clientInfo.email}</p>
              {props.clientInfo.role_name === 'employee' ? (
                <p className="greyText" id="date">
                  {intl.formatMessage(messages.operator)}
                </p>
              ) : null}
            </div>
            <div id="rightImages">
              <div id="topImage">
                <img onError={onErrorImage} src={cardImage} />
              </div>
            </div>
          </div>
          <div className="bottoms">
            <div className="row">
              <div className="col-9">
                <p className="rolUser">{intl.formatMessage(messages.user)} {intl.formatMessage(messages[props.clientInfo.role_id])}</p>{' '}
              </div>
              <div id="icons" className="row">
                <div className="col-1">
                  <img
                    src={editIconSel}
                    onMouseOver={() => setEditIconSel(editIconActive)}
                    onMouseOut={() => setEditIconSel(editIcon)}
                    onClick={
                      props.onClick
                    }
                  />
                </div>
                <div className="col-1">
                  <img
                    src={deleteIcon}
                    // onClick={() =>
                    //   setShowDeleteModal({
                    //     show: true,
                    //     userId: props.clientInfo.id
                    //   })
                    // }
                    onClick={
                      props.onClickDelete
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        //CLIENTS card
        <div css={accountCard()}>
          <div id="leftInfo">
            <div id="status">
              <p className="greyText">{intl.formatMessage(messages.status)}</p>{' '}
              {status ? (
                <p className="activeColor">
                  {intl.formatMessage(messages.active)}
                </p>
              ) : (
                <p className="activeColor">
                  {intl.formatMessage(messages.inactive)}
                </p>
              )}
            </div>
            <p id="id">
              {intl.formatMessage(messages.id)}
              {props.clientInfo.id}
            </p>
            <p id="name">{props.clientInfo.buisness_name}</p>
            <p id="email">{props.clientInfo.email}</p>
            <p className="greyText" id="date">
              {intl.formatMessage(messages.activation)}{' '}
              {moment(props.clientInfo.activation_date).format('DD/MM/YYYY')}
            </p>
          </div>
          <div id="rightImages">
            <div id="topImage">
              <img onError={onErrorImage} src={cardImageClient} />
            </div>
            <a id="circles" onClick={() => setOptionsShow(!optionsShow)}>
              <div className="circle" />
              <div className="circle" />
              <div className="circle" />
            </a>
          </div>
          {/* Condition to show the options of the user card when selecting the dots */}
          {optionsShow ? (
            <div id="accountOptions">
              <ul>
                <Link to={`/client/edit/${props.clientInfo.id}`}>
                  <li
                    onClick={() => {
                      setOptionsShow(!optionsShow);
                    }}
                  >
                    {intl.formatMessage(messages.edition)}
                  </li>
                </Link>
                <li
                  onClick={() => {
                    changeStatus();
                    setOptionsShow(!optionsShow);
                  }}
                >
                  {intl.formatMessage(messages.changeStatus)}
                </li>
                <li
                  onClick={() => {
                    setShowModal({ show: true, userId: props.clientInfo.id });
                    setOptionsShow(!optionsShow);
                  }}
                >
                  {intl.formatMessage(messages.updatePass)}
                </li>
              </ul>
            </div>
          ) : null}

          {/* Condition to show the UpdatePassword modal */}
        </div>
      )}
    </>
  );
};

export default AccountCard;
