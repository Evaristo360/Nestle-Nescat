/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from 'react';
import { userEditStyle } from './styles';
import { useParams } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import Input from '../UserCreate/components/Input';
import CheckboxGroup from '../UserCreate/components/CheckboxGroup';
import Alert from 'components//ModalSimpleAccept';
import useHandleData from './hooks/useHandleData';
import useValidation from './hooks/useValidation';
import { checkboxOptions, initialData } from './data';
import {
  createFileTypeValidation,
  createMaxFileSizeValidation,
  isValidEmail,
  hasOnlyLetters,
  isValidPhone
} from './validation';
import _ from 'lodash-es';

import { useIntl } from 'react-intl';
import { messagesintl } from '../messages';
import { createIntl, createIntlCache } from 'react-intl';
import Spanish from 'translations/es-mx.json';

const fileTypeValidation = createFileTypeValidation(['.jpg', '.png', '.jpeg']);
const fileSizeValidation = createMaxFileSizeValidation(5); //your messages translated with id

const cache = createIntlCache();
const intlExt = createIntl({ locale: 'es-MX', messages: Spanish }, cache); //locale and message can come from Redux or regular import

const msgs = {
  required: intlExt.formatMessage(messagesintl.required),
  minLength: (l, type = 'números') =>
    `${intlExt.formatMessage(messagesintl.required)} ${l} ${type}`,
  invalidEmail: intlExt.formatMessage(messagesintl.invalidEmail),
  invalidWord: intlExt.formatMessage(messagesintl.onlyLetters),
  invalidPhone: intlExt.formatMessage(messagesintl.onlyNumbers)
};

const initMessages = {
  name: '',
  email: '',
  phone: ''
};

