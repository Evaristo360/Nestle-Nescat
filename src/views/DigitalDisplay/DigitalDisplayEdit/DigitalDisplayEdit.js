import React, { useEffect, useReducer, useState } from 'react';
import DrawerModal from 'components/DrawerModal';
import { TextField, FormControlLabel, MenuItem, Button, Grid } from '@material-ui/core';
import {
  SwitchStyle,
  useStyles as DisplaysStyles
} from './DigitalDisplayStyles';
import { useFormStyles } from 'hooks/useFormStyles';
import { useDigitalDisplayEdit } from './useDigitalDisplayEdit';
import { PageList } from './Components';
import { messages } from './DigitalDisplayEditMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';

export const DigitalDisplayEdit = ({
  displayId,
  visible,
  onClose,
  onAccept,
  editableForm,
  assignDisplay = false,
  toggleUpdate = () => {},
}) => {
  const msgs = useIntlMessages(messages);
  const DigitalDisplayEditStyles = DisplaysStyles();
  const formClasses = useFormStyles();
  const {
    onChangeDigitalProducts,
    formik,
    addPage,
    deletePage,
    digitalDisplayData,
    setDigitalDisplayData,
    clients,
    setClients,
    branchs,
    setBranchs,
    listPages,
    setlistPages,
    products,
    setProducts,
    clientSelect,
    searchProduct,
    setSearchProduct,
    isLoadProducts,
    LoadAllProducts
} = useDigitalDisplayEdit({ displayId, onAccept, toggleUpdate });
  
  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={(e)=>{formik.submitForm(e)}}
      title={msgs.title}
      className={DigitalDisplayEditStyles.root}
      disabledAccept={true}
      useScroll={true}
    >
      <TextField
        label={msgs.dataID}
        disabled
        name="name"
        placeholder="Ej.DD000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        className={formClasses.disable}
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <TextField
        select
        disabled={editableForm}
        label={msgs.dataClient}
        name="client_id"
        placeholder="Seleccionar"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.client_id && formik.errors.client_id}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.client_id}
      >
        {clients.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        disabled={editableForm}
        label={msgs.dataSucursal}
        name="branch_id"
        placeholder="Seleccionar"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.branch_id && formik.errors.branch_id}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.branch_id}
      >
        {branchs.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>

      <h2 className={DigitalDisplayEditStyles.subtitle}>
        {msgs.subtitleProducts}
      </h2>

      <FormControlLabel
        control={
          <SwitchStyle
            disabled={editableForm ? true : clientSelect ? (clientSelect.connection ? false : true) : false}
            checked={formik.values.purchaseRequest}
            onChange={formik.handleChange}
            name={'purchaseRequest'}
          />
        }
        label={
          <h2 className={DigitalDisplayEditStyles.switchLabel}>
            Habilitar solicitud de compras
          </h2>
        }
      />

      { assignDisplay && (
          <Grid container spacing={2} style={{marginTop:30}}>
            <Grid item xs={12} sm={6}>
              <h2 className={DigitalDisplayEditStyles.subtitle} style={{marginTop:0}}>
                {msgs.subtitleAssignProducts}
              </h2>
            </Grid>
            <Grid item xs={12} sm={6}>
            { formik.values.purchaseRequest &&
              (
                <Button
                  fullWidth
                  className={DigitalDisplayEditStyles.button}
                  onClick={() => {
                    LoadAllProducts();
                  }}
                >
                  {msgs.buttonLoadProducts}
                </Button>
              )
            }
            </Grid>
          </Grid>
        )
      }
      
      
      <h2 className={DigitalDisplayEditStyles.permissions}>{assignDisplay ? 'Páginas.' : null}</h2>
      <h2 className={DigitalDisplayEditStyles.legend}>
        {assignDisplay ? 'Muestra la cantidad de páginas que se visualizarán en el display.' : null}
      </h2>

      <h2 className={DigitalDisplayEditStyles.legend}>
        {assignDisplay ? 'Recuerda que la página 1 será la primera en visualizarse por lo tanto se recomienda agregar los productos que se desean poner a primera vista o con mayor relevancia.' : null}
      </h2>

      {formik.values.purchaseRequest 
      ?
        <div>
          <PageList
            editableForm={editableForm}
            addPage={addPage}
            deletePage={deletePage}
            products={products}
            listPages={listPages}
            onChangeDigitalProducts={onChangeDigitalProducts}
            search={searchProduct}
            handleSearch={setSearchProduct}
          ></PageList>
        </div>
      :null
      }
    </DrawerModal>
  );
};
