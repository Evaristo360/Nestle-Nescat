import React from 'react';
import { useHistory } from 'react-router-dom';
import useAxios from 'hooks/useAxios';
import { messages } from '../messages';
import { useStyles } from './CampaignsList.css';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import Table from 'components/Table';
import _ from 'lodash';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import ThreeDotsButton from 'components/ThreeDotsButton';
import { ContextMenu, createContextMenuItem } from 'components/ContextMenu';
import CancelOkModal from 'components/CancelOkModal';
import usePromiseModal from 'hooks/usePromiseModal';
import { useTheme } from 'hooks/useTheme';

const commands = {
  edit: 'edit',
  delete: 'delete',
  preview: 'preview'
};

export const CampaignsList = () => {
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
    search
  } = useTable({ endpoint: '/campaign' });
  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  const axios = useAxios();
  const history = useHistory();

  const createCampaign = () => history.push(`/campaign/create`);

  const deleteCampaign = async (item) => {
    const ok = await promiseModal.openModal(
      'Borrar campaña',
      '¿Estás seguro de querer borrar esta campaña? Se eliminaran las programaciones relacionadas con esta campaña'
    );

    if (!ok) return;

    const id = item.id;

    try {
      await axios.deleteRequest(`/campaign/${id}`);
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  const editCampaign = (item) => history.push(`/campaign/edit/${item.id}`);

  const previewCampaign = (item) =>
    history.push(`/campaign/preview/${item.id}`);
  const onClickItem = (idItem) => {
    const [command, index] = idItem.split('-');
    const item = items[index];

    if (command === commands.edit) {
      editCampaign(item);
    } else if (command === commands.delete) {
      deleteCampaign(item);
    } else if (command === commands.preview) {
      previewCampaign(item);
    }
  };

  return (
    <div>
      <NestcaPageHeader
        title="Campañas"
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.CampaignPageIconDark : Pages.CampaignPageIcon}
        count={totalFound}
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
      <ContentRelocator>
        <div className={classes.infoContainer}>
          <p className={classes.text}>
            Todas las campañas que han sido creadas
          </p>
          <Button onClick={createCampaign}>Nueva campaña</Button>
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
              <th>Nombre</th>
              <th>Escenas</th>
              <th>Duración</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{_.get(item, 'scene_ids.length', 0)}</td>
                <td>{`${_.get(item, 'duration', 0)} seg`}</td>
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
                      ),
                      createContextMenuItem(
                        `${commands.preview}-${index}`,
                        'Previsualizar campaña'
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
