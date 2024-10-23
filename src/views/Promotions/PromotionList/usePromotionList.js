import React, { useState, useEffect } from 'react';
import {
  getFilterClientListSaleOff,
  getFilterBranchByIdListSaleOff,
  getFilterTypeSaleOff,
  getAllBranches
 } from 'providers/api'; 
import useUserMetadata from 'hooks/useUserMetadata';
import { roles } from 'providers/role';

export const usePromotionList = ({search, setExtraParams, resetFilters}) => {
    const onError = () => {};
    const {role, perms, loading, userName } = useUserMetadata({onError});

    const [valuesStructure, setvaluesStructure] = useState({});
    const [filterStructureJSON, setFilterStructureJSON] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const toggleShowFilters = () => setShowFilters(!showFilters);
    const toggleRestoreFilters = () => {
      resetFilters();
      setShowFilters(!showFilters);
    }
    const filterStatus=[
      {
        id: 'always',
        name: 'Activo Siempre'
      }, 
      {
        id:'active_until',
        name:'Activo Hasta'
      },
      {
        id:'inactive',
        name:'Inactivo'
      }
    ];

    const onSearchFilterHandler = (data) => {
        let sale_off_type_id = '';
        let status = '';
        let client_id = '';
        let branch_id = '';
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
        sale_off_type_id = valuesStructure.sale_off_type_id ? valuesStructure.sale_off_type_id : '';
        status= valuesStructure.status ? valuesStructure.status : '';
        client_id= valuesStructure.client_id ? valuesStructure.client_id : '';
        branch_id= valuesStructure.branch_id ? valuesStructure.branch_id : '';
      }

      setExtraParams({ 
        datetime_lower_bound,
        datetime_upper_bound,
        sale_off_type_id,
        status,
        client_id,
        branch_id,
      })
      setShowFilters(!showFilters);
    };

    useEffect(async () => {
      if(isUserNestle()){
        await getFiltersUserNestle()
      }else{
        await getFilters()
      }
      
    }, []);

    const isUserNestle = () => {
      return (
        role === roles.nestle_admin || 
        role === roles.nestle_operator || 
        role === roles.super
      ) 
    }
    const getFiltersUserNestle = async () => {
        let clients = await getFilterClientListSaleOff();
        let typeSaleOff = await getFilterTypeSaleOff();
    
        let filterJSON = [
          {
            title:"Otros",
            options:[
              {
                optionLabel:"Tipo de promoción",
                optionName:"sale_off_type_id",
                options: typeSaleOff.items
              },
              {
                optionLabel:"Estatus",                    
                optionName:"status",
                options: filterStatus
              },
              {
                optionLabel:"Cliente",
                optionName:"client_id",
                options: createClientOptions(clients.items),
              },
              {
                optionLabel:"Sucursal",
                optionName:"branch_id",
                options: [],
                depends:"client_id"
              }
            ],
          }
      ] ;
      
      setFilterStructureJSON(filterJSON);
    }

    const getFilters = async () => {
      let branches = await getAllBranches();
      let filterJSON = [
        {
          title:"Otros",
          options:[
            {
              optionLabel:"Sucursal",
              optionName:"branch_id",
              options: branches.items ? branches.items : [],
              depends:""
            },
            {
              optionLabel:"Estatus",                    
              optionName:"status",
              options: filterStatus
            }
          ],
        }
      ] ;
    
      setFilterStructureJSON(filterJSON);
    }

    useEffect(async () => {
        if(valuesStructure['client_id']){
            let branchesByClientResponse = await  getFilterBranchByIdListSaleOff(valuesStructure['client_id']);
            let aux = filterStructureJSON.slice();
            aux.map( option => {
                option.options.map( opc => {
                    if(opc.optionName === "branch_id"){
                        opc.options = branchesByClientResponse.items
                        return;
                    }
                })
            })
    
            setFilterStructureJSON(aux);
    
        }
        }, [valuesStructure['client_id']]);

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

      return {
        filterStructureJSON,
        showFilters,
        toggleShowFilters,
        toggleRestoreFilters,
        onSearchFilterHandler,
        valuesStructure, 
        setvaluesStructure,
        role,
        isUserNestle
      };
}
