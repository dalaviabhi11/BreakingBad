import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {mainReducer} from './mainReducer';

export const appReducer = combineReducers({
  mainReducer: mainReducer,
});

export const rootReducer = (state, action) => {

  return appReducer(state, action);
};
