import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {configStore, persistor} from './src/redux/store/store';
import Routes from './src/navigation/Routes';
import {PersistGate} from 'redux-persist/integration/react';
import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { AuthProvider } from './src/navigation/AuthProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App() {
 
  return (
    <SafeAreaProvider>
      <Provider store={configStore}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </PersistGate>
      </Provider>
      </SafeAreaProvider>
  );
};



export default App;
