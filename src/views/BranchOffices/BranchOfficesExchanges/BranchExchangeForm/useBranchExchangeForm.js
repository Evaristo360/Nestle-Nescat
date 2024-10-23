import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { getBranchRedeem, getBranchProductsRedeem, addBranchRedeem, editBranchRedeem } from 'providers/api';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as msgs } from './BranchExchangeFormMessages';
import { createOption } from 'components/SelectV2';

const schemaBranchExchange = yup.object().shape({
  product_name:yup
      .string()
      .required(intlExt.formatMessage(msgs.required)),
  limited: yup
      .boolean(),
  number_exchanges: yup
      .string()
      .nullable()
      .when("limited", {
        is: true,
        then: yup.string()
        .matches(/\d/, { message: intlExt.formatMessage(msgs.invalidQuantity), excludeEmptyString: true })
        .required(intlExt.formatMessage(msgs.required))
      })
  });
  
  const initialBranchExchangeValues =  {
    product_name: '',
    limited: false,
    number_exchanges: ''
  }

  export const useBranchOfficeForm = ({ branchOfficeId, branchExchangeId ,onAccept }) => {
    
    const [productsRedeem, setProductsRedeem] = useState([]);
    const [productsRedeemOptions, setProductsRedeemOptions] = useState([]);
    const [productsRedeemSearch, setProductsRedeemSearch] = useState('');

    const formik = useFormik({
        initialValues: initialBranchExchangeValues,
        validationSchema: schemaBranchExchange,
        onSubmit: async (values) => {
            let product_redeem_id_value;
            productsRedeem.map( product => {
              if(product.name === values.product_name){
                product_redeem_id_value = product.id
              }
            })

            var data = {
              product_redeem_id: product_redeem_id_value,
              limited: values.limited,
              quantity_redeems: values.limited ? parseInt(values.number_exchanges) : null,
            }
            if(branchExchangeId == 0){
                try {
                    await addBranchRedeem(branchOfficeId,data);
                    onAccept();
                } catch (error) {
                    console.log({ error });
                }

            }else{
              try {
                await editBranchRedeem(branchOfficeId,branchExchangeId,data);
                onAccept();
              } catch (error) {
                  console.log({ error });
              }
            }
        }
    });

    async function getBranchOfficeData() {
        let branchOfficeData = {};
        if (branchExchangeId != 0) {
          try {
            const getBranchOfficeResponse = await getBranchRedeem(branchOfficeId,branchExchangeId);
            let branchOffice = getBranchOfficeResponse.items[0];
            branchOfficeData.limited=branchOffice.limited
            branchOfficeData.number_exchanges=branchOffice.quantity_redeems
            branchOfficeData.product_name=branchOffice.product_redeem_name
          } catch (error) {
            console.log(error);
          }
        }else{
          branchOfficeData = initialBranchExchangeValues
        }
        return branchOfficeData;
    }

    useEffect(async () => {
      let data = await getBranchOfficeData();
      formik.setValues(data)
    }, [branchExchangeId]);

    const AvailableOptions = [createOption('Ilimitado', false), createOption('Limitado', true)];

    const getSelectedRadio= (option)=>{  
      formik.setFieldValue("limited",option.limited)
    }

    const getProductsRedeem = async() => {
      var productsRedeemResponse = await getBranchProductsRedeem();
      setProductsRedeem(productsRedeemResponse.items)
      var productsRedeemOption = getItemsProductsRedeem(productsRedeemResponse.items);
      setProductsRedeemOptions(productsRedeemOption)
    };

    const getItemsProductsRedeem = (items) => {
      var options = [];
      items.map(item => {
        options.push(item.name);
      });
      return options;
    } 

    useEffect(async () => {
      await getProductsRedeem()
    }, [productsRedeemSearch]);

    useEffect(async () => {
      if(!formik.values.limited){
        formik.setFieldValue("number_exchanges",'')
      }
    }, [formik.values.limited]);
    
    const handleProductRedeemChange = (productRedeem) => { formik.setFieldValue("product_name", productRedeem) };

    return {
      formik,
      productsRedeemOptions,
      AvailableOptions,
      getSelectedRadio,
      productsRedeemSearch,
      setProductsRedeemSearch,
      handleProductRedeemChange
    };
  }
