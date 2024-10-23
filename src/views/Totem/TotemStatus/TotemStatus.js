import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { content } from './styles/Content.css.js';
import { bottom } from './styles/Bottom.css.js';
import { usersListStyle } from './styles/UsersList.css';
import DeleteUser from 'components/DeleteUser';
import useAxios from '../../../hooks/useAxios';
import Modal from '../../../components/Modal';
import { FormattedMessage } from 'react-intl';
import { messagesintl } from 'views/Users/messages';
import { DeleteUserContext } from 'components/DeleteUser/hooks/DeleteUserContext.js';
import NewAccountButton from 'components/NewAccountButton/NewAccountButton.js';
import { Search } from './components/Search';
import './TotemStatusStyles.css';
import { Profile } from 'views/Users/UserCreate';
import { Edit } from 'views/Users/UserEdit';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { red } from '@material-ui/core/colors';
import Button from 'components/Button';
import { useHistory } from 'react-router-dom';
import { NestcaPageHeader } from 'components/NestcaPageHeader/NestcaPageHeader.js';
import { Pages } from 'assets/index.js';

import { useTable } from 'hooks/useTableV2';
import DisplayCard from 'components/DisplayCard/DisplayCard.js';
import SimpleTabs from 'components/SimpleTabs/SimpleTabs.js';

import { TotemDetail } from '../TotemDetail';
import { TotemEdit } from '../TotemEdit/TotemEdit.js';
import useUserMetadata from 'hooks/useUserMetadata';
import NetscaPagination from 'components/NetscaPagination';
import { useTheme } from 'hooks/useTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaginaion-root': {
      color: '#ffffffff',
      background: '#900000',
      width: '87px',
      height: '3100px'
    },
    '& .MuiButtonBase-root': {
      width: '31px',
      height: '31px',
      textAlign: 'center',
      font: 'normal normal normal 13px Roboto',
      letterSpacing: '0px',
      color: '#5D5D5D',
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      border: '1px solid #E8E9ECFF',
      marginTop: '3px'
    },
    '& .Mui-selected': {
      width: '31px',
      height: '31px',
      textAlign: 'center',
      font: 'normal normal normal 13px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      background: '#000000 0% 0% no-repeat padding-box',
      border: '1px solid #E8E9ECFF',
      marginTop: '3px'
    }
    // '& > *': {
    //   marginTop: theme.spacing(0)
    // }
  }
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root, & .MuiInputBase-root.Mui-Focus': {
      color: '#ffffffff',
      background: '#E1E1E10f',
      width: '87px',
      height: '31px'
    },
    '& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-Focus': {
      marginTop: '-5px',
      font: '13px Roboto',
      letterSpacing: '0px',
      color: '#5D5D5D',
      opacity: 0.5
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 87
  }
}));

const CardComponent = ({ data, toggleEdit, onClick }) => (
  <div css={content}>
    <div css={usersListStyle()}>
      <div id="cardsArea">
        {data.map((item, index) => (
          <DisplayCard
            type="user"
            key={item.id}
            clientInfo={item}
            // onClick={() => toggleEdit(index)}
            onClickCard={onClick}
            typeCard="true"
            typeView="totem"
          />
        ))}
      </div>
    </div>
  </div>
);

