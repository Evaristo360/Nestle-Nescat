import React, { useState, useEffect, PureComponent } from 'react';
import { intlExt } from 'providers/intlExt';
import { useHistory } from 'react-router-dom';
import { style } from './Styles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import { config } from 'providers/config';
import { Images } from 'assets';
// import { UserCoincidence } from '../UserCoincidence/UserCoincidence';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  LabelList, 
  BarChart,
  ResponsiveContainer,
  Cell
} from "recharts";

export const HorizontalBarChart = ({
  data = [{
    name: '',
    value: 0 
  }], // data to be displayed on the chart
  barWidth = 1000, // width of the chrart
  barHeight = 600, // height of the chart
  margin = {
      top: 20,
      right: 60,
      bottom: 20,
      left: 150
    }, //Margin of the chart
  barTitle = '', //Chart's title
  cardEnable = false, //Enable floating card style
  legend = '', // add a legend to the chart
  barColor = '', // color of the chart
  darkBarColor = '', // darkcolor of the chart
  labels = {}, // labels to rewrite the default labels from the api
  styleYAxis = {
      textAlign: 'left',
      font: 'normal normal normal 12px/16px Roboto',
      letterSpacing: '0px',
      color: '#63513D',
      opacity: '1',
    }, //style for labels that are in the Y axis
}) => {
  //console.log("props", props)
  //const pinId = props.match.params.id
  const history = useHistory();
  const { currentTheme, mode } = useTheme();
  // const {
  //   onChangeSearchItem,
  //   onChangeSize,
  //   onChangePage,
  //   totalFound,
  //   page,
  //   pageSize,
  //   searchItem,
  //   items,
  //   search,
  //   setPage,
  //   resetFilters,
  //   setOrderBy,
  //   extraParams,
  //   setExtraParams,
  //   sendAll
  // } = useTable({ endpoint: `/purchase-request/region/${pinId}` });
  // console.log('items', items);
  const classes = style();
  const [showCoincidenceModal, setShowCoincidenceModal] = useState(false);
  const [flag, setFlag] = useState(0);
  const [isEnter, setIsEnter] = useState(false);
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);
  const [coordAX, setCoordAX] = useState(0);
  const [coordAY, setCoordAY] = useState(0);
  const [coordinates, setCoordinates] = useState({});
  const [coordinatesFlag, setCoordinatesFag] = useState({});
  const [once, setOnce] = useState(true);
  const goBack = () => history.push('/customer/list');
  //const data = items;//items

  useEffect(() => {
    (async () => {
      if (labels !== {}) {
        data.map((element, index) => {
          element.name = intlExt.formatMessage(labels[element.name]);
        });
      }
    })();
  }, [data]);

  const styles = css`
  
  body {
    background: #368dda;
  }
  
  .bubble {
    top:-40px;
    position: relative;
    font-family: sans-serif;
    font-size: 18px;
    line-height: 24px;
    width: 180px;
    background: #fff;
    padding: 24px;
    text-align: center;
    color: #000;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 4px #00000024;
    opacity: 1;
  }
  
  .bubble-bottom-left:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border: 15px solid transparent;
    border-top: 0;
    border-bottom: 30px solid #fff;
    top: 25px;
    left: -30px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 1;
    transform: rotate(-90deg);
    -webkit-filter: drop-shadow(-1px 0px 0px rgba(0,0,0,.5));
    filter: drop-shadow(-1px 0px 0px rgba(0,0,0,.5));
  }
  
  text: {
    text-align: left;
    font: normal normal normal 13px Roboto;
    letter-spacing: 0px;
    color: #63513D7D !important;
    opacity: 1;
  }
  text2: {
    text-align: left;
    font: normal normal normal 10px/13px Roboto;
    letter-spacing: 0px;
    color: #63513D7D;
    opacity: 1;
  }
  `;

  useEffect(() => {
    let statusFlag={};
    data.map((bar, index) => {//items
      statusFlag[bar.name] = {
        status: true,
        x: 0,
        y: 0
      }
    });
    setCoordinatesFag(statusFlag);
    setCoordinates(statusFlag);
  }, [data]);//items

  const toggleCoincidenceModal = () => {
    setShowCoincidenceModal(!showCoincidenceModal);
    search();
  };

  const isOut = () => {
    setIsEnter(false);
  };

  const handleClick = (data, index) => {
    setIsEnter(true);
    setFlag(data);
  };

  const handleSaveClick = () => {
    let bckGrnd = "#ffffff";
    if (mode !== 'dark') { bckGrnd = "#ffffff";}
    else {bckGrnd = "#002169";}

    domtoimage.toPng(document.getElementById("graph"), { bgcolor:bckGrnd})
      .then(function (dataURL) {
        var htmlImage = new Image();
        htmlImage.src = dataURL;
        var pdf = new jsPDF( 'l', 'pt', [800, 470] );
        pdf.addImage( htmlImage, 25, 50, 750, 400 );
        pdf.save( 'userEmail' +'.pdf' );
      }).catch( ( error ) => {
        console.error('Error: ', error);
      });
   }

  const renderCustomizedLabel = (prop) => {
    // console.log("yoyo")
    // console.log("renderCustomizedLabel", prop)
    const { x, y, width, height, value } = prop;
    const radius = 10;
    // if(coordinates[prop.name].status) { 
    //   setCoordinates({...coordinates, [prop.name]: { status: false, x: prop.width + prop.x, y: prop.y + 10}}) 
    //   //setOnce(false);
    // }
  
    return (
      <g>
        <text x={width + x} y={y + 16} fill={prop.fill}>{value}</text>
      </g>
    );
  };

  const CustomTooltip = (props) => {
    // console.log("yop");
    if (props.active && props.payload && props.payload.length) {
      // setCoordX(coordinates[props.label].x);
      // setCoordY(coordinates[props.label].y);
      return (
        <div css={styles}>
          <div className="bubble bubble-bottom-left">
            <p className={classes.bubleProduct}>{`${props.label}`}</p>
            <p className={classes.pz}>{`${props.payload[0].value}Pz`}</p>
          </div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div>
      {/* <NestcaPageHeader
        title="Coincidencia PIN:"
        Icon={currentTheme.themeDark ? Pages.PagePinDark : Pages.PagePin}
        count={pinId}
        justGoBack={true}
        goBack={goBack}
      /> */}
      {/* <UserCoincidence
        visible={showCoincidenceModal}
        onClose={toggleCoincidenceModal}
      /> */}
      <ContentRelocator>
        {/* <div className="row">
          <div className="col-3 mt-3">
            <div className={classes.infoContainer}>
              <p className={classes.text}>
                {`Cantidad de usuarios: ${sendAll.totalCustomers !== undefined ? sendAll.totalCustomers : 0}`}
              </p>
            </div>
          </div>
          <div className="col-7 mt-3">
            <div className={classes.infoContainer}>
              <p className={classes.text}>
              {`Productos: ${sendAll.totalProducts !== undefined ? sendAll.totalProducts : 0}`} 
              </p>
            </div>
          </div>
          <div className="col-2 mt-2">
            <div className={classes.settingsCont}>
                <Button type="user" onClick={() => handleSaveClick()} icon={Images.PDFIcon} className={classes.downloadButton} >
                  Exportar en PDF
                </Button>
            </div>
          </div>
        </div> */}
        <div className={cardEnable ? classes.detections : null}>
          {barTitle !== '' ? <p className={classes.barTitle}> {barTitle} </p> : null}
          <ComposedChart
            layout="vertical"
            width={barWidth}
            height={barHeight}
            data={data}
            margin={margin}
            onMouseMove={handleClick}
            onMouseLeave={isOut}
            id={"graph"}
          >
            <CartesianGrid stroke={mode !== 'dark' ? "#f5f5f5" : "#FFFFFF5f"} />
            <XAxis type="number" stroke={mode !== 'dark' ? "#202020" : "#202020"}/>
            <YAxis dataKey="name" type="category" scale="band" stroke={mode !== 'dark' ? "#202020" : "#202020"} label={{ value: 'Acciones', position: 'top', offset: 5, fill: '#63513D80' }} style={styleYAxis} tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} />
            <Tooltip content={<CustomTooltip />} position={{x:coordX, y:coordY}}/>
            <Bar dataKey="value" barSize={20} 
            onMouseMove={(e) => {
              setCoordX(e.width + e.x);
              setCoordY(e.tooltipPosition.y);
            }}>
              { isEnter ? (
                data.map((entry, index) => (
                  <Cell 
                    cursor="pointer" 
                    fill={mode !== 'dark'
                    ? (index !== flag.activeTooltipIndex ? (`${barColor}A0`) : barColor) 
                    : (index !== flag.activeTooltipIndex ? (`${darkBarColor}A0`) : darkBarColor) }
                    key={`cell-${index}`} 
                  />
                ))
              ) : (
                data.map((entry, index) => (
                  <Cell 
                    cursor="pointer" 
                    fill={mode !== 'dark' ? barColor : darkBarColor} 
                    key={`cell-${index}`} 
                  />
                ))
              )}
              <LabelList 
                dataKey="value" 
                content={renderCustomizedLabel} 
                position="top" fill={mode !== 'dark' 
                  ? (isEnter ? '#0000001F' : '#000000') 
                  : (isEnter ? '#0000001F' : '#000000')}
              />
              </Bar>
          </ComposedChart>
          {legend !== '' ? <p className={classes.barLegend}> {legend} </p> : null}
        </div>
      </ContentRelocator>
    </div>
  );
};
