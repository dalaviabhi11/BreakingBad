import {Alert, NativeModules, Platform, StatusBar} from 'react-native';
import {getDataFromStorage, setDataIntoStorage} from './LocalStorageService';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';

// import {IS_DEBUG} from "@env"
const {StatusBarManager} = NativeModules;
const wordDir = require('../utilities/en.json');

// export const debug = IS_DEBUG;
export const debug = true;
export const isAndroid = Platform.OS == 'android';
export const isIos = Platform.OS == 'ios';

const PERMISSION_STORAGE = Platform.select({
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
});

const PERMISSION_CAMERA = Platform.select({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA,
});

export const setDataToAtoms = dataObject => {
  switch (dataObject.dataKey) {
    default:
      break;
  }
};

export const isSuccessResponse = response => {
  return response && response.status === 200;
};

export const getCountryCodeAndPhoneNumber = phone => {
  let phoneNo = '',
    countryCode = '';
  if (phone) {
    let firstIndexSpace = phone.indexOf(' ');
    countryCode = phone.substring(1, firstIndexSpace);
    phoneNo = phone.substring(firstIndexSpace).replace(/ /g, '');
  }
  return {
    phoneNo,
    countryCode,
  };
};

export const mydbg = (msg, screenName = null, funcName = null) => {
  // return null;
  screenName = screenName || 'none';
  funcName = funcName || 'none';
  var txt = `DBG:${Platform.OS}:${screenName}:${funcName}:`;
  return true;
};

export const makeImageViewData = imagesData => {
  let tempImgViewData = [];
  if (imagesData && imagesData.length > 0) {
    imagesData.forEach(img => {
      let imgViewObj = {
        uri: img,
      };
      tempImgViewData.push(imgViewObj);
    });
  }
  return tempImgViewData;
};

export const getMaskedPhoneNumber = phoneNumber => {
  let result = '';
  if (phoneNumber) {
    let firstIndexSpace = phoneNumber.indexOf(' ');
    let startNumbers = phoneNumber.substring(
      firstIndexSpace,
      phoneNumber.length - 2,
    );
    result =
      phoneNumber.substring(0, firstIndexSpace) +
      startNumbers.replace(/[0-9]/g, 'X') +
      phoneNumber.substring(phoneNumber.length - 2);
    return result;
  }
  result;
};

export const setStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    StatusBarManager.getHeight(statusBarFrameData => {
      setGlobalVar('statusBarHeight', statusBarFrameData.height);
    });
  } else {
    setGlobalVar('statusBarHeight', StatusBar.currentHeight + 10);
  }
};
export const hasResponseData = response => {
  if (response && response.data && response.data.data) {
    return true;
  }
  return false;
};
export const getCurrentMonth = () => {
  const todaysDate = new Date();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[todaysDate.getMonth()];
};
export const getCurrentDay = () => {
  const todaysDate = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[todaysDate.getDay()];
};
export const getCurrentDate = () => {
  const todaysDate = new Date();
  return todaysDate.getDate();
};
export const getCurrentYear = () => {
  const todaysDate = new Date();
  return todaysDate.getFullYear();
};

export const isDefined = x => {
  return typeof x !== 'undefined';
};

export const getUserData = async () => {
  var user = getGlobalVar('user');
  if (!user) {
    user = await getDataFromStorage('user');
  }
  return user;
};
export const isSet = x => {
  return x != null && isDefined(x) && x !== '';
};

export const setGlobalVar = (name, value) => {
  global.vars[name] = value;
};

export const getGlobalVar = name => {
  return global.vars[name];
};

export const convertToString = text => {
  return text ? text.toString() : '';
};

export const setGlobalVarAndPersist = async (name, value) => {
  global.vars[name] = value;
  await setDataIntoStorage(name, value);
};

