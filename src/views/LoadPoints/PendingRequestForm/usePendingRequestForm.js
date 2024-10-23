import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as msgs } from './PendingRequestFormMessages';
import {
  getFilterClients,
  getFilterBranchRegion,
  getBranchConnectionList,
  getPendingRequest,
  getBranchOfflineList,
  validatePendingRequest,
  discardPendingRequest,
  addProductListToTicket,
  revertToPendingRequest
} from 'providers/api';
import { createOption } from 'components/SelectV2';
import { config } from 'providers/config';
import { useGlobalApiError } from 'hooks/useGlobalApiError';
import useLocalStorage from 'hooks/useLocalStorage';
import { useHistory } from 'react-router-dom';

const schemaPendingRequest = yup.object().shape({
  is_connection: yup.boolean(),
  client_id_origin: yup.string().when('is_connection', {
    is: true,
    then: yup.string().required(intlExt.formatMessage(msgs.required))
  }),
  region_id_origin: yup.string().when('is_connection', {
    is: true,
    then: yup.string().required(intlExt.formatMessage(msgs.required))
  }),
  branch_id_origin: yup.string().when('is_connection', {
    is: true,
    then: yup.string().required(intlExt.formatMessage(msgs.required))
  }),
  branch_name_origin: yup.string().when('is_connection', {
    is: false,
    then: yup.string().max(60).required(intlExt.formatMessage(msgs.required))
  }),
  ticket_date: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required(intlExt.formatMessage(msgs.required)),
  ticket_folio: yup
    .string()
    .matches(/^[0-9]+$/, intlExt.formatMessage(msgs.onlyNumbers))
    .required(intlExt.formatMessage(msgs.required))
});
const initialPendingRequestData = {
  customer_phone: '',
  image_url: ''
};

const initialPendingRequestValues = {
  is_connection: false,
  client_id_origin: '',
  region_id_origin: '',
  //attribs route to validate
  branch_id_origin: '',
  branch_name_origin: '',
  ticket_date: new Date(),
  ticket_folio: ''
};

const initialProduct = {
  validate: false,
  division_id: '',
  category_id: '',
  material_group_id: '',

  product_id: '',
  unit_type: '',
  unit_price: '',
  quantity: '',
  price_total: ''
};

