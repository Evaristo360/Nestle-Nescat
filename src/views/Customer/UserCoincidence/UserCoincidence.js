import React from 'react';
import { Modal } from '@material-ui/core';
import { getExcelAllCoincidences } from 'providers/api';
import { UserCoincidenceCreateStyle } from './UserCoincidence.css';
import Button from 'components/Button';
import { useHistory } from 'react-router-dom';
import { messages } from '../messagess';
import { useIntl } from 'react-intl';
import { useTable } from 'hooks/useTableV2';
import { Images } from 'assets';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';

const FileDownload = require('js-file-download');

export const UserCoincidence = ({ visible, onClose }) => {

  const {
    page,
    pageSize,
    searchItem,
    items,
  } = useTable({ endpoint: '/customer/dashboard/coincidence' });
  const history = useHistory();
  const intl = useIntl();
  const redirectToPin = (pinId) => history.push(`/customer/pin/${pinId}`);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const  exportToExcel = async () => {
    let response = await getExcelAllCoincidences(pageSize,page,searchItem)
    FileDownload(response, 'coicidencias_compradores_' + new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + '.xlsx');
  };

  return (
    <Modal open={visible} onClose={onClose} style={{ padding: '2rem' }}>
      <section css={UserCoincidenceCreateStyle()}>
        <header className="header">
          <h1 className="title">
            {intl.formatMessage(messages.modalTitle)}
          </h1>
        </header>
        <div className="content">
          <div className="button-download-container">
            <Button type="user" onClick={async () => { await exportToExcel()}} icon={Images.ExcelIcon} className="download-button" >
              Exportar en excel
            </Button>
          </div>
          <table className="table">
          <thead>
            <tr>
              <th>Coincidencias PIN</th>
              <th>Cantidad de usuarios</th>
              <th>Productos solicitados</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.pin}>
                <td>{item.pin}</td>
                <td>{item.count}</td>
                <td>{
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => redirectToPin(item.pin)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    <Visibility fontSize="small" style={{ color: '#777777'}}/>
                  </IconButton>
                }</td>
              </tr>
            ))}
          </tbody>
          </table>
          <div className="button-accept-container">
            <Button type="user" onClick={onClose} className="accept-button" >
              Aceptar
            </Button>
          </div>
        </div>
      </section>
    </Modal>
  );
};
