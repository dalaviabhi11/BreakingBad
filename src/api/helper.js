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
        },
      })
        .then(function (response) {
          // if(debug) mydbg("API call response: " + JSON.stringify(response.data))
          resolve(response);
        })
        .catch(function (error) {
          if (debug) mydbg('API call error: ' + JSON.stringify(error));
         
          reject(error);
        });
    });
  } catch (err) {
    if (debug) mydbg('Error while authenticating token:' + err);
  }
}


