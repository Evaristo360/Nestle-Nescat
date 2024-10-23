import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { getClient, editClient, addClient} from 'providers/api';
import useAxios  from 'hooks/useAxios'
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as msgs } from './ClientFormMessages';
import {usePermsByRol} from 'hooks/usePermsByRol'
import { roles } from 'providers/role';
import useUserMetadata from 'hooks/useUserMetadata';
import { useGlobalApiError } from 'hooks/useGlobalApiError';

const checkboxOptions = [
  {
    label: intlExt.formatMessage(msgs.analyticsLabel),
    disabled: false,
    name: 'analytics'
  },
  {
    label: intlExt.formatMessage(msgs.digital_displayLabel),
    disabled: false,
    name: 'digital_display'
  },
  {
    label: intlExt.formatMessage(msgs.totemLabel),
    disabled: false,
    name: 'totem'
  },
  {
    label: intlExt.formatMessage(msgs.client_moduleLabel),
    disabled: false,
    name: 'client_module'
  },
  {
    label: intlExt.formatMessage(msgs.branchesLabel),
    disabled: false,
    name: 'branches'
  },
  {
    label: intlExt.formatMessage(msgs.productLabel),
    disabled: false,
    name: 'product'
  },
  {
    label: intlExt.formatMessage(msgs.redemption_ptsLabel),
    disabled: false,
    name: 'redemption_pts'
  },
  {
    label: intlExt.formatMessage(msgs.load_ptsLabel),
    disabled: false,
    name: 'load_pts'
  },
  {
    label: intlExt.formatMessage(msgs.customersLabel),
    disabled: false,
    name: 'customer'
  },
  {
    label: intlExt.formatMessage(msgs.purchase_requestLabel),
    disabled: false,
    name: 'purchase_request'
  },
  {
    label: intlExt.formatMessage(msgs.sale_offLabel),
    disabled: false,
    name: 'sale_off'
  },
  {
    label:intlExt.formatMessage(msgs.managementLabel),
    disabled: false,
    name: 'management'
  },
  {
    label: intlExt.formatMessage(msgs.advertisementLabel),
    disabled: false,
    name: 'advertisement'
  }
];

