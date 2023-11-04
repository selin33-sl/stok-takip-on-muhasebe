import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const CommonNavigator = ({ navigation, children }) => {
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    return children;
};
