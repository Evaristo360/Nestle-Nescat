import React, { useState } from 'react';
import { useStyles } from './PurchaseRequisitionsListStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import { Images } from 'assets';
import FilterModal from 'components/FilterModal';
import { useTheme } from 'hooks/useTheme';
import { usePurchaseRequisitionsList } from './usePurchaseRequisitionsList';
import { getPurchaseRequestExcel } from 'providers/api';
import moment from 'moment';
const FileDownload = require('js-file-download');
import { messages } from './PurchaseRequisitionsMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';

export const PurchaseRequisitionsList = () => {
  const msgs = useIntlMessages(messages);
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
    setExtraParams
  } = useTable({ endpoint: '/purchase-request' });
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure, 
    setvaluesStructure,
    userAdminNestle
  } = usePurchaseRequisitionsList({ search, setExtraParams, resetFilters });
  const classes = useStyles({currentTheme });

  const  ExportToExcel = async () => {
    let paramsToSend = getExtraParams(extraParams);
    let response = await getPurchaseRequestExcel(pageSize,page,searchItem,paramsToSend)
    FileDownload(response, 'lista_solicitudes_compra_' + new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + '.xlsx');
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
    <section>      
      <NestcaPageHeader
        showFilterButton
        title={msgs.pageTitle}
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.PurchaseRequestPageIconDark : Pages.PurchaseRequestPageIcon}
        count={totalFound}
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
      <ContentRelocator>
        <div className={classes.subheader}>
          <div>
            <div className={classes.infoContainer}>
              <p className={classes.text}>
                {msgs.pageDescription}
              </p>
            </div>
          </div>
          <div className={classes.buttons}>
            <div className={classes.settingsCont}>
              <Button className={classes.downloadButton} icon={Images.ExcelIcon} onClick={async () => { await ExportToExcel()}}>
                {msgs.buttonExportExcel}
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
          scroll_X
        >
          <thead>
            <tr>
              <th> {msgs.tablePurchaseRequestNumber}</th>
              <th> {msgs.tableUser}</th>
              {userAdminNestle ? <th> {msgs.tableProductDivision}</th> : null }
              {userAdminNestle ? <th> {msgs.tableProductCategory}</th> : null }
              <th> {msgs.tableProductMaterialGroup}</th>
              <th> {msgs.tableFormatEquivalence}</th>
              <th> {msgs.tableProductName}</th>
              <th> {msgs.tableSKU}</th> 
              <th> {msgs.tableMaterialSAP}</th>
              <th> {msgs.tableBarcode}</th>
              <th> {msgs.tableUnitType}</th>
              <th> {msgs.tablePriceUnit}</th>
              <th> {msgs.tableAmount}</th>
              <th> {msgs.tableTotalPrice}</th>
              {userAdminNestle ? <th> {msgs.tableRegion}</th> : null }
              {userAdminNestle ? <th> {msgs.tableFormat}</th> : null }
              {userAdminNestle ? <th> {msgs.tableSubformat}</th> : null }
              {userAdminNestle ? <th> {msgs.tableClient}</th> : null }
              <th> {msgs.tableBranch}</th>
              <th> {msgs.tableDigitalDisplay}</th>
              <th> {msgs.tableDate}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.customer_id}</td>
                {userAdminNestle ? <td>{item.division_name}</td> : null }
                {userAdminNestle ? <td>{item.category_name}</td> : null }
                <td>{item.material_group_name}</td>
                <td>{item.format_equivalence}</td>
                <td>{item.product_name}</td>
                <td>{item.sku}</td>
                <td>{item.code_sap}</td>
                <td>{item.product_barcode}</td>
                <td>{item.unit_type}</td>
                <td>{item.unit_price}</td>
                <td>{item.quantity}</td>
                <td>{item.total_price}</td>
                {userAdminNestle ?  <td>{item.region_name}</td> : null }
                {userAdminNestle ? <td>{item.format_name}</td> : null }
                {userAdminNestle ? <td>{item.subformat_name}</td> : null }
                {userAdminNestle ? <td>{item.client_name}</td> : null }
                <td>{item.branch_name}</td>
                <td>{item.device_name}</td>
                <td>{moment(item.created_on).format('DD-MM-YYYY HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentRelocator>
    </section>
  );
};
