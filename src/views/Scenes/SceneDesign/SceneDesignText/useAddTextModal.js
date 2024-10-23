import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { doPost, doPatch } from 'hooks/useAxios';
import useAxios from 'hooks/useAxios';
import { config } from 'providers/config';

const addText = (data) => doPost(`/advertisements/text`, data);
const editText = (id, data) => doPatch(`/advertisements/text/${id}`, data);

const dateFormats = [
  'DD/MM/YYYY',
  'DD-MM-YYYY',
  'DD MM YYYY',
  'YYYY MM DD',
  'YYYY/MM/DD',
  'YYYY-MM-DD',
  'YYYY MM DD',
  'YY/MM/DD',
  'DD/MM/YY',
  'D/M/YY',
  'YYMMDD'
];

const effects = [
  'Ninguno',
  'Disolvencia de salida',
  'Marquesina izquierda',
  'Marquesina derecha',
  'Marquesina arriba',
  'Marquesina abajo'
];

const clockFormats = ['HH:MM', 'h:mm a', 'HH:MM A', 'HH:MM a'];

export const useAddTextModal = ({ onAccept, onClose, id, scene_id }) => {
  const isEdit = Boolean(id);
  const { get } = useAxios();

  const [clockValue, setClockValue] = useState(clockFormats[0]);
  const [dateValue, setDateValue] = useState(dateFormats[0]);
  const [selectedImage, setSelectedImage] = useState('Selecciona');
  const [content, setContent] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [durationValue, setDurationValue] = useState(0);
  const [openDuration, setOpenDuration] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState(effects[0]);
  const [velocityValue, setVelocityValue] = useState(0);
  const [bgColorValue, setbgColorValue] = useState('');
  const [showWarning, setShowWarning] = useState('');

  useEffect(() => {
    async function getAvailableImageList() {
      let response = await get('/advertisements?type=image');

      setLibrary(response.data.result.items);
    }

    getAvailableImageList();
  }, []);

  useEffect(() => {
    loadText(id);
  }, [isEdit]);

  const loadText = async (id) => {
    if (!id) return;
    try {
      const response = await get(`/advertisements/text/${id}`);
      const item = _.get(response, 'data.result.items[0]', {});

      setNameValue(item.name);
      setOpenDuration(item.set_duration);
      setDurationValue(item.duration);
      setContent(item.edit_window);
      setSelectedEffect(item.effect);
      setVelocityValue(item.speed || 0);
      setbgColorValue(item.colour_background);

      if (item.format_date) {
        const [dateValue, clockValue] = item.format_date.split('.');

        setDateValue(dateValue);
        setClockValue(clockValue);
      } else {
        console.error(
          'If you see this, comment backend developer (I need format_date property! please!)'
        );
      }
    } catch (error) {
      console.log({ error });
    }
  };

  function validation(type, value) {
    var regExp;

    if (type === 'hex') {
      regExp = new RegExp(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i);
    }

    if (!regExp.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  const saveData = () => {
    let validationsPass = true;

    if (clockValue == null) {
      setShowWarning('*Error: Introduzca una hora');
      validationsPass = false;
    }

    if (dateValue == null) {
      setShowWarning('*Error: Introduzca una fecha');
      validationsPass = false;
    }

    if (
      content === null ||
      content === '' ||
      content === '&nbsp' ||
      content === '<p><br></p>'
    ) {
      setShowWarning('*Error: El contenido no puede estar vacío');
      validationsPass = false;
    }

    if (nameValue === null || nameValue === '') {
      setShowWarning('*Error: El nombre no puede estar vacío');
      validationsPass = false;
    }

    if (openDuration) {
      if (durationValue == null || durationValue === 0) {
        setShowWarning('*Error: Introduzca una duración');
        validationsPass = false;
      }
    }

    if (selectedEffect !== 'Ninguno') {
      if (validation('hex', bgColorValue) === false) {
        setShowWarning(
          '*Error: Introduzca un color en formato Hexadecimal a 6 dígitos'
        );
        validationsPass = false;
      }

      if (bgColorValue == null) {
        setShowWarning('*Error: Campo color vacío');
        validationsPass = false;
      }
    }

    if (validationsPass) {
      setShowWarning('Datos guardados de manera éxitosa');

      let data = {
        scene_id,
        name: nameValue,
        set_duration: openDuration,
        effect: selectedEffect,
        format_date: `${dateValue}.${clockValue}`,
        edit_window: content
      };

      // data.speed = parseInt(velocityValue);
      data.scale_percentage = parseInt(velocityValue);
      data.colour_background = bgColorValue || '#FFFFFF';

      if (openDuration) {
        data.duration = parseInt(durationValue);
      }

      if (isEdit) {
        editText(id, data).then(({ result }) => {
          onAccept({ ...result.items[0], media_type: 'text', isEdit });
        });
      } else {
        addText(data).then(({ result }) => {
          onAccept({ ...result.items[0], media_type: 'text' });
        });
      }
    }
  };

  const [library, setLibrary] = useState([
    'imagen1.jpg',
    'imagen2.jpg',
    'imagen3.png',
    'imagen4.gif',
    'imagen5.jpg',
    'imagen6.png'
  ]);
  const [actualImageID, setActualImageID] = useState();

  const insertImage = () => {
    async function getImageFile() {
      var xhr = new XMLHttpRequest();

      xhr.open(
        'GET',
        `${config.siteConfig.apiUrl}/advertisement_file/image/${actualImageID.id}.${actualImageID.extension}`,
        true
      );
      xhr.responseType = 'blob';
      xhr.onload = function (e) {
        var reader = new FileReader();

        reader.onload = function (event) {
          var res = event.target.result;

          setContent(`${content}<img width="100px" src="${res}"/>`);
        };

        var file = this.response;

        reader.readAsDataURL(file);
      };

      xhr.send();
    }

    getImageFile();
  };

  const editor = useRef(null);

  const setContentJoddit = (newContent) => {
    setContent(newContent);
  };

  return {
    clockValue,
    setClockValue,
    dateValue,
    setDateValue,
    selectedImage,
    setSelectedImage,
    content,
    setContent,
    nameValue,
    setNameValue,
    durationValue,
    setDurationValue,
    openDuration,
    setOpenDuration,
    selectedEffect,
    setSelectedEffect,
    velocityValue,
    setVelocityValue,
    bgColorValue,
    setbgColorValue,
    showWarning,
    setShowWarning,

    dateFormats,
    clockFormats,
    library,
    setActualImageID,
    setLibrary,
    insertImage,
    editor,
    setContentJoddit,
    saveData,
    effects
  };
};
