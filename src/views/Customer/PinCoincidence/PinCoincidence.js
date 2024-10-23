import React, { useState, useEffect, PureComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { style } from './PinCoincidenceStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import { useTable } from 'hooks/useTableV2';
import Button from 'components/Button';
import { ContentRelocator } from 'components/ContentRelocator';
import { Images } from 'assets';
import { UserCoincidence } from '../UserCoincidence/UserCoincidence';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import { useCurrentPng } from "recharts-to-png";
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

export const PinCoincidence = (props) => {
  const [getPng, { ref }] = useCurrentPng();
  const pinId = props.match.params.id
  const history = useHistory();
  const { currentTheme, mode } = useTheme();
  const {
    onChangeSearchItem,
    onChangeSize,
    onChangePage,
    totalFound,
    page,
    pageSize,
    searchItem,
    items,
    search,
    setPage,
    resetFilters,
    setOrderBy,
    extraParams,
    setExtraParams,
    sendAll
  } = useTable({ endpoint: `/purchase-request/region/${pinId}` });
  const classes = style();
  const [showCoincidenceModal, setShowCoincidenceModal] = useState(false);
  const [flag, setFlag] = useState(0);
  const [isEnter, setIsEnter] = useState(false);
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);
  const [coordinates, setCoordinates] = useState({});
  const [coordinatesFlag, setCoordinatesFag] = useState({});
  const [once, setOnce] = useState(true);
  const goBack = () => history.push('/customer/list');
  const data = items;//items

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
    items.map((bar, index) => {//items
      statusFlag[bar.name] = {
        status: true,
        x: 0,
        y: 0
      }
    });
    setCoordinatesFag(statusFlag);
    setCoordinates(statusFlag);
  }, [items]);//items

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

  const handleSaveClick = async () => {
    let bckGrnd = "#ffffff";
    if (mode !== 'dark') { 
      bckGrnd = "#ffffff";
    }
    else {
      bckGrnd = "#002169";
    }
    const png = await getPng();
    if(png){
      var pdf = new jsPDF( 'l', 'pt', [800, 470] );
      pdf.addImage( png, 25, 50, 750, 400 );
      pdf.save( 'PinChart' +'.pdf' );
    }
   }

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
    if(coordinates[props.name].status) { 
      setCoordinates({...coordinates, [props.name]: { status: false, x: props.width + props.x, y: props.y + 10}}) 
      setOnce(false);
    }
  
    return (
      <g>
        <text x={width + x} y={y + 16} fill={props.fill}>{value}</text>
      </g>
    );
  };

  const CustomTooltip = (props) => {
    if (props.active && props.payload && props.payload.length) {
      setCoordX(coordinates[props.label].x);
      setCoordY(coordinates[props.label].y);
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
      <NestcaPageHeader
        title="Coincidencia PIN:"
        Icon={currentTheme.themeDark ? Pages.PagePinDark : Pages.PagePin}
        count={pinId}
        justGoBack={true}
        goBack={goBack}
      />
      <UserCoincidence
        visible={showCoincidenceModal}
        onClose={toggleCoincidenceModal}
      />
      <ContentRelocator>
        <div className="row">
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
        </div>
        <ComposedChart
          layout="vertical"
          width={1000}
          height={600}
          data={data}
          margin={{
            top: 20,
            right: 60,
            bottom: 20,
            left: 60
          }}
          onMouseMove={handleClick}
          onMouseLeave={isOut}
          ref={ref}
        >
          <CartesianGrid stroke={mode !== 'dark' ? "#f5f5f5" : "#FFFFFF5f"} />
          <XAxis type="number" stroke={mode !== 'dark' ? "#202020" : "#ffffff"}/>
          <YAxis dataKey="name" type="category" scale="band" stroke={mode !== 'dark' ? "#202020" : "#ffffff"} />
          <Tooltip content={<CustomTooltip />} position={{x:coordX, y:coordY}}/>
          <Bar dataKey="count" barSize={20}>
            { isEnter ? (
              data.map((entry, index) => (
                <Cell 
                  cursor="pointer" 
                  fill={mode !== 'dark'
                  ? (index !== flag.activeTooltipIndex ? '#E8F0FA' : '#CEE3FF') 
                  : (index !== flag.activeTooltipIndex ? '#FFFFFF5f' : '#FFFFFF')}
                  key={`cell-${index}`} 
                />
              ))
            ) : (
              data.map((entry, index) => (
                <Cell 
                  cursor="pointer" 
                  fill={mode !== 'dark' ? '#CEE3FF' : '#CCCCCC'} 
                  key={`cell-${index}`} 
                />
              ))
            )}
            <LabelList 
              dataKey="pv" 
              content={renderCustomizedLabel} 
              position="top" fill={mode !== 'dark' 
                ? (isEnter ? '#0000001F' : '#000000') 
                : (isEnter ? '#FFFFFF2f' : '#ffffff')}
            />
            </Bar>
        </ComposedChart>
      </ContentRelocator>
    </div>
  );
};
