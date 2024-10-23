import React, { useState, useEffect } from 'react';
import { 
    getFilterProductDivision, 
    getFilterProductCategory,
    getFilterProductMaterialGroup,
    getProductFormatEquivalence,
    getProductListByMaterialGroup,
    getProductMaterialSAP,
    getProductSKU,
    getFilterClients,
    getFilterBranchesByClient,
    getFilterBranchFormat,
    getFilterBranchRegion,
    getFilterBranchSubformat,
    getAllBranches
 } from 'providers/api';
import useUserMetadata from 'hooks/useUserMetadata';
import { roles } from 'providers/role';


export const useLoadPointsList = ({search, setExtraParams, resetFilters}) => {
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
        let product_division_id = '';
        let product_category_id = '';
        let product_material_group_id = '';
        let product_name = '';
        let product_format_equivalent = '';
        let product_sku = '';
        let product_material_sap = '';
        let unit_type = '';
        let branch_origin_region = '';
        let branch_origin_format = '';
        let branch_origin_subformat_id = '';
        let client_origin_id = '';
        let branch_origin_id = '';
        let branch_load_region = '';
        let branch_load_format = '';
        let branch_load_subformat_id = '';
        let client_load_id = '';
        let branch_load_id = '';
        let device_type = '';
        let auto_detection = '';
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
        product_division_id = valuesStructure.product_division_id ? valuesStructure.product_division_id : '';
        product_category_id= valuesStructure.product_category_id ? valuesStructure.product_category_id : '';
        product_material_group_id= valuesStructure.product_material_group_id ? valuesStructure.product_material_group_id : '';
        product_name= valuesStructure.product_name ? valuesStructure.product_name : '';
        product_format_equivalent= valuesStructure.product_format_equivalent ? valuesStructure.product_format_equivalent : '';
        product_sku= valuesStructure.product_sku ? valuesStructure.product_sku : '';
        product_material_sap= valuesStructure.product_material_sap ? valuesStructure.product_material_sap : '';
        unit_type= valuesStructure.unit_type ? valuesStructure.unit_type : '';
        branch_origin_region= valuesStructure.branch_origin_region ? valuesStructure.branch_origin_region : '';
        branch_origin_format= valuesStructure.branch_origin_format ? valuesStructure.branch_origin_format : '';
        branch_origin_subformat_id= valuesStructure.branch_origin_subformat_id ? valuesStructure.branch_origin_subformat_id : '';
        client_origin_id= valuesStructure.client_origin_id ? valuesStructure.client_origin_id : '';
        branch_origin_id= valuesStructure.branch_origin_id ? valuesStructure.branch_origin_id : '';
        branch_load_region= valuesStructure.branch_load_region ? valuesStructure.branch_load_region : '';
        branch_load_format= valuesStructure.branch_load_format ? valuesStructure.branch_load_format : '';
        branch_load_subformat_id= valuesStructure.branch_load_subformat_id ? valuesStructure.branch_load_subformat_id : '';
        client_load_id= valuesStructure.client_load_id ? valuesStructure.client_load_id : '';
        branch_load_id= valuesStructure.branch_load_id ? valuesStructure.branch_load_id : '';
        device_type= valuesStructure.device_type ? valuesStructure.device_type : '';
        auto_detection= valuesStructure.auto_detection ? valuesStructure.auto_detection : '';
      }

      setExtraParams({ 
        start_date: datetime_lower_bound,
        end_date: datetime_upper_bound,
        product_division_id,
        product_category_id,
        product_material_group_id,
        product_name,
        product_format_equivalent,
        product_sku,
        product_material_sap,
        unit_type,
        branch_origin_region,
        branch_origin_format,
        branch_origin_subformat_id,
        client_origin_id,
        branch_origin_id,
        branch_load_region,
        branch_load_format,
        branch_load_subformat_id,
        client_load_id,
        branch_load_id,
        device_type,
        auto_detection
      })
      setShowFilters(!showFilters);
    };
    const unitTypeList = [
        {
            id:"piece",
            name:"Pieza"
        },
        {
            id:"box",
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

    const autoDetectionList = [
        {
            id: true,
            name:"Si"
        },
        {
            id: false,
            name:"No"
        }
    ]

    const getStructureFiltersAdminNestle = async () => {
        let divisionProducts = await getFilterProductDivision();

        let clients = await getFilterClients();

        let formatBranch = await getFilterBranchFormat();
        let regionBranch = await getFilterBranchRegion();
        let subformatBranch = await getFilterBranchSubformat();

        let formatEquivalence = await getProductFormatEquivalence();
        let materialSAP = await getProductMaterialSAP();
        let SKUList = await getProductSKU();
    
        let filterJSON = [
            {
                title:"Producto",
                options:[
                    {
                        optionLabel:"División producto",
                        optionName:"product_division_id",
                        options: divisionProducts.items
                    },
                    {
                        optionLabel:"Categoría producto",                    
                        optionName:"product_category_id",
                        options: [],
                        depends:"product_division_id"
                    },
                    {
                        optionLabel:"Material Group producto",
                        optionName:"product_material_group_id",
                        options: [],
                        depends:"product_category_id"
                    },
                    {
                        optionLabel:"Material SAP",
                        optionName:"product_material_sap",
                        options: createMaterialSAPOptions(materialSAP.items),
                        depends:"product_material_group_id",
                        type:"TextSearch",
                        optionTextSearch:"SAPSearch"
                    },
                    {
                        optionLabel:"SKU",
                        optionName:"product_sku",
                        options: createSKUOptions(SKUList.items),
                        depends:"product_material_group_id",
                        type:"TextSearch",
                        optionTextSearch:"SKUSearch"
                    },
                    {
                        optionLabel:"Formato equivalente",
                        optionName:"product_format_equivalent",
                        options: formatEquivalence.items,
                        depends:"product_sku",
                        type:"TextSearch",
                        optionTextSearch:"FormatEquivalenceSearch"
                    },
                    {
                        optionLabel:"Nombre Producto",
                        optionName:"product_name",
                        options: [],
                        depends:"product_material_group_id",
                        type:"TextSearch",
                        optionTextSearch:"ProductNameSearch"
                    },     
                    {
                        optionLabel:"Tipo de unidad reconocido",
                        optionName:"unit_type",
                        options: unitTypeList,
                        depends:""
                    },              
                ],
            },
            {
                title:"Origen cliente",
                options:[
                    {
                        optionLabel:"Región cliente",
                        optionName:"branch_origin_region",
                        options: regionBranch.items
                    },
                    {
                        optionLabel:"Formato cliente",                    
                        optionName:"branch_origin_format",
                        options: formatBranch.items
                    },
                    {
                        optionLabel:"Subformato cliente",
                        optionName:"branch_origin_subformat_id",
                        options: subformatBranch.items
                    },
                    {
                        optionLabel:"Cliente",                    
                        optionName:"client_origin_id",
                        options: createClientOptions(clients.items)
                    },
                    {
                    optionLabel:"Sucursal",                    
                    optionName:"branch_origin_id",
                    options: [],
                    depends:"client_origin_id"
                    }
                ],
            },
            {
                title:"Carga cliente",
                options:[
                    {
                    optionLabel:"Región cliente",
                    optionName:"branch_load_region",
                    options: regionBranch.items
                    },
                    {
                    optionLabel:"Formato cliente",                    
                    optionName:"branch_load_format",
                    options: formatBranch.items
                    },
                    {
                    optionLabel:"Subformato cliente",
                    optionName:"branch_load_subformat_id",
                    options: subformatBranch.items
                    },
                    {
                    optionLabel:"Cliente",                    
                    optionName:"client_load_id",
                    options: createClientOptions(clients.items)
                    },
                    {
                    optionLabel:"Sucursal",                    
                    optionName:"branch_load_id",
                    options: [],
                    depends:"client_load_id"
                    }
                ],
            },
            {
                title: 'Dispositivo',
                options: [
                    { 
                        optionLabel: 'Dispositivo digital', 
                        optionName: 'device_type', 
                        options: digitalDisplayList 
                    },
                    { 
                        optionLabel: 'Detección automática', 
                        optionName: 'auto_detection', 
                        options: autoDetectionList 
                    }
                ]
            }
        ];

        return filterJSON;
    }

    const getStructureFilters = async () => {
        let divisionProducts = await getFilterProductDivision();

        let formatEquivalence = await getProductFormatEquivalence();
        let materialSAP = await getProductMaterialSAP();
        let SKUList = await getProductSKU();
    
        let branchList = await getAllBranches();

        let filterJSON = [
            {
                title:"Producto",
                options:[
                    {
                        optionLabel:"División producto",
                        optionName:"product_division_id",
                        options: divisionProducts.items
                    },
                    {
                        optionLabel:"Categoría producto",                    
                        optionName:"product_category_id",
                        options: [],
                        depends:"product_division_id"
                    },
                    {
                        optionLabel:"Material Group producto",
                        optionName:"product_material_group_id",
                        options: [],
                        depends:"product_category_id"
                    },
                    {
                        optionLabel:"Nombre Producto",
                        optionName:"product_name",
                        options: [],
                        depends:"product_material_group_id"
                    },
                    {
                        optionLabel:"Formato equivalente",
                        optionName:"product_format_equivalent",
                        options: formatEquivalence.items,
                        depends:""
                    },
                    {
                        optionLabel:"Material SAP",
                        optionName:"product_material_sap",
                        options: createMaterialSAPOptions(materialSAP.items),
                        depends:""
                    },
                    {
                        optionLabel:"SKU",
                        optionName:"product_sku",
                        options: createSKUOptions(SKUList.items),
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
                title:"Origen cliente",
                options:[
                    {
                    optionLabel:"Sucursal",                    
                    optionName:"branch_origin_id",
                    options: branchList.items,
                    depends:""
                    }
                ],
            },
            {
                title:"Carga cliente",
                options:[
                    {
                    optionLabel:"Sucursal",                    
                    optionName:"branch_load_id",
                    options: branchList.items,
                    depends:""
                    }
                ],
            },
            {
                title: 'Dispositivo',
                options: [
                    { 
                        optionLabel: 'Dispositivo digital', 
                        optionName: 'device_type', 
                        options: digitalDisplayList 
                    },
                    { 
                        optionLabel: 'Detección automática', 
                        optionName: 'auto_detection', 
                        options: autoDetectionList 
                    }
                ]
            }
        ];

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

    const createSKUOptions = (options) => {
        let arrayCreateOptions = [];
        options.map( opc => {
            arrayCreateOptions.push(
                { 
                    id: opc.id, 
                    name: opc.sku 
                }
            );
        });
        return arrayCreateOptions;
    }

    const createMaterialSAPOptions = (options) => {
        let arrayCreateOptions = [];
        options.map( opc => {
            arrayCreateOptions.push(
                { 
                    id: opc.id, 
                    name: opc.code_sap 
                }
            );
        });
        return arrayCreateOptions;
    }

    useEffect(async () => {
    if(valuesStructure['product_division_id']){
        let categoryProductResponse = await  getFilterProductCategory(valuesStructure['product_division_id']);
        let aux = filterStructureJSON.slice();
        aux.map( option => {
            option.options.map( opc => {
                if(opc.optionName === "product_category_id"){
                    opc.options = categoryProductResponse.items
                    valuesStructure['product_category_id'] = '';
                    return;
                }
            })
        })

        setFilterStructureJSON(aux);

    }
    }, [valuesStructure['product_division_id']]);

    useEffect(async () => {
        if(valuesStructure['product_category_id']){
            let materialGroupProductResponse = await  getFilterProductMaterialGroup(valuesStructure['product_category_id']);
            let aux = filterStructureJSON.slice();
            aux.map( option => {
                option.options.map( opc => {
                    if(opc.optionName === "product_material_group_id"){
                        opc.options = materialGroupProductResponse.items
                        valuesStructure['product_material_group_id'] = '';
                        return;
                    }
                })
            })
    
            setFilterStructureJSON(aux);
    
        }
        }, [valuesStructure['product_category_id']]);

        useEffect(async () => {
            if(valuesStructure['product_material_group_id']){
                let productListResponse = await  getProductListByMaterialGroup(valuesStructure['product_material_group_id']);
                let aux = filterStructureJSON.slice();
                aux.map( option => {
                    option.options.map( opc => {
                        if(opc.optionName === "product_name"){
                            opc.options = productListResponse.items
                            valuesStructure['product_name'] = '';
                            return;
                        }
                    })
                })
        
                setFilterStructureJSON(aux);
        
            }
        }, [valuesStructure['product_material_group_id']]);

        useEffect(async () => {
            if(valuesStructure['client_origin_id']){
                let branchesByClientResponse = await  getFilterBranchesByClient(valuesStructure['client_origin_id']);
                let aux = filterStructureJSON.slice();
                aux.map( option => {
                    option.options.map( opc => {
                        if(opc.optionName === "branch_origin_id"){
                            opc.options = branchesByClientResponse.items;
                            valuesStructure['branch_origin_id'] = '';
                            return;
                        }
                    })
                })
        
                setFilterStructureJSON(aux);
        
            }
        }, [valuesStructure['client_origin_id']]);

        useEffect(async () => {
            if(valuesStructure['client_load_id']){
                let branchesByClientResponse = await  getFilterBranchesByClient(valuesStructure['client_load_id']);
                let aux = filterStructureJSON.slice();
                aux.map( option => {
                    option.options.map( opc => {
                        if(opc.optionName === "branch_load_id"){
                            opc.options = branchesByClientResponse.items;
                            valuesStructure['branch_load_id'] = '';
                            return;
                        }
                    })
                })
        
                setFilterStructureJSON(aux);
        
            }
        }, [valuesStructure['client_load_id']]);

        useEffect(async () => {
            if(valuesStructure['ProductNameSearch']){
                let productListResponse = await  getProductListByMaterialGroup(valuesStructure['product_material_group_id'],valuesStructure['ProductNameSearch']);
                let aux = filterStructureJSON.slice();
                aux.map( option => {
                    option.options.map( opc => {
                        if(opc.optionName === "product_name"){
                            opc.options = productListResponse.items
                            return;
                        }
                    })
                })
        
                setFilterStructureJSON(aux);
        
            }
        }, [valuesStructure['ProductNameSearch']]);
  
        useEffect(async () => {
            let FormatEquivalenceResponse = await getProductFormatEquivalence(valuesStructure['FormatEquivalenceSearch']);
            let aux = filterStructureJSON.slice();
            aux.map( option => {
                option.options.map( opc => {
                    if(opc.optionName === "product_format_equivalent"){
                        opc.options = FormatEquivalenceResponse.items
                        return;
                    }
                })
            })
            setFilterStructureJSON(aux);
        }, [valuesStructure['FormatEquivalenceSearch']]);

        useEffect(async () => {
            let SAPResponse = await getProductMaterialSAP(valuesStructure['SAPSearch']);
            let aux = filterStructureJSON.slice();
            aux.map( option => {
                option.options.map( opc => {
                    if(opc.optionName === "product_material_sap"){
                        opc.options = createMaterialSAPOptions(SAPResponse.items)
                        return;
                    }
                })
            })
            setFilterStructureJSON(aux);
        }, [valuesStructure['SAPSearch']]);

        useEffect(async () => {
            let SKUResponse = await getProductSKU(valuesStructure['SKUSearch']);
            let aux = filterStructureJSON.slice();
            aux.map( option => {
                option.options.map( opc => {
                    if(opc.optionName === "product_sku"){
                        opc.options = createSKUOptions(SKUResponse.items)
                        return;
                    }
                })
            })
            setFilterStructureJSON(aux);
        }, [valuesStructure['SKUSearch']]);
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
