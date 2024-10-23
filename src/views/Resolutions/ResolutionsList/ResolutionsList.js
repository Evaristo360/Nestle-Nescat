import React, { useState } from 'react';
import { useStyles } from './ResolutionsList.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { messages } from './messages';
import { ResolutionEditModal } from '../ResolutionEdit';
import { SelectV2, createOption } from 'components/SelectV2';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { useIntlMessages } from 'hooks/useIntlMessages';
import { Pages } from 'assets';
import { useTable } from 'hooks/useTableV2';
import { ContentRelocator } from 'components/ContentRelocator';
import Button from 'components/Button';
import Table from 'components/Table';
import { ContextMenu, createContextMenuItem } from 'components/ContextMenu';
import ThreeDotsButton from 'components/ThreeDotsButton';
import usePromiseModal from 'hooks/usePromiseModal';
import CancelOkModal from 'components/CancelOkModal';
import { deleteResolution, updateResolution } from 'providers/api/requests';
import SuccessDelete from 'components/SuccessDelete';
import { useTheme } from 'hooks/useTheme';

const commands = {
  edit: 'edit',
  delete: 'delete',
  toggleActive: 'toggleActive'
};

const connOptions = [
  createOption('Todos', 'all'),
  createOption('Si', 'true'),
  createOption('No', 'false')
];

export const ResolutionsList = () => {
  const { currentTheme } = useTheme();
  const intl = useIntl();
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
  } = useTable({ endpoint: '/resolution' });
  const intlMessages = useIntlMessages(messages);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  const [successDelete, setSuccessDelete] = useState(false);

  const createItem = () => {
    setSelectedItemId(null);
    setShowEditModal(true);
  };

  const editItem = (item = {}) => {
    setSelectedItemId(item.id);
    setShowEditModal(true);
  };

  const deleteItem = async (item = {}) => {
    const ok = await promiseModal.openModal(
      'Borrar resolución',
      '¿Estás seguro de querer borrar esta resolución?'
    );
    if (!ok) return;

    try {
      const response = await deleteResolution(item.id);
      setSuccessDelete(true);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const toggleActiveItem = async (item = {}) => {
    const ok = await promiseModal.openModal(
      `${item.is_active ? 'Desactivar' : 'Activar'} resolución`,
      `¿Estás seguro de querer ${
        item.is_active ? 'desactivar' : 'activar'
      } esta resolución?`
    );
    if (!ok) return;

    try {
      const response = await updateResolution(item.id, {
        is_active: !item.is_active
      });
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const getContextMenu = (item, index) => {
    const basicMenu = [
      createContextMenuItem(`${commands.edit}-${index}`, 'Editar')
    ];
    if (item.is_active) {
      basicMenu.push(
        createContextMenuItem(`${commands.toggleActive}-${index}`, 'Desactivar')
      );
    } else {
      basicMenu.push(
        createContextMenuItem(`${commands.toggleActive}-${index}`, 'Activar')
      );
      basicMenu.push(
        createContextMenuItem(`${commands.delete}-${index}`, 'Borrar')
      );
    }

    return basicMenu;
  };

  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editItem(item);
    } else if (command === commands.delete) {
      deleteItem(item);
    } else if (command === commands.toggleActive) {
      toggleActiveItem(item);
    }
  };

  return (
    <section>
      <ResolutionEditModal
        id={selectedItemId}
        showModal={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedItemId(null);
          search();
        }}
      />

      <NestcaPageHeader
        title={intlMessages.title}
        Icon={currentTheme.themeDark ? Pages.ScenePageIconDark : Pages.ScenePageIcon}
        count={totalFound}
      />
      <ContentRelocator>
        <div className={classes.settingsCont}>
          <div>
            <p className={classes.text}>
              Todas las resoluciones que han sido añadidas a la plataforma
            </p>
            <Button onClick={createItem} className="mt-2" secondary>
              Nueva resolución
            </Button>
          </div>
          <div className={classes.centerCont}>
            <SelectV2
              id="status"
              name="status"
              label={intl.formatMessage(messages.ableSelect)}
              value={extraParams.is_active || 'all'}
              onChange={(event) =>
                addExtraParams({ is_active: event.target.value })
              }
              options={connOptions}
              labelClassName={classes.lblPosition}
              className={classes.textPosition}
            />
            <Button onClick={resetFilters} className="ml-2" secondary>
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
              <th>Resolución</th>
              <th>Ancho</th>
              <th>Alto</th>
              <th>Habilitado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.resolution}</td>
                <td>{item.width}px</td>
                <td>{item.height}px</td>
                <td>{item.is_active ? 'Si' : 'No'}</td>
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
      <SuccessDelete
        onClick={() => setSuccessDelete(false)}
        visible={successDelete}
        erasedElement="elemento"
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
    </section>
  );
};
