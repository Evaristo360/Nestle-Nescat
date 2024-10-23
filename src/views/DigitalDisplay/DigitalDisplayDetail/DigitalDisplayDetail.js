import React, { useEffect, useReducer, useState } from 'react';
import DrawerModal from 'components/DrawerModal';
import { TextField, FormControlLabel, MenuItem } from '@material-ui/core';
import { SelectV2, createOption } from 'components/SelectV2';
import { useStyles } from 'views/Profiles';
import { SwitchStyle, style as DisplaysStyles } from './DigitalDisplayStyles';
import { useFormStyles } from 'hooks/useFormStyles';
import useAxios from 'hooks/useAxios';
import { messages as formMessages } from './DigitalDisplayDetailMessages';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { useFormik } from 'formik';
import useApi from './api';
import { useDigitalDisplayEdit } from '../DigitalDisplayEdit/useDigitalDisplayEdit';
import { PageList } from '../DigitalDisplayEdit/Components';
import _ from 'lodash';

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

export const DigitalDisplayDetail = ({
  displayId = 0,
  visible,
  onClose,
  onAccept
}) => {
  const { getBranchs, getClients } = useApi();
  const [digitalDisplayData, setDigitalDisplayData] = useState({
    name: '',
    client: '',
    branch: '',
  });

  const {
    onChangeDigitalProducts,
    formik,
    addPage,
    deletePage,
    clients,
    listPages,
    products,
    setProducts
  } = useDigitalDisplayEdit({ displayId, onAccept });

  const DigitalDisplayEditStyles = DisplaysStyles();
  const formClasses = useFormStyles();
  const axios = useAxios();

  useEffect(async () => {
    loadDigitalDisplay(displayId);
  }, [displayId]);

  async function loadDigitalDisplay(displayId) {
    if (!displayId) return;
    if (displayId === 0) return;

    try {
      const digitalDisplayResponse = await axios.get(
        `/digital-display/${displayId}`
      );
      const digitalDisplay = _.get(
        digitalDisplayResponse,
        'data.result.items[0]',
        {}
      );
      let Data = {
        name: digitalDisplay.name,
        client: digitalDisplay.client_name,
        branch: digitalDisplay.branch_name,
      }
      // formik.setFieldValue('client', digitalDisplay.client_id);
      // formik.setFieldValue('name', digitalDisplay.name);
      formik.setFieldValue('activatePages', digitalDisplay.activatePages);
      // formik.setFieldValue('branch', digitalDisplay.branch_name);
      if (digitalDisplay.products) setProducts(digitalDisplay.products);
      setDigitalDisplayData(Data);
    } catch (error) {
      console.log({ error });
    }
  }


  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={onClose}
      title="Display"
      className={DigitalDisplayEditStyles.root}
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
        value={digitalDisplayData.name}
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
        value={digitalDisplayData.client}
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
        value={digitalDisplayData.branch}
        disabled={true}
      />

      <h2 className={DigitalDisplayEditStyles.subtitle}>
        Productos para solicitud de compra
      </h2>
      {/* <h2 className={DigitalDisplayEditStyles.legend}>
        Completa la siguiente información para generar un nuevo registro de
        usuario.
      </h2> */}

      <h2 className={DigitalDisplayEditStyles.permissions}>Páginas.</h2>
      <h2 className={DigitalDisplayEditStyles.legend}>
        Muestra la cantidad de páginas que se visualizarán en el display.
      </h2>

      <h2 className={DigitalDisplayEditStyles.legend}>
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
      ></PageList>
    </DrawerModal>
  );
};
