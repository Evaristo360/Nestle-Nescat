import { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import { errorTranslate } from '../utils.js';

const fieldsEmptyValidation = ['email', 'name', 'phone'];

const useHandleData = (initialData) => {
  const [data, updateData] = useState(initialData);
  //const [deletePerms, setDeletePerms] = useState(userPerms);

  const saveData = async function (updateAlert) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var axios = useAxios();
    var newData = new FormData();

    fieldsEmptyValidation.forEach((field) => {
      // eslint-disable-next-line no-unused-expressions
      data[field] !== '' ? newData.append(field, data[field]) : null;
    });
    newData.append('role_id', data.role_id);
    // eslint-disable-next-line no-unused-expressions
    data.photo.name !== 'No ha seleccionado un archivo'
      ? newData.append('user_image', data.photo.file)
      : null;
    // console.log("before",data.perms);

    // for (var i = 0; i < deletePerms.length; i++) {
    //   let index;

    //   if((data.perms.find(deletePerms[i])) === deletePerms[i]){

    //     index = data.perms.indexOf(deletePerms[i]);

    //     if (index > -1) {
    //       data.perms.splice(index, 1);
    //     }
    //   }
    // }

    // console.log("after",data.perms);

    data.perms.forEach((perm) => {
      newData.append(perm.name, perm.checked);
    });

    // data.password = 'Rgn#28cdw';
    // newData.append('survey', true);
    // newData.append('advertisement', true);
    // newData.append('metric', true);
    // newData.append('management', true);
    // newData.append('password', data.password);
    try {
      let {
        data: { result }
      } = await axios.post('/users', newData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      updateAlert({ isVisible: true, message: 'Usuario creado con éxito' });
    } catch (err) {
      var message = errorTranslate('/users', err);
      console.log(err);
      console.log(err.message);

      updateAlert({ isVisible: true, message: message });
    }
  };

  return [data, updateData, saveData];
};

export default useHandleData;
