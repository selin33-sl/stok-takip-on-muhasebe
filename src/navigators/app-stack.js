import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeAuthentication } from '../redux/slice/auth-slice';
import { authLogin } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { SplashScreen } from '../screens';
import { AuthStack } from './auth-stack';
import { BottomTabs } from './bottom-tabs';
import Toast from 'react-native-toast-message';
import { ToastCompError } from '../components';
import NetInfo from '@react-native-community/netinfo';
import { useRoute, useNavigation } from '@react-navigation/native';

export const AppStack = () => {

  const dispatch = useDispatch();

  const [isConnected, setIsConnected] = useState(true);

  const { isAuthenticated } = useSelector(state => state.auth);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    const checkTokenExpiration = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const tokenCreationTime = await AsyncStorage.getItem('tokenCreationTime');
      const tokenCreationTimeUTC = new Date(parseInt(tokenCreationTime));

      console.log(tokenCreationTime, "tokenCreationTime");

      const tokenCreationTimee = new Date(parseInt(tokenCreationTime)).toLocaleString('tr-TR');

      console.log(tokenCreationTimee, "tokenCreationTimeeeeee");

      const currentTimeUTC = new Date();
      const expirationTimeUTC = new Date(tokenCreationTimeUTC.getTime() + 7 * 24 * 60 * 60 * 1000);

      console.log(currentTimeUTC, "currentTimeUTC");
      console.log(expirationTimeUTC, "expirationTimeUTC");


      if (accessToken && tokenCreationTimee) {

        const currentTime = new Date().getTime();

        // console.log(currentTime, "currentTime");

        // console.log(currentTimeUTC, "currentTimeeeeeeeeeeeee")
        // console.log(expirationTimeUTC, "expirationTime")

        // console.log(expirationTimee, "expirationTimee");
        console.log(currentTimeUTC, "currentTimeUTC");
        console.log(expirationTimeUTC, "expirationTimeUTC");

        if (currentTimeUTC >= expirationTimeUTC) {
          console.log("22222222222222222222");
          // Token süresi dolmuş, kullanıcıyı oturum açmaya yönlendirin.
          AsyncStorage.removeItem('accessToken');
          AsyncStorage.removeItem('tokenCreationTime');
          dispatch(changeAuthentication('0'));
        } else {
          console.log("33333333333333333333");
          console.log(currentTimeUTC, "currentTimeUTC");
          console.log(expirationTimeUTC, "expirationTimeUTC");
          console.log(accessToken, "accessTokennnnnnn");
          // Token hala geçerli, oturumu açın.
          dispatch(changeAuthentication('1'));
        }
      }

      else {
        console.log("444444444444444444444");
        dispatch(changeAuthentication('0'));
      }
    };
    console.log("55555555555555555555555");
    checkTokenExpiration();
  }, []);




  return (

    <NavigationContainer>
      {isAuthenticated == '-1' ? (
        <SplashScreen />
      ) : isAuthenticated == '0' ? (
        <AuthStack />
      ) : isAuthenticated == '1' ? (
        <BottomTabs />
      ) : null}

      <ToastCompError
        show={!isConnected}
        text1="No Internet Connection"
        text2="Please check your internet connection."
      />
      <Toast />

    </NavigationContainer>
  );
};
