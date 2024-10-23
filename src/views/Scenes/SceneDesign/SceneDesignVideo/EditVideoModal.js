import React, { useState } from 'react';
import { css } from '@emotion/react';
import Modal from 'components/Modal';
import { useTheme } from 'hooks/useTheme';
import Button from 'components/Button';
import { editVideoMessages as formMessages } from '../SceneDesignMessages';
import Input, { createInput } from 'components/Inputs/Input';
import Title from 'components/Title';
import containerStyles from 'components/styles/containers.css';
import themeStyles from 'components/styles/theme.css';
import { doPatch } from 'hooks/useAxios';
import { useMessages } from '../hooks/useMessage';

const fields = [
  createInput('text', 'name', 'Nombre', {
    maxLength: 50,
    placeholder: 'Nombre'
  }),
  createInput('checkbox', 'set_duration', 'Establecer una duración?', {
    initMessage: 'Seleccione para proporcionar una duración específica'
  }),
  createInput('number', 'duration', 'Duración', {
    maxLength: 10,
    showIf: (values) => values['set_duration']
  }),
  createInput('checkbox', 'silence', '¿Silenciar?', {
    initMessage: '¿Debería silenciarse el video?'
  })
];

const requiredMessage = 'Este campo es requerido';
const onlyNumbersMessage = 'Este campo solo puede contener números';

const EditVideoModal = ({
  onClose = () => {},
  onAccept = () => {},
  ...props
}) => {
  const [state, setState] = useState({
    id: props.id,
    name: props.name || '',
    duration: props.duration || 10,
    set_duration: props.set_duration,
    silence: Boolean(props.silence)
  });
  const [messages, setMessages] = useState(
    Object.keys(state).reduce((acc, key) => {
      acc[key] = '';

      return acc;
    }, {})
  );
  const { currentTheme } = useTheme();
  const { getMsg } = useMessages(formMessages);

  const validateForm = () => {
    if (!state.name) {
      setMessages({ ...messages, name: requiredMessage });

      return false;
    }

    if (state.set_duration && !/^[0-9]+$/.test(state.duration)) {
      setMessages({ ...messages, duration: onlyNumbersMessage });

      return false;
    }

    if (state.set_duration && !state.duration) {
      setMessages({ ...messages, duration: requiredMessage });

      return false;
    }

    return true;
  };

  const saveData = () => {
    if (validateForm()) {
      let data = {
        name: state.name,
        set_duration: Boolean(state.set_duration),
        silence: Boolean(state.silence)
      };

      if (data.set_duration) {
        data.duration = parseInt(state.duration);
      }

      doPatch(`/advertisements/video/design/${state.id}`, data).then(
        ({ result }) => {
          onAccept({ ...state, media_type: 'video', isEdit: true });
        }
      );
    }
  };

  const handleChange = (event) => {
    let name = '';
    let value = '';

    if (event.target) {
      name = event.target.name;
      value = event.target.value;
    } else {
      name = Object.keys(event)[0];
      value = event[name];
    }

    if (name)
      setState({
        ...state,
        [name]: value
      });
  };

  const styles = css`
    ${containerStyles()}
    ${themeStyles({ currentTheme })}
      width: 100%;
    height: 100vh;
    padding-top: 5rem;
    input[type='text'],
    input[type='number'] {
      background: ${currentTheme.background};
      &:focus {
        background: ${currentTheme.background};
      }
    }
  `;

  return (
    <Modal visible onClose={onClose} background={currentTheme.background}>
      <div className="container" css={styles}>
        <Title>{getMsg('title')}</Title>
        <label className="text mt-3">{getMsg('subtitle')}</label>
        <div className="row pt-3">
          <div className="col-4 pl-4">
            {fields.map(({ showIf, ...f }, i) => {
              if ((showIf && showIf(state)) || !showIf) {
                return (
                  <Input
                    {...f}
                    key={i}
                    message={
                      !messages[f.name] ? f.initMessage : messages[f.name]
                    }
                    onChange={handleChange}
                    value={state[f.name]}
                  />
                );
              }

              return null;
            })}
          </div>
        </div>

        <div className="row pl-3">
          <Button className="mr-2" onClick={saveData}>
            {getMsg('save')}
          </Button>
          <Button onClick={onClose}>{getMsg('cancel')}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditVideoModal;
