import React, { useState } from 'react';
import moment from 'moment';
import {deleteBranchOffice} from 'providers/api';
import { useStyles } from './BranchOfficesListStyles';
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
import { Screens } from 'assets';
import { OrderByButton } from 'components/OrderByButton';
import { SelectV2, createOption } from 'components/SelectV2';
import { BranchOfficeForm } from '../BranchOfficeForm';
import { messages } from './BranchOfficesListMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'hooks/useTheme';

const commands = {
  products: 'products',
  exchange: 'exchange',
  edit: 'edit',
  delete: 'delete'
};

export const BranchOfficesList = () => {
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
  } = useTable({ endpoint: '/branch' });
  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  const history = useHistory();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleShowFilters = () => setShowFilters(!showFilters);
  const toggleRestoreFilters = () => {
    resetFilters();
    setShowFilters(!showFilters);
  }

  const deleteBranch = async (item) => {
    const ok = await promiseModal.openModal(
      msgs.deleteModalTitle,
      msgs.deleteModalText
    );

    if (!ok) return;

    const id = item;

    try {
      await deleteBranchOffice(id);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editBranch = (item) => {
    // open drawer
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const redirectProducts = (id) => {history.push(`/branch-offices/products/${id}`)}
  const redirectExchange = (id) => history.push(`/branch-offices/exchange/${id}`);

  const createItem = () => {
    setSelectedItem(0);
    setShowEditModal(true);
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editBranch(item.id);
    } else if (command === commands.delete) {
      deleteBranch(item.id);
    }else if (command === commands.products) {
      redirectProducts(item.id);
    }else if (command === commands.exchange) {
      redirectExchange(item.id);
    }
  };

  const getContextMenuItems = (index) => [
    createContextMenuItem(`${commands.products}-${index}`, msgs.contextItemProducts ),
    createContextMenuItem(`${commands.exchange}-${index}`, msgs.contextItemExchange ),
    createContextMenuItem(`${commands.edit}-${index}`, msgs.contextItemEdit ),
    createContextMenuItem(`${commands.delete}-${index}`, msgs.contextItemDelete )
  ];

  const handleAcceptEdit = () => {
    setShowEditModal(false);
    setSelectedItem(0);
    search();
  };

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

  return (
    <div>
      <NestcaPageHeader
        showFilterButton
        title={msgs.pageTitle}
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.BranchOfficesPageIconDark : Pages.BranchOfficesPageIcon}
        count={totalFound}
      />
      <FilterModal
        visible={showFilters}
        onSearch={onSearchFilterHandler}
        onRestore={toggleRestoreFilters}
        onClose={toggleShowFilters}
        endDate={true}
      />
      <BranchOfficeForm
        visible={showEditModal}
        onClose={toggleEditModal}
        onAccept={handleAcceptEdit}
        branchOfficeId={selectedItem}
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
          <Button className={classes.mainButton} onClick={createItem}>
            {msgs.newBranchOffice}
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
              <th>{msgs.tableColumnClient}</th>
              <th>{msgs.tableColumnRegion}</th>
              <th>{msgs.tableColumnFormat}</th>
              <th>{msgs.tableColumnSubformat}</th>
              <th>{msgs.tableColumnDigitalDisplay}</th>
              <th>{msgs.tableColumnTotems}</th>
              <th>{msgs.tableColumnProducts}</th>
              <th>{msgs.tableColumnAction}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{moment(item.created_on).format('YYYY-MM-DD HH:mm')}</td>
                <td>{item.client_name}</td>
                <td>{item.region_name}</td>
                <td>{item.format_name}</td>
                <td>{item.subformat_name}</td>
                <td>{item.quantity_digital_display}</td> 
                <td>{item.quantity_totem}</td>
                <td>{item.quantity_product}</td>
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
