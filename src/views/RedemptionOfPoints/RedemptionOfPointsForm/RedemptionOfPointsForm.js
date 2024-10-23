import React, { useEffect, useReducer, useState } from 'react';
import DrawerModal from 'components/DrawerModal';
import { TextField, FormControlLabel, MenuItem } from '@material-ui/core';
import {
  CheckBoxStyle,
  useStyles as RedemptionOfPointsFormStyles
} from './RedemptionOfPointsFormStyles';
import { useFormStyles } from 'hooks/useFormStyles';
import { useRedemptionOfPointsForm } from './useRedemptionOfPointsForm';
import { messages } from './RedemptionOfPointsFormMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import ProductImageInput from 'components/Inputs/ProductImageInput';
import DateFnsUtils from '@date-io/date-fns';
import { es } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';

import CancelOkModal from 'components/CancelOkModal';
export const RedemptionOfPointsForm = ({
  redemptionId,
  visible,
  onClose,
  onAccept,  
  editableForm
}) => {
  const msgs = useIntlMessages(messages);
  const redemptionOfPointsFormStyles = RedemptionOfPointsFormStyles();
  const formClasses = useFormStyles();
  const {
    loadImageProduct,
    handleDateChange,
    divisionOptions,
    categoryOptions,
    materialGroupOptions,
    productListOptions,
    formik,
    showMessageError,
    setShowMessageError,
    messageErrorTittle,
    messageErrorBody,
  } = useRedemptionOfPointsForm({ redemptionId, onAccept, editableForm });

  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={(e)=>{formik.submitForm(e)}}
      title={redemptionId == 0 ? msgs.titleCreate : formik.values.name_product}
      className={redemptionOfPointsFormStyles.root}
      disabledAccept={true}
      useScroll={true}
    >
      <CancelOkModal
        visible={showMessageError}
        onCancel={()=>{setShowMessageError(false)}}
        onAccept={()=>{setShowMessageError(false)}}
        title={messageErrorTittle}
        text={messageErrorBody}
      />
      <h2 className={redemptionOfPointsFormStyles.subtitleText}>
        {msgs.subtitleText}
      </h2>

      <h2 className={redemptionOfPointsFormStyles.subtitle}>
        {msgs.ProductDataTitle}
      </h2>

      <ProductImageInput
        showText={false}
        edit={true}
        description={editableForm}
        name="product_image"
        limitMB={5}
        message={msgs.maxSizeImage || msgs.invalidTypeImage}
        value={formik.values.product_image}
        onChange={loadImageProduct}
      />

      <FormControlLabel
        style={{marginTop:'25px'}}
        control={
          <CheckBoxStyle
            checked={formik.values.is_nestle}
            onChange={formik.handleChange} 
            name="is_nestle" 
            disabled={editableForm}
          />
        }
        className={redemptionOfPointsFormStyles.checkboxLabel}
        label={msgs.ProductNestleCheckboxLabel}
      />

      {formik.values.is_nestle ?
      
      <div style={{display:"grid"}}>
         <TextField
          select
          label={msgs.dataDivision}
          name="division"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.division && formik.errors.division}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.division}
          disabled={editableForm}
        >
          {divisionOptions.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))} 
        </TextField>

        <TextField
          select
          label={msgs.dataCategory}
          name="category"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.category && formik.errors.category}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.category}
          disabled={editableForm}
        >
          {categoryOptions.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={msgs.dataMaterialGroup}
          name="materialGroup"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.materialGroup && formik.errors.materialGroup}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.materialGroup}
          disabled={editableForm}
        >
          {materialGroupOptions.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={msgs.dataDescription}
          name="description"
          placeholder=""
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.description && formik.errors.description}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.description}
          disabled={editableForm}
        >
           {productListOptions.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

      </div>
      :null}
      <TextField
        label={msgs.dataProductName}
        name="name_product"
        placeholder="Ej. NESCAFÉ® Decaf®"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name_product && formik.errors.name_product}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.name_product}
        disabled={editableForm ? true : formik.values.is_nestle}
      />

      <TextField
        label={formik.values.is_nestle ? msgs.dataEquivalencePointPerPiece : msgs.dataEquivalencePoint}
        name="equivalence_points"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.equivalence_points && formik.errors.equivalence_points}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.equivalence_points}
        disabled={editableForm}
      />

      <h2 className={redemptionOfPointsFormStyles.subtitle}>
        {msgs.SpecialCodeTitle}
      </h2>

      <TextField
        label={msgs.SpecialCodeTitle}
        name="special_barcode"
        placeholder="Ej. 000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.special_barcode && formik.errors.special_barcode}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.special_barcode}
        disabled={editableForm}
      />

      <h2 className={redemptionOfPointsFormStyles.subtitle}>
        {msgs.dataValidity}
      </h2>

      <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
        <DatePicker 
        clearable={true}
        okLabel="Aceptar"
        clearLabel="Limpiar"
        cancelLabel="Cancelar"
        name="validity" 
        value={formik.values.validity} 
        onChange={handleDateChange} 
        className={redemptionOfPointsFormStyles.datepicker}
        helperText={formik.touched.validity && formik.errors.validity}
        variant={"dialog"}
        minDate={new Date()}
        placeholder={"DD/MM/YYYY"}
        format="dd/MM/yyyy"
        InputProps={{
          disableUnderline: true,
         }}
        disabled={editableForm}
        invalidDateMessage={"Fecha inválida"}
        />
      </MuiPickersUtilsProvider>

      <h2 className={redemptionOfPointsFormStyles.subtitle}>
        {msgs.dataGlobalCategory}
      </h2>

      <TextField
          select
          label={msgs.dataGlobalCategory}
          name="category_redeem"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.category_redeem && formik.errors.category_redeem}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={0||formik.values.category_redeem}
          disabled={editableForm}
        >
          <MenuItem value={"productos"}>
            {msgs.products}
          </MenuItem>
          <MenuItem value={"cupones"}>
            {msgs.coupons}
          </MenuItem>
          <MenuItem value={"descuentos"}>
            {msgs.discounts}
          </MenuItem>
          <MenuItem value={"experiencias"}>
            {msgs.experiences}
          </MenuItem>
          <MenuItem value={"otros"}>
            {msgs.others}
          </MenuItem>

        </TextField>
    </DrawerModal>
  );
};
