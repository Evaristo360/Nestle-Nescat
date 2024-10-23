import React, { useState, useEffect } from 'react';
import { style } from './ProductDescriptionStyles.css';
import _ from 'lodash-es';
import { useFormStyles } from 'hooks/useFormStyles';
import ProductImageInput from 'components/Inputs/ProductImageInput';
import Button from 'components/Button';
import { Grid, Drawer, TextField } from '@material-ui/core';
import { EquivalentProductCreate } from '../EquivalentProductCreate/EquivalentProductCreate';

import { config } from 'providers/config';
import {getProduct} from 'providers/api/requests';

const createInitState = {
  // name: '',
  points: 0,
  division_name: '',
  category_name: '',
  material_group_name: '',
  description: '',
  //division: '',
  //category: '',
  //material_group: '',
  format_equivalence_name: '',
  SKU: '',
  code_SAP: '',
  barcode_piece: '',
  barcode_box: '',
  user_image: null,
  user_image_size: 0,
  user_image_type: '',
};

const productInitState = {
  // name: '',
  points: 0,
  division_name: '',
  category_name: '',
  material_group_name: '',
  description: '',
  format_equivalence_name: '',
  SKU: '',
  code_SAP: '',
  barcode_piece: '',
  barcode_box: '',
  user_image: null,
  user_image_size: 0,
  user_image_type: ''
};


export const ProductDescription = ({ visible, onClose, productData, successAccept }) => {
  const formClass = useFormStyles();
  const [reset, setReset] = useState(false);
  const [userValues, setUserValues] = useState(createInitState);
  const classes = style();
  const [showProfileEquivalent, setShowEquivalent] = useState(false);
  const [productInfo, setproductInfo] = useState(productInitState);

  const openEquivalent = () => {
    setproductInfo(userValues);
    setShowEquivalent(!showProfileEquivalent);
    setReset(!reset);
  };

  const closeEquivalent = () => {
    setShowEquivalent(!showProfileEquivalent);
    setReset(!reset);
  };

  const createdEquivalent = () => {
    setShowEquivalent(!showProfileEquivalent);
    setReset(!reset);
    successAccept();
  };

  useEffect(async() => {  
      if(productData !== 0 && productData){
        let response = await getProduct(productData)
        let productResponse = response ? response.items[0] : {};
        setUserValues(productResponse);
      }else {
        setUserValues(createInitState);
      }
  }, [productData]);
  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={onClose}
      className={classes.root}
    >
      <EquivalentProductCreate
        visible={showProfileEquivalent}
        onClose={closeEquivalent}
        productInfo={productInfo}
        reset={reset}
        successAccept={createdEquivalent}
        productId={productData}
      />
      <h1 className={classes.title}>{userValues.description}</h1>
      {/* <h2 className={classes.subtitle}>Selecciona la imagen del producto que se visualizará en los dispositivos tótem y digital display.</h2>
      <h3 className={classes.subtitle}>Recuerda que la imagen debe ser en formato PNG, con resolución mínima de 800 x 600 y debe pesar máximo 5MB.</h3> */}
      <ProductImageInput
        name="user_image"
        label="Imagen del producto"
        limitMB={5}
        value={userValues.image_url ? config.siteConfig.apiUrl + '/' + userValues.image_url : null}
        edit={false}
        description={true}
      />

      <h2 className={classes.data}>Datos del producto</h2>
      {/* Se quita el campo de Nombre, queda únicamente Descripción  06-12-2021 */}
      {/* <TextField
        label="Nombre del producto a mostrar"
        name="name"
        placeholder="Ej. NESCAFÉ decaf"
        variant="filled"
        margin="dense"
        value={userValues.description}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      /> */}

      <TextField
        label="Puntos de recompensa"
        name="points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        value={userValues.points}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <TextField
        label="División"
        name="points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        value={userValues.division_name}
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
        value={userValues.category_name}
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
        value={userValues.material_group_name}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <TextField
        label="Descripción breve del producto."
        name="description"
        variant="filled"
        margin="dense"
        value={userValues.description}
        InputProps={{ disableUnderline: true }}
        className={classes.description}
        multiline rows={6}
        autoFocus={true}
        disabled
      />

      <TextField
        label="Formato equivalente"
        name="points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        value={userValues.format_equivalence_name === undefined ? '' : userValues.format_equivalence_name}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <TextField
        label="SKU"
        name="SKU"
        placeholder="Ej. AA000000"
        variant="filled"
        margin="dense"
        value={userValues.sku === undefined ? '' : userValues.sku}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <TextField
        label="Material SAP"
        name="code_SAP"
        placeholder="Ej. 00000000"
        variant="filled"
        margin="dense"
        value={userValues.code_sap === undefined ? '' : userValues.code_sap}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <h2 className={classes.permissions}>Códigos del producto</h2>

      <TextField
        label="Código de barras pieza"
        placeholder="Ej. 0000000000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        disabled
        value={userValues.barcode_piece}
      />

      <TextField
        label="Código de barras caja"
        name="barcode_box"
        placeholder="Ej. 0000000000"
        variant="filled"
        margin="dense"
        value={userValues.barcode_box}
        InputProps={{ disableUnderline: true }}
        className={formClass.disable}
        autoFocus={true}
        disabled
      />

      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Button className={classes.saveButton} onClick={() => openEquivalent()} >Crear producto equivalente</Button>
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
