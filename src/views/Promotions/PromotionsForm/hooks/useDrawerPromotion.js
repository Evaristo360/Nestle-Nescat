import { useState, useEffect } from 'react';
import useApi from './api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as formMessages } from '../PromotionsFormMessages';
import useAxios from 'hooks/useAxios';
import moment from 'moment';
import { object } from 'prop-types';

const requiredMsg = intlExt.formatMessage(formMessages.required);

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
    .max(5000000, intlExt.formatMessage(formMessages.bigSize)).required(requiredMsg),
  user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(formMessages.invalidType)
    ).required(requiredMsg),
  validity_type: yup
    .string()
    .required(requiredMsg),
  validity_date: yup.string().when('validity_type', {
    is: "active_until",
    then: yup.string().required(requiredMsg)
  }),
  name: yup
    .string()
    .required(requiredMsg)
    .max(60, intlExt.formatMessage(formMessages.nameLength)),
  description: yup
    .string()
    .required(requiredMsg)
    .max(60, intlExt.formatMessage(formMessages.descriptionLength)),
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

const init = {
  user_image_size: 0,
  user_image_type: '',
  user_image: '',
  validity_type: '',
  validity_date: '',
  name: '',
  description: '',
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
  minimum_quantity_0: '',
  require_options: 'no',
  code_text: '',
  limit: '',
  limit_quantity: '',
  client_id_0: '',
  branches_id_0: []
}

var initialObjClient = {
  user_image_size: yup
    .number()
    .max(5000000, intlExt.formatMessage(formMessages.bigSize)).required(requiredMsg),
  user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(formMessages.invalidType)
    ).required(requiredMsg),
  validity_type: yup
    .string()
    .required(requiredMsg),
  validity_date: yup.string().when('validity_type', {
    is: "active_until",
    then: yup.string().required(requiredMsg)
  }),
  name: yup
    .string()
    .required(requiredMsg)
    .max(60, intlExt.formatMessage(formMessages.nameLength)),
  description: yup
    .string()
    .required(requiredMsg)
    .max(60, intlExt.formatMessage(formMessages.descriptionLength)),
  branches_id_0:  yup
    .array()
    .min(1)
};

