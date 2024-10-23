import { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import { errorTranslate } from '../utils.js';
import { createIntl, createIntlCache } from 'react-intl';
import { messagesintl } from '../../messages';
import Spanish from 'translations/es-mx.json'; //your messages translated with id

const cache = createIntlCache();
const intlExt = createIntl({ locale: 'es-MX', messages: Spanish }, cache); //locale and message can come from Redux or regular import

const fieldsEmptyValidation = ['email', 'name', 'phone'];

const useHandleData = (initialData, id, updatePermsOptions) => {
  const [data, updateData] = useState(initialData);
  var axios = useAxios();

  useEffect(async () => {
    if (id !== undefined) {
      try {
        let {
          data: { result }
        } = await axios.get(`/users/${id}`);
        var newPerms = [];
        var newData = {
          email: result.email,
          phone: result.phone,
          name: result.name,
          perms: data.perms.map((perm) => ({
            name: perm.name,
            checked: result[perm.name] == 1 ? true : false
          }))
        };

        // eslint-disable-next-line no-unused-expressions
        result.client_advertisements == 1
          ? newPerms.push({
              label: intlExt.formatMessage(messagesintl.advertisement),
              disabled: false,
              name: 'advertisements'
            })
          : null;
        // eslint-disable-next-line no-unused-expressions
        result.client_surveys == 1
          ? newPerms.push({
              label: intlExt.formatMessage(messagesintl.surveys),
              disabled: false,
              name: 'surveys'
            })
          : null;
        newPerms.push({
          label: intlExt.formatMessage(messagesintl.management),
          disabled: false,
          name: 'management'
        });
        updatePermsOptions(newPerms);
        try {
          let response = await axios.get(`/profilePhotos/user_${id}.png`, {
            responseType: 'blob'
          });

          if (response.data) {
            var img = new File([response.data], `user_${id}.png`);
            var url = window.URL.createObjectURL(img);
            var name = img.name;
            var size = `${img.size} bytes`;

            newData.photo = { name: name, url: url, size: size, file: img };
            updateData({
              ...data,
              ...newData
            });
          } else {
            // eslint-disable-next-line no-unused-expressions
            null;
          }
        } catch (err) {
          try {
            let response = await axios.get(`/profilePhotos/default.png`, {
              responseType: 'blob'
            });

            if (response.data) {
              var img = new File([response.data], `user_default.png`);
              var url = window.URL.createObjectURL(img);
              var name = img.name;
              var size = `${img.size} bytes`;

              newData.photo = { name: name, url: url, size: size, file: img };
              updateData({
                ...data,
                ...newData
              });
            } else {
              updateData({
                ...data,
                ...newData
              });
            }
          } catch (err) {
            var message = errorTranslate('/users', err);

            //console.log(message);
          }
        }
      } catch (err) {
        var message = errorTranslate('/users', err);

        //console.log(message);
      }
    }
  }, []);

  const saveData = async function (updateAlert) {
    var newData = new FormData();

    newData.append('id', id);
    fieldsEmptyValidation.forEach((field) => {
      // eslint-disable-next-line no-unused-expressions
      data[field] != '' ? newData.append(field, data[field]) : null;
    });
    // eslint-disable-next-line no-unused-expressions
    data.photo.name != 'user_default.png'
      ? newData.append('photo', data.photo.file)
      : null;
    data.perms.forEach((perm) => {
      newData.append(perm.name, perm.checked);
    });
    try {
      let {
        data: { result }
      } = await axios.put('/users', newData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      updateAlert({
        isVisible: true,
        message: intlExt.formatMessage(messagesintl.successEdit)
      });
    } catch (err) {
      var message = errorTranslate('/users', err);

      //console.log(message);
      updateAlert({ isVisible: true, message: message });
    }
  };

  return [data, updateData, saveData];
};

export default useHandleData;
