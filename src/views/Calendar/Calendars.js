import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { PageHeader } from './components/PageHeader';
import { CalendarCreateStyle } from './Calendar.css';
import { useCalendar } from './hooks/UseCalendar';
import { messages } from './messages';
import { CalendarFooter } from './components/CalendarFooter';
import { CalendarEventItem } from 'components/CalendarEventItem';
import { useTable } from 'hooks/useTableV2';
import logo from './icons/Logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { OctopyCalendar } from 'components/OctopyCalendar';
import { EventEdit } from 'views/Events';
import { Pages } from 'assets';
import { useTheme } from 'hooks/useTheme';
import SuccessDelete from 'components/SuccessDelete';

const useStyles2 = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(-3),
    background: 'transparent',
    boxShadow: 'none',
    transition: 'none',
    overflow: 'hidden',
    backgroundColor: 'transparent!important',
    borderColor: 'transparent!important',
    borderSize: '2px',
    '&.MuiButtonBase-root:hover': {
      backgroundColor: 'unset'
    }
  }
}));

export const Calendars = (props) => {
  const { currentTheme } = useTheme();
  moment.locale('es');
  const {
    onChangeSearchItem,
    onChangeSize,
    onChangePage,
    totalFound,
    page,
    fdfdf,
    searchItem,
    items,
    search
  } = useTable({ endpoint: '/campaign' });
  const classes = useStyles2();
  const { methods, list } = useCalendar();
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [eventId, setEventId] = useState(0);
  const [newEvent, setNewEvent] = useState(false);
  const intl = useIntl();
  const history = useHistory();
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);

  const toggleSuccessDelete = () => {
    setShowSuccessDelete(!showSuccessDelete);
    methods.getEvents();
  }

  const addEvent = () => {
    setEventId(null);
    setNewEvent(true);
    setShowEditEvent(true);
  };

  const onCloseEdit = () => {
    setShowEditEvent(false);
    setNewEvent(false);
    setEventId(null);
    methods.getEvents();
  };

  const handleEditEvent = (eventId) => {
    setEventId(eventId);
    setNewEvent(false);
    setShowEditEvent(true);
  };

  return (
    <section css={CalendarCreateStyle()}>
      <SuccessDelete
        visible={showSuccessDelete}
        onClick={toggleSuccessDelete}
        erasedElement={"evento"}
      />
      <EventEdit visible={showEditEvent} onClose={onCloseEdit} id={eventId} newEvent={newEvent} onDeleted={toggleSuccessDelete} />
      <PageHeader
        title={intl.formatMessage(messages.title)}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.ProgramEventPageIconDark : Pages.ProgramEventPageIcon}
        searchSelect_items={list.screens}
        searchSelect_onChange={(value) => methods.updateSelectedScreens(value)}
        searchSelect_searchItems={methods.SearchScreens}
        searchSelect_value={list.selectedScreens}
        searchSelect_placeHolder={intl.formatMessage(messages.searchScreen)}
        searchSelect_multiple={true}
        searchSelect_removeItem={methods.removeSelected}
      />
      <div className="content">
        <div className="row mt-3">
          <div className="col">
            <OctopyCalendar
              events={list.events}
              EventItem={CalendarEventItem}
              handleAddEvent={addEvent}
              onClickEvent={(event) => handleEditEvent(event.resource.id)}
            />
          </div>
          <div className="col-12">
            <CalendarFooter className="footer" />
          </div>
        </div>
      </div>
    </section>
  );
};
