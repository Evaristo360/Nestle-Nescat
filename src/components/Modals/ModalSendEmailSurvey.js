import React, { useState } from "react";
import { css, jsx } from "@emotion/react";
import { useTheme } from "../../contexts/themeContext";
import useErrorDictionary from "../../pages/SignInPage/hooks/useErrorDictionary";

import Dialog from "../Dialog";
import EditorHTML from "../../components/EditorHTML";

const ModalSendEmailSurvey = ({ visible, onClose, onSend }) => {
  const { currentTheme } = useTheme();
  const [emailsText, updateEmailsText] = useState("");
  const [messageData, updateMessageData] = useState(null);
  const [dataError, updateDataError] = useState(null);

  function prepareToSend() {
    const emails = emailsText.split(/(?:,|;)+/);
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emails.length === 0 && emailsText.length > 0) {
      return updateDataError({ error: "noEmails" });
    }
    if (!emails) {
      return updateDataError({ error: "noEmailMessage" });
    }

    for (let index = 0; index < emails.length; index++) {
      const email = emails[index];

      if (!emailRegex.test(email))
        return updateDataError({ error: "wrongEmailFormat" });
    }

    onSend({ emails, message: messageData.emailMessage });
  }

  const component = visible ? (
    <Dialog>
      <div
        css={css`
          width: 100%;
          height: 100vh;
          background: ${currentTheme.background};
          color: ${currentTheme.texts};
          z-index: 300;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;

          .modal--close-icon {
            position: absolute;
            top: 0;
            right: 0;
            margin: 2rem;
            cursor: pointer;
            fill: ${currentTheme.texts};
            opacity: 0.5;
          }

          .alert-title {
            font: normal normal bold 25px/30px Verdana;
            color: ${currentTheme.titles};
          }

          .alert-text {
            font: normal normal normal 16px/19px Verdana;
            color: ${currentTheme.texts};
          }

          .alert-cancel-button {
            margin-top: 63px;
            padding: 13px 18px 12px 18px;
            width: auto;
            min-width: 152px;
            border: none;
            background: ${currentTheme.button};
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 5px;
            text-align: center;
            font: normal normal normal 14px/10px Verdana;
            color: ${currentTheme.button_Text};
          }

          .alert-cancel-button:hover {
            background: ${currentTheme.active_button};
            color: ${currentTheme.active_button_Text};
          }

          .modal-email {
            margin-top: 2rem;
          }

          .modal-email-input {
            width: 875px;
            height: 166px;
            border: 1px solid ${currentTheme.emphasis};
            border-radius: 5px;
            background: transparent;
            color: ${currentTheme.texts};
            padding: 0.5rem;
            margin-top: 1rem;

            :focus {
              outline: none;
            }
          }

          .modal-email-editor {
            color: #000;
            margin-top: 2rem;
          }

          .modal-email-editor--label,
          modal-email-editor--error-message {
            font: normal normal normal 16px/19px Verdana;
            letter-spacing: 0.8px;
            color: ${currentTheme.emphasis};
            margin-bottom: 1rem;
          }

          .modal-email-editor--footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 1rem;
          }

          .modal-email-editor--button {
            height: 35px;
            width: 152px;
            background-color: ${currentTheme.button};
            border: transparent;
            border-radius: 5px;
            font-size: 14px;
            color: ${currentTheme.button_Text};
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1rem;
            &:hover {
              background-color: ${currentTheme.active_button};
              color: ${currentTheme.active_button_Text};
            }
          }
        `}
      >
        <svg
          className="modal--close-icon"
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          width="10.85"
          height="10.25"
          viewBox="0 0 10.85 10.25"
        >
          <path
            className="a"
            d="M18.35,8.532,17.257,7.5l-4.332,4.093L8.593,7.5,7.5,8.532l4.332,4.093L7.5,16.718,8.593,17.75l4.332-4.093,4.332,4.093,1.093-1.032-4.332-4.093Z"
            transform="translate(-7.5 -7.5)"
          />
        </svg>

        <div>
          <h1 className="alert-title">
            Enviar encuesta por correo electrónico
          </h1>
          <p className="alert-text">
            Ingrese los correos electrónicos que desee, separados por coma o
            punto y coma (, ;)
          </p>

          <div className="modal-email">
            <p className="alert-text">Para:</p>
            <textarea
              className="modal-email-input"
              onChange={(e) => updateEmailsText(e.target.value)}
            />
          </div>

          <div className="modal-email-editor">
            <p className="modal-email-editor--label">Mensaje</p>
            <EditorHTML
              initHTML=""
              name="emailMessage"
              onChange={(data) => updateMessageData(data)}
            />
          </div>
        </div>

        <div className="modal-email-editor--footer">
          <button
            className="modal-email-editor--button"
            onClick={prepareToSend}
          >
            Enviar
          </button>
          {dataError ? (
            <p className="modal-email-editor--error-message">
              {useErrorDictionary(dataError)}
            </p>
          ) : null}
        </div>
      </div>
    </Dialog>
  ) : null;

  return component;
};

export default ModalSendEmailSurvey;
