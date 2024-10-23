import React from 'react';
import Modal from 'components/Modal';
import { css } from '@emotion/react';
import Button from 'components/Button';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from 'components/utils/hexToRBG';
import useAxios from 'hooks/useAxios';
import { useIntl } from 'react-intl';
import { messages } from '../messages';

const CampaignDeleteModal = ({ id, setShowDeleteModal, setDeletedElement }) => {
  const { deleteRequest } = useAxios();
  const intl = useIntl();
  const { currentTheme } = useTheme();
  const modalStyle = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center; /*centers items on the line (the x-axis by default)*/
    align-items: center;
    color: ${hexToRGB(currentTheme.texts, 0.5)};
    background-color: ${currentTheme.background};
    font: normal normal normal 16px/19px Verdana;
    text-align: justify;
    p {
      width: 395px;
      margin-bottom: 50px;
    }
    h1 {
      color: ${currentTheme.titles};
      font: normal normal bold 16px/19px Verdana;
    }
    #buttons {
      display: flex;
      #buttonL {
        margin-right: 48px;
      }
    }
  `;

  async function requestCampaignDelete() {
    let response = await deleteRequest(`/campaign/${id}?type=active`);

    setShowDeleteModal(false);
    setDeletedElement(true);
  }

  return (
    <Modal visible onClose={() => setShowDeleteModal(false)}>
      <div css={modalStyle}>
        <div>
          <h1>{intl.formatMessage(messages.confirmDelete)}</h1>
          <p>{intl.formatMessage(messages.confirmDeleteSub)}</p>
          <div id="buttons">
            <div id="buttonL">
              <Button onClick={() => requestCampaignDelete()}>
                {intl.formatMessage(messages.accept)}
              </Button>
            </div>
            <Button onClick={() => setShowDeleteModal(false)}>
              {intl.formatMessage(messages.cancel)}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CampaignDeleteModal;
