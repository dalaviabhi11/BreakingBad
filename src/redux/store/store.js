import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from '../reducers/RootReducers';

// let middleWare = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistStoreReducer = persistReducer(persistConfig, rootReducer);

export const configStore = createStore(
  persistStoreReducer,
  applyMiddleware(thunk),
);
export let persistor = persistStore(configStore);
