import axios from 'axios';
import {BASE_URL} from '../shared/constants/appConstants';
import {
  debug,
  mydbg,
} from '../utilities/CommonFunctions';
import {EventRegister} from '../utilities/EventRegister';
const leading = BASE_URL;


export async function makeRequest({method, url, data}) {
  try {
    return new Promise(function (resolve, reject) {
      axios({
        method: method,
        url: `${leading}${url}`,
        data: data,
        headers: {
          // Authorization: 'Bearer ' + myShopToken,
          // 'x-shop-id': user ? user['userShopIds'][0] : null,
          // 'x-shop-id': myShopId ? myShopId : null,

          // 'Content-Type': 'application/json',
          // 'X-Company-Code': user['companyCode'] ? user['companyCode'] : user['custom:companyCode'] === '*' ?  'AEXONIC' : user['custom:companyCode'],
          // 'X-Community-Code': user['custom:communityCode'],
          // 'User-Agent': 'Mobile'
        },
      })
        .then(function (response) {
          // if(debug) mydbg("API call response: " + JSON.stringify(response.data))
          resolve(response);
        })
        .catch(function (error) {
          // console.log('ERROR=========>', error.response.data.message);
          if (debug) mydbg('API call error: ' + JSON.stringify(error));
          if (error && error.response && error.response.data) {
            EventRegister.getInstance('showToastMessage').notifyListeners({
              message: error.response.data.message,
              type: 'error',
            });
          }
          reject(error);
        });
    });
  } catch (err) {
    if (debug) mydbg('Error while authenticating token:' + err);
  }
}


