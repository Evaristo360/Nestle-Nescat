import React, { useState } from 'react';
import moment from 'moment';
import useAxios from 'hooks/useAxios';
import { useStyles } from './ScreenListStyles';
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
import { ScreenEdit } from '../ScreenEdit';
import { useTheme } from 'hooks/useTheme';
import FilterModal from 'components/FilterModal';
import { useFilter } from './useFilter';

const connOptions = [
  createOption('Activa', 'true'),
  createOption('Inactiva', 'false')
];

const commands = {
  edit: 'edit',
  delete: 'delete'
};

export const ScreensList = () => {
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
    resetFilters,
    setOrderBy,
    extraParams,
    setExtraParams
  } = useTable({ endpoint: '/screen' });
  const {
    filterStructureJSON,
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler,
    valuesStructure, 
    setvaluesStructure
  } = useFilter({ search, setExtraParams, resetFilters });
  const classes = useStyles({currentTheme });
  const promiseModal = usePromiseModal();
  const axios = useAxios();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState({});
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const deleteScreen = async (item) => {
    const ok = await promiseModal.openModal(
      'Eliminar pantalla',
      '¿Estás seguro de querer eliminar esta pantalla? Se desvinculará de cualquier evento que se tenga programado, si el evento sólo tiene esta pantalla configurada, el evento se eliminará.'
    );

    if (!ok) return;

    const id = item.id;

    try {
      await axios.deleteRequest(`/screen/${id}`);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editScreen = (item) => {
    // open drawer
    setSelectedScreen(item);
    setShowEditModal(true);
  };

  const downloadInstaller = () => {
    console.log({ downloading: 'nothing xD' });
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
        title="Pantallas"
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.ScreenPageIconDark : Pages.ScreenPageIcon}
        count={totalFound}
      />
      <ScreenEdit
        visible={showEditModal}
        onClose={toggleEditModal}
        onAccept={handleAcceptEdit}
        screenData={selectedScreen}
      />
      <CancelOkModal
        visible={promiseModal.showModal}
        onAccept={promiseModal.onAccept}
        onCancel={promiseModal.onCancel}
        okLabel="Aceptar"
        cancelLabel="Cancelar"
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
      <ContentRelocator>
        <div className={classes.infoContainer}>
          <p className={classes.text}>
            Se muestra el detalle del dispositivo, el total de interacciones con
            el mismo.
          </p>
          <div className={classes.settingsCont}>
            <Button secondary onClick={search} className="mr-2">
              Actualizar
            </Button>
            <SelectV2
              id="select-conn"
              label="Conexión"
              value={extraParams.is_conected || ''}
              onChange={(event) =>
                setExtraParams({ is_conected: event.target.value })
              }
              options={connOptions}
              labelClassName={classes.lblPosition}
              className={classes.textPosition}
            />
            <Button onClick={resetFilters} className="ml-2">
              Restaurar
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
              <th>ID</th>
              <th>
                <OrderByButton onClick={() => setOrderBy('name')}>
                  Pantalla
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('state')}>
                  Estado
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('is_authorized')}>
                  Autorizado
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('is_conected')}>
                  Conectado
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('last_access')}>
                  Último acceso
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('ip')}>
                  Dirección IP
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('mac')}>
                  Dirección MAC
                </OrderByButton>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {item.state ? (
                    <img src={Screens.ScreenOkGreenIcon} alt="State" />
                  ) : (
                    <img src={Screens.ScreenCloudIcon} alt="State" />
                  )}
                </td>
                <td>
                  {item.is_authorized ? (
                    <img src={Screens.ScreenOkBlueIcon} alt="Authorized" />
                  ) : (
                    <img
                      src={Screens.ScreenInactiveIcon}
                      alt="Not authorized"
                    />
                  )}
                </td>
                <td>
                  {item.is_conected ? (
                    <span>
                      <img src={Screens.ScreenOkGreenIcon} alt="Active" />
                      <span className={classes.activeLabel}>Activa</span>
                    </span>
                  ) : (
                    <span>
                      <img src={Screens.ScreenInactiveIcon} alt="Inactive" />
                      <span className={classes.activeLabel}>Inactiva</span>
                    </span>
                  )}
                </td>
                <td>{moment(item.last_access).format('YYYY-MM-DD HH:mm')}</td>
                <td>{item.ip}</td>
                <td>{item.mac}</td>
                <td>
                  <ContextMenu
                    items={[
                      createContextMenuItem(
                        `${commands.edit}-${index}`,
                        'Editar'
                      ),
                      createContextMenuItem(
                        `${commands.delete}-${index}`,
                        'Borrar'
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
