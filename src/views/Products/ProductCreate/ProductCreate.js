import React, { useReducer, useState, useEffect } from 'react';
import useApi from './api';
import { style } from './ProductCreateStyles.css';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as formMessages } from './ProductCreateMessages';
import FormControl from '@material-ui/core/FormControl';
import ProductImageInput from 'components/Inputs/ProductImageInput';
import Button from 'components/Button';
import { Grid, Drawer, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { UseCreateProduct } from './hooks/useCreateProduct';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAllProducts } from 'providers/api';
const useStyles3 = makeStyles((theme) => ({
  formControl: {
    background: '#E1E1E126 0% 0% no-repeat padding-box',
    borderRadius: '4px 4px 4px 4px',
    opacity: 1,
    '&.MuiFilledInput-underline, &.Mui-focused': {
      color: '#FFFFFF80',
      opacity: 1
    },
    '&.MuiFormControl-root': {
      width: '100%',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  select: {
    textAlign: 'left',
    font: 'normal normal normal 20px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF80',
    opacity: 1
  },

  inputLabel: {
    textAlign: 'left',
    font: 'normal normal normal 20px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF80',
    opacity: 1,
    '&.Mui-focused': {
      color: '#FFFFFF80',
      opacity: 1
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    '& .MuiFormHelperText-root': {
      textAlign: 'left',
      font: 'normal normal normal 16px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      background: '#FFFFFF',
      opacity: 1
    }
  },
  description: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    '& .MuiFormHelperText-root': {
      textAlign: 'left',
      font: 'normal normal normal 16px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      background: '#FFFFFF',
      opacity: 1
    }
  },
  date: {
    textAlign: 'left',
    font: 'normal normal normal 24px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    '& .MuiInputLabel-root': {
      textAlign: 'left',
      font: 'normal normal normal 16px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1
    },
    '& .MuiInputBase-input': {
      textAlign: 'left',
      font: 'normal normal normal 18px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1
    }
  }
}));

const createInitState = (
  // name = '',
  points = '',
  division_id = '',
  category_id = '',
  material_group_id = '',
  description = '',
  formatt_equivalence = '',
  sku = ' ',
  code_sap = '',
  barcode_piece = '',
  barcode_box = '',
  user_image = null,
  user_image_size = 0,
  user_image_type = ''
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
  user_image_type
});

const requiredMsg = intlExt.formatMessage(formMessages.required);

const schemaUser = yup.object().shape({
  division_id: yup
    .string()
    .required(requiredMsg),
  category_id: yup
    .string()
    .required(requiredMsg),
  material_group_id: yup
    .string()
    .required(requiredMsg),
  formatt_equivalence: yup
    .string(),
  // name: yup
  //   .string()
  //   .required(intlExt.formatMessage(formMessages.required))
  //   .max(60, intlExt.formatMessage(formMessages.nameLength)),
  points: yup
    .string()
    .required(requiredMsg)
    .matches(/^\d{1,4}/, intlExt.formatMessage(formMessages.onlyNumbers))
    .max(3, intlExt.formatMessage(formMessages.pointsLength)),
  description: yup
    .string()
    .required(requiredMsg)
    .max(60, intlExt.formatMessage(formMessages.descriptionLength)),
  sku: yup.string(),
  code_sap: yup
    .string()
    .required(requiredMsg)
    .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.onlyNumbers))
    .max(50, intlExt.formatMessage(formMessages.code_sapLength)),
  barcode_piece: yup
    .string()
    .required(requiredMsg)
    .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.barcode_pieceLength))
    .max(50, intlExt.formatMessage(formMessages.number_10_length)),
  barcode_box: yup
    .string()
    .required(requiredMsg)
    .matches(/^\s*-?[0-9]{1,51}\s*$/, intlExt.formatMessage(formMessages.barcode_boxLength))
    .max(50, intlExt.formatMessage(formMessages.number_10_length)),
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

