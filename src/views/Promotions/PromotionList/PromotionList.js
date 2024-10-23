import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useStyles } from './PromotionStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages, Images } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import CancelOkModal from 'components/CancelOkModal';
import usePromiseModal from 'hooks/usePromiseModal';
import { messages } from './PromotionMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { usePromotionList } from './usePromotionList';
import { getPromotionsExcel } from 'providers/api';
const FileDownload = require('js-file-download');
import { useTheme } from 'hooks/useTheme';
import { PromotionsFormEdit } from '../PromotionsFormEdit'; 
import { PromotionsForm } from '../PromotionsForm'; 
import { PromotionsDescription } from '../PromotionsDescription'; 
import { ContextMenu, createContextMenuItem } from 'components/ContextMenu';
import ThreeDotsButton from 'components/ThreeDotsButton';
import { deletePromotion } from 'providers/api';

const commands = {
  edit: 'edit',
  delete: 'delete'
};

export const PromotionList = () => {
  const { currentTheme } = useTheme();
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
  } = useTable({ endpoint: '/sale-off' });
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure, 
    setvaluesStructure,
    role, 
    isUserNestle
  } = usePromotionList({ search, setExtraParams, resetFilters });
  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(0);
  const [typePromotion, setTypePromotion] = useState('');
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleCreateModal = () => setShowCreateModal(!showCreateModal);
  const toggleDescriptionModal = () => setShowDescriptionModal(!showDescriptionModal);
  
  const handleDeletePromotion = async (item) => {
    const ok = await promiseModal.openModal(
      msgs.deleteModalTitle,
      msgs.deleteModalText
    );

    if (!ok) return;

    const id = item.id;

    try {
      await deletePromotion(id);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editPromotion = (item) => {
    // open drawer
    setSelectedPromotion(item.id);
    setTypePromotion(item.sale_off_type_name);
    setShowEditModal(true);
  };

  const createItem = () => {
    setSelectedPromotion(0);
    setShowCreateModal(true);
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editPromotion(item);
    } else if (command === commands.delete) {
      handleDeletePromotion(item);
    }
  };

  const getContextMenuItems = (index) => [
    createContextMenuItem(`${commands.edit}-${index}`, 'Editar'),
    createContextMenuItem(`${commands.delete}-${index}`, 'Borrar')
  ];

  const handleAcceptEdit = () => {
    setShowEditModal(false);
    setSelectedPromotion(0);
    search();
  };

  const handleAcceptCreate = () => {
    setShowCreateModal(false);
    search();
  };
  
  const  ExportToExcel = async () => {    
    let paramsToSend = getExtraParams(extraParams);
    let response = await getPromotionsExcel(pageSize,page,searchItem,paramsToSend)
    FileDownload(response, 'lista_promociones_' + new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + '.xlsx');
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


  const getStatus = (status, date) => {
    if (status === "always") {
      return "Siempre activo";
    } else if (status === "inactive") {
      return "Inactivo";
    }else if (status === "active_until") {
      return "Activo hasta " + moment(date).format('DD-MM-YYYY HH:mm');
    }
  };

  const descriptionModal = (item) => {
    // open drawer
    setSelectedPromotion(item.id);
    setTypePromotion(item.sale_off_type_name)
    toggleDescriptionModal();
  };

  return (
    <div>
      <NestcaPageHeader
        showFilterButton
        title={msgs.pageTitle}
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.PromotionIconDark : Pages.PromotionIcon}
        showCount={false}
      />
      <PromotionsForm
      onAccept={handleAcceptCreate}
      onClose={toggleCreateModal}
      visible={showCreateModal}     
      role_id={role}
      />
      <PromotionsFormEdit
      onAccept={handleAcceptEdit}
      onClose={toggleEditModal}
      visible={showEditModal}     
      role_id={role}        
      promotionId={selectedPromotion}
      typePromotion={typePromotion}
      />
      <PromotionsDescription
      onAccept={toggleDescriptionModal}
      onClose={toggleDescriptionModal}
      visible={showDescriptionModal}     
      role_id={role}        
      promotionId={selectedPromotion}
      typePromotion={typePromotion}
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
              <Button className={classes.mainButton}  onClick={createItem}>
                {msgs.buttonNewPromotion}
              </Button>
            </div>
            <div className={"col-md-6"} align={"right"}>
              <Button className={classes.downloadButton} icon={Images.ExcelIcon} onClick={async () => { await ExportToExcel()}}>
                {msgs.buttonExportExcel}
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
              <th>{msgs.tableId}</th>
              <th>{msgs.tableTitlePromotion}</th>
              {isUserNestle() ? <th>{msgs.tableTypePromotion}</th> : null}              
              {isUserNestle() ? <th>{msgs.tableClient}</th> : null}
              <th>{msgs.tableBranch}</th>
              <th>{msgs.tableCreateOn}</th>
              <th>{msgs.tableStatus}</th>
              <th>{msgs.tableAction}</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
              <tr key={item.id}>
                <td onClick={()=>{descriptionModal(item)}} style={{cursor:"pointer"}}>{item.id}</td>
                <td onClick={()=>{descriptionModal(item)}} style={{cursor:"pointer"}}>{item.name}</td>
                {isUserNestle() ? <td onClick={()=>{descriptionModal(item)}} style={{cursor:"pointer"}}>{item.sale_off_type_name}</td> : null}
                {isUserNestle() ? <td onClick={()=>{descriptionModal(item)}} style={{cursor:"pointer"}}>{item.clients === null ? "" : item.clients.join(",")}</td> : null}
                <td onClick={()=>{descriptionModal(item)}} style={{cursor:"pointer"}}>{item.branches === null ? "" :item.branches.join(",")}</td>
                <td onClick={()=>{descriptionModal(item)}} style={{cursor:"pointer"}}>{moment(item.created_on).format('DD-MM-YYYY HH:mm')}</td>
                <td onClick={()=>{descriptionModal(item)}} style={{cursor:"pointer"}}>{getStatus(item.validity_type, item.validity_date)}</td>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentRelocator>
    </div>
  );
};
