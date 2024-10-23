import React, { useState } from 'react';
import moment from 'moment';
import {deleteClient} from 'providers/api';
import { useStyles } from './ClientsListStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import ThreeDotsButton from 'components/ThreeDotsButton';
import { ContextMenu, createContextMenuItem } from 'components/ContextMenu';
import CancelOkModal from 'components/CancelOkModal';
import usePromiseModal from 'hooks/usePromiseModal';
import { ClientForm } from '../ClientForm';
import { messages } from './ClientsListMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { useTheme } from 'hooks/useTheme';
const commands = {
  products: 'products',
  exchange: 'exchange',
  edit: 'edit',
  delete: 'delete'
};

export const ClientsList = () => {
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
  } = useTable({ endpoint: '/clients' });
  const classes = useStyles({currentTheme});
  const promiseModal = usePromiseModal();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleShowFilters = () => setShowFilters(!showFilters);
  const toggleRestoreFilters = () => {
    resetFilters();
    setShowFilters(!showFilters);
  }

  const onSearchFilterHandler = (data) => {
    let datetime_lower_bound = '';
    let datetime_upper_bound = '';

    if(data.selectedDate){
      let dateInit = new Date(data.selectedDate);
      dateInit.setUTCHours(0);
      dateInit.setUTCMinutes(0);
      dateInit.setUTCSeconds(0);
      datetime_lower_bound=dateInit.toISOString();
    }

    if(data.selectedDateEnd){
      let dateEnd = new Date(data.selectedDateEnd);
      dateEnd.setUTCHours(23);
      dateEnd.setUTCMinutes(59);
      dateEnd.setUTCSeconds(59);
      datetime_upper_bound=dateEnd.toISOString();
    }
    setExtraParams({ 
      datetime_lower_bound,
      datetime_upper_bound,
    })
    setShowFilters(!showFilters);
  };

  const deleteUser = async (item) => {
    const ok = await promiseModal.openModal(
      msgs.deleteModalTitle,
      msgs.deleteModalText
    );

    if (!ok) return;

    const id = item.id;

    try {
      await deleteClient(id);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editScreen = (item) => {
    // open drawer
    setSelectedClient(item.id);
    setShowEditModal(true);
  };

  const createItem = () => {
    setSelectedClient(0);
    setShowEditModal(true);
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editScreen(item);
    } else if (command === commands.delete) {
      deleteUser(item);
    }
  };

  const getContextMenuItems = (index) => [
    createContextMenuItem(`${commands.edit}-${index}`, 'Editar'),
    createContextMenuItem(`${commands.delete}-${index}`, 'Borrar')
  ];

  const handleAcceptEdit = () => {
    setShowEditModal(false);
    search();
  };

  return (
    <div>
      <NestcaPageHeader
        showFilterButton
        title={msgs.pageTitle}
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.ClientsPageIconDark : Pages.ClientsPageIcon}
        count={totalFound}
      />
      <FilterModal
        visible={showFilters}
        onSearch={onSearchFilterHandler}
        onRestore={toggleRestoreFilters}
        onClose={toggleShowFilters}
        endDate={true}
      />
      <ClientForm
        visible={showEditModal}
        onClose={toggleEditModal}
        onAccept={handleAcceptEdit}
        clientId={selectedClient}
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
        <div className={classes.settingsCont}>
          <Button className={classes.mainButton}  onClick={createItem}>
            {msgs.buttonNewClient}
          </Button>
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
              <th>{msgs.tableColumnName}</th>
              <th>{msgs.tableColumnDateCreated}</th>
              <th>{msgs.tableColumnConnection}</th>
              <th>{msgs.tableColumnBranches}</th>
              <th>{msgs.tableColumnDigitalDisplay}</th>
              <th>{msgs.tableColumnTotem}</th>
              <th>{msgs.tableColumnAction}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{item.nestle_id}</td>
                <td>{item.name}</td>
                <td>{moment(item.created_on).format('DD-MM-YYYY HH:mm')}</td>
                <td>{item.connection ? 'Si' : 'No'}</td>
                <td>{item.quantity_branch || 0}</td>
                <td>{item.quantity_digital_display || 0}</td>
                <td>{item.quantity_totem || 0}</td>
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
