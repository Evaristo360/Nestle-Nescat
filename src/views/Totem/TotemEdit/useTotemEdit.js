import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { getTotem, editTotem ,getTotemClientList, getTotemProductList, getTotemBranchList} from 'providers/api';
import { messages as formMessages } from './TotemEditMessages';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { createOption } from 'components/SelectV2';

const requiredMsg = intlExt.formatMessage(formMessages.required);

const schemaDisplay = yup.object().shape({
  name: yup
    .string()
    .max(60)
    .required(requiredMsg),
  client_id: yup.number()
    .required(requiredMsg),
  branch_id: yup.number()
    .required(requiredMsg),
  client_connection: yup.bool(),
  purchaseRequest: yup.bool(),
  products:yup.array()
});

const initialDisplayValues = {
  name: '',
  client_id: 1,
  branch_id: 0,
  client_connection: false,
  purchaseRequest:false,
  products: []
};

export const useTotemEdit = ({ totemId, onAccept, toggleUpdate }) => {
  
  const initialPages = (displayProducts = []) => {
    var nuevoArray = [];
    var arrayTemporal = [];
  
    for(var i=0; i<displayProducts.length; i++){
      arrayTemporal = nuevoArray.filter(resp => resp["page"] == displayProducts[i]["page"])
      if(arrayTemporal.length>0){
          nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["products"].push(
            { 
              "product_id":displayProducts[i]["product_id"],
              "product_name":displayProducts[i]["product_name"],
              "product_image":displayProducts[i]["product_image"],
              "page":displayProducts[i]["page"],
              "row":displayProducts[i]["row"],
              "col":displayProducts[i]["col"],
              "availability":displayProducts[i]["availability"]
            }
          )
      }else{
          nuevoArray.push(
            {
              "page" : displayProducts[i]["page"] , 
              "products" : [{
                "product_id":displayProducts[i]["product_id"],
                "product_name":displayProducts[i]["product_name"],
                "product_image":displayProducts[i]["product_image"],
                "page":displayProducts[i]["page"],
                "row":displayProducts[i]["row"],
                "col":displayProducts[i]["col"],
                "availability":displayProducts[i]["availability"]
              }]
            })
      }
  }
    return nuevoArray;
  };

  const createProductsStructureToPatch = (displayProducts = []) => {
    var productStructure = []
    displayProducts.map(product => {
      productStructure.push({
        product_id:product.product_id,
        page:product.page,
        row:product.row,
        col:product.col
      })
    })
    return productStructure;
  };
  const [totemData, setTotemData] = useState({});
  const [clients, setClients] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [digitalProducts, setDigitalProducts] = useState([]);
  const [listPages, setlistPages] = useState([]);
  const [products, setProducts] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [clientSelect, setClientSelect] = useState({});
  const [isFromData, setIsFromData] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [totemType, setTotemType] = useState(0);


  const formik = useFormik({
    initialValues: initialDisplayValues,
    validationSchema: schemaDisplay,
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        client_id: values.client_id,
        branch_id: values.branch_id,
        products: []
      };
      
      if(formik.values.purchaseRequest){
        data.products = createProductsStructureToPatch(digitalProducts);
      }

      try {
        await editTotem(totemId, data);
        toggleUpdate();
        onAccept();
      } catch (error) {
        if (error.message !== "search is not defined"){
          console.log({ error });
        }
      }
    }
  });

  useEffect(async () => {
    let clients = await  getTotemClientList();
    var clientOption = getItemmClients(clients.items);
    setClientList(clients.items)
    setClients(clientOption)
 }, []);

  useEffect(async () => {
    if(formik.values.client_id > 0){      
      let branches = await  getTotemBranchList(formik.values.client_id);
      let branchesCreate = getItems(branches.items);
      setBranchs(branchesCreate)
      
      const resultado = clientList.find( client => client.id === formik.values.client_id);
      if(resultado){
        if(!resultado.connection && !isFromData){
          formik.setFieldValue("client_connection",false)
          formik.setFieldValue("purchaseRequest",false)
          formik.setFieldValue("branch_id","")
          setDigitalProducts([])
        }
      }
      setClientSelect(resultado)
    }
  }, [formik.values.client_id]);

  useEffect(async () => {
    if(formik.values.branch_id > 0){
      let productsResponse = await  getTotemProductList(formik.values.branch_id,searchProduct);
      setProducts(productsResponse.items)
      if(!isFromData){
        setDigitalProducts([])
      }
    }
  }, [formik.values.branch_id]);

  useEffect(async () => {
    if(formik.values.branch_id > 0){
      let productsResponse = await  getTotemProductList(formik.values.branch_id,searchProduct);
      setProducts(productsResponse.items)
    }
  }, [searchProduct]);

  useEffect(async () => {
    let data = await getTotemData();
    formik.setValues({
      name: data.name,
      client_id: data.client_id ? data.client_id : "",
      branch_id: data.branch_id ? data.branch_id : "",
      client_connection: data.client_connection,
      purchaseRequest: data.products.length > 0 ? true : false,
    });
    setDigitalProducts(data.products)
    setIsFromData(false)
  }, [totemId]);

  useEffect(() => {
    var pages = listPages.slice()
    pages = initialPages(digitalProducts)
    setlistPages(pages)
  }, [digitalProducts]);

  const addPage = () => {
    var pages = listPages.slice();
    pages.push({
      page: pages.length + 1,
      products: []
    });
    setlistPages(pages);
  };

  const deletePage = () => {
    var lastPage = listPages.length
    var products = []
    digitalProducts.map(product=>{
      if(product.page!=lastPage){
        products.push(product)
      }
    })
    setDigitalProducts(products);
  };

  const getItemmClients = (items) => {
    var options = [];
    items.map(item => {
      options.push(createOption(`${item.bussiness_name}`, item.id))
    });
    return options;
  } 

  const getItems = (items) => {
    var options = [];
    items.map(item => {
      options.push(createOption(`${item.name}`, item.id))
    });
    return options;
  } 

  async function getTotemData() {
    let displayData = initialDisplayValues;

    if (totemId != 0) {
      try {
        const getDisplayResponse = await getTotem(totemId);
        setTotemType(getDisplayResponse.items[0].floor_totem);
        displayData = getDisplayResponse.items[0];
        setIsFromData(true)
      } catch (error) {
        console.log(error);
      }
    }
    return displayData;
  }


