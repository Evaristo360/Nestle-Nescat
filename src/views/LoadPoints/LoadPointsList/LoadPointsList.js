import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useStyles } from './LoadPointsListStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages, Images } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import CancelOkModal from 'components/CancelOkModal';
import usePromiseModal from 'hooks/usePromiseModal';
import { messages } from './LoadPointsListMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { useHistory } from 'react-router-dom';
import { useLoadPointsList } from './useLoadPointsList';
import { getLoadPointsExcel } from 'providers/api';
const FileDownload = require('js-file-download');
import { useTheme } from 'hooks/useTheme';


export const LoadPointsList = () => {
  const { currentTheme } = useTheme();
  const history = useHistory();
  const msgs = useIntlMessages(messages);
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
    resetFilters,
    setOrderBy,
    extraParams,
    setExtraParams
  } = useTable({ endpoint: '/load_points' });
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure, 
    setvaluesStructure,
    userAdminNestle
  } = useLoadPointsList({ search, setExtraParams, resetFilters });
  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  
  const redirectToPendingRequest = () => history.push('/load-points/pending-request/list');

  const  ExportToExcel = async () => {
    let paramsToSend = getExtraParams(extraParams);
    let response = await getLoadPointsExcel(pageSize,page,searchItem,paramsToSend)
    FileDownload(response, 'lista_carga_puntos_' + new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + '.xlsx');
  };
  
  const getExtraParams = (params) =>
  Object.keys(params).reduce((acc, paramKey) => {
    if (
      params[paramKey] !== '' &&
      params[paramKey] !== null &&
      params[paramKey] !== undefined
    ) {
      acc[paramKey] = params[paramKey];
    }

    return acc;
  }, {});
  
  return (
    <div>
      <NestcaPageHeader
        showFilterButton
        title={msgs.pageTitle}
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.LoadPointsPageIconDark : Pages.LoadPointsPageIcon}
        showCount={false}
      />
      <FilterModal
        visible={showFilters}
        onSearch={onSearchFilterHandler}
        onRestore={toggleRestoreFilters}
        onClose={toggleShowFilters}
        endDate={true}
        optionStructure={filterStructureJSON}
        valueStructure={valuesStructure}
        setValueStructure={setvaluesStructure}
      />
      <CancelOkModal
        visible={promiseModal.showModal}
        onAccept={promiseModal.onAccept}
        onCancel={promiseModal.onCancel}
        okLabel={msgs.deleteModalOkLabel}
        cancelLabel={msgs.deleteModalCancelLabel}
        title={promiseModal.title}
        text={promiseModal.text}
      />
      <ContentRelocator>
        <div className={classes.infoContainer}>
          <p className={classes.text}>{msgs.pageDescription}</p>
        </div>
        <div className={"row"}>
            <div className={"col-md-6"}>
              <Button secondary onClick={redirectToPendingRequest}>
                {msgs.buttonPendingRequest}
              </Button>
            </div>
            <div className={"col-md-6"} align={"right"}>
              <Button className={classes.downloadButton} icon={Images.ExcelIcon} onClick={async () => { await ExportToExcel()}}>
                {msgs.buttonExportExcel}
              </Button>
            </div>
        </div>
        <Table
          scroll_X={true}
          total={totalFound}
          page={page}
          pageSize={pageSize}
          onChangeSize={onChangeSize}
          onChangePage={onChangePage}
        >
          <thead>
            <tr>
              <th>{msgs.tableLoadPointsNumber}</th>
              <th>{msgs.tableUser}</th>
              <th>{msgs.tableProductDivision}</th>
              <th>{msgs.tableProductCategory}</th>
              <th>{msgs.tableProductMaterialGroup}</th>
              <th>{msgs.tableProductName}</th>
              <th>{msgs.tableFormatEquivalence}</th>
              <th>{msgs.tableSKU}</th>
              <th>{msgs.tableMaterialSAP}</th>
              <th>{msgs.tableBarcode}</th>
              <th>{msgs.tableUnitType}</th>
              <th>{msgs.tablePricePerUnit}</th>
              <th>{msgs.tableAmount}</th>
              <th>{msgs.tableTotalPrice}</th>
              <th>{msgs.tablePointsAwardedPerUnit}</th>
              <th>{msgs.tableTotalPointsAwarded}</th>
              <th>{msgs.tablePointsAwardedPerTicket}</th>
              {userAdminNestle ? <th>{msgs.tableOriginStore_Client}</th> : null }
              {userAdminNestle ? <th>{msgs.tableOriginStore_RegionBranch}</th> : null }
              {userAdminNestle ? <th>{msgs.tableOriginStore_FormatBranch}</th> : null }
              {userAdminNestle ? <th>{msgs.tableOriginStore_SubformatBranch}</th> : null }
              <th>{msgs.tableOriginStore_NameBranch}</th>
              {userAdminNestle ? <th>{msgs.tableLoadStore_Client}</th>  : null }
              {userAdminNestle ? <th>{msgs.tableLoadStore_RegionBranch}</th>  : null }
              {userAdminNestle ? <th>{msgs.tableLoadStore_FormatBranch}</th>  : null }
              {userAdminNestle ? <th>{msgs.tableLoadStore_SubformatBranch}</th>  : null }
              <th>{msgs.tableLoadStore_NameBranch}</th>
              <th>{msgs.tableDigitalDisplay}</th>
              <th>{msgs.tableDateLoadRequest}</th>
              <th>{msgs.tableAutomaticDetection}</th>
              <th>{msgs.tableDateValidation}</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
              <tr key={index}>
                <td>{item.ticket_id}</td>
                <td>{item.customer_phone}</td>
                <td>{item.product_division}</td>
                <td>{item.product_category}</td>
                <td>{item.product_material_group}</td>
                <td>{item.product_name}</td>
                <td>{item.format_equivalent}</td>
                <td>{item.sku}</td>
                <td>{item.product_material_sap}</td>
                <td>{item.barcode}</td>
                <td>{item.unit_type}</td>
                <td>{item.unit_price}</td>
                <td>{item.quantity}</td>
                <td>{item.price_total}</td>
                <td>{item.unit_points}</td>
                <td>{item.unit_points_total}</td>
                <td>{item.ticket_points}</td>
                {userAdminNestle ? <td>{item.client_name_origin}</td> : null }
                {userAdminNestle ? <td>{item.branch_region_origin_name}</td> : null }
                {userAdminNestle ? <td>{item.branch_format_origin_name}</td> : null }
                {userAdminNestle ? <td>{item.branch_subformat_origin_name}</td> : null }
                <td>{item.branch_name_origin}</td>
                {userAdminNestle ? <td>{item.client_name_load}</td> : null }
                {userAdminNestle ? <td>{item.branch_region_load_name}</td> : null }
                {userAdminNestle ? <td>{item.branch_format_load_name}</td> : null }
                {userAdminNestle ? <td>{item.branch_subformat_load_name}</td> : null }
                <td>{item.branch_name_load}</td>
                <td>{item.device_name}</td>
                <td>{item.request_load_datetime !== null ? moment(item.request_load_datetime).format('DD-MM-YYYY HH:mm') : ""}</td>
                <td>{item.auto_detection ? "Si" : "No"}</td>
                <td>{item.validation_date !== null ? moment(item.validation_date).format('DD-MM-YYYY HH:mm') : ""}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentRelocator>
    </div>
  );
};