export const ProductCreate = ({ visible, onClose, reset, successAccept, cancel }) => {
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
  const [userValues, setUserValues] = useState(createInitState());
  const { messages, addMessage, updateMultipleMessages } = useMessages();
  const updateUserValues = (name, value) =>
    setUserValues({ ...userValues, [name]: value });
  const updateUserMultipleValues = (values) =>
    setUserValues({ ...userValues, ...values });
  const { updateUser } = useApi();
  const classes = style();

  const { variable, methods, list } = UseCreateProduct();

  const toggleDivision = (e) => {
    updateUserValues('division_id', e.target.value);
    methods.updateDivision(e.target.value);
  };

  const toggleCategory = (e) => {
    updateUserValues('category_id', e.target.value);
    methods.updateCategory(e.target.value);
  };

  const toggleMaterial = (e) => {
    updateUserValues('material_group_id', e.target.value);
    methods.updateMaterialGroup(e.target.value);
  };

  const toggleFormat = (e) => {
    // console.log("ff", e.target.value)
    updateUserValues('formatt_equivalence', e.target.value);
    methods.updateFormat(e.target.value);
  };

  const onCancel = () => {
    onClose();
    cancel();
  };

  const classes3 = useStyles3();

  useEffect(() => {
    (async () => {
      //let initValues = {};

      methods.GetDivision();
      methods.GetFormat();

      setUserValues(createInitState());
      //initValues.user_image = await getProfilePhoto('userId', default_image);
    })();
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
      cleanMessages(schema);
      schema.validateSync(values);

      return true;
    } catch (error) {
      const name = error.params.path;
      const message = error.message;

      // console.log(name, message)

      addMessage(name, message);
    }

    return false;
  };

  const validateForm = () => {
    // console.log(schemaUser, userValues)
    const validUser = validateSchema(schemaUser, userValues);

    return validUser;
  };

  const cleanMessages = (schema) => {
    const names = schema._nodes;
    // console.log("names", names)

    const newMessages = names.reduce((acc, name) => {
      acc[name] = '';

      return acc;
    }, {});

    // console.log('newMessages', newMessages)

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
    if (userValues.sku) fd.set('sku', userValues.sku);
    fd.set('code_sap', userValues.code_sap);
    fd.set('barcode_piece', userValues.barcode_piece);
    fd.set('barcode_box', userValues.barcode_box);
    fd.set('division_id', userValues.division_id);
    fd.set('category_id', userValues.category_id);
    fd.set('material_group_id', userValues.material_group_id);
    fd.set('format_equivalence', userValues.formatt_equivalence);

    if (userValues.user_image && userValues.user_image.name !== 'default.png') {
      fd.set('image', userValues.user_image);
    }

    updateUser(fd)
      .then((result) => {
        successAccept();
        // console.log('here')
        onClose();
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
      <h1 className={classes.title}>Nuevo producto</h1>
      <ProductImageInput
        name="user_image"
        label="Imagen del producto"
        limitMB={5}
        message={messages.user_image_size || messages.user_image_type}
        value={userValues.user_image}
        onChange={handleChange}
      />

      <h2 className={classes.data}>Datos del producto</h2>
      {/* Se quita el campo de Nombre, queda únicamente Descripción  06-12-2021 */}
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

      <div className={classes.priority}>
        <FormControl
          variant="filled"
          // fullWidth={true}
          // disableUnderline={true}
          className={classes3.formControl}
        >
          <InputLabel
            id="demo-simple-select-filled-label"
            name="division_id"
            className={classes3.inputLabel}
            // options={{ fullWidth: true }}
            // disableUnderline={true}
            autoFocus={true}
            placeholder="Ej. NESCAFÉ decaf"
          >
            División
          </InputLabel>
          <Select
            value={userValues.division_id}
            onChange={(e) => toggleDivision(e)}
            className={classes3.select}
          >
            {/* <MenuItems options={list.listDivisions} /> */}
            {list.listDivisions.map((option, index) => {
              let value = option.id;
              let label = option.name;

              return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <p className={classes.error}>
        {messages.division_id}
      </p>

      <div className={classes.priority}>
        <FormControl
          variant="filled"
          // fullWidth={true}
          // disableUnderline={true}
          placeholder="hola"
          className={classes3.formControl}
        >
          <InputLabel
            id="demo-simple-select-filled-label"
            name="category_id"
            className={classes3.inputLabel}
            // options={{ fullWidth: true }}
            // disableUnderline={true}
            autoFocus={true}
          >
            Categoría
          </InputLabel>
          <Select
            value={userValues.category_id}
            onChange={(e) => toggleCategory(e)}
            className={classes3.select}
          >
            {list.listCategories.map((option, index) => {
              let value = option.id;
              let label = option.name;

              return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <p className={classes.error}>
        {messages.category_id}
      </p>

      <div className={classes.priority}>
        <FormControl
          variant="filled"
          // fullWidth={true}
          // disableUnderline={true}
          placeholder="hola"
          className={classes3.formControl}
        >
          <InputLabel
            id="demo-simple-select-filled-label"
            name="material_group_id"
            className={classes3.inputLabel}
            // options={{ fullWidth: true }}
            // disableUnderline={true}
            autoFocus={true}
          >
            Material group
          </InputLabel>
          <Select
            value={userValues.material_group_id}
            onChange={(e) => toggleMaterial(e)}
            className={classes3.select}
          >
            {list.listMaterialGroups.map((option, index) => {
              let value = option.id;
              let label = option.name;

              return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <p className={classes.error}>
        {messages.material_group_id}
      </p>
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

      <div className={classes.priority}>
        <FormControl
          variant="filled"
          // fullWidth={true}
          // disableUnderline={true}
          options={{ fullWidth: true }}
          placeholder="hola"
          className={classes3.formControl}
        >
          <InputLabel
            id="demo-simple-select-filled-label"
            name="formatt_equivalence"
            // options={{ fullWidth: true }}
            className={classes3.inputLabel}
            autoFocus={true}
          >
            Formato equivalente
          </InputLabel>
          <Select
            value={userValues.formatt_equivalence}
            onChange={(e) => toggleFormat(e)}
            className={classes3.select}
          >
            {list.listformat.map((option, index) => {
              let value = option.id;
              let label = option.description;

              return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <p className={classes.error}>
        {messages.formatt_equivalence}
      </p>

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

      {/* <h2 className={classes.legend}>
        {messages}
      </h2> */}

      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Button className={classes.saveButton} onClick={handleSave}>
          Guardar
        </Button>
        <Button
          className={classes.cancelButton}
          onClick={onCancel}
          style={{ marginLeft: '1rem', background: '#1C1C1C' }}
        >
          Cancelar
        </Button>
      </Grid>
    </Drawer>
  );
};
