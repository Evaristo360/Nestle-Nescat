import React, { useState } from 'react';
import moment from 'moment';
import { useStyles } from './PendingRequestListStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import { ContentRelocator } from 'components/ContentRelocator';
import usePromiseModal from 'hooks/usePromiseModal';
import { messages } from './PendingRequestListMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'hooks/useTheme';
import Button from 'components/Button';

export const PendingRequestList = () => {
  const { currentTheme } = useTheme();
  const history = useHistory();
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
  } = useTable({ endpoint: '/load_points/pending_request' });
  const classes = useStyles({ currentTheme });
  const promiseModal = usePromiseModal();
  const [selectedLoadPoints, setSelectedLoadPoints] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => setShowFilters(!showFilters);

  const toggleRestoreFilters = () => {
    resetFilters();
    setShowFilters(!showFilters);
  };

  const onSearchFilterHandler = (data) => {
    let datetime_lower_bound = '';
    let datetime_upper_bound = '';

    if (data.selectedDate) {
      let dateInit = new Date(data.selectedDate);
      dateInit.setUTCHours(0);
      dateInit.setUTCMinutes(0);
      dateInit.setUTCSeconds(0);
      datetime_lower_bound = dateInit.toISOString();
    }

    if (data.selectedDateEnd) {
      let dateEnd = new Date(data.selectedDateEnd);
      dateEnd.setUTCHours(23);
      dateEnd.setUTCMinutes(59);
      dateEnd.setUTCSeconds(59);
      datetime_upper_bound = dateEnd.toISOString();
    }
    setExtraParams({
      datetime_lower_bound,
      datetime_upper_bound
    });
    setShowFilters(!showFilters);
  };

  const redirectToLoadPointsList = () => history.push('/load-points/list');
  const redirectToEditPendingRequest = (id) =>
    history.push(`/load-points/pending-request/${id}`);
  return (
    <div>
      <NestcaPageHeader
        showFilterButton
        title={msgs.pageTitle}
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={
          currentTheme.themeDark
            ? Pages.LoadPointsPageIconDark
            : Pages.LoadPointsPageIcon
        }
        count={totalFound}
        showGoBack={true}
        goBack={redirectToLoadPointsList}
      />
      <FilterModal
        visible={showFilters}
        onSearch={onSearchFilterHandler}
        onRestore={toggleRestoreFilters}
        onClose={toggleShowFilters}
        endDate={true}
        selectOptions={true}
      />
      <ContentRelocator>
        <div className={classes.infoContainer}>
          <p className={classes.text}>{msgs.pageDescription}</p>
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
              <th>{msgs.tableId}</th>
              <th>{msgs.tableUser}</th>
              <th>{msgs.tableStatus}</th>
              <th>{msgs.tableRequestDate}</th>
              <th>{msgs.tableAction}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customer_phone}</td>
                <td>
                  {item.is_client_pending
                    ? 'Pendiente por cliente'
                    : 'Por analizar'}
                </td>
                <td>
                  {moment(item.request_datetime).format('DD-MM-YYYY HH:mm')}
                </td>
                <td>
                  <Button
                    onClick={() => redirectToEditPendingRequest(item.id)}
                    className={classes.buttonLink}
                  >
                    {msgs.tableLabelFill}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentRelocator>
    </div>
  );
};
