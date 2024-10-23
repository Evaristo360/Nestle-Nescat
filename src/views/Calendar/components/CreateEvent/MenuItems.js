import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { useEvent } from './hooks/useEvent';
import api from './api';

const MenuItems = ( menu ) => {
  const [screens, setScreens] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [values, setValues] = useState([]);
  const { getProfilePhoto, getMyInfo, updateMyInfo, resetPassword, doGet, doGetAll } = api();
  const { event, methods, list, data } = useEvent();

  (async () => {
    let options;
    if (menu.menu) {
      options = methods.SearchCampaigns();
      //options = await doGetAll('/screen');
      setScreens(options.items);
      setValues(options.items);
    } else {
      options = await doGetAll('/campaign');
      setCampaigns(options.items);
      setValues(options.items)
    }
  })();
  // const { event, methods, list, data } = useEvent();
  // console.log("screens", searchItems)
  // var options = searchItems();
  // console.log("screens", options)


  return (
    <div>
      {values.map((val) => {
        let value = val.id
        let label = val.name

        return (
            <MenuItem value={value}>{`Pantalla ${label}`}</MenuItem>
        );
      })}
    </div>
  );
};

export default MenuItems;