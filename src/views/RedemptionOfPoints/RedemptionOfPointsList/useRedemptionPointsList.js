import React, { useState, useEffect } from 'react';
export const useRedemptionPointsList = ({search, setExtraParams, resetFilters}) => {
    const [valuesStructure, setvaluesStructure] = useState({});
    const [filterStructureJSON, setFilterStructureJSON] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const toggleShowFilters = () => setShowFilters(!showFilters);
    const toggleRestoreFilters = () => {
      resetFilters();
      setShowFilters(!showFilters);
    }
    const onSearchFilterHandler = (data) => {
      let validity_date_datetime_lower_bound = '';
      let validity_date_datetime_upper_bound = '';
      let datetime_lower_bound = '';
      let datetime_upper_bound = '';

      if(data.selectedDate){
        let dateInit = new Date(data.selectedDate);
        dateInit.setUTCHours(0);
        dateInit.setUTCMinutes(0);
        dateInit.setUTCSeconds(0);
        datetime_lower_bound=dateInit.toISOString();
      }

      if(data.selectedDateEnd){
        let dateEnd = new Date(data.selectedDateEnd);
        dateEnd.setUTCHours(23);
        dateEnd.setUTCMinutes(59);
        dateEnd.setUTCSeconds(59);
        datetime_upper_bound=dateEnd.toISOString();
      }
        
      if(valuesStructure){

        if(valuesStructure.validity_date_datetime_lower_bound){
          let dateInit = new Date(valuesStructure.validity_date_datetime_lower_bound);
          dateInit.setUTCHours(0);
          dateInit.setUTCMinutes(0);
          dateInit.setUTCSeconds(0);
          validity_date_datetime_lower_bound=dateInit.toISOString();
        }

        if(valuesStructure.validity_date_datetime_upper_bound){
          let dateEnd = new Date(valuesStructure.validity_date_datetime_upper_bound);
          dateEnd.setUTCHours(23);
          dateEnd.setUTCMinutes(59);
          dateEnd.setUTCSeconds(59);
          validity_date_datetime_upper_bound=dateEnd.toISOString();
        }
      }

      setExtraParams({ 
        datetime_lower_bound,
        datetime_upper_bound,
        validity_date_datetime_lower_bound,
        validity_date_datetime_upper_bound
      })
      setShowFilters(!showFilters);
    };
    
    useEffect(async () => {    
        let filterJSON = [
            {
                title:"Fecha vigencia",
                options:[
                    {
                    optionLabel:"Inicio",
                    optionName:"validity_date_datetime_lower_bound",
                    type:"Datepicker",
                    maxDate:"validity_date_datetime_upper_bound"
                    },
                    {
                    optionLabel:"Fin",                    
                    optionName:"validity_date_datetime_upper_bound",
                    type:"Datepicker",
                    minDate:"validity_date_datetime_lower_bound"
                    },
                ],
            },
      ];
    
        setFilterStructureJSON(filterJSON);
      }, []);

      return {
        filterStructureJSON,
        showFilters,
        toggleShowFilters,
        toggleRestoreFilters,
        onSearchFilterHandler,
        valuesStructure, 
        setvaluesStructure
      };
}
