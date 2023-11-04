import { View, Text, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CariScreen, HomeScreen, SettingsScreen, StokScreen } from '../screens';
import { CariStack } from './cari-stack';
import { StokStack } from './stok-stack';
import { SettingsStack } from './settings-stack';
import { HomeStack } from './home-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {

  return (
    <Tab.Navigator

      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#000E36' },
      }}>
      <Tab.Screen
        name="home-stack"
        component={HomeStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name={'home'}
                size={30}
                style={{
                  color: focused ? '#00B2DF' : '#DEE3F0',
                  marginTop: 8,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="cari-stack"
        component={CariStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name={'account-supervisor-circle'}
                size={30}
                style={{
                  color: focused ? '#00B2DF' : '#DEE3F0',
                  marginTop: 8,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="stok-stack"
        component={StokStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name={'widgets'}
                size={30}
                style={{
                  color: focused ? '#00B2DF' : '#DEE3F0',
                  marginTop: 8,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="settings-stack"
        component={SettingsStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name={'cog-outline'}
                size={30}
                style={{
                  color: focused ? '#00B2DF' : '#DEE3F0',
                  marginTop: 8,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};