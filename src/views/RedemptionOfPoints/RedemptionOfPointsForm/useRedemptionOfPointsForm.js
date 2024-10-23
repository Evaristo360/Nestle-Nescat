import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import useAxios  from 'hooks/useAxios'
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as msgs } from './RedemptionOfPointsFormMessages';
import { getRedemPoints, getProductDivision, getProductCategory, getProductMaterialGroup, getProductListByMaterialGroup, addRedemPoints, editRedemPoints } from 'providers/api';
import { createOption } from 'components/SelectV2';
import { useGlobalApiError } from 'hooks/useGlobalApiError';
import { config } from 'providers/config';
import ProductIcon from 'assets/ProductIcon.png';

  const schemaRedemptionOfPoints = yup.object().shape({
    is_nestle:yup.bool(),
    division:yup
        .string()
        .when("is_nestle", {
          is: true,
          then: yup
          .string()
          .required(intlExt.formatMessage(msgs.required))
        }),
    category:yup
        .string()
        .when("is_nestle", {
          is: true,
          then: yup
          .string()
          .required(intlExt.formatMessage(msgs.required))
        }),
    materialGroup:yup
        .string()
        .when("is_nestle", {
          is: true,
          then: yup
          .string()
          .required(intlExt.formatMessage(msgs.required))
        }),
    description:yup
        .string()
        .when("is_nestle", {
          is: true,
          then: yup
          .string()
          .required(intlExt.formatMessage(msgs.required))
        }),
    name_product: yup
        .string()
        .max(60)
        .required(intlExt.formatMessage(msgs.required)),
    equivalence_points: yup
        .string()
        .matches(/^[0-9]+$/, intlExt.formatMessage(msgs.onlyNumbers))
        .required(intlExt.formatMessage(msgs.required)),
    special_barcode: yup
        .string()        
        .matches(/^[0-9]+$/, intlExt.formatMessage(msgs.onlyNumbers))
        .nullable(),
    validity: yup
        .date()
        .nullable(),
    product_image_size: yup
        .number()
        .max(5000000, intlExt.formatMessage(msgs.maxSizeImage)),
    product_image_type: yup
        .string()
        .oneOf(
          ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
          intlExt.formatMessage(msgs.invalidTypeImage)
        ),
    product_global_id: yup
        .number(),
  });
  
  const initialRedemptionOfPointsValues =  {
    is_nestle:false,
    division:'',
    category:'',
    materialGroup:'',
    description:'',
    name_product:'',
    equivalence_points:'',
    special_barcode:'',
    validity: null,
    product_image: null,
    product_image_size: 0,
    product_image_type: '',
    category_redeem: ''
  }


  export const useRedemptionOfPointsForm = ({redemptionId, onAccept, editableForm}) => {
    //states
    const [divisionOptions, setDivisionOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [materialGroupOptions, setMaterialGroupOptions] = useState([]);
    const [productListOptions, setProductListOptions] = useState([]); 
    const [productList, setProductList] = useState([]);
    const [isURLImage, setIsURLImage] = useState(false);
    const [isFromData, setIsFromData] = useState(false);

    //error states
    const [showMessageError, setShowMessageError] = useState(false);
    const [messageErrorTittle, setMessageErrorTittle] = useState('');
    const [messageErrorBody, setMessageErrorBody] = useState('');

    const { get, patch, post } = useAxios();
    const formik = useFormik({
        initialValues: initialRedemptionOfPointsValues,
        validationSchema: schemaRedemptionOfPoints,
         onSubmit: async (values) => {      
           if(editableForm)
           {
             onAccept();
             return true;
           }
          var data = new FormData();
          data.append('name', values.name_product);
          data.append('points', values.equivalence_points);
          data.append('barcode_special', values.special_barcode);
          data.append('validity_date', values.validity !== null ? new Date (values.validity).toISOString() : values.validity);
          data.append('is_nestle_product', values.is_nestle);
          if (values.category_redeem !== '') data.append('category_redeem', values.category_redeem);
          if(values.is_nestle){
            const resultado = productList.find( product => product.description === values.description);
            data.append('product_global_id', resultado.id);
          }
          
          if(redemptionId == 0){
            const apiError = useGlobalApiError();
            if(values.product_image){
              data.append('image', values.product_image);
            }
            
            try {
                apiError.disable();
                let response = await addRedemPoints(data)
                if(response.error){
                  if(response.error === "barcode_special" && response.message.includes('already exist')){
                    setShowMessageError(true);
                    setMessageErrorTittle('Error al crear nuevo producto')
                    setMessageErrorBody('El código ' + values.special_barcode + " ya se encuentra registrado");
                  }
                  if(response.error === "Bad Request" && response.message.includes('Image should not be empty')){
                    setShowMessageError(true);
                    setMessageErrorTittle('Error al crear nuevo producto')
                    setMessageErrorBody('Seleccione una imagen');
                  }
                }else{
                  onAccept();
                }
            } catch (error) {                 
              console.log({ error });
            } finally {
              apiError.enable();
            }
          }else{    
              if(!isURLImage){
                data.append('image', values.product_image);
              }        
              try {
                  await editRedemPoints(redemptionId, data);
                  onAccept();
              } catch (error) {
                  console.log({ error });
              }
          }
        }
    });

    async function getRedemptionOfPointsData() {
        let redemptionData = {};
        if (redemptionId != 0) {
          try {
            const getRedemptionResponse = await getRedemPoints(redemptionId);
            var redemPoint = getRedemptionResponse.items[0];
            redemptionData.special_barcode=redemPoint.barcode_special;
            redemptionData.name_product=redemPoint.name;
            redemptionData.equivalence_points=redemPoint.points;
            redemptionData.is_nestle=redemPoint.is_nestle_product;
            redemptionData.division=redemPoint.division_id;
            redemptionData.category=redemPoint.category_id;
            redemptionData.materialGroup=redemPoint.material_group_id;
            redemptionData.description=redemPoint.description;
            redemptionData.validity=  redemPoint.validity_date;
            if(redemPoint.image_url){
              redemptionData.product_image = config.siteConfig.apiUrl + '/' + redemPoint.image_url;
              setIsURLImage(true);
            }else{
              redemptionData.product_image = ProductIcon;
            }
            setIsFromData(true)
          } catch (error) {
            console.log({error});
          }
        }else{
          redemptionData = initialRedemptionOfPointsValues;
        }
        return redemptionData;
    }

    const getFile = async (urlImage,name) =>{
      let image = null;
      try {
        let resImage = await get(urlImage, { responseType: 'blob' });
        if (resImage.data) {
          image = (
            new File([resImage.data], name, {
              type: resImage.data.type
            })
          );
        } else {
          image = resImage;
        }
      } catch (error) {
        console.log({error})
      }
      return image
    };

    const loadImageProduct = (event) => {
      const file = event.target.files[0];
      formik.setFieldValue("product_image",file)
      formik.setFieldValue("product_image_size",file.size)
      formik.setFieldValue("product_image_type",file.type)
      setIsURLImage(false);
    };

    const handleDateChange = (date) => {
      formik.setFieldValue("validity",date)
    };

    const createOptions = (options) => {
      let arrayCreateOptions = [];
      options.map( opc => {
        arrayCreateOptions.push(createOption(opc.name, opc.id))
      });
      return arrayCreateOptions;
    }

    const createProductOptions = (options) => {
      let arrayCreateOptions = [];
      options.map( opc => {
        arrayCreateOptions.push(createOption(opc.description, opc.description))
      });
      return arrayCreateOptions;
    }

    useEffect(async () => {
      let data = await getRedemptionOfPointsData();
      formik.setValues(data)
      setIsFromData(false)
    }, [redemptionId]);

    useEffect(async () => {
      let divisionResponse = await  getProductDivision();
      let divisionCreate = createOptions(divisionResponse.items);
      setDivisionOptions(divisionCreate)
    }, []);

    useEffect(async () => {
      if(formik.values.division){
        let categoryResponse = await  getProductCategory(formik.values.division);
        let categoryCreate = createOptions(categoryResponse.items);
        setCategoryOptions(categoryCreate)   
        if(!isFromData){     
          formik.setFieldValue("category", '')
          formik.setFieldValue("materialGroup", '')
          formik.setFieldValue("description", '')
          formik.setFieldValue("name_product", '')
        }
      }
    }, [formik.values.division]);

    useEffect(async () => {
      if(formik.values.category){
        let materialGroupResponse = await  getProductMaterialGroup(formik.values.category);
        let materialGroupCreate = createOptions(materialGroupResponse.items);
        setMaterialGroupOptions(materialGroupCreate)
        if(!isFromData){  
          formik.setFieldValue("materialGroup", '')
          formik.setFieldValue("description", '')
          formik.setFieldValue("name_product", '')
        }
      }
    }, [formik.values.category]);

    useEffect(async () => {
      if(formik.values.materialGroup){
        let productListResponse = await  getProductListByMaterialGroup(formik.values.materialGroup);
        let productListCreate = createProductOptions(productListResponse.items);
        setProductList(productListResponse.items)
        setProductListOptions(productListCreate)
        if(!isFromData){  
          formik.setFieldValue("description", '')
          formik.setFieldValue("name_product", '')
        }
      }
    }, [formik.values.materialGroup]);

    useEffect(async () => {
      if(formik.values.description){
        if(productList.length > 0){
          const resultado = productList.find( product => product.description === formik.values.description);
          if(!isFromData){
            var productImage = await getFile('/' + resultado.image_url,resultado.name);
            setIsURLImage(false);
            formik.setFieldValue("product_image",productImage)
            formik.setFieldValue("product_image_size",productImage.size)
            formik.setFieldValue("product_image_type",productImage.type)
          }
          formik.setFieldValue("name_product", resultado.name)
        }
      }
    }, [formik.values.description]);

    return {
      loadImageProduct,
      handleDateChange,
      divisionOptions,
      categoryOptions,
      materialGroupOptions,
      productListOptions,
      formik,
      showMessageError,
      setShowMessageError,
      messageErrorTittle,
      messageErrorBody,
    };
  }