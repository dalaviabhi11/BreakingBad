import React, {createContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  LogBox,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setLoading,
} from '../redux/actions/mainActions';
import {appColors} from '../shared/constants/appEnums';
import {globalStyles} from '../styles/globalStyles';
import {
  debug,
  isIos,
  mydbg,
} from '../utilities/CommonFunctions';


export const AuthContext = createContext({});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

navigator.geolocation = require('@react-native-community/geolocation');


export const AuthProvider = ({children}) => {
  const dispatch = useDispatch();
  //loader
  const loading = useSelector(({mainReducer}) => mainReducer.isLoggedIn);

  const setLoader = load => dispatch(setLoading(load));


  useEffect(() => {
    try {
    setLoader(false);
 
    } catch (err) {
      if (debug) mydbg('Error whilw opneing the app: ' + err);
    }

  }, []);


  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoader,
      }}>
      <StatusBar barStyle={isIos ? 'dark-content' : 'default'} />
      {loading ? (
        <View
          style={{
            position: 'absolute',
            top: windowHeight / 2 - 50,
            left: windowWidth / 2 - 50,
            zIndex: 1000000,
          }}>
          <View
            style={[
              globalStyles.loader,
              globalStyles.modalTransparentBackground,
            ]}>
            <ActivityIndicator size={'large'} color={appColors.green} />
          </View>
        </View>
      ) : null}
      {children}
    </AuthContext.Provider>
  );
};