const schemaClient = yup.object().shape({
    is_active:yup.bool(),
    name_contact: yup
        .string()
        .max(30)
        .required(intlExt.formatMessage(msgs.required)),
    name:yup
        .string()
        .max(60)
        .required(intlExt.formatMessage(msgs.required)),
    nestle_id:yup
        .string()
        .max(10)
        .required(intlExt.formatMessage(msgs.required)),
    email:yup
        .string()
        .email(intlExt.formatMessage(msgs.invalidEmail))
        .max(50)
        .required(intlExt.formatMessage(msgs.required)),
    phone:yup
        .string()
        .matches(/^\d{10}/, { message: intlExt.formatMessage(msgs.invalidTelephone), excludeEmptyString: true })
        .min(10, intlExt.formatMessage(msgs.telephoneLength))
        .max(10, intlExt.formatMessage(msgs.telephoneLength))
        .required(intlExt.formatMessage(msgs.required)),
    user_image_size: yup
        .number()
        .max(5000000, intlExt.formatMessage(msgs.maxSizeImage)),
    user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(msgs.invalidTypeImage)
    ),
    // advertisement: yup.bool(),
    // analytics: yup.bool(),
    // digital_display: yup.bool(),
    // totem: yup.bool(),
    // branches: yup.bool(),
    // redemption_pts: yup.bool(),
    // purchase_request: yup.bool(),
    // sale_off: yup.bool(),
    // client_module: yup.bool(),
    // product: yup.bool(),
    // load_pts: yup.bool(),
    // customer: yup.bool(),
  });
  
  const initialClientValues =  {
    nestle_id: '',
    activated_on: new Date().toISOString(),
    is_active: true,
    name_contact: '',
    name: '',
    email: '',
    phone: '',
    user_image: null,
    user_image_size: 0,
    user_image_type: '',
    permissions: [],
    image_url:''
  }


  export const useClientForm = ({clientId, onAccept}) => {
    const onError = () => {};
    const {
      permisosByRol
    } = usePermsByRol({ role_id:roles.client_admin});

    const { role, perms, loading, userName } = useUserMetadata({onError});

    const { get, patch, post } = useAxios();
    const [permsValue, setPermsValue] = useState([]);
    const [finallyPermsOptions, SetFinallyPermsOptions] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

     //error states
     const [showMessageError, setShowMessageError] = useState(false);
     const [messageErrorTittle, setMessageErrorTittle] = useState('');
     const [messageErrorBody, setMessageErrorBody] = useState('');
    
    const formik = useFormik({
        initialValues: initialClientValues,
        validationSchema: schemaClient,
         onSubmit: async (values) => {
          setIsDisabled(false);
          var permsToSend = {};
          permsValue.map( perm =>{
            permsToSend[perm.name]= perm.checked
          })
          
          var data = new FormData();
          data.append('nestle_id', values.nestle_id);
          data.append('name_contact', values.name_contact);
          data.append('email', values.email);
          data.append('is_active', values.is_active);
          data.append('name', values.name);
          data.append('phone', values.phone);
          data.append('user_image', values.user_image);
          data.append('permissions', JSON.stringify(permsToSend));
          if(clientId == 0){
              const apiError = useGlobalApiError();
              try {
                  apiError.disable();
                  let response = await addClient(data);
                  if(response.error){
                    if(response.error === "email" && response.message.includes('already exist')){
                      setShowMessageError(true);
                      setMessageErrorTittle('Error al crear nuevo cliente')
                      setMessageErrorBody('El email ' + values.email + " ya se encuentra registrado");
                    }else
                    if(response.error === "analytics" && response.message.includes('must be equal to true')){
                      setShowMessageError(true);
                      setMessageErrorTittle('Error al crear nuevo cliente')
                      setMessageErrorBody("Analytics debe estar asignado");
                    }else
                    if(response.error === "user_image" && response.message.includes('should not exist')){
                      setShowMessageError(true);
                      setMessageErrorTittle('Error al crear nuevo cliente')
                      setMessageErrorBody("Seleccione una imagen");
                    }else{
                      setShowMessageError(true);
                      setMessageErrorTittle('Error al crear nuevo cliente')
                      setMessageErrorBody("Ha ocurrido un error, intente de nuevo más tarde");
                    }
                    setIsDisabled(true);
                  }else{
                    onAccept();
                    InitialValuesPermisos();
                    formik.setValues(initialClientValues);
                  }
                  setIsDisabled(true);
              } catch (error) {
                  console.log({ error });
              }finally {
                apiError.enable();
              }
          }else{
            const apiError = useGlobalApiError();
            try {
                apiError.disable();
                let response = await editClient(clientId, data);
                if(response.error){
                  if(response.error === "email" && response.message.includes('already exist')){
                    setShowMessageError(true);
                    setMessageErrorTittle('Error al editar cliente')
                    setMessageErrorBody('El email ' + values.email + " ya se encuentra registrado");
                  }else
                  if(response.error === "analytics" && response.message.includes('must be equal to true')){
                    setShowMessageError(true);
                    setMessageErrorTittle('Error al editar cliente')
                    setMessageErrorBody("Analytics debe estar asignado");
                  }else
                  if(response.error === "user_image" && response.message.includes('should not exist')){
                    setShowMessageError(true);
                    setMessageErrorTittle('Error al editar cliente')
                    setMessageErrorBody("Seleccione una imagen");
                  }else{
                    setShowMessageError(true);
                    setMessageErrorTittle('Error al editar cliente')
                    setMessageErrorBody("Ha ocurrido un error, intente de nuevo más tarde");
                  }
                  setIsDisabled(true);
                }else{
                  onAccept();
                }
                setIsDisabled(true);
            } catch (error) {
                console.log({ error });
            }finally {
              apiError.enable();
            }
          }
        }
    });

    async function getClientData() {
        InitialValuesPermisos()
        let clientData = initialClientValues;
        if (clientId != 0) {
          try {
            const getClientResponse = await getClient(clientId);
            clientData = getClientResponse.items[0];
            clientData.user_image = await getFile('/' + clientData.image_url);
          } catch (error) {
            console.log({error});
          }

          var result = [];
          for(var i in clientData.permissions)
              result.push(
                {
                  name: i, 
                  checked: clientData.permissions[i]
                }
              );
          setPermsValue(result)
        }else{
          formik.setFieldValue("user_image",null)
        }
        
        return clientData;
    }

    const getFile = async (urlImage) =>{
      let image = null;
      try {
        let resImage = await get(urlImage, { responseType: 'blob' });
        if (resImage.data) {
          image = (
            new File([resImage.data], `user_${clientId}`, {
              type: resImage.data.type,
              size: resImage.data.size
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

    const loadImageClient = (event) => {
      const file = event.target.files[0];
      formik.setFieldValue("user_image",file)
      formik.setFieldValue("user_image_size",file.size)
      formik.setFieldValue("user_image_type",file.type)
    };

    useEffect(async () => {
        let data = await getClientData();
        formik.setValues(data)
        if(data.user_image !== null){
          // console.log(data.user_image)
            formik.setFieldValue("user_image_size",data.user_image.size)
            formik.setFieldValue("user_image_type",data.user_image.type)
        }
      }, [clientId]);

      const updatePermisoValue = (e) => {
        var newPerms = permsValue.map((perm) => ({
          name: perm.name,
          checked: perm.name === e.target.name ? !perm.checked : perm.checked
        }));
        setPermsValue(newPerms)
      }

      useEffect(() => {
        var permsByUse = getPermisosByUse();
        setPermsValue(permsByUse);
      }, [perms,permisosByRol]);

      const getPermisosByUse = () => {
        const clientPermisos = perms.filter(value => -1 !== permisosByRol.indexOf(value)); //Interseccion entre role/:role_id y /my-info

        //interseccion checkboxoptions con clientPermisos
        var getFinallyPermOptions= checkboxOptions.filter(value => -1 !== clientPermisos.indexOf(value.name));

        SetFinallyPermsOptions(getFinallyPermOptions);

        let permisosValue = [];
        clientPermisos.map((perm)=>{
          var item= { name:perm, checked:false}
          permisosValue.push(item);
        })

        return permisosValue
      }

      const InitialValuesPermisos = () =>{
        var aux = permsValue.slice() 
        aux.map( perm => { perm.checked = false})
        setPermsValue(aux);
      }

      return {
        loadImageClient,
        updatePermisoValue,
        permsValue,
        finallyPermsOptions,
        formik,
        showMessageError,
        setShowMessageError,
        messageErrorTittle,
        messageErrorBody,
        isDisabled
      };
  }