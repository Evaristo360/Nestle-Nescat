import React from 'react';
import { NestleAnalytics as Icons } from 'assets';
import { useNestleAnalyticsStyle } from './NestleAnalyticsStyles';
import { useMyInfo } from 'hooks/useMyInfo';
import { role_names } from 'providers';
import { ContentRelocator } from 'components/ContentRelocator';
import Grid from '@material-ui/core/Grid';
import { CardInfo } from './components/CardInfo';
import { useTheme } from 'hooks/useTheme';
import { useNestleAnalytics } from './useNestleAnalytics';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { TopOptions } from './components/TopOptions';
import { PieChartGender } from './components/PieChartGender';
import { PieChartYears } from './components/PieChartYears';
import { Emotion } from './components/Emotion';
import InputCalendar from 'components/InputCalendar';
import { TextField, MenuItem, Icon } from '@material-ui/core';
import Button from 'components/Button';
import PieChartIcon from '@material-ui/icons/PieChart';

export const NestleAnalytics = () => {
  const { currentTheme } = useTheme();
  const classes = useNestleAnalyticsStyle({ currentTheme });
  const myInfo = useMyInfo();
  const {
    clientId,
      setClientId,
      branchId,
      setBranchId,
      deviceId,
      setDeviceId,
      clientOptions,
      branchesOptions,
      deviceOptions,
      redirectDetectionRegister,
      dateStart,
      dateEnd,
      setDateStart,
      setDateEnd,
      genderAndAge,
      antalyticsTotal,
      emotions,
      redeemProducts,
      loadProducts,
      purchaseRequest,
      resetValues
  } = useNestleAnalytics();
  return (
    <>
      <section className={classes.root}>

        
      <div className={classes.mainContent}>
        <div className="row">
          <div className="col-md">
            <PieChartIcon style={{color:"white",fontSize: 70}} />
            <Button className={classes.analyticsButton} onClick={redirectDetectionRegister}>Analytics</Button>
            <Button className={classes.detectionButton} onClick={redirectDetectionRegister}>Detección y registros</Button>
          </div>
        </div>

        <div className={classes.welcomeContainer}>
          <div className={classes.infoContainer}>
            <h2 className={classes.welcomeText}>Bienvenid@</h2>
            <h1 className={classes.welcomeText}>Nestlé México S.A De C.V.</h1>
          </div>
          <div  className={classes.infoContainer}>
            <p className={classes.initSession}>
              Has iniciado sesión como
              <strong> {role_names[myInfo.role]}</strong>
            </p>
            <p className={classes.yourStats}>
              Estas son tus estadísticas más recientes
            </p>
          </div>
        </div>
      </div>
      </section>
      <ContentRelocator>

        <Grid container spacing={8}>
          <Grid item sm={3}>
            <CardInfo 
              icon={currentTheme.themeDark ? Icons.usersDarkIconAnalytics : Icons.usersIconAnalytics} 
              title={"Usuarios registrados"}
              total={antalyticsTotal.users} />
          </Grid>
          <Grid item sm={3}>
            <CardInfo 
              icon={currentTheme.themeDark ? Icons.productsDarkIconAnalytics : Icons.productsIconAnalytics}  
              title={"Productos registrados"}
              total={antalyticsTotal.products} />
          </Grid>
          <Grid item sm={3}>
            <CardInfo 
              icon={currentTheme.themeDark ? Icons.interationsDarkIconAnalytics : Icons.interationsIconAnalytics}  
              title={"Total interacciones"}
              totalTitle={"Mes actual"}
              total={antalyticsTotal.interactions_current_month ? antalyticsTotal.interactions_current_month  : ""} 
              totalLastTitle={"Mes anterior"}
              totalLast={antalyticsTotal.interactions_last_month ? antalyticsTotal.interactions_last_month : ""}
            />
          </Grid>
          <Grid item sm={3}>
            <CardInfo 
              icon={currentTheme.themeDark ? Icons.branchesDarkIconAnalytics : Icons.branchesIconAnalytics} 
              title={"Sucursales registradas"}
              total={antalyticsTotal.branch_offices} />
          </Grid>
        </Grid>

        <div className="row" style={{margin:"20px 0px 20px 0px"}}>
            <div className="col-md">
              <div className="row" style={{height: '100%'}}>
                <div className={`${classes.dateContainer} col-md-6`}>
                  <InputCalendar
                    date={dateStart}
                    onChangeDate={setDateStart}
                    label="Fecha inicio:"
                    maxdate={dateEnd ? dateEnd : undefined}
                    className={classes.datepicker}
                    labelContainer={classes.dateTicketLabel}
                  ></InputCalendar>
                </div>
                <div className={`${classes.dateContainer} col-md-6`}>
                  <InputCalendar
                  date={dateEnd}
                  onChangeDate={setDateEnd}
                  label="Fecha Final:"
                  mindate={dateStart ? dateStart : undefined}
                  className={classes.datepicker}
                  labelContainer={classes.dateTicketLabel}
                  disabled={dateStart ? false : true}
                  ></InputCalendar>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="row">
                <div className="col-md">
                  <TextField
                    select
                    label={"Cliente"}
                    name="clientId"
                    placeholder="Seleccionar"
                    variant="filled"
                    margin="dense"
                    InputProps={{ disableUnderline: true }}
                    helperText={""}
                    className={classes.textField}
                    onChange={(value)=>{
                      setBranchId("");
                      setClientId(value.target.value);
                    }}
                    value={clientId}
                  >
                    {clientOptions.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))} 
                  </TextField>
                </div>
                <div className="col-md">
                  <TextField
                    select
                    label={"Sucursal"}
                    name="branchId"
                    placeholder="Seleccionar"
                    variant="filled"
                    margin="dense"
                    InputProps={{ disableUnderline: true }}
                    helperText={""}
                    className={classes.textField}
                    onChange={(value)=>{setBranchId(value.target.value)}}
                    value={branchId}
                    disabled={clientId ? false: true}
                  >
                    {branchesOptions.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))} 
                  </TextField>
                </div>
                <div className="col-md">
                  <TextField
                    select
                    label={"Dispositivos"}
                    name="deviceId"
                    placeholder="Seleccionar"
                    variant="filled"
                    margin="dense"
                    InputProps={{ disableUnderline: true }}
                    helperText={""}
                    className={classes.textField}
                    onChange={(value)=>{setDeviceId(value.target.value)}}
                    value={deviceId}
                  >
                    {deviceOptions.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))} 
                  </TextField>
                </div>
                <div className={`${classes.dateContainer} col-md-2`}>
                  <Button 
                    className={classes.mainButton} 
                    onClick={resetValues}
                  >
                    Restaurar
                  </Button>
                </div>
              </div>
            </div>
        </div>
        {/*FILA DE INPUTS */}

        <Grid container spacing={5}>
          <Grid item sm={4}>
            <Card elevation={3}>
              <CardContent>
                <p className={classes.titleCharts}>Interacción por género</p>
                <PieChartGender
                  data={genderAndAge.gender ? genderAndAge.gender : []}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={8}>
          <Card elevation={3}>
              <CardContent>
                <p className={classes.titleCharts}>Interacción por rango de edad</p>
                <PieChartYears
                  data={genderAndAge.age ? genderAndAge.age : []}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid item sm>
            <Card elevation={3}>
              <CardContent>
                <p className={classes.titleCharts}>Emociones</p>
                
                <Grid container spacing={1}>
                  <Grid item sm={1}></Grid>
                  <Grid item sm={2}>
                    <Emotion
                      title={"Neutral"}
                      value={emotions.Neutral ? emotions.Neutral : 0}
                      total={emotions.total ? emotions.total : 0}
                      img={Icons.NeutralEmotion}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <Emotion
                      title={"Sorpresa"}
                      value={emotions.Surprise ? emotions.Surprise : 0}
                      total={emotions.total ? emotions.total : 0}
                      img={Icons.SurpriseEmotion}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <Emotion
                      title={"Felicidad"}
                      value={emotions.Happy ? emotions.Happy : 0}
                      total={emotions.total ? emotions.total : 0}
                      img={Icons.HappyEmotion}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <Emotion
                      title={"Tristeza"}
                      value={emotions.Sad ? emotions.Sad : 0}
                      total={emotions.total ? emotions.total : 0}
                      img={Icons.SadEmotion}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <Emotion
                      title={"Enojo"}
                      value={emotions.Angry ? emotions.Angry : 0}
                      total={emotions.total ? emotions.total : 0}
                      img={Icons.AngryEmotion}
                    />
                  </Grid>
                  <Grid item sm={1}></Grid>
                </Grid>

              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid item sm>
            <Card elevation={3}>
              <CardContent>
                <p className={classes.titleCharts}>Top 5 de productos solicitados</p>
                <TopOptions
                  color={"#CEE3FF"}
                  data={purchaseRequest ? purchaseRequest : []}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm>
            <Card elevation={3}>
              <CardContent>
                <p className={classes.titleCharts}>Top 5 de productos canjeados</p>
                <TopOptions 
                  color={"#A50064"}
                  data={redeemProducts ? redeemProducts : []}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid item sm>
            <Card elevation={3}>
              <CardContent>
                <p className={classes.titleCharts}>Top 5 productos cargados</p>
                <TopOptions 
                  color={"#007CBA"}
                  data={loadProducts ? loadProducts : []}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ContentRelocator>
    </>
  );
};