function UserEdit() {
  const intl = useIntl();
  const { id } = useParams();
  const [permsOptions, updatePermsOptions] = useState(checkboxOptions);
  const [data, updateData, saveData] = useHandleData(
    initialData,
    id,
    updatePermsOptions
  );
  const [alert, updateAlert] = useState({ isVisible: false, message: '' });
  const [dataValidation, validateData] = useValidation();
  const [messages, setMessages] = useState(initMessages);
  const setMessage = (name, msg) =>
    setMessages((messages) => ({ ...messages, [name]: msg }));
  const fileLoader = useRef();

  const dataValid = isDataValid();

  function isDataValid() {
    const inputs = Object.keys(dataValidation);
    let isValid = true;

    inputs.forEach((input) => {
      if (dataValidation[input] == false) {
        isValid = false;
      }
    });

    return isValid;
  }

  function onTextChange(e) {
    const target = e.target;

    validateData(target.value, target.name);
    if (target.value.length == 0) {
      setMessage(target.name, msgs.required);
    } else if (_.get(messages, target.name, '') == msgs.required) {
      setMessage(target.name, '');
    } else {
      // eslint-disable-next-line default-case
      switch (target.name) {
        case 'name':
          setMessage(
            target.name,
            !hasOnlyLetters(target.value) ? msgs.invalidWord : ''
          );
          break;
        case 'email':
          setMessage(
            target.name,
            !isValidEmail(target.value) ? msgs.invalidEmail : ''
          );
          break;
        case 'phone':
          let msg = '';

          if (target.value.length < 10) {
            msg = msgs.minLength(10);
          }

          if (!isValidPhone(target.value)) {
            msg = msgs.invalidPhone;
          }

          setMessage(target.name, msg);
          break;
      }
    }

    updateData({
      ...data,
      [target.name]: target.value
    });
  }

  function onChangeLogo(e) {
    var file = e.target.files[0];
    var url = window.URL.createObjectURL(new Blob([file]));
    var name = file.name;
    var isValidSize = fileSizeValidation.func(file);
    var isValidType = fileTypeValidation.func(file);
    var size = `${file.size} bytes`;
    var message = '';

    if (!isValidSize) {
      message = fileSizeValidation.msg;
    } else if (!isValidType) {
      message = fileTypeValidation.msg;
    }

    updateData({
      ...data,
      photo: { name: name, url: url, size: size, file: file, message }
    });
  }

  function onLoadLogo(e) {
    fileLoader.current.click();
    e.preventDefault();
  }

  function onChangeCheckBox(e) {
    var newPerms = data.perms.map((perm) => ({
      name: perm.name,
      checked: perm.name == e.target.name ? !perm.checked : perm.checked
    }));

    updateData({
      ...data,
      perms: newPerms
    });
  }

  function editUser(e) {
    saveData(updateAlert, id);
    e.preventDefault(e);
  }

  const validForm = dataValid && !data.photo.message;

  return (
    <section css={userEditStyle()}>
      <PageHeader
        title={intl.formatMessage(messagesintl.titleEdit)}
        to="/users/list"
      />
      <div className="subtitle">
        {intl.formatMessage(messagesintl.userData)}
      </div>
      <div className="content">
        <form className="form">
          <div className="cl-1">
            <div className="logo">
              <input
                type="file"
                ref={fileLoader}
                name="logo"
                onChange={onChangeLogo}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <label className="label">
                {intl.formatMessage(messagesintl.userImage)}
              </label>
              <div className="logo-content">
                <img className="img-container" src={data.photo.url} />
                <div className="info">
                  <span className="description">{data.photo.name}</span>
                  <div className="button-container">
                    <button className="button" onClick={onLoadLogo}>
                      {intl.formatMessage(messagesintl.chooseFile)}
                    </button>
                  </div>
                  <span className="description">
                    {intl.formatMessage(messagesintl.maxSize)}
                  </span>
                  <span className="description">{data.photo.message}</span>
                </div>
              </div>
            </div>
            <div className="name">
              <Input
                label={intl.formatMessage(messagesintl.fullName)}
                placeholder={intl.formatMessage(messagesintl.inputName)}
                name="name"
                onChange={onTextChange}
                value={data.name}
                message={_.get(messages, 'name', '')}
              />
            </div>
            <div className="email">
              <Input
                label={intl.formatMessage(messagesintl.email)}
                placeholder={intl.formatMessage(messagesintl.emailPH)}
                name="email"
                onChange={onTextChange}
                value={data.email}
                message={_.get(messages, 'email', '')}
              />
            </div>
            <div className="phone">
              <Input
                label={intl.formatMessage(messagesintl.phone)}
                placeholder={intl.formatMessage(messagesintl.phonePH)}
                name="phone"
                onChange={onTextChange}
                value={data.phone}
                message={_.get(messages, 'phone', '')}
              />
            </div>
          </div>
          <div className="cl-2">
            <div className="rol">
              <span className="description">
                {intl.formatMessage(messagesintl.role)}
              </span>
              <span className="value">{data.rol}</span>
            </div>
            <div className="perms">
              <CheckboxGroup
                label={intl.formatMessage(messagesintl.perms)}
                subLabel={intl.formatMessage(messagesintl.permsPH)}
                values={data.perms}
                options={permsOptions}
                onCheck={onChangeCheckBox}
              />
            </div>
          </div>
          <div className="send-container">
            <button
              className={`send-button ${validForm ? '' : 'deactive'}`}
              onClick={validForm ? editUser : (e) => e.preventDefault()}
            >
              {intl.formatMessage(messagesintl.update)}
            </button>
          </div>
        </form>
      </div>
      <Alert
        visible={alert.isVisible}
        onClose={() => updateAlert({ ...alert, isVisible: false })}
      >
        <div className="alert-text">{alert.message}</div>
        <button
          onClick={() => updateAlert({ ...alert, isVisible: false })}
          className="alert-cancel-button"
        >
          {intl.formatMessage(messagesintl.accept)}
        </button>
      </Alert>
    </section>
  );
}

export default UserEdit;
