import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useStyles } from './DigitalDisplayListStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import { ContentRelocator } from 'components/ContentRelocator';
import CancelOkModal from 'components/CancelOkModal';
import usePromiseModal from 'hooks/usePromiseModal';
import { DigitalDisplayEdit } from '../DigitalDisplayEdit';
import ThreeDotsButton from 'components/ThreeDotsButton';
import { ContextMenu, createContextMenuItem } from 'components/ContextMenu';
import FilterModal from 'components/FilterModal';
import { useHistory } from 'react-router-dom';
import { messages } from './DigitalDisplayListMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import { editDigitalDisplay } from 'providers/api';
import { useDigitalDisplayList } from './useDigitalDisplayList';
import { useTheme } from 'hooks/useTheme';

export const DigitalDisplayList = () => {
  const { currentTheme } = useTheme();
  const msgs = useIntlMessages(messages);
  const history = useHistory();
  const redirectStatus = () => history.push('/digital-display/status');

  const commands = {
    edit: 'edit',
    delete: 'delete'
  };

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
  } = useTable({ endpoint: '/digital-display'});
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure, 
    setvaluesStructure
  } = useDigitalDisplayList({ search, setExtraParams, resetFilters });
  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDigitalDisplay, setSelectedDigitalDisplay] = useState(0);
  const [editableForm, setEditableForm] = useState(false);
  const toggleEditModal = () => {
    setSelectedDigitalDisplay(0);
    setShowEditModal(!showEditModal)
  };
 
  const editItem = (item) => {
    // open drawer
    setSelectedDigitalDisplay(item.id);
    setEditableForm(false);
    setShowEditModal(true);
  };

  const readItem = (id) => {
    // open drawer
    setSelectedDigitalDisplay(id);
    setEditableForm(true);
    setShowEditModal(true);
  };

  const handleAcceptEdit = () => {
    setShowEditModal(false);
    setSelectedDigitalDisplay(0);
    search();
  };

  const statusItem = async (item) => {
    var state =  msgs.stateInactive;
    var title = msgs.deleteModalTitle.replace("<state>",state)
    var subTitle = msgs.deleteModalText.replace("<state>",state.toLowerCase())
    const ok = await promiseModal.openModal(
      title,
      subTitle
    );

    if (!ok) return;

    const id = item.id;

    try {
      let data = {}
      await editDigitalDisplay(id, data);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editItem(item);
    } else if (command === commands.delete) {
      statusItem(item);
    }
  };

  return (
    <div>
      <FilterModal 
      visible={showFilters} 
      onRestore={toggleRestoreFilters}
      onSearch={onSearchFilterHandler}
      onClose={toggleShowFilters}
      endDate={true}
      optionStructure={filterStructureJSON}
      valueStructure={valuesStructure}
      setValueStructure={setvaluesStructure}
      />
      <NestcaPageHeader
        title={msgs.pageTitle}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.DigitalDisplayPageIconDark : Pages.DigitalDisplayPageIcon}
        count={totalFound}
        showFilterButton
        onClickFilterButton={toggleShowFilters}
        showGoBack
        goBack={redirectStatus}
      />
      <DigitalDisplayEdit
        visible={showEditModal}
        onClose={toggleEditModal}
        onAccept={handleAcceptEdit}
        displayId={selectedDigitalDisplay}
        editableForm={editableForm}
        assignDisplay={true}
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
          <p className={classes.text}>{msgs.pageSubtitle}</p>
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
              <th>{msgs.tableColumnName}</th>
              <th>{msgs.tableColumnDateCreate}</th>
              <th>{msgs.tableColumnClient}</th>
              <th>{msgs.tableColumnBranch}</th>
              <th>{msgs.tableColumnProducts}</th>
              <th>{msgs.tableColumnAction}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td onClick={()=>{readItem(item.id)}}>{item.name}</td>
                <td onClick={()=>{readItem(item.id)}}>{moment(item.created_on).format('YYYY-MM-DD HH:mm')}</td>
                <td onClick={()=>{readItem(item.id)}}>{item.client_name}</td>
                <td onClick={()=>{readItem(item.id)}}>{item.branch_name}</td>
                <td onClick={()=>{readItem(item.id)}}>{item.products}</td>
                <td>
                  <ContextMenu
                    items={
                      item.branch_name !== null && item.client_name !== null ?
                      [
                        createContextMenuItem(
                          `${commands.edit}-${index}`,
                          msgs.optionContextEdit
                        ),
                        createContextMenuItem(
                          `${commands.delete}-${index}`,
                          msgs.stateInactive
                        )
                      ]
                      :
                      [
                        createContextMenuItem(
                          `${commands.edit}-${index}`,
                          msgs.optionContextEdit
                        )
                      ]
                    }
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
