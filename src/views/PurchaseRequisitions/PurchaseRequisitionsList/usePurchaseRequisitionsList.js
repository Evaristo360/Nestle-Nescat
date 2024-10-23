import React, { useState, useEffect } from 'react';
import { 
    getFilterProductDivision, 
    getFilterProductCategory,
    getFilterProductMaterialGroup,
    getProductFormatEquivalence,
    getProductListByMaterialGroup,
    getFilterClients,
    getFilterBranchesByClient,
    getFilterBranchFormat,
    getFilterBranchRegion,
    getFilterBranchSubformat,
    getAllBranches,
    getAllProducts
 } from 'providers/api';
import useUserMetadata from 'hooks/useUserMetadata';
import { roles } from 'providers/role';

export const usePurchaseRequisitionsList = ({search, setExtraParams, resetFilters}) => {
    const [userAdminNestle, setUserAdminNestle] = useState(false);
    const [valuesStructure, setvaluesStructure] = useState({});
    const [filterStructureJSON, setFilterStructureJSON] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const toggleShowFilters = () => setShowFilters(!showFilters);
    const toggleRestoreFilters = () => {
      resetFilters();
      setShowFilters(!showFilters);
    }

    //Check Rol
    const onError = () => {};
    const { role, perms, loading, userName } = useUserMetadata({onError});
    
    useEffect(async () => {
        const value = (role === roles.nestle_admin) ? true : false;
        setUserAdminNestle(value);

        let structureJSON = [];
        if(value){
            structureJSON = await getStructureFiltersAdminNestle();
        }else{
            structureJSON = await getStructureFilters();
        }
        setFilterStructureJSON(structureJSON)
    }, [role]);


    const onSearchFilterHandler = (data) => {
        let division_id = '';
        let category_id = '';
        let material_group_id = '';
        let product_id = '';
        let format_equivalence_id = '';
        let unit_type = ''; 
        let region_id = '';
        let subformat_id = '';
        let format_id = '';
        let branch_id = '';
        let client_id = '';
        let device_id = '';
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
            division_id = valuesStructure.division_id ? valuesStructure.division_id : '';
            category_id= valuesStructure.category_id ? valuesStructure.category_id : '';
            material_group_id= valuesStructure.material_group_id ? valuesStructure.material_group_id : '';
            product_id= valuesStructure.product_id ? valuesStructure.product_id : '';
            format_equivalence_id= valuesStructure.format_equivalence_id ? valuesStructure.format_equivalence_id : '';        
            unit_type= valuesStructure.unit_type ? valuesStructure.unit_type : '';        
            region_id= valuesStructure.region_id ? valuesStructure.region_id : '';
            subformat_id= valuesStructure.subformat_id ? valuesStructure.subformat_id : '';
            format_id= valuesStructure.format_id ? valuesStructure.format_id : '';
            branch_id= valuesStructure.branch_id ? valuesStructure.branch_id : '';
            client_id= valuesStructure.client_id ? valuesStructure.client_id : '';
            device_id= valuesStructure.device_id ? valuesStructure.device_id :''
        }

        setExtraParams({ 
            datetime_lower_bound,
            datetime_upper_bound,
            division_id,
            category_id,
            material_group_id,
            product_id, 
            format_equivalence_id,
            unit_type,
            region_id,
            subformat_id,
            format_id,
            branch_id,
            client_id,
            device_id
        })
        setShowFilters(!showFilters);
    };

    const unitTypeList = [
        {
            id:"pieza",
            name:"Pieza"
        },
        {
            id:"caja",
            name:"Caja"
        }
    ]

    const digitalDisplayList = [
        {
            id:"digital_display",
            name:"Dispositivo digital"
        },
        {
            id:"totem",
            name:"Totem"
        }
    ]

    const getStructureFiltersAdminNestle = async () => {
        let divisionProducts = await getFilterProductDivision();

        let clients = await getFilterClients();

        let formatBranch = await getFilterBranchFormat();
        let regionBranch = await getFilterBranchRegion();
        let subformatBranch = await getFilterBranchSubformat();

        let formatEquivalence = await getProductFormatEquivalence();

        let filterJSON = [
            {
                title: 'Producto',
                options: [
                    {
                        optionLabel:"División producto",
                        optionName:"division_id",
                        options: divisionProducts.items
                    },
                    {
                        optionLabel:"Categoría producto",                    
                        optionName:"category_id",
                        options: [],
                        depends:"division_id"
                    },
                    {
                        optionLabel:"Material Group producto",
                        optionName:"material_group_id",
                        options: [],
                        depends:"category_id"
                    },
                    {
                        optionLabel:"Nombre Producto",
                        optionName:"product_id",
                        options: [],
                        depends:"material_group_id"
                    },
                    {
                        optionLabel:"Formato equivalente",
                        optionName:"format_equivalence_id",
                        options: formatEquivalence.items,
                        depends:""
                    },
                    {
                        optionLabel:"Tipo de unidad reconocido",
                        optionName:"unit_type",
                        options: unitTypeList,
                        depends:""
                    }
                ],
            },
            {
                title: 'Cliente',
                options: [                  
                    {
                        optionLabel: 'Región',
                        optionName: 'region_id',
                        options: regionBranch.items 
                    },
                    {
                        optionLabel: 'Formato',
                        optionName: 'format_id',
                        options: formatBranch.items
                    },
                    {
                        optionLabel: 'Subformato',
                        optionName: 'subformat_id',
                        options: subformatBranch.items
                    },
                    { 
                        optionLabel: 'Cliente', 
                        optionName: 'client_id', 
                        options: createClientOptions(clients.items) 
                    }, 
                    { 
                        optionLabel: 'Sucursal', 
                        optionName: 'branch_id', 
                        options: [],
                        depends:"client_id"
                    }
                ]
            },
            {
                title: 'Dispositivo',
                options: [
                    { 
                        optionLabel: 'Dispositivo digital', 
                        optionName: 'device_id', 
                        options: digitalDisplayList 
                    }
                ]
            }
        ]

        return filterJSON;
    }

    const getStructureFilters = async () => {
        let branchesList = await getAllBranches();
        let productsList = await getAllProducts();

        let filterJSON = [
            {
                title: 'Producto',
                options: [
                    {
                        optionLabel:"Nombre Producto",
                        optionName:"product_id",
                        options: productsList.items,
                        depends:""
                    },
                    {
                        optionLabel:"Tipo de unidad reconocido",
                        optionName:"unit_type",
                        options: unitTypeList,
                        depends: ""
                    }
                ],
            },
            {
                title: 'Cliente',
                options: [
                    { 
                        optionLabel: 'Sucursal', 
                        optionName: 'branch_id', 
                        options: branchesList.items,
                        depends:""
                    }
                ]
            },
            {
                title: 'Dispositivo',
                options: [
                    { 
                        optionLabel: 'Dispositivo digital', 
                        optionName: 'device_id', 
                        options: digitalDisplayList 
                    }
                ]
            }
        ]

        return filterJSON;
    }

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
    if(valuesStructure['division_id']){
        let categoryProductResponse = await  getFilterProductCategory(valuesStructure['division_id']);
        let aux = filterStructureJSON.slice();
        aux.map( option => {
            option.options.map( opc => {
                if(opc.optionName === "category_id"){
                    opc.options = categoryProductResponse.items
                    return;
                }
            })
        })

        setFilterStructureJSON(aux);

    }
    }, [valuesStructure['division_id']]);

    useEffect(async () => {
        if(valuesStructure['category_id']){
            let materialGroupProductResponse = await  getFilterProductMaterialGroup(valuesStructure['category_id']);
            let aux = filterStructureJSON.slice();
            aux.map( option => {
                option.options.map( opc => {
                    if(opc.optionName === "material_group_id"){
                        opc.options = materialGroupProductResponse.items
                        return;
                    }
                })
            })
    
            setFilterStructureJSON(aux);
    
        }
        }, [valuesStructure['category_id']]);

        useEffect(async () => {
            if(valuesStructure['material_group_id']){
                let productListResponse = await  getProductListByMaterialGroup(valuesStructure['material_group_id']);
                let aux = filterStructureJSON.slice();
                aux.map( option => {
                    option.options.map( opc => {
                        if(opc.optionName === "product_id"){
                            opc.options = productListResponse.items
                            return;
                        }
                    })
                })
        
                setFilterStructureJSON(aux);
        
            }
        }, [valuesStructure['material_group_id']]);

        useEffect(async () => {
            if(valuesStructure['client_id']){
                let branchesByClientResponse = await  getFilterBranchesByClient(valuesStructure['client_id']);
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
  
      
      return {
        filterStructureJSON,
        showFilters,
        toggleShowFilters,
        toggleRestoreFilters,
        onSearchFilterHandler,
        valuesStructure, 
        setvaluesStructure,
        userAdminNestle
      };
}
