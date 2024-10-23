import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as msgs } from './ProductFormMessages';
import { getFilterProductDivision, getFilterProductCategory, getFilterProductMaterialGroup, getPendingRequestProductList} from 'providers/api';
import { createOption } from 'components/SelectV2';

const schemaProduct = yup.object().shape({
    validate:yup
        .boolean(),
    division_id: yup
        .string()
        .required(intlExt.formatMessage(msgs.required)),   
    category_id: yup
        .string()
        .required(intlExt.formatMessage(msgs.required)),
    material_group_id: yup
        .string()
        .required(intlExt.formatMessage(msgs.required)),
    product_id: yup
        .string()
        .required(intlExt.formatMessage(msgs.required)),   
    unit_type: yup
        .string()
        .required(intlExt.formatMessage(msgs.required)),
    unit_price: yup
        .number()
        .required(intlExt.formatMessage(msgs.required)),
    quantity: yup
        .number()
        .required(intlExt.formatMessage(msgs.required)),
    price_total: yup
        .number()        
        .min(yup.ref("unit_price"),"No puede ser menor a precio por unidad")
        .required(intlExt.formatMessage(msgs.required)),
  });
  
  const initialProductValues =  {
    validate:false,
    division_id:"",
    category_id:"",
    material_group_id:"",

    product_id:"",
    unit_type:"",
    unit_price:"",
    quantity:"",
    price_total:""
  }


  export const useProductForm = ({dataProduct, handleAddProduct, handleChangeValueJSONProduct, numberProduct}) => {
    //states
    const [divisionOptions, setDivisionOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [materialGroupOptions, setMaterialGroupOptions] = useState([]);
    const [productListOptions, setProductListOptions] = useState([]);


    const formik = useFormik({
        initialValues: initialProductValues,
        validationSchema: schemaProduct,
        onSubmit: async (values) => {
          handleAddProduct();
        }
    });

    useEffect(() => {
      formik.setValues(dataProduct)
    }, [dataProduct]);

    useEffect(() => {
      var data = {
        name: "validate",
        value: formik.isValid
      }
      handleChangeValueJSONProduct(data, numberProduct)
    }, [formik.isValid]);

    useEffect(async () => {
      let divisionResponse = await  getFilterProductDivision();
      let divisionCreate = createOptions(divisionResponse.items);
      setDivisionOptions(divisionCreate);
    }, []);

    useEffect(async () => {
      if(formik.values.division_id > 0){
        let categoryResponse = await  getFilterProductCategory(formik.values.division_id);
        let categoryCreate = createOptions(categoryResponse.items);
        setCategoryOptions(categoryCreate);

        formik.setFieldValue("category_id", '');
        formik.setFieldValue("material_group_id", '');
        formik.setFieldValue("product_id", '');
      }
    }, [formik.values.division_id]);

    useEffect(async () => {
      if(formik.values.category_id > 0){
        let materialGroupResponse = await  getFilterProductMaterialGroup(formik.values.category_id);
        let materialGroupCreate = createOptions(materialGroupResponse.items);
        setMaterialGroupOptions(materialGroupCreate);

        formik.setFieldValue("material_group_id", '');
        formik.setFieldValue("product_id", '');
      }
    }, [formik.values.category_id]);

    useEffect(async () => {
      if(formik.values.material_group_id > 0){
        let ProductListResponse = await  getPendingRequestProductList(formik.values.material_group_id);
        let ProductListCreate = createOptions(ProductListResponse.items);
        setProductListOptions(ProductListCreate);
        
        formik.setFieldValue("product_id", '');
      }
    }, [formik.values.material_group_id]);

    const createOptions = (options) => {
        let arrayCreateOptions = [];
        options.map( opc => {
            arrayCreateOptions.push(createOption(opc.name, opc.id))
        });
        return arrayCreateOptions;
    }

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

    const unitTypeOptions = createOptions(unitTypeList);

    return {
      divisionOptions,
      categoryOptions,
      materialGroupOptions,
      productListOptions,
      unitTypeOptions,
      formik,
    };
  }