export const useDrawerPromotion = (onAccept, onClose, role_id, visible) => {
  // // const g = formData();
  // console.log("role_id", role_id)
  const { doPut } = useApi();
  const [defaultDate, updateDefaultDate] = useState(new Date());
  const [screens, updateScreens] = useState([]);
  const [selectedScreens, updateSelectedScreens] = useState([]);
  const [events, updateEvents] = useState([]);
  const [saleOff, setSaleOff] = useState("");

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
  const [isAllSelected, setIsAllSelected] = useState(false);
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
    branch_names: [],
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
      let dataValue = {}
      dataValue = generateData(values);
      try {
        const data = dataValue;
        let endpoint;

        if (role_id === 2 || role_id === 3) {
          if (data.sale_off_type_id === 1) endpoint = "/sale-off/user";
          if (data.sale_off_type_id === 2) endpoint = "/sale-off/nestle";
          handleSave(endpoint, data);
        } else if (role_id === 4 || role_id === 5) {
          endpoint = "/sale-off/client";
          handleSave(endpoint, data);
        } else {
          onClose();
          reset();
        } 
        onClose();
        reset();      
      } catch (error) {
        console.log({ error: error });
      }
    }
  });

  useEffect(() => {
    if (role_id === 5) {
      setValidationSchema(yup.object().shape(
        initialObjClient
      ));
    } else if (role_id === 4) {
      setValidationSchema(yup.object().shape(
        initialObjClient
      ));
    }
    // console.log("Formik", Formik)
    // console.log("validationSchema", validationSchema)
    // console.log("initial", initial)
    // GetDivision();
    // // GetProduct();
    // GetClient();
    // GetBranch();
    // if (typeof Formik.values.division_id === 'number') {
    //   GetCategory(Formik.values.division_id);
    // }
    // if (Formik.values.category_id !== '') GetMaterial(Formik.values.category_id);
    // if (Formik.values.category_id !== '') GetMaterial(Formik.values.category_id);

  }, [Formik.values]);

  useEffect(() => {
    //Formik.validateForm();
    GetDivision();
    // GetProduct();
    GetClient();
    GetBranch();
  }, []);

  useEffect(() => {
    Formik.validateForm();
  }, [visible]);

  const generateData = (values) => {
    let keys = Object.keys(initial);
    let dataObject = {};
    keys.forEach(element => {
      if (element === "validity_date") {
        dataObject[element] = moment(values[element]).toISOString();
      } else {
        dataObject[element] = values[element];
      }
    });
    return dataObject;
  };

  const reset = () => {
    let listC = listClients.slice();
    let listP = listProducts.slice();
    let schema = yupObject;
    let initialValues = initial;

    if (listC.length > 1) {
      listC.map((client, index) => {
        if (index > 0) {
          delete schema[`client_id_${index}`];
          delete schema[`branches_id_${index}`];
          delete initialValues[`client_id_${index}`];
          delete initialValues[`branches_id_${index}`];
        }
      })
    }

    if (listP.length > 1) {
      listP.map((product, index) => {
        if (index > 0) {
          delete schema[`product_id_${index}`];
          delete schema[`unit_type_id_${index}`];
          delete schema[`minimum_quantity_${index}`];
          delete initialValues[`product_id_${index}`];
          delete initialValues[`unit_type_id_${index}`];
          delete initialValues[`minimum_quantity_${index}`];
        }
      })
    }

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
      branch_names: [],
      visible: true,
      deleted: false,
      clients: [],
      branches: [],
      isAllSelected: false
    }]);
    // console.log("initialObj", initialObj)
    setYupObject(schema);
    setValidationSchema(yup.object().shape(schema));
    setInitial(initialValues);
    Formik.resetForm();
  };
  
  const addClientList = () => {
    let schema = yupObject;
    let initialValues = initial;
    let list = listClients.slice();
    schema[`client_id_${list.length}`] = yup.string().required(requiredMsg);
    schema[`branches_id_${list.length}`] = yup.array().min(1);
    initialValues[`client_id_${list.length}`] = '';
    initialValues[`branches_id_${list.length}`] = [];
    list.push({
      client_id: '',
      branch_ids: [],
      branch_names: [],
      visible: true,
      deleted: false,
      clients: [],
      branches: []
    });
    setYupObject(schema);
    setValidationSchema(yup.object().shape(schema));
    setInitial(initialValues);
    setListClients(list);
  };

  const deleteClientList = (index) => {
    if (listClients.length > 1) {
      let schema = yupObject;
      let initialValues = initial;
      let list = listClients.slice();
      delete schema[`client_id_${(list.length - 1)}`];
      delete schema[`branches_id_${(list.length - 1)}`];
      delete initialValues[`client_id_${(list.length - 1)}`];
      delete initialValues[`branches_id_${(list.length - 1)}`];
      list.splice(index, 1);
      setYupObject(schema);
      setValidationSchema(yup.object().shape(schema));
      setInitial(initialValues);
      setListClients(list);
    }
  };

  const deleteClientListTotal = () => {
    if (listClients.length > 1) {
      let schema = yupObject;
      let initialValues = initial;
      let list = listClients.slice();
      delete schema[`client_id_${(list.length - 1)}`];
      delete schema[`branches_id_${(list.length - 1)}`];
      delete initialValues[`client_id_${(list.length - 1)}`];
      delete initialValues[`branches_id_${(list.length - 1)}`];
      list.splice((list.length - 1), 1);
      setYupObject(schema);
      setValidationSchema(yup.object().shape(schema));
      setInitial(initialValues);
      setListClients(list);
    }
  };

  const hideClientList = (index) => {
      let list = listClients.slice();
      list[index].visible = !list[index].visible
      setListClients(list);
  };

  const addProductList = () => {
    let schema = yupObject;
    let initialValues = initial;
    let list = listProducts.slice();
    // let options = listProductList.slice();
    // options.push({
    //   divisions: [],
    //   categories: [],
    //   materials: [],
    //   products: [],
    // })
    schema[`product_id_${list.length}`] = yup.string().when('purchasedProducts', {
      is: true,
      then: yup.string()
      .required(requiredMsg)
    });
    schema[`unit_type_id_${list.length}`] = yup.string().when('purchasedProducts', {
      is: true,
      then: yup.string()
      .required(requiredMsg)
    });
    schema[`minimum_quantity_${list.length}`] = yup.string().when('purchasedProducts', {
      is: true,
      then: yup.string()
      .required(requiredMsg)
      .matches(/^\d{1,4}/, intlExt.formatMessage(formMessages.onlyNumbers))
      .max(3, intlExt.formatMessage(formMessages.pointsLength)),
    });
    initialValues[`product_id_${list.length}`] = '';
    initialValues[`unit_type_id_${list.length}`] = '';
    initialValues[`minimum_quantity_${list.length}`] = '';
    list.push({
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
    });
    setYupObject(schema);
    setValidationSchema(yup.object().shape(schema));
    setInitial(initialValues);
    setListProducts(list);
    //updateProductList(options);
  };

  const deleteProductList = (index) => {
    if (listProducts.length > 1) {
      let schema = yupObject;
      let initialValues = initial;
      let list = listProducts.slice();
      delete schema[`product_id_${(list.length - 1)}`];
      delete schema[`unit_type_id_${(list.length - 1)}`];
      delete schema[`minimum_quantity_${(list.length - 1)}`];
      delete initialValues[`product_id_${(list.length - 1)}`];
      delete initialValues[`unit_type_id_${(list.length - 1)}`];
      delete initialValues[`minimum_quantity_${(list.length - 1)}`];
      // let options = listProductList.slice();
      // list.splice(index, 1);
      // options.splice(index, 1);
      list[index].deleted = true;
      setYupObject(schema);
      setValidationSchema(yup.object().shape(schema));
      setInitial(initialValues);
      setListProducts(list);
      // updateProductList(options);
    }
  };

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
      // console.log("event", event.target)
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
      if (event.target.value !== "") {
        list[index].minimum_quantity = parseInt(event.target.value, 10);
      } else {
        list[index].minimum_quantity = " ";
      }
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
      list[index].branch_names = [];
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
      let options = [];

      if ((role_id === 4) || (role_id === 5)) {
        options = listsOfBranches;
      } else {
        options = list[index].branches;
      }

      if (value.includes("all")) {
        if (list[index].branch_names.length >= options.length) {
          list[index].branch_names = [];
          list[index].isAllSelected = false;
          setIsAllSelected(false);
        } else {
          list[index].branch_names = [];
          options.map((branch) => {
            list[index].branch_names.push(branch.name);
          })
          list[index].isAllSelected = true;
          setIsAllSelected(true);
        }
        let formikObject = {
          target: {
            name: event.target.name,
            value: list[index].branch_names
          }
        };
        Formik.handleChange(formikObject)
        setListClients(list);
        return;
      }

      list[index].branch_names = event.target.value;

      if (list[index].branch_names.length === options.length) {
        list[index].isAllSelected = true;
        setIsAllSelected(true);
      } else {
        list[index].isAllSelected = false;
        setIsAllSelected(false);
      }
      let formikObject = {
        target: {
          name: event.target.name,
          value: list[index].branch_names
        }
      };
      Formik.handleChange(formikObject)
      setListClients(list);
    }
  };

  const handleErrors = (error) => {
    if (error.message) {
      const name = error.error;
      const message = error.message;

    } else {
      const name = error.property;
      const message = error.constraints.isNotEmpty;
    }
  };

  const handleSave = (endpoint, data) => {

    const fd = new FormData();

    if (data.name) fd.set('name', data.name);
    if (data.description) fd.set('description', data.description);
    if ((data.validity_type)) fd.set('validity_type', data.validity_type);
    if ((data.validity_date) && (data.validity_type === "active_until")) fd.set('validity_date', data.validity_date);
    if (endpoint === "/sale-off/user") fd.set('historical_points', data.historicPoints);
    if (data.historicPoints) {
      if ((data.value) && (endpoint === "/sale-off/user")) fd.set('value', data.value);
      if ((data.quantity) && (endpoint === "/sale-off/user")) fd.set('quantity', data.quantity);
    }
    if (endpoint === "/sale-off/user") fd.set('load_points', data.purchasedProducts);

    if (data.purchasedProducts) {
      if ((data.radio_button_purchasedProducts) && (endpoint === "/sale-off/user")) fd.set('product_compliance', data.radio_button_purchasedProducts);
    
      if ((endpoint === "/sale-off/user") && (data.purchasedProducts)) {
        if (listProducts) {
          let products = generateProductsArray();
          fd.set('products', products);
        }
      }
    }

    if (endpoint === "/sale-off/user") {
      if (data.require_options === 'yes') {
        fd.set('required_both', true);
      } else {
        fd.set('required_both', false);
      }
    }
    if ((endpoint === "/sale-off/user") || (endpoint === "/sale-off/nestle")) {
      if (listClients) {
        let clients = generateClientsArray();
        fd.set('clients', clients);
      }
    }
    if ((data.code) && (data.code_text) && (endpoint === "/sale-off/user")) fd.set('code', data.code_text);
    if (endpoint === "/sale-off/user") fd.set('limit', data.limit);
    if ((data.limit_quantity) && (endpoint === "/sale-off/user")) fd.set('limit_quantity', data.limit_quantity);
    
    if (data.user_image && data.user_image_type) {
      fd.set('image', data.user_image);
    }

    if ((endpoint === "/sale-off/client")) {
      if (listClients) {
        generateClientArray();
      }

      fd.set('branch', JSON.stringify(listClients[0].branch_ids));
    }

    doPut(endpoint, fd)
      .then((result) => {
        reset();
        onAccept();
        //window.location.reload();
      })
      .catch((err) => {
        reset();
        handleErrors(err);
      });
  };

  const generateClientsArray = () => {
    let list = listClients.slice();
    // console.log("list", list)
    list.forEach(element => {
      element.branches.forEach(branch => {
        if (element.branch_names.includes(branch.name)) {
          element.branch_ids.push(branch.id);
        }
      });
    });
    list.forEach(element => {
      if (!element.deleted) {
        delete element['branches'];
        delete element['clients'];
        delete element['visible'];
        delete element['deleted'];
        delete element['isAllSelected'];
        delete element['branch_names'];
        // delete element['client_name'];
      }
    });
    let json_arr = JSON.stringify(list);
    return json_arr;
  };

  const generateClientArray = () => {
    let list = listClients.slice();
    list.forEach(element => {
      listsOfBranches.forEach(branch => {
        if (element.branch_names.includes(branch.name)) {
          element.branch_ids.push(branch.id);
        }
      });
    });
    list.forEach(element => {
      if (!element.deleted) {
        delete element['branches'];
        delete element['clients'];
        delete element['visible'];
        delete element['deleted'];
        delete element['isAllSelected'];
        // delete element['branch_names'];
        // delete element['client_name'];
      }
    });
    let json_arr = JSON.stringify(list);
    return json_arr;
  };

  const generateProductsArray = () => {
    let list = listProducts.slice();
    list.forEach(element => {
      if (!element.deleted) {
        if (element.unit_type) {
          element.unit_type = 'caja';
        } else {
          element.unit_type = 'pieza'
        } 
        delete element['division_id'];
        delete element['category_id'];
        delete element['material_id'];
        delete element['visible'];
        delete element['deleted'];
        delete element['divisions'];
        delete element['categories'];
        delete element['materials'];
        delete element['products'];
      } 
    });
    let json_arr = JSON.stringify(list);
    return json_arr;
  };

  const GetDivision = () => {
    const axios = useAxios();

    axios
      .get('/sale-off/division/list')
      .then((response) => {
        if (response.status === 200) {
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

  const GetCategory = async (valdivision, index) => {
    const axios = useAxios();

    if((valdivision !== undefined) && (valdivision !== null)){
      await axios
        .get(`/sale-off/division/${valdivision}/category/list`)
        .then((response) => {
          if (response.status === 200) {
            let list = listProducts.slice();
            list[index].categories = response.data.items,
            setListProducts(list);
            //updateCategories(response.data.items);
          }
        })
        .finally(() => {
          // updateLoadingCampaigns(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const GetMaterial = async (valcategory, index) => {
    const axios = useAxios();
    if((valcategory !== undefined) && (valcategory !== null)){
      await axios
        .get(`/sale-off/category/${valcategory}/material-group/list`)
        .then((response) => {
          if (response.status === 200) {
            //updateMaterialGroups(response.data.items);
            let list = listProducts.slice();
            list[index].materials = response.data.items,
            setListProducts(list);
          }
        })
        .finally(() => {
          // updateLoadingCampaigns(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const GetProduct = async (valmaterial, index) => {
    const axios = useAxios();

    await axios
      .get(`/sale-off/material-group/${valmaterial}/product/list`)
      .then((response) => {
        if (response.status === 200) {
          // console.log(response)
          let list = listProducts.slice();
          list[index].products = response.data.items,
          setListProducts(list);
          //updateProducts(response.data.result.items);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetClient = async () => {
    const axios = useAxios();

    await axios
      .get(`/sale-off/client/list`)
      .then((response) => {
        if (response.status === 200) {
          updateClients(response.data.items);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetBranch = async () => {
    const axios = useAxios();

    await axios
      .get(`/sale-off/branch/list/`)
      .then((response) => {
        if (response.status === 200) {
          updateBranches(response.data.items);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetBranchId = async (id, index) => {
    const axios = useAxios();

    await axios
      .get(`/sale-off/branch/list/${id}`)
      .then((response) => {
        if (response.status === 200) {
          let list = listClients.slice();
          list[index].branches = response.data.items,
          setListClients(list);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const removeSelected = (item) => {
    let newArray = [...selectedScreens];

    newArray.splice(
      selectedScreens.findIndex((i) => i.id === item.id),
      1
    );
    updateSelectedScreens(newArray);
  };

  const formikFunction = (propertyName, propertyValue) => {

    let formikObject = {
      target: {
        name: propertyName,
        value: propertyValue
      }
    };
    Formik.handleChange(formikObject)
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
    },
    methods: {
      updateDefaultDate,
      updateScreens,
      updateSelectedScreens,
      removeSelected,
      updateDivision,
      updateCategory,
      updateMaterialGroup,
      GetDivision,
      GetProduct,
      updateFormat,
      addClientList,
      deleteClientList,
      deleteClientListTotal,
      hideClientList,
      addProductList,
      deleteProductList,
      hideProductList,
      handleChangeImage,
      handleProductListChange,
      handleClientListChange,
      reset,
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
