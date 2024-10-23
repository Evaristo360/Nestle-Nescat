import React, { useReducer, useState, useEffect } from 'react';
import useApi from './api';
import { style } from './EquivalentProductCreateStyles.css';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as formMessages } from './EquivalentProductCreateMessages';
import _ from 'lodash-es';
import ProductImageInput from 'components/Inputs/ProductImageInput';
import Button from 'components/Button';
import { Grid, Drawer, TextField } from '@material-ui/core';
import { useFormStyles } from 'hooks/useFormStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAllProducts } from 'providers/api';

const createInitState = (
  // name = '',
  points = 0,
  division_id = 0,
  category_id = 0,
  material_group_id = 0,
  description = '',
  formatt_equivalence = '',
  sku = '',
  code_sap = '',
  barcode_piece = '',
  barcode_box = '',
  user_image = null,
  user_image_size = 0,
  user_image_type = '',
  product_id = 0
) => ({
  // name,
  points,
  division_id,
  category_id,
  material_group_id,
  description,
  formatt_equivalence,
  sku,
  code_sap,
  barcode_piece,
  barcode_box,
  user_image,
  user_image_size,
  user_image_type,
  product_id
});

const requiredMsg = intlExt.formatMessage(formMessages.required);

const schemaUser = yup.object().shape({
  barcode_box: yup
    .string()
    .required(requiredMsg)
    .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.barcode_boxLength))
    .max(50, intlExt.formatMessage(formMessages.number_10_length)),
  barcode_piece: yup
    .string()
    .required(requiredMsg)
    .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.barcode_pieceLength))
    .max(50, intlExt.formatMessage(formMessages.number_10_length)),
  code_sap: yup
    .string()
    .required(requiredMsg)
    .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.onlyNumbers))
    .max(50, intlExt.formatMessage(formMessages.code_sapLength)),
  sku: yup.string(),
  description: yup
    .string()
    .required(requiredMsg)
    .max(60, intlExt.formatMessage(formMessages.descriptionLength)),
  points: yup
    .string()
    .required(requiredMsg)
    .matches(/^\d{1,3}/, intlExt.formatMessage(formMessages.onlyNumbers))
    .max(3, intlExt.formatMessage(formMessages.pointsLength)),
  // name: yup
  //   .string()
  //   .required(intlExt.formatMessage(formMessages.onlyLetters))
  //   .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
  //     message: intlExt.formatMessage(formMessages.onlyLetters),
  //     excludeEmptyString: true
  //   })
  //   .max(60, intlExt.formatMessage(formMessages.nameLength)),
  user_image_size: yup
    .number()
    .max(5000000, intlExt.formatMessage(formMessages.bigSize)),
  user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(formMessages.invalidType)
    )
});

const messageReducer = (messages = {}, action) => {
  switch (action.type) {
    case 'add-msg':
      return {
        ...messages,
        [action.name]: action.message
      };
    case 'update-multiple':
      return {
        ...messages,
        ...action.messages
      };
    default:
  }

  return messages;
};

const useMessages = () => {
  const [messages, dispatch] = useReducer(messageReducer, {});
  const addMessage = (name, message) =>
    dispatch({ type: 'add-msg', name, message });
  const updateMultipleMessages = (messages) =>
    dispatch({ type: 'update-multiple', messages });

  return { messages, addMessage, updateMultipleMessages };
};

