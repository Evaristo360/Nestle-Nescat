import React, { useState } from 'react';
import moment from 'moment';
import { deleteRedemPoints, getRedemPointsExcel } from 'providers/api';
import { useStyles } from './RedemptionOfPointsStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages, Images } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import ThreeDotsButton from 'components/ThreeDotsButton';
import { ContextMenu, createContextMenuItem } from 'components/ContextMenu';
import CancelOkModal from 'components/CancelOkModal';
import usePromiseModal from 'hooks/usePromiseModal';
import { messages } from './RedemptionOfPointsMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { RedemptionOfPointsForm } from '../RedemptionOfPointsForm';
import { useHistory } from 'react-router-dom';
const FileDownload = require('js-file-download');
import { useRedemptionPointsList } from './useRedemptionPointsList';
import { useTheme } from 'hooks/useTheme';
import { config } from 'providers/config';
import useUserMetadata from 'hooks/useUserMetadata';

const commands = {
  edit: 'edit',
  delete: 'delete'
};

export const RedemptionOfPointsList = () => {
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
  } = useTable({ endpoint: '/redeem-point' });
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure,
    setvaluesStructure
  } = useRedemptionPointsList({ search, setExtraParams, resetFilters });
  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(0);
  const [editableForm, setEditableForm] = useState(false);
  const onError = () => {};
  const { role } = useUserMetadata({ onError });

  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const deleteRedemptionPoint = async (item) => {
    const ok = await promiseModal.openModal(
      msgs.deleteModalTitle,
      msgs.deleteModalText
    );

    if (!ok) return;

    const id = item.id;

    try {
      await deleteRedemPoints(id);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editRedemptionPoint = (item) => {
    // open drawer
    setSelectedExchange(item.id);
    setEditableForm(false);
    setShowEditModal(true);
  };

  const createItem = () => {
    setSelectedExchange(0);
    setEditableForm(false);
    setShowEditModal(true);
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editRedemptionPoint(item);
    } else if (command === commands.delete) {
      deleteRedemptionPoint(item);
    }
  };

  const getContextMenuItems = (index) => [
    createContextMenuItem(`${commands.edit}-${index}`, 'Editar'),
    createContextMenuItem(`${commands.delete}-${index}`, 'Borrar')
  ];

  const handleAcceptEdit = () => {
    setShowEditModal(false);
    setSelectedExchange(0);
    search();
  };

  const redirectRedemptionOfPointsReport = () =>
    history.push('/redemption-points/report');

  const readItem = (id) => {
    // open drawer
    setSelectedExchange(id);
    setEditableForm(true);
    setShowEditModal(true);
  };

  const ExportToExcel = async () => {
    let paramsToSend = getExtraParams(extraParams);
    let response = await getRedemPointsExcel(
      pageSize,
      page,
      searchItem,
      paramsToSend
    );
    FileDownload(
      response,
      'lista_canje_puntos_' +
        new Date().toLocaleDateString() +
        '_' +
        new Date().toLocaleTimeString() +
        '.xlsx'
    );
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
        Icon={
          currentTheme.themeDark
            ? Pages.RedemptionOfPointsPageIconDark
            : Pages.RedemptionOfPointsPageIcon
        }
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
      <CancelOkModal
        visible={promiseModal.showModal}
        onAccept={promiseModal.onAccept}
        onCancel={promiseModal.onCancel}
        okLabel={msgs.deleteModalOkLabel}
        cancelLabel={msgs.deleteModalCancelLabel}
        title={promiseModal.title}
        text={promiseModal.text}
      />
      <RedemptionOfPointsForm
        onAccept={handleAcceptEdit}
        onClose={toggleEditModal}
        redemptionId={selectedExchange}
        visible={showEditModal}
        editableForm={editableForm}
      />
      <ContentRelocator>
        <div className="row mt-2">
          <div className="col-md-10">
            {(role === 1 || role === 2 || role === 3) && (
              <p className={classes.text}>{msgs.pageDescription}</p>
            )}
          </div>
          <div
            className="col-md-2"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button onClick={redirectRedemptionOfPointsReport} secondary>
              {msgs.report}
            </Button>
          </div>
        </div>
        <div className="row  mt-2">
          <div className="col-md-2">
            {(role === 1 || role === 2 || role === 3) && (
              <Button className={classes.mainButton} onClick={createItem}>
                {msgs.newRedemptionOfPoints}
              </Button>
            )}
          </div>
          <div className="col-md-8"></div>
          <div
            className={'col-md-2'}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              className={classes.downloadButton}
              icon={Images.ExcelIcon}
              onClick={async () => {
                await ExportToExcel();
              }}
            >
              {msgs.exportExcel}
            </Button>
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
              <th>{msgs.tableColumnId}</th>
              <th>{msgs.tableColumnProductTitle}</th>
              <th>{msgs.tableColumnDateCreated}</th>
              <th>{msgs.tableColumnEffectiveDate}</th>
              <th>{msgs.tableColumnProductImage}</th>
              <th>{msgs.tableColumnPiecePoints}</th>
              <th>{msgs.tableColumnBoxPoints}</th>
              <th>{msgs.tableColumnBarCode}</th>
              {(role === 1 || role === 2 || role === 3) && (
                <th>{msgs.tableColumnAction}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td
                  onClick={() => {
                    readItem(item.id);
                  }}
                >
                  {item.id}
                </td>
                <td
                  onClick={() => {
                    readItem(item.id);
                  }}
                >
                  {item.name}
                </td>
                <td
                  onClick={() => {
                    readItem(item.id);
                  }}
                >
                  {moment(item.created_on).format('YYYY-MM-DD HH:mm')}
                </td>
                <td
                  onClick={() => {
                    readItem(item.id);
                  }}
                >
                  {item.validity_date !== null
                    ? moment(item.validity_date).format('YYYY-MM-DD')
                    : ''}
                </td>
                <td
                  onClick={() => {
                    readItem(item.id);
                  }}
                >
                  {item.image_url ? (
                    <img
                      className={classes.image}
                      src={config.siteConfig.apiUrl + '/' + item.image_url}
                      alt={item.name}
                    />
                  ) : null}
                </td>
                <td
                  onClick={() => {
                    readItem(item.id);
                  }}
                >
                  {item.points_piece}
                </td>
                <td
                  onClick={() => {
                    readItem(item.id);
                  }}
                >
                  {item.points_box}
                </td>
                <td
                  onClick={() => {
                    readItem(item.id);
                  }}
                >
                  {item.barcode_special}
                </td>
                {(role === 1 || role === 2 || role === 3) && (
                  <td>
                    <ContextMenu
                      items={getContextMenuItems(index)}
                      onClickItem={onClickItem}
                      TriggerComponent={ThreeDotsButton}
                      TriggerComponentProps={{
                        direction: 'column',
                        color: '#5EC9FF'
                      }}
                    ></ContextMenu>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentRelocator>
    </div>
  );
};
