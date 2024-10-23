import { useState, useEffect } from 'react';
import { 
  getNestleAnalyticsClients,
  getNestleAnalyticsBranches,
  getNestleAnalyticsDevices,
  getNestleAnalyticsGenderAndAge,
  getNestleAnalyticsEmotions,
  getNestleAnalyticsTotals,
  getNestleAnalyticsTopLoadProducts,
  getNestleAnalyticsTopRedeemProducts,
  getNestleAnalyticsTopPurchaseRequest
} from 'providers/api';
import { useHistory } from 'react-router-dom';
import { createOption } from 'components/SelectV2';

  export const useNestleAnalytics = () => {
    const history = useHistory();
    //state datepicker
    const [ dateStart, setDateStart] = useState(null);
    const [ dateEnd, setDateEnd] = useState(null);

    //states options
    const [clientOptions, setClientOptions] = useState([]);
    const [clientId, setClientId] = useState('');

    const [branchesOptions, setBranchesOptions] = useState([]);
    const [branchId, setBranchId] = useState('');

    const [deviceOptions, setDeviceOptions] = useState([]);
    const [deviceId, setDeviceId] = useState('');

    //charts values
    const [genderAndAge, setGenderAndAge] = useState([]);
    const [antalyticsTotal, setAntalyticsTotal] = useState([]);
    const [emotions, setEmotions] = useState({});
    const [loadProducts, setLoadProducts] = useState([]);
    const [redeemProducts, setRedeemProducts] = useState([]);
    const [purchaseRequest, setPurchaseRequest] = useState([]);

    const redirectDetectionRegister = () => history.push('/nestle/analytics/detection_records');

    const createOptions = (options) => {
      let arrayCreateOptions = [];
      options.map( opc => {
        arrayCreateOptions.push(createOption(opc.name, opc.id))
      });
      return arrayCreateOptions;
    }
    
    useEffect(async () => {
      let clientsResponse = await getNestleAnalyticsClients();
      let clients = createOptions(clientsResponse.items ? clientsResponse.items : []);
      

      let devicesByBranchResponse = await  getNestleAnalyticsDevices(branchId);
      let devicesByBranch = createOptions(devicesByBranchResponse.items ? devicesByBranchResponse.items : []);

      setClientOptions(clients);
      setDeviceOptions(devicesByBranch)
    }, []);

    useEffect(async () => {
      if(!dateStart){
        setDateEnd(null)
      }
    }, [dateStart]);
    

    useEffect(async () => {

      let datetime_lower_bound = "";
      let datetime_upper_bound = "";

      if(dateStart && dateEnd){
        let dateInit = new Date(dateStart);
        dateInit.setUTCHours(0);
        dateInit.setUTCMinutes(0);
        dateInit.setUTCSeconds(0);
        datetime_lower_bound=dateInit.toISOString();

        let dateFinal = new Date(dateEnd);
        dateFinal.setUTCHours(23);
        dateFinal.setUTCMinutes(59);
        dateFinal.setUTCSeconds(59);
        datetime_upper_bound=dateFinal.toISOString();
      }

      let totalsResponse = await getNestleAnalyticsTotals(clientId, branchId, deviceId, datetime_lower_bound, datetime_upper_bound);
      let genderAndAgeResponse = await getNestleAnalyticsGenderAndAge(clientId, branchId, deviceId, datetime_lower_bound, datetime_upper_bound);
      let emotionsResponse = await getNestleAnalyticsEmotions(clientId, branchId, deviceId, datetime_lower_bound, datetime_upper_bound);
      let loadProductsResponse = await getNestleAnalyticsTopLoadProducts(clientId, branchId, deviceId, datetime_lower_bound, datetime_upper_bound);
      let redeemProductsResponse = await getNestleAnalyticsTopRedeemProducts(clientId, branchId, deviceId, datetime_lower_bound, datetime_upper_bound)
      let purchaseRequestResponse = await getNestleAnalyticsTopPurchaseRequest(clientId, branchId, deviceId, datetime_lower_bound, datetime_upper_bound)
      
      setAntalyticsTotal(totalsResponse ? totalsResponse : []);
      setGenderAndAge(genderAndAgeResponse.items ? genderAndAgeResponse.items[0] : []);
      setEmotions(emotionsResponse.items ? emotionsResponse.items[0] : {});
      setLoadProducts(loadProductsResponse.items ? loadProductsResponse.items : []);
      setRedeemProducts(redeemProductsResponse.items ? redeemProductsResponse.items : []);
      setPurchaseRequest(purchaseRequestResponse.items ? purchaseRequestResponse.items : []);
    }, [dateStart, dateEnd, clientId, branchId, deviceId]);

    useEffect(async () => {
      if(clientId){
          let branchesByClientResponse = await  getNestleAnalyticsBranches(clientId);
          let branchesByClient = createOptions(branchesByClientResponse.items ? branchesByClientResponse.items : []);
          setBranchesOptions(branchesByClient)
          setDeviceId("")
      }
    }, [clientId]);

    const resetValues = () => {
      setClientId('')
      setDeviceId('')
      setDateStart(null)
    };

    return {
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
    };
  }