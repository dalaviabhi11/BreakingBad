import { NativeModules, Platform } from 'react-native';

// import {IS_DEBUG} from "@env"
const {StatusBarManager} = NativeModules;

// export const debug = IS_DEBUG;
export const debug = true;
export const isAndroid = Platform.OS == 'android';
export const isIos = Platform.OS == 'ios';



export const isSuccessResponse = response => {
  return response && response.status === 200;
};



export const mydbg = (msg, screenName = null, funcName = null) => {
  // return null;
  screenName = screenName || 'none';
  funcName = funcName || 'none';
  var txt = `DBG:${Platform.OS}:${screenName}:${funcName}:`;
  return true;
};


export const isSet = x => {
  return x != null && isDefined(x) && x !== '';
};


export const deleteElemFromArray = (val, arr) => {
  if (!isSet(arr)) {
    return;
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
      i--;
    }
  }
};

