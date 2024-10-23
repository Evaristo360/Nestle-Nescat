import React, { useState, useEffect } from 'react';
import { 
  getClientList, 
  getBranchList
 } from 'providers/api';
export const useTotemList = ({search, setExtraParams, resetFilters}) => {
    const [valuesStructure, setvaluesStructure] = useState({});
    const [filterStructureJSON, setFilterStructureJSON] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const toggleShowFilters = () => setShowFilters(!showFilters);
    const toggleRestoreFilters = () => {
      resetFilters();
      setShowFilters(!showFilters);
    }
    const onSearchFilterHandler = (data) => {
        let branch_id = '';
        let client_id = '';
        
      if(valuesStructure){
        branch_id = valuesStructure.branch_id ? valuesStructure.branch_id : '';
        client_id= valuesStructure.client_id ? valuesStructure.client_id : '';
      }

      setExtraParams({ 
        start_date: data.selectedDate ? data.selectedDate.toISOString() : '',
        end_date: data.selectedDateEnd ? data.selectedDateEnd.toISOString() : '',
        client_id,
        branch_id
      })
      search();
      setShowFilters(!showFilters);
    };

    useEffect(async () => {        
        let clients = await getClientList();
    
        let filterJSON = [
            {
                title:"Ubicación",
                options:[
                    {
                    optionLabel:"Cliente",
                    optionName:"client_id",
                    options: createClientOptions(clients.items)
                    },
                    {
                    optionLabel:"Sucursal",                    
                    optionName:"branch_id",
                    options: [],
                    depends:"client_id"
                    },
                ],
            },
      ];
    
        setFilterStructureJSON(filterJSON);
      }, []);

      const createClientOptions = (options) => {
        let arrayCreateOptions = [];
        options.map( opc => {
            arrayCreateOptions.push(
                { 
                    id: opc.id, 
                    name: opc.bussiness_name 
                }
            );
        });
        return arrayCreateOptions;
      }

      useEffect(async () => {
        if(valuesStructure['client_id']){
            let branchesResponse = await  getBranchList(valuesStructure['client_id']);
            let aux = filterStructureJSON.slice();
            aux.map( option => {
                option.options.map( opc => {
                    if(opc.optionName === "branch_id"){
                        opc.options = branchesResponse.items
                        return;
                    }
                })
            })
    
            setFilterStructureJSON(aux);
    
        }
      }, [valuesStructure['client_id']]);
  
      
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