const onChangeDigitalProducts = (productSelected, row, col, pageSelected) => {
  setSearchProduct("")
  // setear DigitalProducts en la fila y la columna correspondiente
  var auxDigitalProducts = digitalProducts.slice()
  var find = false;
  auxDigitalProducts.map(product=>{
      if(product.page == pageSelected && product.row == (row + 1) && product.col == (col+1)) {
        product.product_id=productSelected.id
        product.product_name=productSelected.name
        product.product_image=""
        product.col=col+1
        product.row=row+1

        find=true
      }
  })

  // si no se encuentra agregarlo al array
  if(find == false){
    auxDigitalProducts.push({
        product_id:productSelected.id,
        page:pageSelected,
        row:row+1,
        col:col+1,
        product_name:productSelected.name,
        product_image:""
    })
  }

  setDigitalProducts(auxDigitalProducts)
};

  const LoadAllProducts = async () => {
    let productsResponse = await  getTotemProductList(formik.values.branch_id, '');
    
    let aux = [];
    //Config Limit Page
    const maxRow = (totemType === 1) ? 4 : 3;
    const maxColumn = 3;
    let page = 1;
    let row = 1;
    let column = 1;

    productsResponse.items.map(product => {
      aux.push(
        { 
          "product_id": product.id,
          "product_name": product.name,
          "page": page,
          "row": row,
          "col": column,
          "availability": product.availability
        }
      );
      column ++;
      
      if( column > maxColumn ){
        column=1;
        row++
      };
      
      if( row > maxRow ){
        row=1;
        page++;
      };

    });
    setDigitalProducts(aux);
  };

  return {
    onChangeDigitalProducts,
    formik,
    addPage,
    deletePage,
    totemData,
    setTotemData,
    clients,
    setClients,
    branchs,
    setBranchs,
    listPages,
    setlistPages,
    products,
    setProducts,
    clientSelect,
    searchProduct, 
    setSearchProduct,
    totemType,
    LoadAllProducts
  };
};
