import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { css } from '@emotion/react';
import { Modal } from '@material-ui/core';
import { useTheme } from 'hooks/useTheme';
import Button from 'components/Button';
import LibrarySelect from 'components/LibrarySelect';
import Checkbox from 'views/Users/UserCreate/components/Checkbox';
import { AddTextStyles, useAddTextStyles } from './AddTextModalStyles';
import { useTextEditorConfig } from './useTextEditorConfig';
import { useAddTextModal } from './useAddTextModal';

const AddTextModal = ({
  id,
  scene_id,
  name,
  duration,
  effect,
  velocity,
  bgColor,
  format_date,
  textContent,
  set_duration,
  onAccept,
  onClose
}) => {
  const classes = useAddTextStyles();
  const { currentTheme } = useTheme();
  const config = useTextEditorConfig({ currentTheme });
  const {
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
  } = useAddTextModal({ id, scene_id, onAccept, onClose });

  return (
    <Modal open onClose={onClose} className={classes.root}>
      <main>
        <div css={AddTextStyles({ currentTheme })}>
          <div id="leftSection">
            <header className={classes.header}>
              <h1>Agregar texto</h1>
            </header>
            <div id="head" className="p-3">
              <div id="left">
                <h2>Hora y fecha formato</h2>
                <div id="dateInputs">
                  <LibrarySelect
                    id="spaceSel"
                    library={dateFormats}
                    selected={dateValue}
                    onSelect={setDateValue}
                    searchBar={false}
                  />
                  <div id="spaceSel" />
                  <LibrarySelect
                    library={clockFormats}
                    selected={clockValue}
                    onSelect={setClockValue}
                    searchBar={false}
                  />
                </div>
              </div>
              <div id="center">
                <h2>Biblioteca</h2>
                <LibrarySelect
                  library={library}
                  selected={selectedImage}
                  onSelect={setSelectedImage}
                  setActualImageID={setActualImageID}
                  searchBar
                  setLibrary={setLibrary}
                />
              </div>
              <div id="right">
                <Button onClick={insertImage}>Insertar</Button>
              </div>
            </div>
            <div id="instructions" className="p-3">
              Introduzca el texto a mostrar. Tenga en cuenta que el color de
              fondo es automáticamente el color de fondo de la Diapositiva. El
              rectángulo rojo refleja el tamaño de la región que estás editando.
            </div>
            {showWarning != '' ? <div id="warning">{showWarning}</div> : null}

            <div id="workArea" className="p-3">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={setContentJoddit} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
            <div id="bottomBtn" className="p-3">
              <Button id="btn1" onClick={saveData}>
                Guardar
              </Button>

              <Button secondary onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </div>
          <div id="rightSection">
            <h3>Datos del texto</h3>
            <div className="field">
              <p>Nombre:</p>
              <input
                pattern="[A-Za-z]"
                maxLength="50"
                id="firstInp"
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                placeholder="nombre"
              />
              <Checkbox
                checked={openDuration}
                onCheck={() => setOpenDuration(!openDuration)}
              />

              <label htmlFor="duration">¿Establecer una duración?</label>
              <div id="fieldDes">
                Seleccione para proporcionar una duración específica
              </div>
            </div>
            {openDuration && (
              <div className="field">
                <p>Duración:</p>
                <input
                  type="number"
                  min="1"
                  value={durationValue}
                  onChange={(e) => setDurationValue(e.target.value)}
                />
              </div>
            )}

            <div className="field">
              <p>Efecto:</p>
              <LibrarySelect
                library={effects}
                selected={selectedEffect}
                onSelect={setSelectedEffect}
                searchBar={false}
              />
            </div>
            {selectedEffect != 'Ninguno' && (
              <>
                <div className="field">
                  <p>Velocidad:</p>
                  <input
                    type="number"
                    min="1"
                    placeholder=""
                    value={velocityValue}
                    onChange={(e) => setVelocityValue(e.target.value)}
                  />
                  <div id="fieldDes">
                    La velocidad de transición del efecto seleccionado en
                    milisegundos (normal = 1000) o la velocidad del efecto
                    "Marquee" (normal = 1)
                  </div>
                </div>
                <div className="field">
                  <p>Color de fondo:</p>
                  <div id="colorDiv">
                    <input
                      value={bgColorValue}
                      onChange={(e) =>
                        setbgColorValue(e.target.value.toUpperCase())
                      }
                      id="colorSelection"
                      type="color"
                    ></input>
                    <input
                      value={bgColorValue}
                      onChange={(e) =>
                        setbgColorValue(e.target.value.toUpperCase())
                      }
                      id="colorName"
                      type="text"
                      placeholder={bgColorValue}
                    />
                  </div>
                  <div id="fieldDes">
                    El efecto seleccionado funciona mejor con un color de fondo.
                    Opcionalmente agregue uno.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </Modal>
  );
};

export default AddTextModal;
