import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FilterModal from 'components/FilterModal';
import CancelOkModal from 'components/CancelOkModal';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'hooks/useTheme';
import { SceneEdit } from '../SceneEdit';
import Table from 'components/Table';
import { OrderByButton } from 'components/OrderByButton';
import { useTable } from 'hooks/useTableV2';
import { Scenes } from 'assets';
import { useStyles } from './SceneListStyles';
import { ContextMenu, createContextMenuItem } from 'components/ContextMenu';
import usePromiseModal from 'hooks/usePromiseModal';
import useAxios from 'hooks/useAxios';
import ThreeDotsButton from 'components/ThreeDotsButton';
import moment from 'moment';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import { ContentRelocator } from 'components/ContentRelocator';
import Button from 'components/Button';
import { SelectV2, createOption } from 'components/SelectV2';
import { useGlobalApiError } from 'hooks/useGlobalApiError';

const commands = {
  edit: 'edit',
  delete: 'delete',
  design: 'design',
  deactive: 'deactive'
};

const connOptions = [
  createOption('Activa', 'true'),
  createOption('Inactiva', 'false')
];

export const SceneList = () => {
  const { currentTheme } = useTheme();
  const apiError = useGlobalApiError();
  const intl = useIntl();
  const classes = useStyles({ currentTheme });
  const history = useHistory();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSceneId, setSelectedSceneId] = useState(0);
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const promiseModal = usePromiseModal();

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
    resetFilters,
    setOrderBy,
    extraParams,
    addExtraParams
  } = useTable({ endpoint: '/scene' });
  const toggleShowFilters = () => {
    resetFilters();
    setShowFilters(!showFilters);
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editScene(item);
    } else if (command === commands.design) {
      history.push(`/scenes/design/${item.id}`);
    } else if (command === commands.deactive) {
      deactiveScene(item);
    } else if(command === commands.delete){
      deleteScene(item);
    }
  };

  const deactiveScene = async (item) => {
    const ok = await promiseModal.openModal(
      item.is_active ? 'Desactivar escena' : 'Activar escena',
      item.is_active
        ? '¿Estás seguro de querer dar de baja esta escena? Se desvinculará de las campañas a las que esté asociada.'
        : '¿Estás seguro de querer activar esta escena?'
    );

    if (!ok) return;

    const id = item.id;
    const data = { is_active: !item.is_active };

    try {
      await axios.patch(`/scene/${id}`, data);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editScene = (item) => {
    // open drawer
    setSelectedSceneId(item.id);
    setShowCreateEditModal(true);
  };

  const createScene = () => {
    setSelectedSceneId(0);
    setShowCreateEditModal(true);
  };

  const deleteScene = async (scene) => {
    if (scene.is_active) {
      await promiseModal.openModal(
        'Desactiva la escena',
        'Se necesita desactivar la escena antes de eliminar'
      );
      return;
    }
    const ok = await promiseModal.openModal(
      'Eliminar escena',
      '¿Estás seguro de eliminar esta escena?'
    );

    if (!ok) return;

    const id = scene.id;

    try {
      await axios.deleteRequest(`/scene/${id}`);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const getContextMenu = (item, index) => {
    const basicMenu = [
      createContextMenuItem(`${commands.design}-${index}`, 'Diseñar'),
      createContextMenuItem(`${commands.edit}-${index}`, 'Editar'),
      createContextMenuItem(
        `${commands.deactive}-${index}`,
        item.is_active ? 'Desactivar' : 'Activar'
      )
    ];
    if (!item.is_active) {
      basicMenu.push(
        createContextMenuItem(`${commands.delete}-${index}`, 'Eliminar')
      );
    }
    return basicMenu;
  };

  const onSearchFilterHandler = (data) => {
    const newExtraParams = { ...extraParams };

    if (data.selectedDate) {
      newExtraParams.start_date = data.selectedDate.toISOString();
      addExtraParams(newExtraParams);
    }

    setShowFilters(!showFilters);
  };

  const toggleRestoreFilters = () => {
    resetFilters();
    setShowFilters(!showFilters);
  };

  return (
    <section>
      <FilterModal
        visible={showFilters}
        onSearch={onSearchFilterHandler}
        onRestore={toggleRestoreFilters}
        onClose={toggleShowFilters}
      />
      <SceneEdit
        showModal={showCreateEditModal}
        onClose={() => {
          setShowCreateEditModal(false);
          search();
        }}
        id={selectedSceneId}
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
      <NestcaPageHeader
        title="Escenas"
        Icon={
          currentTheme.themeDark ? Pages.ScenePageIconDark : Pages.ScenePageIcon
        }
        count={totalFound}
        searchItem={searchItem}
        onChangeSearchItem={onChangeSearchItem}
        showFilterButton
        onClickFilterButton={toggleShowFilters}
      />

      <ContentRelocator>
        <div className={classes.settingsCont}>
          <div>
            <p className={classes.text}>
              Todas las presentaciones visuales que han sido creadas.
            </p>
            <Button onClick={createScene} className="mt-2">
              Nueva escena
            </Button>
          </div>
          <div className={classes.centerCont}>
            <SelectV2
              id="select-conn"
              label="Estatus"
              value={extraParams.is_active || ''}
              onChange={(event) =>
                addExtraParams({ is_active: event.target.value })
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
              <th>
                <OrderByButton onClick={() => setOrderBy('id')}>
                  ID
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('name')}>
                  Nombre
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('duration')}>
                  Duración
                </OrderByButton>
              </th>
              <th>
                <OrderByButton onClick={() => setOrderBy('created_by')}>
                  Creado por
                </OrderByButton>
              </th>
              <th>Modificado por</th>
              <th>Fecha de creación</th>
              <th>Fecha de Modificación</th>
              <th>
                <OrderByButton onClick={() => setOrderBy('is_active')}>
                  Estatus
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
                  {new Date(item.duration * 1000).toISOString().substr(11, 8)}
                </td>
                <td>{item.created_by_name}</td>
                <td>{item.modified_by_name}</td>
                <td>
                  {moment(item.created_on).local().format('YYYY-MM-DD HH:mm')}
                </td>
                <td>
                  {moment(item.modified_on).local().format('YYYY-MM-DD HH:mm')}
                </td>
                <td>
                  {item.is_active ? (
                    <span>
                      <img src={Scenes.ScreenOkGreenIcon} alt="Active" />
                      <span className={classes.activeLabel}>Activa</span>
                    </span>
                  ) : (
                    <span>
                      <img src={Scenes.ScreenInactiveIcon} alt="Inactive" />
                      <span className={classes.activeLabel}>Inactiva</span>
                    </span>
                  )}
                </td>
                <td>
                  <ContextMenu
                    items={getContextMenu(item, index)}
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
    </section>
  );
};
