import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppStack } from './navigators/app-stack';
import React, { useEffect } from 'react';
import '@react-native-firebase/messaging';
import { notificationListener, requestUserPermission } from './utils/request-user-permission';

export const App = () => {

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  return (
    <Provider store={store}>
      <AppStack />
    </Provider>


  );
};



