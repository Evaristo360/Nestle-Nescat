import React, { useReducer, useState, useEffect } from 'react';
import DrawerModal from 'components/DrawerModal';
import {
  Grid,
  TextField,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import ProductImageInput from 'components/Inputs/ProductImageInput';
import { style } from './PromotionFormStyles.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { useDrawerPromotion } from './hooks/useDrawerPromotion';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { ProductList } from './components/ProductList';
import { ClientList } from './components/ClientList';
import { MenuProps, useStyles2, options } from './utils';
import { sale_off_type } from './data';
import Button from 'components/Button';
import CancelOkModal from 'components/CancelOkModal';
import InfoModal from './components/InfoModal';
import useModal from 'hooks/useModal';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
      width: '100%'
    }
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

export const PromotionsForm = ({
  promotionId,
  visible,
  onClose,
  onAccept,
  editableForm,
  reset,
  role_id
}) => {
  //const PromotionFormStyles = promotionFormStyles();
  const classes = style();
  const classes2 = useStyles2();
  const [selected, setSelected] = useState([]);
  const [enableRadioButton, setEnableRadioButton] = useState(false);
  const { showModal, openModal, title, text, toggleModal } = useModal();

  const { variable, methods, list, Formik } = useDrawerPromotion(
    onAccept,
    onClose,
    role_id,
    visible
  );

  const classes3 = useStyles3();

  useEffect(() => {
    (async () => {
      //let initValues = {};
      //methods.GetDivision();
      //setUserValues(createInitState());
      //methods.updateFormat('');
      //initValues.user_image = await getProfilePhoto('userId', default_image);
    })();
  }, [reset]);

  const onChangeCheckBox = (event) => {
    // console.log('event', event)
    // if (event.target.name === "historicPoints") {
    //   setUserCheck(!userCheck);
    // } else if (event.target.name === "purchasedProducts") {
    //   setProductCheck(!productCheck);
    // } else {
    //   setCodeCheck(!codeCheck);
    // }
    let formikObject = {
      target: {
        name: event.target.name,
        value: event.target.checked
      }
    };
    Formik.handleChange(formikObject);

    if (event.target.name === "purchasedProducts") {

      if (event.target.checked) {

        let formikObject = {};

        if (Formik.values.historicPoints) {

          formikObject.target = {
            name: "require_options",
            value: "yes"
          };

          setEnableRadioButton(true);

        } else {

          formikObject.target = {
            name: "require_options",
            value: "no"
          };

          setEnableRadioButton(false);

        }

        Formik.handleChange(formikObject);

      } else {

        let formikObject = {};

        if (Formik.values.historicPoints) {

          formikObject.target = {
            name: "require_options",
            value: "no"
          };
          setEnableRadioButton(false);

        } else {

          formikObject.target = {
            name: "require_options",
            value: "no"
          };
          setEnableRadioButton(false);

        }

        Formik.handleChange(formikObject);

      }
    }

    if (event.target.name === "historicPoints") {

      if (event.target.checked) {

        let formikObject = {};

        if (Formik.values.purchasedProducts) {

          formikObject.target = {
            name: "require_options",
            value: "yes"
          };

          setEnableRadioButton(true);

        } else {

          formikObject.target = {
            name: "require_options",
            value: "no"
          };

          setEnableRadioButton(false);

        }

        Formik.handleChange(formikObject);

      } else {

        let formikObject = {};

        formikObject.target = {
          name: "require_options",
          value: "no"
        };

        setEnableRadioButton(false);

        Formik.handleChange(formikObject);

      }
    }
  };

  const toggleClose = () => {
    onClose();
    methods.reset();
  };

  const toggleAccept = () => {
    onClose();
    methods.reset();
    Formik.handleSubmit();
  };

  return (
    <DrawerModal
      visible={visible}
      onClose={toggleClose}
      onAccept={Formik.handleSubmit}
      title={''}
      //className={PromotionFormStyles.root}
      disabledAccept={Formik.isValid}
      useScroll={true}
      showButtonCancel={false}
      showButtonAccept={false}
    >
      <h1 className={classes.title}>Nueva promoción</h1>
      <p className={classes.legend}>
        Completa los siguientes datos para crear una nueva promoción
      </p>
      <CancelOkModal
        visible={showModal}
        onAccept={toggleModal}
        onCancel={null}
        title={title}
        text=""
        okLabel="Cerrar"
        okStyle="dark"
      >
        {text}
      </CancelOkModal>
      <ProductImageInput
        name="user_image"
        label="Imagen"
        limitMB={5}
        message={
          (Formik.touched.user_image_size && Formik.errors.user_image_size) ||
          (Formik.touched.user_image_type && Formik.errors.user_image_type)
        }
        value={Formik.values.user_image}
        onChange={methods.handleChangeImage}
      />

      {role_id === 2 || role_id === 3 ? (
        <>
          <h2 className={classes.data}>Vigencia</h2>

          <div className="mt-2">
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                className={classes.radioButton}
              >
                <FormControlLabel
                  control={
                    <Radio
                      name="validity_type"
                      onChange={Formik.handleChange}
                      value={'always'}
                      checked={Formik.values.validity_type === 'always'}
                      size="medium"
                    />
                  }
                  label="Activo siempre"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="row">
            <div className="ml-3 mt-2">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  className={classes.radioButton}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        name="validity_type"
                        onChange={Formik.handleChange}
                        value={'active_until'}
                        checked={Formik.values.validity_type === 'active_until'}
                        size="medium"
                      />
                    }
                    label="Activo hasta"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <TextField
              type="date"
              label="Fecha fin"
              name="validity_date"
              variant="filled"
              margin="dense"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              // helperText={Formik.touched.validity_date || Formik.errors.validity_date}
              className={classes.datePicker}
              onChange={Formik.handleChange}
              value={Formik.values.validity_date}
            ></TextField>
          </div>

          <div className="row">
            <div className="ml-3 mt-2">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  className={classes.radioButton}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        name="validity_type"
                        onChange={Formik.handleChange}
                        value={'inactive'}
                        checked={Formik.values.validity_type === 'inactive'}
                        size="medium"
                      />
                    }
                    label="Inactivo"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <p className={classes.error}>
            {Formik.touched.validity_type ||
              Formik.errors.validity_type ||
              Formik.touched.validity_date ||
              Formik.errors.validity_date}
          </p>
        </>
      ) : null}

      <h2 className={classes.data}>Datos</h2>

      <TextField
        label="Nombre de la promoción"
        name="name"
        placeholder="Ej. NESCAFÉ® Decaf® 2x1"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={Formik.touched.name || Formik.errors.name}
        className={classes.textField}
        onChange={Formik.handleChange}
        value={Formik.values.name}
      />

      <TextField
        label="Ingresa una descripción breve del producto."
        name="description"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.description}
        helperText={Formik.touched.description || Formik.errors.description}
        onChange={Formik.handleChange}
        value={Formik.values.description}
        multiline
        rows={6}
      />

      {role_id === 2 || role_id === 3 ? (
        <>
          <div className={classes.priority}>
            <FormControl variant="filled" className={classes3.formControl}>
              <InputLabel
                id="demo-simple-select-filled-label"
                name="sale_off_type_id"
                className={classes3.inputLabel}
                autoFocus={true}
                placeholder="Ej. NESCAFÉ decaf"
              >
                Tipo de promoción
              </InputLabel>
              <Select
                value={Formik.values.sale_off_type_id}
                onChange={Formik.handleChange}
                className={classes3.select}
                name="sale_off_type_id"
              >
                {sale_off_type.map((option, index) => {
                  let value = option.value;
                  let label = option.label;

                  return (
                    <MenuItem value={value} key={`${label}=${value}${index}`}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <p className={classes.error}>
            {Formik.touched.sale_off_type_id || Formik.errors.sale_off_type_id}
          </p>

          {Formik.values.sale_off_type_id === 1 ? (
            <>
              <h2 className={classes.data}>Clasificación de usuario</h2>

              <div className="mr-5">
                <FormGroup className={classes.checkBox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="historicPoints"
                        onChange={onChangeCheckBox}
                        checked={Formik.values.historicPoints}
                        size="medium"
                      />
                    }
                    label="Puntos histórico del usuario"
                  />
                </FormGroup>
              </div>

              {Formik.values.historicPoints ? (
                <div className={classes.priority}>
                  <FormControl
                    variant="filled"
                    className={classes3.formControl}
                  >
                    <InputLabel
                      id="demo-simple-select-filled-label"
                      name="value"
                      className={classes3.inputLabel}
                      autoFocus={true}
                      placeholder="Ej. NESCAFÉ decaf"
                    >
                      Valor
                    </InputLabel>
                    <Select
                      value={Formik.values.value}
                      onChange={Formik.handleChange}
                      className={classes3.select}
                      name="value"
                    >
                      <MenuItem value={'lessThan'}>Menor a</MenuItem>
                      <MenuItem value={'greaterThan'}>Mayor a</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              ) : null}
              <p className={classes.error}>
                {Formik.touched.value || Formik.errors.value}
              </p>
              {Formik.values.historicPoints ? (
                <TextField
                  label="Cantidad"
                  name="quantity"
                  placeholder="Ej. 0000"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={Formik.touched.quantity || Formik.errors.quantity}
                  className={classes.textField}
                  onChange={Formik.handleChange}
                  value={Formik.values.quantity}
                />
              ) : null}

              <div className="mr-5">
                <FormGroup className={classes.checkBox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="purchasedProducts"
                        onChange={onChangeCheckBox}
                        checked={Formik.values.purchasedProducts}
                        size="medium"
                      />
                    }
                    label="Productos comprados (carga de puntos)"
                  />
                </FormGroup>
              </div>

              {Formik.values.purchasedProducts ? (
                <div className="mt-2">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="radio_buttons_products"
                      className={classes.radioButton}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            name="radio_button_purchasedProducts"
                            onChange={Formik.handleChange}
                            value={'all'}
                            checked={
                              Formik.values.radio_button_purchasedProducts ===
                              'all'
                            }
                            size="medium"
                          />
                        }
                        label="Cumplir con todos los productos"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            name="radio_button_purchasedProducts"
                            onChange={Formik.handleChange}
                            value={'minimum_one'}
                            checked={
                              Formik.values.radio_button_purchasedProducts ===
                              'minimum_one'
                            }
                            size="medium"
                          />
                        }
                        label="Cumplir con al menos un producto"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              ) : null}

              <p className={classes.error}>
                {Formik.touched.radio_buttons_products ||
                  Formik.errors.radio_buttons_products}
              </p>

              {/* Productos Comprados */}

              {Formik.values.purchasedProducts ? (
                <ProductList Formik={Formik} list={list} methods={methods} />
              ) : null}

              <div className="mt-2">
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="require_options"
                    className={classes.radioButton}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          name="require_options"
                          onChange={Formik.handleChange}
                          value={'yes'}
                          checked={Formik.values.require_options === 'yes'}
                          size="medium"
                          disabled={!enableRadioButton}
                        />
                      }
                      label="Cumplir con ambas opciones (Productos comprados, Histórico de puntos)"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          name="require_options"
                          onChange={Formik.handleChange}
                          value={'no'}
                          checked={Formik.values.require_options === 'no'}
                          size="medium"
                        />
                      }
                      label="Cumplir con una de las opciones"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <p className={classes.error}>
                {Formik.touched.require_options ||
                  Formik.errors.require_options}
              </p>
              <ClientList
                handleChanges={methods.handleClientListChange}
                variables={variable}
                list={list}
                methods={methods}
                selected={selected}
                MenuProps={MenuProps}
                useStyles2={useStyles2}
                options={list.listsOfBranches}
                saleOffId={Formik.values.sale_off_type_id}
              />

              <div className="mr-5">
                <FormGroup className={classes.checkBox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="code"
                        onChange={onChangeCheckBox}
                        checked={Formik.values.code}
                        size="medium"
                      />
                    }
                    label="Código"
                  />
                </FormGroup>
              </div>

              {Formik.values.code ? (
                <TextField
                  label="Código"
                  name="code_text"
                  placeholder="Ej. 000000000"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    Formik.touched.code_text || Formik.errors.code_text
                  }
                  className={classes.textField}
                  onChange={Formik.handleChange}
                  value={Formik.values.code_text}
                />
              ) : null}

              <div className="mt-2">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    className={classes.radioButton}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          name="limit"
                          onChange={Formik.handleChange}
                          value={'single'}
                          checked={Formik.values.limit === 'single'}
                          size="medium"
                        />
                      }
                      label="Única"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="mt-2">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    className={classes.radioButton}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          name="limit"
                          onChange={Formik.handleChange}
                          value={'exactly'}
                          checked={Formik.values.limit === 'exactly'}
                          size="medium"
                        />
                      }
                      label="Cantidad exacta"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              {Formik.values.limit === 'exactly' ? (
                <TextField
                  label="Cantidad"
                  name="limit_quantity"
                  placeholder="Ej. 0000"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    Formik.touched.limit_quantity ||
                    Formik.errors.limit_quantity
                  }
                  className={classes.textField}
                  onChange={Formik.handleChange}
                  value={Formik.values.limit_quantity}
                />
              ) : null}

              <div className="mt-2">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    className={classes.radioButton}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          name="limit"
                          onChange={Formik.handleChange}
                          value={'unlimited'}
                          checked={Formik.values.limit === 'unlimited'}
                          size="medium"
                        />
                      }
                      label="Sin límite"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <p className={classes.error}>
                {Formik.touched.limit || Formik.errors.limit}
              </p>
            </>
          ) : Formik.values.sale_off_type_id === 2 ? (
            <>
              <ClientList
                handleChanges={methods.handleClientListChange}
                variables={variable}
                list={list}
                methods={methods}
                selected={selected}
                MenuProps={MenuProps}
                useStyles2={useStyles2}
                options={list.listsOfBranches}
                saleOffId={Formik.values.sale_off_type_id}
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          {list.listClients.map((client, index) => (
            <div key={`branches_ids_${client.client_id}${index}`}>
              <div className={classes.priority}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel
                    id="mutiple-select-label"
                    name={`branches_id_${index}`}
                    className={classes.inputLabel}
                    // options={{ fullWidth: true }}
                    // disableUnderline={true}
                    autoFocus={true}
                    placeholder="Multiple Select"
                  >
                    Sucursal
                  </InputLabel>
                  <Select
                    name={`branches_id_${index}`}
                    labelId="mutiple-select-label"
                    multiple
                    value={list.listClients[index].branch_names}
                    onChange={(e) => methods.handleClientListChange(e, index)}
                    renderValue={(value) => value.join(', ')}
                    className={classes.select}
                    MenuProps={MenuProps}
                  >
                    <MenuItem
                      value="all"
                      classes={{
                        root: client.isAllSelected ? classes2.selectedAll : ''
                      }}
                    >
                      <ListItemIcon className={classes.checkBoxSelect}>
                        <Checkbox
                          classes={{
                            indeterminate: classes2.indeterminateColor
                          }}
                          checked={client.isAllSelected}
                          indeterminate={
                            list.listClients[index].branch_names.length > 0 &&
                            list.listClients[index].branch_names.length <
                              list.listsOfBranches.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes2.selectAllText }}
                        primary="Todas"
                      />
                    </MenuItem>
                    {list.listsOfBranches.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        <ListItemIcon className={classes.checkBoxSelect}>
                          <Checkbox
                            checked={
                              list.listClients[index].branch_names.indexOf(
                                option.name
                              ) > -1
                            }
                            size="medium"
                          />
                        </ListItemIcon>
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          ))}

          <h2 className={classes.data}>Vigencia</h2>

          <div className="mt-2">
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                className={classes.radioButton}
              >
                <FormControlLabel
                  control={
                    <Radio
                      name="validity_type"
                      onChange={Formik.handleChange}
                      value={'always'}
                      checked={Formik.values.validity_type === 'always'}
                      size="medium"
                    />
                  }
                  label="Activo siempre"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="row">
            <div className="ml-3 mt-2">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  className={classes.radioButton}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        name="validity_type"
                        onChange={Formik.handleChange}
                        value={'active_until'}
                        checked={Formik.values.validity_type === 'active_until'}
                        size="medium"
                      />
                    }
                    label="Activo hasta"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <TextField
              type="date"
              label="Fecha fin"
              name="validity_date"
              variant="filled"
              margin="dense"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              helperText={
                Formik.touched.validity_date || Formik.errors.validity_date
              }
              className={classes.datePicker}
              onChange={Formik.handleChange}
              value={Formik.values.validity_date}
            ></TextField>
          </div>

          <div className="row">
            <div className="ml-3 mt-2">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  className={classes.radioButton}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        name="validity_type"
                        onChange={Formik.handleChange}
                        value={'inactive'}
                        checked={Formik.values.validity_type === 'inactive'}
                        size="medium"
                      />
                    }
                    label="Inactivo"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <p className={classes.error}>
            {Formik.touched.validity_type || Formik.errors.validity_type}
          </p>
        </>
      )}
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Button
          onClick={() =>
            openModal('Promociones', <InfoModal roleId={role_id} />)
          }
          className={classes.infoButton}
        >
          i
        </Button>
        <Button
          className={classes.saveButton}
          onClick={Formik.handleSubmit}
          disabled={!Formik.isValid}
        >
          Aceptar
        </Button>
        <Button
          className={classes.cancelButton}
          onClick={toggleClose}
          style={{ marginLeft: '1rem', background: '#1C1C1C' }}
        >
          Cancelar
        </Button>
      </Grid>
    </DrawerModal>
  );
};
