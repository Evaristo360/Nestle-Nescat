import { useState, useEffect } from 'react';
import useApi from './api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as formMessages } from '../PromotionsDescriptionMessages';
import useAxios from 'hooks/useAxios';
import moment from 'moment';
import { object } from 'prop-types';
import { config } from 'providers/config';

const requiredMsg = intlExt.formatMessage(formMessages.required);
const regex = "%E2%80%8B";

const validationSchemas = yup.object().shape({
  user_image_size: yup
    .number()
    .max(5000000, intlExt.formatMessage(formMessages.bigSize)),
  user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(formMessages.invalidType)
    ),
  validity_type: yup
    .string()
    .required(requiredMsg),
  validity_date: yup.string().when('validity_type', {
    is: "active_until",
    then: yup.string().required(requiredMsg)
  }),
  name: yup
    .string()
    .required(intlExt.formatMessage(formMessages.onlyLetters))
    .max(60, intlExt.formatMessage(formMessages.nameLength)),
  sale_off_type_id: yup
    .string()
    .required(requiredMsg),
  historicPoints: yup
    .boolean(),
  purchasedProducts: yup
    .boolean(),
  code: yup
    .boolean(),
  value: yup.string().when('historicPoints', {
    is: true,
    then: yup.string().required(requiredMsg)
  }),
  quantity: yup.string().when('historicPoints', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
    .matches(/^\d{1,4}/, intlExt.formatMessage(formMessages.onlyNumbers))
    .max(3, intlExt.formatMessage(formMessages.pointsLength)),
  }),
  radio_button_purchasedProducts: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }), 
  division_id: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }), 
  category_id: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }), 
  material_id: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }), 
  product_id: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }), 
  unit_type_id: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }),
  minimum_quantity: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
    .matches(/^\d{1,4}/, intlExt.formatMessage(formMessages.onlyNumbers))
    .max(3, intlExt.formatMessage(formMessages.pointsLength)),
  }),
  require_options: yup
    .string()
    .required(requiredMsg),
  code_text: yup
    .string().when('code', {
      is: true,
      then: yup.string()
      .required(requiredMsg)
      .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.barcode_boxLength))
      .max(50, intlExt.formatMessage(formMessages.number_10_length)),
    }) ,
  limit: yup
    .string()
    .required(requiredMsg),
  limit_quantity: yup
    .string().when('limit', {
      is: 'exactly',
      then: yup.string()
      .required(requiredMsg)
      .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.barcode_boxLength))
      .max(50, intlExt.formatMessage(formMessages.number_10_length)),
    }),
});

var initialObj = {
  user_image_size: yup
    .number()
    .max(5000000, intlExt.formatMessage(formMessages.bigSize)),
  user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(formMessages.invalidType)
    ),
  validity_type: yup
    .string()
    .required(requiredMsg),
  validity_date: yup.string().when('validity_type', {
    is: "active_until",
    then: yup.string().required(requiredMsg)
  }),
  name: yup
    .string()
    .required(intlExt.formatMessage(formMessages.onlyLetters))
    .max(60, intlExt.formatMessage(formMessages.nameLength)),
  sale_off_type_id: yup
    .string()
    .required(requiredMsg),
  historicPoints: yup
    .boolean(),
  purchasedProducts: yup
    .boolean(),
  code: yup
    .boolean(),
  value: yup.string().when('historicPoints', {
    is: true,
    then: yup.string().required(requiredMsg)
  }),
  quantity: yup.string().when('historicPoints', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
    .matches(/^\d{1,4}/, intlExt.formatMessage(formMessages.onlyNumbers))
    .max(3, intlExt.formatMessage(formMessages.pointsLength)),
  }),
  radio_button_purchasedProducts: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }), 
  product_id_0: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }), 
  unit_type_id_0: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
  }),
  minimum_quantity_0: yup.string().when('purchasedProducts', {
    is: true,
    then: yup.string()
    .required(requiredMsg)
    .matches(/^\d{1,4}/, intlExt.formatMessage(formMessages.onlyNumbers))
    .max(3, intlExt.formatMessage(formMessages.pointsLength)),
  }),
  require_options: yup
    .string()
    .required(requiredMsg),
  client_id_0:  yup
    .string()
    .required(requiredMsg),
  // branches_id_0:  yup
  //   .string()
  //   .required(requiredMsg),
  branches_id_0:  yup
    .array()
    .min(1),
  code_text: yup
    .string().when('code', {
      is: true,
      then: yup.string()
      .required(requiredMsg)
      .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.barcode_boxLength))
      .max(50, intlExt.formatMessage(formMessages.number_10_length)),
    }) ,
  limit: yup
    .string().when('sale_off_type_id', {
      is: '1',
      then: yup.string()
      .required(requiredMsg)
    }),
  limit_quantity: yup
    .string().when('limit', {
      is: 'exactly',
      then: yup.string()
      .required(requiredMsg)
      .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.barcode_boxLength))
      .max(50, intlExt.formatMessage(formMessages.number_10_length)),
    }),
};

