import React from 'react';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages, Images } from 'assets';
import { ContentRelocator } from 'components/ContentRelocator';
import { useTheme } from 'hooks/useTheme';
import Grid from '@material-ui/core/Grid';
import { usePedingRequestForm } from './usePendingRequestForm';
import { messages } from './PendingRequestFormMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import { TextField, FormControlLabel, MenuItem } from '@material-ui/core';
import { CheckBoxStyle, useStyles } from './PendingRequestFormStyles';
import Button from 'components/Button';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ProductForm } from './Components/ProductForm';
import IconButton from '@material-ui/core/IconButton';
import { DigitalDisplayIcons } from 'assets';

export const PendingRequestForm = (props) => {
  const { currentTheme } = useTheme();
  const pendingRequestId = props.match.params.id;
  const classes = useStyles({ currentTheme });

  const msgs = useIntlMessages(messages);

  const {
    clientsOptions,
    regionsOptions,
    branchesOptions,
    formik,
    handleDateChange,
    branchSearch,
    setBranchSearch,
    handleBranchChange,
    handleBranchIdChange,
    discardTicket,
    isValidate,
    isUsedTicket,
    pendingRequestData,
    handleCleanForm,
    productsList,
    addProduct,
    quitProduct,
    changeValueJSONProduct,
    disabledAccept,
    saveProducts,
    redirectPendinRequestList
  } = usePedingRequestForm({ pendingRequestId });
  return (
    <div>
      <NestcaPageHeader
        title={msgs.pageTitle}
        count={'Usuario ' + pendingRequestData.customer_phone}
        Icon={
          currentTheme.themeDark
            ? Pages.LoadPointsPageIconDark
            : Pages.LoadPointsPageIcon
        }
        showGoBack={true}
        goBack={redirectPendinRequestList}
      />
      <ContentRelocator>
        <Grid container spacing={0}>
          <Grid item xs={3} className={classes.mainContainerImage}>
            <TransformWrapper centerOnInit={true}>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div className={classes.cardContainerImage}>
                  <TransformComponent>
                    <img
                      src={`${pendingRequestData.image_url}`}
                      alt="image_ticket"
                      className={classes.imageConfig}
                    />
                  </TransformComponent>
                  <div className={classes.buttonsZoomContainer}>
                    <IconButton
                      onClick={() => {
                        zoomOut();
                      }}
                      component="span"
                    >
                      <img src={Images.ZoomOut} alt={'zoomOut'} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        zoomIn();
                      }}
                      component="span"
                    >
                      <img src={Images.ZoomIn} alt={'zoomIn'} />
                    </IconButton>
                  </div>
                </div>
              )}
            </TransformWrapper>
          </Grid>
          <Grid item xs={4} className={classes.maincontainerForm}>
            <FormControlLabel
              style={{ marginTop: '5px' }}
              control={
                <CheckBoxStyle
                  checked={formik.values.is_connection}
                  onChange={formik.handleChange}
                  name="is_connection"
                  disabled={isValidate}
                />
              }
              className={classes.checkboxLabel}
              label={msgs.ClientConnectionCheckboxLabel}
            />
            {!formik.values.is_connection ? (
              <Autocomplete
                freeSolo
                value={formik.values.branch_id_origin}
                onBlur={(e) => {
                  formik.setFieldTouched('branch_name_origin');
                }}
                onChange={(event, newValue) => {
                  handleBranchChange(newValue);
                }}
                inputValue={branchSearch}
                onInputChange={(event, newInputValue) => {
                  handleBranchChange(newInputValue);
                  setBranchSearch(newInputValue);
                }}
                disableClearable
                noOptionsText={'No se encontraron resultados'}
                name={'branch_name_origin'}
                options={branchesOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={msgs.dataBranchOffline}
                    placeholder={'Ej. costco'}
                    variant="filled"
                    margin="dense"
                    style={{ minHeight: 24 }}
                    helperText={
                      formik.touched.branch_name_origin &&
                      formik.errors.branch_name_origin
                    }
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true
                    }}
                  />
                )}
                className={classes.textSearchField}
                disabled={isValidate}
              />
            ) : (
              <div style={{ display: 'grid' }}>
                <TextField
                  select
                  label={msgs.dataOriginNameClient}
                  name="client_id_origin"
                  placeholder="Seleccionar"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    formik.touched.client_id_origin &&
                    formik.errors.client_id_origin
                  }
                  className={classes.textField}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.setFieldTouched('client_id_origin');
                  }}
                  value={formik.values.client_id_origin}
                  disabled={isValidate}
                >
                  {clientsOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label={msgs.dataOriginRegion}
                  name="region_id_origin"
                  placeholder="Seleccionar"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    formik.touched.region_id_origin &&
                    formik.errors.region_id_origin
                  }
                  className={classes.textField}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.setFieldTouched('region_id_origin');
                  }}
                  value={formik.values.region_id_origin}
                  disabled={isValidate}
                >
                  {regionsOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Autocomplete
                  value={formik.values.branch_id_origin}
                  onBlur={(e) => {
                    formik.setFieldTouched('branch_id_origin');
                  }}
                  onChange={(event, newValue) => {
                    handleBranchIdChange(newValue);
                  }}
                  inputValue={branchSearch}
                  onInputChange={(event, newInputValue) => {
                    setBranchSearch(newInputValue);
                  }}
                  disableClearable
                  noOptionsText={'No se encontraron resultados'}
                  name={'branch_id_origin'}
                  options={branchesOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Seleccionar"
                      label={msgs.dataOriginBranch}
                      variant="filled"
                      margin="dense"
                      style={{ minHeight: 24 }}
                      helperText={
                        formik.touched.branch_id_origin &&
                        formik.errors.branch_id_origin
                      }
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true
                      }}
                    />
                  )}
                  className={classes.textSearchField}
                  disabled={
                    isValidate
                      ? true
                      : formik.values.client_id_origin &&
                        formik.values.region_id_origin
                      ? false
                      : true
                  }
                />
              </div>
            )}

            <h2 className={classes.subtitle}>{msgs.ValidationDataTitle}</h2>

            <div className="row" style={{ margin: '15px 0px 0px 0px' }}>
              <div className={`${classes.dateTicketLabel} col-md-4`}>
                {msgs.dataDateTicket}
              </div>
              <div className="col-md-8" style={{ padding: '0px' }}>
                <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                  <DatePicker
                    clearable={true}
                    okLabel="Aceptar"
                    clearLabel="Limpiar"
                    cancelLabel="Cancelar"
                    name="ticket_date"
                    value={formik.values.ticket_date}
                    onChange={(date) => {
                      handleDateChange(date);
                      formik.setFieldTouched('ticket_date');
                    }}
                    className={classes.datepicker}
                    helperText={
                      formik.touched.ticket_date && formik.errors.ticket_date
                    }
                    variant={'dialog'}
                    maxDate={new Date()}
                    placeholder={'DD/MM/YYYY'}
                    format="dd/MM/yyyy"
                    InputProps={{
                      disableUnderline: true
                    }}
                    disabled={isValidate}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>

            <TextField
              label={msgs.dataFolioTicket}
              placeholder={'Ej. 0000000000'}
              name="ticket_folio"
              variant="filled"
              margin="dense"
              InputProps={{ disableUnderline: true }}
              helperText={
                formik.touched.ticket_folio && formik.errors.ticket_folio
              }
              className={classes.textField}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldTouched(e.target.name);
              }}
              onBlur={(e) => {
                formik.setFieldTouched('ticket_folio');
              }}
              value={formik.values.ticket_folio}
              disabled={isValidate}
              inputProps={{ maxLength: 50 }}
            />

            {isValidate ? (
              <div className="row" style={{ margin: '20px 0px 0px 0px' }}>
                <div className={`${classes.lblUsedTicket} col-md-12`}>
                  <Button
                    className={classes.mainButton}
                    onClick={(e) => {
                      handleCleanForm();
                    }}
                  >
                    {msgs.buttonEdit}
                  </Button>
                  {isUsedTicket ? msgs.usedTicketLbl : msgs.noUsedTicketLbl}
                </div>
              </div>
            ) : (
              <div className="row" style={{ margin: '20px 0px 0px 0px' }}>
                <div className={`${classes.lblUsedTicket} col-md-12`}>
                  <Button
                    className={classes.mainButton}
                    onClick={(e) => {
                      formik.handleSubmit(e);
                    }}
                    style={{ marginTop: 20 }}
                    disabled={!formik.isValid}
                  >
                    {msgs.buttonValidate}
                  </Button>
                  {isUsedTicket ? msgs.usedTicketLbl : ""}
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={5} style={{ display: 'flex' }}></Grid>
        </Grid>
        {isValidate && !isUsedTicket ? (
          <div>
            <h2 className={classes.subtitle}>{msgs.ProductDataTitle}</h2>
            {productsList.length === 0 && (
              <IconButton onClick={addProduct}>
                <img
                  alt="Add_Page_Icon"
                  src={DigitalDisplayIcons.AddPageIcon}
                />
              </IconButton>
            )}
            {productsList.map((item, index) => (
              <ProductForm
                key={index}
                numberProduct={index}
                offline={!formik.values.is_connection}
                dataProduct={item}
                handleAddProduct={addProduct}
                handleQuitProduct={quitProduct}
                optionAdd={index === productsList.length - 1 ? true : false}
                handleChangeValueJSONProduct={changeValueJSONProduct}
              />
            ))}
          </div>
        ) : null}

        <div className="row">
          <div className={`${classes.buttonsContainer} col-md-12`}>
            <Button
              className={classes.mainButton}
              onClick={(e) => {
                saveProducts();
              }}
              disabled={
                isValidate ? (isUsedTicket ? true : disabledAccept) : true
              }
            >
              {msgs.buttonAccept}
            </Button>
            {isValidate ? (
              <Button
                onClick={() => {
                  redirectPendinRequestList();
                }}
              >
                {msgs.buttonCancel}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  discardTicket();
                }}
              >
                {msgs.buttonDiscardTicket}
              </Button>
            )}
          </div>
        </div>
      </ContentRelocator>
    </div>
  );
};
