import React from 'react';
import moment from 'moment';
import { useStyles } from './RedemptionOfPointsReportStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages, Images } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import { ContentRelocator } from 'components/ContentRelocator';
import { messages } from './RedemptionOfPointsReportMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { useHistory } from 'react-router-dom';
import { useRedemptionPointsReport } from './useRedemptionPointsReport';
import Button from 'components/Button';
const FileDownload = require('js-file-download');
import { getReportRedemPointsExcel } from 'providers/api';
import { useTheme } from 'hooks/useTheme';

export const RedemptionOfPointsReport = () => {
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
  } = useTable({ endpoint: '/redeem-point/registry' });
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure, 
    setvaluesStructure,
    userAdminNestle
  } = useRedemptionPointsReport({ search, setExtraParams, resetFilters });
  const classes = useStyles({ currentTheme });

  const redirectToLoadPointsList = () => history.push('/redemption-points/list');

  const  ExportToExcel = async () => {
    let paramsToSend = getExtraParams(extraParams);
    let response = await getReportRedemPointsExcel(pageSize,page,searchItem,paramsToSend)
    FileDownload(response, 'reporte_canje_puntos_' + new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + '.xlsx');
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
        Icon={currentTheme.themeDark ? Pages.RedemptionOfPointsPageIconDark : Pages.RedemptionOfPointsPageIcon}
        showCount={false}
        showGoBack={true}
        goBack={redirectToLoadPointsList}
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
        <div className={classes.infoContainer}>
          <p className={classes.text}>
            {msgs.pageDescription}
          </p>
        </div>
        <div className={"row"}>
            <div className={"col-md-6"}></div>
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
              <th>{msgs.tableNumberExchangePoints}</th>
              <th>{msgs.tableUser}</th>
              {userAdminNestle ? <th>{msgs.tableProductDivision}</th> : null }
              {userAdminNestle ? <th>{msgs.tableProductCategory}</th> : null }
              {userAdminNestle ? <th>{msgs.tableProductMaterialGroup}</th> : null }
              <th>{msgs.tableEquivalenceFormat}</th>
              <th>{msgs.tableProductName}</th>
              <th>{msgs.tableSKU}</th>
              <th>{msgs.tableSAPMaterial}</th>
              <th>{msgs.tableUnitType}</th>
              <th>{msgs.tablePointsConsumedPerUnit}</th>
              <th>{msgs.tableQuantity}</th>
              <th>{msgs.tableTotalPointsConsumed}</th>
              {userAdminNestle ? <th>{msgs.tableRegion}</th> : null }
              {userAdminNestle ? <th>{msgs.tableFormat}</th> : null }
              {userAdminNestle ? <th>{msgs.tableSubformat}</th> : null }
              {userAdminNestle ? <th>{msgs.tableClient}</th> : null }
              <th>{msgs.tableBranch}</th>
              <th>{msgs.tableDigitalDisplay}</th>
              <th>{msgs.tableDate}</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customer_id}</td>
                {userAdminNestle ? <td>{item.division_name}</td> : null }
                {userAdminNestle ? <td>{item.category_name}</td> : null }
                {userAdminNestle ? <td>{item.material_group_name}</td> : null }
                <td>{item.equivalence_format}</td>
                <td>{item.product_name}</td>
                <td>{item.sku}</td>
                <td>{item.code_sap}</td>
                <td>{item.unit_type}</td>
                <td>{item.unit_points}</td>
                <td>{item.quantity}</td>
                <td>{item.total_points}</td>
                {userAdminNestle ? <td>{item.client_name}</td> : null }
                {userAdminNestle ? <td>{item.region_name}</td> : null }
                {userAdminNestle ? <td>{item.format_name}</td> : null }
                {userAdminNestle ? <td>{item.subformat_name}</td> : null }
                <td>{item.branch_name}</td>
                <td>{item.device_name}</td>
                <td>{moment(item.registry_date).format('DD-MM-YYYY HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentRelocator>
    </div>
  );
};