var initialObjClient = {
  user_image_size: yup
    .number()
    .max(5000000, intlExt.formatMessage(formMessages.bigSize)),
  user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(formMessages.invalidType)
    ),
  validity_type: yup
    .string()
    .required(requiredMsg),
  validity_date: yup.string().when('validity_type', {
    is: "active_until",
    then: yup.string().required(requiredMsg)
  }),
  name: yup
    .string()
    .required(intlExt.formatMessage(formMessages.onlyLetters))
    .max(60, intlExt.formatMessage(formMessages.nameLength)),
  branches_id_0:  yup
    .array()
    .min(1)
};

const init = {
  user_image_size: 0,
  user_image_type: '',
  user_image: '',
  validity_type: '',
  validity_date: '',
  name: '',
  sale_off_type_id: 0,
  historicPoints: false,
  purchasedProducts: false,
  code: false,
  value: '',
  quantity: '',
  radio_button_purchasedProducts: '',
  division_id_0: '',
  category_id_0: '',
  material_id_0: '',
  product_id_0: '',
  unit_type_id_0: '',
  minimum_quantity_0: 0,
  require_options: 'yes',
  code_text: '',
  limit: '',
  limit_quantity: '',
  client_id_0: '',
  branches_id_0: []
}

export const usePromotionsDescription = (onAccept, onClose, role_id, promotionId, typePromotion) => {
  // const g = formData();
  const { doPatch, doGet } = useApi();
  const [defaultDate, updateDefaultDate] = useState(new Date());
  const [screens, updateScreens] = useState([]);
  const [selectedScreens, updateSelectedScreens] = useState([]);
  const [events, updateEvents] = useState([]);

  const [division, updateDivision] = useState();
  const [category, updateCategory] = useState();
  const [materialGroup, updateMaterialGroup] = useState();
  const [format, updateFormat] = useState();
  const [saleType, updateSaleType] = useState('');
  const [listDivisions, updateDivisions] = useState([]);
  const [listCategories, updateCategories] = useState([]);
  const [listMaterialGroups, updateMaterialGroups] = useState([]);
  const [listsOfProducts, updateProducts] = useState([]);
  const [listsOfClients, updateClients] = useState([]);
  const [listsOfBranches, updateBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [initial, setInitial] = useState(init);
  const [validationData, setValidationData] = useState({});
  const [promotion, setPromotion] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [add, setAdd] = useState(false);
  //const [reset, setReset] = useState(false);
  const [yupObject, setYupObject] = useState(initialObj);
  const [yupSchema, setYupSchema] = useState(yup.object().shape(
    yupObject
  ));
  const [validationSchema, setValidationSchema] = useState(yup.object().shape(
    yupObject
  ));
  const [listProductList, updateProductList] = useState([{
    divisions: [],
    categories: [],
    materials: [],
    products: [],
  }]);
  const [listProducts, setListProducts] = useState([{
    division_id: '',
    category_id: '',
    material_id: '',
    product_id: '',
    unit_type: '',
    minimum_quantity: '',
    visible: true,
    deleted: false,
    divisions: [],
    categories: [],
    materials: [],
    products: [],
    
  }]);
  //verificado
  const [listClients, setListClients] = useState([{
    client_id: '',
    branch_ids: [],
    visible: true,
    deleted: false,
    clients: [],
    branches: [],
    isAllSelected: false
  }]);
  const Formik = useFormik({
    initialValues: initial,
    validationSchema,
    onSubmit: async (values) => {
      // let dataValue = {}
      // dataValue = generateData(values);
      // try {
      //   const data = dataValue;
      //   let endpoint;
      //   let typePromotion;
      //   let promo = promotionId;

      //   if (data.sale_off_type_id === 1) {
      //       endpoint =`/sale-off​/${promo}​/user`;
      //       typePromotion = 1;
      //       handleSave(endpoint, data, typePromotion);
      //   } else if (data.sale_off_type_id === 2) {
      //       endpoint =`/sale-off​/${promo}​/nestle`;
      //       typePromotion = 2;
      //       handleSave(endpoint, data, typePromotion);
      //   } else if (data.sale_off_type_id === 0) {
      //       endpoint =`/sale-off/${promo}/client`;
      //       typePromotion = 3;
      //       handleSave(endpoint, data, typePromotion);
      //   } else {
      //     onClose();
      //   }        

      //   onClose();
      // } catch (error) {
      //   console.log({ error: error });
      // }
    }
  });

  useEffect(() => {
    if (typePromotion === "Cliente") {
      setValidationSchema(yup.object().shape(
        initialObjClient
      ));
    } else {
      setValidationSchema(yup.object().shape(
        initialObj
      ));
    }
    // GetDivision();
    // // GetProduct();
    // GetClient();
    // GetBranch();

  }, [typePromotion]);

  useEffect(() => {
  }, [Formik.values]);

  const reset = () => {
    Formik.resetForm();
    setListProducts([{
      division_id: '',
      category_id: '',
      material_id: '',
      product_id: '',
      unit_type: '',
      minimum_quantity: '',
      visible: true,
      deleted: false,
      divisions: [],
      categories: [],
      materials: [],
      products: [],
    }]);
    setListClients([{
      client_id: '',
      branch_ids: [],
      visible: true,
      deleted: false,
      clients: [],
      branches: [],
      isAllSelected: false
    }]);
    setYupObject(initialObj);
    setValidationSchema(yup.object().shape(
      initialObj
    ));
    setInitial(init);
  };

  // const generateData = (values) => {
  //   let keys = Object.keys(initial);
  //   let dataObject = {};
  //   keys.forEach(element => {
  //     if (element === "validity_date") {
  //       dataObject[element] = moment(values[element]).toISOString();
  //     } else {
  //       dataObject[element] = values[element];
  //     }
  //   });
  //   return dataObject;
  // };
  
  // const addClientList = () => {
  //   let schema = yupObject;
  //   let initialValues = initial;
  //   let list = listClients.slice();
  //   schema[`client_id_${list.length}`] = yup.string().required(requiredMsg);
  //   schema[`branches_id_${list.length}`] = yup.array().min(1);
  //   initialValues[`client_id_${list.length}`] = '';
  //   initialValues[`branches_id_${list.length}`] = [];
  //   list.push({
  //     client_id: '',
  //     branch_ids: [],
  //     visible: true,
  //     deleted: false,
  //     clients: [],
  //     branches: []
  //   });
  //   setYupObject(schema);
  //   setValidationSchema(yup.object().shape(schema));
  //   setInitial(initialValues);
  //   setListClients(list);
  // };

  // const deleteClientList = (index) => {
  //   if (listClients.length > 1) {
  //     let schema = yupObject;
  //     let initialValues = initial;
  //     let list = listClients.slice();
  //     delete schema[`client_id_${(list.length - 1)}`];
  //     delete schema[`branches_id_${(list.length - 1)}`];
  //     delete initialValues[`client_id_${(list.length - 1)}`];
  //     delete initialValues[`branches_id_${(list.length - 1)}`];
  //     list.splice(index, 1);
  //     setYupObject(schema);
  //     setValidationSchema(yup.object().shape(schema));
  //     setInitial(initialValues);
  //     setListClients(list);
  //   }
  // };

  // const deleteClientListTotal = () => {
  //   if (listClients.length > 1) {
  //     let schema = yupObject;
  //     let initialValues = initial;
  //     let list = listClients.slice();
  //     delete schema[`client_id_${(list.length - 1)}`];
  //     delete schema[`branches_id_${(list.length - 1)}`];
  //     delete initialValues[`client_id_${(list.length - 1)}`];
  //     delete initialValues[`branches_id_${(list.length - 1)}`];
  //     list.splice((list.length - 1), 1);
  //     setYupObject(schema);
  //     setValidationSchema(yup.object().shape(schema));
  //     setInitial(initialValues);
  //     setListClients(list);
  //   }
  // };

  const hideClientList = (index) => {
      let list = listClients.slice();
      list[index].visible = !list[index].visible
      setListClients(list);
  };

  // const addProductList = () => {
  //   let schema = yupObject;
  //   let initialValues = initial;
  //   let list = listProducts.slice();
  //   // let options = listProductList.slice();
  //   // options.push({
  //   //   divisions: [],
  //   //   categories: [],
  //   //   materials: [],
  //   //   products: [],
  //   // })
  //   schema[`product_id_${list.length}`] = yup.string().when('purchasedProducts', {
  //     is: true,
  //     then: yup.string()
  //     .required(requiredMsg)
  //   });
  //   schema[`unit_type_id_${list.length}`] = yup.string().when('purchasedProducts', {
  //     is: true,
  //     then: yup.string()
  //     .required(requiredMsg)
  //   });
  //   schema[`minimum_quantity_${list.length}`] = yup.string().when('purchasedProducts', {
  //     is: true,
  //     then: yup.string()
  //     .required(requiredMsg)
  //     .matches(/^\d{1,4}/, intlExt.formatMessage(formMessages.onlyNumbers))
  //     .max(3, intlExt.formatMessage(formMessages.pointsLength)),
  //   });
  //   initialValues[`product_id_${list.length}`] = '';
  //   initialValues[`unit_type_id_${list.length}`] = [];
  //   initialValues[`minimum_quantity_${list.length}`] = [];
  //   list.push({
  //     division_id: '',
  //     category_id: '',
  //     material_id: '',
  //     product_id: '',
  //     unit_type: '',
  //     m_quantity: '',
  //     visible: true,
  //     deleted: false,
  //     divisions: [],
  //     categories: [],
  //     materials: [],
  //     products: [],
  //   });
  //   setYupObject(schema);
  //   setValidationSchema(yup.object().shape(schema));
  //   setInitial(initialValues);
  //   setListProducts(list);
  //   //updateProductList(options);
  // };

  const generateProductList = async (array, array_clients, promotion) => {

    let schema = yupObject;
    let initialValues = initial;
    let list = [];
    let division_list = await doGet('/sale-off/division/list');
    let category_list = [];
    let material_list = [];
    let product_list = [];

    for (let i = 0; i < array.length; i++) {
      let response_category = await doGet(`/sale-off/division/${array[i].product_division_id}/category/list`);
      let response_material = await doGet(`/sale-off/category/${array[i].product_category_id}/material-group/list`);
      let response_product = await doGet(`/sale-off/material-group/${array[i].product_material_group_id}/product/list`);
      
      category_list.push(response_category);
      material_list.push(response_material);
      product_list.push(response_product);
        
    }

    array.map((element, index) => {

      let unity;
      
      schema[`product_id_${index}`] = yup.string().when('purchasedProducts', {
        is: true,
        then: yup.string()
        .required(requiredMsg)
      });
      schema[`unit_type_id_${index}`] = yup.string().when('purchasedProducts', {
        is: true,
        then: yup.string()
        .required(requiredMsg)
      });
      schema[`minimum_quantity_${index}`] = yup.string().when('purchasedProducts', {
        is: true,
        then: yup.string()
        .required(requiredMsg)
        .matches(/^\d{1,4}/, intlExt.formatMessage(formMessages.onlyNumbers))
        .max(3, intlExt.formatMessage(formMessages.pointsLength)),
      });

      initialValues[`product_id_${index}`] = '';
      initialValues[`unit_type_id_${index}`] = [];
      initialValues[`minimum_quantity_${index}`] = [];

      if (element.unit_type === "caja") {
        unity = true;
      } else {
        unity = false;
      }

      list.push({
        division_id: element.product_division_id,
        category_id: element.product_category_id,
        material_id: element.product_material_group_id,
        product_id: element.product_name,
        unit_type: element.unit_type,
        minimum_quantity: element.minimum_quantity,
        visible: true,
        deleted: false,
        divisions: division_list,
        categories: category_list[index],
        materials: material_list[index],
        products: product_list[index],
      });

      formikFunction(`product_id_${index}`, element.product_id);
      formikFunction(`unit_type_id_${index}`, unity);
      formikFunction(`minimum_quantity_${index}`, element.minimum_quantity);


      // GetCategory(element.product_division_id, index);

    });

    setYupObject(schema);
    setValidationSchema(yup.object().shape(schema));
    setInitial(initialValues);
    setListProducts(list);

    generateClientList(array_clients, promotion);
    //updateProductList(options);
  };

  const generateClientList = async (array_clients, promotion) => {

    let schema = yupObject;
    let initialValues = initial;
    let list = [];
    let client_list = await doGet(`/sale-off/client/list`);
    let branches_list = [];

    for (let i = 0; i < array_clients.length; i++) {
      let response_branches = await doGet(`/sale-off/branch/list/${array_clients[i].client_id}`);
      
      branches_list.push(response_branches);
        
    }

    array_clients.map((element, index) => {

      schema[`client_id_${index}`] = yup.string().required(requiredMsg);
      schema[`branches_id_${index}`] = yup.array().min(1);

      initialValues[`client_id_${index}`] = '';
      initialValues[`branches_id_${index}`] = [];

      list.push({
        client_id: element.client_name,
        branch_ids: element.branch_names,
        visible: true,
        deleted: false,
        clients: client_list,
        branches: branches_list[index]
      });

      formikFunction(`client_id_${index}`, element.client_id);
      formikFunction(`branches_id_${index}`, element.branch_ids);

      // GetCategory(element.product_division_id, index);

    });

    setYupObject(schema);
    setValidationSchema(yup.object().shape(schema));
    setInitial(initialValues);
    setListClients(list);

    PromoValues(promotion);
    //updateProductList(options);
  }

  // const deleteProductList = (index) => {
  //   if (listProducts.length > 1) {
  //     let schema = yupObject;
  //     let initialValues = initial;
  //     let list = listProducts.slice();
  //     delete schema[`product_id_${(list.length - 1)}`];
  //     delete schema[`unit_type_id_${(list.length - 1)}`];
  //     delete schema[`minimum_quantity_${(list.length - 1)}`];
  //     delete initialValues[`product_id_${(list.length - 1)}`];
  //     delete initialValues[`unit_type_id_${(list.length - 1)}`];
  //     delete initialValues[`minimum_quantity_${(list.length - 1)}`];
  //     // let options = listProductList.slice();
  //     // list.splice(index, 1);
  //     // options.splice(index, 1);
  //     list[index].deleted = true;
  //     setYupObject(schema);
  //     setValidationSchema(yup.object().shape(schema));
  //     setInitial(initialValues);
  //     setListProducts(list);
  //     // updateProductList(options);
  //   }
  // };

  const hideProductList = (index) => {
      let list = listProducts.slice();
      list[index].visible = !list[index].visible
      setListProducts(list);
  };

  const handleProductListChange = async (event, index) => {

    if (event.target.name === `division_id_${index}`) {
      let list = listProducts.slice();
      list[index].division_id = event.target.value;
      GetCategory(event.target.value, index);
      setListProducts(list);
    }
    else if (event.target.name === `category_id_${index}`) {
      let list = listProducts.slice();
      list[index].category_id = event.target.value;
      GetMaterial(event.target.value, index);
      setListProducts(list);
    }
    else if (event.target.name === `material_id_${index}`) {
      let list = listProducts.slice();
      list[index].material_id = event.target.value;
      GetProduct(event.target.value, index);
      setListProducts(list);
    }
    else if (event.target.name === `product_id_${index}`) {
      
      let list = listProducts.slice();
      list[index].product_id = event.target.value;
      setListProducts(list);

    }
    else if (event.target.name === `unit_type_id_${index}`) {
      let list = listProducts.slice();
      list[index].unit_type = event.target.value;
      setListProducts(list);
    } else {
      let list = listProducts.slice();
      list[index].minimum_quantity = parseInt(event.target.value, 10);
      setListProducts(list);
    }

    let formikObject = {
      target: {
        name: event.target.name,
        value: event.target.value
      }
    };
    Formik.handleChange(formikObject)
  };

  const handleClientListChange = async (event, index) => {

    if (event.target.name === `client_id_${index}`) {
      let list = listClients.slice();
      list[index].client_id = event.target.value;
      list[index].branch_ids = [];
      list[index].branches = [];
      list[index].isAllSelected = false;

      GetBranchId(event.target.value, index)
      formikFunction(event.target.name, event.target.value);
      formikFunction(`branches_id_${index}`, []);
      setListClients(list);
    }
    else {
      let value = event.target.value;
      let list = listClients.slice();

      if (value[value.length - 1] === "all") {
        if (list[index].branch_ids.length === list[index].branches.length) {
          list[index].branch_ids = [];
          list[index].isAllSelected = false;
          setIsAllSelected(false);
        } else {
          list[index].branches.map((branch) => {
            list[index].branch_ids.push(branch.id);
          })
          list[index].isAllSelected = true;
          setIsAllSelected(true);
        }
        let formikObject = {
          target: {
            name: event.target.name,
            value: event.target.value
          }
        };
        Formik.handleChange(formikObject)
        setListClients(list);
        return;
      }

      list[index].branch_ids = event.target.value;
      if (list[index].branch_ids.length === list[index].branches.length) {
        list[index].isAllSelected = true;
        setIsAllSelected(true);
      } else {
        list[index].isAllSelected = false;
        setIsAllSelected(false);
      }
      let formikObject = {
        target: {
          name: event.target.name,
          value: event.target.value
        }
      };
      Formik.handleChange(formikObject)
      setListClients(list);
    }
  };

  // const handleErrors = (error) => {
  //   if (error.message) {
  //     const name = error.error;
  //     const message = error.message;

  //   } else {
  //     const name = error.property;
  //     const message = error.constraints.isNotEmpty;
  //   }
  // };

  // const handleSave = (endpoint, data, typePromotion) => {
    
  //   endpoint.replace(regex, '');
  //   const fd = new FormData();

  //   if (data.name) fd.set('name', data.name);
  //   if ((data.validity_type)) fd.set('validity_type', data.validity_type);
  //   if ((data.validity_date) && (data.validity_type === "active_until")) fd.set('validity_date', data.validity_date);
  //   if (typePromotion === 1) fd.set('historical_points', data.historicPoints);
  //   if (data.historicPoints) {
  //     if ((data.value) && (typePromotion === 1)) fd.set('value', data.value);
  //     if ((data.quantity) && (typePromotion === 1)) fd.set('quantity', data.quantity);
  //   }
  //   if (typePromotion === 1) fd.set('load_points', data.purchasedProducts);
  //   if (data.purchasedProducts) {
  //     if ((data.radio_button_purchasedProducts) && (typePromotion === 1)) fd.set('product_compliance', data.radio_button_purchasedProducts);
  //     if ((typePromotion === 1) && (data.purchasedProducts)) {
  //       if (listProducts) {
  //         let products = generateProductsArray();
  //         fd.set('products', products);
  //       }
  //     }
  //   }

  //   if (typePromotion === 1) {
  //     if (data.require_options === 'yes') {
  //       fd.set('required_both', true);
  //     } else {
  //       fd.set('required_both', false);
  //     }
  //   }
  //   if ((typePromotion === 1) || (typePromotion === 2)) {
  //     if (listClients) {
  //       let clients = generateClientsArray();
  //       fd.set('clients', clients);
  //     }
  //   }
  //   if ((data.code) && (data.code_text) && (typePromotion === 1)) fd.set('code', data.code_text);
  //   if (typePromotion === 1) fd.set('limit', data.limit);
  //   if ((data.limit_quantity) && (typePromotion === 1)) fd.set('limit_quantity', data.limit_quantity);

  //   if (data.user_image && data.user_image_type) {
  //     fd.set('image', data.user_image);
  //   }

  //   if (typePromotion === 3) {
  //     if (data.branches_id_0) {
  //       fd.set('branch', JSON.stringify(data.branches_id_0));
  //     }
  //   }

  //   fd.set('description', 'No disponible');

  //   doPatch(endpoint, fd)
  //     .then((result) => {
  //       onAccept();
  //       setReset(!reset);
  //       //window.location.reload();
  //     })
  //     .catch((err) => handleErrors(err));
  // };

  // const generateClientsArray = () => {
  //   let list = listClients.slice();
  //   list.forEach(element => {
  //     if (!element.deleted) {
  //       delete element['branches'];
  //       delete element['clients'];
  //       delete element['visible'];
  //       delete element['deleted'];
  //       delete element['isAllSelected'];
  //     }
  //   });
  //   let json_arr = JSON.stringify(list);
  //   return json_arr;
  // };

  // const generateProductsArray = () => {
  //   let list = listProducts.slice();
  //   list.forEach(element => {
  //     if (!element.deleted) {
  //       if (element.unit_type) {
  //         element.unit_type = 'caja';
  //       } else {
  //         element.unit_type = 'pieza'
  //       } 
  //       delete element['division_id'];
  //       delete element['category_id'];
  //       delete element['material_id'];
  //       delete element['visible'];
  //       delete element['deleted'];
  //       delete element['divisions'];
  //       delete element['categories'];
  //       delete element['materials'];
  //       delete element['products'];
  //     } 
  //   });
  //   let json_arr = JSON.stringify(list);
  //   return json_arr;
  // };

  // const GetDivision = () => {
  //   const axios = useAxios();

  //   axios
  //     .get('/sale-off/division/list')
  //     .then((response) => {
  //       if (response.status === 200) {
  //         updateDivisions(response.data.items);
  //       }
  //     })
  //     .finally(() => {
  //       // updateLoadingCampaigns(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const GetCategory = async (valdivision, index) => {
  //   const axios = useAxios();

  //   if((valdivision !== undefined) && (valdivision !== null)){
  //     await axios
  //       .get(`/sale-off/division/${valdivision}/category/list`)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           let list = listProducts.slice();
  //           list[index].categories = response.data.items,
  //           setListProducts(list);
  //           //updateCategories(response.data.items);
  //         }
  //       })
  //       .finally(() => {
  //         // updateLoadingCampaigns(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // const GetMaterial = async (valcategory, index) => {
  //   const axios = useAxios();
  //   if((valcategory !== undefined) && (valcategory !== null)){
  //     await axios
  //       .get(`/sale-off/category/${valcategory}/material-group/list`)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           //updateMaterialGroups(response.data.items);
  //           let list = listProducts.slice();
  //           list[index].materials = response.data.items,
  //           setListProducts(list);
  //         }
  //       })
  //       .finally(() => {
  //         // updateLoadingCampaigns(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // const GetProduct = async (valmaterial, index) => {
  //   const axios = useAxios();

  //   await axios
  //     .get(`/sale-off/material-group/${valmaterial}/product/list`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         let list = listProducts.slice();
  //         list[index].products = response.data.items,
  //         setListProducts(list);
  //         //updateProducts(response.data.result.items);
  //       }
  //     })
  //     .finally(() => {
  //       // updateLoadingCampaigns(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const GetClient = async () => {
  //   const axios = useAxios();

  //   await axios
  //     .get(`/sale-off/client/list`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         updateClients(response.data.items);
  //       }
  //     })
  //     .finally(() => {
  //       // updateLoadingCampaigns(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const GetBranch = async () => {
  //   const axios = useAxios();

  //   await axios
  //     .get(`/sale-off/branch/list/`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // console.log("Branch", response)
  //         updateBranches(response.data.items);
  //       }
  //     })
  //     .finally(() => {
  //       // updateLoadingCampaigns(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const GetBranchId = async (id, index) => {
  //   const axios = useAxios();

  //   await axios
  //     .get(`/sale-off/branch/list/${id}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         let list = listClients.slice();
  //         list[index].branches = response.data.items,
  //         setListClients(list);
  //       }
  //     })
  //     .finally(() => {
  //       // updateLoadingCampaigns(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleChangeImage = (e) => {
    const fileObject = {
      [e.target.name]: e.target.files[0],
      user_image_size: e.target.files[0].size,
      user_image_type: e.target.files[0].type,
    }
    //const  { name, value, type } = event.target;
    for (const property in fileObject) {
      let formikObject = {
        target: {
          name: property,
          value: fileObject[property]
        }
      };
      Formik.handleChange(formikObject)
    }
  }

  // const removeSelected = (item) => {
  //   let newArray = [...selectedScreens];

  //   newArray.splice(
  //     selectedScreens.findIndex((i) => i.id === item.id),
  //     1
  //   );
  //   updateSelectedScreens(newArray);
  // };

  const formikFunction = (propertyName, propertyValue) => {

    let formikObject = {
      target: {
        name: propertyName,
        value: propertyValue
      }
    };
    Formik.handleChange(formikObject)
  };
  
  const GetPromotion = async (endpoint, id) => {
    // doGet(endpoint)
    //   .then((result) => {
    //     console.log("result", result)
    //     delete result['id'];
    //     setPromotion(result);
    //   })
    //   .catch((err) => handleErrors(err));

  };

  const PromoValues = (promo) => {
    let values = promo;
    formikFunction("validity_date", "00-00-00");
    //let keys = Object.keys(promo);

    if (values.sale_off_type_name === "Cliente") {
      if (values.clients.length > 0) {
        formikFunction("branches_id_0", values.clients[0].branch_names);
      }
    }

    if (values.validity_type) {
      formikFunction("validity_type", values.validity_type);
    }
    if (values.validity_date) {
      let date = values.validity_date.substr(0, 10);
      formikFunction("validity_date", date);
    }
    if (values.name) {
      formikFunction("name", values.name);
    }
    if (values.description) {
      formikFunction("description", values.description);
    }
    if (values.historical_points) {
      formikFunction("historicPoints", values.historical_points);
    }
    if (values.quantity) {
      formikFunction("quantity", values.quantity);
    }
    if (values.load_points) {
      formikFunction("purchasedProducts", values.load_points);
    }
    if (values.product_compliance) {
      formikFunction("radio_button_purchasedProducts", values.product_compliance);
    }
    if (values.products) {
      // console.log("products", values.products)
      // let list = listProducts.slice();
      // let val = 1000;
      // for (let i = 0; list.length <= 5;) {
      //    //addProductList();
      //   if (list.length === 5)
      //   {
      //     val = 0;
      //   }
      //   setTimeout(() => {
      //     setAdd(i++);
      //   }, val);
      // }

      // let list = listProducts.slice();
      // console.log("list", list)

      // list.map((element, index) => {
      //   console.log(index);
      //   //Object is copied
        
      //   //Get parameters of product and update lists
      //   // list[index].division_id = element.product_division_id;
         
        
      //   // list[index].category_id = element.product_category_id;
      //   GetMaterial(element.product, index);

      //   // list[index].material_id = element.product_material_group_id;
      //   // GetProduct(element.product_material_group_id, index);

      //   // list[index].product_id = element.product_id;

      //   // list[index].unity_type = element.unit_type;
        
      //   list[index].minimun_quantity = element.minimum_quantity;
        
      //   // Update Formik values
      //   formikFunction(`product_id_${index}`, element.product_id);
      //   formikFunction(`unit_type_id_${index}`, element.unit_type);
      //   formikFunction(`minimum_quantity_${index}`, element.minimum_quantity);

      //   // set ProductList
      // })
      // setListProducts(list);
      // formikFunction("products", values.products);
    }

    if (values.required_both) {
      if (values.required_both) {
        formikFunction("require_options", "yes");
      } else {
        formikFunction("require_options", "no");
      }
    }
    // if (values.clients) {
    //   for (let i = 1; i < values.clients.length; i++) {
    //     addClientList();
    //   }

    //   values.clients.map((element, index) => {
    //     let list = listClients.slice();
    //     list[index].client_id = element.client_id;
    //     GetBranchId(element.client_id, index);
    //     list[index].branch_ids = element.branch_ids;
    //     formikFunction(`client_id_${index}`, element.client_id);
    //     formikFunction(`branches_id_${index}`, element.branch_ids);
    //     setListClients(list);
    //   })
    // }
    if (values.code) {
      formikFunction("code", true);
      formikFunction("code_text", values.code);
    }
    if (values.image_url) {
      formikFunction("user_image", config.siteConfig.apiUrl + '/' + values.image_url);
    }
    if (values.limit) {
      formikFunction("limit", values.limit);
    }
    if (values.limit_quantity) {
      formikFunction("limit_quantity", values.limit_quantity);
    }

    
    // "id": 1,user_image
    // "validity_type": "always",
    // "validity_date": null,
    // "name": "Promo cliente 2",
    // "description": "Promo cliente descripcion 2",
    // "historical_points": false,
    // "quantity": null,
    // "load_points": false,
    // "product_compliance": null,
    // "products": [],
    // "required_both": false,
    // "clients": [
    //   {
    //     "client_id": 2,
    //     "client_name": "Nestlé S.A. de C.V.",
    //     "branch_ids": [
    //       1
    //     ],
    //     "branch_names": [
    //       "Branch 1"
    //     ]
    //   }
    // ],
    // "code": null,
    // "limit": null,
    // "limit_quantity": null,
    // "image_url": null

  };

  return {
    variable: {
      defaultDate,
      division,
      category,
      materialGroup,
      format,
      selectedBranches,
      isAllSelected,
      promotion,
      yupObject,
      initial, 
      // reset
    },
    methods: {
      updateDefaultDate,
      updateScreens,
      updateSelectedScreens,
      // removeSelected,
      updateDivision,
      updateCategory,
      updateMaterialGroup,
      // GetDivision,
      // GetProduct,
      updateFormat,
      // addClientList,
      // deleteClientList,
      // deleteClientListTotal,
      hideClientList,
      // addProductList,
      // deleteProductList,
      hideProductList,
      handleChangeImage,
      handleProductListChange,
      handleClientListChange,
      GetPromotion,
      PromoValues,
      formikFunction,
      setListProducts,
      setYupObject,
      setValidationSchema,
      setInitial,
      setListProducts,
      generateProductList,
      generateClientList,
      reset
    },
    list: {
      screens,
      selectedScreens,
      events,
      listDivisions,
      listCategories,
      listMaterialGroups,
      listsOfProducts,
      listClients,
      listProducts,
      listProductList,
      listsOfClients,
      listsOfBranches,
    },
    Formik
  };
};