export const getOrCreateGlobalVar = (varName, defaultValue) => {
  if (!isSet(getGlobalVar(varName))) {
    setGlobalVar(varName, defaultValue);
  }
  var val = getGlobalVar(varName);
  return val;
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

export async function checkPhotoStorgePermission() {
  let isShowPhotos = false;
  let showPermGrantAlert = false;
  const permissionCheckResponse = await check(PERMISSION_STORAGE);
  if (Platform.OS === 'ios') {
    if (permissionCheckResponse !== RESULTS.GRANTED) {
      if (permissionCheckResponse === RESULTS.DENIED) {
        const storagePermissionResponse = await request(PERMISSION_STORAGE);
        if (storagePermissionResponse === RESULTS.GRANTED) {
          isShowPhotos = true;
        }
      } else {
        showPermGrantAlert = true;
      }
    } else {
      isShowPhotos = true;
    }
  } else {
    isShowPhotos = true;
  }
  return {isShowPhotos, showPermGrantAlert};
}
export async function checkCameraStorgePermission() {
  let isShowCamera = false;
  let showPermGrantAlertCamera = false;
  const permissionCheckResponse = await check(PERMISSION_CAMERA);
  if (permissionCheckResponse !== RESULTS.GRANTED) {
    if (permissionCheckResponse === RESULTS.DENIED) {
      const cameraPermissionResponse = await request(PERMISSION_CAMERA);
      if (cameraPermissionResponse === RESULTS.GRANTED) {
        isShowCamera = true;
      }
    } else {
      showPermGrantAlertCamera = true;
    }
  } else {
    isShowCamera = true;
  }
  return {isShowCamera, showPermGrantAlertCamera};
}

export const getValueFromProdDetails = (label, productDetails) => {
  let value = '--';
  if (productDetails && productDetails[label]) {
    value = productDetails[label];
  }
  return value;
};

export const getValueFromVariantData = (label, data) => {
  let value = '--';
  if (data) {
    if (isSet(data[label])) {
      value = data[label];
    } else if (data.shopCatalog && data.shopCatalog[label]) {
      value = data.shopCatalog[label];
    } else if (data.product && data.product[label]) {
      value = data.product[label];
    } else if (data.variant && isSet(data.variant[label])) {
      value = data.shopCatalog
        ? data.shopCatalog[0][label]
        : data.variant[label];
    }
  }
  return value;
};

export const getImageIdFromVariant = (label, data) => {
  let value = '--';
  if (data) {
    if (data.shopCatalog && data.shopCatalog[0]) {
      value = data.shopCatalog[0].variant[label];
    }
  }
  return value;
};
export const getValueFromDefaultVariantData = (label, defaultVariantData) => {
  let value = '0';
  if (defaultVariantData && defaultVariantData.length > 0) {
    if (defaultVariantData[0][label]) {
      value = defaultVariantData[0][label];
    } else if (
      defaultVariantData[0].variant &&
      isSet(defaultVariantData[0].variant[label])
    ) {
      value = defaultVariantData[0].variant[label];
    }
  }
  return value;
};

export const getValueDetailsScreen = (label, data) => {
  let value = '0';
  if (data && data[label]) {
    value = data[label];
  } else if (data && data.variant && isSet(data.variant[label])) {
    value = data.variant[label];
  } else if (
    data &&
    data.productCategory &&
    isSet(data.productCategory[label])
  ) {
    value = data.productCategory[label];
  }
  return value;
};

export const getTotalQuantity = (label, name, data) => {
  let value = 0;
  if (data) {
    if (data[label]) {
      value = data[label];
    } else {
      const list = data[name];
      list.map(
        (item, idx) =>
          (value +=
            label == 'unitPrice'
              ? Number(item[label] * item.orderQuantity)
              : Number(item[label])),
      );
    }
  }
  return value;
};
export const getTotalQtyAndPrice = (label, data) => {
  let value = 0;
  if (data.length > 0) {
    const list = data;
    list.map(
      (item, idx) =>
        (value +=
          label == 'orderItemQuantity'
            ? Number(item[label])
            : Number(item[label] * item.orderItemQuantity)),
    );
  }
  return value;
};
export const getName = user => {
  if (user && user['userFirstName'] && user['userLastName']) {
    return user['userFirstName'] + ' ' + user['userLastName'];
  }
  return '';
};

export const nvl = (value, defaultValue = '') => {
  if (isSet(value)) {
    return value;
  }
  return defaultValue;
};


export const removeAllUrlsFromArray = data => {
  let updatedData = [];
  if (data && data.length > 0) {
    updatedData = data.filter(item => {
      return !item.startsWith('https');
    });
  }
  return updatedData;
};

export function internetAlert() {
  return new Promise((resolve, reject) => {
    Alert.alert(
      wordDir.warning,
      wordDir.internetOff,
      [
        {
          text: 'Ok',
          onPress: () => {
            resolve(true);
          },
        },
        // {text: 'Exit app', onPress: () => {BackHandler.exitApp(); resolve(false)}}
      ],
      {cancelable: false},
    );
  });
}

export function removeSpecialChar(value, regex) {
  if (value) {
    let updatedValue = value.replace(regex, '');
    return updatedValue;
  }
  return '';
}

export function traceUserPath(screenName) {
  let userPath = getOrCreateGlobalVar('userPath', []);
  userPath.push(screenName);
  setGlobalVar('userPath', userPath);
}
