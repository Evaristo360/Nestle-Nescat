import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import moment from 'moment';
import { checkboxOptions, initialData, divisions, categories, material_groups, none} from '../data';

export const UseCreateProduct = () => {
  const [defaultDate, updateDefaultDate] = useState(new Date());
  const [screens, updateScreens] = useState([]);
  const [selectedScreens, updateSelectedScreens] = useState([]);
  const [events, updateEvents] = useState([]);

  const [division, updateDivision] = useState('none');
  const [category, updateCategory] = useState('none');
  const [materialGroup, updateMaterialGroup] = useState('none');
  const [listDivisions, updateDivisions] = useState(divisions);
  const [listCategories, updateCategories] = useState([]);
  const [listMaterialGroups, updateMaterialGroups] = useState([]);

  useEffect(() => {
    // console.log("division", division);
    // console.log("category", category);
    // console.log("materialGroup", materialGroup);
    updateCategories(categories[division]);
    updateMaterialGroups(material_groups[category]);
    //GetCategory(division);
    //GetMaterial(category);
  }, [division, category]);

  useEffect(() => {
    GetEvents();
  }, [selectedScreens]);

  const SearchScreens = (value) => {
    const axios = useAxios();

    axios
      .get(`/screen?page_number=1&page_size=10&search_item=${value || ''}`)
      .then((response) => {
        if (response.status === 200) {
          updateScreens(response.data.result.items);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetDivision = () => {
    const axios = useAxios();

    axios
      .get('/products/division')
      .then((response) => {
        if (response.status === 200) {
          // console.log("response", response.data.items);
          updateDivisions(response.data.items);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetCategory = async (division) => {
    const axios = useAxios();
    // console.log("here");

    await axios
      .get(`/products/category/${division}`)
      .then((response) => {
        // console.log("response", response);
        if (response.status === 200) {
          updateCategories(response.data.items);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetMaterial = async (category) => {
    const axios = useAxios();
    // console.log("here");

    await axios
      .get(`/products/material-group/${category}`)
      .then((response) => {
        // console.log("response", response);
        if (response.status === 200) {
          updateMaterialGroups(response.data.items);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeSelected = (item) => {
    let newArray = [...selectedScreens];

    newArray.splice(
      selectedScreens.findIndex((i) => i.id === item.id),
      1
    );
    updateSelectedScreens(newArray);
  };

  const GetEvents = () => {
    const axios = useAxios();

    if (selectedScreens.length > 0) {
      let screens = '';

      selectedScreens.forEach((ss) => (screens += `${ss.id},`));
      axios
        .get(`/events?screen_ids=${screens.substr(0, screens.length - 1)}`)
        .then((response) => {
          if (response.status === 200) {
            const events = response.data.result.items.map((e) => ({
              title: e.id,
              start: moment(e.start_date).toDate(),
              end:
                e.end_date === '0000-00-00 00:00:00'
                  ? moment(e.start_date).toDate()
                  : moment(e.end_date).toDate(),
              allDay: e.end_date === '0000-00-00 00:00:00' ? true : false,
              resource: e
            }));

            updateEvents(events);
          }
        })
        .finally(() => {
          // updateLoadingCampaigns(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateEvents([]);
    }
  };

  return {
    variable: {
      defaultDate,
      division,
      category,
      materialGroup
    },
    methods: {
      updateDefaultDate,
      SearchScreens,
      updateScreens,
      updateSelectedScreens,
      removeSelected,
      updateDivision,
      updateCategory,
      updateMaterialGroup,
      GetDivision
    },
    list: {
      screens,
      selectedScreens,
      events,
      listDivisions,
      listCategories,
      listMaterialGroups
    }
  };
};