export const usePedingRequestForm = ({ pendingRequestId }) => {
  //states
  const [clientsOptions, setClientsOptions] = useState([]);
  const [regionsOptions, setRegionsOptions] = useState([]);
  const [branchesOptions, setBranchesOptions] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [branchSearch, setBranchSearch] = useState('');

  const [pendingRequestData, setPendingRequestData] = useState(
    initialPendingRequestData
  );
  const [isValidate, setIsValidate] = useState(false);
  const [isUsedTicket, setIsUsedTicket] = useState(false);

  const [disabledAccept, setDisabledAccept] = useState(true);
  const { getItem, setItem, removeItem } = useLocalStorage();

  const history = useHistory();
  const formik = useFormik({
    initialValues: initialPendingRequestValues,
    validationSchema: schemaPendingRequest,
    onSubmit: async (values) => {
      if (pendingRequestId != 0) {
        var data = {
          ticket_date: values.ticket_date,
          ticket_folio: values.ticket_folio
        };

        if (!values.is_connection) {
          data.branch_name_origin = values.branch_name_origin;
        } else {
          branchesList.map((branch) => {
            if (branch.name === values.branch_id_origin) {
              data.branch_id_origin = branch.id;
            }
          });
        }

        const apiError = useGlobalApiError();
        try {
          apiError.disable();
          var res = await validatePendingRequest(pendingRequestId, data);
          if (res.error) {
            if (
              res.error === 'ticket_folio' &&
              res.message === 'already exists'
            ) {
              setIsValidate(false);
              setIsUsedTicket(true);
              setItem('revertTicket', false);
            }
          } else {
            if (values.is_connection) addProduct();
            setIsValidate(true);
            setIsUsedTicket(false);
            setItem('revertTicket', true);
          }
        } catch (err) {
          console.log({ err });
          setIsValidate(false);
          setIsUsedTicket(false);
        } finally {
          apiError.enable();
        }
      }
    }
  });

  const [productsList, setProductsList] = useState([]);

  async function getPendinRequestData() {
    if (pendingRequestId != 0) {
      try {
        const pendingRequestResponse = await getPendingRequest(
          pendingRequestId
        );
        var _pedingRequestData = pendingRequestResponse.items[0];
        if (_pedingRequestData.ticket_folio !== undefined) {
          let date = _pedingRequestData.ticket_datetime.substr(0, 10);
          formikFunction('ticket_folio', _pedingRequestData.ticket_folio);
          formikFunction('ticket_date', date);
          setIsValidate(true);
          setIsUsedTicket(false);
          addProduct();
          if (_pedingRequestData.branch_id_origin !== undefined) {
            formikFunction('is_connection', true);
            _pedingRequestData.client_name_origin !== undefined ? formikFunction('client_id_origin', _pedingRequestData.client_id_origin) : formikFunction('client_id_origin', '')
            _pedingRequestData.branch_region_origin_name !== undefined ? formikFunction('region_id_origin', _pedingRequestData.branch_region_origin_id) : formikFunction('region_id_origin', '')
            formikFunction('branch_id_origin', String(_pedingRequestData.branch_name_origin));
          } else {
            formikFunction('branch_id_origin', String(_pedingRequestData.branch_name_origin));
          } 
        }
        setPendingRequestData(_pedingRequestData);
      } catch (error) {
        console.log({ error });
      }
    } else {
      setPendingRequestData({});
    }
  }

  useEffect(() => {
    window.onbeforeunload = (event) => {
      alertUser();
      event.preventDefault();
      return;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    window.addEventListener('unload', alertUser);
    return () => {
      window.removeEventListener('unload', alertUser);
      alertUser();
    };
  }, []);

  const alertUser = () => {
    let revertTicket = getItem('revertTicket');
    if (revertTicket && revertTicket !== 'false') {
      const token = getItem('token');

      var xhr = new XMLHttpRequest();
      xhr.open(
        'PATCH',
        'https://pruebas4.springlabsdevs.net/nestca-api/load_points/pending_request/cancel/' +
          pendingRequestId,
        true
      ); // `false` makes the request synchronous
      xhr.setRequestHeader('token', token);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log(xhr.responseText);
            setItem('revertTicket', false);
          } else {
            console.error(xhr.statusText);
          }
        }
      };
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send(null);
      // revertTicketToPendingRequest()
    }
  };

  useEffect(async () => {
    formik.setValues(initialPendingRequestValues);
    await getPendinRequestData();
  }, [pendingRequestId]);

  useEffect(async () => {
    let clientsResponse = await getFilterClients();
    let clientsCreate = createClientsOptions(clientsResponse.items);
    setClientsOptions(clientsCreate);

    let regionsResponse = await getFilterBranchRegion();
    let regionsCreate = createOptions(regionsResponse.items);
    setRegionsOptions(regionsCreate);
  }, []);

  const createOptions = (options) => {
    let arrayCreateOptions = [];
    options.map((opc) => {
      arrayCreateOptions.push(createOption(opc.name, opc.id));
    });
    return arrayCreateOptions;
  };

  const createClientsOptions = (options) => {
    let arrayCreateOptions = [];
    options.map((opc) => {
      arrayCreateOptions.push(createOption(opc.bussiness_name, opc.id));
    });
    return arrayCreateOptions;
  };

  const handleDateChange = (date) => {
    formik.setFieldValue('ticket_date', date);
  };

  useEffect(async () => {
    if (formik.values.is_connection) {
      await getBranchesOffline();
    } else {
      await getBranches();
    }
  }, [branchSearch]);

  useEffect(async () => {
    formik.setFieldValue('client_id_origin', '');
    formik.setFieldValue('region_id_origin', '');
    formik.setFieldValue('branch_id_origin', '');
    formik.setFieldValue('branch_name_origin', '');

    setBranchesOptions([]);
    setBranchSearch('');
    setBranchesList([]);
  }, [formik.values.is_connection]);

  useEffect(async () => {
    formik.setFieldValue('branch_id_origin', '');
    setBranchSearch('');

    await getBranches();
  }, [formik.values.client_id_origin, formik.values.region_id_origin]);

  const getBranchesOffline = async () => {
    var branchesResponse = await getBranchOfflineList(branchSearch);
    var branchesOption = getItemsBranch(branchesResponse.items);
    setBranchesOptions(branchesOption);
  };

  const getBranches = async () => {
    let client_id = formik.values.client_id_origin;
    let region_id = formik.values.region_id_origin;
    if (client_id && region_id) {
      var branchesResponse = await getBranchConnectionList(
        client_id,
        region_id,
        branchSearch
      );
      var branchesOption = getItemsBranch(branchesResponse.items);
      setBranchesList(branchesResponse.items);
      setBranchesOptions(branchesOption);
    }
  };

  const getItemsBranch = (items) => {
    var options = [];
    items.map((item) => {
      options.push(item.name);
    });
    return options;
  };

  const handleBranchChange = (branch) => {
    formik.setFieldValue('branch_name_origin', branch);
  };

  const handleBranchIdChange = (branchSelected) => {
    formik.setFieldValue('branch_id_origin', branchSelected);
  };

  const handleCleanForm = () => {
    if (!isUsedTicket) {
      formik.setValues(initialPendingRequestValues);
      setIsValidate(false);
      setIsUsedTicket(false);
    }
  };

  const discardTicket = async () => {
    try {
      removeItem('revertTicket');
      const discardResponse = await discardPendingRequest(pendingRequestId);
      redirectPendinRequestList();
    } catch (error) {
      console.log({ error });
    }
  };

  const revertTicketToPendingRequest = async () => {
    try {
      await revertToPendingRequest(pendingRequestId);
    } catch (error) {
      console.log({ error });
    }
  };

  const addProduct = () => {
    var auxList = productsList.slice();
    auxList.push({
      validate: false,
      division_id: '',
      category_id: '',
      material_group_id: '',

      product_id: '',
      unit_type: '',
      unit_price: '',
      quantity: '',
      price_total: ''
    });
    setProductsList(auxList);
  };

  const quitProduct = (index) => {
    var auxList = productsList.slice();
    console.log(auxList);
    auxList.splice(index, 1);
    setProductsList(auxList);
  };

  const changeValueJSONProduct = (data, index) => {
    var auxList = productsList.slice();
    var productJSON = auxList[index];
    productJSON[`${data.name}`] = data.value;
    auxList[index] = productJSON;
    setProductsList(auxList);
  };

  useEffect(async () => {
    var desactived = false;
    if (productsList.length === 0 && formik.values.is_connection) {
      setDisabledAccept(true);
      return;
    }
    productsList.map((product) => {
      if (product.validate === false) {
        desactived = true;
        return;
      }
    });
    setDisabledAccept(desactived);
  }, [productsList]);

  const saveProducts = async () => {
    var validate = true;
    var data = [];
    productsList.map((product) => {
      if (product.product_id === '') {
        validate = false;
        return;
      } else if (product.unit_type === '') {
        validate = false;
        return;
      } else if (product.unit_price === '') {
        validate = false;
        return;
      } else if (product.quantity === '') {
        validate = false;
        return;
      } else if (product.price_total === '') {
        validate = false;
        return;
      } else {
        data.push({
          product_id: parseInt(product.product_id),
          unit_type: product.unit_type,
          unit_price: parseFloat(product.unit_price),
          quantity: parseFloat(product.quantity),
          price_total: parseFloat(product.price_total)
        });
      }
    });

    if (validate) {
      try {
        let response = await addProductListToTicket({
          load_ticket_id: parseInt(pendingRequestId),
          products: data
        });

        if (response.items) {
          setItem('revertTicket', false);
          redirectPendinRequestList();
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const formikFunction = (propertyName, propertyValue) => {

    let formikObject = {
      target: {
        name: propertyName,
        value: propertyValue
      }
    };
    formik.handleChange(formikObject)
  };

  const redirectPendinRequestList = () =>
    history.push('/load-points/pending-request/list');

  return {
    clientsOptions,
    regionsOptions,
    branchesOptions,
    formik,
    handleDateChange,
    branchSearch,
    setBranchSearch,
    handleBranchChange,
    handleBranchIdChange,
    discardTicket,
    isValidate,
    isUsedTicket,
    pendingRequestData,
    handleCleanForm,
    productsList,
    addProduct,
    quitProduct,
    changeValueJSONProduct,
    disabledAccept,
    saveProducts,
    revertTicketToPendingRequest,
    redirectPendinRequestList
  };
};
