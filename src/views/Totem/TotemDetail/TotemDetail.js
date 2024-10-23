import React, { useEffect, useReducer, useState } from 'react';
import DrawerModal from 'components/DrawerModal';
import { TextField, FormControlLabel, MenuItem } from '@material-ui/core';
import { SelectV2, createOption } from 'components/SelectV2';
import { useStyles } from 'views/Profiles';
import { SwitchStyle, style as DisplaysStyles } from './TotemStyles';
import { useFormStyles } from 'hooks/useFormStyles';
import useAxios from 'hooks/useAxios';
import { messages as formMessages } from './TotemDetailMessages';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { useFormik } from 'formik';
import useApi from './api';
import { useTotemEdit } from '../TotemEdit/useTotemEdit';
import { PageList } from '../TotemEdit/Components';
import _ from 'lodash';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const dummyData = {
  name: 'DD007',
  client: 1,
  branch: 1,
  activatePages: false,
  branch_data: {
    name: ''
  }
};

const clientOptions = [createOption('Client1', 1), createOption('Client2', 2)];

const branchOptions = [createOption('Branch1', 1), createOption('Branch2', 2)];

const requiredMsg = intlExt.formatMessage(formMessages.required);

const schemaDisplay = yup.object().shape({
  name: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, intlExt.formatMessage(formMessages.onlyLetters))
    .max(60),
  //.required(requiredMsg),
  client: yup.number(),
  //.required(requiredMsg),
  branch: yup.number(),
  //.required(requiredMsg),
  activatePages: yup.bool()
});

export const TotemDetail = ({
  totemId = 0,
  visible,
  onClose,
  onAccept
}) => {
  const { getBranchs, getClients } = useApi();

  const {
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
    totemType
  } = useTotemEdit({ totemId, onAccept });

  const classes = useStyles();
  const TotemEditStyles = DisplaysStyles();
  const formClasses = useFormStyles();
  const axios = useAxios();

  useEffect(async () => {
    loadTotem(totemId);
  }, [totemId]);

  async function loadTotem(totemId) {
    if (!totemId) return;
    if (totemId === 0) return;

    try {
      const totemResponse = await axios.get(
        `/totem/${totemId}`
      );
      const totem = _.get(
        totemResponse,
        'data.result.items[0]',
        {}
      );
      formik.setFieldValue('client', totem.client_id);
      formik.setFieldValue('name', totem.name);
      formik.setFieldValue('activatePages', totem.activatePages);
      formik.setFieldValue('branch', totem.branch_name);
      if (totem.products) setProducts(totem.products);
    } catch (error) {
      console.log({ error });
    }
  }


  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={onClose}
      title="Tótem"
      className={TotemEditStyles.root}
      disabledAccept={true}
      showButtonCancel={false}
      useScroll={true}
    >
      <TextField
        label="Nombre o ID"
        name="name"
        placeholder="Ej.DD000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        className={formClasses.disable}
        onChange={formik.handleChange}
        value={formik.values.name}
        disabled={true}
      />
      <TextField
        label="Cliente"
        name="client"
        placeholder="Ej.DD000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.client && formik.errors.client}
        className={formClasses.disable}
        onChange={formik.handleChange}
        value={
          clients.find((x) => x.value === formik.values.client)
            ? clients.find((x) => x.value === formik.values.client).label
            : ''
        }
        disabled={true}
      />
      <TextField
        label="Sucursal"
        name="branch"
        placeholder="Ej.DD000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.branch && formik.errors.branch}
        className={formClasses.disable}
        onChange={formik.handleChange}
        value={formik.values.branch === undefined ? '' : formik.values.branch}
        disabled={true}
      />

      <FormControl component="fieldset">
        <RadioGroup row aria-label="gender" name="row-radio-buttons-group" className={TotemEditStyles.radioButton}>
          <FormControlLabel control={<Radio name='validity_type' value={"inactive"} checked={totemType === 1 ? true : false} size="medium"/>} label="Tótem de piso" />
        </RadioGroup>
      </FormControl>

      <h2 className={TotemEditStyles.subtitle}>
        Productos para solicitud de compra
      </h2>
      {/* <h2 className={TotemEditStyles.legend}>
        Completa la siguiente información para generar un nuevo registro de
        usuario.
      </h2> */}

      <h2 className={TotemEditStyles.permissions}>Páginas.</h2>
      <h2 className={TotemEditStyles.legend}>
        Muestra la cantidad de páginas que se visualizarán en el display.
      </h2>

      <h2 className={TotemEditStyles.legend}>
        Recuerda que la página 1 será la primera en visualizarse por lo tanto se
        recomienda agregar los productos que se desean poner a primera vista o
        con mayor relevancia.
      </h2>
      <PageList
        addPage={addPage}
        deletePage={deletePage}
        products={products}
        listPages={listPages}
        onChangeDigitalProducts={onChangeDigitalProducts}
        edit={false}
        editableForm={true}
        totemType={totemType}
      ></PageList>
    </DrawerModal>
  );
};