export const EquivalentProductCreate = ({ visible, onClose, productInfo, reset, successAccept, productId}) => {
  const [productList, setProductList] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  useEffect(async () => {
    var productListResponse = await getAllProducts(productSearch);
    var productsOptions = getItemsProducts(productListResponse.items);
    setProductList(productsOptions);
    let event = {
      target:{
        name: "description",
        value: productSearch
      }
    }
    handleChange(event)
  }, [productSearch]);
  
  const getItemsProducts = (items) => {
    var options = [];
    items.map(item => {
      options.push(item.description);
    });
    return options;
  } 

  const formClass = useFormStyles();
  const [userValues, setUserValues] = useState(createInitState());
  const { messages, addMessage, updateMultipleMessages } = useMessages();
  const updateUserValues = (name, value) =>
    setUserValues({ ...userValues, [name]: value });
  const updateUserMultipleValues = (values) =>
    setUserValues({ ...userValues, ...values });
  const { updateUser } = useApi();
  const classes = style();

  useEffect(() => {
      setUserValues(createInitState());
  }, [reset]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      const file = event.target.files[0];

      updateUserMultipleValues({
        [name]: file,
        [`${name}_size`]: file.size,
        [`${name}_type`]: file.type
      });
    } else {
      updateUserValues(name, value);
    }
  };

  const validateSchema = (schema, values) => {
    try {
      schema.validateSync(values);
      cleanMessages(schema);

      return true;
    } catch (error) {
      const name = error.params.path;
      const message = error.message;
      console.log({ error });
      addMessage(name, message);
    }

    return false;
  };

  const validateForm = () => {
    const validUser = validateSchema(schemaUser, userValues);
    // console.log(validUser);

    return validUser;
  };

  const cleanMessages = (schema) => {
    const names = schema._nodes;

    const newMessages = names.reduce((acc, name) => {
      acc[name] = '';

      return acc;
    }, {});

    updateMultipleMessages(newMessages);
  };

  const handleErrors = (error) => {
    if (error.message) {
      const name = error.error;
      const message = error.message;

      addMessage(name, message);
    } else {
      const name = error.property;
      const message = error.constraints.isNotEmpty;

      addMessage(name, message);
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const fd = new FormData();

    // fd.set('name', userValues.name);
    fd.set('points', userValues.points);
    fd.set('description', userValues.description);
    fd.set('sku', userValues.sku);
    fd.set('code_sap', userValues.code_sap);
    fd.set('barcode_piece', userValues.barcode_piece);
    fd.set('barcode_box', userValues.barcode_box);
    fd.set('product_id', productId);

    if (
      userValues.user_image &&
      userValues.user_image.name !== 'default.png'
      
    ) {
      fd.set('image', userValues.user_image);
    }

    updateUser(fd)
      .then((result) => {
        successAccept();
      })
      .catch((err) => handleErrors(err));
  };

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={onClose}
      className={classes.root}
    >
      <h1 className={classes.title}>Producto equivalente</h1>
      {/* <h2 className={classes.subtitle}>Selecciona la imagen del producto que se visualizará en los dispositivos tótem y digital display.</h2>
      <h3 className={classes.subtitle}>Recuerda que la imagen debe ser en formato PNG, con resolución mínima de 800 x 600 y debe pesar máximo 5MB.</h3> */}
      
      <TextField
        label="División"
        name="points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        value={productInfo.division_name}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <TextField
        label="Categoría"
        name="points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        value={productInfo.category_name}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <TextField
        label="Material group"
        name="points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        value={productInfo.material_group_name}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />
      
      <TextField
        label="Formato equivalente"
        name="points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        value={productInfo.format_equivalence_name}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <ProductImageInput
        name="user_image"
        label="Imagen del producto"
        limitMB={5}
        message={
          messages.user_image_size ||
          messages.user_image_type
        }
        value={userValues.user_image}
        onChange={handleChange}
      />

      <h2 className={classes.data}>Datos del producto</h2>
      {/* <TextField
        label="Nombre del producto a mostrar"
        name="name"
        placeholder="Ej. NESCAFÉ decaf"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={messages.name}
        className={classes.textField}
        onChange={handleChange}
      /> */}

      <TextField
        label="Puntos de recompensa"
        name="points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={messages.points}
        className={classes.textField}
        onChange={handleChange}
      />

      {/* <TextField
        label="Ingresa una descripción breve del producto."
        name="description"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.description}
        helperText={messages.description}
        onChange={handleChange}
        multiline rows={6}
      /> */}
      <Autocomplete
        freeSolo
        inputValue={productSearch}
        onInputChange={(event, newInputValue) => {
          setProductSearch(newInputValue);
        }}
        disableClearable
        noOptionsText={'No se encontraron resultados'}
        name={"description"}
        options={productList}
        renderInput={(params) => 
          <TextField 
            {...params} 
            label={"Ingresa una descripción breve del producto."} 
            variant="filled" 
            margin="dense" 
            style={{minHeight:24}}
            helperText={messages.description}
            InputProps={{...params.InputProps, disableUnderline: true}}
            multiline
            rows={6}
          />}
        className={classes.description}
        getOptionDisabled={(option)=>true}
      />

      <TextField
        label="SKU"
        name="sku"
        placeholder="Ej. AA000000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={messages.sku}
        onChange={handleChange}
      />

      <TextField
        label="Material SAP"
        name="code_sap"
        placeholder="Ej. 00000000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={messages.code_sap}
        onChange={handleChange}
      />

      <h2 className={classes.permissions}>Códigos del producto</h2>

      <TextField
        label="Código de barras pieza"
        name="barcode_piece"
        placeholder="Ej. 0000000000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={messages.barcode_piece}
        onChange={handleChange}
      />

      <TextField
        label="Código de barras caja"
        name="barcode_box"
        placeholder="Ej. 0000000000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={messages.barcode_box}
        onChange={handleChange}
      />

      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Button className={classes.saveButton} onClick={handleSave}>Guardar</Button>
        <Button
          className={classes.cancelButton}
          onClick={onClose}
          style={{ marginLeft: '1rem', background: '#1C1C1C' }}
        >
          Cancelar
        </Button>
      </Grid>
    </Drawer>
  );
};
