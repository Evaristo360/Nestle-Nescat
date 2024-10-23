import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { getBranchClient, 
  getBranchOffice, 
  editBranchOffice, 
  addBranchOffice, 
  getBranchFormats, 
  getBranchSubformats, 
  getBranchRegion, 
  getClientUrls } from 'providers/api';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as msgs } from './BranchOfficeFormMessages';
import { createOption } from 'components/SelectV2';

const schemaBranchOffice = yup.object().shape({
  name: yup
      .string() 
      .max(30)
      .required(intlExt.formatMessage(msgs.required)),
  nestle_id:yup
      .string() 
      .max(10)
      .required(intlExt.formatMessage(msgs.required)),
  region_id:yup
      .string()
      .required(intlExt.formatMessage(msgs.required)),
  format_id:yup
      .string()
      .required(intlExt.formatMessage(msgs.required)),
  subformat_name:yup
      .string()
      .required(intlExt.formatMessage(msgs.required)),
  address: yup
      .string() 
      .max(30),
  client_id: yup
      .string()
      .required(intlExt.formatMessage(msgs.required)),
  url_id: yup
      .number()
      .nullable()
  });
  
  const initialBranchOfficeValues =  {
    name: '',
    nestle_id: '',
    region_id: '',
    format_id: '',
    subformat_name: '',
    address: '',
    client_id: '',
    url_id: ''
  }

  export const useBranchOfficeForm = ({branchOfficeId, onAccept}) => {
    const [regionOptions, setRegionOptions] = useState([]);
    const [formatOptions, setFormatOptions] = useState([]);
    const [subformats, setSubformats] = useState([]);
    const [subformatOptions, setSubformatOptions] = useState([]);
    const [clientOptions, setClientOptions] = useState([]);
    const [relationOptions, setRelationOptions] = useState([]);
    const [subformatSearch, setSubformatSearch] = useState('');

    const formik = useFormik({
        initialValues: initialBranchOfficeValues,
        validationSchema: schemaBranchOffice,
        onSubmit: async (values) => {           
            if(branchOfficeId == 0){
              var data = {
                name: values.name,
                nestle_id: values.nestle_id,
                region_id: values.region_id,
                format_id: values.format_id,
                subformat_name: values.subformat_name,
                address: values.address,
                client_id: values.client_id,
              }
              if(!values.url_id === ""){
                data.url_id = values.url_id;
              }
              try {
                  await addBranchOffice(data);
                  onAccept();
              } catch (error) {
                  console.log({ error });
              }
            }else{
              // let subformat_id_Value;
              // subformats.map( subformat => {
              //   if(subformat.name === values.subformat_name){
              //     subformat_id_Value = subformat.id
              //   }
              // })
              var data = {
                subformat_name: values.subformat_name,
                region_id: values.region_id,
                format_id: values.format_id,
                address: values.address,
                client_id: values.client_id
              }
              if(!values.url_id === ""){
                data.url_id = values.url_id;
              }
              try {
                  await editBranchOffice(branchOfficeId,data);
                  onAccept();
              } catch (error) {
                  console.log({ error });
              }
            }
        }
    });

    async function getBranchOfficeData() {
        let branchOfficeData = initialBranchOfficeValues;
        if (branchOfficeId != 0) {
          try {
            const getBranchOfficeResponse = await getBranchOffice(branchOfficeId);
            branchOfficeData = getBranchOfficeResponse.items[0];
          } catch (error) {
            console.log(error);
          }
        }
        return branchOfficeData;
    }

    useEffect(async () => {
      let data = await getBranchOfficeData();
      formik.setValues(data)
    }, [branchOfficeId]);


    useEffect(async () => {
      await getRegions();
      await getFormats();
      await getClients();
    }, []);

    useEffect(async () => {
      if(formik.values.client_id !== ''){
        await getUrls();
      }
    }, [formik.values.client_id]);

    const getRegions = async() => {
      var regions = await getBranchRegion();
      var regionOption = getItems(regions.items);
      setRegionOptions(regionOption)
    };

    const getFormats = async() => {
      var formats = await getBranchFormats();
      var formatOption = getItems(formats.items);
      setFormatOptions(formatOption)
    };

    const getSubformats = async() => {
      var subformatsResponse = await getBranchSubformats(subformatSearch);
      setSubformats(subformatsResponse.items)
      var subformatOption = getItemsSubformat(subformatsResponse.items);
      setSubformatOptions(subformatOption)
    };


    const getClients = async() => {
      var clients = await getBranchClient();
      var clientOption = getItemsClient(clients.items);
      setClientOptions(clientOption)
    };
    
    const getUrls = async() => {
      var urls = await getClientUrls(formik.values.client_id);
      if(urls){
        var urlsOption = getItemUrls(urls.items);
        setRelationOptions(urlsOption)
      }
    };

    const getItems = (items) => {
      var options = [];
      items.map(item => {
        options.push(createOption(`${item.name}`, item.id))
      });
      return options;
    } 

    const getItemsClient = (items) => {
      var options = [];
      items.map(item => {
        options.push(createOption(`${item.bussiness_name}`, item.id))
      });
      return options;
    } 

    const getItemsSubformat = (items) => {
      var options = [];
      items.map(item => {
        options.push(item.name);
        // options.push(createOption(`${item.name}`, `${item.name}`))
      });
      return options;
    } 

    const getItemUrls = (items) => {
      var options = [];
      items.map(item => {
        options.push(createOption(`${item.url}`, item.id))
      });
      return options;
    } 

    useEffect(async () => {
      await getSubformats()
    }, [subformatSearch]);

    const handleSubformatChange = (subformat) => { formik.setFieldValue("subformat_name", subformat) };
    return {
      formik,
      regionOptions,
      formatOptions,
      subformatOptions,
      clientOptions,
      relationOptions,
      subformatSearch,
      setSubformatSearch,
      handleSubformatChange
    };
  }