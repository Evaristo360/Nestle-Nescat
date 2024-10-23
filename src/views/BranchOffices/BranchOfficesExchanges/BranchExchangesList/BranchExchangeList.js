import React, { useState } from 'react';
import moment from 'moment';
import { useStyles } from './BranchOfficesExchangeStyles';
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
import { messages } from './BranchOfficesExchangeMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { useHistory } from 'react-router-dom';
import { BranchExchangeForm } from '../BranchExchangeForm';
import { deleteBranchRedeem } from'providers/api'
import { useBranchExchangeList } from './useBranchExchangeList';
import { useTheme } from 'hooks/useTheme';
import { config } from 'providers/config';

const commands = {
  edit: 'edit',
  delete: 'delete'
};

export const BranchExchangeList = (props) => {
  const { currentTheme } = useTheme();
  const branch_id = props.match.params.id
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
  } = useTable({ endpoint: `branch/${branch_id}/product-branch-redeem/` });
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure, 
    setvaluesStructure
  } = useBranchExchangeList({ search, setExtraParams, resetFilters });

  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  const history = useHistory();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const redirectList = () => history.push('/branch-offices/list');

  const deleteExchange = async (item) => {
    const ok = await promiseModal.openModal(
      msgs.deleteModalTitle,
      msgs.deleteModalText
    );

    if (!ok) return;

    const id = item.id;

    try {
      await deleteBranchRedeem(branch_id,id);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editExchange = (item) => {
    // open drawer
    setSelectedItem(item.id);
    setShowEditModal(true);
  };

  const createItem = () => {
    setSelectedItem(0);
    setShowEditModal(true);
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editExchange(item);
    } else if (command === commands.delete) {
      deleteExchange(item);
    }
  };

  const getContextMenuItems = (index) => [
    createContextMenuItem(`${commands.edit}-${index}`, msgs.contextItemEdit ),
    createContextMenuItem(`${commands.delete}-${index}`, msgs.contextItemDelete )
  ];

  const handleAcceptEdit = () => {
    setShowEditModal(false);
    setSelectedItem(0);
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
        Icon={currentTheme.themeDark ? Pages.BranchOfficesPageIconDark : Pages.BranchOfficesPageIcon}
        count={totalFound}
        showGoBack={true}
        goBack={redirectList}
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
      <BranchExchangeForm
        visible={showEditModal}
        onClose={toggleEditModal}
        onAccept={handleAcceptEdit}
        branchOfficeId={branch_id}
        branchExchangeId={selectedItem}
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
            {msgs.newExchange}
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
              <th>{msgs.tableColumnProductTitle}</th>
              <th>{msgs.tableColumnDateCreated}</th>
              <th>{msgs.tableColumnEffectiveDate}</th>
              <th>{msgs.tableColumnProductImage}</th>
              <th>{msgs.tableColumnEquivalencePoints}</th>
              <th>{msgs.tableColumnLimited_Unlimited}</th>
              <th>{msgs.tableColumnRemainingAmount}</th>
              <th>{msgs.tableColumnAction}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{moment(item.created_on).format('YYYY-MM-DD HH:mm')}</td>
                <td>{item.validity_date !== null ? moment(item.validity_date).format('YYYY-MM-DD') : ""}</td>
                <td>
                  <img
                      className={classes.image}
                      src={config.siteConfig.apiUrl + '/' + item.image_url}
                      alt={item.name} 
                    />
                </td> 
                <td>{item.equivalence_points}</td>
                <td>{item.limited ? "Limitado":"Ilimitado"}</td>
                <td>{item.remaining_redeems !== null ? item.remaining_redeems : ""}</td>
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
