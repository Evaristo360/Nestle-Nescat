import React, { useState, useEffect } from 'react';
import moment from 'moment';
import useAxios from 'hooks/useAxios';
import { style } from './ProductListStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import ThreeDotsButton from 'components/ThreeDotsButton';
import { ContextMenu, createContextMenuItem } from 'components/ContextMenu';
import CancelOkModal from 'components/CancelOkModal';
import SuccessDelete from 'components/SuccessDelete';
import usePromiseModal from 'hooks/usePromiseModal';
import { createOption } from 'components/SelectV2';
import { ProductEdit } from '../ProductEdit/ProductEdit';
import { ProductCreate } from '../ProductCreate/ProductCreate';
import { ProductDescription } from '../ProductDescription/ProductDescription';
import { messages as formMessages } from './ProductListMessages';
import { intlExt } from 'providers/intlExt';
import { useTheme } from 'hooks/useTheme';
import { config } from 'providers/config';
import LazyLoad from 'react-lazy-load';
import FilterModal from 'components/FilterModal';
import { useRedemptionPointsList } from './useRedemptionPointsList';

const connOptions = [
  createOption('Activa', 'true'),
  createOption('Inactiva', 'false')
];

const commands = {
  edit: 'edit',
  delete: 'delete'
};

export const ProductList = () => {
  const { currentTheme } = useTheme();
  const [isReload, setISReload] = useState(false);
  const axios = useAxios();
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
  } = useTable({ endpoint: '/products' });
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [resetCreate, setResetCreate] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showProductDescription, setshowProductDescription] = useState(false);
  const [productData, setProductData] = useState(0);
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setISReload(!isReload);
    //setResetCreate(!resetCreate);
    //search();
  };
  const toggleSuccessDelete = () => setShowSuccessDelete(!showSuccessDelete);

  const toggleDescription = (id) => {
    setshowProductDescription(!showProductDescription);
    setProductData(id);
    setISReload(!isReload);
    //search();
  };
  const closeDescription = () => {
    setshowProductDescription(!showProductDescription);
    setISReload(!isReload);
  };
  const closeCreatedFormatEquivalence = () => {
    setshowProductDescription(!showProductDescription);
    setISReload(!isReload);
    search();
  };
  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
    setISReload(!isReload);
    //search();
    // window.location.reload();
  };
  const successAccept = () => {
    search();
    // window.location.reload();
  };

  const cancel = () => {
    setResetCreate(!resetCreate);
    // window.location.reload();
  };

  const deleteScreen = async (item) => {
    const ok = await promiseModal.openModal(
      'Borrar producto',
      '¿Estás seguro de querer eliminar este producto?'
    );

    if (!ok) return;

    const id = item.id;

    try {
      await axios.deleteRequest(`/products/${id}`);
      toggleSuccessDelete();
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editScreen = (item) => {
    // open drawer
    setSelectedScreen(item.id);
    setShowEditModal(true);
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editScreen(item);
    } else if (command === commands.delete) {
      deleteScreen(item);
    }
  };

  const handleAcceptEdit = () => {
    setShowEditModal(false);
    search();
  };

  return (
    <div>
      <NestcaPageHeader
        showFilterButton
        title={intlExt.formatMessage(formMessages.pageTitle)}
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={
          currentTheme.themeDark
            ? Pages.ProductPageIconDark
            : Pages.ProductPageIcon
        }
        count={totalFound}
      />
      <ProductCreate
        visible={showProfile}
        onClose={toggleProfile}
        reset={resetCreate}
        successAccept={successAccept}
        cancel={cancel}
      />
      <ProductDescription
        visible={showProductDescription}
        onClose={closeDescription}
        successAccept={closeCreatedFormatEquivalence}
        productData={productData}
      />
      <ProductEdit
        visible={showEditModal}
        onClose={toggleEditModal}
        onAccept={handleAcceptEdit}
        productData={selectedScreen}
        successAccept={successAccept}
      />
      <CancelOkModal
        visible={promiseModal.showModal}
        onAccept={promiseModal.onAccept}
        onCancel={promiseModal.onCancel}
        okLabel={intlExt.formatMessage(formMessages.okLabel)}
        cancelLabel={intlExt.formatMessage(formMessages.cancelLabel)}
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
      <SuccessDelete
        visible={showSuccessDelete}
        onClick={toggleSuccessDelete}
        erasedElement={intlExt.formatMessage(formMessages.erasedElement)}
      />
      <ContentRelocator>
        <div className={classes.infoContainer}>
          <p className={classes.text}>
            {intlExt.formatMessage(formMessages.pageSubtitle)}
          </p>
        </div>
        <div className={classes.settingsCont}>
          <Button
            type="user"
            onClick={toggleProfile}
            className={classes.saveButton}
          >
            {intlExt.formatMessage(formMessages.newProduct)}
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
              <th>{intlExt.formatMessage(formMessages.tableTitle_ID)}</th>
              <th>
                {intlExt.formatMessage(formMessages.tableTitle_productTitle)}
              </th>
              <th>{intlExt.formatMessage(formMessages.tableTitle_division)}</th>
              <th>{intlExt.formatMessage(formMessages.tableTitle_category)}</th>
              <th>
                {intlExt.formatMessage(formMessages.tableTitle_materialGroup)}
              </th>
              <th>
                {intlExt.formatMessage(
                  formMessages.tableTitle_equivalentFormat
                )}
              </th>
              <th>{intlExt.formatMessage(formMessages.tableTitle_date)}</th>
              <th>{intlExt.formatMessage(formMessages.tableTitle_image)}</th>
              <th>{intlExt.formatMessage(formMessages.tableTitle_sku)}</th>
              <th>
                {intlExt.formatMessage(formMessages.tableTitle_materialSap)}
              </th>
              <th>{intlExt.formatMessage(formMessages.tableTitle_action)}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`title${index}`}>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`name=${item.id}${index}`}
                >
                  {item.id}{' '}
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`name=${item.description}${index}`}
                >
                  {item.description}
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`division=${item.division_name}${index}`}
                >
                  {item.division_name}
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`category=${item.category_name}${index}`}
                >
                  {item.category_name}
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`material_group=${item.material_group_name}${index}`}
                >
                  {item.material_group_name}
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`format_equivalence=${item.format_equivalence_name}${index}`}
                >
                  {item.format_equivalence_name}
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`created_on=${item.created_on}${index}`}
                >
                  {moment(item.created_on).format('DD-MM-YYYY - HH:mm')}
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`image_url=${item.image_url}${index}`}
                >
                  <LazyLoad>
                    <img
                      className={classes.image}
                      src={config.siteConfig.apiUrl + '/' + item.image_url}
                      onClick={() => toggleDescription(item.id)}
                      alt={item.name}
                    />
                  </LazyLoad>
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`sku=${item.sku}${index}`}
                >
                  {item.sku}
                </td>
                <td
                  onClick={() => toggleDescription(item.id)}
                  key={`code_sap=${item.code_sap}${index}`}
                >
                  {item.code_sap}
                </td>
                <td key={`options${index}`}>
                  <ContextMenu
                    items={[
                      createContextMenuItem(
                        `${commands.edit}-${index}`,
                        intlExt.formatMessage(formMessages.edit)
                      ),
                      createContextMenuItem(
                        `${commands.delete}-${index}`,
                        intlExt.formatMessage(formMessages.erase)
                      )
                    ]}
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
