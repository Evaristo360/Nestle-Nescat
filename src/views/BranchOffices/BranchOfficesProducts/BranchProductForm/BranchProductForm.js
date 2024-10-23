import React, { useState } from 'react';
import moment from 'moment';
import { TextField, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import DrawerModal from 'components/DrawerModal';
import { useStyles } from './BranchProductFormStyles';
import { useFormStyles } from 'hooks/useFormStyles';
import { useBranchProduct } from './useBranchProductFormRead';
import { messages } from './BranchProductFormMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';

export const BranchProductForm = ({
  branchOfficeId,
  branchProductId,
  visible,
  onClose,
  onAccept
}) => {
  const msgs = useIntlMessages(messages);
  const classes = useStyles();
  const formClasses = useFormStyles();
  const {
    formik,
    labelsPrices
  } = useBranchProduct({ branchOfficeId, branchProductId, onAccept });

  const [expanded, setExpanded] = useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  

  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={onAccept}
      title={formik.values.name}
      className={classes.root}
      disabledAccept={true}
      useScroll={true}
    >
      <TextField
        label={msgs.dataDivision_name}
        name="division_name"
        placeholder=""
        variant="filled"
        margin="dense"
        disabled
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.division_name && formik.errors.division_name}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.division_name}
      />

      <TextField
        label={msgs.dataCategory_name}
        name="category_name"
        placeholder=""
        variant="filled"
        margin="dense"
        disabled
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.category_name && formik.errors.category_name}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.category_name}
      />

      <TextField
        label={msgs.dataMaterial_group_name}
        name="material_group_name"
        placeholder=""
        variant="filled"
        margin="dense"
        disabled
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.material_group_name && formik.errors.material_group_name}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.material_group_name}
      />

      <TextField
        label={msgs.dataDescription}
        name="description"
        placeholder=""
        variant="filled"
        margin="dense"
        disabled
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.description && formik.errors.description}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.description}
      />

      <TextField
        label={msgs.dataFormat_equivalence}
        name="format_equivalence"
        placeholder=""
        variant="filled"
        margin="dense"
        disabled
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.format_equivalence && formik.errors.format_equivalence}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.format_equivalence}
      />

      <TextField
        label={msgs.dataSKU}
        name="sku"
        placeholder=""
        variant="filled"
        margin="dense"
        disabled
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.sku && formik.errors.sku}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.sku}
      />
      
      <TextField
        label={msgs.dataCode_sap}
        name="code_sap"
        placeholder=""
        variant="filled"
        margin="dense"
        disabled
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.code_sap && formik.errors.code_sap}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.code_sap}
      />
      <Accordion className={classes.accordionMainContainer} expanded={expanded === 'option1'} onChange={handleChange('option1')}>
        <AccordionSummary className={classes.accordionHeaderContainer}  aria-controls="option1d-content" id="option1d-header">
          <h2 className={classes.subtitle}>
            {msgs.dataProductStandarTitle}
          </h2>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetailContainer}>
          <TextField
            label={msgs.dataProduct_code}
            name="product_code"
            placeholder=""
            variant="filled"
            margin="dense"
            disabled
            InputProps={{ disableUnderline: true }}
            helperText={formik.touched.product_code && formik.errors.product_code}
            className={formClasses.textField}
            onChange={formik.handleChange}
            value={formik.values.product_code}
          />
          <TextField
            label={msgs.dataProduct_name}
            name="product_name"
            placeholder=""
            variant="filled"
            margin="dense"
            disabled
            InputProps={{ disableUnderline: true }}
            helperText={formik.touched.product_name && formik.errors.product_name}
            className={formClasses.textField}
            onChange={formik.handleChange}
            value={formik.values.product_name}
          />

          {formik.values.prices.map( (price, index) => (
              <div key={index} style={{display:"grid"}}>
                <TextField
                    label={labelsPrices[index].priceLabel}
                    name="price"
                    placeholder=""
                    variant="filled"
                    margin="dense"
                    disabled
                    InputProps={{ disableUnderline: true }}
                    className={formClasses.textField}
                    value={ Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',minimumFractionDigits:2,maximumFractionDigits:2}).format(price.price) }
                />

                <TextField
                    label={labelsPrices[index].scaleLabel}
                    name="price"
                    placeholder=""
                    variant="filled"
                    margin="dense"
                    disabled
                    InputProps={{ disableUnderline: true }}
                    className={formClasses.textField}
                    value={(formik.values.prices.length > (index + 1) ? price.lowe_limit + " - " + (formik.values.prices[index+1].lowe_limit - 1) :  price.lowe_limit) + " pz"}
                />
            </div>

          ))}

          <TextField
                label={msgs.dataProduct_barcode}
                name="product_code"
                placeholder=""
                variant="filled"
                margin="dense"
                disabled
                InputProps={{ disableUnderline: true }}
                className={formClasses.textField}
                value={formik.values.product_code}
          />

          <TextField
              label={msgs.dataPieces_per_box}
              name="pieces_per_box"
              placeholder=""
              variant="filled"
              margin="dense"
              disabled
              InputProps={{ disableUnderline: true }}
              className={formClasses.textField}
              value={formik.values.pieces_per_box}
          />
        </AccordionDetails>
      </Accordion>
      {
        formik.values.promo
        ?
        <Accordion className={classes.accordionMainContainer} expanded={expanded === 'option2'} onChange={handleChange('option2')}>
          <AccordionSummary className={classes.accordionHeaderContainer} aria-controls="option2d-content" id="option2d-header">
            <h2 className={classes.subtitle}>
              {msgs.dataProductPromosTitle}
            </h2>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetailContainer}>
            <TextField
              label={msgs.dataProduct_code}
              name="product_code"
              placeholder=""
              variant="filled"
              margin="dense"
              disabled
              InputProps={{ disableUnderline: true }}
              helperText={formik.touched.product_code && formik.errors.product_code}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={formik.values.product_code}
            />
            <TextField
              label={msgs.dataLower_limit}
              name="lower_limit"
              placeholder=""
              variant="filled"
              margin="dense"
              disabled
              InputProps={{ disableUnderline: true }}
              helperText={formik.touched.promo && formik.errors.promo}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={formik.values.promo.lower_limit}
            />
            <TextField
              label={msgs.dataUpper_limit}
              name="upper_limit"
              placeholder=""
              variant="filled"
              margin="dense"
              disabled
              InputProps={{ disableUnderline: true }}
              helperText={formik.touched.promo && formik.errors.promo}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={formik.values.promo.upper_limit}
            />

            <TextField
              label={msgs.dataPrice}
              name="promo_price"
              placeholder=""
              variant="filled"
              margin="dense"
              disabled
              InputProps={{ disableUnderline: true }}
              helperText={formik.touched.promo && formik.errors.promo}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',minimumFractionDigits:2,maximumFractionDigits:2}).format(formik.values.promo.price)}
            />
          
            <TextField
              label={msgs.dataPrice_validity_start}
              name="price_validity_start"
              placeholder=""
              variant="filled"
              margin="dense"
              disabled
              InputProps={{ disableUnderline: true }}
              helperText={formik.touched.promo && formik.errors.promo}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={moment(formik.values.promo.price_validity_start).format('DD-MM-YYYY')}
            />

            <TextField
              label={msgs.dataPrice_validity_end}
              name="price_validity_end"
              placeholder=""
              variant="filled"
              margin="dense"
              disabled
              InputProps={{ disableUnderline: true }}
              helperText={formik.touched.promo && formik.errors.promo}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={moment(formik.values.promo.price_validity_end).format('DD-MM-YYYY')}
            />
          </AccordionDetails>
        </Accordion>
        :null
      }
    </DrawerModal>
  );
};
