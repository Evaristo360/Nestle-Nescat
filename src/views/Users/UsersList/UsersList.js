import React, { useState } from 'react';
import { css } from '@emotion/react';
import { content } from './styles/Content.css.js';
import { usersListStyle } from './styles/UsersList.css';
import useAxios from '../../../hooks/useAxios';
import { useTable } from 'hooks/useTableV2';
import { FormattedMessage } from 'react-intl';
import { messagesintl } from '../messages';
import AccountCard from 'components/AccountCard/AccountCard.js';
import NewAccountButton from 'components/NewAccountButton/NewAccountButton.js';
import { UserCreate } from 'views/Users/UserCreate';
import { Edit } from 'views/Users/UserEdit';
import { Pages } from 'assets';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import NetscaPagination from 'components/NetscaPagination';
import SuccessDelete from 'components/SuccessDelete';
import usePromiseModal from 'hooks/usePromiseModal';
import CancelOkModal from 'components/CancelOkModal';
import { useTheme } from 'hooks/useTheme';

const initialUser = {
  advertisement: false,
  analytics: true,
  branches: false,
  client_id: 1,
  client_module: false,
  created_by: 1,
  created_on: '2021-09-20T15:14:52.552Z',
  customer: false,
  digital_display: false,
  email: 'dvfvdvfdvd@fbfgfbfg.bgbgf',
  id: 16,
  is_active: true,
  is_deleted: false,
  is_verified: true,
  last_login: '2021-09-20T15:14:52.552Z',
  load_pts: false,
  modified_by: 1,
  modified_on: '2021-09-20T15:14:52.552Z',
  name: 'vfdvfdvdfvdf',
  phone: '465549887984513',
  product: false,
  purchase_request: false,
  redemption_pts: false,
  role_id: 3,
  sale_off: false,
  totem: false,
  user_image: null,
  user_image_size: null,
  user_image_type: 'image/png'
};

const UsersList = () => {
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
  } = useTable({ endpoint: '/users' });
  const axios = useAxios();
  const { currentTheme, mode } = useTheme();
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const promiseModal = usePromiseModal();
  const toggleSuccessDelete = () => setShowSuccessDelete(!showSuccessDelete);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userData, setUserData] = useState(initialUser);

  const createUser = () => {
    setShowCreateForm(true);
  }

  const editUser = (index) => {
    setUserData(items[index]);
    setShowEditForm(true);
  };

  const onCloseForm = () => {
    setShowEditForm(false);
    setShowCreateForm(false);
    search();
  };

  const deleteElement = async (index) => {
    const trashElement = items[index];
    const ok = await promiseModal.openModal(
      `Borrar usuario: ${trashElement.name}`,
      '¿Estás seguro de querer eliminar a este usuario?'
    );

    if (!ok) return;

    const id = trashElement.id;

    try {
      await axios.deleteRequest(`/users/${id}`);
      toggleSuccessDelete();
      search();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <React.Fragment>
      <NestcaPageHeader
        title="Usuarios:"
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={
          currentTheme.themeDark ? Pages.PageUsersIconDark : Pages.PageUsersIcon
        }
        count={totalFound}
      />
      <p
        css={css`
          padding-left: 44px;
          height: 16px;
          text-align: left;
          font: normal normal normal 12px/16px Roboto;
          letter-spacing: 0px;
          color: ${mode !== 'dark' ? '#63513d82' : '#FFFFFF'};
          opacity: 1;
        `}
      >
        <FormattedMessage {...messagesintl.description} />
      </p>
      <NewAccountButton type="user" onClick={createUser} />
      <UserCreate
        visible={showCreateForm}
        onClose={onCloseForm}
      />
      <Edit
        visible={showEditForm}
        onClose={onCloseForm}
        userDatas={userData}
      />

      <SuccessDelete
        visible={showSuccessDelete}
        onClick={toggleSuccessDelete}
        erasedElement={'usuario'}
      />
      <CancelOkModal
        visible={promiseModal.showModal}
        onAccept={promiseModal.onAccept}
        onCancel={promiseModal.onCancel}
        okLabel={'Aceptar'}
        cancelLabel={'Cancelar'}
        title={promiseModal.title}
        text={promiseModal.text}
      />
      <NetscaPagination
        total={totalFound}
        page={page}
        pageSize={pageSize}
        onChangeSize={onChangeSize}
        onChangePage={onChangePage}
      >
        <div css={content}>
          <div css={usersListStyle()}>
            <div id="cardsArea">
              {items.map((item, index) => (
                <AccountCard
                  type="user"
                  key={item.id}
                  clientInfo={item}
                  onClick={() => editUser(index)}
                  onClickDelete={() => deleteElement(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </NetscaPagination>
    </React.Fragment>
  );
};

export default UsersList;
