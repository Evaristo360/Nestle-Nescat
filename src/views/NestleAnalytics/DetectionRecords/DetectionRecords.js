import React, { useState, useEffect, PureComponent } from 'react';
import useApi from './hooks/api';
import { getExcel } from 'providers/api';
import { useHistory } from 'react-router-dom';
import { style } from './Styles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { SelectV2, createOption } from 'components/SelectV2';
import { NestleAnalytics } from 'assets';
import Table from 'components/Table';
import { HorizontalBarChart } from 'components/HorizontalBarChart';
import { useTable } from 'hooks/useTableV2';
import { useChart } from 'hooks/useChart';
import Button from 'components/Button';
import FilterModal from 'components/FilterModal';
import { ContentRelocator } from 'components/ContentRelocator';
import { useRedemptionPointsList } from './hooks/useRedemptionPointsList';
import { Images } from 'assets';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import { messages as Msg } from './Messages';
import moment from 'moment';

const FileDownload = require('js-file-download');

const data = [
  {
    name: 'passed_in_front', // pasó enfrente
    value: 4.8
  },
  {
    name: 'touched_screen', // tocó pantalla
    value: 3.8
  },
  {
    name: 'signup_section', // sección registro
    value: 3.8
  },
  {
    name: 'signed_up', // registro realizado
    value: 2.8
  },
  {
    name: 'purchase_section', // sección compra
    value: 2.8
  },
  {
    name: 'purchased', // compra realizada
    value: 2.8
  },
  {
    name: 'load_points_section', // sección carga de puntos
    value: 3.8
  },
  {
    name: 'loaded_points', // carga de puntos realizada
    value: 1.8
  },
  {
    name: 'redeem_points_section', // sección canje de puntos
    value: 1.8
  },
  {
    name: 'redeemed_points', // canje de puntos realizado
    value: 1.8
  },
  {
    name: 'promos_section', // sección promociones
    value: 3.8
  },
  {
    name: 'branch_promos_printed', // impresión del listado de promociones
    value: 2.8
  },
  {
    name: 'special_promo_printed', // aplicación de promoción especial
    value: 1
  }
];

const data2 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const listas = [
  {
    name: 'Page A',
    id: 4000
  },
  {
    name: 'Page B',
    id: 3000
  },
  {
    name: 'Page C',
    id: 2000
  },
  {
    name: 'Page D',
    id: 2780
  },
  {
    name: 'Page E',
    id: 1890
  },
  {
    name: 'Page F',
    id: 2390
  },
  {
    name: 'Page G',
    id: 3490
  }
];

const connOptions = [
  createOption('Todos', 'all'),
  createOption('Si', 'true'),
  createOption('No', 'false')
];

