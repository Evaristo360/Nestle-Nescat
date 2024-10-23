import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { getBranchOfficeProduct} from 'providers/api';
import { messages } from './BranchProductFormMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';

  const initialBranchProductFormValues =  {
    id:0,
    name:'',
    description:'',
    division_name:'',
    category_name:'',
    material_group_name:'',
    format_equivalence:'',
    code_sap:'',
    sku:'',
    product_name:'',
    product_code:'',
    product_stock:'',
    product_barcode:'',
    pieces_per_box:'',
    prices:[],
    promo:[]
  }

  export const useBranchProduct = ({branchOfficeId, branchProductId ,onAccept}) => {
    const msgs = useIntlMessages(messages);
    const formik = useFormik({
        initialValues: initialBranchProductFormValues
    });

    async function getBranchProductData() {
        let branchOfficeData = initialBranchProductFormValues;
        if (branchProductId != 0) {
          try {
            const getBranchOfficeResponse = await getBranchOfficeProduct(branchOfficeId,branchProductId);
            branchOfficeData = getBranchOfficeResponse.items;
          } catch (error) {
            console.log(error);
          }
        }
        return branchOfficeData;
    }

    useEffect(async () => {
      let data = await getBranchProductData();
      formik.setValues(data)
    }, [branchProductId]);


    const labelsPrices = [
      {
        priceLabel:msgs.dataPriceSuper,
        scaleLabel:msgs.dataScaleSuper
      },
      {
        priceLabel:msgs.dataMediumWholesale,
        scaleLabel:msgs.dataScaleMediumWholesale
      },
      {
        priceLabel:msgs.dataPriceWholesale,
        scaleLabel:msgs.dataScaleWholesale
      },
      {
        priceLabel:msgs.dataPrice4,
        scaleLabel:msgs.dataScalePrice4
      }
    ]

    return {
      formik,
      labelsPrices
    };
  }