export const TotemStatus = () => {
  const { get } = useAxios();
  const { currentTheme, mode } = useTheme();
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState({});
  const classes = useStyles();
  // const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pages, setPages] = useState(10);
  const [change, changePage] = useState(false);
  const [total, setTotalPages] = useState(0);
  const [searching, isSearching] = useState(false);
  const [itemsAssigned, setItemsAssigned] = useState();
  const [itemsNotAssigned, setItemsNotAssigned] = useState();
  // const [searchItem, setSearchItem] = useState({});
  const history = useHistory();
  const toggleChange = () => changePage(!change);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const toggleEditModal = () => setShowDetailModal(!showDetailModal);
  const toggleEditOnModal = () => setShowEditModal(!showEditModal);

  const [selectedTotem, setSelectedTotem] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [whichTab, setWhichTab] = useState(true);
  const [founded, setFounded] = useState();
  const [update, setUpdate] = useState(false);
  // const toggleSearch = () => {
  //   falseItems.setSearchItem(trueItems.searchItem);
  //   trueItems.setSearchItem(falseItems.searchItem);
  //   falseItems.search();
  //   trueItems.search();
  // }

  const onError = () => {};
  const { role, perms, loading, userName } = useUserMetadata({ onError });
  
  // const {
  //   onChangeSearchItem,
  //   onChangeSize,
  //   onChangePage,
  //   totalFound,
  //   page,
  //   pageSize,
  //   searchItem,
  //   items,
  //   search,
  //   resetFilters,
  //   setOrderBy,
  //   extraParams,
  //   setExtraParams,
  //   setSearchItem
  // } = useTable({ endpoint: '/digital-display/details' });

  const trueItems = useTable({ endpoint: '/totem/details', enter: true});
  const falseItems = useTable({ endpoint: '/totem/available', enter:true });
  const toggleUpdate = () =>  {
    trueItems.search();
    falseItems.search();
  }
  // const toggleShowFilters = () => {
  //   resetFilters();
  //   // setShowFilters(!showFilters);
  // };

  const callOnchange = (e) => {
    trueItems.onChangeSearchItem(e);
    falseItems.onChangeSearchItem(e);
  }

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //   //   //let response = await get('/users')
  //   //   // let response = await get('/users', {
  //   //   //   page_size: rowsPerPage,
  //   //   //   page_number: page
  //   //   // });
  //   //   let response_number;
  //   //   let response;

  //   //   if (searching) {
  //   //     response_number = await get('/digital-display/details');
  //   //     response = await get(
  //   //       `/digital-display/details?search_item=${searchItem}`
  //   //     );
  //   //     isSearching(false);
  //   //   } else {
  //   //     response_number = await get(
  //   //       `/digital-display/details?is_assigned=true&page_size=${rowsPerPage}&page_number=${page}`
  //   //     );
  //   //     response = await get(
  //   //       `/digital-display/details?is_assigned=true&page_size=${rowsPerPage}&page_number=${page}`
  //   //     );
  //   //     setItemsAssigned(response.data.result.items);
  //   //     response_number = await get(
  //   //       `/digital-display/details?is_assigned=false&page_size=${rowsPerPage}&page_number=${page}`
  //   //     );
  //   //     response = await get(
  //   //       `/digital-display/details?is_assigned=false&page_size=${rowsPerPage}&page_number=${page}`
  //   //     );
  //   //     setItemsNotAssigned(response.data.result.items);
  //   //   }

  //   //   setTotalPages(Object.keys(response_number).length);
  //   //   setData(response.data.result.items);
  //   //   //setExtraParams({ is_assigned: true });
  //   //   search();
  //   //   setTimeout(() => {
  //   //     setDataLoading(false);
  //   //   }, 500);
  //     }

  //   // setPages(total / rowsPerPage);
  //   // if (pages <= 1) setPages(1);

  //   fetchMyAPI();
  //   //setFounded(falseItems.totalFound + trueItems.totalFound)
  //   //search();
  //   //toggleSearch();
  //   //setDataLoading(false);
  // }, [trueItems.searchItem, falseItems.searchItem]);

  // const handleChangePage = (event, newPage) => {
  //   // setPage(newPage);
  //   changePage(!change);
  //   onChangePage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(event.target.value);
  //   changePage(!change);
  //   onChangeSize(event.target.value);
  // };

  const [showProfile, setShowProfile] = useState(false);
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    changePage(!change);
  };

  const [showProfileEdit, setShowEdit] = useState(false);
  const [userEdit, setUserEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const toggleEdit = (index) => {
    setShowEdit(!showProfileEdit);
    setUserData(data[index]);
  };
  const toggleEdited = () => {
    setShowEdit(!showProfileEdit);
    changePage(!change);
  };

  const classes2 = useStyles2();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleSearch = (event) => {
  //   if (event.target.value === '') {
  //     isSearching(false);
  //     changePage(!change);
  //   } else {
  //     // setSearchItem(event.target.value);
  //     isSearching(true);
  //     changePage(!change);
  //   }
  // };

  const redirectList = () => history.push('/totem/list');

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onClickCardHadler = (i) => {
    setShowDetailModal(true);
    setSelectedTotem(i.id);
  };
  const onClickCardEditHadler = (i) => {
    setShowEditModal(true);
    setSelectedTotem(i.id);
  };

  const tabsLabels =
    role === 4 || role === 5
      ? ['Tótems disponibles']
      : ['Tótems asignados', 'Tótems disponibles'];
  const tabsContent = dataLoading
    ? [
        <CardComponent onClick={onClickCardHadler} data={trueItems.items} />,
        <CardComponent
          onClick={onClickCardEditHadler}
          data={falseItems.items}
        />
      ]
    : [
        <CardComponent onClick={onClickCardHadler} data={trueItems.items} />,
        <CardComponent
          onClick={onClickCardEditHadler}
          data={falseItems.items}
        />
      ];

  const onChangeTabHandler = async (tab) => {
    // if (whichTab) {
    //   falseItems.setSearchItem(trueItems.searchItem);
    // } else {
    //   trueItems.setSearchItem(falseItems.searchItem);
    //   //toggleChange();
    // }
    //await search();
    // falseItems.search();
    // trueItems.search();
    setWhichTab(!whichTab);
    //setExtraParams({ is_assigned: tab === 0 ? true : false });
    //search();
  };

  const handleAcceptEdit = () => {
    setShowEditModal(false);
    search();
  };

  return (
    <div>
      <NestcaPageHeader
        title="Tótems:"
        Icon={currentTheme.themeDark ? Pages.TotemPageIcon : Pages.TotemPageIcon}
        count={trueItems.totalFound + falseItems.totalFound}
        // searchItem={searchItem}
        // onChangeSearchItem={onChangeSearchItem}
        searchItem={whichTab ? trueItems.searchItem : falseItems.searchItem}
        onChangeSearchItem={(e) => callOnchange(e)}
        //onChangeSearchItem={whichTab ? trueItems.onChangeSearchItem : falseItems.onChangeSearchItem}
        // showFilterButton
        // onClickFilterButton={toggleShowFilters}
      />
      {/* <Search number={Object.keys(data).length} onChange={handleSearch} />
       */}
      <TotemDetail
        visible={showDetailModal}
        onClose={toggleEditModal}
        totemId={selectedTotem}
        toggleUpdate={toggleUpdate}
      />
      <TotemEdit
        visible={showEditModal}
        onClose={toggleEditOnModal}
        onAccept={handleAcceptEdit}
        totemId={selectedTotem}
        toggleUpdate={toggleUpdate}
      />
      <div className="row mt-4">
        <div className="col-md-10">
          <p css={css`
          padding-left: 44px;
          height: 16px;
          text-align: left;
          font: normal normal normal 12px/16px Roboto;
          letter-spacing: 0px;
          color: ${mode !== 'dark' 
            ? '#63513d82'
            : '#FFFFFF'};
          opacity: 1;
        `}>
            Agrega nuevos dispositivos tótems para gestionar su interfaz y funcionamiento.
          </p>
        </div>
        <div className="col-md-2">
          <Button onClick={redirectList}>Gestionar tótems</Button>
        </div>
      </div>
      <NetscaPagination
        total={whichTab ? trueItems.totalFound : falseItems.totalFound}
        page={whichTab ? trueItems.page : falseItems.page}
        pageSize={whichTab ? trueItems.pageSize : falseItems.pageSize}
        onChangeSize={whichTab ? trueItems.onChangeSize : falseItems.onChangeSize}
        onChangePage={whichTab ? trueItems.onChangePage : falseItems.onChangePage}
      >
        <div className="row">
          <div className="col-md-12">
            {dataLoading ? (
              <p>
                <FormattedMessage {...messagesintl.loading} />
              </p>
            ) : (
              <SimpleTabs
                onChangeTab={onChangeTabHandler}
                tabs={tabsLabels}
                content={tabsContent}
              />
            )}
          </div>
        </div>
      </NetscaPagination>
      {/* <NewAccountButton type="user" onClick={toggleProfile} /> */}
      {/* <Profile visible={showProfile} onClose={toggleProfile} />
      <Edit
        visible={showProfileEdit}
        onClose={toggleEdited}
        userData={userData}
      /> */}
      {/* <DeleteUserContext.Provider
        value={{ showDeleteModal, setShowDeleteModal }}
      >
        {showDeleteModal.show ? (
          <Modal visible>
            <DeleteUser userId={showDeleteModal.userId} />
          </Modal>
        ) : (
          <div css={content}>
            <div css={usersListStyle()}>
              {dataLoading ? (
                <p>
                  <FormattedMessage {...messagesintl.loading} />
                </p>
              ) : (
                <div id="cardsArea">
                  {data.map((item, index) => (
                    <DisplayCard
                      type="user"
                      key={item.id}
                      clientInfo={item}
                      onClick={() => toggleEdit(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </DeleteUserContext.Provider> */}
      {/* <div css={bottom}>
        <div id="paginatiosn">
          <Pagination
            count={pages}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
            className={classes.root}
          />
        </div>
        <div>
          <FormControl variant="outlined" className={classes2.root}>
            <InputLabel id="demo-controlled-open-select-label">
              {rowsPerPage}/page
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              className={classes2.formControl}
              onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div> */}
    </div>
  );
};
