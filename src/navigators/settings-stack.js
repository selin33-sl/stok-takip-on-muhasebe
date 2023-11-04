import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../screens';
import { SettingHakkımızdaScreen } from '../screens/settingHakkımızda-screen';
import { SettingProfilScreen } from '../screens/settingProfil-screen';
import { SettingSifreScreen } from '../screens/settingSifre-screen';
import { SettingYardimScreen } from '../screens/SettingYardim-screen';
import { SettingUygulamaBilgileriScreen } from '../screens/settingUygulamaBilgileri-screen';
import { SettingBizeUlasinScreen } from '../screens/settingBizeUlasin-screen';
import { SettingBildirimScreen } from '../screens/settingBildirim-screen';
import { SettingBildirimDetayScreen } from '../screens/settingBildirimDetay-screen';

const Stack = createNativeStackNavigator();


export const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings-screen" component={SettingsScreen} />
      <Stack.Screen name="settingHakkımızda-screen" component={SettingHakkımızdaScreen} />
      <Stack.Screen name="settingProfil-screen" component={SettingProfilScreen} />
      <Stack.Screen name="settingSifre-screen" component={SettingSifreScreen} />
      <Stack.Screen name="settingYardim-screen" component={SettingYardimScreen} />
      <Stack.Screen name="settingUygulamaBilgileri-screen" component={SettingUygulamaBilgileriScreen} />
      <Stack.Screen name="settingBizeUlasin-screen" component={SettingBizeUlasinScreen} />
      <Stack.Screen name="settingBildirim-screen" component={SettingBildirimScreen} />
      <Stack.Screen name="settingBildirimDetay-screen" component={SettingBildirimDetayScreen} />
    </Stack.Navigator>
  )
}









