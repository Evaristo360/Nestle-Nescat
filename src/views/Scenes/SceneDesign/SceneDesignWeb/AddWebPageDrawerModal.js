import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { messages } from '../messages';
import { TextField } from '@material-ui/core';
import { useStyles } from 'components/DrawerModal/styles/DrawerModalStyles.css';
import { useHandleData } from './hooks/useHandleData';
import { useValidation } from './hooks/useValidation';
import { initialData } from './data';
import { Switch } from 'components/Switch';
import { ModalSimpleAccept as Alert } from 'components/Modals/ModalSimpleAccept';

const { default: DrawerModal } = require('components/DrawerModal');

const AddWebPageDrawerModal = ({ showModal = false, onClose, id }) => {
  const classes = useStyles();
  const [data, updateData, saveData] = useHandleData(initialData, id);
  const [dataValidation, validateData] = useValidation();
  const [alert, updateAlert] = useState({ isVisible: false, message: '' });
  const dataValid = isDataValid();
  const { formatMessage } = useIntl();
  const intl = useIntl();
  //   const [showModal, setShowModal] = useState(true);

  function isDataValid() {
    const inputs = Object.keys(dataValidation);
    let isValid = true;

    inputs.forEach((input) => {
      if (dataValidation[input] === false) {
        isValid = false;
      }
    });

    return isValid;
  }

  const onTextChange = (e) => {
    const target = e.target;
    const typing = validateData(target.value, target.name);

    if (typing) {
      updateData({
        ...data,
        [target.name]: target.value
      });
    }
  };

  function onChangeSwitch(value) {
    updateData({
      ...data,
      is_active: value
    });
  }

  function editResolution(e) {
    saveData(updateAlert);
    e.preventDefault(e);
  }

  return (
    <DrawerModal
      title={intl.formatMessage(messages.titleEdit)}
      visible={showModal}
      onClose={onClose}
      onAccept={editResolution}
      disabledAccept={dataValid}
    >
      <TextField
        label="Enlace"
        name="urlValue"
        placeholder="Ej. 1080 HD (landscape)"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={messages.resolution}
        className={classes.textField}
        onChange={onTextChange}
        value={data.urlValue}
      />

      <TextField
        label="Ancho"
        name="width"
        placeholder="Ej. 2000px"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={messages.name}
        className={classes.textField}
        onChange={onTextChange}
        value={data.width}
      />
      <TextField
        label="Alto"
        name="height"
        placeholder="Ej. 2000px"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={messages.name}
        className={classes.textField}
        onChange={onTextChange}
        value={data.height}
      />

      <div className={classes.status_title}>
        ¿Activar resolución para su uso?
      </div>
      <Switch
        onSwitch={onChangeSwitch}
        isActive={data.is_active}
        legends={[
          formatMessage(messages.activate)
          //   formatMessage(messages.deactivate)
        ]}
      />

      <Alert
        visible={alert.isVisible}
        onClose={() => updateAlert({ ...alert, isVisible: false })}
      >
        <div className="alert-text">{alert.message}</div>
        <button
          onClick={() => updateAlert({ ...alert, isVisible: false })}
          className="alert-cancel-button"
        >
          {formatMessage(messages.accept)}
        </button>
      </Alert>
    </DrawerModal>
  );
};

export default AddWebPageDrawerModal;
