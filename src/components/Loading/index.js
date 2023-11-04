import React from 'react'
import style from './style'
import { ActivityIndicator, } from 'react-native';

export const Loading = () => {
    return (
        <ActivityIndicator style={style.loadingIndicator} size="large" color="#000E36" />
    )
}