export const DetectionRecords = () => {
  const history = useHistory();
  const { getClient, getBranch, getDevice } = useApi();
  const { currentTheme, mode } = useTheme();
  const table = useTable({ endpoint: `/analytics/detections/report` });
  // console.log("table", table)
  const chart = useChart({ endpoint: `/analytics/detections` });
  // console.log("chart", chart)
  const classes = style();
  const goBack = () => history.push('/nestle/analytics');
  const [client, setClient] = useState(1);
  const [branch, setBranch] = useState(1);
  const [device, setDevice] = useState(1);
  const [clientList, setClientList] = useState([{}]);
  const [branchList, setBranchList] = useState([{}]);
  const [deviceList, setDeviceList] = useState([{}]);
  const [lists, setLists] = useState({
    clients: [{}],
    branches: [{}],
    devices: [{}]
  });
  const {
    showFilters,
    toggleShowFilters,
    toggleRestoreFilters,
    onSearchFilterHandler
  } = useRedemptionPointsList(
    table.search,
    table.setExtraParams,
    table.resetFilters
  );

  const styles = css`
    body {
      background: #368dda;
    }

    .bubble {
      top: -40px;
      position: relative;
      font-family: sans-serif;
      font-size: 18px;
      line-height: 24px;
      width: 180px;
      background: #fff;
      padding: 24px;
      text-align: center;
      color: #000;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 4px #00000024;
      opacity: 1;
    }

    .bubble-bottom-left:before {
      content: '';
      width: 0px;
      height: 0px;
      position: absolute;
      border: 15px solid transparent;
      border-top: 0;
      border-bottom: 30px solid #fff;
      top: 25px;
      left: -30px;
      background: #ffffff 0% 0% no-repeat padding-box;
      opacity: 1;
      transform: rotate(-90deg);
      -webkit-filter: drop-shadow(-1px 0px 0px rgba(0, 0, 0, 0.5));
      filter: drop-shadow(-1px 0px 0px rgba(0, 0, 0, 0.5));
    }

    text: {
      text-align: left;
      font: normal normal normal 13px Roboto;
      letter-spacing: 0px;
      color: #63513d7d !important;
      opacity: 1;
    }
    text2: {
      text-align: left;
      font: normal normal normal 10px/13px Roboto;
      letter-spacing: 0px;
      color: #63513d7d;
      opacity: 1;
    }
  `;

  useEffect(() => {
    (async () => {
      let list = lists;
      let arr = [];
      let clients = await getClient();
      let devices = await getDevice();
      // let clients = {};
      // let devices = {};
      // console.log("clients", clients);
      // console.log("devices", devices);
      // list.clients = clients;
      // list.devices = devices;
      //clients.items = listas;
      clients.map((element) => {
        arr.push(createOption(element.name, element.id.toString()));
      });
      // console.log("arr", arr)
      setClientList(arr);
      list.clients = arr;
      arr = [];
      // devices.items = listas;
      devices.map((element) => {
        arr.push(createOption(element.name, element.id));
      });
      setDeviceList(arr);
      list.devices = arr;
      arr = [];
      // console.log("list", list)
      // console.log("connOptions", connOptions)
      setLists(list);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (chart.extraParams.client_id !== undefined) {
        let list = lists;
        let arr = [];
        let branches = await getBranch(chart.extraParams.client_id);
        branches.map((element) => {
          arr.push(createOption(element.name, element.id.toString()));
        });
        // console.log("arr", arr)
        setBranchList(arr);
        list.clients = arr;
        arr = [];
      }
    })();
  }, [chart.extraParams.client_id, table.extraParams.client_id]);

  // useEffect(() => {
  //   (async () => {
  //     chart.addExtraParams({
  //       client_id: client,
  //       branch_id: branch,
  //       device_id: device
  //     })
  //   })();
  // }, [client, branch, device]);

  const exportToExcel = async () => {
    let response = await getExcel(
      table.pageSize,
      table.page,
      table.searchItem,
      table.extraParams.client_id,
      table.extraParams.device_id,
      table.extraParams.branch_id
    );
    FileDownload(
      response,
      'registros_' +
        new Date().toLocaleDateString() +
        '_' +
        new Date().toLocaleTimeString() +
        '.xlsx'
    );
  };

  const addExtraParams = (params) => {
    table.addExtraParams(params);
    chart.addExtraParams(params);
  };

  const resetFilters = () => {
    table.resetFilters();
    chart.resetFilters();
  };

  return (
    <div>
      <NestcaPageHeader
        showFilterButton
        title="Detección y registros:"
        Icon={
          currentTheme.themeDark
            ? NestleAnalytics.PagePinDark
            : NestleAnalytics.DetectionRecordIcon
        }
        showCount={false}
        goBack={goBack}
        onClickFilterButton={toggleShowFilters}
        onChangeSearchItem={table.onChangeSearchItem}
        searchItem={table.searchItem}
        showGoBack={true}
      />

      <FilterModal
        visible={showFilters}
        onSearch={onSearchFilterHandler}
        onRestore={toggleRestoreFilters}
        onClose={toggleShowFilters}
        endDate={true}
      />

      <ContentRelocator>
        <div className={classes.settingsCont2}>
          <div className="col-6 mt-3">
            <div className={classes.infoContainer}>
              <p className={classes.text}>
                {`Agrega nuevos dispositivos digital display para gestionar su interfaz y funcionamiento.`}
              </p>
            </div>
          </div>
          <div className={classes.settingsCont2}>
            <div className={classes.select}>
              <SelectV2
                id="client"
                name="client"
                label={'Cliente'}
                value={
                  chart.extraParams.client_id && table.extraParams.client_id
                }
                onChange={(event) =>
                  addExtraParams({ client_id: event.target.value })
                }
                options={clientList}
                labelClassName={classes.lblPosition}
                className={classes.textPosition}
              />
            </div>
            <div className={classes.select}>
              <SelectV2
                id="branch"
                name="branch"
                label={'Sucursal'}
                value={
                  chart.extraParams.branch_id && table.extraParams.branch_id
                }
                onChange={(event) =>
                  addExtraParams({ branch_id: event.target.value })
                }
                options={branchList}
                labelClassName={classes.lblPosition}
                className={classes.textPosition}
              />
            </div>
            <div className={classes.select}>
              <SelectV2
                id="device"
                name="device"
                label={'Dipositivo'}
                value={
                  chart.extraParams.device_id && table.extraParams.device_id
                }
                onChange={(event) =>
                  addExtraParams({ device_id: event.target.value })
                }
                options={deviceList}
                labelClassName={classes.lblPosition}
                className={classes.textPosition}
                native
              />
            </div>
            <Button onClick={resetFilters} secondary>
              Restaurar
            </Button>
          </div>
        </div>

        <HorizontalBarChart
          data={chart.items}
          barTitle="Detecciones del dispositivo"
          cardEnable
          legend={`Personas detectadas : ${chart.totalFound}`}
          barColor={'#F2C043'}
          darkBarColor={'#F2C043'}
          labels={Msg}
        />

        <div className={classes.tableContainer}>
          <div className={classes.excelButton}>
            <Button
              type="user"
              onClick={async () => {
                await exportToExcel();
              }}
              icon={Images.ExcelIcon}
              className={classes.downloadButton}
            >
              Exportar en excel
            </Button>
          </div>

          <Table
            total={table.totalFound}
            page={table.page}
            pageSize={table.pageSize}
            onChangeSize={table.onChangeSize}
            onChangePage={table.onChangePage}
            scroll_X={true}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Pasó frente</th>
                <th>Tocó pantalla</th>
                <th>Sección registro</th>
                <th>Realizó registro</th>
                <th>Sección compra</th>
                <th>Realizó compra</th>
                <th>Sección carga puntos</th>
                <th>Realizó carga puntos</th>
                <th>Sección canje puntos</th>
                <th>Realizó canje puntos</th>
                <th>Sección promociones</th>
                <th>Imprimió listado promociones</th>
                <th>Aplicó promoción especial</th>
                <th>Cliente</th>
                <th>Region</th>
                <th>Formato</th>
                <th>Subformato</th>
                <th>Nombre sucursal</th>
                <th>Dispositivo digital</th>
                <th>Fecha y hora inicio</th>
                <th>Fecha y hora fin</th>
              </tr>
            </thead>
            <tbody>
              {table.items.map((item, index) => (
                <tr key={`${item.id}${index}`}>
                  <td>{item.id}</td>
                  <td>{item.customer}</td>
                  <td>{item.passed_in_front === 1 ? 'Si' : 'No'}</td>
                  <td>{item.touched_screen === 1 ? 'Si' : 'No'}</td>
                  <td>{item.signup_section === 1 ? 'Si' : 'No'}</td>
                  <td>{item.signed_up === 1 ? 'Si' : 'No'}</td>
                  <td>{item.purchase_section === 1 ? 'Si' : 'No'}</td>
                  <td>{item.purchased === 1 ? 'Si' : 'No'}</td>
                  <td>{item.load_points_section === 1 ? 'Si' : 'No'}</td>
                  <td>{item.loaded_points === 1 ? 'Si' : 'No'}</td>
                  <td>{item.redeem_points_section === 1 ? 'Si' : 'No'}</td>
                  <td>{item.redeemed_points === 1 ? 'Si' : 'No'}</td>
                  <td>{item.promos_section === 1 ? 'Si' : 'No'}</td>
                  <td>{item.branch_promos_printed === 1 ? 'Si' : 'No'}</td>
                  <td>{item.special_promo_printed === 1 ? 'Si' : 'No'}</td>
                  <td>{item.client_name}</td>
                  <td>{item.branch_region}</td>
                  <td>{item.branch_format_name}</td>
                  <td>{item.branch_subformat_name}</td>
                  <td>{item.branch_name}</td>
                  <td>{item.device_name}</td>
                  <td>
                    {moment(item.start_datetime).format(
                      'DD-MM-YYYY - HH:mm'
                    )}
                  </td>
                  <td>
                    {moment(item.end_datetime).format(
                      'DD-MM-YYYY - HH:mm'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </ContentRelocator>
    </div>
  );
};
