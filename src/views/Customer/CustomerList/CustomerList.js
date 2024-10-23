import React, { useState, useEffect } from 'react';
import { getExcelAllCustomers, getCustomReport } from 'providers/api';
import moment from 'moment';
import { style } from './CustomerListStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import CancelOkModal from 'components/CancelOkModal';
import SuccessDelete from 'components/SuccessDelete';
import usePromiseModal from 'hooks/usePromiseModal';
import { OrderByButton } from 'components/OrderByButton';
import { Images } from 'assets';
import FilterModal from 'components/FilterModal';
import { UserCoincidence } from '../UserCoincidence/UserCoincidence';
import { useTheme } from 'hooks/useTheme';
import { useRedemptionPointsList } from './useRedemptionPointsList';

const FileDownload = require('js-file-download');

export const CustomerList = () => {
  const { currentTheme } = useTheme();
  const {
    onChangeSearchItem,
    onChangeSize,
    onChangePage,
    totalFound,
    page,
    pageSize,
    searchItem,
    items,
    search,
    setPage,
    resetFilters,
    setOrderBy,
    extraParams,
    setExtraParams,
  } = useTable({ endpoint: '/customer/dashboard' });
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure, 
    setvaluesStructure
  } = useRedemptionPointsList({ search, setExtraParams, resetFilters });
  const classes = style();
  const promiseModal = usePromiseModal();
  const [showCoincidenceModal, setShowCoincidenceModal] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const toggleSuccessDelete = () => setShowSuccessDelete(!showSuccessDelete);

  const toggleCoincidenceModal = () => {
    setShowCoincidenceModal(!showCoincidenceModal);
    search();
  };

  const  exportToExcel = async () => {
    let response = await getExcelAllCustomers(pageSize,page,searchItem)
    FileDownload(response, 'compradores_' + new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + '.xlsx');
  };

  const  excelLoadPoints = async (url, id) => {
    let response = await getCustomReport(url)
    FileDownload(response, 'Productos_cargados_' + `${id}` + new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + '.xlsx');
  };

  const  excelRedeemPoints = async (url, id) => {
    let response = await getCustomReport(url)
    FileDownload(response, 'Productos_canjeados_' + `${id}_` + new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + '.xlsx');
  };

  return (
    <div>
      <NestcaPageHeader
        showFilterButton
        title="Compradores:"
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.CustomerPageIconDark : Pages.CustomerPageIcon}
        count={totalFound}
      />
      <CancelOkModal
        visible={promiseModal.showModal}
        onAccept={promiseModal.onAccept}
        onCancel={promiseModal.onCancel}
        okLabel="Aceptar"
        cancelLabel="Cancelar"
        title={promiseModal.title}
        text={promiseModal.text}
      />
      <FilterModal
        visible={showFilters}
        onSearch={onSearchFilterHandler}
        onRestore={toggleRestoreFilters}
        onClose={toggleShowFilters}
        endDate={true}
      />
      <UserCoincidence
        visible={showCoincidenceModal}
        onClose={toggleCoincidenceModal}
      />
      <SuccessDelete
        visible={showSuccessDelete}
        onClick={toggleSuccessDelete}
        erasedElement={"producto"}
      />
      <ContentRelocator>
        <div className={classes.subheader}>
          <div>
            <div className={classes.infoContainer}>
              <p className={classes.text}>
                Muestra los consumidores que han sido registrados.
              </p>
            </div>
          </div>
          <div className={classes.buttons}>
            <div className={classes.settingsCont}>
              <Button type="user" onClick={toggleCoincidenceModal} className={classes.usersButton}>
                Coincidencias de usuarios
              </Button>
            </div>
            <div className={classes.settingsCont}>
              <Button type="user" icon={Images.ExcelIcon} className={classes.downloadButton} onClick={async () => { await exportToExcel()}}>
                Exportar en excel
              </Button>
            </div>
          </div>
        </div>
        <Table
          total={totalFound}
          page={page}
          pageSize={pageSize}
          onChangeSize={onChangeSize}
          onChangePage={onChangePage}
        >
          <thead>
            <tr>
              <th>
                <OrderByButton onClick={() => setOrderBy('id')} onlyButton styleButton={classes.th}>
                  Usuario
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('load_points')} onlyButton styleButton={classes.th}>
                  Total de puntos cargados
                </OrderByButton>
              </th>
              <th className={classes.th}>
                <OrderByButton onlyButton styleButton={classes.th} disable>
                  Total de productos cargados
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('redeem_points')} onlyButton styleButton={classes.th}>
                  Total de puntos consumidos
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onlyButton styleButton={classes.th} disable>
                  Total de productos canjeados
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('current_points')} onlyButton styleButton={classes.th}>
                  Puntos actuales
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('created_on')} onlyButton styleButton={classes.th}>
                  Fecha y hora de registro
                </OrderByButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`${item.id}${index}`}>
                <td>{item.phone}</td>
                <td>{item.load_points}</td>
                <td><a className={classes.highlight} onClick={async () => { await excelLoadPoints(item.product_load_report, item.id)}}>Descargar</a></td>
                <td>{item.redeem_points}</td>
                <td><a className={classes.highlight} onClick={async () => { await excelRedeemPoints(item.product_redeem_report, item.id)}}>Descargar</a></td>
                <td>{item.current_points}</td>
                <td>{moment(item.created_on).format('DD-MM-YYYY - HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentRelocator>
    </div>
  );
};
